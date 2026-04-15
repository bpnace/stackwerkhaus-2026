"use client";

import { useRef } from "react";
import { ensureGsap, gsap, shouldReduceMotion, useGSAP } from "@/lib/gsap";

type StaggeredCycleProps = {
  words: string[];
  size?: "xl" | "lg" | "md";
  className?: string;
};

export function StaggeredCycle({
  words,
  size = "xl",
  className,
}: StaggeredCycleProps) {
  const scope = useRef<HTMLDivElement | null>(null);
  const longestWord = words.reduce(
    (longest, word) => (word.length > longest.length ? word : longest),
    words[0] ?? "",
  );
  const sizeClassName =
    size === "lg" ? "display-lg" : size === "md" ? "display-md" : "display-xl";

  useGSAP(
    () => {
      ensureGsap();

      const wordElements = gsap.utils.toArray<HTMLElement>(".cycle-word");
      if (!wordElements.length) {
        return;
      }

      const charGroups = wordElements.map((wordElement) =>
        gsap.utils.toArray<HTMLElement>(".cycle-char", wordElement),
      );

      if (shouldReduceMotion()) {
        wordElements.forEach((wordElement, index) => {
          gsap.set(wordElement, { autoAlpha: index === 0 ? 1 : 0 });
        });
        charGroups.forEach((chars, index) => {
          gsap.set(chars, { autoAlpha: index === 0 ? 1 : 0, yPercent: 0 });
        });
        return;
      }

      gsap.set(wordElements, { autoAlpha: 0 });
      gsap.set(charGroups.flat(), { autoAlpha: 0, yPercent: 118 });
      gsap.set(wordElements[0], { autoAlpha: 1 });
      gsap.set(charGroups[0], { autoAlpha: 1, yPercent: 0 });

      let activeTimeline: gsap.core.Timeline | null = null;
      let stopped = false;

      const runTransition = (index: number) => {
        if (stopped) {
          return;
        }

        const currentWord = wordElements[index];
        const currentChars = charGroups[index];
        const nextIndex = (index + 1) % wordElements.length;
        const nextWord = wordElements[nextIndex];
        const nextChars = charGroups[nextIndex];

        activeTimeline = gsap.timeline({
          onComplete: () => {
            gsap.set(currentWord, { autoAlpha: 0 });
            runTransition(nextIndex);
          },
        });

        activeTimeline
          .set(nextWord, { autoAlpha: 1 })
          .to(
            currentChars,
            {
              autoAlpha: 0,
              yPercent: -112,
              duration: 0.7,
              stagger: 0.075,
              ease: "power2.inOut",
            },
            "+=0.55",
          )
          .fromTo(
            nextChars,
            { autoAlpha: 0, yPercent: 118 },
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: 0.78,
              stagger: 0.075,
              ease: "power3.out",
            },
            "<0.22",
          );
      };

      runTransition(0);

      return () => {
        stopped = true;
        activeTimeline?.kill();
      };
    },
    { scope },
  );

  return (
    <div
      ref={scope}
      className={`${sizeClassName} relative inline-block h-[1.18em] overflow-x-visible overflow-y-hidden px-[0.04em] md:h-[1.2em]${
        className ? ` ${className}` : ""
      }`}
    >
      <span
        className="pointer-events-none invisible block whitespace-nowrap"
        aria-hidden="true"
      >
        {longestWord}
      </span>
      {words.map((word) => (
        <div
          key={word}
          className="cycle-word absolute left-[0.04em] top-0 whitespace-nowrap text-foreground"
          aria-hidden="true"
        >
          {Array.from(word).map((character, index) => (
            <span
              key={`${word}-${index}`}
              className="cycle-char inline-block"
            >
              {character}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
