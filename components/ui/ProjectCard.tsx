"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useRef } from "react";
import type { Project } from "@/lib/projects";
import { ensureGsap, gsap, shouldReduceMotion, useGSAP } from "@/lib/gsap";
import { ViewTransition } from "react";
import { getProjectMedia } from "@/lib/project-media";

type ProjectCardProps = {
  index: number;
  project: Project;
};

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
  const previewMedia = getProjectMedia(project);
  const previewTitleStyle = getProjectPreviewTitleStyle(project.title);

  useGSAP(
    () => {
      ensureGsap();

      const trigger = scope.current;
      const preview = previewRef.current;
      if (!trigger || !preview) {
        return;
      }

      if (shouldReduceMotion()) {
        gsap.set(preview, { autoAlpha: 0 });
        return;
      }

      gsap.set(preview, {
        xPercent: 0,
        yPercent: 0,
        autoAlpha: 0,
      });

      const setX = gsap.quickTo(preview, "x", {
        duration: 0.4,
        ease: "power3.out",
      });
      const setY = gsap.quickTo(preview, "y", {
        duration: 0.4,
        ease: "power3.out",
      });

      let firstEnter = true;

      const align = (event: MouseEvent | PointerEvent) => {
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

      const fade = gsap.to(preview, {
        autoAlpha: 1,
        ease: "none",
        paused: true,
        duration: 0.12,
        onReverseComplete: stopFollow,
      });

      const handleEnter = (event: PointerEvent) => {
        firstEnter = true;
        fade.play();
        startFollow();
        align(event);
      };

      const handleLeave = () => {
        fade.reverse();
      };

      trigger.addEventListener("pointerenter", handleEnter);
      trigger.addEventListener("pointerleave", handleLeave);

      return () => {
        fade.kill();
        stopFollow();
        trigger.removeEventListener("pointerenter", handleEnter);
        trigger.removeEventListener("pointerleave", handleLeave);
      };
    },
    { scope, revertOnUpdate: true },
  );

  return (
    <Link
      ref={scope}
      href={`/projekte/${project.slug}`}
      transitionTypes={["nav-forward"]}
      className="group grid gap-4 border-b border-border py-6 transition-colors hover:border-foreground/40 md:grid-cols-[72px_1.2fr_110px_1fr_40px] md:items-center"
    >
      <div
        ref={previewRef}
        className="project-preview-card pointer-events-none fixed left-0 top-0 z-40 invisible aspect-[700/467] w-[360px] overflow-hidden border border-white/12 opacity-0 shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:block"
        aria-hidden="true"
      >
        <ViewTransition
          name={`project-image-${project.slug}`}
          share="project-image-morph"
        >
          <Image
            src={previewMedia.src}
            alt={previewMedia.alt}
            fill
            sizes="360px"
            className="project-preview-image"
            style={{ objectPosition: previewMedia.objectPosition }}
          />
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
