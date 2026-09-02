// Share-preview image — what shows when the site link is sent on WhatsApp,
// Instagram, iMessage, LinkedIn, etc. Generated from the brand vectors and
// the tagline in lib/site.js, so it never goes out of date.
import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";
import { markSvg, lockupSvg, svgDataUri } from "@/lib/brand";

export const alt = `${SITE.name} — multimedia design studio, ${SITE.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: lockup left, mark right */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <img src={svgDataUri(lockupSvg("#F5F2EC"))} width={430} height={119} alt="" />
          <img src={svgDataUri(markSvg("#BC002D"))} width={110} height={110} alt="" />
        </div>

        {/* Bottom: statement + what/where */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 64, color: "#F5F2EC", lineHeight: 1.04, letterSpacing: -2.5 }}>
            We design for places
          </div>
          <div style={{ display: "flex", fontSize: 64, lineHeight: 1.04, letterSpacing: -2.5 }}>
            <span style={{ color: "#F5F2EC" }}>that live</span>
            <span style={{ color: "#BC002D", marginLeft: 18 }}>after dark.</span>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#9A9A9A", marginTop: 30, letterSpacing: 0.5 }}>
            {/* No kanji here — the image renderer's fallback font has no Japanese glyphs */}
            {`Video, flyers, DJ EPKs & websites  ·  ${SITE.city}, ${SITE.country}`}
          </div>
        </div>
      </div>
    ),
    size
  );
}
