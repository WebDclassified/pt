/**
 * Experience & leadership — Phase 01 content lock.
 * Source: docs/data/PROFILE_SOURCE_OF_TRUTH.md — dates and wording preserved.
 */

export interface ExperienceEntry {
  title: string;
  org: string;
  period: string;
  points: string[];
}

export interface LeadershipEntry {
  title: string;
  org: string;
  period: string;
  points: string[];
}

export const experience: ExperienceEntry[] = [
  {
    title: "GenAI Intern",
    org: "IBM (PBEL Program)",
    period: "Aug 2025 – Oct 2025",
    points: [
      "Hands-on training in full-stack web development and industry best practices",
      "Practical knowledge of API design, authentication mechanisms, and database integration",
      "Debugging, problem-solving, and collaborative development through guided projects",
    ],
  },
  {
    title: "Full Stack Developer",
    org: "Project-Based",
    period: "2024 – Present",
    points: [
      "Built multiple end-to-end web applications using MERN stack, TypeScript, and PostgreSQL",
      "Designed secure and scalable backend APIs with JWT-based authentication",
      "Developed responsive, accessible, and interactive UIs using React and Tailwind CSS",
      "Worked on payment systems, blogs, wallets, and social platforms",
    ],
  },
];

export const leadership: LeadershipEntry[] = [
  {
    title: "Secretary",
    org: "HexClan (Programming Club), LIET",
    period: "Sept 2025 – Present",
    points: [
      "Organized and managed on-campus coding competitions and hackathons",
      "Coordinated teams, judges, and participants",
      "Promoted competitive programming and web development culture among students",
    ],
  },
  {
    title: "Executive Member",
    org: "National Digital Library of India (NDLI) Club",
    period: "2024 – Present",
    points: [
      "Supported academic and technical initiatives within the student community",
      "Encouraged use of digital learning resources and peer-to-peer collaboration",
    ],
  },
];

/**
 * Primary/repeated technologies only (Phase 01 rule: repo-present
 * technologies are NOT auto-promoted to proficiency claims).
 */
export const skills: string[] = [
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "JWT",
  "Web3",
  "C++",
  "SQLite",
  "Git / GitHub",
  "HTML / CSS",
];
