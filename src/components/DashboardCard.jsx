import CountUp from './CountUp.jsx'

export default function DashboardCard({ icon: Icon, label, value, tone = 'bg-teal-50 text-teal-700' }) {
  return (
    <div className="card card-hover flex items-center gap-4">
      <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${tone}`}><Icon className="h-7 w-7" aria-hidden /></span>
      <div>
        <p className="font-display text-3xl font-bold text-navy-900"><CountUp to={value} /></p>
        <p className="font-bold text-slate-600">{label}</p>
      </div>
    </div>
  )
}
