import { HashLink } from "@/components/ui/HashLink";
import { LinkRippleText } from "@/components/ui/LinkRippleText";
import type { PricingTier } from "@/lib/site-data";

type PricingCardProps = PricingTier;

export function PricingCard({
  name,
  price,
  originalPrice,
  discountLabel,
  decision,
  description,
  timeline,
  pages,
  features,
  highlight,
}: PricingCardProps) {
  const includedFeatures = features.filter((feature) => feature.enabled);
  const excludedFeatures = features.filter((feature) => !feature.enabled);

  return (
    <article
      className={`flex h-full max-w-[340px] flex-col ${
        highlight
          ? "relative bg-foreground px-5 pb-5 pt-6 text-background shadow-[0_0_0_1px_rgba(255,255,255,0.22)] xl:-mt-4"
          : "py-2"
      }`}
    >
      {highlight ? (
        <span className="absolute right-0 bottom-full bg-foreground px-2.5 py-1.5 text-[10px] font-black leading-none uppercase tracking-[0.18em] text-background">
          Empfehlung
        </span>
      ) : null}
      <div className="space-y-2">
        <div>
          <div
            className={`eyebrow ${
              highlight ? "font-black text-background/62" : ""
            }`}
          >
            {name}
          </div>
        </div>
        <p
          className={`text-xs font-black uppercase tracking-[0.18em] ${
            highlight ? "whitespace-nowrap text-background" : "text-foreground"
          }`}
        >
          {decision}
        </p>
        <p
          className={`max-w-[35ch] text-sm leading-6 ${
            highlight ? "text-background/68" : "text-muted"
          }`}
        >
          {description}
        </p>
      </div>

      <div className="mt-7">
        <div
          className={`text-[clamp(3rem,5.8vw,5.4rem)] font-display font-black leading-none tracking-[-0.07em] ${
            highlight ? "text-background" : "text-foreground"
          }`}
        >
          <span
            className={`mr-2 text-[0.18em] font-sans font-medium tracking-normal ${
              highlight ? "text-background/56" : "text-muted"
            }`}
          >
            ab
          </span>
          {price}
          <span className="ml-1 text-[0.34em] tracking-[-0.04em]"> €</span>
        </div>
      </div>

      <div
        className={`mt-2 grid min-h-[2.125rem] content-start gap-1 text-[10px] uppercase ${
          highlight ? "text-background/58" : "text-muted"
        }`}
      >
        <div className="tracking-[0.22em]">
          {pages} / {timeline}
        </div>
        {originalPrice || discountLabel ? (
          <div className="whitespace-nowrap tracking-[0.08em]">
            {originalPrice ? (
              <>
                <span>statt </span>
                <span className="line-through decoration-current">
                  {originalPrice} €
                </span>
              </>
            ) : null}
            {originalPrice && discountLabel ? <span> / </span> : null}
            {discountLabel ? (
              <span
                className={`font-black ${
                  highlight ? "text-background" : "text-foreground"
                }`}
              >
                {discountLabel}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>

      <HashLink
        href={`/?paket=${encodeURIComponent(name)}#kontakt`}
        className={`link-arrow mt-6 w-full justify-between px-4 py-3 transition-opacity hover:opacity-80 ${
          highlight
            ? "bg-background text-foreground"
            : "bg-foreground text-background opacity-92"
        }`}
      >
        <LinkRippleText text="Jetzt Anfragen" baseWeight={560} />
      </HashLink>

      <div className="mt-6 space-y-3 text-sm">
        <ul className="space-y-2.5">
          {includedFeatures.map((feature) => (
            <li
              key={feature.label}
              className={`flex items-start gap-3 ${
                highlight ? "text-background/88" : "text-foreground/92"
              }`}
            >
              <span
                className={`mt-0.5 text-sm ${
                  highlight ? "text-background" : "text-foreground"
                }`}
                aria-hidden
              >
                +
              </span>
              <span>{feature.label}</span>
            </li>
          ))}
        </ul>

        {excludedFeatures.length > 0 ? (
          <ul
            className={`space-y-2.5 border-t pt-3 ${
              highlight ? "border-background/12" : "border-border/70"
            }`}
          >
            {excludedFeatures.map((feature) => (
              <li
                key={feature.label}
                className={`flex items-start gap-3 ${
                  highlight ? "text-background/38" : "text-muted/48"
                }`}
              >
                <span
                  className={`mt-0.5 text-sm ${
                    highlight ? "text-background/30" : "text-muted/38"
                  }`}
                  aria-hidden
                >
                  -
                </span>
                <span>{feature.label}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
