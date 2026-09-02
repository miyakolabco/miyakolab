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
//   media     — what shows in the grid + lightbox. One of:
//                 Vimeo video:  { type: "vimeo", id: "1192188941" }
//                 Self-hosted:  { type: "video", src: "/my-video.mp4", poster: "/my-poster.jpg" }
//                 Single image: { type: "image", src: "/my-flyer.jpg" }
//                 Multi-page:   { type: "pages", srcs: ["/p1.jpg", "/p2.jpg", ...] }
//                   — a document (EPK, deck) with its own internal page swipe.
//                 Website:      { type: "site", url: "https://...", shot: "/screenshot.jpg" }
//                   — shows a screenshot in a browser frame + a "Visit site"
//                     button. `shot` is optional; without it a placeholder
//                     shows until you add one.
//               If you don't have the file yet, use { type: "video" } or
//               { type: "image" } with no id/src — a styled placeholder shows.
//   tint      — placeholder colour while there's no real media:
//               "shu" | "ink" | "paper" | "ash" | "deep"
//   pattern   — placeholder texture: "grain" | "bands" | "dots" | "wash" | "shoji"
//
// To add a Vimeo piece: upload to Vimeo, grab the numeric ID from its URL
// (vimeo.com/1192188941 -> id is "1192188941"), copy an entry, change fields.
// To add an image (flyer): drop the file in /public, reference as "/file.jpg".
// To add an EPK/deck: drop each page image in /public, list them in `srcs`.

// `short` is what the tab shows on phones, where the full label won't fit.
export const CATEGORIES = [
  { id: "video", label: "Video", short: "Video" },
  { id: "flyers", label: "Flyers", short: "Flyers" },
  { id: "epk", label: "DJ EPKs & Decks", short: "EPKs" },
  { id: "web", label: "Websites", short: "Web" },
];

export const WORK = [
  {
    id: "cueball-japan-saga",
    title: "Cueball — Japan Saga Story",
    category: "video",
    client: "DJ Cueball",
    year: "2026",
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
    year: "2026",
    media: { type: "image", src: "/ghost-bisi-may15.png" },
    tint: "shu",
    pattern: "grain",
  },
  {
    id: "buza-epk-2026",
    title: "DJ BUZA — 2026 EPK",
    category: "epk",
    client: "DJ Buza · Las Vegas",
    year: "2026",
    media: {
      type: "pages",
      srcs: [
        "/buza-epk-1.jpg",
        "/buza-epk-2.jpg",
        "/buza-epk-3.jpg",
        "/buza-epk-4.jpg",
        "/buza-epk-5.jpg",
        "/buza-epk-6.jpg",
      ],
    },
    tint: "deep",
    pattern: "wash",
  },
  {
    id: "eric-remy",
    title: "Eric Remy",
    category: "web",
    client: "Tech house DJ / producer · Las Vegas",
    year: "2026",
    media: { type: "site", url: "https://www.ericremy.com", shot: "/eric-remy.jpg" },
    tint: "deep",
    pattern: "bands",
  },
  {
    id: "bespoke-hg",
    title: "Bespoke Hospitality Group",
    category: "web",
    client: "Hospitality group · London",
    year: "2026",
    media: { type: "site", url: "https://www.bespokehg.co.uk", shot: "/bespoke-hg.jpg" },
    tint: "ink",
    pattern: "shoji",
  },
  {
    id: "maison-close-mayfair",
    title: "Maison Close — Mayfair",
    category: "web",
    client: "Nightclub · London",
    year: "2025",
    media: { type: "site", url: "https://www.maisonclose-mayfair.com", shot: "/maison-close.jpg" },
    tint: "shu",
    pattern: "grain",
  },
];

export function getWorkByCategory(category) {
  return WORK.filter((w) => w.category === category);
}
