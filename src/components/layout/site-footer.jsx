import { Link } from "react-router";
import { companyNav, serviceHref, services, site } from "@/lib/site";
import { Logo } from "./logo";

const heading = "mb-4 text-eyebrow font-semibold uppercase text-inverse-accent";
const link = "text-inverse-foreground transition-colors duration-280 hover:text-inverse-accent";

export function SiteFooter() {
  return (
    <footer data-inverse className="bg-inverse pt-[88px] pb-10 text-inverse-foreground">
      <div className="container-page">
        <div className="grid gap-16 pb-14 lg:grid-cols-[1fr_auto]">
          <div className="grid max-w-80 content-start gap-[18px]">
            <Logo inverse className="h-14" />
            <p className="text-inverse-muted">{site.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-[repeat(3,auto)] sm:gap-[72px]">
            <div>
              <h2 className={heading}>Services</h2>
              <ul className="grid gap-3">
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
              <ul className="grid gap-3">
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
              <ul className="grid gap-3">
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

        <div className="flex flex-wrap justify-between gap-4 border-t border-inverse-border pt-7 text-sm text-inverse-muted">
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
