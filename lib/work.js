// Miyako Lab — work registry.
//
// This is the ONE file to edit when you want to add, remove, or reorder
// the pieces shown on the homepage. Each entry is one piece of work.
//
// Fields:
//   id        — unique short slug (lowercase, dashes). Used internally.
//   title     — display name of the piece
//   category  — one of: "video" | "flyers" | "epk"
//               (this is what the homepage tabs filter on)
//   client    — who it was for (optional, shown as small label)
//   year      — year string (optional)
//   media     — what shows in the grid + lightbox:
//                 Vimeo video:  { type: "vimeo", id: "1192188941" }
//                 Self-hosted:  { type: "video", src: "/my-video.mp4", poster: "/my-poster.jpg" }
//                 Image:        { type: "image", src: "/my-flyer.jpg" }
//               If you don't have the file yet, use { type: "video" } or
//               { type: "image" } with no id/src — a styled placeholder shows.
//   tint      — placeholder colour while there's no real media:
//               "shu" | "ink" | "paper" | "ash" | "deep"
//   pattern   — placeholder texture: "grain" | "bands" | "dots" | "wash" | "shoji"
//
// To add a Vimeo piece: upload to Vimeo, grab the numeric ID from its URL
// (vimeo.com/1192188941 → id is "1192188941"), copy an entry, change fields.
// To add an image (flyer / EPK page): drop the file in /public, reference it
// as "/filename.png".

export const CATEGORIES = [
  { id: "video", label: "Video" },
  { id: "flyers", label: "Flyers" },
  { id: "epk", label: "DJ EPKs & Decks" },
];

export const WORK = [
  {
    id: "cueball-japan-saga",
    title: "Cueball — Japan Saga Story",
    category: "video",
    client: "DJ Cueball",
    year: "2025",
    media: { type: "vimeo", id: "1192188941" },
    tint: "shu",
    pattern: "dots",
  },
  {
    id: "city-fiestas-cuckoo",
    title: "City Fiestas — Cuckoo Fun House",
    category: "video",
    client: "City Fiestas · London",
    year: "2024",
    media: { type: "vimeo", id: "1192193450" },
    tint: "deep",
    pattern: "wash",
  },
  {
    id: "silk-throwback-leeds",
    title: "Silk Throwback — Leeds",
    category: "video",
    client: "Silk · Leeds",
    year: "2025",
    media: { type: "vimeo", id: "1192194246" },
    tint: "ink",
    pattern: "bands",
  },
  {
    id: "ghost-bisi-may15",
    title: "GHOST — DJ BISI, May 15",
    category: "flyers",
    client: "GHOST Osaka",
    year: "2025",
    media: { type: "image", src: "/ghost-bisi-may15.png" },
    tint: "shu",
    pattern: "grain",
  },
];

export function getWorkByCategory(category) {
  return WORK.filter((w) => w.category === category);
}
