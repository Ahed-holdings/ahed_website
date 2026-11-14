import { useLocation } from "react-router";
import { useEffect } from "react";

/**
 * Fades elements up as they scroll into view by setting `data-visible`.
 * - `[data-reveal]`          a single element (optional delay via style --d)
 * - `[data-stagger] > *`     each child, 80ms apart
 * - `[data-observe]`         no fade, just gets data-visible (e.g. step accent line)
 * Runs again on every route change.
 */
export function ScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.querySelectorAll("[data-stagger]").forEach((group) => {
      Array.from(group.children).forEach((el, i) => {
        el.style.setProperty("--d", `${i * 80}ms`);
      });
    });

    const targets = document.querySelectorAll(
      "[data-reveal]:not([data-visible]), [data-stagger] > :not([data-visible]), [data-observe]:not([data-visible])",
    );
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.setAttribute("data-visible", ""));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-visible", "");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
