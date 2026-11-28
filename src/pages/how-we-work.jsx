import { PageMeta } from "@/components/layout/page-meta";
import { ChartColumn, Compass, Search, Workflow } from "lucide-react";
import { CtaBand } from "@/components/sections/cta-band";
import { EngagementMenu } from "@/components/sections/engagement-menu";
import { PageHero } from "@/components/sections/page-hero";
import { MethodSteps, Section, SectionHead, Timeline } from "@/components/ui";

const metadata = {
  title: "How We Work",
  description:
    "Flexible engagement models, from a one-off business diagnostic to retained advisory and managed support, with scope, duration and fees agreed upfront.",
};

const models = [
  { title: "Business diagnostic", text: "Understand the present position, gaps and priorities." },
  { title: "Defined advisory project", text: "Address a specific problem or deliver a defined outcome." },
  {
    title: "Transformation assignment",
    text: "Support a broader business or functional improvement programme.",
  },
  { title: "Retained advisory", text: "Provide ongoing strategic guidance and management reviews." },
  { title: "Managed services", text: "Deliver agreed recurring activities and reporting." },
  {
    title: "Business establishment",
    text: "Support a new venture from planning through launch and initial stabilisation.",
  },
];

const cycle = [
  {
    title: "Initial discussion",
    text: "A conversation to understand your business, ambitions and immediate concerns.",
  },
  { title: "Assessment", text: "A structured look at the current position, gaps and priorities." },
  { title: "Proposal", text: "A clear recommendation on approach, scope and engagement model." },
  { title: "Agreed scope", text: "Scope, duration, deliverables and fees agreed before work starts." },
  { title: "Implementation support", text: "Working alongside your team to put agreed actions into practice." },
  { title: "Periodic review", text: "Reviewing progress against agreed measures and adjusting course." },
];

export default function HowWeWorkPage() {
  return (
    <>
      <PageMeta {...metadata} />
      <PageHero
        eyebrow="How we work"
        title="Flexible ways to work together."
        lead="Every engagement is shaped around your situation — from a one-off diagnostic to ongoing advisory and managed support."
      />

      <Section>
        <div className="container-page">
          <SectionHead eyebrow="Engagement models" title="Choose the way of working that fits.">
            <p>Scope, duration, deliverables and fees are agreed for each assignment.</p>
          </SectionHead>
          <EngagementMenu models={models} />
        </div>
      </Section>

      <Section tone="inverse">
        <div className="container-page">
          <SectionHead eyebrow="The engagement cycle" title="From first conversation to periodic review." />
          <Timeline items={cycle} />
        </div>
      </Section>

      <Section>
        <div className="container-page">
          <SectionHead eyebrow="Our methodology" title="A practical, four-stage approach.">
            <p>Assessment, recommendations, implementation support, measurement and continuous improvement.</p>
          </SectionHead>
          <MethodSteps icons={[Search, Compass, Workflow, ChartColumn]} />
        </div>
      </Section>

      <CtaBand
        title="Not sure which model fits?"
        text="Start with an initial discussion. We will help you understand where you are and recommend the right way to work together."
      />
    </>
  );
}
