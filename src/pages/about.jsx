import { PageMeta } from "@/components/layout/page-meta";
import { Compass, Gauge, Network, Target, TrendingUp } from "lucide-react";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import {
  Checklist,
  Eyebrow,
  Feature,
  IconCard,
  muted,
  principles,
  Section,
  SectionHead,
  Timeline,
} from "@/components/ui";
import { team } from "@/lib/site";

const metadata = {
  title: "About Us",
  description: "Helping businesses build strong foundations for growth through practical, business-focused advisory.",
};

const values = [
  { icon: Compass, title: "Strategic", text: "Clear direction and informed decisions." },
  { icon: Gauge, title: "Performance-driven", text: "Measurable operational and commercial progress." },
  { icon: Network, title: "Integrated", text: "Connected people, processes, finance and technology." },
  { icon: TrendingUp, title: "Growth-oriented", text: "Stronger foundations for the next stage." },
];

const expertise = [
  "Strategy & business planning",
  "People management & HR",
  "Operations & process improvement",
  "Commercial development",
  "Finance & management reporting",
  "Technology & digital systems",
];

const cycle = [
  "Initial discussion",
  "Assessment",
  "Proposal",
  "Agreed scope",
  "Implementation support",
  "Periodic review",
];

/**
 * "Our team" heading + cards: hidden for now (by request) until the client sends real names and profiles.
 * Set to true to show them again; the data is `team` in lib/site.js.
 */
const SHOW_TEAM = false;

export default function AboutPage() {
  return (
    <>
      <PageMeta {...metadata} />
      <PageHero
        eyebrow="About us"
        title="Helping Businesses Build Strong Foundations for Growth"
        lead="Every business reaches a point where its next stage of growth requires more than hard work and ambition. It requires clearer direction, stronger management practices, capable people and systems that can keep pace with change."
      />

      <Section>
        <div className="container-page grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <div
            data-reveal
            data-inverse
            className="grid gap-6 rounded-media bg-inverse p-8 text-inverse-foreground sm:p-12"
          >
            <Eyebrow>Our belief</Eyebrow>
            <blockquote className="text-[1.4rem] leading-[1.3] font-medium tracking-[-0.015em] sm:text-[1.75rem]">
              “Better businesses are built when sound strategy is supported by capable people, disciplined execution and
              systems that work.”
            </blockquote>
          </div>
          <div data-reveal className="grid gap-5">
            <Eyebrow>Our practice</Eyebrow>
            <h2 className="text-h2">Practical, business-focused advisory.</h2>
            <p className={muted}>
              Our advisory practice works with business owners and leadership teams to address these challenges through
              practical, business-focused solutions.
            </p>
            <p className={muted}>
              We bring together perspectives from strategy, people management, operations, commercial development,
              finance and technology to help organisations understand their priorities and make better-informed
              decisions.
            </p>
            <p className={muted}>
              Our approach is collaborative and grounded in the realities of each business. We aim to develop solutions
              that are appropriate to the organisation’s needs, resources and ambitions, while helping its people build
              the confidence and capability to sustain progress.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        {/* Navy cards on the off-white section (data-inverse turns IconCard raised navy: white text, gold eyebrow) */}
        <div data-stagger data-inverse className="container-page grid gap-6 sm:grid-cols-2">
          <IconCard
            large
            icon={Target}
            eyebrow="Our purpose"
            title="From ambition to structured, sustainable performance."
          >
            We help businesses make the transition from ambition to structured, sustainable performance — with clearer
            direction, capable people and systems that keep pace with growth.
          </IconCard>
          <IconCard
            large
            icon={Compass}
            eyebrow="Our business philosophy"
            title="Strategy, people, operations, finance and technology — together."
          >
            Business challenges rarely exist in isolation. We consider the whole business, design proportionate
            solutions and stay focused on what can actually be implemented.
          </IconCard>
        </div>
      </Section>

      {/* What defines us: heading left (pinned from lg), one navy panel right split 2 × 2 by hairlines
          (gap-px over the border colour). Each cell: gold icon + number, title, line; gold rule draws in on hover. */}
      <Section>
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div data-reveal className="grid content-start gap-5 lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>What defines us</Eyebrow>
            <h2 className="text-h2">Four principles behind every engagement.</h2>
            <p className={muted}>
              The qualities that shape how we work with every client, whatever the size or scope of the engagement.
            </p>
          </div>
          <div
            data-inverse
            data-stagger
            className="grid gap-px overflow-hidden rounded-media bg-inverse-border text-inverse-foreground sm:grid-cols-2"
          >
            {values.map((v, i) => (
              <article key={v.title} className="group relative grid content-start gap-3 bg-inverse p-7 sm:p-8 lg:p-9">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-400 ease-out-expo group-hover:scale-x-100"
                />
                <div className="mb-6 flex items-center justify-between">
                  <v.icon aria-hidden strokeWidth={1.5} className="size-8 text-inverse-accent" />
                  <span className="text-eyebrow font-semibold tracking-widest text-inverse-muted tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-h3 transition-colors duration-280 group-hover:text-inverse-accent">{v.title}</h3>
                <p className="text-inverse-muted">{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* Our team: three people as cards, name + role + short profile, no photos (data: `team` in lib/site.js).
          Hidden while SHOW_TEAM is false: the section then shows only the areas of expertise. */}
      <Section tone="muted">
        <div className="container-page">
          {SHOW_TEAM && (
            <>
              <SectionHead eyebrow="Our team" title="The people behind the practice.">
                <p>
                  A small team bringing together experience across strategy, people, operations, finance and
                  technology.
                </p>
              </SectionHead>
              <div data-stagger className="grid gap-5 md:grid-cols-3 lg:gap-6">
            {team.map((person, i) => (
              <article
                key={i} // placeholder names repeat until the real ones are in
                className="grid content-start gap-4 rounded-card border border-border bg-card p-6 sm:p-7"
              >
                <span aria-hidden className="h-0.5 w-10 bg-gold" />
                <div className="grid gap-1">
                  <h3 className="text-h3">{person.name}</h3>
                  <p className="text-sm font-semibold text-primary">{person.role}</p>
                </div>
                <p className={muted}>{person.bio}</p>
              </article>
            ))}
              </div>
            </>
          )}
          <div
            data-reveal
            className={SHOW_TEAM ? "mt-10 grid gap-4 border-t border-border pt-8 md:mt-12" : "grid gap-4"}
          >
            <Eyebrow line={!SHOW_TEAM} tone={SHOW_TEAM ? "foreground" : undefined}>
              Professional experience &amp; areas of expertise
            </Eyebrow>
            <Checklist items={expertise} />
          </div>
        </div>
      </Section>

      {/* Compact on request: tighter padding, compact principle rows in two columns from sm */}
      <Section tone="inverse" compact>
        <div className="container-page grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div data-reveal className="grid content-start gap-5">
            <Eyebrow>How we approach client engagements</Eyebrow>
            <h2 className="text-h2">Collaborative, structured, grounded in reality.</h2>
            <Timeline compact items={cycle.map((title) => ({ title }))} />
          </div>
          <div data-reveal>
            <Eyebrow>Values and working principles</Eyebrow>
            <div className="mt-4 grid gap-x-8 sm:grid-cols-2">
              {principles.map((p) => (
                <Feature key={p.title} title={p.title} compact>
                  {p.text}
                </Feature>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Let’s talk about where your business is heading."
        text="Every engagement starts with a conversation. Tell us about your plans and challenges, and we will help you understand where you are and what needs to change."
      />
    </>
  );
}
