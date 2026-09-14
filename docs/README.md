# Prabhat Teotia — Cinematic Portfolio Agent Build Specification

## Purpose

This package is the authoritative execution specification for rebuilding Prabhat Teotia's software-developer portfolio as a cinematic, IMAX/4D-inspired, smooth-scroll, multi-scene interactive web experience.

This is **not** a redesign of the previous portfolio. The previous portfolio is used only as a source of factual/profile/project data. Its old visual design, layout, illustrations, 3D models, color system, animations, and interaction patterns are explicitly **not** design references for the new portfolio.

## Core concept

**BUILD / BREAK / REBUILD** — an interactive short film about how Prabhat thinks, builds software, encounters complexity, experiments, and improves systems.

The portfolio should feel like a premium interactive film:

- cinematic camera choreography
- persistent 3D environments
- Blender-authored composition and camera paths
- Three.js + React Three Fiber runtime
- selective Spline-authored assets
- GSAP-driven timeline choreography
- scroll velocity as an input signal
- layered depth and parallax
- shader-driven transitions
- carefully controlled micro-interactions
- optional spatial/ambient audio
- responsive mobile director's cut
- recruiter-safe direct navigation
- accessible DOM content underneath the cinematic layer
- adaptive GPU quality
- WebGL as the broad production baseline; WebGPU/TSL as progressive/experimental enhancement

## Non-negotiable execution rule

The agent must **not** stop after creating the first implementation.

For every phase:

1. Read the phase completely.
2. Implement the requirements.
3. Run the phase validation checklist.
4. Compare the implementation against the exact requirements.
5. Produce a deviation list.
6. Fix every deviation that can be fixed.
7. Re-run validation.
8. Repeat until the phase gate passes.
9. Only then proceed to the next phase.

A phase is not complete because the code runs. It is complete only when the implementation demonstrably matches the specification and its validation gate passes.

## Source-of-truth hierarchy

1. `data/PROFILE_SOURCE_OF_TRUTH.md` — personal/project facts extracted from the uploaded previous portfolio.
2. `data/VIZQUO_VERIFIED_DATA.md` — current public facts verified for Vizquo.
3. `00_AGENT_EXECUTION_PROTOCOL.md` — the mandatory iteration/quality-control process.
4. numbered phase files — implementation requirements.
5. research notes — rationale and external standards.

When any design decision conflicts with factual data, preserve the factual data.

When a requested fact is missing, **do not invent it**. Use a clearly marked placeholder or omit it and record it in the content-gap report.

## Credits / attribution

All portfolio work, project ownership, profile information, and final creative/engineering credit must belong to:

**Prabhat Teotia**

Third-party libraries, frameworks, assets, fonts, models, sounds, snippets, tutorials, inspirations, and services must receive appropriate attribution/license compliance as applicable. Never imply third-party work is authored by Prabhat.

## Suggested execution order

`00 → 01 → 02 → 03 → 04 → 05 → 06 → 07 → 08 → 09 → 10 → 11 → 12 → 13 → 14 → 15 → 16 → 17 → 18 → 19`

The agent may split any phase into sub-phases if complexity warrants it, but must preserve the phase gates and verification loop.
