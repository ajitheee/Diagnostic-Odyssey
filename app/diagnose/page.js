"use client";
import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// ── CSS injected once ───────────────────────────────────────────────────────
const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #080b14; color: #e2e8f0; font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif; }

  @keyframes spin   { to { transform: rotate(360deg); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse  { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
  @keyframes gradMove { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
  @keyframes shimmer { from { left: -100%; } to { left: 200%; } }
  @keyframes glow   { 0%,100% { box-shadow: 0 0 20px rgba(108,142,245,0.3); } 50% { box-shadow: 0 0 40px rgba(167,139,250,0.5); } }
  @keyframes countUp { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }

  .fade-up { animation: fadeUp 0.5s ease forwards; }
  .fade-up-2 { animation: fadeUp 0.5s ease 0.1s forwards; opacity: 0; }
  .fade-up-3 { animation: fadeUp 0.5s ease 0.2s forwards; opacity: 0; }

  input, textarea, select {
    width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px; padding: 11px 14px; color: #e2e8f0; font-size: 14px;
    outline: none; transition: all 0.2s; resize: vertical; font-family: inherit;
  }
  input:focus, textarea:focus, select:focus {
    border-color: #6c8ef5; background: rgba(108,142,245,0.06); box-shadow: 0 0 0 3px rgba(108,142,245,0.12);
  }
  input::placeholder, textarea::placeholder { color: #4a5568; }
  select option { background: #1a1d2e; }

  .stat-card:hover { transform: translateY(-3px); transition: transform 0.2s; }
  .submit-btn { position: relative; overflow: hidden; }
  .submit-btn::after {
    content: ''; position: absolute; top: 0; left: -100%; width: 60%;
    height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    animation: shimmer 2s infinite; transform: skewX(-20deg);
  }
  .submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(108,142,245,0.4); }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .submit-btn:disabled::after { display: none; }

  .result-section { animation: fadeUp 0.4s ease forwards; }
  .copy-btn:hover { background: rgba(108,142,245,0.2) !important; }

  .upload-zone { border: 2px dashed rgba(108,142,245,0.3); border-radius: 14px; padding: 28px 20px; text-align: center; cursor: pointer; transition: all 0.25s; background: rgba(108,142,245,0.03); }
  .upload-zone:hover, .upload-zone.drag-over { border-color: #6c8ef5; background: rgba(108,142,245,0.08); transform: scale(1.01); }
  .upload-zone.has-file { border-color: #34d399; background: rgba(52,211,153,0.06); }
  .file-preview { display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: rgba(52,211,153,0.08); border: 1px solid rgba(52,211,153,0.25); border-radius: 10px; margin-top: 10px; }
  .remove-file:hover { color: #f87171 !important; }

  .mesh-bg {
    position: absolute; inset: 0; opacity: 0.4;
    background-image: radial-gradient(circle at 20% 50%, rgba(108,142,245,0.15) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(167,139,250,0.15) 0%, transparent 50%),
                      radial-gradient(circle at 50% 80%, rgba(52,211,153,0.08) 0%, transparent 40%);
  }
  .grid-bg {
    position: absolute; inset: 0; opacity: 0.06;
    background-image: linear-gradient(rgba(108,142,245,0.5) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(108,142,245,0.5) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  @media (max-width: 768px) {
    .main-grid { grid-template-columns: 1fr !important; }
    .stats-grid { grid-template-columns: 1fr 1fr !important; }
    .hero-title { font-size: 32px !important; }
  }
`;

// ── Parse Gemma output into structured sections ────────────────────────────
function cleanGemmaOutput(text) {
  let cleaned = text;

  // Find "Start of Response" marker (handles *, **, *** before/after)
  const markerRegex = /\*{0,3}\s*\(?\s*start\s+of\s+response\s*\)?\s*\*{0,3}/i;
  const markerMatch = cleaned.match(markerRegex);
  if (markerMatch) {
    const markerEnd = cleaned.indexOf(markerMatch[0]) + markerMatch[0].length;
    const afterMarker = cleaned.slice(markerEnd).trim();
    if (afterMarker.length > 30) {
      // Use content after marker if it exists
      cleaned = afterMarker;
    }
  }

  // Strip self-correction disclaimer block entirely
  cleaned = cleaned.replace(/\*{0,3}\s*\(?self[- ]correction[^)]*\)?[\s\S]*?(?=\*{2,3}|\n\n1\.)/i, "").trim();

  // Remove *** dividers
  cleaned = cleaned.replace(/^\*{3,}\s*$/gm, "").trim();

  // Remove bold markdown for cleaner display
  cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, "$1");

  // If we stripped everything, fall back to searching for numbered sections in original
  if (cleaned.length < 30) {
    const numberedMatch = text.match(/1\.\s*(?:🔍)?[\s\S]*/);
    if (numberedMatch) cleaned = numberedMatch[0].replace(/\*\*(.*?)\*\*/g, "$1");
  }

  return cleaned.trim() || text;
}

function parseResult(rawText) {
  const text = cleanGemmaOutput(rawText);
  const sections = [];

  // Match numbered sections like "1. CONDITIONS..." or "### 1. CONDITIONS..."
  const sectionDefs = [
    { key: "conditions", emoji: "🔍", label: "Conditions to Investigate", color: "#a78bfa", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.2)",
      regex: /(?:#{0,3}\s*1\.?\s*(?:🔍)?\s*(?:TOP\s*)?[\d–-]*\s*CONDITIONS?(?:\s+WORTH\s+INVESTIGATING)?[\s\S]*?)(?=(?:#{0,3}\s*2\.|$))/i },
    { key: "tests", emoji: "🧪", label: "Specific Tests to Request", color: "#6c8ef5", bg: "rgba(108,142,245,0.08)", border: "rgba(108,142,245,0.2)",
      regex: /(?:#{0,3}\s*2\.?\s*(?:🧪)?\s*SPECIFIC\s*TESTS?[\s\S]*?)(?=(?:#{0,3}\s*3\.|$))/i },
    { key: "specialist", emoji: "👨‍⚕️", label: "Specialist to See Next", color: "#34d399", bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.2)",
      regex: /(?:#{0,3}\s*3\.?\s*(?:👨)?(?:‍⚕️)?\s*(?:TYPE OF\s*)?SPECIALIST[\s\S]*?)(?=(?:#{0,3}\s*4\.|$))/i },
    { key: "questions", emoji: "❓", label: "Questions for Your Doctor", color: "#fbbf24", bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.2)",
      regex: /(?:#{0,3}\s*4\.?\s*(?:❓)?\s*(?:5\s*)?KEY\s*QUESTIONS?[\s\S]*?)(?=(?:#{0,3}\s*5\.|$))/i },
    { key: "patterns", emoji: "📋", label: "Patterns in Your History", color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.2)",
      regex: /(?:#{0,3}\s*5\.?\s*(?:📋)?\s*(?:IMPORTANT\s*)?PATTERNS?[\s\S]*?)$/i },
  ];

  let matched = false;
  sectionDefs.forEach((p) => {
    const m = text.match(p.regex);
    if (m && m[0].trim().length > 10) {
      sections.push({ ...p, content: m[0].trim() });
      matched = true;
    }
  });

  // Fallback — show full cleaned text in one card
  if (!matched) {
    sections.push({
      key: "raw", emoji: "💬", label: "Analysis", color: "#6c8ef5",
      bg: "rgba(108,142,245,0.08)", border: "rgba(108,142,245,0.2)",
      content: text,
    });
  }
  return sections;
}

// ── Sub-components ──────────────────────────────────────────────────────────
const Field = ({ label, id, placeholder, value, onChange, rows = 1, required = false, hint }) => (
  <div style={{ marginBottom: 16 }}>
    <label htmlFor={id} style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#718096", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
      {label}{required && <span style={{ color: "#6c8ef5", marginLeft: 2 }}>*</span>}
    </label>
    {rows > 1
      ? <textarea id={id} rows={rows} placeholder={placeholder} value={value} onChange={onChange} />
      : <input id={id} placeholder={placeholder} value={value} onChange={onChange} />}
    {hint && <p style={{ fontSize: 11, color: "#4a5568", marginTop: 4 }}>{hint}</p>}
  </div>
);

const StatCard = ({ number, label, color }) => (
  <div className="stat-card" style={{ textAlign: "center", padding: "20px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
    <div style={{ fontSize: 26, fontWeight: 800, color, marginBottom: 4, animation: "countUp 0.6s ease" }}>{number}</div>
    <div style={{ fontSize: 12, color: "#718096", lineHeight: 1.4 }}>{label}</div>
  </div>
);

const LoadingDots = ({ text }) => (
  <span>{text}<span style={{ animation: "pulse 1.2s infinite" }}>...</span></span>
);

const FileUpload = ({ file, onFile, onRemove }) => {
  const inputRef = useRef();
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback((e) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  }, [onFile]);

  const handleDrag = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);

  const getFileIcon = (f) => {
    if (!f) return "📎";
    if (f.type.startsWith("image/")) return "🖼️";
    if (f.type === "application/pdf") return "📄";
    return "📎";
  };

  const formatSize = (bytes) => bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(0)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*,.pdf" style={{ display: "none" }}
        onChange={(e) => e.target.files[0] && onFile(e.target.files[0])} />

      {!file ? (
        <div
          className={`upload-zone ${dragging ? "drag-over" : ""}`}
          onClick={() => inputRef.current.click()}
          onDrop={handleDrop} onDragOver={handleDrag} onDragLeave={handleDragLeave}
        >
          <div style={{ fontSize: 32, marginBottom: 10 }}>📁</div>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#94a3b8", marginBottom: 4 }}>
            Upload a medical record
          </p>
          <p style={{ fontSize: 12, color: "#4a5568", lineHeight: 1.6 }}>
            Lab reports · Doctor letters · Discharge summaries · Test results
          </p>
          <p style={{ fontSize: 11, color: "#6c8ef5", marginTop: 10, fontWeight: 600 }}>
            JPG · PNG · PDF supported · Max 10MB
          </p>
          <div style={{ marginTop: 14, display: "inline-block", padding: "7px 18px", background: "rgba(108,142,245,0.12)", border: "1px solid rgba(108,142,245,0.25)", borderRadius: 8, fontSize: 13, color: "#818cf8", fontWeight: 600 }}>
            Browse or drag & drop
          </div>
        </div>
      ) : (
        <div className="file-preview">
          <span style={{ fontSize: 28 }}>{getFileIcon(file)}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#34d399", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</p>
            <p style={{ fontSize: 11, color: "#718096" }}>{formatSize(file.size)} · {file.type.startsWith("image/") ? "Gemma 4 will read this image directly 👁" : "Text will be extracted from PDF 📝"}</p>
          </div>
          <button className="remove-file" onClick={onRemove} style={{ background: "none", border: "none", color: "#718096", cursor: "pointer", fontSize: 18, padding: 4, transition: "color 0.2s", flexShrink: 0 }}>✕</button>
        </div>
      )}
    </div>
  );
};

// ── Main Page ───────────────────────────────────────────────────────────────
function DiagnoseContent() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    age: searchParams.get("age") || "",
    sex: searchParams.get("sex") || "Female",
    duration: searchParams.get("duration") || "",
    symptoms: searchParams.get("symptoms") || "",
    prev_diagnoses: searchParams.get("prev_diagnoses") || "",
    tests_done: "",
    family_history: "",
    notes: searchParams.get("notes") || "",
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState(null);
  const [parsedSections, setParsedSections] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [usedVision, setUsedVision] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const filledFields = Object.values(form).filter(Boolean).length + (uploadedFile ? 1 : 0);
  const progress = Math.round((filledFields / 9) * 100);

  const loadingSteps = ["Reading your symptom history", "Cross-referencing rare disease database", "Identifying diagnostic patterns", "Generating your personalized plan"];

  useEffect(() => {
    if (!loading) return;
    setLoadingStep(0);
    const t1 = setTimeout(() => setLoadingStep(1), 1500);
    const t2 = setTimeout(() => setLoadingStep(2), 3500);
    const t3 = setTimeout(() => setLoadingStep(3), 5500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.symptoms.trim() && !uploadedFile) return;
    setLoading(true); setResult(null); setParsedSections([]); setError(null); setDiseases([]); setUsedVision(false);

    try {
      // Use FormData so we can send files
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (uploadedFile) fd.append("record_file", uploadedFile);

      const res = await fetch("/api/diagnose", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong."); }
      else {
        setResult(data.result);
        setParsedSections(parseResult(data.result));
        setDiseases(data.diseases_checked || []);
        setUsedVision(data.used_vision || false);
      }
    } catch { setError("Network error. Please check your connection and try again."); }
    finally { setLoading(false); }
  };

  const copyResult = () => {
    if (result) { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080b14" }}>
      <style>{CSS}</style>

      {/* ── HERO ── */}
      <div style={{ position: "relative", overflow: "hidden", paddingBottom: 60 }}>
        <div className="mesh-bg" />
        <div className="grid-bg" />
        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", padding: "60px 24px 0", textAlign: "center" }}>

          {/* Back link */}
          <div style={{ marginBottom: 16 }}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#718096", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}>
              ← Back to overview
            </Link>
          </div>

          {/* Badge */}
          <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(108,142,245,0.1)", border: "1px solid rgba(108,142,245,0.25)", borderRadius: 24, padding: "6px 16px", fontSize: 12, fontWeight: 700, color: "#6c8ef5", letterSpacing: "0.08em", marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#6c8ef5", animation: "pulse 1.5s infinite", display: "inline-block" }} />
            GEMMA 4 HACKATHON · HEALTH & SCIENCES
          </div>

          {/* Title */}
          <h1 className="hero-title fade-up-2" style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.1, marginBottom: 20, background: "linear-gradient(135deg, #c7d2fe 0%, #a78bfa 40%, #6c8ef5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.02em" }}>
            The Diagnostic<br />Odyssey Ender
          </h1>

          <p className="fade-up-3" style={{ fontSize: 18, color: "#94a3b8", maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.7 }}>
            For people who've seen doctor after doctor with no answers. Gemma 4 cross-references rare disease patterns to help you find your next step.
          </p>

          {/* Disclaimer */}
          <div className="fade-up-3" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 10, padding: "8px 16px", fontSize: 13, color: "#fbbf24" }}>
            ⚠ This tool helps you advocate for yourself — it does not replace a medical diagnosis
          </div>
        </div>

        {/* Stats Bar */}
        <div style={{ maxWidth: 800, margin: "48px auto 0", padding: "0 24px" }}>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            <StatCard number="300M+" label="People with rare diseases globally" color="#a78bfa" />
            <StatCard number="6 yrs" label="Average time to get a diagnosis" color="#6c8ef5" />
            <StatCard number="15+" label="Rare conditions in our database" color="#34d399" />
            <StatCard number="7+" label="Doctors seen before diagnosis" color="#f87171" />
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 80px" }}>
        <form onSubmit={handleSubmit}>
          <div className="main-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>

            {/* ── LEFT: Form ── */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 32 }}>

              {/* Form header */}
              <div style={{ marginBottom: 28 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#e2e8f0", marginBottom: 6 }}>📋 Your Medical History</h2>
                <p style={{ fontSize: 13, color: "#718096" }}>The more detail you give, the better the analysis</p>
                {/* Progress */}
                <div style={{ marginTop: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: "#718096" }}>Profile completeness</span>
                    <span style={{ fontSize: 11, color: "#6c8ef5", fontWeight: 600 }}>{progress}%</span>
                  </div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #6c8ef5, #a78bfa)", borderRadius: 4, transition: "width 0.4s ease" }} />
                  </div>
                </div>
              </div>

              {/* Basic info row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 4 }}>
                <Field label="Age" id="age" placeholder="e.g. 32" value={form.age} onChange={set("age")} />
                <div style={{ marginBottom: 16 }}>
                  <label htmlFor="sex" style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#718096", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Sex</label>
                  <select id="sex" value={form.sex} onChange={set("sex")} style={{ cursor: "pointer" }}>
                    <option>Female</option><option>Male</option><option>Non-binary / Other</option><option>Prefer not to say</option>
                  </select>
                </div>
              </div>

              <Field label="How long have symptoms lasted?" id="duration" placeholder="e.g. 3 years, since age 15, 8 months..." value={form.duration} onChange={set("duration")} />

              <Field label="All your symptoms" id="symptoms" placeholder="Be as detailed as possible — fatigue, joint pain, rashes, brain fog, GI issues, fainting, hair loss..." value={form.symptoms} onChange={set("symptoms")} rows={4} required hint="★ Most important field — describe every symptom even if they seem unrelated" />

              {/* Divider */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", margin: "20px 0", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 11, color: "#4a5568", whiteSpace: "nowrap", fontWeight: 600, letterSpacing: "0.05em" }}>MEDICAL HISTORY</span>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.04)" }} />
              </div>

              <Field label="What doctors have told you" id="prev_diagnoses" placeholder="e.g. anxiety, fibromyalgia, IBS, nothing found..." value={form.prev_diagnoses} onChange={set("prev_diagnoses")} rows={2} />
              <Field label="Tests already done & results" id="tests_done" placeholder="e.g. full blood count (normal), MRI brain (clear), thyroid (normal)..." value={form.tests_done} onChange={set("tests_done")} rows={2} />
              <Field label="Family medical history" id="family_history" placeholder="e.g. mother has autoimmune disease, father had early heart problems..." value={form.family_history} onChange={set("family_history")} />
              <Field label="Any other important notes?" id="notes" placeholder="e.g. symptoms worse after exercise, began after a viral illness, only at night..." value={form.notes} onChange={set("notes")} rows={2} />

              {/* File Upload Section */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", margin: "20px 0", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 11, color: "#4a5568", whiteSpace: "nowrap", fontWeight: 600, letterSpacing: "0.05em" }}>UPLOAD RECORDS</span>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.04)" }} />
                <span style={{ fontSize: 10, color: "#6c8ef5", whiteSpace: "nowrap", fontWeight: 700, background: "rgba(108,142,245,0.1)", padding: "2px 8px", borderRadius: 10 }}>GEMMA 4 VISION</span>
              </div>

              <p style={{ fontSize: 12, color: "#718096", marginBottom: 12, lineHeight: 1.6 }}>
                Can't describe everything in words? Upload a photo or PDF of your medical records — lab reports, doctor letters, test results, prescriptions. Gemma 4 will read them directly.
              </p>

              <FileUpload
                file={uploadedFile}
                onFile={setUploadedFile}
                onRemove={() => setUploadedFile(null)}
              />

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !form.symptoms.trim()}
                className="submit-btn"
                style={{ width: "100%", marginTop: 8, padding: "15px 24px", background: loading ? "rgba(108,142,245,0.3)" : "linear-gradient(135deg, #6c8ef5 0%, #a78bfa 100%)", border: "none", borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s", letterSpacing: "0.02em" }}>
                {loading ? <LoadingDots text="Analyzing with Gemma 4" /> : uploadedFile ? "🔍  Analyze My History + Records" : "🔍  Analyze My History"}
              </button>
            </div>

            {/* ── RIGHT: Results ── */}
            <div>
              {/* Empty state */}
              {!loading && !result && !error && (
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 20, padding: 48, textAlign: "center" }}>
                  <div style={{ fontSize: 52, marginBottom: 20 }}>🔬</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#94a3b8", marginBottom: 10 }}>Your analysis will appear here</h3>
                  <p style={{ fontSize: 14, color: "#4a5568", maxWidth: 320, margin: "0 auto", lineHeight: 1.7 }}>Gemma 4 will cross-reference your symptoms against rare disease patterns — or read your uploaded medical records directly using its vision capability.</p>
                  <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 10, textAlign: "left", maxWidth: 280, margin: "32px auto 0" }}>
                    {["Top conditions to investigate", "Exact tests to request", "Right specialist to see", "Questions to ask your doctor"].map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#718096" }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6c8ef5", flexShrink: 0 }} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Loading state */}
              {loading && (
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 40 }}>
                  <div style={{ textAlign: "center", marginBottom: 40 }}>
                    <div style={{ width: 56, height: 56, border: "3px solid rgba(108,142,245,0.2)", borderTop: "3px solid #6c8ef5", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 20px" }} />
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#e2e8f0", marginBottom: 8 }}>Gemma 4 is working</h3>
                    <p style={{ color: "#718096", fontSize: 14 }}>This takes 15–30 seconds</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {loadingSteps.map((step, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", borderRadius: 12, background: i === loadingStep ? "rgba(108,142,245,0.1)" : "rgba(255,255,255,0.02)", border: `1px solid ${i === loadingStep ? "rgba(108,142,245,0.3)" : "rgba(255,255,255,0.05)"}`, transition: "all 0.4s" }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: i < loadingStep ? "#34d399" : i === loadingStep ? "rgba(108,142,245,0.3)" : "rgba(255,255,255,0.05)", fontSize: 12, fontWeight: 700, color: i < loadingStep ? "#fff" : i === loadingStep ? "#6c8ef5" : "#4a5568", flexShrink: 0, transition: "all 0.4s" }}>
                          {i < loadingStep ? "✓" : i + 1}
                        </div>
                        <span style={{ fontSize: 14, color: i === loadingStep ? "#e2e8f0" : i < loadingStep ? "#34d399" : "#4a5568", fontWeight: i === loadingStep ? 600 : 400, transition: "all 0.4s" }}>
                          {i === loadingStep ? <LoadingDots text={step} /> : step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Error state */}
              {error && !loading && (
                <div style={{ background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 20, padding: 28 }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>⚠️</div>
                  <h3 style={{ color: "#f87171", fontWeight: 700, marginBottom: 8 }}>Something went wrong</h3>
                  <p style={{ color: "#fca5a5", fontSize: 14, lineHeight: 1.6 }}>{error}</p>
                  <button onClick={() => setError(null)} style={{ marginTop: 16, padding: "8px 18px", background: "rgba(248,113,113,0.15)", border: "1px solid rgba(248,113,113,0.3)", borderRadius: 8, color: "#f87171", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>Try Again</button>
                </div>
              )}

              {/* Results */}
              {result && !loading && (
                <div>
                  {/* Results header */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <div>
                      <h2 style={{ fontSize: 18, fontWeight: 700, color: "#e2e8f0" }}>💡 Your Analysis</h2>
                      <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
                        <p style={{ fontSize: 13, color: "#718096" }}>Generated by Gemma 4 · Not a medical diagnosis</p>
                        {usedVision && <span style={{ fontSize: 11, fontWeight: 700, color: "#a78bfa", background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.25)", borderRadius: 10, padding: "1px 8px" }}>👁 Vision used</span>}
                      </div>
                    </div>
                    <button className="copy-btn" onClick={copyResult} style={{ padding: "8px 14px", background: copied ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${copied ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.1)"}`, borderRadius: 8, color: copied ? "#34d399" : "#94a3b8", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}>
                      {copied ? "✓ Copied!" : "Copy Results"}
                    </button>
                  </div>

                  {/* Parsed result sections */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {parsedSections.map((sec, i) => (
                      <div key={sec.key} className="result-section" style={{ background: sec.bg, border: `1px solid ${sec.border}`, borderRadius: 16, padding: 20, animationDelay: `${i * 0.08}s` }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                          <span style={{ fontSize: 16 }}>{sec.emoji}</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: sec.color, textTransform: "uppercase", letterSpacing: "0.07em" }}>{sec.label}</span>
                        </div>
                        <div style={{ fontSize: 14, color: "#cbd5e1", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{sec.content}</div>
                      </div>
                    ))}
                  </div>

                  {/* Disease tags */}
                  {diseases.length > 0 && (
                    <div style={{ marginTop: 20 }}>
                      <p style={{ fontSize: 11, color: "#4a5568", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Diseases cross-referenced by Gemma 4</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {diseases.map((d) => (
                          <span key={d} style={{ background: "rgba(108,142,245,0.08)", color: "#818cf8", border: "1px solid rgba(108,142,245,0.2)", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 500 }}>{d}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Disclaimer */}
                  <div style={{ marginTop: 20, padding: "14px 18px", background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.15)", borderRadius: 12, fontSize: 12, color: "#d97706", lineHeight: 1.6 }}>
                    <strong>Important:</strong> This analysis is for educational purposes to help you have better conversations with your healthcare providers. Always consult a qualified medical professional for diagnosis and treatment.
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "28px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <span style={{ background: "rgba(108,142,245,0.1)", border: "1px solid rgba(108,142,245,0.2)", borderRadius: 20, padding: "4px 14px", fontSize: 12, color: "#6c8ef5", fontWeight: 600 }}>Gemma 4 Hackathon</span>
          <span style={{ color: "#2d3748", fontSize: 13 }}>·</span>
          <span style={{ fontSize: 13, color: "#4a5568" }}>Health & Sciences Track</span>
          <span style={{ color: "#2d3748", fontSize: 13 }}>·</span>
          <span style={{ fontSize: 13, color: "#4a5568" }}>Powered by Google Gemma 4</span>
        </div>
      </div>
    </div>
  );
}

// ── Suspense wrapper (required by Next.js 14 for useSearchParams) ────────────
export default function Page() {
  return (
    <Suspense fallback={<div style={{ background: "#080b14", minHeight: "100vh" }} />}>
      <DiagnoseContent />
    </Suspense>
  );
}
