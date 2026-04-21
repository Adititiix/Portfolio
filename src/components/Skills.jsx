import { useState } from 'react'
import { motion } from 'framer-motion'

const skillGroups = [
  { category: 'Frontend', icon: '🎨', color: 'var(--hot-pink)', bg: 'rgba(255,31,142,0.08)', border: 'rgba(255,31,142,0.3)', skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'] },
  { category: 'Backend', icon: '⚙️', color: 'var(--electric-blue)', bg: 'rgba(0,180,255,0.08)', border: 'rgba(0,180,255,0.3)', skills: ['Flask', 'Node.js', 'REST APIs', 'Firebase', 'MongoDB', 'PostgreSQL', 'MySQL'] },
  { category: 'AI / ML', icon: '🤖', color: 'var(--yellow)', bg: 'rgba(255,229,0,0.08)', border: 'rgba(255,229,0,0.3)', skills: ['Python', 'NLP', 'RAG', 'TensorFlow', 'PyTorch', 'Scikit-learn'] },
  { category: 'Cybersecurity', icon: '🔐', color: '#AAFF00', bg: 'rgba(170,255,0,0.07)', border: 'rgba(170,255,0,0.3)', skills: ['Secure Systems', 'Threat Awareness', 'Network Fundamentals'] },
  { category: 'Soft Skills', icon: '💬', color: 'var(--electric-blue)', bg: 'rgba(0,180,255,0.07)', border: 'rgba(0,180,255,0.25)', skills: ['Public Speaking', 'Teamwork', 'Leadership', 'Communication'] },
]

export default function Skills() {
  const [hovered, setHovered] = useState(null)

  return (
    <section id="skills" className="reveal py-24 md:py-36" style={{ background: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <span className="sec-label" style={{ color: 'var(--electric-blue)' }}>✦ 02 / Skills</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(0,180,255,0.4), transparent)' }} />
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 'clamp(60px,9vw,100px)', lineHeight: 0.88 }} className="mb-14">
          <span className="text-white block">TECH</span>
          <span className="grad-blue-pink block">STACK.</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => (
            <motion.div key={group.category}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              className="rounded-2xl p-6 relative overflow-hidden shine-hover"
              style={{
                background: hovered === i ? group.bg : 'rgba(255,255,255,0.02)',
                border: `1px solid ${hovered === i ? group.border : 'rgba(255,255,255,0.07)'}`,
                transform: hovered === i ? 'translateY(-4px)' : 'none',
                transition: 'all 0.3s ease',
                boxShadow: hovered === i ? `0 12px 40px ${group.color}15` : 'none',
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{ background: group.color, opacity: hovered === i ? 1 : 0.25 }} />
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{group.icon}</span>
                <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: group.color }}>{group.category}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map(skill => (
                  <span key={skill} className="text-xs px-3 py-1.5 rounded-full font-mono transition-all duration-200"
                    style={{
                      background: hovered === i ? group.bg : 'rgba(255,255,255,0.04)',
                      color: hovered === i ? group.color : 'rgba(255,255,255,0.5)',
                      border: `1px solid ${hovered === i ? group.border : 'rgba(255,255,255,0.07)'}`,
                    }}>{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
