"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useMotionPreferences } from "@/components/MotionPreferencesProvider";
import { getRuntime, type Runtime } from "@/lib/runtime";
import { getSceneAt } from "@/lib/timeline";
import { emitSceneChange } from "@/lib/sceneBus";
import { evaluateCameraContinuous, applyIdleDrift, SCENE_ANCHORS } from "@/lib/cameraGrammar";
import { SceneManager } from "@/lib/sceneManager";
import { QualityController, TIERS } from "@/lib/quality";
import { mulberry32 } from "@/lib/random";

/**
 * Phase 06/07/13 — the persistent experience.
 * One canvas, one render loop, adaptive quality with hysteresis, full GPU
 * disposal, WebGL context-loss resilience. High-frequency state flows through
 * the runtime singleton — no React re-renders per frame.
 */

const LIGHT_PRESETS = {
  dark: { ambient: 0.12, key: 0.25, signal: 1.4, fogNear: 6, fogFar: 30 },
  // fogFar 90: the monolith architecture lives 20–90 units out — a 34-unit
  // fog erased it into the void (the M2 finale-fog failure mode, resurfaced
  // by the frame review). Depth still recedes: the far slab stays fogged.
  discovery: { ambient: 0.28, key: 0.6, signal: 2.0, fogNear: 10, fogFar: 90 },
  tense: { ambient: 0.1, key: 0.35, signal: 2.6, fogNear: 4, fogFar: 26 },
  calm: { ambient: 0.4, key: 0.5, signal: 0.6, fogNear: 6, fogFar: 30 },
  open: { ambient: 0.5, key: 0.7, signal: 1.2, fogNear: 30, fogFar: 520 },
} as const;

type LightPreset = keyof typeof LIGHT_PRESETS;

const SCENE_LIGHTS: Record<string, LightPreset> = {
  INTRO: "dark",
  ORIGIN: "discovery",
  IDENTITY: "discovery",
  SYSTEM: "discovery",
  EXPERIENCE: "discovery",
  PROJECT_VIZQUO: "discovery",
  PROJECT_QUPAY: "discovery",
  FAILURE: "tense",
  REBUILD: "discovery",
  PROJECT_HILO: "discovery",
  PROJECT_MEDIUM: "calm",
  PROJECT_BLOCK_SWAP: "discovery",
  SYSTEMS: "discovery",
  LAB: "tense",
  ABOUT: "calm",
  NOW: "calm",
  CONTACT: "open",
  FINALE: "open",
};

const DUST_COUNT = 640;

declare global {
  interface Window {
    __ptDebug?: {
      sceneStats: () => {
        id: string | null;
        lifecycle: string;
        created: number;
        disposed: number;
      };
      quality: () => string;
      scene: () => string;
    };
  }
}

function PersistentCore({ runtime, reducedMotion }: { runtime: Runtime; reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const wire = useRef<THREE.LineSegments>(null);
  const signal = useRef<THREE.Mesh>(null);

  const materials = useMemo(
    () => ({
      shell: new THREE.MeshStandardMaterial({
        color: 0x0b0e10,
        metalness: 0.9,
        roughness: 0.35,
        transparent: true,
        opacity: 0.3,
        flatShading: true,
      }),
      wire: new THREE.LineBasicMaterial({ color: 0xc8ff3d, transparent: true, opacity: 0.1 }),
      signal: new THREE.MeshBasicMaterial({ color: 0xc8ff3d, transparent: true, opacity: 0.5 }),
    }),
    [],
  );

  const geometries = useMemo(
    () => ({
      shell: new THREE.IcosahedronGeometry(1.6, 1),
      wire: new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.62, 1)),
      signal: new THREE.SphereGeometry(0.22, 24, 24),
    }),
    [],
  );

  useEffect(() => {
    return () => {
      Object.values(geometries).forEach((g) => g.dispose());
      Object.values(materials).forEach((m) => m.dispose());
    };
  }, [geometries, materials]);

  useFrame(() => {
    if (!group.current) return;
    const t = runtime.time;
    const { id, local } = getSceneAt(runtime.progress);
    const anchor = SCENE_ANCHORS[id];
    const emerge = THREE.MathUtils.smoothstep(runtime.progress, 0, 0.08);
    const open = THREE.MathUtils.smoothstep(local, 0.15, 0.6);

    group.current.position.set(anchor[0], anchor[1], anchor[2] + 1.5);
    group.current.rotation.y = reducedMotion ? 0 : t * 0.08 + runtime.progress * 6;
    group.current.rotation.x = reducedMotion ? 0 : Math.sin(t * 0.11) * 0.06 + open * 0.2;
    group.current.scale.setScalar(0.12 + emerge * 0.88 + open * 0.12);

    materials.shell.opacity = 0.15 + emerge * 0.5 + open * 0.2;
    materials.wire.opacity = 0.05 + emerge * 0.25 + open * 0.15;
    materials.signal.opacity = 0.3 + emerge * 0.4 + Math.sin(t * 2.4) * 0.12;
    if (wire.current) wire.current.rotation.y = -t * 0.05;
    if (signal.current) signal.current.scale.setScalar(1 + Math.sin(t * 2.4) * 0.12);
  });

  return (
    <group ref={group}>
      <mesh geometry={geometries.shell} material={materials.shell} />
      <lineSegments ref={wire} geometry={geometries.wire} material={materials.wire} />
      <mesh ref={signal} geometry={geometries.signal} material={materials.signal} />
      <pointLight color={0xc8ff3d} intensity={2.4} distance={10} />
    </group>
  );
}

function Dust({ runtime, reducedMotion }: { runtime: Runtime; reducedMotion: boolean }) {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    // Deterministic field (§123) — visual-regression captures must reproduce
    const rand = mulberry32(3);
    const positions = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      positions[i * 3] = (rand() - 0.5) * 26;
      positions[i * 3 + 1] = (rand() - 0.5) * 14;
      positions[i * 3 + 2] = (rand() - 0.5) * 20 - 4;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);
  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.02,
        color: 0x969b9f,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame(() => {
    if (!points.current) return;
    const t = runtime.time;
    points.current.rotation.y = t * 0.015;
    points.current.position.y = Math.sin(t * 0.2) * 0.3;
    // §12 velocity response — the atmosphere streaks along travel when the
    // visitor scrolls fast, settles when they stop. Subtle by design.
    if (!reducedMotion) {
      const streak = 1 + Math.abs(runtime.velocity) * 1.4;
      points.current.scale.z += (streak - points.current.scale.z) * 0.1;
      material.opacity = 0.5 + Math.abs(runtime.velocity) * 0.2;
    }
  });

  return <points ref={points} name="dust" geometry={geometry} material={material} />;
}

function World({ runtime, reducedMotion }: { runtime: Runtime; reducedMotion: boolean }) {
  const { camera, scene, gl } = useThree();
  const manager = useMemo(() => new SceneManager(), []);
  const quality = useMemo(() => new QualityController(), []);
  const desiredPos = useMemo(() => new THREE.Vector3(0, 0, 2), []);
  const desiredTarget = useMemo(() => new THREE.Vector3(0, 0, -20), []);
  const smoothedPos = useMemo(() => new THREE.Vector3(0, 0, 2), []);
  const smoothedTarget = useMemo(() => new THREE.Vector3(0, 0, -20), []);
  const lastScene = useRef<string | null>(null);
  const fog = useMemo(() => new THREE.Fog(0x050607, 6, 30), []);

  useEffect(() => {
    scene.fog = fog;
    scene.background = new THREE.Color(0x050607);
    scene.add(manager.root);
    // Phase 16 debug hook — disposal/quality audit without devtools
    window.__ptDebug = {
      sceneStats: () => manager.state,
      quality: () => quality.current,
      scene: () => runtime.sceneId,
    };
    return () => {
      scene.remove(manager.root);
      manager.disposeAll();
      scene.fog = null;
      delete window.__ptDebug;
    };
  }, [scene, manager, fog, quality]);

  // Phase 13 — GPU context-loss resilience: restore the loop automatically
  useEffect(() => {
    const canvas = gl.domElement;
    const onContextLost = (event: Event) => {
      event.preventDefault();
      console.warn("[experience] WebGL context lost — awaiting restore");
    };
    const onContextRestored = () => {
      console.info("[experience] WebGL context restored");
    };
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);
    return () => {
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
    };
  }, [gl]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    runtime.time += dt;
    runtime.velocity *= Math.pow(0.001, dt);

    // Adaptive quality watchdog (Phase 13)
    const newTier = quality.sample(delta, state.clock.elapsedTime);
    if (newTier) {
      runtime.quality = newTier;
      const settings = TIERS[newTier];
      gl.setPixelRatio(Math.min(window.devicePixelRatio, settings.maxDpr));
      const dust = scene.getObjectByName("dust") as THREE.Points | null;
      if (dust?.geometry) {
        const total = dust.geometry.getAttribute("position").count;
        dust.geometry.setDrawRange(0, Math.floor(total * settings.particleFraction));
      }
    }

    const cursor = getSceneAt(runtime.progress);
    runtime.sceneId = cursor.id;
    if (cursor.id !== lastScene.current) {
      lastScene.current = cursor.id;
      emitSceneChange(cursor.id); // aperture overlay + audio react (Phase 08/09)
    }

    manager.sync(cursor.id);
    manager.update(runtime.time, cursor.local);

    // Authored camera grammar with boundary blending + idle drift + capped
    // velocity push (Phase 07; cinematic continuity per user direction)
    evaluateCameraContinuous(cursor.id, cursor.local, {
      position: desiredPos,
      target: desiredTarget,
    });
    applyIdleDrift(desiredPos, runtime.time, reducedMotion ? 0 : 0.1);
    desiredPos.z += runtime.velocity * 0.35;

    if (reducedMotion) {
      smoothedPos.copy(desiredPos);
      smoothedTarget.copy(desiredTarget);
    } else {
      // §14 pointer look — the visitor can look, not fly the camera. Bounded
      // target offset (±0.6 world units) decaying toward the frame edges.
      const lookX = runtime.pointer.x * 0.6;
      const lookY = runtime.pointer.y * 0.35;
      desiredTarget.x += lookX;
      desiredTarget.y += lookY;
      // Position glides; target settles faster so framing stays composed
      // on fast scroll jumps (AUDIT-M2-5 fix, Phase 07 physicality)
      smoothedPos.lerp(desiredPos, 1 - Math.pow(0.0001, dt));
      smoothedTarget.lerp(desiredTarget, 1 - Math.pow(0.000001, dt));
    }
    camera.position.copy(smoothedPos);
    camera.lookAt(smoothedTarget);

    // Lighting progression per scene (Phase 05)
    const preset = LIGHT_PRESETS[SCENE_LIGHTS[cursor.id] ?? "discovery"];
    const ambient = scene.children.find((c) => c.name === "ambient") as THREE.AmbientLight | undefined;
    const key = scene.children.find((c) => c.name === "key") as THREE.DirectionalLight | undefined;
    const signal = scene.children.find((c) => c.name === "signal-light") as THREE.PointLight | undefined;
    if (ambient) ambient.intensity = preset.ambient;
    if (key) key.intensity = preset.key;
    if (signal) {
      signal.intensity = preset.signal;
      // §16/§17 pointer influence field — the signal light follows the
      // visitor's attention; nearby surfaces respond with a bounded glow
      signal.position.set(
        camera.position.x + runtime.pointer.x * 2.2,
        camera.position.y + runtime.pointer.y * 1.6,
        camera.position.z - 4,
      );
    }
    // Fog range follows the lighting story ("open" = broad reveal, Phase 05)
    fog.near += (preset.fogNear - fog.near) * Math.min(dt * 2, 1);
    fog.far += (preset.fogFar - fog.far) * Math.min(dt * 2, 1);
  });

  return (
    <>
      <ambientLight name="ambient" intensity={0.2} />
      <directionalLight name="key" position={[6, 10, 4]} intensity={0.5} color={0xf1efe8} />
      <pointLight name="signal-light" position={[0, 2, -2]} intensity={1.6} color={0xc8ff3d} distance={18} />
      <Dust runtime={runtime} reducedMotion={reducedMotion} />
    </>
  );
}

function RuntimeDriver({ runtime }: { runtime: Runtime }) {
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      runtime.velocity = THREE.MathUtils.clamp(
        runtime.velocity + (progress - runtime.progress) * 4,
        -1,
        1,
      );
      runtime.progress = progress;
    };
    const onPointer = (event: PointerEvent) => {
      runtime.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      runtime.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [runtime]);
  return null;
}

export function Experience() {
  const { reducedMotion } = useMotionPreferences();
  const runtime = useMemo(() => getRuntime(), []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        dpr={[1, 1.75]}
        frameloop={reducedMotion ? "demand" : "always"}
        camera={{ fov: 42, near: 0.1, far: 900, position: [0, 0, 2] }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <RuntimeDriver runtime={runtime} />
        <World runtime={runtime} reducedMotion={reducedMotion} />
        <PersistentCore runtime={runtime} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
