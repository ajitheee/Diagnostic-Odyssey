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

  // ── AUTOIMMUNE ─────────────────────────────────────────────────────────────
  {
    name: "Sjögren's Syndrome",
    category: "Autoimmune",
    keywords: ["dry eyes", "dry mouth", "fatigue", "joint", "neuropathy", "swallowing", "saliva", "teeth", "dental", "fog"],
    key_symptoms: ["chronic dry eyes", "chronic dry mouth", "fatigue", "joint pain", "peripheral neuropathy", "brain fog"],
    typical_misdiagnoses: ["depression", "fibromyalgia", "anxiety", "dental problems only", "dry eye syndrome"],
    diagnostic_tests: ["anti-SSA/Ro antibodies", "anti-SSB/La antibodies", "Schirmer's test", "lip biopsy", "salivary flow test"],
    specialist: "Rheumatologist, Ophthalmologist",
    avg_diagnosis_time: "5–7 years",
  },
  {
    name: "Ankylosing Spondylitis",
    category: "Autoimmune/Inflammatory",
    keywords: ["back pain", "spine", "morning stiffness", "sacroiliac", "hip", "HLA-B27", "eye", "uveitis", "young male"],
    key_symptoms: ["chronic low back pain in young adults", "morning stiffness >1hr", "sacroiliac pain", "uveitis", "improves with exercise"],
    typical_misdiagnoses: ["mechanical back pain", "slipped disc", "sports injury", "fibromyalgia"],
    diagnostic_tests: ["HLA-B27 testing", "MRI sacroiliac joints", "X-ray pelvis/spine", "CRP/ESR", "rheumatology assessment"],
    specialist: "Rheumatologist",
    avg_diagnosis_time: "8–10 years",
  },
  {
    name: "Behçet's Disease",
    category: "Autoimmune/Vasculitis",
    keywords: ["mouth ulcers", "genital ulcers", "uveitis", "skin", "joint", "clot", "Middle East", "Mediterranean", "eye", "bowel"],
    key_symptoms: ["recurrent mouth ulcers", "genital ulcers", "eye inflammation", "skin lesions", "joint pain", "blood clots"],
    typical_misdiagnoses: ["Crohn's disease", "herpes", "reactive arthritis", "IBD"],
    diagnostic_tests: ["pathergy test", "HLA-B51", "ophthalmology exam", "dermatology assessment", "colonoscopy if GI symptoms"],
    specialist: "Rheumatologist, Ophthalmologist",
    avg_diagnosis_time: "5–10 years",
  },
  {
    name: "Adult-onset Still's Disease (AOSD)",
    category: "Autoimmune/Inflammatory",
    keywords: ["fever", "rash", "joint", "salmon", "sore throat", "lymph nodes", "ferritin", "daily", "quotidian"],
    key_symptoms: ["daily high spiking fevers", "salmon-pink rash during fever", "arthritis", "sore throat", "enlarged lymph nodes"],
    typical_misdiagnoses: ["infection", "lymphoma", "viral illness", "rheumatoid arthritis"],
    diagnostic_tests: ["serum ferritin (very high)", "CBC", "LFTs", "bone marrow biopsy", "full body PET scan", "ANA/RF (usually negative)"],
    specialist: "Rheumatologist, Hematologist",
    avg_diagnosis_time: "3–6 months (but often missed)",
  },
  {
    name: "IgG4-Related Disease (IgG4-RD)",
    category: "Autoimmune/Inflammatory",
    keywords: ["swelling", "pancreas", "salivary", "kidney", "orbit", "fibrosis", "mass", "IgG4", "autoimmune pancreatitis"],
    key_symptoms: ["swelling of organs/glands", "autoimmune pancreatitis", "salivary gland swelling", "kidney involvement", "orbital swelling"],
    typical_misdiagnoses: ["cancer", "lymphoma", "Sjögren's syndrome", "sarcoidosis"],
    diagnostic_tests: ["serum IgG4 level", "biopsy with IgG4 staining", "CT/MRI of affected organs", "PET scan"],
    specialist: "Rheumatologist, Pathologist",
    avg_diagnosis_time: "2–5 years",
  },
  {
    name: "Relapsing Polychondritis",
    category: "Autoimmune",
    keywords: ["ear", "cartilage", "nose", "collapse", "saddle", "trachea", "breathing", "red ear", "joint", "eye"],
    key_symptoms: ["red painful ear (not earlobe)", "nasal bridge collapse", "saddle nose deformity", "tracheal problems", "joint pain"],
    typical_misdiagnoses: ["infection", "gout", "vasculitis", "ear infection"],
    diagnostic_tests: ["clinical diagnosis", "biopsy of cartilage", "CT chest (trachea)", "pulmonary function tests", "audiometry"],
    specialist: "Rheumatologist, ENT",
    avg_diagnosis_time: "3–6 years",
  },
  {
    name: "Autoimmune Encephalitis",
    category: "Neurological/Autoimmune",
    keywords: ["confusion", "seizure", "psychiatric", "memory", "young", "movement", "antibody", "behavior change", "NMDA", "brain"],
    key_symptoms: ["rapid psychiatric symptoms", "seizures", "memory loss", "movement disorders", "altered consciousness", "often young women"],
    typical_misdiagnoses: ["psychiatric illness", "schizophrenia", "drug-induced psychosis", "viral encephalitis"],
    diagnostic_tests: ["NMDA-R antibodies (serum + CSF)", "VGKC antibodies", "MRI brain", "EEG", "lumbar puncture", "PET scan"],
    specialist: "Neurologist, Neuroimmunologist",
    avg_diagnosis_time: "1–3 months (but often misdiagnosed for years)",
  },
  {
    name: "Neuromyelitis Optica Spectrum Disorder (NMOSD)",
    category: "Neurological/Autoimmune",
    keywords: ["vision", "blind", "optic neuritis", "spinal cord", "paralysis", "AQP4", "severe", "attack", "MS-like"],
    key_symptoms: ["severe optic neuritis", "transverse myelitis", "vision loss", "paralysis", "pain", "often attacks worse than MS"],
    typical_misdiagnoses: ["multiple sclerosis", "optic neuritis alone", "spinal cord injury"],
    diagnostic_tests: ["AQP4-IgG antibodies", "MOG-IgG antibodies", "MRI brain/spine", "visual evoked potentials", "OCT eye scan"],
    specialist: "Neurologist (MS/Neuroimmunology specialist)",
    avg_diagnosis_time: "2–4 years",
  },
  {
    name: "Transverse Myelitis",
    category: "Neurological/Autoimmune",
    keywords: ["weakness", "legs", "spinal cord", "bladder", "sensory", "band", "sudden", "paralysis", "back pain", "bowel"],
    key_symptoms: ["sudden leg weakness", "sensory level (band sensation)", "bladder/bowel dysfunction", "back pain", "can progress to paralysis"],
    typical_misdiagnoses: ["slipped disc", "MS", "stroke", "conversion disorder"],
    diagnostic_tests: ["MRI spine with contrast", "lumbar puncture", "AQP4/MOG antibodies", "NMO spectrum workup", "VEP"],
    specialist: "Neurologist",
    avg_diagnosis_time: "Weeks to months (acute onset)",
  },

  // ── NEUROLOGICAL ──────────────────────────────────────────────────────────
  {
    name: "Chiari Malformation",
    category: "Neurological/Structural",
    keywords: ["headache", "cough", "sneeze", "neck", "balance", "tingling", "hands", "swallowing", "vision", "posterior"],
    key_symptoms: ["headache at base of skull worsening with cough/sneeze", "neck pain", "balance problems", "hand tingling/weakness", "swallowing difficulty"],
    typical_misdiagnoses: ["migraine", "MS", "anxiety", "fibromyalgia"],
    diagnostic_tests: ["MRI brain/cervical spine (sagittal view)", "cine MRI CSF flow study", "neurological exam"],
    specialist: "Neurosurgeon, Neurologist",
    avg_diagnosis_time: "5–8 years",
  },
  {
    name: "Complex Regional Pain Syndrome (CRPS)",
    category: "Neurological/Pain",
    keywords: ["burning pain", "skin color", "temperature change", "swelling", "injury", "allodynia", "touch sensitive", "limb", "shiny skin"],
    key_symptoms: ["severe burning pain", "skin color/temperature changes", "allodynia (pain from light touch)", "swelling", "shiny skin", "after minor injury"],
    typical_misdiagnoses: ["psychosomatic pain", "anxiety", "malingering", "arthritis"],
    diagnostic_tests: ["clinical diagnosis (Budapest criteria)", "bone scan", "MRI", "thermography", "sympathetic nerve block response"],
    specialist: "Pain Specialist, Neurologist",
    avg_diagnosis_time: "2–4 years",
  },
  {
    name: "Kleine-Levin Syndrome (KLS)",
    category: "Neurological",
    keywords: ["sleeping", "hypersomnia", "episodes", "days", "weeks", "teen", "confused", "eating", "hypersexual", "amnesia"],
    key_symptoms: ["recurring episodes of excessive sleep (18–20hrs/day)", "cognitive impairment", "hyperphagia", "episodes last days to weeks", "normal between episodes"],
    typical_misdiagnoses: ["depression", "psychiatric illness", "drug use", "encephalitis"],
    diagnostic_tests: ["clinical diagnosis", "MRI brain", "EEG", "sleep study", "psychiatric evaluation to rule out"],
    specialist: "Neurologist, Sleep Specialist",
    avg_diagnosis_time: "3–7 years",
  },
  {
    name: "Tarlov Cysts",
    category: "Neurological/Structural",
    keywords: ["sacral", "coccyx", "buttock", "perineal", "bladder", "bowel", "sitting pain", "sciatica", "cyst", "spinal"],
    key_symptoms: ["sacral/tailbone pain", "perineal pain", "bladder dysfunction", "bowel dysfunction", "pain worsens sitting"],
    typical_misdiagnoses: ["sciatica", "interstitial cystitis", "pudendal neuralgia", "piriformis syndrome"],
    diagnostic_tests: ["MRI sacral spine (specific sequences)", "CT myelogram", "urodynamic testing"],
    specialist: "Neurosurgeon, Neurologist",
    avg_diagnosis_time: "5–10 years",
  },

  // ── GASTROINTESTINAL ──────────────────────────────────────────────────────
  {
    name: "Gastroparesis",
    category: "Gastrointestinal",
    keywords: ["nausea", "vomiting", "fullness", "stomach", "early satiety", "bloating", "weight loss", "delayed", "emptying", "diabetes"],
    key_symptoms: ["nausea/vomiting after eating", "feeling full after small amounts", "bloating", "weight loss", "upper abdominal pain"],
    typical_misdiagnoses: ["IBS", "anxiety", "eating disorder", "GERD", "functional dyspepsia"],
    diagnostic_tests: ["gastric emptying scintigraphy (4hr)", "gastric emptying breath test", "endoscopy", "wireless motility capsule"],
    specialist: "Gastroenterologist (motility specialist)",
    avg_diagnosis_time: "3–5 years",
  },
  {
    name: "Eosinophilic Esophagitis (EoE)",
    category: "Gastrointestinal/Immunological",
    keywords: ["swallowing", "food stuck", "dysphagia", "chest pain", "heartburn", "food impaction", "allergy", "reflux", "eosinophil"],
    key_symptoms: ["difficulty swallowing", "food getting stuck in throat", "chest pain not cardiac", "heartburn not responding to PPIs", "food impaction"],
    typical_misdiagnoses: ["GERD/acid reflux", "esophageal spasm", "anxiety", "globus sensation"],
    diagnostic_tests: ["upper endoscopy with biopsies", "esophageal eosinophil count >15/hpf", "allergy testing", "swallowed fluticasone trial"],
    specialist: "Gastroenterologist, Allergist",
    avg_diagnosis_time: "4–6 years",
  },
  {
    name: "Celiac Disease",
    category: "Gastrointestinal/Autoimmune",
    keywords: ["gluten", "wheat", "diarrhea", "bloating", "fatigue", "anemia", "malabsorption", "weight loss", "dermatitis", "bone"],
    key_symptoms: ["GI symptoms with gluten", "fatigue", "anemia", "malabsorption", "bone density loss", "skin rash (DH)", "neurological symptoms"],
    typical_misdiagnoses: ["IBS", "Crohn's disease", "depression", "anxiety", "fibromyalgia"],
    diagnostic_tests: ["anti-tTG IgA antibodies", "total IgA level", "anti-EMA antibodies", "duodenal biopsy", "HLA-DQ2/DQ8"],
    specialist: "Gastroenterologist",
    avg_diagnosis_time: "6–10 years",
  },
  {
    name: "Median Arcuate Ligament Syndrome (MALS)",
    category: "Vascular/Gastrointestinal",
    keywords: ["abdominal pain", "eating", "weight loss", "celiac artery", "young", "thin", "postprandial", "bruit", "food fear"],
    key_symptoms: ["severe abdominal pain after eating", "fear of eating", "significant weight loss", "abdominal bruit", "nausea", "young thin patients"],
    typical_misdiagnoses: ["eating disorder", "IBS", "anxiety", "functional abdominal pain"],
    diagnostic_tests: ["Doppler ultrasound celiac artery", "CT angiography", "mesenteric angiography", "pulmonary function"],
    specialist: "Vascular Surgeon, Gastroenterologist",
    avg_diagnosis_time: "5–10 years",
  },
  {
    name: "Primary Sclerosing Cholangitis (PSC)",
    category: "Hepatobiliary",
    keywords: ["liver", "bile ducts", "IBD", "Crohn's", "colitis", "jaundice", "itching", "fatigue", "cholangitis", "stricture"],
    key_symptoms: ["jaundice", "itching", "fatigue", "right upper abdominal pain", "recurrent cholangitis", "associated with IBD"],
    typical_misdiagnoses: ["gallstones", "hepatitis", "IBD alone"],
    diagnostic_tests: ["MRCP (biliary imaging)", "liver biopsy", "ALP/GGT levels", "p-ANCA", "colonoscopy for IBD"],
    specialist: "Hepatologist, Gastroenterologist",
    avg_diagnosis_time: "2–4 years",
  },
  {
    name: "Superior Mesenteric Artery Syndrome (SMAS)",
    category: "Gastrointestinal/Vascular",
    keywords: ["nausea", "vomiting", "weight loss", "lying down relief", "thin", "duodenum", "upper GI", "obstruction", "postprandial"],
    key_symptoms: ["nausea/vomiting", "abdominal distension", "relief lying on left side/prone", "weight loss", "early satiety"],
    typical_misdiagnoses: ["eating disorder", "gastroparesis", "anxiety", "functional dyspepsia"],
    diagnostic_tests: ["upper GI barium series", "CT angiography (SMA angle)", "upper endoscopy", "abdominal ultrasound"],
    specialist: "Gastroenterologist, Vascular Surgeon",
    avg_diagnosis_time: "3–7 years",
  },

  // ── CARDIOVASCULAR / VASCULAR ─────────────────────────────────────────────
  {
    name: "Takayasu's Arteritis",
    category: "Vasculitis",
    keywords: ["pulse", "blood pressure difference", "arms", "young woman", "fatigue", "fever", "aorta", "vision", "dizziness", "Asian"],
    key_symptoms: ["absent/diminished pulse", "blood pressure difference between arms", "chronic fatigue", "visual symptoms", "young Asian women"],
    typical_misdiagnoses: ["hypertension", "MS", "anxiety", "fibromyalgia"],
    diagnostic_tests: ["CT/MR angiography", "PET scan (active disease)", "ESR/CRP", "angiography", "echo"],
    specialist: "Rheumatologist, Vascular Surgeon",
    avg_diagnosis_time: "3–7 years",
  },
  {
    name: "Hereditary Angioedema (HAE)",
    category: "Immunological/Genetic",
    keywords: ["swelling", "attacks", "face", "lips", "throat", "abdomen", "hereditary", "C1 inhibitor", "non-itchy", "no hives"],
    key_symptoms: ["recurrent non-itchy swelling (face, lips, throat, abdomen)", "abdominal pain attacks", "family history", "no response to antihistamines"],
    typical_misdiagnoses: ["allergy/anaphylaxis", "IBS", "appendicitis", "allergic angioedema"],
    diagnostic_tests: ["C1-inhibitor level and function", "C4 level (low)", "C1q level", "genetic testing SERPING1"],
    specialist: "Allergist/Immunologist",
    avg_diagnosis_time: "8–10 years",
  },
  {
    name: "Loeys-Dietz Syndrome",
    category: "Connective Tissue/Genetic",
    keywords: ["aorta", "aneurysm", "cleft palate", "wide-set eyes", "hypertelorism", "skin", "joints", "Marfan-like", "twist arteries"],
    key_symptoms: ["aortic aneurysm", "arterial tortuosity", "hypertelorism (wide-set eyes)", "cleft palate", "joint laxity"],
    typical_misdiagnoses: ["Marfan syndrome", "EDS", "normal tall stature"],
    diagnostic_tests: ["CT/MR angiography full body", "TGFBR1/TGFBR2 gene testing", "echocardiogram", "ophthalmology exam"],
    specialist: "Clinical Geneticist, Cardiologist",
    avg_diagnosis_time: "3–5 years",
  },

  // ── METABOLIC / GENETIC ───────────────────────────────────────────────────
  {
    name: "Fabry Disease",
    category: "Metabolic/Genetic (Lysosomal)",
    keywords: ["burning pain", "hands", "feet", "kidney", "heart", "stroke", "young", "rash", "angiokeratoma", "heat intolerance", "GI"],
    key_symptoms: ["burning pain in hands/feet", "heat/cold intolerance", "kidney disease", "heart disease in young", "small red skin spots", "GI problems"],
    typical_misdiagnoses: ["MS", "growing pains", "erythromelalgia", "anxiety"],
    diagnostic_tests: ["alpha-galactosidase A enzyme activity", "GLA gene testing", "plasma lyso-Gb3", "renal function", "echocardiogram"],
    specialist: "Clinical Geneticist, Nephrologist, Cardiologist",
    avg_diagnosis_time: "10–15 years",
  },
  {
    name: "Gaucher Disease",
    category: "Metabolic/Genetic (Lysosomal)",
    keywords: ["spleen", "enlarged", "liver", "bone pain", "fatigue", "bruising", "anemia", "thrombocytopenia", "Jewish", "glucocerebrosidase"],
    key_symptoms: ["enlarged spleen/liver", "bone pain and fractures", "fatigue", "easy bruising", "low blood counts", "Ashkenazi Jewish ancestry"],
    typical_misdiagnoses: ["leukemia", "lymphoma", "idiopathic thrombocytopenia", "anemia of unknown cause"],
    diagnostic_tests: ["beta-glucocerebrosidase enzyme activity", "GBA gene testing", "bone marrow biopsy", "MRI bones/organs"],
    specialist: "Hematologist, Clinical Geneticist",
    avg_diagnosis_time: "3–5 years",
  },
  {
    name: "Pompe Disease (Glycogen Storage Disease II)",
    category: "Metabolic/Genetic",
    keywords: ["muscle weakness", "breathing", "diaphragm", "respiratory", "enzyme", "GAA", "wheelchair", "infant", "adult onset", "acid maltase"],
    key_symptoms: ["progressive proximal muscle weakness", "respiratory insufficiency", "difficulty breathing lying flat", "exercise intolerance"],
    typical_misdiagnoses: ["muscular dystrophy", "polymyositis", "limb girdle muscular dystrophy", "COPD"],
    diagnostic_tests: ["acid alpha-glucosidase (GAA) enzyme activity", "GAA gene testing", "CK level", "muscle biopsy", "pulmonary function tests"],
    specialist: "Neurologist, Clinical Geneticist, Pulmonologist",
    avg_diagnosis_time: "5–10 years",
  },
  {
    name: "Primary Hyperaldosteronism (Conn's Syndrome)",
    category: "Endocrine",
    keywords: ["high blood pressure", "low potassium", "resistant hypertension", "headache", "muscle weakness", "hypertension young", "aldosterone"],
    key_symptoms: ["resistant hypertension", "low potassium", "muscle weakness/cramps", "headaches", "increased urination", "high blood pressure in young people"],
    typical_misdiagnoses: ["essential hypertension", "anxiety", "idiopathic hypokalemia"],
    diagnostic_tests: ["aldosterone-renin ratio", "24hr urine aldosterone", "CT adrenal", "adrenal vein sampling", "fludrocortisone suppression test"],
    specialist: "Endocrinologist",
    avg_diagnosis_time: "5–8 years",
  },
  {
    name: "Cushing's Syndrome",
    category: "Endocrine",
    keywords: ["weight gain", "face", "moon face", "buffalo hump", "stretch marks", "cortisol", "diabetes", "hypertension", "weak muscles", "purple striae"],
    key_symptoms: ["weight gain (central)", "moon face", "buffalo hump", "purple stretch marks", "muscle weakness", "easy bruising", "high blood sugar"],
    typical_misdiagnoses: ["obesity", "metabolic syndrome", "depression", "PCOS"],
    diagnostic_tests: ["24hr urinary free cortisol", "late-night salivary cortisol", "1mg overnight dexamethasone suppression", "MRI pituitary", "CT adrenal"],
    specialist: "Endocrinologist",
    avg_diagnosis_time: "3–6 years",
  },
  {
    name: "Multiple Endocrine Neoplasia (MEN1)",
    category: "Endocrine/Genetic",
    keywords: ["parathyroid", "calcium", "pituitary", "pancreas", "tumor", "gastrinoma", "prolactin", "kidney stones", "family", "MEN"],
    key_symptoms: ["kidney stones", "high calcium", "pituitary tumor symptoms", "GI ulcers (gastrinoma)", "low blood sugar (insulinoma)"],
    typical_misdiagnoses: ["hyperparathyroidism alone", "peptic ulcer disease", "hypoglycemia of unknown cause"],
    diagnostic_tests: ["PTH and calcium", "prolactin/GH/IGF-1", "fasting gastrin", "fasting insulin/glucose", "MEN1 gene testing", "MRI pituitary"],
    specialist: "Endocrinologist, Clinical Geneticist",
    avg_diagnosis_time: "3–8 years",
  },

  // ── PULMONARY ─────────────────────────────────────────────────────────────
  {
    name: "Pulmonary Arterial Hypertension (PAH)",
    category: "Cardiovascular/Pulmonary",
    keywords: ["shortness of breath", "exertion", "fatigue", "fainting", "right heart", "pressure", "young woman", "Raynaud", "scleroderma"],
    key_symptoms: ["progressive shortness of breath on exertion", "fatigue", "fainting", "leg swelling", "chest pain", "often young women"],
    typical_misdiagnoses: ["asthma", "anxiety", "deconditioning", "COPD"],
    diagnostic_tests: ["echocardiogram", "right heart catheterization (gold standard)", "6-minute walk test", "CT pulmonary angiography", "pulmonary function tests"],
    specialist: "Pulmonologist, Cardiologist (PAH specialist)",
    avg_diagnosis_time: "2–3 years",
  },
  {
    name: "Lymphangioleiomyomatosis (LAM)",
    category: "Pulmonary/Rare",
    keywords: ["shortness of breath", "pneumothorax", "collapsed lung", "young woman", "kidney tumor", "cough", "TSC", "lung cysts"],
    key_symptoms: ["progressive breathlessness", "spontaneous pneumothorax", "lung cysts on CT", "chylous pleural effusion", "almost exclusively women"],
    typical_misdiagnoses: ["asthma", "COPD", "emphysema", "anxiety"],
    diagnostic_tests: ["high-resolution CT chest (cysts)", "serum VEGF-D", "lung biopsy", "abdominal CT for angiomyolipomas", "PFTs"],
    specialist: "Pulmonologist (LAM specialist)",
    avg_diagnosis_time: "3–5 years",
  },

  // ── SKIN / MULTISYSTEM ────────────────────────────────────────────────────
  {
    name: "Systemic Sclerosis (Scleroderma)",
    category: "Autoimmune/Connective Tissue",
    keywords: ["skin hardening", "Raynaud", "fingers", "tight skin", "reflux", "lungs", "kidney", "swallowing", "sclerodactyly", "calcinosis"],
    key_symptoms: ["skin hardening/thickening", "Raynaud phenomenon", "reflux/swallowing problems", "lung fibrosis", "kidney crisis"],
    typical_misdiagnoses: ["Raynaud's only", "GERD", "fibromyalgia", "lupus"],
    diagnostic_tests: ["ANA (speckled)", "anti-SCL-70 antibodies", "anti-centromere antibodies", "HRCT chest", "echocardiogram", "nailfold capillaroscopy"],
    specialist: "Rheumatologist",
    avg_diagnosis_time: "3–5 years",
  },
  {
    name: "Dermatomyositis / Polymyositis",
    category: "Autoimmune/Neuromuscular",
    keywords: ["muscle weakness", "rash", "heliotrope", "purple eyelids", "Gottron", "knuckles", "proximal", "stairs", "arms", "swallowing"],
    key_symptoms: ["proximal muscle weakness (stairs, raising arms)", "heliotrope rash (purple eyelids)", "Gottron papules on knuckles", "swallowing difficulty"],
    typical_misdiagnoses: ["fibromyalgia", "statin side effects", "MS", "muscular dystrophy"],
    diagnostic_tests: ["CK level (very high)", "myositis-specific antibodies (anti-Jo-1, anti-MDA5)", "MRI muscle", "EMG", "muscle biopsy", "PET scan (malignancy screen)"],
    specialist: "Rheumatologist, Neurologist",
    avg_diagnosis_time: "2–4 years",
  },
  {
    name: "Vasculitis (ANCA-associated)",
    category: "Vasculitis/Autoimmune",
    keywords: ["kidney", "lung", "sinuses", "blood urine", "cough blood", "nosebleeds", "hearing loss", "neuropathy", "ANCA", "Wegener", "MPA"],
    key_symptoms: ["sinusitis/nosebleeds (chronic)", "coughing blood", "blood in urine", "kidney failure", "peripheral neuropathy", "ear/hearing problems"],
    typical_misdiagnoses: ["recurrent sinusitis", "asthma", "glomerulonephritis of unknown cause", "TB"],
    diagnostic_tests: ["c-ANCA/PR3 antibodies", "p-ANCA/MPO antibodies", "urinalysis (red cell casts)", "chest CT", "kidney biopsy", "ENT assessment"],
    specialist: "Rheumatologist, Nephrologist",
    avg_diagnosis_time: "1–3 years",
  },

  // ── HEMATOLOGICAL ─────────────────────────────────────────────────────────
  {
    name: "Paroxysmal Nocturnal Hemoglobinuria (PNH)",
    category: "Hematological",
    keywords: ["dark urine", "morning", "blood clots", "anemia", "fatigue", "abdominal pain", "swallowing pain", "esophageal spasm", "aplastic anemia"],
    key_symptoms: ["dark urine especially in morning", "blood clots (unusual sites)", "severe fatigue", "anemia", "abdominal pain/esophageal spasm"],
    typical_misdiagnoses: ["hemolytic anemia", "aplastic anemia", "idiopathic thrombosis"],
    diagnostic_tests: ["flow cytometry (GPI-anchored proteins)", "LDH level", "reticulocyte count", "bone marrow biopsy", "Coombs test (negative)"],
    specialist: "Hematologist",
    avg_diagnosis_time: "1–5 years",
  },
  {
    name: "Common Variable Immunodeficiency (CVID)",
    category: "Immunological/Primary Immunodeficiency",
    keywords: ["infections", "recurrent", "pneumonia", "sinusitis", "low immunoglobulin", "antibody deficiency", "GI", "autoimmune", "bronchiectasis"],
    key_symptoms: ["recurrent bacterial infections (lungs, sinuses)", "low antibody levels", "GI problems", "autoimmune features", "may develop lymphoma"],
    typical_misdiagnoses: ["bad luck with infections", "IBS", "asthma", "common variable symptoms dismissed"],
    diagnostic_tests: ["immunoglobulin levels (IgG, IgA, IgM)", "specific antibody responses to vaccines", "B-cell phenotyping", "lymphocyte subsets"],
    specialist: "Immunologist",
    avg_diagnosis_time: "5–7 years",
  },

  // ── DYSAUTONOMIA (Additional) ──────────────────────────────────────────────
  {
    name: "Orthostatic Hypotension / Pure Autonomic Failure",
    category: "Dysautonomia",
    keywords: ["blood pressure drop", "standing", "fainting", "elderly", "parkinsons", "autonomic", "dizziness", "orthostatic", "lightheaded"],
    key_symptoms: ["blood pressure drop on standing (>20mmHg systolic)", "dizziness", "fainting", "fatigue", "cognitive slowing when upright"],
    typical_misdiagnoses: ["dehydration", "anxiety", "medication side effects", "aging"],
    diagnostic_tests: ["lying/standing BP measurement", "tilt table test", "autonomic function battery", "plasma norepinephrine levels"],
    specialist: "Autonomic Neurologist, Cardiologist",
    avg_diagnosis_time: "2–5 years",
  },

  // ── CHRONIC PAIN / CENTRAL SENSITIZATION ─────────────────────────────────
  {
    name: "Fibromyalgia",
    category: "Chronic Pain / Central Sensitization",
    keywords: ["widespread pain", "tender points", "fatigue", "sleep", "fog", "sensitivity", "IBS", "headache", "depression", "anxiety"],
    key_symptoms: ["widespread musculoskeletal pain", "fatigue", "sleep problems", "brain fog", "heightened sensitivity to pain", "commonly co-exists with other conditions"],
    typical_misdiagnoses: ["malingering", "psychosomatic", "depression", "arthritis"],
    diagnostic_tests: ["clinical diagnosis (2016 criteria)", "rule out inflammatory arthritis (CRP/ESR/RF)", "thyroid function", "sleep study"],
    specialist: "Rheumatologist, Pain Specialist",
    avg_diagnosis_time: "5 years",
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
