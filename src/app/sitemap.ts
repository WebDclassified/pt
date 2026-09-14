import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/recruiter`, lastModified: now, priority: 0.8 },
    { url: `${site.url}/engineer`, lastModified: now, priority: 0.5 },
    ...projects.map((project) => ({
      url: `${site.url}/${project.slug}`,
      lastModified: now,
      priority: 0.9,
    })),
  ];
}
