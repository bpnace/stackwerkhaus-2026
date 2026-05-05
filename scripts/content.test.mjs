import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();

const requiredLlmsUrls = [
  "https://stackwerkhaus.de",
  "https://stackwerkhaus.de/blog",
  "https://stackwerkhaus.de/projekte",
  "https://stackwerkhaus.de/website-erstellen-lassen-deutschland",
  "https://stackwerkhaus.de/webdesign-kleine-unternehmen",
  "https://stackwerkhaus.de/landingpage-erstellen-lassen",
  "https://stackwerkhaus.de/nextjs-website-erstellen-lassen",
  "https://stackwerkhaus.de/ki-website-automatisierung",
  "https://stackwerkhaus.de/webdesign-therapeuten-berlin",
  "https://stackwerkhaus.de/webdesign-coaching-praxis",
  "https://stackwerkhaus.de/webdesign-saas-startup",
  "https://stackwerkhaus.de/webdesign-zahnarztpraxis-berlin",
  "https://stackwerkhaus.de/landingpage-pre-seed",
  "https://stackwerkhaus.de/webdesign-handwerk-berlin",
  "https://stackwerkhaus.de/webdesign-immobilienmarkler",
  "https://stackwerkhaus.de/website-foerderung-digitalisierung",
  "https://stackwerkhaus.de/webdesign-berlin-wilmersdorf",
  "https://stackwerkhaus.de/website-foerderung-berlin",
  "https://stackwerkhaus.de/webseitecheck",
  "https://stackwerkhaus.de/projekte/immo-pal",
  "https://stackwerkhaus.de/projekte/zynapse",
  "https://stackwerkhaus.de/projekte/atelier-heimat",
  "https://stackwerkhaus.de/projekte/bloom",
  "https://stackwerkhaus.de/projekte/codariq",
  "https://stackwerkhaus.de/projekte/uncloud",
  "https://stackwerkhaus.de/projekte/praxis-fuer-mentale-gesundheit",
  "https://stackwerkhaus.de/projekte/zahnraum-berlin",
  "https://stackwerkhaus.de/projekte/signalnest",
  "https://stackwerkhaus.de/projekte/foerderraum",
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

test("project content has required frontmatter", async () => {
  const projects = await readCollection("projects");
  assert.ok(projects.length >= 10);

  for (const project of projects) {
    assert.ok(project.data.title, `${project.entry} missing title`);
    assert.ok(project.data.category, `${project.entry} missing category`);
    assert.ok(project.data.year, `${project.entry} missing year`);
    assert.ok(project.data.summary, `${project.entry} missing summary`);
    assert.ok(Array.isArray(project.data.services), `${project.entry} missing services`);
    assert.ok(project.content.trim().length > 60, `${project.entry} content too short`);
  }
});

test("project media references existing public image assets", async () => {
  const projects = await readCollection("projects");
  const mediaSource = await fs.readFile(path.join(root, "lib", "project-media.ts"), "utf8");
  const projectCardSource = await fs.readFile(
    path.join(root, "components", "ui", "ProjectCard.tsx"),
    "utf8",
  );
  const globalStylesSource = await fs.readFile(path.join(root, "app", "globals.css"), "utf8");
  const imagePaths = Array.from(
    mediaSource.matchAll(/"\/(?:projekte|blog)\/[^"]+\.(?:webp|jpg|jpeg|png|avif|svg)"/g),
    ([match]) => match.slice(1, -1),
  );
  const mappedProjectSlugs = new Set(
    Array.from(
      mediaSource.matchAll(/^  (?:"([^"]+)"|([a-zA-Z][\w-]*)):\s*{/gm),
      ([, quotedSlug, bareSlug]) => quotedSlug ?? bareSlug,
    ),
  );

  assert.ok(
    mediaSource.includes("getProjectPreviewMedia"),
    "project cards should use a dedicated preview media resolver",
  );
  assert.ok(
    mediaSource.includes("getProjectDetailMedia"),
    "project detail pages should use a dedicated detail media resolver",
  );
  assert.ok(
    projectCardSource.includes("aspect-[700/467]"),
    "project hover previews should keep the project image frame ratio",
  );
  assert.ok(
    projectCardSource.includes("project-hover-preview-image"),
    "project hover previews should use their own fitted image class",
  );
  assert.ok(
    projectCardSource.includes("isPreviewImageMounted"),
    "project hover images should mount only after pointer hover",
  );
  assert.ok(
    projectCardSource.includes('loading="eager"'),
    "mounted project hover images should load eagerly to avoid dev LCP warnings",
  );
  assert.match(
    globalStylesSource,
    /\.project-hover-preview-image\s*{[^}]*object-fit:\s*cover;/s,
    "project hover images should crop to fill the preview frame",
  );
  assert.ok(imagePaths.length > 0, "project media map should reference images");

  for (const project of projects) {
    const slug = project.entry.replace(/\.mdx$/, "");
    assert.ok(mappedProjectSlugs.has(slug), `${slug} should have explicit preview and detail media`);
  }

  for (const imagePath of imagePaths) {
    await fs.access(path.join(root, "public", imagePath));
  }
});

test("archive case studies stay off the homepage project feed", async () => {
  const projects = await readCollection("projects");
  const homeSource = await fs.readFile(path.join(root, "app", "page.tsx"), "utf8");
  const archiveIndexSource = await fs.readFile(path.join(root, "app", "projekte", "page.tsx"), "utf8");
  const archiveCaseSlugs = [
    "praxis-fuer-mentale-gesundheit",
    "zahnraum-berlin",
    "signalnest",
    "foerderraum",
  ];

  assert.ok(
    homeSource.includes("getFeaturedProjects(6)"),
    "homepage should keep using the featured project feed",
  );
  assert.ok(
    archiveIndexSource.includes("getAllProjects()"),
    "project archive should render the full project collection",
  );

  for (const slug of archiveCaseSlugs) {
    const project = projects.find((entry) => entry.entry === `${slug}.mdx`);
    assert.ok(project, `missing archive case study ${slug}`);
    assert.equal(project.data.featured, false, `${slug} should not appear on the homepage`);
  }
});

test("project navigation links homepage feed to archive and returns details to archive", async () => {
  const projectsSectionSource = await fs.readFile(
    path.join(root, "components", "sections", "Projects.tsx"),
    "utf8",
  );
  const loopingScrambleSource = await fs.readFile(
    path.join(root, "components", "ui", "LoopingScrambleText.tsx"),
    "utf8",
  );
  const projectDetailSource = await fs.readFile(
    path.join(root, "app", "projekte", "[slug]", "page.tsx"),
    "utf8",
  );

  assert.ok(
    projectsSectionSource.includes('href="/projekte"'),
    "homepage project section should link the archive CTA to /projekte",
  );
  assert.ok(
    projectsSectionSource.includes("Weitere Projekte ansehen"),
    "homepage project section missing archive CTA label",
  );
  assert.ok(
    projectsSectionSource.includes("LoopingScrambleText") &&
      projectsSectionSource.includes('text="Projektarchiv"'),
    "homepage archive CTA should keep the project archive label in a looping scramble state",
  );
  assert.ok(
    loopingScrambleSource.includes("data-looping-scramble-visual") &&
      loopingScrambleSource.includes("prefers-reduced-motion: reduce"),
    "looping archive scramble should expose a stable visual target and respect reduced motion",
  );
  assert.ok(
    loopingScrambleSource.includes("getContinuousScrambleText") &&
      !loopingScrambleSource.includes("getScrambleFrameText"),
    "looping archive scramble should keep changing without resolving to the final label",
  );
  assert.ok(
    !projectDetailSource.includes('href="/#projekte"'),
    "project detail backlinks should not jump back to the homepage project section",
  );
  assert.ok(
    projectDetailSource.includes('href="/projekte"'),
    "project detail backlinks should point to the project archive",
  );
  assert.ok(
    projectDetailSource.includes("Zurück zum Projektarchiv"),
    "project detail backlinks should name the project archive",
  );
});

test("home hash anchors align visible section headers", async () => {
  const globalStylesSource = await fs.readFile(path.join(root, "app", "globals.css"), "utf8");
  const sectionHeaderSource = await fs.readFile(
    path.join(root, "components", "ui", "SectionHeader.tsx"),
    "utf8",
  );

  assert.ok(
    globalStylesSource.includes("[data-scroll-anchor]"),
    "hash scroll offsets should apply to explicit scroll anchors",
  );
  assert.ok(
    sectionHeaderSource.includes('data-scroll-anchor={id ? "true" : undefined}'),
    "section headers should expose the explicit scroll anchor marker",
  );

  for (const [fileName, id] of [
    ["Projects.tsx", "projekte"],
    ["Services.tsx", "leistungen"],
    ["Profile.tsx", "profil"],
    ["Experience.tsx", "erfahrung"],
    ["Testimonials.tsx", "stimmen"],
    ["Contact.tsx", "kontakt"],
    ["Pricing.tsx", "pricing"],
    ["Blog.tsx", "blog"],
    ["FAQ.tsx", "faq"],
  ]) {
    const source = await fs.readFile(
      path.join(root, "components", "sections", fileName),
      "utf8",
    );
    assert.ok(source.includes(`SectionHeader id="${id}"`), `${id} should target its visible section header`);
    assert.ok(!source.includes(`<section id="${id}"`), `${id} should not target the padded section wrapper`);
  }
});

test("contact title uses the shared word-mask reveal", async () => {
  const contactSource = await fs.readFile(
    path.join(root, "components", "sections", "Contact.tsx"),
    "utf8",
  );
  const wordMaskSource = await fs.readFile(
    path.join(root, "lib", "word-mask-heading.tsx"),
    "utf8",
  );

  assert.ok(
    contactSource.includes('renderWordMaskText("Lass uns was einzigartiges bauen.")'),
    "contact title should render through the shared word-mask title helper",
  );
  assert.ok(
    contactSource.includes('trigger: "scroll"'),
    "contact title reveal should wait until the contact section enters the viewport",
  );
  assert.ok(
    wordMaskSource.includes('paused: options.trigger === "scroll"') &&
      wordMaskSource.includes("ScrollTrigger.create"),
    "word-mask reveal helper should support scroll-triggered title reveals",
  );
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

  assert.ok(
    source.includes("https://stackwerkhaus.de/blog/micrography"),
    "llms.txt missing Drupal blog article: micrography",
  );
  assert.ok(
    source.includes("https://stackwerkhaus.de/blog/webdesign-fur-saas"),
    "llms.txt missing Drupal blog article: webdesign-fur-saas",
  );
  assert.ok(
    !source.includes("https://stackwerkhaus.de/blog/website-relaunch-kmu-leitfaden"),
    "llms.txt still contains removed local test blog article",
  );
});

test("SEO route inventory exposes crawlable hubs and hides APIs", async () => {
  const sitemapSource = await fs.readFile(path.join(root, "app", "sitemap.ts"), "utf8");
  const robotsSource = await fs.readFile(path.join(root, "app", "robots.ts"), "utf8");
  const analyticsSource = await fs.readFile(path.join(root, "components", "layout", "Analytics.tsx"), "utf8");

  assert.ok(sitemapSource.includes('"/blog"'), "sitemap missing /blog hub");
  assert.ok(sitemapSource.includes('"/projekte"'), "sitemap missing /projekte hub");
  assert.ok(robotsSource.includes('"/api/"'), "robots policy should disallow API routes");

  await fs.access(path.join(root, "app", "blog", "page.tsx"));
  await fs.access(path.join(root, "app", "projekte", "page.tsx"));
  await fs.access(path.join(root, "app", "[slug]", "page.tsx"));

  assert.ok(analyticsSource.includes("usePathname"), "analytics missing route-change tracking");
  assert.ok(analyticsSource.includes("page_path"), "analytics missing GA4 page_path tracking");
});

test("vertical landing pages stay discoverable and schema-backed", async () => {
  const landingSource = await fs.readFile(path.join(root, "lib", "landing-pages.ts"), "utf8");
  const verticalSource = await fs.readFile(path.join(root, "lib", "vertical-landing-pages.ts"), "utf8");
  const dynamicRouteSource = await fs.readFile(path.join(root, "app", "[slug]", "page.tsx"), "utf8");

  const requiredSlugs = [
    "webdesign-therapeuten-berlin",
    "webdesign-coaching-praxis",
    "webdesign-saas-startup",
    "webdesign-zahnarztpraxis-berlin",
    "landingpage-pre-seed",
    "webdesign-handwerk-berlin",
    "webdesign-immobilienmarkler",
    "website-foerderung-digitalisierung",
    "webdesign-berlin-wilmersdorf",
    "website-foerderung-berlin",
  ];

  for (const slug of requiredSlugs) {
    assert.ok(verticalSource.includes(`slug: "${slug}"`), `missing vertical landing page ${slug}`);
    assert.ok(verticalSource.includes(`/${slug}`) || dynamicRouteSource.includes("generateStaticParams"), `missing route support for ${slug}`);
  }

  assert.ok(landingSource.includes('["ProfessionalService", "LocalBusiness"]'), "landing schema missing LocalBusiness provider");
  assert.ok(landingSource.includes('"@type": "Service"'), "landing schema missing Service markup");
  assert.ok(landingSource.includes('"@type": "FAQPage"'), "landing schema missing FAQPage markup");
  assert.ok(landingSource.includes('"@type": "Review"'), "landing schema missing visible Review markup support");
  assert.ok(verticalSource.includes("Preisrahmen"), "vertical pages missing visible price framing");
  assert.ok(verticalSource.includes("Caseteaser"), "vertical pages missing case teaser framing");
});

test("core landing pages link into vertical topic hubs", async () => {
  const landingSource = await fs.readFile(path.join(root, "lib", "landing-pages.ts"), "utf8");

  assert.ok(
    landingSource.includes("Passende Spezialisierungen"),
    "core landing pages missing hub section",
  );

  for (const slug of [
    "webdesign-therapeuten-berlin",
    "webdesign-handwerk-berlin",
    "webdesign-saas-startup",
    "landingpage-pre-seed",
    "website-foerderung-digitalisierung",
  ]) {
    assert.ok(
      landingSource.includes(`/${slug}`),
      `core landing pages missing hub link to ${slug}`,
    );
  }
});

test("footer keeps landing page links focused on strongest core pages", async () => {
  const footerSource = await fs.readFile(path.join(root, "components", "layout", "Footer.tsx"), "utf8");

  const expectedFooterPaths = [
    "/website-erstellen-lassen-deutschland",
    "/webdesign-kleine-unternehmen",
    "/landingpage-erstellen-lassen",
    "/nextjs-website-erstellen-lassen",
    "/ki-website-automatisierung",
  ];

  assert.ok(
    footerSource.includes("footerLandingPagePaths"),
    "footer should use an explicit curated landing page list",
  );
  assert.ok(
    footerSource.includes("footerLandingPages.map"),
    "footer should render the curated landing page list",
  );
  assert.ok(
    !footerSource.includes("landingPages.map"),
    "footer should not render every landing page automatically",
  );

  for (const footerPath of expectedFooterPaths) {
    assert.ok(
      footerSource.includes(footerPath),
      `footer missing curated landing page ${footerPath}`,
    );
  }
});

test("landing page copy avoids avoidable German wording artifacts", async () => {
  const landingSource = await fs.readFile(path.join(root, "lib", "landing-pages.ts"), "utf8");
  const verticalSource = await fs.readFile(path.join(root, "lib", "vertical-landing-pages.ts"), "utf8");
  const combinedSource = `${landingSource}\n${verticalSource}`;

  for (const artifact of [
    "Website-Seite",
    "Indexieren und interne Verlinkung",
    "AI-Antwort",
    "Programmcaveats",
    "Coaching Teams",
    "Pre-Seed Startups",
    "Pre-Seed Startup",
    "Förderung von digitalisierung",
  ]) {
    assert.ok(
      !combinedSource.includes(artifact),
      `landing page copy contains avoidable wording artifact: ${artifact}`,
    );
  }
});

test("Drupal blog SEO fields stay wired into blog rendering", async () => {
  const blogSource = await fs.readFile(path.join(root, "lib", "blog.ts"), "utf8");
  const blogPageSource = await fs.readFile(path.join(root, "app", "blog", "[slug]", "page.tsx"), "utf8");

  for (const field of ["field_answer_box", "field_experience_note", "field_sources"]) {
    assert.ok(blogSource.includes(field), `blog data mapper missing ${field}`);
  }

  assert.ok(blogPageSource.includes("Kurzantwort"), "blog detail page missing answer-box output");
  assert.ok(blogPageSource.includes("Aus Projektpraxis"), "blog detail page missing project-experience badge");
  assert.ok(blogPageSource.includes("Quellen und Belege"), "blog detail page missing sources output");
  assert.ok(blogPageSource.includes("abstract: post.answerBox"), "BlogPosting JSON-LD missing answer-box abstract");
  assert.ok(blogPageSource.includes("citation: citations"), "BlogPosting JSON-LD missing source citations");
  assert.ok(blogPageSource.includes('"@type": "CreativeWork"'), "BlogPosting citation should preserve source labels");
});
