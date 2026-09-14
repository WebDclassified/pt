# Phase 07 — Camera, Smooth Scroll, and Cinematic Timeline

## Objective

Make scroll act as the film playback head.

## Scroll model

Use a normalized experience timeline:

`0 → 1`

and scene-local timelines within it.

The system may consume:

- scroll progress
- scroll velocity
- scroll direction
- pointer position
- pointer velocity
- time

## Smooth scroll

Desktop may use Lenis or GSAP ScrollSmoother if testing shows it improves the experience.

Touch should preserve natural direct manipulation. Do not make touch feel like a delayed fake-scroll system.

## Scroll velocity

Fast movement can influence:

- particle streaking
- camera acceleration
- atmospheric motion
- audio intensity
- small object lag

Cap velocity influence to avoid nausea.

## Camera path

Prefer authored camera composition in Blender for major shots.
Export camera-path data or reconstruct equivalent authored paths in Three.js.

## Camera physicality

Large objects should feel heavy.
Small objects should feel responsive.

Do not make the entire world springy.

## Timeline choreography

Each major transition should coordinate:

- camera
- main object
- typography
- light
- environment
- shader
- audio

Use offsets/stagger rather than starting everything simultaneously.

## Suggested motion scale

Micro UI: ~100–300ms.
Component: ~250–800ms.
Major scene transitions: ~700–2000ms.
Long hero camera shots: potentially 1–4 seconds or more when story demands.

These are starting ranges; tune visually.

## Scroll snapping

Use only for narrative beats where a gentle snap improves composition.
Never trap the user in a slideshow.

## Gate

PASS only when scrolling feels like controlled cinematic inertia rather than lag, rubber-banding, or scroll hijacking.
