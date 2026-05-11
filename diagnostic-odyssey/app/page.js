"use client";
import { useState } from "react";

const s = {
  // Layout
  page: { minHeight: "100vh", background: "#0f1117", color: "#e8eaf0", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
  container: { maxWidth: 1100, margin: "0 auto", padding: "0 20px 60px" },

  // Header
  header: { padding: "40px 0 32px", textAlign: "center", borderBottom: "1px solid #2e3148", marginBottom: 36 },
  badge: { display: "inline-block", background: "rgba(108,142,245,0.15)", color: "#6c8ef5", border: "1px solid rgba(108,142,245,0.3)", borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 600, letterSpacing: 1, marginBottom: 16 },
  title: { fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, background: "linear-gradient(135deg, #6c8ef5, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 10 },
  subtitle: { color: "#9095b0", fontSize: 16, maxWidth: 560, margin: "0 auto 6px" },
  warning: { display: "inline-block", color: "#f59e0b", fontSize: 13, background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 8, padding: "6px 14px", marginTop: 12 },

  // Grid
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, "@media(maxWidth:768px)": { gridTemplateColumns: "1fr" } },

  // Cards
  card: { background: "#1a1d27", border: "1px solid #2e3148", borderRadius: 16, padding: 28 },
  cardTitle: { fontSize: 14, fontWeight: 700, color: "#6c8ef5", textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 },

  // Form
  formGroup: { marginBottom: 18 },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#9095b0", marginBottom: 6 },
  input: { width: "100%", background: "#222537", border: "1px solid #2e3148", borderRadius: 10, padding: "10px 14px", color: "#e8eaf0", fontSize: 14, outline: "none", transition: "border 0.2s", resize: "vertical" },

  // Button
  btn: { width: "100%", padding: "14px", background: "linear-gradient(135deg, #6c8ef5, #a78bfa)", border: "none", borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 8, transition: "opacity 0.2s" },
  btnDisabled: { opacity: 0.6, cursor: "not-allowed" },

  // Results
  resultBox: { minHeight: 400, background: "#222537", border: "1px solid #2e3148", borderRadius: 12, padding: 20, fontSize: 14, lineHeight: 1.8, whiteSpace: "pre-wrap", color: "#e8eaf0", overflowY: "auto", maxHeight: 620 },
  placeholder: { color: "#9095b0", textAlign: "center", paddingTop: 80 },
  loading: { textAlign: "center", paddingTop: 80 },
  spinner: { width: 36, height: 36, border: "3px solid #2e3148", borderTop: "3px solid #6c8ef5", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" },
  tagRow: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 },
  tag: { background: "rgba(108,142,245,0.12)", color: "#6c8ef5", border: "1px solid rgba(108,142,245,0.25)", borderRadius: 20, padding: "3px 12px", fontSize: 12 },
  errorBox: { background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.3)", borderRadius: 10, padding: 16, color: "#f87171", fontSize: 14 },

  // Footer
  footer: { textAlign: "center", color: "#9095b0", fontSize: 13, marginTop: 48, paddingTop: 24, borderTop: "1px solid #2e3148" },
};

const FIELD = ({ label, id, placeholder, value, onChange, rows = 1, required = false }) => (
  <div style={s.formGroup}>
    <label htmlFor={id} style={s.label}>{label}{required && <span style={{ color: "#6c8ef5" }}> *</span>}</label>
    {rows > 1
      ? <textarea id={id} rows={rows} placeholder={placeholder} value={value} onChange={onChange} style={{ ...s.input, minHeight: rows * 28 }} />
      : <input id={id} placeholder={placeholder} value={value} onChange={onChange} style={s.input} />}
  </div>
);

export default function Home() {
  const [form, setForm] = useState({ age: "", sex: "Female", duration: "", symptoms: "", prev_diagnoses: "", tests_done: "", family_history: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [diseases, setDiseases] = useState([]);
  const [error, setError] = useState(null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.symptoms.trim()) return;
    setLoading(true); setResult(null); setError(null); setDiseases([]);

    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong."); }
      else { setResult(data.result); setDiseases(data.diseases_checked || []); }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        textarea:focus, input:focus { border-color: #6c8ef5 !important; }
        select { appearance: none; }
        button:hover:not(:disabled) { opacity: 0.88; }
        @media (max-width: 768px) { .grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <div style={s.container}>
        {/* Header */}
        <div style={s.header}>
          <div style={s.badge}>GEMMA 4 · HEALTH & SCIENCES</div>
          <h1 style={s.title}>The Diagnostic Odyssey Ender</h1>
          <p style={s.subtitle}>For people who've seen doctor after doctor without answers. Let's find a new direction together.</p>
          <div style={s.warning}>⚠ This tool helps you advocate for yourself — it does not replace a doctor's diagnosis</div>
        </div>

        {/* Main Grid */}
        <form onSubmit={handleSubmit}>
          <div className="grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

            {/* Left — Patient Form */}
            <div style={s.card}>
              <div style={s.cardTitle}>📋 Your Medical History</div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <FIELD label="Age" id="age" placeholder="e.g. 32" value={form.age} onChange={set("age")} />
                <div style={s.formGroup}>
                  <label htmlFor="sex" style={s.label}>Sex</label>
                  <select id="sex" value={form.sex} onChange={set("sex")} style={{ ...s.input, cursor: "pointer" }}>
                    <option>Female</option><option>Male</option><option>Non-binary / Other</option><option>Prefer not to say</option>
                  </select>
                </div>
              </div>

              <FIELD label="How long have you had these symptoms?" id="duration" placeholder="e.g. 3 years, since childhood..." value={form.duration} onChange={set("duration")} />
              <FIELD label="Describe ALL your symptoms" id="symptoms" placeholder="e.g. extreme fatigue, joint pain that moves around, rashes after sun, brain fog, hair falling out, nausea..." value={form.symptoms} onChange={set("symptoms")} rows={4} required />
              <FIELD label="What have doctors told you so far?" id="prev_diagnoses" placeholder="e.g. anxiety, fibromyalgia, nothing found, IBS..." value={form.prev_diagnoses} onChange={set("prev_diagnoses")} rows={2} />
              <FIELD label="Tests already done (and results)" id="tests_done" placeholder="e.g. blood count (normal), thyroid (normal), MRI brain (clear)..." value={form.tests_done} onChange={set("tests_done")} rows={2} />
              <FIELD label="Family medical history" id="family_history" placeholder="e.g. mother has autoimmune disease, cousin has EDS..." value={form.family_history} onChange={set("family_history")} />
              <FIELD label="Anything else important?" id="notes" placeholder="e.g. symptoms worse after exercise, started after viral infection, only at night..." value={form.notes} onChange={set("notes")} rows={2} />

              <button type="submit" disabled={loading || !form.symptoms.trim()} style={{ ...s.btn, ...(loading || !form.symptoms.trim() ? s.btnDisabled : {}) }}>
                {loading ? "Analyzing with Gemma 4..." : "🔍 Analyze My History"}
              </button>
            </div>

            {/* Right — Results */}
            <div style={s.card}>
              <div style={s.cardTitle}>💡 Analysis & Next Steps</div>

              {!loading && !result && !error && (
                <div style={{ ...s.resultBox, ...s.placeholder }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>🔬</div>
                  <p>Fill in your symptoms on the left and click <strong>Analyze</strong>.</p>
                  <p style={{ marginTop: 8, fontSize: 13 }}>Gemma 4 will cross-reference 15 rare diseases and give you a personalized next-step plan.</p>
                </div>
              )}

              {loading && (
                <div style={{ ...s.resultBox, ...s.loading }}>
                  <div style={s.spinner} />
                  <p style={{ color: "#9095b0" }}>Gemma 4 is analyzing your history...</p>
                  <p style={{ color: "#6c8ef5", fontSize: 13, marginTop: 8 }}>Cross-referencing rare disease database</p>
                </div>
              )}

              {error && !loading && (
                <div>
                  <div style={s.errorBox}>⚠ {error}</div>
                </div>
              )}

              {result && !loading && (
                <>
                  <div style={s.resultBox}>{result}</div>
                  {diseases.length > 0 && (
                    <div>
                      <p style={{ fontSize: 12, color: "#9095b0", marginTop: 16, marginBottom: 8 }}>DISEASES CROSS-REFERENCED:</p>
                      <div style={s.tagRow}>
                        {diseases.map((d) => <span key={d} style={s.tag}>{d}</span>)}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div style={s.footer}>
          Built for the Gemma 4 Hackathon · Health &amp; Sciences Track · Powered by Google Gemma 4
        </div>
      </div>
    </div>
  );
}
