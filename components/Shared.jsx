// Shared bits — placeholder canvas, crop frame, video slots, etc.

// The M-mark silhouette, used both as a drawn logo and as a video mask.
const M_MARK_PATHS =
  '<path d="M142.43,218.71H94.88V102.04h47.55l66.45,114.91l66.45-114.91h47.55v213.67h-47.55V197.14l-39.02,70.97h-54.87l-39.01-70.97V218.71z M142.43,315.71H94.88v-47.55h47.55V315.71z"/>' +
  '<path d="M370.43,102.04h47.55v116.19h-47.55V102.04z M417.98,47.55H274.86V0h143.11V47.55z"/>' +
  '<path d="M218.56,370.21l0,47.55l-123.68,0l0-47.55L218.56,370.21z M0,417.76l0-149.59l47.55,0l0,149.59L0,417.76z"/>' +
  '<rect x="0" y="2.82" width="49.11" height="99.22"/>' +
  '<rect x="0" y="0" width="94.88" height="47.55"/>' +
  '<rect x="370.32" y="315.71" width="47.44" height="101.34"/>' +
  '<rect x="322.88" y="370.21" width="94.88" height="47.55"/>';

const M_MASK_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 417.76 417.76"><g fill="#fff">' +
  M_MARK_PATHS +
  "</g></svg>";

// data: URI of the M silhouette, for use as a CSS mask.
export const M_MASK_URI = `url("data:image/svg+xml,${encodeURIComponent(M_MASK_SVG)}")`;

export function CropFrame({ children, ratio = "16 / 10", style = {} }) {
  return (
    <div className="crop" style={{ aspectRatio: ratio, position: "relative", ...style }}>
      <span className="crop-tr" />
      <span className="crop-bl" />
      {children}
    </div>
  );
}

// MShowreel — the M mark used as a window onto a highlight reel.
// Pass `src` (a video URL) to play footage inside the M shape.
// With no src, it shows the textured M fill + a "showreel" cue — a clear
// placeholder until real footage is dropped in.
export function MShowreel({ src }) {
  const maskStyle = {
    WebkitMaskImage: M_MASK_URI,
    maskImage: M_MASK_URI,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };

  return (
    <div className="m-showreel" style={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}>
      <div style={{ position: "absolute", inset: 0, ...maskStyle }}>
        {src ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src={src} />
          </video>
        ) : (
          <div className="m-showreel-fill" style={{ width: "100%", height: "100%" }} />
        )}
      </div>
      {!src && (
        <div className="m-showreel-cue mono">
          <span className="m-showreel-tri" />
          Showreel — coming soon
        </div>
      )}
    </div>
  );
}

// VideoPlaceholder — a video-shaped slot with crop-mark chrome and a play
// affordance. Pass `src` to swap in a real video; otherwise it's a clear
// "video goes here" placeholder.
export function VideoPlaceholder({
  label,
  caption,
  ratio = "16 / 9",
  tint = "ink",
  pattern = "grain",
  src,
  style = {},
}) {
  return (
    <div className="crop video-ph" style={{ aspectRatio: ratio, position: "relative", ...style }}>
      <span className="crop-tr" />
      <span className="crop-bl" />
      {src ? (
        <video
          controls
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        >
          <source src={src} />
        </video>
      ) : (
        <>
          <MediaPlaceholder fill tint={tint} pattern={pattern} label={label} caption={caption} />
          <div className="video-ph-play" aria-hidden="true">
            <span className="video-ph-tri" />
          </div>
          <div className="video-ph-tag mono">▶ Video — placeholder</div>
        </>
      )}
    </div>
  );
}

// A richer placeholder using SVG patterns + label, so we don't show a generic grey rectangle.
export function MediaPlaceholder({
  label,
  caption,
  tint = "shu",
  pattern = "grain", // grain | bands | dots | wash | shoji
  serial,
  style = {},
  fill = false,
}) {
  const tintColor =
    tint === "shu" ? "rgba(188,0,45,0.62)"
    : tint === "ink" ? "rgba(10,10,10,0.86)"
    : tint === "paper" ? "rgba(245,242,236,0.92)"
    : tint === "ash" ? "rgba(107,107,107,0.6)"
    : tint === "deep" ? "rgba(20,16,24,0.92)"
    : tint;

  // Sanitize label for use in SVG IDs (alphanumeric only)
  const safeId = (label || "ph").replace(/[^a-zA-Z0-9]/g, "");

  const baseStyle = {
    position: "relative",
    width: "100%",
    height: fill ? "100%" : undefined,
    background: "var(--bg-2)",
    overflow: "hidden",
    color: "var(--fg)",
    ...style,
  };

  return (
    <div style={baseStyle}>
      <svg
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden="true"
      >
        <defs>
          <pattern id={`bands-${safeId}`} x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <rect width="14" height="14" fill="transparent" />
            <rect width="1" height="14" fill="rgba(255,255,255,0.05)" />
          </pattern>
          <pattern id={`dots-${safeId}`} x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.9" fill="rgba(255,255,255,0.18)" />
          </pattern>
          <pattern id={`shoji-${safeId}`} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect width="60" height="60" fill="transparent" />
            <rect width="60" height="1" fill="rgba(245,242,236,0.10)" y="0" />
            <rect width="1" height="60" fill="rgba(245,242,236,0.10)" x="0" />
          </pattern>
          <radialGradient id={`wash-${safeId}`} cx="0.7" cy="0.3" r="0.8">
            <stop offset="0%" stopColor={tintColor} />
            <stop offset="60%" stopColor="rgba(10,10,10,0.0)" />
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill={tintColor} />
        {pattern === "bands" && <rect width="800" height="500" fill={`url(#bands-${safeId})`} />}
        {pattern === "dots" && <rect width="800" height="500" fill={`url(#dots-${safeId})`} />}
        {pattern === "shoji" && <rect width="800" height="500" fill={`url(#shoji-${safeId})`} />}
        {pattern === "wash" && <rect width="800" height="500" fill={`url(#wash-${safeId})`} />}
        {pattern === "grain" && (
          <>
            <rect width="800" height="500" fill={`url(#wash-${safeId})`} opacity="0.6" />
            <rect width="800" height="500" fill={`url(#dots-${safeId})`} opacity="0.55" />
          </>
        )}
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 18,
          color: "var(--kami)",
        }}
      >
        {serial ? (
          <div className="mono" style={{ opacity: 0.7, color: "var(--kami)", fontSize: 10 }}>
            {serial}
          </div>
        ) : (
          <div />
        )}
        <div>
          <div className="display" style={{ fontSize: 22, lineHeight: 1, color: "var(--kami)" }}>
            {label}
          </div>
          {caption && (
            <div className="mono" style={{ opacity: 0.7, marginTop: 8, color: "var(--kami)" }}>
              {caption}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
