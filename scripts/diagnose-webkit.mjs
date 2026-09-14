import { webkit } from "@playwright/test";

/**
 * WebKit diagnostic: does the bundle evaluate, does React hydrate,
 * does WebGL exist, does the canvas mount?
 */
const browser = await webkit.launch();
const page = await browser.newPage();

const consoleMsgs = [];
const pageErrors = [];
page.on("console", (m) => consoleMsgs.push(`[${m.type()}] ${m.text().slice(0, 200)}`));
page.on("pageerror", (e) => pageErrors.push(String(e).slice(0, 300)));

await page.goto("http://localhost:3000/", { waitUntil: "load", timeout: 30000 });
await page.waitForTimeout(8000);

const state = await page.evaluate(() => {
  const c = document.querySelector("canvas");
  let gl = null;
  try {
    gl = !!document.createElement("canvas").getContext("webgl2");
  } catch {
    gl = "THROWS";
  }
  return {
    canvas: !!c,
    canvasSize: c ? `${c.width}x${c.height}` : null,
    webgl2: gl,
    reactRootMarked: !!document.querySelector("[data-reactroot], main#main-content"),
    debugHook: typeof window.__ptDebug,
    bodyChildren: document.body.children.length,
    heroFont: getComputedStyle(document.querySelector("h1")).fontFamily.slice(0, 60),
  };
});

console.log("PAGE ERRORS:", pageErrors.length);
pageErrors.slice(0, 6).forEach((e) => console.log("  ", e));
console.log("CONSOLE (errors/warnings):", consoleMsgs.filter((m) => !m.startsWith("[log]")).length);
consoleMsgs.filter((m) => m.startsWith("[error]") || m.startsWith("[warning]")).slice(0, 8).forEach((m) => console.log("  ", m));
console.log("STATE:", JSON.stringify(state, null, 2));

await browser.close();
