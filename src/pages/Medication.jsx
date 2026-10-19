import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, Check, CalendarDays, RotateCcw } from 'lucide-react'
import Modal from '../components/Modal.jsx'
import { useToast } from '../components/Toast.jsx'
import useLocalStorage from '../hooks/useLocalStorage.js'
import { initialResidents, initialMeds } from '../data/dummyData.js'

const empty = { name: '', dosage: '', frequency: 'Once Daily', time: '', start: '', end: '', instructions: '', by: '', notes: '' }
const freqs = ['Once Daily', 'Twice Daily', 'Three Times Daily', 'Weekly', 'As Needed']

function duration(start, end) {
  if (!start || !end) return 'Ongoing'
  const d = Math.round((new Date(end) - new Date(start)) / 864e5) + 1
  return d > 0 ? `${d} Day${d > 1 ? 's' : ''}` : 'Ongoing'
}

function Field({ form, set, label, k, type = 'text', ...p }) {
  return <div><label className="label" htmlFor={k}>{label}</label><input id={k} type={type} className="input" value={form[k]} onChange={set(k)} {...p} /></div>
}

export default function Medication() {
  const toast = useToast()
  const [residents] = useLocalStorage('se_residents', initialResidents)
  const [meds, setMeds] = useLocalStorage('se_meds', initialMeds)
  const [rid, setRid] = useState(residents[0]?.id)
  const [form, setForm] = useState(null)
  const [editId, setEditId] = useState(null)
  const [error, setError] = useState('')
  const r = residents.find((x) => x.id === Number(rid))
  const list = meds.filter((m) => m.residentId === Number(rid))

  const openAdd = () => { setForm(empty); setEditId(null); setError('') }
  const openEdit = (m) => { setForm({ ...empty, ...m, start: m.start || '', end: m.end || '' }); setEditId(m.id); setError('') }
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const save = (e) => {
    e.preventDefault()
    if (!form.name.trim()) { setError('Please enter a medication name.'); toast('Please enter a medication name.', 'error'); return }
    if (form.start && form.end && form.end < form.start) { setError('End date must be after the start date.'); return }
    const med = { ...form, name: form.name.trim(), duration: duration(form.start, form.end) }
    if (editId) {
      setMeds(meds.map((m) => (m.id === editId ? { ...m, ...med } : m)))
      toast('Medication updated.')
    } else {
      setMeds([...meds, { ...med, id: Date.now(), residentId: Number(rid), takenToday: false }])
      toast('Medication saved.')
    }
    setForm(null)
  }
  const remove = (m) => {
    if (!window.confirm(`Delete ${m.name} for ${r.name}?`)) return
    setMeds(meds.filter((x) => x.id !== m.id)); toast(`${m.name} deleted.`, 'info')
  }
  const take = (m) => { setMeds(meds.map((x) => (x.id === m.id ? { ...x, takenToday: true } : x))); toast(`${m.name} marked as taken.`) }
  const reset = () => { setMeds(initialMeds); toast('Demo data restored.', 'info') }



  return (
    <div className="section">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Medication Management</h1>
          <p className="mt-2 text-lg text-slate-700">Select a resident to review and manage their medicines.</p>
        </div>
        <Link to="/schedule" className="btn-ghost"><CalendarDays className="h-5 w-5" /> Today's Schedule</Link>
      </div>

      <div className="card mt-8">
        <label className="label" htmlFor="resident">Select Resident</label>
        <select id="resident" className="input max-w-md" value={rid} onChange={(e) => setRid(e.target.value)}>
          {residents.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
        </select>
        {r && (
          <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[['Age', `${r.age} years`], ['Blood Group', r.blood], ['Emergency Contact', r.contact], ['Allergies', r.allergies]].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-slate-50 p-4"><dt className="text-sm font-bold text-slate-600">{k}</dt><dd className="mt-1 font-bold text-navy-900">{v}</dd></div>
            ))}
            <div className="rounded-xl bg-teal-50 p-4 sm:col-span-2 lg:col-span-4"><dt className="text-sm font-bold text-slate-600">Current Medications</dt><dd className="mt-1 font-bold text-navy-900">{list.map((m) => m.name).join(', ') || 'None recorded'}</dd></div>
          </dl>
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">Medication List</h2>
        <div className="flex gap-2">
          <button className="btn-ghost btn-sm" onClick={reset}><RotateCcw className="h-4 w-4" /> Reset demo data</button>
          <button className="btn-teal" onClick={openAdd}><Plus className="h-5 w-5" /> Add Medication</button>
        </div>
      </div>

      <div className="card mt-4 overflow-x-auto !p-0">
        <table className="w-full min-w-[56rem] text-left">
          <thead className="bg-navy-50 text-navy-900">
            <tr>{['Medicine Name', 'Dosage', 'Frequency', 'Time', 'Duration', 'Status', 'Action'].map((h) => <th key={h} className="px-4 py-3 font-bold">{h}</th>)}</tr>
          </thead>
          <tbody>
            {list.map((m) => (
              <tr key={m.id} className="border-t border-slate-200">
                <td className="px-4 py-3 font-bold">{m.name}</td><td className="px-4 py-3">{m.dosage}</td><td className="px-4 py-3">{m.frequency}</td>
                <td className="px-4 py-3">{m.time}</td><td className="px-4 py-3">{m.duration}</td>
                <td className="px-4 py-3"><span className={`badge ${m.takenToday ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-900'}`}>{m.takenToday ? 'Taken' : 'Active'}</span></td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="btn-ghost btn-sm" onClick={() => openEdit(m)} aria-label={`Edit ${m.name}`}><Pencil className="h-4 w-4" /> Edit</button>
                    <button className="btn-teal btn-sm" disabled={m.takenToday} onClick={() => take(m)}><Check className="h-4 w-4" /> Mark as Taken</button>
                    <button className="btn-danger btn-sm" onClick={() => remove(m)} aria-label={`Delete ${m.name}`}><Trash2 className="h-4 w-4" /> Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {!list.length && <tr><td colSpan="7" className="px-4 py-10 text-center text-slate-600">No medications yet. Choose "Add Medication" to create the first one.</td></tr>}
          </tbody>
        </table>
      </div>

      {form && (
        <Modal title={editId ? 'Edit Medication' : 'Add Medication'} onClose={() => setForm(null)}>
          <form onSubmit={save} noValidate className="space-y-4">
            <Field form={form} set={set} label="Medicine name" k="name" placeholder="e.g. Paracetamol" />
            {error && <p role="alert" className="rounded-lg bg-rose-50 p-3 font-bold text-rose-800">{error}</p>}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field form={form} set={set} label="Dosage" k="dosage" placeholder="e.g. 500 mg" />
              <div><label className="label" htmlFor="frequency">Frequency</label>
                <select id="frequency" className="input" value={form.frequency} onChange={set('frequency')}>{freqs.map((f) => <option key={f}>{f}</option>)}</select></div>
              <Field form={form} set={set} label="Time" k="time" placeholder="e.g. 9:00 AM, 9:00 PM" />
              <Field form={form} set={set} label="Prescribed by" k="by" placeholder="e.g. Dr. Mehta" />
              <Field form={form} set={set} label="Start date" k="start" type="date" />
              <Field form={form} set={set} label="End date" k="end" type="date" />
            </div>
            <Field form={form} set={set} label="Instructions" k="instructions" placeholder="e.g. After food" />
            <div><label className="label" htmlFor="notes">Notes</label><textarea id="notes" rows="3" className="input" value={form.notes} onChange={set('notes')} /></div>
            <div className="flex justify-end gap-3">
              <button type="button" className="btn-ghost" onClick={() => setForm(null)}>Cancel</button>
              <button type="submit" className="btn-primary">Save Medication</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
