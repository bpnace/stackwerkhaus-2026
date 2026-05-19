export const tickerItems = [
  "Technisches SEO",
  "Informationsarchitektur",
  "AEO-fähig",
  "Semantische Inhalte",
  "Crawlbare Struktur",
  "Schnelle Ladezeiten",
];

export const services = [
  {
    number: "01",
    title: "Websites mit tragender Struktur",
    description:
      "Webdesign, UI/UX und klare Kontaktwege für Unternehmen, die online professioneller auftreten und Besucher schneller zur Anfrage führen wollen.",
  },
  {
    number: "02",
    title: "Sanierung statt Schönheitsputz",
    description:
      "Relaunches für Websites, die noch stehen, aber nicht mehr richtig tragen. Wir ordnen Struktur, Inhalte, Design und Technik neu.",
  },
  {
    number: "03",
    title: "Heizungskeller inklusive",
    description:
      "Full Stack Development für Web Apps, APIs, Backends und digitale Produkte, bei denen nicht nur die Fassade stimmen muss.",
  },
] as const;

export const serviceProcessSteps = [
  {
    number: "01",
    title: "Bestandsaufnahme",
    description:
      "Wir prüfen, was schon steht, was wackelt und was dein digitaler Auftritt leisten soll.",
    tags: ["Analyse", "Ziele", "Website Zustand", "Projektumfang"],
  },
  {
    number: "02",
    title: "Bauplan",
    description:
      "Wir entwickeln Seitenstruktur, Nutzerführung, Inhalte und Funktionen, bevor der erste digitale Stein gesetzt wird.",
    tags: ["Struktur", "UX", "Content", "Funktionen"],
  },
  {
    number: "03",
    title: "Rohbau",
    description:
      "Wir bauen das technische Fundament mit sauberem Frontend, Backend und stabiler Architektur.",
    tags: ["Frontend", "Backend", "Komponenten", "Architektur"],
  },
  {
    number: "04",
    title: "Ausbau",
    description:
      "Wir schärfen Design, Texte, Interaktionen und Kontaktwege, damit die Fassade nicht nur hübsch aussieht, sondern verkauft.",
    tags: ["Webdesign", "UI/UX", "Texte", "Conversion"],
  },
  {
    number: "05",
    title: "Bauabnahme",
    description:
      "Wir testen Performance, mobile Darstellung, Formulare, SEO Basis und Übergabe vor dem Launch.",
    tags: ["Testing", "Launch", "SEO Basis", "Übergabe"],
  },
] as const;

export const skills = [
  "Positionierung & Angebotslogik",
  "Website-Struktur",
  "Webdesign",
  "Content-Führung",
  "Relaunch",
  "Technisches SEO",
  "Performance",
  "Frontend-Entwicklung",
  "Barrierearme Patterns",
  "Launch-Begleitung",
  "Analytics-Grundsetup",
  "Wartung & Support",
] as const;

export const experience = [
  {
    title: "Stackwerkhaus",
    years: "2018 – heute",
    role: "Webdesign & Frontend",
    place: "Berlin",
  },
  {
    title: "Freelance",
    years: "2015 – 2018",
    role: "UI/UX Design",
    place: "Berlin",
  },
  {
    title: "Digitalagentur",
    years: "2013 – 2015",
    role: "Frontend-Entwicklung",
    place: "Berlin",
  },
  {
    title: "Mediendesign-Studium",
    years: "2010 – 2013",
    role: "Interaktionsdesign",
    place: "Berlin",
  },
] as const;

export const testimonials = [
  {
    highlight: "Einfach und Verständlich",
    quote:
      "Den gesamten Relaunch hat Arthur eigenständig durchgezogen – von Konzept bis Go-Live. Das Ergebnis ist deutlich ästhetischer, komplett responsive und klarer im Angebot.",
    name: "Leonie",
    company: "Geschäftsführerin bei ginione (Ehemals bloom)",
  },
  {
    highlight: "Kreativ mit Business Know-How",
    quote:
      "Arthur verbindet technische Exzellenz mit einem sehr guten Verständnis für Business-Anforderungen. Genau diese Mischung hat unser Projekt deutlich beschleunigt.",
    name: "Denis",
    company: "Partner bei Immo-Pal",
    projectHref: "/projekte/immo-pal",
  },
  {
    highlight: "Endlich passend zum Angebot",
    quote:
      "Die Zusammenarbeit war unkompliziert und das Ergebnis hat unsere Erwartungen übertroffen. Endlich eine Website, die zu unserem Angebot passt.",
    name: "Sarah",
    company: "Inhaberin, Atelier Heimat",
    projectHref: "/projekte/bloom",
  },
] as const;

export type PricingTier = {
  slug: string;
  name: string;
  label: string;
  monthlyPrice: string;
  monthlySuffix: string;
  monthlyNote: string;
  oneTimePrice?: string;
  oneTimeLabel?: string;
  stripePaymentLink?: string;
  stripePaymentLinkEnvKey: string;
  minimumTerm?: string;
  description: string;
  ctaLabel: string;
  suitableFor: readonly string[];
  includes: readonly string[];
  visibleIncludes?: number;
  highlight?: boolean;
};

export type PricingAddOn = {
  name: string;
  price: string;
  secondaryPrice?: string;
  description: string;
};

export type FixedPriceAlternative = {
  slug: string;
  name: string;
  price: string;
  description: string;
};

const stripePaymentLinks = {
  templateStart:
    process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_TEMPLATE_START?.trim() ?? "",
  websiteIndividuell:
    process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_WEBSITE_INDIVIDUELL?.trim() ??
    "",
  shopBlog:
    process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_SHOP_BLOG?.trim() ?? "",
  systemWachstum:
    process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_SYSTEM_WACHSTUM?.trim() ?? "",
} as const;

export const pricingTiers = [
  {
    slug: "template-start",
    name: "Template Start",
    label: "Schneller Einstieg",
    monthlyPrice: "29",
    monthlySuffix: "€/Monat",
    monthlyNote: "24 Monate Mindestlaufzeit",
    oneTimePrice: "799 €",
    oneTimeLabel: "Festpreis ab",
    stripePaymentLink: stripePaymentLinks.templateStart,
    stripePaymentLinkEnvKey: "NEXT_PUBLIC_STRIPE_PAYMENT_LINK_TEMPLATE_START",
    minimumTerm: "24 Monate",
    description:
      "Für eine kleine Website, die sauber online gehen soll, ohne direkt ein großes Projekt zu starten.",
    ctaLabel: "Start anfragen",
    suitableFor: [
      "lokale Dienstleister",
      "neue Unternehmen",
      "kleine Websites",
      "geringe Vorab-Budgets",
    ],
    includes: [
      "Vorlagen-nahe Gestaltung",
      "wenige Seiten",
      "Responsive Umsetzung",
      "Kontaktformular",
      "Hosting, SSL und E-Mail-Grundsetup",
      "SEO-Grundsetup",
      "ein kleiner Änderungsbatch pro Monat",
      "transparentes Exit-Paket",
    ],
  },
  {
    slug: "website-individuell",
    name: "Website Individuell",
    label: "Empfohlen",
    monthlyPrice: "69",
    monthlySuffix: "€/Monat",
    monthlyNote: "für individuelle Website mit SEO-Basis",
    oneTimePrice: "1.499 €",
    oneTimeLabel: "Festpreis ab",
    stripePaymentLink: stripePaymentLinks.websiteIndividuell,
    stripePaymentLinkEnvKey:
      "NEXT_PUBLIC_STRIPE_PAYMENT_LINK_WEBSITE_INDIVIDUELL",
    description:
      "Für kleine Unternehmen, deren Angebot schnell verständlich werden muss.",
    ctaLabel: "Individuell anfragen",
    suitableFor: [
      "Dienstleister",
      "Gründer",
      "kleine Unternehmen",
      "bessere Angebotsstruktur",
    ],
    includes: [
      "individuelleres Webdesign",
      "Seitenstruktur",
      "SEO-Basis und Search Console",
      "Launch-Setup",
      "Pflege und kleine Änderungen",
      "Kontaktformular",
    ],
    visibleIncludes: 6,
    highlight: true,
  },
  {
    slug: "shop-blog",
    name: "Shop & Blog",
    label: "Inhalte selbst pflegen",
    monthlyPrice: "89",
    monthlySuffix: "€/Monat",
    monthlyNote: "für WordPress, Blog oder einfachen Shop",
    oneTimePrice: "2.499 €",
    oneTimeLabel: "Festpreis ab",
    stripePaymentLink: stripePaymentLinks.shopBlog,
    stripePaymentLinkEnvKey: "NEXT_PUBLIC_STRIPE_PAYMENT_LINK_SHOP_BLOG",
    description:
      "Für Websites, bei denen Inhalte weiterleben sollen, ohne dass ein Pagebuilder alles weichknetet.",
    ctaLabel: "Shop anfragen",
    suitableFor: [
      "Blogs",
      "kleine Shops",
      "WordPress",
      "selbst pflegbare Inhalte",
    ],
    includes: [
      "eigenes WordPress-Theme",
      "Blog- oder Shop-Struktur",
      "Hosting und Pflege",
      "SEO-Basis",
      "E-Mail-Grundsetup",
      "Updates und Backups",
    ],
    visibleIncludes: 6,
  },
  {
    slug: "system-wachstum",
    name: "System & Wachstum",
    label: "Abläufe verbinden",
    monthlyPrice: "199",
    monthlySuffix: "€/Monat",
    monthlyNote: "ab Preis für Ausbau, CRM und Automatisierung",
    oneTimePrice: "2.499 €",
    oneTimeLabel: "Projektbasis ab",
    stripePaymentLink: stripePaymentLinks.systemWachstum,
    stripePaymentLinkEnvKey: "NEXT_PUBLIC_STRIPE_PAYMENT_LINK_SYSTEM_WACHSTUM",
    description:
      "Für Websites, die nicht beim Formular enden. Leads, Inhalte, CRM und Automationen greifen hier ineinander.",
    ctaLabel: "System anfragen",
    suitableFor: [
      "Relaunches",
      "CRM-Anbindung",
      "Automatisierung",
      "Landingpages",
      "Wachstumsprojekte",
    ],
    includes: [
      "CRM- und Formularlogik",
      "n8n, Zapier oder eigene Flows",
      "SEO- und Content-Ausbau",
      "neue Landingpages",
      "Reporting und Priorisierung",
      "kleine Software-Flows",
    ],
    visibleIncludes: 6,
  },
] satisfies readonly PricingTier[];

export const pricingAddOns = [
  {
    name: "Lokale SEO-Einträge",
    price: "+9 €/Monat",
    secondaryPrice: "19 €/Monat einzeln",
    description:
      "Verzeichnisse, Profile und Basisdaten eintragen. Vor allem für lokale Dienstleister sinnvoll.",
  },
  {
    name: "SEO & Content-Ausbau",
    price: "ab 149 €/Monat",
    description:
      "Neue Inhalte, Landingpages und Search-Console-Blick, wenn die Seite nach dem Launch weiter wachsen soll.",
  },
  {
    name: "Zusätzliche Sprache",
    price: "ab 19 €/Monat",
    description:
      "Für übersetzte Seitenbereiche, wenn die zweite Sprache nicht nur halb mitlaufen soll.",
  },
  {
    name: "Zusätzliche Domain",
    price: "+3 €/Monat",
    description:
      "Für weitere Domains, Kampagnenadressen oder Weiterleitungen.",
  },
  {
    name: "Zusätzliches E-Mail-Postfach",
    price: "+2 €/Monat",
    description:
      "Für weitere Postfächer im Setup. Vor allem für kleine Unternehmen mit mehreren Mitarbeitenden sinnvoll.",
  },
  {
    name: "Sonderwünsche",
    price: "nach Angebot",
    description:
      "Für Integrationen, Animationen oder CMS-Logik, die besser kurz besprochen als pauschal bepreist wird.",
  },
] satisfies readonly PricingAddOn[];

export const fixedPriceAlternatives = [
  {
    slug: "website-check",
    name: "Website Check",
    price: "99 €",
    description:
      "für Neukunden, wird bei anschließendem Abo oder Festpreis-Paket angerechnet",
  },
  {
    slug: "rohbau",
    name: "Rohbau",
    price: "ab 799 €",
    description: "für kleine Websites, wenn du lieber einmalig startest",
  },
  {
    slug: "sanierung",
    name: "Sanierung",
    price: "ab 1.499 €",
    description: "für Relaunches mit neuer Struktur, Design und SEO-Basis",
  },
  {
    slug: "bauwerk",
    name: "Bauwerk",
    price: "ab 2.499 €",
    description: "für Plattformen, Automatisierung und technische Ausbauten",
  },
] satisfies readonly FixedPriceAlternative[];

export type FaqLink = {
  label: string;
  href: string;
};

export type Faq = {
  q: string;
  a: string;
  links?: readonly FaqLink[];
};

export const faqs: readonly Faq[] = [
  {
    q: "Was kostet eine professionelle Website für ein kleines Unternehmen?",
    a: "Der template-nahe Einstieg startet ab 29 € pro Monat. Die empfohlene individuelle Website liegt bei 69 € pro Monat. Wenn ein einmaliger Festpreis besser passt, startet Rohbau ab 799 €. Der genaue Umfang hängt von Seitenanzahl, Inhalten und Integrationen ab.",
    links: [
      {
        label: "Website erstellen lassen",
        href: "/website-erstellen-lassen-deutschland",
      },
      {
        label: "Webdesign für kleine Unternehmen",
        href: "/webdesign-kleine-unternehmen",
      },
    ],
  },
  {
    q: "Wie lange dauert ein Website-Projekt?",
    a: "Die meisten Projekte gehen in 3 bis 6 Wochen live. Entscheidend sind Freigaben, vorhandene Inhalte und ob ein Relaunch ansteht.",
  },
  {
    q: "Für wen ist Stackwerkhaus die richtige Wahl?",
    a: "Vor allem für Dienstleister, kleine Unternehmen und neue Marken, die eine Website mit klarer Nutzerführung und sauberer Technik brauchen.",
    links: [
      {
        label: "Webdesign kleine Unternehmen",
        href: "/webdesign-kleine-unternehmen",
      },
    ],
  },
  {
    q: "Was ist im Projekt normalerweise enthalten?",
    a: "Struktur, Copy-Führung, Design, Frontend-Umsetzung, Responsive-Optimierung, technisches SEO-Grundsetup und ein sauberer Launch.",
    links: [
      {
        label: "Next.js Website",
        href: "/nextjs-website-erstellen-lassen",
      },
      {
        label: "Landingpage",
        href: "/landingpage-erstellen-lassen",
      },
    ],
  },
  {
    q: "Kann ich Inhalte später selbst anpassen?",
    a: "Ja. Die Struktur ist so geplant, dass spätere Ergänzungen und neue Inhalte ohne Komplettumbau integriert werden können.",
    links: [
      {
        label: "Next.js Website",
        href: "/nextjs-website-erstellen-lassen",
      },
      {
        label: "KI-Automatisierung",
        href: "/ki-website-automatisierung",
      },
    ],
  },
  {
    q: "Übernehmt ihr auch Relaunches bestehender Websites?",
    a: "Ja. Bestehende Inhalte werden neu geordnet, modernisiert und für Nutzer wie Suchmaschinen sinnvoller strukturiert.",
  },
] as const;
