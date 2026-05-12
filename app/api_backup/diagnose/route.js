import { retrieveRelevantDiseases, formatDiseaseContext } from "../../../lib/diseaseDB";

// Switch to nodejs runtime so we can handle FormData + PDF parsing
export const runtime = "nodejs";

// ── Lightweight PDF text extractor (no heavy lib needed) ─────────────────
async function extractTextFromPDF(buffer) {
  try {
    // Dynamically import pdf-parse only when needed
    const pdfParse = (await import("pdf-parse/lib/pdf-parse.js")).default;
    const data = await pdfParse(buffer);
    return data.text?.slice(0, 4000) || ""; // limit to 4000 chars
  } catch {
    return ""; // graceful fallback if pdf-parse fails
  }
}

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let formText = {};
    let imageBase64 = null;
    let imageMime = null;
    let pdfText = "";

    // ── Parse FormData (files + fields) ──────────────────────────────────
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();

      formText = {
        age:            formData.get("age") || "",
        sex:            formData.get("sex") || "",
        duration:       formData.get("duration") || "",
        symptoms:       formData.get("symptoms") || "",
        prev_diagnoses: formData.get("prev_diagnoses") || "",
        tests_done:     formData.get("tests_done") || "",
        family_history: formData.get("family_history") || "",
        notes:          formData.get("notes") || "",
      };

      const file = formData.get("record_file");
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const mime = file.type || "";

        if (mime.startsWith("image/")) {
          // Image — send to Gemma 4 as vision input
          imageBase64 = buffer.toString("base64");
          imageMime = mime;
        } else if (mime === "application/pdf") {
          // PDF — extract text and include in prompt
          pdfText = await extractTextFromPDF(buffer);
        }
      }
    } else {
      // Fallback: plain JSON (no file)
      formText = await request.json();
    }

    const { age, sex, duration, symptoms, prev_diagnoses, tests_done, family_history, notes } = formText;

    if (!symptoms?.trim() && !imageBase64 && !pdfText) {
      return Response.json({ error: "Please describe your symptoms or upload a medical record." }, { status: 400 });
    }

    // ── RAG: retrieve relevant diseases ──────────────────────────────────
    const searchText = `${symptoms} ${prev_diagnoses} ${notes} ${pdfText}`.trim();
    const relevantDiseases = retrieveRelevantDiseases(searchText || "rare disease chronic", 5);
    const diseaseContext = formatDiseaseContext(relevantDiseases);

    // ── Build system prompt ───────────────────────────────────────────────
    const systemPrompt = `You are a compassionate rare disease research assistant helping patients who have been struggling to get answers. You do NOT diagnose — you help patients understand what conditions may be worth investigating and how to advocate for themselves with their doctors.

RELEVANT RARE DISEASE REFERENCE DATA:
${diseaseContext}

Always be warm, honest about uncertainty, and empowering. Speak directly to the patient.`;

    // ── Build user content (text + optional PDF extract) ─────────────────
    let textContent = `Please analyze my medical history and help me understand what might be happening.

My details:
- Age: ${age || "Not provided"} | Sex: ${sex || "Not provided"}
- How long I've had symptoms: ${duration || "Not provided"}
- My symptoms: ${symptoms || "See uploaded record"}
- What doctors have told me: ${prev_diagnoses || "Nothing conclusive"}
- Tests already done: ${tests_done || "None mentioned"}
- Family history: ${family_history || "None known"}
- Other notes: ${notes || "None"}`;

    if (pdfText) {
      textContent += `\n\nEXTRACTED FROM UPLOADED MEDICAL RECORD:\n${pdfText}`;
    }

    textContent += `\n\nPlease give me:
1. 🔍 TOP 3–4 CONDITIONS WORTH INVESTIGATING (with reasoning)
2. 🧪 SPECIFIC TESTS to ask my doctor for
3. 👨‍⚕️ WHAT TYPE OF SPECIALIST I should see next
4. ❓ 5 KEY QUESTIONS to bring to my next appointment
5. 📋 PATTERNS IN MY HISTORY that stand out`;

    // ── Build message content (multimodal if image) ───────────────────────
    let userContent;
    if (imageBase64) {
      // Gemma 4 vision: image + text together
      userContent = [
        {
          type: "image_url",
          image_url: { url: `data:${imageMime};base64,${imageBase64}` },
        },
        {
          type: "text",
          text: `Please read this medical record/report carefully first, then answer the following:\n\n${textContent}`,
        },
      ];
    } else {
      userContent = textContent;
    }

    // ── Call Colab backend (Gemma 4 running there) ────────────────────────
    const colabUrl = process.env.COLAB_API_URL;
    if (!colabUrl) {
      return Response.json({ error: "Backend not configured. Please set COLAB_API_URL in Vercel." }, { status: 503 });
    }

    const colabResponse = await fetch(`${colabUrl}/diagnose`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        age, sex, duration, symptoms,
        prev_diagnoses, tests_done, family_history,
        notes: `${notes || ""} ${pdfText || ""}`.trim(),
        image_base64: imageBase64 || null,
        image_mime: imageMime || null,
      }),
    });

    if (!colabResponse.ok) {
      const errText = await colabResponse.text();
      console.error("Colab backend error:", errText);
      return Response.json(
        { error: "Model backend is unavailable. Make sure your Colab notebook is running." },
        { status: 503 }
      );
    }

    const data = await colabResponse.json();
    const result = data.result || "No response generated.";

    return Response.json({
      result,
      diseases_checked: data.diseases_checked || relevantDiseases.map((d) => d.name),
      used_vision: !!imageBase64,
      used_pdf: !!pdfText,
    });

  } catch (err) {
    console.error("Diagnose API error:", err);
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
