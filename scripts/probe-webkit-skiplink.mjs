import { webkit } from "@playwright/test";

/**
 * Probe: (1) does Tab navigation work at all in Playwright's WebKit port,
 * and if so (2) which skip-link hiding technique stays in tab order?
 * Control case: a fully visible link must be reachable by Tab.
 */
const browser = await webkit.launch();
const page = await browser.newPage();

const html = `<a id="visible" href="#s" style="display:block;padding:8px;">VISIBLE-LINK</a>
<a id="clip" href="#s" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">CLIP-LINK</a>
<a id="transform" href="#s" style="position:absolute;transform:translateY(-200px);">TRANSFORM-LINK</a>
<a id="tiny" href="#s" style="position:absolute;width:1px;height:1px;overflow:hidden;white-space:nowrap;">TINY-LINK</a>
<main id="s" style="height:2000px">target</main>`;

await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.activeElement?.blur?.());

const results = [`hasFocus: ${await page.evaluate(() => document.hasFocus())}`];
for (let i = 0; i < 6; i++) {
  await page.keyboard.press("Tab");
  await page.waitForTimeout(150);
  const active = await page.evaluate(
    () => document.activeElement?.id || document.activeElement?.tagName,
  );
  results.push(`Tab ${i + 1}: ${active}`);
}
console.log(results.join("\n"));

await browser.close();
