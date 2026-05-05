"use client";

import { useEffect, useRef } from "react";
import { tickerItems } from "@/lib/site-data";

type KillableTween = {
  kill: () => void;
};

function shouldUseStaticTicker() {
  return (
    window.matchMedia("(max-width: 767px)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function Ticker() {
  const scope = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
      if (shouldUseStaticTicker()) {
        return;
      }

      const track = scope.current?.querySelector<HTMLElement>(".ticker-track");
      if (!track) {
        return;
      }

      let tween: KillableTween | null = null;
      let cancelled = false;

      void import("@/lib/gsap").then(({ ensureGsap, gsap }) => {
        if (cancelled) {
          return;
        }

        ensureGsap();
        tween = gsap.to(track, {
          xPercent: -50,
          duration: 24,
          ease: "none",
          repeat: -1,
        });
      });

      return () => {
        cancelled = true;
        tween?.kill();
      };
  }, []);

  const items = [...tickerItems, ...tickerItems];

  return (
    <section className="overflow-hidden border-y border-border bg-white text-black">
      <div ref={scope} className="py-4">
        <div className="ticker-track flex w-max gap-10 whitespace-nowrap px-6 md:gap-16 md:px-12">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="text-[length:var(--label)] font-medium uppercase tracking-[0.32em]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
