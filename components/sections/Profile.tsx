"use client";

import { Fragment, useRef } from "react";
import { skills } from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";
import { GithubContributionGrid } from "@/components/ui/GithubContributionGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  ensureGsap,
  gsap,
  refreshScrollTriggers,
  useGSAP,
  withMotionPreference,
} from "@/lib/gsap";

function renderProfileName(name: string) {
  const words = name.split(" ");

  return words.map((word, wordIndex) => (
    <Fragment key={`${word}-${wordIndex}`}>
      <span className="profile-name-word">
        {Array.from(word).map((character, charIndex) => (
          <span
            key={`${word}-${charIndex}`}
            className="profile-name-char"
          >
            <span className="profile-name-outline">{character}</span>
            <span className="profile-name-fill">{character}</span>
          </span>
        ))}
      </span>
      {wordIndex < words.length - 1 ? " " : null}
    </Fragment>
  ));
}

export function Profile() {
  const scope = useRef<HTMLDivElement | null>(null);
  const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME?.trim();
  const githubProfileUrl = githubUsername
    ? `https://github.com/${githubUsername}`
    : undefined;

  useGSAP(
    () => {
      ensureGsap();

      const root = scope.current;
      if (!root) {
        return;
      }

      const title = root.querySelector<HTMLElement>(".profile-name");
      const fills = Array.from(
        root.querySelectorAll<HTMLElement>(".profile-name-fill"),
      );

      const cleanup = withMotionPreference({
        reduce: () => {
          gsap.set(fills, { clipPath: "inset(0% 0 0 0)" });
        },
        motion: () => {
          if (!title || !fills.length) {
            return;
          }

          gsap.set(fills, { clipPath: "inset(100% 0 0 0)" });

          gsap.timeline({
            scrollTrigger: {
              trigger: title,
              start: "top 82%",
              end: "top 46%",
              scrub: 0.85,
            },
          }).to(fills, {
            clipPath: "inset(0% 0 0 0)",
            ease: "none",
            stagger: 0.055,
          });
          refreshScrollTriggers();
        },
      });

      return cleanup;
    },
    { scope, revertOnUpdate: true },
  );

  return (
    <section className="section-space">
      <div
        ref={scope}
        className="section-shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]"
      >
        <div className="min-w-0">
          <SectionHeader label="Profil" marker="(SKWKHS® — 04)" />
          <div className="profile-copy space-y-6">
            <div className="profile-name display-md">
              {renderProfileName(siteConfig.founder)}
            </div>
            <p className="text-base leading-7 text-muted md:text-lg md:leading-8">
              Webdesigner und Frontend-Entwickler aus Berlin. Stackwerkhaus
              verbindet Positionierung, Inhaltsführung, Design und technische
              Umsetzung, damit Websites nicht nur präsent sind, sondern präziser
              führen.
            </p>
            {githubUsername ? (
              <a
                href={githubProfileUrl}
                target="_blank"
                rel="noreferrer"
                className="profile-github-link mt-4 block w-full text-left"
                aria-label="GitHub-Commit-Aktivität"
                title="GitHub Contributions"
              >
                <GithubContributionGrid
                  username={githubUsername}
                  fallbackSrc={`https://github-contributions-api.deno.dev/${encodeURIComponent(githubUsername)}.svg?scheme=grey&bg=020202&no-legend=true`}
                  fallbackAlt={`${githubUsername} Contribution Graph`}
                />
              </a>
            ) : null}
            {githubUsername && githubProfileUrl ? (
              <a
                href={githubProfileUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-muted transition hover:text-foreground"
                aria-label="GitHub Profil öffnen"
                title="GitHub Profil"
              >
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 .296C5.373.296 0 5.669 0 12.297c0 5.281 3.438 9.768 8.205 11.39.6.11.82-.26.82-.577 0-.285-.01-1.04-.016-2.043-3.338.725-4.043-1.611-4.043-1.611-.546-1.386-1.335-1.755-1.335-1.755-1.09-.744.083-.731.083-.731 1.205.086 1.84 1.238 1.84 1.238 1.072 1.836 2.813 1.306 3.498.999.109-.776.418-1.306.761-1.606-2.665-.304-5.467-1.334-5.467-5.935 0-1.309.468-2.381 1.236-3.221-.124-.305-.536-1.532.117-3.197 0 0 1.008-.323 3.3 1.23a11.45 11.45 0 0 1 6.004 0c2.29-1.553 3.295-1.23 3.295-1.23.655 1.665.244 2.893.12 3.198.77.84 1.233 1.912 1.233 3.221 0 4.611-2.804 5.628-5.478 5.924.429.371.823 1.103.823 2.224 0 1.604-.014 2.895-.014 3.287 0 .32.216.694.825.576C20.565 22.05 24 17.565 24 12.297 24 5.669 18.627.296 12 .296Z" />
                </svg>
                <span className="text-xs uppercase tracking-[0.22em]">Github Profil</span>
              </a>
            ) : null}
          </div>
        </div>

        <div className="grid min-w-0 gap-x-8 sm:grid-cols-2">
          {skills.map((skill) => (
            <div key={skill} className="border-t border-border py-3 text-sm text-foreground/90">
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
