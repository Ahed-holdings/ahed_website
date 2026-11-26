# Ahed – Everything Ahead · Website

Marketing website for **Ahed – Everything Ahead**, a business advisory firm (freelance project by Nihadh Muhammed).
Core message on every page: *we help businesses make the transition from ambition to structured, sustainable performance.*

## Stack
- **Vite 8 + React 19**, plain JavaScript: components are `.jsx`, other modules `.js` (no TypeScript).
  Migrated from Next.js 16 in Nov 2026; the site is now a single-page app.
- **React Router 8** (`react-router`): all routes in `src/routes.jsx` (used by `src/app.jsx` → `createBrowserRouter`, and by
  the build-time renderer `src/entry-server.jsx`), shared shell in
  `src/components/layout/root-layout.jsx` (`<Outlet/>` + `<ScrollRestoration/>`). Use `<Link to>` from `react-router`;
  `ButtonLink` / `LinkArrow` in `ui.jsx` keep an `href` prop and pass it on as `to`.
- **Tailwind CSS v4** via `@tailwindcss/vite`, configured in `src/index.css` (`@import "tailwindcss"` + `@theme`). No `tailwind.config.js`.
- Icons: `lucide-react`. Font: Manrope via Fontsource (`@fontsource-variable/manrope`, imported in `src/main.jsx`). GSAP (`gsap`) for the site menu only. No other UI libraries.
- Images: `Image` in `src/components/image.jsx`, a plain `<img>` (lazy by default; `fill` covers a positioned parent, `priority` for first-screen images).
- Page titles/descriptions: render `<PageMeta title description />` at the top of each page (`src/components/layout/page-meta.jsx`).
  It updates the tags in `index.html`, which hold the home-page defaults crawlers see before JavaScript runs.
- `npm run dev` → http://localhost:3000 · `npm run build` → `dist/` · `npm run preview` serves `dist/` on :4173
  like Netlify: same security headers (read from `netlify.toml`), the `_redirects` page rewrites and real 404s
  (`netlifyRewrites` in `vite.config.js`). Test CSP and pre-rendering changes there.
- **Pre-rendering** (for search engines): `npm run build` = `vite build` → `vite build --ssr src/entry-server.jsx`
  (into `dist-ssr/`) → `node scripts/prerender.mjs`, which renders every page in `src/lib/pages.js` to static HTML with
  its own `<title>`, description, robots, canonical + `og:url` (always `site.url`), and the full page text:
  `dist/index.html` (home, plus schema.org Organization JSON-LD), `dist/_pages/<path>.html`, `dist/404.html`, and
  `dist/_redirects` with one rewrite per page (`/about  /_pages/about.html  200!`). There is **no SPA catch-all** any
  more: unknown addresses get `404.html` with a real 404. In the browser `main.jsx` still uses `createRoot`, which
  replaces the pre-rendered markup with the live app. Components must not touch `window`/`document` during render
  (only in effects), or the build fails. `PageMeta` records its values during the server render (`takeServerMeta`).
  Scroll-reveal hiding only applies under `html[data-js]` (set in `main.jsx`), so pre-rendered text is visible without JS.
- `npm run build` also writes `robots.txt` (also disallows `/_pages/`) and `sitemap.xml` (`seoFiles` in `vite.config.js`,
  from the same page list). Address = Netlify's `URL` env (the custom domain once connected), else `site.url` in `lib/site.js`.
- Caching (`netlify.toml`): `/assets/*` 1 year immutable (hashed names); `/img/*` 1 day then revalidate (give a
  replaced photo a new file name to show it at once); HTML/robots/sitemap always revalidated (Netlify default).
- `@/` is an alias for `src/` (`vite.config.js`, `jsconfig.json` for editors).
- Deploy: **Netlify**, configured in `netlify.toml` (build `npm run build`, publish `dist`, Node 22, headers incl. a strict
  Content-Security-Policy (any new outside script/font/API must be added there first), old-URL redirects,
  `NETLIFY_NEXT_PLUGIN_SKIP=true` because the Netlify project was first set up for Next.js and still adds its Next.js plugin,
  no SPA catch-all: page rewrites come from the generated `dist/_redirects`).
- Git: `.gitignore` excludes `node_modules/`, `dist/`, `.playwright-mcp/`, `.env*`, logs, Office lock files (`~$*`)
  and the whole `.claude/` folder (local only, not tracked).

## Structure
```
index.html                      Vite entry: default <title>/meta/Open Graph, favicons, #root
src/
  main.jsx                      Mounts <App/>, imports the font and index.css
  routes.jsx                    Every route → page component (shared by app.jsx and entry-server.jsx)
  app.jsx                       Browser router (createBrowserRouter(routes))
  entry-server.jsx              Build-time render of one page to HTML (for scripts/prerender.mjs)
  index.css                     Design tokens (OKLCH, :root) + Tailwind @theme + custom variants/utilities
  pages/                        One file per route: home, about, services, service-detail (6 services,
                                one template, data from lib/site.js, unknown slug → 404), how-we-work,
                                industries, insights, contact, not-found
  components/
    ui.jsx                      Building blocks: Eyebrow, ButtonLink, Section, SectionHead, IconCard,
                                Checklist, Feature, MethodSteps, Timeline, cardClass, muted, cx, delay
    image.jsx                   <Image> (plain img with lazy loading / fill / priority)
    backgrounds/grainient.jsx   React Bits "Grainient" WebGL2 grain gradient (home hero only; two local fixes, marked "Ahed change")
    layout/                     On every page: root-layout, site-header, staggered-menu, site-footer, logo, scroll-reveal, page-meta
    sections/                   Page sections: page-hero, cta-band, service-card, card-swap, challenge-stack, scroll-stack, service-stack, flowing-menu, engagement-menu,
                                insights-list, contact-form
  lib/site.js                   Site name, address (url), default description, nav, contact details, all service content
  lib/pages.js                  Every public page path (sitemap + pre-rendering)
  lib/email-check.js            Contact form email typo suggestion + domain check
scripts/prerender.mjs           Writes the pre-rendered pages, 404.html and _redirects after the build
public/
  img/                          Photos (WebP, quality 80) + logo.webp (navy & gold) / logo-inverse.webp (white letters, for dark)
  favicon.ico, icon.png, apple-icon.png   The logo's "A" + gold swoosh on a navy tile
docs/
  content.md                    Source copy from the client's content document
  images.md                     Image sources + where each is used
  brand/palette-reference.jpg   Navy & gold palette reference (Behance board) the colours were taken from
  brand/logo-original.webp      Client's original logo in the old green/blue colours: source only, not used by the site
netlify.toml                    Netlify build, headers, redirects, SPA fallback
.claude/launch.json             Preview servers: dev (:3000) and the built `dist/` folder (:4173)
```
Generated, safe to delete any time: `dist/`, `dist-ssr/` (build output), `.playwright-mcp/`.
Header, footer and CTA band are shared components — change them once. Service content lives in `src/lib/site.js`.
New components: page-wide chrome goes in `src/components/layout/`, page sections in `src/components/sections/`,
small reusable primitives in `src/components/ui.jsx`. Import with `@/components/<folder>/<name>`.
New page: add a file in `src/pages/` (with `<PageMeta>`), a route in `src/routes.jsx`, its path in `src/lib/pages.js`
(or it gets no HTML file and returns 404 on Netlify), and nav entries in `src/lib/site.js`.
URLs: `/about`, `/services/strategy-advisory`, … (old `*.html` URLs redirect via `netlify.toml`; `/about/` also works).

## Styling conventions
- Tailwind utilities only; components use semantic colour tokens (`bg-primary`, `text-muted-foreground`, `border-border`, `bg-inverse`…), never raw hex or palette classes.
- Type scale utilities: `text-display`, `text-h1`–`text-h4`, `text-lead`, `text-eyebrow`, `text-btn`.
- Radius tokens: `rounded-btn` (8px), `rounded-card` (12px), `rounded-media` (16px). Shadow: `shadow-hover`.
- Breakpoints: `sm` 640, `md` 900, `lg` 1080 (match the original design).
  Text + fixed-width column splits (e.g. `[380px_1fr]`) start at `lg`, not `md`: at 900px they squeeze the other column.
  `Checklist` uses a container query (`@[30rem]:grid-cols-2`), so it goes two-column based on its own width, not the screen.
  Responsive check: no horizontal scroll at 320, 375, 768, 900, 1080, 1280 and 1440 on every page.
- Heroes are navy (`data-inverse`), run up **under the header** and **fit the screen**. Every page must start with one:
  the header is `fixed` (out of flow), so the first section gets `under-header` (padding-top 78px = header height) and `min-h-svh`
  for full-screen heroes.
  - Home: text only (eyebrow, headline, intro, two buttons), one screen tall, vertically centred over the animated
    gradient. No photo slider or pillars list (removed on request).
    Headline: exactly two lines from `sm` ("Want to Build a Stronger Business?" / "AHED Prepare you for What’s Next."),
    sized by `text-hero-title` (index.css) to fit the hero width (container query, 100cqi / 15.5 because the longer line
    is ~15.2em, max 5rem ≈ 80px, capped by 10svh; re-measure the divisor if the wording changes);
    on phones each sentence starts its own line and wraps. Intro uses `text-lead-lg`.
  - Home "The challenge": one screen tall (`min-h-svh`, content centred; grows on phones), text left (side by side from `md`), the six challenges right as a `ChallengeStack` (`sections/challenge-stack.jsx`):
    React Bits CardSwap (`sections/card-swap.jsx`, JS-TW, changes listed in its top comment; no @hugeicons needed)
    with navy cards (`theme="navy"`), autoplay 2.5s, pause on hover, click/drag/arrow keys; smaller cards on phones.
    Under it a minimal progress bar (gold fill on a hairline track, `progress-fill` keyframes in index.css) driven by
    CardSwap's `onTimer`: restarts with each new card, empty while autoplay is paused, hidden with reduced motion.
  - Home "Our services": `ServicesShowcase` (`sections/service-stack.jsx`): heading on top (title left, two paragraphs
    right), the six services below as a React Bits ScrollStack (`sections/scroll-stack.jsx`, JS-TW, styling-only
    changes in its top comment) on the page scroll (`useWindowScroll`, `smoothScroll={false}`).
    md+: the heading stays pinned under the header (`sticky top-[78px]`, white background) and the stack pins
    directly below it (pin position measured from the heading); card height = room left on screen
    (clamp 16–20rem; phones 23rem; reduced on request). Scroll length kept short on request: `itemDistance` 28, `holdDistance` 40. The heading gets margin-bottom = finished stack height and the stack the same negative
    margin-top, so both let go together. Phones: heading scrolls away, stack pins at 16%.
    Navy cards (`ScrollStackItem tone="navy"`), each one link: the photo fills the card as a background under a navy
    gradient shade (darkest behind the text: left from md, bottom on phones; photo deliberately not at full clarity),
    text on top: focus areas + number at the top, title / summary / "Explore service" at the bottom. The Services page uses `ServiceGrid navy` (same navy cards via `data-inverse` on the grid:
    gold focus areas, white title, grey-blue summary, gold on hover).
  - How We Work "Engagement models": `EngagementMenu` (`sections/engagement-menu.jsx`): React Bits FlowingMenu
    (`sections/flowing-menu.jsx`, JS-TW; changes in its top comment: Lucide arrow so no @hugeicons, `item.to` router
    links, `item.description` for screen readers, labels capped by row width, band text 30cqh). Navy panel, numbered
    rows showing only the model names; on hover/tap/focus the gold band shows the model name in bold and its
    description, standing still (`bandMode="detail"`, added to FlowingMenu; no scrolling marquee, by request). Left aligned. Keep the "Ahed fix" in its unmount cleanup (resets the
    animation-frame id): without it, after a remount (StrictMode in dev) the band never appears. Rows are buttons (no links, so a tap
    on phones shows the description). Mounts when scrolled into view so its intro plays then.
  - Home "Why work with us?" (navy, "Advice built to be applied…"): compact on request: `<Section compact>`
    (`section-y-sm` padding) and `<Feature compact>` items (16px rows instead of 26px), smaller gaps.
  - Home "Who we work with" (navy): compact on request. Heading on top, the four audiences as `IconCard compact`
    (icon beside the title, tighter padding) in one row from `lg`, 2 × 2 from `sm`. No photo.
  - Contact: off-white section; white form card (`sections/contact-form.jsx`: header, "About you" / "Your enquiry"
    groups, gold * on required fields and "(optional)" on the rest, Lucide chevron on selects, contact-method chips that
    turn navy when selected and stack below `sm`, navy success message) beside a navy panel (direct contact + "What
    happens next", first three engagement-cycle steps), pinned while scrolling from `md`. Compact by request (hero
    unchanged): smaller section padding, form card p-5/sm:p-7, h4 headings, 46px fields, 4-row textarea.
    Submissions go to **Netlify Forms**: the React form posts (url-encoded, `form-name=contact`) to
    `public/__forms.html`, a hidden static copy Netlify detects at deploy. Keep the field names of both in sync.
    Honeypot `bot-field`; hidden `subject` sets the notification email subject. Leads are emailed to ceo@ahed.in via
    Netlify UI → Forms → contact → Form notifications (set there, not in code). Error state offers the direct email
    and phone and keeps the entries. In `npm run dev` nothing is sent (success shown, payload logged to the console).
    Preferred contact method "WhatsApp": the submit click also opens `wa.me/<site.whatsapp>` (919188011117) with the
    enquiry typed in (filled fields only), so the visitor just taps Send; opened inside the click so pop-up blockers
    allow it. The email lead is still sent; the success message links to WhatsApp again in case it didn't open.
    WhatsApp can't receive leads automatically without the paid Business API, so this relies on the visitor's tap.
    Required: name, company, phone (8–15 digits, +/spaces/dashes/brackets allowed), industry, service, challenge.
    Email is optional (by request), but required when "Email" is the preferred contact method; checked only when filled.
    Email checks (`src/lib/email-check.js`), run when leaving the field and on submit: "Did you mean …?" for typos of
    popular providers (advice only; company domains are never "corrected"), and a Google Public DNS lookup that the
    domain exists and accepts mail (MX, or A as fallback), which blocks made-up domains. Only the domain is sent; if
    DNS can't be reached the address is allowed. It can't prove the mailbox exists or belongs to the visitor.
    If the check is still running at submit and WhatsApp is chosen, a blank tab opens inside the click (pop-up rule)
    and is pointed at WhatsApp, or closed if the domain fails.
  - About "Our purpose" / "Our business philosophy": the two large `IconCard`s are navy on the off-white section
    on request (`data-inverse` on their grid).
  - About "Four principles behind every engagement." (What defines us), redesigned on request: heading + short intro
    left (pinned from lg), one navy panel right split 2 × 2 by hairlines (`gap-px` over `bg-inverse-border`), each cell
    a gold icon, number 01–04, title and line; on hover a gold rule draws across the top and the title turns gold.
    Stacks to one column below sm. (IconCard also sets `inverse:text-inverse-foreground` for navy placements.)
  - About "Collaborative, structured, grounded in reality." (navy): compact on request: `<Section compact>`,
    engagement cycle left (`Timeline compact`), the six principles right as `<Feature compact>` in two columns from sm.
  - About "Our team" (replaced the single founder block on request): `SectionHead` + three static white cards
    (gold rule, name, bronze role, short profile; no photos, no hover lift since they aren't links), three across
    from `md`, then the "areas of expertise" checklist. Data: `team` in `lib/site.js`.
    **Hidden for now** (`SHOW_TEAM = false` at the top of `pages/about.jsx`) until the client sends real names; the
    section then shows only the areas-of-expertise checklist. Set it to true to bring the team back.
  - Insights (`sections/insights-list.jsx`): photo cards on request, like the home service cards: the photo fills
    each card (`CardPhoto`) under a navy shade darkest at the bottom, with the gold category, white title (gold on
    hover) and "Read article" on top (`data-inverse` per card). Featured card full width, 400–460px tall; the
    others 340px, three across from md. Filters unchanged.
  - Inner pages (`PageHero` with an image): side by side from 720px, one screen tall. Without an image: natural height.
  - `short:` variant (md+ and max-height 800px, e.g. 1366×768 laptops) tightens type and spacing so it still fits.
  - Anything white placed inside a navy section must set `text-foreground` (it inherits white), and use
    `<Eyebrow tone="accentOnLight">`. Gold text on white fails contrast.
- Dark navy sections: `<Section tone="inverse">` sets `data-inverse`; use the `inverse:` variant for colours inside them.
  `cardClass` / `IconCard` switch to raised navy automatically inside them (white title, `inverse-muted` text, white icon
  turning gold on hover). Home section order: hero (navy) → challenge (off-white) → services (white) → who we work
  with (navy) → how we create value (off-white) → why work with us (navy) → CTA band.
- Buttons: no white CTAs (by request). `primary`, `secondary` and `light` button variants are all brand gold with
  navy text; `dark` (navy) and `ghostLight` (outline on navy) remain.
- Footer (`layout/site-footer.jsx`): compact by request (about 40% of a 1440×900 screen, ~360px): tight padding,
  15px links, logo h-12; from sm to lg the logo sits beside the tagline.
- CTA band (`sections/cta-band.jsx`, bottom of most pages): navy panel, no photo (removed on request; no `image` prop).
  lg+: large `text-h1` heading left, text + buttons right (equal columns), then a hairline and email / phone /
  location from `lib/site.js`. Optional `title` and `text` props.
- Scroll reveal: add `data-reveal` (optional `style={delay(ms)}`) or `data-stagger` on a parent; `data-observe` only flags visibility.
  Don't use these on elements that mount/unmount after load (e.g. filtered lists).
- When two classes set the same property (e.g. `hidden` vs a component's `inline-flex`), wrap instead of overriding — there is no tailwind-merge.
- No dark-mode theme yet: the Figma design only defines the light palette.

## Design system (based on the Figma file "Ahed – Everything Ahead · Website"; colours since updated to the navy & gold brand palette)
Client feedback that shaped it: modern & minimal, **no green tones, nothing vibrant**, **no serif / typewriter-style fonts**, avoid pill/capsule buttons, simple line icons, should feel human-made rather than "AI template".

**Colours: "Executive Navy & Gold"** (brand palette recommended alongside the new AHED logo: navy #0B1F3B, gold #C4A037, off-white #F8FAFC). These replaced the earlier navy + steel-blue Figma palette. OKLCH variables live in `src/index.css` `:root`; the Tailwind name is in brackets.

Brand gold is only 2.5:1 on white, so **never use `gold` for text on light backgrounds**. Use `primary` (a deepened bronze-gold) there instead. Gold text is fine on navy (6.6:1).
| Token | Hex | Use |
|---|---|---|
| `--foreground` / `--inverse` (`foreground`, `inverse`) | #0B1F3B | Executive navy: text, dark sections, dark buttons |
| `--gold` (`gold`) | #C4A037 | Brand gold fills: primary CTA (navy text), rules, dots, nav underline, card hover borders, logo mark |
| `--gold-hover` (`gold-hover`) | #B38C2A | Gold CTA hover |
| `--gold-foreground` (`gold-foreground`) | = navy | Text on gold |
| `--primary` (`primary`) | #916A18 | Bronze-gold text accent on light: eyebrows, links, icons, ticks (4.9:1 on white; hue kept warm so it never reads olive) |
| `--primary-hover` (`primary-hover`) | deeper bronze | Text accent hover |
| `--accent-soft` (`accent-soft`) | #FBF5E8 | Warm gold tint (selected states, success message) |
| `--muted` (`muted`) | #F8FAFC | Off-white alternating sections |
| `--muted-foreground` (`muted-foreground`) | #515F72 | Body copy |
| `--border` (`border`) | #DEE3EB | Hairlines and card borders |
| `--inverse-accent` (`inverse-accent`) | = gold | Accent on dark backgrounds |
| `--inverse-muted`, `--inverse-raised`, `--inverse-border` | #A5B2C5, #162C4A, #233957 | Text, cards, lines on dark |
| `--destructive` | — | Form errors only (muted brick red) |

`--ring` is bronze on light and switches to gold inside `[data-inverse]`.

**Typography**: Manrope only (Fontsource variable font; 400/500/600/700 used). Headings SemiBold with tight tracking (−2.5 to −3.5%). Eyebrows: 13px, SemiBold, uppercase, +8% tracking, preceded by a short line.

**Shapes**: buttons 8px radius (never fully rounded pills), cards 12px, large media 16px. 1px borders; soft shadow only on hover.

**Icons**: `lucide-react` line icons, `strokeWidth={1.5}` (2 for check ticks). Plain, no tinted icon boxes.

**Imagery**: real-looking business photography, no stock-y illustrations. No animated counters or unverified numbers (client's content doc explicitly asks to avoid them).

## Motion
- Scroll reveal: elements with `data-reveal` or inside `[data-stagger]` (src/components/layout/scroll-reveal.jsx) fade up 24px, 700ms, 80ms stagger (IntersectionObserver).
- Home hero background: `Grainient` (React Bits, JS-TW variant, added by hand; no shadcn setup, no extra dependencies).
  Navy-only colour ramp in `heroGradient` (`src/pages/home.jsx`), light end top right, away from the text; slow flow,
  light animated grain (amount 0.03, size 1), cursor stir and click swirl. Static under reduced motion. The canvas stays hidden until it has drawn,
  so without WebGL2 the plain navy section shows. Don't reintroduce `loseContext()` in its cleanup: StrictMode remounts
  on the same canvas and the hero went white.
- Hover: buttons shift colour + arrow nudges 4px; cards lift 3px with border tint; card photos zoom to 1.07 over 900ms; process steps draw an accent line across the top.
- Header + menu: `site-header.jsx` renders `StaggeredMenu` (`staggered-menu.jsx`, adapted from React Bits
  StaggeredMenu JS-TW; its top comment lists every change). The old navy header bar (solid background on scroll,
  border, shadow, inline nav links, CTA in the bar) is gone: the header is only the logo and a square menu button (three lines that GSAP turns into a cross when open),
  floating with no bar. The logo checks what is behind it (white letters over navy `[data-inverse]`, navy-and-gold
  over light). The button is outlined in the hero (white over navy, navy over the white panel) and solid brand gold
  with navy lines (`bg-gold`, like the gold CTA) once scrolled past the first section, on any background.
  The logo is bare (no tile, no bar): `logo.webp` (navy & gold) over light sections, white letters over navy ones.
  It sits at the top of each page and scrolls away with it (translated by the scroll position, up to 120px; by
  request it must not travel down the page over content). The button is always visible (fixed). While the menu is open the header logo fades out and the menu panel shows its
  own navy & gold logo at its top left.
- Menu panel: white, sliding in from the right (full screen below `lg`, `clamp(380px,40vw,520px)` from `lg`), never scrolls:
  link size follows the screen height (`--sm-fixed` in the component's <style>; checked from 1920×1080 to 320×568 and
  phones in landscape, where the contact footer is dropped below 34rem height). It slides in after
  gold then raised-navy underlays. Links: Home + `mainNav` (`lib/site.js`), numbered 01–07, current page in bronze;
  footer "Get in touch" with email, phone and a dark CTA. Closes on navigation, Escape (focus back to the button) and
  click-away (including on the blurred page); closed panel is `inert`; opening focuses the first link; while open the page behind is blurred and dimmed (`backdrop-blur-md`, navy 25%) and doesn't scroll (scrollbars are hidden site-wide, so nothing shifts); reduced motion
  jumps to the end state. It is the only navigation on every screen size.
- Scroll position: `ScrollRestoration` in `root-layout.jsx` keys the first page of a visit by path and clears it on any
  load that is not a refresh, so typed URLs open at the top and a refresh keeps its place (React Router gives every
  full page load the same key otherwise).
- Everything respects `prefers-reduced-motion`.
- Scrollbars are hidden site-wide (`index.css` base layer: `scrollbar-width: none` + `::-webkit-scrollbar`); scrolling still works.

## Open items / TODO
- [x] Contact details: ceo@ahed.in, +91 91880 11117 (`lib/site.js`).
- [x] Location: Kochi · Kottayam · Ahmedabad (`site.locations` / `site.location`; footer, CTA band, contact page,
  and `areaServed` in the home page's Organization JSON-LD).
- [ ] About "Our team": names, roles and short profiles of the three team members (`team` in `lib/site.js`; no
  photos by request; shown again with `SHOW_TEAM = true`).
- [x] Logo: AHED "always ahead" recoloured to navy & gold (`src/components/layout/logo.jsx`). It's a 640×193 raster recoloured from the client's file; ask the client for a vector (SVG/AI) master for print and sharper rendering.
- [ ] Client still to confirm whether the site represents a person or a registered firm.
- [x] Contact form sends via Netlify Forms. On Netlify: enable form detection (Forms) and add the email
  notification to ceo@ahed.in; then send one test enquiry from the live site.
- [ ] Write the 10 Insights articles (titles are in `docs/content.md`) and create article pages; cards currently link to `#`.
- [ ] Swap in better/licensed photos where needed (see `docs/images.md`). Some home/about images reuse service photos.
- [ ] Privacy Policy and Terms pages.
- [x] Favicon (`public/icon.png`, `apple-icon.png`, `favicon.ico`) and per-page title/description metadata.
- [x] Custom domain: **https://ahed.in** (GoDaddy DNS: A `@` → 75.2.60.5, CNAME `www` → ahed-holdings.netlify.app;
  nameservers and the MX/SPF email records stay at GoDaddy). Netlify primary domain ahed.in, www redirects, Let's Encrypt.
- [ ] Open Graph image (`public/og-image.png` + `og:image` and `og:url` in `index.html`).
- [ ] Managed Services: only list offerings that can genuinely be delivered (client's own note).
- [ ] Finance page: keep the note distinguishing advisory from statutory audit / regulated tax & legal work.
