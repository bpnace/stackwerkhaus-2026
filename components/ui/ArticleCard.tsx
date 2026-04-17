import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { BlogPost } from "@/lib/blog";
import { ViewTransition } from "react";
import { LinkRippleText } from "@/components/ui/LinkRippleText";

type ArticleCardProps = {
  post: BlogPost;
  variant?: "default" | "home";
};

const previewThemes = [
  {
    accent: "rgba(244, 114, 182, 0.38)",
    objectPosition: "center 24%",
  },
  {
    accent: "rgba(96, 165, 250, 0.34)",
    objectPosition: "center 50%",
  },
  {
    accent: "rgba(45, 212, 191, 0.3)",
    objectPosition: "center 76%",
  },
  {
    accent: "rgba(250, 204, 21, 0.3)",
    objectPosition: "center 42%",
  },
] as const;

function getPreviewTheme(slug: string) {
  const total = slug.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return previewThemes[total % previewThemes.length];
}

function getTitleFitStyle(title: string) {
  const characterCount = title.replace(/\s+/g, "").length;

  if (characterCount <= 8) {
    return {
      "--blog-preview-title-size": "clamp(5.6rem, 12.6vw, 10.6rem)",
      "--blog-preview-title-letter-spacing": "-0.07em",
    } as CSSProperties;
  }

  if (characterCount <= 12) {
    return {
      "--blog-preview-title-size": "clamp(5rem, 11.2vw, 9.4rem)",
      "--blog-preview-title-letter-spacing": "-0.06em",
    } as CSSProperties;
  }

  if (characterCount <= 18) {
    return {
      "--blog-preview-title-size": "clamp(4.6rem, 10vw, 8.2rem)",
      "--blog-preview-title-letter-spacing": "-0.05em",
    } as CSSProperties;
  }

  return {
    "--blog-preview-title-size": "clamp(4rem, 8.4vw, 7.2rem)",
    "--blog-preview-title-letter-spacing": "-0.03em",
  } as CSSProperties;
}

export function ArticleCard({ post, variant = "default" }: ArticleCardProps) {
  const published = new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(post.publishedAt));

  if (variant === "home") {
    const theme = getPreviewTheme(post.slug);
    const previewImage = post.imageUrl || "/blog/blog-section-hero.jpg";
    const previewStyle = {
      "--blog-preview-accent": theme.accent,
      objectPosition: theme.objectPosition,
    } as CSSProperties;
    const titleFitStyle = getTitleFitStyle(post.title);

    return (
      <article className="blog-preview-card">
        <Link
          href={`/blog/${post.slug}`}
          className="group block"
          transitionTypes={["nav-forward"]}
        >
          <div className="blog-preview-media">
            <ViewTransition
              name={`blog-image-${post.slug}`}
              share="project-image-morph"
            >
              <Image
                src={previewImage}
                alt={post.imageAlt || post.title}
                fill
                sizes="(min-width: 768px) calc((100vw - 9rem) / 2), calc(100vw - 3rem)"
                className="blog-preview-image"
                style={previewStyle}
              />
            </ViewTransition>
            <div className="blog-preview-scrim" aria-hidden />
            <div className="blog-preview-meta">
              <span>{post.category}</span>
              <span>{post.readingTime}</span>
            </div>
            <ViewTransition
              name={`blog-title-${post.slug}`}
              share="project-title-crossfade"
            >
              <h3 className="blog-preview-title" style={titleFitStyle}>
                {post.title}
              </h3>
            </ViewTransition>
          </div>
        </Link>
        <div className="blog-preview-body">
          <p className="max-w-[52ch] text-sm leading-7 text-muted md:text-base">
            {post.excerpt}
          </p>
          <div className="mt-6 flex items-center justify-between gap-4 text-sm text-muted">
            <span>{published}</span>
            <Link
              href={`/blog/${post.slug}`}
              className="link-arrow"
              transitionTypes={["nav-forward"]}
            >
              <LinkRippleText text="Weiterlesen" baseWeight={560} />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex h-full flex-col justify-between border-t border-border pt-6">
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4 text-[length:var(--label)] uppercase tracking-[0.3em] text-muted">
          <span>{post.category}</span>
          <span>{post.readingTime}</span>
        </div>
        <ViewTransition
          name={`blog-title-${post.slug}`}
          share="project-title-crossfade"
        >
          <h3 className="text-2xl font-semibold tracking-tight">{post.title}</h3>
        </ViewTransition>
        <p className="text-muted">{post.excerpt}</p>
      </div>
      <div className="mt-8 flex items-center justify-between gap-4 text-sm text-muted">
        <span>{published}</span>
        <Link
          href={`/blog/${post.slug}`}
          className="link-arrow"
          transitionTypes={["nav-forward"]}
        >
          <LinkRippleText text="Weiterlesen" baseWeight={560} /> <span aria-hidden>↗</span>
        </Link>
      </div>
    </article>
  );
}
