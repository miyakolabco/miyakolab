// Miyako Lab — work registry.
//
// This is the ONE file to edit when you want to add, remove, or reorder
// the pieces shown on the homepage. Each entry is one piece of work.
//
// Fields:
//   id        — unique short slug (lowercase, dashes). Used internally.
//   title     — display name of the piece
//   category  — one of: "video" | "flyers" | "print"
//               (this is what the homepage tabs filter on)
//   client    — who it was for (optional, shown as small label)
//   year      — year string (optional)
//   media     — what shows in the grid + lightbox:
//                 { type: "video", src: "/my-video.mp4", poster: "/my-poster.jpg" }
//                 { type: "image", src: "/my-flyer.jpg" }
//               If you don't have the file yet, leave `src` empty ("") and a
//               styled placeholder shows instead.
//   tint      — placeholder colour while there's no real media:
//               "shu" | "ink" | "paper" | "ash" | "deep"
//   pattern   — placeholder texture: "grain" | "bands" | "dots" | "wash" | "shoji"
//
// To add a piece: copy an entry, change the fields, drop your file in /public.

export const CATEGORIES = [
  { id: "video", label: "Video" },
  { id: "flyers", label: "Flyers" },
  { id: "print", label: "Print" },
];

export const WORK = [
  {
    id: "ghost-osaka-teaser",
    title: "GHOST Osaka — Launch Teaser",
    category: "video",
    client: "GHOST Osaka",
    year: "2025",
    media: { type: "video", src: "", poster: "" },
    tint: "shu",
    pattern: "dots",
  },
  {
    id: "selene-summer-film",
    title: "Selene — Summer Campaign Film",
    category: "video",
    client: "Selene London",
    year: "2025",
    media: { type: "video", src: "", poster: "" },
    tint: "deep",
    pattern: "wash",
  },
  {
    id: "maison-close-reel",
    title: "Maison Close — Members Reel",
    category: "video",
    client: "Maison Close Mayfair",
    year: "2026",
    media: { type: "video", src: "", poster: "" },
    tint: "ink",
    pattern: "bands",
  },
  {
    id: "ghost-friday-flyer",
    title: "GHOST — Friday Residency Flyer",
    category: "flyers",
    client: "GHOST Osaka",
    year: "2025",
    media: { type: "image", src: "" },
    tint: "shu",
    pattern: "grain",
  },
  {
    id: "selene-launch-flyer",
    title: "Selene — Opening Night Flyer",
    category: "flyers",
    client: "Selene London",
    year: "2025",
    media: { type: "image", src: "" },
    tint: "paper",
    pattern: "shoji",
  },
  {
    id: "maison-close-invite",
    title: "Maison Close — Launch Invitation",
    category: "flyers",
    client: "Maison Close Mayfair",
    year: "2026",
    media: { type: "image", src: "" },
    tint: "deep",
    pattern: "wash",
  },
  {
    id: "selene-menu",
    title: "Selene — Seasonal Menu System",
    category: "print",
    client: "Selene London",
    year: "2025",
    media: { type: "image", src: "" },
    tint: "paper",
    pattern: "shoji",
  },
  {
    id: "maison-close-collateral",
    title: "Maison Close — Print Collateral",
    category: "print",
    client: "Maison Close Mayfair",
    year: "2026",
    media: { type: "image", src: "" },
    tint: "ink",
    pattern: "bands",
  },
];

export function getWorkByCategory(category) {
  return WORK.filter((w) => w.category === category);
}
