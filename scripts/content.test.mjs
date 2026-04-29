import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();

const requiredLlmsUrls = [
  "https://stackwerkhaus.de",
  "https://stackwerkhaus.de/website-erstellen-lassen-deutschland",
  "https://stackwerkhaus.de/webdesign-kleine-unternehmen",
  "https://stackwerkhaus.de/landingpage-erstellen-lassen",
  "https://stackwerkhaus.de/nextjs-website-erstellen-lassen",
  "https://stackwerkhaus.de/ki-website-automatisierung",
  "https://stackwerkhaus.de/webseitecheck",
  "https://stackwerkhaus.de/projekte/immo-pal",
  "https://stackwerkhaus.de/projekte/zynapse",
  "https://stackwerkhaus.de/projekte/atelier-heimat",
  "https://stackwerkhaus.de/projekte/bloom",
  "https://stackwerkhaus.de/projekte/codariq",
  "https://stackwerkhaus.de/projekte/uncloud",
];

const outdatedLlmsSignals = [
  "llms.html",
  "Tarik Marshall",
  "Sigmaringer Str",
  "+49-176",
  "€900",
  "€4,500",
];

async function readCollection(dirName) {
  const dir = path.join(root, "content", dirName);
  const entries = await fs.readdir(dir);
  return Promise.all(
    entries
      .filter((entry) => entry.endsWith(".mdx"))
      .map(async (entry) => {
        const source = await fs.readFile(path.join(dir, entry), "utf8");
        const { data, content } = matter(source);
        return { entry, data, content };
      }),
  );
}

test("blog content has required frontmatter", async () => {
  const posts = await readCollection("blog");
  assert.ok(posts.length >= 4);

  for (const post of posts) {
    assert.ok(post.data.title, `${post.entry} missing title`);
    assert.ok(post.data.category, `${post.entry} missing category`);
    assert.ok(post.data.excerpt, `${post.entry} missing excerpt`);
    assert.ok(post.data.publishedAt, `${post.entry} missing publishedAt`);
    assert.ok(post.content.trim().length > 60, `${post.entry} content too short`);
  }
});

test("project content has required frontmatter", async () => {
  const projects = await readCollection("projects");
  assert.ok(projects.length >= 6);

  for (const project of projects) {
    assert.ok(project.data.title, `${project.entry} missing title`);
    assert.ok(project.data.category, `${project.entry} missing category`);
    assert.ok(project.data.year, `${project.entry} missing year`);
    assert.ok(project.data.summary, `${project.entry} missing summary`);
    assert.ok(Array.isArray(project.data.services), `${project.entry} missing services`);
    assert.ok(project.content.trim().length > 60, `${project.entry} content too short`);
  }
});

test("llms.txt provides canonical AI-facing Stackwerkhaus context", async () => {
  const source = await fs.readFile(path.join(root, "public", "llms.txt"), "utf8");

  assert.match(source, /^# STACKWERKHAUS\n/);
  assert.match(source, /\n> STACKWERKHAUS ist /);
  assert.match(source, /Arthur Marshall/);
  assert.match(source, /Berlin \/ Remote/);
  assert.match(source, /info@stackwerkhaus\.de/);

  for (const url of requiredLlmsUrls) {
    assert.ok(source.includes(url), `llms.txt missing ${url}`);
  }

  for (const signal of outdatedLlmsSignals) {
    assert.ok(!source.includes(signal), `llms.txt contains outdated signal: ${signal}`);
  }
});
