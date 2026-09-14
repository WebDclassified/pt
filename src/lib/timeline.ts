import { scenes, type SceneConfig, type SceneState } from "@/content/scenes";

/**
 * Phase 07 — master timeline math.
 * Scene weights from the registry map the normalized 0→1 document progress
 * onto scene-local ranges. All scene choreography derives from these ranges.
 */

export interface SceneRange {
  id: SceneState;
  start: number;
  end: number;
  /** Weight-scaled span — proportional screen real estate */
  span: number;
}

export function buildRanges(ordered: SceneConfig[]): SceneRange[] {
  const total = ordered.reduce((sum, s) => sum + s.weight, 0);
  let cursor = 0;
  return ordered.map((scene) => {
    const span = scene.weight / total;
    const range: SceneRange = { id: scene.id, start: cursor, end: cursor + span, span };
    cursor += span;
    return range;
  });
}

export const sceneRanges = buildRanges(scenes);

export interface SceneCursor {
  id: SceneState;
  /** 0..1 progress within the current scene */
  local: number;
  range: SceneRange;
}

export function getSceneAt(progress: number): SceneCursor {
  const clamped = Math.min(Math.max(progress, 0), 1);
  for (const range of sceneRanges) {
    if (clamped < range.end || range === sceneRanges[sceneRanges.length - 1]) {
      const local = range.span > 0
        ? Math.min(Math.max((clamped - range.start) / range.span, 0), 1)
        : 0;
      return { id: range.id, local, range };
    }
  }
  // Unreachable — last range catches all
  const last = sceneRanges[sceneRanges.length - 1];
  return { id: last.id, local: 1, range: last };
}

/** 0..1 → eased 0..1 with smoothstep */
export function band(local: number, from: number, to: number): number {
  if (to <= from) return local >= to ? 1 : 0;
  const t = (local - from) / (to - from);
  const clamped = Math.min(Math.max(t, 0), 1);
  return clamped * clamped * (3 - 2 * clamped);
}
