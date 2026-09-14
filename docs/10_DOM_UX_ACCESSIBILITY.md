# Phase 10 — DOM, UX, Accessibility, and Recruiter Safety

## Objective

Guarantee that the cinematic experience remains a professional, accessible, usable portfolio.

## WCAG target

Target WCAG 2.2 AA where applicable.

## Required semantic structure

Use meaningful:

- header
- nav
- main
- section
- article
- footer
- h1/h2/h3 hierarchy

## Keyboard

Everything important must work with:

- Tab
- Shift+Tab
- Enter
- Space
- Escape
- appropriate arrow keys where applicable

## Focus

- visible focus state
- focus must not be hidden under sticky UI
- dialogs must manage focus
- no keyboard traps

## Skip link

Provide “Skip to main content”.

## Navigation

Persistent/accessible navigation should expose:

- Work
- Experience
- About
- Lab
- Resume
- Contact

Exact labels can be refined but should remain immediately understandable.

## Director / Recruiter / Engineer modes

Provide a light-weight way to reach:

### Director's Cut

Full cinematic journey.

### Recruiter View

Fast access to profile, strongest work, experience, resume, contact.

### Engineer View

Architecture, code, performance, security, testing, technical notes.

These can share content rather than duplicating it.

## Skip intro

The cinematic opening must include a clear option to skip or jump directly to work.

## Mobile

Do not simply scale down the desktop scene.
Create a mobile-directed version with:

- touch-safe interaction
- simpler geometry
- reduced effects
- natural scrolling
- readable typography

## Contrast

Verify all important DOM text against actual rendered backgrounds.

## Forms

Contact forms must have:

- visible labels
- client + server validation
- descriptive errors
- loading state
- success state
- failure/retry state
- spam protection
- keyboard access

## Reduced motion

Respect `prefers-reduced-motion` and provide a visible motion setting.

## Gate

PASS only when a keyboard-only tester can reach all critical actions and a reduced-motion user can access the complete portfolio without the 3D movie being required.
