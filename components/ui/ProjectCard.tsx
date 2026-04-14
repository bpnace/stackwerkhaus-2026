"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/lib/projects";
import { ensureGsap, gsap, shouldReduceMotion, useGSAP } from "@/lib/gsap";

type ProjectCardProps = {
  index: number;
  project: Project;
};

export function ProjectCard({ index, project }: ProjectCardProps) {
  const scope = useRef<HTMLAnchorElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

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
        xPercent: -50,
        yPercent: -50,
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
        if (firstEnter) {
          setX(event.clientX, event.clientX);
          setY(event.clientY, event.clientY);
          firstEnter = false;
          return;
        }

        setX(event.clientX);
        setY(event.clientY);
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
      className="group grid gap-4 border-b border-border py-6 transition-colors hover:border-foreground/40 md:grid-cols-[72px_1.2fr_110px_1fr_40px] md:items-center"
    >
      <div
        ref={previewRef}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden invisible h-[300px] w-[300px] overflow-hidden rounded-[1.5rem] border border-white/12 bg-white opacity-0 shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:block"
        aria-hidden="true"
      >
        <div className="flex h-full w-full items-end bg-linear-to-br from-white via-zinc-100 to-zinc-300 p-6">
          <div className="space-y-2 text-black">
            <div className="text-[10px] font-bold uppercase tracking-[0.34em] text-black/55">
              Preview
            </div>
            <div className="max-w-[11ch] text-3xl font-semibold leading-none tracking-tight">
              {project.title}
            </div>
          </div>
        </div>
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
