"use client";

// Lightbox — full-screen viewer for a work piece, sized for 9:16 vertical
// video. Navigate up/down through the pieces in the same category:
//   - swipe up / down on touch
//   - arrow keys or scroll wheel on desktop
//   - Escape or the X / backdrop click to close
// A subtle one-time hint fades in, then out, on first open.

import { useCallback, useEffect, useRef, useState } from "react";
import { MediaPlaceholder } from "@/components/Shared";
import { VimeoPlayer } from "@/components/VimeoPlayer";

export function Lightbox({ pieces, index, onClose, onNavigate }) {
  const open = index != null && index >= 0;
  const piece = open ? pieces[index] : null;

  const [showHint, setShowHint] = useState(false);
  const touchStartY = useRef(null);
  const wheelLock = useRef(false);

  const goNext = useCallback(() => {
    if (!open) return;
    if (index < pieces.length - 1) onNavigate(index + 1);
  }, [open, index, pieces, onNavigate]);

  const goPrev = useCallback(() => {
    if (!open) return;
    if (index > 0) onNavigate(index - 1);
  }, [open, index, onNavigate]);

  // Keyboard + scroll-wheel navigation, body scroll lock
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowDown" || e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") goPrev();
    };

    const onWheel = (e) => {
      if (wheelLock.current) return;
      if (Math.abs(e.deltaY) < 24) return;
      wheelLock.current = true;
      if (e.deltaY > 0) goNext();
      else goPrev();
      setTimeout(() => {
        wheelLock.current = false;
      }, 520);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
      document.body.style.overflow = "";
    };
  }, [open, onClose, goNext, goPrev]);

  // One-time swipe hint — shows briefly on first open of a session
  useEffect(() => {
    if (!open) return;
    if (pieces.length < 2) return;
    if (typeof window !== "undefined" && window.__mlSwipeHintSeen) return;
    setShowHint(true);
    const t = setTimeout(() => {
      setShowHint(false);
      if (typeof window !== "undefined") window.__mlSwipeHintSeen = true;
    }, 3200);
    return () => clearTimeout(t);
  }, [open, pieces.length]);

  if (!open) return null;

  const onTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e) => {
    if (touchStartY.current == null) return;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dy) > 60) {
      if (dy < 0) goNext();
      else goPrev();
    }
    touchStartY.current = null;
  };

  const isVimeo = piece.media?.type === "vimeo" && piece.media.id;
  const isVideoFile = piece.media?.type === "video" && piece.media.src;
  const isImage = piece.media?.type === "image" && piece.media.src;
  const hasMedia = isVimeo || isVideoFile || isImage;
  // Video pieces (vimeo or file) render 9:16; images keep 4:5.
  const vertical = piece.media?.type === "vimeo" || piece.media?.type === "video";

  return (
    <div
      className="ml-lightbox"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={piece.title}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button className="ml-lightbox-close mono" onClick={onClose} aria-label="Close">
        Close ✕
      </button>

      {/* Position counter */}
      <div className="ml-lightbox-count mono">
        {String(index + 1).padStart(2, "0")} / {String(pieces.length).padStart(2, "0")}
      </div>

      <div className="ml-lightbox-stage" onClick={(e) => e.stopPropagation()}>
        <div
          className={`crop ml-lightbox-frame ${vertical ? "is-vertical" : "is-still"}`}
        >
          <span className="crop-tr" />
          <span className="crop-bl" />

          {isVimeo && (
            <div style={{ position: "absolute", inset: 0 }}>
              <VimeoPlayer id={piece.media.id} mode="player" />
            </div>
          )}

          {isVideoFile && (
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

          {isImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={piece.media.src}
              alt={piece.title}
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            />
          )}

          {!hasMedia && (
            <MediaPlaceholder
              fill
              tint={piece.tint}
              pattern={piece.pattern}
              label={piece.title}
              caption={vertical ? "Video — forthcoming" : "Artwork — forthcoming"}
            />
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

      {/* Up / down nav arrows — desktop affordance, hidden on touch via CSS */}
      {pieces.length > 1 && (
        <div className="ml-lightbox-nav" onClick={(e) => e.stopPropagation()}>
          <button
            className="ml-lightbox-arrow"
            onClick={goPrev}
            disabled={index === 0}
            aria-label="Previous"
          >
            ↑
          </button>
          <button
            className="ml-lightbox-arrow"
            onClick={goNext}
            disabled={index === pieces.length - 1}
            aria-label="Next"
          >
            ↓
          </button>
        </div>
      )}

      {/* One-time swipe hint */}
      {showHint && pieces.length > 1 && (
        <div className="ml-lightbox-hint mono">
          <span className="ml-lightbox-hint-arrows">↕</span>
          Swipe for more
        </div>
      )}
    </div>
  );
}
