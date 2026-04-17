import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import { renderDrupalRichText } from "@/components/DrupalRichText";
import { CustomMDX } from "@/components/mdx";
import { HashLink } from "@/components/ui/HashLink";
import { LinkRippleText } from "@/components/ui/LinkRippleText";
import { getDrupalPlainTextParagraphs } from "@/lib/drupal-rich-text.mjs";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

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

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      url: `/blog/${post.slug}`,
      title: `${post.title} | STACKWERKHAUS`,
      description: post.excerpt,
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
  let drupalContent: ReactNode = null;

  if (post.source === "drupal") {
    try {
      drupalContent = renderDrupalRichText(post.drupalHtml);
    } catch (error) {
      console.error(`Failed to render rich text"${post.slug}"`, error);
      const paragraphs = getDrupalPlainTextParagraphs(post.drupalPlainText);
      drupalContent = paragraphs.map((paragraph: string, index: number) => (
        <p key={`${post.slug}-fallback-${index}`}>{paragraph}</p>
      ));
    }
  }

  return (
    <main className="">
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
                  priority
                  sizes="(min-width: 1024px) 34vw, (min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </ViewTransition>
          </div>
          <div className="mt-10 max-w-3xl">
            <p className="text-lg leading-8 text-muted">{post.excerpt}</p>
          </div>
          <div className="mt-14 pb-10">
            {post.source === "drupal" ? (
              <div className="mdx-body">{drupalContent}</div>
            ) : (
              <CustomMDX source={post.mdxSource} />
            )}
          </div>
        </article>
      </ViewTransition>
    </main>
  );
}
