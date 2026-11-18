import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { gsap } from "gsap";
import { cx } from "../ui";

/**
 * Site menu: adapted from React Bits "StaggeredMenu" (JS + Tailwind variant, reactbits.dev/r/StaggeredMenu-JS-TW.json).
 * Kept: the GSAP open/close choreography (coloured underlays sweep in, then the panel, then the links rise in
 * one by one with their numbers, then the footer), and the button: "Menu" + plus icon that rolls to "Close" as the
 * plus turns into a cross.
 * Changed for this site:
 * - Panel never scrolls: link size follows the screen height (see <style>); very short screens drop the footer.
 * - Header: just the logo and the menu button, no bar or background, on top of the panel. Since it floats over
 *   navy heroes, white sections and the white panel, both check what is behind them (on scroll, resize, navigation
 *   and open/close) and switch between their light-on-navy and navy-on-light versions. The logo sits at the top of
 *   the page and scrolls away with it (moved by the scroll position; it no longer follows the reader down the page);
 *   the button stays fixed: outlined over the hero, solid brand gold once scrolled past the hero.
 * - While the menu is open the header logo fades out; the panel carries its own logo at its top left (`brand`
 *   rendered on light), on every screen size.
 * - Brand colours via tokens: white panel, navy text, bronze accent; gold + navy underlays (`colors`).
 * - React Router <Link>s with aria-current; the menu closes on navigation, Escape and click-away.
 * - Closed panel is `inert` (not focusable); opening moves focus to the first link; Escape returns it to the button.
 * - Open: the page behind blurs and dims (backdrop layer) and doesn't scroll; clicking it closes the menu.
 * - Reduced motion: everything jumps to its end state.
 * - Removed: socials (replaced by `footer`), logo inversion, button colour tween, and a broken CSS rule in the
 *   upstream source (an `import` line pasted into the middle of `.staggered-menu-panel`).
 */
export function StaggeredMenu({
  items = [],
  colors = [],
  brand,
  footer,
  displayItemNumbering = true,
  onOpenChange,
}) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  // What is behind the logo and the button: true = navy (use the light versions)
  const [logoOnDark, setLogoOnDark] = useState(true);
  const [toggleOnDark, setToggleOnDark] = useState(true);
  // Scrolled past the first section (the hero): the menu button turns brand gold
  const [pastHero, setPastHero] = useState(false);
  const headerRef = useRef(null);
  const backdropRef = useRef(null);
  const brandRef = useRef(null);

  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);
  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const textInnerRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const [textLines, setTextLines] = useState(["Menu", "Close"]);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const busyRef = useRef(false);

  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Initial state: underlays and panel off-screen to the right, icon as a plus.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      if (!panel || !plusHRef.current || !plusVRef.current || !textInnerRef.current) return;

      const preLayers = preContainer ? Array.from(preContainer.querySelectorAll(".sm-prelayer")) : [];
      preLayerElsRef.current = preLayers;

      gsap.set([panel, ...preLayers], { xPercent: 100, opacity: 1 });
      gsap.set(plusHRef.current, { transformOrigin: "50% 50%", rotate: 0 });
      gsap.set(plusVRef.current, { transformOrigin: "50% 50%", rotate: 90 });
      gsap.set(textInnerRef.current, { yPercent: 0 });
    });
    return () => ctx.revert();
  }, []);

  const resetPanelContents = (panel) => {
    const itemEls = panel.querySelectorAll(".sm-panel-itemLabel");
    const numberEls = panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item");
    const footerEls = panel.querySelectorAll(".sm-footer > *");
    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { "--sm-num-opacity": 0 });
    if (footerEls.length) gsap.set(footerEls, { y: 25, opacity: 0 });
  };

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();
    closeTweenRef.current = null;

    const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
    const numberEls = Array.from(panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"));
    const footerEls = Array.from(panel.querySelectorAll(".sm-footer > *"));
    resetPanelContents(panel);

    const tl = gsap.timeline({ paused: true });
    layers.forEach((el, i) => {
      tl.fromTo(el, { xPercent: 100 }, { xPercent: 0, duration: 0.5, ease: "power4.out" }, i * 0.07);
    });

    const panelInsertTime = layers.length ? (layers.length - 1) * 0.07 + 0.08 : 0;
    const panelDuration = 0.65;
    tl.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: panelDuration, ease: "power4.out" }, panelInsertTime);

    const itemsStart = panelInsertTime + panelDuration * 0.15;
    if (itemEls.length) {
      tl.to(itemEls, { yPercent: 0, rotate: 0, duration: 1, ease: "power4.out", stagger: { each: 0.1 } }, itemsStart);
    }
    if (numberEls.length) {
      tl.to(
        numberEls,
        { duration: 0.6, ease: "power2.out", "--sm-num-opacity": 1, stagger: { each: 0.08 } },
        itemsStart + 0.1,
      );
    }
    if (footerEls.length) {
      tl.to(
        footerEls,
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", stagger: { each: 0.08 } },
        panelInsertTime + panelDuration * 0.4 + 0.04,
      );
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (!tl) {
      busyRef.current = false;
      return;
    }
    tl.eventCallback("onComplete", () => {
      busyRef.current = false;
    });
    if (reduceMotion()) tl.progress(1);
    else tl.play(0);
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    const panel = panelRef.current;
    if (!panel) return;

    closeTweenRef.current?.kill();
    closeTweenRef.current = gsap.to([...preLayerElsRef.current, panel], {
      xPercent: 100,
      duration: reduceMotion() ? 0 : 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        resetPanelContents(panel);
        busyRef.current = false;
      },
    });
  }, []);

  /** Plus ↔ cross */
  const animateIcon = useCallback((opening) => {
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!h || !v) return;
    spinTweenRef.current?.kill();
    const d = reduceMotion() ? 0 : 1;
    spinTweenRef.current = opening
      ? gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .to(h, { rotate: 45, duration: 0.5 * d }, 0)
          .to(v, { rotate: -45, duration: 0.5 * d }, 0)
      : gsap
          .timeline({ defaults: { ease: "power3.inOut" } })
          .to(h, { rotate: 0, duration: 0.35 * d }, 0)
          .to(v, { rotate: 90, duration: 0.35 * d }, 0);
  }, []);

  /** "Menu" ↔ "Close": a short slot-machine roll through the two words. */
  const animateText = useCallback((opening) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();

    const current = opening ? "Menu" : "Close";
    const target = opening ? "Close" : "Menu";
    const seq = [current];
    let last = current;
    for (let i = 0; i < 3; i++) {
      last = last === "Menu" ? "Close" : "Menu";
      seq.push(last);
    }
    if (last !== target) seq.push(target);
    seq.push(target);

    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });
    const finalShift = ((seq.length - 1) / seq.length) * 100;
    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: reduceMotion() ? 0 : 0.5 + seq.length * 0.07,
      ease: "power4.out",
    });
  }, []);

  const setMenu = useCallback(
    (target) => {
      if (openRef.current === target) return;
      openRef.current = target;
      setOpen(target);
      onOpenChange?.(target);
      if (target) playOpen();
      else playClose();
      animateIcon(target);
      animateText(target);
    },
    [playOpen, playClose, animateIcon, animateText, onOpenChange],
  );

  // Close on navigation (also covers clicking the link of the current page).
  const setMenuRef = useRef(setMenu);
  setMenuRef.current = setMenu;
  useEffect(() => setMenuRef.current(false), [pathname]);

  useEffect(() => {
    if (!open) return;

    // Focus the first link once the panel is in place.
    const focusTimer = setTimeout(
      () => panelRef.current?.querySelector("a")?.focus({ preventScroll: true }),
      reduceMotion() ? 0 : 350,
    );

    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setMenu(false);
      toggleBtnRef.current?.focus();
    };
    const onPointerDown = (e) => {
      if (panelRef.current?.contains(e.target) || toggleBtnRef.current?.contains(e.target)) return;
      setMenu(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointerDown);

    // The page behind the menu is blurred: stop it from scrolling (html keeps its scrollbar gutter, see index.css).
    document.documentElement.style.overflow = "hidden";

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointerDown);
      document.documentElement.style.overflow = "";
    };
  }, [open, setMenu]);

  // Light or navy logo/button: look at what sits behind each of them.
  useEffect(() => {
    const isDarkBehind = (el) => {
      if (!el) return true;
      const r = el.getBoundingClientRect();
      for (const hit of document.elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2)) {
        if (headerRef.current?.contains(hit) || hit === backdropRef.current) continue;
        if (panelRef.current?.contains(hit)) return false; // white menu panel
        return Boolean(hit.closest("[data-inverse]"));
      }
      return false;
    };
    const fullScreenPanel = () => window.matchMedia("(max-width: 67.49rem)").matches;

    let frame = 0;
    const update = () => {
      frame = 0;
      // The logo scrolls away with the page like a normal page logo (by request: it shouldn't travel down the
      // page over the content); only the menu button stays fixed. Moved 1:1 with the scroll until it is off screen.
      const lift = Math.min(window.scrollY, 120);
      if (brandRef.current) brandRef.current.style.transform = lift ? `translateY(${-lift}px)` : "";
      // Open: the button is always over the white panel; the logo too where the panel is full screen.
      // (Decided up front, because the panel is still sliding in at this point.)
      setToggleOnDark(open ? false : isDarkBehind(toggleBtnRef.current));
      setLogoOnDark(open && fullScreenPanel() ? false : isDarkBehind(brandRef.current));
      const hero = document.querySelector("main > section");
      const btn = toggleBtnRef.current?.getBoundingClientRect();
      setPastHero(Boolean(hero && btn && hero.getBoundingClientRect().bottom < btn.top + btn.height / 2));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    // Again once a close animation has moved the panel out of the way
    const settle = setTimeout(schedule, reduceMotion() ? 0 : 400);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [open, pathname]);

  return (
    <div className="sm-scope pointer-events-none fixed inset-0 z-50 overflow-hidden" data-open={open || undefined}>
      {/* Open: the page behind blurs and dims slightly; clicking it closes the menu (click-away handler) */}
      <div
        ref={backdropRef}
        aria-hidden
        className={cx(
          "absolute inset-0 z-[1] bg-inverse/25 backdrop-blur-md transition-opacity duration-400 ease-out-expo",
          open ? "pointer-events-auto opacity-100" : "opacity-0",
        )}
      />

      {/* Coloured underlays that sweep in ahead of the panel */}
      <div
        ref={preLayersRef}
        aria-hidden
        className="sm-prelayers pointer-events-none absolute inset-y-0 right-0 z-[5] w-full lg:w-[clamp(380px,40vw,520px)]"
      >
        {colors.map((c) => (
          <div key={c} className="sm-prelayer absolute inset-0" style={{ background: c }} />
        ))}
      </div>

      <aside
        id="site-menu"
        ref={panelRef}
        aria-label="Site menu"
        inert={!open}
        className={cx(
          "sm-panel absolute inset-y-0 right-0 z-10 flex w-full flex-col overflow-y-auto bg-background text-foreground",
          // Vertical spacing shrinks with the screen height so everything fits without scrolling (see <style>)
          "px-(--gutter) pt-[calc(78px+clamp(0.5rem,4svh,2.5rem))] pb-[clamp(1rem,4svh,2.5rem)] lg:w-[clamp(380px,40vw,520px)] lg:px-12",
          open && "pointer-events-auto",
        )}
      >
        {/* The panel's own logo, top left, level with the header row (the header logo hides while open) */}
        {brand && (
          <div className="absolute top-0 left-(--gutter) flex h-[78px] items-center lg:left-12">
            {typeof brand === "function" ? brand(false) : brand}
          </div>
        )}
        <nav aria-label="Main">
          <ul className="sm-panel-list grid gap-0.5" data-numbering={displayItemNumbering || undefined}>
            {items.map((it) => {
              const active = pathname === it.href || (it.href !== "/" && pathname.startsWith(`${it.href}/`));
              return (
                <li key={it.href} className="overflow-hidden leading-none">
                  <Link
                    to={it.href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      // pb: room for descenders (g, y) inside the li's overflow-hidden mask
                      // font-size: set in <style> below (depends on screen height and width)
                      "sm-panel-item relative inline-block pr-[1.6em] pb-[0.14em] leading-[1.12] font-semibold tracking-[-0.03em]",
                      "text-foreground transition-colors duration-280 hover:text-primary aria-[current=page]:text-primary",
                      // focus ring drawn inside the link: the li's mask would clip one drawn outside it
                      "focus-visible:outline-offset-[-3px]",
                    )}
                  >
                    <span className="sm-panel-itemLabel inline-block origin-[50%_100%] will-change-transform">
                      {it.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {footer && <div className="sm-footer mt-auto grid gap-3 pt-[clamp(1rem,5svh,3rem)]">{footer}</div>}
      </aside>

      {/* No bar: only the logo and the button take clicks, the rest of the strip lets them through */}
      <header ref={headerRef} className="pointer-events-none absolute inset-x-0 top-0 z-20">
        <div className="container-page flex h-[78px] items-center justify-between gap-6">
          <div
            ref={brandRef}
            data-inverse={logoOnDark ? "" : undefined}
            inert={open}
            className={cx(
              "flex transition-opacity duration-280 ease-out-expo",
              open ? "pointer-events-none opacity-0" : "pointer-events-auto",
            )}
          >
            {typeof brand === "function" ? brand(logoOnDark) : brand}
          </div>
          <div className="pointer-events-auto flex" data-inverse={toggleOnDark ? "" : undefined}>
            <button
              ref={toggleBtnRef}
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setMenu(!openRef.current)}
              className={cx(
                "inline-flex h-11 cursor-pointer items-center gap-2.5 rounded-btn border px-4 text-btn leading-none font-semibold",
                "transition-colors duration-280 active:translate-y-px",
                // In the hero: outlined, matching what is behind it. After it: solid brand gold with navy text
                // (like the gold CTA), on white sections and the navy footer alike.
                pastHero
                  ? "border-gold bg-gold text-gold-foreground shadow-hover hover:border-gold-hover hover:bg-gold-hover"
                  : toggleOnDark
                    ? "border-white/30 text-inverse-foreground hover:border-gold hover:text-gold"
                    : "border-border bg-background text-foreground hover:border-primary hover:text-primary",
              )}
            >
              <span aria-hidden className="relative inline-block h-[1em] overflow-hidden whitespace-nowrap">
                <span ref={textInnerRef} className="flex flex-col leading-none">
                  {textLines.map((l, i) => (
                    <span key={i} className="block h-[1em] leading-none">
                      {l}
                    </span>
                  ))}
                </span>
              </span>
              <span aria-hidden className="relative inline-flex size-3.5 shrink-0 items-center justify-center">
                <span
                  ref={plusHRef}
                  className="absolute top-1/2 left-1/2 h-0.5 w-full -translate-1/2 rounded-full bg-current"
                />
                <span
                  ref={plusVRef}
                  className="absolute top-1/2 left-1/2 h-0.5 w-full -translate-1/2 rounded-full bg-current"
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Link size that always fits the screen, and item numbers (01, 02…) that fade in through
          --sm-num-opacity (animated by GSAP) */}
      <style>{`
/* The panel never scrolls: the 7 links share what is left of the screen height after the header, paddings and
   the footer (--sm-fixed), each link taking ~9 × its font size... (line-height 1.12 + descender room 0.14em = 1.26em,
   × 7 ≈ 8.8em). Also capped by width (11vw, so "How we work" fits on phones) and by 3.25rem on large screens. */
.sm-scope { --sm-fixed: 24rem; }
.sm-scope .sm-panel-item { font-size: clamp(1.4rem, min(calc((100svh - var(--sm-fixed)) / 9), 11vw), 3.25rem); }
/* Very short screens (phones in landscape): drop the contact footer, the links get the room */
@media (max-height: 34rem) {
  .sm-scope { --sm-fixed: 9rem; }
  .sm-scope .sm-footer { display: none; }
}
.sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after {
  counter-increment: smItem;
  content: counter(smItem, decimal-leading-zero);
  position: absolute; top: 0.35em; right: 0;
  font-size: 0.8125rem; font-weight: 600; letter-spacing: 0.08em;
  color: var(--primary);
  opacity: var(--sm-num-opacity, 0);
  pointer-events: none; user-select: none;
}
      `}</style>
    </div>
  );
}
