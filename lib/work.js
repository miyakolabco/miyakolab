// Miyako Lab — selected work registry.
// Edit this file to update projects shown on the Work page, Services case ribbons,
// and the dynamic /work/[id] case study routes.

export const WORK = [
  {
    id: "maison-close",
    n: "001",
    title: "Maison Close Mayfair",
    sector: "Hospitality · Members club",
    location: "London, UK",
    year: "2026",
    theme: "dark",
    tint: "deep",
    pattern: "wash",
    role: "Identity, spatial, motion",
    blurb: "Placeholder copy — real description forthcoming.",
  },
  {
    id: "selene",
    n: "002",
    title: "Selene London",
    sector: "Hospitality · Restaurant",
    location: "Mayfair, London",
    year: "2025",
    theme: "light",
    tint: "paper",
    pattern: "shoji",
    role: "Identity, menu system, signage",
    blurb: "Placeholder copy — real description forthcoming.",
  },
  {
    id: "ghost-osaka",
    n: "003",
    title: "GHOST Osaka",
    sector: "Nightlife · Underground",
    location: "Osaka, JP",
    year: "2025",
    theme: "dark",
    tint: "shu",
    pattern: "dots",
    role: "Identity, motion, OOH",
    blurb: "Placeholder copy — real description forthcoming.",
  },
];

export function getWorkById(id) {
  return WORK.find((w) => w.id === id);
}
