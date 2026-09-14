"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[route error]", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-svh max-w-4xl flex-col justify-center px-4 sm:px-6">
      <p className="font-tech text-signal">SYSTEM FAULT — CONTAINMENT ACTIVE</p>
      <h1 className="type-chapter mt-4 text-warm-white">
        Something fractured.
      </h1>
      <p className="mt-4 max-w-xl text-secondary-gray">
        This section hit an unexpected error. The rest of the portfolio is
        unaffected — rebuild this view or return to the start.
      </p>
      <div className="mt-8 flex flex-wrap gap-6">
        <button
          type="button"
          onClick={reset}
          className="border border-signal px-5 py-3 font-tech text-signal transition-colors hover:bg-signal hover:text-void"
        >
          REBUILD THIS VIEW
        </button>
        <Link
          href="/"
          className="border border-white/20 px-5 py-3 font-tech text-warm-white transition-colors hover:border-signal hover:text-signal"
        >
          BACK TO START
        </Link>
      </div>
    </div>
  );
}
