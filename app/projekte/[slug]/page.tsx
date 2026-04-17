import { ViewTransition } from "react";
import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { LinkRippleText } from "@/components/ui/LinkRippleText";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { getProjectMedia } from "@/lib/project-media";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Nicht gefunden",
    };
  }

  const metaDescription = [project.summary, project.teaser]
    .filter(Boolean)
    .join(" ");

  return {
    title: `${project.title} – ${project.category} Projekt`,
    description: metaDescription,
    alternates: {
      canonical: `/projekte/${project.slug}`,
    },
    openGraph: {
      url: `/projekte/${project.slug}`,
      title: `${project.title} – ${project.category} | STACKWERKHAUS`,
      description: metaDescription,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const heroMedia = getProjectMedia(project);

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
            <Link
              href="/#projekte"
              transitionTypes={["nav-back"]}
              className="link-arrow"
            >
              <LinkRippleText text="Zurück zu den Projekten" baseWeight={560} />
            </Link>
          </div>

          <ViewTransition
            name={`project-image-${project.slug}`}
            share="project-image-morph"
          >
            <figure className="project-detail-hero">
              <Image
                src={heroMedia.src}
                alt={heroMedia.alt}
                fill
                sizes="(min-width: 1024px) 62vw, 100vw"
                className="project-preview-image"
                style={{
                  objectPosition: heroMedia.objectPosition,
                }}
                priority
              />
              <div className="project-preview-scrim" aria-hidden />
            </figure>
          </ViewTransition>

          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-6">
              <div className="eyebrow">{project.category}</div>
              <ViewTransition
                name={`project-title-${project.slug}`}
                share="project-title-crossfade"
              >
                <h1 className="display-lg">{project.title}</h1>
              </ViewTransition>
              <p className="max-w-3xl text-lg leading-8 text-muted">
                {project.summary}
              </p>
              {project.teaser ? (
                <p className="max-w-2xl text-sm leading-7 text-muted/85 md:text-base">
                  {project.teaser}
                </p>
              ) : null}
            </div>
            <ViewTransition
              name={`project-meta-${project.slug}`}
              share="project-title-crossfade"
            >
              <div className="space-y-5 border-t border-border pt-6 md:pt-8">
                <div className="grid gap-4 text-sm text-muted">
                  <div className="flex items-center justify-between gap-4">
                    <span>Jahr</span>
                    <span>{project.year}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Kategorie</span>
                    <span>{project.category}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Ort</span>
                    <span>{project.location}</span>
                  </div>
                </div>
                {project.services.length ? (
                  <div className="flex flex-wrap gap-2 border-t border-border pt-4">
                    {project.services.map((service) => (
                      <span key={service} className="chip">
                        {service}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </ViewTransition>
          </div>

          {project.deliverables.length ? (
            <div className="mt-10 flex flex-wrap gap-3">
              {project.deliverables.map((deliverable) => (
                <span key={deliverable} className="chip">
                  {deliverable}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-14 pb-10">
            <CustomMDX source={project.content} />
          </div>

          <div className="mt-16 border-t border-border pt-8 pb-8">
            <Link
              href="/#projekte"
              transitionTypes={["nav-back"]}
              className="link-arrow"
            >
              <LinkRippleText text="Zurück zu den Projekten" baseWeight={560} />
            </Link>
          </div>
        </article>
      </ViewTransition>
    </main>
  );
}
