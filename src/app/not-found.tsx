import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-svh max-w-4xl flex-col justify-center px-4 sm:px-6">
      <p className="font-tech text-signal">404 — FRACTURE DETECTED</p>
      <h1 className="mt-4 text-4xl font-medium tracking-tight text-warm-white sm:text-6xl">
        This structure doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-xl text-secondary-gray">
        Every broken path is a chance to rebuild. Return to the film.
      </p>
      <div className="mt-8 flex gap-6">
        <Link
          href="/"
          className="border border-signal px-5 py-3 font-tech text-signal transition-colors hover:bg-signal hover:text-void"
        >
          BACK TO START
        </Link>
        <Link
          href="/#work"
          className="border border-white/20 px-5 py-3 font-tech text-warm-white transition-colors hover:border-signal hover:text-signal"
        >
          VIEW THE WORK
        </Link>
      </div>
    </div>
  );
}
