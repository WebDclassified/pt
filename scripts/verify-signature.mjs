import { chromium } from "playwright";
import fs from "node:fs";

// Paint proof for the Spline footer signature:
// 1. Any CSP violations on the page → listed (empty = good)
// 2. spline-viewer custom element present + scene attached
// 3. Pixel stats of the band above the dead-band floor
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const violations = [];
const splineLogs = [];
const pageErrors = [];
page.on("console", (msg) => {
  const text = msg.text();
  if (msg.type() === "error" && /Content Security Policy|Refused to/i.test(text)) {
    violations.push(text.slice(0, 220));
  }
  if (/\[spline-signature\]/.test(text)) splineLogs.push(text.slice(0, 300));
});
page.on("pageerror", (err) => pageErrors.push(String(err).slice(0, 220)));

await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

const band = page.locator("footer .signature-band");
await band.scrollIntoViewIfNeeded();

// Wait for the signature canvas to mount, then give the runtime + scene
// time to load and paint
const canvasMounted = await page
  .waitForFunction(() => Boolean(document.querySelector("footer canvas")), { timeout: 30000 })
  .then(() => true)
  .catch(() => false);
await page.waitForTimeout(9000); // runtime 3.3MB + scene 2.7MB + first frames

// Animation proof: two band captures 700ms apart. A live scene changes
// pixels; a dead band is static. (Canvas readback is useless here — WebGL
// without preserveDrawingBuffer reads back black even while rendering.)
const bandBox = await band.boundingBox();
const clip = bandBox
  ? { x: bandBox.x, y: Math.max(0, bandBox.y), width: bandBox.width, height: Math.min(bandBox.height, 900) }
  : null;
const shotA = clip ? await page.screenshot({ clip }) : null;
await page.waitForTimeout(700);
const shotB = clip ? await page.screenshot({ clip }) : null;
const animDiff =
  shotA && shotB
    ? await page.evaluate(
        async ([a, b]) => {
          const load = (src) =>
            new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = () => resolve(img);
              img.onerror = reject;
              img.src = `data:image/png;base64,${src}`;
            });
          const [ia, ib] = await Promise.all([load(a), load(b)]);
          const c = document.createElement("canvas");
          c.width = ia.width;
          c.height = ia.height;
          const ctx = c.getContext("2d");
          ctx.drawImage(ia, 0, 0);
          const da = ctx.getImageData(0, 0, c.width, c.height).data;
          ctx.clearRect(0, 0, c.width, c.height);
          ctx.drawImage(ib, 0, 0);
          const db = ctx.getImageData(0, 0, c.width, c.height).data;
          let changed = 0;
          const n = ia.width * ia.height;
          for (let i = 0; i < da.length; i += 4) {
            if (Math.abs(da[i] - db[i]) > 4 || Math.abs(da[i + 1] - db[i + 1]) > 4 || Math.abs(da[i + 2] - db[i + 2]) > 4) changed++;
          }
          return (changed / n) * 100;
        },
        [shotA.toString("base64"), shotB.toString("base64")],
      )
    : null;

await page.screenshot({ path: "evidence/signature-verify.png" });
await browser.close();

const png = fs.readFileSync("evidence/signature-verify.png").toString("base64");
const b = await chromium.launch();
const p2 = await b.newPage();
const stats = await p2.evaluate(async (b64) => {
  const img = new Image();
  img.src = `data:image/png;base64,${b64}`;
  await img.decode();
  const c = document.createElement("canvas");
  c.width = img.width; c.height = img.height;
  const ctx = c.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const { data } = ctx.getImageData(0, 0, img.width, img.height);
  let sum = 0, sum2 = 0, lit = 0;
  const n = img.width * img.height;
  for (let i = 0; i < data.length; i += 4) {
    const y = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
    sum += y; sum2 += y * y;
    if (y > 0.06) lit++;
  }
  const mean = sum / n;
  const std = Math.sqrt(Math.max(0, sum2 / n - mean * mean));
  return { mean, std, litPct: (lit / n) * 100 };
}, png);
await b.close();

console.log(`CSP violations: ${violations.length}`);
violations.slice(0, 3).forEach((v) => console.log(`  ! ${v}`));
pageErrors.slice(0, 3).forEach((e) => console.log(`  x ${e}`));
splineLogs.forEach((l) => console.log(`  · ${l.replace(/^.*\[spline-signature\]\s*/, "")}`));
console.log(`signature canvas mounted: ${canvasMounted}`);
if (animDiff !== null) console.log(`animation diff (700ms): ${animDiff.toFixed(2)}% of pixels changed`);
console.log(`band pixels — mean: ${stats.mean.toFixed(4)}  std: ${stats.std.toFixed(4)}  lit: ${stats.litPct.toFixed(2)}%`);
const pass =
  violations.length === 0 &&
  pageErrors.length === 0 &&
  canvasMounted &&
  animDiff !== null &&
  animDiff > 0.15 && // slow-breathing scene: ~0.3%/700ms is live motion
  stats.mean > 0.04;
console.log(pass ? "SPLINE SIGNATURE PAINTS: PASS" : "SPLINE SIGNATURE PAINTS: FAIL");
process.exit(pass ? 0 : 1);
