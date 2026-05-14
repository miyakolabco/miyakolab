"use client";

// Contact — Brief form + addresses

import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";

const PROJECT_TYPES = [
  ["identity", "Identity system"],
  ["motion", "Motion / film"],
  ["spatial", "Spatial / signage"],
  ["packaging", "Packaging / print"],
  ["full", "Full multimedia"],
];

const BUDGETS = [
  ["small", "£60k – £120k"],
  ["med", "£120k – £280k"],
  ["large", "£280k – £600k"],
  ["xl", "£600k +"],
];

const STAGES = [
  ["brief", "I have a brief"],
  ["scoping", "I'm scoping"],
  ["press", "Press / speaking"],
  ["studio", "Studio enquiry"],
];

export default function Contact() {
  const [type, setType] = useState("identity");
  const [budget, setBudget] = useState("med");
  const [stage, setStage] = useState("brief");
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    brief: "",
    when: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <>
      <div className="page page-fade">
        {/* Hero */}
        <section className="frame" style={{ paddingTop: 96, paddingBottom: 40 }}>
          <h1
            className="display"
            style={{
              fontSize: "clamp(56px, 9vw, 132px)",
              margin: 0,
              maxWidth: 1280,
            }}
          >
            Tell us what you&apos;re opening.
          </h1>
        </section>

        {/* Form + sidebar */}
        <section
          className="frame"
          style={{ paddingTop: 56, paddingBottom: 96, borderTop: "1px solid var(--rule)" }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 72 }}>
            {!submitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                style={{ display: "grid", gap: 48 }}
              >
                <FormGroup n="01" label="Project type" hint="Most engagements are full multimedia.">
                  <ChipRow value={type} setValue={setType} options={PROJECT_TYPES} />
                </FormGroup>

                <FormGroup n="02" label="Where are you?" hint="No wrong answer.">
                  <ChipRow value={stage} setValue={setStage} options={STAGES} />
                </FormGroup>

                <FormGroup n="03" label="Budget range" hint="In GBP, indicative.">
                  <ChipRow value={budget} setValue={setBudget} options={BUDGETS} />
                </FormGroup>

                <FormGroup n="04" label="You">
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <Field
                      label="Full name"
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Renji Takeda"
                    />
                    <Field
                      label="Company / project"
                      value={form.company}
                      onChange={update("company")}
                      placeholder="Mary Mary Bar Ltd."
                    />
                  </div>
                  <Field
                    label="Email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="renji@studio.com"
                  />
                </FormGroup>

                <FormGroup n="05" label="Brief" hint="Three sentences is plenty.">
                  <textarea
                    value={form.brief}
                    onChange={update("brief")}
                    rows={5}
                    placeholder="Opening a 24-seat bar in Soho. Need everything from the name to the menu to the matchbook. Doors Sept '26."
                    style={inputStyle({ height: "auto", padding: "16px 0", resize: "vertical" })}
                  />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <Field
                      label="Open date"
                      value={form.when}
                      onChange={update("when")}
                      placeholder="Q3 / late next year"
                    />
                    <div style={{ display: "flex", alignItems: "flex-end" }}>
                      <button
                        type="button"
                        className="btn"
                        style={{ width: "100%", justifyContent: "space-between" }}
                      >
                        Attach deck · PDF / KEY
                        <span>+</span>
                      </button>
                    </div>
                  </div>
                </FormGroup>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: 24,
                    borderTop: "1px solid var(--rule)",
                  }}
                >
                  <div className="mono" style={{ color: "var(--fg-dim)" }}>
                    Or write directly ·{" "}
                    <a href="mailto:alin@miyakolab.co" style={{ color: "var(--accent)" }}>
                      alin@miyakolab.co
                    </a>
                  </div>
                  <button type="submit" className="btn btn-accent">
                    Send brief →
                  </button>
                </div>
              </form>
            ) : (
              <div
                className="crop"
                style={{
                  padding: "64px 48px",
                  background: "color-mix(in srgb, var(--accent) 8%, var(--bg-2))",
                }}
              >
                <span className="crop-tr" />
                <span className="crop-bl" />
                <div className="mono" style={{ color: "var(--accent)", marginBottom: 24 }}>
                  ● &nbsp; Received · {new Date().toISOString().slice(0, 10)}
                </div>
                <h2 className="display" style={{ fontSize: 56, margin: 0, letterSpacing: "-0.02em" }}>
                  Thank you, {form.name?.split(" ")[0] || "friend"}.
                </h2>
                <p style={{ fontSize: 18, color: "var(--fg-dim)", maxWidth: 540, marginTop: 18 }}>
                  We read every brief by hand. Alin will be in touch within 48 hours, usually less. If there is fit, we will book a kickoff call within ten working days.
                </p>
                <button
                  className="btn"
                  style={{ marginTop: 28 }}
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", company: "", email: "", brief: "", when: "" });
                  }}
                >
                  ← Send another
                </button>
              </div>
            )}

            {/* Sidebar */}
            <aside style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 12 }}>Studio</div>
                <div className="serif-it" style={{ fontSize: 22, color: "var(--fg)", lineHeight: 1.4 }}>
                  Miyako Lab Inc.
                </div>
                <div style={{ color: "var(--fg-dim)", marginTop: 8, lineHeight: 1.6 }}>
                  Tokyo &middot; London &middot; New York
                </div>
                <div className="mono" style={{ marginTop: 12, color: "var(--fg-dim)" }}>
                  Working across three time-zones, one team.
                </div>
              </div>

              <div>
                <div className="eyebrow" style={{ marginBottom: 12 }}>Open for</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--fg)" }}>
                  {[
                    ["Brief enquiries", "●", "var(--accent)"],
                    ["Press & speaking", "●", "var(--fg)"],
                    ["Collaboration · agencies", "●", "var(--fg)"],
                    ["Internships · 2026 closed", "✕", "var(--fg-dim)"],
                  ].map(([label, mark, c]) => (
                    <li
                      key={label}
                      className="mono"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "20px 1fr",
                        gap: 8,
                        padding: "10px 0",
                        borderBottom: "1px solid var(--rule)",
                      }}
                    >
                      <span style={{ color: c }}>{mark}</span>
                      <span
                        style={{
                          color: "var(--fg)",
                          textTransform: "none",
                          letterSpacing: 0,
                          fontSize: 13,
                        }}
                      >
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="eyebrow" style={{ marginBottom: 12 }}>Local time · Osaka</div>
                <LocalClock />
              </div>

              <div className="mono" style={{ color: "var(--fg-dim)", fontSize: 11, lineHeight: 1.7 }}>
                We reply Mon–Fri across all time-zones.
                <br />
                Briefs in EN / JP welcome.
              </div>
            </aside>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

function FormGroup({ n, label, hint, children }) {
  return (
    <div style={{ paddingTop: 8 }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 18,
          gap: 24,
        }}
      >
        <div className="display" style={{ fontSize: 24, letterSpacing: "-0.015em" }}>
          {label}
        </div>
        {hint && (
          <div className="serif-it" style={{ color: "var(--fg-dim)", fontSize: 14 }}>
            {hint}
          </div>
        )}
      </div>
      <div style={{ display: "grid", gap: 16 }}>{children}</div>
    </div>
  );
}

function ChipRow({ value, setValue, options }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map(([v, l]) => {
        const active = v === value;
        return (
          <button
            type="button"
            key={v}
            onClick={() => setValue(v)}
            className="mono"
            style={{
              padding: "10px 14px",
              border: `1px solid ${active ? "var(--accent)" : "var(--rule-strong)"}`,
              background: active ? "var(--accent)" : "transparent",
              color: active ? "var(--kami)" : "var(--fg)",
              fontSize: 12,
              letterSpacing: "0.08em",
              cursor: "pointer",
              textTransform: "uppercase",
            }}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}

function inputStyle(extra = {}) {
  return {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid var(--rule-strong)",
    color: "var(--fg)",
    fontFamily: "var(--f-body)",
    fontSize: 17,
    padding: "14px 0",
    outline: "none",
    ...extra,
  };
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <label style={{ display: "block" }}>
      <div className="mono" style={{ color: "var(--fg-dim)", marginBottom: 4 }}>
        {label}
      </div>
      <input type="text" value={value} onChange={onChange} placeholder={placeholder} style={inputStyle()} />
    </label>
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
    // Server render placeholder to avoid hydration mismatch
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
