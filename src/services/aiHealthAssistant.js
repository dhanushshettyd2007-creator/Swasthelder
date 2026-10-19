// ==============================================================
// AI HEALTH ASSISTANT SERVICE
// --------------------------------------------------------------
// Prototype: a safe, rule-based keyword matcher (no diagnosis, no prescribing).
//
// TO CONNECT A REAL AI LATER:
//   1. Build a backend endpoint (Node/Express, serverless function, etc.) that
//      calls your AI provider. Keep the provider API key ONLY on that server.
//   2. Put the endpoint URL in .env as VITE_AI_API_URL.
//   3. Make the endpoint return the same shape as analyzeSymptoms() below.
//   4. Keep the safety rules in your server-side system prompt: no diagnosis,
//      no personalised doses, always advise a doctor for elderly residents.
// ==============================================================

export const DISCLAIMER =
  "This AI assistant provides general health information and is not a substitute for a qualified doctor. Medication should only be administered according to a doctor's prescription or caregiver-approved medical plan."

export const EMERGENCY_SIGNS = [
  'Difficulty breathing', 'Chest pain', 'Loss of consciousness',
  'Severe confusion', 'Sudden weakness', 'Severe allergic reaction',
]

const PARACETAMOL = {
  name: 'Paracetamol',
  purpose: 'May be used for temporary relief of pain and fever.',
  important: "Dosage must be determined according to the person's age, medical history, existing medications, and doctor's instructions.",
}

const KNOWLEDGE = [
  {
    keys: ['fever', 'temperature', 'feverish'], label: 'Fever',
    causes: ['Common viral illness', 'Infection (needs a doctor to confirm)', 'Dehydration'],
    meds: [PARACETAMOL],
    warnings: ['Encourage fluids unless the doctor has restricted them.', 'Fever in elderly residents can signal a serious infection. Inform the doctor early.'],
  },
  {
    keys: ['headache', 'head ache', 'migraine'], label: 'Headache',
    causes: ['Tension headache', 'Dehydration', 'Poor sleep or eye strain', 'High blood pressure (should be checked)'],
    meds: [PARACETAMOL],
    warnings: ['Check blood pressure if the resident has hypertension.', 'A sudden, severe headache needs urgent medical attention.'],
  },
  {
    keys: ['cough', 'coughing'], label: 'Cough',
    causes: ['Common cold or viral infection', 'Throat irritation or allergy', 'Chest infection (needs a doctor to confirm)'],
    meds: [{ name: 'Warm fluids and honey-based soothers', purpose: 'Simple comfort measures for throat irritation. Honey is not suitable for residents with diabetes unless the doctor agrees.', important: 'Cough syrups can interact with other medicines. Ask a pharmacist first.' }],
    warnings: ['A cough lasting more than a week, or with blood or breathlessness, needs a doctor.'],
  },
  {
    keys: ['cold', 'runny nose', 'sneezing', 'blocked nose'], label: 'Cold',
    causes: ['Common cold (viral)', 'Seasonal allergy'],
    meds: [{ name: 'Rest, fluids and steam inhalation', purpose: 'General comfort measures. Many cold remedies can raise blood pressure or cause drowsiness in older adults.', important: 'Check with a doctor or pharmacist before giving any cold product.' }],
    warnings: ['Watch for fever, breathing trouble or worsening symptoms.'],
  },
  {
    keys: ['stomach', 'abdominal', 'tummy', 'vomit', 'diarrhea', 'diarrhoea', 'nausea'], label: 'Stomach pain',
    causes: ['Indigestion or gas', 'Food-related upset', 'Constipation', 'Stomach infection'],
    meds: [{ name: 'Oral rehydration solution (ORS)', purpose: 'Helps replace fluids and salts when there is vomiting or loose stools.', important: 'Avoid painkillers for stomach pain unless a doctor advises. Some can irritate the stomach.' }],
    warnings: ['Dehydration develops quickly in older adults.', 'Severe, persistent pain or black stools need urgent medical care.'],
  },
  {
    keys: ['body pain', 'body ache', 'bodyache', 'joint pain', 'muscle pain', 'back pain'], label: 'Body pain',
    causes: ['Muscle strain or fatigue', 'Arthritis or joint wear', 'Viral illness'],
    meds: [PARACETAMOL, { name: 'Anti-inflammatory painkillers (NSAIDs)', purpose: 'Used for pain and inflammation.', important: "Often unsuitable for older adults, especially with heart, kidney or stomach problems or blood thinners. Only with a doctor's approval." }],
    warnings: ['Gentle rest and warmth may help. Report any pain after a fall to the doctor.'],
  },
]

const unique = (arr) => [...new Set(arr)]
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

export async function analyzeSymptoms(input) {
  const url = import.meta.env.VITE_AI_API_URL
  if (url) {
    // Real backend integration point. Expected response shape = the object returned below.
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symptoms: input }),
    })
    if (!res.ok) throw new Error('The assistant service is unavailable.')
    return res.json()
  }

  await wait(1300) // simulated thinking time
  const text = input.toLowerCase()
  const matched = KNOWLEDGE.filter((k) => k.keys.some((key) => text.includes(key)))

  if (!matched.length) {
    return {
      matched: false,
      symptoms: [input.trim()],
      causes: [], medications: [],
      warnings: ['No matching information in the prototype dataset. Try describing the symptom differently, or contact a doctor.', 'Elderly residents should be assessed by a doctor for any new or unexplained symptom.'],
    }
  }
  const medMap = new Map()
  matched.flatMap((m) => m.meds).forEach((m) => medMap.set(m.name, m))
  return {
    matched: true,
    symptoms: matched.map((m) => m.label),
    causes: unique(matched.flatMap((m) => m.causes)),
    medications: [...medMap.values()],
    warnings: unique([
      'Check for existing medications containing the same ingredient.',
      'Do not exceed the recommended dose.',
      'Consult a doctor or pharmacist before giving any medication to an elderly resident.',
      ...matched.flatMap((m) => m.warnings),
      'Seek medical attention if symptoms are severe or persistent.',
    ]),
  }
}
