import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { Image } from "@/components/image";
import { serviceHref } from "@/lib/site";
import { Eyebrow, LinkArrow } from "../ui";
import ScrollStack, { ScrollStackItem } from "./scroll-stack";

const HEADER = 78; // fixed site header height (logo + menu button row)
const STACK_GAP = 14; // how far each card rests below the one before it
const MD = "(min-width: 56.25rem)"; // md breakpoint (900px)

/**
 * Home "Our services": heading on top, the six services below as a ScrollStack of navy cards.
 * md+: the heading stays pinned just under the header while the cards slide up and stack directly beneath it.
 *   The stack's pin position is measured from the heading (it changes with the screen width), and the cards'
 *   height shrinks to whatever room is left on screen so the finished stack always fits (e.g. 1366×768 laptops).
 * Phones: the heading is too tall to pin, so it scrolls away and the stack pins 16% from the top.
 * Uses the page's own scroll (useWindowScroll) with smoothScroll off, so the rest of the page scrolls normally.
 */
export function ServicesShowcase({ eyebrow, title, children, services }) {
  const headingRef = useRef(null);
  const stackRef = useRef(null);
  const [stackTop, setStackTop] = useState(null); // px from the top of the screen, md+ only
  // Height of the finished stack below the heading. Added as margin-bottom on the pinned heading (and taken
  // back off the stack with the same negative margin-top), so the heading lets go exactly when the finished
  // stack starts scrolling away: they leave together instead of the cards sliding up under the heading.
  const [release, setRelease] = useState(0);

  useLayoutEffect(() => {
    const heading = headingRef.current;
    const mq = window.matchMedia(MD);
    const measure = () => {
      if (!mq.matches || !heading) {
        setStackTop(null);
        setRelease(0);
        return;
      }
      setStackTop(HEADER + heading.offsetHeight + 8);
      const card = stackRef.current?.querySelector("[data-stack-slot]");
      setRelease(card ? 8 + (services.length - 1) * STACK_GAP + card.offsetHeight : 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(heading);
    if (stackRef.current) ro.observe(stackRef.current);
    mq.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
    };
  }, [services.length]);

  const offsets = (services.length - 1) * STACK_GAP;
  // md+: cards as tall as fits below the pinned heading (max 20rem, at least 16rem; reduced on request from 24/18)
  const cardStyle =
    stackTop == null ? undefined : { height: `clamp(16rem, calc(100svh - ${stackTop + offsets + 24}px), 20rem)` };

  return (
    <>
      {/* Pinned heading (md+). Its white background hides cards passing underneath before they settle. */}
      <div
        ref={headingRef}
        style={release ? { marginBottom: release } : undefined}
        className="z-20 grid items-end gap-5 bg-background pb-6 md:sticky md:top-[78px] md:grid-cols-[1.1fr_0.9fr] md:gap-12 md:pt-4"
      >
        <div className="grid gap-[18px]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-h2">{title}</h2>
        </div>
        <div className="grid gap-3 text-muted-foreground">{children}</div>
      </div>

      <div ref={stackRef} style={release ? { marginTop: -release } : undefined}>
        <ServiceStack services={services} stackPosition={stackTop ?? "16%"} cardStyle={cardStyle} />
      </div>
    </>
  );
}

/**
 * The service cards. Each card is one link to its service page: the photo fills the card as a background under a
 * navy gradient shade (darkest behind the text: left from md, bottom on phones), with the text on top.
 */
export function ServiceStack({ services, stackPosition = "16%", cardStyle }) {
  const total = String(services.length).padStart(2, "0");
  return (
    <ScrollStack
      useWindowScroll
      smoothScroll={false}
      stackPosition={stackPosition}
      itemDistance={28}
      itemStackDistance={STACK_GAP}
      itemScale={0.04}
      baseScale={0.86}
      dimAmount={0.12}
      holdDistance={40}
    >
      {services.map((s, i) => (
        <ScrollStackItem
          key={s.slug}
          tone="navy"
          itemClassName="h-[23rem] md:h-[19rem] lg:h-[20rem]"
          style={cardStyle}
        >
          {/* Photo fills the card as a background, under a navy shade; the text sits on top */}
          <Link to={serviceHref(s.slug)} className="group relative isolate block h-full overflow-hidden">
            <Image
              src={s.image}
              alt={s.imageAlt ?? ""}
              fill
              className="-z-20 object-cover transition-transform duration-900 ease-out-expo group-hover:scale-105"
            />
            {/* Shade: darkest behind the text (bottom on phones, left from md), photo softly visible beyond it */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-linear-to-t from-inverse from-35% via-inverse/85 to-inverse/65 md:bg-linear-to-r md:from-inverse md:from-30% md:via-inverse/80 md:to-inverse/35"
            />
            <div className="flex h-full flex-col gap-3 p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <p className="max-w-[46ch] text-sm text-inverse-accent">{s.tags}</p>
                <span className="shrink-0 text-eyebrow font-semibold text-inverse-muted">
                  {String(i + 1).padStart(2, "0")} / {total}
                </span>
              </div>
              <div className="mt-auto grid max-w-[36rem] gap-3">
                <h3 className="text-h3 transition-colors duration-280 group-hover:text-inverse-accent sm:text-h2">
                  {s.title}
                </h3>
                <p className="line-clamp-3 text-inverse-foreground/80">{s.summary}</p>
                <LinkArrow inCard className="pt-2">
                  Explore service
                </LinkArrow>
              </div>
            </div>
          </Link>
        </ScrollStackItem>
      ))}
    </ScrollStack>
  );
}
