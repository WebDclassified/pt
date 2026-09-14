import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

/**
 * M2 — experience engine validation (Phases 06/07).
 * Proves: full-page traversal with the persistent canvas, scroll integrity,
 * DOM-beat reveals, reduced-motion mode, and film-frame captures for the
 * Phase 16 visual deviation loop.
 */

const FRAMES_DIR = path.join(process.cwd(), "evidence", "film-frames");

test.describe("M2 — cinematic traversal", () => {
  test("full-page scroll traversal keeps content and canvas alive", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForTimeout(800); // canvas boot

    const steps = 12;
    for (let i = 1; i <= steps; i++) {
      await page.mouse.wheel(0, (i * page.viewportSize()!.height) / 3);
      await page.waitForTimeout(120);
    }
    // Bottom of the film: contact section reachable
    await expect(
      page.getByRole("heading", { name: "Then do it again — better." }),
    ).toBeVisible();

    // Reverse traversal: back to top, hero still intact
    await page.keyboard.press("Home");
    await page.waitForTimeout(600);
    await expect(
      page.getByRole("heading", { name: /Everything begins with an idea/ }),
    ).toBeVisible();

    // The persistent canvas never unmounted
    const canvasCount = await page.locator("canvas").count();
    expect(canvasCount).toBe(1);
  });

  test("DOM beats reveal on scroll and remain visible after pass", async ({
    page,
  }) => {
    await page.goto("/");
    const workSection = page.locator("#work");
    await workSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    await expect(
      page.getByRole("heading", { name: /Six systems, built end to end/ }),
    ).toBeVisible();
    // Beat stays revealed after scrolling past (once:true behavior)
    await page.mouse.wheel(0, 800);
    await page.waitForTimeout(400);
    await expect(
      page.getByRole("heading", { name: /Six systems, built end to end/ }),
    ).toBeVisible();
  });

  test("reduced motion renders the full portfolio statically", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    // Content complete without any smoothing
    await expect(
      page.getByRole("heading", { name: /Everything begins with an idea/ }),
    ).toBeVisible();
    await page.locator("#work").scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("heading", { name: /Six systems, built end to end/ }),
    ).toBeVisible();
    // Lenis must not be active — html carries no smoothing artifacts
    const lenisActive = await page.evaluate(
      () => Boolean(document.querySelector(".lenis")),
    );
    expect(lenisActive).toBe(false);
  });
});

test.describe("M2 — film-frame evidence", () => {
  test("captures storyboard frames for the visual deviation loop", async ({
    page,
  }, testInfo) => {
    test.skip(process.env.CAPTURE_FRAMES !== "1", "set CAPTURE_FRAMES=1 to record");
    fs.mkdirSync(FRAMES_DIR, { recursive: true });
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/");
    await page.waitForTimeout(1200);

    const doc = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
    // Final creative test (MASTER_AGENT_PROMPT): 10 frames from the film;
    // the analyzer then verifies every frame renders as an intentional image.
    const stops = [0, 0.1, 0.2, 0.3, 0.42, 0.54, 0.66, 0.78, 0.9, 1];
    for (let i = 0; i < stops.length; i++) {
      await page.evaluate(
        ({ p, max }) => window.scrollTo(0, p * max),
        { p: stops[i], max: doc },
      );
      await page.waitForTimeout(1100);
      await page.screenshot({
        path: path.join(FRAMES_DIR, `frame-${String(i).padStart(2, "0")}-${Math.round(stops[i] * 100)}pct.png`),
      });
    }
    testInfo.attach("film-frames-dir", { body: FRAMES_DIR, contentType: "text/plain" });
    expect(fs.readdirSync(FRAMES_DIR).length).toBeGreaterThanOrEqual(8);
  });

  test("captures per-exhibit key frames at each scene's engagement peak (DEV-21-5)", async ({
    page,
  }, testInfo) => {
    test.skip(process.env.CAPTURE_FRAMES !== "1", "set CAPTURE_FRAMES=1 to record");
    fs.mkdirSync(FRAMES_DIR, { recursive: true });
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/");
    await page.waitForTimeout(1200);

    // Exhibit scenes get their own capture stop at scene-local midpoint —
    // where the engagement ramp (smoothstep 0.1→0.5) is fully lit.
    const { scenes, totalWeight } = await import("../src/content/scenes");
    const EXHIBIT_SCENES = [
      "PROJECT_VIZQUO",
      "PROJECT_QUPAY",
      "PROJECT_HILO",
      "PROJECT_MEDIUM",
      "PROJECT_BLOCK_SWAP",
      "SYSTEMS",
      "LAB",
      "ABOUT",
    ];
    const doc = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
    let cumulative = 0;
    const stops = scenes.map((s) => {
      const start = cumulative / totalWeight;
      cumulative += s.weight;
      return { id: s.id as string, mid: start + s.weight / totalWeight / 2 };
    });

    let captured = 0;
    for (const scene of stops) {
      if (!EXHIBIT_SCENES.includes(scene.id)) continue;
      await page.evaluate(
        ({ p, max }) => window.scrollTo(0, p * max),
        { p: scene.mid, max: doc },
      );
      await page.waitForTimeout(1100);
      await page.screenshot({
        path: path.join(FRAMES_DIR, `exhibit-${scene.id.toLowerCase()}.png`),
      });
      captured++;
    }
    testInfo.attach("exhibit-frames", { body: String(captured), contentType: "text/plain" });
    expect(captured).toBe(EXHIBIT_SCENES.length);
  });

  test("viewport matrix smoke — key widths render the film safely", async ({
    page,
  }) => {
    await page.goto("/");
    for (const width of [320, 375, 768, 1280, 1920]) {
      await page.setViewportSize({ width, height: 800 });
      await page.waitForTimeout(350);
      await expect(
        page.getByRole("heading", { level: 1 }),
      ).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      expect(overflow, `horizontal overflow at ${width}px`).toBe(false);
    }
  });
});
