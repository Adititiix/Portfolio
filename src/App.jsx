import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Achievements from './components/Achievements'
import WhyHireMe from './components/WhyHireMe'
import Contact from './components/Contact'
import Footer from './components/Footer'
import EasterEgg from './components/EasterEgg'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const total = el.scrollHeight - el.clientHeight
      setScrollProgress(total > 0 ? (el.scrollTop / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll reveal
  useEffect(() => {
    if (loading) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.08 }
    )
    const els = document.querySelectorAll('.reveal')
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [loading])

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
      {!loading && (
        <>
          <Cursor />
          <div id="scroll-progress" style={{ width: `${scrollProgress}%` }} />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <Achievements />
            <WhyHireMe />
            <Contact />
          </main>
          <Footer />
          <EasterEgg />
        </>
      )}
    </>
  )
}
