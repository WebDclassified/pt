/**
 * Phase 00/16 — visual quality loop, machine-assisted.
 * Loads evidence/film-frames/*.png into a canvas and computes per-frame
 * luminance stats. The film must progress dark → lit (prologue almost dark,
 * finale broad reveal) and every frame must have non-zero variance (geometry
 * actually rendered, not a flat black screen).
 * Run: node scripts/analyze-frames.mjs — exits 1 on gate failure.
 */
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "evidence", "film-frames");

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("about:blank");

const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".png")).sort();
if (files.length === 0) {
  console.error("No frames found — run CAPTURE_FRAMES=1 npx playwright test first.");
  process.exit(1);
}

const rows = [];
for (const file of files) {
  const b64 = fs.readFileSync(path.join(DIR, file)).toString("base64");
  const stats = await page.evaluate(async (dataUrl) => {
    const img = new Image();
    img.src = `data:image/png;base64,${dataUrl}`;
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const { data } = ctx.getImageData(0, 0, img.width, img.height);
    const lums = [];
    const stride = 16; // sample every 16th pixel for speed
    for (let i = 0; i < data.length; i += 4 * stride) {
      lums.push((0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255);
    }
    lums.sort((a, b) => a - b);
    const n = lums.length;
    const mean = lums.reduce((s, v) => s + v, 0) / n;
    const variance = lums.reduce((s, v) => s + v * v, 0) / n - mean * mean;
    const p95 = lums[Math.floor(n * 0.95)];
    const litShare = lums.filter((v) => v > 0.5).length / n;
    return { width: img.width, height: img.height, mean, stdDev: Math.sqrt(variance), p95, litShare };
  }, b64);
  rows.push({ file, ...stats });
  console.log(
    `${file}  mean ${stats.mean.toFixed(4)}  σ ${stats.stdDev.toFixed(4)}  lit ${((stats.litShare ?? 0) * 100).toFixed(2)}%`,
  );

  // ASCII luminance map — actual eyes on composition (film-frame test aid)
  const map = await page.evaluate(async (dataUrl) => {
    const img = new Image();
    img.src = `data:image/png;base64,${dataUrl}`;
    await new Promise((res, rej) => {
      img.onload = res;
      img.onerror = rej;
    });
    const W = 64;
    const H = 28;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, W, H);
    const { data } = ctx.getImageData(0, 0, W, H);
    const ramp = " .:-=+*#%@";
    let out = "";
    for (let y = 0; y < H; y++) {
      let row = "";
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        const lum = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
        row += ramp[Math.min(ramp.length - 1, Math.floor(lum * ramp.length))];
      }
      out += row + "\n";
    }
    return out;
  }, b64);
  console.log(map);
}

await browser.close();

// Gates — matched to the art direction's bimodal luminance (near-black
// environment, sparse bright type/light). We assert: geometry rendered
// everywhere, legible bright content present, finale visibly "open".
let failures = 0;
for (const row of rows) {
  if (row.stdDev < 0.01) {
    console.error(`FAIL: ${row.file} is nearly flat (σ=${row.stdDev.toFixed(4)}) — 3D did not render.`);
    failures++;
  }
  if (row.litShare < 0.0025) {
    console.error(`FAIL: ${row.file} lacks legible bright content (lit=${(row.litShare * 100).toFixed(2)}% < 0.25%).`);
    failures++;
  }
}
const last = rows[rows.length - 1];
if (last.litShare < 0.005 || last.stdDev < 0.06) {
  console.error(
    `FAIL: finale under-delivers the 'broad reveal' (lit=${(last.litShare * 100).toFixed(2)}%, σ=${last.stdDev.toFixed(4)}).`,
  );
  failures++;
}
if (failures > 0) process.exit(1);
console.log("\nFilm-frame gates PASS: geometry, bright-content floor, and finale reveal verified.");
