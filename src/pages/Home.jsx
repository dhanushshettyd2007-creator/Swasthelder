import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Pill, BellRing, Bot, ClipboardList, UserPlus, CalendarClock, Activity, Users, CheckCircle2, Clock, Siren, Phone, ArrowRight } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import Reveal from '../components/Reveal.jsx'
import DashboardCard from '../components/DashboardCard.jsx'
import Modal from '../components/Modal.jsx'
import CountUp from '../components/CountUp.jsx'
import { dashboardStats as s, activity, initialResidents } from '../data/dummyData.js'

const features = [
  { icon: Pill, t: 'Medication Tracking', d: 'Track medicines, dosage, frequency, and schedules.' },
  { icon: BellRing, t: 'Smart Reminders', d: 'Prevent missed or delayed medication doses.' },
  { icon: Bot, t: 'AI Health Assistant', d: 'Analyze symptoms and provide general medication information with safety warnings.' },
  { icon: ClipboardList, t: 'Resident Health Records', d: 'Maintain organized health and medication information for residents.' },
]
const steps = [
  { icon: UserPlus, t: 'Register Resident' },
  { icon: Pill, t: 'Add Medication' },
  { icon: CalendarClock, t: 'Set Medication Schedule' },
  { icon: Activity, t: 'Monitor & Manage' },
]

function Adherence() {
  const r = 52, c = 2 * Math.PI * r
  return (
    <div className="card">
      <h3 className="text-xl font-bold">Medication Adherence</h3>
      <div className="mt-4 flex items-center gap-6">
        <svg viewBox="0 0 120 120" className="h-32 w-32 shrink-0 -rotate-90" role="img" aria-label={`${s.adherence} percent adherence`}>
          <circle cx="60" cy="60" r={r} fill="none" stroke="#e2e8f0" strokeWidth="12" />
          <circle cx="60" cy="60" r={r} fill="none" stroke="#0d9488" strokeWidth="12" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - s.adherence / 100)} style={{ transition: 'stroke-dashoffset 1s' }} />
        </svg>
        <div>
          <p className="font-display text-4xl font-bold text-navy-900"><CountUp to={s.adherence} suffix="%" /></p>
          <ul className="mt-1 space-y-0.5 font-bold">
            <li className="text-emerald-700">Completed: {s.completed}</li>
            <li className="text-rose-700">Missed: {s.missed}</li>
            <li className="text-amber-700">Pending: {s.pending}</li>
          </ul>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-600">Illustrative demo figure. Not a medically validated measurement.</p>
    </div>
  )
}

export default function Home() {
  const [showEmergency, setShowEmergency] = useState(false)
  return (
    <>
      <Hero />
      <section className="section">
        <Reveal><h2 className="text-3xl font-bold sm:text-4xl">Why SwasthElder?</h2></Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Reveal key={f.t} className="card card-hover">
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700"><f.icon className="h-7 w-7" /></span>
              <h3 className="text-xl font-bold">{f.t}</h3>
              <p className="mt-2 text-slate-700">{f.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="section">
          <Reveal><h2 className="text-3xl font-bold sm:text-4xl">How It Works</h2></Reveal>
          <ol className="relative mt-10 grid gap-8 md:grid-cols-4">
            <span className="absolute left-0 right-0 top-8 hidden h-1 bg-gradient-to-r from-teal-200 to-navy-100 md:block" aria-hidden />
            {steps.map((st, i) => (
              <Reveal as="li" key={st.t} className="relative text-center md:text-left" style={{ transitionDelay: `${i * 120}ms` }}>
                <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy-700 text-white shadow-lg md:mx-0"><st.icon className="h-8 w-8" /></span>
                <p className="mt-4 text-sm font-bold text-teal-700">Step {i + 1}</p>
                <h3 className="text-xl font-bold">{st.t}</h3>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <Reveal><h2 className="text-3xl font-bold sm:text-4xl">Dashboard Preview</h2></Reveal>
          <Link to="/schedule" className="btn-ghost btn-sm">Open today's schedule <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard icon={Users} label="Total Residents" value={s.residents} tone="bg-navy-50 text-navy-700" />
          <DashboardCard icon={Pill} label="Today's Medications" value={s.today} />
          <DashboardCard icon={Clock} label="Pending Doses" value={s.pending} tone="bg-amber-50 text-amber-700" />
          <DashboardCard icon={CheckCircle2} label="Completed Doses" value={s.completed} tone="bg-emerald-50 text-emerald-700" />
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <Adherence />
          <div className="card">
            <h3 className="text-xl font-bold">Upcoming Medication</h3>
            <ul className="mt-4 space-y-3">
              {[['6:00 PM', 'Suresh Rao', 'Medicine D'], ['9:00 PM', 'Ravi Kumar', 'Paracetamol 500 mg'], ['9:00 PM', 'Meena Sharma', 'Donepezil 5 mg']].map(([t, n, m]) => (
                <li key={n + m} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <span className="rounded-lg bg-navy-700 px-2 py-1 text-sm font-bold text-white">{t}</span>
                  <span><b>{n}</b><br /><span className="text-slate-600">{m}</span></span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold">Recent Activity</h3>
            <ul className="mt-4 space-y-3">
              {activity.slice(0, 4).map((a) => (
                <li key={a.id} className="border-l-4 border-teal-500 pl-3">
                  <p className="font-bold">{initialResidents.find((r) => r.id === a.residentId)?.name}</p>
                  <p className="text-slate-700">{a.text} <span className="text-slate-500">- {a.time}</span></p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="grid items-center gap-6 rounded-3xl bg-gradient-to-r from-rose-700 to-rose-600 p-8 text-white md:grid-cols-[1fr_auto] md:p-12">
          <div>
            <h2 className="flex items-center gap-3 text-3xl font-bold !text-white sm:text-4xl"><Siren className="h-10 w-10 shrink-0" /> When Every Minute Matters</h2>
            <p className="mt-3 max-w-2xl text-lg text-rose-50">Caregivers can quickly access resident medication information and emergency contacts, so the right details are ready for the doctor or ambulance crew.</p>
          </div>
          <button className="btn bg-white text-rose-700 hover:bg-rose-50" onClick={() => setShowEmergency(true)}>View Emergency Information</button>
        </Reveal>
      </section>

      <section className="section text-center">
        <Reveal>
          <h2 className="text-3xl font-bold sm:text-4xl">Make Medication Management Simpler.</h2>
          <Link to="/medication" className="btn-primary mt-6 text-lg">Get Started</Link>
        </Reveal>
      </section>

      {showEmergency && (
        <Modal title="Emergency Information" onClose={() => setShowEmergency(false)} wide>
          <p className="mb-4 rounded-xl bg-rose-50 p-3 font-bold text-rose-800">Sample data. In a real emergency, call your local emergency number (112 in India) first.</p>
          <ul className="space-y-3">
            {initialResidents.map((r) => (
              <li key={r.id} className="rounded-xl border border-slate-200 p-4">
                <p className="text-lg font-bold">{r.name} <span className="font-normal text-slate-600">- Room {r.room}, Blood group {r.blood}</span></p>
                <p><b>Allergies:</b> {r.allergies}</p>
                <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-rose-600" /> {r.contact}</p>
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </>
  )
}
