import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import CustomCursor from "@/components/ui/CustomCursor";
import Loader from "@/components/ui/Loader";
import Scoreboard from "@/components/ui/Scoreboard";
import ManagerMode from "@/components/easter/ManagerMode";
import { profile } from "@/data/profile";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const title = "Dhritisman Sarma — AI/ML Engineer | Developer Portfolio";
const description =
  "Portfolio of Dhritisman Sarma, a Computer Science and AI/ML engineer building intelligent systems, software products and data-driven applications.";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "DHRITISMAN FC",
  authors: [{ name: profile.name }],
  keywords: ["Dhritisman Sarma", "AI/ML Engineer", "Machine Learning", "Software Engineer", "Portfolio", "UPES"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "DHRITISMAN FC",
    title,
    description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "DHRITISMAN FC — A Career in 90 Minutes" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

// Structured data so search engines read the person, not just the page.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "AI/ML Engineer",
  description,
  alumniOf: { "@type": "CollegeOrUniversity", name: "UPES" },
  knowsAbout: ["Machine Learning", "Artificial Intelligence", "Software Engineering", "FinTech"],
  url: siteUrl,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${inter.variable} ${spaceMono.variable}`}>
      <body className="min-h-screen antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Loader />
        <CustomCursor />
        <Navigation />
        <Scoreboard />
        <ManagerMode />
        <main id="main" className="relative">
          {children}
        </main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
