"use client";

import { useEffect, useRef } from "react";

type KillableTimeline = {
  kill: () => void;
  from: (...args: unknown[]) => KillableTimeline;
  to: (...args: unknown[]) => KillableTimeline;
};

function shouldUseStaticHero() {
  return (
    window.matchMedia("(max-width: 767px)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function markHeroIntroReady() {
  document.documentElement.dataset.homeHeroIntroReady = "true";
  window.dispatchEvent(new CustomEvent("home-hero-intro-ready"));
}

function revealStaticHero(root: HTMLElement) {
  const visibleTargets = root.querySelectorAll<HTMLElement>(
    ".hero-word-text, .hero-char, .hero-copy, .hero-action",
  );
  const masks = root.querySelectorAll<HTMLElement>(".hero-word-mask");

  visibleTargets.forEach((target) => {
    target.style.opacity = "1";
    target.style.visibility = "visible";
    target.style.transform = "";
    target.style.filter = "";
  });

  masks.forEach((mask) => {
    mask.style.opacity = "0";
    mask.style.visibility = "hidden";
    mask.style.transform = "scaleX(0)";
  });
}

export function HeroIntroController() {
  const marker = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const root = marker.current?.closest<HTMLElement>("[data-home-hero='true']");
    if (!root) {
      return;
    }

    if (shouldUseStaticHero()) {
      revealStaticHero(root);
      root.dataset.heroIntro = "ready";
      markHeroIntroReady();
      return;
    }

    let timeline: KillableTimeline | null = null;
    let cancelled = false;
    document.documentElement.dataset.homeHeroIntroReady = "false";

    void import("@/lib/gsap")
      .then(({ ensureGsap, gsap }) => {
        if (cancelled) {
          return;
        }

        ensureGsap();

        const wordTexts = gsap.utils.toArray<HTMLElement>(
          ".hero-word-text",
          root,
        );
        const chars = gsap.utils.toArray<HTMLElement>(".hero-char", root);
        const masks = gsap.utils.toArray<HTMLElement>(
          ".hero-word-mask",
          root,
        );
        const lines = gsap.utils.toArray<HTMLElement>(".hero-line", root);
        const copy = gsap.utils.toArray<HTMLElement>(".hero-copy", root);
        const actions = gsap.utils.toArray<HTMLElement>(".hero-action", root);

        const wordTimelineEntries: Array<{
          mask: HTMLElement;
          chars: HTMLElement[];
          startAt: number;
        }> = [];

        lines.forEach((line) => {
          const lineMasks = gsap.utils.toArray<HTMLElement>(
            ".hero-word-mask",
            line,
          );
          const lineTexts = gsap.utils.toArray<HTMLElement>(
            ".hero-word-text",
            line,
          );

          lineMasks.forEach((mask, lineWordIndex) => {
            const text = lineTexts[lineWordIndex];
            if (!text) {
              return;
            }

            wordTimelineEntries.push({
              mask,
              chars: gsap.utils.toArray<HTMLElement>(".hero-char", text),
              startAt: lineWordIndex * 0.32,
            });
          });
        });

        gsap.set(wordTexts, { autoAlpha: 1 });
        gsap.set(chars, { autoAlpha: 0, yPercent: 0, filter: "blur(8px)" });
        gsap.set(masks, {
          autoAlpha: 1,
          scaleX: 0,
          xPercent: 0,
          transformOrigin: "left center",
        });
        gsap.set(copy, { autoAlpha: 0, y: 24 });
        gsap.set(actions, { autoAlpha: 0, y: 18 });

        root.dataset.heroIntro = "ready";

        timeline = gsap.timeline({
          defaults: { ease: "power4.out" },
          onComplete: markHeroIntroReady,
        }) as unknown as KillableTimeline;

        wordTimelineEntries.forEach(({ mask, chars: wordChars, startAt }) => {
          timeline
            ?.to(
              mask,
              {
                scaleX: 1,
                duration: 0.42,
                ease: "expo.out",
              },
              startAt,
            )
            .to(
              mask,
              {
                xPercent: 102,
                duration: 0.5,
                ease: "power2.inOut",
                onComplete: () => {
                  gsap.set(mask, { autoAlpha: 0 });
                },
              },
              ">",
            )
            .to(
              wordChars,
              {
                autoAlpha: 1,
                filter: "blur(0px)",
                duration: 0.42,
                stagger: 0.03,
                ease: "power3.out",
              },
              "<0.08",
            );
        });

        timeline
          ?.to(
            copy,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.1,
            },
            "+=0.08",
          )
          .to(
            actions,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.08,
            },
            "-=0.2",
          );
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        revealStaticHero(root);
        root.dataset.heroIntro = "ready";
        markHeroIntroReady();
      });

    return () => {
      cancelled = true;
      timeline?.kill();
    };
  }, []);

  return <span ref={marker} hidden aria-hidden="true" />;
}
