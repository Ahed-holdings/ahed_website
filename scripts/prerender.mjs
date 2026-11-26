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

const { render, pages, site } = await import(pathToFileURL(ssrEntry).href);

const origin = (process.env.URL || site.url).replace(/\/$/, "");
const template = readFileSync(`${dist}index.html`, "utf8");
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

/** Business details for search engines (schema.org Organization), on the home page. */
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.brand,
  slogan: site.slogan,
  url: `${origin}/`,
  logo: `${origin}/icon.png`,
  email: site.email,
  telephone: site.phone.replace(/\s+/g, ""),
  description: site.description,
  areaServed: site.locations.map((name) => ({ "@type": "City", name })),
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
  if (!meta.noindex) {
    head.push(`<link rel="canonical" href="${escapeAttr(url)}" />`);
    head.push(`<meta property="og:url" content="${escapeAttr(url)}" />`);
  }
  if (path === "/") {
    head.push(`<script type="application/ld+json">${JSON.stringify(organization).replace(/</g, "\\u003c")}</script>`);
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
