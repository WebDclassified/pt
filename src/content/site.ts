/**
 * Site identity — Phase 01 content lock.
 * Source: docs/data/PROFILE_SOURCE_OF_TRUTH.md
 * Only verified facts. Do not invent.
 */
export const site = {
  name: "Prabhat Teotia",
  nameDisplay: "Prabhat\nTeotia",
  role: "Software Developer / Full-Stack Developer",
  /** Hero identity line — role only, no slash, no stack list (§hero) */
  heroRole: "Software Developer",
  /** Hero proof line — what I do, said the way a builder would say it */
  heroStatement:
    "I take products from a blank repo to production — the idea, the schema, the release, and the fixes after. Vizquo, a design-system inspector used by real designers, is one of them.",
  // TODO(Phase 14): replace with real production domain before launch
  url: "https://prabhatteotia.dev",
  description:
    "Software developer building scalable web applications with React, Node.js, TypeScript, and modern backend architectures. Creator of Vizquo, the local-first web design system inspector.",
  email: "prabhatteotia2024@gmail.com",
  linkedin: "https://www.linkedin.com/in/prabhat-teotia-333235253/",
  resume:
    "https://drive.google.com/file/d/16JcqtvFMvtJ_LjI-YH26oGxjK_ltvMmq/view?usp=sharing",
  githubOrg: "WebDclassified",
} as const;
