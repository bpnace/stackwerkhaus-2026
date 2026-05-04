import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const AI_USER_AGENTS = [
  "OAI-SearchBot",
  "GPTBot",
  "PerplexityBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "Google-Extended",
] as const;

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      ...AI_USER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow,
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
