"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050607",
          color: "#f1efe8",
          fontFamily: "ui-monospace, monospace",
        }}
      >
        <div style={{ maxWidth: 560, padding: 24 }}>
          <p style={{ color: "#c8ff3d", letterSpacing: "0.08em" }}>
            FATAL FAULT — CONTAINMENT ACTIVE
          </p>
          <h1 style={{ fontSize: "1.75rem", margin: "12px 0" }}>
            The experience could not start.
          </h1>
          <p style={{ color: "#969b9f", lineHeight: 1.6 }}>
            A critical error occurred outside the content layer. Reload to
            rebuild.
          </p>
          <p style={{ color: "#969b9f", fontSize: 12 }}>
            {error.digest ? `digest: ${error.digest}` : null}
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 20,
              padding: "12px 20px",
              background: "#c8ff3d",
              color: "#050607",
              border: "none",
              fontFamily: "inherit",
              letterSpacing: "0.08em",
              cursor: "pointer",
            }}
          >
            RELOAD
          </button>
        </div>
      </body>
    </html>
  );
}
