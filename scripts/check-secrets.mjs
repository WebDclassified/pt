/**
 * Phase 14 — secret scanning (spec: dependency checks + secret scanning).
 * Scans all project files (excluding VCS/build dirs) for common credential
 * patterns and stray env files. Run: node scripts/check-secrets.mjs
 * Exit 1 on any finding.
 */
import fs from "node:fs";
import path from "node:path";

const SKIP_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  "test-results",
  "playwright-report",
  "evidence",
  ".vercel",
]);

const PATTERNS = [
  ["private key block", /-----BEGIN (?:RSA |EC |OPENSSH |PGP |DSA )?PRIVATE KEY-----/],
  ["AWS access key", /\bAKIA[0-9A-Z]{16}\b/],
  ["Stripe live key", /\bsk_live_[0-9a-zA-Z]{10,}\b/],
  ["GitHub token", /\bgh[pousr]_[0-9A-Za-z]{20,}\b/],
  ["Slack token", /\bxox[bpars]-[0-9A-Za-z-]{10,}\b/],
  ["Google API key", /\bAIza[0-9A-Za-z_-]{35}\b/],
  ["Supabase service role", /\bsbp_[0-9a-f]{40}\b/],
  ["JWT secret literal", /\bjwt[_-]?secret\s*[:=]\s*['"][^'"]{8,}['"]/i],
  ["password literal", /\bpassword\s*[:=]\s*['"][^'"]{6,}['"]/i],
  ["connection string with creds", /\b(?:mongodb(?:\+srv)?|postgres(?:ql)?|mysql):\/\/[^\s/:@]+:[^\s/:@]+@/],
];

let findings = 0;

function scanFile(filePath) {
  const base = path.basename(filePath);
  // Stray env files (only .env.example may exist)
  if (base.startsWith(".env") && base !== ".env.example") {
    console.error(`FAIL  ${filePath} — env file must not exist in the repo (use .env.example)`);
    findings++;
    return;
  }
  let content;
  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch {
    return; // binary or unreadable
  }
  for (const [name, re] of PATTERNS) {
    const match = content.match(re);
    if (match) {
      console.error(`FAIL  ${filePath} — ${name}: ${match[0].slice(0, 24)}…`);
      findings++;
    }
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(full);
    } else if (entry.isFile()) {
      scanFile(full);
    }
  }
}

walk(process.cwd());

if (findings > 0) {
  console.error(`\n${findings} secret pattern finding(s) — remove before committing.`);
  process.exit(1);
}
console.log("Secrets scan clean: no credential patterns, no stray env files.");
