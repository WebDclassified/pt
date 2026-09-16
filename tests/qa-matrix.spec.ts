import { expect, test } from "@playwright/test";
import { site } from "../src/content/site";

/**
 * Phase 17 — functional QA matrix (navigation + reflow).
 * Browser matrix expansion (Firefox/WebKit) is config-level via QA_MATRIX=1;
 * reflow uses the standard proxy: 320px CSS width ≙ 400% zoom on a 1280px
 * desktop viewport (WCAG 1.4.4 / 1.4.10).
 */

test.describe("Phase 17 — navigation", () => {
  test("deep link → back → forward keeps state correct", async ({ page }) => {
    await page.goto("/projects/vizquo");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Vizquo");

    await page.goto("/");
    await page.goBack();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Vizquo");
    await page.goForward();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("deep-link refresh works (SSG stability)", async ({ page }) => {
    await page.goto("/projects/qupay");
    await page.reload();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Qupay");
  });

  test("primary nav exposes all spec-required destinations", async ({
    page,
  }, testInfo) => {
    await page.goto("/");
    const header = page.getByRole("banner");
    const labels = [
      "Work",
      "Experience",
      "About",
      "Lab",
      "Recruiter View",
      "Engineer View",
      "Resume",
    ];

    if (testInfo.project.name === "mobile-chrome") {
      // Mobile direction (docs/10): destinations live behind the MENU toggle.
      const menuButton = header.getByRole("button", { name: "MENU" });
      await expect(menuButton).toBeVisible();
      await menuButton.click();
      const mobileMenu = page.getByRole("navigation", { name: "Mobile" });
      for (const label of labels) {
        await expect(mobileMenu.getByText(label, { exact: true })).toBeVisible();
      }
    } else {
      // Desktop: inline primary nav.
      for (const label of labels) {
        await expect(header.getByText(label, { exact: true })).toBeVisible();
      }
    }
  });

  test("footer carries status, contact, and sitemap data", async ({
    page,
  }) => {
    await page.goto("/");
    const footer = page.getByRole("contentinfo");
    await expect(footer).toContainText("Open to software engineering roles");
    await expect(footer).toContainText(site.email);
    await expect(footer).toContainText("LinkedIn");
    await expect(footer).toContainText("Recruiter View");
  });
});

test.describe("Phase 17 — reflow & content order", () => {
  test("320px floor: no horizontal overflow, content intact", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    expect(overflow, "horizontal overflow at 320px").toBe(false);

    // All critical destinations still reachable at the floor
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await expect(page.getByRole("link", { name: "EMAIL ME" })).toBeVisible();
  });

  test("content order: text beats exist before/independent of the canvas", async ({
    page,
  }) => {
    await page.goto("/");
    // The canvas is aria-hidden and pointer-events:none — the accessibility
    // tree must lead with real content, not decoration.
    const firstHeading = page.getByRole("heading", { level: 1 });
    await expect(firstHeading).toBeVisible();
    const canvasHidden = await page
      .locator("canvas")
      .first()
      .evaluate((el) => el.closest("[aria-hidden='true']") !== null);
    expect(canvasHidden).toBe(true);
  });
});
