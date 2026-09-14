import { chromium, devices } from "playwright-core";

const browser = await chromium.launch();
const context = await browser.newContext({
  ...devices["Pixel 7"],
  reducedMotion: "no-preference",
});
const page = await context.newPage();

page.on("console", (msg) => {
  if (msg.type() === "error" || msg.type() === "warning") {
    console.log(`[console.${msg.type()}]`, msg.text().slice(0, 300));
  }
});
page.on("pageerror", (err) => console.log("[pageerror]", String(err).slice(0, 500)));

await page.goto("http://localhost:3000/", { waitUntil: "load" });

// Wait a generous 3s for hydration
await page.waitForTimeout(3000);

const canvasCount = await page.locator("canvas").count();
console.log("canvas count:", canvasCount);

const button = page.getByRole("button", { name: /motion (on|off)/i });
console.log("button visible:", await button.isVisible());

await button.click();
await page.waitForTimeout(1500);

const label = await button.textContent();
const stored = await page.evaluate(() => window.localStorage.getItem("pt-reduced-motion-override"));
const lenisClass = await page.evaluate(() => document.documentElement.className);
console.log("label after click:", JSON.stringify(label));
console.log("localStorage override:", stored);
console.log("html class:", lenisClass);

// Second click for good measure
await button.click();
await page.waitForTimeout(1500);
console.log("label after 2nd click:", JSON.stringify(await button.textContent()));
console.log("localStorage override:", await page.evaluate(() => window.localStorage.getItem("pt-reduced-motion-override")));

await browser.close();
