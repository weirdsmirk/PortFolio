export type Project = {
  id: string;
  title: string;
  description: string;
  category: "Website" | "Poster" | "Logo" | "Brand Identity";
  discipline: "Design" | "Engineering";
  tools: string[];
  cover?: string;
  workCover?: string;
  gallery: string[];
  link?: string;
  caseStudy: string;
  year: string;
  role: string;
  overview: string;
  features?: string[];
};

export const projects: Project[] = [
  {
    id: "p-cinetrack",
    title: "CineTrack",
    description: "A private, local-first film and television ledger for tracking what you watch, how you rate it, and how your collection evolves over time.",
    category: "Website",
    discipline: "Engineering",
    tools: ["React", "TypeScript", "SQLite", "TMDb"],
    workCover: "/cinetrack.webp",
    gallery: [],
    link: "https://github.com/weirdpink/CIneTrack",
    caseStudy: "/project/p-cinetrack",
    year: "2026",
    role: "Full-Stack Engineer",
    overview: "Built as a local-first personal catalogue, CineTrack keeps film and television history on the user’s device while enriching titles with read-only TMDb metadata. The archive supports episode-by-episode tracking, ratings, rewatch history, collection statistics, themes, and portable JSON backups without accounts, analytics, or cloud storage.",
    features: [
      "Local-first library with portable SQLite-backed data and JSON import/export",
      "Season-by-season episode logs, rewatch history, ratings, favourites, and personal metadata",
      "TMDb-powered discovery and metadata with a privacy-focused same-origin proxy",
    ],
  },
  {
    id: "p-online-voting",
    title: "Online Voting System",
    description: "A secure digital voting platform for voter authentication, ballot access, and official election results.",
    category: "Website",
    discipline: "Engineering",
    tools: ["React", "TypeScript", "Authentication", "Election Systems"],
    gallery: [],
    link: "https://github.com/weirdpink/OnlineVotingSystem",
    caseStudy: "/project/p-online-voting",
    year: "2026",
    role: "Full-Stack Engineer",
    overview: "Online Voting System provides a focused election experience that verifies a voter's identity before granting access to a digital ballot. The platform keeps the voting flow clear and controlled while giving election administrators and voters a direct path to official results.",
    features: [
      "Voter registration and identity verification before ballot access",
      "Guided digital ballot flow for recording and submitting an election choice",
      "Official results view for transparent post-election reporting",
    ],
  },
  {
    id: "p-gametrack",
    title: "GameTrack",
    description: "A local-first gaming registry that combines collection management, Steam sync, IGDB discovery, and detailed playtime analytics.",
    category: "Website",
    discipline: "Engineering",
    tools: ["React", "TypeScript", "Node.js", "SQLite"],
    gallery: [],
    link: "https://github.com/weirdpink/GameTrack",
    caseStudy: "/project/p-gametrack",
    year: "2026",
    role: "Full-Stack Engineer",
    overview: "GameTrack is a single-user, desktop-style web application for treating a game library as a personal database. It stores the registry locally in SQLite, syncs owned titles from Steam, discovers games through IGDB, and turns playtime, status, and completion history into a focused telemetry dashboard.",
    features: [
      "Steam library sync and IGDB discovery through server-side, credential-safe integrations",
      "Local SQLite registry with import/export, custom ordering, and precise playtime tracking",
      "Lazy-loaded analytics for genre, status, completion, and most-played-game telemetry",
    ],
  },
  {
    id: "p-posters",
    title: "Poster Designs",
    description: "A curated series of 6 modernist and typographic poster explorations.",
    category: "Poster",
    discipline: "Design",
    tools: ["Typography", "Layout Design", "Print", "Art Direction"],
    cover: "/posters/Gazelle.webp",
    gallery: [
      "/posters/Hóng Yóu Jiǎozi.webp",
      "/posters/Gazelle.webp",
      "/posters/Nothing Headphone (a).webp",
      "/posters/Mazesoba.webp",
      "/posters/Makizushi.webp",
      "/posters/Shox Ride 2.webp",
    ],
    caseStudy: "/project/p-posters",
    year: "2025 — 2026",
    role: "Graphic & Editorial Designer",
    overview: "A focused series of 6 large-format graphic posters exploring International Typographic Style, tactile textures, commercial product identity, and culinary ephemera. Each piece emphasizes grid tension, asymmetrical typography, and high-contrast composition.",
  },
  {
    id: "p-logos",
    title: "Logo Archive",
    description: "A collection of typographic wordmarks, geometric monograms, and brand symbols.",
    category: "Logo",
    discipline: "Design",
    tools: ["Vector Art", "Grid Systems", "Monograms", "Symbol Design"],
    gallery: [],
    caseStudy: "/project/p-logos",
    year: "2025 — 2026",
    role: "Brand & Identity Designer",
    overview: "A curated archive of vector identity marks, modern monograms, and brutalist geometric symbols. Crafted with mathematical proportions, optical kerning, and negative space to ensure distinct legibility from micro-favicons to architectural signage.",
  },
  {
    id: "p-brand",
    title: "Brand Identity",
    description: "Comprehensive visual identity and packaging system spanning typography, editorial layout, and collateral.",
    category: "Brand Identity",
    discipline: "Design",
    tools: ["Identity Systems", "Packaging", "Art Direction", "Editorial Design"],
    gallery: [],
    caseStudy: "/project/p-brand",
    year: "2026",
    role: "Lead Visual Designer",
    overview: "An extensive visual identity design developed from the ground up, covering primary logomark construction, custom display typography pairings, tactile paper stocks, editorial stationery guidelines, and high-impact sustainable packaging systems.",
  },
];

export type SkillItem = {
  label: string;
  href: string;
  level: number;
};

export const skillGroups: { title: string; items: SkillItem[] }[] = [
  {
    title: "Technical",
    items: [
      { label: "Python", href: "https://www.python.org/", level: 8 },
      { label: "Java", href: "https://www.java.com/", level: 7 },
      { label: "C++", href: "https://cplusplus.com/", level: 8 },
      { label: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML", level: 9 },
      { label: "CSS", href: "https://developer.mozilla.org/en-US/docs/Web/CSS", level: 9 },
      { label: "MySQL", href: "https://www.mysql.com/", level: 7 },
      { label: "Firebase", href: "https://firebase.google.com/", level: 6 },
      { label: "Supabase", href: "https://supabase.com/", level: 5 },
    ],
  },
  {
    title: "Design",
    items: [
      { label: "Adobe Photoshop", href: "https://www.adobe.com/products/photoshop.html", level: 10 },
      { label: "Adobe Illustrator", href: "https://www.adobe.com/products/illustrator.html", level: 7 },
      { label: "Affinity", href: "https://affinity.serif.com/en-us/", level: 7 },
      { label: "Figma", href: "https://www.figma.com/", level: 9 },
      { label: "Framer", href: "https://www.framer.com/", level: 8 },
    ],
  },
  {
    title: "Productivity",
    items: [
      { label: "VS Code", href: "https://code.visualstudio.com/", level: 8 },
      { label: "Zed", href: "https://zed.dev/", level: 8 },
      { label: "Warp", href: "https://warp.dev/", level: 7 },
      { label: "Notion", href: "https://www.notion.so/", level: 7 },
      { label: "Claude Code", href: "https://docs.anthropic.com/en/docs/claude-code/overview", level: 7 },
      { label: "Opencode", href: "https://opencode.ai/", level: 8 },
      { label: "Antigravity", href: "https://antigravity.app/", level: 9 },
    ],
  },
];

export const resumeUrl = "/resume.pdf";

export const contactLinks: { label: string; value: string; href: string }[] = [
  { label: "Email", value: "worksarmaan@gmail.com", href: "mailto:worksarmaan@gmail.com" },
  { label: "GitHub", value: "@weirdpink", href: "https://github.com/weirdpink" },
  { label: "LinkedIn", value: "in/armaantxs", href: "https://www.linkedin.com/in/armaantxs" },
  { label: "Instagram", value: "@armaantxs", href: "https://www.instagram.com/armaantxs" },
  { label: "X", value: "@armaantxs", href: "https://x.com/armaantxs" },
];
