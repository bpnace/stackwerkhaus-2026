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
    <article className="flex h-full max-w-[340px] flex-col py-2">
      <div className="space-y-2">
        <div
          className={`eyebrow ${highlight ? "font-black text-foreground" : ""}`}
        >
          {name}
        </div>
        <p className="max-w-[35ch] text-sm leading-6 text-muted">{description}</p>
      </div>

      <div className="mt-7">
        <div className="text-[clamp(3rem,5.8vw,5.4rem)] font-display font-black leading-none tracking-[-0.07em] text-foreground">
          <span className="mr-2 text-[0.18em] font-sans font-medium tracking-normal text-muted">
            ab
          </span>
          {price}
          <span className="ml-1 text-[0.34em] tracking-[-0.04em]"> €</span>
        </div>
      </div>

      <div className="mt-2 grid gap-1 text-[10px] uppercase tracking-[0.28em] text-muted">
        <div>{pages}</div>
        <div>{timeline}</div>
      </div>

      <Link
        href={`/?paket=${encodeURIComponent(name)}#kontakt`}
        className={`link-arrow mt-6 w-full justify-between bg-foreground px-4 py-3 text-background transition-opacity hover:opacity-80 ${
          highlight ? "opacity-100" : "opacity-92"
        }`}
      >
        <LinkRippleText text="Jetzt Anfragen" baseWeight={560} />
      </Link>

      <ul className="mt-6 space-y-2.5 text-sm">
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
              +
            </span>
            <span>{feature.label}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
