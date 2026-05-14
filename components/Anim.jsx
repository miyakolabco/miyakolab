"use client";

// Miyako Lab — animation helpers (client components)
// Custom cursor, scroll reveals, page-transition curtain, word reveal, marquee.

import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@/lib/navigation";

// --- Custom Shu cursor (pointer-fine devices only) ---
export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
      dot.classList.remove("is-hidden");

      const el = e.target;
      const interactive = el && el.closest("a, button, [data-cursor='link'], input, textarea, [role='button']");
      dot.classList.toggle("is-link", !!interactive);
    };

    const onLeave = () => dot.classList.add("is-hidden");
    const onEnter = () => dot.classList.remove("is-hidden");

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);

    let raf;
    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="ml-cursor-ring" />
      <div ref={dotRef} className="ml-cursor is-hidden" />
    </>
  );
}

// --- Page transition curtain ---
export function PageCurtain() {
  const { curtainTrigger, curtainLabel } = useNavigation();
  const [phase, setPhase] = useState("idle");
  const lastTrigger = useRef(curtainTrigger);

  useEffect(() => {
    if (curtainTrigger === lastTrigger.current) return;
    lastTrigger.current = curtainTrigger;
    setPhase("in");
    const t1 = setTimeout(() => setPhase("out"), 900);
    const t2 = setTimeout(() => setPhase("idle"), 900 + 560 + 60);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [curtainTrigger]);

  if (phase === "idle") return null;

  const STRIPES = 6;
  const STRIPE_STAGGER_IN = 60;

  return (
    <div className={`ml-curtain is-${phase}`}>
      {Array.from({ length: STRIPES }).map((_, i) => {
        const delay = phase === "in" ? i * STRIPE_STAGGER_IN : 0;
        return <div key={i} className="ml-stripe" style={{ animationDelay: `${delay}ms` }} />;
      })}
      <div className="ml-curtain-label">
        <span>{curtainLabel}</span>
        <span className="ml-curtain-rule" />
      </div>
    </div>
  );
}

// --- Scroll reveal hook + component ---
export function useScrollReveal(ref, options = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            obs.unobserve(el);
          }
        });
      },
      { threshold: options.threshold ?? 0.15, rootMargin: options.rootMargin ?? "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, options.threshold, options.rootMargin]);
}

export function Reveal({ as: Tag = "div", delay = 0, children, style = {}, className = "", ...rest }) {
  const ref = useRef(null);
  useScrollReveal(ref);
  return (
    <Tag ref={ref} className={`io-reveal ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  );
}

// --- Word reveal — split a phrase into words wrapped in masked spans ---
export function WordReveal({ text, delay = 0, stagger = 80, style = {}, className = "" }) {
  const words = text.split(/(\s+)/);
  let wordIndex = 0;
  return (
    <span className={className} style={style}>
      {words.map((w, i) => {
        if (/^\s+$/.test(w)) return <span key={i}>{w}</span>;
        const d = delay + wordIndex * stagger;
        wordIndex += 1;
        return (
          <span className="reveal-word" key={i}>
            <span style={{ animationDelay: `${d}ms` }}>{w}</span>
          </span>
        );
      })}
    </span>
  );
}

// --- Marquee belt ---
export function MarqueeBelt({ items, gap = 56 }) {
  const content = items.concat(items).map((t, i) => (
    <span key={i} style={{ display: "inline-flex", gap, alignItems: "center" }}>
      <span>{t}</span>
      <span style={{ color: "var(--accent)", fontSize: "0.6em" }}>●</span>
    </span>
  ));
  return (
    <div className="ml-marq">
      <div className="ml-marq-track" style={{ gap }}>
        {content}
      </div>
    </div>
  );
}

// --- FancyLink — for navigation/footer links with rotor + arrow + underline hover ---
export function FancyLink({ children, href, onClick, target, rel, style = {}, withArrow = true }) {
  return (
    <a href={href} onClick={onClick} target={target} rel={rel} className="ml-flink" style={style}>
      <span className="ml-flink-rotor">
        <span className="l">{children}</span>
        <span className="l ac">{children}</span>
      </span>
      {withArrow && <span className="ml-flink-arrow">→</span>}
    </a>
  );
}

// TypeCycle — types a word, holds, deletes it, types the next. Loops.
// `words` is the list to cycle through. The caret blinks continuously.
// Honours prefers-reduced-motion: shows the first word static, no animation.
export function TypeCycle({ words = [], typeMs = 70, deleteMs = 38, holdMs = 1400 }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | holding | deleting
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current && words.length) setText(words[0]);
  }, [words]);

  useEffect(() => {
    if (reduced.current || !words.length) return;
    const current = words[wordIndex];
    let t;

    if (phase === "typing") {
      if (text.length < current.length) {
        t = setTimeout(() => setText(current.slice(0, text.length + 1)), typeMs);
      } else {
        t = setTimeout(() => setPhase("holding"), holdMs);
      }
    } else if (phase === "holding") {
      t = setTimeout(() => setPhase("deleting"), 120);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        t = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteMs);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(t);
  }, [text, phase, wordIndex, words, typeMs, deleteMs, holdMs]);

  return (
    <span className="ml-typecycle">
      <span className="ml-typecycle-word">{text}</span>
      <span className="ml-typecycle-caret" aria-hidden="true" />
    </span>
  );
}
