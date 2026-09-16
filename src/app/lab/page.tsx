import type { Metadata } from "next";
import Link from "next/link";
import { SignalField } from "@/components/lab/SignalField";
import { PixelForge } from "@/components/lab/PixelForge";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Lab",
  description: `Experimental creative-technology work by ${site.name} — live GPU particle systems, procedural experiments, and playable prototypes. Every exhibit runs.`,
};

/**
 * Phase 21 §58/59 — THE LAB, staged with real work.
 * Rule: "The interactive experiment must work before being advertised."
 * Exhibit 01 (Signal Field) is live and interactive on this page. Further
 * slots state honestly what is in progress — never fake entries.
 */
export default function LabPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-28 sm:px-6">
      <div className="horizon-line w-24" aria-hidden="true" />
      <p className="mt-5 font-tech text-signal">LAB — EXPERIMENTS THAT RUN</p>
      <h1 className="type-chapter mt-3 horizon-fill">
        Built to be played with.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-secondary-gray">
        Experiments from the same engine that drives this site — GPU particle
        systems, procedural geometry, real-time graphics. Every exhibit here
        runs live in your browser. Nothing staged.
      </p>

      {/* ------------------------- EXHIBIT 01 ------------------------- */}
      <section aria-labelledby="lab-01" className="mt-14">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="lab-01" className="font-tech text-warm-white">
            01 · SIGNAL FIELD
          </h2>
          <span className="font-tech text-signal">LIVE — INTERACTIVE</span>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary-gray">
          18,000 seeded particles follow your pointer as a live attractor and
          relax back into place when you leave — the same signal language as
          the film, running as a toy you can touch.
        </p>

        <div className="mt-4">
          <SignalField />
        </div>

        <dl className="mt-4 grid gap-4 border-t border-white/10 pt-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="font-tech">WHAT</dt>
            <dd className="mt-1 text-secondary-gray">
              Pointer-driven particle attractor with spring relaxation
            </dd>
          </div>
          <div>
            <dt className="font-tech">HOW</dt>
            <dd className="mt-1 text-secondary-gray">
              three.js Points, per-particle seeded pull, one RAF loop, full
              GPU disposal on unmount
            </dd>
          </div>
          <div>
            <dt className="font-tech">STACK</dt>
            <dd className="mt-1 text-secondary-gray">
              Three.js · WebGL · TypeScript — no external assets
            </dd>
          </div>
        </dl>
        <p className="mt-3 font-tech">
          <a
            href="https://github.com/WebDclassified"
            rel="noopener"
            className="u-line-link text-signal"
          >
            SOURCE ↗
          </a>
        </p>
      </section>

      {/* ------------------------- EXHIBIT 02 ------------------------- */}
      <section aria-labelledby="lab-02" className="mt-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="lab-02" className="font-tech text-warm-white">
            02 · PIXEL FORGE
          </h2>
          <span className="font-tech text-signal">LIVE — PLAYABLE</span>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary-gray">
          A living pixel workspace. Paint signal paths and watch pulses travel
          them, carve voids and watch unsupported pixels collapse, seed
          crystals that grow along structure. Three tools, one emergent
          system — no goal, no score. Just consequence.
        </p>

        <div className="mt-4">
          <PixelForge />
        </div>

        <dl className="mt-4 grid gap-4 border-t border-white/10 pt-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="font-tech">WHAT</dt>
            <dd className="mt-1 text-secondary-gray">
              Cellular pixel world — signal propagation, gravity collapse,
              crystal growth
            </dd>
          </div>
          <div>
            <dt className="font-tech">HOW</dt>
            <dd className="mt-1 text-secondary-gray">
              Canvas 2D at 60fps, typed-array grid, seeded spawn, pause when
              offscreen
            </dd>
          </div>
          <div>
            <dt className="font-tech">STACK</dt>
            <dd className="mt-1 text-secondary-gray">
              Canvas API · TypeScript — zero dependencies, zero assets
            </dd>
          </div>
        </dl>
      </section>

      {/* --------------------- IN THE WORKBENCH ----------------------- */}
      <section aria-labelledby="lab-next" className="mt-16">
        <h2 id="lab-next" className="font-tech text-warm-white">
          IN THE WORKBENCH
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-secondary-gray">
          Experiments currently on the bench. Each one ships here only when it
          runs in the browser — the lab never advertises vaporware.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          <li className="border border-white/10 bg-surface/60 p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-warm-white">Horizon Audio</h3>
              <span className="font-tech text-secondary-gray">PROTOTYPE</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-secondary-gray">
              The site&apos;s procedural lofi engine as a playable instrument —
              scene chords, tape filter, and beat exposed to touch.
            </p>
          </li>
          <li className="border border-white/10 bg-surface/60 p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-warm-white">TSL Compute Field</h3>
              <span className="font-tech text-secondary-gray">EXPLORING</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-secondary-gray">
              WebGPU/TSL compute-style particle dynamics, with WebGL fallback
              — the next step beyond this page&apos;s CPU-side pull.
            </p>
          </li>
        </ul>
      </section>

      <p className="mt-12 text-sm text-secondary-gray">
        The lab feeds the film — techniques that stabilize here graduate into
        the main experience.{" "}
        <Link href="/#work" className="u-line-link text-signal">
          Back to the work
        </Link>
      </p>
    </div>
  );
}
