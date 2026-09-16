"use client";

import { useEffect } from "react";
import { onSceneChange } from "@/lib/sceneBus";
import { getAudioEngine, type SceneAcoustic } from "@/lib/audioEngine";
import { getMp3Music } from "@/lib/mp3Music";
import { getRuntime } from "@/lib/runtime";
import { useMotionPreferences } from "@/components/MotionPreferencesProvider";

/**
 * Phase 09 glue — sound has two channels:
 *
 * 1. YouTube music (user request): the selected track, fade-in from
 *    near-silent → slow rise → medium plateau, fade-out before the end,
 *    restart with the same fade cycle. Loaded through YouTube's official
 *    IFrame Player API (their terms, artist gets the play), hidden, and
 *    only after the user flips SOUND ON.
 *
 * 2. Procedural lofi engine — the fallback when the music channel is
 *    unavailable (video not embeddable, network blocked, API timeout),
 *    and the layer that still responds to scenes/scroll.
 *
 * The engine itself stays silent unless the user explicitly enabled sound
 * (header toggle, persisted). The scene/velocity wiring below keeps feeding
 * the procedural engine regardless — it simply stays at zero volume while
 * the music channel plays.
 */

const ACOUSTIC_MAP: Record<string, SceneAcoustic> = {
  INTRO: "spacious",
  ORIGIN: "spacious",
  IDENTITY: "spacious",
  SYSTEM: "spacious",
  EXPERIENCE: "precise",
  PROJECT_VIZQUO: "precise",
  PROJECT_QUPAY: "precise",
  FAILURE: "tension",
  REBUILD: "spacious",
  PROJECT_HILO: "spacious",
  // A writing/study scene is the natural lofi home — warm pad + vinyl bed
  PROJECT_MEDIUM: "spacious",
  PROJECT_BLOCK_SWAP: "precise",
  SYSTEMS: "precise",
  LAB: "experimental",
  ABOUT: "silence",
  NOW: "silence",
  CONTACT: "airy",
  FINALE: "airy",
};

export function AudioBridge() {
  const { audioEnabled } = useMotionPreferences();

  useEffect(() => {
    const engine = getAudioEngine();
    const music = getMp3Music();

    // If the music channel can't play, the procedural engine takes over
    music.setFallbackHandler(() => engine.start());

    if (audioEnabled) {
      // Called within the click gesture's task — satisfies autoplay policy
      void music.start();
      void engine.start();
    } else {
      music.stop();
      engine.stop();
    }
    return () => {
      music.stop();
      engine.stop();
    };
  }, [audioEnabled]);

  useEffect(() => {
    const offScene = onSceneChange((sceneId) => {
      getAudioEngine().setScene(ACOUSTIC_MAP[sceneId] ?? "spacious");
    });
    // The runtime singleton already maintains a damped, clamped velocity
    // (written by the render loop, decayed to 0 at rest) — polling it is
    // more correct than deriving a monotonic value from scrollY, which only
    // ever rises and would keep the lofi pulse permanently "in motion".
    const timer = window.setInterval(() => {
      getAudioEngine().setVelocity(getRuntime().velocity);
    }, 120);
    return () => {
      offScene();
      window.clearInterval(timer);
    };
  }, []);

  return null;
}
