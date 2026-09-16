"use client";

import { useEffect, useRef, useState } from "react";
import type { Application } from "@splinetool/runtime";
import { useMotionPreferences } from "@/components/MotionPreferencesProvider";

/**
 * Footer signature — the user-selected Spline scene behind "PRABHAT TEOTIA",
 * set in the site's display face (Space Grotesk via .type-signature), full
 * band width edge to edge.
 *
 * The user asked for the text baked into the Spline scene to be removed.
 * Text objects live inside the compiled .splinecode, so they are hidden at
 * runtime: after load, every scene object whose name looks like text is set
 * visible=false; all names are logged in dev so the filter can be tightened
 * to exact names once known. The DOM name below is always present — the
 * visible signature never depends on the scene's success.
 *
 * Same contracts as the rest of the film: lazy load on scroll approach,
 * reduced motion never loads the scene, failure keeps gradient + name,
 * full disposal on unmount. Uses the pinned npm runtime (@splinetool/runtime,
 * same 2.0.52 as the CDN viewer) instead of the third-party script tag.
 */

const SPLINE_SCENE =
  "https://prod.spline.design/gOuXG-md6pmIaSpQ/scene.splinecode";
/**
 * Self-hosted standalone runtime (public/spline/runtime.js, pinned 2.0.52).
 * The npm package cannot be bundled — webpack chokes on its lazy wasm chunk
 * paths ("Can't resolve ../libs/draco/gltf/draco_wasm_wrapper.js") — so the
 * standalone build is served same-origin and imported natively with
 * webpackIgnore. The wasm libs it resolves at ../libs/ are self-hosted at
 * public/libs/draco/ (from the project's own three.js dependency).
 * `Application` is a type-only import from the npm package.
 */
const RUNTIME_URL = "/spline/runtime.js";
const NAME = "PRABHAT TEOTIA";

type SplineStatus = "idle" | "loading" | "ready" | "failed";

/**
 * Scene objects to hide — the exact text/CTA objects baked into the user's
 * scene (enumerated via the runtime API; names are stable per scene export):
 * the title block plus the floating word labels. Everything else (Pointer,
 * Glass, Particles, Paths, Background, Light…) renders as the motion layer.
 */
const HIDDEN_OBJECT_NAMES = new Set([
  "Title",
  "Button",
  "Description 1",
  "Description 2",
  "Process",
  "Activation",
  "Design",
  "Strategy",
]);

function hideTextObjects(app: Application): number {
  let hidden = 0;
  for (const obj of app.getAllObjects()) {
    if (HIDDEN_OBJECT_NAMES.has(obj.name)) {
      obj.visible = false;
      hidden++;
    }
  }
  return hidden;
}

export function SplineSignature() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const [status, setStatus] = useState<SplineStatus>("idle");
  const { reducedMotion } = useMotionPreferences();

  useEffect(() => {
    if (reducedMotion) return;
    const band = bandRef.current;
    const canvas = canvasRef.current;
    if (!band || !canvas || !("IntersectionObserver" in window)) return;

    let disposed = false;
    let app: Application | null = null;
    startedRef.current = false;

    const start = () => {
      // Guard against double-start (strict mode re-runs, rapid re-entries)
      if (startedRef.current) return;
      startedRef.current = true;
      setStatus("loading");

      (async () => {
        try {
          // Native ESM import — excluded from the webpack graph
          const mod = (await import(
            /* webpackIgnore: true */ RUNTIME_URL
          )) as { Application: typeof Application };
          app = new mod.Application(canvas, {
            renderOnDemand: false, // always animating — it is the band's motion
          });
          await app.load(SPLINE_SCENE);
          if (disposed) {
            try {
              app?.dispose();
            } catch {
              /* already disposed */
            }
            return;
          }
          const hidden = hideTextObjects(app);
          if (process.env.NODE_ENV !== "production") {
            const names = app.getAllObjects().map((o) => o.name);
            console.debug(
              `[spline-signature] scene loaded, objects=${names.length}, hidden=${hidden}`,
              names,
            );
          }
          setStatus("ready");
        } catch (err) {
          console.error("[spline-signature] load failed:", err);
          if (!disposed) setStatus("failed");
        }
      })();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        start();
      },
      // Begin fetching well before the band scrolls into view
      { rootMargin: "600px 0px" },
    );
    observer.observe(band);

    return () => {
      disposed = true;
      observer.disconnect();
      app?.dispose();
      app = null;
    };
  }, [reducedMotion]);

  return (
    <div
      ref={bandRef}
      data-status={status}
      className="signature-band relative mt-16 h-[86svh] overflow-hidden border-t border-white/10"
      aria-label={`${NAME} signature`}
    >
      {/* The scene — motion layer of the band. Pointer events stay off:
          the band is scenery, the page scroll remains untouched. */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ display: status === "ready" ? "block" : "none" }}
      />

      {/* Gradient backdrop: present before load, under reduced motion, and on
          any failure — the band never goes blank */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 130% at 50% 118%, rgba(200,255,61,0.12), transparent 62%), radial-gradient(ellipse 60% 90% at 50% 132%, rgba(200,255,61,0.05), transparent 58%)",
        }}
      />

      {/* The name — the only text in the band. A two-line lockup scaled to
          fill the band's complete height and width; the fill draws from the
          background's signal-horizon language and brightens on hover. */}
      <p className="type-signature-stack pointer-events-none absolute inset-0 z-10 flex select-text flex-col items-center justify-center text-center">
        <span>PRABHAT TEOTIA</span>
     </p>
    </div>
  );
}
