export type BillingType = "one_time" | "recurring" | "hybrid";
export type OfferCategory = "project" | "retainer" | "satellite" | "audit";
export type CtaKind = "contact" | "payment_link" | "contact_or_payment";

export type Offer = {
  id: string;
  slug: string;
  name: string;
  category: OfferCategory;
  billingType: BillingType;
  priceLabel: string;
  monthlyPrice?: number;
  setupPrice?: number;
  minimumTerm?: string;
  ctaLabel: string;
  ctaKind: CtaKind;
  stripeLookupKey?: string;
  stripePaymentLinkEnvKey?: string;
  eyebrow?: string;
  description: string;
  suitableFor: readonly string[];
  includes: readonly string[];
  visibleIncludes?: number;
  highlight?: boolean;
  badge?: string;
  totalCostLabel?: string;
  exitTerms?: readonly string[];
  scopeLimits: readonly string[];
  nextQuestions: readonly string[];
};

export const offers = [
  {
    id: "project-rohbau",
    slug: "rohbau",
    name: "Rohbau",
    category: "project",
    billingType: "one_time",
    priceLabel: "ab 799 €",
    setupPrice: 799,
    ctaLabel: "Rohbau anfragen",
    ctaKind: "contact",
    description: "Für neue Websites, die schnell und stabil stehen sollen.",
    suitableFor: [
      "Neue Unternehmen",
      "Dienstleister",
      "Portfolio-Seiten",
      "einfache Landingpages",
    ],
    includes: [
      "Seitenstruktur",
      "Webdesign",
      "Responsive Umsetzung",
      "Kontaktformular",
      "SEO-Basis",
      "Launch-Unterstützung",
    ],
    scopeLimits: [
      "kompakter Seitenumfang",
      "keine komplexen Backend- oder CMS-Sonderfunktionen",
      "Erweiterungen werden separat kalkuliert",
    ],
    nextQuestions: ["Ziel der Website", "gewünschter Seitenumfang", "Starttermin"],
  },
  {
    id: "project-sanierung",
    slug: "sanierung",
    name: "Sanierung",
    category: "project",
    billingType: "one_time",
    priceLabel: "ab 1.499 €",
    setupPrice: 1499,
    ctaLabel: "Sanierung planen",
    ctaKind: "contact",
    description: "Für Websites, die noch stehen, aber nicht mehr richtig tragen.",
    suitableFor: [
      "Website Relaunch",
      "veraltete Seiten",
      "unklare Angebote",
      "schwache Kontaktwege",
      "Unternehmen mit Wachstum",
    ],
    includes: [
      "Website Analyse",
      "neuer Grundriss",
      "UI/UX Überarbeitung",
      "Frontend Umsetzung",
      "Performance & Optimierung",
      "SEO Basis",
      "Launch-Check",
    ],
    visibleIncludes: 6,
    highlight: true,
    badge: "Empfehlung",
    scopeLimits: [
      "bestehende Inhalte und Ziele werden vorab sortiert",
      "Integrationen und CMS nach Aufwand",
      "Launch-Check inklusive, laufende Betreuung optional",
    ],
    nextQuestions: ["aktuelle Website URL", "größte Baustelle", "gewünschter Relaunch-Zeitpunkt"],
  },
  {
    id: "project-bauwerk",
    slug: "bauwerk",
    name: "Bauwerk",
    category: "project",
    billingType: "one_time",
    priceLabel: "ab 2.499 €",
    setupPrice: 2499,
    ctaLabel: "Bauwerk besprechen",
    ctaKind: "contact",
    description:
      "Für intelligente digitale Bauwerke, bei denen nicht nur die Fassade stimmen muss.",
    suitableFor: [
      "Web Apps",
      "Plattformen",
      "Dashboards",
      "KI-Workflows",
      "individuelle Funktionen",
      "technische Produktideen",
    ],
    includes: [
      "technische Planung",
      "Full Stack Development",
      "Frontend und Backend",
      "API Anbindungen",
      "KI- und Automatisierungslogik",
      "Testing",
      "Launch und Übergabe",
    ],
    visibleIncludes: 6,
    scopeLimits: [
      "Funktionsumfang wird vor Angebot abgegrenzt",
      "externe APIs und Datenmodelle nach Aufwand",
      "Betrieb und Wartung werden separat geplant",
    ],
    nextQuestions: ["gewünschte Funktion", "bestehende Systeme", "Launch- oder MVP-Ziel"],
  },
  {
    id: "care",
    slug: "care",
    name: "Care Retainer",
    category: "retainer",
    billingType: "recurring",
    priceLabel: "ab 149 €/Monat",
    monthlyPrice: 149,
    ctaLabel: "Care anfragen",
    ctaKind: "contact_or_payment",
    stripeLookupKey: "care_retainer_monthly",
    stripePaymentLinkEnvKey: "NEXT_PUBLIC_STRIPE_PAYMENT_LINK_CARE",
    description:
      "Für Monitoring, kleine Verbesserungen und ruhige Weiterpflege nach dem Launch.",
    suitableFor: ["bestehende Website", "Launch-Nachsorge", "kleine laufende Änderungen"],
    includes: [
      "Monitoring",
      "kleine Änderungen",
      "Search-Console-Sichtung",
      "Backup/Update-Koordination",
      "monatlicher Mini-Report",
    ],
    scopeLimits: [
      "keine größeren Redesigns im Monatsumfang",
      "neue Features werden separat angeboten",
      "Kontakt-First, Payment Link nur bei konfigurierter Standardbuchung",
    ],
    nextQuestions: ["Website URL", "gewünschter Betreuungsstart", "wichtigste laufende Aufgabe"],
  },
  {
    id: "growth",
    slug: "growth",
    name: "Growth Retainer",
    category: "retainer",
    billingType: "recurring",
    priceLabel: "ab 490 €/Monat",
    monthlyPrice: 490,
    ctaLabel: "Growth besprechen",
    ctaKind: "contact_or_payment",
    stripeLookupKey: "growth_retainer_monthly",
    stripePaymentLinkEnvKey: "NEXT_PUBLIC_STRIPE_PAYMENT_LINK_GROWTH",
    description:
      "Für Teams, die Website, Landingpages, Tests und Automatisierung laufend ausbauen wollen.",
    suitableFor: ["laufende Kampagnen", "neue Landingpages", "Conversion-Verbesserung"],
    includes: [
      "Roadmap-Sparring",
      "Landingpage- und Content-Ausbau",
      "Conversion- und Tracking-Checks",
      "kleine Automatisierungen",
      "Priorisierte Umsetzungsslots",
    ],
    scopeLimits: [
      "monatliche Priorisierung statt unbegrenztem Abruf",
      "größere Features werden gesondert geplant",
      "Payment Link nur nach geklärtem Umfang nutzen",
    ],
    nextQuestions: ["Wachstumsziel", "aktuelle Kanäle", "gewünschter Monatsrhythmus"],
  },
  {
    id: "website-abo",
    slug: "website-abo",
    name: "Website-Abo",
    category: "satellite",
    billingType: "hybrid",
    priceLabel: "ab 149 €/Monat, 18 Monate",
    monthlyPrice: 149,
    minimumTerm: "18 Monate Mindestlaufzeit",
    ctaLabel: "Abo prüfen lassen",
    ctaKind: "contact_or_payment",
    stripeLookupKey: "website_abo_monthly_18m",
    stripePaymentLinkEnvKey: "NEXT_PUBLIC_STRIPE_PAYMENT_LINK_WEBSITE_ABO",
    description:
      "Begrenzter Einstieg für einfache lokale Websites, wenn Scope, Laufzeit und Übergabe klar passen.",
    suitableFor: ["lokale Einzelangebote", "klarer kleiner Umfang", "monatliche Budgetplanung"],
    includes: [
      "kleine Website nach festem Umfang",
      "Hosting-/Launch-Begleitung",
      "Care-Basis während der Laufzeit",
      "Eigentums- und Übergaberegelung",
      "Exit-Paket nach Mindestlaufzeit",
    ],
    scopeLimits: [
      "nur für einfache Websites ohne Sonderlogik",
      "Gesamtkosten über Mindestlaufzeit transparent vor Buchung",
      "Kündigung, Eigentum, Übergabe und Exit-Paket werden schriftlich geklärt",
    ],
    nextQuestions: ["gewünschter Umfang", "Laufzeit passt?", "wer pflegt Inhalte nach Übergabe?"],
  },
  {
    id: "website-audit",
    slug: "website-audit",
    name: "Website Audit / Bauzustandsbericht",
    category: "audit",
    billingType: "one_time",
    priceLabel: "249 €",
    setupPrice: 249,
    ctaLabel: "Website Check starten",
    ctaKind: "contact",
    description: "Kompakte Prüfung, bevor ein Relaunch oder Retainer sinnvoll eingeordnet wird.",
    suitableFor: ["bestehende Websites", "unklare Baustellen", "Entscheidungsvorbereitung"],
    includes: ["48h Lieferung", "5–8 Seiten", "Anrechnung bei Projektbuchung"],
    scopeLimits: ["keine Umsetzung enthalten", "keine rechtliche Prüfung"],
    nextQuestions: ["Website URL", "aktuelle Frage oder Ziel", "gewünschter Start"],
  },
] as const satisfies readonly Offer[];

export type OfferId = (typeof offers)[number]["id"];

export const projectOffers = offers.filter((offer) => offer.category === "project");
export const retainerOffers = offers.filter((offer) => offer.category === "retainer");
export const satelliteOffers = offers.filter((offer) => offer.category === "satellite");
export const recurringOffers = retainerOffers;
export const stackwerkhausOffers = offers;
export type StackwerkhausOffer = Offer;

export function formatOfferPrice(offer: Offer) {
  return offer.priceLabel;
}

const offerSlugAliases: Record<string, string> = {
  "facility-management": "care",
  "wartung-wachstum": "care",
};

export const standaloneOfferPrefills = {
  "website-audit": {
    title: "Website Audit / Bauzustandsbericht",
    priceLabel: "249 €",
    includes: ["48h Lieferung", "5–8 Seiten", "Anrechnung bei Projektbuchung"],
  },
} as const;

export function getOfferBySlug(slug: string | null | undefined) {
  const normalized = slug?.toLowerCase().trim();
  if (!normalized) {
    return undefined;
  }

  const canonicalSlug = offerSlugAliases[normalized] ?? normalized;

  return stackwerkhausOffers.find(
    (offer) => offer.slug === canonicalSlug || offer.name.toLowerCase() === canonicalSlug,
  );
}

export const findOffer = getOfferBySlug;

export function getOfferPaymentLink(
  offer: Offer,
  env: Record<string, string | undefined>,
) {
  if (offer.ctaKind === "contact" || !offer.stripePaymentLinkEnvKey) {
    return undefined;
  }

  const paymentLink = env[offer.stripePaymentLinkEnvKey]?.trim();
  return paymentLink && /^https:\/\//.test(paymentLink) ? paymentLink : undefined;
}

export function getOfferContactHref(offer: Offer) {
  const parameter = offer.category === "project" ? "paket" : "angebot";
  return `/?${parameter}=${encodeURIComponent(offer.slug)}#kontakt`;
}

export function getOfferCtaHref(
  offer: Offer,
  env: Record<string, string | undefined>,
) {
  return getOfferPaymentLink(offer, env) ?? getOfferContactHref(offer);
}

export const resolveOfferCtaHref = getOfferCtaHref;
