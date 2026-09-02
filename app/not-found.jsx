// 404 — kept in the site's voice and design system.
import { LogoMark } from "@/components/Logo";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="page page-fade">
      <section className="frame" style={{ paddingTop: 140, paddingBottom: 120, minHeight: "70vh" }}>
        <div style={{ color: "var(--accent)", marginBottom: 28 }}>
          <LogoMark size={44} />
        </div>
        <h1 className="display" style={{ fontSize: "clamp(44px, 8vw, 120px)", margin: 0, letterSpacing: "-0.04em", lineHeight: 0.96 }}>
          Nothing here
          <br />
          after dark.
        </h1>
        <p style={{ marginTop: 28, maxWidth: 480, fontSize: 18, lineHeight: 1.5, color: "var(--fg-dim)" }}>
          That page doesn&apos;t exist, or it moved. The work is on the homepage.
        </p>
        <p style={{ marginTop: 32 }}>
          <a href="/" className="mono" style={{ color: "var(--fg)", letterSpacing: "0.14em", borderBottom: "1px solid var(--accent)", paddingBottom: 4 }}>
            Back to the work →
          </a>
        </p>
      </section>
    </main>
  );
}
