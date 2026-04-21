import { motion } from 'framer-motion'

const cards = [
  {
    icon: '🤖',
    title: 'AI + Frontend Combo',
    desc: 'Rare blend of ML engineering and polished UI — I build smart products that also look incredible.',
    color: 'var(--hot-pink)',
  },
  {
    icon: '🏗️',
    title: 'Real Project Experience',
    desc: '6+ production-level projects shipped across healthcare, safety, hiring, and AI domains.',
    color: 'var(--electric-blue)',
  },
  {
    icon: '🎤',
    title: 'Strong Communicator',
    desc: 'Public speaking and leadership skills ensure I\'m effective not just in code but in teams.',
    color: 'var(--yellow)',
  },
  {
    icon: '⚡',
    title: 'Fast Learner',
    desc: 'Picked up new stacks, frameworks, and paradigms rapidly across every project I\'ve built.',
    color: 'var(--hot-pink)',
  },
  {
    icon: '🧩',
    title: 'Product Mindset',
    desc: 'I think about users, not just code. Every line I write solves a real human problem.',
    color: 'var(--electric-blue)',
  },
  {
    icon: '🎨',
    title: 'Design-Aware Dev',
    desc: 'I care deeply about aesthetics, UX, and visual quality — building things that feel as good as they work.',
    color: 'var(--yellow)',
  },
]

export default function WhyHireMe() {
  return (
    <section id="why" className="reveal py-24 md:py-36 relative overflow-hidden" style={{ background: '#0d0d0d' }}>
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,31,142,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--hot-pink)' }}>
            ✦ 07 / Why Me
          </span>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,31,142,0.2)' }} />
        </div>

        <div className="text-center mb-16">
          <h2
            className="font-display mb-4"
            style={{ fontSize: 'clamp(52px, 8vw, 90px)', lineHeight: 0.9, letterSpacing: '-0.02em' }}
          >
            <span className="text-white block">WHY</span>
            <span className="gradient-text-pink-yellow block">HIRE ME?</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">
            Here's what makes me different from the rest of the applicant pool.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="rounded-2xl p-6 transition-all duration-300 cursor-default"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="text-3xl mb-4">{card.icon}</div>
              <h3 className="font-display text-2xl text-white mb-2">{card.title.toUpperCase()}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{card.desc}</p>
              <div
                className="mt-4 h-0.5 w-12 rounded-full"
                style={{ background: card.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
