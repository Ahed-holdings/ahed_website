import { Outlet, ScrollRestoration } from "react-router";
import { ScrollReveal } from "./scroll-reveal";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/*
 * React Router gives every full page load the same key ("default"), so by default opening /about by URL
 * would jump to wherever the previously loaded page was scrolled. Like the browser itself: a refresh
 * keeps the position (keyed by path); any other full load (typed URL, external link) starts at the top.
 */
const SCROLL_STORAGE = "ahed-scroll-positions";
const scrollKey = (location) => (location.key === "default" ? location.pathname : location.key);
try {
  const isReload = performance.getEntriesByType?.("navigation")[0]?.type === "reload";
  const saved = JSON.parse(sessionStorage.getItem(SCROLL_STORAGE) || "{}");
  if (!isReload && location.pathname in saved) {
    delete saved[location.pathname];
    sessionStorage.setItem(SCROLL_STORAGE, JSON.stringify(saved));
  }
} catch {
  // Storage blocked (private mode etc.): React Router then simply starts every page at the top.
}

/** Shell around every page: skip link, sticky header, page content, footer. */
export function RootLayout() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-btn focus:bg-inverse focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
      <ScrollReveal />
      {/* New page → top of the page; back/forward → previous scroll position. */}
      <ScrollRestoration getKey={scrollKey} storageKey={SCROLL_STORAGE} />
    </>
  );
}
