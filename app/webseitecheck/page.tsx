import Image from "next/image";
import type { Metadata } from "next";
import { buildingResults, publicInspectionFields } from "@/lib/baustellencheck.mjs";
import { stringifyJsonLd } from "@/lib/json-ld";
import { getWebsiteCheckSchemaOffer } from "@/lib/pricing-schema";
import { siteConfig } from "@/lib/site-config";
import { TrackedHashLink } from "@/components/analytics/TrackedHashLink";
import { AuditOffer } from "@/components/baustellencheck/AuditOffer";
import { BaustellencheckForm } from "@/components/baustellencheck/BaustellencheckForm";
import { LinkRippleText } from "@/components/ui/LinkRippleText";
import { SectionHeader } from "@/components/ui/SectionHeader";

const pagePath = "/webseitecheck";
const pageUrl = `${siteConfig.url}${pagePath}`;
const pageTitle = "Website Check | STACKWERKHAUS Baustellencheck";
const pageDescription =
  "Der kostenlose STACKWERKHAUS Baustellencheck prüft deine Website; der vertiefende Website Check für Neukunden kostet 99 € und zeigt nächste Schritte.";
const pageImage = "/og-baustellencheck.png";

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: pageDescription,
  keywords: [
    "Webseitecheck",
    "Website Check",
    "Baustellencheck",
    "Website Relaunch",
    "Webdesign Berlin",
    "Technisches SEO",
    "Conversion Optimierung",
    "AEO",
  ],
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: pageUrl,
    siteName: siteConfig.name,
    title: "Penthouse, Plattenbau oder Rohbau?",
    description:
      "Prüfe deine Website kostenlos und buche den vertiefenden Website Check für 99 €.",
    images: [
      {
        url: pageImage,
        width: 1200,
        height: 630,
        alt: "Stackwerkhaus Baustellencheck als digitale Bauzustandsprüfung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [pageImage],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageTitle,
      description: pageDescription,
      inLanguage: "de-DE",
      isPartOf: {
        "@id": `${siteConfig.url}#website`,
      },
      about: {
        "@id": `${pageUrl}#service`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${pageImage}`,
        width: 1200,
        height: 630,
      },
    },
    {
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: "STACKWERKHAUS Baustellencheck",
      serviceType: "Website Check für Webdesign, Relaunch und technische Website-Prüfung",
      description:
        "Der STACKWERKHAUS Baustellencheck prüft Fundament, Grundriss, Fassade und Technik einer Website und ordnet den digitalen Bauzustand ein.",
      provider: {
        "@type": "Organization",
        "@id": `${siteConfig.url}#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
      },
      areaServed: {
        "@type": "Country",
        name: "Deutschland",
      },
      potentialAction: {
        "@type": "RegisterAction",
        target: `${pageUrl}#webseitecheck-form`,
        name: "Baustellencheck starten",
      },
      offers: getWebsiteCheckSchemaOffer(pageUrl),
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
          name: "Website Check",
          item: pageUrl,
        },
      ],
    },
  ],
};

export default function BaustellencheckPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(structuredData) }}
      />
      <section className="section-space pt-8 md:pt-0">
        <div className="section-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <div className="space-y-8">
            <div className="eyebrow text-foreground/75">
              Der Stackwerkhaus Baustellencheck
            </div>
            <div className="space-y-6">
              <h1 className="max-w-[12ch] font-display text-[clamp(3.4rem,8vw,8rem)] font-black leading-[0.9] tracking-[-0.055em] md:max-w-[13.5ch] md:text-[clamp(4.2rem,7vw,7.2rem)] xl:max-w-[15ch]">
                <span className="block">Ist deine Website</span>
                <span className="block">Penthouse,</span>
                <span className="block">Plattenbau</span>
                <span className="block">oder Rohbau?</span>
              </h1>
              <div className="flex max-w-3xl flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[length:var(--label)] uppercase tracking-[0.24em] text-muted sm:tracking-[0.35em]">
                <span>© Baustellencheck</span>
                <span>(CHECK — 01)</span>
              </div>
              <p className="max-w-3xl text-lg leading-8 text-muted md:text-xl md:leading-9">
                Wir prüfen Fundament, Grundriss, Fassade und Technik deines
                digitalen Auftritts und zeigen dir, wo dein Online-Bauwerk trägt
                und wo noch Baustelle ist.
              </p>
              <p className="max-w-2xl text-sm leading-6 text-muted">
                Kostenloser Kurzcheck für Websites, Web Apps und digitale
                Auftritte.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <TrackedHashLink
                href="/webseitecheck#webseitecheck-form"
                eventName="website_check_cta_click"
                eventParams={{ placement: "checker_hero_primary" }}
                className="link-arrow w-full justify-between bg-foreground px-5 py-4 text-background sm:w-fit"
              >
                <LinkRippleText
                  text="Baustellencheck starten"
                  baseWeight={760}
                />
                <span aria-hidden>+</span>
              </TrackedHashLink>
              <TrackedHashLink
                href="/webseitecheck#bauaufnahme"
                eventName="website_check_cta_click"
                eventParams={{ placement: "checker_hero_secondary" }}
                className="link-arrow w-full justify-between py-4 pr-5 pl-16 text-muted hover:text-foreground sm:w-fit sm:px-5"
              >
                <LinkRippleText
                  text="Digitale Bauaufnahme"
                  baseWeight={560}
                />
                <span aria-hidden>+</span>
              </TrackedHashLink>
            </div>
          </div>

          <div className="relative hidden aspect-[941/1672] w-full max-w-[24rem] justify-self-center overflow-hidden bg-surface md:block md:max-w-[26rem] lg:-mt-4 lg:w-[21rem] lg:max-w-none lg:justify-self-end xl:-mt-6 xl:w-[23rem]">
            <Image
              src="/pagecheck1.png"
              alt="Stackwerkhaus Architekturkonzept als Bauplan-Grafik"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1280px) 23rem, (min-width: 1024px) 21rem, (min-width: 768px) 26rem, 92vw"
              className="object-contain"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_30%),radial-gradient(circle_at_left_top,rgba(255,255,255,0.08),transparent_28%)]"
            />
          </div>
        </div>
      </section>

      <section id="webseitecheck-form">
        <div className="section-shell">
          <BaustellencheckForm />
          <div className="mt-10 md:mt-14">
            <AuditOffer variant="inverted" />
          </div>
        </div>
      </section>

      <section id="bauaufnahme" className="section-space">
        <div className="section-shell">
          <SectionHeader label="Digitale Bauaufnahme" marker="(CHECK — 02)" />
          <div className="mb-10 max-w-4xl space-y-4 md:mb-14">
            <h2 className="display-md">
              Was wir prüfen.
            </h2>
            <p className="text-lg leading-8 text-muted">
              Vier Bereiche reichen für die erste Bauaufnahme. Intern schauen
              wir später tiefer, aber der Einstieg bleibt kurz und verständlich.
            </p>
          </div>
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 xl:grid-cols-4">
            {publicInspectionFields.map((field, index) => (
              <article
                key={field.title}
                className="border-t border-border pt-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-black tracking-[-0.04em]">
                    {field.title}
                  </h3>
                  <span className="text-[10px] uppercase tracking-[0.28em] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-4 min-h-14 text-sm leading-6 text-foreground/82">
                  {field.text}
                </p>
                <ul className="mt-5 space-y-2 text-sm leading-6 text-muted">
                  {field.checks.map((check) => (
                    <li key={check} className="flex gap-3">
                      <span aria-hidden className="text-foreground">
                        +
                      </span>
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="bauzustand"
        className="section-space"
      >
        <div className="section-shell">
          <div className="mb-10 flex items-center justify-between gap-4 text-[length:var(--label)] uppercase tracking-[0.35em] text-muted md:mb-14">
            <span>© Gebäudeklassen</span>
            <span>(CHECK — 03)</span>
          </div>
          <div className="mb-10 max-w-4xl space-y-4 md:mb-14">
            <h2 className="display-md">
              Kein trockener Score. Ein Bauzustand.
            </h2>
            <p className="text-lg leading-8 text-muted">
              Am Ende steht keine Prozentzahl, sondern eine Einordnung, die du
              verstehst: Feinschliff, Ausbau, Relaunch oder Neubau.
            </p>
          </div>
          <div className="grid gap-x-10 gap-y-9 md:grid-cols-2">
            {buildingResults.map((result) => (
              <article
                key={result.title}
                className="border-t border-border pt-6"
              >
                <div className="text-[11px] uppercase tracking-[0.3em] text-muted">
                  {result.meaning}
                </div>
                <h3 className="mt-4 text-3xl font-black tracking-[-0.05em] md:text-5xl">
                  {result.title}
                </h3>
                <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
                  {result.text}
                </p>
                <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.24em] text-foreground/72">
                  {result.recommendations.map((recommendation) => (
                    <span key={recommendation}>{recommendation}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
