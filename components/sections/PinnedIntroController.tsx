"use client";

import { useEffect, useRef } from "react";

type KillableTimeline = {
  scrollTrigger?: { kill: () => void };
  kill: () => void;
  fromTo: (...args: unknown[]) => KillableTimeline;
};

function canUsePinnedIntro() {
  return (
    window.matchMedia("(min-width: 768px)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function PinnedIntroController() {
  const marker = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const shell = marker.current?.closest<HTMLElement>(
      "[data-pinned-intro-shell='true']",
    );
    const heroPanel = shell?.querySelector<HTMLElement>(
      "[data-pinned-hero-panel='true']",
    );
    const heroScrim = shell?.querySelector<HTMLElement>(
      "[data-pinned-hero-scrim='true']",
    );
    const bodySheet = shell?.querySelector<HTMLElement>(
      "[data-pinned-body-sheet='true']",
    );
    const nav = document.querySelector<HTMLElement>("[data-site-nav='true']");
    const navOffset = nav?.offsetHeight ?? 80;

    if (!shell || !heroPanel || !heroScrim || !bodySheet) {
      return;
    }

    const setIntroCovered = (covered: boolean) => {
      document.documentElement.dataset.homeIntroCovered = covered
        ? "true"
        : "false";
      window.dispatchEvent(
        new CustomEvent("home-intro-cover-change", {
          detail: { covered },
        }),
      );
    };

    const cleanupInlineStyles = () => {
      heroPanel.removeAttribute("style");
      heroScrim.removeAttribute("style");
      bodySheet.removeAttribute("style");
    };

    if (!canUsePinnedIntro()) {
      setIntroCovered(true);
      cleanupInlineStyles();
      return;
    }

    let takeoverTimeline: KillableTimeline | null = null;
    let cancelled = false;
    setIntroCovered(false);

    void import("@/lib/gsap").then(
      ({ ensureGsap, gsap, refreshScrollTriggers }) => {
        if (cancelled) {
          return;
        }

        ensureGsap();

        takeoverTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: shell,
            start: () => `top top+=${navOffset}`,
            end: () => `+=${heroPanel.offsetHeight}`,
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setIntroCovered(self.progress >= 0.98);
            },
            onLeave: () => {
              setIntroCovered(true);
            },
            onEnterBack: () => {
              setIntroCovered(false);
            },
          },
        }) as unknown as KillableTimeline;

        takeoverTimeline
          .fromTo(
            heroScrim,
            { autoAlpha: 0 },
            { autoAlpha: 0.7, ease: "none" },
            0,
          )
          .fromTo(
            bodySheet,
            {
              boxShadow: "0 -32px 80px rgba(0, 0, 0, 0.18)",
            },
            {
              boxShadow: "0 -72px 180px rgba(0, 0, 0, 0.46)",
              ease: "none",
            },
            0,
          );

        refreshScrollTriggers();
      },
    );

    return () => {
      cancelled = true;
      setIntroCovered(true);
      takeoverTimeline?.scrollTrigger?.kill();
      takeoverTimeline?.kill();
      cleanupInlineStyles();
    };
  }, []);

  return <span ref={marker} hidden aria-hidden="true" />;
}
