import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section id="contact" className="reveal py-24 md:py-36 relative overflow-hidden" style={{ background: '#0A0A0A' }}>
      <div className="absolute blob-morph pointer-events-none"
        style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,31,142,0.15), transparent)', filter: 'blur(80px)', top: '5%', right: '-10%' }} />
      <div className="absolute blob-morph pointer-events-none"
        style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(0,180,255,0.1), transparent)', filter: 'blur(60px)', bottom: '5%', left: '-8%', animationDelay: '-5s' }} />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,31,142,0.3))' }} />
          <span className="sec-label" style={{ color: 'var(--hot-pink)' }}>✦ 08 / Contact</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(255,31,142,0.3), transparent)' }} />
        </div>

        <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 'clamp(56px,11vw,120px)', lineHeight: 0.85 }} className="mb-8">
          <span className="text-white block">LET'S BUILD</span>
          <span className="grad-pink-yellow block">SOMETHING</span>
          <span className="text-white block">POWERFUL.</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="text-white/50 text-lg mb-12 max-w-xl mx-auto" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          Open to internships, collaborations, and exciting new challenges.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-8">
          <a href="https://www.linkedin.com/in/aditi-s-b810ab264/" target="_blank" rel="noopener noreferrer"
            className="jelly-btn jelly-blue">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn ↗
          </a>
          <a href="https://github.com/Adititiix" target="_blank" rel="noopener noreferrer"
            className="jelly-btn" style={{ background: 'linear-gradient(135deg,#2a2a2a,#1a1a1a)', color: 'white', boxShadow: '0 6px 20px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub ↗
          </a>
          <a href="mailto:aditii.s5379@gmail.com" className="jelly-btn jelly-pink">
            ✉ Email Me
          </a>
        </motion.div>

        <p className="font-mono text-xs text-white/20 tracking-widest">aditii.s5379@gmail.com</p>
      </div>
    </section>
  )
}
