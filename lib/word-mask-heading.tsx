"use client";

import {
  useEffect,
  type DependencyList,
  type RefObject,
} from "react";
export { renderWordMaskText } from "@/lib/word-mask-text";

type WordMaskHeadingRevealOptions = {
  start?: string;
  trigger?: "mount" | "scroll";
};

type Killable = {
  kill: () => void;
};

type WordTimeline = Killable & {
  play: (position?: number) => WordTimeline;
  to: (...args: unknown[]) => WordTimeline;
};

function shouldUseStaticReveal() {
  return (
    window.matchMedia("(max-width: 767px)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function revealWordMaskText(root: HTMLElement) {
  const wordTexts = root.querySelectorAll<HTMLElement>(".hero-word-text");
  const chars = root.querySelectorAll<HTMLElement>(".hero-char");
  const masks = root.querySelectorAll<HTMLElement>(".hero-word-mask");

  [...wordTexts, ...chars].forEach((element) => {
    element.style.opacity = "1";
    element.style.visibility = "visible";
    element.style.transform = "";
    element.style.filter = "blur(0px)";
  });

  masks.forEach((mask) => {
    mask.style.opacity = "0";
    mask.style.visibility = "hidden";
    mask.style.transform = "scaleX(0)";
  });
}

export function useWordMaskHeadingReveal(
  scope: RefObject<HTMLElement | null>,
  dependencies: DependencyList = [],
  options: WordMaskHeadingRevealOptions = {},
) {
  useEffect(() => {
      const root = scope.current;
      if (!root) {
        return;
      }

      if (shouldUseStaticReveal()) {
        revealWordMaskText(root);
        return;
      }

      let timeline: WordTimeline | null = null;
      let scrollTrigger: Killable | null = null;
      let cancelled = false;

      void import("@/lib/gsap").then(({ ensureGsap, gsap, ScrollTrigger }) => {
        if (cancelled) {
          return;
        }

        ensureGsap();

      const wordTexts = gsap.utils.toArray<HTMLElement>(".hero-word-text", root);
      const chars = gsap.utils.toArray<HTMLElement>(".hero-char", root);
      const masks = gsap.utils.toArray<HTMLElement>(".hero-word-mask", root);

      gsap.set(wordTexts, { autoAlpha: 1 });
      gsap.set(chars, { autoAlpha: 0, yPercent: 0, filter: "blur(8px)" });
      gsap.set(masks, {
        autoAlpha: 1,
        scaleX: 0,
        xPercent: 0,
        transformOrigin: "left center",
      });

      timeline = gsap.timeline({
        defaults: { ease: "power4.out" },
        paused: options.trigger === "scroll",
      }) as unknown as WordTimeline;

      wordTexts.forEach((wordText, index) => {
        const activeTimeline = timeline;
        const wordChars = gsap.utils.toArray<HTMLElement>(".hero-char", wordText);
        const wordMask = masks[index];
        if (!activeTimeline || !wordMask || !wordChars.length) {
          return;
        }

        activeTimeline
          .to(
            wordMask,
            {
              scaleX: 1,
              duration: 0.44,
              ease: "expo.out",
            },
            index * 0.32,
          )
          .to(
            wordMask,
            {
              xPercent: 102,
              duration: 0.55,
              ease: "power2.inOut",
              onComplete: () => {
                gsap.set(wordMask, { autoAlpha: 0 });
              },
            },
            ">",
          )
          .to(
            wordChars,
            {
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.44,
              stagger: 0.03,
              ease: "power3.out",
            },
            "<0.08",
          );
      });

      if (options.trigger === "scroll") {
        scrollTrigger = ScrollTrigger.create({
          trigger: root,
          start: options.start ?? "top 78%",
          once: true,
          onEnter: () => {
            timeline?.play(0);
          },
        });
      }
      });

      return () => {
        cancelled = true;
        scrollTrigger?.kill();
        timeline?.kill();
      };
  // eslint-disable-next-line react-hooks/exhaustive-deps -- caller-provided reveal dependencies are intentionally forwarded.
  }, [scope, options.trigger, options.start, ...dependencies]);
}
