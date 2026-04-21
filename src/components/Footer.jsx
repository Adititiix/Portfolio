export default function Footer() {
  return (
    <footer className="py-10 px-6" style={{ background: '#060606', borderTop: '1px solid rgba(255,31,142,0.1)' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 28 }} className="grad-pink-yellow">ADITI S</div>
        <div className="text-center">
          <p className="font-mono text-xs tracking-widest uppercase" style={{ color: 'rgba(255,229,0,0.45)' }}>
            Designed to be remembered.
          </p>
          <p className="font-mono text-xs text-white/20 mt-1">Built by Aditi S · {new Date().getFullYear()}</p>
        </div>
        <div className="flex items-center gap-6">
          {[
            { label: 'GitHub', href: 'https://github.com/Adititiix' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aditi-s-b810ab264/' },
            { label: 'Email', href: 'mailto:aditii.s5379@gmail.com' },
          ].map(l => (
            <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest uppercase text-white/25 hover:text-white transition-colors">{l.label}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
