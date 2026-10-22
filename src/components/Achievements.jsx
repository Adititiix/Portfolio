import { Award, BookOpen } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/content.js';
import ExternalLink from './ExternalLink.jsx';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

const ICONS = { award: Award, publication: BookOpen };

export default function Achievements() {
  return (
    <section id="achievements" className="section section--dark" aria-labelledby="achievements-title">
      <div className="container">
        <SectionHeader id="achievements-title" index="04" eyebrow="Recognition" title="Achievements" />

        <div className="achievement-grid">
          {ACHIEVEMENTS.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <Reveal as="article" key={item.id} className="achievement" delay={i * 90}>
                <div className="achievement__icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.6} />
                </div>
                <p className="achievement__kicker mono">{item.kicker}</p>
                <h3 className="achievement__title">{item.title}</h3>
                <p className="achievement__body">{item.body}</p>
                {item.tags && (
                  <ul className="tag-row" aria-label="Technologies">
                    {item.tags.map((tag) => (
                      <li key={tag} className="tag tag--on-dark">{tag}</li>
                    ))}
                  </ul>
                )}
                {item.link && <ExternalLink type="publication" {...item.link} variant="on-dark" />}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
