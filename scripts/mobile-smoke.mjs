import assert from "node:assert/strict";
import { DEFAULT_BLOG_SLUG, DEFAULT_PROJECT_SLUG } from "./fixtures/content-slugs.mjs";

const baseUrl = process.env.SMOKE_BASE_URL || "http://127.0.0.1:3000";
const pinnedBlogSlug = process.env.SMOKE_BLOG_SLUG || DEFAULT_BLOG_SLUG;
const richPattern = process.env.SMOKE_BLOG_RICH_PATTERN;

async function fetchHtml(pathname) {
  const response = await fetch(new URL(pathname, baseUrl));
  assert.equal(response.status, 200, `${pathname} returned ${response.status}`);
  return response.text();
}

const homeHtml = await fetchHtml("/");
assert.match(
  homeHtml,
  /aria-controls="mobile-nav"/,
  "home page missing mobile nav trigger",
);
assert.match(
  homeHtml,
  /data-hero-intro="loading"/,
  "home page missing hero intro shell",
);
assert.match(
  homeHtml,
  /name="viewport" content="width=device-width, initial-scale=1"/,
  "home page missing viewport meta tag",
);

const blogDetailHtml = await fetchHtml(`/blog/${pinnedBlogSlug}`);
assert.match(
  blogDetailHtml,
  /class="mdx-body"/,
  "blog detail page missing article content wrapper",
);
if (richPattern) {
  assert.match(
    blogDetailHtml,
    new RegExp(richPattern),
    "blog detail page missing expected rich content pattern",
  );
}

const projectHtml = await fetchHtml(`/projekte/${DEFAULT_PROJECT_SLUG}`);
assert.match(
  projectHtml,
  /class="section-shell"/,
  "project detail page missing section shell",
);

console.log(
  "Mobile smoke passed for /, /blog/" +
    pinnedBlogSlug +
    `, /projekte/${DEFAULT_PROJECT_SLUG}`,
);
