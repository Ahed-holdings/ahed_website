import { services } from "./site.js";

/**
 * Every public page: used for sitemap.xml (vite.config.js) and the pre-rendered HTML files
 * (scripts/prerender.mjs). Keep in sync with src/routes.jsx when pages are added.
 */
export const pages = [
  "/",
  "/about",
  "/services",
  ...services.map((s) => `/services/${s.slug}`),
  "/how-we-work",
  "/industries",
  "/insights",
  "/contact",
];
