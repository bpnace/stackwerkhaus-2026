"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import { ViewTransition } from "react";
import { getProjectPreviewMedia } from "@/lib/project-media";

type ProjectCardProps = {
  index: number;
  project: Project;
};

type PreviewFade = {
  play: () => void;
  reverse: () => void;
  kill: () => void;
};

type QuickSetter = (value: number, startValue?: number) => void;

function canUseMousePreview() {
  return (
    window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine)",
    ).matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function getProjectPreviewTitleStyle(title: string) {
  const characterCount = title.replace(/\s+/g, "").length;

  if (characterCount <= 8) {
    return {
      "--project-preview-title-size": "clamp(2.8rem, 4vw, 4rem)",
      "--project-preview-title-letter-spacing": "-0.07em",
    } as CSSProperties;
  }

  if (characterCount <= 12) {
    return {
      "--project-preview-title-size": "clamp(2.3rem, 3.5vw, 3.2rem)",
      "--project-preview-title-letter-spacing": "-0.06em",
    } as CSSProperties;
  }

  return {
    "--project-preview-title-size": "clamp(1.9rem, 3vw, 2.7rem)",
    "--project-preview-title-letter-spacing": "-0.05em",
  } as CSSProperties;
}

export function ProjectCard({ index, project }: ProjectCardProps) {
  const scope = useRef<HTMLAnchorElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [isPreviewImageMounted, setIsPreviewImageMounted] = useState(false);
  const previewMedia = getProjectPreviewMedia(project);
  const previewTitleStyle = getProjectPreviewTitleStyle(project.title);

  useEffect(() => {
      const trigger = scope.current;
      const preview = previewRef.current;
      if (!trigger || !preview) {
        return;
      }

      if (!canUseMousePreview()) {
        preview.style.opacity = "0";
        preview.style.visibility = "hidden";
        return;
      }

      let fade: PreviewFade | null = null;
      let setX: QuickSetter | null = null;
      let setY: QuickSetter | null = null;
      let firstEnter = true;
      let cancelled = false;

      const align = (event: MouseEvent | PointerEvent) => {
        if (!setX || !setY) {
          return;
        }

        const width = preview.offsetWidth;
        const height = preview.offsetHeight;
        const margin = 24;
        const nextX = Math.min(
          event.clientX + margin,
          window.innerWidth - width - margin,
        );
        const nextY = Math.max(
          margin,
          Math.min(event.clientY - height / 2, window.innerHeight - height - margin),
        );

        if (firstEnter) {
          setX(nextX, nextX);
          setY(nextY, nextY);
          firstEnter = false;
          return;
        }

        setX(nextX);
        setY(nextY);
      };

      const startFollow = () => {
        document.addEventListener("mousemove", align);
      };

      const stopFollow = () => {
        document.removeEventListener("mousemove", align);
      };

      const handleEnter = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" || !fade) {
          return;
        }

        firstEnter = true;
        setIsPreviewImageMounted(true);
        fade.play();
        startFollow();
        align(event);
      };

      const handleLeave = () => {
        fade?.reverse();
      };

      void import("@/lib/gsap").then(({ ensureGsap, gsap }) => {
        if (cancelled) {
          return;
        }

        ensureGsap();

        gsap.set(preview, {
          xPercent: 0,
          yPercent: 0,
          autoAlpha: 0,
        });

        setX = gsap.quickTo(preview, "x", {
          duration: 0.4,
          ease: "power3.out",
        });
        setY = gsap.quickTo(preview, "y", {
          duration: 0.4,
          ease: "power3.out",
        });

        fade = gsap.to(preview, {
          autoAlpha: 1,
          ease: "none",
          paused: true,
          duration: 0.12,
          onReverseComplete: stopFollow,
        });

        trigger.addEventListener("pointerenter", handleEnter);
        trigger.addEventListener("pointerleave", handleLeave);
      });

      return () => {
        cancelled = true;
        fade?.kill();
        stopFollow();
        trigger.removeEventListener("pointerenter", handleEnter);
        trigger.removeEventListener("pointerleave", handleLeave);
      };
  }, []);

  return (
    <Link
      ref={scope}
      href={`/projekte/${project.slug}`}
      transitionTypes={["nav-forward"]}
      onMouseEnter={() => setIsPreviewImageMounted(true)}
      className="group grid gap-4 border-b border-border py-6 transition-colors hover:border-foreground/40 md:grid-cols-[72px_1.2fr_110px_1fr_40px] md:items-center"
    >
      <div
        ref={previewRef}
        className="project-preview-card pointer-events-none fixed left-0 top-0 z-40 hidden aspect-[700/467] w-[320px] overflow-hidden border border-white/12 opacity-0 shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:block"
        aria-hidden="true"
      >
        <ViewTransition
          name={`project-image-${project.slug}`}
          share="project-image-morph"
        >
          {isPreviewImageMounted ? (
            <Image
              src={previewMedia.src}
              alt={previewMedia.alt}
              fill
              loading="eager"
              sizes="320px"
              className="project-hover-preview-image"
              style={{ objectPosition: previewMedia.objectPosition }}
            />
          ) : null}
        </ViewTransition>
        <div className="project-preview-scrim" aria-hidden />
        <ViewTransition
          name={`project-title-${project.slug}`}
          share="project-title-crossfade"
        >
          <h3 className="project-preview-title" style={previewTitleStyle}>
            {project.title}
          </h3>
        </ViewTransition>
      </div>
      <span className="eyebrow text-foreground/80">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <div className="text-2xl font-semibold tracking-tight">{project.title}</div>
        <p className="mt-2 max-w-xl text-sm text-muted md:hidden">{project.teaser}</p>
      </div>
      <span className="text-sm text-muted">{project.year}</span>
      <div className="text-sm text-muted">{project.category}</div>
      <span className="text-right text-xl text-muted transition-transform group-hover:translate-x-1 group-hover:text-foreground">
        →
      </span>
    </Link>
  );
}
