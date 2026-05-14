"use client";

// VimeoPlayer — embeds a Vimeo video with all Vimeo chrome stripped
// (no logo, title, byline, or "watch later"/share buttons). It hosts the
// file; the surrounding frame and styling are ours.
//
// `id` is the numeric Vimeo video ID (e.g. "1192188941").
// Modes:
//   background: muted autoplay loop, no controls — used for grid card previews
//   player:     controls shown, autoplay — used inside the lightbox

export function VimeoPlayer({ id, mode = "player" }) {
  const isBg = mode === "background";

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
          controls: "1",
        }),
  });

  const src = `https://player.vimeo.com/video/${id}?${params.toString()}`;

  return (
    <iframe
      src={src}
      title="Miyako Lab — video"
      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
      referrerPolicy="strict-origin-when-cross-origin"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        border: 0,
        display: "block",
      }}
    />
  );
}
