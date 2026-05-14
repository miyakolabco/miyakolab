"use client";

// Work — Index page (home route /)
// Editorial list (left) + responsive preview window (right) that swaps on hover.

import { useState } from "react";
import { WORK } from "@/lib/work";
import { BrandMarkLarge } from "@/components/Logo";
import { WordReveal, MarqueeBelt } from "@/components/Anim";
import { MediaPlaceholder } from "@/components/Shared";
import { Footer } from "@/components/Footer";
import { useNavigate } from "@/lib/navigation";

export default function WorkIndex() {
  const [hover, setHover] = useState(0);
  const navigate = useNavigate();
  const active = WORK[hover];

  return (
    <>
      <div className="page page-fade">
        {/* ============ BRAND HERO ============ */}
        <section
          style={{
            minHeight: "calc(100vh - 64px)",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingTop: 96,
            paddingBottom: 0,
            overflow: "hidden",
          }}
        >
          {/* Top mono kicker line */}
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

          {/* Center — big M mark + tagline + sub */}
          <div className="frame" style={{ padding: "48px 32px" }}>
            <div
              className="r-split"
              style={{
                "--split": "minmax(0, 1.05fr) minmax(0, 1.6fr)",
                gap: "clamp(24px, 4vw, 64px)",
                alignItems: "center",
              }}
            >
              {/* Animated M — draws in rect-by-rect */}
              <div className="logo-draw" style={{ color: "var(--fg)" }}>
                <BrandMarkLarge />
              </div>

              {/* Tagline + sub */}
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

        {/* ============ WORK INDEX ============ */}
        <section className="frame" style={{ paddingTop: 96, paddingBottom: 40 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 32,
              paddingBottom: 22,
              borderBottom: "1px solid var(--rule)",
              flexWrap: "wrap",
            }}
          >
            <h2 className="display" style={{ fontSize: 40, margin: 0, letterSpacing: "-0.025em" }}>
              Selected work.
            </h2>
          </div>
        </section>

        {/* Index list + preview */}
        <section className="frame" style={{ paddingBottom: 80 }}>
          <div className="work-layout" style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 56 }}>
            {/* Left — the table */}
            <div>
              <div
                className="mono work-thead"
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1.6fr 2.7fr 28px",
                  gap: 14,
                  padding: "14px 0",
                  color: "var(--fg-dim)",
                  borderTop: "1px solid var(--rule)",
                  borderBottom: "1px solid var(--rule)",
                }}
              >
                <span>N°</span>
                <span>Project</span>
                <span style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 0.85fr", gap: 14 }}>
                  <span>Sector</span>
                  <span>Location</span>
                  <span>Year</span>
                </span>
                <span></span>
              </div>

              {WORK.map((w, i) => {
                const isHover = hover === i;
                return (
                  <a
                    key={w.id}
                    href={`/work/${w.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/work/${w.id}`, w.title);
                    }}
                    onMouseEnter={() => setHover(i)}
                    className="work-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "60px 1.6fr 2.7fr 28px",
                      gap: 14,
                      padding: "26px 0",
                      borderBottom: "1px solid var(--rule)",
                      alignItems: "baseline",
                      color: "var(--fg)",
                      background: isHover ? "color-mix(in srgb, var(--accent) 6%, transparent)" : "transparent",
                      transition: "background 160ms ease",
                      position: "relative",
                    }}
                  >
                    <span className="mono" style={{ color: "var(--fg-dim)" }}>
                      N° {w.n}
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <span
                        className="display"
                        style={{ fontSize: 28, lineHeight: 1, letterSpacing: "-0.02em" }}
                      >
                        {w.title}
                        {isHover && <span style={{ color: "var(--accent)", marginLeft: 10 }}>→</span>}
                      </span>
                      {isHover && (
                        <span
                          className="serif-it"
                          style={{ color: "var(--fg-dim)", fontSize: 15, marginTop: 4 }}
                        >
                          {w.blurb}
                        </span>
                      )}
                    </span>
                    <span
                      className="work-meta"
                      style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 0.85fr", gap: 14 }}
                    >
                      <span className="mono" style={{ color: "var(--fg-dim)" }}>
                        {w.sector}
                      </span>
                      <span className="mono" style={{ color: "var(--fg-dim)" }}>
                        {w.location}
                      </span>
                      <span className="mono" style={{ color: "var(--fg-dim)" }}>
                        {w.year}
                      </span>
                    </span>
                    <span
                      className="mono work-arrow"
                      style={{
                        color: isHover ? "var(--accent)" : "var(--fg-dim)",
                        justifySelf: "end",
                      }}
                    >
                      ↗
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Right — sticky preview */}
            <div className="work-preview" style={{ position: "relative" }}>
              <div style={{ position: "sticky", top: 100 }}>
                <div className="crop" style={{ position: "relative" }}>
                  <span className="crop-tr" />
                  <span className="crop-bl" />
                  <div style={{ aspectRatio: "4 / 5", position: "relative" }}>
                    <MediaPlaceholder
                      fill
                      label={active.title}
                      caption={active.role}
                      tint={active.tint}
                      pattern={active.pattern}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    rowGap: 10,
                    columnGap: 16,
                    marginTop: 22,
                  }}
                >
                  <span className="mono" style={{ color: "var(--fg-dim)" }}>Client</span>
                  <span>{active.title}</span>
                  <span className="mono" style={{ color: "var(--fg-dim)" }}>Year</span>
                  <span className="mono">{active.year}</span>
                  <span className="mono" style={{ color: "var(--fg-dim)" }}>Role</span>
                  <span>{active.role}</span>
                  <span className="mono" style={{ color: "var(--fg-dim)" }}>Theme</span>
                  <span className="mono" style={{ textTransform: "capitalize" }}>
                    {active.theme} · Auto
                  </span>
                </div>

                <button
                  className="btn"
                  onClick={() => navigate(`/work/${active.id}`, active.title)}
                  style={{ marginTop: 22, width: "100%", justifyContent: "space-between" }}
                >
                  Open case study
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
