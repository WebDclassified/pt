/**
 * Phase 05 gate — machine-checked contrast for the locked palette.
 * Pairs are (foreground, background) combos that actually occur in the UI.
 * Run: node scripts/check-contrast.mjs — exits 1 on any failure.
 * Source of truth: the hex values in src/app/globals.css @theme block.
 */

const PALETTE = {
  void: "#050607",
  graphite: "#0b0e10",
  surface: "#111518",
  warmWhite: "#f1efe8",
  secondaryGray: "#969b9f",
  signal: "#c8ff3d",
};

/** WCAG 2.2 relative luminance */
function luminance(hex) {
  const rgb = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = rgb.map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4),
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(fg, bg) {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

// Required ratios: 4.5 normal text, 3.0 large text / UI components (WCAG 2.2 AA)
const REQUIRED_PAIRS = [
  ["warmWhite on void", PALETTE.warmWhite, PALETTE.void, 4.5],
  ["warmWhite on graphite", PALETTE.warmWhite, PALETTE.graphite, 4.5],
  ["warmWhite on surface", PALETTE.warmWhite, PALETTE.surface, 4.5],
  ["secondaryGray on void", PALETTE.secondaryGray, PALETTE.void, 4.5],
  ["secondaryGray on graphite", PALETTE.secondaryGray, PALETTE.graphite, 4.5],
  ["secondaryGray on surface", PALETTE.secondaryGray, PALETTE.surface, 4.5],
  ["signal on void", PALETTE.signal, PALETTE.void, 4.5],
  ["signal on graphite", PALETTE.signal, PALETTE.graphite, 4.5],
  ["signal on surface", PALETTE.signal, PALETTE.surface, 4.5],
  ["void on signal (button hover)", PALETTE.void, PALETTE.signal, 4.5],
  ["void on signal (focus chip)", PALETTE.void, PALETTE.signal, 4.5],
];

let failures = 0;
for (const [name, fg, bg, required] of REQUIRED_PAIRS) {
  const ratio = contrast(fg, bg);
  const pass = ratio >= required;
  if (!pass) failures++;
  console.log(
    `${pass ? "PASS" : "FAIL"}  ${name.padEnd(32)} ${ratio.toFixed(2)}:1  (required ${required}:1)`,
  );
}

if (failures > 0) {
  console.error(`\n${failures} contrast pair(s) below WCAG AA — tune tokens in globals.css.`);
  process.exit(1);
}
console.log("\nAll palette pairs meet WCAG 2.2 AA.");
