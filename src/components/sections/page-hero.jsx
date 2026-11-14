import { Image } from "@/components/image";
import { cx, delay, Eyebrow } from "../ui";

/**
 * Navy page hero shared by every inner page.
 * With an image, from 720px wide it fills the screen below the header (text and photo fit in one view;
 * the photo's height is capped by the screen). Without an image it keeps a natural height.
 * No breadcrumb trail (removed on request): eyebrow, heading and intro only.
 */
export function PageHero({ eyebrow, title, lead, image }) {
  return (
    <section
      data-inverse
      className={cx("under-header flex bg-inverse text-inverse-foreground", image && "min-[720px]:min-h-svh")}
    >
      <div
        className={cx(
          "container-page grid content-center items-center gap-10 pt-12 pb-[72px] sm:pt-[72px] sm:pb-24",
          image && "min-[720px]:grid-cols-[1.15fr_0.85fr] min-[720px]:gap-10 min-[720px]:py-12 md:gap-16 short:py-8",
        )}
      >
        <div data-reveal className="grid max-w-[760px] gap-[22px] short:gap-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-h1">{title}</h1>
          <p className="text-lead text-inverse-muted short:text-base">{lead}</p>
        </div>
        {image && (
          <div
            data-reveal
            style={delay(120)}
            className={cx(
              "relative aspect-[520/420] overflow-hidden rounded-media ring-1 ring-inverse-border",
              "min-[720px]:aspect-auto min-[720px]:h-[clamp(320px,calc(100svh-78px-8rem),540px)] short:h-[clamp(300px,calc(100svh-78px-5rem),480px)]",
            )}
          >
            <Image
              src={image}
              alt=""
              fill
              priority
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
