import { pricingTiers } from "@/lib/site-data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PricingCard } from "@/components/ui/PricingCard";
import { StaggeredCycle } from "@/components/ui/StaggeredCycle";

export function Pricing() {
  return (
    <section className="section-space">
      <div className="section-shell">
        <SectionHeader label="Pakete" marker="(SKWKHS® — 07)" />
        <div className="mb-10 max-w-4xl space-y-5 md:mb-8">
          <div className="min-w-[15ch]">
            <StaggeredCycle words={["Aussuchen.", "Planen.", "Starten."]} />
          </div>
          <p className="max-w-3xl text-lg leading-8 text-muted">
            Jedes Projekt wird sauber zugeschnitten. Trotzdem helfen klare
            Pakete, Aufwand, Tiefe und Prioritäten schneller einzuordnen.
          </p>
        </div>
        <div className="grid gap-5 xl:grid-cols-3">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.name} {...tier} />
          ))}
        </div>
      </div>
    </section>
  );
}
