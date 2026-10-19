import { useState } from 'react'
import { Mail, Phone, MapPin, Send, ChevronDown } from 'lucide-react'
import { useToast } from '../components/Toast.jsx'
import { faqs } from '../data/dummyData.js'

const blank = { name: '', email: '', phone: '', subject: '', message: '' }

export default function Contact() {
  const toast = useToast()
  const [f, setF] = useState(blank)
  const [open, setOpen] = useState(0)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    if (!f.name.trim() || !f.email.trim() || !f.subject.trim() || !f.message.trim()) { toast('Please complete all required fields.', 'error'); return }
    if (!/^\S+@\S+\.\S+$/.test(f.email)) { toast('Please enter a valid email address.', 'error'); return }
    toast('Message sent. This is a prototype, so nothing was actually delivered.')
    setF(blank)
  }
  const info = [
    [Mail, 'Email', 'support@swasthelder.example'],
    [Phone, 'Phone', '+91 XXXXX XXXXX'],
    [MapPin, 'Location', 'Karnataka, India'],
  ]
  const field = (label, k, type = 'text', req = true) => (
    <div><label className="label" htmlFor={k}>{label}{req && <span className="text-rose-700"> *</span>}</label><input id={k} type={type} className="input" value={f[k]} onChange={set(k)} /></div>
  )

  return (
    <div className="section">
      <h1 className="text-4xl font-bold sm:text-5xl">We're Here to Help.</h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={submit} noValidate className="card space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">{field('Name', 'name')}{field('Email', 'email', 'email')}</div>
          <div className="grid gap-4 sm:grid-cols-2">{field('Phone', 'phone', 'tel', false)}{field('Subject', 'subject')}</div>
          <div><label className="label" htmlFor="message">Message <span className="text-rose-700">*</span></label><textarea id="message" rows="5" className="input" value={f.message} onChange={set('message')} /></div>
          <button className="btn-primary" type="submit"><Send className="h-5 w-5" /> Send Message</button>
        </form>
        <div className="space-y-4">
          {info.map(([Icon, t, v]) => (
            <div key={t} className="card card-hover flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700"><Icon className="h-7 w-7" /></span>
              <div><p className="font-bold text-slate-600">{t}</p><p className="break-all text-lg font-bold text-navy-900">{v}</p></div>
            </div>
          ))}
          <p className="text-sm text-slate-600">Sample details for a college prototype. Not real company contact information.</p>
        </div>
      </div>

      <h2 className="mt-16 text-3xl font-bold">Frequently Asked Questions</h2>
      <div className="mt-6 space-y-3">
        {faqs.map((q, i) => (
          <div key={q.q} className="card !p-0">
            <button className="flex w-full items-center justify-between gap-4 p-5 text-left text-lg font-bold" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              {q.q}<ChevronDown className={`h-6 w-6 shrink-0 transition ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && <p className="page-enter px-5 pb-5 text-slate-700">{q.a}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
