import type { NextConfig } from "next";

/**
 * Phase 14 — security baseline, tuned to the actual dependency set
 * (spec rule: never blindly copy a maximal header list that breaks features).
 *
 * CSP notes:
 * - `style-src 'unsafe-inline'`: React/three.js/GSAP set CSSOM styles; some
 *   framework CSS arrives as inline <style> in dev.
 * - `script-src 'unsafe-inline'`: Next.js App Router bootstrap requires it
 *   without a nonce middleware. Upgrade path: nonce-based middleware.
 * - `script-src 'unsafe-eval'` is DEV-ONLY (React refresh runtime).
 * - Fonts are self-hosted via next/font (no external font hosts).
 * - Third-party embed, by explicit user decision: the Spline footer scene
 *   (self-hosted runtime, foreign scene host only). Background music is a
 *   self-hosted MP3 (public/assets) through WebAudio — no foreign origins
 *   needed for it. Everything else remains same-origin.
 *   Everything else remains same-origin.
 * - No `upgrade-insecure-requests`: every resource is same-origin, so the
 *   directive protects nothing — and it breaks http-hosted previews on
 *   WebKit (Safari upgrades localhost subresources literally, found by the
 *   Phase 17 matrix). HTTPS is enforced by the platform edge + HSTS.
 */
const isDev = process.env.NODE_ENV === "development";

const SPLINE_ORIGIN = "https://*.spline.design";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  // blob: — Spline materializes scene textures as blob: URLs (found by probe)
  `img-src 'self' data: blob: ${SPLINE_ORIGIN}`,
  "font-src 'self'",
  `connect-src 'self' ${SPLINE_ORIGIN}`,
  `media-src blob: ${SPLINE_ORIGIN}`,
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
