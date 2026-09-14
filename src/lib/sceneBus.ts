/**
 * Phase 07/08 — scene-change event bus.
 * The 3D render loop publishes scene transitions; DOM consumers (aperture
 * overlay, audio engine) subscribe. Decoupled from React state entirely.
 */

type SceneListener = (sceneId: string) => void;

const listeners = new Set<SceneListener>();

export function emitSceneChange(sceneId: string): void {
  for (const listener of listeners) listener(sceneId);
}

export function onSceneChange(listener: SceneListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
