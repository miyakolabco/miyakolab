"use client";

// Lightbox — full-screen viewer with 2D TikTok-style navigation:
//   vertical   = pieces within the current category (swipe up = next)
//   horizontal = jump between categories (swipe right = next category)
// Each swipe lands on the first piece of the target category.
//
// A "pages" media type (EPK / deck) opens a single grid cell but has its
// OWN internal vertical page swipe — handled by PagesViewer below.
//
// Inputs:
//   categories — [{ id, label }]
//   workByCat  — { catId: [piece, ...] }
//   pos        — { cat: <catIndex>, item: <itemIndex> } | null
//   onClose, onNavigate(pos)

import { useCallback, useEffect, useRef, useState } from "react";
import { MediaPlaceholder } from "@/components/Shared";
import { VimeoPlayer } from "@/components/VimeoPlayer";

// --- A multi-page document (EPK / deck) with its own page swipe ---
function PagesViewer({ piece }) {
  const srcs = piece.media.srcs || [];
  const [page, setPage] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startY = useRef(null);

  const go = useCallback(
    (dir) => {
      setPage((p) => Math.min(Math.max(p + dir, 0), srcs.length - 1));
    },
    [srcs.length]
  );

  // Reset to page 1 whenever this viewer is shown for a different piece
  useEffect(() => {
    setPage(0);
  }, [piece.id]);

  const onTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    setDragging(true);
  };
  const onTouchMove = (e) => {
    if (startY.current == null) return;
    let dy = e.touches[0].clientY - startY.current;
    if ((page === 0 && dy > 0) || (page === srcs.length - 1 && dy < 0)) dy *= 0.25;
    setDrag(dy);
  };
  const onTouchEnd = () => {
    setDragging(false);
    if (drag < -60) go(1);
    else if (drag > 60) go(-1);
    setDrag(0);
    startY.current = null;
  };

  const trackStyle = {
    transform: `translateY(calc(${-page * 100}% + ${drag}px))`,
    transition: dragging ? "none" : "transform 480ms cubic-bezier(.16,1.02,.3,1)",
  };

  return (
    <div
      className="ml-pages"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="ml-pages-track" style={trackStyle}>
        {srcs.map((src, i) => (
          <div className="ml-pages-page" key={src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`${piece.title} — page ${i + 1}`} />
          </div>
        ))}
      </div>

      {/* Page dots */}
      <div className="ml-pages-dots" aria-hidden="true">
        {srcs.map((src, i) => (
          <button
            key={src}
            className={`ml-pages-dot ${i === page ? "is-on" : ""}`}
            onClick={() => setPage(i)}
            aria-label={`Page ${i + 1}`}
          />
        ))}
      </div>

      {/* Page counter */}
      <div className="ml-pages-count mono">
        {String(page + 1).padStart(2, "0")} / {String(srcs.length).padStart(2, "0")}
      </div>

      {/* Desktop page arrows */}
      <div className="ml-pages-nav">
        <button onClick={() => go(-1)} disabled={page === 0} aria-label="Previous page">↑</button>
        <button onClick={() => go(1)} disabled={page === srcs.length - 1} aria-label="Next page">↓</button>
      </div>
    </div>
  );
}

// --- Renders a single piece's media (active cell only mounts heavy media) ---
function PieceMedia({ piece, active }) {
  const type = piece.media?.type;
  const isVimeo = type === "vimeo" && piece.media.id;
  const isVideoFile = type === "video" && piece.media.src;
  const isImage = type === "image" && piece.media.src;
  const isPages = type === "pages" && (piece.media.srcs || []).length > 0;
  const hasMedia = isVimeo || isVideoFile || isImage || isPages;
  // vimeo / video render 9:16; image renders 4:5; pages renders 16:9-ish landscape
  const frameClass = isPages ? "is-pages" : isImage ? "is-still" : "is-vertical";

  return (
    <div className={`ml-lightbox-slide ${active ? "is-active" : ""}`}>
      <div className={`crop ml-lightbox-frame ${frameClass}`}>
        <span className="crop-tr" />
        <span className="crop-bl" />

        {isVimeo && active && (
          <div style={{ position: "absolute", inset: 0 }}>
            <VimeoPlayer id={piece.media.id} mode="player" />
          </div>
        )}
        {isVimeo && !active && (
          <MediaPlaceholder fill tint={piece.tint} pattern={piece.pattern} label={piece.title} caption="" />
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

        {isPages && active && <PagesViewer piece={piece} />}
        {isPages && !active && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={piece.media.srcs[0]}
            alt={piece.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        )}

        {!hasMedia && (
          <MediaPlaceholder
            fill
            tint={piece.tint}
            pattern={piece.pattern}
            label={piece.title}
            caption="Forthcoming"
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

export function Lightbox({ categories, workByCat, pos, onClose, onNavigate }) {
  const open = pos != null;

  const [showHint, setShowHint] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const axis = useRef(null); // "x" | "y" — locked per gesture
  const start = useRef(null);
  const wheelLock = useRef(false);

  const catId = open ? categories[pos.cat].id : null;
  const pieces = open ? workByCat[catId] || [] : [];
  const piece = open ? pieces[pos.item] : null;
  // Is the current piece a multi-page doc? If so, vertical gestures belong to
  // ITS internal page swipe, so the lightbox only handles horizontal here.
  const pieceIsPages = piece?.media?.type === "pages";

  const goItem = useCallback(
    (dir) => {
      if (!open) return;
      const next = pos.item + dir;
      if (next >= 0 && next < pieces.length) onNavigate({ cat: pos.cat, item: next });
    },
    [open, pos, pieces, onNavigate]
  );

  const goCat = useCallback(
    (dir) => {
      if (!open) return;
      const nextCat = pos.cat + dir;
      if (nextCat >= 0 && nextCat < categories.length) {
        onNavigate({ cat: nextCat, item: 0 }); // land on first piece
      }
    },
    [open, pos, categories, onNavigate]
  );

  // Keyboard + wheel
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") goCat(1);
      else if (e.key === "ArrowLeft") goCat(-1);
      else if (e.key === "ArrowDown" && !pieceIsPages) goItem(1);
      else if (e.key === "ArrowUp" && !pieceIsPages) goItem(-1);
    };
    const onWheel = (e) => {
      if (wheelLock.current) return;
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (horizontal) {
        if (Math.abs(e.deltaX) < 24) return;
        wheelLock.current = true;
        goCat(e.deltaX > 0 ? 1 : -1);
      } else {
        if (pieceIsPages || Math.abs(e.deltaY) < 24) return;
        wheelLock.current = true;
        goItem(e.deltaY > 0 ? 1 : -1);
      }
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
  }, [open, onClose, goItem, goCat, pieceIsPages]);

  // One-time hint
  useEffect(() => {
    if (!open) return;
    if (typeof window !== "undefined" && window.__mlSwipeHintSeen) return;
    setShowHint(true);
    const t = setTimeout(() => {
      setShowHint(false);
      if (typeof window !== "undefined") window.__mlSwipeHintSeen = true;
    }, 4200);
    return () => clearTimeout(t);
  }, [open]);

  if (!open) return null;

  // --- Touch: lock to an axis once the gesture commits, then drag ---
  const onTouchStart = (e) => {
    start.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    axis.current = null;
    setDragging(true);
  };
  const onTouchMove = (e) => {
    if (!start.current) return;
    const dx = e.touches[0].clientX - start.current.x;
    const dy = e.touches[0].clientY - start.current.y;
    if (!axis.current) {
      if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
        axis.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      } else {
        return;
      }
    }
    if (axis.current === "x") {
      let d = dx;
      if ((pos.cat === 0 && dx > 0) || (pos.cat === categories.length - 1 && dx < 0)) d *= 0.25;
      setDragX(d);
    } else {
      // vertical gesture on a multi-page piece belongs to its internal swipe
      if (pieceIsPages) return;
      let d = dy;
      if ((pos.item === 0 && dy > 0) || (pos.item === pieces.length - 1 && dy < 0)) d *= 0.25;
      setDragY(d);
    }
  };
  const onTouchEnd = () => {
    setDragging(false);
    const threshold = 70;
    if (axis.current === "x") {
      if (dragX < -threshold) goCat(1);
      else if (dragX > threshold) goCat(-1);
    } else if (axis.current === "y" && !pieceIsPages) {
      if (dragY < -threshold) goItem(1);
      else if (dragY > threshold) goItem(-1);
    }
    setDragX(0);
    setDragY(0);
    axis.current = null;
    start.current = null;
  };

  // Horizontal track: one column per category
  const hStyle = {
    transform: `translateX(calc(${-pos.cat * 100}% + ${dragX}px))`,
    transition: dragging && axis.current === "x"
      ? "none"
      : "transform 520ms cubic-bezier(.16,1.02,.3,1)",
  };

  return (
    <div
      className="ml-lightbox"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={piece?.title || "Work viewer"}
    >
      <button className="ml-lightbox-close mono" onClick={onClose} aria-label="Close">
        Close ✕
      </button>

      {/* Category label + item counter */}
      <div className="ml-lightbox-count mono">
        {categories[pos.cat].label}
        {pieces.length > 1 && (
          <>
            {" — "}
            {String(pos.item + 1).padStart(2, "0")} / {String(pieces.length).padStart(2, "0")}
          </>
        )}
      </div>

      {/* Viewport clips the 2D track */}
      <div
        className="ml-lightbox-viewport"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Horizontal track — one column per category */}
        <div className="ml-lightbox-htrack" style={hStyle}>
          {categories.map((cat, ci) => {
            const catPieces = workByCat[cat.id] || [];
            const isCurrentCat = ci === pos.cat;
            // Only the current category's vertical position is live; others rest at 0
            const itemIndex = isCurrentCat ? pos.item : 0;
            const vStyle = {
              transform: `translateY(calc(${-itemIndex * 100}% + ${
                isCurrentCat && axis.current === "y" ? dragY : 0
              }px))`,
              transition:
                dragging && isCurrentCat && axis.current === "y"
                  ? "none"
                  : "transform 520ms cubic-bezier(.16,1.02,.3,1)",
            };
            return (
              <div className="ml-lightbox-col" key={cat.id}>
                <div className="ml-lightbox-vtrack" style={vStyle}>
                  {catPieces.length === 0 ? (
                    <div className="ml-lightbox-slide is-active">
                      <div className="ml-lightbox-empty mono">
                        Nothing here yet — {cat.label.toLowerCase()} coming soon.
                      </div>
                    </div>
                  ) : (
                    catPieces.map((p, ii) => (
                      <PieceMedia
                        key={p.id}
                        piece={p}
                        active={isCurrentCat && ii === pos.item}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop nav — horizontal (categories) + vertical (items) */}
      <div className="ml-lightbox-nav-h" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => goCat(-1)} disabled={pos.cat === 0} aria-label="Previous category">←</button>
        <button
          onClick={() => goCat(1)}
          disabled={pos.cat === categories.length - 1}
          aria-label="Next category"
        >
          →
        </button>
      </div>
      {pieces.length > 1 && !pieceIsPages && (
        <div className="ml-lightbox-nav" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => goItem(-1)} disabled={pos.item === 0} aria-label="Previous">↑</button>
          <button
            onClick={() => goItem(1)}
            disabled={pos.item === pieces.length - 1}
            aria-label="Next"
          >
            ↓
          </button>
        </div>
      )}

      {/* One-time hint — shows both axes */}
      {showHint && (
        <div className="ml-lightbox-hint" aria-hidden="true">
          <div className="ml-hint-gesture">
            <div className="ml-hint-chevrons">
              <span />
              <span />
              <span />
            </div>
            <div className="ml-hint-dot" />
          </div>
          <div className="ml-hint-label">Swipe ↕ for more · ↔ to switch</div>
        </div>
      )}
    </div>
  );
}
