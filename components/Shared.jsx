// Shared bits — currently just the styled media placeholder used while a
// piece has no real file yet (and behind inactive lightbox slides).

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
