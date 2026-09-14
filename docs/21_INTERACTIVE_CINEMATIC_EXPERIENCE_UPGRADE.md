# PHASE 21 — INTERACTIVE CINEMATIC EXPERIENCE UPGRADE

## Objective

Upgrade the Prabhat Teotia portfolio from a 3D website into an **interactive cinematic experience**: a film-like journey in which the visitor can influence the camera, environment, focus, sound, and project exhibits while the site remains a professional, accessible, recruiter-friendly portfolio.

**Master idea:**

> BUILD / BREAK / REBUILD — an interactive film through the architecture of Prabhat Teotia's engineering.

The experience should feel inspired by the perceptual qualities of IMAX + 4D cinema:

- enormous scale
- deep spatial composition
- cinematic camera movement
- controlled inertia
- environmental response
- spatial/scene-aware audio
- layered micro-animation
- strong anticipation and release
- meaningful interaction
- seamless scene continuity

A browser cannot reproduce physical cinema effects such as moving seats, wind, temperature, or projection. Translate those into web-native equivalents rather than pretending to reproduce them literally.

---

# 1. NON-NEGOTIABLE CREATIVE RULE

The site must **not** feel like:

- a standard portfolio with a 3D background
- a 3D template
- a generic cyberpunk scene
- a planet/space clone
- a generic futuristic room
- a collection of unrelated WebGL effects

It must feel like:

> **one coherent film directed around Prabhat's engineering work.**

Every major visual effect must support at least one of these purposes:

1. establish
2. introduce
3. explain
4. escalate
5. reveal
6. resolve
7. transition

If an effect does none of these, remove it.

---

# 2. VISITOR EXPERIENCE MODEL

The user should gradually move through:

```text
MYSTERY
  ↓
CURIOSITY
  ↓
AWE
  ↓
UNDERSTANDING
  ↓
TENSION
  ↓
FAILURE
  ↓
REBUILD
  ↓
DISCOVERY
  ↓
HUMAN CONNECTION
  ↓
DESIRE TO CONTACT
```

Target reaction:

- Recruiter: “I immediately understand who Prabhat is.”
- Designer: “This feels art-directed like a film.”
- Engineer: “The 3D/interaction is actually engineered.”
- Hiring manager: “This person understands how to build.”

---

# 3. PRIMARY INTERACTION MODEL

The visitor controls several dimensions, but never loses the director's composition.

```text
SCROLL
→ narrative timeline

POINTER
→ attention / camera-look influence

HOVER
→ focus / proximity response

DRAG
→ bounded 3D inspection

CLICK
→ activate / commit / enter

TOUCH
→ direct manipulation

KEYBOARD
→ accessible navigation

AUDIO
→ optional environmental immersion
```

Do not force users to learn a custom interaction system before they can access content.

---

# 4. DIRECTOR VS EXPLORER

Use **guided cinematography + bounded exploration**.

The director controls:

- primary camera path
- framing
- major scene composition
- scene timing
- transition direction

The visitor controls:

- subtle look direction
- focus
- selected object inspection
- project activation
- optional scene exploration

Do **not** make the primary experience unrestricted free-camera orbit controls.

---

# 5. THE CORE

Create one original recurring 3D object called **THE CORE**.

It represents:

> an idea becoming software.

The Core should use a restrained, premium material language:

- graphite
- dark metal
- smoked glass
- transparent layers
- ceramic
- precise emissive details
- thin structural rings
- small computational nodes

Do not make it a generic glowing sphere.

### Core states

```text
DORMANT
ACTIVE
EXPLORING
PROCESSING
ERROR
RECOVERY
COMPLETE
```

The same object must evolve through the entire experience.

---

# 6. SCALE-SHIFT METAPHOR

A major recurring narrative should be:

```text
ATOM
 ↓
PIXEL
 ↓
COMPONENT
 ↓
APPLICATION
 ↓
SYSTEM
 ↓
WORLD
```

Opening:

```text
small point
→ pixel
→ UI element
→ component
→ application
→ system
→ world
```

Finale reverses the process.

This is the core visual metaphor and must feel intentional, not like a random zoom effect.

---

# 7. CINEMATIC CAMERA LANGUAGE

Use camera techniques as narrative verbs.

```text
DOLLY
→ importance / approach

PUSH-IN
→ discovery

PULL-OUT
→ context / scale

TRACKING
→ journey

ORBIT
→ inspection

CRANE
→ scale

WHIP-PAN
→ energetic transition

LOCK-OFF
→ seriousness / technical explanation

CLOSE-UP
→ detail

WIDE ESTABLISHING
→ world / context
```

Do not use every technique in one sequence.

---

# 8. CAMERA AUTHORING

Major camera paths should be composed like film shots.

Preferred pipeline:

```text
BLENDER
 ↓
scene blocking
 ↓
camera composition
 ↓
lighting
 ↓
camera animation/path
 ↓
export relevant path/data
 ↓
THREE.JS / R3F
 ↓
GSAP controls playback
```

Avoid manually improvising hundreds of runtime camera coordinates.

---

# 9. CAMERA SAFE ZONES

Every major shot must reserve safe areas for:

- navigation
- headings
- body copy
- project metadata
- CTA

The 3D world must never make essential text unreadable.

Treat text-safe areas like cinematic title-safe composition.

---

# 10. RESPONSIVE CINEMATOGRAPHY

Do not merely shrink desktop.

Define separate camera presets:

```text
desktop
ultrawide
tablet
mobile
```

Each may have different:

- FOV
- position
- target
- depth
- composition
- shot length

The narrative stays the same; the cinematography adapts.

---

# 11. SCROLL AS FILM PLAYHEAD

Treat scroll as a normalized playhead, not direct pixel movement.

```text
raw input
 ↓
normalized scroll progress
 ↓
smoothed progress
 ↓
scene timeline
 ↓
CAMERA + WORLD + DOM + AUDIO
```

Track:

- progress
- velocity
- direction

Use velocity to affect environmental response, not core readability.

---

# 12. SCROLL VELOCITY RESPONSE

### Slow

- camera glides
- particles settle
- environment breathes
- audio remains calm

### Fast

- camera accelerates within a strict ceiling
- atmospheric layers respond
- particles streak subtly
- sound intensity may increase

### Stop

- camera settles
- particles settle
- sound resolves
- focus becomes clear

Never create motion that feels nauseating or fights direct touch interaction.

---

# 13. SMOOTH SCROLL

Recommended desktop approach:

```text
Lenis OR GSAP ScrollSmoother
+
GSAP ScrollTrigger / Observer
```

Touch should remain close to natural direct manipulation.

Smoothness must feel:

> fluid and cinematic

not:

> slippery or disconnected from the user's finger.

---

# 14. POINTER LOOK

The pointer may slightly influence the camera target.

```text
pointer left
→ target shifts slightly left

pointer right
→ target shifts slightly right
```

This influence must be bounded.

The visitor should feel:

> “I can look.”

without feeling:

> “I am operating a flight simulator.”

---

# 15. FOCUS / RACK FOCUS

When a target is selected:

```text
target
→ visually sharper

background
→ slightly softer
```

When focus changes, the transition must be smooth.

Never blur important DOM text.

---

# 16. PROXIMITY SYSTEM

Objects should react progressively:

```text
FAR
→ no response

APPROACHING
→ tiny signal

NEAR
→ stronger signal

HOVER
→ active state

CLICK
→ inspect / open
```

This creates anticipation and avoids abrupt “hover everything” behavior.

---

# 17. POINTER INFLUENCE FIELD

Create a bounded invisible field around the pointer.

Nearby 3D elements may respond through:

- light
- rotation
- shader distortion
- parallax
- particle movement

The effect must decay with distance.

---

# 18. PHYSICALITY SYSTEM

Give major objects conceptual physical properties:

```text
mass
friction
inertia
response strength
```

Suggested mapping:

- architecture = heavy
- interface = precise
- data = fast
- glass = delayed/light
- particles = fluid
- camera = very smooth

Do not make everything spring/bounce.

---

# 19. MICRO-ANIMATION SYSTEM

Every interactive element needs explicit states:

```text
REST
HOVER
FOCUS
ACTIVE
EXIT
```

Core reusable motion primitives:

```text
FADE-RISE
SLIDE
LINE-GROW
LIGHT-PULSE
FOCUS-SHIFT
SCALE-PRESS
MAGNETIC
PHYSICAL-INERTIA
```

Do not stack many unrelated effects on tiny controls.

---

# 20. MOTION TOKENS

Create semantic motion tokens:

```text
--motion-micro
--motion-short
--motion-medium
--motion-long

--ease-ui
--ease-camera
--ease-heavy
--ease-soft
```

Also define conceptual weight:

```text
LIGHT
MEDIUM
HEAVY
```

Motion consistency is mandatory across all scenes.

---

# 21. MICRO TIMING

Starting design ranges:

```text
micro UI             100–250ms
button/component     180–350ms
object interaction   300–800ms
scene transition     700–1800ms
major reveal         1–4s
```

These are design starting points, not universal standards. Final timing must be judged against the shot's rhythm.

---

# 22. STAGGERING

Do not make all elements begin simultaneously.

Example:

```text
camera        0ms
background   80ms
object      160ms
heading     300ms
metadata    420ms
CTA         600ms
```

The visitor should perceive one choreographed action rather than independent animations.

---

# 23. SCENE BEATS

Every major scene should have a clear internal sequence:

```text
A — ARRIVAL
B — RECOGNITION
C — INTERACTION
D — REVEAL
E — RESOLUTION
F — EXIT
```

Not every scene needs all six literally, but its dramatic purpose must be identifiable.

---

# 24. CINEMATIC PACING

The experience must alternate:

```text
FAST
 ↓
SLOW
 ↓
FAST
 ↓
SILENCE
 ↓
WOW
 ↓
DETAIL
```

Never keep the site at maximum intensity throughout.

Constant spectacle becomes visual noise.

---

# 25. CINEMATIC SILENCE

At selected moments intentionally reduce:

- camera movement
- particle activity
- audio
- background animation

Then show one important sentence or image.

Silence is an active part of the motion system.

---

# 26. TRANSITION LIBRARY

Implement named transition families:

```text
01 APERTURE
02 PORTAL
03 MATCH CUT
04 OCCLUSION
05 MATERIALIZE
06 DISINTEGRATE
07 BLUEPRINT
08 HARD CUT
```

Never default all transitions to fade/slide.

---

# 27. APERTURE TRANSITION

```text
camera approaches circular structure
 ↓
structure closes
 ↓
view becomes fully covered
 ↓
next scene is swapped/repositioned behind it
 ↓
aperture opens
 ↓
camera continues
```

This should become a recurring portfolio signature.

---

# 28. PORTAL TRANSITION

The camera physically moves through:

- doorway
- ring
- tunnel
- glass aperture
- architectural opening

The next scene visually exists beyond the portal.

---

# 29. MATCH CUT

Transform a meaningful visual form into the next one.

Examples:

```text
circle → database
line → pathway
point → AI node
grid → interface
wall → screenshot
```

The transition must have narrative meaning.

---

# 30. OCCLUSION TRANSITION

A foreground object passes between camera and scene.

During the occlusion:

- load/prepare next assets
- change world state
- update DOM

Then reveal the next scene naturally.

This is both a cinematic technique and a performance strategy.

---

# 31. MATERIALIZE

```text
particles
 ↓
geometry
 ↓
solid object
 ↓
system / application
```

Use this to communicate:

> idea → software.

---

# 32. DISINTEGRATE

```text
object
 ↓
fragments
 ↓
particles
 ↓
noise
 ↓
next scene
```

Good for:

- failure
- transition
- end of chapter

---

# 33. BLUEPRINT MODE

A major transition should occasionally strip the polished materials away:

```text
beautiful world
 ↓
materials fade
 ↓
wireframe
 ↓
labels
 ↓
system boundaries
 ↓
engineering mode
```

This is a signature engineering reveal.

---

# 34. HARD CUT

Use a few intentional hard cuts.

Example:

```text
camera moving rapidly
 ↓
BLACK
 ↓
PROJECT 02
 ↓
new environment
```

Hard cuts should feel meaningful, not like a failed transition.

---

# 35. SCENE CONTINUITY

When transitioning, preserve at least one continuity cue when possible:

- same light direction
- same material
- same shape
- same sound bed
- same motion direction
- same camera momentum
- same Core fragment

This makes separate runtime scenes feel like one physical world.

---

# 36. FORESHADOWING

Allow future elements to appear subtly before their main scene.

Example:

```text
Project 02 artifact
→ visible far in the background
```

Later:

```text
Project 02
→ becomes the main focus
```

This should reward repeat attention without hiding essential information.

---

# 37. ENVIRONMENTAL STATE ENGINE

Define global narrative states:

```text
CALM
TENSION
BREAK
RECOVERY
DISCOVERY
```

Each state may influence:

- lighting
- camera movement
- particle speed
- fog
- sound
- material response
- object behavior

State transitions must be coordinated through one state model.

---

# 38. CALM

Characteristics:

- slower movement
- wider composition
- stable light
- low audio intensity
- minimal foreground activity

---

# 39. TENSION

Characteristics:

- slightly tighter framing
- increased motion
- more environmental activity
- more directional movement
- reduced visual comfort, but never reduced text readability

---

# 40. BREAK

Characteristics:

- fragmentation
- subtle distortion
- unstable connections
- restrained glitch
- sound reduction/cut

Avoid flashing effects.

---

# 41. RECOVERY

Characteristics:

- camera stabilizes
- lines reconnect
- movement becomes coherent
- lighting returns
- audio rebuilds

---

# 42. DISCOVERY

Characteristics:

- wider shot
- cleaner lighting
- negative space
- reveal
- lower background complexity

---

# 43. PROJECT EXHIBIT SYSTEM

Each major project should become a spatial exhibit, not merely a screenshot card.

Possible controls:

```text
OVERVIEW
INSPECT
X-RAY
ARCHITECTURE
PERFORMANCE
SECURITY
RESULT
```

Only implement controls that correspond to real project information.

---

# 44. INTERACTIVE INSPECT MODE

On activation:

```text
camera moves closer
 ↓
object becomes inspectable
 ↓
small 3D rotation/inspection available
 ↓
metadata appears
```

Do not remove access to normal text content.

---

# 45. X-RAY MODE

Create:

```text
SURFACE ───────── X-RAY
```

As the visitor enters X-RAY:

```text
surface materials
 ↓
transparency
 ↓
wireframe
 ↓
internal architecture
 ↓
data flow
```

The effect should explain software rather than merely look cool.

---

# 46. ARCHITECT MODE

A major project may offer:

```text
Overview
Architecture
Performance
Security
```

Each mode changes the visualization.

### Overview
Polished cinematic representation.

### Architecture
Nodes, services and relationships.

### Performance
Latency/load/data-flow visualization.

### Security
Authorization and isolation boundaries.

Never fabricate project architecture.

---

# 47. LIVE DATA-FLOW VISUALIZATION

Where technically accurate, represent a request/data flow as a moving visual entity:

```text
REQUEST
 ↓
API
 ↓
AUTH
 ↓
SERVICE
 ↓
DATABASE
 ↓
RESPONSE
```

The moving particle represents the conceptual data/request path.

---

# 48. MULTI-TENANCY VISUALIZATION

For projects such as Wamiro, if supported by the actual implementation, visualize:

```text
TENANT A
────────────
DATA

TENANT B
────────────
DATA
```

Then:

```text
authentication
 ↓
tenant boundary
 ↓
allowed data
```

The visualization must reflect the real architecture.

---

# 49. FAILURE / DEBUGGING SEQUENCE

This is a major signature idea.

Do not show only successful states.

A system may visibly degrade:

```text
load ↑
 ↓
latency ↑
 ↓
error ↑
 ↓
component fails
```

Then move the camera inside the failed path and identify the actual engineering issue.

Examples may include, when truthful:

- N+1 query
- cache miss
- overloaded worker
- slow API
- race condition

Never invent an incident.

---

# 50. REBUILD SEQUENCE

Show the actual improvement:

```text
broken architecture
 ↓
change
 ↓
retest
 ↓
stable system
```

Visual continuity should make the before/after immediately understandable.

---

# 51. PERFORMANCE SEQUENCE

If measured metrics exist, visualize them as an actual transformation:

```text
850ms
 ↓
620ms
 ↓
410ms
 ↓
210ms
```

Only use real measurements.

If a number is illustrative, clearly label it as illustrative.

Never fabricate performance claims.

---

# 52. SCALE EXPLORER

Optional interactive experiment for appropriate projects:

```text
10 USERS ───────────── 100,000 USERS
```

As the scale changes, visualize relevant changes in:

- requests
- workers
- cache
- queues
- architecture

If simulated, label it clearly as a conceptual model rather than real production data.

---

# 53. LOAD EXPLORER

Optional:

```text
SYSTEM LOAD
0% ───────────────── 100%
```

The environment can move through:

```text
calm
→ pressure
→ bottleneck
→ failure
→ recovery
```

This is a storytelling visualization, not a fake production benchmark.

---

# 54. TRADE-OFF EXPLORER

For genuinely documented architecture choices, offer an optional visual comparison:

```text
OPTION A
OPTION B
```

Possible dimensions:

- performance
- cost
- simplicity
- scalability
- operational complexity

Then display the actual reasoning behind the chosen option.

---

# 55. AI PROJECT VISUALIZATION

For AI work, visualize the real architecture where applicable:

```text
PROMPT
 ↓
CONTEXT
 ↓
RETRIEVAL
 ↓
TOOLS
 ↓
MODEL
 ↓
EVALUATION
 ↓
RESULT
```

Possible secondary layers:

- latency
- cost
- context size
- failure modes
- verification
- human review

Do not portray AI as magic.

---

# 56. AI EVALUATION EXHIBIT

Where applicable:

```text
OUTPUT A
OUTPUT B
OUTPUT C
```

followed by:

```text
EVALUATION GATE
```

Only outputs passing the evaluation are highlighted.

This communicates reliability and verification.

---

# 57. HUMAN-IN-THE-LOOP

For appropriate AI projects:

```text
AI
 ↓
suggestion
 ↓
human review
 ↓
decision
```

This can be represented visually as a controlled handoff rather than an autonomous magic effect.

---

# 58. THE LAB

Create a dedicated experimental environment:

```text
/LAB
```

Recommended categories:

```text
GPU PARTICLES
GLSL
WEBGPU
TSL
PHYSICS
GENERATIVE TYPE
COMPUTER VISION
AUDIO REACTIVE
AI VISUALIZATION
```

The Lab can be stranger and more experimental than the main portfolio.

---

# 59. LAB EXHIBIT FORMAT

Every experiment may show:

```text
WHAT
HOW
WHY
STACK
SOURCE
```

with:

```text
[PLAY]
[CODE]
```

The interactive experiment must work before being advertised.

---

# 60. GPU EXPERIMENTS

Good examples:

- particle fields
- procedural geometry
- WebGPU compute-style experiments
- TSL experiments
- fluid-like shader effects

Do not make WebGPU required for the main site because browser support is not universal.

---

# 61. PHYSICS

Use a physics engine such as Rapier only where it creates meaningful interaction.

Possible uses:

- object collisions
- physical project artifacts
- interactive system components
- Lab experiments

Do not add physics simply to demonstrate the library.

---

# 62. PROCEDURAL VISUALS

Prefer original/generated geometry where appropriate.

Good uses:

- system fields
- data landscapes
- network structures
- particles
- transformations

Avoid generic downloaded 3D assets when the visual should communicate Prabhat's identity.

---

# 63. AUDIO SYSTEM

Use multiple semantic audio layers:

```text
MASTER
 ├── MUSIC
 ├── ENVIRONMENT
 ├── INTERACTION
 ├── PROJECT
 └── TRANSITION
```

Audio is optional and user-controlled.

---

# 64. SPATIAL AUDIO

Where appropriate:

```text
near → clearer
far → quieter
left/right → directional
portal → filtered
open space → wider
```

Audio must reinforce spatiality rather than become background noise.

---

# 65. SOUND + SCROLL VELOCITY

Optional:

```text
slow scroll → calm
fast scroll → slightly more intensity
stop → settle
```

The effect must remain subtle.

---

# 66. SOUND TRANSITIONS

Do not restart music on every scene.

Use:

- crossfade
- filter changes
- reverb changes
- volume changes
- spatial positioning

Example:

```text
main world
 ↓
enter project
 ↓
audio becomes more filtered
 ↓
new acoustic environment
 ↓
full clarity returns
```

---

# 67. SILENCE

Use silence for major revelations and failure moments.

A sequence such as:

```text
music
 ↓
music
 ↓
music
 ↓
CUT
 ↓
silence
 ↓
WHAT FAILED?
```

should be used sparingly and intentionally.

---

# 68. AUDIO DEFAULT

Do not aggressively autoplay sound.

Recommended:

```text
Audio OFF
```

with an explicit opt-in.

Always provide a visible accessible audio control.

---

# 69. HAPTICS

Optional progressive enhancement only.

Possible uses:

- major activation
- selected exhibit interaction
- major reveal

Never depend on haptics for meaning or navigation.

---

# 70. WEATHER / ATMOSPHERE

Optional environmental states may include:

- mist
- fog
- dust
- particles
- light shafts

Atmosphere must reinforce the narrative state, not act as random decoration.

---

# 71. ENVIRONMENTAL CONTINUITY

Use the same environment language across scenes:

- consistent material family
- recurring Core
- recurring line motif
- recurring light pulse
- consistent camera movement logic

Scenes can change dramatically while still belonging to one universe.

---

# 72. RECURRING LINE MOTIF

Use a thin line to represent connection.

It can become:

```text
architecture
network
timeline
data path
project boundary
contact connection
```

The line must visually connect scenes without becoming an overused decorative element.

---

# 73. RECURRING PULSE MOTIF

A subtle pulse should represent system life.

```text
CALM
→ stable pulse

BREAK
→ irregular pulse

RECOVERY
→ stable pulse

FINALE
→ strong clean pulse
```

This can tie the entire experience together.

---

# 74. TYPOGRAPHIC CINEMA

Typography is part of cinematography.

Use:

```text
large display type
+
neutral readable body type
+
technical mono metadata
```

Major words may occupy the whole viewport:

```text
BUILD
BREAK
REBUILD
SYSTEM
```

---

# 75. TYPE → ARCHITECTURE

A major word may become a spatial object.

Example:

```text
SYSTEM
```

becomes depth/extrusion.

The camera travels between letters and discovers the system behind them.

Keep the semantic DOM heading as the authoritative text representation.

---

# 76. TYPOGRAPHY-ONLY BREATHING SCENES

Use occasional minimal frames:

```text
BLACK
+
ONE WORD
```

or:

```text
BLACK
+
ONE SENTENCE
```

These provide contrast against 3D-heavy scenes.

---

# 77. PROJECT SCREEN TREATMENT

Project screenshots may appear as:

- architectural panels
- projected surfaces
- glass displays
- layered canvases
- floating interfaces

The project itself must remain readable.

Do not bury screenshots in visually noisy environments.

---

# 78. PROJECT-SPECIFIC VISUAL METAPHORS

Each featured project should have a unique visual metaphor tied to its actual purpose.

Examples:

### Wamiro
organizations / tenants / workflows / connected systems

### AI project
context / retrieval / tools / model / evaluation

### Frontend project
layers / interfaces / components / interaction

### Infrastructure project
nodes / traffic / distributed systems

Do not invent metaphors unrelated to the actual work.

---

# 79. PROJECT TRANSITION RULE

A project transition should explain the project.

Examples:

```text
organizations
 ↓
workflow lines
 ↓
network
 ↓
application
```

or:

```text
particles
 ↓
context
 ↓
model
 ↓
result
```

The transition itself is part of the case study.

---

# 80. VISUAL PHYSICS OF MATERIALS

Suggested behavior:

### Metal
rigid / slow

### Glass
slightly delayed / responsive

### Data
fast / precise

### Particles
fluid

### UI
sharp / controlled

### Camera
smooth / inertia-heavy

The exact implementation may use GSAP, springs, or custom interpolation depending on the scene.

---

# 81. FOREGROUND OCCLUSION

Use foreground geometry to:

- create depth
- establish scale
- hide asset loading
- perform transitions
- guide attention

A good occlusion transition can replace an artificial fade.

---

# 82. IMAX-LIKE SCALE

Perceived scale should come from:

- deep perspective
- large architecture
- tiny human-scale references
- atmospheric depth
- wide shots
- camera pull-backs

Do not assume more polygons equal more scale.

---

# 83. CAMERA LENS LANGUAGE

Use different visual “lens” feelings:

```text
WIDE
→ environment / establishing

NORMAL
→ projects

CLOSE
→ details / engineering
```

The exact FOV values should be chosen per shot and validated visually.

---

# 84. DEPTH OF FIELD

Use selectively.

Good:

- target object sharp
- background softly separated

Bad:

- important text blurred
- continuous heavy blur
- expensive effect everywhere

---

# 85. BLOOM / POST-PROCESSING

Use selectively:

- light
- emissive edges
- significant reveals

Avoid applying heavy bloom to every object.

Other post effects such as film grain, vignette, chromatic aberration, and distortion are **event effects**, not permanent filters.

---

# 86. FILM GRAIN

Use subtle grain only to unify:

- 3D
- screenshots
- DOM
- video

It should never reduce text readability.

---

# 87. GLITCH

Glitch means:

> something is wrong.

Use it primarily during:

- failures
- corrupted state
- transitions

Do not use constant RGB splitting as a generic style.

---

# 88. LIGHTING NARRATIVE

Lighting should have narrative states.

```text
INTRO
→ dark / mysterious

DISCOVERY
→ increasing illumination

PROBLEM
→ fragmented / unstable

BREAK
→ low / irregular

REBUILD
→ coherent light

FINALE
→ open illumination
```

Lighting is storytelling.

---

# 89. LIGHTING SAFE TEXT

When text enters:

- reduce local background brightness
- introduce controlled scrim/gradient if needed
- move distracting light paths away from the text

The goal is to preserve both cinematic composition and readability.

---

# 90. VISUAL CONTRAST

Use contrast between:

- huge and tiny
- fast and slow
- bright and dark
- dense and empty
- 3D and flat typography
- chaotic and organized

Contrast is one of the main sources of perceived cinematic impact.

---

# 91. THE LAB VS MAIN FILM

Main film:

```text
controlled
cinematic
polished
narrative
```

Lab:

```text
experimental
technical
playful
strange
```

Do not let Lab experiments visually overwhelm the main story.

---

# 92. DIRECTOR'S CUT

Default homepage mode:

```text
DIRECTOR'S CUT
```

Full:

- 3D
- camera choreography
- audio
- transitions
- interactive exhibits

---

# 93. RECRUITER CUT

Provide a direct, low-friction mode:

```text
WORK
EXPERIENCE
RESUME
CONTACT
```

The recruiter must never have to master the cinematic interaction model.

---

# 94. ENGINEER CUT

Provide deep access to:

```text
ARCHITECTURE
TECHNICAL DECISIONS
PERFORMANCE
SECURITY
TESTING
CODE
```

These modes share canonical content; do not duplicate or drift facts.

---

# 95. SKIP INTRO

Always provide:

```text
SKIP INTRO →
```

or:

```text
VIEW STANDARD SITE →
```

The user must always be able to bypass the spectacle.

---

# 96. COMMAND PALETTE

Optional:

```text
Cmd/Ctrl + K
```

Actions may include:

```text
Go to Work
Go to Experience
Open Resume
Open GitHub
Launch Lab
Toggle Motion
Toggle Sound
Toggle Quality
Open Standard View
```

Normal clickable navigation remains mandatory.

---

# 97. WAYFINDING

Provide a subtle scene indicator:

```text
03 / 12
ARCHITECTURE
```

or:

```text
●────○────○────○
```

The visitor must always understand:

- current location
- current chapter
- how to exit

---

# 98. RETURNING VISITORS

Remember preferences such as:

- sound
- motion
- quality
- standard mode

where appropriate.

A returning visitor should not be forced through the full intro every time.

---

# 99. FIRST INTERACTION

The first user action should become part of the story.

Example:

```text
ENTER
 ↓
click creates pulse
 ↓
pulse travels into Core
 ↓
world powers on
```

The visitor feels:

> “I started the system.”

---

# 100. DIEGETIC LOADING

When loading is genuinely necessary, incorporate loading into the world:

```text
systems powering on
lights activating
Core assembling
```

Do not create artificial waiting merely to look cinematic.

---

# 101. SCENE STREAMING

Do not load the entire world at once.

Prefer:

```text
CURRENT SCENE
+
NEXT SCENE
```

Optionally preload previous/adjacent scenes when needed.

Load deeper Lab scenes on demand.

---

# 102. OCCLUSION + LOADING

Use cinematic occlusion as a performance opportunity.

When a foreground element covers the viewport:

```text
current scene
→ occlusion
→ prepare next assets
→ switch state
→ reveal next scene
```

The user should experience continuity rather than loading mechanics.

---

# 103. PERSISTENT CANVAS

Prefer one persistent rendering layer:

```text
ONE CANVAS
 ├── Scene A
 ├── Scene B
 ├── Scene C
 └── Scene D
        ↓
      CAMERA
```

Avoid repeatedly creating/destroying the renderer on navigation.

---

# 104. SCENE LIFECYCLE

Each scene must expose a lifecycle conceptually similar to:

```text
preload()
enter()
active()
exit()
dispose()
```

When scenes leave active use, release unnecessary GPU resources.

---

# 105. RESOURCE MANAGEMENT

Explicitly manage:

- geometries
- materials
- textures
- render targets
- physics resources
- event listeners
- audio nodes

Do not rely solely on JavaScript garbage collection for GPU cleanup.

---

# 106. PERFORMANCE QUALITY LEVELS

Implement:

```text
AUTO
HIGH
MEDIUM
LOW
```

Potential adaptive variables:

- device pixel ratio
- particle count
- shadows
- post-processing
- physics
- reflection quality
- texture resolution

---

# 107. EXPERIENCE FALLBACKS

Implement a graceful hierarchy:

```text
FULL CINEMA
 ↓
CINEMA LITE
 ↓
STANDARD
 ↓
STATIC
```

Essential content survives at every level.

---

# 108. WEBGL / WEBGPU

Use:

```text
WebGL
→ production baseline

WebGPU
→ progressive enhancement / Lab
```

WebGPU must not be a single point of failure for the main portfolio.

---

# 109. 3D STACK

Recommended:

```text
Next.js
React
TypeScript

React Three Fiber
Three.js

GSAP
ScrollTrigger
Observer

Lenis OR ScrollSmoother

Blender
Spline

GLB / GLTF
Draco
KTX2 / Basis

GLSL
TSL / WebGPU where useful

Rapier where meaningful
Theatre.js where justified

Web Audio API
```

Every dependency must earn its presence.

---

# 110. SPLINE ROLE

Use Spline primarily for:

- art direction
- hero objects
- selected interactive objects
- rapid 3D prototyping

Do not make the entire site a collection of unrelated Spline embeds.

Three.js/R3F should remain the main runtime world for the persistent cinematic layer.

---

# 111. BLENDER ROLE

Use Blender for:

- environment design
- composition
- camera paths
- lighting/blocking
- custom modeling
- animation blocking

Export web-optimized assets.

---

# 112. GSAP ROLE

GSAP is the choreography layer for:

- camera timelines
- DOM reveals
- scene sequencing
- micro-interactions
- transitions
- scroll synchronization

Continuous render-loop state should not be forced through frequent React re-renders.

---

# 113. R3F / THREE ROLE

R3F/Three.js should own:

- persistent rendering
- camera
- world
- objects
- shaders
- runtime interaction
- scene lifecycle
- post-processing
- physics integration
- asset management

---

# 114. RESPONSIVE 3D

Never simply scale the desktop environment.

Create deliberate mobile shots.

Desktop:

- wide establishing frames
- more depth
- hover/focus
- richer environment

Mobile:

- tighter composition
- touch-first interaction
- shorter camera movement
- reduced geometry/effects

---

# 115. TOUCH INTERACTION

Touch requirements:

```text
one-finger usable
clear tap targets
direct scrolling
bounded inspection
```

Do not require complicated multi-touch gestures for essential content.

Provide tap alternatives for interactions otherwise requiring dragging.

---

# 116. ACCESSIBILITY CONTRACT

Target:

> **WCAG 2.2 AA**

Especially account for:

- keyboard navigation
- visible focus
- focus not obscured by sticky UI
- semantic headings
- semantic landmarks
- accessible buttons/links
- alt text
- labels
- contrast
- reflow
- target size
- reduced motion
- no keyboard traps
- meaningful error states

3D is enhancement, not the only content representation.

---

# 117. REDUCED MOTION

Respect:

```text
prefers-reduced-motion: reduce
```

Reduced mode must preserve:

- content
- typography
- projects
- navigation
- identity

while reducing:

- camera travel
- parallax
- particles
- continuous motion
- dramatic transitions

Also provide a visible manual:

```text
MOTION: FULL / REDUCED
```

---

# 118. AUDIO ACCESSIBILITY

Audio must remain optional.

Provide:

```text
AUDIO: ON / OFF
```

No important information may be conveyed only through sound.

---

# 119. DOM + WEBGL ARCHITECTURE

Use two coordinated layers:

```text
VISUAL LAYER
WebGL / Three.js / R3F

CONTENT LAYER
Semantic HTML
```

DOM remains authoritative for:

- headings
- project descriptions
- navigation
- resume
- contact
- case studies
- SEO text

---

# 120. NO-JAVASCRIPT FALLBACK

When JavaScript is unavailable, the core website should still communicate:

- Prabhat's identity
- role
- projects
- experience
- about
- contact

The cinematic layer may disappear, but the site remains meaningful.

---

# 121. ROUTING

Canonical project URLs must work directly:

```text
/projects/wamiro
/projects/project-two
/projects/project-three
```

Direct entry must not require replaying the homepage sequence.

---

# 122. BROWSER HISTORY

Preserve:

- back
- forward
- refresh
- deep links

Do not trap navigation inside a custom animation engine.

---

# 123. VISUAL REGRESSION

For every major scene:

```text
BUILD
 ↓
RENDER
 ↓
CAPTURE FRAME
 ↓
COMPARE
 ↓
DEVIATION REPORT
 ↓
FIX
 ↓
REPEAT
```

Use deterministic test settings where possible:

- fixed seed
- fixed time
- fixed camera
- fixed DPR
- fixed scene

---

# 124. PIXEL / FRAME QA

A major shot is not complete because it “works.”

Capture the intended key frame and inspect:

- composition
- typography
- camera framing
- lighting
- contrast
- object placement
- hierarchy
- transition timing

The goal is **frame-perfect**, not merely functional.

---

# 125. DEVIATION REPORT

After each major phase/scene, produce:

```text
DEVIATIONS

Camera
✓

Typography
✓

Lighting
⚠

Transition
⚠

Performance
✕

Accessibility
✓
```

Every unresolved deviation must be fixed before the phase is accepted unless it is explicitly documented as intentional.

---

# 126. NO SILENT COMPROMISE

If the implementation differs from the specification, do not silently substitute a generic solution.

Instead document:

```text
Requirement
Current implementation
Difference
Reason
Proposed alternative
```

Then fix the difference whenever possible.

Do not silently replace a required cinematic effect with a generic fade, slide, card, or modal.

---

# 127. KNOWN DEVIATIONS LEDGER

Maintain:

```text
Deviation ID
Description
Severity
Status
Fix
```

Example:

```text
DEV-004
Project 01 camera arrives too early
Severity: Medium
Status: Fixed
```

---

# 128. ORIGINALITY AUDIT

Before launch, ask:

- Does this resemble a common AI-generated portfolio?
- Is the environment generic?
- Is the signature object original?
- Are transitions purpose-driven?
- Does another famous portfolio clearly own this metaphor?
- Could another developer use the same concept unchanged?

References may inspire:

- techniques
- pacing
- interaction patterns
- engineering approaches

Do not copy exact:

- scenes
- branding
- layouts
- visual metaphors
- artwork

---

# 129. AWE BUDGET

Aim for approximately five major visual “wow” moments:

```text
WOW 01 — Core reveal
WOW 02 — entering software architecture
WOW 03 — failure → rebuild
WOW 04 — interactive Lab
WOW 05 — final world pull-back
```

Do not make every second a climax.

---

# 130. QUIET MOMENT BUDGET

Intentionally include low-motion sections.

These can contain:

- black background
- restrained typography
- minimal sound
- locked camera
- one object

Use these as breathing rooms between major sequences.

---

# 131. SCENE SHOT SHEET

Every important shot must be documented using:

```text
SHOT ID
SCENE
PURPOSE
CAMERA
FOV
FOCUS
HERO
BACKGROUND
LIGHT
TEXT
MOTION
INPUT
AUDIO
TRANSITION
PERFORMANCE BUDGET
```

Example:

```text
SHOT: PROJECT_01_REVEAL
PURPOSE: introduce Wamiro
CAMERA: slow dolly
FOCUS: project artifact
TEXT: 01 / WAMIRO
INPUT: scroll + subtle pointer look
AUDIO: low ambience
EXIT: aperture transition
```

---

# 132. DIRECTOR REVIEW

Before accepting the finished experience, answer:

1. Does the opening create curiosity?
2. Is Prabhat's identity obvious quickly?
3. Does the first big reveal happen early enough?
4. Does every scene have a reason to exist?
5. Does every transition have a reason?
6. Does the visitor feel agency without losing guidance?
7. Does the world obey consistent motion/physical rules?
8. Are there enough quiet moments?
9. Are there too many effects?
10. Does each featured project have a distinct visual metaphor?
11. Does the X-ray/Blueprint experience teach something?
12. Does the Lab feel genuinely exploratory?
13. Does the ending feel earned?
14. Can a recruiter bypass the cinematic layer?
15. Does anything look copied, generic, or AI-template-like?

If any answer is not satisfactory, iterate.

---

# 133. RECRUITER TEST

A recruiter should be able to reach:

```text
WORK
EXPERIENCE
RESUME
CONTACT
```

without understanding any custom 3D interaction.

---

# 134. ENGINEER TEST

An engineer should be able to reach:

```text
ARCHITECTURE
DECISIONS
PERFORMANCE
SECURITY
TESTING
CODE
```

without repeatedly replaying the cinematic introduction.

---

# 135. DESIGNER TEST

A strong designer should notice:

- camera choreography
- typography
- motion system
- lighting
- materials
- transition language
- visual continuity
- micro-interactions
- restraint

rather than only noticing “there is 3D.”

---

# 136. HUMANITY TEST

After the technical spectacle, the site must answer:

> Who is Prabhat?

Use:

- real writing
- real project stories
- real experience
- real personality
- real portrait if desired

Do not let the cinematic layer erase the person.

---

# 137. PERFORMANCE TEST

Track both standard web metrics and 3D-specific metrics.

Standard:

```text
LCP
INP
CLS
```

3D-specific:

```text
frame stability
input latency
GPU frame time
scene load time
memory
draw calls
triangles
texture memory
```

The site must feel fast, not merely score well in a synthetic audit.

---

# 138. LOAD TESTING

Test:

- fast connection
- slow 4G
- poor network
- offline
- low-end machine
- integrated GPU
- high-DPI mobile

The fallback system must activate gracefully.

---

# 139. BROWSER TESTING

At minimum test:

- Chrome
- Edge
- Firefox
- Safari
- Android Chrome
- iOS Safari

Test both cinematic and standard modes.

---

# 140. ACCESSIBILITY TESTING

Test:

- keyboard-only
- visible focus
- focus not hidden by sticky UI
- 200–400% zoom where applicable
- reduced motion
- screen-reader spot checks
- contrast
- forms
- touch targets
- semantic structure

Automated tooling does not prove full accessibility.

---

# 141. AUDIO TESTING

Test:

- audio off
- audio on
- interrupted audio
- browser autoplay restrictions
- scene transitions
- volume changes
- keyboard/audio control

Audio must never break navigation.

---

# 142. VISUAL HIERARCHY TEST

Every shot needs:

```text
ONE HERO
SUPPORTING ELEMENTS
ATMOSPHERE
```

Do not let every object compete for attention.

---

# 143. CONTENT-FIRST PRINCIPLE

3D should communicate:

- metaphor
- navigation
- context
- system structure
- transformation
- atmosphere

HTML should communicate:

- facts
- descriptions
- case studies
- technical explanations
- resume
- contact

Do not make long technical reading depend on 3D.

---

# 144. PORTFOLIO-AS-PROJECT-00

Treat the portfolio itself as a project.

At a dedicated behind-the-scenes page, explain:

```text
CONCEPT
STORYBOARD
BLENDER
SPLINE
THREE.JS
GSAP
AUDIO
ASSET PIPELINE
PERFORMANCE
ACCESSIBILITY
SEO
DEPLOYMENT
```

This becomes additional evidence of engineering ability.

---

# 145. PORTFOLIO BUILD / BREAK / REBUILD

The site's own creation can be presented as:

```text
IDEA
 ↓
PROTOTYPE
 ↓
3D WORLD
 ↓
PERFORMANCE PROBLEM
 ↓
OPTIMIZATION
 ↓
FINAL EXPERIENCE
```

Use this as an optional case study.

---

# 146. FINAL VISUAL LOOP

The most important closing sequence should be:

```text
WORLD
 ↓
SYSTEM
 ↓
PROJECTS
 ↓
ARCHITECTURE
 ↓
CORE
 ↓
POINT
 ↓
BLACK
```

Then:

```text
PRABHAT TEOTIA
SOFTWARE ENGINEER
```

and direct contact links.

This closes the same visual loop introduced in the opening.

---

# 147. FINAL LINE

Recommended narrative direction:

> Everything complex starts simple.

Then:

> I like building the systems that make the simple idea real.

Then:

```text
LET'S BUILD THE NEXT ONE.
```

Do not use “Thanks for visiting” as the primary emotional ending.

---

# 148. HARD NO LIST

Never introduce any of these merely because they are fashionable:

```text
generic planet
generic space scene
hacker room
3D keyboard
random spaceship
generic neon city
constant glitch
random particles
forced sound
forced interaction puzzle
heavy touch scroll physics
20 unrelated WebGL demos
copied transition system
fake metrics
fake users
fake clients
fake testimonials
```

Every visual must earn its presence.

---

# 149. DEFINITION OF DONE

This phase passes only when:

```text
[ ] Core exists and has meaningful states
[ ] Scroll controls a cinematic timeline
[ ] Pointer look exists
[ ] Focus/rack-focus exists
[ ] Proximity interaction exists
[ ] Selected project inspection exists
[ ] Project-specific transitions exist
[ ] X-ray/Blueprint mode exists where appropriate
[ ] Environment state engine exists
[ ] Sound system is layered and opt-in
[ ] Reduced-motion mode exists
[ ] Recruiter mode exists
[ ] Engineer mode exists
[ ] Mobile cinematography is deliberate
[ ] Persistent 3D canvas exists
[ ] Scene lifecycle/resource cleanup exists
[ ] Scene streaming exists
[ ] Performance fallback exists
[ ] WebGPU is optional
[ ] Visual regression exists
[ ] Deterministic scene capture exists
[ ] Deviation reports are produced
[ ] Known deviations are resolved
[ ] Originality audit passes
[ ] Director review passes
```

---

# 150. MASTER PRINCIPLE

The portfolio should never optimize for:

> “How many effects did we add?”

It should optimize for:

> **“How much meaning, emotion and perceived quality did we create per interaction?”**

The finished experience should feel effortless.

A visitor should not need to think about:

- Three.js
- R3F
- Spline
- GSAP
- Blender
- WebGL
- WebGPU
- shaders

They should simply think:

> **“That felt incredible.”**

Then, after exploring:

> **“And it is actually engineered extremely well.”**

---

# 151. CREDITS / ATTRIBUTION REQUIREMENT

The portfolio belongs to and should identify:

# PRABHAT TEOTIA

All third-party technology, libraries, assets, fonts, sounds, models, references, plugins, and open-source material must be credited according to their licenses and/or attribution requirements.

Do not imply ownership of third-party assets.

Do not present reference sites or borrowed techniques as original inventions.

The original portfolio content/data is attributed to **Prabhat Teotia**; this phase defines the new cinematic experience independently of the previous portfolio's visual design.
