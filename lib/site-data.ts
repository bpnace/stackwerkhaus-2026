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
    title: "Maschinenraum inklusive",
    description:
      "Full Stack Development für Web Apps, APIs, Backends und digitale Produkte, bei denen nicht nur die Fassade stimmen muss.",
  },
] as const;

export const serviceProcessSteps = [
  {
    number: "01",
    title: "Bauaufnahme",
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
  description: string;
  timeline: string;
  pages: string;
  features: readonly PricingFeature[];
  highlight?: boolean;
};

export const pricingTiers = [
  {
    name: "Starter",
    price: "899",
    description:
      "Für Dienstleister, die schnell online gehen wollen, mit fokussiertem Einstieg und klarer technischer Basis.",
    timeline: "3 Wochen",
    pages: "5 Seiten",
    features: [
      { label: "5-seitige Next.js Website", enabled: true },
      { label: "Responsive & mobiloptimiert", enabled: true },
      { label: "DSGVO-konform inkl. Consent-Setup", enabled: true },
      { label: "Impressum & Datenschutz-Seiten", enabled: true },
      { label: "Klare Seitenstruktur & Nutzerführung", enabled: true },
      { label: "Ø 95+ Lighthouse Score", enabled: false },
      { label: "Kontaktformular", enabled: false },
      { label: "Deployment & Hosting-Setup", enabled: false },
      { label: "SEO-Grundstruktur", enabled: false },
      { label: "Google Search Console & Sitemap", enabled: false },
      { label: "Saubere Launch-Begleitung", enabled: false },
    ],
  },
  {
    name: "Business",
    price: "1.499",
    description:
      "Alles aus Starter, plus CMS, Blog, SEO-Grundlagen und Analytics für Marken mit mehr Inhalt und mehr Bewegung.",
    timeline: "4 Wochen",
    pages: "bis 8 Seiten",
    highlight: true,
    features: [
      { label: "Bis zu 8 Seiten", enabled: true },
      { label: "CMS-Integration", enabled: true },
      { label: "Blog & Artikel-Bereich", enabled: true },
      { label: "SEO-Grundoptimierung", enabled: true },
      { label: "Google Analytics Setup", enabled: true },
      { label: "Search Console & saubere Indexierung", enabled: true },
      { label: "Redaktionsfähige Inhaltsbereiche", enabled: true },
      { label: "Erweiterte Animationen", enabled: false },
      { label: "Newsletter-Anbindung", enabled: false },
      { label: "Conversion-orientierte Landingpages", enabled: false },
      { label: "Individuelle Funnel-Logik", enabled: false },
    ],
  },
  {
    name: "Premium",
    price: "2.499",
    description:
      "Maximale digitale Präsenz mit Custom Features, Integrationen und vollständigerem System für Wachstum und Launch.",
    timeline: "5–6 Wochen",
    pages: "10+ Seiten",
    features: [
      { label: "10+ Seiten inkl. Landingpages", enabled: true },
      { label: "Custom-Funktionen & Integrationen", enabled: true },
      { label: "Online-Buchungssystem", enabled: true },
      { label: "Newsletter-Automation", enabled: true },
      { label: "Performance-Optimierung", enabled: true },
      { label: "Tracking- & Event-Konzept", enabled: true },
      { label: "CRM-, Zapier- oder n8n-Anbindung", enabled: true },
      { label: "Brand-System & Style Guide", enabled: true },
      { label: "Launch-Support & QA", enabled: true },
      { label: "Staging-, Device- & Browser-Testing", enabled: true },
      { label: "Übergabe mit Ausbau-Perspektive", enabled: true },
    ],
  },
] satisfies readonly PricingTier[];

export const faqs = [
  {
    q: "Was kostet eine professionelle Website für ein kleines Unternehmen?",
    a: "Fokussierte Projekte starten ab 899 €. Der genaue Preis hängt vom Seitenumfang, den Inhalten und den Integrationen ab.",
  },
  {
    q: "Wie lange dauert ein Website-Projekt?",
    a: "Die meisten Projekte gehen in 3 bis 6 Wochen live. Entscheidend sind Freigaben, vorhandene Inhalte und ob ein Relaunch ansteht.",
  },
  {
    q: "Für wen ist Stackwerkhaus die richtige Wahl?",
    a: "Vor allem für Dienstleister, kleine Unternehmen und neue Marken, die eine Website mit klarer Nutzerführung und sauberer Technik brauchen.",
  },
  {
    q: "Was ist im Projekt normalerweise enthalten?",
    a: "Struktur, Copy-Führung, Design, Frontend-Umsetzung, Responsive-Optimierung, technisches SEO-Grundsetup und ein sauberer Launch.",
  },
  {
    q: "Kann ich Inhalte später selbst anpassen?",
    a: "Ja. Die Struktur ist so geplant, dass spätere Ergänzungen und neue Inhalte ohne Komplettumbau integriert werden können.",
  },
  {
    q: "Übernehmt ihr auch Relaunches bestehender Websites?",
    a: "Ja. Bestehende Inhalte werden neu geordnet, modernisiert und für Nutzer wie Suchmaschinen sinnvoller strukturiert.",
  },
] as const;
