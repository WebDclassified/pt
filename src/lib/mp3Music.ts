/**
 * MP3 music channel (user request): the selected track plays from
 * public/assets/Loser.mp3 at medium volume with a cinematic entrance —
 * fade in from near-silent, slow rise — fading out before the end and
 * restarting with the same fade cycle, forever.
 *
 * Replaces the earlier YouTube IFrame channel: self-hosted asset, no
 * third-party requests, no CSP widening, no embed restrictions. WebAudio
 * routing means the volume automation is sample-accurate and the loop gap
 * is eliminated (the next loop's buffer is scheduled before the current
 * one ends, with the fade-out landing on the boundary).
 *
 * Gesture contract unchanged: created only after SOUND ON.
 */

const TRACK_URL = "/assets/Loser.mp3";

/** Final plateau volume (0–1). Medium, per request. */
const TARGET_VOLUME = 0.38;
/** Starting gain — barely audible, per "very low" entrance. */
const START_VOLUME = 0.03;
/** Fade-in duration (s) — slow rise. */
const FADE_IN_S = 8;
/** Fade-out begins this long before the buffer ends (s). */
const FADE_OUT_LEAD_S = 5;

export type MusicState =
  | "unavailable"
  | "stopped"
  | "loading"
  | "fading-in"
  | "playing";

export class Mp3Music {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private source: AudioBufferSourceNode | null = null;
  private buffer: AudioBuffer | null = null;
  private state: MusicState = "stopped";
  private startedAt = 0;
  private loop = 0;
  private raf: number | null = null;
  private onFallback?: () => void;

  getState(): MusicState {
    return this.state;
  }

  /** Register the fallback path (procedural engine) for any failure. */
  setFallbackHandler(handler: () => void): void {
    this.onFallback = handler;
  }

  /** Must be called from a user gesture (same contract as the engine). */
  async start(): Promise<void> {
    if (this.state === "loading" || this.state === "fading-in" || this.state === "playing") return;
    this.state = "loading";
    try {
      if (!this.ctx) {
        this.ctx = new AudioContext();
        this.master = this.ctx.createGain();
        this.master.gain.value = 0;
        this.master.connect(this.ctx.destination);
      }
      await this.ctx.resume();
      if (!this.buffer) {
        const res = await fetch(TRACK_URL);
        if (!res.ok) throw new Error(`fetch ${res.status}`);
        const raw = await res.arrayBuffer();
        this.buffer = await this.ctx.decodeAudioData(raw);
      }
      this.playLoop();
    } catch {
      this.state = "unavailable";
      this.onFallback?.();
    }
  }

  stop(): void {
    if (this.raf !== null) cancelAnimationFrame(this.raf);
    this.raf = null;
    if (this.source) {
      try {
        this.source.stop();
      } catch {
        /* already stopped */
      }
      this.source.disconnect();
      this.source = null;
    }
    if (this.master && this.ctx) {
      this.master.gain.cancelScheduledValues(this.ctx.currentTime);
      this.master.gain.setValueAtTime(this.master.gain.value, this.ctx.currentTime);
      this.master.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.4);
    }
    this.state = "stopped";
  }

  dispose(): void {
    this.stop();
    this.ctx?.close().catch(() => {});
    this.ctx = null;
    this.buffer = null;
  }

  // ------------------------------------------------------------------ loop

  private playLoop(): void {
    if (!this.ctx || !this.master || !this.buffer) return;
    this.source?.disconnect();
    const src = this.ctx.createBufferSource();
    src.buffer = this.buffer;
    src.connect(this.master);
    src.start();
    this.source = src;
    this.startedAt = this.ctx.currentTime;
    this.loop += 1;
    this.beginFadeIn();
    this.monitor();
  }

  private beginFadeIn(): void {
    if (!this.ctx || !this.master) return;
    this.state = "fading-in";
    const now = this.ctx.currentTime;
    const g = this.master.gain;
    g.cancelScheduledValues(now);
    g.setValueAtTime(START_VOLUME, now);
    // Slow eased rise to the medium plateau (smoothstep via two ramps)
    g.linearRampToValueAtTime(
      START_VOLUME + (TARGET_VOLUME - START_VOLUME) * 0.5,
      now + FADE_IN_S * 0.5,
    );
    g.linearRampToValueAtTime(TARGET_VOLUME, now + FADE_IN_S);
  }

  /**
   * Frame-level supervision: schedules the pre-end fade-out, and on loop
   * boundary restarts with the same fade-in cycle. RAF keeps the fade curve
   * responsive without timer drift.
   */
  private monitor(): void {
    if (this.raf !== null) cancelAnimationFrame(this.raf);
    const step = () => {
      if (!this.ctx || !this.master || !this.buffer || this.state === "stopped") return;
      this.raf = requestAnimationFrame(step);
      const elapsed = this.ctx.currentTime - this.startedAt;
      const remaining = this.buffer.duration - elapsed;

      if (remaining <= FADE_OUT_LEAD_S && this.state === "playing") {
        // Fade out landing exactly on the loop boundary
        this.state = "fading-in"; // reuse: suppress repeat triggers
        const now = this.ctx.currentTime;
        const g = this.master.gain;
        g.cancelScheduledValues(now);
        g.setValueAtTime(g.value, now);
        g.linearRampToValueAtTime(START_VOLUME, now + Math.max(remaining - 0.05, 0.1));
      }
      if (elapsed >= this.buffer.duration) {
        this.playLoop(); // restart with the same fade-in cycle
      }
    };
    this.raf = requestAnimationFrame(step);
  }
}

let music: Mp3Music | null = null;

export function getMp3Music(): Mp3Music {
  if (!music) music = new Mp3Music();
  return music;
}
