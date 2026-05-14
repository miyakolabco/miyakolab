"use client";

// Services — Identity. Motion. Matter.

import { MediaPlaceholder } from "@/components/Shared";
import { Footer } from "@/components/Footer";
import { useNavigate } from "@/lib/navigation";

const SECTIONS = [
  {
    n: "I.",
    kicker: "Identity",
    title: "Brand systems, built like buildings.",
    body:
      "Strategy, naming, identity systems, type, voice. We design marks that withstand context — a matchbook, a Soho façade, a press release. Foundational, not decorative.",
    capabilities: [
      "Brand strategy & positioning",
      "Naming & verbal identity",
      "Visual identity systems",
      "Custom typography",
      "Tone & editorial voice",
    ],
    cases: [
      ["001", "Maison Close Mayfair", "maison-close"],
      ["002", "Selene London", "selene"],
      ["003", "GHOST Osaka", "ghost-osaka"],
    ],
    tint: "shu",
    pattern: "wash",
  },
  {
    n: "II.",
    kicker: "Motion",
    title: "Identity that moves, sounds, plays.",
    body:
      "Brand films, broadcast packages, OOH motion, supers, sonic logos. We treat motion as the resting state of contemporary identity — written first, never afterthought.",
    capabilities: [
      "Brand films & teasers",
      "Broadcast packages",
      "Motion identity",
      "Sonic branding",
      "Out-of-home animation",
    ],
    cases: [
      ["003", "GHOST Osaka", "ghost-osaka"],
      ["001", "Maison Close Mayfair", "maison-close"],
      ["002", "Selene London", "selene"],
    ],
    tint: "ink",
    pattern: "bands",
  },
  {
    n: "III.",
    kicker: "Matter",
    title: "Spaces, surfaces, things you touch.",
    body:
      "Spatial identity, signage, packaging, menus, uniforms. Made in collaboration with architects, print houses, and fabricators. We art-direct the wood, the wax, the weight.",
    capabilities: [
      "Spatial identity & signage",
      "Menus, books, broadsheets",
      "Packaging & labels",
      "Uniforms & textiles",
      "Material art direction",
    ],
    cases: [
      ["001", "Maison Close Mayfair", "maison-close"],
      ["002", "Selene London", "selene"],
      ["003", "GHOST Osaka", "ghost-osaka"],
    ],
    tint: "deep",
    pattern: "shoji",
  },
];

export default function Services() {
  const navigate = useNavigate();

  return (
    <>
      <div className="page page-fade">
        {/* Hero */}
        <section className="frame" style={{ paddingTop: 96, paddingBottom: 56 }}>
          <h1
            className="display"
            style={{
              fontSize: "clamp(56px, 9vw, 132px)",
              margin: 0,
              maxWidth: 1280,
            }}
          >
            Three disciplines, one practice.
          </h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: 56,
              marginTop: 56,
              paddingTop: 36,
              borderTop: "1px solid var(--rule)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--f-serif)",
                fontSize: 28,
                lineHeight: 1.32,
                margin: 0,
                fontWeight: 300,
                maxWidth: 760,
                color: "var(--fg)",
              }}
            >
              Three disciplines, one team. A typical engagement pulls all three into the room at once: a name is a film is a sign is a menu.
            </p>
            <div style={{ color: "var(--fg-dim)", fontSize: 14, lineHeight: 1.7, maxWidth: 360 }}>
              We work as a small team out of three cities and ship in three media. Most clients hire us for one discipline and end up using us for all three before the doors open.
            </div>
          </div>
        </section>

        {/* Three discipline sections */}
        {SECTIONS.map((s, i) => (
          <section
            key={s.n}
            className="frame"
            style={{
              paddingTop: 96,
              paddingBottom: 96,
              borderBottom: i < SECTIONS.length - 1 ? "1px solid var(--rule)" : "none",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 56 }}>
              {/* Left — meta */}
              <div>
                <div className="mono" style={{ color: "var(--fg-dim)", marginBottom: 18 }}>
                  {s.n} &nbsp; / &nbsp; {s.kicker}
                </div>
                <h2
                  className="display"
                  style={{
                    fontSize: 64,
                    margin: 0,
                    letterSpacing: "-0.03em",
                    lineHeight: 0.95,
                    maxWidth: 520,
                  }}
                >
                  {s.title}
                </h2>
              </div>

              {/* Right — body, capabilities, case ribbon */}
              <div>
                <p
                  style={{
                    fontSize: 20,
                    lineHeight: 1.55,
                    color: "var(--fg)",
                    margin: 0,
                    maxWidth: 640,
                    fontWeight: 300,
                  }}
                >
                  {s.body}
                </p>

                {/* Capabilities */}
                <div style={{ marginTop: 56 }}>
                  <div className="eyebrow" style={{ marginBottom: 14 }}>
                    Capabilities
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {s.capabilities.map((c, j) => (
                      <li
                        key={c}
                        className="mono"
                        style={{
                          display: "grid",
                          gridTemplateColumns: "36px 1fr auto",
                          gap: 14,
                          padding: "16px 0",
                          borderTop: "1px solid var(--rule)",
                          fontSize: 14,
                          letterSpacing: "0.04em",
                          textTransform: "none",
                        }}
                      >
                        <span style={{ color: "var(--fg-dim)" }}>{(j + 1).toString().padStart(2, "0")}</span>
                        <span style={{ color: "var(--fg)" }}>{c}</span>
                        <span style={{ color: "var(--fg-dim)" }}>●</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cases ribbon */}
                <div style={{ marginTop: 56 }}>
                  <div className="eyebrow" style={{ marginBottom: 18 }}>
                    Selected · {s.kicker.toLowerCase()}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                    {s.cases.map(([n, name, id]) => (
                      <a
                        key={id}
                        href={`/work/${id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/work/${id}`, name);
                        }}
                        className="crop"
                        style={{ display: "block", color: "var(--fg)" }}
                      >
                        <span className="crop-tr" />
                        <span className="crop-bl" />
                        <div style={{ aspectRatio: "4 / 5" }}>
                          <MediaPlaceholder
                            fill
                            tint={s.tint}
                            pattern={s.pattern}
                            label={name}
                            caption={`N° ${n}`}
                          />
                        </div>
                        <div className="mono" style={{ marginTop: 10, color: "var(--fg-dim)" }}>
                          N° {n} &nbsp;→&nbsp; {name}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Engagement */}
        <section
          className="frame"
          style={{ paddingTop: 96, paddingBottom: 120, borderTop: "1px solid var(--rule)" }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 56 }}>
            <h2
              className="display"
              style={{ fontSize: "clamp(36px, 4vw, 56px)", margin: 0, letterSpacing: "-0.025em", maxWidth: 480 }}
            >
              How an engagement runs.
            </h2>
            <div style={{ maxWidth: 720 }}>
              <p style={{ fontSize: 19, lineHeight: 1.55, margin: 0, fontWeight: 300, color: "var(--fg)" }}>
                We start with a long conversation about the room — who walks in, what they wear, what they order, what the matchbook says in their pocket two weeks later. That conversation becomes a brief, the brief becomes one or two directions, and the direction we pick gets built across whatever surfaces it needs: an identity, a film, a façade, a menu.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.6, marginTop: 22, color: "var(--fg-dim)" }}>
                Typical engagements run ten to fourteen weeks. We don&apos;t sell packages and we don&apos;t do retainers under a season. The shortest piece of work we&apos;ll take on is a name; the longest is everything you can see and touch inside the door.
              </p>
              <button
                className="btn btn-accent"
                style={{ marginTop: 32 }}
                onClick={() => navigate("/contact", "Contact")}
              >
                Send a brief →
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
