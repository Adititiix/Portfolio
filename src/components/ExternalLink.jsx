import { ArrowUpRight, BookOpen, ExternalLink as ExternalIcon, Github, MonitorPlay, PlayCircle } from 'lucide-react';

const ICONS = {
  github: Github,
  publication: BookOpen,
  demo: MonitorPlay,
  video: PlayCircle,
  external: ExternalIcon,
};

// Opens in a new tab safely; the visually hidden note tells screen reader users.
export default function ExternalLink({ href, type = 'external', label, variant = 'chip', className = '', onClick }) {
  const Icon = ICONS[type] ?? ExternalIcon;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`xlink xlink--${variant} ${className}`.trim()}
      onClick={onClick}
    >
      <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
      <span>{label}</span>
      <ArrowUpRight size={14} strokeWidth={1.75} className="xlink__arrow" aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
