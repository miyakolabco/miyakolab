"use client";

// Lightbox — full-screen viewer with a TikTok-style vertical slide.
// The pieces are stacked in a vertical track; navigating slides the track
// up/down so the media itself physically moves. Navigate via:
//   - swipe up / down on touch (drag follows the finger, then snaps)
//   - arrow keys or scroll wheel on desktop
//   - Escape or the X / backdrop click to close
// An animated one-time hint shows on first open.

import { useCallback, useEffect, useRef, useState } from "react";
import { MediaPlaceholder } from "@/components/Shared";
import { VimeoPlayer } from "@/components/VimeoPlayer";

function PieceMedia({ piece, active }) {
  const isVimeo = piece.media?.type === "vimeo" && piece.media.id;
  const isVideoFile = piece.media?.type === "video" && piece.media.src;
  const isImage = piece.media?.type === "image" && piece.media.src;
  const hasMedia = isVimeo || isVideoFile || isImage;
  const vertical = piece.media?.type === "vimeo" || piece.media?.type === "video";

  return (
    <div className="ml-lightbox-slide">
      <div className={`crop ml-lightbox-frame ${vertical ? "is-vertical" : "is-still"}`}>
        <span className="crop-tr" />
        <span className="crop-bl" />

        {/* Only mount the Vimeo iframe for the active slide — keeps neighbours
            from autoplaying behind the scenes */}
        {isVimeo && active && (
          <div style={{ position: "absolute", inset: 0 }}>
            <VimeoPlayer id={piece.media.id} mode="player" />
          </div>
        )}
        {isVimeo && !active && (
          <MediaPlaceholder
            fill
            tint={piece.tint}
            pattern={piece.pattern}
            label={piece.title}
            caption=""
          />
        )}

        {isVideoFile && (
          <video
            controls={active}
            autoPlay={active}
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
  );
}

export function Lightbox({ pieces, index, onClose, onNavigate }) {
  const open = index != null && index >= 0;

  const [showHint, setShowHint] = useState(false);
  const [drag, setDrag] = useState(0); // live finger drag offset in px
  const [dragging, setDragging] = useState(false);
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
      }, 560);
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

  // Animated one-time swipe hint
  useEffect(() => {
    if (!open) return;
    if (pieces.length < 2) return;
    if (typeof window !== "undefined" && window.__mlSwipeHintSeen) return;
    setShowHint(true);
    const t = setTimeout(() => {
      setShowHint(false);
      if (typeof window !== "undefined") window.__mlSwipeHintSeen = true;
    }, 4000);
    return () => clearTimeout(t);
  }, [open, pieces.length]);

  if (!open) return null;

  // --- Touch: drag follows the finger, then snaps to next/prev or back ---
  const onTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    setDragging(true);
  };
  const onTouchMove = (e) => {
    if (touchStartY.current == null) return;
    let dy = e.touches[0].clientY - touchStartY.current;
    // Resist dragging past the first / last piece
    if ((index === 0 && dy > 0) || (index === pieces.length - 1 && dy < 0)) {
      dy *= 0.25;
    }
    setDrag(dy);
  };
  const onTouchEnd = () => {
    setDragging(false);
    const threshold = 70;
    if (drag < -threshold) goNext();
    else if (drag > threshold) goPrev();
    setDrag(0);
    touchStartY.current = null;
  };

  // The track is translated by: -(index * 100%) plus the live drag offset.
  const trackStyle = {
    transform: `translateY(calc(${-index * 100}% + ${drag}px))`,
    transition: dragging ? "none" : "transform 460ms cubic-bezier(.2,.8,.2,1)",
  };

  return (
    <div
      className="ml-lightbox"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={pieces[index].title}
    >
      <button className="ml-lightbox-close mono" onClick={onClose} aria-label="Close">
        Close ✕
      </button>

      <div className="ml-lightbox-count mono">
        {String(index + 1).padStart(2, "0")} / {String(pieces.length).padStart(2, "0")}
      </div>

      {/* Viewport — clips the sliding track. Touch handlers live here. */}
      <div
        className="ml-lightbox-viewport"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="ml-lightbox-track" style={trackStyle}>
          {pieces.map((p, i) => (
            <PieceMedia key={p.id} piece={p} active={i === index} />
          ))}
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

      {/* Animated one-time swipe hint */}
      {showHint && pieces.length > 1 && (
        <div className="ml-lightbox-hint" aria-hidden="true">
          <div className="ml-hint-gesture">
            <div className="ml-hint-chevrons">
              <span />
              <span />
              <span />
            </div>
            <div className="ml-hint-dot" />
          </div>
          <div className="ml-hint-label">Swipe up for more</div>
        </div>
      )}
    </div>
  );
}
