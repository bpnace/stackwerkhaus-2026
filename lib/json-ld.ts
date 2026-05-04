import { siteConfig } from "@/lib/site-config";

export function toAbsoluteUrl(value: string) {
  return new URL(value, siteConfig.url).toString();
}

export function stringifyJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
