"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { ensureGsap, gsap, shouldReduceMotion, useGSAP } from "@/lib/gsap";
import {
  useBodyScrollLock,
  useHomeIntroCovered,
  useHomeNavReady,
  useNavScrolled,
} from "@/components/layout/nav-hooks";
import { LinkRippleText } from "@/components/ui/LinkRippleText";

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
  const scrolled = useNavScrolled(32);
  useBodyScrollLock(open);
  const homeIntroCovered = useHomeIntroCovered(pathname);
  const homeNavReady = useHomeNavReady(pathname);
  const useIntroNavState = pathname === "/";
  const introCovered = pathname !== "/" || homeIntroCovered;
  const navReady = pathname !== "/" || homeNavReady;

  useGSAP(
    () => {
      ensureGsap();

      if (!panelRef.current) {
        return;
      }

      if (shouldReduceMotion()) {
        gsap.set(panelRef.current, {
          autoAlpha: open ? 1 : 0,
          y: open ? 0 : -24,
          pointerEvents: open ? "auto" : "none",
        });
        return;
      }

      gsap.to(panelRef.current, {
        autoAlpha: open ? 1 : 0,
        y: open ? 0 : -24,
        duration: 0.35,
        ease: "power3.out",
        pointerEvents: open ? "auto" : "none",
      });
    },
    { dependencies: [open], scope, revertOnUpdate: true },
  );

  useGSAP(
    () => {
      ensureGsap();

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
        gsap.set(targets, {
          autoAlpha: 1,
          filter: "blur(0px)",
          visibility: "visible",
        });
        return;
      }

      if (shouldReduceMotion()) {
        gsap.set(targets, {
          autoAlpha: 1,
          filter: "blur(0px)",
          visibility: "visible",
        });
        introNavAnimated.current = true;
        return;
      }

      gsap.set(targets, {
        autoAlpha: 0,
        filter: "blur(8px)",
        visibility: "visible",
      });

      const startAnimation = () => {
        gsap.to(targets, {
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
      return () => {
        window.removeEventListener("load", onLoad);
      };
    },
    { dependencies: [useIntroNavState, navReady], scope, revertOnUpdate: true },
  );

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
          : scrolled
            ? "bg-black/80 opacity-100 backdrop-blur-xl"
          : "bg-transparent opacity-100"
      }`}
    >
      <div className="section-shell flex h-20 items-center justify-between">
        <Link
          href="/"
          className="text-[11px] font-black uppercase text-foreground md:text-[13px]"
        >
          {renderAnimatedNavLabel(siteConfig.name)}
        </Link>

        <nav className="hidden items-center gap-7 text-[length:var(--label)] uppercase tracking-[0.34em] text-muted md:flex">
          {siteConfig.navigation.map((item) => (
            <Link
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
            </Link>
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
        className="pointer-events-none absolute inset-x-0 top-full border-t border-border bg-black/96 px-6 py-8 opacity-0 md:hidden"
      >
        <nav className="flex flex-col gap-5 text-xl font-bold tracking-[-0.04em] text-foreground">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="hover-weight-link border-b border-border pb-4"
            >
              <LinkRippleText text={item.label} baseWeight={700} />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
