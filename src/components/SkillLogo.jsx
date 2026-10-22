import {
  siAmazonwebservices,
  siCss3,
  siDocker,
  siFastapi,
  siFirebase,
  siFlask,
  siGit,
  siGithub,
  siJavascript,
  siJsonwebtokens,
  siMongodb,
  siPython,
  siReact,
  siSqlite,
  siVercel,
} from 'simple-icons';
import {
  Boxes,
  BrainCircuit,
  CodeXml,
  Cpu,
  FileSearch,
  KeyRound,
  Languages,
  ListTree,
  LockKeyhole,
  MonitorSmartphone,
  Network,
  ShieldAlert,
  Timer,
} from 'lucide-react';

// Official marks from Simple Icons, drawn in one colour so the grid reads as a set.
const BRANDS = {
  python: siPython,
  javascript: siJavascript,
  react: siReact,
  css: siCss3,
  fastapi: siFastapi,
  flask: siFlask,
  jwt: siJsonwebtokens,
  sqlite: siSqlite,
  firebase: siFirebase,
  mongodb: siMongodb,
  docker: siDocker,
  aws: siAmazonwebservices,
  git: siGit,
  github: siGithub,
  vercel: siVercel,
};

// Concepts without a product logo use matching line icons.
const CONCEPTS = {
  responsive: MonitorSmartphone,
  nlp: Languages,
  embeddings: Network,
  retrieval: FileSearch,
  encryption: LockKeyhole,
  keyexchange: KeyRound,
  sessionkeys: Timer,
  threat: ShieldAlert,
  dsa: ListTree,
  oop: Boxes,
  softwareeng: CodeXml,
  os: Cpu,
  aiml: BrainCircuit,
};

export default function SkillLogo({ logo, name }) {
  const brand = BRANDS[logo];
  if (brand) {
    return (
      <svg className="skill-logo skill-logo--brand" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d={brand.path} />
      </svg>
    );
  }

  const Concept = CONCEPTS[logo];
  if (Concept) {
    return <Concept className="skill-logo skill-logo--line" size={28} strokeWidth={1.5} aria-hidden="true" />;
  }

  // Text fallback when no suitable logo is available: a monogram of the name.
  const initials = name
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2);
  return (
    <span className="skill-logo skill-logo--text" aria-hidden="true">
      {initials}
    </span>
  );
}
