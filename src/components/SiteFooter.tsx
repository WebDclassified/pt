import Link from "next/link";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-void">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <p className="text-sm text-warm-white">
          A portfolio by {site.name}.
        </p>
        <p className="mt-2 max-w-2xl text-sm text-secondary-gray">
          Built with Next.js, React, Three.js, React Three Fiber, GSAP, Lenis,
          and Tailwind CSS — with selected third-party tools credited to their
          original authors. Concept, direction, content, and engineering:{" "}
          {site.name}.
        </p>
        <nav
          aria-label="Footer"
          className="mt-6 flex flex-wrap gap-x-6 gap-y-2"
        >
          <Link href="/#work" className="font-tech hover:text-signal">
            Work
          </Link>
          <Link href="/#contact" className="font-tech hover:text-signal">
            Contact
          </Link>
          <Link href="/recruiter" className="font-tech hover:text-signal">
            Recruiter View
          </Link>
          <Link href="/engineer" className="font-tech hover:text-signal">
            Engineer View
          </Link>
          <a
            href={site.linkedin}
            className="font-tech hover:text-signal"
            rel="me noopener"
          >
            LinkedIn
          </a>
        </nav>
        <p className="mt-8 font-tech">
          BUILD / BREAK / REBUILD — © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
