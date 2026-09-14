# CONTENT GAPS — Phase 01 Content Lock

Rule (docs/01_SOURCE_DATA_AND_CONTENT_LOCK.md): missing facts are **never
invented**. They are listed here, shown as placeholders in the UI, or omitted.

## Open gaps

| # | Gap | Where it matters | Status |
|---|-----|------------------|--------|
| 1 | Exact current education details (institution, program, dates beyond club roles) | About, resume | MISSING — omitted |
| 2 | Current preferred job title ("Full-Stack" vs "Software Developer" vs other) | Hero, metadata | Ambiguous — using source-of-truth pairing verbatim |
| 3 | Live demo URLs for Qupay, Hilo, Medium Blog, Block Swap, Wallet App | Project pages, cards | PARTIALLY RESOLVED 2026-09-14 — Qupay (`qupay.vercel.app`) and Medium Blog (`medium-blog-black.vercel.app`) found in live repos; Hilo/Block Swap/Wallet App remain GitHub-only |
| 4 | Verified project metrics (users, performance, adoption) | Case studies | NONE EXIST — will not be created |
| 5 | Verified testimonials | Anywhere | Source testimonials unverified (`@mentor` etc.) — excluded per Phase 00 rule |
| 6 | Wallet App real stack (description says Mongo/Node/Express; old labels said React/PG/TS) | Wallet App page | STILL OPEN — repo README (read 2026-09-14) lists only pages, no stack details; publishing description stack only |
| 7 | Vizquo license confirmation in production (repo shows MIT; verify at publish time) | Vizquo page | Partially verified — live repo read 2026-09-14 |
| 8 | Repository verification for Qupay, Hilo, Medium Blog, Block Swap, Wallet App (existence, name, stack match) | All non-Vizquo projects | RESOLVED 2026-09-14 — all five repos verified live; Hilo stack corrected (Chakra UI + Vite, not Tailwind) per repo README; verification notes embedded in `src/content/projects.ts` |
| 9 | A real engineering challenge with repository evidence for the FAILURE/REBUILD scene (Phase 03 scene 07) | 3D scene, case studies | TODO — placeholder copy marked in `src/content/scenes.ts` |
| 10 | Current learning focus for the NOW scene (Phase 03 scene 14) | Homepage/scene | TODO — placeholder copy marked in `src/content/scenes.ts` |
| 11 | Production domain URL | SEO, metadata | Placeholder `https://prabhatteotia.dev` — TODO(Phase 14) |
| 12 | Portrait photo for ABOUT scene | About section | MISSING — omitted |
| 13 | "Verified at build time" re-check for Vizquo demo/license at launch | Vizquo page | Re-run before Phase 18 gate |

## Resolution protocol

1. User confirms the fact → move into `src/content/*` with `verified: true`.
2. A live source (repository, deployed demo) verifies it → same.
3. Otherwise the gap stays, the UI copy stays honest, and the item repeats in
   `BUILD_AUDIT.md` until resolved.
