"use client";

import { useEffect, useState } from "react";
import { scenes } from "@/content/scenes";
import { onSceneChange } from "@/lib/sceneBus";
import { getRuntime } from "@/lib/runtime";

/**
 * Phase 21/§97 — wayfinding. A minimal scene indicator:
 *   05 / 16 · PROJECT 01 — VIZQUO
 * The visitor always knows where they are in the film. Purely indicative —
 * never the only path to content (nav stays fully clickable). Hidden in
 * reduced motion (cuts mode replaces the film with section navigation).
 */
export function Wayfinder() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Initial position from the live runtime (deep links skip ahead)
    const runtime = getRuntime();
    const initial = scenes.findIndex((s) => s.id === runtime.sceneId);
    if (initial >= 0) setIndex(initial);

    return onSceneChange((id) => {
      const next = scenes.findIndex((s) => s.id === id);
      if (next >= 0) setIndex(next);
    });
  }, []);

  const scene = scenes[index];
  if (!scene) return null;

  return (
    <div
      aria-hidden="true"
      data-testid="wayfinder"
      className="pointer-events-none fixed bottom-5 left-4 z-30 hidden font-tech text-[11px] tracking-widest text-secondary-gray md:block sm:left-6"
    >
      <span className="text-warm-white">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span> / {String(scenes.length).padStart(2, "0")}</span>
      <span className="mx-2 text-white/20">·</span>
      <span>{scene.title}</span>
    </div>
  );
}
