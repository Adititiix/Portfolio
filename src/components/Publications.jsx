import { PUBLICATIONS } from '../data/content.js';
import ExternalLink from './ExternalLink.jsx';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

export default function Publications() {
  return (
    <section id="publications" className="section" aria-labelledby="publications-title">
      <div className="container">
        <SectionHeader id="publications-title" index="05" eyebrow="Research" title="Publications" />

        {PUBLICATIONS.map((paper) => (
          <Reveal as="article" key={paper.id} className="paper" aria-labelledby={`${paper.id}-title`}>
            <div className="paper__rail" aria-hidden="true">
              <span className="mono">Conference paper</span>
            </div>
            <div className="paper__body">
              <dl className="paper__meta">
                <div>
                  <dt className="mono">Venue</dt>
                  <dd>{paper.venue}</dd>
                </div>
                <div>
                  <dt className="mono">Published on</dt>
                  <dd>{paper.publisher}</dd>
                </div>
              </dl>
              <h3 id={`${paper.id}-title`} className="paper__title">{paper.title}</h3>
              <p className="paper__label mono">Summary</p>
              <p className="paper__abstract">{paper.summary}</p>
              <ul className="tag-row" aria-label="Keywords">
                {paper.keywords.map((keyword) => (
                  <li key={keyword} className="tag">{keyword}</li>
                ))}
              </ul>
              <div className="paper__links">
                {paper.links.map((link) => (
                  <ExternalLink key={link.href} {...link} variant={link.type === 'publication' ? 'solid' : 'chip'} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
