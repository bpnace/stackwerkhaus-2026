"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";

type TemplatePreviewMediaProps = {
  image: string;
  imageAlt: string;
  imageLoading?: "eager" | "lazy";
  title: string;
  video: string;
};

function canPlayHoverPreview() {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function TemplatePreviewMedia({
  image,
  imageAlt,
  imageLoading = "lazy",
  title,
  video,
}: TemplatePreviewMediaProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const playPreview = useCallback(() => {
    if (!canPlayHoverPreview()) {
      return;
    }

    const preview = videoRef.current;
    if (!preview) {
      return;
    }

    if (preview.dataset.previewing === "true") {
      return;
    }

    preview.dataset.previewing = "true";
    preview.currentTime = 0;
    void preview.play().catch(() => {
      preview.dataset.previewing = "false";
      preview.pause();
    });
  }, []);

  const stopPreview = useCallback(() => {
    const preview = videoRef.current;
    if (!preview) {
      return;
    }

    preview.pause();
    preview.currentTime = 0;
    preview.dataset.previewing = "false";
  }, []);

  return (
    <div
      className="group/preview relative mt-5 aspect-video overflow-hidden border border-border bg-surface"
      onBlur={stopPreview}
      onFocus={playPreview}
      onMouseEnter={playPreview}
      onMouseLeave={stopPreview}
      onMouseOver={playPreview}
      onPointerEnter={playPreview}
      onPointerLeave={stopPreview}
      onPointerOver={playPreview}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        loading={imageLoading}
        sizes="(min-width: 1280px) 31vw, (min-width: 768px) 44vw, 100vw"
        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]"
      />
      <video
        ref={videoRef}
        aria-label={`Scroll-Vorschau ${title}`}
        className="absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-opacity duration-200 group-hover/preview:opacity-100 group-focus-within/preview:opacity-100"
        loop
        muted
        playsInline
        poster={image}
        preload="none"
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}
