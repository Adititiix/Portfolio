// All portfolio content lives here. Only verified information is included;
// anything not yet confirmed is marked explicitly rather than filled in.

export const LINKS = {
  resume: 'https://drive.google.com/file/d/1FuQxOvhS3s_541ecItKBi-oCIzWod96y/view?usp=sharing',
  email: 'aditii.s5379@gmail.com',
  github: 'https://github.com/Adititiix',
  linkedin: 'https://linkedin.com/in/aditi-s-b810ab264',
  leetcode: 'https://leetcode.com/u/aditiiiiiii05',
  publication: 'https://ieeexplore.ieee.org/document/11681752',
};

export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'publications', label: 'Publications' },
  { id: 'contact', label: 'Contact' },
];

// Optional project media. Leave a field out (or the arrays empty) until real assets exist;
// cards fall back to a labelled illustration and the modal hides the gallery and video.
// Put image files in public/projects/<project id>/ and reference them from the site root:
//
//   media: {
//     thumbnail: { src: '/projects/hirelens/overview.png', alt: 'HireLens AI results screen' },
//     gallery: [{ src: '/projects/hirelens/upload.png', alt: 'Resume upload screen', caption: 'Resume upload' }],
//     video: { url: 'https://www.youtube.com/watch?v=VIDEO_ID', title: 'HireLens AI walkthrough' },
//   },
//
// Video URLs may be YouTube, Vimeo, Loom, or a direct .mp4/.webm file; any other URL is shown as a link.
export const PROJECTS = [
  {
    id: 'causora',
    index: '01',
    title: 'Causora',
    category: 'AI-powered data pipeline incident investigation',
    visual: 'causora',
    description:
      'An AI-assisted investigation system that retrieves relevant incident logs, runbooks, and schema documentation to help investigate data pipeline failures.',
    tech: ['Python'],
    techNote: 'Python-based pipeline. Further stack details will be listed once the repository is published.',
    focus: ['Retrieval', 'Incident investigation', 'Data pipelines'],
    highlight: { value: '79.5%', label: 'Hit@5' },
    status: 'Coming to GitHub',
    overview:
      'Causora is an AI-assisted investigation system for data pipeline failures. Rather than leaving engineers to search through scattered material, it retrieves the incident logs, runbooks, and schema documentation most relevant to a failure.',
    problem:
      'When a data pipeline fails, the context needed to diagnose it is spread across logs, operational runbooks, and schema documentation. Locating the right material is a slow first step in any investigation.',
    approach:
      'A Python-based retrieval pipeline that surfaces relevant incident logs, runbooks, and schema documentation for a given failure. Retrieval was compared across four configurations, including error-linked retrieval.',
    evaluation: {
      caption: 'Retrieval evaluation',
      note: 'Hit@5 is the share of questions for which a relevant document appears among the top five retrieved results.',
      metrics: [
        { value: '50', label: 'Evaluation questions' },
        { value: '4', label: 'Configurations tested' },
        { value: '79.5%', label: 'Hit@5, error-linked retrieval' },
      ],
    },
    media: { thumbnail: null, gallery: [], video: null },
    links: [],
  },
  {
    id: 'hirelens',
    index: '02',
    title: 'HireLens AI',
    category: 'AI-powered resume screening platform',
    visual: 'hirelens',
    description:
      'An AI-powered resume analysis platform that combines semantic resume-job matching, skill-gap analysis, and ATS-oriented feedback to help candidates evaluate and improve their applications.',
    tech: ['React.js', 'Python', 'FastAPI', 'Natural Language Processing', 'OCR', 'Sentence Transformers'],
    highlight: { value: '0.92s', label: 'Median latency' },
    overview:
      'HireLens AI analyses a resume against a job description. It combines semantic resume-job matching, skill-gap analysis, and ATS-oriented feedback so candidates can evaluate and improve their applications.',
    problem:
      'Candidates often cannot tell how well a resume aligns with a specific role, which skills are missing, or how it may be read by applicant tracking systems.',
    approach:
      'A React.js frontend backed by a Python and FastAPI service. Resume text is extracted with OCR, processed with natural language processing techniques, and compared to job requirements using Sentence Transformers for semantic matching. The results feed skill-gap analysis and ATS-oriented feedback.',
    evaluation: {
      caption: 'Project benchmark',
      note: 'Measured on the project benchmark of 100 resumes. These figures describe that benchmark run, not guaranteed performance in every environment.',
      metrics: [
        { value: '100', label: 'Resumes benchmarked' },
        { value: '100%', label: 'Successful analyses' },
        { value: '0.92s', label: 'Median processing latency' },
        { value: '1.43s', label: 'p95 processing latency' },
      ],
    },
    media: { thumbnail: null, gallery: [], video: null },
    links: [{ type: 'github', label: 'Source on GitHub', href: 'https://github.com/Adititiix/HireLens-AI' }],
  },
  {
    id: 'trustvault',
    index: '03',
    title: 'TrustVault',
    category: 'Secure healthcare data sharing and research',
    visual: 'trustvault',
    description:
      'A secure healthcare data-sharing system designed around encrypted data exchange, session-based key management, and security monitoring.',
    tech: ['Python', 'FastAPI', 'JWT', 'SQLite', 'AES-256-GCM', 'X25519 ECDH'],
    highlight: { value: '1,000x', label: 'Blast-radius reduction' },
    badge: 'IEEE ICISC 2026',
    overview:
      'TrustVault is a secure healthcare data-sharing system built around encrypted data exchange, session-based key management, and security monitoring. The work is published as a research paper at the IEEE 10th International Conference on Inventive Systems and Control (ICISC 2026).',
    problem:
      'Healthcare records are highly sensitive. When a single key or credential protects a large body of data, one compromise can expose all of it.',
    approach:
      'A Python and FastAPI service using JWT for authentication and SQLite for storage. Records are encrypted with AES-256-GCM, and session keys are established through X25519 ECDH key exchange. Session-based key management limits how many records any single key protects, and a monitoring layer detects attacks across multiple categories.',
    evaluation: {
      caption: 'Research evaluation',
      note: 'Results as reported in the TrustVault research evaluation.',
      metrics: [
        { value: '35,349', label: 'Cryptographic throughput, records/s' },
        { value: '19,330', label: 'End-to-end throughput, records/s' },
        { value: '100% to 0.10%', label: 'Blast radius, a 1,000x reduction' },
        { value: '10', label: 'Records exposed per session key' },
        { value: '8', label: 'Attack categories evaluated' },
        { value: '93.5%', label: 'Average detection recall' },
        { value: '< 1.2s', label: 'Alert latency' },
      ],
    },
    publication: {
      venue: 'IEEE 10th International Conference on Inventive Systems and Control (ICISC 2026)',
      href: LINKS.publication,
    },
    media: { thumbnail: null, gallery: [], video: null },
    links: [
      { type: 'publication', label: 'IEEE Xplore paper', href: LINKS.publication },
      { type: 'github', label: 'Source on GitHub', href: 'https://github.com/vaishn4vi/TrustVault-Secure-Healthcare-System' },
    ],
  },
  {
    id: 'pulsestream',
    index: '04',
    title: 'PulseStream',
    category: 'Responsive company website',
    visual: 'pulsestream',
    description:
      'A responsive frontend website built with reusable components and a mobile-first layout, with an emphasis on usability and responsive presentation.',
    tech: ['React.js', 'JavaScript', 'CSS'],
    highlight: { value: 'Live', label: 'Frontend demo' },
    overview:
      'PulseStream is a frontend-only company website built in React.js. It is composed from reusable components and laid out mobile-first, with an emphasis on usability and responsive presentation.',
    problem:
      'A company website has to present clearly and stay usable across phones, tablets, and desktops without duplicated markup for each screen size.',
    approach:
      'Built with React.js, JavaScript, and CSS. The interface is assembled from reusable components, and the layout is designed mobile-first and scaled up for larger screens. The project is a frontend website and does not include a backend.',
    media: { thumbnail: null, gallery: [], video: null },
    links: [
      { type: 'demo', label: 'Live demo', href: 'https://pulsestream-6wfa.vercel.app/' },
      { type: 'github', label: 'Source on GitHub', href: 'https://github.com/Adititiix/Pulsestream' },
    ],
  },
];

// Each skill lists where it has actually been used, so a selected tag shows evidence
// instead of a proficiency rating.
const P = {
  causora: 'Causora',
  hirelens: 'HireLens AI',
  trustvault: 'TrustVault',
  pulsestream: 'PulseStream',
  briddlee: 'Briddlee internship',
  traan: 'Traan, Ultron 8.0',
  swayam: 'Swayam Foundation',
};

export const SKILL_GROUPS = [
  {
    id: 'languages',
    label: 'Programming Languages',
    skills: [
      // Skills with an empty usedIn list are confirmed skills that no project on this page uses yet;
      // the detail panel says so rather than implying a project association.
      { name: 'Java', logo: null, usedIn: [] },
      { name: 'Python', logo: 'python', usedIn: [P.causora, P.hirelens, P.trustvault, P.briddlee] },
      { name: 'JavaScript', logo: 'javascript', usedIn: [P.pulsestream] },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'React', logo: 'react', usedIn: [P.hirelens, P.pulsestream] },
      { name: 'CSS', logo: 'css', usedIn: [P.pulsestream] },
      { name: 'Responsive design', logo: 'responsive', usedIn: [P.pulsestream] },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: [
      { name: 'FastAPI', logo: 'fastapi', usedIn: [P.hirelens, P.trustvault] },
      { name: 'Flask', logo: 'flask', usedIn: [P.briddlee] },
      { name: 'JWT authentication', logo: 'jwt', usedIn: [P.trustvault] },
    ],
  },
  {
    id: 'ai',
    label: 'AI/ML',
    skills: [
      { name: 'Natural Language Processing', logo: 'nlp', usedIn: [P.hirelens] },
      { name: 'Sentence Transformers', logo: 'embeddings', usedIn: [P.hirelens] },
      { name: 'Retrieval and RAG', logo: 'retrieval', usedIn: [P.causora, P.briddlee] },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    skills: [
      { name: 'SQLite', logo: 'sqlite', usedIn: [P.trustvault] },
      { name: 'Firebase', logo: 'firebase', usedIn: [P.briddlee, P.traan] },
      { name: 'MongoDB', logo: 'mongodb', usedIn: [] },
    ],
  },
  {
    id: 'security',
    label: 'Security',
    skills: [
      { name: 'AES-256-GCM', logo: 'encryption', usedIn: [P.trustvault] },
      { name: 'X25519 ECDH', logo: 'keyexchange', usedIn: [P.trustvault] },
      { name: 'Session key management', logo: 'sessionkeys', usedIn: [P.trustvault] },
      { name: 'Threat detection', logo: 'threat', usedIn: [P.trustvault] },
    ],
  },
  {
    id: 'tools',
    label: 'Tools and Cloud',
    skills: [
      { name: 'Git', logo: 'git', usedIn: [P.hirelens, P.trustvault, P.pulsestream] },
      { name: 'GitHub', logo: 'github', usedIn: [P.hirelens, P.trustvault, P.pulsestream] },
      { name: 'Docker', logo: 'docker', usedIn: [] },
      { name: 'AWS', logo: 'aws', usedIn: [] },
      { name: 'Vercel', logo: 'vercel', usedIn: [P.pulsestream, P.briddlee] },
      { name: 'Firebase deployment', logo: 'firebase', usedIn: [P.briddlee] },
    ],
  },
  {
    // Fundamentals rather than tools: they share the tile design but have no project list.
    id: 'concepts',
    label: 'Core Concepts',
    concepts: true,
    skills: [
      // A non-breaking space keeps '&' from wrapping onto a line of its own in the tile.
      { name: 'Data Structures\u00a0& Algorithms', logo: 'dsa', usedIn: [] },
      { name: 'Object-Oriented Programming', logo: 'oop', usedIn: [] },
      { name: 'Software Engineering', logo: 'softwareeng', usedIn: [] },
      { name: 'Operating Systems', logo: 'os', usedIn: [] },
      { name: 'AI\u00a0& Machine Learning', logo: 'aiml', usedIn: [] },
    ],
  },
];

export const EXPERIENCE = [
  {
    id: 'briddlee',
    org: 'Briddlee',
    role: 'Full Stack Developer Intern',
    period: 'June 2025 – December 2025',
    kind: 'Internship',
    points: [
      'Learned how retrieval-augmented generation (RAG) pipelines are structured.',
      'Worked on a full-stack hotel and food recommendation system using Python and Flask.',
      'Worked with recommendation logic informed by purchase frequency and behavioural data.',
      'Gained experience with deployment workflows involving Vercel and Firebase.',
    ],
    tags: ['Python', 'Flask', 'RAG', 'Vercel', 'Firebase'],
  },
  {
    id: 'munsoc',
    org: 'SRM MUNSOC',
    // No formal role title or dates are confirmed, so neither is shown.
    role: 'Volunteering, event organisation, and competitions',
    kind: 'Student society',
    points: [
      'Contributed to volunteering activities and the organisation of society events.',
      'Participated in intra-college competitions.',
    ],
    tags: ['Event organisation', 'Volunteering'],
  },
  {
    id: 'swayam',
    org: 'Swayam Foundation',
    role: 'Volunteer Educator',
    kind: 'Volunteering',
    points: [
      'Introduced learners to AI and machine learning concepts through educational AI games and algorithmic problems.',
      'Worked through classic problems such as Missionaries and Cannibals and the Monkey and Banana problem.',
      'Supported learning in Physics, Chemistry, and Computer Science.',
    ],
    tags: ['Teaching', 'AI concepts', 'Technical communication'],
  },
];

export const ACHIEVEMENTS = [
  {
    id: 'ieee',
    kicker: 'Research publication',
    title: 'TrustVault at IEEE ICISC 2026',
    body:
      'Research on secure healthcare data sharing published at the IEEE 10th International Conference on Inventive Systems and Control.',
    link: { label: 'Read on IEEE Xplore', href: LINKS.publication },
    icon: 'publication',
  },
  {
    id: 'ultron',
    kicker: 'Special Mention',
    title: 'Traan, Ultron 8.0 Hackathon 2025',
    body:
      'Contributed to Traan, a women’s safety application built with Flutter and Firebase, working on the frontend, emergency voice alert functionality, and SOS/live-location sharing.',
    tags: ['Flutter', 'Firebase'],
    icon: 'award',
  },
];

export const PUBLICATIONS = [
  {
    id: 'trustvault-paper',
    title: 'TrustVault: Secure Healthcare Data Sharing System',
    venue: 'IEEE 10th International Conference on Inventive Systems and Control (ICISC 2026)',
    publisher: 'IEEE Xplore',
    summary:
      'Presents a healthcare data-sharing system that combines AES-256-GCM encryption with X25519 ECDH session key exchange. Session-scoped keys limit each key to 10 records, reducing the reported blast radius of a key compromise from 100% to 0.10%. A monitoring layer evaluated across eight attack categories achieved 93.5% average detection recall with alert latency under 1.2 seconds.',
    keywords: ['Healthcare security', 'Applied cryptography', 'Key management', 'Threat detection'],
    media: { thumbnail: null, gallery: [], video: null },
    links: [
      { type: 'publication', label: 'IEEE Xplore', href: LINKS.publication },
      { type: 'github', label: 'Repository', href: 'https://github.com/vaishn4vi/TrustVault-Secure-Healthcare-System' },
    ],
  },
];
