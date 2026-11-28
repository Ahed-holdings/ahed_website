/**
 * Pre-renders every page to static HTML after `vite build` (see the "build" script in package.json).
 *
 * Why: the site is a React single-page app. Without this, every URL first returns the same empty index.html
 * (home-page title, no text) and search engines must run JavaScript to see each page. Now each page's first
 * response already has its own title, description, canonical address, Open Graph tags and full text.
 *
 * Output (in dist/):
 *   index.html                    the home page, pre-rendered
 *   _pages/<path>.html            every other page, e.g. _pages/services/strategy-advisory.html
 *   404.html                      the not-found page (Netlify serves it with a real 404 status)
 *   _redirects                    one Netlify rewrite per page: "/about  /_pages/about.html  200!"
 * Pages live under _pages/ with exact rewrites (instead of about/index.html) so Netlify's trailing-slash
 * "pretty URL" rules never redirect them; any address without a rule falls through to 404.html.
 *
 * In the browser, src/main.jsx then starts the app with createRoot, which replaces the pre-rendered markup
 * with the live app (same content), so animations and interactivity work as before.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// React's production build for the render (set before the SSR bundle, and so React, is loaded)
process.env.NODE_ENV ??= "production";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = `${root}dist/`;
const ssrEntry = `${root}dist-ssr/entry-server.js`;

const { render, pages, services, site } = await import(pathToFileURL(ssrEntry).href);

const origin = (process.env.URL || site.url).replace(/\/$/, "");
const template = readFileSync(`${dist}index.html`, "utf8");

/*
 * Performance: what each page should start downloading straight away, from Vite's build manifest.
 * - the Manrope latin font file (the only subset the site's text uses), so text shows in its final font sooner;
 * - the page's own code chunk and the chunks it imports (pages are split, src/routes.jsx), fetched together with
 *   the main script instead of after it.
 */
const manifest = JSON.parse(readFileSync(`${dist}.vite/manifest.json`, "utf8"));
const fontFile = Object.values(manifest)
  .flatMap((entry) => entry.assets ?? [])
  .find((file) => /manrope-latin-wght-normal/.test(file));
const pageModule = (path) => {
  if (path === "/") return "src/pages/home.jsx";
  if (path.startsWith("/services/")) return "src/pages/service-detail.jsx";
  const name = path.slice(1);
  return manifest[`src/pages/${name}.jsx`] ? `src/pages/${name}.jsx` : "src/pages/not-found.jsx";
};
const chunksFor = (key, seen = new Set()) => {
  const entry = manifest[key];
  if (!entry || seen.has(entry.file)) return seen;
  seen.add(entry.file);
  for (const dep of entry.imports ?? []) if (!manifest[dep]?.isEntry) chunksFor(dep, seen);
  return seen;
};
if (!template.includes('<div id="root"></div>')) {
  throw new Error("dist/index.html is already pre-rendered: run the whole `npm run build`, not this script alone.");
}

const escapeAttr = (text) =>
  String(text).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeText = (text) => String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Sets the content="" of the <meta> with the given name/property in the template (meta tags may span lines). */
const setMetaContent = (html, attr, key, value) => {
  const tag = new RegExp(String.raw`(<meta\s+${attr}="${key}"\s+content=")[^"]*(")`);
  if (!tag.test(html)) throw new Error(`index.html has no <meta ${attr}="${key}">`);
  return html.replace(tag, `$1${escapeAttr(value)}$2`);
};

/**
 * Business details for search engines (schema.org), on the home page: an Organization that is also a
 * ProfessionalService, with the cities it serves and the services it offers (each linking to its page).
 * Add the LinkedIn / social profile URLs to `sameAs` once they exist (they help Google connect the profiles).
 */
const organization = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: site.name,
  alternateName: site.brand,
  slogan: site.slogan,
  url: `${origin}/`,
  logo: `${origin}/icon.png`,
  email: site.email,
  telephone: site.phone.replace(/\s+/g, ""),
  description: site.description,
  areaServed: site.locations.map((name) => ({ "@type": "City", name })),
  // Expertise topics (hidden keywords for search engines), all taken from the services the site lists
  knowsAbout: [
    "Business strategy",
    "Business planning",
    "Business process improvement",
    "SOP development",
    "KPI and MIS reporting",
    "Organisation design",
    "HR consulting",
    "Change management",
    "Digital transformation",
    "ERP advisory",
    "Financial planning and budgeting",
    "Management reporting",
    "Managed business services",
  ],
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.title, description: s.summary, url: `${origin}/services/${s.slug}` },
  })),
};

async function page(path) {
  const { html, meta } = await render(path);
  if (!meta) throw new Error(`${path} rendered no <PageMeta>`);
  // React Router's <ScrollRestoration> renders an inline restore script on the server; the CSP blocks inline
  // scripts and the browser app restores scroll itself, so drop any inline <script> from the markup.
  const body = html.replace(/<script\b(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/g, "");
  const url = `${origin}${path}`;

  let doc = template.replace(/<title>[^<]*<\/title>/, `<title>${escapeText(meta.title)}</title>`);
  doc = setMetaContent(doc, "name", "description", meta.description);
  doc = setMetaContent(doc, "property", "og:title", meta.title);
  doc = setMetaContent(doc, "property", "og:description", meta.description);
  doc = setMetaContent(doc, "name", "robots", meta.noindex ? "noindex" : "index, follow");

  const head = [];
  if (fontFile) head.push(`<link rel="preload" href="/${fontFile}" as="font" type="font/woff2" crossorigin />`);
  for (const file of chunksFor(pageModule(path))) head.push(`<link rel="modulepreload" crossorigin href="/${file}" />`);
  if (!meta.noindex) {
    head.push(`<link rel="canonical" href="${escapeAttr(url)}" />`);
    head.push(`<meta property="og:url" content="${escapeAttr(url)}" />`);
  }
  const jsonLd = (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
  if (path === "/") head.push(jsonLd(organization));
  if (path !== "/" && !meta.noindex) {
    // Breadcrumb trail for search results ("ahed.in › Services › Strategy Advisory")
    const service = services.find((s) => path === `/services/${s.slug}`);
    const trail = [{ name: "Home", url: `${origin}/` }];
    if (service) trail.push({ name: "Services", url: `${origin}/services` });
    trail.push({ name: meta.title.split(" | ")[0], url });
    head.push(
      jsonLd({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: item.url })),
      }),
    );
    // Service pages: what the service is, who provides it and where
    if (service) {
      head.push(
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          serviceType: service.title,
          description: service.summary,
          url,
          provider: { "@type": "ProfessionalService", name: site.name, url: `${origin}/` },
          areaServed: site.locations.map((name) => ({ "@type": "City", name })),
        }),
      );
    }
  }
  doc = doc.replace("</head>", `    ${head.join("\n    ")}\n  </head>`);

  if (!doc.includes('<div id="root"></div>')) throw new Error("index.html has no empty #root");
  return doc.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

const write = (file, content) => {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
};

rmSync(`${dist}_pages`, { recursive: true, force: true });
const rules = [];
for (const path of pages) {
  const html = await page(path);
  if (path === "/") {
    write(`${dist}index.html`, html);
  } else {
    write(`${dist}_pages${path}.html`, html);
    rules.push(`${path}  /_pages${path}.html  200!`);
  }
}
write(`${dist}404.html`, await page("/this-page-does-not-exist"));
write(
  `${dist}_redirects`,
  `# Generated by scripts/prerender.mjs: each page served from its pre-rendered file.\n${rules.join("\n")}\n`,
);
console.log(`Pre-rendered ${pages.length} pages + 404.html (${origin})`);
