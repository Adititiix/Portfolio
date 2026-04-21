import { motion } from 'framer-motion'

const experiences = [
  {
    role: 'Full Stack Developer Intern',
    company: 'Briddlee',
    period: '2024',
    type: 'Internship',
    color: 'var(--hot-pink)',
    icon: '💼',
    highlights: [
      'Built responsive web applications using React and modern JS',
      'Improved website performance through code optimization',
      'Created reusable UI component libraries',
      'Collaborated in an agile team environment',
    ],
  },
  {
    role: 'Society Member',
    company: 'Institution of Engineers India',
    period: '2023 – Present',
    type: 'Membership',
    color: 'var(--electric-blue)',
    icon: '🏛️',
    highlights: [
      'Active member of a premier engineering institution',
      'Engaged with technical workshops and events',
      'Networked with industry professionals',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="reveal py-24 md:py-36" style={{ background: '#0A0A0A' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--hot-pink)' }}>
            ✦ 04 / Experience
          </span>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,31,142,0.2)' }} />
        </div>

        <h2
          className="font-display mb-16"
          style={{ fontSize: 'clamp(52px, 8vw, 90px)', lineHeight: 0.9, letterSpacing: '-0.02em' }}
        >
          <span className="text-white block">WORK</span>
          <span className="gradient-text-pink-yellow block">HISTORY.</span>
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(180deg, var(--hot-pink), var(--electric-blue), transparent)' }}
          />

          <div className="flex flex-col gap-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className="md:ml-16 relative"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-[52px] top-6 w-4 h-4 rounded-full border-2 hidden md:block"
                  style={{ background: 'var(--black)', borderColor: exp.color }}
                />

                <div
                  className="rounded-2xl p-7 relative overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid rgba(255,255,255,0.07)` }}
                >
                  {/* Left accent */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                    style={{ background: exp.color }}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5 pl-3">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xl">{exp.icon}</span>
                        <h3 className="font-display text-2xl text-white">{exp.role.toUpperCase()}</h3>
                      </div>
                      <p className="font-mono text-base" style={{ color: exp.color }}>
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
                      <span
                        className="font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          color: exp.color,
                          border: `1px solid ${exp.color}40`,
                        }}
                      >
                        {exp.type}
                      </span>
                      <span className="font-mono text-xs text-white/40">{exp.period}</span>
                    </div>
                  </div>

                  <ul className="pl-3 flex flex-col gap-2">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-3 text-white/60 text-sm">
                        <span style={{ color: exp.color, marginTop: 2 }}>▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
