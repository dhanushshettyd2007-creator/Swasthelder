import { useState } from 'react'
import { Bot, Send, Info, Stethoscope } from 'lucide-react'
import AIResponse from '../components/AIResponse.jsx'
import { useToast } from '../components/Toast.jsx'
import { analyzeSymptoms, DISCLAIMER } from '../services/aiHealthAssistant.js'

const examples = ['Headache and mild fever', 'Cough and cold', 'Stomach pain', 'Body pain']

export default function AIHealthAssistant() {
  const toast = useToast()
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const run = async (value = text) => {
    if (!value.trim()) { toast('Please describe the symptoms first.', 'error'); return }
    setLoading(true); setResult(null)
    try { setResult(await analyzeSymptoms(value)) }
    catch (err) { toast(err.message || 'Something went wrong. Please try again.', 'error') }
    finally { setLoading(false) }
  }

  return (
    <div className="bg-gradient-to-b from-mint-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-600 text-white"><Bot className="h-9 w-9" /></span>
        <h1 className="mt-4 text-4xl font-bold">SwasthElder AI Health Assistant</h1>
        <p className="mt-2 text-xl text-slate-700">Describe symptoms and receive general health and medication information.</p>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 text-amber-900">
          <Info className="mt-0.5 h-6 w-6 shrink-0" />
          <p className="font-bold">{DISCLAIMER}</p>
        </div>
        <p className="mt-3 rounded-2xl bg-navy-50 p-4 font-bold text-navy-800">For elderly residents, consult a doctor or pharmacist before giving any medication. Older adults often have multiple conditions and take several medicines.</p>

        <div className="card mt-6">
          <label htmlFor="symptoms" className="label text-xl">Symptoms</label>
          <textarea id="symptoms" rows="4" className="input text-lg" placeholder="Describe the symptoms..." value={text} onChange={(e) => setText(e.target.value)} />
          <div className="mt-3 flex flex-wrap gap-2" aria-label="Example symptoms">
            {examples.map((x) => <button key={x} className="badge bg-slate-100 text-slate-800 hover:bg-teal-100" onClick={() => { setText(x); run(x) }}>{x}</button>)}
          </div>
          <button className="btn-primary mt-5 w-full text-lg sm:w-auto" onClick={() => run()} disabled={loading}><Send className="h-5 w-5" /> Analyze Symptoms</button>
        </div>

        {loading && (
          <div className="card mt-6 flex items-center gap-4" role="status">
            <Stethoscope className="h-8 w-8 text-teal-600" />
            <p className="text-lg font-bold">Reviewing symptoms</p>
            <span className="flex gap-1.5" aria-hidden>{[0, 1, 2].map((i) => <span key={i} className="dot h-3 w-3 rounded-full bg-teal-600" style={{ animationDelay: `${i * 0.2}s` }} />)}</span>
          </div>
        )}
        {result && <div className="mt-6"><AIResponse result={result} /></div>}
      </div>
    </div>
  )
}
