import { maintenanceOffer, pricingTiers } from "@/lib/site-data";
import { TrackedHashLink } from "@/components/analytics/TrackedHashLink";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PricingCard } from "@/components/ui/PricingCard";
import { HashLink } from "@/components/ui/HashLink";
import { LinkRippleText } from "@/components/ui/LinkRippleText";

export function Pricing() {
  return (
    <section className="section-space">
      <div className="section-shell">
        <SectionHeader id="pricing" label="Pakete" marker="(SKWKHS® — 07)" />
        <div className="mb-8 max-w-5xl space-y-5 md:mb-10">
          <h2 className="display-lg max-w-[9ch]">Wähle deinen Bauauftrag</h2>
          <p className="max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">
            Nicht jedes digitale Bauwerk braucht denselben Aufwand. Manche
            Seiten brauchen nur eine saubere Sanierung, andere ein neues
            Fundament. Deshalb arbeiten wir mit klaren Paketen statt endlosen
            Baustellen.
          </p>
        </div>
        <div className="grid items-start gap-x-10 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.name} {...tier} />
          ))}
        </div>
        <div className="mt-8 grid gap-8 border-t border-border pt-8 md:mt-10 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.74fr)] md:items-start">
          <div>
            <div className="eyebrow text-foreground/75">Nach dem Launch</div>
            <h3 className="mt-4 max-w-4xl text-3xl font-black leading-[0.98] tracking-[-0.045em] text-foreground md:text-5xl">
              {maintenanceOffer.title}
            </h3>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">
              {maintenanceOffer.description}
            </p>
            <div className="mt-5 text-2xl font-black tracking-[-0.04em] text-foreground md:text-4xl">
              {maintenanceOffer.price}
            </div>
          </div>
          <div>
            <ul className="grid gap-3 text-sm leading-6 text-foreground/88">
              {maintenanceOffer.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span aria-hidden className="text-foreground">
                    +
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <HashLink
              href="/?angebot=facility-management#kontakt"
              className="link-arrow mt-7 w-full justify-between bg-foreground px-4 py-4 text-background hover:bg-foreground/90 sm:w-fit"
            >
              <LinkRippleText
                text={maintenanceOffer.ctaLabel}
                baseWeight={720}
              />
              <span aria-hidden>+</span>
            </HashLink>
          </div>
        </div>
        <div className="mt-8 grid gap-4 border-y border-border py-5 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.74fr)] md:items-center md:gap-8">
          <div>
            <h3 className="text-base font-black leading-tight tracking-[-0.02em] text-foreground md:text-xl">
              Nicht sicher, welcher Bauauftrag passt?
            </h3>
            <p className="mt-2 max-w-xl text-xs leading-5 text-muted md:text-sm md:leading-6">
              Der Website Check zeigt dir zuerst, wo dein aktueller Auftritt
              trägt, knirscht oder neu sortiert werden sollte.
            </p>
          </div>
          <TrackedHashLink
            href="/webseitecheck"
            eventName="website_check_cta_click"
            eventParams={{ placement: "pricing_fit_cta" }}
            className="link-arrow w-full justify-between bg-foreground px-4 py-4 text-background hover:bg-foreground/90 sm:w-fit"
          >
            <LinkRippleText text="Website Check starten" baseWeight={760} />
            <span aria-hidden>+</span>
          </TrackedHashLink>
        </div>
      </div>
    </section>
  );
}
