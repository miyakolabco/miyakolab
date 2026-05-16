"use client";

// VimeoPlayer — embeds a Vimeo video with all Vimeo chrome stripped
// (no logo, title, byline, or "watch later"/share buttons). It hosts the
// file; the surrounding frame and styling are ours.
//
// `id` is the numeric Vimeo video ID (e.g. "1192188941").
// Modes:
//   background: muted autoplay loop, no controls — used for grid card previews
//   player:     autoplay with our own tap-to-pause — used inside the lightbox
//
// Why the overlay (player mode): a Vimeo iframe is a separate browsing
// context, so a touch that STARTS on the video is swallowed by the iframe
// and never reaches the lightbox's swipe handlers. A transparent overlay
// sits on top of the iframe — touch on a normal DOM element bubbles up to
// the lightbox, so swipes work no matter where they start. A tap on the
// overlay (no drag) toggles play/pause via Vimeo's postMessage API.

import { useEffect, useRef } from "react";

export function VimeoPlayer({ id, mode = "player" }) {
  const isBg = mode === "background";
  const iframeRef = useRef(null);
  const playingRef = useRef(true);
  const tapStart = useRef(null);

  // Vimeo player params — see https://developer.vimeo.com/player/sdk/embed
  const params = new URLSearchParams({
    badge: "0",
    autopause: "0",
    byline: "0",
    title: "0",
    portrait: "0",
    dnt: "1", // do not track
    ...(isBg
      ? {
          background: "1", // hides all controls, autoplays, loops, muted
        }
      : {
          autoplay: "1",
          controls: "0", // we provide our own tap-to-pause
        }),
  });

  const src = `https://player.vimeo.com/video/${id}?${params.toString()}`;

  // Send a command to the Vimeo player via postMessage
  const post = (method, value) => {
    const win = iframeRef.current?.contentWindow;
    if (win) {
      win.postMessage(
        JSON.stringify(value !== undefined ? { method, value } : { method }),
        "https://player.vimeo.com"
      );
    }
  };

  // On load, subscribe to the player's play/pause events
  const onIframeLoad = () => {
    post("addEventListener", "play");
    post("addEventListener", "pause");
  };

  // Keep playingRef in sync with the player's real state
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
      if (data.event === "pause") playingRef.current = false;
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [isBg]);

  // Background mode — plain iframe, no overlay (cards aren't swipe targets)
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

  // Player mode — iframe + transparent swipe/tap overlay.
  // Tap (negligible movement) toggles play/pause; a drag is left to bubble
  // up to the lightbox's swipe handlers.
  const lastTouchEnd = useRef(0);

  const togglePlay = () => {
    post(playingRef.current ? "pause" : "play");
    playingRef.current = !playingRef.current;
  };

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
    // a real tap = barely moved; a swipe = moved, leave it for the lightbox
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
      {/* Transparent overlay — owns touch so swipes reach the lightbox */}
      <div
        className="vimeo-swipe-overlay"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={onClick}
        style={{ position: "absolute", inset: 0, zIndex: 2, cursor: "pointer" }}
        aria-hidden="true"
      />
    </>
  );
}
