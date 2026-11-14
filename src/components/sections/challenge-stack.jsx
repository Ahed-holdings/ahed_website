import { useCallback, useEffect, useState } from "react";
import CardSwap, { Card } from "./card-swap";

/** True while the media query matches (updates on resize/rotate). */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/**
 * The home page's business challenges as a CardSwap stack of navy cards: the front card swaps to the back
 * every 2.5s (paused on hover), and visitors can click, drag or use the arrow keys.
 * Phones get smaller cards with tighter offsets so the text stays readable after the stack is scaled to fit.
 */
export function ChallengeStack({ items }) {
  const phone = useMediaQuery("(max-width: 39.99rem)");
  const total = String(items.length).padStart(2, "0");

  const layout = phone
    ? { width: 300, height: 280, cardDistance: 24, verticalDistance: 30, depth: 70, visibleCards: 3 }
    : { width: 440, height: 300, cardDistance: 60, verticalDistance: 70, depth: 90, visibleCards: 4 };

  // Progress bar: restarts (new `run`) each time the stack's autoplay timer starts; empty while it is stopped
  const [timer, setTimer] = useState({ ms: 0, run: 0 });
  const onTimer = useCallback((ms) => setTimer((t) => ({ ms, run: ms ? t.run + 1 : t.run })), []);

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1">
        <CardSwap
          {...layout}
          onTimer={onTimer}
          label="Business challenges"
          theme="navy"
          skewAmount={6}
          cardRadius={16}
          delay={2500}
          speed={1}
          bounce={0.35}
          parallax={0.5}
          hoverSpread={0.12}
          dim={0.5}
          autoplay
          pauseOnHover
          draggable
        >
          {items.map(({ icon: Icon, title, text }, i) => (
            <Card key={title}>
              <div className="flex h-full flex-col p-7 sm:p-8">
                <div className="flex items-center justify-between">
                  <Icon aria-hidden strokeWidth={1.5} className="size-8 text-gold" />
                  <span className="text-eyebrow font-semibold text-inverse-muted">
                    {String(i + 1).padStart(2, "0")} / {total}
                  </span>
                </div>
                <h3 className="mt-auto text-h3 text-white">{title}</h3>
                <p className="mt-2 text-inverse-muted">{text}</p>
              </div>
            </Card>
          ))}
        </CardSwap>
      </div>

      {/* Minimal autoplay progress: thin track, gold fill over the time to the next card. Hidden with reduced
          motion, where there is no autoplay. */}
      <div
        aria-hidden
        className="mx-auto mt-2 h-0.5 w-40 shrink-0 overflow-hidden rounded-full bg-border motion-reduce:hidden"
      >
        {timer.ms > 0 && (
          <div
            key={timer.run}
            className="h-full origin-left rounded-full bg-gold"
            style={{ animation: `progress-fill ${timer.ms}ms linear forwards` }}
          />
        )}
      </div>
    </div>
  );
}
