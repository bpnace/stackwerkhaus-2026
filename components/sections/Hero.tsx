"use client";

import { useRef } from "react";
import { ensureGsap, gsap, shouldReduceMotion, useGSAP } from "@/lib/gsap";
import { siteConfig } from "@/lib/site-config";
import { HashLink } from "@/components/ui/HashLink";
import { LinkRippleText } from "@/components/ui/LinkRippleText";
import { StaggeredCycle } from "@/components/ui/StaggeredCycle";

const heroTitleLines = ["Deine digitalen", "Architekten"] as const;
const heroServiceTags = [
  "Manche Websites sind Penthouse. Manche Plattenbau. Viele leider Rohbau.",
] as const;

function renderTitleLine(line: string) {
  const words = line.split(" ");

  return words.map((word, index) => (
    <span key={`${line}-${word}-${index}`}>
      <span className="hero-word">
        <span className="hero-word-text">
          {Array.from(word).map((character, charIndex) => (
            <span
              key={`${word}-${charIndex}`}
              className={`hero-char${
                word === "Deine" && charIndex === word.length - 1
                  ? " pr-[0.08em]"
                  : ""
              }`}
            >
              {character}
            </span>
          ))}
        </span>
        <span className="hero-word-mask" aria-hidden />
      </span>
      {index < words.length - 1 ? " " : null}
    </span>
  ));
}

export function Hero() {
  const scope = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      ensureGsap();
      if (scope.current) {
        scope.current.dataset.heroIntro = "ready";
      }

      const markHeroIntroReady = () => {
        document.documentElement.dataset.homeHeroIntroReady = "true";
        window.dispatchEvent(new CustomEvent("home-hero-intro-ready"));
      };

      const wordTexts = gsap.utils.toArray<HTMLElement>(".hero-word-text");
      const chars = gsap.utils.toArray<HTMLElement>(".hero-char");
      const masks = gsap.utils.toArray<HTMLElement>(".hero-word-mask");
      const lines = gsap.utils.toArray<HTMLElement>(".hero-line");
      const copy = gsap.utils.toArray<HTMLElement>(".hero-copy");
      const actions = gsap.utils.toArray<HTMLElement>(".hero-action");

      const wordTimelineEntries: Array<{
        mask: HTMLElement;
        chars: HTMLElement[];
        startAt: number;
      }> = [];

      lines.forEach((line) => {
        const lineMasks = gsap.utils.toArray<HTMLElement>(
          ".hero-word-mask",
          line,
        );
        const lineTexts = gsap.utils.toArray<HTMLElement>(
          ".hero-word-text",
          line,
        );

        lineMasks.forEach((mask, lineWordIndex) => {
          const text = lineTexts[lineWordIndex];
          if (!text) {
            return;
          }

          wordTimelineEntries.push({
            mask,
            chars: gsap.utils.toArray<HTMLElement>(".hero-char", text),
            startAt: lineWordIndex * 0.32,
          });
        });
      });

      if (shouldReduceMotion()) {
        gsap.set([...wordTexts, ...chars, ...copy, ...actions], {
          autoAlpha: 1,
          y: 0,
          yPercent: 0,
          filter: "blur(0px)",
        });
        gsap.set(masks, { autoAlpha: 0, scaleX: 0, xPercent: 0 });
        markHeroIntroReady();
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

      document.documentElement.dataset.homeHeroIntroReady = "false";

      const timeline = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: markHeroIntroReady,
      });

      wordTimelineEntries.forEach(({ mask, chars: wordChars, startAt }) => {
        timeline
          .to(
            mask,
            {
              scaleX: 1,
              duration: 0.42,
              ease: "expo.out",
            },
            startAt,
          )
          .to(
            mask,
            {
              xPercent: 102,
              duration: 0.5,
              ease: "power2.inOut",
              onComplete: () => {
                gsap.set(mask, { autoAlpha: 0 });
              },
            },
            ">",
          )
          .to(
            wordChars,
            {
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.42,
              stagger: 0.03,
              ease: "power3.out",
            },
            "<0.08",
          );
      });

      timeline
        .from(
          copy,
          {
            autoAlpha: 0,
            y: 24,
            duration: 0.55,
            stagger: 0.1,
          },
          "+=0.08",
        )
        .from(
          actions,
          {
            autoAlpha: 0,
            y: 18,
            duration: 0.45,
            stagger: 0.08,
          },
          "-=0.2",
        );
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      data-hero-intro="loading"
      className="relative flex min-h-[calc(100svh-5rem)] items-start pb-12 pt-10 md:min-h-[calc(100svh-6rem)] md:items-end md:pb-0 md:pt-0"
    >
      <div className="section-shell grid w-full gap-10 md:gap-14 xl:items-start">
        <div>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-6">
            <div className="hero-copy eyebrow text-foreground/75">SKWKHS</div>
            <div className="hero-copy hidden md:block md:text-right">
              <a
                href={`mailto:${siteConfig.email}`}
                className="link-arrow text-foreground"
              >
                <LinkRippleText text="Kontakt" baseWeight={560} />
              </a>
              <div className="text-[11px] uppercase tracking-[0.32em] text-muted">
                {siteConfig.location}
              </div>
            </div>
          </div>
          <h1 className="mt-8 space-y-2.5 md:mt-0 md:space-y-3">
            {heroTitleLines.map((line, index) => (
              <span
                key={line}
                className={`hero-line display-xl${
                  index === 1 ? " -mt-[0.12em] md:mt-0" : ""
                }`}
              >
                {renderTitleLine(line)}
              </span>
            ))}
          </h1>
          <div className="hero-copy mt-8 flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] leading-[1.65] uppercase tracking-[0.28em] text-muted md:mt-5 md:gap-x-6 md:gap-y-2 md:text-xs md:tracking-[0.38em]">
            {heroServiceTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="hero-copy mt-8 grid gap-5 md:mt-5 md:gap-6 lg:grid-cols-[max-content_minmax(260px,360px)] lg:items-start lg:justify-between">
            <div className="min-w-[9ch]">
              <StaggeredCycle words={["Planen.", "Bauen.", "Liefern."]} />
            </div>
            <div className="grid w-full max-w-[360px] grid-cols-1 gap-4 justify-self-center md:gap-3">
              <HashLink
                href="/webseitecheck"
                className="hero-action link-arrow w-full justify-between gap-2 border border-foreground bg-foreground px-3 py-4 text-left text-[9px] leading-[1.35] tracking-[0.2em] text-background hover:bg-foreground/90 md:w-auto md:justify-start md:gap-3 md:px-6 md:text-[11px] md:tracking-[0.24em]"
              >
                <span className="md:hidden">
                  Der Stackwerkhaus
                  <br />
                  Webseitecheck
                </span>
                <span className="hidden md:inline">
                  <LinkRippleText
                    text="Der Stackwerkhaus Webseitecheck"
                    baseWeight={560}
                  />
                </span>{" "}
              </HashLink>
              <HashLink
                href="/#leistungen"
                className="hero-action link-arrow w-full justify-between gap-2 whitespace-nowrap px-3 py-4 text-[9px] tracking-[0.2em] text-muted hover:text-foreground md:w-auto md:justify-start md:gap-3 md:px-6 md:text-[11px] md:tracking-[0.34em] md:whitespace-normal"
              >
                <LinkRippleText text="Unsere Bauwerke" baseWeight={560} />{" "}
                <span aria-hidden>✚</span>
              </HashLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
