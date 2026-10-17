import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projectsData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://durgeshkanzariya.dev";

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...projectRoutes,
  ];
}
