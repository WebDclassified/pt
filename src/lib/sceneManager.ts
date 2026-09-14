import * as THREE from "three";
import type { SceneState } from "@/content/scenes";
import { experience, leadership } from "@/content/experience";
import type { EnvHandle } from "@/lib/environmentPrimitives";
import {
  createMonolithField,
  createMilestoneCorridor,
  createFractureField,
  createVizquoExhibit,
  createQupayExhibit,
  createNetworkGraph,
  createMediumExhibit,
  createBlockSwapExhibit,
  createBlueprint,
  createCalmScene,
  createFinaleWorld,
} from "@/lib/environmentPrimitives";
import { SCENE_ANCHORS } from "@/lib/cameraGrammar";

/**
 * Phase 06 — scene lifecycle state machine over the persistent renderer.
 * States: IDLE → PRELOAD → ENTER → ACTIVE → EXIT → (dispose) → IDLE
 * The renderer/canvas is never recreated; only environment contents cycle.
 */

export type SceneLifecycle = "idle" | "preload" | "enter" | "active" | "exit";

type EnvFactory = () => EnvHandle;

/**
 * Environment registry per scene state. Factories are cheap and disposed on
 * exit — GPU resources never accumulate across scene changes (Phase 12).
 */
const ENVIRONMENTS: Partial<Record<SceneState, EnvFactory>> = {
  ORIGIN: () => createMonolithField([0, 0, -60]),
  IDENTITY: () => createMonolithField([0, 0, -60]),
  EXPERIENCE: () =>
    createMilestoneCorridor(
      [40, 0, -140],
      [
        ...experience.map((e) => `${e.title} — ${e.org}`),
        ...leadership.map((l) => `${l.title} — ${l.org}`),
      ],
    ),
  // §43/§78 — every featured project gets a distinct spatial exhibit derived
  // from what the project actually is (never a shared generic prop)
  PROJECT_VIZQUO: () => createVizquoExhibit([40, 0, -190]),
  PROJECT_QUPAY: () => createQupayExhibit([40, 0, -230]),
  FAILURE: () => createFractureField([40, 0, -270]),
  REBUILD: () => createFractureField([40, 0, -310]),
  // Storyboard scene 08: "users → posts → comments as nodes and edges" —
  // purpose-built social graph, not the generic inspection artifact
  PROJECT_HILO: () => createNetworkGraph([0, 0, -350]),
  PROJECT_MEDIUM: () => createMediumExhibit([0, 0, -390]),
  PROJECT_BLOCK_SWAP: () => createBlockSwapExhibit([0, 0, -430]),
  SYSTEMS: () => createBlueprint([-40, 0, -460]),
  LAB: () => createBlueprint([-40, 0, -500]),
  ABOUT: () => createCalmScene([0, 0, -540]),
  NOW: () => createCalmScene([0, 0, -580]),
  // Phase 03 finale: "reveals the entire environment as one connected system"
  FINALE: () =>
    createFinaleWorld(
      Object.entries(SCENE_ANCHORS)
        .filter(([id]) => id !== "BOOT" && id !== "FINALE")
        .map(([, anchor]) => anchor),
    ),
};

export class SceneManager {
  readonly root = new THREE.Group();
  private currentId: SceneState | null = null;
  private current: EnvHandle | null = null;
  private lifecycle: SceneLifecycle = "idle";
  private disposedScenes = 0;
  private createdScenes = 0;

  get state(): { id: SceneState | null; lifecycle: SceneLifecycle; created: number; disposed: number } {
    return {
      id: this.currentId,
      lifecycle: this.lifecycle,
      created: this.createdScenes,
      disposed: this.disposedScenes,
    };
  }

  /**
   * Ensures the environment for `id` is active. Called every frame with the
   * current scene cursor; transitions run the full lifecycle on change.
   */
  sync(id: SceneState): void {
    if (id === this.currentId) {
      if (this.lifecycle === "enter") this.lifecycle = "active";
      return;
    }
    // EXIT + dispose previous
    if (this.current) {
      this.lifecycle = "exit";
      this.root.remove(this.current.object3D);
      this.current.dispose();
      this.disposedScenes++;
      this.current = null;
    }
    // PRELOAD + ENTER next
    const factory = ENVIRONMENTS[id];
    this.currentId = id;
    if (!factory) {
      // Pure-DOM scenes (INTRO, CONTACT, BOOT) — no environment required
      this.lifecycle = "active";
      return;
    }
    this.lifecycle = "preload";
    this.current = factory();
    this.createdScenes++;
    this.root.add(this.current.object3D);
    this.lifecycle = "enter";
  }

  update(t: number, local: number): void {
    this.current?.update(t, local);
  }

  /** Phase 12 — full GPU cleanup on unmount */
  disposeAll(): void {
    if (this.current) {
      this.root.remove(this.current.object3D);
      this.current.dispose();
      this.disposedScenes++;
      this.current = null;
    }
    this.currentId = null;
    this.lifecycle = "idle";
  }
}
