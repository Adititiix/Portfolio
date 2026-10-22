import Reveal from './Reveal.jsx';

export default function SectionHeader({ index, eyebrow, title, intro, id }) {
  return (
    <Reveal className="section-header">
      <p className="eyebrow">
        <span className="eyebrow__index">{index}</span>
        <span className="eyebrow__rule" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="section-title">{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </Reveal>
  );
}
