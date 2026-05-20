import { siteConfig } from "@/lib/site-config";
import { TrackedHashLink } from "@/components/analytics/TrackedHashLink";
import { HeroIntroController } from "@/components/sections/HeroIntroController";
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
  return (
    <section
      data-home-hero="true"
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
          <h1 className="mt-8 md:mt-0">
            <span className="hero-mobile-title display-xl md:hidden">
              <span>Deine digitalen</span>
              <span>Architekten</span>
            </span>
            <span className="hidden space-y-3 md:block">
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
            </span>
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
              <TrackedHashLink
                href="/webseitecheck"
                eventName="website_check_cta_click"
                eventParams={{ placement: "home_hero_primary" }}
                className="hero-action link-arrow w-full justify-between gap-2 border border-foreground bg-foreground px-3 py-4 text-left text-[9px] leading-[1.35] tracking-[0.2em] text-background hover:bg-foreground/90 md:w-auto md:justify-start md:gap-3 md:px-6 md:text-[11px] md:tracking-[0.24em]"
              >
                <span className="md:hidden">
                  Website checken
                </span>
                <span className="hidden md:inline">
                  <LinkRippleText
                    text="Website checken"
                    baseWeight={560}
                  />
                </span>{" "}
                <span aria-hidden>✚</span>
              </TrackedHashLink>
              <HashLink
                href="/#leistungen"
                className="hero-action link-arrow w-full justify-between gap-2 whitespace-nowrap px-3 py-4 text-[9px] tracking-[0.2em] text-muted hover:text-foreground md:w-auto md:justify-start md:gap-3 md:px-6 md:text-[11px] md:tracking-[0.34em] md:whitespace-normal"
              >
                <LinkRippleText text="Bauplan ansehen" baseWeight={560} />{" "}
                <span aria-hidden>✚</span>
              </HashLink>
            </div>
          </div>
        </div>
      </div>
      <HeroIntroController />
    </section>
  );
}
