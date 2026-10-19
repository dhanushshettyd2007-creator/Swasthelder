import { useState } from 'react'
import { CheckCircle2, Clock, Hourglass, XCircle, Check } from 'lucide-react'
import useLocalStorage from '../hooks/useLocalStorage.js'
import { useToast } from '../components/Toast.jsx'
import { initialSchedule } from '../data/dummyData.js'

const look = {
  Completed: ['bg-emerald-100 text-emerald-800 border-emerald-500', CheckCircle2],
  Pending: ['bg-amber-100 text-amber-900 border-amber-500', Clock],
  Upcoming: ['bg-sky-100 text-sky-900 border-sky-500', Hourglass],
  Missed: ['bg-rose-100 text-rose-800 border-rose-500', XCircle],
}
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function Schedule() {
  const toast = useToast()
  const [items, setItems] = useLocalStorage('se_schedule', initialSchedule)
  const [day, setDay] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1)
  const done = items.filter((i) => i.status === 'Completed').length
  const pct = Math.round((done / items.length) * 100)

  const complete = (i) => { setItems(items.map((x) => (x.id === i.id ? { ...x, status: 'Completed' } : x))); toast(`${i.medicine} marked as completed.`) }

  return (
    <div className="section">
      <h1 className="text-4xl font-bold">Medication Schedule</h1>
      <p className="mt-2 text-lg text-slate-700">Today's doses across all residents.</p>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Days of the week">
        {days.map((d, i) => (
          <button key={d} role="tab" aria-selected={day === i} onClick={() => setDay(i)} className={`min-h-[56px] min-w-[64px] rounded-xl px-4 font-bold transition ${day === i ? 'bg-navy-700 text-white shadow-md' : 'bg-white text-slate-700 ring-1 ring-slate-300 hover:bg-navy-50'}`}>{d}</button>
        ))}
      </div>

      <div className="card mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Today's Medication Progress: {done}/{items.length} Completed</h2>
          <span className="font-bold text-teal-700">{pct}%</span>
        </div>
        <div className="mt-3 h-4 overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-valuenow={pct} aria-valuemin="0" aria-valuemax="100">
          <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <h2 className="mt-8 text-2xl font-bold">Today's Medication Schedule</h2>
      {day !== (new Date().getDay() === 0 ? 6 : new Date().getDay() - 1) && <p className="mt-2 rounded-xl bg-navy-50 p-3 font-bold text-navy-800">Demo note: the sample schedule is shown for any selected day.</p>}
      <ul className="mt-4 space-y-3">
        {items.map((i) => {
          const [cls, Icon] = look[i.status]
          return (
            <li key={i.id} className={`flex flex-wrap items-center gap-4 rounded-2xl border-l-8 bg-white p-4 shadow-sm ${cls.split(' ')[2]}`}>
              <span className="w-24 font-display text-xl font-bold text-navy-900">{i.time}</span>
              <div className="min-w-[10rem] flex-1"><p className="text-lg font-bold">{i.medicine}</p><p className="text-slate-600">{i.resident}</p></div>
              <span className={`badge ${cls.split(' ').slice(0, 2).join(' ')}`}><Icon className="h-4 w-4" /> {i.status}</span>
              {i.status !== 'Completed' && <button className="btn-teal btn-sm" onClick={() => complete(i)}><Check className="h-4 w-4" /> Mark taken</button>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
