// TROPHY ROOM. Items come from the resume and the brief.
// Empty categories render an empty state, so nothing is invented.

export interface Achievement {
  title: string;
  organisation: string;
  role: string;
  detail?: string;
  kind: "club" | "event" | "hackathon" | "certification" | "milestone";
}

export const achievements: Achievement[] = [
  {
    title: "Hypervision Technical Club",
    organisation: "UPES",
    role: "Core Committee",
    kind: "club",
  },
  {
    title: "Pehchaan 4.0",
    organisation: "Hypervision Student Society · UPES",
    role: "Organizing Committee",
    detail: "2025",
    kind: "event",
  },
  {
    title: "IBM ICE Day 2024",
    organisation: "UPES",
    role: "Organizing Committee",
    detail: "Event planning, logistics and participant management for 300+ attendees.",
    kind: "event",
  },
];

// Empty until real items exist. The UI shows an empty state for each.
export const hackathons: Achievement[] = [];
export const certifications: Achievement[] = [];
