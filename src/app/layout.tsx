import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MotionPreferencesProvider } from "@/components/MotionPreferencesProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ApertureOverlay } from "@/components/ApertureOverlay";
import { AudioBridge } from "@/components/AudioBridge";
import { Wayfinder } from "@/components/Wayfinder";
import { site } from "@/content/site";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

// Display role (Phase 05): contemporary grotesk with editorial character
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
  },
  twitter: {
    card: "summary",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#050607",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <MotionPreferencesProvider>
          <SmoothScroll>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-signal focus:px-4 focus:py-2 focus:text-void"
            >
              Skip to main content
            </a>
            <SiteHeader />
            <main id="main-content" tabIndex={-1}>{children}</main>
            <SiteFooter />
            <Wayfinder />
            <ApertureOverlay />
            <AudioBridge />
          </SmoothScroll>
        </MotionPreferencesProvider>
      </body>
    </html>
  );
}
