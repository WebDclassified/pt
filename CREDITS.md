# CREDITS — Attribution and Ownership

Phase 19 deliverable. Last full audit: **2026-09-14** (licenses read from the
installed `node_modules` manifests, not from memory).

## Primary credit

**BUILD / BREAK / REBUILD** is the personal portfolio of **Prabhat Teotia**.

- Concept, creative direction, story, and all written content: Prabhat Teotia
- Architecture, design system, 3D worlds, and implementation: Prabhat Teotia
  (built with AI assistance — see *Implementation tooling* below)
- All procedural 3D environments, motion grammar, and audio synthesis are
  original work created for this project. **No external 3D models, sounds,
  images, fonts, or code snippets are used.**

## Third-party libraries

All libraries below are used in the production build (verified against
`package.json` dependencies — nothing listed that isn't actually imported).

| Library | Package | Author / Org | License | Where used |
|---|---|---|---|---|
| Next.js | `next@15` | Vercel | MIT | App framework, routing, fonts, security headers |
| React | `react@19`, `react-dom@19` | Meta + community | MIT | UI runtime |
| Three.js | `three@0.180` | three.js authors | MIT | WebGL renderer, scenes, materials |
| React Three Fiber | `@react-three/fiber@9` | Poimandres | MIT | React renderer for Three.js |
| GSAP | `gsap@3.13` | GreenSock | GSAP Standard "No Charge" license¹ | Master timeline, DOM beat reveals |
| Lenis | `lenis@1.3` | Studio Freight / darkroom.engineering | MIT | Smooth scroll |
| Tailwind CSS | `tailwindcss@4`, `@tailwindcss/postcss` | Tailwind Labs | MIT | Styling (via PostCSS) |
| PostCSS | `postcss` | PostCSS team | MIT | CSS pipeline |
| TypeScript | `typescript@5.9` | Microsoft | Apache-2.0 | Type system |
| ESLint | `eslint@9`, `eslint-config-next` | OpenJS Foundation / Vercel | MIT | Linting |
| Playwright | `@playwright/test@1.55` | Microsoft | Apache-2.0 | E2E + QA matrix testing (dev only) |

¹ GSAP is **not** an OSI license: free of charge for standard use including
commercial, but redistribution/repackaging of the library itself has terms —
see <https://gsap.com/standard-license>. No GSAP files are redistributed in
this repository; it is consumed as a normal npm dependency.

## Fonts

All three families are self-hosted through `next/font/google` (downloaded at
build time, served from `/_next/static` — no third-party requests at runtime,
verified by the CSP `font-src 'self'`):

| Family | Role | License |
|---|---|---|
| Geist | Body sans | SIL Open Font License 1.1 |
| Geist Mono | Technical/mono accents | SIL Open Font License 1.1 |
| Space Grotesk | Display type (hero, chapters) | SIL Open Font License 1.1 |

OFL permits use, modification, and redistribution in any project, including
commercial, with no visible attribution required (credit given above anyway).

## Implementation tooling

Parts of the implementation were produced with AI coding assistance
(Codebuff agent, GLM model by Z.ai) under Prabhat Teotia's direction:
architecture decisions, creative direction, and content are human-owned;
the agent wrote/edited code within the gated validation pipeline defined in
`docs/00_AGENT_EXECUTION_PROTOCOL.md`. All tooling (Next, Three.js, GSAP,
etc.) is credited above.

## Asset audit (Phase 19 rule: every external asset accounted for)

| Asset class | Count | Source | Attribution needed |
|---|---|---|---|
| 3D models (GLB/GLTF) | **0** | — | — |
| Textures / images | **0** shipped² | — | — |
| Audio files | **0** (audio is 100% procedural WebAudio) | — | — |
| Video | **0** | — | — |
| Fonts | 3 (above, via next/font) | Google Fonts / authors | OFL — no |
| Icons | 1 (`src/app/icon.svg`) — original "Core" aperture mark drawn for this project | original | no |

² The PNG files under `evidence/film-frames/` are **test artifacts** captured
by Playwright during validation — they are not part of the shipped bundle and
are excluded from the build. Only `icon.svg` (original work) ships.

## Inspiration policy (per docs/19)

Sites and research referenced during development (docs/research) served as
**inspiration only**. No composition, animation, copy, asset, interaction, or
3D environment was copied. All environments are procedural and parameterized
from this project's own storyboard (`src/content/storyboard.ts`).

## Vizquo credit note (per docs/19)

The Vizquo project page credits Prabhat Teotia as creator based on repository
evidence ("Created by Prabhat Teotia" in the live repo README, verified
2026-09). Repository metadata is linked on the project page so viewers can
verify contributor history themselves.
