import { Stethoscope, Pill, BedDouble, UserRound, History, Pencil } from 'lucide-react'

const palette = ['bg-teal-600', 'bg-navy-600', 'bg-emerald-600', 'bg-sky-700']

export default function ResidentCard({ r, meds, onProfile, onHistory, onEdit }) {
  const pending = meds.filter((m) => !m.takenToday).length
  return (
    <article className="card card-hover flex flex-col">
      <div className="flex items-center gap-4">
        <span className={`flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white ${palette[r.id % 4]}`} aria-hidden>{r.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}</span>
        <div>
          <h3 className="text-xl font-bold">{r.name}</h3>
          <p className="flex items-center gap-1 text-slate-600"><UserRound className="h-4 w-4" /> {r.age} yrs <BedDouble className="ml-2 h-4 w-4" /> Room {r.room}</p>
        </div>
      </div>
      <p className="mt-4 flex items-start gap-2"><Stethoscope className="mt-1 h-5 w-5 shrink-0 text-teal-700" /> {r.conditions}</p>
      <p className="mt-2 flex items-center gap-2"><Pill className="h-5 w-5 text-teal-700" /> {meds.length} medications</p>
      <p className="mt-3">
        <span className={`badge ${pending ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-800'}`}>{pending ? `${pending} dose${pending > 1 ? 's' : ''} pending` : 'All doses taken'}</span>
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <button className="btn-primary btn-sm" onClick={onProfile}>View Profile</button>
        <button className="btn-ghost btn-sm" onClick={onHistory}><History className="h-4 w-4" /> Medication History</button>
        <button className="btn-ghost btn-sm" onClick={onEdit} aria-label={`Edit ${r.name}`}><Pencil className="h-4 w-4" /> Edit</button>
      </div>
    </article>
  )
}
