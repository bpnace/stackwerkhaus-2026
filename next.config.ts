import type { NextConfig } from "next";

const DEFAULT_CMS_URL = "https://cms.stackwerkhaus.de";

function toHostname(value: string) {
  try {
    return new URL(value).hostname;
  } catch {
    return null;
  }
}

const cmsHostnames = Array.from(
  new Set(
    [DEFAULT_CMS_URL, process.env.STACKWERKHAUS_CMS_URL]
      .filter((value): value is string => Boolean(value))
      .map(toHostname)
      .filter((value): value is string => Boolean(value)),
  ),
);

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  transpilePackages: ["next-mdx-remote"],
  images: {
    remotePatterns: cmsHostnames.map((hostname) => ({
      protocol: "https",
      hostname,
      pathname: "/sites/default/files/**",
    })),
  },
};

export default nextConfig;
