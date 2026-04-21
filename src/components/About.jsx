import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="reveal py-24 md:py-36 relative overflow-hidden" style={{ background: '#0d0d0d' }}>
      <div className="absolute right-0 top-0 w-80 h-80 opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--electric-blue), transparent)', filter: 'blur(60px)' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="sec-label" style={{ color: 'var(--hot-pink)' }}>✦ 01 / About</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(255,31,142,0.4), transparent)' }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <h2 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 'clamp(60px,9vw,100px)', lineHeight: 0.88, letterSpacing: '-0.01em' }} className="mb-6">
              <span className="text-white block">ABOUT</span>
              <span className="grad-blue-pink block">ME.</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-5"
              style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              I'm a Computer Science student passionate about building products where{' '}
              <span style={{ color: 'var(--yellow)', fontWeight: 600 }}>design meets intelligence</span>. My work spans AI tools, healthcare systems, hiring platforms, emergency safety apps, and modern web experiences.
            </p>
            <p className="text-white/50 leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              I enjoy solving real-world problems through code, experimentation, and bold product thinking.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { num: '6+', label: 'Projects' },
                { num: '8.75', label: 'CGPA' },
                { num: '3+', label: 'Domains' },
              ].map((s) => (
                <div key={s.label} className="grad-border p-5 text-center shine-hover">
                  <div className="grad-pink-yellow" style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 44 }}>{s.num}</div>
                  <div className="font-mono text-xs text-white/35 tracking-widest uppercase mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Y2K card stack */}
          <div className="relative">
            {/* Shadow card */}
            <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-3xl pointer-events-none"
              style={{ background: 'rgba(255,31,142,0.15)', filter: 'blur(1px)' }} />

            <div className="relative rounded-3xl p-7 overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {/* Colorful top bar */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                style={{ background: 'linear-gradient(90deg, var(--hot-pink), var(--yellow), var(--electric-blue), var(--lime))' }} />

              <div className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color: 'var(--yellow)' }}>
                ✦ Current Focus
              </div>

              {[
                { icon: '🤖', text: 'AI/ML Product Development', color: 'var(--hot-pink)' },
                { icon: '🏗️', text: 'Full Stack Engineering', color: 'var(--electric-blue)' },
                { icon: '🔐', text: 'Cybersecurity Fundamentals', color: 'var(--yellow)' },
                { icon: '🎨', text: 'Creative Frontend Design', color: 'var(--lime)' },
                { icon: '📱', text: 'Mobile Safety Solutions', color: 'var(--hot-pink)' },
              ].map((item, i, arr) => (
                <div key={i} className="flex items-center gap-4 py-3"
                  style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-white/75 text-sm" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{item.text}</span>
                  <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }} />
                </div>
              ))}
            </div>

            {/* Floating sticker on card */}
            <motion.div className="absolute -top-4 -right-4"
              animate={{ rotate: [0, 8, -4, 8, 0] }} transition={{ duration: 4, repeat: Infinity }}>
              <div className="sticker" style={{ background: 'var(--hot-pink)', color: 'white', fontSize: 10 }}>
                🌟 Available Now
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
