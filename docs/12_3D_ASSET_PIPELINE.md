# Phase 12 — 3D Asset and Rendering Pipeline

## Objective

Create a production-grade asset workflow that preserves cinematic quality without destroying performance.

## Tool roles

### Blender

Use for:

- environment composition
- modeling
- materials
- camera paths
- lighting blockout
- animation

### Spline

Use selectively for:

- art-directed objects
- hero assets
- interactive object authoring

### Three.js/R3F

Use for:

- runtime scene
- camera
- interactions
- rendering
- shaders
- lifecycle

## Asset format

Prefer GLB/glTF for runtime assets.

## Compression

Use where justified:

- Draco geometry compression
- KTX2/Basis texture compression
- optimized mesh/texture resolution

## Texture discipline

Never ship unnecessary 4K assets.

Choose texture sizes based on screen-space usage.

## Geometry discipline

Use:

- instancing
- geometry reuse
- LOD where useful
- baked detail where useful

## Postprocessing

Possible:

- bloom
- vignette
- film grain
- subtle DOF
- color grading
- controlled chromatic aberration

Use postprocessing only when it improves the shot.

## No effect stacking

Avoid applying bloom + DOF + blur + chromatic aberration + film grain to every frame.

## Resource disposal

Every disposable GPU resource must have a lifecycle.

Dispose unused:

- geometries
- materials
- textures
- render targets

## Gate

PASS only when every major scene has a known asset budget and no uncontrolled memory growth across scene changes.
