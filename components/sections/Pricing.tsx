import { pricingAddOns, pricingTiers } from "@/lib/site-data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PricingCard } from "@/components/ui/PricingCard";

export function Pricing() {
  return (
    <section className="section-space">
      <div className="section-shell">
        <SectionHeader id="pricing" label="Abos" marker="(SKWKHS® — 07)" />
        <div className="mb-8 max-w-5xl space-y-5 md:mb-10">
          <h2 className="display-lg max-w-[9ch]">Wähle deinen Einstieg</h2>
          <p className="max-w-4xl text-base leading-7 text-muted md:text-lg md:leading-8">
            Diese vier Wege decken die meisten Website-Projekte ab. Schlank starten,
            individueller aufbauen, Inhalte selbst pflegen oder ein kleines System
            daraus machen. Was darüber hinausgeht, kommt als Zusatzleistung
            dazu und nicht als versteckte Kosten.
          </p>
        </div>
        <div className="grid items-start gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.name} {...tier} />
          ))}
        </div>
        <div className="mt-8 grid gap-8 border-y border-border py-7 md:mt-10 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:items-start">
          <div>
            <div className="eyebrow text-foreground/75">Zusatzleistungen</div>
            <h3 className="mt-4 max-w-xl text-3xl font-black leading-[0.98] tracking-normal text-foreground md:text-5xl">
              Das reicht dir noch nicht? Kein Problem.
            </h3>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">
              SEO, Sprachen, Domains, Postfächer und Sonderwünsche bleiben
              einzeln. So bleibt der Einstieg übersichtlich und der Ausbau
              planbar.
            </p>
          </div>
          <ul className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {pricingAddOns.map((addOn) => (
              <li key={addOn.name} className="border-t border-border pt-4">
                <div className="flex items-start justify-between gap-4">
                  <h4 className="text-sm font-black leading-5 tracking-normal text-foreground">
                    {addOn.name}
                  </h4>
                  <div className="shrink-0 text-right">
                    <div className="text-sm font-black text-foreground">
                      {addOn.price}
                    </div>
                    {addOn.secondaryPrice ? (
                      <div className="mt-1 text-[10px] font-black uppercase leading-4 tracking-[0.1em] text-muted">
                        {addOn.secondaryPrice}
                      </div>
                    ) : null}
                  </div>
                </div>
                <p className="mt-2 text-xs leading-5 text-muted">
                  {addOn.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
