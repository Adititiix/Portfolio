import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: 'PulseStream',
    category: 'Live Project',
    emoji: '🎵',
    color: 'var(--hot-pink)',
    bg: 'rgba(255,31,142,0.1)',
    border: 'rgba(255,31,142,0.4)',
    stack: ['React', 'Node.js', 'WebSocket', 'Vercel'],
    summary: 'A live streaming music platform with real-time audio, user rooms, and collaborative listening.',
    details: 'PulseStream is a fully deployed real-time music streaming platform built with React and WebSocket technology. Features include live listening rooms, real-time user presence, collaborative playlists, and a clean audio player UI. Deployed and live on Vercel.',
    link: 'https://pulsestream-6wfa.vercel.app/',
    featured: true,
  },
  {
    id: 2,
    title: 'Resume Gap Analyser',
    category: 'AI / ML',
    emoji: '📊',
    color: 'var(--electric-blue)',
    bg: 'rgba(0,180,255,0.08)',
    border: 'rgba(0,180,255,0.35)',
    stack: ['Python', 'NLP', 'Flask', 'React'],
    summary: 'ML + NLP system that compares resumes with job descriptions and identifies skill gaps.',
    details: 'Intelligent resume analysis using TF-IDF and semantic similarity. Parses resumes, extracts skills and experience, then cross-references job descriptions to surface actionable skill gaps and recommendations.',
    link: null,
  },
  {
    id: 3,
    title: 'NUMA – AI Mental Health',
    category: 'AI Chatbot',
    emoji: '🧠',
    color: 'var(--yellow)',
    bg: 'rgba(255,229,0,0.07)',
    border: 'rgba(255,229,0,0.35)',
    stack: ['Python', 'RAG', 'NLP', 'React'],
    summary: 'Context-aware empathetic AI chatbot for supportive mental health conversations.',
    details: 'NUMA is a context-aware mental wellness assistant using RAG architecture. Maintains conversation history for empathetic, relevant responses with trauma-informed design principles.',
    link: null,
  },
  {
    id: 4,
    title: 'Traan – Safety App',
    category: 'Mobile / Safety',
    emoji: '🛡️',
    color: '#AAFF00',
    bg: 'rgba(170,255,0,0.07)',
    border: 'rgba(170,255,0,0.35)',
    stack: ['React Native', 'Firebase', 'Maps API', 'Node.js'],
    summary: 'SOS alerts, siren trigger, route safety mapping for women\'s emergency safety.',
    details: 'One-tap SOS, loud siren activation, real-time location sharing with trusted contacts, and AI-assisted route safety scoring. Won Special Mention at Ultron 8.0 Hackathon.',
    link: null,
  },
  {
    id: 5,
    title: 'CareHaven – Healthcare',
    category: 'Full Stack',
    emoji: '🏥',
    color: 'var(--hot-pink)',
    bg: 'rgba(255,31,142,0.07)',
    border: 'rgba(255,31,142,0.3)',
    stack: ['React', 'Flask', 'PostgreSQL', 'Firebase'],
    summary: 'Doctor booking, medication reminders, multilingual chatbot, and health tracking.',
    details: 'Comprehensive healthcare platform enabling patients to book consultations, set smart medication reminders, and access a multilingual chatbot for health queries. Built with accessibility in mind.',
    link: null,
  },
  {
    id: 6,
    title: 'ClarifAI – Requirements',
    category: 'NLP Tool',
    emoji: '🔍',
    color: 'var(--electric-blue)',
    bg: 'rgba(0,180,255,0.07)',
    border: 'rgba(0,180,255,0.3)',
    stack: ['Python', 'NLP', 'Scikit-learn', 'React'],
    summary: 'NLP system that extracts and structures software requirements from unstructured docs.',
    details: 'Automates requirements engineering by parsing client briefs using NLP to extract, categorize, and structure functional and non-functional requirements.',
    link: null,
  },
]

function Modal({ project, onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[800] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <motion.div initial={{ scale: 0.8, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 40 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="relative max-w-lg w-full rounded-3xl p-8 overflow-hidden shine-hover"
        style={{ background: '#111', border: `2px solid ${project.color}`, boxShadow: `0 0 60px ${project.color}30` }}
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
          style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />
        <div className="flex items-start justify-between mb-5">
          <div>
            <span className="text-4xl block mb-3">{project.emoji}</span>
            <span className="chrome-badge" style={{ color: project.color, border: `1px solid ${project.color}50` }}>
              {project.category}
            </span>
            {project.featured && (
              <span className="chrome-badge ml-2" style={{ color: 'var(--yellow)', border: '1px solid rgba(255,229,0,0.3)' }}>
                ⚡ LIVE
              </span>
            )}
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white text-3xl leading-none transition-colors">×</button>
        </div>
        <h3 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 42, color: 'white' }}>{project.title.toUpperCase()}</h3>
        <p className="text-white/65 leading-relaxed my-5 text-sm" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{project.details}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map(s => (
            <span key={s} className="font-mono text-xs px-3 py-1.5 rounded-full"
              style={{ background: project.bg, color: project.color, border: `1px solid ${project.border}` }}>{s}</span>
          ))}
        </div>
        {project.link ? (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="jelly-btn jelly-pink">
            🚀 View Live Project ↗
          </a>
        ) : (
          <div className="flex gap-3">
            <span className="jelly-btn jelly-outline" style={{ fontSize: 11, padding: '10px 18px', cursor: 'default' }}>📋 Case Study</span>
            <span className="jelly-btn jelly-outline" style={{ fontSize: 11, padding: '10px 18px', cursor: 'default' }}>💡 Concept Project</span>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)

  return (
    <section id="projects" className="reveal py-24 md:py-36" style={{ background: '#0d0d0d' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <span className="sec-label" style={{ color: 'var(--yellow)' }}>✦ 03 / Projects</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(255,229,0,0.4), transparent)' }} />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <h2 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 'clamp(60px,9vw,100px)', lineHeight: 0.88 }}>
            <span className="text-white block">FEATURED</span>
            <span className="grad-pink-yellow block">WORK.</span>
          </h2>
          <p className="font-mono text-xs text-white/30 max-w-xs tracking-widest">Click any card to explore →</p>
        </div>

        {/* Featured project — PulseStream */}
        {projects.filter(p => p.featured).map(project => (
          <motion.div key={project.id}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            onClick={() => setSelected(project)}
            className="mb-6 rounded-3xl p-8 cursor-pointer relative overflow-hidden shine-hover"
            style={{
              background: 'rgba(255,31,142,0.06)',
              border: `1.5px solid rgba(255,31,142,0.35)`,
              boxShadow: hovered === 'featured' ? '0 20px 60px rgba(255,31,142,0.2)' : '0 4px 20px rgba(255,31,142,0.08)',
              transition: 'all 0.3s ease',
              transform: hovered === 'featured' ? 'translateY(-4px)' : 'none'
            }}
            onMouseEnter={() => setHovered('featured')} onMouseLeave={() => setHovered(null)}
          >
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
              style={{ background: 'linear-gradient(90deg, var(--hot-pink), var(--yellow), var(--electric-blue))' }} />
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="text-6xl">{project.emoji}</div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="chrome-badge" style={{ color: 'var(--yellow)' }}>⚡ LIVE DEPLOYED</span>
                  <span className="chrome-badge" style={{ color: 'var(--hot-pink)' }}>★ FEATURED</span>
                </div>
                <h3 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 'clamp(36px,5vw,56px)', color: 'white', lineHeight: 1 }}>
                  {project.title.toUpperCase()}
                </h3>
                <p className="text-white/60 text-sm mt-2 max-w-xl" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{project.summary}</p>
              </div>
              <div className="flex flex-wrap gap-2 md:flex-col md:items-end">
                {project.stack.map(s => (
                  <span key={s} className="font-mono text-xs px-3 py-1 rounded-full"
                    style={{ background: 'rgba(255,31,142,0.12)', color: 'var(--hot-pink)', border: '1px solid rgba(255,31,142,0.3)' }}>{s}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.filter(p => !p.featured).map((project, i) => (
            <motion.div key={project.id}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(project)}
              className="rounded-2xl p-6 cursor-pointer relative overflow-hidden shine-hover"
              style={{
                background: hovered === i ? project.bg : 'rgba(255,255,255,0.02)',
                border: `1px solid ${hovered === i ? project.border : 'rgba(255,255,255,0.07)'}`,
                transform: hovered === i ? 'translateY(-6px) rotate(0.3deg)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                boxShadow: hovered === i ? `0 20px 50px ${project.color}20` : 'none',
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{ background: project.color, opacity: hovered === i ? 1 : 0.2 }} />

              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl" style={{ transform: hovered === i ? 'scale(1.2) rotate(-8deg)' : 'none', transition: 'transform 0.3s ease' }}>
                  {project.emoji}
                </span>
                <span className="chrome-badge" style={{ color: project.color }}>{project.category}</span>
              </div>

              <h3 style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 30, color: 'white', lineHeight: 1.1 }} className="mb-2">
                {project.title.toUpperCase()}
              </h3>
              <p className="text-white/50 text-xs leading-relaxed mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{project.summary}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.stack.map(s => (
                  <span key={s} className="font-mono text-xs px-2 py-1 rounded-md"
                    style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.35)' }}>{s}</span>
                ))}
              </div>

              <div className="font-mono text-xs tracking-widest uppercase transition-all duration-200"
                style={{ color: project.color, opacity: hovered === i ? 1 : 0.35 }}>
                {project.link ? '🚀 Live Project →' : 'View Details →'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <Modal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
