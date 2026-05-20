import type { ReactNode } from "react";
import { PinnedIntroController } from "@/components/sections/PinnedIntroController";

type PinnedIntroShellProps = {
  hero: ReactNode;
  children: ReactNode;
};

export function PinnedIntroShell({
  hero,
  children,
}: PinnedIntroShellProps) {
  return (
    <div data-pinned-intro-shell="true" className="relative">
      <div
        data-pinned-hero-panel="true"
        className="sticky top-20 z-0 min-h-[calc(100svh-5rem)] md:top-24 md:min-h-[calc(100svh-6rem)]"
      >
        {hero}
        <div
          data-pinned-hero-scrim="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 -top-20 z-10 bg-black opacity-0 md:-top-24"
          aria-hidden="true"
        />
      </div>
      <div
        data-pinned-body-sheet="true"
        className="relative z-20 bg-background"
      >
        {children}
      </div>
      <PinnedIntroController />
    </div>
  );
}
