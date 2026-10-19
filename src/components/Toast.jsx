import { createContext, useCallback, useContext, useState } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

const ToastCtx = createContext(() => {})
export const useToast = () => useContext(ToastCtx)

const styles = {
  success: ['bg-emerald-700', CheckCircle2],
  error: ['bg-rose-700', AlertCircle],
  info: ['bg-navy-700', Info],
}

export function ToastProvider({ children }) {
  const [items, setItems] = useState([])
  const remove = (id) => setItems((l) => l.filter((t) => t.id !== id))
  const toast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random()
    setItems((l) => [...l, { id, message, type }])
    setTimeout(() => remove(id), 4000)
  }, [])
  return (
    <ToastCtx.Provider value={toast}>
      {children}
      <div className="fixed bottom-4 right-4 z-[90] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3" aria-live="polite">
        {items.map((t) => {
          const [bg, Icon] = styles[t.type]
          return (
            <div key={t.id} role={t.type === 'error' ? 'alert' : 'status'} className={`toast-in flex items-start gap-3 rounded-xl ${bg} p-4 text-white shadow-xl`}>
              <Icon className="mt-0.5 h-6 w-6 shrink-0" aria-hidden />
              <p className="flex-1 font-bold">{t.message}</p>
              <button onClick={() => remove(t.id)} aria-label="Dismiss message"><X className="h-5 w-5" /></button>
            </div>
          )
        })}
      </div>
    </ToastCtx.Provider>
  )
}
