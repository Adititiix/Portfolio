import { EXPERIENCE } from '../data/content.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeader
          id="experience-title"
          index="03"
          eyebrow="Work and volunteering"
          title="Experience"
        />

        <ol className="timeline">
          {EXPERIENCE.map((item, i) => (
            <Reveal as="li" key={item.id} className={`timeline__item ${item.pending ? 'is-pending' : ''}`} delay={i * 80}>
              <span className="timeline__node" aria-hidden="true" />
              <div className="timeline__aside">
                <p className="mono timeline__kind">{item.kind}</p>
                {item.period && <p className="timeline__period">{item.period}</p>}
              </div>
              <div className="timeline__card">
                <h3 className="timeline__org">{item.org}</h3>
                <p className="timeline__role">{item.role}</p>
                <ul className="timeline__points">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {item.tags.length > 0 && (
                  <ul className="tag-row" aria-label={`${item.org} topics`}>
                    {item.tags.map((tag) => (
                      <li key={tag} className="tag">{tag}</li>
                    ))}
                  </ul>
                )}
                {item.pending && <p className="pending-note mono">Awaiting verified details</p>}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
