"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Phase 21/§95 — SKIP INTRO. The visitor can always bypass the film.
 * Appears only while the experience is in its opening chapter (INTRO→
 * ORIGIN→IDENTITY→SYSTEM), then withdraws — the spectacle must earn its
 * place, never trap the visitor. Jumps past the prologue to the work.
 */
export function SkipIntro() {
  const [visible, setVisible] = useState(false);
  const elapsed = useRef(0);

  useEffect(() => {
    const SCENE_ACTIVE_MS = 14_000;
    let raf = 0;
    const tick = () => {
      elapsed.current += 1000 / 60;
      if (elapsed.current > SCENE_ACTIVE_MS) {
        setVisible(false);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    setVisible(true);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#work"
      className="fixed right-4 top-16 z-50 border border-white/20 bg-void/70 px-3 py-2 font-tech text-[11px] tracking-widest text-warm-white backdrop-blur-sm transition-colors hover:border-signal hover:text-signal sm:right-6"
    >
      SKIP INTRO →
    </a>
  );
}
