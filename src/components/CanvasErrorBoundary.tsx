"use client";

import { Component, type ReactNode } from "react";

/**
 * Phase 15 — 3D runtime error boundary.
 * If the WebGL/R3F layer throws (driver failure, context loss recovery bug,
 * shader error), the page degrades to the DOM-only portfolio instead of
 * crashing. Content is never hostage to the cinematic layer.
 */
export class CanvasErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("[experience] 3D layer failed — falling back to DOM-only:", error);
  }

  render() {
    if (this.state.failed) {
      // Subtle static backdrop so the page keeps its atmosphere
      return (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(200,255,61,0.04), transparent 60%), #050607",
          }}
        />
      );
    }
    return this.props.children;
  }
}
