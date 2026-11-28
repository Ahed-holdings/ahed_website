import { PageMeta } from "@/components/layout/page-meta";
import { Box, Coffee, Cpu, Factory, House, Rocket, ShoppingBag } from "lucide-react";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink, Checklist, Eyebrow, IconCard, muted, Section, SectionHead } from "@/components/ui";

const metadata = {
  title: "Industries & Business Challenges",
  description:
    "Advisory for manufacturing, FMCG, retail, technology, hospitality and family-owned businesses in Kerala and Gujarat, from growing SMEs to new ventures.",
};

const sectors = [
  {
    icon: Factory,
    title: "Manufacturing and processing",
    text: "Production planning, cost control and operational discipline.",
  },
  {
    icon: Box,
    title: "FMCG, food and distribution",
    text: "Supply chain, distribution and working-capital pressures.",
  },
  {
    icon: ShoppingBag,
    title: "Retail and consumer businesses",
    text: "Multi-outlet control, margins and customer-facing teams.",
  },
  { icon: Cpu, title: "Software and technology services", text: "Scaling delivery, people and commercial processes." },
  {
    icon: House,
    title: "Family-owned and promoter-led enterprises",
    text: "Professionalisation, governance and succession readiness.",
  },
  { icon: Rocket, title: "Start-ups and growing SMEs", text: "Building structure without slowing momentum." },
  {
    icon: Coffee,
    title: "Hospitality and service businesses",
    text: "Service standards, staffing and unit economics.",
  },
];

const situations = [
  "Establishing a new venture",
  "Preparing for rapid growth",
  "Improving profitability and operational control",
  "Professionalising a family business",
  "Reorganising management and responsibilities",
  "Implementing ERP, CRM or other business systems",
  "Strengthening finance and reporting",
  "Expanding into new markets",
];

export default function IndustriesPage() {
  return (
    <>
      <PageMeta {...metadata} />
      <PageHero
        eyebrow="Industries & challenges"
        title="Who we serve, and the situations where we add value."
        lead="We focus on the types of businesses and challenges we understand — so you can recognise your own situation, even if you don’t identify with a particular industry."
      />

      <Section>
        <div className="container-page">
          <SectionHead eyebrow="Sectors" title="Types of businesses we work with.">
            <p>Featured where supported by our experience and professional network.</p>
          </SectionHead>
          <div data-stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((s) => (
              <IconCard key={s.title} icon={s.icon} title={s.title}>
                {s.text}
              </IconCard>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <div className="container-page grid items-start gap-10 lg:grid-cols-[380px_1fr] lg:gap-20">
          <div data-reveal className="grid content-start gap-5">
            <Eyebrow>By business situation</Eyebrow>
            <h2 className="text-h2">Recognise your situation.</h2>
            <p className={muted}>
              Many clients come to us at a turning point rather than because of their industry. If one of these sounds
              familiar, we should talk.
            </p>
            <div>
              <ButtonLink href="/contact" variant="primary">
                Discuss your situation
              </ButtonLink>
            </div>
          </div>
          <Checklist items={situations} />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
