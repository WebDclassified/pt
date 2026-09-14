"use client";

import { useEffect } from "react";
import { onSceneChange } from "@/lib/sceneBus";
import { getAudioEngine, type SceneAcoustic } from "@/lib/audioEngine";
import { useMotionPreferences } from "@/components/MotionPreferencesProvider";

/**
 * Phase 09 glue — maps scene states to acoustic identities and feeds scroll
 * velocity to the engine. The engine itself stays silent unless the user
 * explicitly enabled sound (header toggle, persisted).
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
  PROJECT_MEDIUM: "silence",
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
    if (audioEnabled) {
      // Called within the click gesture's task — satisfies autoplay policy
      void engine.start();
    } else {
      engine.stop();
    }
    return () => engine.stop();
  }, [audioEnabled]);

  useEffect(() => {
    const offScene = onSceneChange((sceneId) => {
      getAudioEngine().setScene(ACOUSTIC_MAP[sceneId] ?? "spacious");
    });
    let lastEmit = 0;
    const onScroll = () => {
      const now = performance.now();
      if (now - lastEmit < 120) return; // throttle
      lastEmit = now;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      getAudioEngine().setVelocity(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      offScene();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
