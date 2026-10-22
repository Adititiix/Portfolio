import { ArrowUpRight, BookOpen, Code2, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { LINKS } from '../data/content.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

const CHANNELS = [
  { label: 'Email', value: LINKS.email, href: `mailto:${LINKS.email}`, icon: Mail, external: false },
  { label: 'GitHub', value: 'github.com/Adititiix', href: LINKS.github, icon: Github, external: true },
  { label: 'LinkedIn', value: 'linkedin.com/in/aditi-s-b810ab264', href: LINKS.linkedin, icon: Linkedin, external: true },
  { label: 'LeetCode', value: 'leetcode.com/u/aditiiiiiii05', href: LINKS.leetcode, icon: Code2, external: true },
  { label: 'Resume', value: 'View on Google Drive', href: LINKS.resume, icon: FileText, external: true },
  { label: 'Publication', value: 'TrustVault on IEEE Xplore', href: LINKS.publication, icon: BookOpen, external: true },
];

export default function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeader
          id="contact-title"
          index="06"
          eyebrow="Get in touch"
          title="Let’s build something considered."
          intro="Open to conversations with recruiters, engineers, and researchers about internships, research, and software engineering roles."
        />

        <Reveal className="contact__primary">
          <a className="btn btn--primary btn--lg" href={`mailto:${LINKS.email}`}>
            <Mail size={18} strokeWidth={1.75} aria-hidden="true" />
            {LINKS.email}
          </a>
        </Reveal>

        <ul className="contact-grid">
          {CHANNELS.map(({ label, value, href, icon: Icon, external }, i) => (
            <Reveal as="li" key={label} delay={i * 50}>
              <a
                className="contact-card"
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="contact-card__icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.6} />
                </span>
                <span className="contact-card__text">
                  <span className="contact-card__label mono">{label}</span>
                  <span className="contact-card__value">{value}</span>
                </span>
                <ArrowUpRight size={18} strokeWidth={1.6} className="contact-card__arrow" aria-hidden="true" />
                {external && <span className="sr-only"> (opens in a new tab)</span>}
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
