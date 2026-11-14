import { useEffect } from "react";
import { site } from "@/lib/site";

const defaultTitle = "Ahed – Everything Ahead | Business Advisory, Transformation & Growth";

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

/**
 * Per-page title, description and Open Graph tags. index.html holds the home page defaults
 * (what crawlers see before JavaScript runs); this updates those same tags on every route.
 * Leave `title` out on the home page to use the full default title.
 */
export function PageMeta({ title, description = site.description, noindex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${site.name}` : defaultTitle;
    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("name", "robots", noindex ? "noindex" : "index, follow");
  }, [title, description, noindex]);

  return null;
}
