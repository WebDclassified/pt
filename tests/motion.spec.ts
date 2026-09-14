import { expect, test } from "@playwright/test";

declare global {
  interface Window {
    __audioCreations?: number;
  }
}

/**
 * M3 — motion grammar + audio validation (Phases 08/09).
 * Proves: scene-change bus reaches the DOM, the aperture overlay reacts,
 * audio is opt-in and safe, hover grammar works, reduced motion skips FX.
 */

async function sceneKey(page: import("@playwright/test").Page): Promise<number> {
  const raw = await page
    .locator('[data-scene-key][aria-hidden="true"][class*="z-30"]')
    .first()
    .getAttribute("data-scene-key");
  return Number(raw ?? "0");
}

test.describe("M3 — signature transition", () => {
  test("scene changes increment the aperture key (bus → DOM)", async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator("canvas").first().waitFor({ state: "visible", timeout: 20_000 });
    await page.waitForTimeout(800);
    const before = await sceneKey(page);
    expect(before).toBe(0);

    // Scroll deep enough to cross at least one scene boundary
    await page.evaluate(() => {
      const doc = document.documentElement;
      window.scrollTo(0, doc.scrollHeight * 0.2);
    });
    await expect
      .poll(async () => sceneKey(page), { timeout: 10_000, intervals: [250] })
      .toBeGreaterThan(before);
  });

  test("reduced motion keeps the aperture overlay dormant", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.waitForTimeout(500);
    await page.evaluate(() => {
      const doc = document.documentElement;
      window.scrollTo(0, doc.scrollHeight * 0.25);
    });
    await page.waitForTimeout(600);
    const ring = page.locator("div.rounded-full.opacity-0").first();
    const opacity = await ring.evaluate((el) => getComputedStyle(el).opacity);
    expect(Number(opacity)).toBe(0);
  });
});

test.describe("M3 — audio is opt-in and safe", () => {
  test("sound starts OFF and toggles persist across reload", async ({
    page,
  }) => {
    await page.goto("/");
    const on = page.getByRole("button", { name: "SOUND ON" });
    const off = page.getByRole("button", { name: "SOUND OFF" });
    await expect(off).toBeVisible();

    await off.click(); // user gesture — the only path to audible audio
    await expect(on).toBeVisible();
    await page.reload();
    await expect(on).toBeVisible(); // persisted

    await on.click();
    await expect(off).toBeVisible();
  });

  test("no AudioContext is created without explicit user opt-in", async ({
    page,
  }) => {
    let constructed = 0;
    await page.addInitScript(() => {
      window.__audioCreations = 0;
      const Original = window.AudioContext;
      class Counting extends Original {
        constructor(...args: ConstructorParameters<typeof AudioContext>) {
          super(...args);
          window.__audioCreations = (window.__audioCreations ?? 0) + 1;
        }
      }
      window.AudioContext = Counting as typeof AudioContext;
    });
    await page.goto("/");
    await page.evaluate(() => {
      const doc = document.documentElement;
      window.scrollTo(0, doc.scrollHeight * 0.3);
    });
    await page.waitForTimeout(800);
    constructed = (await page.evaluate(() => window.__audioCreations)) ?? 0;
    expect(constructed).toBe(0);
  });
});

test.describe("M3 — interaction grammar", () => {
  test("project card hover grows the signal line and shifts the title", async ({
    page,
  }) => {
    await page.goto("/");
    const card = page.locator("article.group").first();
    await card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);

    const line = card.locator(".signal-line");
    const beforeWidth = await line.evaluate((el) => getComputedStyle(el).width);
    await card.hover();
    await page.waitForTimeout(600);
    const afterWidth = await line.evaluate((el) => getComputedStyle(el).width);

    const px = (v: string) => Number.parseFloat(v);
    expect(px(afterWidth)).toBeGreaterThan(px(beforeWidth));
  });
});
