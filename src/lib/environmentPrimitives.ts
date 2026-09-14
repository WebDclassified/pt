import * as THREE from "three";
import { mulberry32 } from "@/lib/random";

/**
 * Phase 06/12/21 — shared procedural primitives.
 * Every factory returns { object3D, update, dispose } so the SceneManager
 * can enter/exit/dispose environments without GPU memory growth.
 * Deterministic seeds (§123): procedural layouts use mulberry32 so visual-
 * regression captures are reproducible frame-for-frame.
 */

export interface EnvHandle {
  object3D: THREE.Object3D;
  update: (t: number, local: number) => void;
  dispose: () => void;
}

const PALETTE = {
  void: 0x050607,
  graphite: 0x0b0e10,
  surface: 0x111518,
  warmWhite: 0xf1efe8,
  secondaryGray: 0x969b9f,
  signal: 0xc8ff3d,
} as const;

interface Disposable {
  mesh: THREE.Mesh;
  dispose: () => void;
}

function makeBox(
  width: number,
  height: number,
  depth: number,
  color: number,
  emissive = 0x000000,
): Disposable {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshStandardMaterial({
    color,
    // With no scene environment map, high metalness renders black metal —
    // diffuse/rim light never registers. Keep partial metal character but
    // let the per-environment key/rim lights actually shape the surfaces.
    metalness: 0.4,
    roughness: 0.45,
    emissive,
    emissiveIntensity: emissive ? 0.4 : 0,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return {
    mesh,
    dispose: () => {
      geometry.dispose();
      material.dispose();
    },
  };
}

/**
 * Per-environment key + rim lights, scoped inside the env group so the
 * SceneManager's dispose cycle reclaims them automatically — the disposal
 * invariant (disposed === created − 1) is untouched. An explicit in-group
 * target keeps the aim local (a DirectionalLight's default target is world
 * origin, which would skew the angles for environments parked far down the
 * world z-axis).
 */
function addEnvLights(
  group: THREE.Group,
  keyIntensity: number,
  rimIntensity: number,
): { key: THREE.DirectionalLight; rim: THREE.DirectionalLight } {
  const key = new THREE.DirectionalLight(0xf1efe8, keyIntensity); // warm key
  key.position.set(-6, 14, 8); // up-left-front → edge highlights on near faces
  const rim = new THREE.DirectionalLight(0xd8e6ff, rimIntensity); // cool steel rim
  rim.position.set(4, 6, -14); // behind the subject → silhouette edges
  const target = new THREE.Object3D();
  group.add(key, rim, target);
  key.target = target;
  rim.target = target;
  return { key, rim };
}

/** ORIGIN/IDENTITY — monolithic architectural void around a distant Core */
export function createMonolithField(anchor: [number, number, number]): EnvHandle {
  const group = new THREE.Group();
  group.position.set(...anchor);
  const disposables: Array<() => void> = [];

  // Layered composition per Phase 04 depth layers: taller/closer slabs at the
  // wings, the tallest mass pushed deep as the background anchor.
  const layout: Array<[number, number, number, number, number, number]> = [
    // x, y, z(offset), w, h, d
    [-19, -3.5, 4, 7, 33, 5],
    [18, -3.5, 6, 8, 38, 5],
    [-10, -3.5, -12, 5, 22, 5],
    [11, -3.5, -15, 6, 26, 5],
    [2, -3.5, -32, 12, 44, 7],
  ];
  const monoliths: THREE.Mesh[] = [];
  for (const [x, y, z, w, h, d] of layout) {
    // Steel emissive base: the "architecture waking" ramp drives
    // emissiveIntensity, and intensity × black was multiplying to nothing —
    // the slabs need a non-black emissive color to self-illuminate at all.
    const mono = makeBox(w, h, d, PALETTE.graphite, 0x465058);
    mono.mesh.position.set(x, y, z);
    group.add(mono.mesh);
    monoliths.push(mono.mesh);
    disposables.push(mono.dispose);
  }

  // Vertical light-seams — thin emissive slits on the inner faces of the
  // near monoliths. They read as architecture waking up as the camera
  // arrives, and give the midground a bright vertical accent.
  const seamGeometry = new THREE.BoxGeometry(0.06, 1, 0.06);
  const seamMaterial = new THREE.MeshBasicMaterial({
    color: PALETTE.warmWhite,
    transparent: true,
    opacity: 0,
  });
  const seamSpecs: Array<[number, number, number, number]> = [
    // x, y-base, z, height — just off the inner faces of the two near slabs
    [-15.8, -2, 6.6, 20],
    [13.8, -2, 8.6, 24],
  ];
  for (const [x, yBase, z, h] of seamSpecs) {
    const seam = new THREE.Mesh(seamGeometry, seamMaterial);
    seam.position.set(x, yBase + h / 2, z);
    seam.scale.y = h;
    group.add(seam);
  }
  disposables.push(() => {
    seamGeometry.dispose();
    seamMaterial.dispose();
  });

  // Ground plane — a floor line so the void has a horizon; catches the key
  // light as a soft gradient toward the fog instead of floating boxes.
  const groundGeometry = new THREE.PlaneGeometry(140, 120);
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: PALETTE.void,
    metalness: 0.2,
    roughness: 0.95,
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -20;
  group.add(ground);
  disposables.push(() => {
    groundGeometry.dispose();
    groundMaterial.dispose();
  });

  // Per-environment lighting — scoped to this group (auto-disposed)
  const { key, rim } = addEnvLights(group, 1.6, 2.6);

  return {
    object3D: group,
    update: (_t, local) => {
      // Light rises as the visitor arrives (Phase 05 progression); seams
      // ignite early, then ease back as the scene settles.
      const rise = THREE.MathUtils.smoothstep(local, 0, 0.55);
      monoliths.forEach((mesh, i) => {
        const material = mesh.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = 0.06 + rise * (0.3 + i * 0.05);
      });
      seamMaterial.opacity = rise * 0.5 * (1 - local * 0.35);
      key.intensity = 0.7 + rise * 1.1;
      rim.intensity = 1.2 + rise * 1.6;
    },
    dispose: () => disposables.forEach((fn) => fn()),
  };
}

/** EXPERIENCE — corridor of milestone markers (data-driven from experience.ts) */
export function createMilestoneCorridor(
  anchor: [number, number, number],
  milestones: string[],
): EnvHandle {
  const group = new THREE.Group();
  group.position.set(...anchor);
  const disposables: Array<() => void> = [];

  const spacing = 3.2;
  const markers: THREE.Mesh[] = [];
  milestones.forEach((_label, i) => {
    const marker = makeBox(0.5, 2.6 + (i % 3) * 0.5, 0.5, PALETTE.surface, PALETTE.signal);
    marker.mesh.position.set(0, 0, (i - (milestones.length - 1) / 2) * -spacing);
    group.add(marker.mesh);
    markers.push(marker.mesh);
    disposables.push(marker.dispose);
  });
  const floor = makeBox(10, 0.2, milestones.length * spacing + 8, PALETTE.graphite);
  floor.mesh.position.y = -1.8;
  group.add(floor.mesh);
  disposables.push(floor.dispose);

  return {
    object3D: group,
    update: (t, local) => {
      markers.forEach((marker, i) => {
        const material = marker.material as THREE.MeshStandardMaterial;
        const activate = THREE.MathUtils.smoothstep(
          local,
          i / markers.length,
          (i + 0.7) / markers.length,
        );
        material.emissiveIntensity =
          0.15 + activate * (0.8 + Math.sin(t * 2 + i) * 0.15);
      });
    },
    dispose: () => disposables.forEach((fn) => fn()),
  };
}

/** FAILURE/REBUILD — fractured slab that disperses and reassembles */
export function createFractureField(anchor: [number, number, number]): EnvHandle {
  const group = new THREE.Group();
  group.position.set(...anchor);
  const disposables: Array<() => void> = [];
  const shards: Array<{ mesh: THREE.Mesh; base: THREE.Vector3; dir: THREE.Vector3 }> = [];
  // Deterministic layout (§123 visual-regression rule)
  const rand = mulberry32(7);

  for (let i = 0; i < 14; i++) {
    const w = 0.6 + rand() * 1.4;
    const h = 0.6 + rand() * 1.8;
    const d = 0.15 + rand() * 0.3;
    const shard = makeBox(w, h, d, PALETTE.surface, PALETTE.signal);
    const base = new THREE.Vector3(
      (rand() - 0.5) * 4,
      (rand() - 0.5) * 4,
      (rand() - 0.5) * 2,
    );
    shard.mesh.position.copy(base);
    shard.mesh.rotation.set(rand(), rand(), rand());
    group.add(shard.mesh);
    shards.push({
      mesh: shard.mesh,
      base: base.clone(),
      dir: new THREE.Vector3(
        (rand() - 0.5) * 6,
        (rand() - 0.5) * 5,
        (rand() - 0.5) * 4,
      ),
    });
    disposables.push(shard.dispose);
  }

  // Scoped lighting: a hard key and deep-cool rim sell the fracture drama;
  // emissive shards catch the rim as they disperse
  addEnvLights(group, 1.3, 2.4);

  return {
    object3D: group,
    update: (_t, local) => {
      // 0→0.5: fracture apart · 0.5→1: reassemble (Phase 03 scene 07)
      const fracture = local < 0.5 ? local * 2 : (1 - local) * 2;
      shards.forEach(({ mesh, base, dir }) => {
        mesh.position.copy(base).addScaledVector(dir, fracture * fracture);
        const material = mesh.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = 0.1 + fracture * 0.9;
      });
    },
    dispose: () => disposables.forEach((fn) => fn()),
  };
}

/**
 * §43/§78 — project exhibits. Each featured project is a spatial exhibit
 * derived from what the project actually is — never a generic prop:
 *   Vizquo → inspection ring + glass sample + sweeping scan lines
 *   Qupay  → sealed chambers; a value packet cleared gate by gate
 *   Medium → document slabs; a draft rises through publish states
 *   Block Swap → chain links; a value pulse hands off block to block
 * (Hilo keeps its dedicated network graph — see createNetworkGraph.)
 */

/** PROJECT_VIZQUO — inspection/x-ray laboratory (metaphor: see beyond the surface) */
export function createVizquoExhibit(anchor: [number, number, number]): EnvHandle {
  const group = new THREE.Group();
  group.position.set(...anchor);
  const disposables: Array<() => void> = [];

  // The inspected sample: smoked glass slab — the "webpage" under analysis.
  // A faint self-illumination keeps the slab legible as an object against
  // the void (transmission glass alone reads as a hole in the frame).
  const sampleGeometry = new THREE.BoxGeometry(1.6, 2.2, 0.12);
  const sampleMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x1a2126,
    metalness: 0.1,
    roughness: 0.15,
    transmission: 0.55,
    thickness: 0.4,
    transparent: true,
    opacity: 0.9,
    emissive: 0x11181d,
    emissiveIntensity: 0.5,
  });
  const sample = new THREE.Mesh(sampleGeometry, sampleMaterial);
  group.add(sample);
  disposables.push(() => {
    sampleGeometry.dispose();
    sampleMaterial.dispose();
  });

  // Internal structure revealed as the camera orbits (x-ray story)
  const innerGeometry = new THREE.IcosahedronGeometry(0.55, 1);
  const innerMaterial = new THREE.MeshBasicMaterial({
    color: PALETTE.signal,
    wireframe: true,
    transparent: true,
    opacity: 0.15,
  });
  const inner = new THREE.Mesh(innerGeometry, innerMaterial);
  group.add(inner);
  disposables.push(() => {
    innerGeometry.dispose();
    innerMaterial.dispose();
  });

  // Inspection ring — the recurring aperture motif as the instrument
  const ringGeometry = new THREE.TorusGeometry(2.1, 0.02, 8, 96);
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: PALETTE.warmWhite,
    transparent: true,
    opacity: 0.45,
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = Math.PI / 2.2;
  group.add(ring);
  disposables.push(() => {
    ringGeometry.dispose();
    ringMaterial.dispose();
  });

  // Scan lines sweeping the sample — the inspector reading the surface.
  // One material per line so each sweeps with its own brightness.
  const scanGeometry = new THREE.PlaneGeometry(1.8, 0.02);
  const scans: Array<{ mesh: THREE.Mesh; material: THREE.MeshBasicMaterial }> = [];
  for (let i = 0; i < 3; i++) {
    const scanMaterial = new THREE.MeshBasicMaterial({
      color: PALETTE.signal,
      transparent: true,
      opacity: 0,
    });
    const scan = new THREE.Mesh(scanGeometry, scanMaterial);
    scan.position.z = 0.09;
    group.add(scan);
    scans.push({ mesh: scan, material: scanMaterial });
  }
  disposables.push(() => {
    scanGeometry.dispose();
    scans.forEach(({ material }) => material.dispose());
  });

  const { key, rim } = addEnvLights(group, 1.1, 2.2);

  return {
    object3D: group,
    update: (t, local) => {
      const engage = THREE.MathUtils.smoothstep(local, 0.1, 0.5);
      sample.rotation.y = Math.sin(t * 0.3) * 0.08;
      inner.rotation.y = t * 0.5;
      inner.rotation.x = t * 0.3;
      innerMaterial.opacity = 0.25 + engage * 0.75;
      ring.rotation.z = t * 0.15;
      ringMaterial.opacity = 0.25 + engage * 0.45;
      // Scan lines sweep downward through the sample, staggered. Slower
      // sweep = lower duty cycle gap: the instrument always shows at least
      // one line mid-pass in any still capture (§124 frame-perfect rule).
      scans.forEach(({ mesh, material }, i) => {
        const phase = (t * 0.22 + i / scans.length) % 1;
        mesh.position.y = 1.1 - phase * 2.2;
        material.opacity = Math.sin(phase * Math.PI) * (0.4 + engage * 0.6);
      });
      key.intensity = 0.5 + engage * 0.7;
      rim.intensity = 1.1 + engage * 1.8;
    },
    dispose: () => disposables.forEach((fn) => fn()),
  };
}

/** PROJECT_QUPAY — sealed transaction chambers (metaphor: money moves carefully) */
export function createQupayExhibit(anchor: [number, number, number]): EnvHandle {
  const group = new THREE.Group();
  group.position.set(...anchor);
  const disposables: Array<() => void> = [];

  // Four security gates the value packet must clear (auth → accounts →
  // balances → transactions — the project's real architecture order)
  const gateGeometry = new THREE.TorusGeometry(0.9, 0.05, 8, 48);
  const gateMaterials: THREE.MeshStandardMaterial[] = [];
  const gates: THREE.Mesh[] = [];
  for (let i = 0; i < 4; i++) {
    const gateMaterial = new THREE.MeshStandardMaterial({
      color: PALETTE.graphite,
      metalness: 0.6,
      roughness: 0.35,
      emissive: 0x9fd8ff, // cool financial blue — precise, not crypto-neon
      emissiveIntensity: 0.12,
    });
    const gate = new THREE.Mesh(gateGeometry, gateMaterial);
    gate.position.z = -i * 1.5;
    group.add(gate);
    gates.push(gate);
    gateMaterials.push(gateMaterial);
    disposables.push(() => {
      gateGeometry.dispose();
      gateMaterial.dispose();
    });
  }

  // The value packet — a small emissive vault cube traveling the conduit
  const packetGeometry = new THREE.BoxGeometry(0.18, 0.18, 0.18);
  const packetMaterial = new THREE.MeshBasicMaterial({ color: 0x9fd8ff });
  const packet = new THREE.Mesh(packetGeometry, packetMaterial);
  group.add(packet);
  disposables.push(() => {
    packetGeometry.dispose();
    packetMaterial.dispose();
  });

  const { key, rim } = addEnvLights(group, 1.0, 1.8);

  return {
    object3D: group,
    update: (t, local) => {
      const engage = THREE.MathUtils.smoothstep(local, 0.1, 0.5);
      // Packet clears each gate in sequence; gates light on approach
      const travel = (t * 0.22) % 1;
      const packetZ = travel * -6;
      packet.position.set(0, 0, packetZ);
      gates.forEach((gate, i) => {
        const gateZ = -i * 1.5;
        const distance = Math.abs(packetZ - gateZ);
        const near = THREE.MathUtils.smoothstep(0.9 - distance, 0, 0.9);
        gateMaterials[i].emissiveIntensity = 0.1 + near * 0.9;
      });
      // Gates slowly rotate as locks cycling
      gates.forEach((gate, i) => {
        gate.rotation.z = t * (0.1 + i * 0.03);
      });
      key.intensity = 0.5 + engage * 0.6;
      rim.intensity = 0.8 + engage * 1.1;
    },
    dispose: () => disposables.forEach((fn) => fn()),
  };
}

/** PROJECT_MEDIUM — publishing architecture (metaphor: writing becomes structure) */
export function createMediumExhibit(anchor: [number, number, number]): EnvHandle {
  const group = new THREE.Group();
  group.position.set(...anchor);
  const disposables: Array<() => void> = [];

  // Document slabs — the relational structure as quiet architecture
  const slabGeometry = new THREE.BoxGeometry(2.6, 0.1, 1.7);
  const slabs: Array<{ mesh: THREE.Mesh; material: THREE.MeshStandardMaterial; y: number }> = [];
  for (let i = 0; i < 4; i++) {
    const slabMaterial = new THREE.MeshStandardMaterial({
      color: PALETTE.surface,
      metalness: 0.3,
      roughness: 0.6,
      emissive: PALETTE.warmWhite, // soft editorial light
      emissiveIntensity: 0.05,
    });
    const slab = new THREE.Mesh(slabGeometry, slabMaterial);
    const y = -1.05 + i * 0.7;
    slab.position.set(0, y, 0);
    group.add(slab);
    slabs.push({ mesh: slab, material: slabMaterial, y });
    disposables.push(() => {
      slabGeometry.dispose();
      slabMaterial.dispose();
    });
  }

  // The draft — a bright page rising through the publish states
  const draftGeometry = new THREE.BoxGeometry(1.7, 0.04, 1.15);
  const draftMaterial = new THREE.MeshBasicMaterial({
    color: PALETTE.warmWhite,
    transparent: true,
    opacity: 0.7,
  });
  const draft = new THREE.Mesh(draftGeometry, draftMaterial);
  group.add(draft);
  disposables.push(() => {
    draftGeometry.dispose();
    draftMaterial.dispose();
  });

  const { key, rim } = addEnvLights(group, 0.9, 1.4);

  return {
    object3D: group,
    update: (t, local) => {
      const engage = THREE.MathUtils.smoothstep(local, 0.1, 0.5);
      // Slabs breathe apart as the viewer arrives (relational layers opening)
      slabs.forEach(({ mesh, material, y }, i) => {
        mesh.position.y = y + Math.sin(t * 0.4 + i) * 0.03 + engage * i * 0.05;
        material.emissiveIntensity = 0.04 + engage * (0.14 + i * 0.02);
      });
      // The draft rises through publish states, settling when published
      const rise = (t * 0.12) % 1;
      draft.position.y = -1.3 + rise * 2.7;
      draft.position.x = Math.sin(rise * Math.PI) * 0.1;
      draftMaterial.opacity = 0.45 + Math.sin(rise * Math.PI) * 0.35;
      key.intensity = 0.5 + engage * 0.5;
      rim.intensity = 0.7 + engage * 0.8;
    },
    dispose: () => disposables.forEach((fn) => fn()),
  };
}

/** PROJECT_BLOCK_SWAP — the chain (metaphor: value hands off block to block) */
export function createBlockSwapExhibit(anchor: [number, number, number]): EnvHandle {
  const group = new THREE.Group();
  group.position.set(...anchor);
  const disposables: Array<() => void> = [];

  // Linked blocks — a literal chain of value
  const linkGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
  const edgeGeometry = new THREE.EdgesGeometry(linkGeometry);
  const blockMaterials: THREE.MeshStandardMaterial[] = [];
  const linkLines: THREE.LineSegments[] = [];
  const blocks: THREE.Mesh[] = [];
  const COUNT = 6;
  for (let i = 0; i < COUNT; i++) {
    const blockMaterial = new THREE.MeshStandardMaterial({
      color: PALETTE.surface,
      metalness: 0.5,
      roughness: 0.5,
      emissive: PALETTE.signal,
      emissiveIntensity: 0.06,
    });
    const block = new THREE.Mesh(linkGeometry, blockMaterial);
    block.position.set((i - (COUNT - 1) / 2) * 1.15, Math.sin(i * 1.1) * 0.15, 0);
    group.add(block);
    blocks.push(block);
    blockMaterials.push(blockMaterial);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: PALETTE.signal,
      transparent: true,
      opacity: 0.25,
    });
    const line = new THREE.LineSegments(edgeGeometry, lineMaterial);
    block.add(line);
    linkLines.push(line);
    disposables.push(() => {
      blockMaterial.dispose();
      lineMaterial.dispose();
    });
  }
  disposables.push(() => {
    linkGeometry.dispose();
    edgeGeometry.dispose();
  });

  // The value pulse handed along the chain
  const pulseGeometry = new THREE.SphereGeometry(0.09, 8, 8);
  const pulseMaterial = new THREE.MeshBasicMaterial({ color: PALETTE.signal });
  const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
  group.add(pulse);
  disposables.push(() => {
    pulseGeometry.dispose();
    pulseMaterial.dispose();
  });

  const { key, rim } = addEnvLights(group, 1.1, 1.8);

  return {
    object3D: group,
    update: (t, local) => {
      const engage = THREE.MathUtils.smoothstep(local, 0.1, 0.5);
      // The chain gently sways as one rigid structure (blocks are linked —
      // they cannot move independently; that's the point of a chain)
      blocks.forEach((block, i) => {
        block.rotation.y = Math.sin(t * 0.3 + i * 0.5) * 0.08;
      });
      // Value pulse hands off block to block
      const handoff = (t * 0.3) % COUNT;
      const index = Math.floor(handoff);
      const frac = handoff - index;
      const from = blocks[index].position;
      const to = blocks[(index + 1) % COUNT].position;
      pulse.position.lerpVectors(from, to, frac);
      // The block currently holding the value lights up
      blockMaterials.forEach((material, i) => {
        const holding = i === index ? 1 - frac : i === (index + 1) % COUNT ? frac : 0;
        material.emissiveIntensity = 0.06 + holding * 0.9 * (0.4 + engage * 0.6);
      });
      linkLines.forEach((line) => {
        (line.material as THREE.LineBasicMaterial).opacity = 0.15 + engage * 0.3;
      });
      key.intensity = 0.6 + engage * 0.6;
      rim.intensity = 0.9 + engage * 1.0;
    },
    dispose: () => disposables.forEach((fn) => fn()),
  };
}

/** FINALE — the connected world: every scene anchor as a signal node, linked */
export function createFinaleWorld(
  anchors: Array<[number, number, number]>,
): EnvHandle {
  const group = new THREE.Group();
  const disposables: Array<() => void> = [];

  const nodeGeometry = new THREE.SphereGeometry(3.2, 12, 12);
  const nodeMaterial = new THREE.MeshBasicMaterial({
    color: 0xc8ff3d,
    transparent: true,
    opacity: 0.85,
  });
  disposables.push(() => {
    nodeGeometry.dispose();
    nodeMaterial.dispose();
  });

  const nodes: THREE.Mesh[] = [];
  for (const anchor of anchors) {
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
    node.position.set(...anchor);
    group.add(node);
    nodes.push(node);
  }

  const lineMaterials: THREE.LineBasicMaterial[] = [];
  for (let i = 0; i < anchors.length - 1; i++) {
    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(...anchors[i]),
      new THREE.Vector3(...anchors[i + 1]),
    ]);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xf1efe8,
      transparent: true,
      opacity: 0.18,
    });
    group.add(new THREE.Line(lineGeometry, lineMaterial));
    lineMaterials.push(lineMaterial);
    disposables.push(() => {
      lineGeometry.dispose();
      lineMaterial.dispose();
    });
  }

  return {
    object3D: group,
    update: (t, local) => {
      nodes.forEach((node, i) => {
        node.scale.setScalar(0.6 + local * 0.6 + Math.sin(t * 1.5 + i) * 0.12);
      });
      nodeMaterial.opacity = 0.5 + local * 0.5;
      lineMaterials.forEach((m) => {
        m.opacity = 0.1 + local * 0.35;
      });
    },
    dispose: () => disposables.forEach((fn) => fn()),
  };
}

/** SYSTEMS — blueprint grid with self-drawing lines */
export function createBlueprint(anchor: [number, number, number]): EnvHandle {
  const group = new THREE.Group();
  group.position.set(...anchor);
  const disposables: Array<() => void> = [];

  const gridHelper = new THREE.GridHelper(36, 24, PALETTE.secondaryGray, PALETTE.surface);
  gridHelper.position.y = -2;
  (gridHelper.material as THREE.Material).transparent = true;
  group.add(gridHelper);
  disposables.push(() => (gridHelper.material as THREE.Material).dispose());

  const nodes: THREE.Mesh[] = [];
  for (let i = 0; i < 7; i++) {
    const nodeGeometry = new THREE.OctahedronGeometry(0.3);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: PALETTE.signal,
      transparent: true,
      opacity: 0.4,
      wireframe: true,
    });
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
    node.position.set((i - 3) * 2.4, Math.sin(i * 1.7) * 0.8, Math.cos(i * 2.1) * 1.5);
    group.add(node);
    nodes.push(node);
    disposables.push(() => {
      nodeGeometry.dispose();
      nodeMaterial.dispose();
    });
  }

  return {
    object3D: group,
    update: (t, local) => {
      gridHelper.scale.setScalar(0.6 + local * 0.4);
      // Blueprint lines must clear the void: brighter opacity ramp and a
      // warm center line so the "system diagram, alive" actually reads
      (gridHelper.material as THREE.Material).opacity = 0.3 + local * 0.5;
      nodes.forEach((node, i) => {
        node.rotation.y = t * (0.4 + i * 0.05);
        node.position.y = Math.sin(t * 0.9 + i * 1.3) * 0.8;
        const material = node.material as THREE.MeshBasicMaterial;
        material.opacity = 0.4 + local * 0.5;
      });
    },
    dispose: () => disposables.forEach((fn) => fn()),
  };
}

/** ABOUT/NOW — minimal calm geometry */
export function createCalmScene(anchor: [number, number, number]): EnvHandle {
  const group = new THREE.Group();
  group.position.set(...anchor);
  const geometry = new THREE.SphereGeometry(1.4, 48, 48);
  const material = new THREE.MeshStandardMaterial({
    color: PALETTE.surface,
    metalness: 0.55,
    roughness: 0.6,
  });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.y = -0.2;
  group.add(sphere);

  // Soft studio wrap so the object reads against the void (scene 13/14:
  // "minimal geometry in soft neutral light" — light must be visible)
  const { key, rim } = addEnvLights(group, 0.9, 1.8);
  key.position.set(4, 8, 6);

  return {
    object3D: group,
    update: (t) => {
      // A single object breathes slowly (Phase 03 scene 14)
      const breath = 1 + Math.sin(t * 0.5) * 0.02;
      sphere.scale.setScalar(breath);
    },
    dispose: () => {
      geometry.dispose();
      material.dispose();
    },
  };
}

/**
 * HILO — the social graph (storyboard: "users → posts → comments as nodes
 * and edges; signal pulses along edges"). A hub with person nodes in orbit,
 * post/comment satellites, edges that grow in with progress, and bright
 * pulses traveling the main edges.
 */
export function createNetworkGraph(anchor: [number, number, number]): EnvHandle {
  const group = new THREE.Group();
  group.position.set(...anchor);
  const disposables: Array<() => void> = [];

  // Deterministic composition — stable framing across runs (§123)
  const rand = mulberry32(11);

  const people: THREE.Vector3[] = [];
  const satellites: Array<{ pos: THREE.Vector3; owner: number }> = [];
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2;
    people.push(new THREE.Vector3(Math.cos(a) * 3.4, Math.sin(a * 2) * 1.5, Math.sin(a) * 2.2));
    for (let j = 0; j < 3; j++) {
      satellites.push({
        pos: new THREE.Vector3(
          people[i].x + (rand() - 0.5) * 2.2,
          people[i].y + (rand() - 0.5) * 1.8,
          people[i].z + (rand() - 0.5) * 2.2,
        ),
        owner: i,
      });
    }
  }

  const nodeGeometry = new THREE.SphereGeometry(1, 16, 16);
  disposables.push(() => nodeGeometry.dispose());
  const hubMaterial = new THREE.MeshStandardMaterial({
    color: PALETTE.surface,
    metalness: 0.85,
    roughness: 0.3,
    emissive: PALETTE.signal,
    emissiveIntensity: 0.25,
  });
  const personMaterial = new THREE.MeshStandardMaterial({
    color: PALETTE.surface,
    metalness: 0.7,
    roughness: 0.45,
    emissive: PALETTE.signal,
    emissiveIntensity: 0.12,
  });
  const satelliteMaterial = new THREE.MeshBasicMaterial({
    color: PALETTE.warmWhite,
    transparent: true,
    opacity: 0.35,
  });
  disposables.push(() => {
    hubMaterial.dispose();
    personMaterial.dispose();
    satelliteMaterial.dispose();
  });

  const peopleMeshes: THREE.Mesh[] = [];
  for (const pos of people) {
    const node = new THREE.Mesh(nodeGeometry, personMaterial);
    node.position.copy(pos);
    node.scale.setScalar(0.3);
    group.add(node);
    peopleMeshes.push(node);
  }
  for (const s of satellites) {
    const node = new THREE.Mesh(nodeGeometry, satelliteMaterial);
    node.position.copy(s.pos);
    node.scale.setScalar(0.11);
    group.add(node);
  }
  const hub = new THREE.Mesh(nodeGeometry, hubMaterial);
  hub.scale.setScalar(0.55);
  group.add(hub);

  // Edges: hub→person and person→satellites, each with its own material so
  // growth can be staggered per edge ("connection lines grow per interaction")
  const edgeMaterials: THREE.LineBasicMaterial[] = [];
  const addEdge = (a: THREE.Vector3, b: THREE.Vector3) => {
    const edgeGeometry = new THREE.BufferGeometry().setFromPoints([a, b]);
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: PALETTE.warmWhite,
      transparent: true,
      opacity: 0,
    });
    group.add(new THREE.Line(edgeGeometry, edgeMaterial));
    edgeMaterials.push(edgeMaterial);
    disposables.push(() => {
      edgeGeometry.dispose();
      edgeMaterial.dispose();
    });
  };
  people.forEach((p, i) => addEdge(new THREE.Vector3(0, 0, 0), p));
  satellites.forEach((s) => addEdge(people[s.owner], s.pos));

  // Signal pulses traveling the hub edges (storyboard atmosphere layer)
  const pulseGeometry = new THREE.SphereGeometry(0.07, 8, 8);
  const pulseMaterial = new THREE.MeshBasicMaterial({ color: PALETTE.signal });
  disposables.push(() => {
    pulseGeometry.dispose();
    pulseMaterial.dispose();
  });
  const pulses: Array<{ mesh: THREE.Mesh; edge: number; speed: number }> = [];
  people.forEach((p, i) => {
    const mesh = new THREE.Mesh(pulseGeometry, pulseMaterial);
    group.add(mesh);
    pulses.push({ mesh, edge: i, speed: 0.25 + (i % 3) * 0.08 });
  });

  // Scoped lighting so the graph reads against the void
  const { key, rim } = addEnvLights(group, 1.2, 2.0);

  return {
    object3D: group,
    update: (t, local) => {
      const arrive = THREE.MathUtils.smoothstep(local, 0, 0.4);
      peopleMeshes.forEach((node, i) => {
        node.position.y = people[i].y + Math.sin(t * 0.8 + i * 1.7) * 0.12;
        (node.material as THREE.MeshStandardMaterial).emissiveIntensity =
          0.1 + arrive * 0.3;
      });
      hub.rotation.y = t * 0.2;
      hubMaterial.emissiveIntensity = 0.2 + arrive * 0.5;
      satelliteMaterial.opacity = 0.15 + arrive * 0.3;
      edgeMaterials.forEach((m, i) => {
        // Staggered growth: each edge draws in over its own progress window
        m.opacity = THREE.MathUtils.smoothstep(local, i / edgeMaterials.length, (i + 8) / edgeMaterials.length) * 0.4;
      });
      pulses.forEach(({ mesh, edge, speed }) => {
        const phase = (t * speed + edge * 0.37) % 1;
        mesh.position.lerpVectors(people[edge], new THREE.Vector3(0, 0, 0), phase);
        mesh.visible = arrive > 0.3;
      });
      key.intensity = 0.6 + arrive * 0.8;
      rim.intensity = 1.0 + arrive * 1.2;
    },
    dispose: () => disposables.forEach((fn) => fn()),
  };
}
