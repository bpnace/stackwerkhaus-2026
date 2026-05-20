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

function extractUrls(source) {
  const urls = new Set();

  for (const part of source.split("(").slice(1)) {
    const candidate = part.split(")")[0].trim();

    try {
      const url = new URL(candidate);
      if (url.hostname === "stackwerkhaus.de") {
        urls.add(url.toString().replace(/\/$/, ""));
      }
    } catch {
      // Not every parenthesized value in Markdown is a URL.
    }
  }

  return urls;
}

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
  const llmsUrls = extractUrls(source);

  assert.match(source, /^# STACKWERKHAUS\n/);
  assert.match(source, /\n> STACKWERKHAUS ist /);
  assert.match(source, /Arthur Marshall/);
  assert.match(source, /Berlin \/ Remote/);
  assert.match(source, /info@stackwerkhaus\.de/);

  for (const url of requiredLlmsUrls) {
    assert.ok(llmsUrls.has(url), `llms.txt missing ${url}`);
  }

  for (const signal of outdatedLlmsSignals) {
    assert.ok(!source.includes(signal), `llms.txt contains outdated signal: ${signal}`);
  }

  assert.ok(
    llmsUrls.has("https://stackwerkhaus.de/blog/micrography"),
    "llms.txt missing Drupal blog article: micrography",
  );
  assert.ok(
    llmsUrls.has("https://stackwerkhaus.de/blog/webdesign-fur-saas"),
    "llms.txt missing Drupal blog article: webdesign-fur-saas",
  );
  assert.ok(
    !llmsUrls.has("https://stackwerkhaus.de/blog/website-relaunch-kmu-leitfaden"),
    "llms.txt still contains removed local test blog article",
  );
});

test("public pricing is subscription-first with contact-first requests", async () => {
  const pricingSources = await Promise.all(
    [
      ".env.example",
      "app/page.tsx",
      "app/webseitecheck/page.tsx",
      "components/sections/Contact.tsx",
      "components/sections/Pricing.tsx",
      "components/ui/PricingCard.tsx",
      "app/templates/page.tsx",
      "app/sitemap.ts",
      "lib/landing-pages.ts",
      "lib/pricing-schema.ts",
      "lib/site-config.ts",
      "lib/site-data.ts",
      "lib/vertical-landing-pages.ts",
      "public/llms.txt",
    ].map(async (filePath) => [
      filePath,
      await fs.readFile(path.join(root, filePath), "utf8"),
    ]),
  );
  const combinedPricingSource = pricingSources
    .map(([filePath, source]) => `\n${filePath}\n${source}`)
    .join("\n");

  for (const expectedSignal of [
    'monthlyPrice: "29"',
    'monthlyPrice: "69"',
    'monthlyPrice: "89"',
    'monthlyPrice: "199"',
    "Template Start",
    "Website Individuell",
    "Shop & Blog",
    "System & Wachstum",
    "pricingAddOns",
    "secondaryPrice",
    "Wähle deinen Einstieg",
    "Templates anzeigen",
    'ctaLabel: "Templates anzeigen"',
    'ctaHref: "/templates"',
    "Template aus der Galerie wählen",
    "Eigene Farben, Logo und Schriften",
    "Eigenes Design und Inhalte",
    "const ctaText = ctaLabel",
    'ctaHref: "/?paket=website-individuell#kontakt"',
    'ctaHref: "/?paket=shop-blog#kontakt"',
    'ctaHref: "/?paket=system-wachstum#kontakt"',
    'Ich interessiere mich für das Paket',
    "ab 149 €/Monat",
    "priceSpecification",
    'unitText: "Monat"',
    "Website-Abos ab 29 €/Monat",
    "getSubscriptionPricingSchemaOffers",
    "makesOffer",
    "getWebsiteCheckSchemaOffer(pageUrl)",
    "Website Check für Neukunden kostet 99 €",
    "Template Start von Stackwerkhaus ab 29 €/Monat",
  ]) {
    assert.ok(
      combinedPricingSource.includes(expectedSignal),
      `pricing source missing contact-first signal: ${expectedSignal}`,
    );
  }

  for (const outdatedSignal of [
    'monthlyPrice: "79"',
    'monthlyPrice: "249"',
    "59 €/Monat",
    "Digitales Facility Management",
    "Starter-Paket",
    ["NEXT_PUBLIC_STR", "IPE_PAYMENT_LINK_CARE"].join(""),
    ["NEXT_PUBLIC_STR", "IPE_PAYMENT_LINK_GROWTH"].join(""),
    ["NEXT_PUBLIC_STR", "IPE_PAYMENT_LINK_WEBSITE_ABO"].join(""),
    ["NEXT_PUBLIC_STR", "IPE_PAYMENT_LINK_TEMPLATE_START"].join(""),
    ["NEXT_PUBLIC_STR", "IPE_PAYMENT_LINK_WEBSITE_INDIVIDUELL"].join(""),
    ["NEXT_PUBLIC_STR", "IPE_PAYMENT_LINK_SHOP_BLOG"].join(""),
    ["NEXT_PUBLIC_STR", "IPE_PAYMENT_LINK_SYSTEM_WACHSTUM"].join(""),
    ["stri", "pePaymentLink"].join(""),
    ["Stri", "pe Payment Links"].join(""),
    ["Stri", "pe-Zahlung"].join(""),
    "Audit für 249",
    "Website-Abo: ab 149",
    "Care: ab 79",
    "Growth: ab 249",
    ["plus ", "Fest", "preis"].join(""),
    ["Kleine ", "Fest", "preis-Alternative"].join(""),
    ["Fest", "preis-Paket"].join(""),
    ["one", "TimePrice"].join(""),
    ["one", "TimeLabel"].join(""),
    ["fixed", "PriceAlternatives"].join(""),
    ["get", "FixedPriceSchemaOffer"].join(""),
    ["Rohbau ab ", "799"].join(""),
    ["Sanierung ab ", "1.499"].join(""),
    ["Bauwerk ab ", "2.499"].join(""),
    "name: page.schema.offer.name,\n            price: page.schema.offer.price",
  ]) {
    assert.ok(
      !combinedPricingSource.includes(outdatedSignal),
      `pricing source contains outdated signal: ${outdatedSignal}`,
    );
  }
});

test("pricing data exposes exact public offer rows and monthly schema semantics", async () => {
  const siteDataSource = await fs.readFile(path.join(root, "lib", "site-data.ts"), "utf8");
  const pricingSource = await fs.readFile(
    path.join(root, "components", "sections", "Pricing.tsx"),
    "utf8",
  );
  const pricingCardSource = await fs.readFile(
    path.join(root, "components", "ui", "PricingCard.tsx"),
    "utf8",
  );
  const homeSource = await fs.readFile(path.join(root, "app", "page.tsx"), "utf8");
  const webseitecheckSource = await fs.readFile(
    path.join(root, "app", "webseitecheck", "page.tsx"),
    "utf8",
  );
  const contactSource = await fs.readFile(
    path.join(root, "components", "sections", "Contact.tsx"),
    "utf8",
  );
  const landingSource = await fs.readFile(path.join(root, "lib", "landing-pages.ts"), "utf8");
  const pricingSchemaSource = await fs.readFile(
    path.join(root, "lib", "pricing-schema.ts"),
    "utf8",
  );
  const siteConfigSource = await fs.readFile(path.join(root, "lib", "site-config.ts"), "utf8");
  const templatesSource = await fs.readFile(path.join(root, "app", "templates", "page.tsx"), "utf8");
  const sitemapSource = await fs.readFile(path.join(root, "app", "sitemap.ts"), "utf8");

  for (const [slug, name, price] of [
    ["template-start", "Template Start", "29"],
    ["website-individuell", "Website Individuell", "69"],
    ["shop-blog", "Shop & Blog", "89"],
    ["system-wachstum", "System & Wachstum", "199"],
  ]) {
    assert.match(
      siteDataSource,
      new RegExp(`slug: "${slug}"[\\s\\S]*?name: "${name}"[\\s\\S]*?monthlyPrice: "${price}"`),
      `${name} tier should expose ${price} €/Monat`,
    );
  }

  for (const [name, price] of [
    ["Lokale SEO-Einträge", "+9 €/Monat"],
    ["SEO & Content-Ausbau", "ab 149 €/Monat"],
    ["Zusätzliche Sprache", "ab 19 €/Monat"],
    ["Zusätzliche Domain", "+3 €/Monat"],
    ["Zusätzliches E-Mail-Postfach", "+2 €/Monat"],
  ]) {
    assert.match(
      siteDataSource,
      new RegExp(`name: "${name}"[\\s\\S]*?price: "${price.replace("+", "\\+")}"`),
      `${name} add-on should expose ${price}`,
    );
  }

  assert.ok(
    siteDataSource.includes('secondaryPrice: "19 €/Monat einzeln"'),
    "local SEO individual price should be a first-class visible add-on price",
  );
  assert.ok(
    !siteDataSource.includes("suitableFor") &&
      !pricingSource.includes("Geeignet für"),
    "pricing cards should not duplicate suitable-for copy",
  );
  assert.ok(
    !siteDataSource.includes("bis zu 6 Seiten"),
    "pricing cards should not expose page-count limits in the visible includes",
  );
  assert.ok(
    !pricingCardSource.includes(["one", "TimePrice"].join("")),
    "pricing cards should not render website entry prices",
  );
  assert.ok(
    !siteDataSource.includes(["one", "TimePrice"].join("")),
    "pricing data should not expose website entry prices",
  );
  assert.ok(
    siteDataSource.includes('ctaLabel: "Templates anzeigen"') &&
      siteDataSource.includes('ctaHref: "/templates"'),
    "Template Start should link to the template gallery page",
  );
  for (const [slug, href] of [
    ["Website Individuell", '/?paket=website-individuell#kontakt'],
    ["Shop & Blog", '/?paket=shop-blog#kontakt'],
    ["System & Wachstum", '/?paket=system-wachstum#kontakt'],
  ]) {
    assert.ok(
      siteDataSource.includes(`ctaHref: "${href}"`),
      `${slug} should start as a contact request with a package prefill`,
    );
  }
  assert.ok(
    pricingCardSource.includes('const href = ctaHref || `/?paket=${encodeURIComponent(slug)}#kontakt`;') &&
      !pricingCardSource.includes("isExternalPaymentLink") &&
      !pricingCardSource.includes(["stri", "pePaymentLink"].join("")) &&
      !pricingCardSource.includes("\n            ab\n") &&
      !pricingCardSource.includes('target="_blank"'),
    "pricing cards should use fixed prices and not send packages directly to payment flows",
  );
  assert.ok(
    contactSource.includes('Ich interessiere mich für das Paket') &&
      contactSource.includes("Gewähltes Template") &&
      contactSource.includes("Preis:") &&
      !contactSource.includes("Preisrahmen:") &&
      !contactSource.includes(["ob Stri", "pe-Abo"].join("")) &&
      !contactSource.includes("ob Direktzahlung"),
    "contact prefill should describe the selected package instead of asking about direct payment",
  );
  assert.ok(
    !siteDataSource.includes('label: "Empfohlen"') &&
      !pricingCardSource.includes("Empfohlen"),
    "pricing cards should not render or store recommendation badges",
  );
  for (const expectedTemplateInclude of [
    "Template aus der Galerie wählen",
    "keine Erstellungskosten",
    "Eigene Farben, Logo und Schriften",
    "Website-Pflege inklusive",
  ]) {
    assert.ok(
      siteDataSource.includes(expectedTemplateInclude),
      `Template Start missing visible include: ${expectedTemplateInclude}`,
    );
  }

  for (const expectedTemplatesPageSignal of [
    "Vorlagen für den schnellen Einstieg",
    "Was im Template Start enthalten ist",
    "Service Start",
    "Praxis & Termin",
    "Projekt & Profil",
    "Wähle dein Grundgerüst",
    "Template wählen",
    "Layout-Vorschau für Service Start",
    "getTemplateContactHref(template.title)",
    "Template anfragen",
  ]) {
    assert.ok(
      templatesSource.includes(expectedTemplatesPageSignal),
      `/templates missing signal: ${expectedTemplatesPageSignal}`,
    );
  }
  assert.ok(sitemapSource.includes('"/templates"'), "sitemap missing /templates route");
  assert.doesNotMatch(
    `${pricingSource}\n${templatesSource}`,
    /\b(klar|wirklich|dieser|Hebel|ganzheitlich|holistisch|maßgeschneidert|360°|innovativ)\b/i,
    "pricing and template page copy should avoid banned Humanizer wording",
  );

  assert.ok(
    !pricingSource.includes(["fixed", "PriceAlternatives"].join("")) &&
      !pricingSource.includes(["Fest", "preise"].join("")),
    "pricing should keep the main selection focused on subscriptions and add-ons",
  );
  assert.ok(
      siteDataSource.includes('slug: "website-check"') &&
      siteDataSource.includes('price: "99 €"') &&
      !siteDataSource.includes(["fixed", "PriceAlternatives"].join("")),
    "Website Check should remain as a standalone audit offer without website entry alternatives",
  );
  assert.ok(
    contactSource.includes('"website-audit": "website-check"'),
    "legacy website-audit links should resolve to the new Website Check prefill",
  );
  assert.ok(
    contactSource.includes('rohbau: "template-start"') &&
      contactSource.includes('sanierung: "website-individuell"') &&
      contactSource.includes('bauwerk: "system-wachstum"'),
    "legacy package links should resolve to subscription contact prefills",
  );
  assert.ok(
    landingSource.includes("priceSpecification") &&
      landingSource.includes('unitText: "Monat"') &&
      !landingSource.includes(
        "name: page.schema.offer.name,\n            price: page.schema.offer.price",
      ),
    "landing JSON-LD should express offer prices as monthly unit prices",
  );
  assert.ok(
    siteConfigSource.includes("Website-Abos ab 29 €/Monat") &&
      homeSource.includes("makesOffer: getSubscriptionPricingSchemaOffers()") &&
      landingSource.includes("makesOffer: getSubscriptionPricingSchemaOffers()"),
    "home and landing metadata/schema should expose current subscription offer prices",
  );
  assert.ok(
    pricingSchemaSource.includes('priceCurrency: "EUR"') &&
      pricingSchemaSource.includes('unitText: "Monat"') &&
      pricingSchemaSource.includes('"@type": "PriceSpecification"'),
    "shared pricing schema should expose monthly offers and the Website Check price",
  );
  assert.ok(
    templatesSource.includes('getSubscriptionPricingSchemaOffer("template-start", pageUrl)') &&
      !templatesSource.includes(["get", "FixedPriceSchemaOffer"].join("")) &&
      !templatesSource.includes("templateStartPaymentLink") &&
      !templatesSource.includes("Template starten") &&
      templatesSource.includes("Template Start von Stackwerkhaus ab 29 €/Monat"),
    "/templates metadata/schema should expose only the Template Start subscription price",
  );
  assert.ok(
    webseitecheckSource.includes("getWebsiteCheckSchemaOffer(pageUrl)") &&
      webseitecheckSource.includes("Website Check für Neukunden kostet 99 €"),
    "/webseitecheck metadata/schema should expose the 99 € Website Check",
  );
});

test("SEO route inventory exposes crawlable hubs and hides APIs", async () => {
  const sitemapSource = await fs.readFile(path.join(root, "app", "sitemap.ts"), "utf8");
  const robotsSource = await fs.readFile(path.join(root, "app", "robots.ts"), "utf8");
  const layoutSource = await fs.readFile(path.join(root, "app", "layout.tsx"), "utf8");
  const analyticsSource = await fs.readFile(path.join(root, "components", "layout", "Analytics.tsx"), "utf8");
  const indexNowKeyPath = path.join(root, "public", "76db8d4465364afabab5ebf1d9e89aaa.txt");

  assert.ok(sitemapSource.includes('"/blog"'), "sitemap missing /blog hub");
  assert.ok(sitemapSource.includes('"/projekte"'), "sitemap missing /projekte hub");
  assert.ok(sitemapSource.includes('"/templates"'), "sitemap missing /templates hub");
  assert.ok(robotsSource.includes('"/api/"'), "robots policy should disallow API routes");
  assert.equal(
    (await fs.readFile(indexNowKeyPath, "utf8")).trim(),
    "76db8d4465364afabab5ebf1d9e89aaa",
    "IndexNow key file should be hosted from the public root",
  );

  await fs.access(path.join(root, "app", "blog", "page.tsx"));
  await fs.access(path.join(root, "app", "projekte", "page.tsx"));
  await fs.access(path.join(root, "app", "templates", "page.tsx"));
  await fs.access(path.join(root, "app", "[slug]", "page.tsx"));

  assert.ok(analyticsSource.includes("usePathname"), "analytics missing route-change tracking");
  assert.ok(analyticsSource.includes("page_path"), "analytics missing GA4 page_path tracking");
  assert.ok(layoutSource.includes("microsoft-clarity"), "layout missing Microsoft Clarity script");
  assert.ok(layoutSource.includes("wmex88aqgx"), "layout missing Microsoft Clarity project id");
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
