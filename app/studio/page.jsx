"use client";

// Studio — minimal until real content arrives.

import { MediaPlaceholder } from "@/components/Shared";
import { FancyLink } from "@/components/Anim";
import { Footer } from "@/components/Footer";

export default function Studio() {
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
              maxWidth: 1300,
            }}
          >
            A multimedia design studio,
            <br />
            rooted in Japan, working globally.
          </h1>
        </section>

        {/* Manifesto block */}
        <section
          className="frame"
          style={{
            paddingTop: 56,
            paddingBottom: 96,
            borderTop: "1px solid var(--rule)",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 56 }}>
            <div>
              <div
                className="jp"
                style={{
                  fontSize: 64,
                  lineHeight: 1,
                  color: "var(--accent)",
                  fontWeight: 500,
                }}
              >
                都
                <br />
                研
              </div>
              <div className="mono" style={{ color: "var(--fg-dim)", marginTop: 18, lineHeight: 1.7 }}>
                都 / miyako — capital, city
                <br />
                研 / lab — to study, to grind
              </div>
            </div>
            <div style={{ fontSize: 24, lineHeight: 1.45, fontWeight: 300, maxWidth: 820 }}>
              <p style={{ margin: "0 0 22px" }}>
                Miyako Lab makes brand identity, motion, and spatial work for places that mostly exist after dark — bars, members&apos; clubs, restaurants, the music industry.
              </p>
              <p style={{ margin: "0 0 22px" }}>
                The studio is led by Alin Miyako and has been running for over ten years across branding, motion, web, and print.
              </p>
              <p style={{ margin: 0, color: "var(--fg-dim)" }}>
                Identity, motion, matter — three disciplines, one practice.
              </p>
            </div>
          </div>
        </section>

        {/* Founder */}
        <section className="frame" style={{ paddingTop: 0, paddingBottom: 96 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 56, alignItems: "center" }}>
            <div style={{ aspectRatio: "4 / 5" }}>
              <MediaPlaceholder
                fill
                tint="ink"
                pattern="grain"
                label="Alin Miyako"
                caption="Creative Director — portrait forthcoming"
              />
            </div>
            <div style={{ maxWidth: 640 }}>
              <div className="eyebrow" style={{ marginBottom: 16 }}>Founder</div>
              <h2 className="display" style={{ fontSize: 56, margin: 0, letterSpacing: "-0.03em", lineHeight: 1 }}>
                Alin Miyako.
              </h2>
              <div className="mono" style={{ marginTop: 12, color: "var(--fg-dim)" }}>
                Creative Director · 10+ years
              </div>
              <p style={{ fontSize: 19, lineHeight: 1.55, marginTop: 28, fontWeight: 300 }}>
                Alin is the sole creative force behind Miyako Lab — running strategy, identity, motion, and direction on every project. Outside the studio: photography and exploring Japan.
              </p>
              <div style={{ display: "flex", gap: 24, marginTop: 28 }}>
                <FancyLink href="https://uk.linkedin.com/in/alin-miyako" target="_blank" rel="noopener">
                  LinkedIn
                </FancyLink>
                <FancyLink href="https://www.instagram.com/miyakolab.co" target="_blank" rel="noopener">
                  Instagram
                </FancyLink>
              </div>
            </div>
          </div>
        </section>

        {/* Portrait */}
        <section className="frame" style={{ paddingTop: 0, paddingBottom: 96 }}>
          <div style={{ aspectRatio: "16 / 9", maxWidth: 1100, margin: "0 auto" }}>
            <MediaPlaceholder
              fill
              tint="ink"
              pattern="grain"
              label="Studio · portrait"
              caption="Photograph forthcoming — your image here"
            />
          </div>
        </section>

        {/* Press */}
        <section
          className="frame"
          style={{ paddingTop: 96, paddingBottom: 96, borderTop: "1px solid var(--rule)" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 32,
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <h2 className="display" style={{ fontSize: 56, margin: 0, letterSpacing: "-0.03em" }}>
              Press &amp; recognition.
            </h2>
            <div className="mono" style={{ color: "var(--fg-dim)" }}>[ Add real entries ]</div>
          </div>
          <div
            style={{
              border: "1px dashed var(--rule-strong)",
              padding: "48px 32px",
              textAlign: "center",
              color: "var(--fg-dim)",
            }}
          >
            <div className="serif-it" style={{ fontSize: 20 }}>
              Press features, awards, and notable mentions will live here.
            </div>
            <div className="mono" style={{ marginTop: 14 }}>
              Send entries to{" "}
              <a
                href="mailto:alin@miyakolab.co"
                style={{ color: "var(--accent)", borderBottom: "1px solid var(--accent)" }}
              >
                alin@miyakolab.co
              </a>
            </div>
          </div>
        </section>

        {/* Clients */}
        <section
          style={{
            padding: "80px 0",
            borderTop: "1px solid var(--rule)",
            background: "var(--bg-2)",
          }}
        >
          <div className="frame">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 32,
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              <h2 className="display" style={{ fontSize: 44, margin: 0, letterSpacing: "-0.03em" }}>
                Selected clients.
              </h2>
              <div className="mono" style={{ color: "var(--fg-dim)" }}>[ Add real names ]</div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 32,
                fontFamily: "var(--f-display)",
                fontWeight: 700,
                fontSize: 28,
                letterSpacing: "-0.02em",
                color: "var(--fg)",
                rowGap: 22,
              }}
            >
              {["Maison Close", "Selene", "GHOST"].map((c) => (
                <div key={c} style={{ paddingTop: 4 }}>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
