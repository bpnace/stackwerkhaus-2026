import type { Metadata } from "next";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { stringifyJsonLd, toAbsoluteUrl } from "@/lib/json-ld";
import { getAllProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

const pagePath = "/projekte";
const pageTitle = "Projekte | STACKWERKHAUS";
const pageDescription =
  "Projektbeispiele von Stackwerkhaus: Webdesign, Relaunches, Frontend-Entwicklung, Landingpages und digitale Produktstrukturen.";
const pageImage = "/blog/blog-section-hero.jpg";
const pageUrl = `${siteConfig.url}${pagePath}`;

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: pageDescription,
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: pagePath,
    siteName: siteConfig.name,
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: pageImage,
        width: 1600,
        height: 900,
        alt: "Stackwerkhaus Projektübersicht für Webdesign und Frontend-Entwicklung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [pageImage],
  },
};

export default async function ProjekteIndexPage() {
  const projects = await getAllProjects();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageTitle,
        description: pageDescription,
        inLanguage: "de-DE",
        isPartOf: {
          "@id": `${siteConfig.url}#website`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: toAbsoluteUrl(pageImage),
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: project.title,
            url: `${siteConfig.url}/projekte/${project.slug}`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Startseite",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projekte",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="section-space">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(structuredData),
        }}
      />
      <div className="section-shell">
        <div className="max-w-5xl space-y-5">
          <div className="eyebrow">Projektarchiv</div>
          <h1 className="display-lg max-w-[11ch]">Projekte und Cases</h1>
          <p className="max-w-3xl text-lg leading-8 text-muted">
            Beispiele für Websites, Relaunches, Plattformen und digitale
            Produktstrukturen, bei denen Design, Nutzerführung und technische
            Umsetzung zusammenarbeiten.
          </p>
        </div>

        <div className="mt-14 border-t border-border">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} index={index} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}
