import { readFileSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { services, site } from "./src/lib/site.js";

/** Every public page (keep in sync with src/app.jsx when pages are added). */
const pages = [
  "/",
  "/about",
  "/services",
  ...services.map((s) => `/services/${s.slug}`),
  "/how-we-work",
  "/industries",
  "/insights",
  "/contact",
];

/**
 * Writes sitemap.xml and robots.txt into the build. The address comes from Netlify's URL variable (the project's
 * main address, so the custom domain once it is connected) or else `site.url`, so nothing needs editing per domain.
 */
function seoFiles() {
  return {
    name: "ahed-seo-files",
    apply: "build",
    generateBundle() {
      const origin = (process.env.URL || site.url).replace(/\/$/, "");
      const urls = pages.map((path) => `  <url><loc>${origin}${path === "/" ? "/" : path}</loc></url>`).join("\n");
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\nDisallow: /__forms.html\n\nSitemap: ${origin}/sitemap.xml\n`,
      });
    },
  };
}

/**
 * `npm run preview` sends the same security headers as Netlify (read from netlify.toml's "/*" block), so the
 * Content-Security-Policy can be tested locally before a deploy. Not used by `npm run dev` (Vite's dev scripts
 * would be blocked by it).
 */
function netlifyHeaders() {
  const toml = readFileSync(new URL("./netlify.toml", import.meta.url), "utf8");
  const block = toml.split("[[headers]]").find((b) => /for = "\/\*"/.test(b)) ?? "";
  const pairs = [...block.matchAll(/^\s*([A-Za-z-]+) = "(.*)"\s*$/gm)].map(([, key, value]) => [key, value]);
  return Object.fromEntries(pairs.filter(([key]) => key !== "for"));
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoFiles()],
  resolve: {
    // `@/components/ui` → src/components/ui.jsx
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  server: { port: 3000 },
  preview: { port: 4173, headers: netlifyHeaders() },
});
