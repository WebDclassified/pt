import * as THREE from "three";
import type { SceneState } from "@/content/scenes";

/**
 * Phase 04/07 — authored camera grammar.
 * Each scene state defines start/end keyframes evaluated with smoothstep
 * easing over scene-local progress. This is the Three.js reconstruction of
 * an authored camera pass (Blender-authored paths remain an upgrade path).
 */

export interface CameraKeyframe {
  position: [number, number, number];
  target: [number, number, number];
}

const K = (
  position: [number, number, number],
  target: [number, number, number],
): CameraKeyframe => ({ position, target });

/**
 * World-space anchor for each scene — environments build around these
 * coordinates so camera + environment stay in agreement.
 */
export const SCENE_ANCHORS: Record<SceneState, [number, number, number]> = {
  BOOT: [0, 0, -40],
  INTRO: [0, 0, -20],
  ORIGIN: [0, 0, -60],
  IDENTITY: [0, 0, -60],
  SYSTEM: [0, 0, -100],
  EXPERIENCE: [40, 0, -140],
  PROJECT_VIZQUO: [40, 0, -190],
  PROJECT_QUPAY: [40, 0, -230],
  FAILURE: [40, 0, -270],
  REBUILD: [40, 0, -310],
  PROJECT_HILO: [0, 0, -350],
  PROJECT_MEDIUM: [0, 0, -390],
  PROJECT_BLOCK_SWAP: [0, 0, -430],
  SYSTEMS: [-40, 0, -460],
  LAB: [-40, 0, -500],
  ABOUT: [0, 0, -540],
  NOW: [0, 0, -580],
  CONTACT: [0, 0, -600],
  FINALE: [0, 40, -620],
};

export const CAMERA_PATH: Record<SceneState, { from: CameraKeyframe; to: CameraKeyframe }> = {
  BOOT: {
    from: K([0, 0, 6], [0, 0, -20]),
    to: K([0, 0, 2], [0, 0, -20]),
  },
  INTRO: {
    from: K([0, 0, 0], [0, 0, -20]),
    to: K([0, 0, -4], [0, 0, -20]),
  },
  ORIGIN: {
    from: K([0, 0.5, -24], [0, 0, -60]),
    to: K([0, 0.5, -36], [0, 0, -60]),
  },
  IDENTITY: {
    from: K([0, 0.5, -36], [0, 0, -60]),
    to: K([0, 0, -50], [0, 0, -60]),
  },
  SYSTEM: {
    from: K([0, 0, -50], [0, 0, -60]),
    to: K([0, 0, -92], [0, 0, -100]),
  },
  EXPERIENCE: {
    from: K([16, 1, -132], [40, 0, -140]),
    to: K([36, 1, -146], [40, 0, -140]),
  },
  PROJECT_VIZQUO: {
    // Inspection close-up: the shot ends 4u from the sample so the exhibit
    // is the hero (§142) — at 10u its thin features vanished next to DOM text
    from: K([40, 1.2, -178], [40, 0, -190]),
    to: K([40, 0.3, -186], [40, 0, -190]),
  },
  PROJECT_QUPAY: {
    // Close-up matching the Vizquo treatment: the conduit's gates and the
    // traveling value packet are the hero, not set dressing beside DOM text
    from: K([40, 0.8, -220], [40, 0, -230]),
    to: K([40, 0.4, -227], [40, 0, -230]),
  },
  FAILURE: {
    from: K([40, 1, -256], [40, 0, -270]),
    to: K([44, -0.5, -266], [40, 0, -270]),
  },
  REBUILD: {
    from: K([44, -0.5, -298], [40, 0, -310]),
    to: K([40, 0.5, -306], [40, 0, -310]),
  },
  PROJECT_HILO: {
    from: K([-10, 2, -338], [0, 0, -350]),
    to: K([6, 1, -344], [0, 0, -350]),
  },
  PROJECT_MEDIUM: {
    // Close-up: the slab stack fills the frame as the publishing structure
    from: K([-5, 0.4, -382], [0, 0, -390]),
    to: K([3, 0.1, -387.5], [0, 0, -390]),
  },
  PROJECT_BLOCK_SWAP: {
    from: K([-8, 1, -418], [0, 0, -430]),
    to: K([6, 0.5, -426], [0, 0, -430]),
  },
  SYSTEMS: {
    from: K([-52, 2, -452], [-40, 0, -460]),
    to: K([-44, 0.5, -458], [-40, 0, -460]),
  },
  LAB: {
    from: K([-50, 1, -490], [-40, 0, -500]),
    to: K([-44, 0, -497], [-40, 0, -500]),
  },
  ABOUT: {
    from: K([-8, 0, -532], [0, 0, -540]),
    to: K([0, 0, -536], [0, 0, -540]),
  },
  NOW: {
    from: K([-4, 0, -572], [0, 0, -580]),
    to: K([0, 0, -576.5], [0, 0, -580]),
  },
  CONTACT: {
    from: K([0, 0, -590], [0, 0, -600]),
    to: K([0, 0, -596], [0, 0, -600]),
  },
  FINALE: {
    // Pull far back AND above — the whole connected system revealed (Phase 03)
    from: K([0, 8, -560], [0, 10, -600]),
    to: K([0, 95, -320], [0, 0, -330]),
  },
};

const _pos = new THREE.Vector3();
const _tgt = new THREE.Vector3();
const _a = new THREE.Vector3();
const _b = new THREE.Vector3();

export function evaluateCamera(
  state: SceneState,
  local: number,
  out: { position: THREE.Vector3; target: THREE.Vector3 },
): void {
  const entry = CAMERA_PATH[state];
  if (!entry) return;
  // Smoothstep over scene-local progress
  const t = local * local * (3 - 2 * local);
  _a.set(...entry.from.position);
  _b.set(...entry.to.position);
  out.position.copy(_a.lerp(_b, t));
  _a.set(...entry.from.target);
  _b.set(...entry.to.target);
  out.target.copy(_a.lerp(_b, t));
  _pos.copy(out.position);
  _tgt.copy(out.target);
}

/** Subtle idle drift — breathing motion that never overrides the path */
export function applyIdleDrift(
  position: THREE.Vector3,
  time: number,
  amplitude = 0.12,
): void {
  position.x += Math.sin(time * 0.23) * amplitude;
  position.y += Math.cos(time * 0.19) * amplitude * 0.6;
}
