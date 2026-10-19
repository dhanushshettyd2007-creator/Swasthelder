import { useState } from 'react'
import { Plus, Search, Phone, Droplet, AlertTriangle, FileText } from 'lucide-react'
import ResidentCard from '../components/ResidentCard.jsx'
import MedicationCard from '../components/MedicationCard.jsx'
import Modal from '../components/Modal.jsx'
import { useToast } from '../components/Toast.jsx'
import useLocalStorage from '../hooks/useLocalStorage.js'
import { initialResidents, initialMeds, activity } from '../data/dummyData.js'

const blank = { name: '', age: '', room: '', blood: '', contact: '', allergies: '', conditions: '', history: '' }
const fields = [['name', 'Full name'], ['age', 'Age', 'number'], ['room', 'Room number'], ['blood', 'Blood group'], ['contact', 'Emergency contact'], ['allergies', 'Allergies'], ['conditions', 'Medical conditions'], ['history', 'Medical history']]

export default function Residents() {
  const toast = useToast()
  const [residents, setResidents] = useLocalStorage('se_residents', initialResidents)
  const [meds] = useLocalStorage('se_meds', initialMeds)
  const [q, setQ] = useState('')
  const [view, setView] = useState(null) // { type: 'profile'|'history'|'form', r }
  const [form, setForm] = useState(blank)

  const shown = residents.filter((r) => (r.name + r.room + r.conditions).toLowerCase().includes(q.toLowerCase()))
  const medsOf = (id) => meds.filter((m) => m.residentId === id)

  const openForm = (r) => { setForm(r || blank); setView({ type: 'form', r }) }
  const save = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.age || !form.room.trim()) { toast('Please enter name, age and room number.', 'error'); return }
    if (form.id) { setResidents(residents.map((r) => (r.id === form.id ? { ...form, age: Number(form.age) } : r))); toast('Resident updated.') }
    else { setResidents([...residents, { ...form, id: Date.now(), age: Number(form.age) }]); toast('New resident added.') }
    setView(null)
  }
  const r = view?.r

  return (
    <div className="section">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><h1 className="text-4xl font-bold">Elderly Residents</h1><p className="mt-2 text-lg text-slate-700">{residents.length} residents. Demo data only.</p></div>
        <button className="btn-teal" onClick={() => openForm(null)}><Plus className="h-5 w-5" /> Add Resident</button>
      </div>
      <div className="relative mt-6 max-w-md">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
        <input className="input pl-12" placeholder="Search by name, room or condition" aria-label="Search residents" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {shown.map((x) => <ResidentCard key={x.id} r={x} meds={medsOf(x.id)} onProfile={() => setView({ type: 'profile', r: x })} onHistory={() => setView({ type: 'history', r: x })} onEdit={() => openForm(x)} />)}
      </div>
      {!shown.length && <p className="mt-8 text-lg text-slate-600">No residents match your search. Try a different name or room.</p>}

      {view?.type === 'profile' && (
        <Modal title={r.name} onClose={() => setView(null)} wide>
          <div className="grid gap-3 sm:grid-cols-2">
            <p className="rounded-xl bg-slate-50 p-3"><b>Age:</b> {r.age} years, Room {r.room}</p>
            <p className="flex items-center gap-2 rounded-xl bg-slate-50 p-3"><Droplet className="h-4 w-4 text-rose-600" /><b>Blood group:</b> {r.blood}</p>
            <p className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 sm:col-span-2"><Phone className="h-4 w-4 text-teal-700" /><b>Emergency contact:</b> {r.contact}</p>
            <p className="flex items-center gap-2 rounded-xl bg-amber-50 p-3 sm:col-span-2"><AlertTriangle className="h-4 w-4 text-amber-700" /><b>Allergies:</b> {r.allergies}</p>
            <p className="rounded-xl bg-slate-50 p-3 sm:col-span-2"><b>Medical history:</b> {r.history || 'Not recorded'}</p>
          </div>
          <h3 className="mb-2 mt-6 font-sans text-xl font-bold">Current Medication and Schedule</h3>
          <div className="space-y-2">{medsOf(r.id).map((m) => <MedicationCard key={m.id} med={m} />)}{!medsOf(r.id).length && <p className="text-slate-600">No medications recorded.</p>}</div>
          <h3 className="mb-2 mt-6 font-sans text-xl font-bold">Recent Medication Activity</h3>
          <ul className="space-y-2">{activity.filter((a) => a.residentId === r.id).map((a) => <li key={a.id} className="border-l-4 border-teal-500 pl-3">{a.text} <span className="text-slate-500">- {a.time}</span></li>)}</ul>
        </Modal>
      )}

      {view?.type === 'history' && (
        <Modal title={`Medication History: ${r.name}`} onClose={() => setView(null)}>
          <ul className="space-y-3">
            {medsOf(r.id).map((m) => (
              <li key={m.id} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3"><FileText className="mt-1 h-5 w-5 text-teal-700" />
                <span><b>{m.name} {m.dosage}</b><br />{m.frequency}, {m.duration}. Prescribed by {m.by || 'n/a'}. {m.takenToday ? 'Taken today.' : 'Not yet taken today.'}</span></li>
            ))}
            {!medsOf(r.id).length && <li className="text-slate-600">No history yet.</li>}
          </ul>
        </Modal>
      )}

      {view?.type === 'form' && (
        <Modal title={form.id ? 'Edit Resident' : 'Add Resident'} onClose={() => setView(null)}>
          <form onSubmit={save} noValidate className="space-y-4">
            {fields.map(([k, label, type]) => (
              <div key={k}><label className="label" htmlFor={`r-${k}`}>{label}</label>
                <input id={`r-${k}`} type={type || 'text'} className="input" value={form[k] ?? ''} onChange={(e) => setForm({ ...form, [k]: e.target.value })} /></div>
            ))}
            <div className="flex justify-end gap-3"><button type="button" className="btn-ghost" onClick={() => setView(null)}>Cancel</button><button className="btn-primary" type="submit">Save Resident</button></div>
          </form>
        </Modal>
      )}
    </div>
  )
}
