import { Stethoscope, Pill, ShieldAlert, Siren, HelpCircle } from 'lucide-react'
import { EMERGENCY_SIGNS } from '../services/aiHealthAssistant.js'

const Block = ({ icon: Icon, title, children, tone = 'text-navy-800' }) => (
  <section className="rounded-2xl bg-slate-50 p-5">
    <h3 className={`mb-3 flex items-center gap-2 font-sans text-xl font-bold ${tone}`}><Icon className="h-6 w-6" aria-hidden /> {title}</h3>
    {children}
  </section>
)

export default function AIResponse({ result }) {
  return (
    <div className="page-enter space-y-4">
      <Block icon={Stethoscope} title="Symptoms Detected">
        <div className="flex flex-wrap gap-2">{result.symptoms.map((s) => <span key={s} className="badge bg-teal-100 text-teal-900">{s}</span>)}</div>
      </Block>
      {result.causes.length > 0 && (
        <Block icon={HelpCircle} title="Possible Causes">
          <ul className="list-disc space-y-1 pl-6">{result.causes.map((c) => <li key={c}>{c}</li>)}</ul>
        </Block>
      )}
      {result.medications.length > 0 && (
        <Block icon={Pill} title="General Medication Information">
          <div className="space-y-3">
            {result.medications.map((m) => (
              <div key={m.name} className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-lg font-bold">{m.name}</p>
                <p className="mt-1"><b>Purpose:</b> {m.purpose}</p>
                <p className="mt-1"><b>Important:</b> {m.important}</p>
              </div>
            ))}
          </div>
        </Block>
      )}
      <Block icon={ShieldAlert} title="Safety Warnings" tone="text-amber-800">
        <ul className="list-disc space-y-1 pl-6">{result.warnings.map((w) => <li key={w}>{w}</li>)}</ul>
        <p className="mt-3 rounded-lg bg-amber-100 p-3 font-bold text-amber-900">Older adults often have several conditions and medicines. Consult a doctor or pharmacist before giving any medication.</p>
      </Block>
      <section className="rounded-2xl border-2 border-rose-300 bg-rose-50 p-5">
        <h3 className="mb-3 flex items-center gap-2 font-sans text-xl font-bold text-rose-800"><Siren className="h-6 w-6" /> Emergency Warning</h3>
        <p className="font-bold">If symptoms include:</p>
        <ul className="my-2 grid list-disc gap-x-8 pl-6 sm:grid-cols-2">{EMERGENCY_SIGNS.map((s) => <li key={s}>{s}</li>)}</ul>
        <p className="mt-3 text-lg font-bold text-rose-800">Seek emergency medical attention immediately.</p>
      </section>
    </div>
  )
}
