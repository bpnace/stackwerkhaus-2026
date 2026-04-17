import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

const STATIC_ROUTES = ["/", "/impressum", "/datenschutz"] as const;

function getProjectLastModified(yearValue: string) {
  const year = Number(yearValue);
  if (!Number.isFinite(year) || year <= 0) {
    return new Date();
  }

  const now = new Date();
  const yearEnd = new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999));
  return yearEnd > now ? now : yearEnd;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([getAllPosts(), getAllProjects()]);

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${siteConfig.url}${route === "/" ? "" : route}`,
      lastModified: new Date(),
      changeFrequency: route === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "/" ? 1 : 0.4,
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...projects.map((project) => ({
      url: `${siteConfig.url}/projekte/${project.slug}`,
      lastModified: getProjectLastModified(project.year),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
