import { PageMeta } from "@/components/layout/page-meta";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { delay, Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";

const metadata = {
  title: "Contact Us",
  description:
    "Contact Ahed in Kochi, Kottayam or Ahmedabad. Request an initial discussion by form, email, phone or WhatsApp and we will come back to you promptly.",
};

/** First three steps of the engagement cycle (same wording as How We Work) */
const nextSteps = [
  { title: "Initial discussion", text: "A conversation to understand your business, ambitions and immediate concerns." },
  { title: "Assessment", text: "A structured look at the current position, gaps and priorities." },
  { title: "Proposal", text: "A clear recommendation on approach, scope and engagement model." },
];

const contactLink = "transition-colors duration-280 hover:text-inverse-accent";

export default function ContactPage() {
  return (
    <>
      <PageMeta {...metadata} />
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Tell Us Where Your Business <span className="whitespace-nowrap text-inverse-accent">Needs to Go.</span>
          </>
        }
        lead="Share a little about your business and the challenge you are facing. We will come back to you to arrange an initial discussion."
      />

      {/* Off-white section: white form card on the left, navy contact panel on the right (pinned while scrolling, md+) */}
      <section className="bg-muted pt-[clamp(40px,5vw,64px)] pb-[clamp(48px,6vw,80px)]">
        <div className="container-page grid items-start gap-8 md:grid-cols-[1.4fr_0.6fr] lg:grid-cols-[1.5fr_0.75fr] lg:gap-12">
          <ContactForm />

          <aside
            data-reveal
            data-inverse
            style={delay(100)}
            className="grid gap-6 rounded-media bg-inverse p-6 text-inverse-foreground sm:p-7 md:sticky md:top-[100px]"
          >
            <div className="grid gap-2">
              <Eyebrow>Direct contact</Eyebrow>
              <h2 className="text-h4">Prefer to talk first?</h2>
              <p className="text-sm text-inverse-muted">Reach us directly by email, phone or WhatsApp.</p>
            </div>

            <ul className="grid gap-4">
              <li className="flex items-start gap-3.5">
                <Mail aria-hidden strokeWidth={1.5} className="mt-0.5 size-5 shrink-0 text-inverse-accent" />
                <div className="grid gap-0.5">
                  <span className="text-sm text-inverse-muted">Business email</span>
                  <a className={`font-semibold break-all ${contactLink}`} href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <Phone aria-hidden strokeWidth={1.5} className="mt-0.5 size-5 shrink-0 text-inverse-accent" />
                <div className="grid gap-0.5">
                  <span className="text-sm text-inverse-muted">Telephone / WhatsApp</span>
                  <a className={`font-semibold ${contactLink}`} href={site.phoneHref}>
                    {site.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <MapPin aria-hidden strokeWidth={1.5} className="mt-0.5 size-5 shrink-0 text-inverse-accent" />
                <div className="grid gap-0.5">
                  <span className="text-sm text-inverse-muted">Location / service geography</span>
                  <span className="font-semibold">{site.location}</span>
                  <span className="text-sm text-inverse-muted">Serving clients across India</span>
                </div>
              </li>
            </ul>

            <div className="grid gap-3 border-t border-inverse-border pt-5">
              <h3 className="text-sm font-semibold tracking-wide">What happens next</h3>
              <ol className="grid gap-3">
                {nextSteps.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[auto_1fr] gap-3">
                    <span className="grid size-7 place-items-center rounded-full border border-inverse-accent text-xs font-semibold text-inverse-accent">
                      {i + 1}
                    </span>
                    <div className="grid gap-0.5">
                      <span className="font-semibold">{s.title}</span>
                      <span className="text-sm text-inverse-muted">{s.text}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
