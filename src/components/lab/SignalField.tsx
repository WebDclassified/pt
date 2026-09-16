"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { mulberry32 } from "@/lib/random";

/**
 * LAB exhibit 01 — Signal Field: a GPU particle field (18,000 points) with
 * the pointer as a live attractor. Seeded for deterministic layout (§123).
 * Uses the project's own three.js stack and palette (graphite dust,
 * signal-green core); full disposal on unmount; static frame under reduced
 * motion; CanvasErrorBoundary upstream catches WebGL failure.
 */
export function SignalField() {
  const mountRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    const disposers: Array<() => void> = [];
    const run = (fn: () => void) => disposers.push(fn);

    let cleanup: (() => void) | null = null;

    try {
      const width = () => mount.clientWidth || 1;
      const height = () => mount.clientHeight || 1;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(width(), height(), false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, width() / height(), 0.1, 80);
      camera.position.set(0, 0, 14);

      // --- the field: 18k seeded particles in a flattened ellipsoid ---
      const COUNT = 18000;
      const positions = new Float32Array(COUNT * 3);
      const seeds = new Float32Array(COUNT);
      const rng = mulberry32(0x1a8101);
      for (let i = 0; i < COUNT; i++) {
        positions[i * 3] = (rng() - 0.5) * 22;
        positions[i * 3 + 1] = (rng() - 0.5) * 12;
        positions[i * 3 + 2] = (rng() - 0.5) * 10;
        seeds[i] = rng();
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const base = Float32Array.from(positions);

      const mat = new THREE.PointsMaterial({
        color: 0x39434b,
        size: 0.05,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(geo, mat);
      scene.add(points);

      // signal core — the attractor's visible anchor
      const coreMat = new THREE.MeshBasicMaterial({ color: 0xc8ff3d });
      const core = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), coreMat);
      scene.add(core);

      run(() => {
        geo.dispose();
        mat.dispose();
        core.geometry.dispose();
        coreMat.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      });

      const ndc = new THREE.Vector2();
      const world = new THREE.Vector3();

      const onPointer = (e: PointerEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        pointerRef.current.active = true;
      };
      const onLeave = () => {
        pointerRef.current.active = false;
      };
      renderer.domElement.addEventListener("pointermove", onPointer);
      renderer.domElement.addEventListener("pointerleave", onLeave);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const clock = new THREE.Clock();
      let raf = 0;
      const tick = () => {
        if (disposed) return;
        raf = requestAnimationFrame(tick);
        const t = clock.getElapsedTime();
        const dt = Math.min(clock.getDelta(), 0.05);

        // attractor: pointer if present, else a slow lissajous drift
        if (pointerRef.current.active) {
          world.set(ndc.x * 9, ndc.y * 5, 0);
        } else {
          world.set(Math.sin(t * 0.3) * 6, Math.cos(t * 0.22) * 3, 0);
        }
        core.position.lerp(world, 0.12);

        // particles pull toward the attractor, then relax to base
        const pos = geo.getAttribute("position") as THREE.BufferAttribute;
        const arr = pos.array as Float32Array;
        const cx = core.position.x;
        const cy = core.position.y;
        for (let i = 0; i < COUNT; i++) {
          const ix = i * 3;
          const dx = cx - arr[ix];
          const dy = cy - arr[ix + 1];
          const dist2 = dx * dx + dy * dy + 1;
          const pull = Math.min(2.2 / dist2, 0.6) * (0.4 + seeds[i] * 0.6);
          arr[ix] += (dx * pull + (base[ix] - arr[ix]) * 0.02) * dt * 6;
          arr[ix + 1] += (dy * pull + (base[ix + 1] - arr[ix + 1]) * 0.02) * dt * 6;
        }
        pos.needsUpdate = true;

        points.rotation.z = Math.sin(t * 0.05) * 0.04;
        renderer.render(scene, camera);
      };
      if (reduced) {
        // static single frame — structure without motion
        renderer.render(scene, camera);
      } else {
        tick();
      }

      const onResize = () => {
        camera.aspect = width() / height();
        camera.updateProjectionMatrix();
        renderer.setSize(width(), height(), false);
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(mount);

      cleanup = () => {
        disposed = true;
        cancelAnimationFrame(raf);
        ro.disconnect();
        renderer.domElement.removeEventListener("pointermove", onPointer);
        renderer.domElement.removeEventListener("pointerleave", onLeave);
        disposers.forEach((d) => d());
      };
    } catch {
      // WebGL unavailable: leave the mount empty — the exhibit card states
      // the experiment honestly, and the fallback copy still reads.
      cleanup?.();
      cleanup = null;
    }

    return () => cleanup?.();
  }, []);

  return (
    <div
      ref={mountRef}
      className="h-[320px] w-full cursor-crosshair border border-white/10 bg-void/60"
      aria-label="Signal Field — interactive particle simulation. Move your pointer through the field."
      role="img"
    />
  );
}
