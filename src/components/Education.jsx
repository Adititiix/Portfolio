import { motion } from 'framer-motion'

export default function Education() {
  return (
    <section id="education" className="reveal py-24 md:py-36" style={{ background: '#0d0d0d' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--electric-blue)' }}>
            ✦ 05 / Education
          </span>
          <div className="flex-1 h-px" style={{ background: 'rgba(0,180,255,0.2)' }} />
        </div>

        <h2
          className="font-display mb-16"
          style={{ fontSize: 'clamp(52px, 8vw, 90px)', lineHeight: 0.9, letterSpacing: '-0.02em' }}
        >
          <span className="text-white block">WHERE I</span>
          <span className="gradient-text-blue-pink block">LEARNED.</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden"
          style={{ background: 'rgba(0,180,255,0.04)', border: '1px solid rgba(0,180,255,0.2)' }}
        >
          {/* Top accent */}
          <div
            className="h-1"
            style={{ background: 'linear-gradient(90deg, var(--electric-blue), var(--hot-pink), var(--yellow))' }}
          />

          <div className="p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-6xl mb-5">🎓</div>
              <h3 className="font-display text-4xl md:text-5xl text-white mb-2">
                SRM INSTITUTE
              </h3>
              <p className="font-mono text-sm tracking-wider" style={{ color: 'var(--electric-blue)' }}>
                of Science and Technology
              </p>
              <p className="text-white/60 mt-4 text-base">
                B.Tech Computer Science Engineering
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {/* CGPA highlight */}
              <div
                className="rounded-2xl p-6 text-center"
                style={{ background: 'rgba(255,229,0,0.06)', border: '1px solid rgba(255,229,0,0.2)' }}
              >
                <div className="font-display text-7xl gradient-text-pink-yellow">8.75</div>
                <div className="font-mono text-xs tracking-widest uppercase mt-2" style={{ color: 'rgba(255,229,0,0.6)' }}>
                  CGPA
                </div>
              </div>

              {/* Details */}
              {[
                { label: 'Degree', value: 'B.Tech CSE' },
                { label: 'Status', value: 'Undergraduate (Active)' },
                { label: 'Specialization', value: 'AI / Full Stack' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center py-3"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <span className="font-mono text-xs tracking-widest uppercase text-white/40">{item.label}</span>
                  <span className="text-white/80 text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
