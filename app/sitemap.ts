import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { solutionsDetail } from "@/data/solutionsDetail";
import { programsDetail } from "@/data/programsDetail";

const staticRoutes = [
  { path: "", priority: 1, freq: "weekly" as const },
  { path: "/about", priority: 0.8, freq: "monthly" as const },
  { path: "/solutions", priority: 0.9, freq: "weekly" as const },
  { path: "/programs", priority: 0.9, freq: "weekly" as const },
  { path: "/for-schools", priority: 0.9, freq: "weekly" as const },
  { path: "/resources", priority: 0.7, freq: "weekly" as const },
  { path: "/resources/blog", priority: 0.7, freq: "weekly" as const },
  { path: "/resources/case-studies", priority: 0.6, freq: "monthly" as const },
  { path: "/resources/events", priority: 0.6, freq: "weekly" as const },
  { path: "/resources/faq", priority: 0.6, freq: "monthly" as const },
  { path: "/resources/downloads", priority: 0.6, freq: "monthly" as const },
  { path: "/contact", priority: 0.8, freq: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const solutionRoutes = solutionsDetail.map((s) => ({
    url: `${site.url}/solutions/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const programRoutes = programsDetail.map((p) => ({
    url: `${site.url}/programs/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const staticEntries = staticRoutes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));

  return [...staticEntries, ...solutionRoutes, ...programRoutes];
}
