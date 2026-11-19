import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { landingPagePaths } from "@/lib/landing-pages";
import { getAllProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

const STATIC_ROUTES = [
  "/",
  "/blog",
  "/projekte",
  "/templates",
  "/webseitecheck",
  "/datenschutz",
] as const;

// Only CMS-backed publication/change timestamps are known reliably.
// Static pages and year-only project metadata deliberately omit unknown lastmod.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([getAllPosts(), getAllProjects()]);

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${siteConfig.url}${route === "/" ? "" : route}`,
      changeFrequency: route === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "/" ? 1 : 0.4,
    })),
    ...landingPagePaths.map((route) => ({
      url: `${siteConfig.url}${route}`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...projects.map((project) => ({
      url: `${siteConfig.url}/projekte/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
