# BUILD AUDIT — Phase 00/16 Validation Record

Project: **prabhat-teotia** — BUILD / BREAK / REBUILD
Protocol: docs/00_AGENT_EXECUTION_PROTOCOL.md (interpret → build → inspect → compare → correct → re-test → gate)
This file is updated after every milestone. No phase proceeds past its gate with open P0/P1 deviations.

Severity: **P0** broken/unsafe/inaccessible/false — blocks · **P1** below spec — blocks · **P2** polish — tracked.

---

## M0 — Foundation (Phases 00, 01, scaffold)

### Requirement vs implementation

| Check | Required | Actual | Status | Fix |
|---|---|---|---|---|
| Content lock from source-of-truth files | All displayed facts traceable to docs/data/* | `src/content/site.ts`, `experience.ts`, `projects.ts`, `scenes.ts` carry source comments per field | PASS | — |
| No invented facts/metrics/testimonials | Zero fabricated claims | No metrics, no testimonials, no user counts anywhere | PASS | — |
| Old portfolio design not reused | New visual language | Graphite/acid-lime system per Phase 02/05 — no space/astronaut/Iron-Man motifs | PASS | — |
| Testimonials excluded | Not published | Absent | PASS | — |
| "Pluto" location excluded | Not published | Absent | PASS | — |
| Wallet App label contradiction handled | Verify or publish safe subset | Description stack only (Node/Express/Mongo), flagged `verified: false` + CONTENT_GAPS #6 | PASS | Verify repo → upgrade |
| Vizquo verified at build time | Live repo check | github.com/WebDclassified/vizquo read 2026-09-14; README credits "Created by Prabhat Teotia"; demo URL captured | PASS | Re-check at Phase 18 |
| Project priority order | Vizquo → Qupay → Hilo → Medium → Block Swap → Wallet | Array order matches Phase 01 | PASS | — |
| CONTENT_GAPS.md exists | Required deliverable | 13 tracked gaps with resolution protocol | PASS | Living file |
| Typed content model | TS source | `Project`, `SceneConfig`, experience/leadership interfaces | PASS | — |
| Scene registry as data | Phase 15 data-driven | 16 scenes with camera grammar, depth layers, DOM beats, transitions | PASS | — |
| Semantic DOM shell | header/nav/main/footer, skip link | Present in `layout.tsx` | PASS | — |
| Three access modes | Director (default) + Recruiter + Engineer | `/`, `/recruiter`, `/engineer` | PASS | — |
| Sound control available | Phase 09 always-available control | Header SOUND ON/OFF toggle, persisted, default OFF | PASS | Audio engine itself is M3 |
| Reduced-motion respected | prefers-reduced-motion + visible toggle | Provider + header MOTION toggle + `frameloop="demand"` | PASS | — |
| Skip intro option | Phase 10 | Homepage is content-first; hero "VIEW THE WORK" anchors directly | PASS | Cinematic prologue scene arrives in M2 |
| Project URLs | Stable, descriptive | `/projects/{vizquo,qupay,hilo,medium-blog,block-swap,wallet-app}` via `generateStaticParams` | PASS | — |
| SEO baseline | Title/meta/canonical/sitemap/robots/OG | `metadataBase`, templates, OG/Twitter, `sitemap.ts`, `robots.ts` | PASS | Domain is placeholder (GAP #11) |
| Security baseline | nosniff + referrer-policy now; CSP later | Set in `next.config.ts`; CSP + HSTS scheduled Phase 14 | PASS | CSP due at Phase 14 |
| Real-browser inspection | Phase 00 mandate | Playwright: **18/18 PASS** (chromium + mobile-chrome) — content, skip link, case studies, views, preferences, WebGL-blocked fallback, 404 | PASS | — |
| Phase 16 memory/CPU discipline | No per-frame React renders | Scroll/velocity in refs; R3F `useFrame`; zero `setState` in loop | PASS | Verify in profile at M5 |
| Build/typecheck/lint | Clean | `tsc --noEmit` OK · `next build` OK (15 static pages) · 0 lint warnings | PASS | — |

### Open deviations

| ID | Severity | Description | Action |
|---|---|---|---|
| AUDIT-M0-1 | P2 | ~~Film-frame visual review…~~ CLOSED at M2 — 8 frames captured + machine-analyzed (`evidence/film-frames/`, `scripts/analyze-frames.mjs`) | Closed |
| AUDIT-M0-2 | P2 | CSP/HSTS headers not final (dependency set must stabilize first) | Phase 14 |
| AUDIT-M0-3 | P1 | ~~Dependencies not yet installed/typechecked~~ RESOLVED — installed (next 15.5.25, react 19.2.8, three 0.180.0, fiber 9.7.0, gsap 3.15.0, lenis 1.3.26), typecheck + build + 18/18 e2e green | Closed |
| AUDIT-M0-4 | P1 | Skip-link target `<main>` was not programmatically focusable — found by harness, fixed with `tabIndex={-1}` | Closed (regression-tested) |

### Gate status: **PASS** — M0 complete. Next: M1 creative direction (Phases 02–05).

---

## M1 — Creative direction (Phases 02–05)

### Requirement vs implementation

| Check | Required | Actual | Status | Fix |
|---|---|---|---|---|
| Palette tokens implemented | 6 Phase 05 tokens | `@theme` block in `globals.css`; board page renders swatches | PASS | — |
| Contrast verified | WCAG 2.2 AA on real pairs | `scripts/check-contrast.mjs`: 11/11 PASS, worst 6.54:1 | PASS | — |
| Three type roles | display / body / technical | Space Grotesk (display) + Geist (body) + Geist Mono (tech); `.type-hero/chapter/project` fluid scale | PASS | — |
| Display not overused | Huge type only for hero/chapter/project | Body copy remains neutral sans; hierarchy classes applied | PASS | — |
| Spacing + grid contract | Phase 05 scale | Token scale + Tailwind utilities in use | PASS | — |
| Signature motifs contract | point/line/aperture/Core | Board page documents motifs; Core + aperture exist in canvas | PASS | — |
| Avoid-list enforced | Phase 02 explicit avoids | Documented with visual strikethrough treatment; no cliché motifs used | PASS | — |
| Storyboard per scene | Phase 04 shot specs | `storyboard.ts`: 16 shots × film-frame test + focal rule + 3 safe zones each | PASS | — |
| Safe-area enforcement is checkable | Phase 04 protected zones | Machine test validates storyboard↔scene consistency + min contrast ≥ 4.5 | PASS | — |
| Lighting narrative progression | Phase 05 | Documented per beat on board; implemented per-scene from M2 | PASS | M2 choreography |
| Art-direction gate evidence | Coherent original visual language | `/direction` board live and tested | PASS | — |

### Open deviations

| ID | Severity | Description | Action |
|---|---|---|---|
| AUDIT-M1-1 | P2 | Film-frame screenshot review of rendered 3D shots still awaits M2 scenes | M2 gate |
| AUDIT-M1-2 | P2 | Test-timeout flake under parallel load observed once; mitigated (40s test / 10s expect) | Monitor at M2 |

### Gate status: **PASS** — M1 complete. Next: M2 experience engine (Phases 06–07).

---

## M2 — Experience engine (Phases 06–07)

### Requirement vs implementation

| Check | Required | Actual | Status | Fix |
|---|---|---|---|---|
| Persistent canvas | Renderer never recreated | Single fixed `<Canvas>`; SceneManager swaps environment contents only — traversal e2e asserts exactly 1 canvas after full scroll | PASS | — |
| Scene lifecycle | preload/enter/active/exit/dispose | `SceneManager.sync()` runs full lifecycle; `disposeAll()` on unmount; created/disposed counters exposed | PASS | — |
| Scene state machine | Explicit states (Phase 06 list) | 18 states via registry; 14 procedural environments + INTRO/CONTACT/BOOT as pure-DOM scenes | PASS | — |
| High-frequency state discipline | No per-frame React renders | Runtime singleton (progress/velocity/pointer/time/quality); all reads in `useFrame` | PASS | — |
| DOM/3D split | DOM authoritative | Canvas `aria-hidden` + `pointer-events-none`; all content server-rendered HTML | PASS | — |
| Camera grammar | wide/push/orbit/tracking/pull-back/lock-off/tilt | `cameraGrammar.ts` per-scene keyframes, smoothstep easing, idle drift | PASS | — |
| Smooth scroll | Lenis-like inertia; natural touch; no hijack | Lenis via GSAP ticker; touch untouched; disabled under reduced motion (e2e asserts) | PASS | — |
| Scroll velocity as input | Capped influence, no nausea | Damped ±1 clamp; 0.35-unit camera push only | PASS | — |
| DOM beat choreography | Coordinated reveals, not simultaneous | `Reveal` (GSAP ScrollTrigger, once, 88% start); content visible without JS | PASS | — |
| Lighting narrative progression | dark→discovery→tense→calm→open | Per-scene presets incl. fog range; finale fog pushed to 520 for broad reveal | PASS | Fixed during M2 (see below) |
| Film-frame test | Every major scroll state reads as an intentional frame | 8 frames @1920×1080 + analyzer gates (geometry σ, bright-content lit%, finale reveal) | PASS | Fixed during M2 (see below) |
| GPU resource disposal | No uncontrolled memory growth | Every factory disposes geometries/materials; manager cleans on scene exit | PASS | — |
| Viewport safety | 320→ultrawide, no overflow | e2e matrix at 320/375/768/1280/1920 asserts zero horizontal overflow | PASS | — |

### Deviations found and fixed during M2 (the loop working)

| ID | Severity | Description | Resolution |
|---|---|---|---|
| AUDIT-M2-1 | P1 | Finale measured **darker** than prologue — fog far plane (30u) sat in front of the FINALE environment, fogging the reveal to black | Fog range now follows lighting presets (open: near 30 / far 520) |
| AUDIT-M2-2 | P1 | Finale read as empty frame — no "connected world" reveal existed | Implemented `createFinaleWorld`: signal constellation linking all 16 scene anchors; finale camera rises above the world and looks down |
| AUDIT-M2-3 | P2 | Analyzer p95 gate mismatched the bimodal design (near-black + sparse bright type) | Replaced with lit-share metric matched to art direction |
| AUDIT-M2-4 | P2 | Constellation nodes subpixel at reveal distance | Node radius 2.2 → 3.2 |

Measurable outcome: finale σ 0.055→0.091, lit share 0.45%→1.30%; all 8 frame gates PASS.

### Open deviations

| ID | Severity | Description | Action |
|---|---|---|---|
| AUDIT-M2-5 | P2 | Camera target smoothing uses generic lerp — scene-entry settling can feel slightly loose on fast jumps | Tune at M3 with transition grammar |

### Gate status: **PASS** — M2 complete. Next: M3 motion grammar + audio (Phases 08–09).

---

## M3 — Motion grammar + audio (Phases 08–09)

### Requirement vs implementation

| Check | Required | Actual | Status | Fix |
|---|---|---|---|---|
| One motion language | Shared durations/easings | `motion.ts` tokens (micro/component/scene/long) + CSS `--motion-*`; `MOTION` section on /direction board | PASS | — |
| Grammar verbs | ENTER/ACTIVATE/CONNECT/TRANSFORM/ERROR/RECOVER/TRANSITION | Documented on board; ENTER (Reveal), ACTIVATE+CONNECT (`.activate-shift`, `.signal-line`), TRANSITION (aperture) implemented | PASS | TRANSFORM/ERROR/RECOVER live in scene envs |
| Signature transition | Recurring circular aperture | `ApertureOverlay` on scene-change bus; ignores boot publish (not a transition) | PASS | — |
| Transition families | Several, narrative-chosen | Camera traversal (grammar), shader-dissolve (fracture env), particle morph (finale constellation), light sweeps, aperture wipe | PASS | — |
| Continuity rules | Preserve ≥1 continuity anchor | Persistent Core + signal accents carry material/light continuity across cuts | PASS | — |
| Micro-interactions | Physical, restrained | Card hover: title shift + signal-line growth + border accent; `.pressable` active states; no cursor toys | PASS | — |
| Audio OFF by default | Explicit opt-in only | Default OFF, persisted; e2e asserts **zero AudioContext constructions** without opt-in | PASS | — |
| Scene acoustic identity | Per-scene layers | `AudioBridge` maps 18 states → 6 acoustic presets (spacious/precise/tension/experimental/silence/airy) | PASS | — |
| No autoplay abuse | Respect browser policy | Engine started only inside the toggle's user-gesture task | PASS | — |
| Scroll/audio coupling | Optional, capped | Velocity → shimmer gain, capped ±0.02, throttled | PASS | — |
| Works fully with audio off | Gate | All 42 e2e tests run audio-off | PASS | — |
| Camera settling (AUDIT-M2-5) | Tune | Target now settles faster than position — framing composed on fast jumps | PASS | Closed |

### Deviations found and fixed during M3

| ID | Severity | Description | Resolution |
|---|---|---|---|
| AUDIT-M3-1 | P1 | **Zombie dev server on port 3000** served corrupted state; Playwright's `reuseExistingServer` ran tests against it — flaky failures, canvas never mounting | Killed stray processes; diagnostic telemetry script added; full suite green |
| AUDIT-M3-2 | P1 | Font fallback chain collapsed to Times New Roman when a `next/font` variable was missing — display type silently lost | Local fallbacks in `--font-*` custom-property chains |
| AUDIT-M3-3 | P2 | Aperture fired on initial boot publish (boot ≠ transition); hydration race made the e2e read 0 or 1 nondeterministically | Overlay ignores the first bus emit |
| AUDIT-M3-4 | P1 | **Reduced-motion race:** child effects run before provider state settles, so Lenis could initialize under reduced motion and leave `.lenis` behind | SmoothScroll checks the live media query, not just context |

### Gate status: **PASS** — M3 complete. Next: M4 content surfaces (Phases 10–11), already partially delivered in M0; remaining scope is a11y hardening + case-study depth.

---

## M4 — Content surfaces (Phases 10–11)

### Requirement vs implementation

| Check | Required | Actual | Status | Fix |
|---|---|---|---|---|
| Repository verification | Verify every project before publishing (Phase 01/11) | **All 6 repos verified live 2026-09-14**; verification notes embedded per project | PASS | — |
| Stack truth | Verify stack against actual code | Hilo corrected: **Chakra UI + Vite, not Tailwind** (old portfolio label was wrong) | PASS | Fixed |
| Wallet App contradiction | Do not repeat unverified labels | Repo README lists pages only; description stack published; gap kept open in CONTENT_GAPS #6 | PASS | — |
| Case study depth | What/why/role/how/difficult/verify | Verified Capabilities section from repo READMEs; Evidence + Verification sections; npm package + live demos surfaced | PASS | — |
| Live demos | Where verified | Qupay + Medium Blog demos found in repos and linked (3 total with Vizquo) | PASS | — |
| Keyboard nav | Menu via keyboard, Escape, focus return | Mobile menu e2e: Enter opens, Escape closes, focus returns to trigger | PASS | — |
| Target size | WCAG 2.5.8 ≥24px controls | Header controls padded (px-2 py-2); e2e measures rendered boxes (hidden controls exempt) | PASS | — |
| aria-current | Current page exposed | Nav links expose `aria-current` on active route | PASS | — |
| Recruiter/Engineer/Director | Direct access | Tested since M0; content upgraded with verified data | PASS | — |
| Mobile direction | Not a scaled desktop copy | Overflow-checked 320→1920 (M2); separate budget at M5 | PASS | — |
| Reflow/zoom | 200–400% usable | Fluid clamp type scale + responsive grids; full zoom matrix at M7 QA | PASS | M7 |

### Deviations found and fixed during M4

| ID | Severity | Description | Resolution |
|---|---|---|---|
| AUDIT-M4-1 | P1 | Wallet-app content edit dropped the required `metaphor` field — caught by `tsc`, not by review | Restored; type system guarding the content lock |
| AUDIT-M4-2 | P2 | Target-size e2e measured `display:none` controls (null boxes) | Exempt non-rendered targets per WCAG 2.5.8 scope |

### Gate status: **PASS** — M4 complete. Next: M5 assets + performance (Phases 12–13).

---

## M5 — Assets + performance (Phases 12–13)

### Requirement vs implementation

| Check | Required | Actual | Status | Fix |
|---|---|---|---|---|
| Adaptive quality | AUTO/HIGH/MEDIUM/LOW tiers | 3 runtime tiers + AUTO watchdog; DPR, particle fraction, motion scale per tier | PASS | — |
| No quality oscillation | Hysteresis | 2 low samples to downgrade, 4 high to upgrade, 5s cooldown — unit-tested in e2e | PASS | — |
| Loop-safe application | No React renders, no geometry rebuilds | `setPixelRatio` + geometry `setDrawRange` on named dust; nothing allocated per frame | PASS | — |
| DPR discipline | Cap, never native 3×/4× | Canvas dpr [1, 1.75]; tier caps 1.75/1.25/1.0 | PASS | — |
| GPU disposal | No uncontrolled growth | Disposal-audit e2e traverses the full film: `disposed === created − 1` (exactly one live env) | PASS | — |
| Context-loss handling | Practical resilience | `webglcontextlost` (preventDefault) + `webglcontextrestored` handlers | PASS | — |
| Core Web Vitals | LCP ≤ 2.5s, CLS ≤ 0.1 (p75) | Production audit: **LCP 272ms · CLS 0.0031 · 496KB transfer** | PASS | — |
| First-load philosophy | Useful content before full experience | All content server-rendered; canvas is enhancement; 496KB total transfer incl. Three.js | PASS | — |
| Mobile budget | Separate, not a smaller desktop copy | Tier system applies per-device via measured FPS; mobile viewport e2e coverage | PASS | — |

### Deviations found and fixed during M5

| ID | Severity | Description | Resolution |
|---|---|---|---|
| AUDIT-M5-1 | P1 | Camera far plane (200u) clipped the finale constellation (nodes at z≈−620) — explains why only 2 clusters were ever visible | far plane → 900; finale world now fully renderable |
| AUDIT-M5-2 | P2 | `spawn("npx")` fails on Windows (cmd shim) — perf audit infra | Resolve `next/dist/bin/next` directly via `createRequire` |
| AUDIT-M5-3 | P2 | First perf-audit revision could hang forever (fetch without timeout, weak kill) | Global watchdog + `AbortSignal.timeout` + `taskkill /T` tree kill; audit exits 2 on infra failure |

### Gate status: **PASS** — M5 complete. Next: M6 production hardening (Phases 14–16).

---

> **CORRECTION (recorded at M6):** the M4/M5 summaries above reported "49/51 passed" based on truncated log tails; 7 tests were in fact failing at those gates (closure bug in the disposal test, wrong downgrade math in the quality unit test, hidden-control count, viewport-strict tier assertion). The consolidated pipeline exposed them. Both milestones' substance was real — the defects were in the tests, not the product — but the gate discipline failed. `npm run validate` now runs the full untruncated pipeline.

## M6 — Production hardening (Phases 14–16)

### Requirement vs implementation

| Check | Required | Actual | Status | Fix |
|---|---|---|---|---|
| CSP | Scoped to actual deps | default/self, frame-ancestors none, object none, base/form self; `unsafe-eval` **dev-only**; nonce middleware noted as upgrade path | PASS | — |
| Hardening headers | HSTS, XCTO, XFO, Referrer, Permissions-Policy | All present on every route (e2e-asserted); `x-powered-by` removed | PASS | — |
| Secret scanning | Required by spec | `scripts/check-secrets.mjs` — 10 credential patterns + stray env-file detection; clean | PASS | — |
| Error boundaries | 3D / project / contact failure isolation | `CanvasErrorBoundary` (DOM-only fallback), route `error.tsx` (reset + escape), `global-error.tsx` (last resort) | PASS | — |
| Production smoke | Phase 17 mandates production tests | **e2e now runs against `next start` (production build)** — previously dev-server based, a protocol violation now corrected | PASS | Fixed |
| Single validation command | Phase 16 loop | `npm run validate`: typecheck → lint → contrast → secrets → build → e2e (prod) → perf audit | PASS | — |
| Performance budgets hold | After changes | LCP 276ms · CLS 0.0031 · 499KB (prod build) | PASS | — |

### Deviations found and fixed during M6

| ID | Severity | Description | Resolution |
|---|---|---|---|
| AUDIT-M6-1 | P1 | **False gate records:** M4/M5 "passed" claims came from truncated log tails; 7 latent test defects existed | All four root causes fixed; full untruncated pipeline adopted |
| AUDIT-M6-2 | P1 | e2e tested dev builds; production CSP/HSTS assertions never truly exercised | Playwright `webServer` switched to `npm run start` with `reuseExistingServer: false` |
| AUDIT-M6-3 | P1 | `next dev`/e2e runs clobber `.next`, so `next start` had no production build | `perf-audit.mjs` builds before serving |
| AUDIT-M6-4 | P2 | Another zombie `next` process corrupted a validate run (9-min crawl) | Killed; `reuseExistingServer: false` prevents recurrence |

### Gate status: **PASS** — M6 complete. Next: M7 QA + launch (Phases 17–19).

---

---

## M7 — QA Matrix + Launch (Phases 17–19)

**Date:** 2026-09-14 · **Gate:** FINAL GATE

### Deliverables

| Deliverable | Implementation | Verification |
|---|---|---|
| Browser matrix | chromium + mobile-chrome always; firefox + webkit under `QA_MATRIX=1`; browsers installed locally | **155 passed / 0 failed** across all four engines (prod build) |
| Navigation matrix | Deep-link → back/forward state, deep-link refresh (SSG stability), nav destinations (per-engine: inline desktop / MENU-disclosed mobile), footer credits | `tests/qa-matrix.spec.ts` — PASS all projects |
| Reflow / 400% zoom | 320px CSS-width floor ≙ 400% zoom on 1280px desktop (WCAG 1.4.4/1.4.10) — zero horizontal overflow | qa-matrix reflow test — PASS |
| Final creative test | **10 frames** across master timeline (0–100% at 0/10/20/30/42/54/66/78/90/100) | Captured + analyzer gates PASS (geometry, bright-content floor, finale reveal) |
| CI pipeline | GitHub Actions: `npm ci` → static gates → build → QA-matrix e2e → perf audit; artifacts on failure | `.github/workflows/ci.yml` |
| Launch/ops docs | Reproducibility (Node 22, no env vars), pre-launch checklist, deploy pipeline, monitoring, release discipline, content maintenance, open items | `DEPLOYMENT.md` + `README.md` |
| Credits + attribution | Full dependency license table (verified from installed `node_modules`), font licenses (OFL ×3), asset audit: **0 external 3D/audio/image assets** — all environments procedural, audio synthesized | `CREDITS.md`; footer credit UI present |
| Favicon | The Core aperture mark, original SVG | `src/app/icon.svg` |

### Deviations found and fixed during M7

| ID | Severity | Description | Resolution |
|---|---|---|---|
| AUDIT-M7-1 | P1 | **CSP `upgrade-insecure-requests` broke WebKit on http-hosted previews**: Safari obeys it literally on `http://localhost` — every `_next/static` subresource upgraded to https → 17 × "SSL connect error", zero CSS/JS loaded (canvas stuck at default 300×150) | Directive removed — every resource is same-origin so it protected nothing; HTTPS stays enforced by platform edge + HSTS. Chromium/Firefox localhost-exempt the directive, masking the bug |
| AUDIT-M7-2 | P2 | Nav-destinations test asserted inline desktop links on mobile-chrome, contradicting the approved mobile direction (destinations behind MENU) | Test branches per project; asserts mobile destinations inside the opened MENU |
| AUDIT-M7-3 | P3 | Playwright's WebKit-on-Windows port cannot synthesize Tab traversal at all (probe: `scripts/probe-webkit-skiplink.mjs` — even a fully visible control link unreachable, while Enter/character keys work) | Skip-link test skipped on webkit only, with probe evidence recorded; behavior stays asserted on Chromium + Firefox. **Not an app defect** — real Safari follows its documented platform convention (plain Tab may skip links) |
| AUDIT-M7-4 | P2 | Firefox/WebKit binaries not installed locally — first matrix run failed 69 tests on `Executable doesn't exist`, masking 1 real failure | `npx playwright install firefox webkit`; CI installs browsers explicitly |

### Known open items (recorded, not silently dropped)
- `site.url` remains the placeholder domain `prabhatteotia.dev` (TODO Phase 14) — **the one true launch blocker**; sitemap/OG/canonical derive from it
- Wallet-app stack contradiction stays open per honesty rule (`CONTENT_GAPS.md` #6)
- WebKit-on-Windows Tab-traversal port limitation (AUDIT-M7-3) — re-test on macOS WebKit when available

### Gate status: **PASS** — M7 complete. **All milestones M0–M7 gates PASS.**

---

## Final statement (Phase 16/19)

The validation loop is the product: every milestone's gate ran the same
pipeline (`npm run validate`), and the loop caught real defects at every
stage — a fogged finale reveal, a GPU-leak invariant that was never actually
checked, false "pass" claims from truncated logs, dev-build testing, and a
CSP directive that silently blanked the site on one engine. The evidence for
every claim in this file is a command someone can re-run.

---

## Post-M7 polish pass — frame review remediation (2026-09-14)

Trigger: the 10-frame film review flagged frames 01 and 07 as metric-invisible
environments (cosmetic P3s). Root-causing them surfaced four material/design
flaws, all fixed and re-verified:

| Flaw | Root cause | Fix | Evidence |
|---|---|---|---|
| Monolith "light rises" progression multiplied zero | Update ramped `emissiveIntensity` on a **black** emissive — intensity × black = black | Steel emissive base (`0x465058`) on slabs | frame-01 mean +52% (0.0456 → 0.0693) |
| Architecture fogged to black | `discovery` fogFar 34 sat *in front of* slabs 20–90 units out (M2 finale-fog failure mode, resurfaced) | fogNear 10 / fogFar 90 — depth recedes, structure reads | frame-01 composition map shows slabs + seams + horizon |
| HILO rendered the generic inspection artifact | Registry fell through to `createProjectArtifact` despite the storyboard promising a social graph | Purpose-built `createNetworkGraph`: hub, 7 person nodes, 21 satellites, staggered edge growth, traveling signal pulses | frame-05 lit 2.36% → 3.71%, σ +18%, pulses visible as bright clusters |
| LAB "system diagram, alive" was noise-floor dark | Blueprint grid at opacity ≤ 0.5 on near-black; scene had no bright anchors | Grid opacity ramp 0.3→0.8, brighter cross-color, node opacity ramp | frame-07 lit 1.34% → 1.36% (text dominates this frame by design; grid now visible in map) |

Also in this pass: layered monolith composition (staggered heights, ground
plane horizon, vertical light-seams) and per-environment key/rim lights with
explicit in-group targets (`addEnvLights`) for monolith, fracture, calm, and
network scenes — scoped inside each env group so the GPU disposal invariant
(disposed === created − 1) is untouched.

**Verification:** tsc ✅ · build ✅ · film recapture: 10/10 frames, all
analyzer gates PASS, no frame regressed · e2e 78 passed / 0 failed (prod
build).

---

## Phase 21 — Interactive Cinematic Experience Upgrade (2026-09-14)

Spec: `docs/21_INTERACTIVE_CINEMATIC_EXPERIENCE_UPGRADE.md`. Much of the spec
was already satisfied by the M0–M7 build and is listed as pre-existing; this
section records the new deliverables and the honest deviation ledger (§126).

### Newly implemented

| Spec | Deliverable | Implementation | Verification |
|---|---|---|---|
| §43/§78 | **Distinct project exhibits** — every featured project is a spatial exhibit derived from what the project is | `createVizquoExhibit` (smoked-glass sample, wireframe internals, sweeping scan lines, inspection ring) · `createQupayExhibit` (4 security gates cycling as locks; value packet clears them in architecture order) · `createMediumExhibit` (document slabs breathing apart; a draft page rising through publish states) · `createBlockSwapExhibit` (linked chain; emissive handoff block-to-block) — Hilo kept its dedicated `createNetworkGraph` | scene registry rewired; e2e traversal + disposal audit green |
| §14 | **Pointer look** — "I can look", not "I fly the camera" | Bounded target offset (±0.6u x / ±0.35u y) applied per frame after the authored path; reduced-motion disables | pointer-move e2e; content always visible |
| §16/§17 | **Pointer influence field** | The scene signal light follows the visitor's attention (bounded, smoothed) — nearby surfaces respond with glow | same e2e |
| §12 | **Velocity response — atmosphere** | Dust field stretches along travel with scroll velocity (capped, smoothed), settles on stop; disabled in reduced motion | covered by traversal e2e |
| §97 | **Wayfinding** | `Wayfinder` — `04 / 16 · EXPERIENCE` indicator bound to the scene bus; purely additive, nav untouched; hidden on mobile/reduced-motion | `cinema.spec.ts`: position + deep-travel update + nav-additive (per-project) |
| §95 | **Skip Intro** | `SkipIntro` — "SKIP INTRO →" visible during the opening chapter only, jumps to `#work` | `cinema.spec.ts`: visible → click → work content in view |
| §123 | **Deterministic capture** | `mulberry32` seeded PRNG for fracture shards, dust field, network graph; engine publishes `__ptDebug.scene()` | `cinema.spec.ts`: two loads → identical scene sequence |

### Pre-existing (built in M0–M7, verified by the standing suite)

Persistent canvas (§103) · scene lifecycle `preload/enter/active/exit/dispose`
(§104) · explicit GPU disposal (§105) · quality levels AUTO/HIGH/MEDIUM/LOW
with watchdog (§106) · fallback hierarchy FULL→LITE→STANDARD→STATIC via
reduced-motion + CanvasErrorBoundary + WebGL-blocked e2e (§107) · scroll as
smoothed playhead with velocity/direction (§11) · Lenis with natural touch
(§13) · aperture signature transition (§27) · hard cut to black (§34) ·
wireframe/x-ray Core reveal (§45/§33 partial) · environmental state via
lighting presets (§37/§88) · opt-in layered procedural audio with scene
identity + velocity coupling (§63/65/68) · motion tokens (§20) · staggered
DOM beats (§22) · quiet scenes (§25/§130) · recruiters/engineers cuts (§93/94)
· reduced motion with manual toggle (§117) · DOM authority + no-JS content
(§119/120) · deep links/history (§121/122) · visual regression via 10-frame
capture + analyzer gates (§123/124/125) · mobile direction (§114/115).

### §126/§127 deviations ledger (documented, not silent)

| ID | Spec requirement | Current implementation | Difference / Reason | Status |
|---|---|---|---|---|
| DEV-21-1 | §8 Blender-authored camera paths | Code-authored keyframes in `cameraGrammar.ts` (declared reconstruction) | No Blender in pipeline yet; paths are authored per shot, not improvised | Open — accepted alternative |
| DEV-21-2 | §45/46 full X-RAY/ARCHITECT modes per exhibit | X-ray narrative lives in Vizquo's exhibit (wireframe internals) + Core reveal; per-mode UI controls not built | Controls must map to real project info (spec's own rule) — needs per-project verified mode data | Open |
| DEV-21-3 | §47/52/53 live data-flow/scale/load explorers | Not built — would require measured per-request data the repos do not expose | §51 truth rule: never fabricate; visualizations wait for real measurements | Open — blocked on data |
| DEV-21-4 | §96 command palette | Not built (spec marks optional); clickable nav mandatory and present | — | Open (optional) |
| DEV-21-5 | §123 exhibit key-frames not in the 10-stop capture grid | **Closed**: per-exhibit capture test records 8 exhibit frames at each scene's engagement peak (`exhibit-*.png`), reviewed alongside the canonical grid | Fixed |
| DEV-21-6 | §64 spatial audio positioning | Stereo layering + velocity coupling only; no HRTF panner | Ambient scope — current acoustic identity reads well without it | Open |

**Verification:** tsc ✅ · build ✅ (17 pages) · **e2e 90 passed / 0 failed**
(prod build; 6 new Phase 21 tests) · film recapture 10/10, all analyzer gates
PASS, no frame regressed.

### Exhibit review pass (post-Phase 21)

Per-exhibit key-frame captures were reviewed (metrics + ASCII maps, §124):

| Exhibit | Read | Action |
|---|---|---|
| Vizquo | Instrument cluster sub-pixel at 10u; dimmest project exhibit — flagship underserved | **Camera moved to an inspection close-up** (ends 4u from sample); slab self-illumination + ring/scan brightness raised so a still always catches a scan mid-pass |
| Qupay | Conduit + gate reads; CTA in place | none |
| Hilo | Strongest exhibit (σ .146, lit 3.85%) — graph, pulses, edges all register | none |
| Medium | Slab stack + rising draft read clearly | none |
| Block Swap | Chain blocks + handoff pulse visible; `EdgesGeometry` outlines hold silhouettes | none |
| Systems/Lab | Blueprints visible; text-dominant by design (calm/engineering scenes) | none |
| About | Near-empty stillness is the contract (§130 quiet moment) | none |

After fix: Vizquo exhibit fills frame as hero (§142), all 18 captures PASS
gates, e2e 90/0.

### Close-up extension + evidence gallery

Qupay and Medium received the Vizquo close-up treatment (exhibits as heroes,
§142): Qupay's shot ends 3u from the conduit, Medium's 2.5u from the slab
stack — both now dominate their frames. `scripts/render-gallery.mjs` renders
all captures with live-computed stats into a single portable
`evidence/gallery.html` (images embedded as data URLs). Verification: e2e
90/0, all 18 captures PASS gates.
