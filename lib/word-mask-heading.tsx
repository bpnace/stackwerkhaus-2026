"use client";

import type { DependencyList, ReactNode, RefObject } from "react";
import { ensureGsap, gsap, shouldReduceMotion, useGSAP } from "@/lib/gsap";

type RenderWordMaskTextOptions = {
  getCharClassName?: (
    character: string,
    charIndex: number,
    word: string,
  ) => string | undefined;
};

export function renderWordMaskText(
  text: string,
  options?: RenderWordMaskTextOptions,
): ReactNode[] {
  const words = text.split(" ");

  return words.map((word, index) => (
    <span key={`${word}-${index}`}>
      <span className="hero-word">
        <span className="hero-word-text">
          {Array.from(word).map((character, charIndex) => {
            const extraClassName = options?.getCharClassName?.(
              character,
              charIndex,
              word,
            );

            return (
              <span
                key={`${word}-${charIndex}`}
                className={`hero-char${extraClassName ? ` ${extraClassName}` : ""}`}
              >
                {character}
              </span>
            );
          })}
        </span>
        <span className="hero-word-mask" aria-hidden />
      </span>
      {index < words.length - 1 ? " " : null}
    </span>
  ));
}

export function useWordMaskHeadingReveal(
  scope: RefObject<HTMLElement | null>,
  dependencies: DependencyList = [],
) {
  useGSAP(
    () => {
      ensureGsap();

      const root = scope.current;
      if (!root) {
        return;
      }

      const wordTexts = gsap.utils.toArray<HTMLElement>(".hero-word-text", root);
      const chars = gsap.utils.toArray<HTMLElement>(".hero-char", root);
      const masks = gsap.utils.toArray<HTMLElement>(".hero-word-mask", root);

      if (shouldReduceMotion()) {
        gsap.set([...wordTexts, ...chars], {
          autoAlpha: 1,
          y: 0,
          yPercent: 0,
          filter: "blur(0px)",
        });
        gsap.set(masks, { autoAlpha: 0, scaleX: 0, xPercent: 0 });
        return;
      }

      gsap.set(wordTexts, { autoAlpha: 1 });
      gsap.set(chars, { autoAlpha: 0, yPercent: 0, filter: "blur(8px)" });
      gsap.set(masks, {
        autoAlpha: 1,
        scaleX: 0,
        xPercent: 0,
        transformOrigin: "left center",
      });

      const timeline = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      wordTexts.forEach((wordText, index) => {
        const wordChars = gsap.utils.toArray<HTMLElement>(".hero-char", wordText);
        const wordMask = masks[index];
        if (!wordMask || !wordChars.length) {
          return;
        }

        timeline
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
    },
    { scope, dependencies: [...dependencies], revertOnUpdate: true },
  );
}
