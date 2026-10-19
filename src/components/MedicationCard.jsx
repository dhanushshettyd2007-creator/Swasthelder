import { Pill, Clock, CheckCircle2 } from 'lucide-react'

export default function MedicationCard({ med }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint-100 text-emerald-700"><Pill className="h-6 w-6" /></span>
      <div className="flex-1">
        <p className="font-bold text-navy-900">{med.name} <span className="font-normal text-slate-600">- {med.dosage}</span></p>
        <p className="flex items-center gap-1 text-slate-600"><Clock className="h-4 w-4" /> {med.frequency}: {med.time}</p>
      </div>
      {med.takenToday && <CheckCircle2 className="h-6 w-6 text-emerald-600" aria-label="Taken today" />}
    </div>
  )
}
