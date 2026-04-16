import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { renderDrupalRichText } from "@/components/DrupalRichText";
import { CustomMDX } from "@/components/mdx";
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
      <article className="section-shell">
        <div className="mb-15">
          <Link href="/blog" className="link-arrow">
            <LinkRippleText text="Zurück zur Übersicht" baseWeight={560} />
          </Link>
        </div>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-[length:var(--label)] uppercase tracking-[0.3em] text-muted">
              <span>{post.category}</span>
              <span>{published}</span>
              <span>{post.readingTime}</span>
            </div>
            <h1 className="display-lg">{post.title}</h1>
          </div>
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
    </main>
  );
}
