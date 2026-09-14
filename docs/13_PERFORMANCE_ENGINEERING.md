# Phase 13 — Performance Engineering

## Objective

Make a visually extreme 3D portfolio behave like a professionally engineered web application.

## Core Web Vitals targets

Target good:

- LCP ≤ 2.5 s
- INP ≤ 200 ms
- CLS ≤ 0.1

at the 75th percentile where measurable.

## First-load philosophy

Load:

1. semantic HTML
2. critical typography
3. critical identity
4. small hero 3D
5. next scene assets
6. secondary/lab assets on demand

Never require the browser to download the entire experience before showing useful content.

## Scene streaming

Prefer:

`current scene + next scene`

rather than loading every major environment at once.

## Adaptive quality

At minimum support internally:

- AUTO
- HIGH
- MEDIUM
- LOW

Adjust:

- pixel ratio
- shadows
- particle count
- postprocessing
- texture quality
- physics
- reflection quality

## Pixel ratio

Cap device pixel ratio for heavy scenes.
Do not blindly render at native 3×/4× DPR.

## GPU metrics

Measure:

- frame time
- FPS / frame pacing
- draw calls
- triangles
- texture memory where observable
- scene memory behavior

## Main-thread discipline

Avoid driving every render-frame update through React state.
Use refs, animation loop state, GSAP values, or other high-frequency-safe techniques.

## DOM scroll effects

Use native CSS scroll-driven animation for simple effects when browser support/requirements permit.
Use GSAP/JS for complex coordinated 3D choreography.

## Fallback

If WebGL fails or performance is poor:

- keep DOM content
- use static/2D visuals
- disable expensive effects
- preserve navigation

## Mobile

Mobile should be a separate performance budget, not a smaller desktop copy.

## Gate

PASS only when realistic desktop and mobile tests show stable interaction, no catastrophic frame drops, no runaway memory growth, and usable first content without waiting for the whole 3D experience.
