import assert from "node:assert/strict";
import { DEFAULT_BLOG_SLUG, DEFAULT_PROJECT_SLUG } from "./fixtures/content-slugs.mjs";

const baseUrl = process.env.SMOKE_BASE_URL || "http://127.0.0.1:3000";
const pinnedBlogSlug = process.env.SMOKE_BLOG_SLUG || DEFAULT_BLOG_SLUG;
const richPattern = process.env.SMOKE_BLOG_RICH_PATTERN;
const checks = [
  ["/", "Deine digitalen"],
  [`/blog/${pinnedBlogSlug}`, "class=\"mdx-body\""],
  [`/projekte/${DEFAULT_PROJECT_SLUG}`, "class=\"section-shell\""],
  ["/impressum", "Sigmaringer Str. 27"],
  ["/datenschutz", "Datenschutzerklärung"],
];

for (const [pathname, expected] of checks) {
  const response = await fetch(new URL(pathname, baseUrl));
  assert.equal(response.status, 200, `${pathname} returned ${response.status}`);
  const html = await response.text();
  assert.match(html, new RegExp(expected), `${pathname} missing ${expected}`);
}

const blogDetailPath = `/blog/${pinnedBlogSlug}`;
const blogDetailResponse = await fetch(new URL(blogDetailPath, baseUrl));
assert.equal(blogDetailResponse.status, 200, `${blogDetailPath} returned ${blogDetailResponse.status}`);
const blogDetailHtml = await blogDetailResponse.text();
assert.match(
  blogDetailHtml,
  /class="mdx-body"/,
  `${blogDetailPath} missing article content wrapper`,
);
if (richPattern) {
  assert.match(
    blogDetailHtml,
    new RegExp(richPattern),
    `${blogDetailPath} missing expected rich content pattern`,
  );
}

console.log(
  "Smoke test passed for",
  checks.map(([pathname]) => pathname).join(", "),
);
