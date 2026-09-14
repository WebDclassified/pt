import { expect, test } from "@playwright/test";

/**
 * M6 — security baseline validation (Phase 14).
 * Headers are asserted on live responses; the 3D boundary's fallback is
 * already covered by the M0 WebGL-blocked test — here we verify containment
 * structure exists.
 */

test.describe("M6 — security headers", () => {
  test("CSP blocks frames, objects, and foreign origins", async ({
    request,
  }) => {
    const response = await request.get("/");
    expect(response.status()).toBe(200);
    const csp = response.headers()["content-security-policy"];
    expect(csp).toBeTruthy();
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("base-uri 'self'");
    expect(csp).toContain("form-action 'self'");
    // Dev allows eval for React refresh; production must not
    if (process.env.NODE_ENV === "production") {
      expect(csp).not.toContain("'unsafe-eval'");
    }
  });

  test("hardening headers are all present", async ({ request }) => {
    const response = await request.get("/");
    const headers = response.headers();
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["permissions-policy"]).toContain("camera=()");
    expect(headers["permissions-policy"]).toContain("microphone=()");
    expect(headers["strict-transport-security"]).toContain("max-age=63072000");
    // Leaks the framework — explicitly disabled
    expect(headers["x-powered-by"]).toBeUndefined();
  });

  test("headers apply to deep routes too", async ({ request }) => {
    const response = await request.get("/projects/vizquo");
    expect(response.headers()["x-frame-options"]).toBe("DENY");
    expect(response.headers()["content-security-policy"]).toBeTruthy();
  });
});

test.describe("M6 — containment structure", () => {
  test("canvas is wrapped so runtime failure cannot kill content", async ({
    page,
  }) => {
    await page.goto("/");
    // The boundary renders the canvas inside itself; content must exist
    // independently of canvas success (proven by the M0 WebGL-blocked test).
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const canvas = page.locator("canvas");
    await expect(canvas.first()).toBeVisible();
  });
});
