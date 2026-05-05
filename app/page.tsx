import type { Metadata } from "next";
import { ViewTransition } from "react";
import { BlogSection } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Profile } from "@/components/sections/Profile";
import { Projects } from "@/components/sections/Projects";
import { PinnedIntroShell } from "@/components/sections/PinnedIntroShell";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Ticker } from "@/components/sections/Ticker";
import { getLatestPosts } from "@/lib/blog";
import { stringifyJsonLd, toAbsoluteUrl } from "@/lib/json-ld";
import { getFeaturedProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

const homeImage = "/blog/blog-section-hero.jpg";

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
          <div
            className="mobile-deferred-section"
            data-mobile-deferred-size="compact"
          >
            <Ticker />
          </div>
          <div
            className="mobile-deferred-section"
            data-mobile-deferred-size="large"
          >
            <Projects projects={projects} />
          </div>
          <div
            className="mobile-deferred-section"
            data-mobile-deferred-size="large"
          >
            <Services />
          </div>
          <div
            className="mobile-deferred-section"
            data-mobile-deferred-size="large"
          >
            <Profile />
          </div>
          <div className="mobile-deferred-section">
            <Experience />
          </div>
          <div
            className="mobile-deferred-section"
            data-mobile-deferred-size="large"
          >
            <Testimonials />
          </div>
          <div className="mobile-deferred-section">
            <Contact />
          </div>
          <div className="mobile-deferred-section">
            <Pricing />
          </div>
          <div className="mobile-deferred-section">
            <BlogSection posts={posts} />
          </div>
          <div className="mobile-deferred-section">
            <FAQ />
          </div>
        </PinnedIntroShell>
      </ViewTransition>
    </main>
  );
}
