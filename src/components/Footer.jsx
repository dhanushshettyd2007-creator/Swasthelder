import { Link } from 'react-router-dom'
import { HeartPulse, ShieldAlert } from 'lucide-react'
import { links } from './Navbar.jsx'

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2">
        <div>
          <p className="flex items-center gap-2 font-display text-2xl font-bold text-white"><HeartPulse className="h-7 w-7 text-teal-400" /> SwasthElder</p>
          <p className="mt-3 max-w-sm">Smarter Medication Management for Healthier Aging.</p>
          <nav aria-label="Footer" className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {links.map((l) => <Link key={l.to} to={l.to} className="font-bold underline-offset-4 hover:text-teal-300 hover:underline">{l.label.replace('Us', 'Us')}</Link>)}
          </nav>
        </div>
        <div className="rounded-2xl bg-white/10 p-5">
          <h2 className="flex items-center gap-2 text-lg font-bold text-white"><ShieldAlert className="h-5 w-5 text-amber-300" /> Medical Disclaimer</h2>
          <p className="mt-2 text-sm leading-relaxed">SwasthElder is a college prototype with dummy data. It provides general information only and is not a substitute for a qualified doctor, pharmacist or emergency services. Never give medication without a doctor's prescription or an approved care plan.</p>
        </div>
      </div>
      <p className="border-t border-white/10 py-5 text-center text-sm">© 2026 SwasthElder. All rights reserved.</p>
    </footer>
  )
}
