"use client";

// Nav — fixed top, page switcher

import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/Logo";
import { useNavigate } from "@/lib/navigation";

export function Nav() {
  const navigate = useNavigate();
  const pathname = usePathname();

  const items = [
    { href: "/", label: "Work", match: (p) => p === "/" || p.startsWith("/work") },
    { href: "/services", label: "Services", match: (p) => p === "/services" },
    { href: "/studio", label: "Studio", match: (p) => p === "/studio" },
    { href: "/contact", label: "Contact", match: (p) => p === "/contact" },
  ];

  return (
    <nav
      className="ml-nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "color-mix(in srgb, var(--bg) 86%, transparent)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div
        className="ml-nav-inner"
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "0 32px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/", "Work");
          }}
          style={{ display: "flex", alignItems: "center", color: "var(--fg)" }}
          aria-label="Miyako Lab — Home"
        >
          <LogoMark size={24} />
        </a>

        <ul
          className="ml-nav-links"
          style={{
            display: "flex",
            gap: 4,
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {items.map((it) => {
            const active = it.match(pathname || "/");
            return (
              <li key={it.href}>
                <a
                  href={it.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(it.href, it.label);
                  }}
                  className="mono"
                  style={{
                    padding: "10px 16px",
                    color: active ? "var(--fg)" : "var(--fg-dim)",
                    letterSpacing: "0.14em",
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {active && (
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        background: "var(--accent)",
                        display: "inline-block",
                      }}
                    />
                  )}
                  {it.label}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="/contact"
          onClick={(e) => {
            e.preventDefault();
            navigate("/contact", "Contact");
          }}
          className="ml-cta ml-nav-cta"
        >
          <span className="ml-cta-bg" />
          <span className="ml-cta-rotor">
            <span className="ml-cta-line">Start a project</span>
            <span className="ml-cta-line">Send a brief</span>
          </span>
          <span className="ml-cta-arrow" />
        </a>
      </div>
    </nav>
  );
}
