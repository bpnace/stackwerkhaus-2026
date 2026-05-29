import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ViewTransition } from "react";
import { Hero } from "@/components/sections/Hero";
import { PinnedIntroShell } from "@/components/sections/PinnedIntroShell";
import { getLatestPosts } from "@/lib/blog";
import { stringifyJsonLd, toAbsoluteUrl } from "@/lib/json-ld";
import { getSubscriptionPricingSchemaOffers } from "@/lib/pricing-schema";
import { getFeaturedProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

const homeImage = "/blog/blog-section-hero.jpg";
const HomeDeferredSections = dynamic(() =>
  import("@/components/sections/HomeDeferredSections").then(
    (module) => module.HomeDeferredSections,
  ),
);

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.title,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: homeImage,
        width: 1600,
        height: 900,
        alt: "Stackwerkhaus Website-Systeme mit Struktur, Webdesign und Frontend-Entwicklung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [homeImage],
  },
};

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      inLanguage: "de-DE",
      publisher: {
        "@id": `${siteConfig.url}#professional-service`,
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.url}#professional-service`,
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
      image: toAbsoluteUrl(homeImage),
      priceRange: "ab 29 EUR monatlich",
      makesOffer: getSubscriptionPricingSchemaOffers(),
      founder: {
        "@type": "Person",
        name: siteConfig.founder,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Berlin",
        addressCountry: "DE",
      },
      areaServed: {
        "@type": "Country",
        name: "Deutschland",
      },
      sameAs: siteConfig.socialLinks.map((link) => link.href),
      knowsAbout: [
        "Webdesign",
        "Frontend-Entwicklung",
        "Website Relaunch",
        "Next.js",
        "Technisches SEO",
        "AEO",
        "Website-Automatisierung",
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}#webpage`,
      url: siteConfig.url,
      name: siteConfig.title,
      description: siteConfig.description,
      inLanguage: "de-DE",
      isPartOf: {
        "@id": `${siteConfig.url}#website`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: toAbsoluteUrl(homeImage),
      },
    },
  ],
};

export default async function Home() {
  const [projects, posts] = await Promise.all([
    getFeaturedProjects(6),
    getLatestPosts(4),
  ]);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(homeStructuredData),
        }}
      />
      <ViewTransition
        enter={{
          "nav-forward": "nav-forward",
          "nav-back": "nav-back",
          default: "none",
        }}
        exit={{
          "nav-forward": "nav-forward",
          "nav-back": "nav-back",
          default: "none",
        }}
        default="none"
      >
        <PinnedIntroShell hero={<Hero />}>
          <HomeDeferredSections posts={posts} projects={projects} />
        </PinnedIntroShell>
      </ViewTransition>
    </main>
  );
}
