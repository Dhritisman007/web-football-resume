import type { MetadataRoute } from "next";
import { navItems, secondaryNavItems } from "@/data/sections";

// The site is one long page, so each section is listed as an anchor.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const lastModified = new Date();
  const sections = [...navItems, ...secondaryNavItems].filter((item) => item.id !== "home");

  return [
    { url: base, lastModified, changeFrequency: "monthly", priority: 1 },
    ...sections.map((item) => ({
      url: `${base}/#${item.id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
