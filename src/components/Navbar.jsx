import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { HeartPulse, Menu, X, Bot } from 'lucide-react'
import NotificationPanel from './NotificationPanel.jsx'

export const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/medication', label: 'Medication' },
  { to: '/ai-assistant', label: 'AI Assistant' },
  { to: '/residents', label: 'Residents' },
  { to: '/contact', label: 'Contact' },
]

const linkCls = ({ isActive }) =>
  `rounded-lg px-3 py-2 font-bold transition ${isActive ? 'bg-navy-50 text-navy-800 underline decoration-teal-500 decoration-4 underline-offset-8' : 'text-slate-700 hover:bg-slate-100'}`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2 sm:px-6" aria-label="Main">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-600 text-white"><HeartPulse className="h-6 w-6" /></span>
          <span className="font-display text-2xl font-bold text-navy-800">Swasth<span className="text-teal-600">Elder</span></span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkCls}>{l.label}</NavLink>)}
        </div>
        <div className="flex items-center gap-1">
          <NotificationPanel />
          <Link to="/ai-assistant" className="btn-teal hidden sm:inline-flex"><Bot className="h-5 w-5" /> AI Health Assistant</Link>
          <button className="rounded-lg p-3 lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="page-enter border-t border-slate-200 bg-white px-4 pb-4 lg:hidden">
          <div className="flex flex-col gap-1 pt-2">
            {links.map((l) => <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkCls} onClick={() => setOpen(false)}>{l.label}</NavLink>)}
            <Link to="/ai-assistant" onClick={() => setOpen(false)} className="btn-teal mt-2"><Bot className="h-5 w-5" /> AI Health Assistant</Link>
          </div>
        </div>
      )}
    </header>
  )
}
