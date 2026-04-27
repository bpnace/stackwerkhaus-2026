import { maintenanceOffer, pricingTiers } from "@/lib/site-data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PricingCard } from "@/components/ui/PricingCard";
import { StaggeredCycle } from "@/components/ui/StaggeredCycle";
import { HashLink } from "@/components/ui/HashLink";
import { LinkRippleText } from "@/components/ui/LinkRippleText";

export function Pricing() {
  return (
    <section id="pricing" className="section-space">
      <div className="section-shell">
        <SectionHeader label="Pakete" marker="(SKWKHS® — 07)" />
        <div className="mb-8 max-w-4xl space-y-4 md:mb-10">
          <div className="min-w-[15ch] max-w-[17ch]">
            <StaggeredCycle
              words={["Aussuchen.", "Planen.", "Starten."]}
              className="h-[1.02em] md:h-[.8em]"
            />
          </div>
          <p className="max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">
            Jedes Projekt wird sauber zugeschnitten. Trotzdem helfen klare
            Pakete, Aufwand, Tiefe und Prioritäten schneller einzuordnen. Für
            Neukunden kann bei Buchung ein Rabatt angerechnet werden.
          </p>
        </div>
        <div className="grid items-start gap-x-10 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.name} {...tier} />
          ))}
        </div>
        <div className="mt-14 grid gap-8 border-y border-border py-8 md:mt-16 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.74fr)] md:items-start">
          <div>
            <div className="eyebrow text-foreground/75">Nach dem Launch</div>
            <h3 className="mt-4 max-w-4xl text-3xl font-black leading-[0.98] tracking-[-0.045em] text-foreground md:text-5xl">
              {maintenanceOffer.title}
            </h3>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">
              {maintenanceOffer.description}
            </p>
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
              href="/?angebot=wartung-wachstum#kontakt"
              className="link-arrow mt-7 w-full justify-between bg-foreground px-4 py-4 text-background hover:bg-foreground/90 sm:w-fit"
            >
              <LinkRippleText text="Wartung anfragen" baseWeight={720} />
              <span aria-hidden>+</span>
            </HashLink>
          </div>
        </div>
      </div>
    </section>
  );
}
