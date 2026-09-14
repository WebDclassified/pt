# Phase 17 — Full QA Matrix

## Browser matrix

Test at least:

- Chrome desktop
- Edge desktop
- Firefox desktop
- Safari desktop where available
- Chrome Android
- Safari iOS

## Viewport matrix

At minimum:

- 320
- 375
- 390
- 414
- 768
- 1024
- 1280
- 1440
- 1920
- ultrawide where available

## Accessibility matrix

- keyboard only
- reduced motion
- screen reader spot checks
- 200% zoom
- 400% zoom/reflow checks
- high contrast/forced colors where available

## Performance matrix

Test:

- fast connection
- throttled mobile connection
- low-end/mobile device
- standard laptop
- high-DPI device
- integrated graphics where possible

## Functional tests

### Navigation

- all header links
- project links
- resume
- LinkedIn
- email
- footer links
- back/forward

### Scene

- scene entry
- scene exit
- repeat entry
- reverse scroll
- fast scroll
- slow scroll
- abrupt stop

### 3D

- WebGL available
- WebGL unavailable/failure fallback
- resize
- tab background/foreground
- context-loss handling where practical

### Form

- valid
- invalid
- empty
- server failure
- network failure
- repeated submission
- keyboard

## Quality gates

No launch when:

- there are broken links
- navigation traps exist
- text is unreadable over 3D scenes
- mobile is broken
- reduced motion is broken
- critical content disappears without WebGL
- the demo exposes secrets
- content contains fabricated facts
