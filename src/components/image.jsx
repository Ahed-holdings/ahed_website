import { cx } from "./ui";

/**
 * Plain <img> with the defaults the site needs (replaces next/image).
 * - `fill`     covers its positioned parent (the parent sets `relative` and a size or aspect ratio)
 * - `priority` loads straight away with high priority: use it for images in the first screen only
 * Everything else lazy-loads. Images without `fill` must pass `width` and `height` to avoid layout shift.
 */
export function Image({ fill, priority, className, alt = "", ...rest }) {
  return (
    <img
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={cx(fill && "absolute inset-0 size-full", className)}
      {...rest}
    />
  );
}
