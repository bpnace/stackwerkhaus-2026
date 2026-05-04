import type { Metadata } from "next";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { getAllPosts } from "@/lib/blog";
import { stringifyJsonLd, toAbsoluteUrl } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site-config";

const pagePath = "/blog";
const pageTitle = "Blog | STACKWERKHAUS";
const pageDescription =
  "Artikel von Stackwerkhaus zu Webdesign, Relaunch, technischer Website-Struktur, AEO, SEO und digitalen Projektentscheidungen.";
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
        alt: "Stackwerkhaus Blog zu Webdesign, SEO und Website-Struktur",
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

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
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
          itemListElement: posts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: post.title,
            url: `${siteConfig.url}/blog/${post.slug}`,
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
            name: "Blog",
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
          <div className="eyebrow">Publikationen</div>
          <h1 className="display-lg max-w-[11ch]">Blog und Notizen</h1>
          <p className="max-w-3xl text-lg leading-8 text-muted">
            Projektnahe Artikel über Webdesign, Relaunches, technische
            Website-Struktur und Entscheidungen, die bessere digitale Auftritte
            tragen.
          </p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
