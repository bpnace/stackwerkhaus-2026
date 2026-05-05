"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import {
  useBodyScrollLock,
  useHomeIntroCovered,
  useHomeNavReady,
} from "@/components/layout/nav-hooks";
import { LinkRippleText } from "@/components/ui/LinkRippleText";
import { HashLink } from "@/components/ui/HashLink";

type KillableTween = {
  kill: () => void;
};

function shouldReduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isMobileViewport() {
  return window.matchMedia("(max-width: 767px)").matches;
}

function revealNavTargets(targets: HTMLElement[]) {
  targets.forEach((target) => {
    target.style.opacity = "1";
    target.style.visibility = "visible";
    target.style.filter = "blur(0px)";
  });
}

function renderAnimatedNavLabel(text: string) {
  return (
    <span className="nav-word" aria-label={text}>
      {Array.from(text).map((character, index) => (
        <span key={`${text}-${index}`} className="nav-letter" aria-hidden="true">
          {character}
        </span>
      ))}
    </span>
  );
}

function renderDesktopNavLabel(
  text: string,
  options?: {
    useRipple?: boolean;
    persistentRipple?: boolean;
  },
) {
  if (options?.useRipple) {
    return (
      <LinkRippleText
        text={text}
        baseWeight={520}
        persistentActive={Boolean(options.persistentRipple)}
      />
    );
  }

  return renderAnimatedNavLabel(text);
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const scope = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const introNavAnimated = useRef(false);
  useBodyScrollLock(open);
  const homeIntroCovered = useHomeIntroCovered(pathname);
  const homeNavReady = useHomeNavReady(pathname);
  const useIntroNavState = pathname === "/";
  const introCovered = pathname !== "/" || homeIntroCovered;
  const navReady = pathname !== "/" || homeNavReady;

  useEffect(() => {
      if (!useIntroNavState || !navReady) {
        return;
      }

      const navRoot = scope.current;
      if (!navRoot) {
        return;
      }

      const letters = Array.from(
        navRoot.querySelectorAll<HTMLElement>(".nav-letter"),
      );
      const contactBaseLetters = Array.from(
        navRoot.querySelectorAll<HTMLElement>(
          ".nav-contact-link .link-ripple-base",
        ),
      );
      const targets = [...letters, ...contactBaseLetters];

      if (!targets.length) {
        return;
      }

      if (introNavAnimated.current) {
        revealNavTargets(targets);
        return;
      }

      if (isMobileViewport() || shouldReduceMotion()) {
        revealNavTargets(targets);
        introNavAnimated.current = true;
        return;
      }

      let tween: KillableTween | null = null;
      let cancelled = false;
      let cleanupLoadListener: (() => void) | null = null;

      void import("@/lib/gsap").then(({ ensureGsap, gsap }) => {
        if (cancelled) {
          return;
        }

        ensureGsap();

        gsap.set(targets, {
          autoAlpha: 0,
          filter: "blur(8px)",
          visibility: "visible",
        });

        const startAnimation = () => {
          tween = gsap.to(targets, {
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.44,
            ease: "power3.out",
            stagger: {
              each: 0.02,
              from: "random",
            },
            overwrite: true,
            onComplete: () => {
              introNavAnimated.current = true;
            },
          });
        };

        const scheduleAnimation = () => {
          requestAnimationFrame(() => {
            requestAnimationFrame(startAnimation);
          });
        };

        if (document.readyState === "complete") {
          scheduleAnimation();
          return;
        }

        const onLoad = () => {
          scheduleAnimation();
        };

        window.addEventListener("load", onLoad, { once: true });
        cleanupLoadListener = () => {
          window.removeEventListener("load", onLoad);
        };
      });

      return () => {
        cancelled = true;
        cleanupLoadListener?.();
        tween?.kill();
      };
  }, [useIntroNavState, navReady]);

  return (
    <div
      ref={scope}
      data-site-nav="true"
      data-nav-ready={navReady ? "true" : "false"}
      style={{ viewTransitionName: "site-header" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        useIntroNavState
          ? introCovered
            ? "bg-black/80 opacity-100 backdrop-blur-xl"
            : "bg-transparent opacity-100"
          : "bg-black/80 opacity-100 backdrop-blur-xl"
      }`}
    >
      <div className="section-shell flex h-20 items-center justify-between">
        <HashLink
          href="/"
          className="text-[11px] font-black uppercase text-foreground md:text-[13px]"
        >
          {renderAnimatedNavLabel(siteConfig.name)}
        </HashLink>

        <nav className="hidden items-center gap-7 text-[length:var(--label)] uppercase tracking-[0.34em] text-muted md:flex">
          {siteConfig.navigation.map((item) => (
            <HashLink
              key={item.href}
              href={item.href}
              className={`hover-weight-link hover:text-foreground ${
                item.label === "Kontakt"
                  ? `nav-contact-link ${introCovered ? "text-foreground" : ""}`
                  : ""
              }`}
            >
              {renderDesktopNavLabel(
                item.label,
                item.label === "Kontakt"
                  ? {
                      useRipple: true,
                      persistentRipple: introCovered,
                    }
                  : undefined,
              )}
            </HashLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="eyebrow text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {renderAnimatedNavLabel(open ? "Schließen" : "Menü")}
        </button>
      </div>

      <div
        id="mobile-nav"
        ref={panelRef}
        className={`absolute inset-x-0 top-full border-t border-border bg-black/96 px-6 py-8 transition duration-300 ease-out md:hidden ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-6 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-5 text-xl font-bold tracking-[-0.04em] text-foreground">
          {siteConfig.navigation.map((item) => (
            <HashLink
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="hover-weight-link border-b border-border pb-4"
            >
              <LinkRippleText text={item.label} baseWeight={700} />
            </HashLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
