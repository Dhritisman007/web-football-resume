// STARTING XI (tech stack) and PLAYER ATTRIBUTES.
// "usedIn" is derived only from the project stacks in the brief. Where no
// project is linked yet, it says TO CONFIRM.

export type TechCategory =
  | "Programming"
  | "AI / ML"
  | "Web"
  | "Databases"
  | "Blockchain"
  | "Tools";

export interface Tech {
  name: string;
  category: TechCategory;
  usedIn: string[];
}

export const technologies: Tech[] = [
  // Programming
  { name: "Python", category: "Programming", usedIn: ["LEO", "TradeHelp", "Cotton Disease", "teleSys anomaly detection"] },
  { name: "Java", category: "Programming", usedIn: ["Airline Management System"] },
  { name: "C", category: "Programming", usedIn: ["TO CONFIRM"] },
  { name: "JavaScript / TypeScript", category: "Programming", usedIn: ["LEO", "Ann Yatra", "TradeHelp"] },

  // AI / ML
  { name: "Scikit-learn", category: "AI / ML", usedIn: ["teleSys anomaly detection", "House Price Prediction"] },
  { name: "Pandas", category: "AI / ML", usedIn: ["teleSys anomaly detection", "Data Analysis"] },
  { name: "NumPy", category: "AI / ML", usedIn: ["Data Analysis"] },
  { name: "Matplotlib", category: "AI / ML", usedIn: ["Data Analysis"] },
  { name: "Random Forest", category: "AI / ML", usedIn: ["TradeHelp"] },
  { name: "Logistic Regression", category: "AI / ML", usedIn: ["ML Projects"] },
  { name: "Linear Regression", category: "AI / ML", usedIn: ["House Price Prediction"] },
  { name: "KNN", category: "AI / ML", usedIn: ["ML Projects"] },
  { name: "PCA", category: "AI / ML", usedIn: ["ML Projects"] },

  // Web
  { name: "React", category: "Web", usedIn: ["TradeHelp", "Ann Yatra"] },
  { name: "Next.js", category: "Web", usedIn: ["LEO"] },
  { name: "Node.js", category: "Web", usedIn: ["Ann Yatra"] },
  { name: "Express", category: "Web", usedIn: ["TO CONFIRM"] },
  { name: "FastAPI", category: "Web", usedIn: ["LEO", "TradeHelp"] },
  { name: "Flask", category: "Web", usedIn: ["TO CONFIRM"] },

  // Databases
  { name: "PostgreSQL", category: "Databases", usedIn: ["TradeHelp"] },
  { name: "MySQL", category: "Databases", usedIn: ["TO CONFIRM"] },
  { name: "Supabase", category: "Databases", usedIn: ["TO CONFIRM"] },

  { name: "TensorFlow/Keras", category: "AI / ML", usedIn: ["Cotton Disease"] },
  { name: "OpenCV", category: "AI / ML", usedIn: ["Cotton Disease"] },
  { name: "CNN", category: "AI / ML", usedIn: ["Cotton Disease"] },
  { name: "Google Gemini API", category: "AI / ML", usedIn: ["LEO"] },
  { name: "LangChain", category: "AI / ML", usedIn: ["TO CONFIRM"] },
  { name: "RAG", category: "AI / ML", usedIn: ["LEO"] },
  { name: "ChromaDB", category: "Databases", usedIn: ["LEO"] },
  { name: "Redis", category: "Databases", usedIn: ["LEO"] },
  { name: "MongoDB", category: "Databases", usedIn: ["TO CONFIRM"] },
  { name: "NextAuth", category: "Web", usedIn: ["LEO"] },
  { name: "Framer Motion", category: "Web", usedIn: ["This portfolio"] },
  { name: "Docker", category: "Tools", usedIn: ["LEO"] },
  { name: "AWS (EC2/S3)", category: "Tools", usedIn: ["TO CONFIRM"] },
  { name: "Linux", category: "Tools", usedIn: ["TO CONFIRM"] },

  // Blockchain
  { name: "Solidity", category: "Blockchain", usedIn: ["Ann Yatra"] },
  { name: "Polygon", category: "Blockchain", usedIn: ["Ann Yatra"] },
  { name: "Hardhat", category: "Blockchain", usedIn: ["Ann Yatra"] },
  { name: "IPFS", category: "Blockchain", usedIn: ["Ann Yatra"] },
  { name: "Alchemy", category: "Blockchain", usedIn: ["Ann Yatra"] },

  // Tools
  { name: "Git", category: "Tools", usedIn: ["All projects"] },
  { name: "GitHub", category: "Tools", usedIn: ["All projects"] },
  { name: "Streamlit", category: "Tools", usedIn: ["TO CONFIRM"] },
  { name: "Vercel", category: "Tools", usedIn: ["TO CONFIRM"] },
  { name: "Render", category: "Tools", usedIn: ["TO CONFIRM"] },
];

export const techByName = (name: string) => technologies.find((t) => t.name === name);

// Starting XI formation. Each slot points at a technology or a role.
// Rows run top (attack) to bottom (defence), as on a team sheet.
export interface Slot {
  label: string;
  // Matches a `technologies` name, or is a role node.
  ref?: string;
  role?: boolean;
  // Position on a 0–100 grid, x across and y down.
  x: number;
  y: number;
}

export const startingXI: Slot[] = [
  { label: "AI / ML", role: true, x: 50, y: 8 },
  { label: "Python", ref: "Python", x: 28, y: 28 },
  { label: "FastAPI", ref: "FastAPI", x: 72, y: 28 },
  { label: "React", ref: "React", x: 18, y: 50 },
  { label: "DHRITISMAN", role: true, x: 50, y: 50 },
  { label: "Java", ref: "Java", x: 82, y: 50 },
  { label: "SQL", ref: "PostgreSQL", x: 28, y: 72 },
  { label: "Git", ref: "Git", x: 72, y: 72 },
  { label: "DSA", role: true, x: 50, y: 72 },
  { label: "Systems", role: true, x: 50, y: 92 },
];

// Attributes are self-assessed portfolio strengths, not measurements.
// Levels are placeholders to adjust.
export interface Attribute {
  name: string;
  level: number; // 0–10
  technologies: string[];
  projects: string[];
  note: string;
}

export const attributes: Attribute[] = [
  {
    name: "PROGRAMMING",
    level: 9,
    technologies: ["Python", "Java", "JavaScript / TypeScript", "C"],
    projects: ["TradeHelp Analytics", "Airline Management System"],
    note: "Writing clear, working code across backend, data and systems work.",
  },
  {
    name: "MACHINE LEARNING",
    level: 8,
    technologies: ["Scikit-learn", "Random Forest", "Logistic Regression", "KNN", "PCA"],
    projects: ["TradeHelp Analytics", "Cotton Disease Prediction", "House Price Prediction"],
    note: "Building, evaluating and wiring ML models into real products.",
  },
  {
    name: "PROBLEM SOLVING",
    level: 9,
    technologies: ["Python", "DSA"],
    projects: ["Every match on the card"],
    note: "Breaking open-ended problems into steps that ship.",
  },
  {
    name: "FULL STACK",
    level: 8,
    technologies: ["React", "FastAPI", "Node.js", "PostgreSQL"],
    projects: ["TradeHelp Analytics", "Ann Yatra"],
    note: "Taking features from the database to the interface.",
  },
  {
    name: "DATA",
    level: 8,
    technologies: ["Pandas", "NumPy", "Matplotlib"],
    projects: ["TradeHelp Analytics", "House Price Prediction"],
    note: "Cleaning, analysing and visualising data before any modelling.",
  },
  {
    name: "SYSTEM DESIGN",
    level: 7,
    technologies: ["FastAPI", "PostgreSQL", "IPFS", "Polygon"],
    projects: ["TradeHelp Analytics", "Ann Yatra"],
    note: "Designing data flows between services, APIs and on-chain storage.",
  },
  {
    name: "LLM & AGENTS",
    level: 8,
    technologies: ["Google Gemini API", "LangChain", "RAG", "ChromaDB"],
    projects: ["LEO — AI Coding Agent"],
    note: "Building agentic loops, multi-agent orchestration and retrieval-based memory.",
  },
  {
    name: "CREATIVITY",
    level: 8,
    technologies: ["React", "Next.js"],
    projects: ["Interfaces across the portfolio"],
    note: "Designing interfaces that feel intentional, not templated.",
  },
  {
    name: "DSA",
    level: 7,
    technologies: ["Python", "Java", "C"],
    projects: ["Practice problems"],
    note: "Data structures and algorithms as the base for every build.",
  },
];
