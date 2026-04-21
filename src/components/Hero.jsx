import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const MARQUEE = 'AI • FRONTEND • SECURITY • BUILDING COOL THINGS • FULL STACK • '

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%✦★'

function useScramble(text, delay = 600) {
  const [display, setDisplay] = useState(text)
  useEffect(() => {
    const t = setTimeout(() => {
      let i = 0
      const iv = setInterval(() => {
        setDisplay(text.split('').map((c, idx) => {
          if (c === ' ') return ' '
          if (idx < i) return text[idx]
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        }).join(''))
        i += 0.5
        if (i >= text.length) { clearInterval(iv); setDisplay(text) }
      }, 35)
    }, delay)
    return () => clearTimeout(t)
  }, [text, delay])
  return display
}

const FloatingEl = ({ children, style, delay = 0 }) => (
  <motion.div
    className="absolute pointer-events-none select-none"
    style={style}
    animate={{ y: [0, -14, 0], rotate: [0, 5, -3, 0] }}
    transition={{ duration: 3.5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  >
    {children}
  </motion.div>
)

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const scrambled = useScramble('CS STUDENT', 700)
  const scrambled2 = useScramble('AI BUILDER', 1000)
  const scrambled3 = useScramble('FRONTEND CREATOR', 1300)

  useEffect(() => {
    const onMove = (e) => setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 24,
      y: (e.clientY / window.innerHeight - 0.5) * 16,
    })
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden noise" style={{ background: '#080808' }}>

      {/* Big background blobs */}
      <div className="absolute blob-morph pointer-events-none"
        style={{ width: 700, height: 700, background: 'radial-gradient(circle, rgba(255,31,142,0.18) 0%, transparent 70%)', filter: 'blur(80px)', top: '-15%', right: '-15%',
          transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`, transition: 'transform 0.4s ease' }} />
      <div className="absolute blob-morph pointer-events-none"
        style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(0,180,255,0.12) 0%, transparent 70%)', filter: 'blur(60px)', bottom: '0', left: '-10%',
          animationDelay: '-4s', transform: `translate(${-mousePos.x * 0.3}px, ${-mousePos.y * 0.3}px)`, transition: 'transform 0.4s ease' }} />
      <div className="absolute pointer-events-none"
        style={{ width: 300, height: 300, background: 'radial-gradient(circle, rgba(255,229,0,0.08) 0%, transparent 70%)', filter: 'blur(50px)', top: '40%', left: '35%' }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* ── Floating Decorative Elements ── */}
      <FloatingEl style={{ top: '12%', left: '4%' }} delay={0}>
        <div className="sticker" style={{ background: 'var(--yellow)', color: '#000', transform: 'rotate(-10deg)', fontSize: 11 }}>
          ⚡ Open to Hire
        </div>
      </FloatingEl>

      <FloatingEl style={{ top: '8%', right: '5%' }} delay={0.5}>
        <div className="text-5xl star-spin" style={{ color: 'var(--hot-pink)' }}>✦</div>
      </FloatingEl>

      <FloatingEl style={{ top: '22%', right: '3%' }} delay={1}>
        <div className="sticker" style={{ background: 'var(--electric-blue)', color: '#000', transform: 'rotate(6deg)', fontSize: 10 }}>
          🤖 AI Builder
        </div>
      </FloatingEl>

      <FloatingEl style={{ bottom: '35%', left: '2%' }} delay={1.2}>
        <div className="sticker" style={{ background: 'var(--hot-pink)', color: 'white', transform: 'rotate(-5deg)', fontSize: 10 }}>
          🎓 SRM • 8.75 CGPA
        </div>
      </FloatingEl>

      <FloatingEl style={{ bottom: '20%', right: '4%' }} delay={0.8}>
        <div className="sticker" style={{ background: '#AAFF00', color: '#000', transform: 'rotate(8deg)', fontSize: 10 }}>
          🚀 6+ Projects
        </div>
      </FloatingEl>

      {/* Stars scattered */}
      {[
        { top: '18%', left: '8%', color: 'var(--yellow)', size: 22, delay: 0.2 },
        { top: '60%', left: '3%', color: 'var(--electric-blue)', size: 18, delay: 0.9 },
        { top: '30%', right: '8%', color: 'var(--lime)', size: 16, delay: 1.5 },
        { bottom: '15%', left: '8%', color: 'var(--hot-pink)', size: 24, delay: 0.6 },
        { top: '75%', right: '7%', color: 'var(--yellow)', size: 20, delay: 1.1 },
      ].map((s, i) => (
        <FloatingEl key={i} style={{ top: s.top, left: s.left, right: s.right, bottom: s.bottom }} delay={s.delay}>
          <div style={{ fontSize: s.size, color: s.color, opacity: 0.7 }}>★</div>
        </FloatingEl>
      ))}

      {/* Chrome shapes */}
      <div className="absolute spin-slow pointer-events-none hidden md:block"
        style={{ width: 120, height: 120, border: '1.5px solid rgba(255,31,142,0.3)', borderRadius: '30%', top: '15%', left: '14%' }} />
      <div className="absolute spin-slow-rev pointer-events-none hidden md:block"
        style={{ width: 80, height: 80, border: '1px solid rgba(255,229,0,0.25)', borderRadius: '40%', bottom: '25%', right: '12%' }} />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 min-h-[85vh]">

          {/* LEFT — Text */}
          <div className="flex-1 max-w-xl order-2 lg:order-1">

            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <span className="chrome-badge" style={{ color: 'var(--hot-pink)' }}>✦ Portfolio 2025</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 mb-1"
              style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 'clamp(80px,13vw,150px)', lineHeight: 0.85, letterSpacing: '-0.01em' }}
            >
              <span className="text-white block">ADITI</span>
              <span className="grad-pink-yellow block">S.</span>
            </motion.div>

            {/* Role lines */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="flex flex-col gap-1 mt-6">
              {[
                { text: scrambled, color: 'var(--electric-blue)', rotate: '-1deg' },
                { text: scrambled2, color: 'var(--hot-pink)', rotate: '0.5deg' },
                { text: scrambled3, color: 'var(--yellow)', rotate: '-0.5deg' },
              ].map(({ text, color, rotate }, i) => (
                <div key={i} className="inline-block"
                  style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(14px,2.2vw,20px)', fontWeight: 700, color, transform: `rotate(${rotate})`, letterSpacing: '0.05em' }}>
                  {text}
                </div>
              ))}
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              className="mt-5 text-white/55 leading-relaxed max-w-md"
              style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15 }}>
              Building AI-powered products, full-stack experiences, and future-ready digital solutions.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
              className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="jelly-btn jelly-pink">View Projects →</a>
              <a href="#contact" className="jelly-btn jelly-yellow">Contact Me ✦</a>
              <a href="/ADITI_S_FlowCV_Resume_2026-04-01.pdf" target="_blank"rel="noopener noreferrer"className="jelly-btn jelly-outline" >📄 Resume
</a>
            </motion.div>

            {/* Social links */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
              className="mt-6 flex items-center gap-5">
              <a href="https://github.com/Adititiix" target="_blank" rel="noopener noreferrer"
                className="font-mono text-xs text-white/30 hover:text-white tracking-widest uppercase transition-colors">
                GitHub ↗
              </a>
              <a href="https://www.linkedin.com/in/aditi-s-b810ab264/" target="_blank" rel="noopener noreferrer"
                className="font-mono text-xs text-white/30 hover:text-white tracking-widest uppercase transition-colors">
                LinkedIn ↗
              </a>
            </motion.div>
          </div>

          {/* RIGHT — Portrait */}
          <motion.div
            className="relative flex-shrink-0 order-1 lg:order-2 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: 'clamp(260px, 40vw, 440px)', height: 'clamp(320px, 52vw, 560px)' }}
          >
            {/* Pulse rings behind image */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div style={{ position: 'absolute', width: '80%', height: '80%', borderRadius: '50%', border: '1.5px solid rgba(255,31,142,0.3)', animation: 'pulseRing 2.5s ease-out infinite' }} />
              <div style={{ position: 'absolute', width: '80%', height: '80%', borderRadius: '50%', border: '1.5px solid rgba(255,229,0,0.2)', animation: 'pulseRing 2.5s ease-out infinite', animationDelay: '0.8s' }} />
            </div>

            {/* Spinning rings */}
            <div className="absolute spin-slow pointer-events-none"
              style={{ width: '95%', height: '95%', border: '1.5px dashed rgba(255,31,142,0.25)', borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
            <div className="absolute spin-slow-rev pointer-events-none"
              style={{ width: '108%', height: '108%', border: '1px solid rgba(255,229,0,0.12)', borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

            {/* Background blob behind photo */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(255,31,142,0.15) 0%, transparent 70%)', filter: 'blur(20px)' }} />

            {/* THE PHOTO — free-flow, no background box */}
            <motion.img
              src="/aditi.jpg"
              alt="Aditi S"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 10%',
                borderRadius: '50% 50% 45% 45% / 55% 55% 45% 45%',
                filter: 'contrast(1.06) saturate(1.08)',
                position: 'relative',
                zIndex: 2,
              }}
            />

            {/* Overlay gradient at bottom (soft fade) */}
            <div className="absolute bottom-0 left-0 right-0 h-1/4 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.6), transparent)', borderRadius: '0 0 45% 45% / 0 0 45% 45%', zIndex: 3 }} />

            {/* Floating micro-stickers on image */}
            <motion.div className="absolute" style={{ top: '5%', right: '-5%', zIndex: 5 }}
              animate={{ rotate: [0, 10, -5, 10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
              <div className="sticker" style={{ background: 'var(--yellow)', color: '#000', fontSize: 10 }}>✨ Builder</div>
            </motion.div>
            <motion.div className="absolute" style={{ bottom: '12%', left: '-8%', zIndex: 5 }}
              animate={{ rotate: [0, -8, 5, -8, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}>
              <div className="sticker" style={{ background: 'var(--hot-pink)', color: 'white', fontSize: 10 }}>🏆 Hackathon Win</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="w-full overflow-hidden mt-0"
        style={{ borderTop: '1px solid rgba(255,31,142,0.2)', background: 'rgba(255,31,142,0.04)' }}>
        <div className="py-3 marquee-inner">
          {[...Array(6)].map((_, i) => (
            <span key={i}
              style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 22, marginRight: 32, color: i % 2 === 0 ? 'var(--hot-pink)' : 'var(--yellow)', letterSpacing: '0.05em' }}>
              {MARQUEE}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
