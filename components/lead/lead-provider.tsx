"use client";

/**
 * Site-wide lead form. Any button can open it via useLead().open(source).
 * The form collects phone (required), name, email, description, and optional
 * photos, then POSTs to /api/lead which forwards it to Telegram.
 *
 * Usage:
 *   const { open } = useLead();
 *   <Button onClick={() => open("Hero — Request service")}>Request service</Button>
 */
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { Toaster, toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileImage, ImagePlus, Loader2, Phone, X } from "lucide-react";

type LeadContextValue = { open: (source?: string) => void };
const LeadContext = createContext<LeadContextValue | null>(null);

export function useLead(): LeadContextValue {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error("useLead must be used within <LeadProvider>");
  return ctx;
}

const MAX_PHOTOS = 4;
const MAX_EDGE = 1280; // px — downscale long edge before upload
const MAX_TOTAL_BYTES = 3_800_000; // keep the whole request under Vercel's limit

type Photo = {
  url: string; // data URL
  kind: "photo" | "document"; // photo = inline preview; document = raw file (e.g. HEIC)
  name: string;
  bytes: number; // approx payload size of the data URL
};

const readAsDataURL = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(new Error("read failed"));
    r.readAsDataURL(file);
  });

// Prepare an image for upload. Formats the browser CAN decode (JPEG/PNG/WebP…)
// are downscaled + re-encoded to a compact JPEG so a phone photo (~3-5 MB)
// becomes ~200-400 KB and gets an inline preview. Formats the browser CANNOT
// decode (iPhone HEIC/HEIF and friends) are sent as the original file via
// Telegram sendDocument, so nothing is ever rejected.
async function prepImage(file: File): Promise<Photo> {
  const resized = await new Promise<string | null>((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(null);
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", 0.7));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null); // undecodable (e.g. HEIC) -> fall back to document
    };
    img.src = url;
  });

  if (resized) {
    return { url: resized, kind: "photo", name: file.name, bytes: resized.length };
  }
  const raw = await readAsDataURL(file);
  return { url: raw, kind: "document", name: file.name || "photo", bytes: raw.length };
}

export function LeadProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const open = useCallback((src?: string) => {
    setSource(src);
    setIsOpen(true);
  }, []);

  const onPickFiles = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      if (fileRef.current) fileRef.current.value = "";
      if (!files.length) return;
      const room = MAX_PHOTOS - photos.length;
      if (room <= 0) {
        toast.error(`You can attach up to ${MAX_PHOTOS} photos.`);
        return;
      }
      let prepared: Photo[];
      try {
        prepared = await Promise.all(files.slice(0, room).map(prepImage));
      } catch {
        toast.error("Couldn't read one of the photos. Try another.");
        return;
      }
      setPhotos((prev) => {
        let total = prev.reduce((s, p) => s + p.bytes, 0);
        const next = [...prev];
        let skipped = false;
        for (const ph of prepared) {
          if (next.length >= MAX_PHOTOS) break;
          if (total + ph.bytes > MAX_TOTAL_BYTES) {
            skipped = true;
            continue;
          }
          next.push(ph);
          total += ph.bytes;
        }
        if (skipped) toast.error("Some photos were too large and were skipped.");
        return next;
      });
    },
    [photos.length]
  );

  const removePhoto = (i: number) => setPhotos((p) => p.filter((_, idx) => idx !== i));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const phone = String(data.get("phone") || "").trim();
    if (phone.length < 5) {
      toast.error("Please enter a phone number so we can reach you.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          description: String(data.get("description") || ""),
          source,
          photos: photos.map((p) => ({ url: p.url, kind: p.kind, name: p.name })),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        toast.success("Request sent — we'll call you shortly.");
        form.reset();
        setPhotos([]);
        setIsOpen(false);
      } else if (json.error === "not_configured") {
        toast.error("Requests aren't connected yet. Please call (720) 717-3990.");
      } else {
        toast.error("Couldn't send. Please try again or call (720) 717-3990.");
      }
    } catch {
      toast.error("Network error. Please try again or call (720) 717-3990.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <LeadContext.Provider value={{ open }}>
      {children}
      <Toaster position="top-center" richColors closeButton />
      <Dialog open={isOpen} onOpenChange={(v) => !submitting && setIsOpen(v)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request toilet service</DialogTitle>
            <DialogDescription>
              {source ? source : "Tell us how to reach you and what's going on."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="lead-phone">
                Phone <span className="text-primary">*</span>
              </Label>
              <Input
                id="lead-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                required
                autoComplete="tel"
                placeholder="(720) 555-0123"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="lead-name">Name</Label>
                <Input id="lead-name" name="name" autoComplete="name" placeholder="Optional" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lead-email">Email</Label>
                <Input
                  id="lead-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Optional"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="lead-description">What's going on?</Label>
              <Textarea
                id="lead-description"
                name="description"
                rows={3}
                placeholder="e.g. Toilet runs nonstop, water pooling at the base…"
              />
            </div>

            <div className="space-y-1.5">
              <Label>Photos (optional)</Label>
              <div className="flex flex-wrap items-center gap-2">
                {photos.map((p, i) => (
                  <div key={i} className="relative h-16 w-16 overflow-hidden rounded-md border bg-muted">
                    {p.kind === "photo" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.url} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-1 text-center text-muted-foreground">
                        <FileImage className="h-5 w-5" />
                        <span className="w-full truncate text-[8px] leading-tight">{p.name}</span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="absolute right-0.5 top-0.5 rounded-full bg-background/80 p-0.5 text-foreground"
                      aria-label="Remove photo"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {photos.length < MAX_PHOTOS && (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-md border border-dashed text-muted-foreground hover:border-primary hover:text-primary"
                  >
                    <ImagePlus className="h-5 w-5" />
                    <span className="text-[10px]">Add</span>
                  </button>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*,.heic,.heif"
                multiple
                onChange={onPickFiles}
                className="hidden"
              />
            </div>

            <Button type="submit" disabled={submitting} className="w-full h-12 rounded-full text-base">
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Phone className="mr-2 h-4 w-4" />
                  Send request
                </>
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              We use your number only to respond to this request.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </LeadContext.Provider>
  );
}
