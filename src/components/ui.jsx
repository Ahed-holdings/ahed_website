import { Link } from "react-router";
import { ArrowRight, Check } from "lucide-react";

export const cx = (...c) => c.filter(Boolean).join(" ");

/** Delay for a single [data-reveal] element, e.g. <div data-reveal style={delay(100)}>. */
export const delay = (ms) => ({ "--d": `${ms}ms` });

/* ---------- Text ---------- */

const eyebrowTones = {
  accent: "text-primary inverse:text-inverse-accent",
  /** For a white card placed inside a navy section: always the text-safe bronze */
  accentOnLight: "text-primary",
  muted: "text-muted-foreground",
  foreground: "text-foreground",
};

export function Eyebrow({ children, line = true, tone = "accent", className }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2.5 text-eyebrow font-semibold uppercase",
        eyebrowTones[tone],
        line && "before:h-[1.5px] before:w-5 before:bg-current before:content-['']",
        className,
      )}
    >
      {children}
    </span>
  );
}

export const muted = "text-muted-foreground inverse:text-inverse-muted";

/* ---------- Buttons & links ---------- */

const buttonVariants = {
  primary: "border-transparent bg-gold text-gold-foreground hover:bg-gold-hover",
  dark: "border-transparent bg-inverse text-inverse-foreground hover:bg-gold hover:text-gold-foreground",
  // `secondary` and `light` were white buttons; on request every white CTA is now brand gold, like `primary`
  secondary: "border-transparent bg-gold text-gold-foreground hover:bg-gold-hover",
  light: "border-transparent bg-gold text-gold-foreground hover:bg-gold-hover",
  ghostLight: "border-white/30 text-inverse-foreground hover:border-white",
};

export const buttonClass = (variant = "primary") =>
  cx(
    "group/btn inline-flex cursor-pointer items-center gap-2.5 rounded-btn border px-[22px] py-[15px]",
    "text-btn leading-none font-semibold sm:whitespace-nowrap",
    "transition-colors duration-280 ease-out-expo active:translate-y-px",
    "disabled:cursor-not-allowed disabled:opacity-60",
    buttonVariants[variant],
  );

const Arrow = ({ className }) => (
  <ArrowRight
    aria-hidden
    className={cx("size-4 shrink-0 transition-transform duration-280 ease-out-expo", className)}
  />
);

export function ButtonLink({ href, variant, arrow = true, children }) {
  return (
    <Link to={href} className={buttonClass(variant)}>
      {children}
      {arrow && <Arrow className="group-hover/btn:translate-x-1" />}
    </Link>
  );
}

export function ButtonArrow() {
  return <Arrow className="group-hover/btn:translate-x-1" />;
}

/** "Explore service →" style link. Pass `inCard` when the whole card is the link. */
export function LinkArrow({ children, href, inCard, className }) {
  const cls = cx(
    "inline-flex items-center gap-2 text-btn font-semibold transition-[gap,color] duration-280 ease-out-expo",
    // Hover colour: bronze on light, gold inside navy (data-inverse) where bronze is too dark
    inCard
      ? "group-hover:gap-3.5 group-hover:text-primary inverse:group-hover:text-inverse-accent"
      : "hover:gap-3.5 hover:text-primary inverse:hover:text-inverse-accent",
    className,
  );
  return href ? (
    <Link to={href} className={cls}>
      {children}
      <Arrow />
    </Link>
  ) : (
    <span className={cls}>
      {children}
      <Arrow />
    </span>
  );
}

/* ---------- Layout ---------- */

/** `compact`: tighter top/bottom padding (section-y-sm instead of section-y). */
export function Section({ tone = "default", compact, className, children, ...rest }) {
  return (
    <section
      data-inverse={tone === "inverse" ? "" : undefined}
      className={cx(
        compact ? "section-y-sm" : "section-y",
        tone === "muted" && "bg-muted",
        tone === "inverse" && "bg-inverse text-inverse-foreground",
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}

export function SectionHead({ eyebrow, title, children }) {
  return (
    <div className="mb-10 grid items-end gap-5 md:mb-14 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
      <div data-reveal className="grid gap-[18px]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-h2">{title}</h2>
      </div>
      {children && (
        <div data-reveal style={delay(100)} className={cx("grid gap-4", muted)}>
          {children}
        </div>
      )}
    </div>
  );
}

/* ---------- Cards ---------- */

/** Card surface. Inside a navy section ([data-inverse]) it becomes raised navy with a navy hairline. */
export const cardClass = cx(
  "group rounded-card border border-border bg-card inverse:border-inverse-border inverse:bg-inverse-raised",
  "transition-[border-color,box-shadow,translate] duration-280 ease-out-expo",
  "hover:-translate-y-[3px] hover:border-gold hover:shadow-hover",
);

const iconCardIcon =
  "text-foreground transition-[color,translate] duration-280 ease-out-expo group-hover:-translate-y-0.5 group-hover:text-primary inverse:text-inverse-foreground inverse:group-hover:text-inverse-accent";

/** `compact`: icon beside the title instead of above it, and tighter padding (for dense rows of cards). */
export function IconCard({ icon: Icon, title, children, eyebrow, large, compact }) {
  if (compact) {
    return (
      <article className={cx(cardClass, "grid content-start gap-3 px-6 py-6 inverse:text-inverse-foreground")}>
        <div className="flex items-start gap-3">
          <Icon aria-hidden strokeWidth={1.5} className={cx("mt-0.5 size-6 shrink-0", iconCardIcon)} />
          <h3 className="text-h4">{title}</h3>
        </div>
        <p className={muted}>{children}</p>
      </article>
    );
  }
  return (
    <article
      className={cx(
        cardClass,
        "grid content-start gap-3 inverse:text-inverse-foreground",
        large ? "p-8 sm:p-11" : "px-7 py-8",
      )}
    >
      <Icon aria-hidden strokeWidth={1.5} className={cx("mb-3.5 size-7", iconCardIcon)} />
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h3 className={large ? "text-h3" : "text-h4"}>{title}</h3>
      <p className={muted}>{children}</p>
    </article>
  );
}

/* ---------- Lists ---------- */

/** Two columns only when the list itself is wide enough (container query), wherever it is placed. */
export function Checklist({ items, className }) {
  return (
    <div className="@container">
      <ul data-stagger className={cx("grid gap-x-8 @[30rem]:grid-cols-2", className)}>
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3.5 border-b border-border py-3.5">
            <Check aria-hidden strokeWidth={2} className="mt-1 size-[18px] shrink-0 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const principles = [
  {
    title: "Business-first thinking",
    text: "Recommendations are connected to commercial objectives and practical constraints.",
  },
  {
    title: "Integrated perspective",
    text: "Strategy, people, operations, finance and technology are considered together.",
  },
  { title: "Practical implementation", text: "Advice is designed to be applied, not simply presented in a report." },
  {
    title: "Proportionate solutions",
    text: "Systems and structures are designed around the organisation’s size, maturity and resources.",
  },
  {
    title: "Clear accountability",
    text: "Priorities, responsibilities and performance measures are established wherever appropriate.",
  },
  {
    title: "Long-term capability",
    text: "The objective is to leave the organisation better equipped to manage its own growth.",
  },
];

/** `compact`: tighter padding and gaps (dense lists, e.g. home "Why work with us?"). */
export function Feature({ title, children, compact }) {
  return (
    <div
      className={cx(
        "flex border-t border-border inverse:border-inverse-border",
        compact ? "gap-3.5 py-4" : "gap-[18px] py-[26px]",
      )}
    >
      <Check
        aria-hidden
        strokeWidth={2}
        className="mt-0.5 size-[22px] shrink-0 text-primary inverse:text-inverse-accent"
      />
      <div className={cx("grid", compact ? "gap-1" : "gap-1.5")}>
        <h3 className="text-h4">{title}</h3>
        <p className={muted}>{children}</p>
      </div>
    </div>
  );
}

/* ---------- Methodology steps ---------- */

const methodSteps = [
  { title: "Understand", text: "Assess the business, its challenges, current capabilities and strategic objectives." },
  {
    title: "Define priorities",
    text: "Identify the changes that matter most and develop a practical, prioritised roadmap.",
  },
  {
    title: "Enable implementation",
    text: "Support leadership and teams in putting agreed processes, systems and actions into practice.",
  },
  {
    title: "Measure and improve",
    text: "Review progress against agreed measures, address gaps and strengthen long-term capability.",
  },
];

export function MethodSteps({ icons }) {
  return (
    <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {methodSteps.map((step, i) => {
        const Icon = icons[i];
        return (
          <div
            key={step.title}
            data-observe
            className={cx(
              "relative grid content-start gap-3.5 border-t border-border pt-7",
              "before:absolute before:-top-px before:left-0 before:h-0.5 before:w-0 before:bg-gold before:content-['']",
              "before:transition-[width] before:duration-600 before:ease-out-expo hover:before:w-full data-visible:before:w-full",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-eyebrow font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
              <Icon aria-hidden strokeWidth={1.5} className="size-7 text-muted-foreground" />
            </div>
            <h3 className="text-h3">{step.title}</h3>
            <p className={muted}>{step.text}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Engagement timeline (dark sections) ---------- */

export function Timeline({ items, compact }) {
  return (
    <ol
      data-stagger={compact ? undefined : ""}
      className={cx(
        "relative grid grid-cols-2 gap-x-4 gap-y-8",
        compact
          ? "sm:grid-cols-3"
          : "sm:grid-cols-3 lg:grid-cols-6 lg:before:absolute lg:before:inset-x-[18px] lg:before:top-[18px] lg:before:h-px lg:before:bg-inverse-border lg:before:content-['']",
      )}
    >
      {items.map((item, i) => (
        <li key={item.title} className="relative grid content-start gap-3">
          <span className="relative grid size-9 place-items-center rounded-full border-[1.5px] border-inverse-accent bg-inverse text-xs font-semibold text-inverse-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          {item.text ? (
            <>
              <h3 className="text-h4">{item.title}</h3>
              <p className={cx("text-sm", muted)}>{item.text}</p>
            </>
          ) : (
            <span className="text-h4 font-semibold">{item.title}</span>
          )}
        </li>
      ))}
    </ol>
  );
}
