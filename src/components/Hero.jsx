import { Link } from 'react-router-dom'
import { Bot, Compass } from 'lucide-react'

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden>
      <div className="floaty rounded-[2rem] bg-white p-5 shadow-2xl ring-1 ring-slate-200">
        <svg viewBox="0 0 400 300" className="w-full">
          <rect width="400" height="300" rx="20" fill="#effaf3" />
          <circle cx="90" cy="110" r="34" fill="#f2c9a5" /><path d="M45 110a45 40 0 0 1 90 0z" fill="#cbd5e1" />
          <rect x="52" y="148" width="76" height="90" rx="30" fill="#16407a" />
          <circle cx="250" cy="110" r="30" fill="#e0b18a" /><path d="M222 104a30 28 0 0 1 56 0z" fill="#0f2f5c" />
          <rect x="216" y="144" width="68" height="94" rx="28" fill="#0d9488" />
          <rect x="262" y="178" width="26" height="7" rx="3" fill="#e0b18a" transform="rotate(-25 262 178)" />
          <rect x="140" y="196" width="60" height="30" rx="15" fill="#fff" stroke="#16407a" strokeWidth="3" />
          <path d="M170 196v30" stroke="#16407a" strokeWidth="3" /><path d="M140 211a15 15 0 0 1 15-15h15v30h-15a15 15 0 0 1-15-15z" fill="#4cae7d" />
          <path d="M20 270h60l12-26 18 44 14-30 14 12h242" stroke="#0d9488" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(0 -10) scale(.9 1)" />
        </svg>
        <div className="mt-3 grid grid-cols-2 gap-3 text-sm font-bold">
          <div className="rounded-xl bg-teal-50 p-3 text-teal-800">Next dose: 9:00 PM</div>
          <div className="rounded-xl bg-navy-50 p-3 text-navy-800">Heart rate: 72 bpm</div>
        </div>
      </div>
      <span className="absolute -right-3 -top-3 flex h-14 w-14 items-center justify-center rounded-full bg-amber-400 text-2xl shadow-lg">
        <span className="ping2 absolute inset-0 rounded-full bg-amber-400" />🔔
      </span>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-mint-50 via-white to-navy-50">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Smarter Medication Management for Healthier Aging.</h1>
          <p className="mt-5 max-w-xl text-xl text-slate-700">Helping old-age homes manage medications, schedules, residents, and health information safely and efficiently.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/medication" className="btn-primary"><Compass className="h-5 w-5" /> Explore SwasthElder</Link>
            <Link to="/ai-assistant" className="btn-ghost"><Bot className="h-5 w-5" /> AI Health Assistant</Link>
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>
  )
}
