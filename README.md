# Ahed – Everything Ahead · Website

Marketing site built with Vite, React (JavaScript / JSX), React Router and Tailwind CSS v4.
13 pages: Home, About, Services, 6 service pages, How We Work, Industries, Insights and Contact.

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
```

## Build
```bash
npm run build      # site in ./dist
npm run preview    # serve ./dist locally on http://localhost:4173
```

## Deploy to Netlify
Everything is configured in `netlify.toml` (build command `npm run build`, publish directory `dist`, Node 22,
caching and security headers, redirects from the old `*.html` URLs, and the fallback that lets every page
load directly).

- **Netlify CLI:** `npx netlify-cli deploy --prod` (it reads `netlify.toml`, builds and uploads).
- **From a Git repository:** push the project and import it in Netlify; the settings are picked up automatically.
- **Drag and drop:** run `npm run build`, then drag the `dist` folder onto https://app.netlify.com/drop.
  Drag and drop does not read `netlify.toml`, so add a `public/_redirects` file containing
  `/* /index.html 200` first, or pages other than the home page show Netlify's 404 on reload.

## Continue with Claude Code
`CLAUDE.md` holds the design system, structure, styling conventions, motion rules and the open TODO list.

## Project layout
```
index.html                Entry page: default title, meta tags, favicons
src/main.jsx              Starts the app
src/app.jsx               Routes (URL → page)
src/index.css             Design tokens + Tailwind setup
src/pages/                One file per page
src/components/layout/    Header, footer, logo, page shell, scroll reveal, page titles
src/components/sections/  Page sections: heroes, CTA band, cards, insights list, contact form
src/components/ui.jsx     Small reusable building blocks
src/lib/site.js           Navigation, contact details and all service content
public/                   Photos, logos, favicons
docs/                     Client copy, image notes, brand references (docs/brand/)
netlify.toml              Netlify deploy settings
```

Design source: Figma file "Ahed – Everything Ahead · Website" (Petrotek Developer team).
