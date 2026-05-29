"use client";

import { useEffect, useRef } from "react";

type KillableTween = {
  kill: () => void;
};

function shouldUseStaticTicker() {
  return (
    window.matchMedia("(max-width: 767px)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function TickerMotion() {
  const marker = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (shouldUseStaticTicker()) {
      return;
    }

    const root = marker.current?.closest<HTMLElement>(
      "[data-ticker-root='true']",
    );
    const track = root?.querySelector<HTMLElement>("[data-ticker-track='true']");
    if (!track) {
      return;
    }

    let tween: KillableTween | null = null;
    let cancelled = false;

    void import("@/lib/gsap").then(({ ensureGsap, gsap }) => {
      if (cancelled) {
        return;
      }

      ensureGsap();
      tween = gsap.to(track, {
        xPercent: -50,
        duration: 24,
        ease: "none",
        repeat: -1,
      });
    });

    return () => {
      cancelled = true;
      tween?.kill();
    };
  }, []);

  return <span ref={marker} hidden aria-hidden="true" />;
}
