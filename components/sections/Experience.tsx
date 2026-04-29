"use client";

import { useRef } from "react";
import { ScrambleField } from "@/components/ui/ScrambleField";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  ScrollTrigger,
  ensureGsap,
  gsap,
  refreshScrollTriggers,
  useGSAP,
  withMotionPreference,
} from "@/lib/gsap";
import {
  getFieldVisual,
  getInitialScrambleText,
  getScrambleFrameText,
} from "@/lib/scramble";
import { experience } from "@/lib/site-data";
const FIELD_STAGGER_MS = 45;
const FIELD_DURATION_MS = 860;
const FIELD_DURATION_STEP_MS = 90;
const EXPERIENCE_TRIGGER_START = "top bottom+=6%";

export function Experience() {
  const scope = useRef<HTMLDivElement | null>(null);

  useGSAP(
    (_, contextSafe) => {
      ensureGsap();

      const safe =
        contextSafe ??
        (<T extends (...args: never[]) => unknown>(fn: T) => fn);

      const root = scope.current;
      if (!root) {
        return;
      }

      const rows = gsap.utils.toArray<HTMLElement>(".experience-row", root);
      const fields = gsap.utils.toArray<HTMLElement>(
        "[data-scramble-field='true']",
        root,
      );

      const activeFrames = new Map<HTMLElement, number>();
      const timeoutIds = new Set<number>();
      let playedRows = new WeakSet<HTMLElement>();

      const stopActiveWork = () => {
        activeFrames.forEach((frameId) => {
          window.cancelAnimationFrame(frameId);
        });
        activeFrames.clear();

        timeoutIds.forEach((timeoutId) => {
          window.clearTimeout(timeoutId);
        });
        timeoutIds.clear();
      };

      const showFinalText = (visible: boolean) => {
        fields.forEach((field) => {
          const visual = getFieldVisual(field);
          if (!visual) {
            return;
          }

          visual.textContent = field.dataset.scrambleText ?? "";
          gsap.set(visual, { autoAlpha: visible ? 1 : 0 });
        });
      };

      const animateField = safe((field: HTMLElement, fieldIndex: number) => {
        const visual = getFieldVisual(field);
        const targetText = field.dataset.scrambleText ?? "";

        if (!visual) {
          return;
        }

        if (!targetText.length) {
          gsap.set(visual, { autoAlpha: 1 });
          return;
        }

        const characters = Array.from(targetText);
        const durationMs =
          FIELD_DURATION_MS + fieldIndex * FIELD_DURATION_STEP_MS;
        const startedAt = window.performance.now();
        const initialText = getInitialScrambleText(characters);

        gsap.set(visual, { autoAlpha: 1 });
        visual.textContent = initialText;

        const tick = (timestamp: number) => {
          const progress = Math.min((timestamp - startedAt) / durationMs, 1);
          const resolvedCharacters = Math.floor(progress * characters.length);

          visual.textContent = getScrambleFrameText(
            characters,
            resolvedCharacters,
          );

          if (progress >= 1) {
            visual.textContent = targetText;
            activeFrames.delete(visual);
            return;
          }

          const nextFrameId = window.requestAnimationFrame(tick);
          activeFrames.set(visual, nextFrameId);
        };

        const frameId = window.requestAnimationFrame(tick);
        activeFrames.set(visual, frameId);
      });

      const startRow = safe((row: HTMLElement) => {
        if (playedRows.has(row)) {
          return;
        }

        playedRows.add(row);

        const rowFields = gsap.utils.toArray<HTMLElement>(
          "[data-scramble-field='true']",
          row,
        );

        rowFields.forEach((field, fieldIndex) => {
          const timeoutId = window.setTimeout(() => {
            timeoutIds.delete(timeoutId);
            animateField(field, fieldIndex);
          }, fieldIndex * FIELD_STAGGER_MS);

          timeoutIds.add(timeoutId);
        });
      });

      const cleanup = withMotionPreference({
        reduce: () => {
          stopActiveWork();
          playedRows = new WeakSet<HTMLElement>();
          showFinalText(true);
        },
        motion: () => {
          stopActiveWork();
          playedRows = new WeakSet<HTMLElement>();
          showFinalText(false);

          rows.forEach((row) => {
            ScrollTrigger.create({
              trigger: row,
              start: EXPERIENCE_TRIGGER_START,
              once: true,
              onEnter: () => {
                startRow(row);
              },
            });
          });

          refreshScrollTriggers();
        },
      });

      return () => {
        stopActiveWork();
        cleanup();
      };
    },
    { scope, revertOnUpdate: true },
  );

  return (
    <section className="section-space">
      <div ref={scope} className="section-shell">
        <SectionHeader label="Erfahrung" marker="(SKWKHS® — 05)" />
        <div className="space-y-4">
          {experience.map((entry) => (
            <article
              key={entry.title}
              className="experience-row grid gap-3 border-b border-border py-6 md:grid-cols-[minmax(0,0.92fr)_minmax(280px,0.58fr)] md:items-start md:gap-8 md:py-7"
            >
              <h3 className="min-w-0 text-2xl font-semibold tracking-tight">
                <ScrambleField text={entry.title} />
              </h3>

              <div className="experience-meta grid min-w-0 gap-2 text-sm text-muted md:justify-items-end md:text-right">
                <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1 md:justify-end">
                  <span className="experience-meta-field">
                    <ScrambleField text={entry.years} />
                  </span>
                  <span className="text-foreground/26" aria-hidden="true">
                    /
                  </span>
                  <span className="experience-meta-field">
                    <ScrambleField text={entry.role} />
                  </span>
                </div>
                <div className="experience-meta-field text-foreground/72">
                  <ScrambleField text={entry.place} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
