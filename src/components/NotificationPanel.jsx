import { useEffect, useRef, useState } from 'react'
import { Bell, CheckCheck } from 'lucide-react'
import useLocalStorage from '../hooks/useLocalStorage.js'
import { initialNotifications } from '../data/dummyData.js'

export default function NotificationPanel() {
  const [list, setList] = useLocalStorage('se_notifications', initialNotifications)
  const [open, setOpen] = useState(false)
  const box = useRef(null)
  const unread = list.filter((n) => !n.read).length

  useEffect(() => {
    const close = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false) }
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc) }
  }, [])

  return (
    <div className="relative" ref={box}>
      <button onClick={() => setOpen(!open)} aria-expanded={open} aria-label={`Notifications, ${unread} unread`} className="relative rounded-full p-3 text-navy-800 hover:bg-navy-50">
        <Bell className="h-6 w-6" />
        {unread > 0 && <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1 text-xs font-bold text-white">{unread}</span>}
      </button>
      {open && (
        <div className="toast-in absolute right-0 z-50 mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl">
          <div className="flex items-center justify-between px-2 pb-2">
            <h2 className="text-lg font-bold">Notifications</h2>
            <button className="flex items-center gap-1 text-sm font-bold text-teal-700 hover:underline" onClick={() => setList(list.map((n) => ({ ...n, read: true })))}>
              <CheckCheck className="h-4 w-4" /> Mark all read
            </button>
          </div>
          <ul className="max-h-80 space-y-1 overflow-y-auto">
            {list.map((n) => (
              <li key={n.id} className={`rounded-xl p-3 ${n.read ? 'bg-white' : 'bg-teal-50'}`}>
                <p className="font-bold text-slate-800">🔔 {n.text}</p>
                <p className="text-sm text-slate-600">{n.time}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
