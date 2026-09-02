"use client";

// Lightbox — full-screen viewer with 2D TikTok-style navigation:
//   vertical   = pieces within the current category (swipe up = next)
//   horizontal = jump between categories (swipe right = next category)
// Each horizontal swipe lands on the first piece of the target category.
//
// Special cases:
//   - A "pages" media type (EPK / deck) has its OWN internal vertical
//     page swipe — vertical lightbox gestures are disabled while open.
//   - The Web category is rendered as ONE slide showing all 3 sites
//     cascading as tilted browser windows — vertical nav is disabled.
//   - Multi-finger touches bail out so the browser can pinch-zoom.

import { useCallback, useEffect, useRef, useState } from "react";
import { MediaPlaceholder } from "@/components/Shared";
import { VimeoPlayer } from "@/components/VimeoPlayer";

// --- A multi-page document (EPK / deck) with its own page swipe ---
function PagesViewer({ piece }) {
  const srcs = piece.media.srcs || [];
  const [page, setPage] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [showRotate, setShowRotate] = useState(false);
  const startY = useRef(null);
  const pinching = useRef(false);

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

  // EPK pages are landscape — prompt the visitor to rotate if their phone
  // is held in portrait. The hint disappears the moment they turn it.
  useEffect(() => {
    const check = () => {
      const portrait =
        typeof window !== "undefined" &&
        window.innerWidth < 760 &&
        window.innerHeight > window.innerWidth;
      setShowRotate(portrait);
    };
    check();
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);

  // Multi-finger touches bail out so the browser can pinch-zoom.
  const onTouchStart = (e) => {
    if (e.touches.length > 1) {
      pinching.current = true;
      return;
    }
    pinching.current = false;
    startY.current = e.touches[0].clientY;
    setDragging(true);
  };
  const onTouchMove = (e) => {
    if (pinching.current || e.touches.length > 1) return;
    if (startY.current == null) return;
    let dy = e.touches[0].clientY - startY.current;
    if ((page === 0 && dy > 0) || (page === srcs.length - 1 && dy < 0)) dy *= 0.25;
    setDrag(dy);
  };
  const onTouchEnd = () => {
    if (pinching.current) {
      pinching.current = false;
      return;
    }
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
            <img src={src} alt={`${piece.title} — page ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} decoding="async" />
          </div>
        ))}
      </div>

      {/* Tap zones — left half = previous page, right half = next page */}
      <button
        className="ml-pages-tap ml-pages-tap-prev"
        onClick={() => go(-1)}
        disabled={page === 0}
        aria-label="Previous page"
      />
      <button
        className="ml-pages-tap ml-pages-tap-next"
        onClick={() => go(1)}
        disabled={page === srcs.length - 1}
        aria-label="Next page"
      />

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

      {/* Rotate-phone hint — EPK pages are landscape */}
      {showRotate && (
        <div className="ml-rotate-hint" aria-hidden="true">
          <div className="ml-rotate-phone">
            <span className="ml-rotate-phone-body" />
          </div>
          <div className="ml-rotate-label">Rotate your phone to view</div>
          <div className="ml-rotate-sublabel mono">Pinch to zoom in</div>
        </div>
      )}
    </div>
  );
}

// --- A website piece: screenshot in a browser-chrome frame + visit button ---
function SiteFrame({ piece }) {
  const { url, shot } = piece.media;
  let host = url;
  try {
    host = new URL(url).host.replace(/^www\./, "");
  } catch {}

  return (
    <div className="ml-site">
      <div className="ml-site-chrome">
        <span className="ml-site-dot" />
        <span className="ml-site-dot" />
        <span className="ml-site-dot" />
        <div className="ml-site-url mono">{host}</div>
      </div>
      <div className="ml-site-shot">
        {shot ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={shot} alt={piece.title} />
        ) : (
          <MediaPlaceholder
            fill
            tint={piece.tint}
            pattern={piece.pattern}
            label={piece.title}
            caption="Screenshot — forthcoming"
          />
        )}
      </div>
      <a
        className="ml-site-visit mono"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        Visit site ↗
      </a>
    </div>
  );
}

// --- The whole Web category as one cascading-windows showcase ---
const COUNT_WORDS = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"];

function SitesStack({ sites }) {
  const n = sites.length;
  const count = COUNT_WORDS[n] || String(n);
  return (
    <div className="ml-stack">
      <div className="ml-stack-bg" aria-hidden="true" />

      <div className="ml-stack-header">
        <div className="mono ml-stack-kicker">Websites</div>
        <div className="display ml-stack-title">
          {count} {n === 1 ? "site" : "sites"}, live now.
        </div>
        <div className="mono ml-stack-hint">Tap any window to visit ↗</div>
      </div>

      <div className="ml-stack-windows">
        {sites.map((piece, i) => {
          const { url, shot } = piece.media;
          let host = url;
          try {
            host = new URL(url).host.replace(/^www\./, "");
          } catch {}
          return (
            <a
              key={piece.id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`ml-stack-window ml-stack-window-${i + 1}`}
              aria-label={`Visit ${piece.title}`}
            >
              <div className="ml-stack-chrome">
                <span /><span /><span />
                <span className="ml-stack-url mono">{host}</span>
              </div>
              <div className="ml-stack-screen">
                {shot ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={shot} alt={piece.title} loading="lazy" decoding="async" />
                ) : (
                  <MediaPlaceholder
                    fill
                    tint={piece.tint}
                    pattern={piece.pattern}
                    label={piece.title}
                  />
                )}
              </div>
              <div className="ml-stack-caption mono">
                <span className="ml-stack-caption-title">{piece.title}</span>
                {piece.client && <span className="ml-stack-caption-client">{piece.client}</span>}
                <span className="ml-stack-caption-arrow">↗</span>
              </div>
            </a>
          );
        })}
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
  const isSite = type === "site" && piece.media.url;
  const hasMedia = isVimeo || isVideoFile || isImage || isPages || isSite;
  const frameClass =
    isPages || isSite ? "is-pages" : isImage ? "is-still" : "is-vertical";

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

        {isSite && <SiteFrame piece={piece} />}

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
  const axis = useRef(null);
  const start = useRef(null);
  const pinching = useRef(false);
  const wheelLock = useRef(false);
  const closeRef = useRef(null);

  const catId = open ? categories[pos.cat].id : null;
  const pieces = open ? workByCat[catId] || [] : [];
  const piece = open ? pieces[pos.item] : null;
  const pieceIsPages = piece?.media?.type === "pages";
  const isWebCat = catId === "web";
  // Vertical gestures inside the lightbox are disabled when the current
  // slide owns vertical (multi-page docs) or when there's only one slide
  // (web stack).
  const lockVertical = pieceIsPages || isWebCat;

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
        onNavigate({ cat: nextCat, item: 0 });
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
      else if (e.key === "ArrowDown" && !lockVertical) goItem(1);
      else if (e.key === "ArrowUp" && !lockVertical) goItem(-1);
    };
    const onWheel = (e) => {
      if (wheelLock.current) return;
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (horizontal) {
        if (Math.abs(e.deltaX) < 24) return;
        wheelLock.current = true;
        goCat(e.deltaX > 0 ? 1 : -1);
      } else {
        if (lockVertical || Math.abs(e.deltaY) < 24) return;
        wheelLock.current = true;
        goItem(e.deltaY > 0 ? 1 : -1);
      }
      setTimeout(() => {
        wheelLock.current = false;
      }, 560);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
    };
  }, [open, onClose, goItem, goCat, lockVertical]);

  // Lock the page behind the viewer. `overflow: hidden` alone isn't honoured
  // by iOS Safari (the page still scrolls/bounces under your finger), so the
  // body is pinned in place and restored to the same scroll position on close.
  // Also moves keyboard focus into the dialog and hands it back afterwards.
  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const scrollY = window.scrollY;
    const previouslyFocused = document.activeElement;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      window.scrollTo({ top: scrollY, behavior: "instant" });
      if (previouslyFocused && typeof previouslyFocused.focus === "function") {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [open]);

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
    // Multi-finger gesture? Let the browser handle pinch-zoom.
    if (e.touches.length > 1) {
      pinching.current = true;
      return;
    }
    pinching.current = false;
    start.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    axis.current = null;
    setDragging(true);
  };
  const onTouchMove = (e) => {
    if (pinching.current || e.touches.length > 1) return;
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
      if (lockVertical) return;
      let d = dy;
      if ((pos.item === 0 && dy > 0) || (pos.item === pieces.length - 1 && dy < 0)) d *= 0.25;
      setDragY(d);
    }
  };
  const onTouchEnd = () => {
    if (pinching.current) {
      pinching.current = false;
      return;
    }
    setDragging(false);
    const threshold = 70;
    if (axis.current === "x") {
      if (dragX < -threshold) goCat(1);
      else if (dragX > threshold) goCat(-1);
    } else if (axis.current === "y" && !lockVertical) {
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
      <button ref={closeRef} className="ml-lightbox-close mono" onClick={onClose} aria-label="Close">
        Close ✕
      </button>

      {/* Category label + item counter */}
      <div className="ml-lightbox-count mono">
        {categories[pos.cat].label}
        {!isWebCat && pieces.length > 1 && (
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
        <div className="ml-lightbox-htrack" style={hStyle}>
          {categories.map((cat, ci) => {
            const catPieces = workByCat[cat.id] || [];
            const isCurrentCat = ci === pos.cat;
            const isWeb = cat.id === "web";
            // Web column has 1 slide; others use pos.item
            const itemIndex = isWeb ? 0 : (isCurrentCat ? pos.item : 0);
            const vStyle = {
              transform: `translateY(calc(${-itemIndex * 100}% + ${
                isCurrentCat && axis.current === "y" && !lockVertical ? dragY : 0
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
                  ) : isWeb ? (
                    <div className={`ml-lightbox-slide ${isCurrentCat ? "is-active" : ""}`}>
                      <div className="ml-lightbox-frame is-stack">
                        <SitesStack sites={catPieces} />
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

      {/* Desktop nav — horizontal (categories) always; vertical hidden when locked */}
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
      {pieces.length > 1 && !lockVertical && (
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

      {/* One-time hint */}
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
