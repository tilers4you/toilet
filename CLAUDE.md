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
    service-icon.tsx + service-icon.module.css  # animated CSS service icons (features)
    mobile-sticky-cta.tsx # mobile-only sticky "Request service" bar (in app/page.tsx)
  lead/lead-provider.tsx# the lead form (modal) + useLead() hook used by all CTAs
  ui/                   # shadcn components
lib/model-loader.ts     # configures GLTFLoader for meshopt + KTX2 (+ DRACO)
app/globals.css         # theme tokens + utilities; .pricing-cta--* glow classes
public/models/*.glb     # optimized 3D models (plain bytes)
public/icons/*.png      # illustrated symptom icons (symptom-selector)
public/basis/           # KTX2/Basis transcoder (required for textures)
TELEGRAM_LEADS_SETUP.md # step-by-step Telegram wiring
```

**Page section order** (`app/page.tsx`): Navigation → Hero → SymptomSelector →
ToiletAnatomy → Features → HowItWorks → Testimonials → Pricing → Faq → Cta → Footer.
A `<MobileStickyCta>` is rendered last (fixed bottom, `md:hidden`).

---

## Done so far (shipped to `main`)

1. **3D integration package**: optimized meshopt+KTX2 models, the
   `service-model.tsx` loader rewrite (`lib/model-loader.ts`), the new
   `SymptomSelector` and `ToiletAnatomy` sections; retired leftover SaaS-template
   sections. Basis transcoder in `public/basis/`.
2. **3D framing fixes:** corrected model sizing (hero responsive container;
   anatomy cutaway uses `targetSize`/`cameraZ` tuned for its +90°-X-rotated geometry;
   symptom part enlarged). Loading bubble only shows while a model is loading.
3. **Mobile perf optimization** in `service-model.tsx`: each `<Canvas>`
   lazy-mounts via `IntersectionObserver` (loads the ~2-3 MB model only when its
   section nears the viewport) and uses `frameloop="demand"` when offscreen.
   Mobile Lighthouse **47 → 87**; initial mobile weight **6.3 MB → 863 KB**.
4. **Lead form → Telegram** (verified end-to-end):
   - Every "Request service" CTA (nav desktop+mobile, hero, cta, mobile sticky bar)
     and the 3 pricing cards open the form via `useLead().open(source)`.
     "Call" buttons are `tel:` links.
   - Form fields: **phone (required)**, name, email, description, up to 4 photos.
   - Photos: decodable images downscaled to compact JPEG (inline preview);
     **HEIC/HEIF and other undecodable formats sent as documents** via
     `sendDocument`. Total payload capped (~3.8 MB) for Vercel's body limit.
   - No honeypot (browsers autofilled the old hidden field and dropped real leads).
5. **Animated service icons** (`service-icon.tsx` + `.module.css`): CSS-driven
   inline SVG, 4 types `replacement | installation | repair | leaks`, wired into
   `features-section.tsx`. Animation runs on hover/focus of the icon OR via the
   `playing` prop (the feature card drives it from its hover state). Themed with
   `currentColor` (= `--foreground`) and `--icon-accent` (= `--primary`).
   ⚠️ **Respects `prefers-reduced-motion`** — icons are intentionally static when
   the OS "reduce motion" setting is on (this is correct; to preview animation,
   enable Windows "Animation effects" and fully restart the browser).
6. **Mobile sticky CTA** (`mobile-sticky-cta.tsx`): `md:hidden` fixed bottom bar,
   slides in after scrolling past the hero (~500px), Call + "Request service".
7. **Business phone** `(720) 717-3990` everywhere (nav, hero, cta, footer, sticky
   bar, lead-form toasts, JSON-LD).
8. **Pricing CTA polish**: `.pricing-cta--primary/--ghost` glow classes in
   `globals.css` (brand `--primary` via `color-mix`), `rounded-xl` corners,
   subtle `hover:-translate-y-0.5` lift.

### Git state
- Everything is **committed and pushed to `origin/main`** (commit `35dbc32` on top
  of the `9796b98` 3D-integration commit). Local default branch is `main`; the old
  `feat/3d-integration` branch still exists locally at the same commit.
- Site is **deployed on Vercel** (owner confirmed) from `main`.

---

## NEXT TASKS (todo for the next chat)

### 1. Verify the lead form works in production
The form only sends if `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` are set on
**Vercel** and the project was redeployed after. Without them it shows
"please call us". Confirm a test submission lands in Telegram. **Rotate the bot
token** in @BotFather (`/revoke`) if not already done — it leaked in chat.

### 2. Remaining placeholders before launch
- Colorado plumbing license (currently "pending" in `footer-section.tsx`).
- Review links / testimonials (`testimonials-section.tsx`) — confirm real or remove.
- Confirm canonical domain / metadata in `app/layout.tsx` + `app/page.tsx` JSON-LD
  (currently `denvertoiletpros.com` — verify that's the live domain).

### 3. Optional / nice-to-have
- Lead rate-limiting (Vercel KV / Upstash) if spam appears.
- Desktop/high-detail 3D model variant swapped by viewport (`*.desktop.glb` above `lg`).
- Owner may want to tune icon glow / pricing-button rounding intensity.

---

## Gotchas / conventions
- `<ServiceModel>` auto-frames the model: `targetSize` (world size), `fit`
  (`"height"` | `"max"`), `centerY`, `cameraZ/Y`, `interactive`, `faceYaw`. Models
  can have node rotations that swap which axis is "up" — check the world bbox, not raw verts.
- 3D under software WebGL (headless screenshots) is unreliable; verify 3D visually
  in a real browser.
- **`service-icon.module.css` invariants — do NOT change or the motion breaks:**
  `.icon * { transform-box: view-box }` (NOT `fill-box`); `transform-origin` values
  are in the 0..160 viewBox coords (keep the explicit drop centers); keep the
  transparent `<rect>` hitbox; keep the `@media (prefers-reduced-motion: reduce)`
  guard. If icons look frozen, it's almost always the OS reduce-motion setting, not a bug.
- CSS modules + Tailwind: a module rule like `.icon { width:160px }` and a Tailwind
  `w-full` are equal specificity, so order is unpredictable — size `ServiceIcon` via
  inline `style` (as done in `features-section.tsx`), which always wins.
- Keep `public/models/*.glb` out of LFS (the `.gitattributes` rule excludes them).
- `.env*` is gitignored except `.env.example`.
```
