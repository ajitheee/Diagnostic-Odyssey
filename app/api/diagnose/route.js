import { retrieveRelevantDiseases, formatDiseaseContext } from "@/lib/diseaseDB";

export const runtime = "edge"; // fast Vercel edge runtime

export async function POST(request) {
  try {
    const body = await request.json();
    const { age, sex, duration, symptoms, prev_diagnoses, tests_done, family_history, notes } = body;

    if (!symptoms || symptoms.trim().length < 10) {
      return Response.json({ error: "Please describe your symptoms in more detail." }, { status: 400 });
    }

    // ── RAG: retrieve most relevant diseases ──────────────────────────────
    const searchText = `${symptoms} ${prev_diagnoses} ${notes} ${family_history}`;
    const relevantDiseases = retrieveRelevantDiseases(searchText, 5);
    const diseaseContext = formatDiseaseContext(relevantDiseases);

    // ── Build medical reasoning prompt ────────────────────────────────────
    const systemPrompt = `You are a compassionate rare disease research assistant helping patients who have been struggling to get answers. You do NOT diagnose — you help patients understand what conditions may be worth investigating and how to advocate for themselves with their doctors.

RELEVANT RARE DISEASE REFERENCE DATA:
${diseaseContext}

Always be warm, honest about uncertainty, and empowering. Speak directly to the patient.`;

    const userPrompt = `Please analyze my medical history and help me understand what might be happening.

My details:
- Age: ${age} | Sex: ${sex}
- How long I've had symptoms: ${duration}
- My symptoms: ${symptoms}
- What doctors have told me so far: ${prev_diagnoses || "Nothing conclusive"}
- Tests I've already had: ${tests_done || "None mentioned"}
- Family medical history: ${family_history || "None known"}
- Other important notes: ${notes || "None"}

Please give me:
1. 🔍 TOP 3–4 CONDITIONS WORTH INVESTIGATING (with your reasoning for each)
2. 🧪 SPECIFIC TESTS to ask my doctor for (be precise)
3. 👨‍⚕️ WHAT TYPE OF SPECIALIST I should see next
4. ❓ 5 KEY QUESTIONS to bring to my next appointment
5. 📋 PATTERNS IN MY HISTORY that stand out`;

    // ── Call HuggingFace Inference API (Gemma 4) ──────────────────────────
    const hfResponse = await fetch(
      "https://api-inference.huggingface.co/models/google/gemma-4-E4B-it/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemma-4-E4B-it",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          max_tokens: 1000,
          temperature: 0.7,
          top_p: 0.9,
          stream: false,
        }),
      }
    );

    if (!hfResponse.ok) {
      const errText = await hfResponse.text();
      console.error("HF API error:", errText);
      return Response.json(
        { error: "Model is loading or unavailable. Please try again in 20 seconds." },
        { status: 503 }
      );
    }

    const data = await hfResponse.json();
    const result = data.choices?.[0]?.message?.content || "No response generated.";

    return Response.json({
      result,
      diseases_checked: relevantDiseases.map((d) => d.name),
    });
  } catch (err) {
    console.error("Diagnose API error:", err);
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
