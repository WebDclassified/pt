/**
 * Phase 07/08 — one motion language: shared durations and easings.
 * Ranges follow the spec's motion scale (micro 100–300ms, component
 * 250–800ms, scene transitions 700–2000ms). Every animated surface draws
 * from this vocabulary so DOM and 3D move as one film.
 */
export const MOTION = {
  duration: {
    /** Micro UI: hover, toggles, small state flips */
    micro: 0.18,
    /** Component: reveals, cards, chips */
    component: 0.45,
    /** Signature scene-to-scene transitions */
    scene: 0.9,
    /** Long story beats */
    long: 1.6,
  },
  ease: {
    /** Default cinematic ease-out */
    out: "power2.out",
    /** Entrances with presence */
    inOut: "power2.inOut",
    /** Aperture/iris mechanical feel */
    aperture: "power3.inOut",
  },
} as const;

/** Grammar verbs from Phase 08 — used as data-attributes for CSS wiring */
export type MotionVerb =
  | "enter"
  | "activate"
  | "connect"
  | "transform"
  | "error"
  | "recover"
  | "transition";
