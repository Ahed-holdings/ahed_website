import { Image } from "@/components/image";
import { Link } from "react-router";
import { useState } from "react";
import { cardClass, cx, LinkArrow, muted } from "../ui";

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

const catClass = "text-eyebrow font-semibold uppercase text-primary";

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
        <Link to="#" className={cx(cardClass, "mb-6 grid overflow-hidden md:grid-cols-[1.1fr_0.9fr]")}>
          <div className="relative min-h-[260px] overflow-hidden md:min-h-[360px]">
            <Image
              src={featured.image}
              alt=""
              fill
              className="object-cover transition-transform duration-900 ease-out-expo group-hover:scale-105"
            />
          </div>
          <div className="grid content-center gap-4 px-8 py-10 md:p-12">
            <span className={catClass}>{featured.label}</span>
            <h2 className="text-[2rem] leading-[1.12] tracking-[-0.025em] transition-colors group-hover:text-primary">
              {featured.title}
            </h2>
            <p className={muted}>{featured.text}</p>
            <LinkArrow inCard>Read article</LinkArrow>
          </div>
        </Link>
      )}

      {/* No scroll-reveal here: cards mount/unmount as the filter changes. */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {visible.map((a) => (
          <Link key={a.title} to="#" className={cx(cardClass, "flex flex-col overflow-hidden")}>
            <div className="relative aspect-[384/200] overflow-hidden">
              <Image
                src={a.image}
                alt=""
                fill
                className="object-cover transition-transform duration-900 ease-out-expo group-hover:scale-107"
              />
            </div>
            <div className="grid flex-1 content-start gap-3 p-[26px]">
              <span className={catClass}>{a.label}</span>
              <h3 className="text-h4 transition-colors group-hover:text-primary">{a.title}</h3>
              <LinkArrow inCard className="mt-auto pt-1.5">
                Read article
              </LinkArrow>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
