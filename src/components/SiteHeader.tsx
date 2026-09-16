"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMotionPreferences } from "@/components/MotionPreferencesProvider";

const navItems = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#about", label: "About" },
  { href: "/lab", label: "Lab" },
  { href: "/recruiter", label: "Recruiter View" },
  { href: "/engineer", label: "Engineer View" },
];

/** Only route links participate in aria-current — never hash anchors. */
function isCurrentRoute(href: string, pathname: string): boolean {
  if (href.startsWith("/#")) return false;
  return href === pathname;
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const {
    reducedMotion,
    setReducedMotionOverride,
    reducedMotionOverride,
    audioEnabled,
    setAudioEnabled,
  } = useMotionPreferences();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-void/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-tech text-warm-white hover:text-signal"
          onClick={() => setMenuOpen(false)}
        >
          PRABHAT TEOTIA
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                isCurrentRoute(item.href, pathname) ? "true" : undefined
              }
              className="u-line-link u-motion-soft font-tech px-2 py-2 text-secondary-gray hover:text-warm-white"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="/resume"
            className="u-line-link u-motion-soft font-tech px-2 py-2 text-secondary-gray hover:text-warm-white"
            // Resume is external (Google Drive per source of truth)
            aria-label="Resume (opens Google Drive)"
          >
            Resume
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setAudioEnabled(!audioEnabled)}
            aria-pressed={audioEnabled}
            className="u-motion-soft font-tech px-2 py-2 text-secondary-gray hover:text-warm-white"
          >
            {audioEnabled ? "SOUND ON" : "SOUND OFF"}
          </button>
          <button
            type="button"
            onClick={() => setReducedMotionOverride(!reducedMotion)}
            aria-pressed={reducedMotionOverride === true}
            className="u-motion-soft font-tech px-2 py-2 text-secondary-gray hover:text-warm-white"
          >
            {reducedMotion ? "MOTION OFF" : "MOTION ON"}
          </button>
          <button
            type="button"
            ref={menuButtonRef}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="u-motion-soft font-tech px-2 py-2 text-warm-white md:hidden"
          >
            {menuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-white/10 bg-void/95 px-4 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {[...navItems, { href: "/resume", label: "Resume" }].map(
              (item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="u-motion-soft font-tech text-warm-white hover:text-signal"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
