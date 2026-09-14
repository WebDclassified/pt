import type { Metadata } from "next";
import { storyboard } from "@/content/storyboard";
import { scenes } from "@/content/scenes";
import { MOTION } from "@/lib/motion";

const grammar = [
  { verb: "ENTER", note: "fade/slide/clip reveal — once per beat" },
  { verb: "ACTIVATE", note: "light + subtle shift on hover/focus" },
  { verb: "CONNECT", note: "a signal line grows to full connection" },
  { verb: "TRANSFORM", note: "objects reconfigure between scenes" },
  { verb: "ERROR", note: "controlled fracture (Failure scene)" },
  { verb: "RECOVER", note: "reassembly and coherence" },
  { verb: "TRANSITION", note: "camera + aperture wipe" },
];

const acousticIdentity = [
  { scene: "Main world", acoustic: "spacious ambience" },
  { scene: "Systems / projects", acoustic: "precise, dry" },
  { scene: "Failure", acoustic: "low-frequency tension" },
  { scene: "Lab", acoustic: "electronic / experimental" },
  { scene: "About / Now", acoustic: "nearly silent" },
  { scene: "Finale", acoustic: "open / airy" },
];

export const metadata: Metadata = {
  title: "Art Direction Board",
  description:
    "The visual system of BUILD / BREAK / REBUILD: palette, typography roles, signature motifs, lighting language, and composition rules.",
};

const palette = [
  { name: "void", hex: "#050607", role: "Primary environment" },
  { name: "graphite", hex: "#0b0e10", role: "Depth layer" },
  { name: "surface", hex: "#111518", role: "Raised surface" },
  { name: "warm-white", hex: "#f1efe8", role: "Typography" },
  { name: "secondary-gray", hex: "#969b9f", role: "Supporting copy" },
  { name: "signal", hex: "#c8ff3d", role: "Active/important states only" },
];

const materials = [
  "graphite",
  "blackened metal",
  "smoked glass",
  "frosted glass",
  "ceramic",
  "translucent acrylic",
  "controlled emissive strips",
];

const lighting = [
  { beat: "Prologue", note: "almost dark" },
  { beat: "Discovery", note: "light increases" },
  { beat: "Problem", note: "fragmented / unstable light" },
  { beat: "Solution", note: "coherent lighting" },
  { beat: "Lab", note: "experimental lighting" },
  { beat: "About", note: "soft neutral light" },
  { beat: "Finale", note: "broad reveal" },
];

const motifs = [
  { name: "A point of light", meaning: "idea / origin" },
  { name: "A thin line", meaning: "connection" },
  { name: "A circular aperture", meaning: "recurring transition" },
  { name: "The Core", meaning: "identity / system" },
];

const avoid = [
  "generic cyberpunk",
  "galaxy/planet/space clichés",
  "generic astronaut/robot hero",
  "floating laptop cliché",
  "giant spinning sphere with no narrative",
  "purple/blue AI gradient cliché",
  "3D room with desk-and-monitor cliché",
  "constant neon glow",
  "particle spam",
  "endless parallax for decoration",
];

export default function DirectionBoard() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6">
      <p className="font-tech text-signal">PHASE 02/05 — CREATIVE DIRECTION</p>
      <h1 className="type-chapter mt-4 text-warm-white">
        BUILD / BREAK / REBUILD — the visual system
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-secondary-gray">
        Software becomes physical architecture. Ideas become structures.
        Systems become environments. Failures become fractures. Fixes become
        reconstruction. This board is the contract every scene must honor.
      </p>

      {/* Palette */}
      <section aria-labelledby="palette-h" className="mt-16">
        <h2 id="palette-h" className="font-tech text-warm-white">
          PALETTE — STARTING TOKENS
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {palette.map((color) => (
            <li key={color.name} className="border border-white/10">
              <div
                className="h-20 w-full border-b border-white/10"
                style={{ backgroundColor: color.hex }}
                aria-hidden="true"
              />
              <div className="p-3">
                <p className="font-tech text-warm-white">{color.name}</p>
                <p className="font-tech mt-1" style={{ textTransform: "none" }}>
                  {color.hex}
                </p>
                <p className="mt-2 text-xs leading-snug text-secondary-gray">
                  {color.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-3xl text-sm text-secondary-gray">
          Contrast verified by machine: every text pair meets WCAG 2.2 AA
          (worst pair 6.54:1). The signal color marks active/important states —
          never a general fill.
        </p>
      </section>

      {/* Type roles */}
      <section aria-labelledby="type-h" className="mt-16">
        <h2 id="type-h" className="font-tech text-warm-white">
          TYPE ROLES — DISPLAY / BODY / TECHNICAL
        </h2>
        <div className="mt-6 space-y-8 border-l border-white/10 pl-6">
          <div>
            <p className="font-tech text-signal">DISPLAY — SPACE GROTESK</p>
            <p className="type-hero mt-2 text-warm-white">Build the idea.</p>
          </div>
          <div>
            <p className="font-tech text-signal">CHAPTER LEVEL</p>
            <p className="type-chapter mt-2 text-warm-white">
              Break it on purpose.
            </p>
          </div>
          <div>
            <p className="font-tech text-signal">PROJECT LEVEL</p>
            <p className="type-project mt-2 text-warm-white">
              Rebuild it better.
            </p>
          </div>
          <div>
            <p className="font-tech text-signal">BODY — NEUTRAL SANS</p>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-secondary-gray">
              Body copy stays in a highly readable neutral sans at readable
              sizes. Huge display type is reserved for hero statements and
              chapter titles — never every piece of copy.
            </p>
          </div>
          <div>
            <p className="font-tech text-signal">TECHNICAL — MONO</p>
            <p className="font-tech mt-2 text-warm-white">
              METADATA · SYSTEMS · COORDINATES · 00_PROLOGUE
            </p>
          </div>
        </div>
      </section>

      {/* Signature motifs */}
      <section aria-labelledby="motifs-h" className="mt-16">
        <h2 id="motifs-h" className="font-tech text-warm-white">
          SIGNATURE MOTIFS — POINT → LINE → SYSTEM → WORLD
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {motifs.map((motif) => (
            <li key={motif.name} className="border border-white/10 bg-surface/60 p-5">
              <p className="text-warm-white">{motif.name}</p>
              <p className="font-tech mt-2">{motif.meaning}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-3xl text-sm text-secondary-gray">
          The signature object is <strong className="text-warm-white">The Core</strong> —
          architectural geometry, translucent layers, graphite/metal materials,
          small signal nodes, controlled emissive light. Not a planet, robot,
          or spaceship. The signature transition is the{" "}
          <strong className="text-warm-white">aperture</strong>.
        </p>
      </section>

      {/* Materials + lighting */}
      <section aria-labelledby="material-h" className="mt-16 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 id="material-h" className="font-tech text-warm-white">
            MATERIAL LANGUAGE
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {materials.map((material) => (
              <li key={material} className="border border-white/10 px-3 py-1.5 font-tech text-warm-white">
                {material}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 id="lighting-h" className="font-tech text-warm-white">
            LIGHTING — NARRATIVE PROGRESSION
          </h2>
          <ul className="mt-4 space-y-2">
            {lighting.map((entry) => (
              <li key={entry.beat} className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-2">
                <span className="text-sm text-warm-white">{entry.beat}</span>
                <span className="font-tech">{entry.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Storyboard safe areas */}
      <section aria-labelledby="board-h" className="mt-16">
        <h2 id="board-h" className="font-tech text-warm-white">
          STORYBOARD — 16 SHOTS, SAFE AREAS, FILM-FRAME TEST
        </h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th scope="col" className="py-2 pr-4 font-tech">SEQ</th>
                <th scope="col" className="py-2 pr-4 font-tech">SCENE</th>
                <th scope="col" className="py-2 pr-4 font-tech">FOCAL RULE</th>
                <th scope="col" className="py-2 font-tech">FILM-FRAME TEST</th>
              </tr>
            </thead>
            <tbody>
              {storyboard.map((shot) => {
                const scene = scenes.find((s) => s.id === shot.sceneId);
                return (
                  <tr key={shot.sceneId} className="border-b border-white/10">
                    <td className="py-2.5 pr-4 font-tech text-signal">{scene?.sequence}</td>
                    <td className="py-2.5 pr-4 text-warm-white">{scene?.title}</td>
                    <td className="py-2.5 pr-4 font-tech">{shot.focalRule}</td>
                    <td className="py-2.5 text-secondary-gray">{shot.filmFrameTest}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Motion grammar */}
      <section aria-labelledby="motion-h" className="mt-16">
        <h2 id="motion-h" className="font-tech text-warm-white">
          MOTION GRAMMAR — ONE LANGUAGE, DOM AND 3D
        </h2>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div>
            <ul className="space-y-2">
              {grammar.map((item) => (
                <li key={item.verb} className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-2">
                  <span className="font-tech text-signal">{item.verb}</span>
                  <span className="text-right text-sm text-secondary-gray">{item.note}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-secondary-gray">
              Durations: micro {(MOTION.duration.micro * 1000) | 0}ms · component{" "}
              {(MOTION.duration.component * 1000) | 0}ms · scene{" "}
              {(MOTION.duration.scene * 1000) | 0}ms · long{" "}
              {(MOTION.duration.long * 1000) | 0}ms. The signature transition is
              the circular aperture — it recurs without becoming repetitive.
            </p>
          </div>
          <div>
            <h3 className="font-tech text-warm-white">ACOUSTIC IDENTITY (OPT-IN)</h3>
            <ul className="mt-4 space-y-2">
              {acousticIdentity.map((item) => (
                <li key={item.scene} className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-2">
                  <span className="text-sm text-warm-white">{item.scene}</span>
                  <span className="font-tech">{item.acoustic}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-secondary-gray">
              Audio is off by default, enabled only by explicit user action,
              fully procedural, and velocity-coupled with a hard cap. The site
              works completely with sound off.
            </p>
          </div>
        </div>
      </section>

      {/* Avoid list */}
      <section aria-labelledby="avoid-h" className="mt-16">
        <h2 id="avoid-h" className="font-tech text-warm-white">
          EXPLICITLY AVOIDED
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {avoid.map((item) => (
            <li
              key={item}
              className="border border-white/10 px-3 py-1.5 text-xs text-secondary-gray line-through decoration-signal/60"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
