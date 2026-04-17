import type { CSSProperties } from "react";
import type { Project } from "@/lib/projects";

type ProjectMedia = {
  src: string;
  alt: string;
  objectPosition?: CSSProperties["objectPosition"];
};

const FALLBACK_MEDIA: ProjectMedia = {
  src: "/blog/blog-section-hero.jpg",
  alt: "Projektvorschau",
  objectPosition: "center 50%",
};

const PROJECT_MEDIA: Record<string, ProjectMedia> = {
  "atelier-heimat": {
    src: "/projekte/heimat.webp",
    alt: "Preview von Atelier Heimat",
    objectPosition: "center 50%",
  },
  bloom: {
    src: "/projekte/small/bloomSmall.webp",
    alt: "Preview von Bloom",
    objectPosition: "center 42%",
  },
  codariq: {
    src: "/projekte/small/codariqSmall.webp",
    alt: "Preview von Codariq",
    objectPosition: "center 52%",
  },
  "immo-pal": {
    src: "/projekte/small/immopalSmall.webp",
    alt: "Preview von Immo Pal",
    objectPosition: "center 50%",
  },
  uncloud: {
    src: "/projekte/small/uncloudSmall.webp",
    alt: "Preview von uncloud",
    objectPosition: "center 46%",
  },
  zynapse: {
    src: "/projekte/small/zynapseSmall.webp",
    alt: "Preview von Zynapse",
    objectPosition: "center 48%",
  },
};

export function getProjectMedia(project: Pick<Project, "slug" | "title">): ProjectMedia {
  return {
    ...FALLBACK_MEDIA,
    ...PROJECT_MEDIA[project.slug],
    alt: PROJECT_MEDIA[project.slug]?.alt ?? `Preview von ${project.title}`,
  };
}

export type { ProjectMedia };
