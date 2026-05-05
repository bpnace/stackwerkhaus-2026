"use client";

import { useEffect, useRef } from "react";
import { getInitialScrambleText } from "@/lib/scramble";

type LoopingScrambleTextProps = {
  className?: string;
  delayMs?: number;
  text: string;
  updateMs?: number;
};

const STATIC_UPPERCASE_LETTERS = "MNBVCXZLKJHGFDSAPOIUYTREWQ";
const STATIC_LOWERCASE_LETTERS = "mnbvcxzlkjhgfdsapoiuytrewq";
const STATIC_DIGITS = "7890123456";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getStaticScrambleText(text: string) {
  return Array.from(text)
    .map((character, index) => {
      if (/\d/u.test(character)) {
        return STATIC_DIGITS[index % STATIC_DIGITS.length];
      }

      if (/\p{L}/u.test(character)) {
        const source =
          character === character.toUpperCase()
            ? STATIC_UPPERCASE_LETTERS
            : STATIC_LOWERCASE_LETTERS;
        return source[index % source.length];
      }

      return character;
    })
    .join("");
}

function getContinuousScrambleText(characters: string[], targetText: string) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const nextText = getInitialScrambleText(characters);
    if (nextText !== targetText) {
      return nextText;
    }
  }

  return getStaticScrambleText(targetText);
}

export function LoopingScrambleText({
  className,
  delayMs = 0,
  text,
  updateMs = 84,
}: LoopingScrambleTextProps) {
  const visualRef = useRef<HTMLSpanElement | null>(null);
  const initialVisualText = getStaticScrambleText(text);

  useEffect(() => {
    const visual = visualRef.current;
    if (!visual) {
      return;
    }

    const characters = Array.from(text);
    let frameId = 0;
    let timeoutId = 0;
    let isCancelled = false;
    let lastUpdatedAt = 0;

    visual.textContent = initialVisualText;

    if (!characters.length || prefersReducedMotion()) {
      return;
    }

    const runScramble = () => {
      if (isCancelled) {
        return;
      }

      const tick = (timestamp: number) => {
        if (isCancelled) {
          return;
        }

        if (!lastUpdatedAt || timestamp - lastUpdatedAt >= updateMs) {
          visual.textContent = getContinuousScrambleText(characters, text);
          lastUpdatedAt = timestamp;
        }

        frameId = window.requestAnimationFrame(tick);
      };

      frameId = window.requestAnimationFrame(tick);
    };

    timeoutId = window.setTimeout(runScramble, delayMs);

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, [delayMs, initialVisualText, text, updateMs]);

  return (
    <span className={`experience-scramble ${className ?? ""}`}>
      <span className="sr-only">{text}</span>
      <span className="experience-scramble-stack" aria-hidden="true">
        <span className="experience-scramble-reserve">{text}</span>
        <span
          ref={visualRef}
          className="experience-scramble-visual"
          data-looping-scramble-visual="true"
          style={{ opacity: 1 }}
        >
          {initialVisualText}
        </span>
      </span>
    </span>
  );
}
