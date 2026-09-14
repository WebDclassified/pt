/**
 * Phase 09 — audio engine.
 * WebAudio-based, entirely procedural (no external files, no licensing
 * burden). OFF by default; created only after explicit user intent. Each
 * scene gets an acoustic identity per the spec; scroll velocity modulates
 * intensity; never allowed to overpower content.
 */

export type SceneAcoustic =
  | "silence"
  | "spacious"
  | "precise"
  | "tension"
  | "experimental"
  | "airy";

const PRESETS: Record<
  SceneAcoustic,
  { baseFreq: number; droneGain: number; shimmer: number; lfo: number }
> = {
  silence: { baseFreq: 0, droneGain: 0, shimmer: 0, lfo: 0 },
  spacious: { baseFreq: 55, droneGain: 0.05, shimmer: 0.012, lfo: 0.08 },
  precise: { baseFreq: 82.4, droneGain: 0.035, shimmer: 0.02, lfo: 0.6 },
  tension: { baseFreq: 41.2, droneGain: 0.07, shimmer: 0.006, lfo: 0.2 },
  experimental: { baseFreq: 110, droneGain: 0.03, shimmer: 0.035, lfo: 1.2 },
  airy: { baseFreq: 65.4, droneGain: 0.04, shimmer: 0.018, lfo: 0.15 },
};

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private droneOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private shimmerOsc: OscillatorNode | null = null;
  private shimmerGain: GainNode | null = null;
  private lfo: OscillatorNode | null = null;
  private current: SceneAcoustic = "silence";
  private running = false;

  get enabled(): boolean {
    return this.running;
  }

  /** Must be called from a user gesture (Phase 09: no autoplay) */
  async start(): Promise<void> {
    if (this.running) return;
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0;
      this.master.connect(this.ctx.destination);

      // Low drone — the world's room tone
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.value = 0;
      this.droneGain.connect(this.master);
      this.droneOsc = this.ctx.createOscillator();
      this.droneOsc.type = "sine";
      this.droneOsc.connect(this.droneGain);
      this.droneOsc.start();

      // Shimmer — high partial for texture
      this.shimmerGain = this.ctx.createGain();
      this.shimmerGain.gain.value = 0;
      this.shimmerGain.connect(this.master);
      this.shimmerOsc = this.ctx.createOscillator();
      this.shimmerOsc.type = "triangle";
      this.shimmerOsc.frequency.value = 880;
      this.shimmerOsc.connect(this.shimmerGain);
      this.shimmerOsc.start();

      // Slow LFO on the drone for life
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.value = 0.1;
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 0.012;
      this.lfo.connect(lfoGain);
      lfoGain.connect(this.droneGain.gain);
      this.lfo.start();
    }
    await this.ctx.resume();
    this.master!.gain.linearRampToValueAtTime(0.8, this.ctx.currentTime + 1.2);
    this.running = true;
    this.applyPreset(this.current, true);
  }

  stop(): void {
    if (!this.ctx || !this.master || !this.running) return;
    this.master.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.4);
    this.running = false;
    window.setTimeout(() => {
      if (!this.running) this.ctx?.suspend();
    }, 500);
  }

  dispose(): void {
    this.stop();
    this.droneOsc?.stop();
    this.shimmerOsc?.stop();
    this.lfo?.stop();
    this.ctx?.close().catch(() => {});
    this.ctx = null;
  }

  /** Scene acoustic identity (Phase 09 scene-specific layer) */
  setScene(acoustic: SceneAcoustic): void {
    if (acoustic === this.current) return;
    this.current = acoustic;
    this.applyPreset(acoustic, this.running);
  }

  /** Scroll velocity → intensity, capped (Phase 09 coupling rule) */
  setVelocity(velocity: number): void {
    if (!this.ctx || !this.shimmerGain || !this.running) return;
    const boost = Math.min(Math.abs(velocity), 1) * 0.02;
    this.shimmerGain.gain.setTargetAtTime(
      PRESETS[this.current].shimmer + boost,
      this.ctx.currentTime,
      0.25,
    );
  }

  private applyPreset(acoustic: SceneAcoustic, immediate: boolean): void {
    if (!this.ctx || !this.droneOsc || !this.droneGain || !this.shimmerGain || !this.lfo) return;
    const preset = PRESETS[acoustic];
    const now = this.ctx.currentTime;
    const ramp = immediate ? 0.1 : 1.5;
    if (preset.baseFreq > 0) this.droneOsc.frequency.setTargetAtTime(preset.baseFreq, now, ramp);
    this.droneGain.gain.setTargetAtTime(preset.droneGain, now, ramp);
    this.shimmerGain.gain.setTargetAtTime(preset.shimmer, now, ramp);
    this.lfo.frequency.setTargetAtTime(Math.max(preset.lfo, 0.05), now, ramp);
  }
}

let engine: AudioEngine | null = null;

export function getAudioEngine(): AudioEngine {
  if (!engine) engine = new AudioEngine();
  return engine;
}
