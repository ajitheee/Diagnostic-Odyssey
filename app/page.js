"use client";
import Link from "next/link";

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #080b14; color: #e2e8f0; font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif; }

  @keyframes fadeUp   { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse    { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
  @keyframes float    { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
  @keyframes gradMove { 0%{background-position:0% 50%;} 50%{background-position:100% 50%;} 100%{background-position:0% 50%;} }

  .fade-up  { animation: fadeUp 0.6s ease forwards; }
  .fade-up-2{ animation: fadeUp 0.6s ease 0.15s forwards; opacity:0; }
  .fade-up-3{ animation: fadeUp 0.6s ease 0.3s forwards; opacity:0; }
  .fade-up-4{ animation: fadeUp 0.6s ease 0.45s forwards; opacity:0; }

  .mesh-bg {
    position:absolute; inset:0; opacity:0.5;
    background-image:
      radial-gradient(circle at 15% 50%, rgba(108,142,245,0.18) 0%, transparent 50%),
      radial-gradient(circle at 85% 20%, rgba(167,139,250,0.18) 0%, transparent 50%),
      radial-gradient(circle at 50% 85%, rgba(52,211,153,0.1) 0%, transparent 40%);
  }
  .grid-bg {
    position:absolute; inset:0; opacity:0.05;
    background-image: linear-gradient(rgba(108,142,245,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(108,142,245,0.8) 1px, transparent 1px);
    background-size: 48px 48px;
  }

  .step-card:hover   { transform:translateY(-4px); border-color:rgba(108,142,245,0.4) !important; }
  .sample-card:hover { transform:translateY(-3px); border-color:rgba(108,142,245,0.5) !important; cursor:pointer; }
  .feature-item:hover{ background:rgba(108,142,245,0.08) !important; }
  .cta-btn:hover     { transform:translateY(-2px); box-shadow:0 12px 32px rgba(108,142,245,0.45) !important; }
  .nav-btn:hover     { background:rgba(108,142,245,0.15) !important; }

  a { color: inherit; text-decoration: none; }

  @media (max-width: 768px) {
    .steps-grid   { grid-template-columns: 1fr !important; }
    .stats-grid   { grid-template-columns: 1fr 1fr !important; }
    .features-grid{ grid-template-columns: 1fr !important; }
    .samples-grid { grid-template-columns: 1fr !important; }
    .hero-title   { font-size: 36px !important; }
  }
`;

const SAMPLE_CASES = [
  {
    label: "Autoimmune Mystery",
    icon: "🔴",
    tag: "Common misdiagnosis: Anxiety",
    age: "28", sex: "Female", duration: "2 years",
    symptoms: "Extreme fatigue, butterfly-shaped rash on face after sun exposure, joint pain that moves between joints, hair falling out in clumps, mouth ulcers, occasional kidney pain, brain fog",
    prev_diagnoses: "Anxiety, depression, fibromyalgia",
    notes: "Symptoms flare after sun exposure and stress",
  },
  {
    label: "Fainting & Heart Racing",
    icon: "💜",
    tag: "Common misdiagnosis: Panic disorder",
    age: "22", sex: "Female", duration: "18 months",
    symptoms: "Heart races immediately when I stand up, dizzy spells, fainting, extreme fatigue, brain fog, nausea when upright, shakiness, feel much better lying down",
    prev_diagnoses: "Anxiety, panic disorder, dehydration",
    notes: "Symptoms much worse in heat and after exercise",
  },
  {
    label: "Joint Pain & Skin Issues",
    icon: "🟡",
    tag: "Common misdiagnosis: Growing pains",
    age: "19", sex: "Male", duration: "Since childhood",
    symptoms: "Joints dislocate or sublux easily, chronic widespread pain, skin stretches more than normal, easy bruising, extreme fatigue, heal slowly from injuries, frequent sprains with no trauma",
    prev_diagnoses: "Growing pains, hypochondria, fibromyalgia",
    notes: "Family history of similar joint problems",
  },
  {
    label: "Abdominal Attack Episodes",
    icon: "🟠",
    tag: "Common misdiagnosis: IBS / Appendicitis",
    age: "31", sex: "Female", duration: "3 years",
    symptoms: "Sudden severe abdominal pain attacks lasting hours, nausea, vomiting, confusion during attacks, dark red/brown urine during attacks, muscle weakness, psychiatric symptoms between attacks",
    prev_diagnoses: "IBS, appendicitis (appendix removed but attacks continued), psychiatric disorder",
    notes: "Attacks sometimes triggered by medications or fasting",
  },
];

const STEPS = [
  { number: "01", icon: "📋", title: "Describe Your History", desc: "Fill in your symptoms, duration, what doctors have told you, and tests already done. The more detail, the better the analysis." },
  { number: "02", icon: "🧠", title: "Gemma 4 Analyses", desc: "Google's Gemma 4 AI cross-references your symptoms against 15+ rare disease patterns using Retrieval-Augmented Generation (RAG)." },
  { number: "03", icon: "💡", title: "Get Your Next Step", desc: "Receive specific tests to request, the right specialist to see, and intelligent questions to bring to your next appointment." },
];

const FEATURES = [
  { emoji: "🔍", label: "Conditions to Investigate", desc: "Top 3–4 rare conditions that match your symptom pattern with reasoning", color: "#a78bfa" },
  { emoji: "🧪", label: "Specific Tests to Request", desc: "Exact test names to ask your doctor for — not vague suggestions", color: "#6c8ef5" },
  { emoji: "👨‍⚕️", label: "Right Specialist to See", desc: "Which type of specialist is best placed to investigate your case", color: "#34d399" },
  { emoji: "❓", label: "Doctor Questions", desc: "5 specific, intelligent questions to bring to your next appointment", color: "#fbbf24" },
  { emoji: "📋", label: "Pattern Analysis", desc: "What patterns in your history stand out medically and why", color: "#f87171" },
  { emoji: "🖼️", label: "Upload Medical Records", desc: "Photo or PDF of lab reports — Gemma 4 reads them with its vision model", color: "#38bdf8" },
];

const ACCURACY = [
  { q: "Is this a diagnosis?", a: "No. This tool helps you identify what questions to ask and what tests to request. Only a qualified doctor can diagnose you.", color: "#f87171" },
  { q: "How accurate is it?", a: "Gemma 4 reasons across symptoms, history, and known misdiagnosis patterns. It's most accurate when given detailed symptom descriptions.", color: "#fbbf24" },
  { q: "Which diseases does it know?", a: "The RAG database currently covers 15 rare conditions including EDS, Lupus, POTS, MCAS, ME/CFS, Porphyria, Wilson's Disease, and more.", color: "#6c8ef5" },
  { q: "Who is it for?", a: "People who have been through multiple doctors without a clear diagnosis and need help knowing what direction to explore next.", color: "#34d399" },
];

function buildSampleURL(c) {
  const p = new URLSearchParams({ age: c.age, sex: c.sex, duration: c.duration, symptoms: c.symptoms, prev_diagnoses: c.prev_diagnoses, notes: c.notes || "" });
  return `/diagnose?${p.toString()}`;
}

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#080b14" }}>
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(8,11,20,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>🔬</span>
            <span style={{ fontWeight: 800, fontSize: 15, background: "linear-gradient(135deg,#6c8ef5,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Diagnostic Odyssey Ender</span>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "#4a5568", fontWeight: 600, letterSpacing: "0.06em" }}>GEMMA 4 HACKATHON</span>
            <Link href="/diagnose">
              <button className="nav-btn" style={{ padding: "8px 18px", background: "rgba(108,142,245,0.1)", border: "1px solid rgba(108,142,245,0.3)", borderRadius: 10, color: "#818cf8", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>
                Try the Tool →
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div style={{ position: "relative", overflow: "hidden", paddingBottom: 80 }}>
        <div className="mesh-bg" />
        <div className="grid-bg" />
        <div style={{ position: "relative", maxWidth: 860, margin: "0 auto", padding: "80px 24px 0", textAlign: "center" }}>
          <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(108,142,245,0.1)", border: "1px solid rgba(108,142,245,0.25)", borderRadius: 24, padding: "6px 18px", fontSize: 12, fontWeight: 700, color: "#6c8ef5", letterSpacing: "0.08em", marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#6c8ef5", animation: "pulse 1.5s infinite", display: "inline-block" }} />
            BUILT FOR GEMMA 4 HACKATHON · HEALTH & SCIENCES
          </div>

          <h1 className="hero-title fade-up-2" style={{ fontSize: 58, fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: 24, background: "linear-gradient(135deg,#c7d2fe 0%,#a78bfa 45%,#6c8ef5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            The Diagnostic<br />Odyssey Ender
          </h1>

          <p className="fade-up-3" style={{ fontSize: 19, color: "#94a3b8", lineHeight: 1.75, maxWidth: 560, margin: "0 auto 36px" }}>
            300 million people live with rare diseases. The average diagnosis takes <strong style={{ color: "#e2e8f0" }}>6 years</strong> and <strong style={{ color: "#e2e8f0" }}>7 doctors</strong>. We built an AI that helps patients find their next step — powered by <strong style={{ color: "#a78bfa" }}>Google Gemma 4</strong>.
          </p>

          <div className="fade-up-4" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
            <Link href="/diagnose">
              <button className="cta-btn" style={{ padding: "15px 32px", background: "linear-gradient(135deg,#6c8ef5,#a78bfa)", border: "none", borderRadius: 14, color: "#fff", fontSize: 16, fontWeight: 800, cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.01em" }}>
                🔍 Start Your Analysis
              </button>
            </Link>
            <a href="#how-it-works">
              <button style={{ padding: "15px 28px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, color: "#94a3b8", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
                How it works ↓
              </button>
            </a>
          </div>
          <p style={{ fontSize: 12, color: "#4a5568" }}>Free to use · No signup required · Not a medical diagnosis</p>

          {/* Stats */}
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginTop: 60 }}>
            {[["300M+","People affected by rare diseases","#a78bfa"],["6 yrs","Average time to get a diagnosis","#6c8ef5"],["15+","Rare conditions in our database","#34d399"],["7+","Doctors seen before diagnosis","#f87171"]].map(([n,l,c])=>(
              <div key={l} style={{ padding: "20px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, textAlign: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: c, marginBottom: 6 }}>{n}</div>
                <div style={{ fontSize: 12, color: "#718096", lineHeight: 1.5 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div id="how-it-works" style={{ maxWidth: 1100, margin: "0 auto", padding: "90px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#6c8ef5", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>HOW IT WORKS</p>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#e2e8f0", letterSpacing: "-0.02em" }}>Three steps to your next answer</h2>
        </div>
        <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {STEPS.map((s) => (
            <div key={s.number} className="step-card" style={{ padding: 32, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, transition: "all 0.25s" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#4a5568", letterSpacing: "0.1em", marginBottom: 16 }}>{s.number}</div>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{s.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#e2e8f0", marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "#718096", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Tech explanation */}
        <div style={{ marginTop: 32, padding: "28px 32px", background: "rgba(108,142,245,0.05)", border: "1px solid rgba(108,142,245,0.15)", borderRadius: 18, display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#6c8ef5", letterSpacing: "0.08em", marginBottom: 8 }}>UNDER THE HOOD</p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#e2e8f0", marginBottom: 8 }}>Gemma 4 + RAG Architecture</h3>
            <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7 }}>We use <strong style={{ color: "#a78bfa" }}>Retrieval-Augmented Generation</strong> — your symptoms are matched semantically against a curated rare disease database, and the top matching conditions are injected into Gemma 4's context. This grounds the AI's reasoning in specific medical knowledge rather than general guesses.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 200 }}>
            {[["🤖","Google Gemma 4 E4B — Vision + Text"],["🗄️","RAG database — 15 rare diseases"],["📊","Semantic symptom matching"],["🖼️","Multimodal — reads medical images"]].map(([e,t])=>(
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#718096" }}>
                <span>{e}</span><span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHAT YOU GET ── */}
      <div style={{ background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#6c8ef5", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>WHAT YOU GET</p>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: "#e2e8f0", letterSpacing: "-0.02em" }}>Everything in one analysis</h2>
          </div>
          <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {FEATURES.map((f) => (
              <div key={f.label} className="feature-item" style={{ display: "flex", gap: 16, padding: "20px 22px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, transition: "all 0.2s" }}>
                <div style={{ fontSize: 26, flexShrink: 0, marginTop: 2 }}>{f.emoji}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: f.color, marginBottom: 6 }}>{f.label}</div>
                  <div style={{ fontSize: 13, color: "#718096", lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SAMPLE CASES ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "90px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#6c8ef5", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>TRY IT NOW</p>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#e2e8f0", letterSpacing: "-0.02em", marginBottom: 14 }}>Test with a real scenario</h2>
          <p style={{ fontSize: 16, color: "#718096", maxWidth: 480, margin: "0 auto" }}>Click any case below to pre-fill the tool with a real symptom pattern and see Gemma 4 in action</p>
        </div>
        <div className="samples-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18 }}>
          {SAMPLE_CASES.map((c) => (
            <Link key={c.label} href={buildSampleURL(c)}>
              <div className="sample-card" style={{ padding: 28, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, transition: "all 0.25s", height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <span style={{ fontSize: 28 }}>{c.icon}</span>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#e2e8f0" }}>{c.label}</h3>
                    <span style={{ fontSize: 11, color: "#f87171", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 10, padding: "2px 8px", fontWeight: 600 }}>{c.tag}</span>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: "#718096", lineHeight: 1.7, marginBottom: 16 }}>
                  <strong style={{ color: "#94a3b8" }}>Symptoms: </strong>{c.symptoms.slice(0, 120)}...
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6c8ef5", fontWeight: 600 }}>
                  <span>Run this analysis</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── ACCURACY & FAQ ── */}
      <div style={{ background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#6c8ef5", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>TRANSPARENCY</p>
            <h2 style={{ fontSize: 34, fontWeight: 800, color: "#e2e8f0", letterSpacing: "-0.02em", marginBottom: 12 }}>How accurate is it?</h2>
            <p style={{ fontSize: 15, color: "#718096" }}>We believe in being completely honest about what this tool is and isn't</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {ACCURACY.map((a) => (
              <div key={a.q} style={{ padding: "22px 26px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: a.color, flexShrink: 0, marginTop: 5 }} />
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0", marginBottom: 6 }}>{a.q}</p>
                  <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7 }}>{a.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FINAL CTA ── */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 24, animation: "float 3s ease-in-out infinite" }}>🔬</div>
        <h2 style={{ fontSize: 38, fontWeight: 900, color: "#e2e8f0", letterSpacing: "-0.02em", marginBottom: 16 }}>Ready to find your next step?</h2>
        <p style={{ fontSize: 16, color: "#718096", marginBottom: 36, lineHeight: 1.7 }}>Describe your symptoms and let Gemma 4 cross-reference them against rare disease patterns. Takes 2 minutes.</p>
        <Link href="/diagnose">
          <button className="cta-btn" style={{ padding: "17px 40px", background: "linear-gradient(135deg,#6c8ef5,#a78bfa)", border: "none", borderRadius: 16, color: "#fff", fontSize: 17, fontWeight: 800, cursor: "pointer", transition: "all 0.25s", letterSpacing: "0.01em" }}>
            🔍 Start Your Free Analysis
          </button>
        </Link>
        <p style={{ fontSize: 12, color: "#4a5568", marginTop: 16 }}>No account needed · Your data is not stored · Not a substitute for medical advice</p>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "28px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span>🔬</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#4a5568" }}>Diagnostic Odyssey Ender</span>
          </div>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#4a5568" }}>Built for Gemma 4 Hackathon</span>
            <span style={{ fontSize: 12, color: "#4a5568" }}>Health & Sciences Track</span>
            <span style={{ fontSize: 12, color: "#4a5568" }}>Powered by Google Gemma 4</span>
          </div>
        </div>
      </div>
    </div>
  );
}
