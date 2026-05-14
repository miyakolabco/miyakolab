"use client";

// Case study page at /work/[id]
// Editorial chrome, hero, and "Available on request" body.

import { useParams } from "next/navigation";
import { WORK, getWorkById } from "@/lib/work";
import { MediaPlaceholder } from "@/components/Shared";
import { Footer } from "@/components/Footer";
import { useNavigate } from "@/lib/navigation";

export default function CaseStudyPage() {
  const params = useParams();
  const id = params?.id;
  const navigate = useNavigate();

  const w = getWorkById(id) || WORK[0];
  const idx = WORK.findIndex((p) => p.id === w.id);
  const next = WORK[(idx + 1) % WORK.length];

  return (
    <>
      <div className="page page-fade">
        {/* Sub-nav */}
        <div
          style={{
            position: "sticky",
            top: 64,
            zIndex: 30,
            background: "color-mix(in srgb, var(--bg) 92%, transparent)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid var(--rule)",
          }}
        >
          <div
            className="frame"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: 48,
            }}
          >
            <div className="mono" style={{ color: "var(--fg-dim)" }}>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/", "Work");
                }}
                style={{ color: "var(--fg)" }}
              >
                ← Index
              </a>
              &nbsp;&nbsp;/&nbsp;&nbsp; N° {w.n}
            </div>
            <div className="mono" style={{ color: "var(--fg-dim)", display: "flex", gap: 18 }}>
              <span>{w.title}</span>
              <span>·</span>
              <span>{w.sector}</span>
              <span>·</span>
              <span>
                {w.location} · {w.year}
              </span>
            </div>
            <button
              className="mono"
              onClick={() => navigate(`/work/${next.id}`, next.title)}
              style={{
                background: "transparent",
                border: "1px solid var(--rule-strong)",
                padding: "8px 14px",
                color: "var(--fg)",
                letterSpacing: "0.14em",
              }}
            >
              N° {next.n} — {next.title} →
            </button>
          </div>
        </div>

        {/* Hero */}
        <section className="frame" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="mono" style={{ color: "var(--accent)", marginBottom: 18 }}>
            ● &nbsp; Case study · N° {w.n} &nbsp; — &nbsp; {w.sector}
          </div>
          <h1
            className="display"
            style={{
              fontSize: "clamp(56px, 10vw, 152px)",
              margin: 0,
              letterSpacing: "-0.045em",
              lineHeight: 0.9,
            }}
          >
            {w.title}.
          </h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: 56,
              marginTop: 36,
              paddingTop: 28,
              borderTop: "1px solid var(--rule)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--f-serif)",
                fontSize: 28,
                lineHeight: 1.3,
                margin: 0,
                fontWeight: 300,
                maxWidth: 780,
              }}
            >
              {w.blurb}
            </p>
            <div className="mono" style={{ color: "var(--fg-dim)", fontSize: 12, lineHeight: 2 }}>
              <div style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: 14 }}>
                <span>Client</span>
                <span>{w.title}</span>
                <span>Sector</span>
                <span>{w.sector}</span>
                <span>Location</span>
                <span>{w.location}</span>
                <span>Year</span>
                <span>{w.year}</span>
                <span>Role</span>
                <span>{w.role}</span>
                <span>Theme</span>
                <span style={{ textTransform: "capitalize" }}>{w.theme} · Auto</span>
              </div>
            </div>
          </div>
        </section>

        {/* Hero image */}
        <section className="frame" style={{ paddingBottom: 80 }}>
          <div className="crop">
            <span className="crop-tr" />
            <span className="crop-bl" />
            <div style={{ aspectRatio: "16 / 9" }}>
              <MediaPlaceholder fill tint={w.tint} pattern={w.pattern} label={w.title} caption={w.role} />
            </div>
          </div>
        </section>

        {/* On-request panel */}
        <section
          className="frame"
          style={{ paddingTop: 80, paddingBottom: 96, borderTop: "1px solid var(--rule)" }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 56 }}>
            <div className="eyebrow">Press kit · Status</div>
            <div>
              <h2
                className="display"
                style={{ fontSize: 56, margin: 0, letterSpacing: "-0.025em", maxWidth: 820 }}
              >
                The full case study is{" "}
                <em className="serif-it" style={{ color: "var(--fg-dim)" }}>
                  forthcoming
                </em>
                .
              </h2>
              <p
                style={{
                  fontSize: 19,
                  lineHeight: 1.55,
                  color: "var(--fg-dim)",
                  marginTop: 22,
                  maxWidth: 720,
                  fontWeight: 300,
                }}
              >
                Photography for {w.title} is in production and the press embargo lifts in {w.year}. For early access to plates, broadsheet PDFs, and motion supers, write to{" "}
                <a
                  href="mailto:alin@miyakolab.co"
                  style={{ color: "var(--accent)", borderBottom: "1px solid var(--accent)" }}
                >
                  alin@miyakolab.co
                </a>
                .
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 16,
                  marginTop: 40,
                  maxWidth: 720,
                }}
              >
                {[
                  ["Identity system", "Shipped"],
                  ["Wordmark & type", "Shipped"],
                  ["Motion package", "Pending"],
                  ["Spatial & signage", w.id === "maison-close" || w.id === "selene" ? "Shipped" : "Pending"],
                  ["Photography", "In production"],
                  ["Broadsheet · press", "Forthcoming"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      padding: "16px 18px",
                      border: "1px solid var(--rule)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span className="mono" style={{ color: "var(--fg)" }}>
                      {k}
                    </span>
                    <span
                      className="mono"
                      style={{
                        color: v === "Shipped" ? "var(--accent)" : "var(--fg-dim)",
                        fontSize: 10,
                        letterSpacing: "0.16em",
                      }}
                    >
                      {v === "Shipped" ? "● " : "○ "} {v}
                    </span>
                  </div>
                ))}
              </div>

              <button
                className="btn btn-accent"
                style={{ marginTop: 36 }}
                onClick={() => navigate("/contact", "Contact")}
              >
                Request the press kit →
              </button>
            </div>
          </div>
        </section>

        {/* Next */}
        <section
          style={{
            padding: "80px 0",
            borderTop: "1px solid var(--rule)",
            background: "var(--bg-2)",
          }}
        >
          <div className="frame">
            <div className="mono" style={{ color: "var(--fg-dim)", marginBottom: 24 }}>
              Next · N° {next.n} of {String(WORK.length).padStart(3, "0")}
            </div>
            <a
              href={`/work/${next.id}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/work/${next.id}`, next.title);
              }}
              style={{ color: "var(--fg)" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
                <h3
                  className="display"
                  style={{
                    fontSize: "clamp(48px, 7vw, 112px)",
                    margin: 0,
                    letterSpacing: "-0.04em",
                    lineHeight: 0.94,
                  }}
                >
                  {next.title}{" "}
                  <em className="serif-it" style={{ color: "var(--accent)" }}>
                    →
                  </em>
                </h3>
                <div className="crop">
                  <span className="crop-tr" />
                  <span className="crop-bl" />
                  <div style={{ aspectRatio: "16 / 11" }}>
                    <MediaPlaceholder
                      fill
                      tint={next.tint}
                      pattern={next.pattern}
                      label={next.title}
                      caption={`${next.location} · ${next.year}`}
                    />
                  </div>
                </div>
              </div>
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
