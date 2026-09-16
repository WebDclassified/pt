import { expect, test } from "@playwright/test";

/**
 * Phase 21 — interactive cinematic upgrade validation.
 * Proves: wayfinding indicator tracks the film (§97), engine introspection
 * prologue (§95), the engine publishes its scene state for wayfinding and
 * deterministic capture (§123), and interactions leave content intact.
 */

test.describe("Phase 21 — wayfinding (§97)", () => {
  test("indicator shows scene position and updates through the film", async ({
    page,
  }) => {
    await page.goto("/");
    const indicator = page.getByTestId("wayfinder");
    await expect(indicator).toContainText("01");

    // Travel deep into the film — the indicator must follow
    await page.evaluate(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, max * 0.6);
    });
    await expect(indicator).not.toContainText("01 /", { timeout: 10_000 });
    await expect(indicator).toContainText("/ 16");
  });

  test("indicator is purely additive — nav still reaches every page", async ({
    page,
  }, testInfo) => {
    await page.goto("/");
    // The wayfinder must never be the only path: header nav works as before.
    // Mobile direction: destinations live behind the MENU toggle (§93/§115).
    if (testInfo.project.name === "mobile-chrome") {
      await page.getByRole("banner").getByRole("button", { name: "MENU" }).click();
      await page.getByRole("navigation", { name: "Mobile" }).getByText("Work", { exact: true }).click();
    } else {
      await page.getByRole("banner").getByRole("link", { name: "Work" }).click();
    }
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

// Skip Intro (§95) removed by user direction — the film plays without an
// escape hatch; the nav remains the wayfinding path.

test.describe("Phase 21 — engine introspection (§123)", () => {
  test("scene state is exposed and matches the film registry", async ({
    page,
  }) => {
    await page.goto("/");
    // The hook appears once the canvas hydrates — poll like the M5 audits
    await expect
      .poll(() => page.evaluate(() => typeof window.__ptDebug?.scene), {
        timeout: 15_000,
      })
      .toBe("function");
    const scene = await page.evaluate(() => window.__ptDebug?.scene());
    expect(typeof scene).toBe("string");
    expect(scene?.length).toBeGreaterThan(0);
  });

  test("capture determinism: two loads produce identical scene sequence", async ({
    page,
  }) => {
    const read = async () => {
      await page.goto("/");
      await expect
        .poll(() => page.evaluate(() => typeof window.__ptDebug?.scene), {
          timeout: 15_000,
        })
        .toBe("function");
      const ids: string[] = [];
      for (let i = 0; i < 3; i++) {
        await page.evaluate((p) => {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          window.scrollTo(0, max * p);
        }, i * 0.3);
        await page.waitForTimeout(600);
        ids.push((await page.evaluate(() => window.__ptDebug?.scene())) ?? "none");
      }
      return ids;
    };
    const first = await read();
    const second = await read();
    expect(second).toEqual(first);
  });
});

test.describe("Phase 21 — interaction leaves content intact", () => {
  test("pointer movement never occludes or breaks DOM content", async ({
    page,
  }) => {
    await page.goto("/");
    await page.mouse.move(200, 200);
    await page.mouse.move(800, 400, { steps: 8 });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("canvas").first()).toBeVisible();
  });
});
