import { ArrowUpRight, Clock } from 'lucide-react';
import ExternalLink from './ExternalLink.jsx';
import { ProjectCover } from './ProjectMedia.jsx';

export default function ProjectCard({ project, onOpen }) {
  const titleId = `project-${project.id}-title`;

  return (
    <article className="project-card" aria-labelledby={titleId}>
      <ProjectCover project={project} />

      <div className="project-card__body">
        <div className="project-card__meta mono">
          <span>{project.index}</span>
          <span className="project-card__category">{project.category}</span>
        </div>

        <h3 id={titleId} className="project-card__title">
          {/* The button stretches over the whole card so the card itself is clickable. */}
          <button type="button" className="project-card__open" onClick={(event) => onOpen(project, event.currentTarget)}>
            {project.title}
            <span className="sr-only">, view project details</span>
          </button>
        </h3>

        <p className="project-card__desc">{project.description}</p>

        <ul className="tag-row" aria-label={`${project.title} technologies`}>
          {project.tech.map((tech) => (
            <li key={tech} className="tag">{tech}</li>
          ))}
        </ul>

        <div className="project-card__foot">
          {project.highlight && (
            <p className="metric-pill">
              <span className="metric-pill__value">{project.highlight.value}</span>
              <span className="metric-pill__label">{project.highlight.label}</span>
            </p>
          )}

          <div className="project-card__links">
            {project.status && (
              <span className="status-badge">
                <Clock size={14} strokeWidth={1.75} aria-hidden="true" />
                {project.status}
              </span>
            )}
            {project.links.map((link) => (
              <ExternalLink key={link.href} {...link} variant="mini" className="project-card__link" />
            ))}
          </div>
        </div>

        <span className="project-card__cue mono" aria-hidden="true">
          Details <ArrowUpRight size={14} strokeWidth={1.75} />
        </span>
      </div>
    </article>
  );
}
