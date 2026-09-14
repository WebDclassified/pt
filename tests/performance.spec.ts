import { expect, test } from "@playwright/test";
import {
  QualityController,
  DOWNGRADE_AFTER,
  UPGRADE_AFTER,
  FPS_FLOOR,
  FPS_CEILING,
} from "../src/lib/quality";

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

test.describe("M5 — adaptive quality logic", () => {
  test("downgrades after sustained low FPS, upgrades after recovery", () => {
    const qc = new QualityController();
    let now = 0;
    let changed: string | null = null;

    expect(qc.current).toBe("high");
    // fps = 1/delta — to stay BELOW the floor, delta must EXCEED 1/floor
    for (let i = 0; i < DOWNGRADE_AFTER; i++) {
      changed = qc.sample(1 / (FPS_FLOOR - 5), (now += 5));
    }
    expect(changed).toBe("medium");

    for (let i = 0; i < DOWNGRADE_AFTER; i++) {
      changed = qc.sample(1 / (FPS_FLOOR - 15), (now += 5));
    }
    expect(changed).toBe("low");

    // fps = 60 > ceiling → upgrade path
    for (let i = 0; i < UPGRADE_AFTER; i++) {
      changed = qc.sample(1 / (FPS_CEILING + 5), (now += 5));
    }
    expect(changed).toBe("medium");

    for (let i = 0; i < UPGRADE_AFTER; i++) {
      changed = qc.sample(1 / (FPS_CEILING + 5), (now += 5));
    }
    expect(changed).toBe("high");
  });

  test("mid-range FPS never changes the tier (no oscillation)", () => {
    const qc = new QualityController();
    let now = 0;
    for (let i = 0; i < 20; i++) {
      expect(qc.sample(1 / 45, (now += 5))).toBeNull();
    }
    expect(qc.current).toBe("high");
  });
});

test.describe("M5 — GPU lifecycle audit", () => {
  test("environments dispose symmetrically across full traversal", async ({
    page,
  }) => {
    await page.goto("/");
    await page
      .locator("canvas")
      .first()
      .waitFor({ state: "visible", timeout: 20_000 })
      .catch(() => {});
    await page.waitForTimeout(1200);

    // Walk the whole film to force every scene enter/exit
    const steps = 24;
    for (let i = 1; i <= steps; i++) {
      await page.evaluate(
        ({ p, total }) => {
          const doc = document.documentElement;
          window.scrollTo(0, (p / total) * (doc.scrollHeight - window.innerHeight));
        },
        { p: i, total: steps },
      );
      await page.waitForTimeout(180);
    }
    await page.waitForTimeout(600);

    const stats = await page.evaluate(() => window.__ptDebug?.sceneStats());
    expect(stats).toBeTruthy();
    // Invariant: exactly ONE live environment; everything else disposed.
    // A leak would show as disposed < created - 1.
    expect(stats!.created).toBeGreaterThanOrEqual(5);
    expect(stats!.disposed).toBe(stats!.created - 1);
  });

  test("quality reports a valid tier on boot", async ({ page }) => {
    await page.goto("/");
    await page
      .locator("canvas")
      .first()
      .waitFor({ state: "visible", timeout: 20_000 })
      .catch(() => {});
    await page.waitForTimeout(1000);
    const tier = await page.evaluate(() => window.__ptDebug?.quality());
    // Under heavy CI load the watchdog may legitimately downgrade — assert
    // the system is live and within the tier set, not a specific tier.
    expect(["high", "medium", "low"]).toContain(tier);
  });
});
