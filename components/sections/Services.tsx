"use client";

import { useRef } from "react";
import { serviceProcessSteps, services } from "@/lib/site-data";
import { HashLink } from "@/components/ui/HashLink";
import { LinkRippleText } from "@/components/ui/LinkRippleText";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrambleField } from "@/components/ui/ScrambleField";
import {
  ScrollTrigger,
  ensureGsap,
  gsap,
  refreshScrollTriggers,
  shouldReduceMotion,
  useGSAP,
} from "@/lib/gsap";
import {
  getFieldVisual,
  getInitialScrambleText,
  getScrambleFrameText,
} from "@/lib/scramble";

const TITLE_DURATION_MS = 860;
const TITLE_TRIGGER_START = "top bottom+=6%";

export function Services() {
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

      const rows = gsap.utils.toArray<HTMLElement>(".service-row", root);
      const titleFields = gsap.utils.toArray<HTMLElement>(
        ".service-title [data-scramble-field='true']",
        root,
      );
      const activeFrames = new Map<HTMLElement, number>();
      let playedRows = new WeakSet<HTMLElement>();

      const stopActiveWork = () => {
        activeFrames.forEach((frameId) => {
          window.cancelAnimationFrame(frameId);
        });
        activeFrames.clear();
      };

      const showFinalText = (visible: boolean) => {
        titleFields.forEach((field) => {
          const visual = getFieldVisual(field);
          if (!visual) {
            return;
          }

          visual.textContent = field.dataset.scrambleText ?? "";
          gsap.set(visual, { autoAlpha: visible ? 1 : 0 });
        });
      };

      const animateTitle = safe((field: HTMLElement) => {
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
        const startedAt = window.performance.now();
        const initialText = getInitialScrambleText(characters);

        gsap.set(visual, { autoAlpha: 1 });
        visual.textContent = initialText;

        const tick = (timestamp: number) => {
          const progress = Math.min((timestamp - startedAt) / TITLE_DURATION_MS, 1);
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

        const titleField = row.querySelector<HTMLElement>(
          ".service-title [data-scramble-field='true']",
        );

        if (!titleField) {
          return;
        }

        animateTitle(titleField);
      });

      if (shouldReduceMotion()) {
        stopActiveWork();
        playedRows = new WeakSet<HTMLElement>();
        showFinalText(true);

        return () => {
          stopActiveWork();
        };
      }

      stopActiveWork();
      playedRows = new WeakSet<HTMLElement>();
      showFinalText(true);

      rows.forEach((row) => {
        ScrollTrigger.create({
          trigger: row,
          start: TITLE_TRIGGER_START,
          once: true,
          onEnter: () => {
            startRow(row);
          },
        });
      });
      refreshScrollTriggers();

      window.requestAnimationFrame(() => {
        rows.forEach((row) => {
          const rect = row.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 1.06 && rect.bottom >= 0) {
            startRow(row);
          }
        });
      });

      return () => {
        stopActiveWork();
      };
    },
    { scope, revertOnUpdate: true },
  );

  return (
    <section id="leistungen" className="section-space">
      <div ref={scope} className="section-shell">
        <SectionHeader label="Leistungen" marker="(SKWKHS® — 03)" />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(320px,0.42fr)] lg:items-end lg:gap-16">
          <div className="max-w-5xl space-y-5">
            <h2 className="display-lg">Der Bauplan</h2>
            <p className="max-w-3xl text-lg leading-8 text-muted">
              Ob neue Website, Relaunch oder komplexeres Webprodukt: Wir planen
              digitale Auftritte so, dass Design, Technik und Nutzerführung
              zusammenhalten. Kein Dekoanbau, sondern tragfähige Umsetzung.
            </p>
          </div>
        </div>

        <div className="relative mt-12 grid lg:grid-cols-3">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(rgba(247,243,239,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(247,243,239,0.8) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          {services.map((service) => (
            <article
              key={service.number}
              className="service-row group relative min-h-[22rem] lg:px-8 lg:py-8"
            >
              <div className="mb-14 flex items-center justify-between gap-4 lg:mb-24">
                <span className="eyebrow text-foreground/45">
                  {service.number}
                </span>
                <span className="h-px flex-1 bg-white/14 transition-colors group-hover:bg-foreground/45" />
              </div>
              <h3 className="service-title max-w-[14ch] text-3xl font-semibold leading-tight tracking-tight [&_.experience-scramble-visual]:!opacity-100 md:text-4xl lg:text-[clamp(2.1rem,2.6vw,3.4rem)]">
                <ScrambleField text={service.title} />
              </h3>
              <p className="mt-6 max-w-md text-base leading-7 text-muted">
                {service.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-10 border-t border-white/14 pt-10 md:mt-24 md:pt-14 lg:grid-cols-[minmax(280px,0.45fr)_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="max-w-3xl space-y-5">
              <div className="eyebrow">Baufolge</div>
              <h3 className="display-md max-w-[12ch]">
                Vom ersten Riss bis zur Bauabnahme
              </h3>
              <p className="text-lg leading-8 text-muted">
                Keine wilde Baustelle ohne Plan. Bei Stackwerkhaus läuft jedes
                Projekt in klaren Bauabschnitten: prüfen, planen, bauen, testen
                und sauber übergeben.
              </p>
            </div>

            <div className="mt-8 flex max-w-md flex-col gap-3">
              <HashLink
                href="/webseitecheck"
                className="link-arrow w-full justify-between bg-foreground px-5 py-4 text-background"
              >
                <LinkRippleText
                  text="Website Zustand prüfen"
                  baseWeight={760}
                />
                <span aria-hidden>+</span>
              </HashLink>
              <HashLink
                href="/#kontakt"
                className="link-arrow w-full justify-between border border-white/14 px-5 py-4 text-foreground hover:border-foreground/45"
              >
                <LinkRippleText text="Projekt anfragen" baseWeight={560} />
                <span aria-hidden>+</span>
              </HashLink>
            </div>
          </div>

          <div className="relative border-y border-white/14">
            <div
              className="pointer-events-none absolute inset-y-0 left-[2.25rem] hidden w-px bg-white/14 md:block"
              aria-hidden="true"
            />
            {serviceProcessSteps.map((step) => (
              <article
                key={step.number}
                className="relative grid gap-5 border-white/14 py-7 first:border-t-0 not-first:border-t md:grid-cols-[5rem_1fr] md:gap-8 md:py-8"
              >
                <div className="flex items-center gap-4 md:block">
                  <span className="relative z-10 grid h-10 w-10 place-items-center border border-white/18 bg-background text-[11px] font-semibold tracking-[0.22em] text-foreground/70">
                    {step.number}
                  </span>
                  <span className="h-px flex-1 bg-white/14 md:hidden" />
                </div>

                <div className="grid gap-5 lg:grid-cols-[minmax(220px,0.42fr)_1fr] lg:gap-10">
                  <div>
                    <h4 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                      {step.title}
                    </h4>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {step.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-white/12 px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-foreground/58"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="max-w-2xl text-base leading-7 text-muted lg:pt-1">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
