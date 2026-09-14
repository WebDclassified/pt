/**
 * Phase 13 — performance budget audit on the PRODUCTION build.
 * Boots `next start`, collects real LCP/CLS from Chrome (PerformanceObserver),
 * plus transfer size. Budgets from docs/13: LCP ≤ 2.5s, CLS ≤ 0.1.
 * Run: node scripts/perf-audit.mjs (expects `npm run build` done).
 * Exit 1 on any budget failure or infra timeout — never hangs.
 */
import { chromium } from "playwright-core";
import { spawn, spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs";

const require = createRequire(import.meta.url);
// Resolve Next's CLI directly — `npx` is a .cmd shim and not spawnable on Windows
const nextBin = require.resolve("next/dist/bin/next");

const URL = "http://localhost:3111";
const BUDGETS = { lcpMs: 2500, cls: 0.1, transferKb: 900 };
const SERVER_LOG = "test-results/perf-server.log";
const GLOBAL_TIMEOUT_MS = 180_000;

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// Global watchdog — the audit must never hang a pipeline
const watchdog = setTimeout(() => {
  console.error(`ABORT: perf audit exceeded ${GLOBAL_TIMEOUT_MS / 1000}s`);
  process.exit(2);
}, GLOBAL_TIMEOUT_MS);
watchdog.unref();

async function waitForServer(url, tries = 50) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(2500) });
      if (res.ok) return true;
    } catch {}
    await wait(500);
  }
  return false;
}

fs.mkdirSync("test-results", { recursive: true });
const logStream = fs.openSync(SERVER_LOG, "w");
const server = spawn(process.execPath, [nextBin, "start", "-p", "3111"], {
  stdio: ["ignore", logStream, logStream],
});

let exitCode = 0;
try {
  // Build first: a prior dev-server run (e.g. e2e) clobbers .next with dev
  // artifacts, leaving `next start` without a production build.
  // CI sets NEXT_SKIP_BUILD=1 when `npm run build` already ran in the pipeline.
  if (!process.env.NEXT_SKIP_BUILD) {
    console.log("Building production bundle…");
    const build = spawnSync(process.execPath, [nextBin, "build"], {
      stdio: "inherit",
      timeout: 300_000,
    });
    if (build.status !== 0) {
      console.error("ABORT: production build failed before perf audit.");
      process.exit(2);
    }
  }

  const up = await waitForServer(URL);
  if (!up) {
    console.error(`ABORT: next start did not come up on :3111 — see ${SERVER_LOG}`);
    process.exit(2);
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  await page.addInitScript(() => {
    window.__metrics = { lcp: 0, cls: 0 };
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) window.__metrics.lcp = entry.startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) window.__metrics.cls += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
    } catch {}
  });

  await page.goto(URL + "/", { waitUntil: "load", timeout: 30_000 });
  await wait(3000); // let LCP finalize

  const metrics = await page.evaluate(() => window.__metrics);
  const transfer = await page.evaluate(() =>
    performance
      .getEntriesByType("resource")
      .concat(performance.getEntriesByType("navigation"))
      .reduce((sum, e) => sum + (e.transferSize || 0), 0) / 1024,
  );

  await browser.close();

  const rows = [
    ["LCP", metrics.lcp.toFixed(0) + "ms", BUDGETS.lcpMs + "ms", metrics.lcp <= BUDGETS.lcpMs],
    ["CLS", metrics.cls.toFixed(4), String(BUDGETS.cls), metrics.cls <= BUDGETS.cls],
    ["Transfer", transfer.toFixed(0) + "KB", BUDGETS.transferKb + "KB", transfer <= BUDGETS.transferKb],
  ];
  let failed = 0;
  for (const [name, actual, budget, pass] of rows) {
    if (!pass) failed++;
    console.log(`${pass ? "PASS" : "FAIL"}  ${name.padEnd(9)} ${actual.padEnd(9)} (budget ${budget})`);
  }
  exitCode = failed ? 1 : 0;
} catch (error) {
  console.error("ABORT:", String(error).slice(0, 300));
  exitCode = 2;
} finally {
  // Kill the whole tree reliably on Windows
  try {
    spawn("taskkill", ["/F", "/T", "/PID", String(server.pid)], { stdio: "ignore" });
  } catch {}
  try {
    server.kill();
  } catch {}
  fs.closeSync(logStream);
  clearTimeout(watchdog);
}
process.exit(exitCode);
