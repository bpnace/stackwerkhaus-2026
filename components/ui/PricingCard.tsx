import { HashLink } from "@/components/ui/HashLink";
import { LinkRippleText } from "@/components/ui/LinkRippleText";
import type { Offer } from "@/lib/offers";

type PricingCardProps = Offer & {
  ctaHref?: string;
  ctaExternal?: boolean;
  compact?: boolean;
};

export function PricingCard({
  id,
  name,
  priceLabel,
  description,
  ctaLabel,
  suitableFor,
  includes,
  scopeLimits,
  minimumTerm,
  totalCostLabel,
  exitTerms,
  visibleIncludes,
  highlight,
  badge,
  eyebrow,
  ctaHref,
  ctaExternal,
  compact,
}: PricingCardProps) {
  const href = ctaHref ?? `/?angebot=${encodeURIComponent(id)}#kontakt`;
  const isExternalCta = ctaExternal ?? /^https?:\/\//.test(href);
  const sectionLabel = highlight ? "text-background/54" : "text-foreground/54";
  const visibleFeatureCount = visibleIncludes ?? (compact ? 4 : 5);
  const ctaClass = `link-arrow mt-6 w-full justify-between px-4 py-3 transition-opacity hover:opacity-80 ${
    highlight
      ? "bg-background text-foreground"
      : "bg-foreground text-background opacity-92"
  }`;

  return (
    <article
      className={`flex h-full flex-col border-t ${
        highlight
          ? "relative border-foreground bg-foreground px-5 pb-5 pt-6 text-background shadow-[0_0_0_1px_rgba(255,255,255,0.22)]"
          : compact
            ? "border-border py-5"
            : "border-border py-6"
      }`}
    >
      {highlight ? (
        <span className="absolute right-0 bottom-full bg-foreground px-2.5 py-1.5 text-[10px] font-black leading-none uppercase tracking-[0.18em] text-background">
          {badge ?? "Empfehlung"}
        </span>
      ) : badge ? (
        <span className="mb-3 w-fit bg-foreground px-2.5 py-1.5 text-[10px] font-black uppercase leading-none tracking-[0.18em] text-background">
          {badge}
        </span>
      ) : null}
      <div className={compact ? "space-y-2" : "min-h-[8.25rem] space-y-2 md:min-h-[7.25rem]"}>
        <div
          className={`eyebrow ${highlight ? "font-black text-background/62" : ""}`}
        >
          {eyebrow ?? name}
        </div>
        {eyebrow ? (
          <h3 className={`text-2xl font-black tracking-[-0.04em] ${highlight ? "text-background" : "text-foreground"}`}>
            {name}
          </h3>
        ) : null}
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
          className={`max-w-[11ch] text-[clamp(2.45rem,5vw,4.8rem)] font-display font-black leading-[0.86] tracking-[-0.07em] [overflow-wrap:anywhere] ${
            highlight ? "text-background" : "text-foreground"
          }`}
        >
          {priceLabel}
        </div>
      </div>

      <div
        className={`mt-3 grid min-h-[2.125rem] content-start gap-1 text-[10px] uppercase leading-5 tracking-[0.08em] ${
          highlight ? "text-background/58" : "text-muted"
        }`}
      >
        {minimumTerm ? <div>{minimumTerm}</div> : null}
        {totalCostLabel ? <div>{totalCostLabel}</div> : null}
      </div>

      {isExternalCta ? (
        <a href={href} className={ctaClass} target="_blank" rel="noreferrer">
          <LinkRippleText text={ctaLabel} baseWeight={560} />
          <span aria-hidden>+</span>
        </a>
      ) : (
        <HashLink href={href} className={ctaClass}>
          <LinkRippleText text={ctaLabel} baseWeight={560} />
          <span aria-hidden>+</span>
        </HashLink>
      )}

      <div
        className={`mt-6 grid gap-5 border-t pt-5 text-sm leading-6 ${
          highlight
            ? "border-background/14 text-background/78"
            : "border-border/70 text-muted"
        }`}
      >
        <div>
          <div className={`text-[10px] font-black uppercase tracking-[0.24em] ${sectionLabel}`}>
            Geeignet für
          </div>
          <ul className="mt-3 space-y-2">
            {suitableFor.slice(0, 3).map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden>+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className={`text-[10px] font-black uppercase tracking-[0.24em] ${sectionLabel}`}>
            Enthält
          </div>
          <ul className="mt-3 space-y-2">
            {includes.slice(0, visibleFeatureCount).map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden>+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div
            className={`text-[10px] font-black uppercase tracking-[0.24em] ${
              highlight ? "text-background/54" : "text-foreground/54"
            }`}
          >
            Grenzen
          </div>
          <ul className="mt-3 space-y-2">
            {scopeLimits.slice(0, 3).map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden>+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        {exitTerms ? (
          <div>
            <div
              className={`text-[10px] font-black uppercase tracking-[0.24em] ${
                highlight ? "text-background/54" : "text-foreground/54"
              }`}
            >
              Laufzeit & Übergabe
            </div>
            <ul className="mt-3 space-y-2">
              {exitTerms.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden>+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}
