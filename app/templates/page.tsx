import type { Metadata } from "next";
import { HashLink } from "@/components/ui/HashLink";
import { LinkRippleText } from "@/components/ui/LinkRippleText";
import { stringifyJsonLd } from "@/lib/json-ld";
import { getSubscriptionPricingSchemaOffer } from "@/lib/pricing-schema";
import { siteConfig } from "@/lib/site-config";

const pagePath = "/templates";
const pageTitle = "Templates | STACKWERKHAUS";
const pageDescription =
  "Template Start von Stackwerkhaus ab 29 €/Monat: Website-Vorlagen mit Farben, Logo, Inhalten, Kontaktformular und SEO-Grundsetup.";
const pageUrl = `${siteConfig.url}${pagePath}`;

const templateIncludes = [
  "Auswahl aus einer vorbereiteten Website-Struktur",
  "Anpassung an deine Farben, dein Logo und ein passendes Schriftbild",
  "Einpflege vorhandener Texte, Bilder und Kontaktdaten",
  "leichte Strukturierung für Startseite und wenige Unterseiten",
  "responsive Umsetzung, Kontaktformular und SEO-Grundsetup",
  "Hosting, SSL und E-Mail-Grundsetup",
] as const;

const templateHighlights = [
  { value: "0 €", label: "Erstellungskosten", compactLabel: "Setup" },
  { value: "0 €", label: "Google-Optimierung", compactLabel: "Google" },
  { value: "0 €", label: "Website-Pflege", compactLabel: "Pflege" },
] as const;

type TemplatePreviewVariant = "service" | "praxis" | "projekt";

const templateCards = [
  {
    kicker: "Template 01",
    title: "Service Start",
    description:
      "Für lokale Dienstleister, Beratungen und kleine Unternehmen, die schnell erklären müssen, was sie anbieten und wie man anfragt.",
    fit: "Dienstleister, Beratung, Handwerk",
    structure: ["Leistungen", "Ablauf", "Kontakt"],
    preview: "service" satisfies TemplatePreviewVariant,
  },
  {
    kicker: "Template 02",
    title: "Praxis & Termin",
    description:
      "Für Angebote mit Vertrauen, Öffnungszeiten, Leistungen und einem schnellen Kontaktweg.",
    fit: "Praxis, Coaching, Studio",
    structure: ["Vertrauen", "Termine", "FAQ"],
    preview: "praxis" satisfies TemplatePreviewVariant,
  },
  {
    kicker: "Template 03",
    title: "Projekt & Profil",
    description:
      "Für Gründer, Solo-Studios und kleine Marken, die persönlicher auftreten und trotzdem schlank starten wollen.",
    fit: "Gründung, Portfolio, Marke",
    structure: ["Profil", "Projekte", "Story"],
    preview: "projekt" satisfies TemplatePreviewVariant,
  },
] as const;

const templateSteps = [
  {
    step: "01",
    title: "Template wählen",
    text: "Erst die passende Richtung aussuchen, dann startet die Anfrage mit Template-Name.",
  },
  {
    step: "02",
    title: "Inhalte sortieren",
    text: "Logo, Farben, Bilder und vorhandene Texte werden in die Struktur gebracht.",
  },
  {
    step: "03",
    title: "Online gehen",
    text: "Responsive Umsetzung, Kontaktformular, Hosting und SEO-Grundsetup sind enthalten.",
  },
] as const;

function getTemplateContactHref(templateTitle: string) {
  return `/?angebot=template-start&template=${encodeURIComponent(templateTitle)}#kontakt`;
}

function TemplatePreview({ variant }: { variant: TemplatePreviewVariant }) {
  if (variant === "praxis") {
    return (
      <div
        aria-label="Layout-Vorschau für Praxis und Termin"
        className="grid min-h-[17rem] grid-rows-[1fr_auto] gap-3 border border-border bg-surface p-4"
      >
        <div className="grid grid-cols-[1fr_0.48fr] gap-3">
          <div className="flex flex-col justify-between border border-border/80 p-4">
            <span className="h-2 w-16 bg-foreground/24" />
            <span className="h-10 w-4/5 bg-foreground/12" />
            <span className="h-2 w-24 bg-foreground/20" />
          </div>
          <div className="grid gap-2">
            <span className="border border-border/70 bg-foreground/[0.07]" />
            <span className="border border-border/70 bg-foreground/[0.12]" />
            <span className="border border-border/70 bg-foreground/[0.07]" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <span className="h-8 border-t border-foreground/28 bg-foreground/[0.05]" />
          <span className="h-8 border-t border-foreground/28 bg-foreground/[0.05]" />
          <span className="h-8 border-t border-foreground/28 bg-foreground/[0.05]" />
        </div>
      </div>
    );
  }

  if (variant === "projekt") {
    return (
      <div
        aria-label="Layout-Vorschau für Projekt und Profil"
        className="grid min-h-[17rem] grid-cols-[0.58fr_0.42fr] gap-3 border border-border bg-surface p-4"
      >
        <div className="flex flex-col justify-between border border-border/80 p-4">
          <span className="h-2 w-20 bg-foreground/24" />
          <span className="h-24 w-full bg-foreground/[0.09]" />
          <div className="grid gap-2">
            <span className="h-px bg-foreground/28" />
            <span className="h-px w-4/5 bg-foreground/18" />
          </div>
        </div>
        <div className="grid gap-3">
          <span className="border border-border/70 bg-foreground/[0.12]" />
          <span className="border border-border/70 bg-foreground/[0.07]" />
        </div>
      </div>
    );
  }

  return (
    <div
      aria-label="Layout-Vorschau für Service Start"
      className="grid min-h-[17rem] grid-cols-[0.42fr_0.58fr] gap-3 border border-border bg-surface p-4"
    >
      <div className="grid gap-3">
        <span className="border border-border/70 bg-foreground/[0.07]" />
        <span className="border border-border/70 bg-foreground/[0.14]" />
      </div>
      <div className="flex flex-col justify-between border border-border/80 p-4">
        <span className="h-2 w-16 bg-foreground/24" />
        <div className="space-y-2">
          <span className="block h-8 w-full bg-foreground/12" />
          <span className="block h-8 w-3/4 bg-foreground/12" />
        </div>
        <span className="h-2 w-28 bg-foreground/20" />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: pageDescription,
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: pagePath,
    siteName: siteConfig.name,
    title: pageTitle,
    description: pageDescription,
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function TemplatesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageTitle,
        description: pageDescription,
        inLanguage: "de-DE",
        isPartOf: {
          "@id": `${siteConfig.url}#website`,
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: templateCards.map((template, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: template.title,
            description: template.description,
          })),
        },
        offers: [getSubscriptionPricingSchemaOffer("template-start", pageUrl)],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Startseite",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Templates",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="section-space pt-10 md:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(structuredData),
        }}
      />
      <div className="section-shell">
        <section className="grid gap-10 border-b border-border pb-12 md:pb-16 lg:grid-cols-[minmax(0,0.82fr)_minmax(280px,0.42fr)] lg:items-end">
          <div className="max-w-5xl space-y-6">
            <div className="eyebrow">Template Start</div>
            <h1 className="display-lg max-w-[12ch]">
              Vorlagen für den schnellen Einstieg
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted">
              Du wählst ein Grundgerüst. Ich passe Farben, Logo, Schriftbild
              und vorhandene Inhalte an dein Angebot an. So startet die Website
              schneller und günstiger, ohne nach Baukasten von der Stange
              auszusehen.
            </p>
          </div>
          <div className="border-y border-border py-6">
            <div className="text-[10px] font-black uppercase tracking-[0.28em] text-muted">
              Startpunkt
            </div>
            <p className="mt-3 text-3xl font-black leading-[0.98] tracking-normal text-foreground md:text-5xl">
              29 €/Monat
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">
              Zahlung erst nach Auswahl eines Templates.
            </p>
            <dl className="mt-8 grid gap-4">
              {templateHighlights.map((highlight) => {
                const isZeroEuro = highlight.value === "0 €";

                return (
                  <div
                    key={highlight.label}
                    className="grid gap-2 border-t border-border pt-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end"
                  >
                    <dt className="text-[10px] font-black uppercase tracking-[0.22em] text-muted">
                      <span className="sm:hidden">{highlight.compactLabel}</span>
                      <span className="hidden sm:inline">{highlight.label}</span>
                    </dt>
                    <dd
                      className={
                        isZeroEuro
                          ? "text-4xl font-black leading-none tracking-normal text-foreground md:text-5xl"
                          : "text-3xl font-black leading-none tracking-normal text-foreground"
                      }
                    >
                      {highlight.value}
                    </dd>
                  </div>
                );
              })}
            </dl>
            <p className="mt-5 border-t border-border pt-4 text-xs font-bold uppercase tracking-[0.18em] text-muted">
              24 Monate Mindestlaufzeit
            </p>
          </div>
        </section>

        <section className="border-b border-border py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end">
            <div>
              <div className="eyebrow">Template-Auswahl</div>
              <h2 className="mt-4 max-w-3xl text-4xl font-black leading-[0.96] tracking-normal text-foreground md:text-6xl">
                Wähle dein Grundgerüst
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">
              Die Vorschauen zeigen die Struktur, nicht fertige Deko. Nach der
              Auswahl wird genau ein Template Start angefragt. Danach klären wir
              kurz, ob das Gerüst zu deinem Angebot passt.
            </p>
          </div>

          <div className="mt-10 grid gap-7 lg:grid-cols-3">
            {templateCards.map((template) => {
              const templateHref = getTemplateContactHref(template.title);
              const ctaClassName =
                "link-arrow mt-auto w-full min-w-0 justify-between border border-border px-3 py-4 text-[10px] tracking-[0.22em] text-foreground hover:border-foreground/45 sm:px-4 sm:text-[11px] sm:tracking-[0.28em]";

              return (
                <article
                  key={template.title}
                  className="group flex min-h-[41rem] flex-col border-t border-border pt-6 transition-colors duration-200 hover:border-foreground/55"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.28em] text-muted">
                      {template.kicker}
                    </div>
                    <div className="text-right text-[10px] font-black uppercase tracking-[0.22em] text-muted">
                      {template.fit}
                    </div>
                  </div>
                  <div className="mt-5">
                    <TemplatePreview variant={template.preview} />
                  </div>
                  <div className="mt-6 flex flex-1 flex-col">
                    <h3 className="text-4xl font-black leading-[0.96] tracking-normal text-foreground">
                      {template.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-muted">
                      {template.description}
                    </p>
                    <ul className="mt-6 grid gap-2 border-y border-border py-4">
                      {template.structure.map((item) => (
                        <li
                          key={item}
                          className="flex items-center justify-between gap-4 text-[11px] font-black uppercase tracking-[0.22em] text-muted"
                        >
                          <span>{item}</span>
                          <span aria-hidden className="text-foreground">
                            +
                          </span>
                        </li>
                      ))}
                    </ul>
                    <HashLink href={templateHref} className={ctaClassName}>
                      <span className="min-w-0">
                        <LinkRippleText text="Template anfragen" baseWeight={560} />
                      </span>
                      <span aria-hidden className="shrink-0">
                        +
                      </span>
                    </HashLink>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-10 md:py-14 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start">
          <div>
            <div className="eyebrow text-foreground/75">Enthalten</div>
            <h2 className="mt-4 max-w-xl text-3xl font-black leading-[0.98] tracking-normal text-foreground md:text-5xl">
              Was im Template Start enthalten ist
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">
              Texte können leicht sortiert und geglättet werden. Vollständige
              Texterstellung, neues Branding, Shop, Blog, CMS, Animationen und
              komplexere Logik gehören in ein größeres Paket oder ein separates
              Angebot.
            </p>
          </div>
          <ul className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {templateIncludes.map((item) => (
              <li key={item} className="border-t border-border pt-4">
                <span className="flex gap-3 text-sm leading-6 text-muted">
                  <span aria-hidden className="text-foreground">
                    +
                  </span>
                  <span>{item}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-6 border-y border-border py-8 md:grid-cols-3">
          {templateSteps.map((item) => (
            <div key={item.step} className="grid gap-5 border-t border-border pt-5 md:border-t-0 md:pt-0">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">
                {item.step}
              </div>
              <h2 className="text-2xl font-black leading-[0.98] tracking-normal text-foreground md:text-3xl">
                {item.title}
              </h2>
              <p className="max-w-sm text-sm leading-6 text-muted">{item.text}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
