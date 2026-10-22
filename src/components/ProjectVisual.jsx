// Abstract, UI-inspired illustrations for each project. Purely decorative.

function Causora() {
  return (
    <svg viewBox="0 0 320 180" className="pv">
      <rect x="16" y="18" width="150" height="144" rx="8" className="pv-panel" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <g key={i}>
          <rect x="28" y={34 + i * 17} width="18" height="6" rx="2" className={i === 3 ? 'pv-hot' : 'pv-mute'} />
          <rect x="52" y={34 + i * 17} width={[90, 70, 84, 96, 60, 78, 66][i]} height="6" rx="2" className={i === 3 ? 'pv-hot-soft' : 'pv-line'} />
        </g>
      ))}
      <rect x="22" y="83" width="138" height="20" rx="4" className="pv-select pv-pulse" />
      <path d="M166 93 C 196 93, 196 50, 222 50" className="pv-wire" />
      <path d="M166 93 L 222 93" className="pv-wire" />
      <path d="M166 93 C 196 93, 196 136, 222 136" className="pv-wire" />
      {[50, 93, 136].map((y, i) => (
        <g key={y}>
          <rect x="222" y={y - 16} width="82" height="32" rx="6" className={i === 1 ? 'pv-card-hot' : 'pv-card'} />
          <rect x="232" y={y - 6} width="40" height="5" rx="2" className="pv-ink" />
          <rect x="232" y={y + 3} width="58" height="4" rx="2" className="pv-line" />
        </g>
      ))}
    </svg>
  );
}

function HireLens() {
  return (
    <svg viewBox="0 0 320 180" className="pv">
      <rect x="28" y="16" width="112" height="148" rx="8" className="pv-panel" />
      <circle cx="52" cy="40" r="10" className="pv-blush" />
      <rect x="70" y="34" width="54" height="6" rx="2" className="pv-ink" />
      <rect x="70" y="44" width="36" height="4" rx="2" className="pv-line" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x="42" y={66 + i * 14} width={[84, 70, 80, 60, 76, 52][i]} height="5" rx="2" className={i === 1 || i === 4 ? 'pv-hot-soft' : 'pv-line'} />
      ))}
      <circle cx="150" cy="96" r="30" className="pv-lens" />
      <line x1="171" y1="117" x2="186" y2="132" className="pv-handle" />
      <rect x="196" y="30" width="104" height="120" rx="8" className="pv-panel" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="208" y={46 + i * 26} width="40" height="4" rx="2" className="pv-mute" />
          <rect x="208" y={56 + i * 26} width="80" height="6" rx="3" className="pv-track" />
          <rect x="208" y={56 + i * 26} width={[64, 48, 72, 30][i]} height="6" rx="3" className="pv-bar" />
        </g>
      ))}
    </svg>
  );
}

function TrustVault() {
  return (
    <svg viewBox="0 0 320 180" className="pv">
      <circle cx="60" cy="90" r="26" className="pv-card" />
      <circle cx="260" cy="90" r="26" className="pv-card" />
      <rect x="50" y="86" width="20" height="16" rx="3" className="pv-ink-fill" />
      <path d="M54 86 v-5 a6 6 0 0 1 12 0 v5" className="pv-shackle" />
      <rect x="250" y="86" width="20" height="16" rx="3" className="pv-ink-fill" />
      <path d="M254 86 v-5 a6 6 0 0 1 12 0 v5" className="pv-shackle" />
      <path d="M86 90 L 234 90" className="pv-wire pv-dash" />
      <path d="M86 70 C 130 30, 190 30, 234 70" className="pv-wire" />
      <path d="M86 110 C 130 150, 190 150, 234 110" className="pv-wire" />
      <g className="pv-keyx">
        <rect x="136" y="72" width="48" height="36" rx="6" className="pv-card-hot" />
        <text x="160" y="94" textAnchor="middle" className="pv-mono">ECDH</text>
      </g>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={102 + i * 26} y="146" width="18" height="12" rx="2" className={i === 2 ? 'pv-hot' : 'pv-mute'} />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={102 + i * 26} y="22" width="18" height="12" rx="2" className="pv-line" />
      ))}
    </svg>
  );
}

function PulseStream() {
  return (
    <svg viewBox="0 0 320 180" className="pv">
      <rect x="20" y="14" width="200" height="152" rx="8" className="pv-panel" />
      <line x1="20" y1="34" x2="220" y2="34" className="pv-rule" />
      {[34, 46, 58].map((x) => <circle key={x} cx={x} cy="24" r="3.5" className="pv-mute" />)}
      <rect x="76" y="19" width="110" height="10" rx="5" className="pv-track" />
      <rect x="34" y="48" width="86" height="10" rx="2" className="pv-ink" />
      <rect x="34" y="64" width="120" height="5" rx="2" className="pv-line" />
      <rect x="34" y="76" width="44" height="12" rx="6" className="pv-hot" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={34 + i * 60} y="104" width="52" height="48" rx="5" className={i === 1 ? 'pv-card-hot' : 'pv-card'} />
      ))}
      <rect x="236" y="34" width="68" height="120" rx="12" className="pv-panel" />
      <rect x="264" y="40" width="12" height="3" rx="1.5" className="pv-mute" />
      <rect x="246" y="52" width="40" height="7" rx="2" className="pv-ink" />
      <rect x="246" y="64" width="48" height="4" rx="2" className="pv-line" />
      <rect x="246" y="74" width="26" height="9" rx="4.5" className="pv-hot" />
      {[0, 1].map((i) => (
        <rect key={i} x="246" y={92 + i * 28} width="48" height="22" rx="4" className={i === 0 ? 'pv-card-hot' : 'pv-card'} />
      ))}
    </svg>
  );
}

const VISUALS = { causora: Causora, hirelens: HireLens, trustvault: TrustVault, pulsestream: PulseStream };

// `bare` renders just the artwork, for use inside an existing .project-visual frame.
export default function ProjectVisual({ name, bare = false }) {
  const Visual = VISUALS[name];
  if (bare) {
    return (
      <>
        <div className="project-visual__grid" aria-hidden="true" />
        {Visual && <div aria-hidden="true" style={{ position: 'absolute', inset: 0 }}><Visual /></div>}
      </>
    );
  }
  return (
    <div className="project-visual" aria-hidden="true">
      <div className="project-visual__grid" />
      {Visual && <Visual />}
    </div>
  );
}
