/**
 * Phase 04 — Shot design: storyboard with machine-checkable safe areas.
 * The UI must respect these zones: nav strips are protected from canvas
 * interaction (pointer-events: none) and from sticky occlusion; title and
 * CTA zones are the layout margins that DOM beats occupy.
 * A validation test reads this file — if a scene id here and in scenes.ts
 * diverge, the gate fails.
 */

export type SafeZoneName = "navStrip" | "titleZone" | "ctaZone";

export interface SafeZone {
  zone: SafeZoneName;
  /** Inset from viewport edge: [top, right, bottom, left] in px */
  inset: [number, number, number, number];
  /** Minimum contrast ratio required for text inside this zone */
  minTextContrast: number;
  purpose: string;
}

export interface StoryboardShot {
  sceneId: string;
  filmFrameTest: string;
  safeAreas: SafeZone[];
  /** Composition note enforced at M2 visual review */
  focalRule: "single-dominant" | "typographic-anchor" | "split-focus";
}

/** Protected zones every shot must honor (Phase 04 "Safe areas") */
export const sharedSafeAreas: SafeZone[] = [
  {
    zone: "navStrip",
    inset: [0, 0, 0, 0],
    minTextContrast: 4.5,
    purpose: "Fixed header strip — navigation and preference toggles stay legible and unobstructed",
  },
  {
    zone: "titleZone",
    inset: [56, 24, 0, 24],
    minTextContrast: 4.5,
    purpose: "Section title block — no lighting or geometry may destroy its legibility",
  },
  {
    zone: "ctaZone",
    inset: [0, 24, 32, 24],
    minTextContrast: 4.5,
    purpose: "Primary action area at section end — keyboard focus must never be hidden",
  },
];

export const storyboard: StoryboardShot[] = [
  {
    sceneId: "INTRO",
    filmFrameTest: "Black frame, one light — must read as an intentional title card",
    safeAreas: sharedSafeAreas,
    focalRule: "typographic-anchor",
  },
  {
    sceneId: "ORIGIN",
    filmFrameTest: "Distant Core in a monolithic void — scale without clutter",
    safeAreas: sharedSafeAreas,
    focalRule: "single-dominant",
  },
  {
    sceneId: "IDENTITY",
    filmFrameTest: "Name over the Core — portrait-grade composition",
    safeAreas: sharedSafeAreas,
    focalRule: "typographic-anchor",
  },
  {
    sceneId: "SYSTEM",
    filmFrameTest: "Aperture opening — centered symmetry, motion toward camera",
    safeAreas: sharedSafeAreas,
    focalRule: "single-dominant",
  },
  {
    sceneId: "EXPERIENCE",
    filmFrameTest: "Corridor of milestones — rhythm of repeated markers",
    safeAreas: sharedSafeAreas,
    focalRule: "split-focus",
  },
  {
    sceneId: "PROJECT_VIZQUO",
    filmFrameTest: "Artifact mid-inspection — laboratory hero frame",
    safeAreas: sharedSafeAreas,
    focalRule: "single-dominant",
  },
  {
    sceneId: "PROJECT_QUPAY",
    filmFrameTest: "Sealed conduits carrying value — precise, calm, financial",
    safeAreas: sharedSafeAreas,
    focalRule: "single-dominant",
  },
  {
    sceneId: "FAILURE",
    filmFrameTest: "Fracture at peak tension — uncomfortable but composed",
    safeAreas: sharedSafeAreas,
    focalRule: "single-dominant",
  },
  {
    sceneId: "PROJECT_HILO",
    filmFrameTest: "Graph constellation — human warmth in the connections",
    safeAreas: sharedSafeAreas,
    focalRule: "single-dominant",
  },
  {
    sceneId: "PROJECT_MEDIUM",
    filmFrameTest: "Typographic slabs — editorial stillness",
    safeAreas: sharedSafeAreas,
    focalRule: "typographic-anchor",
  },
  {
    sceneId: "PROJECT_BLOCK_SWAP",
    filmFrameTest: "Chain of linked blocks — measured pulses, no neon",
    safeAreas: sharedSafeAreas,
    focalRule: "single-dominant",
  },
  {
    sceneId: "SYSTEMS",
    filmFrameTest: "Blueprint diagram alive — technical clarity wide shot",
    safeAreas: sharedSafeAreas,
    focalRule: "split-focus",
  },
  {
    sceneId: "LAB",
    filmFrameTest: "Single experiment, dramatic lighting — controlled chaos",
    safeAreas: sharedSafeAreas,
    focalRule: "single-dominant",
  },
  {
    sceneId: "ABOUT",
    filmFrameTest: "Near-empty human frame — silence as composition",
    safeAreas: sharedSafeAreas,
    focalRule: "typographic-anchor",
  },
  {
    sceneId: "NOW",
    filmFrameTest: "One honest status line — poster-like restraint",
    safeAreas: sharedSafeAreas,
    focalRule: "typographic-anchor",
  },
  {
    sceneId: "FINALE",
    filmFrameTest: "The connected world pulled back — the whole film in one frame",
    safeAreas: sharedSafeAreas,
    focalRule: "single-dominant",
  },
];
