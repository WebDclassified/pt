import Link from "next/link";
import { site } from "@/content/site";
import { SplineSignature } from "@/components/SplineSignature";

/**
 * Footer — useful data only: current status, direct lines, sitemap.
 * Closed by the signature band: "PRABHAT TEOTIA" over the in-house 3D scene.
 * No vanity copy.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-void">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Status — the thing recruiters actually want to know */}
          <div>
            <h2 className="font-tech text-warm-white">STATUS</h2>
            <p className="mt-3 flex items-center gap-2 text-sm text-warm-white">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-full bg-signal"
              />
              Open to software engineering roles
            </p>
            <p className="mt-2 text-sm text-secondary-gray">
              Building and maintaining Vizquo. Secretary, HexClan (programming
              club, LIET).
            </p>
          </div>

          {/* Direct lines */}
          <div>
            <h2 className="font-tech text-warm-white">CONTACT</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="u-line-link text-secondary-gray hover:text-signal"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  rel="me noopener"
                  className="u-line-link text-secondary-gray hover:text-signal"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href={site.resume}
                  rel="noopener"
                  className="u-line-link text-secondary-gray hover:text-signal"
                >
                  Resume (PDF) ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Sitemap */}
          <div>
            <h2 className="font-tech text-warm-white">INDEX</h2>
            <nav aria-label="Footer" className="mt-3">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <li>
                  <Link href="/#work" className="u-line-link text-secondary-gray hover:text-signal">
                    Work
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#experience"
                    className="u-line-link text-secondary-gray hover:text-signal"
                  >
                    Experience
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="u-line-link text-secondary-gray hover:text-signal">
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/recruiter"
                    className="u-line-link text-secondary-gray hover:text-signal"
                  >
                    Recruiter View
                  </Link>
                </li>
                <li>
                  <Link
                    href="/engineer"
                    className="u-line-link text-secondary-gray hover:text-signal"
                  >
                    Engineer View
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="u-line-link text-secondary-gray hover:text-signal">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 font-tech text-xs text-secondary-gray sm:flex-row sm:items-center sm:justify-between">
          <p>BUILD / BREAK / REBUILD — © {year} {site.name}</p>
          <p>Designed &amp; engineered by {site.name}</p>
        </div>
      </div>

      {/* Closing shot — the user-selected Spline scene behind the name */}
      <SplineSignature />
    </footer>
  );
}
