import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#080808' }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute w-[500px] h-[500px] rounded-full opacity-20 blob-morph pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FF1F8E, transparent)', filter: 'blur(60px)', top: '10%', left: '5%' }} />
      <div className="absolute w-[400px] h-[400px] rounded-full opacity-15 blob-morph pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00B4FF, transparent)', filter: 'blur(50px)', bottom: '10%', right: '5%', animationDelay: '-4s' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10"
      >
        {/* Y2K window style */}
        <div className="inline-block rounded-2xl overflow-hidden mb-8"
          style={{ border: '1px solid rgba(255,31,142,0.3)', background: 'rgba(255,31,142,0.04)' }}>
          <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: 'rgba(255,31,142,0.12)', borderBottom: '1px solid rgba(255,31,142,0.2)' }}>
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="font-mono text-xs text-white/30 ml-2 tracking-widest">aditi-s.portfolio.exe</span>
          </div>
          <div className="px-12 py-8">
            <div className="font-display text-8xl grad-pink-yellow" style={{ fontFamily: "'Bebas Neue', cursive", lineHeight: 1 }}>ADITI S</div>
            <div className="font-mono text-xs tracking-[0.4em] mt-2" style={{ color: 'var(--electric-blue)' }}>LOADING PORTFOLIO...</div>
          </div>
        </div>

        <div className="w-56 mx-auto">
          <div className="w-full h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div className="h-full loading-bar rounded-full"
              style={{ background: 'linear-gradient(90deg, var(--hot-pink), var(--yellow), var(--electric-blue))' }} />
          </div>
          <div className="font-mono text-xs text-white/25 text-center mt-2 tracking-[0.2em]">INITIALIZING AWESOME...</div>
        </div>
      </motion.div>

      {/* Floating stars */}
      {['✦','★','✸','✺'].map((s, i) => (
        <div key={i} className="absolute float-y text-2xl pointer-events-none"
          style={{
            color: ['var(--hot-pink)','var(--yellow)','var(--electric-blue)','var(--lime)'][i],
            top: `${[20,70,30,65][i]}%`, left: `${[10,15,85,80][i]}%`,
            animationDelay: `${i * 0.8}s`, opacity: 0.6
          }}>
          {s}
        </div>
      ))}
    </motion.div>
  )
}
