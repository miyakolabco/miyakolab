"use client";

// Footer — editorial, with FancyLink hovers throughout.

import { LogoLockup } from "@/components/Logo";
import { FancyLink } from "@/components/Anim";
import { useNavigate } from "@/lib/navigation";

export function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        marginTop: 120,
        borderTop: "1px solid var(--rule)",
        background: "var(--bg)",
        color: "var(--fg)",
      }}
    >
      <div className="frame" style={{ paddingTop: 64, paddingBottom: 28 }}>
        {/* Big monogram row */}
        <div
          className="r-cols-4"
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 1fr 1fr",
            gap: 48,
            paddingBottom: 56,
          }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              <span style={{ color: "var(--accent)" }}>●</span> &nbsp; New work
            </div>
            <h3
              className="display"
              style={{
                fontSize: "clamp(32px, 5vw, 44px)",
                margin: "0 0 24px",
                maxWidth: 460,
                fontWeight: 700,
              }}
            >
              Build something memorable.
            </h3>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                navigate("/contact", "Contact");
              }}
              className="ml-cta"
            >
              <span className="ml-cta-bg" />
              <span className="ml-cta-rotor">
                <span className="ml-cta-line">Start a project</span>
                <span className="ml-cta-line">Send a brief</span>
              </span>
              <span className="ml-cta-arrow" />
            </a>
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Index</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
              {[
                ["/", "Work"],
                ["/services", "Services"],
                ["/studio", "Studio"],
                ["/contact", "Contact"],
              ].map(([href, label]) => (
                <li key={href}>
                  <FancyLink
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(href, label);
                    }}
                  >
                    {label}
                  </FancyLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Practice</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12, color: "var(--fg-dim)" }}>
              <li>Identity systems</li>
              <li>Motion &amp; film</li>
              <li>Spatial &amp; signage</li>
              <li>Packaging &amp; print</li>
              <li>Digital product</li>
            </ul>
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Contact</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
              <li>
                <FancyLink href="mailto:alin@miyakolab.co">alin@miyakolab.co</FancyLink>
              </li>
              <li>
                <FancyLink href="https://www.instagram.com/miyakolab.co" target="_blank" rel="noopener">
                  Instagram
                </FancyLink>
              </li>
              <li>
                <FancyLink href="https://uk.linkedin.com/in/alin-miyako" target="_blank" rel="noopener">
                  LinkedIn
                </FancyLink>
              </li>
              <li>
                <FancyLink href="#" target="_blank" rel="noopener">
                  Are.na
                </FancyLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Big wordmark — fades to Shu on hover */}
        <div
          className="ml-footer-mark"
          style={{
            color: "var(--fg)",
            borderTop: "1px solid var(--rule)",
            borderBottom: "1px solid var(--rule)",
            padding: "44px 0",
            display: "flex",
            justifyContent: "center",
            transition: "color 600ms cubic-bezier(.2,.8,.2,1)",
            cursor: "default",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--fg)";
          }}
        >
          <LogoLockup height={120} style={{ width: "100%", maxWidth: 1280 }} />
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div className="mono" style={{ color: "var(--fg-dim)" }}>
            © {year} &nbsp; Miyako Lab &nbsp;·&nbsp; All rights reserved.
          </div>
          <div
            className="mono"
            style={{
              letterSpacing: "0.2em",
              color: "var(--fg-dim)",
            }}
          >
            <span className="jp">大阪</span> &nbsp;·&nbsp; Osaka, Japan
          </div>
        </div>
      </div>
    </footer>
  );
}
