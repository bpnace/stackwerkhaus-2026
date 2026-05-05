"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type PinnedIntroShellProps = {
  hero: ReactNode;
  children: ReactNode;
};

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

export function PinnedIntroShell({
  hero,
  children,
}: PinnedIntroShellProps) {
  const scope = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
      const shell = scope.current;
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

  return (
    <div ref={scope} className="relative">
      <div
        data-pinned-hero-panel="true"
        className="sticky top-20 z-0 min-h-[calc(100svh-5rem)] md:top-24 md:min-h-[calc(100svh-6rem)]"
      >
        {hero}
        <div
          data-pinned-hero-scrim="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 -top-20 z-10 bg-black opacity-0 md:-top-24"
          aria-hidden="true"
        />
      </div>
      <div
        data-pinned-body-sheet="true"
        className="relative z-20 bg-background"
      >
        {children}
      </div>
    </div>
  );
}
