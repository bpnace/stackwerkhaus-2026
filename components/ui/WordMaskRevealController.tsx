"use client";

import { useCallback, useRef } from "react";
import { useWordMaskHeadingReveal } from "@/lib/word-mask-heading";

type WordMaskRevealControllerProps = {
  dependencyKey?: number | string;
  scopeSelector?: string;
  start?: string;
  trigger?: "mount" | "scroll";
};

export function WordMaskRevealController({
  dependencyKey,
  scopeSelector = "[data-word-mask-scope='true']",
  start,
  trigger,
}: WordMaskRevealControllerProps) {
  const scope = useRef<HTMLElement | null>(null);
  const markerRef = useCallback(
    (node: HTMLSpanElement | null) => {
      scope.current = node?.closest<HTMLElement>(scopeSelector) ?? null;
    },
    [scopeSelector],
  );

  useWordMaskHeadingReveal(scope, [dependencyKey], {
    start,
    trigger,
  });

  return <span ref={markerRef} hidden aria-hidden="true" />;
}
