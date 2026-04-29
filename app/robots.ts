import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const siteUrl = new URL(siteConfig.url);

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
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      ...AI_USER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteUrl.host,
  };
}
