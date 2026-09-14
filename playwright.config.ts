import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  // Keep load realistic: heavy 3D hydration on emulated mobile needs headroom
  workers: process.env.CI ? 1 : 2,
  forbidOnly: !process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chrome", use: { ...devices["Pixel 7"] } },
    // Phase 17 browser matrix: at least Chrome, Edge (Chromium-equivalent),
    // Firefox. Safari/WebKit runs where the host supports it.
    ...(process.env.QA_MATRIX === "1"
      ? [
          { name: "firefox", use: { ...devices["Desktop Firefox"] } },
          { name: "webkit", use: { ...devices["Desktop Safari"] } },
        ]
      : []),
  ],
  webServer: {
    // Phase 17: smoke tests must run against the PRODUCTION build.
    // Run `npm run build` first (npm run validate does this).
    command: "npm run start",
    url: "http://localhost:3000",
    // Never reuse a stray server — zombie processes corrupted earlier runs
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
