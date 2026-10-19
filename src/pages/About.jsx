import { Target, Eye, PillBottle, CalendarX, FolderOpen, Users, Database, SearchX } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'

const problems = [
  { icon: PillBottle, t: 'Missed medication doses' },
  { icon: CalendarX, t: 'Incorrect medication schedules' },
  { icon: FolderOpen, t: 'Difficulty maintaining records' },
  { icon: Users, t: 'Caregiver workload' },
  { icon: Database, t: 'Lack of centralized information' },
  { icon: SearchX, t: 'Medication tracking difficulties' },
]
const stats = [['24/7', 'Medication Information'], ['100%', 'Centralized Records'], ['Smart', 'Medication Reminders']]

export default function About() {
  return (
    <>
      <section className="bg-gradient-to-br from-mint-50 to-navy-50">
        <div className="section">
          <h1 className="max-w-3xl text-4xl font-bold sm:text-5xl">Technology With Care at Heart.</h1>
          <p className="mt-5 max-w-2xl text-xl text-slate-700">SwasthElder is designed to help old-age homes organize medication management and improve caregiver efficiency.</p>
        </div>
      </section>
      <section className="section grid gap-6 md:grid-cols-2">
        <Reveal className="card border-l-8 border-l-teal-500">
          <Target className="h-9 w-9 text-teal-700" /><h2 className="mt-3 text-2xl font-bold">Our Mission</h2>
          <p className="mt-2 text-lg">To make medication management safer, simpler, and more organized for elderly residents and caregivers.</p>
        </Reveal>
        <Reveal className="card border-l-8 border-l-navy-600">
          <Eye className="h-9 w-9 text-navy-700" /><h2 className="mt-3 text-2xl font-bold">Our Vision</h2>
          <p className="mt-2 text-lg">A future where every elderly resident receives the right medication information at the right time, with caregivers supported by intelligent technology.</p>
        </Reveal>
      </section>
      <section className="section !pt-0">
        <Reveal><h2 className="text-3xl font-bold">Problems We Address</h2></Reveal>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p) => (
            <Reveal key={p.t} className="card card-hover flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-700"><p.icon className="h-7 w-7" /></span>
              <h3 className="font-sans text-lg font-bold">{p.t}</h3>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-navy-800">
        <div className="section">
          <h2 className="text-3xl font-bold !text-white">Why SwasthElder?</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {stats.map(([v, l]) => (
              <Reveal key={l} className="rounded-2xl bg-white/10 p-6 text-center text-white">
                <p className="font-display text-5xl font-bold text-teal-300">{v}</p>
                <p className="mt-2 text-lg font-bold">{l}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-300">Prototype goals, not clinical claims. SwasthElder supports caregivers and does not replace medical judgement.</p>
        </div>
      </section>
    </>
  )
}
