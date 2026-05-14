import {
  getOfferContactHref,
  projectOffers,
  recurringOffers,
  resolveOfferCtaHref,
  satelliteOffers,
} from "@/lib/offers";
import { TrackedHashLink } from "@/components/analytics/TrackedHashLink";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PricingCard } from "@/components/ui/PricingCard";
import { LinkRippleText } from "@/components/ui/LinkRippleText";

export function Pricing() {
  const websiteAbo = satelliteOffers[0];

  if (!websiteAbo) {
    return null;
  }

  return (
    <section className="section-space">
      <div className="section-shell">
        <SectionHeader id="pricing" label="Angebote" marker="(SKWKHS® — 07)" />
        <div className="mb-8 max-w-5xl space-y-5 md:mb-10">
          <h2 className="display-lg max-w-[10ch]">
            Projekt zuerst. Betreuung danach.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">
            Stackwerkhaus bleibt kein Abo-Baukasten. Der Start ist ein klarer
            Bauauftrag, danach halten Care- und Growth-Retainer das digitale
            Bauwerk ruhig, aktuell oder gezielt in Bewegung.
          </p>
        </div>

        <div className="space-y-10">
          <div>
            <div className="mb-5 flex flex-col gap-2 border-t border-border pt-5 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="eyebrow text-foreground/75">
                  Projektangebote
                </div>
                <h3 className="mt-3 max-w-3xl text-3xl font-black leading-[0.98] tracking-[-0.045em] text-foreground md:text-5xl">
                  Für Launch, Relaunch und technische Vorhaben
                </h3>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted">
                Einmalige Projektpreise bleiben der Hauptpfad. Der genaue Rahmen
                hängt von Seitenumfang, Inhalten, Funktionen und Integrationen
                ab.
              </p>
            </div>
            <div className="grid items-start gap-x-10 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
              {projectOffers.map((offer) => (
                <PricingCard
                  key={offer.id}
                  {...offer}
                  ctaHref={getOfferContactHref(offer)}
                />
              ))}
            </div>
            <p className="text-sm leading-6 text-muted">
              Retainer sind standardisierte Einstiege. Wenn ein Stripe Payment
              Link konfiguriert ist, führt der CTA dorthin. Ohne Link bleibt der
              sichere Kontaktweg aktiv.
            </p>
          </div>

          <div>
            <div className="mb-5 flex flex-col gap-2 border-t border-border pt-5 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="eyebrow text-foreground/75">
                  Nach dem Launch
                </div>
                <h3 className="mt-3 max-w-3xl text-3xl font-black leading-[0.98] tracking-[-0.045em] text-foreground md:text-5xl">
                  Laufende Betreuung mit klaren Grenzen
                </h3>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted">
                Payment Links sind nur eine Phase-1-Abkürzung für
                standardisierte Retainer. Wenn kein Link konfiguriert ist, führt
                der CTA sicher zum Kontakt.
              </p>
            </div>
            <div className="grid items-start gap-x-10 gap-y-10 md:grid-cols-2">
              {recurringOffers.map((offer) => (
                <PricingCard
                  key={offer.id}
                  {...offer}
                  ctaHref={resolveOfferCtaHref(offer, process.env)}
                  compact
                />
              ))}
            </div>
          </div>

          <div className="grid gap-8 border-y border-border py-6 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.74fr)] md:items-start">
            <div>
              <div className="eyebrow text-foreground/75">
                Satellitenangebot
              </div>
              <h3 className="mt-4 max-w-4xl text-3xl font-black leading-[0.98] tracking-[-0.045em] text-foreground md:text-5xl">
                Website-Abo nur für kleine, klare Fälle
              </h3>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">
                Das Abo ist kein neuer Kern des Angebots. Es passt nur, wenn
                Umfang, Laufzeit, Gesamtkosten, Eigentum, Übergabe und
                Exit-Paket vor Start sauber geklärt sind.
              </p>
            </div>
            <PricingCard
              {...websiteAbo}
              ctaHref={resolveOfferCtaHref(websiteAbo, process.env)}
              compact
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 border-b border-border pb-5 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.74fr)] md:items-center md:gap-8">
          <div>
            <h3 className="text-base font-black leading-tight tracking-[-0.02em] text-foreground md:text-xl">
              Nicht sicher, welches Angebot passt?
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
