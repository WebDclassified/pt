import type { SceneState } from "@/content/scenes";

/**
 * Phase 06/13 — high-frequency runtime state.
 * A plain mutable singleton: written by scroll/pointer listeners, read inside
 * the render loop. Never triggers React re-renders.
 */
export interface SceneRuntime {
  /** Normalized 0→1 master timeline progress */
  progress: number;
  /** Damped signed scroll velocity, clamped to -1..1 */
  velocity: number;
  /** Pointer in NDC (-1..1) */
  pointer: { x: number; y: number };
  /** Current scene id (state machine) */
  sceneId: SceneState;
  /** Seconds since experience start (render-loop clock) */
  time: number;
  /** Adaptive quality tier (Phase 13): refined by FPS watchdog */
  quality: "auto" | "high" | "medium" | "low";
}

export type Runtime = ReturnType<typeof createRuntime>;

export function createRuntime() {
  const state: SceneRuntime = {
    progress: 0,
    velocity: 0,
    pointer: { x: 0, y: 0 },
    sceneId: "INTRO",
    time: 0,
    quality: "auto",
  };
  return state;
}

/** Module-level singleton — one experience per page */
let runtime: Runtime | null = null;

export function getRuntime(): Runtime {
  if (!runtime) runtime = createRuntime();
  return runtime;
}
