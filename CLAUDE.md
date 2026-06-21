# CLAUDE.md — Denver Toilet Pros (project handoff)

> Auto-loaded by Claude Code at the start of every session in this repo.
> It captures the project state so a new chat can continue to production without
> re-discovering everything. Keep it updated as work lands.

---

## What this is

Marketing landing page for **Denver Toilet Pros** — a Denver, CO toilet
repair / replacement / installation business. Single static page with interactive
3D models and an on-site lead form that delivers requests to Telegram.

- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript ·
  Tailwind v4 · shadcn/ui (Radix) · React-Three-Fiber + three.js (3D) · sonner (toasts)
- **Package manager:** pnpm (`pnpm-lock.yaml`)
- **Hosting:** Vercel
- **Repo:** github.com/tilers4you/toilet · primary local clone: `C:\Users\v9139\Downloads\toilet\repo`
- **Node:** 20.x (note: Node 20.9 lacks `import ... with`; some tooling needs ≥20.10)

## Run locally

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm build          # production build
pnpm exec tsc --noEmit   # typecheck
```

## Environment variables (lead form → Telegram)

Set in `.env.local` (gitignored) for local dev and in **Vercel → Settings →
Environment Variables** for production. See `TELEGRAM_LEADS_SETUP.md` for how to
obtain each value.

| Var | Meaning |
|-----|---------|
| `TELEGRAM_BOT_TOKEN` | Bot token from @BotFather (server-only, never `NEXT_PUBLIC_`) |
| `TELEGRAM_CHAT_ID`   | Destination chat id (personal = positive, group/channel = negative) |

Without these the form gracefully shows "please call us". After changing them on
Vercel, **redeploy** so they take effect.

⚠️ The bot is **@tiledenverbot**. A token was shared in chat during setup and
should be **rotated** in @BotFather (`/revoke`), then updated in `.env.local`
and Vercel.

## Deploy

Push to the repo and Vercel builds automatically. The 3D `.glb` models in
`public/models/` ship as **plain bytes** (not Git LFS) so they deploy without an
LFS fetch — see `.gitattributes` (the `3d/` folder is still LFS and unused).

---

## Architecture map

```
app/
  layout.tsx            # wraps the app in <LeadProvider> (lead form context + toaster)
  page.tsx              # section order (see below)
  api/lead/route.ts     # serverless endpoint: validates lead, sends to Telegram (text + photos)
components/
  landing/              # one file per page section
    navigation.tsx hero-section.tsx symptom-selector.tsx toilet-anatomy.tsx
    features-section.tsx how-it-works-section.tsx testimonials-section.tsx
    pricing-section.tsx faq-section.tsx cta-section.tsx footer-section.tsx
    service-model.tsx   # the reusable 3D <ServiceModel> (loads + frames a .glb)
  lead/lead-provider.tsx# the lead form (modal) + useLead() hook used by all CTAs
  ui/                   # shadcn components
lib/model-loader.ts     # configures GLTFLoader for meshopt + KTX2 (+ DRACO)
public/models/*.glb     # optimized 3D models (plain bytes)
public/icons/*.png      # illustrated symptom icons (symptom-selector)
public/basis/           # KTX2/Basis transcoder (required for textures)
TELEGRAM_LEADS_SETUP.md # step-by-step Telegram wiring
```

**Page section order** (`app/page.tsx`): Navigation → Hero → SymptomSelector →
ToiletAnatomy → Features → HowItWorks → Testimonials → Pricing → Faq → Cta → Footer.

---

## Done so far (this session)

1. **3D integration package** merged in: optimized meshopt+KTX2 models, the
   `service-model.tsx` loader rewrite (`lib/model-loader.ts`), the new
   `SymptomSelector` and `ToiletAnatomy` sections; retired leftover SaaS-template
   sections. Basis transcoder added to `public/basis/`.
2. **3D framing fixes:** corrected model sizing (hero responsive container;
   anatomy cutaway uses `targetSize`/`cameraZ` tuned for its +90°-X-rotated geometry;
   symptom part enlarged). Removed the persistent "loading bubble" (only shows
   while a model is loading now).
3. **Mobile perf optimization** in `service-model.tsx`: each `<Canvas>` now
   lazy-mounts via `IntersectionObserver` (loads the ~2-3 MB model only when its
   section nears the viewport) and uses `frameloop="demand"` when offscreen.
   Mobile Lighthouse **47 → 87**; initial mobile weight **6.3 MB → 863 KB**.
4. **Lead form → Telegram** (fully working, verified end-to-end):
   - Every "Request service" CTA (nav desktop+mobile, hero, cta) and the 3 pricing
     cards open the form via `useLead().open(source)`. "Call" buttons are `tel:` links.
   - Form fields: **phone (required)**, name, email, description, up to 4 photos.
   - Photos: decodable images are downscaled to compact JPEG (inline preview);
     **HEIC/HEIF and other undecodable formats are sent as documents** via
     `sendDocument` so nothing is rejected. Total payload capped (~3.8 MB) to stay
     under Vercel's serverless body limit.
   - No honeypot (an earlier hidden "company" honeypot was silently dropping real
     leads because browsers autofilled it — removed). Add rate-limiting later if spam appears.

### Git state
- Work lives on branch **`feat/3d-integration`**. First commit (`3D integration`)
  is in; the framing fixes, perf optimization, and the entire lead form are **still
  uncommitted** in the working tree. Nothing has been pushed yet (owner wanted local-only).
- **Next chat should commit + push** these once confirmed. Suggested commits:
  "Fix 3D framing", "Lazy-load 3D + frameloop demand for mobile perf",
  "Add lead form → Telegram (with HEIC support)".

---

## NEXT TASKS (todo for the next chat)

### 1. Replace the 4 "Toilet service" icons  ← owner's next priority
**Where:** `components/landing/features-section.tsx`. The 4 service blocks are
rendered with inline animated SVGs dispatched by `AnimatedVisual({ type })`:

| `visual` | Component | Service title |
|----------|-----------|---------------|
| `replacement` | `ReplacementVisual` | Toilet replacement |
| `install`     | `InstallVisual`     | Toilet installation |
| `running`     | `RunningVisual`     | Running toilet repair |
| `leak`        | `LeakVisual`        | Leaks, clogs, and weak flushes |

**Problem:** the current icons don't match the actual services. **Owner will
provide reference data/assets** for the correct icons. Replace all four, **keep
them animated** (current ones animate via SVG `<animate>`; match that style or
better). They should read clearly at small size and on the section's background.
Decide with the owner: keep inline animated SVG vs. use provided image/Lottie assets.

### 2. Commit + push the accumulated work (see Git state above).

### 3. Production checklist
- ✅ Business phone set to `(720) 717-3990` / `tel:+17207173990` across nav, hero,
  cta, footer, mobile sticky bar, lead-form toasts, and JSON-LD in `app/page.tsx`.
- Confirm the canonical domain / metadata in `app/layout.tsx` + `app/page.tsx` JSON-LD.
- Set the Telegram env vars on Vercel and redeploy; rotate the bot token.
- Optional: lead rate-limiting (Vercel KV / Upstash), and a desktop/high-detail
  3D model variant swapped by viewport (`*.desktop.glb` above `lg`).

---

## Gotchas / conventions
- `<ServiceModel>` auto-frames the model: `targetSize` (world size), `fit`
  (`"height"` | `"max"`), `centerY`, `cameraZ/Y`, `interactive`, `faceYaw`. Models
  can have node rotations that swap which axis is "up" — check the world bbox, not raw verts.
- 3D under software WebGL (headless screenshots) is unreliable; verify 3D visually
  in a real browser.
- Keep `public/models/*.glb` out of LFS (the `.gitattributes` rule excludes them).
- `.env*` is gitignored except `.env.example`.
```
