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
    highlight: "Klarer im Angebot",
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

export type PricingFeature = {
  label: string;
  enabled: boolean;
};

export type PricingTier = {
  name: string;
  price: string;
  originalPrice?: string;
  discountLabel?: string;
  decision: string;
  description: string;
  timeline: string;
  pages: string;
  features: readonly PricingFeature[];
  highlight?: boolean;
};

const pricingFeatureLabels = [
  "Mobiloptimiertes Design",
  "Rechtliches Setup",
  "Kontaktformular und Hosting",
  "SEO-Basis und Indexieren",
  "CMS für eigene Inhalte",
  "Blog und Auswertung",
  "Custom-Funktionen",
  "Buchungssystem",
  "Newsletter-Automation",
  "CRM oder n8n-Anbindung",
  "Performance und QA",
  "Brand-System und Ausbau-Support",
] as const;

const pricingFeaturesUntil = (includedCount: number) =>
  pricingFeatureLabels.map((label, index) => ({
    label,
    enabled: index < includedCount,
  }));

export const pricingTiers = [
  {
    name: "Rohbau",
    price: "799",
    originalPrice: "899",
    discountLabel: "11 % Rabatt für Neukunden",
    decision: "schnell online",
    description:
      "Für neue Websites oder sehr schwache bestehende Seiten.",
    timeline: "3 Wochen",
    pages: "5 Seiten",
    features: pricingFeaturesUntil(4),
  },
  {
    name: "Sanierung",
    price: "1.499",
    decision: "Relaunch mit Ausbau",
    description:
      "Für Relaunches, bei denen Struktur, Design und Technik neu sortiert werden.",
    timeline: "4 Wochen",
    pages: "bis 8 Seiten",
    highlight: true,
    features: pricingFeaturesUntil(7),
  },
  {
    name: "Bauwerk",
    price: "2.499",
    decision: "Website + Automatisierungen",
    description:
      "Für Websites, Web Apps und komplexere Full Stack Projekte.",
    timeline: "5–6 Wochen",
    pages: "10+ Seiten",
    features: pricingFeaturesUntil(pricingFeatureLabels.length),
  },
] satisfies readonly PricingTier[];

export const maintenanceOffer = {
  title: "Nach dem Launch: Wartung & Wachstum ab 59 €/Monat",
  description:
    "Für Websites, die nach dem Go-live nicht einfach liegen bleiben sollen. Wir halten den Heizungskeller im Blick und liefern kleine Verbesserungen, bevor aus Kleinkram wieder Baustelle wird.",
  features: [
    "Monitoring",
    "Kleine Änderungen",
    "Search-Console-Sichtung",
    "Backup/Updates",
    "Monatlicher Mini-Report",
  ],
} as const;

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
    a: "Fokussierte Projekte starten ab 799 €. Der genaue Preis hängt vom Seitenumfang, den Inhalten und den Integrationen ab. Für Neukunden kann bei Buchung ein Rabatt angerechnet werden.",
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
