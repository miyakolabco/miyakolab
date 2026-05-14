"use client";

// Lightbox — a full-screen overlay showing one work piece at full size.
// Video pieces play with controls; image pieces show large. Closes on
// backdrop click, the X button, or the Escape key.

import { useEffect } from "react";
import { MediaPlaceholder } from "@/components/Shared";

export function Lightbox({ piece, onClose }) {
  useEffect(() => {
    if (!piece) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // Prevent the page behind from scrolling while open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [piece, onClose]);

  if (!piece) return null;

  const hasMedia = piece.media && piece.media.src;

  return (
    <div
      className="ml-lightbox"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={piece.title}
    >
      <button className="ml-lightbox-close mono" onClick={onClose} aria-label="Close">
        Close ✕
      </button>

      <div
        className="ml-lightbox-stage"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="crop ml-lightbox-frame">
          <span className="crop-tr" />
          <span className="crop-bl" />

          {hasMedia && piece.media.type === "video" && (
            <video
              controls
              autoPlay
              playsInline
              poster={piece.media.poster || undefined}
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", background: "#000" }}
            >
              <source src={piece.media.src} />
            </video>
          )}

          {hasMedia && piece.media.type === "image" && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={piece.media.src}
              alt={piece.title}
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            />
          )}

          {!hasMedia && (
            <div style={{ aspectRatio: piece.media?.type === "video" ? "16 / 9" : "4 / 5" }}>
              <MediaPlaceholder
                fill
                tint={piece.tint}
                pattern={piece.pattern}
                label={piece.title}
                caption={
                  piece.media?.type === "video"
                    ? "Video — footage forthcoming"
                    : "Artwork — file forthcoming"
                }
              />
            </div>
          )}
        </div>

        <div className="ml-lightbox-meta">
          <div className="display" style={{ fontSize: "clamp(20px, 3vw, 28px)", letterSpacing: "-0.02em" }}>
            {piece.title}
          </div>
          <div className="mono" style={{ color: "var(--fg-dim)", marginTop: 6 }}>
            {[piece.client, piece.year].filter(Boolean).join(" · ")}
          </div>
        </div>
      </div>
    </div>
  );
}
