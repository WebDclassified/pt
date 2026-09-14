# BUILD / BREAK / REBUILD

The portfolio of **Prabhat Teotia** — a cinematic, scroll-driven 3D film that
builds a world, breaks it, and rebuilds it. Sixteen scenes, one persistent
WebGL canvas, zero template energy.

## Quick start

```bash
npm ci
npm run dev          # http://localhost:3000
```

Requirements: Node 22. No env vars, no database, no API keys.

## Validation (the only way changes ship)

```bash
npm run validate     # full pipeline — must pass before any commit
npm run validate:fast  # typecheck + lint + contrast + secrets (fast loop)
```

The pipeline: **typecheck → lint → contrast gate (11 pairs, AA) → secrets
scan → production build → e2e (production server) → perf audit (LCP/CLS/
transfer budgets)**.

- E2E runs against `next start` (production build), never dev — CI enforces
  this via `playwright.config.ts` (`reuseExistingServer: false`).
- Full browser matrix (Firefox/WebKit + mobile) activates with
  `QA_MATRIX=1 npm run test:e2e`; default runs are Chromium + Pixel 7.
- Perf budgets: LCP ≤ 2500ms, CLS ≤ 0.1, transfer ≤ 900KB — measured on a
  real production server by `scripts/perf-audit.mjs`.

## Film-frame review loop

```bash
CAPTURE_FRAMES=1 npx playwright test --project=chromium --grep film
node scripts/analyze-frames.mjs
```

Captures 10 frames across the master timeline into `evidence/film-frames/`
and runs objective gates (luminance progression, lit-share, variance) plus
ASCII composition maps. Used before every release per `docs/16`.

## Architecture (docs/15 is the contract)

```
src/
  content/       # Content lock — site.ts, projects.ts, scenes.ts, storyboard.ts
                 # (the ONLY place facts live; type system enforces shape)
  lib/           # Engine: runtime, timeline, cameraGrammar, sceneManager,
                 # environments, quality, motion, audio, sceneBus
  components/    # Experience (persistent canvas), ApertureOverlay, Reveal,
                 # SmoothScroll, AudioBridge, CanvasErrorBoundary, chrome
  app/           # Next App Router: /, /projects/[slug], /direction,
                 # /recruiter, /engineer, error/global-error boundaries
tests/           # Playwright: smoke, experience, motion, performance,
                 # security, qa-matrix — 66 tests, 3 browsers in CI
scripts/         # check-contrast, check-secrets, analyze-frames, perf-audit
```

Key invariants the tests prove:

- Exactly one canvas persists across the entire 16-scene traversal;
  environments mount/unmount through the `preload → enter → active → exit →
  dispose` state machine with zero GPU leaks (`disposed === created − 1`).
- Zero `AudioContext` construction unless the user opts in.
- Reduced motion: no Lenis, no cinematic autoplay — content stays readable.
- Security headers present on every response (asserted by e2e).

## Docs

Build protocol, phases, and gates live in `docs/`. Status and evidence:
`BUILD_AUDIT.md`. Launch/ops: `DEPLOYMENT.md`. Attribution: `CREDITS.md`.

© Prabhat Teotia — concept, direction, content, and engineering.
