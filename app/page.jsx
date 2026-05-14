"use client";

// Work — the homepage. Portfolio-first:
//   1. Hero (M-mask showreel + tagline)
//   2. Compact services strip — what the studio does, no hard sell
//   3. Categorised work grid (Video / Flyers / Print tabs)
//   4. Tapping a piece opens it full-size in a lightbox

import { useState } from "react";
import { WORK, CATEGORIES, getWorkByCategory } from "@/lib/work";
import { WordReveal, MarqueeBelt, Reveal } from "@/components/Anim";
import { MediaPlaceholder, MShowreel } from "@/components/Shared";
import { Lightbox } from "@/components/Lightbox";
import { VimeoPlayer } from "@/components/VimeoPlayer";
import { Footer } from "@/components/Footer";

// The short "what we do" list — informative, not a sales pitch.
const SERVICES = [
  "Video & motion",
  "Flyers & social",
  "Menus & print",
  "Brand identity",
];

export default function WorkPage() {
  const [activeCat, setActiveCat] = useState("video");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const pieces = getWorkByCategory(activeCat);

  return (
    <>
      <div className="page page-fade">
        {/* ============ HERO ============ */}
        <section
          style={{
            minHeight: "calc(100vh - 64px)",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingTop: 96,
            overflow: "hidden",
          }}
        >
          <div
            className="frame"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              color: "var(--fg-dim)",
            }}
          >
            <span className="mono">
              <span style={{ color: "var(--accent)" }}>●</span> &nbsp; Multimedia design studio
            </span>
            <span className="mono">
              <span className="jp">大阪</span> &middot; Osaka, Japan
            </span>
          </div>

          <div className="frame" style={{ padding: "48px 32px" }}>
            <div
              className="r-split"
              style={{
                "--split": "minmax(0, 1.05fr) minmax(0, 1.6fr)",
                gap: "clamp(24px, 4vw, 64px)",
                alignItems: "center",
              }}
            >
              {/* The M mark as a window onto the studio showreel.
                  Add a video: <MShowreel src="/showreel.mp4" /> */}
              <div style={{ color: "var(--fg)" }}>
                <MShowreel />
              </div>

              <div>
                <h1
                  className="display"
                  style={{
                    fontSize: "clamp(56px, 9vw, 144px)",
                    margin: 0,
                    lineHeight: 0.92,
                    letterSpacing: "-0.045em",
                    fontWeight: 700,
                  }}
                >
                  <span style={{ display: "block" }}>
                    <WordReveal text="Identity," delay={350} />
                  </span>
                  <span style={{ display: "block" }}>
                    <WordReveal text="motion," delay={500} />
                  </span>
                  <span style={{ display: "block", color: "var(--accent)" }}>
                    <WordReveal text="matter." delay={650} />
                  </span>
                </h1>

                <div
                  style={{
                    marginTop: 36,
                    maxWidth: 540,
                    fontSize: 18,
                    lineHeight: 1.5,
                    color: "var(--fg-dim)",
                  }}
                >
                  <WordReveal
                    text="Miyako Lab makes brand identity, motion, and spatial work for places that mostly exist after dark."
                    delay={950}
                    stagger={26}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: scroll cue + marquee */}
          <div>
            <div
              className="frame"
              style={{
                display: "flex",
                alignItems: "center",
                paddingBottom: 32,
                color: "var(--fg-dim)",
              }}
            >
              <span className="mono">
                <span style={{ color: "var(--accent)" }}>↓</span> &nbsp; Scroll &middot; Selected work
              </span>
            </div>

            <div
              style={{
                borderTop: "1px solid var(--rule)",
                borderBottom: "1px solid var(--rule)",
                padding: "26px 0",
                fontFamily: "var(--f-display)",
                fontWeight: 700,
                fontSize: "clamp(40px, 6vw, 84px)",
                letterSpacing: "-0.035em",
                color: "var(--fg)",
                background: "var(--bg)",
              }}
            >
              <MarqueeBelt
                gap={64}
                items={[
                  "Identity",
                  "Motion",
                  "Matter",
                  <span className="jp" style={{ color: "var(--accent)" }} key="kanji">都研</span>,
                  "Miyako Lab",
                  "Osaka",
                  "Identity",
                  "Motion",
                  "Matter",
                ]}
              />
            </div>
          </div>
        </section>

        {/* ============ SERVICES STRIP ============ */}
        {/* Compact — tells clients the range without a whole page of selling */}
        <section className="frame" style={{ paddingTop: 80, paddingBottom: 24 }}>
          <Reveal
            className="services-strip"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              gap: "16px 40px",
              paddingBottom: 28,
              borderBottom: "1px solid var(--rule)",
            }}
          >
            <span className="eyebrow" style={{ flexShrink: 0 }}>
              What we do
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 28px" }}>
              {SERVICES.map((s, i) => (
                <span
                  key={s}
                  className="display"
                  style={{
                    fontSize: "clamp(20px, 2.6vw, 30px)",
                    letterSpacing: "-0.02em",
                    color: i === 0 ? "var(--fg)" : "var(--fg)",
                  }}
                >
                  {s}
                  {i < SERVICES.length - 1 && (
                    <span style={{ color: "var(--accent)", marginLeft: "28px" }}>/</span>
                  )}
                </span>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ============ CATEGORISED WORK GRID ============ */}
        <section className="frame" style={{ paddingTop: 40, paddingBottom: 80 }}>
          {/* Heading + category tabs */}
          <Reveal
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 24,
              flexWrap: "wrap",
              marginBottom: 36,
            }}
          >
            <h2
              className="display"
              style={{ fontSize: "clamp(40px, 7vw, 72px)", margin: 0, letterSpacing: "-0.03em" }}
            >
              Selected work.
            </h2>

            <div className="work-tabs" style={{ display: "flex", gap: 8 }}>
              {CATEGORIES.map((cat) => {
                const active = cat.id === activeCat;
                const count = WORK.filter((w) => w.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCat(cat.id)}
                    className="mono work-tab"
                    style={{
                      padding: "10px 16px",
                      border: `1px solid ${active ? "var(--accent)" : "var(--rule-strong)"}`,
                      background: active ? "var(--accent)" : "transparent",
                      color: active ? "var(--kami)" : "var(--fg)",
                      letterSpacing: "0.12em",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      transition: "background 160ms ease, border-color 160ms ease, color 160ms ease",
                    }}
                  >
                    {cat.label}
                    <span style={{ opacity: 0.6 }}>{String(count).padStart(2, "0")}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* The grid — re-keyed on category so items re-reveal when you switch */}
          <div key={activeCat} className="work-grid">
            {pieces.map((piece, i) => {
              const mediaType = piece.media?.type;
              // vimeo + self-hosted video are vertical 9:16; images are 4:5
              const vertical = mediaType === "vimeo" || mediaType === "video";
              const isVimeo = mediaType === "vimeo" && piece.media.id;
              const isVideoFile = mediaType === "video" && piece.media.src;
              const isImage = mediaType === "image" && piece.media.src;
              const hasMedia = isVimeo || isVideoFile || isImage;
              return (
                <Reveal key={piece.id} delay={i * 70}>
                  <button
                    className="work-card"
                    onClick={() => setLightboxIndex(i)}
                    aria-label={`Open ${piece.title}`}
                  >
                    <div className="crop work-card-frame">
                      <span className="crop-tr" />
                      <span className="crop-bl" />
                      <div
                        style={{
                          aspectRatio: vertical ? "9 / 16" : "4 / 5",
                          position: "relative",
                        }}
                      >
                        {isVimeo && (
                          <VimeoPlayer id={piece.media.id} mode="background" />
                        )}
                        {isVideoFile && (
                          <video
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            poster={piece.media.poster || undefined}
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                            onMouseEnter={(e) => e.currentTarget.play()}
                            onMouseLeave={(e) => {
                              e.currentTarget.pause();
                              e.currentTarget.currentTime = 0;
                            }}
                          >
                            <source src={piece.media.src} />
                          </video>
                        )}
                        {isImage && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={piece.media.src}
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
                            caption={vertical ? "Video" : "Artwork"}
                          />
                        )}

                        {/* Play affordance on video cards */}
                        {vertical && (
                          <div className="work-card-play" aria-hidden="true">
                            <span className="work-card-tri" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="work-card-meta">
                      <span
                        className="display"
                        style={{ fontSize: 19, letterSpacing: "-0.015em", lineHeight: 1.15 }}
                      >
                        {piece.title}
                      </span>
                      <span className="mono" style={{ color: "var(--fg-dim)" }}>
                        {[piece.client, piece.year].filter(Boolean).join(" · ")}
                      </span>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </section>
      </div>

      <Footer />

      {/* Full-size viewer — swipe up/down through the active category */}
      <Lightbox
        pieces={pieces}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(next) => setLightboxIndex(next)}
      />
    </>
  );
}
