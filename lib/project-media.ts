import type { CSSProperties } from "react";
import type { Project } from "@/lib/projects";

type ProjectMedia = {
  src: string;
  alt: string;
  objectPosition?: CSSProperties["objectPosition"];
};

type ProjectMediaEntry = {
  alt: string;
  preview: Omit<ProjectMedia, "alt">;
  detail: Omit<ProjectMedia, "alt">;
};

const FALLBACK_PREVIEW_MEDIA: ProjectMedia = {
  src: "/blog/blog-section-hero.jpg",
  alt: "Stackwerkhaus Projektvorschau",
  objectPosition: "center 50%",
};

const FALLBACK_DETAIL_MEDIA: ProjectMedia = {
  src: "/blog/blog-section-hero.jpg",
  alt: "Stackwerkhaus Projektdetail",
  objectPosition: "center 50%",
};

const PROJECT_MEDIA: Record<string, ProjectMediaEntry> = {
  "atelier-heimat": {
    alt: "Projektvorschau der Atelier Heimat Markenwebsite",
    preview: {
      src: "/projekte/small/heimatSmall.webp",
      objectPosition: "center 50%",
    },
    detail: {
      src: "/projekte/heimat.webp",
      objectPosition: "center 50%",
    },
  },
  bloom: {
    alt: "Projektvorschau der Bloom Health-Software-Website",
    preview: {
      src: "/projekte/small/bloomSmall.webp",
      objectPosition: "center 42%",
    },
    detail: {
      src: "/projekte/bloom.webp",
      objectPosition: "center 42%",
    },
  },
  codariq: {
    alt: "Projektvorschau des Codariq Relaunchs",
    preview: {
      src: "/projekte/small/codariqSmall.webp",
      objectPosition: "center 52%",
    },
    detail: {
      src: "/projekte/codariq.webp",
      objectPosition: "center 52%",
    },
  },
  foerderraum: {
    alt: "Projektvorschau der Förderraum Digitalisierungswebsite",
    preview: {
      src: "/projekte/small/foerderraumSmall.webp",
      objectPosition: "center 50%",
    },
    detail: {
      src: "/projekte/foerderraum.webp",
      objectPosition: "center 50%",
    },
  },
  "immo-pal": {
    alt: "Projektvorschau der Immo Pal Immobilienplattform",
    preview: {
      src: "/projekte/small/immopalSmall.webp",
      objectPosition: "center 50%",
    },
    detail: {
      src: "/projekte/immopal.webp",
      objectPosition: "center 50%",
    },
  },
  "praxis-fuer-mentale-gesundheit": {
    alt: "Projektvorschau der Praxis für mentale Gesundheit",
    preview: {
      src: "/projekte/small/metalHealth.webp",
      objectPosition: "center 50%",
    },
    detail: {
      src: "/projekte/metalHealth.webp",
      objectPosition: "center 50%",
    },
  },
  signalnest: {
    alt: "Projektvorschau der Signalnest SaaS-Landingpage",
    preview: {
      src: "/projekte/small/signalnestSmall.webp",
      objectPosition: "center 50%",
    },
    detail: {
      src: "/projekte/signalnest.webp",
      objectPosition: "center 50%",
    },
  },
  uncloud: {
    alt: "Projektvorschau des uncloud App-Konzepts",
    preview: {
      src: "/projekte/small/uncloudSmall.webp",
      objectPosition: "center 46%",
    },
    detail: {
      src: "/projekte/uncloud.webp",
      objectPosition: "center 46%",
    },
  },
  zynapse: {
    alt: "Projektvorschau der Zynapse Kampagnenplattform",
    preview: {
      src: "/projekte/small/zynapseSmall.webp",
      objectPosition: "center 48%",
    },
    detail: {
      src: "/projekte/zynapse.webp",
      objectPosition: "center 48%",
    },
  },
  "zahnraum-berlin": {
    alt: "Projektvorschau der Zahnraum Berlin Praxiswebsite",
    preview: {
      src: "/projekte/small/zahnarzt.webp",
      objectPosition: "center 50%",
    },
    detail: {
      src: "/projekte/zahnarzt.webp",
      objectPosition: "center 50%",
    },
  },
};

function getProjectAlt(
  project: Pick<Project, "slug" | "title"> & Partial<Pick<Project, "category">>,
  entry?: ProjectMediaEntry,
) {
  return (
    entry?.alt ??
    `Projektvorschau von ${project.title}${
      project.category ? ` aus dem Bereich ${project.category}` : ""
    }`
  );
}

export function getProjectPreviewMedia(
  project: Pick<Project, "slug" | "title"> & Partial<Pick<Project, "category">>,
): ProjectMedia {
  const entry = PROJECT_MEDIA[project.slug];

  if (!entry) {
    return {
      ...FALLBACK_PREVIEW_MEDIA,
      alt: getProjectAlt(project),
    };
  }

  return {
    ...entry.preview,
    alt: getProjectAlt(project, entry),
  };
}

export function getProjectDetailMedia(
  project: Pick<Project, "slug" | "title"> & Partial<Pick<Project, "category">>,
): ProjectMedia {
  const entry = PROJECT_MEDIA[project.slug];

  if (!entry) {
    return {
      ...FALLBACK_DETAIL_MEDIA,
      alt: getProjectAlt(project),
    };
  }

  return {
    ...entry.detail,
    alt: getProjectAlt(project, entry),
  };
}

export type { ProjectMedia };
