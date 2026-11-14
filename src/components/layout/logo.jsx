import { Image } from "@/components/image";
import { Link } from "react-router";
import { cx } from "../ui";

/** AHED "always ahead" logo, navy & gold. `inverse` = white letterforms for dark backgrounds. */
export function Logo({ inverse, priority, className = "h-11" }) {
  return (
    <Link to="/" aria-label="Ahed – always ahead, home" className="inline-flex shrink-0">
      <Image
        src={inverse ? "/img/logo-inverse.webp" : "/img/logo.webp"}
        alt="AHED – always ahead"
        width={640}
        height={193}
        priority={priority}
        className={cx("w-auto", className)}
      />
    </Link>
  );
}
