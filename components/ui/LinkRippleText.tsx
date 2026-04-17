"use client";

import type { CSSProperties } from "react";
import { useMemo, useRef } from "react";
import { ensureGsap, gsap, shouldReduceMotion, useGSAP } from "@/lib/gsap";

type LinkRippleTextProps = {
  text: string;
  baseWeight?: number;
  activeWeight?: number;
  persistentActive?: boolean;
};

type Glyph =
  | { type: "char"; value: string; index: number }
  | { type: "space"; value: string };

export function LinkRippleText({
  text,
  baseWeight = 520,
  activeWeight = 900,
  persistentActive = false,
}: LinkRippleTextProps) {
  const scope = useRef<HTMLSpanElement | null>(null);
  const lastOriginIndex = useRef(0);
  const activeTimeline = useRef<gsap.core.Timeline | null>(null);

  const glyphs = useMemo(() => {
    const items: Glyph[] = [];
    let charIndex = 0;

    for (const character of Array.from(text)) {
      if (character === " ") {
        items.push({ type: "space", value: character });
        continue;
      }

      items.push({ type: "char", value: character, index: charIndex });
      charIndex += 1;
    }

    return items;
  }, [text]);

  useGSAP(
    (_, contextSafe) => {
      ensureGsap();
      const safe =
        contextSafe ??
        (<T extends (...args: never[]) => unknown>(fn: T) => fn);

      const node = scope.current;
      if (!node) {
        return;
      }

      if (window.matchMedia("(max-width: 767px)").matches) {
        return;
      }

      const chars = Array.from(
        node.querySelectorAll<HTMLElement>("[data-ripple-char='true']"),
      );
      const inks = chars
        .map((char) => char.querySelector<HTMLElement>("[data-ripple-ink='true']"))
        .filter((ink): ink is HTMLElement => ink !== null);

      if (!chars.length || inks.length !== chars.length) {
        return;
      }

      const setInk = (value: number) => {
        gsap.set(inks, { autoAlpha: value });
      };

      const getClosestCharIndex = (clientX: number) => {
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        chars.forEach((char, index) => {
          const rect = char.getBoundingClientRect();
          const center = rect.left + rect.width / 2;
          const distance = Math.abs(clientX - center);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        lastOriginIndex.current = closestIndex;
        return closestIndex;
      };

      const getStagger = (origin: number) => (index: number) =>
        Math.abs(index - origin) * (persistentActive ? 0.065 : 0.018);

      const animateTo = (opacity: number, origin: number) => {
        activeTimeline.current?.kill();
        activeTimeline.current = gsap.timeline({
          defaults: {
            duration: shouldReduceMotion() ? 0 : persistentActive ? 0.5 : 0.22,
            ease: "power2.out",
          },
        });

        activeTimeline.current.to(inks, {
          autoAlpha: opacity,
          stagger: getStagger(origin),
          overwrite: true,
        });
      };

      setInk(0);

      if (persistentActive) {
        const origin = Math.floor(chars.length / 2);
        lastOriginIndex.current = origin;

        if (shouldReduceMotion()) {
          gsap.set(inks, { autoAlpha: 1 });
          return;
        }

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            animateTo(1, origin);
          });
        });
        return () => {
          activeTimeline.current?.kill();
        };
      }

      const onPointerEnter = safe((event: PointerEvent) => {
        animateTo(1, getClosestCharIndex(event.clientX));
      });

      const onPointerLeave = safe(() => {
        animateTo(0, lastOriginIndex.current);
      });

      const onFocus = safe(() => {
        const origin = Math.floor(chars.length / 2);
        lastOriginIndex.current = origin;
        animateTo(1, origin);
      });

      const onBlur = safe(() => {
        animateTo(0, lastOriginIndex.current);
      });

      const host = node?.closest<HTMLElement>("a, button") ?? node;

      host?.addEventListener("pointerenter", onPointerEnter);
      host?.addEventListener("pointerleave", onPointerLeave);
      host?.addEventListener("focus", onFocus);
      host?.addEventListener("blur", onBlur);

      return () => {
        activeTimeline.current?.kill();
        host?.removeEventListener("pointerenter", onPointerEnter);
        host?.removeEventListener("pointerleave", onPointerLeave);
        host?.removeEventListener("focus", onFocus);
        host?.removeEventListener("blur", onBlur);
      };
    },
    { scope, dependencies: [persistentActive], revertOnUpdate: true },
  );

  return (
    <span
      ref={scope}
      className="link-ripple-text"
      style={
        {
          "--link-ripple-base-wght": baseWeight,
          "--link-ripple-active-wght": activeWeight,
        } as CSSProperties
      }
    >
      <span className="sr-only">{text}</span>
      <span className="link-ripple-static" aria-hidden="true">
        {text}
      </span>
      <span className="link-ripple-visual" aria-hidden="true">
        {glyphs.map((glyph, index) =>
          glyph.type === "space" ? (
            <span key={`space-${index}`} className="link-ripple-space">
              {" "}
            </span>
          ) : (
            <span
              key={`${glyph.value}-${glyph.index}`}
              className="link-ripple-char"
              data-ripple-char="true"
              data-ripple-index={glyph.index}
            >
              <span className="link-ripple-reserve">{glyph.value}</span>
              <span className="link-ripple-base">{glyph.value}</span>
              <span className="link-ripple-ink" data-ripple-ink="true">
                {glyph.value}
              </span>
            </span>
          ),
        )}
      </span>
    </span>
  );
}
