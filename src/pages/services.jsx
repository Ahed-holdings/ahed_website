import { PageMeta } from "@/components/layout/page-meta";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceGrid } from "@/components/sections/service-card";
import { ButtonLink, cardClass, Eyebrow, muted, Section, SectionHead } from "@/components/ui";
import { services } from "@/lib/site";

const metadata = {
  title: "Services",
  description:
    "Strategy, performance, people, digital, finance and managed services — connected capabilities for one business objective.",
};

const objective = [
  ["Strategy", "sets the direction"],
  ["People", "build the capability"],
  ["Processes", "make performance repeatable"],
  ["Finance", "provides control and visibility"],
  ["Technology", "connects and scales it all"],
];

export default function ServicesPage() {
  return (
    <>
      <PageMeta {...metadata} />
      <PageHero
        eyebrow="Our services"
        title="Connected capabilities. One business objective."
        lead="Business challenges rarely exist in isolation. A growth strategy may require a new operating model, stronger leadership, better financial controls and the right technology."
      />

      <Section>
        <div className="container-page">
          <SectionHead
            eyebrow="Six service areas"
            title="From identifying problems to implementing meaningful improvements."
          >
            <p>
              Our advisory capabilities bring these elements together to help businesses move from identifying problems
              to implementing meaningful improvements. Each service area has its own scope, typical engagements and
              enquiry route.
            </p>
          </SectionHead>
          <ServiceGrid services={services} navy />
        </div>
      </Section>

      <Section tone="muted">
        <div className="container-page grid items-center gap-10 md:grid-cols-2 md:gap-20">
          <div data-reveal className="grid gap-6">
            <Eyebrow>Not sure where to start?</Eyebrow>
            <h2 className="text-h2">Begin with a business diagnostic.</h2>
            <p className="text-lead text-muted-foreground">
              A diagnostic helps us understand your present position, gaps and priorities — so the right combination of
              services can be agreed before any wider work begins.
            </p>
            <div>
              <ButtonLink href="/how-we-work" variant="dark">
                See how we work
              </ButtonLink>
            </div>
          </div>
          <div data-reveal className={`${cardClass} p-9`}>
            <Eyebrow>One business objective</Eyebrow>
            <ul className="mt-3">
              {objective.map(([term, text]) => (
                <li key={term} className="flex items-baseline gap-3 border-b border-border py-3.5">
                  <strong className="font-semibold">{term}</strong>
                  <span className={muted}>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
