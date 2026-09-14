/**
 * Projects — Phase 01 content lock.
 * Sources: docs/data/PROFILE_SOURCE_OF_TRUTH.md (Qupay, Hilo, Medium Blog,
 * Wallet App, Block Swap) + docs/data/VIZQUO_VERIFIED_DATA.md + live
 * repository verification of all six WebDclassified repositories
 * (read 2026-09-14). Factual claims only; "verified" marks fields
 * confirmed against a live source. Showcase order per Phase 01 priority.
 */

export type ProjectStatus = "active" | "complete" | "learning";

export interface Project {
  id: string;
  slug: string;
  number: string;
  title: string;
  summary: string;
  role: string;
  year: string;
  category: string;
  stack: string[];
  demo?: string;
  repository: string;
  status: ProjectStatus;
  caseStudy: string;
  verified: boolean;
  /** How/when this project was verified (Phase 11 truth rules) */
  verificationNotes?: string;
  /** Feature/architecture facts verified from the live repository README */
  highlights?: string[];
  /** Creative metaphor per Phase 11 — used for the 3D/DOM treatment */
  metaphor: string;
  focusLayers: string[];
}

export const projects: Project[] = [
  {
    id: "vizquo",
    slug: "projects/vizquo",
    number: "01",
    title: "Vizquo",
    summary:
      "Open-source browser extension that inspects any webpage and extracts its design system — CSS, tokens, assets, responsive behavior, and audits — 100% local, with confidence labels on every value.",
    role: "Creator / Maintainer",
    year: "2026",
    category: "Developer Tool · Browser Extension",
    stack: ["TypeScript", "Chrome MV3", "Firefox MV3", "Vitest", "Playwright"],
    demo: "https://webdclassified.github.io/vizquo/landing/",
    repository: "https://github.com/WebDclassified/vizquo",
    status: "active",
    caseStudy: "/projects/vizquo",
    verified: true,
    verificationNotes:
      "Live repository + landing demo read 2026-09-14; README credits 'Created by Prabhat Teotia'.",
    highlights: [
      "Element inspector: computed styles, cascade & specificity, variable chains, box model, DOM tree",
      "Design DNA: color roles, typographic hierarchy, spacing/radius/shadow scales, design-consistency score",
      "Asset extraction with SVG inspector (SVG → React) and one-click bulk ZIP export",
      "Screenshot studio: viewport, element, full-page, and multi-selection captures",
      "Code generation to React, Vue, Svelte, HTML, Tailwind; token export to CSS/SCSS/JSON/TS/Figma Tokens/Style Dictionary",
      "Audits: WCAG contrast with exact luminance math, performance, accessibility findings",
      "Responsive Time Machine via real iframe emulation",
      "Designer ⇄ Engineer modes presenting identical data two ways",
      "Optional AI explanations via OpenRouter or local Ollama — off by default, consent-gated",
      "Validation gate: strict tsc → Biome lint → 400+ vitest unit tests → 31 torture scenarios → Playwright E2E",
    ],
    metaphor: "Inspection / X-ray — surface → select → inspect layers",
    focusLayers: [
      "Element inspector — computed styles, cascade, variable chains",
      "Design DNA — color roles, type hierarchy, spacing scales",
      "Asset extraction — images, SVGs, fonts, ZIP export",
      "Audits — WCAG contrast, performance, accessibility",
      "Responsive Time Machine — real iframe emulation",
      "Confidence labels — Detected / Derived / Inferred",
    ],
  },
  {
    id: "qupay",
    slug: "projects/qupay",
    number: "02",
    title: "Qupay",
    summary:
      "Secure digital wallet application with user authentication, balance management, and transactions.",
    role: "Developer",
    year: "2024",
    category: "Digital Wallet · Payment System",
    stack: ["Node.js", "Express", "MongoDB", "React", "JWT"],
    demo: "https://qupay.vercel.app",
    repository: "https://github.com/WebDclassified/qupay",
    status: "complete",
    caseStudy: "/projects/qupay",
    verified: true,
    verificationNotes:
      "Live repository read 2026-09-14: backend/ + frontend/ structure confirmed; deployment linked from repo About.",
    highlights: [
      "Split architecture: dedicated backend (API) and frontend (client) packages",
      "JWT-based authentication with protected routes",
      "Database schemas for users, accounts, and balances",
    ],
    metaphor: "Transactions and secure money movement — financially precise",
    focusLayers: [
      "Authentication — JWT-based, protected routes",
      "Accounts and balances — database schemas",
      "Transactions — REST APIs",
      "Security, performance, clean API architecture",
    ],
  },
  {
    id: "hilo",
    slug: "projects/hilo",
    number: "03",
    title: "Hilo",
    summary:
      "Social platform where users can post, interact, and communicate in real time.",
    role: "Developer",
    year: "2024",
    category: "Social Platform · Microblogging",
    stack: ["React", "Vite", "Chakra UI", "Node.js", "Express", "MongoDB"],
    repository: "https://github.com/WebDclassified/hilo",
    status: "complete",
    caseStudy: "/projects/hilo",
    verified: true,
    verificationNotes:
      "Live repository read 2026-09-14: README confirms React + Vite + Chakra UI frontend, Node/Express/MongoDB backend, Cloudinary image storage. Stack corrected from old portfolio labels (Tailwind → Chakra UI).",
    highlights: [
      "User authentication: signup, login, logout",
      "Posting and sharing content — text and images (Cloudinary storage)",
      "Likes, replies, and a feed of posts from followed users",
      "Follow/unfollow and profile pages showing a user's posts",
      "Structured backend: controllers, middlewares, Mongoose models, route layer",
    ],
    metaphor: "Social graph — users, posts, comments as networked environment",
    focusLayers: [
      "Posts, comments, user profiles",
      "JWT authentication and authorization",
      "Schemas optimized for social interactions",
      "Responsive UI on MERN stack",
    ],
  },
  {
    id: "medium-blog",
    slug: "projects/medium-blog",
    number: "04",
    title: "Medium Blog Platform",
    summary:
      "Modern blogging platform allowing users to create, publish, and read blogs.",
    role: "Developer",
    year: "2024",
    category: "Publishing Platform",
    stack: ["React", "Hono", "Node.js", "PostgreSQL", "TypeScript", "JWT"],
    demo: "https://medium-blog-black.vercel.app/home",
    repository: "https://github.com/WebDclassified/medium-blog",
    status: "complete",
    caseStudy: "/projects/medium-blog",
    verified: true,
    verificationNotes:
      "Live repository read 2026-09-14: README confirms React/Hono/PostgreSQL, 'Developed by Prabhat Teotia', and a live deployment.",
    highlights: [
      "Shared validation package published to npm (@pt2024/medium-common) — one source of truth for input types across frontend and backend",
      "Signup/sign-in flows with JWT authentication and authorization",
      "Relational schema for users and blog content on PostgreSQL",
      "Create, publish, and read flows on a deployed frontend",
    ],
    metaphor: "Publishing architecture — content layers and relational data",
    focusLayers: [
      "Relational schemas for users and blog content",
      "JWT authentication/authorization",
      "Type-safe API layer with Hono",
      "Responsive and production-ready application",
    ],
  },
  {
    id: "block-swap",
    slug: "projects/block-swap",
    number: "05",
    title: "Block Swap",
    summary:
      "Blockchain-inspired swapping interface for learning decentralized concepts.",
    role: "Developer",
    year: "2024",
    category: "Web3 · Learning Interface",
    stack: ["React", "Web3", "JavaScript"],
    repository: "https://github.com/WebDclassified/block-swap",
    status: "learning",
    caseStudy: "/projects/block-swap",
    verified: true,
    verificationNotes:
      "Live repository read 2026-09-14: description confirms a crypto token-swapping platform.",
    highlights: [
      "Token-swapping interface for exchanging crypto assets",
      "Component reusability and clean UX on React",
    ],
    metaphor: "Transaction/network flow — abstract, not crypto-neon",
    focusLayers: [
      "Blockchain fundamentals and transaction flows",
      "Component reusability and clean UX",
      "React frontend",
    ],
  },
  {
    id: "wallet-app",
    slug: "projects/wallet-app",
    number: "06",
    title: "Wallet App",
    summary:
      "Backend-focused wallet system to manage users and financial transactions.",
    role: "Developer",
    year: "2024",
    category: "Backend System · Wallet API",
    // NOTE: source doc flags contradictory labels (Mongo text vs React/PG labels).
    // Publishing only the stack stated in the project's own description until verified.
    stack: ["Node.js", "Express", "MongoDB"],
    repository: "https://github.com/WebDclassified/wallet-app",
    status: "complete",
    caseStudy: "/projects/wallet-app",
    verified: true,
    verificationNotes:
      "Live repository read 2026-09-14: README confirms signup/signin/dashboard/send-money pages. Stack contradiction from old portfolio remains unresolved — publishing only the stack stated in the source description.",
    highlights: [
      "Signup and sign-in flows",
      "User dashboard",
      "Send-money flow for financial transactions",
    ],
    metaphor: "Backend/data architecture — user data, balances, API, auth",
    focusLayers: [
      "MongoDB schemas for users and balances",
      "REST APIs using Node.js and Express",
      "Authentication, authorization, and error handling",
      "Backend scalability and clean-code practices",
    ],
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
