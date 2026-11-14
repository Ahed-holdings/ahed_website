import { useEffect, useRef, useState } from "react";
import FlowingMenu from "./flowing-menu";

/**
 * How We Work "Engagement models" as a React Bits FlowingMenu in brand colours: a navy panel with one row per
 * model; hovering (or keyboard-focusing) a row slides a gold band over it with the model's description scrolling
 * across (tap on touch screens). Rows are buttons, not links. The menu mounts when it first scrolls into view, so its intro
 * (rows rise in, lines draw, the band sweeps down once) plays when visitors actually see it.
 */
export function EngagementMenu({ models }) {
  const boxRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(box);
    return () => io.disconnect();
  }, []);

  // No links: on touch screens a tap must show the description, not leave the page (the CTA below covers contact)
  const items = models.map((m) => ({ text: m.title, marquee: m.text, description: m.text }));

  return (
    <div
      ref={boxRef}
      data-inverse
      className="h-[24rem] overflow-hidden rounded-media bg-inverse sm:h-[33rem] lg:h-[36rem]"
    >
      {inView && (
        <FlowingMenu
          items={items}
          ariaLabel="Engagement models"
          align="left"
          showIndex
          speed={60}
          stretch={0.6}
          magnet={0.25}
          followCursor={0.4}
          duration={0.5}
          textColor="var(--inverse-foreground)"
          bgColor="var(--inverse)"
          marqueeBgColor="var(--gold)"
          marqueeTextColor="var(--gold-foreground)"
          borderColor="var(--inverse-border)"
        />
      )}
    </div>
  );
}
