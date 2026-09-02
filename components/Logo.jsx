// Inline SVG logos — colour via currentColor. Kami on dark, Sumi on light.
// The vector data lives in lib/brand.js so the favicon, Apple icon and
// share image use exactly the same shapes.

import { MARK_PATHS, MARK_VIEWBOX, LOCKUP_PATHS, LOCKUP_VIEWBOX } from "@/lib/brand";

export function LogoLockup({ height = 28, style = {}, ...rest }) {
  // Horizontal "MIYAKO LAB" lockup.
  return (
    <svg
      viewBox={LOCKUP_VIEWBOX}
      height={height}
      style={{ display: "block", fill: "currentColor", ...style }}
      aria-label="Miyako Lab"
      role="img"
      dangerouslySetInnerHTML={{ __html: LOCKUP_PATHS }}
      {...rest}
    />
  );
}

export function LogoMark({ size = 32, style = {}, ...rest }) {
  // The M-square mark.
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      width={size}
      height={size}
      style={{ display: "block", fill: "currentColor", ...style }}
      aria-label="Miyako Lab mark"
      role="img"
      dangerouslySetInnerHTML={{ __html: MARK_PATHS }}
      {...rest}
    />
  );
}
