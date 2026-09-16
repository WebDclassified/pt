/**
 * Phase 07/08 — one motion language: shared durations and easings.
 * Ranges follow the spec's motion scale (micro 100–300ms, component
 * 250–800ms, scene transitions 700–2000ms). Every animated surface draws
 * from this vocabulary so DOM and 3D move as one film.
 *
 * Cinematic pass (user direction): the shared attack-and-settle curve —
 * fast attack, long settle — is the single ease family for entrances and
 * transitions; the aperture slows so scene changes read as a breath, not
 * a flicker.
 */
export const MOTION = {
  duration: {
    /** Micro UI: hover, toggles, small state flips */
    micro: 0.2,
    /** Component: reveals, cards, chips */
    component: 0.55,
    /** Signature scene-to-scene transitions */
    scene: 1.25,
    /** Long story beats */
    long: 1.8,
  },
  ease: {
    /** The cinematic ease: fast attack, long settle — one family everywhere */
    cinematic: "expo.out",
    /** Entrances with presence */
    inOut: "power2.inOut",
    /** Aperture/iris — slowed for the breath-like scene change */
    aperture: "power2.inOut",
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
