"use client";

import { useEffect, useRef } from "react";

type StaggeredCycleProps = {
  words: string[];
  size?: "xl" | "lg" | "md";
  className?: string;
};

type KillableTimeline = {
  kill: () => void;
  fromTo: (...args: unknown[]) => KillableTimeline;
  set: (...args: unknown[]) => KillableTimeline;
  to: (...args: unknown[]) => KillableTimeline;
};

function shouldUseStaticCycle() {
  return (
    window.matchMedia("(max-width: 767px)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

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

  useEffect(() => {
    const root = scope.current;
    if (!root) {
      return;
    }

    const wordElements = Array.from(
      root.querySelectorAll<HTMLElement>(".cycle-word"),
    );
    if (!wordElements.length) {
      return;
    }

    const charGroups = wordElements.map((wordElement) =>
      Array.from(wordElement.querySelectorAll<HTMLElement>(".cycle-char")),
    );

    if (shouldUseStaticCycle()) {
      wordElements.forEach((wordElement, index) => {
        wordElement.style.opacity = index === 0 ? "1" : "0";
        wordElement.style.visibility = index === 0 ? "visible" : "hidden";
      });
      charGroups.forEach((chars, index) => {
        chars.forEach((char) => {
          char.style.opacity = index === 0 ? "1" : "0";
          char.style.visibility = index === 0 ? "visible" : "hidden";
          char.style.transform = "";
        });
      });
      return;
    }

    let activeTimeline: KillableTimeline | null = null;
    let stopped = false;

    void import("@/lib/gsap").then(({ ensureGsap, gsap }) => {
      if (stopped) {
        return;
      }

      ensureGsap();

      gsap.set(wordElements, { autoAlpha: 0 });
      gsap.set(charGroups.flat(), { autoAlpha: 0, yPercent: 118 });
      gsap.set(wordElements[0], { autoAlpha: 1 });
      gsap.set(charGroups[0], { autoAlpha: 1, yPercent: 0 });

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
        }) as unknown as KillableTimeline;

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
    });

    return () => {
      stopped = true;
      activeTimeline?.kill();
    };
  }, []);

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
          style={{
            opacity: 0,
            visibility: "hidden",
          }}
          aria-hidden="true"
        >
          {Array.from(word).map((character, index) => (
            <span
              key={`${word}-${index}`}
              className="cycle-char inline-block"
              style={{
                opacity: 0,
                visibility: "hidden",
              }}
            >
              {character}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
