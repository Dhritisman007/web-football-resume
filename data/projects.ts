// Every project is a "match". Add a project by adding an object here.
// Fields set to TODO are placeholders. Replace them with real content.

export interface Project {
  id: string;
  number: string;
  title: string;
  opponent: string;
  result: string;
  summary: string;
  description: string;
  technologies: string[];
  features: string[];
  // Ordered flow, rendered as an animated diagram.
  architecture?: string[];
  problem?: string;
  solution?: string;
  results?: string[];
  challenges?: string;
  learned?: string;
  github?: string;
  demo?: string;
  image?: string;
}

const TODO = "TODO";

export const projects: Project[] = [
  {
    id: "leo-ai-coding-agent",
    number: "01",
    title: "LEO — AI Coding Agent",
    opponent: "Autonomous Coding",
    result: "LIVE",
    summary: "Full-stack AI coding assistant with a streaming agentic loop, multi-agent orchestration and RAG memory.",
    description:
      "LEO is a full-stack AI coding assistant. A streaming agentic loop (ReAct-style: plan, tool call, result) runs on FastAPI with Google Gemini 2.5 Flash, and it generates code, runs static analysis and writes automated tests.",
    technologies: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "Google Gemini API",
      "ChromaDB",
      "Redis",
      "Docker",
      "NextAuth",
    ],
    features: [
      "Autonomous code generation",
      "Static analysis and automated test generation",
      "Multi-agent orchestration with dependency resolution",
      "RAG memory via ChromaDB",
      "Real-time streaming with Server-Sent Events (SSE)",
      "Redis-backed rate limiting",
      "NextAuth authentication",
      "Next.js eval dashboard",
    ],
    architecture: [
      "NEXT.JS FRONTEND",
      "SSE STREAM",
      "FASTAPI AGENT LOOP",
      "PLAN → TOOL CALL → RESULT",
      "GEMINI 2.5 FLASH",
      "CHROMADB RAG MEMORY",
    ],
    problem: TODO,
    solution: TODO,
    results: [TODO],
    challenges: TODO,
    learned: TODO,
    github: "GITHUB_URL_HERE",
    demo: "https://leo-frontend-eta.vercel.app",
  },
  {
    id: "tradehelp-analytics",
    number: "02",
    title: "TradeHelp Analytics",
    opponent: "Market Complexity",
    result: "WON",
    summary: "AI-powered trading analytics for Nifty 50 and Sensex, with real-time data, indicators and ML signals.",
    description:
      "TradeHelp is a full-stack trading analytics platform for Nifty 50 and Sensex. A FastAPI backend and React frontend process real-time market data from the Upstox API, compute technical indicators and generate ML-based buy/sell signals.",
    technologies: ["FastAPI", "React", "Python", "Machine Learning", "Upstox API", "PostgreSQL"],
    features: [
      "Live candlestick charts",
      "10+ technical indicators: RSI, MACD, Bollinger Bands, EMA and ATR",
      "FVG (Fair Value Gap) and Smart Money Concepts detection",
      "ML models for buy/sell signal generation",
      "Strategy backtesting",
      "FII/DII flow analysis to improve signal confidence",
      "Upstox API integration",
    ],
    architecture: [
      "MARKET DATA",
      "UPSTOX API",
      "FASTAPI",
      "FEATURE ENGINEERING",
      "ML MODEL",
      "SIGNAL ENGINE",
      "REACT DASHBOARD",
    ],
    problem: TODO,
    solution: TODO,
    results: [
      "Sub-second latency on real-time market data",
      "~78% backtested directional accuracy",
      "FII/DII flow data improved signal confidence by 15%",
    ],
    challenges: TODO,
    learned: TODO,
    github: "GITHUB_URL_HERE",
    demo: "https://www.tradehelp.tech",
  },
  {
    id: "cotton-disease",
    number: "03",
    title: "Cotton Plant Disease Prediction",
    opponent: "Crop Health",
    result: "FULL TIME",
    summary: "Convolutional neural network that classifies 7 cotton plant diseases from leaf images.",
    description:
      "A deep-learning model built on a Convolutional Neural Network (CNN). It was trained on 5,000+ leaf images to classify 7 cotton plant diseases.",
    technologies: ["Deep Learning", "CNN", "TensorFlow/Keras", "OpenCV"],
    features: [
      "Classification of 7 cotton plant diseases",
      "Data augmentation",
      "Hyperparameter tuning",
    ],
    problem: TODO,
    solution: TODO,
    results: [
      "92% validation accuracy",
      "18% reduction in overfitting through data augmentation and hyperparameter tuning",
    ],
    challenges: TODO,
    learned: TODO,
    github: "GITHUB_URL_HERE",
  },
  {
    id: "ann-yatra",
    number: "04",
    title: "Ann Yatra",
    opponent: "Supply Chain",
    result: "FULL TIME",
    summary: "Blockchain-based supply-chain traceability system.",
    description: "A blockchain-based supply-chain traceability system.",
    technologies: ["Solidity", "Polygon", "IPFS", "Hardhat", "Alchemy", "React", "Node.js"],
    features: [TODO],
    problem: TODO,
    solution: TODO,
    results: [TODO],
    challenges: TODO,
    learned: TODO,
    github: "GITHUB_URL_HERE",
    demo: "DEMO_URL_HERE",
  },
  {
    id: "house-price",
    number: "05",
    title: "House Price Prediction",
    opponent: "Regression",
    result: "FULL TIME",
    summary: "Machine learning project involving regression and prediction.",
    description: "A machine learning project involving regression and prediction.",
    technologies: ["Machine Learning", "Python"],
    features: [TODO],
    problem: TODO,
    solution: TODO,
    results: [TODO],
    challenges: TODO,
    learned: TODO,
    github: "GITHUB_URL_HERE",
  },
  {
    id: "airline-management",
    number: "06",
    title: "Airline Management System",
    opponent: "Object Oriented",
    result: "FULL TIME",
    summary: "Java-based software project.",
    description: "A Java-based software project.",
    technologies: ["Java"],
    features: [TODO],
    problem: TODO,
    solution: TODO,
    results: [TODO],
    challenges: TODO,
    learned: TODO,
    github: "GITHUB_URL_HERE",
  },
  {
    id: "expenditure-management",
    number: "07",
    title: "Expenditure Management",
    opponent: "Personal Finance",
    result: "FULL TIME",
    summary: "Application for tracking expenses.",
    description: "An application for tracking expenses.",
    technologies: [TODO],
    features: [TODO],
    problem: TODO,
    solution: TODO,
    results: [TODO],
    challenges: TODO,
    learned: TODO,
    github: "GITHUB_URL_HERE",
  },
];
