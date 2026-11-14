import { PageMeta } from "@/components/layout/page-meta";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink, Section } from "@/components/ui";

export default function NotFoundPage() {
  return (
    <>
      <PageMeta title="Page not found" description="This page does not exist or has moved." noindex />
      <PageHero
        eyebrow="Error 404"
        title="This page does not exist or has moved."
        lead="Check the address, or go to one of the main sections of the site."
      />
      <Section>
        <div className="container-page flex flex-wrap gap-3">
          <ButtonLink href="/" variant="dark">
            Go to the home page
          </ButtonLink>
          <ButtonLink href="/services" variant="secondary" arrow={false}>
            Explore Our Services
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
