// ============================================================
// Rare Disease Knowledge Base + Lightweight RAG
// ============================================================

export const DISEASE_DB = [
  {
    name: "Ehlers-Danlos Syndrome (hEDS)",
    category: "Connective Tissue",
    keywords: ["joint", "hypermobility", "flexible", "pain", "fatigue", "skin", "bruising", "dislocation", "POTS", "subluxation"],
    key_symptoms: ["joint hypermobility", "chronic pain", "skin hyperextensibility", "easy bruising", "fatigue", "frequent dislocations"],
    typical_misdiagnoses: ["fibromyalgia", "anxiety", "growing pains", "hypochondria"],
    diagnostic_tests: ["Beighton score assessment", "echocardiogram", "skin biopsy", "genetic testing"],
    specialist: "Clinical Geneticist or Rheumatologist",
    avg_diagnosis_time: "10–12 years",
  },
  {
    name: "Lupus (SLE)",
    category: "Autoimmune",
    keywords: ["rash", "butterfly", "joint", "fatigue", "hair loss", "photosensitivity", "kidney", "ulcers", "fever", "autoimmune"],
    key_symptoms: ["butterfly facial rash", "joint pain", "extreme fatigue", "hair loss", "photosensitivity", "kidney problems"],
    typical_misdiagnoses: ["rheumatoid arthritis", "fibromyalgia", "depression", "viral infection"],
    diagnostic_tests: ["ANA test", "anti-dsDNA antibodies", "complement C3/C4 levels", "CBC", "urinalysis"],
    specialist: "Rheumatologist",
    avg_diagnosis_time: "6 years",
  },
  {
    name: "ME/CFS (Myalgic Encephalomyelitis)",
    category: "Neuroimmune",
    keywords: ["fatigue", "exhaustion", "crash", "PEM", "brain fog", "sleep", "unrefreshing", "exercise", "exertion", "cognitive"],
    key_symptoms: ["post-exertional malaise", "debilitating fatigue", "brain fog", "unrefreshing sleep", "orthostatic intolerance"],
    typical_misdiagnoses: ["depression", "anxiety", "deconditioning", "malingering"],
    diagnostic_tests: ["rule out thyroid", "rule out anemia", "tilt table test", "sleep study", "cytokine panels"],
    specialist: "ME/CFS Specialist, Neurologist, Immunologist",
    avg_diagnosis_time: "5–7 years",
  },
  {
    name: "Mast Cell Activation Syndrome (MCAS)",
    category: "Immunological",
    keywords: ["anaphylaxis", "hives", "flushing", "reaction", "food", "allergy", "GI", "histamine", "itching", "swelling"],
    key_symptoms: ["anaphylaxis-like episodes", "hives", "flushing", "GI problems", "brain fog", "reactions to foods/chemicals"],
    typical_misdiagnoses: ["IBS", "anxiety", "allergy", "eczema", "panic attacks"],
    diagnostic_tests: ["serum tryptase during reaction", "24hr urine histamine", "prostaglandin D2", "bone marrow biopsy"],
    specialist: "Allergist/Immunologist, Hematologist",
    avg_diagnosis_time: "6–8 years",
  },
  {
    name: "POTS (Postural Orthostatic Tachycardia Syndrome)",
    category: "Dysautonomia",
    keywords: ["heart racing", "standing", "dizzy", "faint", "lightheaded", "nausea", "tachycardia", "orthostatic", "upright"],
    key_symptoms: ["heart racing on standing", "dizziness", "fainting", "brain fog", "fatigue", "nausea when upright"],
    typical_misdiagnoses: ["anxiety", "panic disorder", "dehydration", "depression"],
    diagnostic_tests: ["tilt table test", "10-minute stand test", "24hr Holter monitor", "autonomic function testing"],
    specialist: "Cardiologist, Autonomic Neurologist",
    avg_diagnosis_time: "4–6 years",
  },
  {
    name: "Wilson's Disease",
    category: "Metabolic/Genetic",
    keywords: ["liver", "copper", "psychiatric", "tremor", "eyes", "rings", "young", "neurological", "speech", "dystonia"],
    key_symptoms: ["liver disease in young person", "psychiatric symptoms", "tremor", "Kayser-Fleischer rings", "dysarthria"],
    typical_misdiagnoses: ["hepatitis", "psychiatric disorder", "Parkinson's disease"],
    diagnostic_tests: ["serum ceruloplasmin", "24hr urine copper", "liver biopsy", "slit-lamp eye exam", "ATP7B gene test"],
    specialist: "Hepatologist, Neurologist, Clinical Geneticist",
    avg_diagnosis_time: "1–3 years",
  },
  {
    name: "Hemochromatosis",
    category: "Metabolic/Genetic",
    keywords: ["iron", "liver", "diabetes", "bronze", "skin", "fatigue", "joint", "knuckle", "ferritin", "heart"],
    key_symptoms: ["chronic fatigue", "joint pain (knuckles)", "liver disease", "diabetes", "bronze skin", "heart problems"],
    typical_misdiagnoses: ["arthritis", "liver disease of unknown cause", "type 2 diabetes"],
    diagnostic_tests: ["serum ferritin", "transferrin saturation", "HFE gene mutation test", "liver biopsy"],
    specialist: "Hematologist, Hepatologist, Geneticist",
    avg_diagnosis_time: "5–10 years",
  },
  {
    name: "Marfan Syndrome",
    category: "Connective Tissue/Genetic",
    keywords: ["tall", "thin", "long arms", "fingers", "aorta", "heart", "lens", "eyes", "scoliosis", "flexible"],
    key_symptoms: ["tall thin stature", "long arms/fingers", "aortic aneurysm", "lens dislocation", "scoliosis"],
    typical_misdiagnoses: ["normal tall stature", "musculoskeletal pain", "scoliosis only"],
    diagnostic_tests: ["echocardiogram", "FBN1 gene testing", "eye exam (slit-lamp)", "chest MRI", "Ghent criteria"],
    specialist: "Clinical Geneticist, Cardiologist",
    avg_diagnosis_time: "3–5 years",
  },
  {
    name: "Sarcoidosis",
    category: "Inflammatory",
    keywords: ["cough", "lungs", "lymph nodes", "skin", "eyes", "fatigue", "shortness of breath", "granuloma", "ACE"],
    key_symptoms: ["persistent cough", "shortness of breath", "skin lesions", "swollen lymph nodes", "eye inflammation"],
    typical_misdiagnoses: ["tuberculosis", "lymphoma", "asthma", "lupus"],
    diagnostic_tests: ["chest X-ray", "CT scan", "tissue biopsy", "serum ACE level", "bronchoalveolar lavage"],
    specialist: "Pulmonologist, Rheumatologist",
    avg_diagnosis_time: "2–5 years",
  },
  {
    name: "Addison's Disease",
    category: "Endocrine",
    keywords: ["fatigue", "weight loss", "blood pressure", "low", "salt", "craving", "skin darkening", "nausea", "cortisol", "adrenal"],
    key_symptoms: ["extreme fatigue", "weight loss", "low blood pressure", "salt craving", "skin darkening", "nausea"],
    typical_misdiagnoses: ["depression", "anorexia", "chronic fatigue", "GI problems"],
    diagnostic_tests: ["morning cortisol test", "ACTH stimulation test", "ACTH plasma level", "adrenal antibodies", "CT adrenal"],
    specialist: "Endocrinologist",
    avg_diagnosis_time: "2–3 years",
  },
  {
    name: "Stiff Person Syndrome",
    category: "Neurological/Autoimmune",
    keywords: ["stiffness", "spasms", "muscle", "rigid", "noise", "startle", "walking", "falls", "GAD", "anxiety"],
    key_symptoms: ["progressive muscle stiffness", "painful muscle spasms", "triggered by noise/touch", "difficulty walking"],
    typical_misdiagnoses: ["Parkinson's", "MS", "anxiety disorder", "psychiatric condition"],
    diagnostic_tests: ["anti-GAD65 antibodies", "EMG", "MRI spine", "lumbar puncture"],
    specialist: "Neurologist, Neuroimmunologist",
    avg_diagnosis_time: "7–8 years",
  },
  {
    name: "Acute Intermittent Porphyria",
    category: "Metabolic/Genetic",
    keywords: ["abdominal pain", "attack", "urine", "dark", "confusion", "weakness", "psychiatric", "nausea", "vomiting", "seizure"],
    key_symptoms: ["severe abdominal pain attacks", "nausea/vomiting", "confusion", "dark urine", "psychiatric symptoms"],
    typical_misdiagnoses: ["appendicitis", "IBS", "psychiatric disorder", "MS"],
    diagnostic_tests: ["urine porphobilinogen during attack", "ALA levels", "HMBS gene testing", "stool porphyrins"],
    specialist: "Hematologist, Metabolic Physician",
    avg_diagnosis_time: "15 years",
  },
  {
    name: "Myasthenia Gravis",
    category: "Neuromuscular",
    keywords: ["drooping eyelid", "double vision", "weak", "swallowing", "fatigue", "muscle", "worse with activity", "facial", "breathing"],
    key_symptoms: ["drooping eyelids", "double vision", "muscle weakness worsening with activity", "difficulty swallowing"],
    typical_misdiagnoses: ["stroke", "MS", "depression", "conversion disorder"],
    diagnostic_tests: ["AChR antibodies", "MuSK antibodies", "edrophonium test", "EMG", "CT chest for thymoma"],
    specialist: "Neurologist",
    avg_diagnosis_time: "1–3 years",
  },
  {
    name: "Antiphospholipid Syndrome (APS)",
    category: "Autoimmune",
    keywords: ["clot", "miscarriage", "stroke", "young", "pregnancy loss", "thrombosis", "skin mottled", "platelet", "blood"],
    key_symptoms: ["recurrent miscarriages", "blood clots in young person", "stroke in young person", "mottled skin", "thrombocytopenia"],
    typical_misdiagnoses: ["idiopathic clotting", "unexplained pregnancy loss", "lupus alone"],
    diagnostic_tests: ["anticardiolipin antibodies", "lupus anticoagulant", "anti-beta2 glycoprotein I", "repeat testing 12 weeks"],
    specialist: "Rheumatologist, Hematologist",
    avg_diagnosis_time: "3–5 years",
  },
  {
    name: "Systemic Mastocytosis",
    category: "Hematological",
    keywords: ["skin lesions", "tryptase", "anaphylaxis", "bone pain", "GI", "flushing", "urticaria pigmentosa", "mast cell"],
    key_symptoms: ["skin lesions (urticaria pigmentosa)", "anaphylaxis", "bone pain", "GI problems", "flushing episodes"],
    typical_misdiagnoses: ["allergy", "IBS", "skin conditions", "carcinoid syndrome"],
    diagnostic_tests: ["serum tryptase", "bone marrow biopsy", "KIT D816V mutation", "skin biopsy", "bone DEXA scan"],
    specialist: "Hematologist, Allergist",
    avg_diagnosis_time: "5–10 years",
  },
];

// ── Lightweight keyword-based RAG ──────────────────────────────────────────
export function retrieveRelevantDiseases(patientText, topK = 5) {
  const text = patientText.toLowerCase();

  const scored = DISEASE_DB.map((disease) => {
    let score = 0;
    disease.keywords.forEach((kw) => {
      if (text.includes(kw.toLowerCase())) score += 1;
    });
    // Also check symptom names
    disease.key_symptoms.forEach((s) => {
      if (text.includes(s.toLowerCase())) score += 2;
    });
    // Check misdiagnosis match (patient was told this)
    disease.typical_misdiagnoses.forEach((m) => {
      if (text.includes(m.toLowerCase())) score += 3;
    });
    return { disease, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((s) => s.disease);
}

// ── Format diseases into prompt context ───────────────────────────────────
export function formatDiseaseContext(diseases) {
  return diseases
    .map(
      (d) => `
• ${d.name} (${d.category}) — avg diagnosis delay: ${d.avg_diagnosis_time}
  Symptoms: ${d.key_symptoms.join(", ")}
  Often mistaken for: ${d.typical_misdiagnoses.join(", ")}
  Key tests: ${d.diagnostic_tests.join(", ")}
  See: ${d.specialist}`
    )
    .join("\n");
}
