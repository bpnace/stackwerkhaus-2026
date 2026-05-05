"use client";

import { useRef } from "react";
import { testimonials } from "@/lib/site-data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  ScrollTrigger,
  ensureGsap,
  gsap,
  refreshScrollTriggers,
  useGSAP,
  withMotionPreference,
} from "@/lib/gsap";

function getLedgerId(index: number) {
  return `(00${index + 1})`;
}

function applyStatementFocus(statement: HTMLElement, progress: number) {
  const clampedProgress = gsap.utils.clamp(0, 1, progress);
  const centerDistance = Math.min(
    Math.abs(clampedProgress - 0.5) / 0.5,
    1,
  );
  const focus = 1 - centerDistance;
  const smoothedFocus = focus * focus * (3 - 2 * focus);
  const blur = gsap.utils.interpolate(16, 0, smoothedFocus);
  const opacity = gsap.utils.interpolate(0.28, 1, smoothedFocus);
  const travel = gsap.utils.interpolate(8, -8, clampedProgress);
  const y = travel * (1 - smoothedFocus * 0.82);

  gsap.set(statement, {
    autoAlpha: opacity,
    filter: `blur(${blur.toFixed(2)}px)`,
    y,
  });
}

export function Testimonials() {
  const scope = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      ensureGsap();

      const root = scope.current;
      if (!root) {
        return;
      }

      const statements = gsap.utils.toArray<HTMLElement>(
        "[data-testimonial-statement='true']",
        root,
      );
      const rows = gsap.utils.toArray<HTMLElement>(
        "[data-testimonial-row='true']",
        root,
      );

      const cleanup = withMotionPreference({
        reduce: () => {
          gsap.set(statements, {
            autoAlpha: 1,
            filter: "blur(0px)",
            y: 0,
            clearProps: "willChange",
          });
        },
        motion: () => {
          rows.forEach((row) => {
            const statement = row.querySelector<HTMLElement>(
              "[data-testimonial-statement='true']",
            );

            if (!statement) {
              return;
            }

            gsap.set(statement, {
              willChange: "filter, opacity, transform",
            });

            ScrollTrigger.create({
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              onUpdate: (self) => {
                applyStatementFocus(statement, self.progress);
              },
              onRefresh: (self) => {
                applyStatementFocus(statement, self.progress);
              },
            });
          });

          refreshScrollTriggers();
        },
      });

      return () => {
        cleanup();
      };
    },
    { scope, revertOnUpdate: true },
  );

  return (
    <section className="section-space overflow-clip">
      <div ref={scope} className="section-shell">
        <SectionHeader id="stimmen" label="Stimmen aus Projekten" marker="(SKWKHS® — 06)" />

        <div className="mb-10 max-w-4xl space-y-4 md:mb-16">
          <h2 className="display-lg">
            Ist ganz gut geworden, wäre untertrieben.
          </h2>
          <p className="text-lg leading-8 text-muted">
            Die Rückmeldungen aus Projekten zeigen ziemlich klar, worauf es am
            Ende ankommt: Erkenntnis, Performance, Vertrauen und dieses Gefühl,
            dass endlich alles an seinem Platz ist.
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/14" />
          <div className="pointer-events-none absolute inset-y-0 right-[8%] hidden w-px bg-white/6 lg:block" />

          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <article
                key={testimonial.name}
                data-testimonial-row="true"
                className="grid gap-8 border-b border-white/10 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[96px_minmax(220px,0.34fr)_minmax(0,1fr)] lg:gap-10"
              >
                <div className="flex items-start justify-between gap-4 text-[11px] uppercase tracking-[0.34em] text-white/55">
                  <span>{getLedgerId(index)}</span>
                  <span className="lg:hidden">Voice</span>
                </div>

                <div className="space-y-6 lg:border-r lg:border-white/10 lg:pr-8">
                  <div>
                    <h3 className="mt-3 font-display text-[clamp(2rem,5vw,3.8rem)] font-black uppercase leading-[0.84] tracking-[-0.07em] text-foreground">
                      {testimonial.name}
                    </h3>
                  </div>

                  <div className="grid gap-3 border-t border-white/10 pt-4 text-[11px] uppercase tracking-[0.3em] text-white/60">
                    <div>{testimonial.company}</div>
                    <div>{`Log ${index + 1} / verified project note`}</div>
                  </div>
                </div>

                <div className="space-y-6 lg:space-y-8">
                  <div className="grid gap-4 border-b border-white/10 pb-5 md:grid-cols-[minmax(120px,0.18fr)_minmax(0,1fr)] md:items-start">
                    <div className="text-[11px] uppercase tracking-[0.34em] text-white/55">
                      Statement*
                    </div>
                    <div
                      data-testimonial-statement="true"
                      className="max-w-[13ch] font-display text-[clamp(2.2rem,6vw,5.4rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-foreground"
                    >
                      {testimonial.highlight}
                    </div>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(180px,0.42fr)] lg:items-end">
                    <p className="max-w-3xl text-base leading-8 text-foreground/90 md:text-lg">
                      “{testimonial.quote}”
                    </p>

                    <div className="space-y-2 text-[11px] uppercase tracking-[0.3em] text-white/60">
                      <div>Status / <b>Delivered</b></div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="grid gap-4 px-6 py-5 text-[11px] uppercase tracking-[0.32em] text-white/55 md:px-10 lg:grid-cols-[1fr_auto_auto] lg:items-center">
            <span>(SKWKHS®)</span>
            <span>[Website, Frontend, Relaunch]</span>
          </div>
        </div>
      </div>
    </section>
  );
}
