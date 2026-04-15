import Link from "next/link";
import { LinkRippleText } from "@/components/ui/LinkRippleText";
import type { PricingTier } from "@/lib/site-data";

type PricingCardProps = PricingTier;

export function PricingCard({
  name,
  price,
  description,
  timeline,
  pages,
  features,
  highlight,
}: PricingCardProps) {
  return (
    <article
      className={`flex h-full flex-col rounded-[2rem] border px-6 py-6 md:px-8 ${
        highlight
          ? "border-white/24 bg-white/[0.045] shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
          : "border-border bg-surface"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <div className={`eyebrow ${highlight ? "text-foreground/88" : ""}`}>
            {name}
          </div>
          <div className="display-lg leading-none">
            {price}
            <span className="text-[0.26em] align-top"> €</span>
            <span className="ml-2 text-[0.18em] align-middle font-sans font-medium tracking-normal text-muted">
              einmalig
            </span>
          </div>
        </div>
        {highlight ? (
          <span className="chip border-white/18 text-foreground/88">
            Meist gewählt
          </span>
        ) : null}
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="text-2xl font-semibold tracking-tight text-foreground">
          {name}
        </h3>
        <p className="max-w-[30ch] text-lg leading-8 text-muted">{description}</p>
      </div>

      <div className="mt-8 grid gap-2 border-t border-border pt-5 text-[11px] uppercase tracking-[0.3em] text-muted sm:grid-cols-2">
        <div>Umfang · {pages}</div>
        <div>Zeitrahmen · {timeline}</div>
      </div>

      <Link
        href="/#kontakt"
        className={`link-arrow mt-8 w-full justify-between border px-5 py-4 ${
          highlight
            ? "border-white/22 bg-white/[0.04] hover:border-white/38"
            : "border-border hover:border-foreground/34"
        }`}
      >
        <LinkRippleText text="Projekt anfragen" baseWeight={560} />
        <span aria-hidden>↘</span>
      </Link>

      <ul className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
        {features.map((feature) => (
          <li
            key={feature.label}
            className={`flex items-start gap-3 ${
              feature.enabled ? "text-foreground/92" : "text-muted/62"
            }`}
          >
            <span
              className={`mt-0.5 text-sm ${
                feature.enabled ? "text-foreground" : "text-muted/48"
              }`}
              aria-hidden
            >
              ✓
            </span>
            <span>{feature.label}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8 text-[11px] uppercase tracking-[0.28em] text-muted">
        Von Strategie bis Launch sauber umgesetzt
      </div>
    </article>
  );
}
