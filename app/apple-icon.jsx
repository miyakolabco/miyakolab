// Apple touch icon (home-screen bookmark) — the M-mark on sumi, 180×180.
import { ImageResponse } from "next/og";
import { markSvg, svgDataUri } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0A",
        }}
      >
        <img src={svgDataUri(markSvg("#F5F2EC"))} width={112} height={112} alt="" />
      </div>
    ),
    size
  );
}
