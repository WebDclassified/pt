"use client";

import { useEffect, useRef, useState } from "react";
import { mulberry32 } from "@/lib/random";

/**
 * LAB exhibit 02 — PIXEL FORGE: an interactive pixel workspace.
 *
 * The visitor shapes a living pixel field with three tools:
 *   CONDUCT  — paint signal paths; energized pixels pulse and propagate
 *   ERODE    — carve voids; pixels crumble into drifting debris
 *   GROW     — seed crystalline growth that spreads along structure
 *
 * Rules of the world (simple, discoverable, game-like):
 * - Signal pixels energize neighbors along paths — draw a line, watch it
 *   carry the pulse to its end
 * - Voids collapse: unsupported pixels fall and refill from the bottom
 * - Crystals grow only where density is high — the tools interact
 *
 * Seeded initial field (§123); 60fps canvas loop; pausable when offscreen;
 * site palette only. This is a real playable toy — the lab's rule is that
 * everything advertised must run.
 */

const COLS = 96;
const ROWS = 54;
const CELL = 6; // rendered at 2x via CSS for crispness
const EMPTY = 0;
const DUST = 1;
const SIGNAL = 2;
const CRYSTAL = 3;

type Tool = "conduct" | "erode" | "grow";

const TOOL_LABELS: Record<Tool, { name: string; hint: string }> = {
  conduct: { name: "CONDUCT", hint: "Paint signal paths — pulses travel them" },
  erode: { name: "ERODE", hint: "Carve voids — unsupported pixels collapse" },
  grow: { name: "GROW", hint: "Seed crystals — they spread along structure" },
};

export function PixelForge() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tool, setTool] = useState<Tool>("conduct");
  const [pulseCount, setPulseCount] = useState(0);
  const toolRef = useRef<Tool>("conduct");
  const pointer = useRef({ x: -1, y: -1, down: false });
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    toolRef.current = tool;
  }, [tool]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setWebglFailed(true);
      return;
    }

    // ---- world state ----
    const rng = mulberry32(0x91ee17);
    let grid = new Uint8Array(COLS * ROWS);
    let energy = new Float32Array(COLS * ROWS);
    const seedField = () => {
      grid = new Uint8Array(COLS * ROWS);
      energy = new Float32Array(COLS * ROWS);
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          // layered density: denser toward the bottom, sparse sky
          const depth = y / ROWS;
          if (rng() < 0.12 + depth * 0.72) grid[y * COLS + x] = DUST;
        }
      }
      // a few starter signal veins so the world is alive on arrival
      for (let v = 0; v < 3; v++) {
        let x = Math.floor(rng() * COLS);
        for (let y = ROWS - 8; y > 4; y--) {
          grid[y * COLS + x] = SIGNAL;
          x = Math.max(1, Math.min(COLS - 2, x + Math.floor(rng() * 3) - 1));
        }
      }
    };
    seedField();

    const idx = (x: number, y: number) => y * COLS + x;
    const inBounds = (x: number, y: number) => x >= 0 && x < COLS && y >= 0 && y < ROWS;

    // ---- interaction ----
    const toCell = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: Math.floor(((e.clientX - rect.left) / rect.width) * COLS),
        y: Math.floor(((e.clientY - rect.top) / rect.height) * ROWS),
      };
    };
    const onDown = (e: PointerEvent) => {
      pointer.current.down = true;
      const c = toCell(e);
      pointer.current.x = c.x;
      pointer.current.y = c.y;
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      const c = toCell(e);
      pointer.current.x = c.x;
      pointer.current.y = c.y;
    };
    const onUp = () => {
      pointer.current.down = false;
    };
    const onLeave = () => {
      pointer.current.x = -1;
      pointer.current.y = -1;
      pointer.current.down = false;
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointerleave", onLeave);

    // ---- simulation ----
    let raf = 0;
    let frame = 0;
    let running = true;
    let lastPulses = 0;

    const tick = () => {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      frame++;
      const t = toolRef.current;

      // apply tool along the pointer trail
      if (pointer.current.down && pointer.current.x >= 0) {
        const { x: px, y: py } = pointer.current;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -2; dx <= 2; dx++) {
            const x = px + dx;
            const y = py + dy;
            if (!inBounds(x, y)) continue;
            const i = idx(x, y);
            if (t === "conduct" && grid[i] !== CRYSTAL) grid[i] = SIGNAL;
            if (t === "erode") {
              if (grid[i] !== EMPTY && rng() < 0.8) grid[i] = EMPTY;
            }
            if (t === "grow" && grid[i] === DUST && rng() < 0.5) grid[i] = CRYSTAL;
          }
        }
      }

      // signal propagation: energy flows along SIGNAL chains
      let pulses = 0;
      for (let i = 0; i < grid.length; i++) {
        if (grid[i] === SIGNAL) {
          const x = i % COLS;
          const wave = (Math.sin((x * 0.35 + frame * 0.05)) + 1) / 2;
          energy[i] = wave;
          if (wave > 0.86) pulses++;
        } else if (grid[i] === CRYSTAL) {
          // crystals slowly convert adjacent dust (growth along structure)
          if (frame % 12 === 0 && rng() < 0.08) {
            const x = i % COLS;
            const y = Math.floor(i / COLS);
            const nx = x + (rng() < 0.5 ? 1 : -1);
            const ny = y + (rng() < 0.5 ? 1 : -1);
            if (inBounds(nx, ny) && grid[idx(nx, ny)] === DUST) {
              grid[idx(nx, ny)] = CRYSTAL;
            }
          }
        }
      }
      if (pulses !== lastPulses) {
        lastPulses = pulses;
        setPulseCount(pulses);
      }

      // gravity: DUST/SIGNAL with empty below and no lateral support falls
      if (frame % 3 === 0) {
        for (let y = ROWS - 2; y >= 0; y--) {
          for (let x = 0; x < COLS; x++) {
            const i = idx(x, y);
            const below = idx(x, y + 1);
            if ((grid[i] === DUST || grid[i] === SIGNAL) && grid[below] === EMPTY) {
              const leftOk = x > 0 && grid[idx(x - 1, y)] !== EMPTY;
              const rightOk = x < COLS - 1 && grid[idx(x + 1, y)] !== EMPTY;
              if (!leftOk && !rightOk) {
                grid[below] = grid[i];
                grid[i] = EMPTY;
              }
            }
          }
        }
      }

      // ---- render ----
      ctx.fillStyle = "#050607";
      ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const i = idx(x, y);
          const v = grid[i];
          if (v === EMPTY) continue;
          if (v === DUST) {
            ctx.fillStyle = "#39434b";
          } else if (v === SIGNAL) {
            const e = energy[i];
            const b = Math.floor(90 + e * 165);
            ctx.fillStyle = `rgb(${Math.floor(90 + e * 110)}, ${b}, ${Math.floor(40 + e * 21)})`;
          } else {
            // crystal — warm white with a signal halo on pulse
            const shimmer = (Math.sin(frame * 0.04 + x * 0.6 + y * 0.4) + 1) / 2;
            ctx.fillStyle =
              shimmer > 0.82 ? "#c8ff3d" : shimmer > 0.5 ? "#f1efe8" : "#969b9f";
          }
          ctx.fillRect(x * CELL, y * CELL, CELL - 1, CELL - 1);
        }
      }
      // cursor halo
      if (pointer.current.x >= 0) {
        ctx.strokeStyle =
          t === "conduct" ? "rgba(200,255,61,0.8)" : t === "erode" ? "rgba(150,155,159,0.8)" : "rgba(241,239,232,0.8)";
        ctx.lineWidth = 1;
        ctx.strokeRect(
          (pointer.current.x - 2) * CELL,
          (pointer.current.y - 1) * CELL,
          5 * CELL,
          3 * CELL,
        );
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      tick();
      running = false;
    } else {
      tick();
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduced) return;
        if (entry.isIntersecting && !running) {
          running = true;
          tick();
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.05 },
    );
    io.observe(wrap);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="toolbar" aria-label="Pixel Forge tools">
        {(Object.keys(TOOL_LABELS) as Tool[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setTool(key)}
            aria-pressed={tool === key}
            className={`u-motion-soft border px-3 py-2 font-tech transition-colors ${
              tool === key
                ? "border-signal bg-signal/10 text-signal"
                : "border-white/10 text-secondary-gray hover:border-white/25 hover:text-warm-white"
            }`}
          >
            {TOOL_LABELS[key].name}
          </button>
        ))}
        <span className="ml-auto font-tech" aria-live="polite">
          {pulseCount} LIVE PULSES
        </span>
      </div>
      <p className="mt-2 font-tech">{TOOL_LABELS[tool].hint}</p>
      <div ref={wrapRef} className="mt-3">
        {webglFailed ? (
          <p className="border border-white/10 bg-surface/60 p-6 text-sm text-secondary-gray">
            Canvas is unavailable in this browser — the exhibit needs it to run.
          </p>
        ) : (
          <canvas
            ref={canvasRef}
            width={COLS * CELL}
            height={ROWS * CELL}
            className="w-full cursor-crosshair border border-white/10 bg-void"
            style={{ imageRendering: "pixelated", touchAction: "none" }}
            aria-label="Pixel Forge — interactive pixel workspace. Draw with CONDUCT to paint signal paths, ERODE to carve, GROW to seed crystals."
            role="application"
          />
        )}
      </div>
    </div>
  );
}
