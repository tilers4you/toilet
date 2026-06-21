"use client";

import type { SVGProps } from "react";
import styles from "./service-icon.module.css";

export type ServiceIconType = "replacement" | "installation" | "repair" | "leaks";

type ServiceIconProps = Omit<SVGProps<SVGSVGElement>, "type"> & {
  /** Which service icon to render. */
  type: ServiceIconType;
  /**
   * Force the animation to run regardless of hover.
   * Drive this from a parent's hover/focus state when you want the whole
   * card (not just the icon) to trigger the motion.
   */
  playing?: boolean;
};

/**
 * Self-contained animated service icon. Drop it anywhere:
 *
 *   <ServiceIcon type="repair" />                 // animates on hover/focus of the icon
 *   <ServiceIcon type="leaks" playing={hovered} /> // animate from a parent's state
 *
 * Theme it via CSS: the dark lines use `currentColor`, the accent parts use
 * the `--icon-accent` custom property. Both can be overridden by the consumer.
 */
export function ServiceIcon({ type, playing = false, className, ...rest }: ServiceIconProps) {
  const classes = [styles.icon, styles[type], playing ? styles.isPlaying : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <svg className={classes} viewBox="0 0 160 160" aria-hidden="true" {...rest}>
      {/* Transparent hit area so hovering anywhere in the box triggers the animation. */}
      <rect width="160" height="160" fill="transparent" />
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5">
        {renderPaths(type)}
      </g>
    </svg>
  );
}

function renderPaths(type: ServiceIconType) {
  switch (type) {
    case "replacement":
      return (
        <>
          <g className={styles.fixture}>
            <path d="M44 24h56a6 6 0 0 1 6 6v8H38v-8a6 6 0 0 1 6-6Z" />
            <path d="M44 38v40" />
            <path d="M100 38v40" />
            <path d="M38 78h68c0 25-15 45-34 45S38 103 38 78Z" />
            <path d="M58 122h28l4 24H54l4-24Z" />
            <path d="M38 70h68" />
          </g>
          <g className={styles.cycle}>
            <path d="M122 56a34 34 0 0 1 24 26" />
            <path d="m146 82 6-14-15 4" />
            <path d="M142 108a34 34 0 0 1-39-5" />
            <path d="m103 103 4 15 10-12" />
          </g>
        </>
      );

    case "installation":
      return (
        <>
          <g className={styles.fixture}>
            <path d="M48 22h64a6 6 0 0 1 6 6v8H42v-8a6 6 0 0 1 6-6Z" />
            <path d="M48 36v40" />
            <path d="M112 36v40" />
            <path d="M42 76h76c0 27-17 43-38 43S42 103 42 76Z" />
            <path d="M66 118h28l4 24H62l4-24Z" />
          </g>
          <path className={styles.floor} d="M30 146h100" />
          <g className={styles.bolts}>
            <path d="M48 116v25" />
            <path d="M112 116v25" />
            <path d="M40 130h16" />
            <path d="M104 130h16" />
            <path d="M44 122h8" />
            <path d="M108 122h8" />
            <path d="M48 108v6" />
            <path d="M112 108v6" />
          </g>
        </>
      );

    case "repair":
      return (
        <>
          <g className={styles.fixture}>
            <path d="M46 30h76a6 6 0 0 1 6 6v10H40V36a6 6 0 0 1 6-6Z" />
            <path d="M42 46h84v72a10 10 0 0 1-10 10H52a10 10 0 0 1-10-10V46Z" />
            <path className={styles.handle} d="M42 62H24a5 5 0 0 0 0 10h18" />
            <path className={styles.handle} d="M24 67H10" />
          </g>
          <g className={styles.water}>
            <path d="M56 96c12-6 20 6 32 0s20 6 32 0" />
            <path className={styles.drop} d="M98 66c0 12-13 18-13 30a13 13 0 0 0 26 0c0-12-13-18-13-30Z" />
          </g>
        </>
      );

    case "leaks":
    default:
      return (
        <>
          <g className={styles.fixture}>
            <path d="M48 20h64a6 6 0 0 1 6 6v8H42v-8a6 6 0 0 1 6-6Z" />
            <path d="M48 34v42" />
            <path d="M112 34v42" />
            <path d="M42 76h76c0 27-17 43-38 43S42 103 42 76Z" />
            <path d="M66 118h28l4 24H62l4-24Z" />
            <path d="M42 68h76" />
          </g>
          <g className={styles.alert}>
            <path className={styles.downArrow} d="M28 94v48" />
            <path className={styles.downArrow} d="m16 130 12 12 12-12" />
            <path className={styles.drop} d="M126 94c0 14-16 22-16 36a16 16 0 0 0 32 0c0-14-16-22-16-36Z" />
            <path className={styles.ripple} d="M64 150c8-5 24-5 32 0" />
            <path className={styles.ripple} d="M58 136c12-7 32-7 44 0" />
          </g>
        </>
      );
  }
}

export default ServiceIcon;
