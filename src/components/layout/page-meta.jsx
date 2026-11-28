import { useEffect } from "react";
import { useLocation } from "react-router";
import { site } from "@/lib/site";

// Home page title: brand first, then what Ahed does. No city names in titles (by request): the cities go in the
// descriptions, the city pages and the JSON-LD instead. Keep it under ~60 characters.
const defaultTitle = `${site.brand} | Business Advisory & Growth`;

/** Full <title> for a page: "Title | Ahed – Always Ahead", or the default title on the home page. */
export const pageTitle = (title) => (title ? `${title} | ${site.brand}` : defaultTitle);

/** Page address without a trailing slash (except the home page "/"). */
const cleanPath = (path) => (path.length > 1 ? path.replace(/\/+$/, "") : "/");

/*
 * Build-time pre-rendering (scripts/prerender.mjs) renders each page on the server, where effects don't run.
 * PageMeta then records its values here during render, and the pre-renderer writes them into that page's <head>.
 */
let serverMeta = null;
export function takeServerMeta() {
  const meta = serverMeta;
  serverMeta = null;
  return meta;
}

/** Sets the content of a <meta> tag in <head>, creating it if it is missing. */
function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Sets (or removes, when href is null) the <link rel="canonical"> in <head>. */
function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!href) return el?.remove();
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Per-page title, description, robots, canonical address and Open Graph tags.
 * In the pre-rendered HTML these are written into each page's <head> at build time; in the browser they are
 * updated on every route change. Leave `title` out on the home page to use the full default title.
 */
export function PageMeta({ title, description = site.description, noindex = false }) {
  const { pathname } = useLocation();
  const fullTitle = pageTitle(title);

  if (typeof document === "undefined") serverMeta = { title: fullTitle, description, noindex };

  useEffect(() => {
    // Always the main address (site.url), never the host the page happens to be opened on (netlify.app, localhost)
    const url = noindex ? null : `${site.url}${cleanPath(pathname)}`;
    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("name", "robots", noindex ? "noindex" : "index, follow");
    if (url) setMeta("property", "og:url", url);
    setCanonical(url);
  }, [fullTitle, description, noindex, pathname]);

  return null;
}
