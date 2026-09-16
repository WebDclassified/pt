/**
 * Phase 09 — audio engine (sober redesign, user direction 2026-09-16).
 * WebAudio-based, entirely procedural (no external files, no licensing
 * burden). OFF by default; created only after explicit user intent.
 *
 * The user asked to remove the "distortions" — the vinyl crackle, the hiss
 * bed, the detuned-pad beating, and the dubby pluck echoes. What remains is
 * a simple, sober rhythm:
 *   1. Clean pad — pure triangle chord, no detune, one gentle breath LFO
 *   2. Soft beat — muffled kick on downbeats + quiet hat eighths at 64 BPM
 *
 * Each scene selects a chord/color preset; scroll velocity gently opens the
 * tone filter. The gesture contract is unchanged: sound OFF by default, no
 * AudioContext created without explicit opt-in.
 */

import { mulberry32 } from "./random";

export type SceneAcoustic =
  | "silence"
  | "spacious"
  | "precise"
  | "tension"
  | "experimental"
  | "airy";

/** Chord voicings (Hz) — warm extended chords in related keys, clean tuning. */
const CHORDS: Record<Exclude<SceneAcoustic, "silence">, number[]> = {
  // Fmaj9 — home, warm and open
  spacious: [87.31, 130.81, 174.61, 220.0, 261.63],
  // Fm9 with a suspended color — focused, precise
  precise: [87.31, 155.56, 174.61, 233.08, 261.63],
  // Dm9♭6 — darker, minor color for tension
  tension: [73.42, 110.0, 146.83, 174.61, 220.0],
  // Cm11 — busier, more motion for experimental
  experimental: [65.41, 98.0, 130.81, 155.56, 196.0],
  // Cmaj7/9 — brightest, most open
  airy: [65.41, 130.81, 164.81, 196.0, 246.94],
};

/** Per-acoustic mix: how loud each layer sits in that scene's identity. */
const PRESETS: Record<
  SceneAcoustic,
  {
    pad: number;
    beat: number;
    /** Tone lowpass corner in Hz — lower = softer/more distant */
    toneHz: number;
    /** Chord change interval in seconds */
    cycle: number;
  }
> = {
  silence: { pad: 0, beat: 0, toneHz: 800, cycle: 24 },
  spacious: { pad: 0.5, beat: 0.22, toneHz: 1100, cycle: 26 },
  precise: { pad: 0.34, beat: 0.34, toneHz: 1500, cycle: 18 },
  tension: { pad: 0.55, beat: 0.1, toneHz: 900, cycle: 30 },
  experimental: { pad: 0.3, beat: 0.4, toneHz: 1900, cycle: 12 },
  airy: { pad: 0.42, beat: 0.16, toneHz: 1400, cycle: 22 },
};

const MASTER_LEVEL = 0.55;

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private tone: BiquadFilterNode | null = null;

  // Layer 1 — pad
  private padGain: GainNode | null = null;
  private padVoices: { osc: OscillatorNode; gain: GainNode }[] = [];

  // Layer 2 — beat
  private beatGain: GainNode | null = null;
  private beatTimer: number | null = null;
  private step = 0;

  private lfo: OscillatorNode | null = null;
  private current: SceneAcoustic = "silence";
  private running = false;
  private rng: () => number = mulberry32(0x70f1);

  get enabled(): boolean {
    return this.running;
  }

  /** Must be called from a user gesture (Phase 09: no autoplay) */
  async start(): Promise<void> {
    if (this.running) return;
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.build();
    }
    await this.ctx.resume();
    this.master!.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master!.gain.setValueAtTime(this.master!.gain.value, this.ctx.currentTime);
    this.master!.gain.linearRampToValueAtTime(MASTER_LEVEL, this.ctx.currentTime + 1.5);
    this.running = true;
    this.startTimers();
    this.applyPreset(this.current, true);
  }

  stop(): void {
    if (!this.ctx || !this.master || !this.running) return;
    this.running = false;
    this.master.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master.gain.setValueAtTime(this.master.gain.value, this.ctx.currentTime);
    this.master.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.5);
    this.stopTimers();
    window.setTimeout(() => {
      if (!this.running) this.ctx?.suspend();
    }, 600);
  }

  dispose(): void {
    this.stop();
    this.stopTimers();
    for (const v of this.padVoices) v.osc.stop();
    if (this.lfo) this.lfo.stop();
    this.ctx?.close().catch(() => {});
    this.ctx = null;
  }

  /** Scene acoustic identity (Phase 09 scene-specific layer) */
  setScene(acoustic: SceneAcoustic): void {
    if (acoustic === this.current) return;
    this.current = acoustic;
    this.applyPreset(acoustic, this.running);
  }

  /**
   * Scroll velocity → gentle tone opening (Phase 09 coupling rule). Traveling
   * brightens the pad slightly; resting lets it settle back. No push on the
   * beat — the rhythm stays steady and sober at all times.
   */
  setVelocity(velocity: number): void {
    if (!this.ctx || !this.running || !this.tone) return;
    const preset = PRESETS[this.current];
    const v = Math.min(Math.abs(velocity), 1);
    const hz = preset.toneHz * (1 + v * 0.35);
    this.tone.frequency.setTargetAtTime(hz, this.ctx.currentTime, 0.3);
  }

  // ---------------------------------------------------------------- build

  private build(): void {
    const ctx = this.ctx!;

    this.master = ctx.createGain();
    this.master.gain.value = 0;
    this.tone = ctx.createBiquadFilter();
    this.tone.type = "lowpass";
    this.tone.frequency.value = 1100;
    this.tone.Q.value = 0.4;
    this.master.connect(this.tone);
    this.tone.connect(ctx.destination);

    // --- Layer 1: clean pad (no detune = no beating) --------------------
    this.padGain = ctx.createGain();
    this.padGain.gain.value = 0;
    this.padGain.connect(this.master);

    for (let i = 0; i < 5; i++) {
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = 220; // set per-preset
      osc.detune.value = 0; // clean — no detuned beating
      const gain = ctx.createGain();
      gain.gain.value = 0.16 / Math.max(1, i * 0.55);
      osc.connect(gain);
      gain.connect(this.padGain);
      osc.start();
      this.padVoices.push({ osc, gain });
    }

    // One slow breath LFO — soft, organic, never wobbly
    this.lfo = ctx.createOscillator();
    this.lfo.frequency.value = 0.06;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.03;
    this.lfo.connect(lfoGain);
    lfoGain.connect(this.padGain.gain);
    this.lfo.start();

    // --- Layer 2 bus: soft beat ------------------------------------------
    this.beatGain = ctx.createGain();
    this.beatGain.gain.value = 0;
    this.beatGain.connect(this.master);
  }

  // ---------------------------------------------------------------- timers

  private startTimers(): void {
    if (!this.ctx) return;
    this.stopTimers();

    // Beat scheduler — steady 64 BPM, lookahead scheduling
    const bpm = 64;
    const beat = 60 / bpm;
    const stepDur = beat / 2; // eighth notes
    let nextStep = this.ctx.currentTime + 0.15;
    this.beatTimer = window.setInterval(() => {
      if (!this.ctx || !this.running) return;
      while (nextStep < this.ctx.currentTime + 0.3) {
        this.scheduleStep(nextStep);
        nextStep += stepDur;
        this.step = (this.step + 1) % 16;
      }
    }, 120);
  }

  private stopTimers(): void {
    if (this.beatTimer !== null) window.clearInterval(this.beatTimer);
    this.beatTimer = null;
  }

  // ------------------------------------------------------------- voices

  /** One beat step — muffled kick on downbeats, quiet hat on off-eighths */
  private scheduleStep(when: number): void {
    if (!this.ctx || !this.beatGain) return;
    const s = this.step;

    if (s === 0 || s === 8) {
      // Soft kick — sine drop, clean lowpass
      const osc = this.ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(100, when);
      osc.frequency.exponentialRampToValueAtTime(44, when + 0.1);
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.0001, when);
      g.gain.exponentialRampToValueAtTime(0.4, when + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, when + 0.3);
      const lp = this.ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 220;
      osc.connect(g);
      g.connect(lp);
      lp.connect(this.beatGain);
      osc.start(when);
      osc.stop(when + 0.36);
    }

    // Quiet hat — short filtered noise on the off-eighths, gentle accents
    if (s % 2 === 1) {
      const dur = 0.04;
      const buf = this.ctx.createBuffer(1, Math.ceil(this.ctx.sampleRate * dur), this.ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (this.rng() * 2 - 1) * (1 - i / d.length);
      const src = this.ctx.createBufferSource();
      src.buffer = buf;
      const hp = this.ctx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 5600;
      const g = this.ctx.createGain();
      g.gain.value = s % 4 === 3 ? 0.032 : 0.018;
      src.connect(hp);
      hp.connect(g);
      g.connect(this.beatGain);
      src.start(when);
    }
  }

  // ---------------------------------------------------------------- preset

  private applyPreset(acoustic: SceneAcoustic, immediate: boolean): void {
    if (!this.ctx || !this.padGain || !this.beatGain || !this.tone) {
      return;
    }
    const preset = PRESETS[acoustic];
    const now = this.ctx.currentTime;
    const ramp = immediate ? 0.2 : 2.2;

    // Chord voicing — glide between presets instead of cutting
    this.padVoices.forEach((voice, i) => {
      const chord = acoustic === "silence" ? null : CHORDS[acoustic];
      if (!chord) {
        voice.gain.gain.setTargetAtTime(0, now, ramp);
        return;
      }
      const target = chord[i] ?? chord[chord.length - 1];
      voice.osc.frequency.setTargetAtTime(target, now, ramp * 0.8);
      voice.gain.gain.setTargetAtTime(preset.pad * 0.16 * (1 / Math.max(1, i * 0.55)), now, ramp);
    });
    this.padGain.gain.setTargetAtTime(acoustic === "silence" ? 0 : 0.5, now, ramp);

    this.beatGain.gain.setTargetAtTime(preset.beat, now, ramp);
    this.tone.frequency.setTargetAtTime(preset.toneHz, now, ramp);
  }
}

let engine: AudioEngine | null = null;

export function getAudioEngine(): AudioEngine {
  if (!engine) engine = new AudioEngine();
  return engine;
}
