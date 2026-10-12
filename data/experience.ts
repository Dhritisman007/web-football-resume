// TRANSFER HISTORY. Roles, dates and highlights come from the resume.
// FISS comes from the earlier brief and is not on the resume. Confirm it.

export interface Transfer {
  year: string;
  organisation: string;
  role: string;
  focus: string;
  period: string;
  highlights: string[];
}

export const transfers: Transfer[] = [
  {
    year: "2024",
    organisation: "FISS",
    role: "Research Intern",
    focus: "Research",
    period: "2024",
    highlights: [],
  },
  {
    year: "2025",
    organisation: "The Nest, Assam Startup",
    role: "Intern",
    focus: "Market Research & Analytics",
    period: "June 2025 — July 2025 · Guwahati, Assam",
    highlights: [
      "Conducted market research across 10+ startup verticals.",
      "Analysed social media metrics, contributing to a 20% improvement in digital engagement strategy.",
    ],
  },
  {
    year: "2026",
    organisation: "teleSys Software Private Limited",
    role: "AI/ML Intern",
    focus: "AI / ML · Network Intelligence",
    period: "June 2026 — July 2026 · Noida, Uttar Pradesh",
    highlights: [
      "Built a Network Anomaly Detection System to identify unusual traffic patterns and potential security threats.",
      "Performed data preprocessing and feature engineering on network traffic data.",
      "Trained and evaluated ML models for anomaly detection using Python, Pandas and Scikit-Learn.",
      "Presented progress and results to the Technical Project Manager in regular project reviews.",
    ],
  },
];

export const nextTransfer = {
  status: "OPEN",
  lookingFor: ["AI / ML", "SOFTWARE ENGINEERING", "FINTECH / QUANT"],
};
