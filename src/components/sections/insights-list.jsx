import { Image } from "@/components/image";
import { Link } from "react-router";
import { useState } from "react";
import { cardClass, cx, LinkArrow } from "../ui";

const filters = [
  { id: "all", label: "All" },
  { id: "systems", label: "Management systems" },
  { id: "family", label: "Family business" },
  { id: "performance", label: "Performance" },
  { id: "finance", label: "Finance" },
  { id: "technology", label: "Technology" },
];

// TODO: articles are not written yet — cards link to "#" until article pages exist.
const featured = {
  cat: "systems",
  label: "Featured · Management systems",
  title: "Why Growing Businesses Need Better Management Systems",
  text: "As businesses grow, informal ways of working stop scaling. A look at the management systems that help leadership teams keep control without slowing down.",
  image: "/img/performance.webp",
};

const articles = [
  {
    cat: "family",
    label: "Family business",
    title: "When Should a Family Business Professionalise Its Operations?",
    image: "/img/people.webp",
  },
  {
    cat: "performance",
    label: "Performance",
    title: "How to Build an Effective KPI and MIS Framework",
    image: "/img/performance.webp",
  },
  {
    cat: "technology",
    label: "Technology",
    title: "Why ERP Implementation Often Fails to Solve Business Problems",
    image: "/img/digital.webp",
  },
  {
    cat: "finance",
    label: "Finance",
    title: "How to Improve Profitability Without Simply Cutting Costs",
    image: "/img/finance.webp",
  },
  {
    cat: "performance",
    label: "Sales",
    title: "Building a Sales Process That Does Not Depend on One Person",
    image: "/img/strategy.webp",
  },
  {
    cat: "systems",
    label: "New ventures",
    title: "What Should Be Included in a 90-Day Business Establishment Plan?",
    image: "/img/strategy.webp",
  },
  {
    cat: "systems",
    label: "Operations",
    title: "How to Decide Between In-House Teams and Outsourced Services",
    image: "/img/managed.webp",
  },
  {
    cat: "finance",
    label: "Finance",
    title: "How Better Financial Reporting Supports Business Growth",
    image: "/img/finance.webp",
  },
  {
    cat: "family",
    label: "Management systems",
    title: "Moving from Founder-Dependent Operations to Structured Management",
    image: "/img/people.webp",
  },
];

/** Category label on the photo cards: gold on the navy shade. */
const catClass = "text-eyebrow font-semibold uppercase text-inverse-accent";

/**
 * Photo card shell: the photo fills the card under a navy shade (darkest at the bottom, behind the text), the text
 * sits on top. `data-inverse` gives the card, its border and "Read article" their navy styles.
 */
const photoCard = cx(cardClass, "relative isolate flex flex-col justify-end overflow-hidden text-inverse-foreground");

function CardPhoto({ src }) {
  return (
    <>
      <Image
        src={src}
        alt=""
        fill
        className="-z-20 object-cover transition-transform duration-900 ease-out-expo group-hover:scale-105"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-inverse from-25% via-inverse/75 to-inverse/20"
      />
    </>
  );
}

export function InsightsList() {
  const [filter, setFilter] = useState("all");
  const show = (cat) => filter === "all" || filter === cat;
  const visible = articles.filter((a) => show(a.cat));

  return (
    <>
      <div
        role="group"
        aria-label="Filter articles"
        className="mb-10 flex flex-wrap gap-x-7 gap-y-2 border-b border-border"
      >
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={cx(
              "-mb-px cursor-pointer border-b-2 pb-3.5 text-btn font-medium transition-colors duration-280",
              filter === f.id
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {show(featured.cat) && (
        <Link to="#" data-inverse className={cx(photoCard, "mb-6 min-h-[400px] md:min-h-[460px]")}>
          <CardPhoto src={featured.image} />
          <div className="grid max-w-[44rem] gap-4 p-7 sm:p-10 md:p-12">
            <span className={catClass}>{featured.label}</span>
            <h2 className="text-[1.75rem] leading-[1.12] tracking-[-0.025em] transition-colors duration-280 group-hover:text-inverse-accent sm:text-[2.25rem]">
              {featured.title}
            </h2>
            <p className="text-inverse-foreground/80">{featured.text}</p>
            <LinkArrow inCard>Read article</LinkArrow>
          </div>
        </Link>
      )}

      {/* No scroll-reveal here: cards mount/unmount as the filter changes. */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {visible.map((a) => (
          <Link key={a.title} to="#" data-inverse className={cx(photoCard, "min-h-[340px]")}>
            <CardPhoto src={a.image} />
            <div className="grid gap-3 p-6 sm:p-7">
              <span className={catClass}>{a.label}</span>
              <h3 className="text-h3 transition-colors duration-280 group-hover:text-inverse-accent">{a.title}</h3>
              <LinkArrow inCard className="pt-1">
                Read article
              </LinkArrow>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
