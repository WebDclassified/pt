# DEPLOYMENT & OPERATIONS

Phase 18 deliverable — how to ship, monitor, and maintain this site.
The release pipeline it describes is automated in `.github/workflows/ci.yml`.

## Environment requirements (reproducibility)

A fresh checkout builds the site with:

- **Node.js 22** (CI pins 22; local dev tested on 22.x)
- **npm** (`npm ci` — lockfile is authoritative)
- No database, no API keys, no environment variables. The site is fully
  static-output + client-rendered 3D; `scripts/check-secrets.mjs` fails CI if
  any credential file ever appears.

```bash
npm ci
npm run validate   # typecheck → lint → contrast → secrets → build → e2e → perf
npm run dev        # local development
```

`npm run validate` is the single gate used locally and in CI. It runs e2e
against the **production build** (`next start`) — never against `next dev` —
so what is tested is what ships.

## Pre-launch checklist (from docs/18)

| Item | Status | Where |
|---|---|---|
| Production domain | **OPEN — `site.url` in `src/content/site.ts` is a placeholder (`prabhatteotia.dev`)** | content lock |
| HTTPS | Delegated to hosting platform (enforced at edge) | platform |
| Canonical host | Configure redirect after domain is chosen | platform config |
| Sitemap / robots | `src/app/sitemap.ts` / `src/app/robots.ts` generated from `site.url` | repo |
| Metadata / OG | Root layout + per-page metadata; verify OG preview once domain is live | repo |
| Favicon | `src/app/icon.svg` (The Core mark) | repo |
| Resume link | Google Drive link in content lock — verify share permission is "anyone with link" | content |
| Project URLs | 6 repos + 3 live demos, all verified 2026-09 (`CONTENT_GAPS.md`) | repo |
| Contact | `mailto:` + LinkedIn (no form, no backend, no failure mode) | repo |
| Analytics | **None by design** — CSP allows no third-party endpoints; see Monitoring below | policy |
| Error monitoring | Not wired (would require a third-party CSP slot — decision below) | open |
| Security headers | CSP, HSTS, XFO, XCTO, Referrer-Policy, Permissions-Policy (`next.config.ts`); asserted by e2e | repo |

## Deploy pipeline

```
git push → CI (GitHub Actions)
  ├─ npm ci
  ├─ validate:fast (typecheck, lint, contrast, secrets)
  ├─ build production bundle
  ├─ e2e full QA matrix (Chromium, Firefox, WebKit, Pixel 7)   [QA_MATRIX=1]
  ├─ perf audit (LCP/CLS/transfer budgets on next start)
  └─ artifacts on failure (test-results/, 7-day retention)
        ↓ green
      deploy to production (platform: Vercel recommended — zero-config
      for Next 15; any Node host works with `npm run build && npm run start`)
```

Recommended branch discipline: `main` is always deployable; PRs run the same
CI. Enable the platform's Git integration so a green `main` auto-deploys.

## Monitoring

With no third-party analytics allowed by CSP, monitoring is:

1. **Uptime** — platform-level (Vercel/Netlify provide this) or an external
   pinger hitting `/` every 5 min.
2. **Core Web Vitals** — `scripts/perf-audit.mjs` runs on every CI push
   (lab data). For field data, use CrUX / PageSpeed Insights on the live
   domain — budgets: **LCP ≤ 2500ms · CLS ≤ 0.1 · transfer ≤ 900KB**.
3. **Client errors** — the WebGL runtime is wrapped in `CanvasErrorBoundary`
   (static fallback) and routes have `error.tsx`/`global-error.tsx`. If
   wiring real error reporting later (e.g. Sentry), it requires exactly one
   CSP `connect-src` addition + the secrets scanner pattern list review —
   a deliberate, documented change, not a drive-by.

## Release discipline (before every release)

- `npm run validate` green (the pipeline enforces this on CI)
- Inspect the film: `CAPTURE_FRAMES=1 npx playwright test --project=chromium --grep film`
  then `node scripts/analyze-frames.mjs` — all 10 frames must pass gates
- Inspect mobile (Pixel 7 project runs in CI, but eyeball `/direction` and a
  project page at 320px)
- Verify content facts still hold (repos exist, demos live, availability
  status current) — see *Content maintenance*

## Content maintenance

Single source of truth — edit these, never the page markup:

| Content | File |
|---|---|
| Identity, links, resume | `src/content/site.ts` |
| Projects / case studies | `src/content/projects.ts` |
| Scene film (16 shots) | `src/content/scenes.ts` + `storyboard.ts` |
| Open questions | `CONTENT_GAPS.md` |

Never leave an outdated "available for work" status. Every content edit must
pass `npm run validate:fast` at minimum (the type system enforces required
fields — an incomplete entry will not compile).

## Known open items at launch

- `AUDIT-M7-1` — production domain placeholder in `site.ts` (blocks sitemap,
  OG, canonical URLs; the only launch blocker)
- `AUDIT-M7-2` — wallet-app stack contradiction stays published as an open
  question in `CONTENT_GAPS.md` #6 (honesty rule: do not resolve without
  evidence)
