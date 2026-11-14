import { Image } from "@/components/image";
import { useParams } from "react-router";
import { PageMeta } from "@/components/layout/page-meta";
import { Shield } from "lucide-react";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink, Checklist, Eyebrow, IconCard, LinkArrow, muted, Section, SectionHead } from "@/components/ui";
import { serviceHref, services } from "@/lib/site";
import NotFoundPage from "./not-found";

const getService = (slug) => services.find((s) => s.slug === slug);

export default function ServicePage() {
  const service = getService(useParams().slug);
  if (!service) return <NotFoundPage />;

  const others = services.filter((s) => s.slug !== service.slug);
  const lower = service.title.toLowerCase();

  return (
    <>
      <PageMeta title={service.title} description={service.summary} />
      <PageHero
        eyebrow={service.title}
        title={service.heroTitle}
        lead={service.summary}
        image={service.image}
      />

      {service.intro && (
        <Section>
          <div className="container-page grid items-start gap-10 md:grid-cols-2 md:gap-20">
            <div data-reveal className="grid gap-[18px]">
              <Eyebrow>What we mean by managed services</Eyebrow>
              <h2 className="text-h2">{service.intro.title}</h2>
            </div>
            <div data-reveal className="grid gap-5">
              <p className="text-[1.6rem] leading-[1.35] font-medium tracking-[-0.015em]">{service.intro.statement}</p>
              <p className={muted}>{service.intro.text}</p>
            </div>
          </div>
        </Section>
      )}

      <Section tone={service.intro ? "muted" : "default"}>
        <div className="container-page grid items-start gap-10 lg:grid-cols-[380px_1fr] lg:gap-20">
          <div data-reveal className="grid content-start gap-6 lg:sticky lg:top-[110px]">
            <Eyebrow>{service.offeringsEyebrow ?? "What we offer"}</Eyebrow>
            <h2 className="text-h2">How we can help.</h2>
            <p className={muted}>
              Our {lower} support is scoped around your situation — from a focused review to a broader programme. Each
              engagement has its own detailed scope, typical deliverables and enquiry route.
            </p>
            <div>
              <ButtonLink href="/contact" variant="primary">
                Enquire about this service
              </ButtonLink>
            </div>
          </div>
          <Checklist items={service.offerings} />
        </div>
      </Section>

      {service.questions && (
        <Section tone="inverse">
          <div className="container-page">
            <SectionHead eyebrow="Typical client questions" title="Questions we help leadership teams answer." />
            <div data-stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {service.questions.map((q, i) => (
                <div
                  key={q}
                  className="grid content-start gap-6 rounded-card border border-inverse-border bg-inverse-raised p-7 transition-[border-color,translate] duration-280 ease-out-expo hover:-translate-y-[3px] hover:border-inverse-accent"
                >
                  <span className="text-2xl font-semibold text-inverse-accent">Q{i + 1}</span>
                  <h3 className="text-h4">{q}</h3>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {service.definitions && (
        <Section>
          <div className="container-page">
            <SectionHead eyebrow="Clear service definitions" title="For every offering, we explain:">
              <p>So both sides know exactly what is delivered, how often, and where responsibilities sit.</p>
            </SectionHead>
            <div data-stagger className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {service.definitions.map((d) => (
                <IconCard key={d.title} icon={d.icon} title={d.title}>
                  {d.text}
                </IconCard>
              ))}
            </div>
          </div>
        </Section>
      )}

      <Section tone="muted" className="pb-12!">
        <div className="container-page">
          <div
            data-reveal
            data-inverse
            className="grid overflow-hidden rounded-media bg-inverse text-inverse-foreground md:grid-cols-[1.25fr_0.75fr] lg:grid-cols-[1fr_420px]"
          >
            <div className="grid content-center gap-5 px-8 py-10 md:p-12 lg:p-16">
              <Eyebrow>Desired outcome</Eyebrow>
              <p className="text-[clamp(1.5rem,1.2rem+1vw,2.125rem)] leading-[1.25] font-semibold tracking-[-0.02em]">
                {service.outcome}
              </p>
            </div>
            <div className="relative min-h-80">
              <Image src={service.image} alt="" fill className="object-cover" />
            </div>
          </div>

          {service.note && (
            <div
              data-reveal
              className="mt-6 flex gap-5 rounded-card border border-border bg-background px-6 py-7 sm:px-8"
            >
              <Shield aria-hidden strokeWidth={1.5} className="size-7 shrink-0 text-primary" />
              <div className="grid gap-1.5">
                <h3 className="text-h4">{service.note.title}</h3>
                <p className={muted}>{service.note.text}</p>
              </div>
            </div>
          )}

          <div className="mt-14 grid gap-5">
            <Eyebrow tone="muted">Explore other services</Eyebrow>
            <div className="flex flex-wrap gap-x-9 gap-y-4">
              {others.map((s) => (
                <LinkArrow key={s.slug} href={serviceHref(s.slug)}>
                  {s.title}
                </LinkArrow>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <CtaBand title={`Discuss your ${lower} needs.`} />
    </>
  );
}
