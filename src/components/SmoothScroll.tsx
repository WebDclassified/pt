"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionPreferences } from "@/components/MotionPreferencesProvider";

/**
 * Phase 07 — smooth scroll as the film playback head.
 * Desktop/trackpad: Lenis inertia. Touch: natural direct manipulation
 * (syncTouch off by default — never a delayed fake-scroll system).
 * Reduced motion: native scrolling, no smoothing.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const { reducedMotion } = useMotionPreferences();

  useEffect(() => {
    // Check the live media query too: child effects run before the provider's
    // state settles, so the context value alone can race on first mount.
    if (
      reducedMotion ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.11,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
