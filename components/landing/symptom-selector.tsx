"use client";

/**
 * Interactive "What is your toilet doing?" section.
 * Each symptom shows its illustrated icon, the likely cause, DIY/pro tag,
 * a real Denver price range, and — where relevant — the REAL 3D part involved
 * (flapper, wax ring, or a modern replacement) rendered with ServiceModel.
 *
 * Place icons in /public/icons/ and models in /public/models/.
 * Tailwind classes assume the repo's existing tokens (primary, accent, muted...).
 */
import { useState } from "react";
import { ServiceModel } from "./service-model";

type Tag = "diy" | "pro" | "warn";
type Symptom = {
  id: string;
  label: string;
  hint: string;
  icon: string;
  tag: Tag;
  tagText: string;
  cause: string;
  fix: string;
  price: string;
  us: string;
  part?: { model: string; name: string };
};

const SYMPTOMS: Symptom[] = [
  { id: "running", label: "Running nonstop", hint: "never stops filling", icon: "/icons/icon-running.png",
    tag: "diy", tagText: "Often DIY",
    cause: "A worn flapper or a failing fill valve is letting water leak from the tank into the bowl, so it refills forever.",
    fix: "Flapper / fill valve", price: "$90–$150", us: "We replace the worn part and confirm a clean shut-off.",
    part: { model: "/models/flapper.glb", name: "Flapper" } },
  { id: "weak", label: "Weak flush", hint: "barely clears", icon: "/icons/icon-weak.png",
    tag: "pro", tagText: "Usually a pro",
    cause: "Mineral buildup in the rim jets, a low tank water level, or a partial clog is starving the flush of power.",
    fix: "Diagnose & clear", price: "From $130", us: "We find the real cause instead of guessing — sometimes it points to a bigger drain issue." },
  { id: "base", label: "Water at the base", hint: "pooling on the floor", icon: "/icons/icon-base.png",
    tag: "warn", tagText: "Call — don't wait",
    cause: "Almost always a failed wax ring or a loose closet flange. Left alone, it rots the subfloor — a real warning sign.",
    fix: "Wax ring replacement", price: "$150–$230", us: "We reset the toilet on a fresh seal and check the flange and floor for damage.",
    part: { model: "/models/wax-ring.glb", name: "Wax ring" } },
  { id: "rocking", label: "Rocking / loose", hint: "wobbles when you sit", icon: "/icons/icon-rocking.png",
    tag: "pro", tagText: "Usually a pro",
    cause: "Loose mounting bolts or a damaged flange. A rocking toilet breaks the wax seal and can crack the bowl.",
    fix: "Reset & secure", price: "From $150", us: "We level and secure it properly — overtightening bolts yourself can crack the porcelain.",
    part: { model: "/models/wax-ring.glb", name: "Wax ring & flange" } },
  { id: "clog", label: "Clogs again & again", hint: "repeat blockages", icon: "/icons/icon-clogs.png",
    tag: "pro", tagText: "Usually a pro",
    cause: "An old low-flow design, a partial blockage, or a vent/sewer issue. Repeat clogs often mean it's time to replace.",
    fix: "Diagnose & advise", price: "Quoted on site", us: "If it keeps happening, we'll be honest that a modern toilet may be the cheaper long-term fix." },
  { id: "crack", label: "Cracked tank / bowl", hint: "visible crack or seep", icon: "/icons/icon-cracked.png",
    tag: "warn", tagText: "Replace",
    cause: "Porcelain cracks don't get better — they spread and can fail suddenly, flooding the room.",
    fix: "Toilet replacement", price: "$310–$820", us: "We remove the cracked unit, haul it away, and install a reliable new one the same visit.",
    part: { model: "/models/modern-toilet.glb", name: "A modern replacement" } },
  { id: "new", label: "Want a new toilet", hint: "upgrade or remodel", icon: "/icons/icon-new.png",
    tag: "diy", tagText: "We install",
    cause: "Upgrading to a WaterSense, comfort-height, or dual-flush model — lower bills and an easier sit.",
    fix: "New installation", price: "$310–$820", us: "Bring your own or we'll recommend one. Clean install, level set, old one hauled away.",
    part: { model: "/models/modern-toilet.glb", name: "Your new toilet" } },
];

const tagClass: Record<Tag, string> = {
  diy: "bg-accent/15 text-accent-foreground",
  pro: "bg-primary/10 text-primary",
  warn: "bg-destructive/10 text-destructive",
};

export function SymptomSelector() {
  const [activeId, setActiveId] = useState(SYMPTOMS[0].id);
  const active = SYMPTOMS.find((s) => s.id === activeId)!;

  return (
    <section id="symptoms" className="py-20 lg:py-28">
      <div className="max-w-[1180px] mx-auto px-6 lg:px-12">
        <span className="inline-flex items-center gap-3 text-sm font-mono text-primary font-semibold">
          <span className="w-6 h-px bg-accent" />
          Start here
        </span>
        <h2 className="mt-4 text-[clamp(2rem,5vw,3.25rem)] font-display leading-tight">
          What is your toilet doing?
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Tap the symptom that fits. We'll tell you the likely cause, whether it's a DIY fix or a job
          for us, and a ballpark cost — before you ever call.
        </p>

        <div className="mt-9 grid grid-cols-2 md:grid-cols-4 gap-3">
          {SYMPTOMS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left font-semibold transition ${
                s.id === activeId
                  ? "border-primary bg-primary/5 shadow-[0_0_0_3px] shadow-primary/10"
                  : "border-border hover:border-primary hover:-translate-y-0.5"
              }`}
            >
              <span className="h-14 w-14 rounded-lg overflow-hidden grid place-items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.icon} alt="" className="h-full w-full object-contain" loading="lazy" />
              </span>
              {s.label}
              <small className="font-medium text-muted-foreground text-xs">{s.hint}</small>
            </button>
          ))}
        </div>

        <div className="mt-4 grid lg:grid-cols-[1.3fr_1fr] rounded-2xl border border-primary overflow-hidden">
          <div className="p-7 lg:p-8">
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider ${tagClass[active.tag]}`}>
              {active.tag === "warn" ? "⚠ " : ""}{active.tagText}
            </span>
            <h3 className="mt-3 text-3xl font-display">{active.label}</h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">{active.cause}</p>
          </div>
          <div className="bg-muted/40 border-l border-border p-7 lg:p-8 flex flex-col gap-1.5">
            {active.part && (
              <div className="relative h-64 rounded-xl overflow-hidden border border-border mb-3 bg-gradient-to-b from-background to-muted">
                <ServiceModel
                  url={active.part.model}
                  label={active.part.name}
                  targetSize={2.3}
                  fit="max"
                  centerY
                  interactive
                  cameraZ={3.9}
                  cameraY={0}
                  className="h-full w-full"
                />
                <span className="absolute left-3 bottom-2.5 font-mono text-[10px] uppercase tracking-wider font-semibold text-primary bg-background/80 border border-border px-2.5 py-1 rounded-full">
                  {active.part.name}
                </span>
              </div>
            )}
            <Row k="Likely fix" v={active.fix} />
            <Row k="Typical cost" v={active.price} mono />
            <Row k="What we do" v={active.us} small />
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v, mono, small }: { k: string; v: string; mono?: boolean; small?: boolean }) {
  return (
    <div className="py-2.5 border-b border-border/60 last:border-0">
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div>
      <div className={`mt-0.5 font-semibold ${mono ? "font-mono text-primary" : ""} ${small ? "text-sm font-medium text-muted-foreground" : ""}`}>{v}</div>
    </div>
  );
}
