import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "playwright-report/**",
      "test-results/**",
      "next-env.d.ts",
      "evidence/**",
      // Vendored third-party runtime code (self-hosted Spline runtime +
      // draco wasm libs) — never lint vendor distributions
      "public/spline/**",
      "public/libs/**",
    ],
  },
];

export default eslintConfig;
