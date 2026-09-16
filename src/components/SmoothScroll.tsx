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
 *
 * Motion pass addition: in-page anchor navigation glides on the same engine
 * (nav links, hero CTAs, footer index) instead of hard-jumping. The easing
 * mirrors the film's scene transitions — fast start, long settle.
 */

const ANCHOR_EASE = (t: number) => 1 - Math.pow(1 - t, 5); // quintic out — longer settle
const HEADER_OFFSET = -56; // h-14 fixed header

let lenisInstance: Lenis | null = null;

/** Programmatic smooth scroll used by the anchor interceptor below. */
export function scrollToId(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: HEADER_OFFSET,
      duration: 1.25,
      easing: ANCHOR_EASE,
    });
  } else {
    // Reduced motion / no engine: instant, native
    target.scrollIntoView();
  }
}

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
      // Cinematic playback head: slightly longer glide (0.09) so scroll
      // motion settles like a camera dolly, never snappy
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    lenisInstance = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [reducedMotion]);

  useEffect(() => {
    // Same-page hash links glide through Lenis; cross-page links navigate.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const anchor = (event.target as HTMLElement).closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      const hash = href.startsWith("/#") ? href.slice(2) : href.startsWith("#") ? href.slice(1) : null;
      if (!hash || href.startsWith("##")) return;
      // Cross-page hash (e.g. /recruiter → /#work): let Next navigate first
      if (href.startsWith("/#") && window.location.pathname !== "/") return;
      const target = document.getElementById(hash);
      if (!target) return;
      event.preventDefault();
      scrollToId(hash);
      // Move focus to the destination — the skip-link contract (and keyboard
      // continuity generally) requires focus to follow the scroll.
      document.getElementById(hash)?.focus?.({ preventScroll: true });
      // Keep the URL honest without another jump
      window.history.replaceState(null, "", `#${hash}`);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return <>{children}</>;
}
