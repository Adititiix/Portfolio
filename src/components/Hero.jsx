import { ArrowDown, FileText, Github, Linkedin } from 'lucide-react';
import { LINKS } from '../data/content.js';

const STATS = [
  { value: '04', label: 'Projects' },
  { value: '01', label: 'IEEE publication' },
  { value: '01', label: 'Hackathon special mention' },
];

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__kicker mono">
            <span className="status-dot" aria-hidden="true" />
            Computer Science undergraduate
          </p>
          <h1 id="hero-title" className="hero__title">
            Aditi <span className="hero__title-accent">S</span>
          </h1>
          <p className="hero__intro">
            Computer Science student exploring AI, secure systems, and software engineering through
            practical projects and research.
          </p>

          <div className="hero__actions">
            <a className="btn btn--primary" href={LINKS.resume} target="_blank" rel="noopener noreferrer">
              <FileText size={18} strokeWidth={1.75} aria-hidden="true" />
              View Resume
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a className="btn btn--ghost" href="#projects">
              Explore projects
              <ArrowDown size={16} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>

          <p className="hero__support">Building, experimenting, and learning through code and research.</p>

          <div className="hero__social">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="icon-link">
              <Github size={18} strokeWidth={1.75} aria-hidden="true" />
              <span>GitHub</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <span className="hero__divider" aria-hidden="true" />
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="icon-link">
              <Linkedin size={18} strokeWidth={1.75} aria-hidden="true" />
              <span>LinkedIn</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <dl className="hero__stats">
            {STATS.map((stat) => (
              <div key={stat.label} className="hero__stat">
                <dt className="mono">{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
