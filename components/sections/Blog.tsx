import type { BlogPost } from "@/lib/blog";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WordMaskRevealController } from "@/components/ui/WordMaskRevealController";
import { renderWordMaskText } from "@/lib/word-mask-text";

const BLOG_HEADING = "Zwischen Rohbau, Launch und Feinschliff.";

type BlogSectionProps = {
  posts: BlogPost[];
};

export function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section className="section-space">
      <div className="section-shell">
        <SectionHeader id="blog" label="Publikationen" marker="(SKWKHS® — 08)" />
        <div
          data-word-mask-scope="true"
          className="mb-10 max-w-4xl space-y-4 md:mb-16"
        >
          <h2 className="hero-line display-lg">
            {renderWordMaskText(BLOG_HEADING)}
          </h2>
          <p className="text-lg leading-8 text-muted">
            Notizen aus Projekten, Relaunches und Systementscheidungen, die
            später selten auf der fertigen Startseite sichtbar sind, aber dort
            fast immer den Unterschied machen.
          </p>
          <WordMaskRevealController dependencyKey={posts.length} />
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
