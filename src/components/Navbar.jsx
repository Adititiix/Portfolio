import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}
      style={{
        background: scrolled ? 'rgba(8,8,8,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,31,142,0.12)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 28 }} className="grad-pink-yellow">
          ADITI S
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link.label} href={link.href}
              className="relative group"
              style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.55)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'white'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                style={{ background: 'var(--hot-pink)' }} />
            </a>
          ))}
          <a href="mailto:aditii.s5379@gmail.com" className="jelly-btn jelly-pink" style={{ padding: '10px 22px', fontSize: 11 }}>
            Hire Me ✦
          </a>
        </nav>

        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(8,8,8,0.98)', borderTop: '1px solid rgba(255,31,142,0.15)' }}
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((link) => (
                <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
                  style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.6)' }}>
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
