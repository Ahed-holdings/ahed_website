import { Image } from "@/components/image";
import { Link } from "react-router";
import { serviceHref } from "@/lib/site";
import { cardClass, cx, LinkArrow, muted } from "../ui";

/**
 * Service card: photo, focus areas, title, summary, "Explore service".
 * Inside a navy area ([data-inverse]) it turns raised navy: gold focus areas, white title, grey-blue summary,
 * title and link turning gold on hover (bronze is too dark on navy).
 */
export function ServiceCard({ service }) {
  return (
    <Link
      to={serviceHref(service.slug)}
      className={cx(cardClass, "flex flex-col overflow-hidden inverse:text-inverse-foreground")}
    >
      <div className="relative aspect-[384/232] overflow-hidden bg-muted inverse:bg-inverse">
        <Image
          src={service.image}
          alt=""
          fill
          className="object-cover transition-transform duration-900 ease-out-expo group-hover:scale-107"
        />
      </div>
      <div className="grid flex-1 content-start gap-3 p-7">
        <p className="text-sm text-primary inverse:text-inverse-accent">{service.tags}</p>
        <h3 className="text-h3 transition-colors duration-280 group-hover:text-primary inverse:group-hover:text-inverse-accent">
          {service.title}
        </h3>
        <p className={muted}>{service.summary}</p>
        <LinkArrow inCard className="mt-auto pt-2">
          Explore service
        </LinkArrow>
      </div>
    </Link>
  );
}

/** `navy`: navy cards (sets data-inverse on the grid) for use on a light section. */
export function ServiceGrid({ services, navy }) {
  return (
    <div data-stagger data-inverse={navy ? "" : undefined} className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {services.map((s) => (
        <ServiceCard key={s.slug} service={s} />
      ))}
    </div>
  );
}
