import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../data/content.js';
import ProjectCard from './ProjectCard.jsx';
import ProjectModal from './ProjectModal.jsx';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

const pad = (n) => String(n).padStart(2, '0');

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const returnFocus = useRef(null);
  const trackRef = useRef(null);
  const [view, setView] = useState({ first: 0, visible: 1, atStart: true, atEnd: false });

  const open = useCallback((project, trigger) => {
    returnFocus.current = trigger;
    setSelected(project);
  }, []);

  const close = useCallback(() => setSelected(null), []);

  // Return focus to the card that opened the dialog once it has unmounted.
  useEffect(() => {
    if (selected || !returnFocus.current) return;
    returnFocus.current.focus({ preventScroll: true });
    returnFocus.current = null;
  }, [selected]);

  // Derive the position indicator and arrow states from the native scroll position,
  // so arrows, touch swipes, trackpads, and keyboard scrolling all stay in sync.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    // Scroll events already fire at most once per frame, and this is only a few reads,
    // so it runs directly; React skips the render when nothing changed.
    const measure = () => {
      const items = [...track.children];
      if (!items.length) return;
      const step = items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : items[0].offsetWidth;
      const max = track.scrollWidth - track.clientWidth;
      const atEnd = track.scrollLeft >= max - 2;
      const visible = Math.max(1, Math.min(items.length, Math.round((track.clientWidth + 1) / step)));
      // At the end the last cards are fully in view even if the offset is not a whole step.
      const first = atEnd ? items.length - visible : Math.min(items.length - 1, Math.round(track.scrollLeft / step));
      setView((prev) =>
        prev.first === first && prev.visible === visible && prev.atEnd === atEnd && prev.atStart === track.scrollLeft <= 2
          ? prev
          : { first, visible, atStart: track.scrollLeft <= 2, atEnd }
      );
    };

    measure();
    track.addEventListener('scroll', measure, { passive: true });
    track.addEventListener('scrollend', measure);
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => {
      track.removeEventListener('scroll', measure);
      track.removeEventListener('scrollend', measure);
      observer.disconnect();
    };
  }, []);

  // Scroll to an exact slide position rather than by a relative amount, so repeated
  // clicks always land on a snap point instead of being pulled back by snapping.
  const move = (direction) => {
    const track = trackRef.current;
    if (!track || track.children.length < 2) return;
    const items = [...track.children];
    const offsets = items.map((item) => item.offsetLeft - items[0].offsetLeft);
    const max = track.scrollWidth - track.clientWidth;
    const current = offsets.reduce(
      (best, offset, i) => (Math.abs(offset - track.scrollLeft) < Math.abs(offsets[best] - track.scrollLeft) ? i : best),
      0
    );
    const target = Math.max(0, Math.min(items.length - 1, current + direction));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: Math.min(offsets[target], max), behavior: reduced ? 'instant' : 'smooth' });
  };

  const total = PROJECTS.length;
  const last = Math.min(total, view.first + view.visible);
  const position = view.visible > 1 ? `${pad(view.first + 1)}–${pad(last)}` : pad(view.first + 1);
  const progress = (last / total) * 100;

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <div className="carousel-head">
          <SectionHeader
            id="projects-title"
            index="01"
            eyebrow="Selected work"
            title="Projects"
            intro="Four projects across AI retrieval, resume analysis, applied cryptography, and responsive frontend work. Select a project for its full write-up and reported results."
          />
          <div className="carousel-controls">
            <p className="carousel-position mono" aria-live="polite">
              <span className="sr-only">Showing projects </span>
              <span className="carousel-position__current">{position}</span>
              <span aria-hidden="true"> / </span>
              <span className="sr-only"> of </span>
              {pad(total)}
            </p>
            <div className="carousel-arrows">
              <button
                type="button"
                className="carousel-arrow"
                onClick={() => move(-1)}
                disabled={view.atStart}
                aria-controls="project-track"
                aria-label="Previous project"
              >
                <ArrowLeft size={18} strokeWidth={1.75} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="carousel-arrow"
                onClick={() => move(1)}
                disabled={view.atEnd}
                aria-controls="project-track"
                aria-label="Next project"
              >
                <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <Reveal className="carousel">
          <div
            id="project-track"
            ref={trackRef}
            className="carousel__track"
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Projects. Use the arrow buttons or scroll horizontally to browse."
          >
            {PROJECTS.map((project, i) => (
              <div
                key={project.id}
                className="carousel__slide"
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${total}: ${project.title}`}
              >
                <ProjectCard project={project} onOpen={open} />
              </div>
            ))}
          </div>
          <div className="carousel__progress" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
        </Reveal>
      </div>
      {selected && <ProjectModal key={selected.id} project={selected} onClose={close} />}
    </section>
  );
}
