import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { ButtonLink, Eyebrow } from "../ui";

const defaultText =
  "Whether you are planning your next stage of growth, improving performance or addressing challenges within a business function, the first step is to understand where you are and what needs to change.";

const contactLink = "inline-flex items-center gap-2.5 transition-colors duration-280 hover:text-inverse-accent";

/**
 * "Next step" call to action at the bottom of most pages: a navy panel, no photo.
 * lg+: large heading on the left, text and buttons on the right (aligned to the heading's baseline area),
 * then a hairline and a row of direct contact details. Below lg everything stacks.
 */
export function CtaBand({ title = "Let’s discuss what your business needs next.", text = defaultText }) {
  return (
    <section className="pt-6 pb-[clamp(72px,9vw,112px)]">
      <div className="container-page">
        <div
          data-reveal
          data-inverse
          className="relative isolate overflow-hidden rounded-media bg-inverse px-7 py-12 text-inverse-foreground sm:px-12 sm:py-14 lg:px-[72px] lg:py-[72px]"
        >
          {/* Soft raised-navy glow in the top-right corner for depth (decorative) */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-48 -right-40 -z-10 size-[34rem] rounded-full bg-[radial-gradient(closest-side,var(--inverse-raised),transparent)]"
          />

          <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
            <div className="grid gap-5">
              <Eyebrow>Next step</Eyebrow>
              <h2 className="max-w-[18ch] text-h1">{title}</h2>
            </div>
            <div className="grid gap-7">
              <p className="max-w-[52ch] text-inverse-muted">{text}</p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/contact" variant="primary">
                  Discuss Your Business
                </ButtonLink>
                <ButtonLink href="/services" variant="ghostLight" arrow={false}>
                  Explore Our Services
                </ButtonLink>
              </div>
            </div>
          </div>

          {/* Direct contact details */}
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-inverse-border pt-6 text-sm text-inverse-muted lg:mt-14">
            <a className={contactLink} href={`mailto:${site.email}`}>
              <Mail aria-hidden strokeWidth={1.5} className="size-4 text-inverse-accent" />
              {site.email}
            </a>
            <a className={contactLink} href={site.phoneHref}>
              <Phone aria-hidden strokeWidth={1.5} className="size-4 text-inverse-accent" />
              {site.phone}
            </a>
            <span className="inline-flex items-center gap-2.5">
              <MapPin aria-hidden strokeWidth={1.5} className="size-4 text-inverse-accent" />
              {site.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
