import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Engineer View",
  description: `How this portfolio is built: architecture, performance engineering, accessibility, and security notes for ${site.name}'s cinematic portfolio.`,
};

const engineeringNotes = [
  {
    title: "Architecture",
    points: [
      "Next.js App Router + React 19 + TypeScript strict mode",
      "One persistent React Three Fiber canvas behind the DOM — the renderer is never recreated between sections",
      "DOM is the authoritative content layer; 3D is enhancement only (works with WebGL unavailable)",
      "Scene registry as typed data (SceneConfig) — scenes map to an explicit state machine, not ad-hoc code",
      "High-frequency state (scroll progress, velocity, pointer) lives in refs — zero per-frame React renders",
    ],
  },
  {
    title: "Performance",
    points: [
      "Core Web Vitals targets: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1",
      "Device pixel ratio capped (dpr=[1, 1.75]) — never native 3x/4x rendering",
      "Reduced-motion mode switches the canvas to demand rendering (frameloop='demand')",
      "Scene streaming model: current scene + next scene, not the whole world at once",
      "GPU resource lifecycle: dispose geometries/materials/textures on scene exit",
    ],
  },
  {
    title: "Accessibility",
    points: [
      "WCAG 2.2 AA target — semantic landmarks, heading hierarchy, skip link",
      "Visible focus states (signal-lime outline), no keyboard traps, Escape closes the mobile menu",
      "prefers-reduced-motion respected + an always-visible in-app motion toggle",
      "The full portfolio — every project, case study, resume link — works with the 3D layer off",
    ],
  },
  {
    title: "Security & content integrity",
    points: [
      "Security headers baseline (X-Content-Type-Options, Referrer-Policy); CSP tuned per-dependency before launch",
      "No secrets ship to the browser bundle; contact is mailto until a validated server route exists",
      "Every displayed fact traces to the content lock (docs/data/*) — no invented metrics, testimonials, or users",
      "Project claims marked verified only after live repository verification",
    ],
  },
];

export default function EngineerView() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-28 sm:px-6">
      <p className="font-tech text-signal">ENGINEER VIEW — HOW THIS IS BUILT</p>
      <h1 className="mt-4 text-4xl font-medium tracking-tight text-warm-white sm:text-5xl">
        The portfolio, x-rayed.
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-secondary-gray">
        This site is itself a systems project: a persistent WebGL film layer
        driven by a scroll timeline, sitting under a fully independent
        semantic content layer. The source of truth for every displayed fact
        is locked in <code className="font-tech">docs/data/</code>.
      </p>

      <div className="mt-12 space-y-12">
        {engineeringNotes.map((note) => (
          <section key={note.title} aria-labelledby={`eng-${note.title}`}>
            <h2
              id={`eng-${note.title}`}
              className="font-tech text-warm-white"
            >
              {note.title.toUpperCase()}
            </h2>
            <ul className="mt-4 space-y-2 border-l border-white/10 pl-5">
              {note.points.map((point) => (
                <li key={point} className="text-sm leading-relaxed text-secondary-gray">
                  {point}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-tech text-warm-white">PROJECT EVIDENCE</h2>
        <p className="mt-3 max-w-3xl text-sm text-secondary-gray">
          Every featured project has a case study with role, stack, decisions,
          and links to actual code:{" "}
          <Link href="/#work" className="text-signal hover:underline">
            view the work
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
