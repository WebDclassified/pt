# Phase 16 — Continuous Self-Validation and Correction

## Objective

Force the build agent to verify its own work repeatedly instead of stopping at “looks good.”

## Required validation record

Create `BUILD_AUDIT.md` after every major milestone.

Include:

### Functional

- navigation
- project links
- resume
- contact
- deep links
- back button
- mobile menu
- sound control
- motion control
- recruiter/direct access

### Visual

- composition
- typography
- spacing
- lighting
- scene continuity
- focal hierarchy
- transition continuity

### 3D

- model loading
- animation
- camera
- raycasting/interactions
- scene cleanup
- shader behavior
- resize

### Accessibility

- keyboard
- focus
- contrast
- reduced motion
- semantics
- labels
- alternative paths

### Performance

- LCP
- INP
- CLS
- FPS/frame pacing
- draw calls
- memory
- initial payload
- secondary asset loading

### Security

- dependency scan
- secrets
- headers
- form endpoint
- demo isolation

### SEO

- titles
- descriptions
- sitemap
- robots
- canonical
- OG
- project URLs

## Visual deviation loop

For each scene create a review table:

| Dimension | Target | Actual | Severity | Action |
|---|---|---|---|---|
| Composition | ... | ... | P0/P1/P2 | ... |
| Motion | ... | ... | ... | ... |
| Typography | ... | ... | ... | ... |
| Lighting | ... | ... | ... | ... |
| Performance | ... | ... | ... | ... |

P0 issues block completion.

## Severity

### P0

Broken, unsafe, inaccessible, unusable, incorrect facts, catastrophic performance.

### P1

Clearly below design/engineering specification.

### P2

Polish issue.

No P0 or P1 issue is allowed to remain at phase completion.

## Agent behavior

The agent must:

- challenge its own implementation
- compare against the phase requirements
- fix rather than rationalize
- repeat until the gate passes

The agent must never write “good enough” or “acceptable” when the spec requires a specific result.
