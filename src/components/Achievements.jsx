import { motion } from 'framer-motion'

const achievements = [
  {
    icon: '🏆',
    title: 'Special Mention – Ultron 8.0',
    description: 'Recognized for building Traan, a women safety emergency app, at the prestigious Ultron 8.0 hackathon.',
    color: 'var(--yellow)',
    bg: 'rgba(255,229,0,0.08)',
    border: 'rgba(255,229,0,0.25)',
  },
  {
    icon: '🛡️',
    title: 'Built Traan – Women Safety',
    description: 'Created a real-world safety app addressing the critical need for accessible emergency tech for women.',
    color: 'var(--hot-pink)',
    bg: 'rgba(255,31,142,0.08)',
    border: 'rgba(255,31,142,0.25)',
  },
  {
    icon: '🚀',
    title: 'Multidisciplinary Builder Profile',
    description: 'Built across AI/ML, Full Stack, Cybersecurity, and Mobile—demonstrating rare breadth and depth.',
    color: 'var(--electric-blue)',
    bg: 'rgba(0,180,255,0.08)',
    border: 'rgba(0,180,255,0.25)',
  },
]

export default function Achievements() {
  return (
    <section id="achievements" className="reveal py-24 md:py-36" style={{ background: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--yellow)' }}>
            ✦ 06 / Achievements
          </span>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,229,0,0.2)' }} />
        </div>

        <h2
          className="font-display mb-16"
          style={{ fontSize: 'clamp(52px, 8vw, 90px)', lineHeight: 0.9, letterSpacing: '-0.02em' }}
        >
          <span className="text-white block">WINS &</span>
          <span className="gradient-text-pink-yellow block">MILESTONES.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group rounded-2xl p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-2"
              style={{
                background: a.bg,
                border: `1px solid ${a.border}`,
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{ background: a.color }}
              />
              <div className="text-4xl mb-4">{a.icon}</div>
              <h3 className="font-display text-2xl text-white mb-3 leading-tight">{a.title.toUpperCase()}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{a.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
