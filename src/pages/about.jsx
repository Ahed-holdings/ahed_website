import { PageMeta } from "@/components/layout/page-meta";
import { Compass, Gauge, Network, Target, TrendingUp, Users } from "lucide-react";
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
        <div data-stagger className="container-page grid gap-6 sm:grid-cols-2">
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

      <Section>
        <div className="container-page">
          <SectionHead eyebrow="What defines us" title="Four principles behind every engagement." />
          <div data-stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <IconCard key={v.title} icon={v.icon} title={v.title}>
                {v.text}
              </IconCard>
            ))}
          </div>
        </div>
      </Section>

      {/* TODO: replace founder placeholders with real name, bio and photo */}
      <Section tone="muted">
        <div className="container-page grid items-center gap-10 md:grid-cols-[minmax(0,0.75fr)_1fr] md:gap-12 lg:grid-cols-[420px_1fr] lg:gap-[72px]">
          <div
            data-reveal
            className="grid aspect-[420/500] place-items-center rounded-media bg-accent-soft text-center text-primary"
          >
            <div>
              <Users aria-hidden strokeWidth={1.5} className="mx-auto size-7" />
              <p className="mt-2 text-sm">Founder photo</p>
            </div>
          </div>
          <div data-reveal className="grid gap-5">
            <Eyebrow>Founder / principal consultant</Eyebrow>
            <h2 className="text-h2">[Founder Name]</h2>
            <p className="text-lead text-muted-foreground">
              [Short profile — professional background, leadership experience and the reason for founding the practice.
              Keep it factual and specific.]
            </p>
            <Eyebrow line={false} tone="foreground" className="mt-2">
              Professional experience &amp; areas of expertise
            </Eyebrow>
            <Checklist items={expertise} />
          </div>
        </div>
      </Section>

      <Section tone="inverse">
        <div className="container-page grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div data-reveal className="grid content-start gap-7">
            <Eyebrow>How we approach client engagements</Eyebrow>
            <h2 className="text-h2">Collaborative, structured, grounded in reality.</h2>
            <Timeline compact items={cycle.map((title) => ({ title }))} />
          </div>
          <div data-reveal>
            <Eyebrow>Values and working principles</Eyebrow>
            <div className="mt-5">
              {principles.map((p) => (
                <Feature key={p.title} title={p.title}>
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
