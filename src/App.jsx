import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ToastProvider } from './components/Toast.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Medication from './pages/Medication.jsx'
import AIHealthAssistant from './pages/AIHealthAssistant.jsx'
import Residents from './pages/Residents.jsx'
import Schedule from './pages/Schedule.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <ToastProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:p-3">Skip to content</a>
      <Navbar />
      <main id="main" key={pathname} className="page-enter min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/medication" element={<Medication />} />
          <Route path="/ai-assistant" element={<AIHealthAssistant />} />
          <Route path="/residents" element={<Residents />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </ToastProvider>
  )
}
