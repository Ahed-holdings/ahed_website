import { Link } from "react-router";
import { mainNav, site } from "@/lib/site";
import { Image } from "@/components/image";
import { StaggeredMenu } from "./staggered-menu";
import { ButtonArrow, buttonClass, cx } from "../ui";

/** Underlays that sweep in before the white menu panel: brand gold, then raised navy. */
const menuUnderlays = ["#C4A037", "#162C4A"];

const menuItems = [{ href: "/", label: "Home" }, ...mainNav];

/**
 * Logo for the floating header: white letters over navy, navy letters over light backgrounds.
 * Both versions are stacked and cross-fade, so switching never waits for an image to load.
 */
function HeaderLogo({ onDark }) {
  const img = "col-start-1 row-start-1 h-10 w-auto transition-opacity duration-280 sm:h-11";
  return (
    <Link to="/" aria-label="Ahed – always ahead, home" className="grid shrink-0">
      <Image
        src="/img/logo-inverse.webp"
        alt=""
        width={640}
        height={193}
        priority
        className={cx(img, !onDark && "opacity-0")}
      />
      <Image
        src="/img/logo.webp"
        alt=""
        width={640}
        height={193}
        priority
        className={cx(img, onDark && "opacity-0")}
      />
    </Link>
  );
}

/** Site header: floating logo + StaggeredMenu (no bar). All navigation lives in the menu panel. */
export function SiteHeader() {
  return (
    <StaggeredMenu
      items={menuItems}
      colors={menuUnderlays}
      brand={(onDark) => <HeaderLogo onDark={onDark} />}
      footer={
        <>
          <p className="text-eyebrow font-semibold text-primary uppercase">Get in touch</p>
          <div className="grid gap-1.5 text-lg">
            <a className="w-fit transition-colors hover:text-primary" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <a className="w-fit transition-colors hover:text-primary" href={site.phoneHref}>
              {site.phone}
            </a>
          </div>
          <div>
            <Link to="/contact" className={buttonClass("dark")}>
              Discuss Your Business
              <ButtonArrow />
            </Link>
          </div>
        </>
      }
    />
  );
}
