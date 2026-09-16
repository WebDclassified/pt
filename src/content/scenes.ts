/**
 * Scene registry — Phase 03 (screenplay) + Phase 04 (shot design) as data.
 * The experience engine (Phase 15) consumes this registry; scenes map to
 * state-machine states from Phase 06. Each entry is a storyboard contract:
 * DOM beats are authoritative content; 3D treatment is enhancement.
 */

export type SceneState =
  | "BOOT"
  | "INTRO"
  | "ORIGIN"
  | "IDENTITY"
  | "SYSTEM"
  | "EXPERIENCE"
  | "PROJECT_VIZQUO"
  | "PROJECT_QUPAY"
  | "FAILURE"
  | "REBUILD"
  | "PROJECT_HILO"
  | "PROJECT_MEDIUM"
  | "PROJECT_BLOCK_SWAP"
  | "SYSTEMS"
  | "LAB"
  | "ABOUT"
  | "NOW"
  | "CONTACT"
  | "FINALE";

export type CameraGrammar =
  | "lock-off"
  | "push-in"
  | "orbit"
  | "tracking"
  | "pull-back"
  | "wide-establishing"
  | "controlled-tilt";

export type TransitionFamily =
  | "aperture-wipe"
  | "physical-occlusion"
  | "camera-traversal"
  | "morph"
  | "shader-dissolve"
  | "particle-transformation"
  | "light-sweep"
  | "match-cut";

export interface SceneConfig {
  id: SceneState;
  sequence: string;
  title: string;
  narrativePurpose: string;
  /** Emotional beat from the pacing curve in Phase 03 */
  emotion: string;
  focalPoint: string;
  camera: { grammar: CameraGrammar; note: string };
  depthLayers: { foreground: string; midground: string; background: string; atmosphere: string };
  domBeats: { heading: string; body?: string[]; metadata?: string[] };
  threeDTreatment: string;
  transitionIn: TransitionFamily;
  transitionOut: TransitionFamily;
  audioIdentity: string;
  /** Relative scroll weight of this scene on the master timeline */
  weight: number;
}

export const scenes: SceneConfig[] = [
  {
    id: "INTRO",
    sequence: "00",
    title: "PROLOGUE",
    narrativePurpose: "Establish mystery; the visitor arrives in darkness.",
    emotion: "mystery",
    focalPoint: "A single point of light in blackness",
    camera: { grammar: "lock-off", note: "Absolute stillness — only the light moves" },
    depthLayers: {
      foreground: "The point of light",
      midground: "none — pure void",
      background: "none",
      atmosphere: "faint vignette",
    },
    domBeats: {
      heading: "Everything begins with an idea.",
      metadata: ["BUILD / BREAK / REBUILD", "A portfolio by Prabhat Teotia"],
    },
    threeDTreatment: "Single emissive point; scale grows with scroll progress",
    transitionIn: "light-sweep",
    transitionOut: "aperture-wipe",
    audioIdentity: "near silence; low room tone (opt-in)",
    weight: 0.5,
  },
  {
    id: "ORIGIN",
    sequence: "01",
    title: "ARRIVAL",
    narrativePurpose: "First sense of scale — architectural void.",
    emotion: "reveal",
    focalPoint: "The Core, distant and faint",
    camera: { grammar: "wide-establishing", note: "Slow push toward the void" },
    depthLayers: {
      foreground: "none",
      midground: "The Core (distant)",
      background: "monolithic architectural planes",
      atmosphere: "light fog, drifting dust",
    },
    domBeats: {
      heading: "A structure is taking shape.",
      body: ["Every system starts as a shape in the dark."],
    },
    threeDTreatment: "Procedural monoliths; fog density tied to progress",
    transitionIn: "aperture-wipe",
    transitionOut: "camera-traversal",
    audioIdentity: "spacious ambience (opt-in)",
    weight: 1,
  },
  {
    id: "IDENTITY",
    sequence: "02",
    title: "IDENTITY",
    narrativePurpose: "Introduce Prabhat — who, what, positioning.",
    emotion: "clarity",
    focalPoint: "Name typography over The Core",
    camera: { grammar: "push-in", note: "Steady approach; Core responds to keywords" },
    depthLayers: {
      foreground: "Name + role typography",
      midground: "The Core (closer, signal nodes active)",
      background: "architectural void",
      atmosphere: "subtle dust",
    },
    domBeats: {
      heading: "Prabhat Teotia",
      body: [
        "Software Developer / Full-Stack Developer.",
        "I build systems: interfaces, payment rails, social platforms, publishing engines — and the tools that inspect them.",
      ],
      metadata: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    },
    threeDTreatment: "Core pulse synchronizes with keyword reveals",
    transitionIn: "camera-traversal",
    transitionOut: "morph",
    audioIdentity: "spacious ambience (opt-in)",
    weight: 1.5,
  },
  {
    id: "SYSTEM",
    sequence: "03",
    title: "ENTER THE SYSTEM",
    narrativePurpose: "The Core opens; we enter the physicalized architecture.",
    emotion: "discovery",
    focalPoint: "Aperture opening in The Core",
    camera: { grammar: "tracking", note: "Travel through the aperture" },
    depthLayers: {
      foreground: "aperture ring",
      midground: "interior structure",
      background: "architecture interior",
      atmosphere: "light streaks",
    },
    domBeats: {
      heading: "Inside the system.",
      body: ["Software is architecture. Let's walk through it."],
    },
    threeDTreatment: "Aperture motif debuts; interior light increases",
    transitionIn: "morph",
    transitionOut: "camera-traversal",
    audioIdentity: "transition whoosh (opt-in)",
    weight: 1,
  },
  {
    id: "EXPERIENCE",
    sequence: "04",
    title: "EXPERIENCE",
    narrativePurpose: "Career milestones as environmental markers along a timeline.",
    emotion: "scale",
    focalPoint: "The long corridor of markers",
    camera: { grammar: "tracking", note: "Continuous lateral dolly past milestones" },
    depthLayers: {
      foreground: "milestone markers (DOM cards)",
      midground: "corridor structure",
      background: "receding architecture",
      atmosphere: "directional light shafts",
    },
    domBeats: {
      heading: "The path so far.",
      body: [
        "GenAI Intern — IBM (PBEL Program) · Aug 2025 – Oct 2025",
        "Full Stack Developer — Project-Based · 2024 – Present",
        "Secretary — HexClan, LIET · Sept 2025 – Present",
        "Executive Member — NDLI Club · 2024 – Present",
      ],
      metadata: ["IBM", "HexClan", "NDLI"],
    },
    threeDTreatment: "Markers light up sequentially with signal accent",
    transitionIn: "camera-traversal",
    transitionOut: "light-sweep",
    audioIdentity: "precise/dry (opt-in)",
    weight: 1.5,
  },
  {
    id: "PROJECT_VIZQUO",
    sequence: "05",
    title: "PROJECT 01 — VIZQUO",
    narrativePurpose: "Flagship artifact: inspection laboratory, x-ray metaphor.",
    emotion: "technical clarity",
    focalPoint: "The artifact switching surface → inspection layers",
    camera: { grammar: "orbit", note: "Inspection orbit around the artifact" },
    depthLayers: {
      foreground: "project metadata + CTA (DOM)",
      midground: "interface artifact with layers",
      background: "laboratory environment",
      atmosphere: "scan-line glow",
    },
    domBeats: {
      heading: "Vizquo — see beyond the surface.",
      body: [
        "Open-source browser extension that inspects any webpage and extracts its design system — 100% local.",
        "Element inspector · Design DNA · Asset extraction · Audits · Responsive Time Machine",
        "Every value labeled: Detected / Derived / Inferred.",
      ],
      metadata: ["TypeScript", "Chrome MV3", "Firefox MV3", "MIT", "Creator / Maintainer"],
    },
    threeDTreatment: "Layer peel: surface → computed styles → tokens → audits",
    transitionIn: "light-sweep",
    transitionOut: "aperture-wipe",
    audioIdentity: "precise/dry (opt-in)",
    weight: 2,
  },
  {
    id: "PROJECT_QUPAY",
    sequence: "06",
    title: "PROJECT 02 — QUPAY",
    narrativePurpose: "Payment architecture becomes physical — financially precise.",
    emotion: "precision",
    focalPoint: "Transaction flow through secure channels",
    camera: { grammar: "tracking", note: "Follow a payment through the system" },
    depthLayers: {
      foreground: "project metadata (DOM)",
      midground: "auth → accounts → balances → transactions components",
      background: "vault architecture",
      atmosphere: "restrained, cool light",
    },
    domBeats: {
      heading: "Qupay — money moves carefully.",
      body: [
        "Digital wallet with authentication, balance management, and transactions.",
        "JWT-based auth · protected routes · schemas for users, accounts, balances",
      ],
      metadata: ["Node.js", "Express", "MongoDB", "React", "JWT"],
    },
    threeDTreatment: "Value packets travel sealed conduits; no crypto-neon",
    transitionIn: "aperture-wipe",
    transitionOut: "shader-dissolve",
    audioIdentity: "precise/dry (opt-in)",
    weight: 1.5,
  },
  {
    id: "FAILURE",
    sequence: "07",
    title: "FAILURE / REBUILD",
    narrativePurpose: "Controlled failure sequence — real engineering challenge only (repository-verified).",
    emotion: "tension → resolution",
    focalPoint: "A fracture propagating, then reassembly",
    camera: { grammar: "controlled-tilt", note: "Unsettling tilt during fracture; recovery on rebuild" },
    depthLayers: {
      foreground: "fracture shards",
      midground: "broken structure",
      background: "dark environment",
      atmosphere: "fragmented light",
    },
    domBeats: {
      heading: "Break it. Understand it. Rebuild it.",
      body: [
        "Every system here was built, stress-tested, and rebuilt where it failed.",
        "// TODO(Phase 03/07 gate): cite one repository-verified challenge from a featured project before publishing specifics.",
      ],
      metadata: ["DEBUGGING", "ITERATION", "RESILIENCE"],
    },
    threeDTreatment: "Fracture shader → particle dispersal → reassembly",
    transitionIn: "shader-dissolve",
    transitionOut: "particle-transformation",
    audioIdentity: "low-frequency tension texture (opt-in)",
    weight: 1,
  },
  {
    id: "PROJECT_HILO",
    sequence: "08",
    title: "PROJECT 03 — HILO",
    narrativePurpose: "Social graph as networked environment.",
    emotion: "connection",
    focalPoint: "The social graph lighting up",
    camera: { grammar: "orbit", note: "Slow orbit around the network" },
    depthLayers: {
      foreground: "project metadata (DOM)",
      midground: "users → posts → comments as nodes and edges",
      background: "network depth",
      atmosphere: "signal pulses along edges",
    },
    domBeats: {
      heading: "Hilo — people, posts, and the space between.",
      body: [
        "Social platform for posting, interaction, and real-time communication.",
        "Posts · comments · profiles · JWT auth · MERN",
      ],
      metadata: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    },
    threeDTreatment: "Graph nodes; connection lines grow per interaction",
    transitionIn: "particle-transformation",
    transitionOut: "morph",
    audioIdentity: "spacious ambience (opt-in)",
    weight: 1.5,
  },
  {
    id: "PROJECT_MEDIUM",
    sequence: "09",
    title: "PROJECT 04 — MEDIUM BLOG",
    narrativePurpose: "Publishing environment — typography becomes architecture.",
    emotion: "quiet focus",
    focalPoint: "Typographic slabs forming a document structure",
    camera: { grammar: "push-in", note: "Move through the editorial layers" },
    depthLayers: {
      foreground: "project metadata (DOM)",
      midground: "document/blog slabs",
      background: "relational schema walls",
      atmosphere: "soft even light",
    },
    domBeats: {
      heading: "Medium Blog Platform — where writing becomes structure.",
      body: [
        "Create, publish, and read — on a relational, type-safe core.",
        "React · Hono · PostgreSQL · TypeScript · JWT",
      ],
      metadata: ["React", "Hono", "PostgreSQL", "TypeScript"],
    },
    threeDTreatment: "Typographic volumes; relational model as walls",
    transitionIn: "morph",
    transitionOut: "light-sweep",
    audioIdentity: "nearly silent (opt-in)",
    weight: 1.5,
  },
  {
    id: "PROJECT_BLOCK_SWAP",
    sequence: "10",
    title: "PROJECT 05 — BLOCK SWAP",
    narrativePurpose: "Blockchain-inspired transaction flow — abstract, learning project.",
    emotion: "curiosity",
    focalPoint: "Blocks exchanging value along a chain",
    camera: { grammar: "tracking", note: "Move along the chain" },
    depthLayers: {
      foreground: "project metadata (DOM)",
      midground: "linked blocks",
      background: "abstract network depth",
      atmosphere: "measured pulses — clearly not crypto-neon",
    },
    domBeats: {
      heading: "Block Swap — learning by building.",
      body: [
        "A blockchain-inspired swapping interface for learning decentralized concepts.",
      ],
      metadata: ["React", "Web3", "JavaScript", "Learning project"],
    },
    threeDTreatment: "Chain of linked blocks; value pulses hand off between them",
    transitionIn: "light-sweep",
    transitionOut: "camera-traversal",
    audioIdentity: "electronic/experimental (opt-in)",
    weight: 1,
  },
  {
    id: "SYSTEMS",
    sequence: "11",
    title: "SYSTEMS / ENGINEERING",
    narrativePurpose: "Technical x-ray of how Prabhat approaches frontend, backend, data, APIs, auth.",
    emotion: "technical clarity",
    focalPoint: "The system diagram, alive",
    camera: { grammar: "wide-establishing", note: "Locked wide; systems animate within frame" },
    depthLayers: {
      foreground: "DOM: engineering principles",
      midground: "live system diagram",
      background: "blueprint grid",
      atmosphere: "blueprint lines",
    },
    domBeats: {
      heading: "How I engineer.",
      body: [
        "Frontend: React + TypeScript, accessible and fast.",
        "Backend: Node.js/Express, secure APIs with JWT.",
        "Data: MongoDB and PostgreSQL, modeled for the domain.",
      ],
      metadata: ["APIS", "AUTH", "DATA", "UI"],
    },
    threeDTreatment: "Blueprint scene — lines draw themselves",
    transitionIn: "camera-traversal",
    transitionOut: "shader-dissolve",
    audioIdentity: "precise/dry (opt-in)",
    weight: 1,
  },
  {
    id: "LAB",
    sequence: "12",
    title: "LAB",
    narrativePurpose: "Experimental creative technology — only real experiments, once built.",
    emotion: "play",
    focalPoint: "The current experiment",
    camera: { grammar: "orbit", note: "Free-ish orbit; user drags to inspect" },
    depthLayers: {
      foreground: "experiment controls (DOM)",
      midground: "live experiment artifact",
      background: "dark lab",
      atmosphere: "experimental lighting",
    },
    domBeats: {
      heading: "The lab.",
      body: ["Live experiments, playable in your browser.", "Nothing staged."],
      metadata: ["GPU PARTICLES", "CELLULAR SYSTEMS", "PLAYABLE", "/LAB"],
    },
    threeDTreatment: "Rotating shader experiment; WebGPU/TSL behind a capability flag",
    transitionIn: "shader-dissolve",
    transitionOut: "light-sweep",
    audioIdentity: "electronic/experimental (opt-in)",
    weight: 1,
  },
  {
    id: "ABOUT",
    sequence: "13",
    title: "ABOUT",
    narrativePurpose: "Strong reduction — the human scene.",
    emotion: "human warmth",
    focalPoint: "Simple portrait/text block",
    camera: { grammar: "lock-off", note: "Still frame; almost no motion" },
    depthLayers: {
      foreground: "about text (DOM)",
      midground: "minimal geometry",
      background: "soft neutral light",
      atmosphere: "none",
    },
    domBeats: {
      heading: "About Prabhat.",
      body: [
        "I turn ideas into real products — payment systems, social platforms, developer tools.",
        "Interested in secure payments, social platforms, and AI-powered tools.",
      ],
      metadata: ["BUILDING", "LEARNING", "EXPLORING"],
    },
    threeDTreatment: "Near-empty; soft neutral light only",
    transitionIn: "light-sweep",
    transitionOut: "match-cut",
    audioIdentity: "nearly silent (opt-in)",
    weight: 1,
  },
  {
    id: "NOW",
    sequence: "14",
    title: "NOW",
    narrativePurpose: "Current learning/building — verified/current content only.",
    emotion: "quiet momentum",
    focalPoint: "A short, honest status line",
    camera: { grammar: "lock-off", note: "Static; text animates in" },
    depthLayers: {
      foreground: "status text (DOM)",
      midground: "single dim artifact",
      background: "dark",
      atmosphere: "minimal",
    },
    domBeats: {
      heading: "Now.",
      body: [
        "Building and maintaining Vizquo.",
        "Leading HexClan at LIET.",
        "// TODO(Phase 01 content gaps): confirm current learning focus before publishing specifics.",
      ],
      metadata: ["UPDATED", "VERIFIED-ONLY"],
    },
    threeDTreatment: "A single object breathes slowly",
    transitionIn: "match-cut",
    transitionOut: "aperture-wipe",
    audioIdentity: "nearly silent (opt-in)",
    weight: 0.75,
  },
  {
    id: "FINALE",
    sequence: "15",
    title: "FINALE",
    narrativePurpose: "Pull far back — the whole world revealed as one connected system; clear CTAs.",
    emotion: "wonder → resolution",
    focalPoint: "The connected world + BUILD / BREAK / REBUILD",
    camera: { grammar: "pull-back", note: "Long reveal pull-back" },
    depthLayers: {
      foreground: "title + contact CTAs (DOM)",
      midground: "all environments, connected",
      background: "the full world",
      atmosphere: "open air",
    },
    domBeats: {
      heading: "Build / Break / Rebuild",
      body: ["Then do it again — better."],
      metadata: ["CONTACT", "RESUME", "LINKEDIN", "GITHUB"],
    },
    threeDTreatment: "World scale reveal; signal lines connect all scenes",
    transitionIn: "aperture-wipe",
    transitionOut: "aperture-wipe",
    audioIdentity: "open/airy (opt-in)",
    weight: 2,
  },
];

export const totalWeight = scenes.reduce((sum, s) => sum + s.weight, 0);
