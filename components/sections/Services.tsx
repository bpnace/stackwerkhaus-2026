"use client";

import { useRef } from "react";
import { serviceProcessSteps, services } from "@/lib/site-data";
import { TrackedHashLink } from "@/components/analytics/TrackedHashLink";
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
      const processTrack = root.querySelector<HTMLElement>(
        "[data-process-track='true']",
      );
      const processProgress = root.querySelector<HTMLElement>(
        "[data-process-progress='true']",
      );
      const processSteps = gsap.utils.toArray<HTMLElement>(
        "[data-process-step='true']",
        root,
      );
      const isMobileTimeline = () =>
        window.matchMedia("(max-width: 767px)").matches;
      const getInactiveProcessAlpha = () => (isMobileTimeline() ? 0.86 : 0.52);
      const activeFrames = new Map<HTMLElement, number>();
      let playedRows = new WeakSet<HTMLElement>();
      let activeProcessIndex = -1;

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

      const showFinalProcess = () => {
        processSteps.forEach((step) => {
          step.dataset.active = "true";
        });
        gsap.set(processSteps, {
          autoAlpha: 1,
          clearProps: "opacity,visibility",
        });
        if (processProgress) {
          gsap.set(processProgress, {
            scaleY: 1,
            transformOrigin: "top center",
          });
        }
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
        showFinalProcess();

        return () => {
          stopActiveWork();
        };
      }

      stopActiveWork();
      playedRows = new WeakSet<HTMLElement>();
      showFinalText(true);

      const setActiveStep = safe((activeIndex: number) => {
        if (activeIndex === activeProcessIndex) {
          return;
        }

        activeProcessIndex = activeIndex;

        processSteps.forEach((step, index) => {
          const isActive = index <= activeIndex;
          step.dataset.active = isActive ? "true" : "false";
          gsap.to(step, {
            autoAlpha: isActive ? 1 : getInactiveProcessAlpha(),
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      });

      const syncProcessWithLine = safe((lineProgress: number) => {
        if (!processTrack || !processSteps.length) {
          return;
        }

        const trackRect = processTrack.getBoundingClientRect();
        const lineBottom = trackRect.top + trackRect.height * lineProgress;
        const activeIndex = processSteps.reduce((latest, step, index) => {
          const marker = step.querySelector<HTMLElement>(
            "[data-process-marker='true']",
          );

          if (!marker) {
            return latest;
          }

          const markerRect = marker.getBoundingClientRect();
          const markerTrigger = markerRect.top;

          return lineBottom >= markerTrigger ? index : latest;
        }, -1);
        const hasEnteredMobileViewport =
          isMobileTimeline() &&
          trackRect.top <= window.innerHeight * 0.92 &&
          trackRect.bottom >= 0;
        const nextActiveIndex = hasEnteredMobileViewport
          ? Math.max(activeIndex, 0)
          : activeIndex;

        setActiveStep(nextActiveIndex);
      });

      if (processSteps.length) {
        gsap.set(processSteps, { autoAlpha: getInactiveProcessAlpha() });
        processSteps.forEach((step) => {
          step.dataset.active = "false";
        });
      }

      if (processProgress && processTrack) {
        const readProcessLineProgress = () => {
          const lineProgress = Number(
            gsap.getProperty(processProgress, "scaleY"),
          );

          return Number.isFinite(lineProgress) ? lineProgress : 0;
        };
        const updateProcessFromLine = () => {
          syncProcessWithLine(readProcessLineProgress());
        };
        const getProcessLineStops = () => {
          const trackRect = processTrack.getBoundingClientRect();
          const markerStops = processSteps.flatMap((step) => {
            const marker = step.querySelector<HTMLElement>(
              "[data-process-marker='true']",
            );

            if (!marker || trackRect.height <= 0) {
              return [];
            }

            const markerRect = marker.getBoundingClientRect();

            return gsap.utils.clamp(
              0,
              1,
              (markerRect.top - trackRect.top) / trackRect.height,
            );
          });
          const stops = [0, ...markerStops, 1].sort((a, b) => a - b);

          return stops.filter((stop, index) => {
            const previousStop = stops[index - 1];

            return index === 0 || stop - previousStop > 0.001;
          });
        };
        let processLineTimeline: ReturnType<typeof gsap.timeline> | null = null;
        const buildProcessLineTimeline = (
          timeline: ReturnType<typeof gsap.timeline>,
        ) => {
          const stops = getProcessLineStops();

          timeline.clear();
          gsap.set(processProgress, {
            scaleY: 0,
            transformOrigin: "top center",
          });

          stops.slice(1).forEach((stop, index) => {
            const previousStop = stops[index] ?? 0;
            const duration = Math.max(stop - previousStop, 0.04);

            timeline.to(processProgress, {
              scaleY: stop,
              duration,
              ease: "power2.inOut",
            });
          });
        };

        gsap.set(processProgress, {
          scaleY: 0,
          transformOrigin: "top center",
        });
        processLineTimeline = gsap.timeline({
          onUpdate: updateProcessFromLine,
          scrollTrigger: {
            trigger: processTrack,
            start: "top 88%",
            end: "bottom 72%",
            scrub: 0.45,
            invalidateOnRefresh: true,
            onRefresh: () => {
              if (!processLineTimeline) {
                return;
              }

              const progress = processLineTimeline.progress();

              buildProcessLineTimeline(processLineTimeline);
              processLineTimeline.progress(progress);
              updateProcessFromLine();
            },
          },
        });
        buildProcessLineTimeline(processLineTimeline);
      }

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
    <section className="section-space">
      <div ref={scope} className="section-shell">
        <SectionHeader id="leistungen" label="Leistungen" marker="(SKWKHS® — 03)" />
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
              <h3 className="service-title min-h-[3.75em] max-w-[14ch] text-3xl font-semibold leading-tight tracking-tight [&_.experience-scramble-visual]:!opacity-100 md:text-4xl lg:text-[clamp(2.1rem,2.6vw,3.4rem)]">
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
              <div className="eyebrow">Bauleitung</div>
              <h3 className="display-md max-w-[12ch]">
                Von der Planung bis zur Bauabnahme
              </h3>
              <p className="text-lg leading-8 text-muted">
                Keine wilde Baustelle ohne Plan. Bei Stackwerkhaus läuft jedes
                Projekt in klaren Bauabschnitten: prüfen, planen, bauen, testen
                und sauber übergeben.
              </p>
            </div>
            <div className="mt-8 flex max-w-md flex-col gap-3">
              <TrackedHashLink
                href="/webseitecheck"
                eventName="website_check_cta_click"
                eventParams={{ placement: "services_process" }}
                className="link-arrow w-full justify-between bg-foreground px-5 py-4 text-background"
              >
                <LinkRippleText
                  text="Website Zustand prüfen"
                  baseWeight={760}
                />
                <span aria-hidden>+</span>
              </TrackedHashLink>
              <HashLink
                href="/#kontakt"
                className="link-arrow w-full justify-between border border-white/14 px-5 py-4 text-foreground hover:border-foreground/45"
              >
                <LinkRippleText text="Projekt anfragen" baseWeight={560} />
                <span aria-hidden>+</span>
              </HashLink>
            </div>
          </div>

          <div
            data-process-track="true"
            className="relative border-y border-white/14"
          >
            <div
              className="pointer-events-none absolute inset-y-0 left-5 w-[2px] -translate-x-1/2 bg-white/12 md:left-[2.25rem]"
              aria-hidden="true"
            >
              <span
                data-process-progress="true"
                className="absolute inset-x-0 top-0 block h-full origin-top bg-foreground"
                style={{ transform: "scaleY(0)" }}
              />
            </div>
            {serviceProcessSteps.map((step) => (
              <article
                key={step.number}
                data-process-step="true"
                data-active="false"
                className="group/process relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 gap-y-5 border-white/14 py-7 transition-colors first:border-t-0 not-first:border-t data-[active=true]:border-foreground/36 md:grid-cols-[5rem_1fr] md:gap-8 md:py-8"
              >
                <div className="relative flex justify-center md:block">
                  <span
                    data-process-marker="true"
                    className="relative z-10 grid h-10 w-10 origin-right place-items-center overflow-hidden bg-background text-[11px] font-semibold tracking-[0.22em] text-foreground/70 transition-transform duration-300 ease-out md:-translate-x-[5px] group-data-[active=true]/process:scale-[1.03]"
                  >
                    <span
                      data-process-fill="true"
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-full translate-y-full bg-foreground transition-transform duration-[560ms] ease-[cubic-bezier(0.35,0,0.15,1)] group-data-[active=true]/process:translate-y-0 motion-reduce:transition-none"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-1 bottom-0 z-10 h-px bg-background/35 opacity-0 transition-[transform,opacity] duration-[560ms] ease-[cubic-bezier(0.35,0,0.15,1)] group-data-[active=true]/process:-translate-y-10 group-data-[active=true]/process:opacity-100 motion-reduce:hidden"
                    />
                    <span className="relative z-20 transition-colors delay-150 duration-200 group-data-[active=true]/process:text-background motion-reduce:delay-0">
                      {step.number}
                    </span>
                  </span>
                </div>

                <div className="grid gap-5 lg:grid-cols-[minmax(220px,0.42fr)_1fr] lg:gap-10">
                  <div>
                    <h4 className="text-2xl font-semibold tracking-tight text-foreground/82 transition-colors group-data-[active=true]/process:text-foreground md:text-3xl md:text-foreground/72">
                      {step.title}
                    </h4>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {step.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-white/16 px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-foreground/58 transition-colors group-data-[active=true]/process:border-white/28 group-data-[active=true]/process:text-foreground/78 md:border-white/12 md:text-foreground/48 md:group-data-[active=true]/process:border-white/24 md:group-data-[active=true]/process:text-foreground/72"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="max-w-2xl text-base leading-7 text-muted/86 transition-colors group-data-[active=true]/process:text-muted md:text-muted/72 lg:pt-1">
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
