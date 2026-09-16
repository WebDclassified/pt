"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionPreferences } from "@/components/MotionPreferencesProvider";

/**
 * Phase 07/08 — DOM beat reveal (refined motion pass).
 *
 * Grammar: each beat rises 26px with a gentle defocus (blur 5→0), easing on
 * a custom two-stage curve — fast attack (cubic-bezier(0.19, 1, 0.22, 1),
 * the "expo-like" family) over a longer settle (1.05s) so elements arrive
 * decisively then breathe into place, mirroring the film's camera stops.
 * `once` renders are one-shot; streaming groups can replay on re-enter.
 * Content stays server-rendered and visible without JS (SEO/no-JS safe);
 * reduced motion renders statically with no transform at all.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Allow the beat to replay when scrolled back into view (film grammar) */
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotionPreferences();

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 26, filter: "blur(5px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.05,
          delay,
          ease: "cubic-bezier(0.19, 1, 0.22, 1)", // fast attack, long settle
          overwrite: "auto",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: once
              ? "play none none none"
              : "play none none reverse",
          },
        },
      );
    }, el);
    return () => context.revert();
  }, [reducedMotion, delay, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
