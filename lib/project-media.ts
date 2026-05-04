import type { CSSProperties } from "react";
import type { Project } from "@/lib/projects";

type ProjectMedia = {
  src: string;
  alt: string;
  objectPosition?: CSSProperties["objectPosition"];
};

const FALLBACK_MEDIA: ProjectMedia = {
  src: "/blog/blog-section-hero.jpg",
  alt: "Stackwerkhaus Projektvorschau",
  objectPosition: "center 50%",
};

const PROJECT_MEDIA: Record<string, ProjectMedia> = {
  "atelier-heimat": {
    src: "/projekte/heimat.webp",
    alt: "Projektvorschau der Atelier Heimat Markenwebsite",
    objectPosition: "center 50%",
  },
  bloom: {
    src: "/projekte/small/bloomSmall.webp",
    alt: "Projektvorschau der Bloom Health-Software-Website",
    objectPosition: "center 42%",
  },
  codariq: {
    src: "/projekte/small/codariqSmall.webp",
    alt: "Projektvorschau des Codariq Relaunchs",
    objectPosition: "center 52%",
  },
  "immo-pal": {
    src: "/projekte/small/immopalSmall.webp",
    alt: "Projektvorschau der Immo Pal Immobilienplattform",
    objectPosition: "center 50%",
  },
  uncloud: {
    src: "/projekte/small/uncloudSmall.webp",
    alt: "Projektvorschau des uncloud App-Konzepts",
    objectPosition: "center 46%",
  },
  zynapse: {
    src: "/projekte/small/zynapseSmall.webp",
    alt: "Projektvorschau der Zynapse Kampagnenplattform",
    objectPosition: "center 48%",
  },
};

export function getProjectMedia(
  project: Pick<Project, "slug" | "title"> & Partial<Pick<Project, "category">>,
): ProjectMedia {
  return {
    ...FALLBACK_MEDIA,
    ...PROJECT_MEDIA[project.slug],
    alt:
      PROJECT_MEDIA[project.slug]?.alt ??
      `Projektvorschau von ${project.title}${
        project.category ? ` aus dem Bereich ${project.category}` : ""
      }`,
  };
}

export type { ProjectMedia };
