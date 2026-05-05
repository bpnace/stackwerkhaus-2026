"use client";

import { useRef } from "react";
import type { BlogPost } from "@/lib/blog";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  renderWordMaskText,
  useWordMaskHeadingReveal,
} from "@/lib/word-mask-heading";

const BLOG_HEADING = "Zwischen Rohbau, Launch und Feinschliff.";

type BlogSectionProps = {
  posts: BlogPost[];
};

export function BlogSection({ posts }: BlogSectionProps) {
  const scope = useRef<HTMLDivElement | null>(null);

  useWordMaskHeadingReveal(scope, [posts.length]);

  return (
    <section className="section-space">
      <div ref={scope} className="section-shell">
        <SectionHeader id="blog" label="Publikationen" marker="(SKWKHS® — 08)" />
        <div className="mb-10 max-w-4xl space-y-4 md:mb-16">
          <h2 className="hero-line display-lg">
            {renderWordMaskText(BLOG_HEADING)}
          </h2>
          <p className="text-lg leading-8 text-muted">
            Notizen aus Projekten, Relaunches und Systementscheidungen, die
            später selten auf der fertigen Startseite sichtbar sind, aber dort
            fast immer den Unterschied machen.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} variant="home" />
          ))}
        </div>
      </div>
    </section>
  );
}
