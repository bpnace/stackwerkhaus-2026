import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import { renderDrupalRichText } from "@/components/DrupalRichText";
import { HashLink } from "@/components/ui/HashLink";
import { LinkRippleText } from "@/components/ui/LinkRippleText";
import { getDrupalPlainTextParagraphs } from "@/lib/drupal-rich-text.mjs";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { stringifyJsonLd, toAbsoluteUrl } from "@/lib/json-ld";
import { toMetaDescription } from "@/lib/meta-description";
import { siteConfig } from "@/lib/site-config";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Nicht gefunden",
    };
  }

  const metaDescription = toMetaDescription(
    post.metaDescription ?? post.excerpt,
    post.drupalPlainText,
  );
  const imageUrl = toAbsoluteUrl(post.imageUrl || "/blog/blog-section-hero.jpg");

  return {
    title: post.title,
    description: metaDescription,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      url: `/blog/${post.slug}`,
      title: `${post.title} | STACKWERKHAUS`,
      description: metaDescription,
      images: [
        {
          url: imageUrl,
          alt: post.imageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: metaDescription,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const published = new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(post.publishedAt));
  const heroImage = post.imageUrl || "/blog/blog-section-hero.jpg";
  const heroImageUrl = toAbsoluteUrl(heroImage);
  const pageUrl = `${siteConfig.url}/blog/${post.slug}`;
  const metaDescription = toMetaDescription(
    post.metaDescription ?? post.excerpt,
    post.drupalPlainText,
  );
  const citations = post.sources?.map((source) => ({
    "@type": "CreativeWork",
    name: source.label,
    url: toAbsoluteUrl(source.href),
  }));
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: post.title,
        description: metaDescription,
        inLanguage: "de-DE",
        isPartOf: {
          "@id": `${siteConfig.url}#website`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: heroImageUrl,
          caption: post.imageAlt || post.title,
        },
      },
      {
        "@type": "BlogPosting",
        "@id": `${pageUrl}#article`,
        headline: post.title,
        description: metaDescription,
        abstract: post.answerBox,
        citation: citations,
        image: [heroImageUrl],
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        articleSection: post.category,
        keywords: post.tags,
        author: {
          "@type": "Person",
          name: siteConfig.founder,
        },
        publisher: {
          "@id": `${siteConfig.url}#professional-service`,
        },
        mainEntityOfPage: {
          "@id": `${pageUrl}#webpage`,
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}#professional-service`,
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Berlin",
          addressCountry: "DE",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        inLanguage: "de-DE",
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
            item: `${siteConfig.url}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };
  let drupalContent: ReactNode = null;

  try {
    drupalContent = renderDrupalRichText(post.drupalHtml);
  } catch (error) {
    console.error(`Failed to render rich text for "${post.slug}"`, error);
    const paragraphs = getDrupalPlainTextParagraphs(post.drupalPlainText);
    drupalContent = paragraphs.map((paragraph: string, index: number) => (
      <p key={`${post.slug}-fallback-${index}`}>{paragraph}</p>
    ));
  }

  return (
    <main className="">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(structuredData),
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
        <article className="section-shell">
          <div className="mb-15">
            <HashLink
              href="/#blog"
              className="link-arrow"
              transitionTypes={["nav-back"]}
            >
              <LinkRippleText text="Zurück zu den Artikeln" baseWeight={560} />
            </HashLink>
          </div>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start">
            <div className="min-w-0 space-y-6 lg:pr-4">
              <div className="flex flex-wrap items-center gap-4 text-[length:var(--label)] uppercase tracking-[0.3em] text-muted">
                <span>{post.category}</span>
                <span>Arthur Marshall</span>
                <span>{published}</span>
                <span>{post.readingTime}</span>
              </div>
              <ViewTransition
                name={`blog-title-${post.slug}`}
                share="project-title-crossfade"
              >
                <h1 className="article-detail-title display-lg">{post.title}</h1>
              </ViewTransition>
            </div>
            <ViewTransition
              name={`blog-image-${post.slug}`}
              share="project-image-morph"
            >
              <div className="relative overflow-hidden border border-border bg-surface/50 aspect-[4/3] lg:aspect-[5/4]">
                <Image
                  src={heroImage}
                  alt={post.imageAlt || post.title}
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 34vw, (min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </ViewTransition>
          </div>
          <div className="mt-10 max-w-3xl">
            <p className="text-lg leading-8 text-muted">{post.excerpt}</p>
            {post.tags?.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.hasProjectExperience ? (
                  <span className="chip">Aus Projektpraxis</span>
                ) : null}
                {post.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            ) : post.hasProjectExperience ? (
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="chip">Aus Projektpraxis</span>
              </div>
            ) : null}
          </div>
          {post.answerBox ? (
            <section className="mt-12 max-w-3xl border-y border-border py-6">
              <div className="eyebrow text-foreground/60">Kurzantwort</div>
              <p className="mt-4 text-xl leading-8 text-foreground md:text-2xl md:leading-9">
                {post.answerBox}
              </p>
            </section>
          ) : null}
          <div className="mt-14 pb-10">
            <div className="mdx-body">{drupalContent}</div>
          </div>
          {post.sources?.length ? (
            <section className="max-w-3xl border-t border-border pt-8 pb-10">
              <h2 className="text-2xl font-black tracking-[-0.025em] text-foreground">
                Quellen und Belege
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-muted">
                {post.sources.map((source) => (
                  <li key={source.href}>
                    <a
                      href={source.href}
                      className="underline decoration-border underline-offset-4 hover:text-foreground"
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </article>
      </ViewTransition>
    </main>
  );
}
