import { PageMeta } from "@/components/layout/page-meta";
import { CtaBand } from "@/components/sections/cta-band";
import { InsightsList } from "@/components/sections/insights-list";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui";

const metadata = {
  title: "Insights & Resources",
  description: "Practical articles, leadership perspectives, business improvement guides and case studies.",
};

export default function InsightsPage() {
  return (
    <>
      <PageMeta {...metadata} />
      <PageHero
        eyebrow="Insights & resources"
        title="Practical thinking for growing businesses."
        lead="Practical articles, leadership perspectives, business improvement guides and case studies."
      />

      <Section>
        <div className="container-page">
          <InsightsList />
          <p className="mt-10 max-w-[720px] text-sm text-muted-foreground">
            Case studies are anonymised and published only where confidentiality is protected and permission has been
            given. Illustrative business scenarios are clearly labelled as examples rather than actual client results.
          </p>
        </div>
      </Section>

      <CtaBand
        title="Facing one of these challenges?"
        text="Tell us where your business is today and where it needs to go next."
      />
    </>
  );
}
