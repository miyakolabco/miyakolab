"use client";

// VimeoPlayer — embeds a Vimeo video with all Vimeo chrome stripped.
//
// Player mode (lightbox): the iframe is its own browsing context, which
// means a touch starting on the video is swallowed and never reaches the
// lightbox's swipe handlers. A transparent overlay sits on top of the
// iframe so swipes bubble up to the lightbox. To keep the visitor in
// control of audio + play state, we provide our own controls on top of
// the overlay:
//   - centre tap = play/pause toggle, with a brief icon flash so the
//     visitor sees it worked
//   - bottom-right button = mute/unmute (browsers force autoplay muted,
//     so this is the way the visitor turns sound on)
//
// All control commands go to Vimeo via the postMessage Player API.

import { useEffect, useRef, useState } from "react";

export function VimeoPlayer({ id, mode = "player" }) {
  const isBg = mode === "background";
  const iframeRef = useRef(null);
  const playingRef = useRef(true);
  const tapStart = useRef(null);
  const lastTouchEnd = useRef(0);

  // Visible state for our custom controls
  const [muted, setMuted] = useState(true);
  const [flash, setFlash] = useState(null); // "play" | "pause" | null

  // Vimeo player params — see https://developer.vimeo.com/player/sdk/embed
  const params = new URLSearchParams({
    badge: "0",
    autopause: "0",
    byline: "0",
    title: "0",
    portrait: "0",
    dnt: "1",
    ...(isBg
      ? {
          background: "1", // hides controls, autoplays muted + loops
        }
      : {
          autoplay: "1",
          controls: "0", // ours, not theirs
          muted: "1", // required for autoplay; user unmutes via our button
        }),
  });

  const src = `https://player.vimeo.com/video/${id}?${params.toString()}`;

  // postMessage helpers
  const post = (method, value) => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    win.postMessage(
      JSON.stringify(value !== undefined ? { method, value } : { method }),
      "https://player.vimeo.com"
    );
  };
  const onIframeLoad = () => {
    post("addEventListener", "play");
    post("addEventListener", "pause");
    post("addEventListener", "volumechange");
  };

  // Sync local state with the real player
  useEffect(() => {
    if (isBg) return;
    const onMsg = (e) => {
      if (e.origin !== "https://player.vimeo.com") return;
      let data;
      try {
        data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      if (data.event === "play") playingRef.current = true;
      else if (data.event === "pause") playingRef.current = false;
      else if (data.event === "volumechange" && data.data) {
        setMuted(data.data.volume === 0);
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [isBg]);

  // Background mode — no overlay, no controls
  if (isBg) {
    return (
      <iframe
        src={src}
        title="Miyako Lab — video"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, display: "block" }}
      />
    );
  }

  // Show a brief icon flash so taps feel responsive
  const flashIcon = (kind) => {
    setFlash(kind);
    setTimeout(() => setFlash(null), 480);
  };

  const togglePlay = () => {
    const next = !playingRef.current;
    post(next ? "play" : "pause");
    playingRef.current = next;
    flashIcon(next ? "play" : "pause");
  };

  const toggleMute = () => {
    const next = !muted;
    post("setVolume", next ? 0 : 1);
    setMuted(next);
  };

  // Touch on the overlay — tap toggles play; swipe bubbles to the lightbox
  const onTouchStart = (e) => {
    const t = e.touches[0];
    tapStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    lastTouchEnd.current = Date.now();
    if (!tapStart.current) return;
    const t = e.changedTouches[0];
    const moved =
      Math.abs(t.clientX - tapStart.current.x) +
      Math.abs(t.clientY - tapStart.current.y);
    if (moved < 12) togglePlay();
    tapStart.current = null;
  };
  const onClick = () => {
    // ignore the synthetic click that follows a touch tap
    if (Date.now() - lastTouchEnd.current < 600) return;
    togglePlay();
  };

  return (
    <>
      <iframe
        ref={iframeRef}
        src={src}
        title="Miyako Lab — video"
        onLoad={onIframeLoad}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, display: "block" }}
      />

      {/* Transparent swipe/tap overlay */}
      <div
        className="vimeo-swipe-overlay"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={onClick}
        style={{ position: "absolute", inset: 0, zIndex: 2, cursor: "pointer" }}
        aria-hidden="true"
      />

      {/* Brief centre flash on play/pause so taps feel responsive */}
      {flash && (
        <div className="vimeo-flash" aria-hidden="true">
          {flash === "play" ? (
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
          )}
        </div>
      )}

      {/* Mute / unmute button — its own click target, doesn't toggle play */}
      <button
        type="button"
        className="vimeo-mute"
        onClick={(e) => {
          e.stopPropagation();
          toggleMute();
        }}
        onTouchEnd={(e) => {
          // stop the swipe/tap overlay from also handling this
          e.stopPropagation();
        }}
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? (
          // muted = speaker with X
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.59 3L19 9.41 17.59 8 15 10.59 12.41 8 11 9.41 13.59 12 11 14.59 12.41 16 15 13.41 17.59 16 19 14.59 16.59 12z" />
          </svg>
        ) : (
          // unmuted = speaker with waves
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05A4.5 4.5 0 0 0 16.5 12zM14 3.23v2.06A7 7 0 0 1 14 18.7v2.07A9 9 0 0 0 14 3.23z" />
          </svg>
        )}
      </button>
    </>
  );
}
