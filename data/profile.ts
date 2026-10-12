// Single source of truth for personal details.
// Any value ending in "_HERE" is a placeholder. The UI shows it as "to add"
// instead of linking to it, so nothing broken or fabricated ships.

export const PLACEHOLDER_SUFFIX = "_HERE";

export const isPlaceholder = (value: string) => value.endsWith(PLACEHOLDER_SUFFIX);

export const profile = {
  name: "Dhritisman Sarma",
  shortName: "Dhritisman",
  club: "DHRITISMAN FC",
  season: "2027 SEASON",
  matchdayYear: "2027",
  degree: "B.Tech Computer Science & Engineering — AIML",
  university: "UPES",
  location: "Dehradun, India",
  graduation: "2027",
  headline: "AI/ML Engineer · Software Engineer · Quant / FinTech",
  positions: {
    primary: "AI/ML ENGINEER",
    secondary: "SOFTWARE ENGINEER",
    strongFoot: "RIGHT",
    club: "UPES",
    graduation: "2027",
  },
  bio: [
    "Dhritisman is a Computer Science & Engineering student specializing in Artificial Intelligence and Machine Learning, interested in building intelligent systems, software products, and data-driven applications.",
    "He has worked across machine learning, full-stack development, LLM-powered agents, blockchain, data analytics, trading and FinTech systems, APIs, and software engineering. He is an active open-source contributor on GitHub.",
  ],
  // Used by the hero, the footer and the meta description.
  description:
    "Portfolio of Dhritisman Sarma, a Computer Science and AI/ML engineer building intelligent systems, software products and data-driven applications.",
  links: {
    email: "sarmadhritisman@gmail.com",
    linkedin: "https://linkedin.com/in/dhritisman-sarma",
    github: "https://github.com/Dhritisman007",
  },
  // Public GitHub username for CURRENT FORM. Public data only, no token.
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME || "Dhritisman007",
  resumePath: "/resume.pdf",
  photoPath: "/profile.jpg",
} as const;

export const careerGoals = {
  targetRoles: ["AI / ML ENGINEER", "SOFTWARE ENGINEER", "FINTECH / QUANT"],
  path: [
    "GRADUATION",
    "ENGINEERING ROLE",
    "AI / ML",
    "FINTECH / QUANT",
    "BUILD SOMETHING SIGNIFICANT",
  ],
} as const;
