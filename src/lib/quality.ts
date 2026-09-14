/**
 * Phase 13 — adaptive quality.
 * An FPS watchdog downgrades/upgrades the tier with hysteresis (2 low samples
 * to downgrade, 4 high samples to upgrade) so quality never oscillates.
 * Application paths are loop-safe: DPR via setPixelRatio, particles via
 * geometry draw-range — no geometry rebuilds, no React renders.
 */

export type QualityTier = "high" | "medium" | "low";

export interface TierSettings {
  /** Max device pixel ratio rendered at this tier */
  maxDpr: number;
  /** Fraction of particle buffer drawn (draw-range) */
  particleFraction: number;
  /** Enable antialiasing-class rendering (reserved for future postprocessing) */
  antialiasing: boolean;
  /** Idle drift amplitude scale — heavier tiers get subtler motion */
  motionScale: number;
}

export const TIERS: Record<QualityTier, TierSettings> = {
  high: { maxDpr: 1.75, particleFraction: 1, antialiasing: true, motionScale: 1 },
  medium: { maxDpr: 1.25, particleFraction: 0.55, antialiasing: true, motionScale: 0.8 },
  low: { maxDpr: 1, particleFraction: 0.3, antialiasing: false, motionScale: 0.6 },
};

export const FPS_FLOOR = 34;
export const FPS_CEILING = 55;
export const DOWNGRADE_AFTER = 2;
export const UPGRADE_AFTER = 4;

export class QualityController {
  private tier: QualityTier = "high";
  private lowStreak = 0;
  private highStreak = 0;
  private lastChangeAt = 0;
  private static COOLDOWN = 4; // seconds between tier changes

  get current(): QualityTier {
    return this.tier;
  }

  /** Feed one frame-time sample (seconds). Returns tier if it changed. */
  sample(delta: number, now: number): QualityTier | null {
    const fps = 1 / Math.max(delta, 1e-4);
    if (now - this.lastChangeAt < QualityController.COOLDOWN) return null;

    if (fps < FPS_FLOOR) {
      this.lowStreak++;
      this.highStreak = 0;
    } else if (fps > FPS_CEILING) {
      this.highStreak++;
      this.lowStreak = 0;
    } else {
      this.lowStreak = 0;
      this.highStreak = 0;
      return null;
    }

    if (this.lowStreak >= DOWNGRADE_AFTER && this.tier !== "low") {
      this.tier = this.tier === "high" ? "medium" : "low";
      this.lastChangeAt = now;
      this.lowStreak = 0;
      return this.tier;
    }
    if (this.highStreak >= UPGRADE_AFTER && this.tier !== "high") {
      this.tier = this.tier === "low" ? "medium" : "high";
      this.lastChangeAt = now;
      this.highStreak = 0;
      return this.tier;
    }
    return null;
  }
}
