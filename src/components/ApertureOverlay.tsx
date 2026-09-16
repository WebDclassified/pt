"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { onSceneChange } from "@/lib/sceneBus";
import { useMotionPreferences } from "@/components/MotionPreferencesProvider";
import { MOTION } from "@/lib/motion";

/**
 * Phase 08 — the signature transition: a recurring circular aperture.
 * On every scene change the overlay irises briefly (opacity + conic sheen),
 * keeping perceptual continuity without ever blocking content (pointer-events
 * none, content fully visible beneath at all times).
 */
export function ApertureOverlay() {
  const [sceneKey, setSceneKey] = useState(0);
  const ringRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const seenFirst = useRef(false);
  const { reducedMotion } = useMotionPreferences();

  useEffect(() => {
    return onSceneChange(() => {
      // The initial state publish is not a transition — no aperture on boot
      if (!seenFirst.current) {
        seenFirst.current = true;
        return;
      }
      setSceneKey((k) => k + 1);
    });
  }, []);

  useEffect(() => {
    if (reducedMotion || sceneKey === 0) return; // skip initial mount
    const ring = ringRef.current;
    const sheen = sheenRef.current;
    if (!ring || !sheen) return;

    const context = gsap.context(() => {
      // The breath: iris opens, holds a beat, closes — slow enough to read
      // as a scene change, never a flicker
      const tl = gsap.timeline();
      tl.fromTo(
        ring,
        { opacity: 0, scale: 0.86 },
        {
          opacity: 0.9,
          scale: 1,
          duration: MOTION.duration.scene * 0.4,
          ease: MOTION.ease.aperture,
        },
      )
        .to(ring, {
          opacity: 0.9,
          duration: MOTION.duration.scene * 0.2,
        })
        .to(ring, {
          opacity: 0,
          scale: 1.06,
          duration: MOTION.duration.scene * 0.4,
          ease: MOTION.ease.aperture,
        });
      gsap.fromTo(
        sheen,
        { rotation: 0 },
        {
          rotation: 90,
          duration: MOTION.duration.scene,
          ease: MOTION.ease.aperture,
        },
      );
    });
    return () => context.revert();
  }, [sceneKey, reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center"
      data-scene-key={sceneKey}
    >
      <div
        ref={ringRef}
        className="relative h-[min(72vmin,640px)] w-[min(72vmin,640px)] rounded-full opacity-0"
        style={{
          background:
            "radial-gradient(circle, transparent 62%, rgba(200,255,61,0.07) 72%, rgba(200,255,61,0.16) 82%, transparent 92%)",
        }}
      >
        <div
          ref={sheenRef}
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(241,239,232,0.05) 18deg, transparent 40deg)",
          }}
        />
        <div className="absolute inset-[2px] rounded-full border border-signal/10" />
      </div>
    </div>
  );
}
