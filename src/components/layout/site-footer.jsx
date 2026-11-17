import { Link } from "react-router";
import { companyNav, serviceHref, services, site } from "@/lib/site";
import { Logo } from "./logo";

const heading = "mb-3 text-eyebrow font-semibold uppercase text-inverse-accent";
const link = "text-[0.9375rem] text-inverse-foreground transition-colors duration-280 hover:text-inverse-accent";

export function SiteFooter() {
  // Compact on request: tight spacing; from sm to lg the logo sits beside the tagline instead of above it
  return (
    <footer data-inverse className="bg-inverse pt-10 pb-6 text-inverse-foreground md:pt-12">
      <div className="container-page">
        <div className="grid gap-8 pb-8 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div className="grid max-w-80 content-start gap-3 sm:flex sm:max-w-none sm:items-center sm:gap-8 lg:grid lg:max-w-80 lg:gap-4">
            <Logo inverse className="h-12" />
            <p className="max-w-[46ch] text-inverse-muted">{site.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-[repeat(3,auto)] sm:gap-x-[72px]">
            <div>
              <h2 className={heading}>Services</h2>
              <ul className="grid gap-1.5">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link className={link} to={serviceHref(s.slug)}>
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={heading}>Company</h2>
              <ul className="grid gap-1.5">
                {companyNav.map((n) => (
                  <li key={n.href}>
                    <Link className={link} to={n.href}>
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={heading}>Get in touch</h2>
              <ul className="grid gap-1.5">
                <li>
                  <a className={link} href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </li>
                <li>
                  <a className={link} href={site.phoneHref}>
                    {site.phone}
                  </a>{" "}
                  <span className="text-sm text-inverse-muted">Tel / WhatsApp</span>
                </li>
                <li className="text-inverse-muted">Service geography: {site.location}</li>
                <li>
                  <Link className={link} to="/contact">
                    Request an Initial Discussion →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-x-4 gap-y-2 border-t border-inverse-border pt-4 text-sm text-inverse-muted">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          {/* TODO: Privacy Policy and Terms pages */}
          <nav aria-label="Legal" className="flex gap-7">
            <a className="hover:text-inverse-foreground" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-inverse-foreground" href="#">
              Terms of Use
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
