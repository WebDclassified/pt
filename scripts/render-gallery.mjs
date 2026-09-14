/**
 * Evidence gallery — renders every captured frame into one browsable page.
 * Usage: node scripts/render-gallery.mjs  → evidence/gallery.html
 * Images are embedded as data URLs so the single file travels anywhere.
 */
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "evidence", "film-frames");
const OUT = path.join(process.cwd(), "evidence", "gallery.html");

const browser = await chromium.launch();
const page = await browser.newPage();

const files = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith(".png"))
  .sort();

const cards = [];
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
    const stride = 16;
    for (let i = 0; i < data.length; i += 4 * stride) {
      lums.push(
        (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255,
      );
    }
    lums.sort((a, b) => a - b);
    const n = lums.length;
    const mean = lums.reduce((s, v) => s + v, 0) / n;
    const variance =
      lums.reduce((s, v) => s + v * v, 0) / n - mean * mean;
    const litShare = lums.filter((v) => v > 0.5).length / n;
    return {
      width: img.width,
      height: img.height,
      mean,
      stdDev: Math.sqrt(variance),
      litShare,
    };
  }, b64);

  const isExhibit = file.startsWith("exhibit-");
  const label = isExhibit
    ? file.replace("exhibit-", "EXHIBIT · ").replace(".png", "").toUpperCase()
    : `FILM · ${file.replace(".png", "").replace(/-/g, " ").toUpperCase()}`;

  cards.push(`
    <figure class="card ${isExhibit ? "exhibit" : "film"}">
      <img src="data:image/png;base64,${b64}" alt="${label}" loading="lazy" />
      <figcaption>
        <span class="label">${label}</span>
        <span class="stats">mean ${stats.mean.toFixed(3)} · σ ${stats.stdDev.toFixed(3)} · lit ${((stats.litShare ?? 0) * 100).toFixed(2)}% · ${stats.width}×${stats.height}</span>
      </figcaption>
    </figure>`);
}

await browser.close();

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>BUILD / BREAK / REBUILD — evidence gallery</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0; background: #050607; color: #f1efe8;
    font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
    padding: 40px 24px 80px;
  }
  header { max-width: 1280px; margin: 0 auto 32px; }
  h1 { font-size: 20px; letter-spacing: 0.2em; margin: 0 0 8px; }
  p.sub { margin: 0; color: #969b9f; font-size: 13px; }
  .grid {
    max-width: 1280px; margin: 0 auto; display: grid;
    grid-template-columns: repeat(auto-fill, minmax(420px, 1fr)); gap: 24px;
  }
  figure.card {
    margin: 0; border: 1px solid #1c2226; background: #0b0e10;
    overflow: hidden;
  }
  figure.exhibit { border-color: #3d4a1f; }
  figure.card img { display: block; width: 100%; height: auto; }
  figcaption {
    display: flex; flex-direction: column; gap: 4px;
    padding: 10px 14px; border-top: 1px solid #1c2226;
  }
  .label { font-size: 12px; letter-spacing: 0.18em; }
  figure.exhibit .label { color: #c8ff3d; }
  .stats { font-size: 11px; color: #969b9f; }
</style>
</head>
<body>
<header>
  <h1>BUILD / BREAK / REBUILD — EVIDENCE GALLERY</h1>
  <p class="sub">${cards.length} captures · film grid + per-exhibit key frames · generated ${new Date().toISOString()}</p>
</header>
<div class="grid">${cards.join("\n")}
</div>
</body>
</html>`;

fs.writeFileSync(OUT, html);
console.log(`Gallery written: ${OUT} (${cards.length} captures)`);
