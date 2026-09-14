# Phase 06 — 3D World Architecture

## Objective

Build the persistent 3D runtime that can support the entire cinematic experience without recreating the renderer for every section.

## Runtime stack

Primary:

- Next.js / React
- TypeScript
- React Three Fiber
- Three.js
- GSAP

3D production:

- Blender
- Spline selectively
- GLB/glTF assets

Advanced:

- GLSL / custom shaders
- Theatre.js where genuinely useful
- Rapier where physics adds meaning
- WebGPU/TSL in experimental areas

## Persistent canvas

Use a persistent 3D canvas for the main cinematic experience.

Conceptually:

```text
one persistent canvas
        ↓
scene manager
        ↓
current scene + next scene
        ↓
camera + lights + world state
```

Do not destroy/recreate the full renderer for every scroll section.

## Scene lifecycle

Each major scene must support a lifecycle such as:

- preload()
- enter()
- active()
- exit()
- dispose()

## State machine

Use explicit scene states, for example:

- BOOT
- INTRO
- ORIGIN
- IDENTITY
- SYSTEM
- EXPERIENCE
- PROJECT_VIZQUO
- PROJECT_QUPAY
- FAILURE
- REBUILD
- PROJECT_HILO
- PROJECT_MEDIUM
- PROJECT_BLOCK_SWAP
- SYSTEMS
- LAB
- ABOUT
- NOW
- CONTACT
- FINALE

## DOM/3D split

DOM is authoritative for:

- headings
- body text
- links
- navigation
- project details
- resume
- contact

3D is enhancement for:

- atmosphere
- metaphor
- visualization
- camera storytelling
- transitions
- interactive artifacts

## Spline rule

Use Spline for selected art-directed assets or scenes where its authoring workflow materially improves quality.
Do not create a page full of independent Spline embeds.

## Gate

PASS only if the world can move between at least the first three scenes without renderer recreation, memory leaks, or broken DOM content.
