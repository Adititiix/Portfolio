import { useCallback, useEffect, useRef, useState } from 'react';
import { BookOpen, Clock, X } from 'lucide-react';
import ExternalLink from './ExternalLink.jsx';
import { ProjectCover, ProjectGallery, ProjectVideo, getGalleryImages, resolveVideo } from './ProjectMedia.jsx';

const EXIT_MS = 220;

// Built on the native <dialog> element: showModal() makes the rest of the page
// inert and traps focus, and the cancel event gives us Escape handling.
export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const [closing, setClosing] = useState(false);

  const requestClose = useCallback(() => {
    if (closing) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      onClose();
      return;
    }
    setClosing(true);
    window.setTimeout(onClose, EXIT_MS);
  }, [closing, onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (!dialog.open) dialog.showModal();
    closeRef.current?.focus();
    document.documentElement.classList.add('modal-open');
    return () => {
      document.documentElement.classList.remove('modal-open');
      if (dialog.open) dialog.close();
    };
  }, []);

  const onCancel = (event) => {
    event.preventDefault();
    requestClose();
  };

  // A click on the backdrop lands on the dialog element itself.
  const onClick = (event) => {
    if (event.target === dialogRef.current) requestClose();
  };

  const titleId = `modal-${project.id}-title`;
  const images = getGalleryImages(project);
  const video = project.media?.video;
  const embeddable = resolveVideo(video?.url)?.kind !== 'link' && Boolean(video?.url);
  const links = video?.url
    ? [...project.links, { type: 'video', label: 'Demo video', href: video.url }]
    : project.links;

  return (
    <dialog
      ref={dialogRef}
      className={`modal ${closing ? 'is-closing' : ''}`}
      aria-labelledby={titleId}
      onCancel={onCancel}
      onClick={onClick}
    >
      <div className="modal__panel">
        <header className="modal__head">
          <div>
            <p className="mono modal__kicker">
              {project.index} / {project.category}
            </p>
            <h2 id={titleId} className="modal__title">{project.title}</h2>
          </div>
          <button ref={closeRef} type="button" className="modal__close" onClick={requestClose} aria-label="Close project details">
            <X size={20} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </header>

        <div className="modal__scroll">
          {images.length > 0 ? (
            <ProjectGallery images={images} title={project.title} />
          ) : (
            <ProjectCover project={project} />
          )}

          {project.publication && (
            <a className="pub-banner" href={project.publication.href} target="_blank" rel="noopener noreferrer">
              <BookOpen size={20} strokeWidth={1.75} aria-hidden="true" />
              <span>
                <span className="pub-banner__label mono">Published research</span>
                <span className="pub-banner__venue">{project.publication.venue}</span>
              </span>
              <span className="pub-banner__cta">Read on IEEE Xplore</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}

          <section className="modal__section" aria-labelledby={`${titleId}-overview`}>
            <h3 id={`${titleId}-overview`} className="modal__h">Overview</h3>
            <p>{project.overview}</p>
          </section>

          <div className="modal__split">
            <section className="modal__section" aria-labelledby={`${titleId}-problem`}>
              <h3 id={`${titleId}-problem`} className="modal__h">Problem</h3>
              <p>{project.problem}</p>
            </section>
            <section className="modal__section" aria-labelledby={`${titleId}-approach`}>
              <h3 id={`${titleId}-approach`} className="modal__h">Implementation and approach</h3>
              <p>{project.approach}</p>
            </section>
          </div>

          <section className="modal__section" aria-labelledby={`${titleId}-tech`}>
            <h3 id={`${titleId}-tech`} className="modal__h">Confirmed technologies</h3>
            <ul className="tag-row">
              {project.tech.map((tech) => (
                <li key={tech} className="tag tag--solid">{tech}</li>
              ))}
            </ul>
            {project.techNote && <p className="modal__note">{project.techNote}</p>}
            {project.focus && (
              <p className="modal__note">
                Focus areas: {project.focus.join(', ')}
              </p>
            )}
          </section>

          <section className="modal__section" aria-labelledby={`${titleId}-eval`}>
            <h3 id={`${titleId}-eval`} className="modal__h">
              {project.evaluation ? project.evaluation.caption : 'Evaluation'}
            </h3>
            {project.evaluation ? (
              <>
                <dl className="metric-grid">
                  {project.evaluation.metrics.map((metric) => (
                    <div key={metric.label} className="metric">
                      <dt className="metric__label">{metric.label}</dt>
                      <dd className="metric__value">{metric.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="modal__note">{project.evaluation.note}</p>
              </>
            ) : (
              <p className="modal__note">No formal evaluation metrics are reported for this project.</p>
            )}
          </section>

          {embeddable && (
            <section className="modal__section" aria-labelledby={`${titleId}-video`}>
              <h3 id={`${titleId}-video`} className="modal__h">Demo video</h3>
              <ProjectVideo video={video} title={project.title} />
            </section>
          )}

          <section className="modal__section" aria-labelledby={`${titleId}-links`}>
            <h3 id={`${titleId}-links`} className="modal__h">Links</h3>
            <div className="modal__links">
              {project.status && (
                <span className="status-badge status-badge--lg">
                  <Clock size={16} strokeWidth={1.75} aria-hidden="true" />
                  {project.status}. The repository is not public yet.
                </span>
              )}
              {links.map((link) => (
                <ExternalLink key={link.href} {...link} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </dialog>
  );
}
