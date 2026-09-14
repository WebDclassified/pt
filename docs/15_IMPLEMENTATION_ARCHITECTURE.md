# Phase 15 — Production Implementation Architecture

## Recommended architecture

```text
                         NEXT.JS / REACT
                                │
            ┌───────────────────┼───────────────────┐
            │                   │                   │
           DOM              EXPERIENCE           ROUTING
            │                   │                   │
      semantic content       R3F canvas        project URLs
      accessibility              │              metadata
      SEO                        ▼
      forms                   THREE.JS
      case studies               │
                              WebGL
                              shaders
                              camera
                              physics
                              post FX
            │                   │
            └──────────┬────────┘
                       │
                   MASTER TIMELINE
                       │
           ┌───────────┼───────────┐
           ▼           ▼           ▼
         GSAP        SCENE       AUDIO
                    STATE        ENGINE
                       │
                BLENDER / SPLINE
                       │
                   optimized GLB
```

## Content architecture

Keep project data in a structured source.

Recommended project fields:

- id
- slug
- title
- summary
- role
- year
- category
- stack
- image
- demo
- repository
- status
- caseStudy
- verified

## Experience engine

Scene configuration should be data-driven where practical.

Example conceptual model:

```ts
SceneConfig {
  id,
  duration,
  environment,
  cameraPath,
  objects,
  lighting,
  domBeats,
  audio,
  transitionIn,
  transitionOut,
  qualityBudget
}
```

## High-frequency state

Use mutable runtime state/refs for:

- scroll velocity
- pointer position
- animation progress
- camera interpolation
- particle systems

Avoid React re-rendering on every frame.

## Routing

Deep links must work.
Refreshing a project URL must work.
Back/forward navigation must work.

## Error boundaries

Provide robust fallback boundaries for:

- 3D runtime failure
- project content failure
- contact submission failure

## Gate

PASS only when the application structure is understandable and a new engineer can add a project/scene without rewriting the whole experience.
