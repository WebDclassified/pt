# Current Standards & Research Basis

## Accessibility

Target **WCAG 2.2 AA** where applicable. Important requirements for a motion-heavy site include keyboard access, visible focus, focus not obscured by sticky elements, target size, reflow, contrast, accessible names/labels, alternatives to dragging where applicable, and careful handling of animation from interactions.

## Performance

Target current Core Web Vitals “good” thresholds at the 75th percentile:

- LCP ≤ 2.5 s
- INP ≤ 200 ms
- CLS ≤ 0.1

3D performance is an additional engineering concern: GPU frame time, draw calls, triangles, texture memory, shader complexity, device pixel ratio, scene memory, and asset loading must be measured.

## Browser capability

Use **WebGL as the broad production baseline** for the cinematic experience. Treat **WebGPU/TSL** as progressive enhancement/experimental because WebGPU is not universally Baseline across the major browser ecosystem.

## SEO

Keep important portfolio content in crawlable HTML. Use meaningful titles, descriptions, canonical URLs, crawlable links, sitemap, robots where appropriate, Open Graph metadata, and structured data only when truthful and applicable. The 3D canvas is enhancement, not the authoritative content layer.

## Security

Use HTTPS, secure headers including an appropriately scoped Content-Security-Policy, HSTS where appropriate, dependency hygiene, secret scanning, server-side validation for forms/APIs, rate limiting, and secure demo environments.

## Motion / cinematic interaction

Current 2026 creative-web work demonstrates several useful patterns:

- persistent Three.js/R3F scenes
- authored camera paths
- scroll-driven timelines
- scroll velocity as a design input
- scene-specific transitions
- depth-layered 3D galleries
- screen-space shader transitions
- audio coupled to scene changes or movement
- scene-by-scene loading to control GPU/memory
- reduced-motion fallbacks
- mobile-specific composition

The new portfolio should use these ideas as technical patterns, **not copy any specific site's artwork, wording, or scene design**.

## Research sources used

- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/
- web.dev Core Web Vitals: https://web.dev/articles/defining-core-web-vitals-thresholds
- MDN WebGPU: https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API
- MDN View Transition API: https://developer.mozilla.org/en-US/docs/Web/API/ViewTransition
- Google Search Central developer guidance: https://developers.google.com/search/docs/fundamentals/get-started-developers
- Google crawlable links: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- OWASP Top 10:2025: https://top10.owasp.org/2025/
- Three.js `InstancedMesh`: https://threejs.org/docs/pages/InstancedMesh.html
- Three.js disposal guidance: https://threejs.org/manual/en/how-to-dispose-of-objects.html
- Three.js responsive rendering: https://threejs.org/manual/en/responsive.html
- GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- GSAP ScrollSmoother: https://gsap.com/docs/v3/Plugins/ScrollSmoother/
- Spline optimization: https://docs.spline.design/exporting-your-scene/how-to-optimize-your-scene
- Spline web runtime/play settings: https://docs.spline.design/exporting-your-scene/play-settings
- React Three Fiber: https://r3f.docs.pmnd.rs/
- Codrops 2026 cinematic/3D articles and hub: https://tympanus.net/codrops/hub/tutorials/
