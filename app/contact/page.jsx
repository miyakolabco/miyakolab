"use client";

// Contact — no form. The studio prefers to talk to clients directly,
// so the page's job is to make email + WhatsApp the obvious next step.
//
// TO EDIT YOUR DETAILS: change the constants just below.

import { useEffect, useState } from "react";
import { Reveal, FancyLink } from "@/components/Anim";
import { Footer } from "@/components/Footer";

// ----- Your contact details — edit these -----
const EMAIL = "alin@miyakolab.co";
// WhatsApp number in full international format, digits only (no +, spaces, dashes).
// Example: UK mobile 07911 123456 → "447911123456"
const WHATSAPP_NUMBER = "817084991493";
const WHATSAPP_PREFILL = "Hi Miyako Lab — I'd like to talk about a project.";
const INSTAGRAM = "https://www.instagram.com/miyakolab.co";
// ---------------------------------------------

const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`;

export default function Contact() {
  return (
    <>
      <div className="page page-fade">
        {/* Hero */}
        <section className="frame" style={{ paddingTop: 96, paddingBottom: 40 }}>
          <Reveal
            as="h1"
            className="display"
            style={{
              fontSize: "clamp(56px, 9vw, 132px)",
              margin: 0,
              maxWidth: 1280,
            }}
          >
            Let&apos;s talk it through.
          </Reveal>
          <Reveal
            delay={120}
            style={{
              marginTop: 28,
              maxWidth: 620,
              fontSize: 19,
              lineHeight: 1.5,
              color: "var(--fg-dim)",
            }}
          >
            No long forms. Send a message and you&apos;ll get a real reply —
            tell us what you&apos;re making, when you need it, and we&apos;ll
            take it from there.
          </Reveal>
        </section>

        {/* The two primary actions — email + WhatsApp, big and clear */}
        <section
          className="frame"
          style={{ paddingTop: 40, paddingBottom: 56, borderTop: "1px solid var(--rule)" }}
        >
          <div className="contact-actions r-cols-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Email */}
            <Reveal>
              <a href={`mailto:${EMAIL}`} className="contact-card">
                <span className="mono contact-card-kicker">Email</span>
                <span className="display contact-card-value">{EMAIL}</span>
                <span className="mono contact-card-go">
                  Write to us <span aria-hidden="true">→</span>
                </span>
              </a>
            </Reveal>

            {/* WhatsApp */}
            <Reveal delay={100}>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener"
                className="contact-card"
              >
                <span className="mono contact-card-kicker">WhatsApp</span>
                <span className="display contact-card-value">Message the studio</span>
                <span className="mono contact-card-go">
                  Open WhatsApp <span aria-hidden="true">→</span>
                </span>
              </a>
            </Reveal>
          </div>
        </section>

        {/* Supporting detail — what we do, where we are, the local clock */}
        <section
          className="frame"
          style={{ paddingTop: 40, paddingBottom: 96, borderTop: "1px solid var(--rule)" }}
        >
          <div className="r-split" style={{ "--split": "1.5fr 1fr", gap: 56 }}>
            <Reveal>
              <div className="eyebrow" style={{ marginBottom: 16 }}>How we work</div>
              <p style={{ fontSize: 20, lineHeight: 1.5, margin: 0, fontWeight: 300, maxWidth: 640 }}>
                Most projects are video and design for hospitality and
                nightlife — launch films, social campaigns, flyers, menus,
                print. We like to start with a conversation rather than a
                brief form: it&apos;s faster, and it&apos;s how good work
                usually starts.
              </p>
              <div style={{ display: "flex", gap: 24, marginTop: 28, flexWrap: "wrap" }}>
                <FancyLink href={`mailto:${EMAIL}`}>{EMAIL}</FancyLink>
                <FancyLink href={INSTAGRAM} target="_blank" rel="noopener">
                  Instagram
                </FancyLink>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <aside style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 12 }}>Studio</div>
                  <div className="serif-it" style={{ fontSize: 22, color: "var(--fg)", lineHeight: 1.4 }}>
                    Miyako Lab
                  </div>
                  <div style={{ color: "var(--fg-dim)", marginTop: 8, lineHeight: 1.6 }}>
                    <span className="jp">大阪</span> &middot; Osaka, Japan
                  </div>
                </div>

                <div>
                  <div className="eyebrow" style={{ marginBottom: 12 }}>Local time · Osaka</div>
                  <LocalClock />
                </div>

                <div className="mono" style={{ color: "var(--fg-dim)", fontSize: 11, lineHeight: 1.7 }}>
                  We reply Mon–Fri.
                  <br />
                  Messages in EN / JP welcome.
                </div>
              </aside>
            </Reveal>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

function LocalClock() {
  const [t, setT] = useState(null);

  useEffect(() => {
    setT(new Date());
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!t) {
    return (
      <div className="display" style={{ fontSize: 44, letterSpacing: "-0.04em", lineHeight: 1 }}>
        --<span style={{ color: "var(--fg-dim)" }}>:</span>--<span style={{ color: "var(--fg-dim)" }}>:</span>--
        <span className="mono" style={{ fontSize: 12, marginLeft: 12, color: "var(--fg-dim)" }}>JST</span>
      </div>
    );
  }

  // JST = UTC + 9
  const utc = t.getTime() + t.getTimezoneOffset() * 60000;
  const jst = new Date(utc + 9 * 3600 * 1000);
  const hh = String(jst.getHours()).padStart(2, "0");
  const mm = String(jst.getMinutes()).padStart(2, "0");
  const ss = String(jst.getSeconds()).padStart(2, "0");

  return (
    <div className="display" style={{ fontSize: 44, letterSpacing: "-0.04em", lineHeight: 1 }}>
      {hh}<span style={{ color: "var(--fg-dim)" }}>:</span>{mm}<span style={{ color: "var(--fg-dim)" }}>:</span>{ss}
      <span className="mono" style={{ fontSize: 12, marginLeft: 12, color: "var(--fg-dim)" }}>JST</span>
    </div>
  );
}
