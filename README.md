# Denver Toilet Pros Landing Page Notes

This project was originally a one-page SaaS landing page for an abstract platform called Optimus. It has been partially converted into a local service-business landing page for **Denver Toilet Pros**, a Denver, Colorado business concept focused on toilet installation, toilet replacement, and toilet repair.

The current implementation is technically working, but the visual direction is not strong enough for the intended business. It still feels too flat, too template-driven, and not sufficiently informative for homeowners who want to understand the problem before they call.

## What Was Changed

The site content was rewritten from SaaS messaging into local toilet-service messaging:

- Brand changed to **Denver Toilet Pros**.
- Hero now targets toilet replacement, toilet installation, toilet repair, and leak fixes in Denver.
- Navigation was changed to local-service sections:
  - Services
  - Process
  - Service Area
  - DIY Checks
  - Cost
  - FAQ
- The service cards now cover:
  - Toilet replacement
  - Toilet installation
  - Running toilet repair
  - Leaks, clogs, and weak flushes
- The process section now explains:
  - What the customer should tell us
  - How repair vs replacement is diagnosed
  - What a clean repair, reset, or installation visit includes
- The old “infrastructure” section became a Denver service-area section.
- The old “developer SDK” section became a DIY guidance section.
- The old fake testimonials were replaced with educational service scenarios instead of invented customer reviews.
- Pricing was changed into service options and cost factors instead of fake flat pricing.
- A visible FAQ section was added.
- Footer links were rewritten around services, service area, resources, and company trust items.

## SEO Work Added

Basic SEO structure was added for a local plumbing/service-area business:

- Metadata was updated in `app/layout.tsx`.
- JSON-LD was added in `app/page.tsx`:
  - `Plumber`
  - `Service`
  - `BreadcrumbList`
- `robots.txt` support was added through `app/robots.ts`.
- `sitemap.xml` support was added through `app/sitemap.ts`.
- The page now targets high-intent local phrases such as:
  - Denver toilet replacement
  - Denver toilet installation
  - toilet repair Denver
  - running toilet repair Denver
  - leaking toilet base Denver
  - wax ring replacement Denver

Important: the business phone number is `(720) 717-3990`. The Colorado plumbing license is still a placeholder and must be replaced before launch.

## 3D / Visual Assets Added

The original animated SaaS sphere was replaced with a Three.js / React Three Fiber model viewer.

The following models were copied into `public/models` so the browser can load them:

- `modern-toilet.glb`
- `plumber-wrench.glb`

The source models are still in the root `3d` folder.

Current problem: the GLB models are too large for production:

- `modern-toilet.glb` is about 42 MB.
- `plumber-wrench.glb` is about 45 MB.
- Other available models are also roughly 44-55 MB.

For a real landing page, these should be optimized to approximately:

- 1-3 MB for the hero model
- under 1 MB for small supporting parts

Use mesh simplification, compressed textures, Draco or Meshopt compression, and lower-resolution materials.

## Verification

The project was verified after the conversion:

- `pnpm.cmd install --frozen-lockfile` succeeded.
- `pnpm.cmd run build` succeeded.
- `.\node_modules\.bin\tsc.cmd --noEmit` succeeded.

Lint did not run because the project has a `lint` script using `eslint`, but `eslint` is not installed as a dependency.

## What Is Not Good Enough

The current design is functional, but it is not visually persuasive enough for a serious local service brand.

Main issues:

- The layout still feels like a converted SaaS template.
- The design is too flat and too text-heavy.
- The 3D models exist, but they are not used as a full information system.
- There is not enough visual explanation of how toilets work.
- There are no real photos of technicians, bathrooms, vehicles, or finished installations.
- The service-area section is mostly text, not a meaningful map or local visual.
- The FAQ is useful, but it could become a more engaging “problem solver” interface.
- The DIY section is helpful, but it looks like a code block from the old SaaS design.
- There are no before/after visuals.
- There are no trust-building local assets such as real reviews, license verification, uniforms, van, invoice, warranty card, or Google Business Profile screenshots.

## Recommended Direction For The Next Landing Page

The next landing page should feel less like software and more like a highly visual local home-service website.

The best direction is an information-rich service page where customers can study their toilet problem before calling.

Recommended visual systems:

1. Hero with a real bathroom or clean 3D toilet
   - Use a modern toilet model or a clean bathroom photo.
   - Add callout labels: fill valve, flapper, overflow tube, supply line, wax ring, flange.
   - Avoid abstract decorative objects.

2. Interactive “What is wrong with your toilet?” section
   - Running nonstop
   - Weak flush
   - Water at base
   - Rocking toilet
   - Repeated clog
   - Cracked tank or bowl
   - New toilet installation

3. Toilet anatomy section
   - Tank diagram
   - Bowl/base diagram
   - Supply line and shutoff valve
   - Wax ring and closet flange
   - Show which issues are DIY-friendly and which require a plumber.

4. Repair vs replacement decision tree
   - Repair if: flapper, fill valve, handle, simple supply line, minor tank part.
   - Replace if: cracked porcelain, repeated clogs, old inefficient toilet, loose flange, expensive recurring repairs.

5. Cost factor visualizer
   - Toilet type
   - Existing toilet removal
   - Flange condition
   - Floor condition
   - Shutoff valve condition
   - Stairs / access
   - Customer-supplied vs recommended toilet

6. Denver service area visual
   - Map-style graphic for Denver and nearby suburbs.
   - Include Denver, Lakewood, Aurora, Arvada, Englewood, Littleton, Wheat Ridge, Centennial if they are truly served.
   - Do not overstate service area beyond the real dispatch radius.

7. Trust section with real assets
   - Real technician photo
   - Real van or service vehicle
   - Colorado license number
   - Insurance statement
   - Warranty explanation
   - Cleanup promise
   - Real Google reviews once available

8. Before / after section
   - Old toilet removed
   - New toilet installed
   - Clean floor area
   - New supply line
   - Level bowl
   - Caulk decision explained

9. DIY resource hub
   - How to stop a running toilet temporarily
   - How to shut off water to the toilet
   - How to test for a silent leak with food coloring
   - How to use a toilet plunger correctly
   - Why water at the base is a warning sign
   - When not to keep flushing

10. Conversion-focused CTA
   - “Request toilet service”
   - “Call now”
   - “Upload photos of the toilet”
   - “Tell us if you already bought the replacement toilet”

## Suggested Page Structure

Recommended next structure:

1. Hero: `Denver Toilet Installation, Replacement & Repair`
2. Problem selector: `What is your toilet doing?`
3. Toilet anatomy visual: tank, bowl, base, flange
4. Services: repair, replacement, installation
5. Repair vs replace decision guide
6. Cost factors
7. Denver service area
8. DIY checks before you call
9. Trust and warranty
10. Reviews or service scenarios
11. FAQ
12. Final CTA

## Content Topics That Should Be Expanded

The next version should include deeper customer education around:

- Running toilets and high water bills
- Flapper replacement
- Fill valve replacement
- Ghost flushing
- Weak flushes
- Slow tank refill
- Toilet leaking at the base
- Wax ring failure
- Closet flange problems
- Rocking toilet
- Cracked tank or bowl
- Repeated clogs
- Toilet replacement after repeated repair
- WaterSense toilets
- Comfort-height toilets
- Dual-flush toilets
- Customer-supplied toilet installation
- Old toilet removal and haul-away
- Landlord and property manager service

## SEO Notes For Future Work

For stronger local SEO, the one-page landing page should eventually become a small local-service site with dedicated pages:

- `/toilet-replacement-denver/`
- `/toilet-installation-denver/`
- `/toilet-repair-denver/`
- `/running-toilet-repair-denver/`
- `/service-area/denver-co/`
- `/service-area/lakewood-co/`
- `/service-area/aurora-co/`

Each page should have:

- One clear H1
- Local city/service title
- Real service details
- FAQ
- Internal links
- Breadcrumbs
- Service schema
- Real business phone number
- Real license information
- No fake reviews or fake ratings

## Sources Used For The Strategy

The strategy was informed by:

- Google Business Profile local ranking guidance
- Google Search Central SEO guidance
- Google structured data guidance for local business and breadcrumbs
- EPA WaterSense toilet information
- Competitor patterns from Denver plumbing companies
- Common homeowner pain points around running toilets, base leaks, weak flushes, repeated clogs, and replacement decisions

Core references:

- https://support.google.com/business/answer/7091
- https://developers.google.com/search/docs/appearance/structured-data/local-business
- https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://www.epa.gov/watersense/residential-toilets

## Immediate Next Steps

Before using this as a production site:

1. Replace the placeholder phone number.
2. Add real business license information.
3. Decide whether the business has a public office address or is a service-area business.
4. Optimize all GLB files.
5. Add real photos or high-quality generated photo assets.
6. Replace the flat sections with stronger visual explanation modules.
7. Add real Google Business Profile, Yelp, or review links only after they exist.
8. Add dedicated service pages for SEO.
9. Install and configure ESLint if linting is required.
10. Re-run build, TypeScript, Lighthouse, and mobile performance checks.
