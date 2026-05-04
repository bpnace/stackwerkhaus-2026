import type { LandingPage } from "@/lib/landing-pages";

const verticalLandingPageUpdatedAt = "2026-05-04";

type VerticalPageConfig = {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  heroText: string;
  answerHeading: string;
  directAnswer: string;
  guideHeading: string;
  finalHeading: string;
  keywords: readonly string[];
  homeTitle: string;
  homeDescription: string;
  audience: string;
  notFor: string;
  specificProblem: string;
  structureSummary: string;
  structureRows: readonly (readonly [string, string, string])[];
  items: readonly string[];
  caseTeaser: {
    heading: string;
    text: string;
    href: string;
    label: string;
  };
  priceSummary: string;
  priceRows: readonly (readonly [string, string, string])[];
  extraSection?: {
    heading: string;
    summary: string;
    paragraphs: readonly string[];
    contextualLinks?: readonly {
      href: string;
      label: string;
      description: string;
    }[];
  };
  faqs: readonly {
    question: string;
    answer: string;
  }[];
  internalLinks: readonly {
    href: string;
    label: string;
    description: string;
  }[];
  schema: LandingPage["schema"];
};

function createVerticalLandingPage(config: VerticalPageConfig): LandingPage {
  return {
    slug: config.slug,
    path: `/${config.slug}`,
    title: config.title,
    metaDescription: config.metaDescription,
    h1: config.h1,
    heroText: config.heroText,
    answerHeading: config.answerHeading,
    directAnswer: config.directAnswer,
    guideHeading: config.guideHeading,
    finalHeading: config.finalHeading,
    updatedAt: verticalLandingPageUpdatedAt,
    keywords: config.keywords,
    homeTitle: config.homeTitle,
    homeDescription: config.homeDescription,
    sections: [
      {
        heading: "Für wen diese Seite gedacht ist",
        summary: config.audience,
        paragraphs: [
          config.specificProblem,
          config.notFor,
        ],
      },
      {
        heading: "Abgrenzung zur Hauptleistung",
        summary:
          "Diese Vertikalseite hat eine eigene Suchintention und verweist bewusst auf die passende allgemeinere Leistung, wenn der Bedarf breiter ist.",
        paragraphs: [
          "Die Seite ist nicht nur eine umbenannte Standard-Landingpage. Sie beantwortet die branchentypischen Fragen vor einer Anfrage: Welche Inhalte braucht diese Art Website, welche Vertrauenselemente sind nötig, welcher Preisrahmen ist realistisch und wann reicht eine kleinere Lösung?",
          "Wenn die Branche noch nicht feststeht, ist die allgemeine Webdesign-Seite der bessere Einstieg. Wenn schon eine konkrete Kampagne oder ein Produktlaunch geplant ist, passt eine Landingpage- oder Next.js-Seite oft genauer.",
        ],
        contextualLinks: config.internalLinks.slice(0, 2),
      },
      {
        heading: "Empfohlene Seitenstruktur",
        summary: config.structureSummary,
        paragraphs: [
          "Eine gute Branchen-Website muss nicht mehr Seiten haben als nötig. Sie braucht aber eine Reihenfolge, die zur Entscheidung der Zielgruppe passt: Orientierung, Vertrauen, Leistungsdetails, Ablauf, Preisrahmen, Einwände und Kontakt.",
        ],
        items: config.items,
        table: {
          caption: `${config.h1}: empfohlene Struktur`,
          columns: ["Baustein", "Aufgabe", "Warum es Suchanfragen hilft"],
          rows: config.structureRows,
        },
      },
      {
        heading: config.caseTeaser.heading,
        summary:
          "Der Caseteaser ist ein naher Projektbeleg, kein behaupteter Branchen-Case, wenn die Branche nicht exakt identisch ist.",
        paragraphs: [
          config.caseTeaser.text,
          "Für neue Seiten wird daraus kein künstlicher Referenztext gebaut. Der Projektbezug wird klar eingeordnet, damit Menschen und Suchmaschinen verstehen, welche Erfahrung tatsächlich dahintersteht.",
        ],
        contextualLinks: [
          {
            href: config.caseTeaser.href,
            label: config.caseTeaser.label,
            description:
              "Projektbeleg für Struktur, Nutzerführung, Angebotslogik oder technische Umsetzung.",
          },
        ],
      },
      {
        heading: "Preisrahmen",
        summary: config.priceSummary,
        paragraphs: [
          "Der Preis hängt vor allem von Seitenumfang, Inhaltsarbeit, Designanspruch, Formularen, Terminlogik, CMS, Tracking, Automatisierung und Abstimmungsaufwand ab. Deshalb ist ein Preisrahmen ehrlicher als ein pauschaler Festpreis ohne Kontext.",
        ],
        table: {
          caption: `${config.h1}: Preisrahmen`,
          columns: ["Umfang", "Preisrahmen", "Wann es passt"],
          rows: config.priceRows,
        },
      },
      ...(config.extraSection ? [config.extraSection] : []),
      {
        heading: "AEO- und Suchlogik",
        summary:
          "Die Seite ist so aufgebaut, dass Google und KI-Suchen direkte Antworten, Preise, FAQ, interne Links und Projektbelege leichter extrahieren können.",
        paragraphs: [
          "Jede wichtige Frage wird sichtbar beantwortet, statt nur in Marketingtext versteckt zu werden. Der direkte Antwortblock liefert die Kurzfassung, die FAQ decken konkrete Einwände ab und die Tabellen machen Umfang sowie Preislogik vergleichbar.",
          "Das ersetzt keine Ranking-Garantie. Es schafft aber eine bessere Grundlage für klassische Suche, AI Overviews, Perplexity, ChatGPT Search und andere Antwortsysteme, weil die Inhalte eindeutiger, aktueller und zitierfähiger sind.",
        ],
      },
    ],
    faqs: config.faqs,
    internalLinks: config.internalLinks,
    schema: config.schema,
  };
}

export const verticalLandingPages = [
  createVerticalLandingPage({
    slug: "webdesign-therapeuten-berlin",
    title: "Webdesign für Therapeuten in Berlin | Stackwerkhaus",
    metaDescription:
      "Webdesign für Therapeuten in Berlin: vertrauensvolle Praxis-Website mit klaren Leistungen, Terminweg, Datenschutz-Basis, FAQ und Preisrahmen ab 799 Euro.",
    h1: "Webdesign für Therapeuten in Berlin",
    heroText:
      "Therapie-Websites müssen ruhig, seriös und verständlich wirken. Stackwerkhaus baut Praxis-Websites für Therapeuten, Heilpraktiker und therapeutische Angebote in Berlin, die Leistungen behutsam erklären, Vertrauen aufbauen und den Weg zur Kontaktaufnahme klar machen. Wichtig sind sensible Sprache, mobile Darstellung, Datenschutz-Basis, Terminlogik, FAQ und eine Struktur, die nicht nach aggressiver Werbung klingt.",
    answerHeading: "Eine neue Webseite für Therapeuten und Praxen?",
    directAnswer:
      "Eine gute Website für Therapeuten in Berlin erklärt Spezialisierung, Ablauf, Kostenrahmen, Kontaktweg und Vertrauen, ohne reißerisch zu wirken. Stackwerkhaus baut dafür ruhige Praxis-Websites ab 799 Euro; Relaunches mit mehr Struktur starten meist ab 1.499 Euro.",
    guideHeading: "Praxis-Website einordnen",
    finalHeading: "Praxisauftritt planen.",
    keywords: [
      "Webdesign Therapeuten Berlin",
      "Website für Therapeuten erstellen lassen",
      "Praxis Website Berlin",
      "Website Psychotherapie Berlin",
      "Webdesign Heilpraktiker Berlin",
      "Therapeuten Website DSGVO",
    ],
    homeTitle: "Therapeuten",
    homeDescription:
      "Praxis-Websites mit ruhiger Sprache, Vertrauen, Terminweg und Datenschutz-Basis.",
    audience:
      "Für therapeutische Praxen, Heilpraktiker, Coaches mit sensiblen Themen und Berliner Angebote, die seriös sichtbar werden möchten.",
    specificProblem:
      "Bei therapeutischen Angeboten suchen Menschen selten nach lauter Werbung. Sie suchen Orientierung, Vertrauen, Erreichbarkeit und ein Gefühl dafür, ob der Kontakt sicher und passend ist. Die Website muss diese Unsicherheit reduzieren, bevor ein Erstkontakt entsteht.",
    notFor:
      "Wenn es nur um eine einzelne Kampagne oder bezahlte Leadseite geht, ist die Landingpage-Leistung passender. Wenn eine komplexe Buchungsplattform gebaut werden soll, sollte die Next.js- oder Automatisierungsseite zusätzlich eingeplant werden.",
    structureSummary:
      "Die Struktur sollte Spezialisierung, Rahmenbedingungen, Ablauf, Kontakt und rechtliche Grundinformationen trennen.",
    structureRows: [
      ["Leistungsbereiche", "Therapie- oder Beratungsschwerpunkte klar erklären", "Bedient konkrete Suchanfragen nach Thema und Ort."],
      ["Ablauf", "Erstkontakt, Termin, Wartezeit und Rahmen transparent machen", "Reduziert Unsicherheit vor der Anfrage."],
      ["FAQ", "Kosten, Datenschutz, Online-Termin und freie Plätze beantworten", "Liefert direkte Antwortblöcke für AEO und Longtail-Suche."],
    ],
    items: [
      "ruhige Startseite mit Spezialisierung",
      "Leistungsseiten für Schwerpunkte",
      "Kontakt- oder Terminbereich",
      "FAQ zu Kosten, Ablauf und Datenschutz",
      "Impressum, Datenschutz und Barrierefreiheitsprüfung nach Bedarf",
    ],
    caseTeaser: {
      heading: "Caseteaser: sensible digitale Kommunikation",
      text:
        "Bei Bloom und uncloud ging es um digitale Produkte in sensiblen Kontexten: reduzierte Gestaltung, klare Sprache und Nutzerführung ohne Druck. Dieser Erfahrungsrahmen ist für Therapie-Websites relevant, auch wenn es kein identischer Praxis-Case ist.",
      href: "/projekte/uncloud",
      label: "uncloud ansehen",
    },
    priceSummary:
      "Eine schlanke Praxis-Website startet ab 799 Euro. Ein Relaunch mit Inhaltsstruktur, mehreren Leistungsseiten und Terminlogik liegt meist ab 1.499 Euro.",
    priceRows: [
      ["Rohbau", "ab 799 Euro", "Für eine klare Praxis-Website mit wenigen Seiten und Kontaktweg."],
      ["Sanierung", "ab 1.499 Euro", "Für bestehende Praxis-Websites mit unklarer Struktur oder veralteter Wirkung."],
      ["Erweiterung", "ab 2.499 Euro", "Wenn Terminbuchung, CMS, Automatisierung oder komplexere Inhalte nötig sind."],
    ],
    extraSection: {
      heading: "BFSG und Terminbuchung vorsichtig prüfen",
      summary:
        "Barrierefreiheit ist bei Praxis-Websites besonders wichtig, aber nicht jede reine Informationsseite fällt automatisch gleich unter jede BFSG-Pflicht.",
      paragraphs: [
        "Seit dem 28. Juni 2025 sind BFSG-Anforderungen für bestimmte verbrauchernahe digitale Dienstleistungen relevant. Bei Praxis-Websites sollte besonders geprüft werden, ob eine Online-Terminbuchung, ein Vertragsprozess oder ein externer Buchungsdienst eingebunden ist.",
        "Stackwerkhaus kann die Website barrierearm strukturieren und technische Prüfungen vorbereiten. Eine verbindliche rechtliche Einordnung ersetzt das nicht.",
      ],
    },
    faqs: [
      {
        question: "Welche Inhalte braucht eine Website für Therapeuten?",
        answer:
          "Wichtig sind Spezialisierung, Ablauf, Kontaktweg, Kosten- oder Rahmenhinweise, Datenschutzinformationen, FAQ und eine Sprache, die Vertrauen schafft, ohne Heilversprechen oder Druck aufzubauen.",
      },
      {
        question: "Was kostet Webdesign für Therapeuten in Berlin?",
        answer:
          "Eine schlanke Praxis-Website startet bei Stackwerkhaus ab 799 Euro. Ein Relaunch mit mehr Struktur, mehreren Leistungsseiten und Terminlogik liegt meist ab 1.499 Euro.",
      },
      {
        question: "Kann eine Praxis-Website einen Online-Termin enthalten?",
        answer:
          "Ja. Der Umfang hängt davon ab, ob nur zu einem externen Tool verlinkt wird oder ob Terminlogik direkt in die Website eingebunden werden soll. Datenschutz und Barrierefreiheit sollten dabei früh geprüft werden.",
      },
      {
        question: "Ist eine Therapeuten-Website automatisch BFSG-pflichtig?",
        answer:
          "Nicht automatisch. Relevant kann es werden, wenn digitale verbrauchernahe Dienste wie Online-Buchung oder Vertragsprozesse eingebunden sind. Der konkrete Fall sollte geprüft werden.",
      },
      {
        question: "Braucht eine Therapie-Website SEO?",
        answer:
          "Ja, aber nicht als Keyword-Überladung. Sinnvoll sind klare Leistungsseiten, lokale Signale, FAQ, strukturierte Daten, schnelle Ladezeiten und verständliche Inhalte zu echten Fragen der Zielgruppe.",
      },
    ],
    internalLinks: [
      {
        href: "/webdesign-kleine-unternehmen",
        label: "Webdesign für kleine Unternehmen",
        description: "Allgemeine Grundlage für kleine Unternehmen und Praxen.",
      },
      {
        href: "/webseitecheck",
        label: "Website Check",
        description: "Bestehende Praxis-Website auf Struktur, Wirkung und Technik prüfen lassen.",
      },
      {
        href: "/webdesign-coaching-praxis",
        label: "Webdesign für Coaching-Praxen",
        description: "Wenn der Schwerpunkt stärker auf Coaching, Beratung oder Erstgesprächen liegt.",
      },
      {
        href: "/projekte/uncloud",
        label: "Projekt uncloud",
        description: "Sensible Nutzerführung für ein Mental-Health-Interface.",
      },
    ],
    schema: {
      serviceName: "Webdesign für Therapeuten in Berlin",
      serviceType: "Webdesign und Praxis-Website für therapeutische Angebote",
      description:
        "Stackwerkhaus erstellt ruhige, vertrauensvolle Praxis-Websites für Therapeuten und sensible Angebote in Berlin.",
      areaServed: "Berlin",
      offer: {
        name: "Praxis-Website",
        price: "799",
        description:
          "Praxis-Website mit Struktur, Webdesign, responsiver Umsetzung, SEO-Grundlage und Kontaktweg.",
      },
    },
  }),
  createVerticalLandingPage({
    slug: "webdesign-coaching-praxis",
    title: "Webdesign für Coaching-Praxen | Stackwerkhaus",
    metaDescription:
      "Webdesign für Coaching-Praxen: klare Positionierung, Angebotslogik, Erstgespräch-CTA, FAQ, Testimonials und Website-Struktur ab 799 Euro.",
    h1: "Webdesign für Coaching-Praxen",
    heroText:
      "Coaching-Websites müssen schnell erklären, für wen das Angebot ist, welches Problem gelöst wird und warum ein Erstgespräch sinnvoll ist. Stackwerkhaus baut Websites für Coaches, Berater und Coaching-Praxen mit klarer Positionierung, Angebotsstruktur, Termin-CTA, FAQ, Vertrauenselementen und einer technischen Grundlage für spätere Landingpages oder Automatisierung.",
    answerHeading: "Eine neue Website für Coaches und Coaching-Teams?",
    directAnswer:
      "Eine gute Coaching-Website verkauft nicht über Lautstärke, sondern über Klarheit: Zielgruppe, Problem, Methode, Ablauf, Preisrahmen und Erstgespräch müssen schnell verständlich sein. Stackwerkhaus baut solche Seiten ab 799 Euro.",
    guideHeading: "Coaching-Angebot strukturieren",
    finalHeading: "Coaching-Website klären.",
    keywords: [
      "Webdesign Coaching Praxis",
      "Website für Coach erstellen lassen",
      "Coaching Website erstellen lassen",
      "Website für Beratungspraxis",
      "Coach Landingpage erstellen lassen",
      "Webdesign Berater Coaching",
    ],
    homeTitle: "Coaching-Praxis",
    homeDescription:
      "Websites für Coaches und Berater mit klarer Positionierung und Erstgespräch-Führung.",
    audience:
      "Für Coaches, Berater, Mentoren und Praxisangebote, die ihr Angebot schärfer erklären und bessere Erstgespräche bekommen möchten.",
    specificProblem:
      "Viele Coaching-Websites sprechen über Haltung, aber zu wenig über konkrete Entscheidungshilfe. Besucher müssen verstehen, ob das Angebot zu ihrem Problem passt, wie die Zusammenarbeit läuft und was der nächste Schritt ist.",
    notFor:
      "Wenn du ein digitales Produkt, SaaS oder eine Investoren-Landingpage brauchst, ist die SaaS- oder Pre-Seed-Seite genauer. Diese Seite fokussiert personenbezogene Dienstleistung und Vertrauensaufbau.",
    structureSummary:
      "Die Website sollte Positionierung, Methode, Angebote, Erstgespräch und Nachweise in einer klaren Reihenfolge zeigen.",
    structureRows: [
      ["Positionierung", "Zielgruppe und Problem klar benennen", "Stärkt Longtail-Suchen nach Coaching-Schwerpunkt."],
      ["Angebotslogik", "Pakete, Ablauf oder Formate verständlich trennen", "Hilft bei Suchanfragen nach Coach + Leistung."],
      ["Erstgespräch", "CTA, Erwartung und Kontaktweg erklären", "Verbessert Anfragequalität und Conversion."],
    ],
    items: [
      "klare Zielgruppenansprache",
      "Methode und Ablauf",
      "Angebots- oder Paketstruktur",
      "Erstgespräch-CTA",
      "Testimonials, FAQ und Kontaktweg",
    ],
    caseTeaser: {
      heading: "Caseteaser: Angebot verständlicher machen",
      text:
        "Bei Codariq und Zynapse lag der Fokus darauf, komplexe Leistungen und Produktlogik verständlicher zu machen. Für Coaching-Praxen ist dieser Ansatz ähnlich wichtig: weniger Selbstdarstellung, mehr Entscheidungshilfe.",
      href: "/projekte/codariq",
      label: "Codariq ansehen",
    },
    priceSummary:
      "Eine fokussierte Coaching-Website startet ab 799 Euro. Wenn Positionierung, Textstruktur und mehrere Angebotsseiten neu aufgebaut werden, ist ein Rahmen ab 1.499 Euro realistischer.",
    priceRows: [
      ["Rohbau", "ab 799 Euro", "Für eine schlanke Website mit Angebot, Profil, FAQ und Kontakt."],
      ["Sanierung", "ab 1.499 Euro", "Für Relaunch, neue Positionierung und bessere Angebotsstruktur."],
      ["Landingpage", "ab 799 Euro", "Für ein einzelnes Coaching-Angebot oder eine Kampagne."],
    ],
    faqs: [
      {
        question: "Was braucht eine gute Website für Coaches?",
        answer:
          "Sie braucht klare Positionierung, ein verständliches Angebot, Ablauf, Vertrauenselemente, FAQ und einen einfachen Weg zum Erstgespräch.",
      },
      {
        question: "Was kostet eine Coaching-Website?",
        answer:
          "Der Einstieg liegt bei Stackwerkhaus ab 799 Euro. Ein Relaunch mit Textstruktur, Angebotslogik und mehreren Seiten startet meist ab 1.499 Euro.",
      },
      {
        question: "Sollte ein Coach Preise auf der Website zeigen?",
        answer:
          "Ein Preisrahmen oder eine klare Einordnung hilft häufig, unpassende Anfragen zu reduzieren. Nicht jedes Angebot braucht eine vollständige Preisliste.",
      },
      {
        question: "Kann eine Coaching-Website mit Calendly oder einem Termin-Tool arbeiten?",
        answer:
          "Ja. Termin-Tools können verlinkt oder eingebunden werden. Datenschutz, Consent und die Erwartungen an das Erstgespräch sollten dabei klar beschrieben werden.",
      },
      {
        question: "Reicht eine Landingpage statt kompletter Website?",
        answer:
          "Ja, wenn ein einzelnes Coaching-Angebot beworben wird. Für langfristige Sichtbarkeit und mehrere Angebote ist eine kleine Website meist sinnvoller.",
      },
    ],
    internalLinks: [
      {
        href: "/webdesign-kleine-unternehmen",
        label: "Webdesign für kleine Unternehmen",
        description: "Die allgemeine Webdesign-Grundlage für Dienstleister und Berater.",
      },
      {
        href: "/landingpage-erstellen-lassen",
        label: "Landingpage erstellen lassen",
        description: "Wenn nur ein Coaching-Angebot oder eine Kampagne beworben wird.",
      },
      {
        href: "/ki-website-automatisierung",
        label: "KI-Website-Automatisierung",
        description: "Für Erstgesprächsformulare, Lead-Qualifizierung und CRM-Übergabe.",
      },
      {
        href: "/webdesign-berater-berlin",
        label: "Webdesign für Berater",
        description: "Für stärker B2B-orientierte Beratungsangebote.",
      },
    ],
    schema: {
      serviceName: "Webdesign für Coaching-Praxen",
      serviceType: "Webdesign und Angebotsstruktur für Coaches und Berater",
      description:
        "Stackwerkhaus erstellt Websites für Coaching-Praxen mit klarer Positionierung, Angebotslogik und Erstgespräch-Führung.",
      offer: {
        name: "Coaching-Website",
        price: "799",
        description:
          "Website für Coaches mit Angebotsstruktur, Webdesign, responsiver Umsetzung, FAQ und Kontaktweg.",
      },
    },
  }),
  createVerticalLandingPage({
    slug: "webdesign-saas-startup",
    title: "Webdesign für SaaS-Startups | Stackwerkhaus",
    metaDescription:
      "Webdesign für SaaS-Startups: Produktstory, Demo-CTA, Pricing-Struktur, Next.js-Frontend, Casebezug und Preisrahmen ab 1.499 Euro.",
    h1: "Webdesign für SaaS-Startups",
    heroText:
      "SaaS-Websites müssen Produktwert schneller erklären als generische Unternehmensseiten. Stackwerkhaus baut SaaS-Websites und Produkt-Landingpages mit klarer Hero-Story, Use Cases, Demo-CTA, Pricing-Struktur, technischen Vertrauenselementen und performanter Next.js-Basis. Der Fokus liegt auf Verständlichkeit, Conversion und einem Frontend, das später wachsen kann.",
    answerHeading: "Was muss eine SaaS-Website leisten?",
    directAnswer:
      "Eine SaaS-Website braucht Produktklarheit, Demo-Führung, Use Cases, Pricing-Orientierung, technische Glaubwürdigkeit und schnelle Ladezeiten. Stackwerkhaus baut SaaS-Landingpages ab 1.499 Euro und größere Produkt-Websites ab 2.499 Euro.",
    guideHeading: "SaaS-Auftritt planen",
    finalHeading: "SaaS-Story schärfen.",
    keywords: [
      "Webdesign SaaS Startup",
      "SaaS Website erstellen lassen",
      "B2B SaaS Landingpage",
      "Next.js SaaS Website",
      "Startup Website erstellen lassen",
      "SaaS Produktseite Webdesign",
    ],
    homeTitle: "SaaS-Startup",
    homeDescription:
      "Produkt-Websites für SaaS-Startups mit Demo-CTA, Pricing und technischer Glaubwürdigkeit.",
    audience:
      "Für B2B-SaaS, Software-Startups, Tools und digitale Produkte, die ihr Angebot verständlicher und investierbarer erklären müssen.",
    specificProblem:
      "SaaS-Websites verlieren oft Besucher, weil sie Features aufzählen, bevor der Nutzen klar ist. Entscheidend sind Problem, Produktversprechen, Zielgruppe, Demo-Weg, Integrationen, Sicherheit und ein nachvollziehbarer Preis- oder Paketrahmen.",
    notFor:
      "Wenn du noch keine Produktthese hast, ist zuerst eine Pre-Seed-Landingpage sinnvoller. Wenn schon ein komplexes App-Frontend oder Dashboard gebaut wird, sollte die Next.js-Leistung stärker einbezogen werden.",
    structureSummary:
      "Eine SaaS-Website sollte Produktwert, Use Cases, Demo-CTA, Pricing und Proof schneller sichtbar machen als eine klassische Firmenwebsite.",
    structureRows: [
      ["Produktstory", "Problem, Lösung und Zielgruppe im ersten Screen klären", "Trifft Suchanfragen nach SaaS-Webdesign und Produktseite."],
      ["Demo-CTA", "Demo, Waitlist oder Produktkontakt klar führen", "Unterstützt Conversion- und Launch-Suchintentionen."],
      ["Proof", "Cases, technische Signale und konkrete Use Cases zeigen", "Macht die Seite zitierfähiger für AEO."],
    ],
    items: [
      "Hero mit Produktversprechen",
      "Use Cases und Zielgruppen",
      "Feature- und Nutzenlogik",
      "Demo-, Waitlist- oder Kontakt-CTA",
      "Pricing-Orientierung und technische Vertrauenssignale",
    ],
    caseTeaser: {
      heading: "Caseteaser: Zynapse und Codariq",
      text:
        "Bei Zynapse und Codariq ging es um klare B2B-Produktkommunikation, technische Glaubwürdigkeit und modularen Aufbau. Genau diese Mischung brauchen SaaS-Websites, wenn Produkt, Zielgruppe und Conversion gleichzeitig verständlich werden sollen.",
      href: "/projekte/zynapse",
      label: "Zynapse ansehen",
    },
    priceSummary:
      "Eine SaaS-Landingpage startet meist ab 1.499 Euro. Eine größere Produkt-Website mit mehreren Use Cases, Pricing und Next.js-Struktur liegt eher ab 2.499 Euro.",
    priceRows: [
      ["MVP-Landingpage", "ab 1.499 Euro", "Für einen klaren Produktpitch, Waitlist oder Demo-CTA."],
      ["Produkt-Website", "ab 2.499 Euro", "Für Use Cases, Pricing, Integrationserklärung und technische Struktur."],
      ["Web-App-Nähe", "individuell", "Wenn Frontend, Dashboard, API oder Authentifizierung Teil des Projekts werden."],
    ],
    faqs: [
      {
        question: "Was kostet eine SaaS-Website?",
        answer:
          "Eine fokussierte SaaS-Landingpage startet meist ab 1.499 Euro. Eine umfangreichere Produkt-Website mit Use Cases, Pricing und technischer Basis liegt eher ab 2.499 Euro.",
      },
      {
        question: "Braucht ein SaaS-Startup eine Website oder nur eine Landingpage?",
        answer:
          "Vor dem Product-Market-Fit reicht oft eine starke Landingpage. Sobald mehrere Zielgruppen, Use Cases oder Pricing erklärt werden müssen, ist eine Website sinnvoller.",
      },
      {
        question: "Ist Next.js für SaaS-Websites sinnvoll?",
        answer:
          "Ja, wenn Performance, Komponentenstruktur, SEO, spätere Erweiterungen oder Produktnähe wichtig sind. Für sehr einfache Seiten kann auch ein schlankerer Aufbau reichen.",
      },
      {
        question: "Welche CTA funktioniert für SaaS besser: Demo oder Kontakt?",
        answer:
          "Das hängt vom Produktstadium ab. Pre-Seed nutzt oft Waitlist oder Pilotgespräch, B2B-SaaS eher Demo, Audit oder Beratungstermin.",
      },
      {
        question: "Kann Stackwerkhaus auch SaaS-Copy strukturieren?",
        answer:
          "Ja. Der Fokus liegt auf Angebotslogik, Produktstory, Use Cases, Abschnittsstruktur und verständlicher Nutzerführung, nicht nur auf visueller Gestaltung.",
      },
    ],
    internalLinks: [
      {
        href: "/nextjs-website-erstellen-lassen",
        label: "Next.js Website erstellen lassen",
        description: "Technische Grundlage für performante SaaS-Frontends.",
      },
      {
        href: "/landingpage-pre-seed",
        label: "Landingpage für Pre-Seed",
        description: "Wenn zuerst Pitch, Waitlist oder Pilotkunden validiert werden sollen.",
      },
      {
        href: "/projekte/zynapse",
        label: "Projekt Zynapse",
        description: "B2B-SaaS-Kommunikation mit modularer Content-Struktur.",
      },
      {
        href: "/projekte/codariq",
        label: "Projekt Codariq",
        description: "Software-Marke mit stärkerer Systematik und Conversion-Strecke.",
      },
    ],
    schema: {
      serviceName: "Webdesign für SaaS-Startups",
      serviceType: "SaaS-Webdesign, Produkt-Landingpage und Next.js-Frontend",
      description:
        "Stackwerkhaus erstellt SaaS-Websites und Produkt-Landingpages mit Produktstory, Demo-CTA, Pricing-Struktur und performanter Frontend-Basis.",
      offer: {
        name: "SaaS Produkt-Website",
        price: "1499",
        description:
          "SaaS-Landingpage oder Produkt-Website mit Produktstory, Use Cases, CTA-Struktur, Webdesign und Frontend-Umsetzung.",
      },
      review: {
        name: "Technik und Business-Anforderungen verbunden",
        author: "Denis, Partner bei Immo-Pal",
        body:
          "Arthur verbindet technische Exzellenz mit einem sehr guten Verständnis für Business-Anforderungen. Genau diese Mischung hat unser Projekt deutlich beschleunigt.",
      },
    },
  }),
  createVerticalLandingPage({
    slug: "webdesign-zahnarztpraxis-berlin",
    title: "Webdesign für Zahnarztpraxen in Berlin | Stackwerkhaus",
    metaDescription:
      "Webdesign für Zahnarztpraxen in Berlin: Leistungen, Team, Terminweg, Vertrauen, BFSG-Prüfung nach Bedarf, FAQ und Preisrahmen ab 1.499 Euro.",
    h1: "Webdesign für Zahnarztpraxen in Berlin",
    heroText:
      "Zahnarzt-Websites müssen Vertrauen, Leistungen, Team, Terminweg und lokale Sichtbarkeit sauber verbinden. Stackwerkhaus erstellt Praxis-Websites für Zahnarztpraxen in Berlin mit klarer Leistungsstruktur, ruhiger Gestaltung, mobiler Nutzerführung, FAQ, Datenschutz-Basis und optionaler Prüfung von Barrierefreiheit und Terminbuchung.",
    answerHeading: "Was muss eine Website für Zahnarztpraxen leisten?",
    directAnswer:
      "Eine Website für eine Zahnarztpraxis in Berlin sollte Leistungen, Team, Terminbuchung, Notfall- oder Kontaktwege, Bewertungen und Barrierefreiheit klar strukturieren. Realistische Relaunch-Projekte starten meist ab 1.499 Euro.",
    guideHeading: "Zahnarztpraxis digital ordnen",
    finalHeading: "Praxis-Website prüfen.",
    keywords: [
      "Webdesign Zahnarztpraxis Berlin",
      "Website Zahnarzt erstellen lassen",
      "Zahnarzt Website Berlin",
      "Praxis Website Zahnarzt",
      "BFSG Zahnarzt Website",
      "Zahnarztpraxis Website Relaunch",
    ],
    homeTitle: "Zahnarztpraxis",
    homeDescription:
      "Praxis-Websites für Berliner Zahnarztpraxen mit Leistungen, Team, Terminweg und Vertrauen.",
    audience:
      "Für Berliner Zahnarztpraxen, die online professioneller wirken und Patienten schneller zu Leistung, Termin und Kontakt führen möchten.",
    specificProblem:
      "Zahnarzt-Websites tragen viele unterschiedliche Entscheidungen: Kontrolle, Behandlung, Notfall, Ästhetik, Team, Kostenfragen und Terminbuchung. Wenn alles gleich wichtig wirkt, finden Patienten den nächsten Schritt zu langsam.",
    notFor:
      "Wenn nur eine kleine Informationsseite ohne Terminweg gebraucht wird, kann eine schlankere Praxis-Website reichen. Wenn mehrere Standorte, komplexe Buchung oder CMS-Pflege nötig sind, wird das Projekt größer.",
    structureSummary:
      "Die Website sollte Leistungen, Team, Terminweg, Vertrauen, lokale Orientierung und FAQ sauber trennen.",
    structureRows: [
      ["Leistungen", "Behandlungen verständlich gruppieren", "Hilft bei lokalen Suchanfragen nach konkreter Leistung."],
      ["Team und Praxis", "Menschen, Räume und Vertrauen sichtbar machen", "Reduziert Unsicherheit vor dem ersten Termin."],
      ["Terminweg", "Online-Buchung, Telefon oder Formular klar erklären", "Verbessert lokale Conversion."],
    ],
    items: [
      "Leistungsübersicht",
      "Team- und Praxisbereich",
      "Termin- oder Kontakt-CTA",
      "FAQ zu Behandlungen, Kosten und Ablauf",
      "lokale SEO- und Barrierefreiheitsprüfung nach Bedarf",
    ],
    caseTeaser: {
      heading: "Caseteaser: Health-Vertrauen ohne laute Claims",
      text:
        "Bloom und uncloud zeigen, wie sensible digitale Angebote ruhiger und klarer geführt werden können. Für Zahnarztpraxen ist dieser Ansatz relevant, weil Vertrauen wichtiger ist als laute Verkaufsrhetorik.",
      href: "/projekte/bloom",
      label: "Bloom ansehen",
    },
    priceSummary:
      "Für Zahnarztpraxen ist ein Rahmen ab 1.499 Euro realistischer, weil Leistungen, Team, Terminlogik, lokale SEO und Compliance-Fragen meist mehr Abstimmung brauchen.",
    priceRows: [
      ["Relaunch", "ab 1.499 Euro", "Für bestehende Praxis-Websites mit neuer Struktur und besserer Wirkung."],
      ["Erweiterte Praxis-Website", "ab 2.499 Euro", "Für mehrere Leistungsseiten, CMS, Terminlogik oder mehrere Standorte."],
      ["Kurzcheck", "kostenloser Einstieg", "Für erste Einschätzung von Struktur, Kontaktweg und technischer Grundlage."],
    ],
    extraSection: {
      heading: "BFSG, Terminbuchung und Praxisrealität",
      summary:
        "Bei Zahnarztpraxen sollte Barrierefreiheit besonders dann geprüft werden, wenn digitale Termin- oder Vertragsprozesse auf der Website stattfinden.",
      paragraphs: [
        "Die Zahnärztekammer Berlin weist auf BFSG-Relevanz für bestimmte Praxis-Websites mit Buchungstools hin, markiert aber auch offene Detailfragen. Deshalb sollte eine Zahnarzt-Website nicht mit pauschalen Rechtsversprechen geplant werden.",
        "Pragmatisch heißt das: Inhalte klar strukturieren, Kontraste, Tastaturführung, Formulare, Bilder, Alt-Texte und Buchungswege früh prüfen und rechtliche Spezialfragen separat klären.",
      ],
    },
    faqs: [
      {
        question: "Was kostet eine Website für eine Zahnarztpraxis?",
        answer:
          "Ein realistischer Relaunch startet meist ab 1.499 Euro. Bei vielen Leistungsseiten, Terminbuchung, CMS oder mehreren Standorten kann der Umfang ab 2.499 Euro liegen.",
      },
      {
        question: "Welche Inhalte braucht eine Zahnarzt-Website?",
        answer:
          "Wichtig sind Leistungen, Team, Praxisinformationen, Terminweg, Notfall- oder Kontaktinformationen, FAQ, Datenschutz, Impressum und lokale Orientierung.",
      },
      {
        question: "Ist eine Zahnarzt-Website BFSG-pflichtig?",
        answer:
          "Das hängt vom konkreten digitalen Angebot ab. Besonders Online-Terminbuchung und verbrauchernahe digitale Dienste sollten geprüft werden. Eine pauschale Aussage ist unseriös.",
      },
      {
        question: "Kann Stackwerkhaus Bewertungsnähe oder Testimonials integrieren?",
        answer:
          "Ja, wenn die Inhalte rechtlich sauber, echt und sichtbar sind. Fake-Bewertungen oder unsichtbares Review-Schema werden nicht eingebaut.",
      },
      {
        question: "Braucht eine Zahnarztpraxis lokale SEO?",
        answer:
          "Ja. Standort, Leistungen, interne Struktur, Google Business Profile, schnelle Ladezeit und klare Kontaktwege sind für lokale Sichtbarkeit wichtig.",
      },
    ],
    internalLinks: [
      {
        href: "/webdesign-therapeuten-berlin",
        label: "Webdesign für Therapeuten",
        description: "Verwandte Praxis-Website mit sensibler Kommunikation.",
      },
      {
        href: "/webdesign-kleine-unternehmen",
        label: "Webdesign für kleine Unternehmen",
        description: "Allgemeine Webdesign-Grundlage für lokale Dienstleister.",
      },
      {
        href: "/webseitecheck",
        label: "Website Check",
        description: "Bestehende Praxis-Website schnell einschätzen lassen.",
      },
      {
        href: "/projekte/bloom",
        label: "Projekt Bloom",
        description: "Health-nahe Produktkommunikation mit ruhiger Nutzerführung.",
      },
    ],
    schema: {
      serviceName: "Webdesign für Zahnarztpraxen in Berlin",
      serviceType: "Webdesign und Relaunch für Zahnarztpraxen",
      description:
        "Stackwerkhaus erstellt Praxis-Websites für Zahnarztpraxen in Berlin mit Leistungsstruktur, Terminweg, Vertrauen und Compliance-Prüfung nach Bedarf.",
      areaServed: "Berlin",
      offer: {
        name: "Zahnarztpraxis-Website",
        price: "1499",
        description:
          "Praxis-Website oder Relaunch für Zahnarztpraxen mit Leistungsstruktur, Team, Terminweg, FAQ und SEO-Grundlage.",
      },
    },
  }),
  createVerticalLandingPage({
    slug: "landingpage-pre-seed",
    title: "Landingpage für Pre-Seed-Startups | Stackwerkhaus",
    metaDescription:
      "Landingpage für Pre-Seed-Startups: Produktpitch, Waitlist, Pilotkunden, Tracking, Investorenfähigkeit und Next.js-Basis ab 1.499 Euro.",
    h1: "Landingpage für Pre-Seed-Startups",
    heroText:
      "Vor der Seed-Runde muss eine Landingpage nicht alles können. Sie muss die Produktthese, Zielgruppe, Problem, Nutzen, Proof, Waitlist oder Demo-Anfrage schnell verständlich machen. Stackwerkhaus baut Pre-Seed-Landingpages für Startups, die Pilotkunden, Investorengespräche oder Marktsignale erzeugen wollen, ohne direkt eine große Website aufzubauen.",
    answerHeading: "Was braucht eine Pre-Seed-Landingpage?",
    directAnswer:
      "Eine Pre-Seed-Landingpage sollte Produktthese, Zielgruppe, Problem, Nutzen, Demo- oder Waitlist-CTA und Tracking klar zeigen. Stackwerkhaus baut solche MVP-Landingpages ab 1.499 Euro; größere Produkt-Websites starten eher ab 2.499 Euro.",
    guideHeading: "Pre-Seed-Launch sortieren",
    finalHeading: "Pitch-Seite bauen.",
    keywords: [
      "Landingpage Pre Seed",
      "Startup Landingpage erstellen lassen",
      "Pre Seed Website",
      "Waitlist Landingpage Startup",
      "MVP Landingpage erstellen lassen",
      "Investor Landingpage Startup",
    ],
    homeTitle: "Pre-Seed",
    homeDescription:
      "Landingpages für Produktthese, Waitlist, Demo-Anfragen und erste Marktsignale.",
    audience:
      "Für Startups vor oder rund um Pre-Seed, die Produktidee, Pilotkunden und Investorenkommunikation testen wollen.",
    specificProblem:
      "In der frühen Phase ist zu viel Website oft Ballast. Entscheidend ist, ob fremde Menschen schnell verstehen, welches Problem gelöst wird, für wen das Produkt gedacht ist und warum sie sich eintragen oder eine Demo buchen sollten.",
    notFor:
      "Wenn bereits mehrere Use Cases, Pricing, Integrationen und Produktseiten nötig sind, ist die SaaS-Startup-Seite passender. Diese Seite ist für den fokussierten Pitch vor dem Vollausbau.",
    structureSummary:
      "Eine Pre-Seed-Landingpage sollte auf Hypothese, Proof und messbare Handlung optimiert sein.",
    structureRows: [
      ["Produktthese", "Problem, Zielgruppe und Nutzen klar formulieren", "Trifft Suchanfragen nach Startup- und MVP-Landingpage."],
      ["Proof", "Team, Demo, Screens oder Pilotansatz zeigen", "Erhöht Vertrauen ohne übertriebene Claims."],
      ["Tracking", "Waitlist, Demo oder Kontakt messbar machen", "Hilft bei Investorengesprächen und Validierung."],
    ],
    items: [
      "Produktpitch im ersten Screen",
      "Zielgruppe und Use Case",
      "Demo-, Waitlist- oder Pilotkunden-CTA",
      "Proof-Elemente und Roadmap-Hinweise",
      "Tracking- und Analytics-Grundsetup",
    ],
    caseTeaser: {
      heading: "Caseteaser: Produkt vor Vollausbau erklären",
      text:
        "Zynapse und Codariq zeigen, wie digitale Produktangebote modular erklärt werden können. Für Pre-Seed-Landingpages wird diese Logik auf das Wesentliche reduziert: These, Nutzen, Proof und Handlung.",
      href: "/projekte/zynapse",
      label: "Zynapse ansehen",
    },
    priceSummary:
      "Eine Pre-Seed-Landingpage startet ab 1.499 Euro, weil Produktstory, Struktur, Design, Frontend und Tracking zusammenpassen müssen.",
    priceRows: [
      ["MVP-Landingpage", "ab 1.499 Euro", "Für Produktthese, Waitlist, Demo-CTA und Tracking."],
      ["Pitch-Website", "ab 2.499 Euro", "Für mehrere Zielgruppen, Use Cases, Pricing und Investorenmaterial."],
      ["Produkt-Frontend", "individuell", "Wenn App-UI, Dashboard oder API-Anbindung Teil des Projekts werden."],
    ],
    faqs: [
      {
        question: "Was kostet eine Landingpage für ein Pre-Seed-Startup?",
        answer:
          "Eine fokussierte MVP- oder Waitlist-Landingpage startet bei Stackwerkhaus ab 1.499 Euro. Mehrere Use Cases, Pricing oder Produkt-Frontend erhöhen den Umfang.",
      },
      {
        question: "Wann reicht eine Landingpage statt kompletter Startup-Website?",
        answer:
          "Wenn zuerst Produktthese, Zielgruppe und Nachfrage validiert werden sollen, reicht oft eine Landingpage. Eine Website lohnt sich, sobald mehrere Use Cases oder Zielgruppen erklärt werden müssen.",
      },
      {
        question: "Kann die Landingpage später zur SaaS-Website wachsen?",
        answer:
          "Ja. Wenn die technische Basis sauber geplant wird, kann die Pre-Seed-Landingpage später um Produktseiten, Blog, CMS oder App-nahe Frontends erweitert werden.",
      },
      {
        question: "Welche Metriken sollte eine Pre-Seed-Landingpage messen?",
        answer:
          "Sinnvoll sind CTA-Klicks, Formularstarts, Waitlist-Einträge, Demo-Anfragen, Scrolltiefe und die Qualität der eingehenden Anfragen.",
      },
      {
        question: "Schreibt Stackwerkhaus auch die Produktstory?",
        answer:
          "Stackwerkhaus hilft bei Struktur, Positionierung, Abschnittslogik und Conversion-Texten. Fachliche Produktdetails kommen aus dem Startup.",
      },
    ],
    internalLinks: [
      {
        href: "/landingpage-erstellen-lassen",
        label: "Landingpage erstellen lassen",
        description: "Allgemeine Landingpage-Leistung für Angebote und Kampagnen.",
      },
      {
        href: "/webdesign-saas-startup",
        label: "Webdesign für SaaS-Startups",
        description: "Wenn die Landingpage zur größeren Produkt-Website werden soll.",
      },
      {
        href: "/nextjs-website-erstellen-lassen",
        label: "Next.js Website erstellen lassen",
        description: "Für Performance, Skalierung und saubere Frontend-Basis.",
      },
      {
        href: "/projekte/zynapse",
        label: "Projekt Zynapse",
        description: "B2B-SaaS-Kommunikation mit modularer Content-Struktur.",
      },
    ],
    schema: {
      serviceName: "Landingpage für Pre-Seed-Startups",
      serviceType: "Startup-Landingpage, Waitlist-Seite und Produktpitch",
      description:
        "Stackwerkhaus erstellt Pre-Seed-Landingpages für Startups mit Produktthese, Waitlist, Demo-CTA und Tracking-Grundsetup.",
      offer: {
        name: "Pre-Seed Landingpage",
        price: "1499",
        description:
          "Fokussierte Startup-Landingpage mit Produktstory, CTA, Webdesign, Frontend-Umsetzung und Tracking-Grundsetup.",
      },
      review: {
        name: "Technik und Business-Anforderungen verbunden",
        author: "Denis, Partner bei Immo-Pal",
        body:
          "Arthur verbindet technische Exzellenz mit einem sehr guten Verständnis für Business-Anforderungen. Genau diese Mischung hat unser Projekt deutlich beschleunigt.",
      },
    },
  }),
  createVerticalLandingPage({
    slug: "webdesign-handwerk-berlin",
    title: "Webdesign für Handwerk in Berlin | Stackwerkhaus",
    metaDescription:
      "Webdesign für Handwerksbetriebe in Berlin: hochwertige Website mit Leistungen, Referenzen, lokaler Sichtbarkeit, FAQ und Preisrahmen ab 799 Euro.",
    h1: "Webdesign für Handwerk in Berlin",
    heroText:
      "Handwerks-Websites müssen Qualität sichtbar machen, ohne nach austauschbarer Angebotsseite zu wirken. Stackwerkhaus baut Websites für Handwerksbetriebe, Werkstätten, Innenausbau, Manufakturen und lokale Dienstleister in Berlin mit klaren Leistungen, starken Referenzen, lokaler Struktur, Kontaktweg und hochwertiger visueller Führung.",
    answerHeading: "Eine neue Webseite für Handwerk und Dienstleistungen?",
    directAnswer:
      "Eine gute Website für Handwerk in Berlin zeigt Leistungen, Materialqualität, Referenzen, Einzugsgebiet, Ablauf und Kontaktweg klar. Stackwerkhaus baut schlanke Handwerks-Websites ab 799 Euro; Relaunches mit Referenzstruktur starten meist ab 1.499 Euro.",
    guideHeading: "Handwerk digital zeigen",
    finalHeading: "Handwerksauftritt bauen.",
    keywords: [
      "Webdesign Handwerk Berlin",
      "Website Handwerker erstellen lassen",
      "Handwerksbetrieb Website Berlin",
      "Website Innenausbau Berlin",
      "Webdesign Manufaktur Berlin",
      "Handwerker Website SEO",
    ],
    homeTitle: "Handwerk Berlin",
    homeDescription:
      "Websites für Handwerk, Werkstätten und Manufakturen mit Leistungen, Referenzen und lokaler Sichtbarkeit.",
    audience:
      "Für Handwerksbetriebe, Manufakturen, Innenausbau, Werkstätten und lokale Anbieter, die ihre Qualität professioneller zeigen möchten.",
    specificProblem:
      "Viele Handwerks-Websites zeigen zwar Leistungen, aber zu wenig Materialität, Prozess und Vertrauen. Besucher wollen wissen, ob die Arbeit hochwertig ist, welche Leistungen angeboten werden und wie schnell eine Anfrage sinnvoll ist.",
    notFor:
      "Wenn ein komplexer Konfigurator oder eine Plattform geplant ist, reicht eine klassische Website nicht aus. Dann sollte die Next.js- oder Automatisierungsleistung geprüft werden.",
    structureSummary:
      "Die Website sollte Leistungen, Referenzen, Einzugsgebiet, Ablauf und Kontaktweg klar trennen.",
    structureRows: [
      ["Leistungen", "Gewerke und Angebote verständlich gruppieren", "Hilft bei lokalen Suchanfragen nach Leistung + Ort."],
      ["Referenzen", "Bilder, Projektkontext und Qualität sichtbar machen", "Ersetzt leere Behauptungen durch Belege."],
      ["Kontakt", "Anfrageweg, Region und nächste Schritte klären", "Verbessert die Qualität eingehender Anfragen."],
    ],
    items: [
      "Leistungsübersicht",
      "Referenz- oder Projektbereich",
      "lokales Einzugsgebiet",
      "Ablauf und Anfragekriterien",
      "mobile Darstellung und schnelle Ladezeit",
    ],
    caseTeaser: {
      heading: "Caseteaser: Atelier Heimat",
      text:
        "Bei Atelier Heimat ging es darum, ein handwerklich geprägtes Angebot hochwertiger und verständlicher zu zeigen. Struktur, Bildwirkung und Leistungslogik wurden so aufgebaut, dass Qualität nicht nur behauptet, sondern sichtbar wird.",
      href: "/projekte/atelier-heimat",
      label: "Atelier Heimat ansehen",
    },
    priceSummary:
      "Eine klare Handwerks-Website startet ab 799 Euro. Mit Referenzbereich, mehreren Leistungsseiten und lokaler SEO-Struktur liegt der Relaunch meist ab 1.499 Euro.",
    priceRows: [
      ["Rohbau", "ab 799 Euro", "Für eine schlanke Website mit Leistungen, Kontakt und SEO-Basis."],
      ["Sanierung", "ab 1.499 Euro", "Für Relaunch mit Referenzen, Bildführung und besserer Angebotsstruktur."],
      ["Erweiterung", "ab 2.499 Euro", "Für CMS, mehrere Standorte, Konfigurator oder komplexere Formulare."],
    ],
    faqs: [
      {
        question: "Was kostet eine Website für Handwerker in Berlin?",
        answer:
          "Eine schlanke Website startet ab 799 Euro. Ein Relaunch mit Referenzen, mehreren Leistungsseiten und lokaler SEO-Struktur startet meist ab 1.499 Euro.",
      },
      {
        question: "Welche Inhalte braucht eine Handwerks-Website?",
        answer:
          "Leistungen, Referenzen, Einzugsgebiet, Ablauf, Kontaktweg, Bilder mit Alt-Texten, FAQ und klare Hinweise, welche Anfragen passend sind.",
      },
      {
        question: "Sind Projektbilder wichtig?",
        answer:
          "Ja. Für Handwerk sind echte Bilder und Projektkontext oft stärker als lange Texte. Sie sollten aber schnell laden und sinnvoll beschrieben sein.",
      },
      {
        question: "Kann Stackwerkhaus lokale SEO vorbereiten?",
        answer:
          "Ja. Dazu gehören saubere Seitenstruktur, lokale Begriffe, interne Links, Sitemap, Metadaten und Hinweise für Google Business Profile.",
      },
      {
        question: "Reicht eine Onepager-Website für Handwerk?",
        answer:
          "Für sehr kleine Angebote kann ein Onepager reichen. Wenn mehrere Leistungen, Referenzen oder Standorte wichtig sind, sind getrennte Seiten meist besser.",
      },
    ],
    internalLinks: [
      {
        href: "/webdesign-kleine-unternehmen",
        label: "Webdesign für kleine Unternehmen",
        description: "Die allgemeine Grundlage für kleine Betriebe und Dienstleister.",
      },
      {
        href: "/projekte/atelier-heimat",
        label: "Projekt Atelier Heimat",
        description: "Handwerklich geprägter Markenauftritt mit stärkerer Story.",
      },
      {
        href: "/webdesign-berlin-wilmersdorf",
        label: "Webdesign in Wilmersdorf",
        description: "Lokale Berliner Webdesign-Seite mit Standortbezug.",
      },
      {
        href: "/webseitecheck",
        label: "Website Check",
        description: "Bestehende Handwerks-Website schnell prüfen lassen.",
      },
    ],
    schema: {
      serviceName: "Webdesign für Handwerk in Berlin",
      serviceType: "Webdesign und Website-Relaunch für Handwerksbetriebe",
      description:
        "Stackwerkhaus erstellt Websites für Handwerksbetriebe in Berlin mit Leistungen, Referenzen, lokaler Sichtbarkeit und hochwertiger Nutzerführung.",
      areaServed: "Berlin",
      offer: {
        name: "Handwerks-Website",
        price: "799",
        description:
          "Website für Handwerksbetriebe mit Leistungsstruktur, Referenzen, Webdesign, SEO-Grundlage und Kontaktweg.",
      },
      review: {
        name: "Endlich passend zum Angebot",
        author: "Sarah, Inhaberin Atelier Heimat",
        body:
          "Die Zusammenarbeit war unkompliziert und das Ergebnis hat unsere Erwartungen übertroffen. Endlich eine Website, die zu unserem Angebot passt.",
      },
    },
  }),
  createVerticalLandingPage({
    slug: "webdesign-immobilienmarkler",
    title: "Webdesign für Immobilienmakler | Stackwerkhaus",
    metaDescription:
      "Webdesign für Immobilienmakler: Objektanfragen, Vertrauen, lokale Sichtbarkeit, Bewertungsnähe, Lead-Formulare und Preisrahmen ab 1.499 Euro.",
    h1: "Webdesign für Immobilienmakler",
    heroText:
      "Immobilienmakler brauchen eine Website, die Vertrauen aufbaut, Leistungen verständlich erklärt und Eigentümer, Käufer oder Interessenten schnell zum passenden Kontaktweg führt. Stackwerkhaus baut Makler-Websites mit klarer Angebotslogik, lokaler Sichtbarkeit, Objekt- oder Referenzbereichen, Lead-Formularen, Bewertungsnähe und technischer Basis für spätere Automatisierung.",
    answerHeading: "Eine neue Website für Immobilienmakler und Immobilienberater?",
    directAnswer:
      "Eine Website für Immobilienmakler muss Vertrauen, Leistung, Region, Objektlogik, Referenzen und Anfrageweg schnell verständlich machen. Stackwerkhaus baut Makler-Websites ab 1.499 Euro; komplexere Lead-Strecken oder Plattformnähe starten meist ab 2.499 Euro.",
    guideHeading: "Makler-Website planen",
    finalHeading: "Makler-Auftritt ordnen.",
    keywords: [
      "Webdesign Immobilienmakler",
      "Website Immobilienmakler erstellen lassen",
      "Immobilienmakler Website",
      "Webdesign Immobilienmarkler",
      "Immobilien Lead Formular Website",
      "Makler Website Berlin",
    ],
    homeTitle: "Immobilienmakler",
    homeDescription:
      "Websites für Immobilienmakler mit Vertrauen, lokalen Signalen, Objektlogik und Lead-Strecke.",
    audience:
      "Für Immobilienmakler, Maklerbüros, Immobilienberater und maklernahe Lead-Strecken, die online seriöser wirken und bessere Anfragen erhalten möchten.",
    specificProblem:
      "Immobilien-Websites verlieren Anfragen, wenn Vertrauen, Region, Leistungsversprechen und Formularweg nicht zusammenpassen. Eigentümer wollen wissen, ob eine Bewertung oder Vermarktung seriös begleitet wird. Käufer und Interessenten wollen schnell verstehen, wie sie Kontakt aufnehmen und welche Angebote relevant sind.",
    notFor:
      "Wenn nur eine sehr einfache digitale Visitenkarte gebraucht wird, reicht die allgemeine Webdesign-Seite. Diese Vertikalseite passt, wenn Anfragequalität, lokale Sichtbarkeit, Lead-Strecke oder Objekt-/Referenzlogik wichtig sind.",
    structureSummary:
      "Die Seite sollte Leistungen, Region, Vertrauen, Objekt- oder Referenzlogik, Formularweg und FAQ sauber verbinden.",
    structureRows: [
      ["Leistungen", "Bewertung, Verkauf, Vermietung oder Beratung klar trennen", "Hilft bei Suchanfragen nach Maklerleistung und Region."],
      ["Vertrauen", "Referenzen, Bewertungen, Ablauf und Ansprechpartner sichtbar machen", "Reduziert Unsicherheit vor der Anfrage."],
      ["Lead-Formular", "Eigentümer- oder Interessentenanfragen sauber vorqualifizieren", "Verbessert Anfragequalität statt nur Klickzahl."],
    ],
    items: [
      "klare Makler-Positionierung",
      "Leistungen für Eigentümer und Interessenten",
      "Lead- oder Anfrageformular",
      "Referenzen, Bewertungen oder Projektbelege",
      "lokale SEO- und Kontaktstruktur",
      "Next.js-Frontend und Automatisierung nach Bedarf",
    ],
    caseTeaser: {
      heading: "Caseteaser: Immo-Pal",
      text:
        "Bei Immo-Pal wurde ein Immobilienangebot nicht nach interner Systemlogik, sondern nach Nutzerverständnis und Lead-Führung sortiert. Genau dieser Fokus ist auch für Immobilienmakler entscheidend: Vertrauen zuerst, dann Orientierung, dann Anfrage.",
      href: "/projekte/immo-pal",
      label: "Immo-Pal ansehen",
    },
    priceSummary:
      "Eine Makler-Website startet meist ab 1.499 Euro. Wenn Lead-Formulare, Objektlogik, Automatisierung oder Plattformnähe dazukommen, ist ein Rahmen ab 2.499 Euro realistischer.",
    priceRows: [
      ["Makler-Website", "ab 1.499 Euro", "Für Leistungen, Vertrauen, lokale Sichtbarkeit und Kontaktweg."],
      ["Lead-Strecke", "ab 2.499 Euro", "Für Eigentümerformulare, Vorqualifizierung, Automatisierung oder mehrere Zielgruppen."],
      ["Plattformnähe", "individuell", "Wenn Daten, Dashboard, Auth oder API-Anbindung Teil des Projekts sind."],
    ],
    faqs: [
      {
        question: "Was kostet eine Website für Immobilienmakler?",
        answer:
          "Eine Makler-Website startet bei Stackwerkhaus meist ab 1.499 Euro. Wenn Lead-Formulare, Automatisierung, Objektlogik oder mehrere Zielgruppen dazukommen, liegt der Umfang eher ab 2.499 Euro.",
      },
      {
        question: "Welche Inhalte braucht eine Immobilienmakler-Website?",
        answer:
          "Wichtig sind Leistungen, Region, Ansprechpartner, Ablauf, Referenzen oder Bewertungen, FAQ, lokale Signale, Kontaktweg und ein Formular, das Eigentümer- oder Interessentenanfragen sinnvoll vorqualifiziert.",
      },
      {
        question: "Was ist wichtiger: Design oder Formularlogik?",
        answer:
          "Beides muss zusammenpassen. Das Design schafft Vertrauen, die Formularlogik entscheidet aber, ob passende Immobilien-Leads entstehen oder nur unklare Anfragen.",
      },
      {
        question: "Braucht eine Immobilienmakler-Website lokale SEO?",
        answer:
          "Ja. Standort, Leistungen, lokale Suchbegriffe, Google Business Profile, interne Links, schnelle Ladezeiten und klare Kontaktwege sind für Makler besonders wichtig.",
      },
      {
        question: "Kann Stackwerkhaus Lead-Formulare automatisieren?",
        answer:
          "Ja. Formulare können an CRM, Mail, n8n, Zapier oder individuelle Workflows angebunden werden, wenn der Prozess klar definiert ist.",
      },
    ],
    internalLinks: [
      {
        href: "/projekte/immo-pal",
        label: "Projekt Immo-Pal",
        description: "Immobiliennahes Projekt mit stärkerer Informationsarchitektur und Lead-Führung.",
      },
      {
        href: "/nextjs-website-erstellen-lassen",
        label: "Next.js Website erstellen lassen",
        description: "Technische Grundlage für performante Makler-Websites und spätere Erweiterungen.",
      },
      {
        href: "/ki-website-automatisierung",
        label: "KI-Website-Automatisierung",
        description: "Für Lead-Qualifizierung, CRM-Übergabe und Workflows.",
      },
      {
        href: "/landingpage-erstellen-lassen",
        label: "Landingpage erstellen lassen",
        description: "Für einzelne Immobilienkampagnen oder Angebote.",
      },
    ],
    schema: {
      serviceName: "Webdesign für Immobilienmakler",
      serviceType: "Webdesign, Lead-Strecken und Next.js-Frontend für Immobilienmakler",
      description:
        "Stackwerkhaus erstellt Websites für Immobilienmakler mit Vertrauensaufbau, lokaler Sichtbarkeit, Lead-Strecken und technischer Erweiterbarkeit.",
      offer: {
        name: "Immobilienmakler-Website",
        price: "1499",
        description:
          "Makler-Website mit Angebotslogik, Lead-Strecke, Webdesign, Frontend-Umsetzung und technischer Struktur.",
      },
      review: {
        name: "Technik und Business-Anforderungen verbunden",
        author: "Denis, Partner bei Immo-Pal",
        body:
          "Arthur verbindet technische Exzellenz mit einem sehr guten Verständnis für Business-Anforderungen. Genau diese Mischung hat unser Projekt deutlich beschleunigt.",
      },
    },
  }),
  createVerticalLandingPage({
    slug: "website-foerderung-digitalisierung",
    title: "Website-Förderung für Digitalisierung 2026 | Stackwerkhaus",
    metaDescription:
      "Website-Förderung Digitalisierung 2026: Orientierung zu Beratung, Krediten, Berlin-Angeboten und förderlogischer Website-Planung ohne Zuschussversprechen.",
    h1: "Website-Förderung für Digitalisierung 2026",
    heroText:
      "Viele Unternehmen suchen 2026 nach Förderung für Website, Relaunch, Automatisierung oder digitale Prozesse. Stackwerkhaus hilft dabei, Website-Projekte förderlogisch zu strukturieren: klare Ziele, Digitalisierungsbezug, Prozessnutzen, Angebot, Umsetzungspaket und Nachweise. Wichtig: Das ist keine Förderberatung und kein Zuschussversprechen. Viele bekannte Digitalzuschüsse sind ausgelaufen oder keine direkte Website-Förderung.",
    answerHeading: "Welche Website-Förderung gibt es 2026?",
    directAnswer:
      "2026 gibt es für Websites selten einfache Zuschusslogik. Realistischer sind Beratung, Kredite, kostenlose öffentliche Orientierung oder Digitalisierungsvorhaben mit Prozessbezug. Stackwerkhaus kann Website-Angebote sauber strukturieren, garantiert aber keine Förderung.",
    guideHeading: "Förderlogik einordnen",
    finalHeading: "Projekt förderlogisch sortieren.",
    keywords: [
      "Website Förderung Digitalisierung 2026",
      "Förderung Website Relaunch 2026",
      "Digitalisierung Förderung Website",
      "Website Förderung KMU",
      "KfW Digitalisierung Website",
      "BAFA Beratung Website Digitalisierung",
    ],
    homeTitle: "Förderung",
    homeDescription:
      "Orientierung zu Website, Relaunch und Digitalisierung mit sauberer Projektstruktur statt Zuschussversprechen.",
    audience:
      "Für KMU, Gründer und Praxen, die Website, Relaunch oder Automatisierung 2026 förderlogisch prüfen möchten.",
    specificProblem:
      "Viele Suchergebnisse versprechen Website-Förderung zu pauschal. In der Praxis zählt, ob ein Vorhaben als Digitalisierung, Beratung, Prozessverbesserung oder Investition eingeordnet werden kann und ob ein Programm aktuell wirklich offen ist.",
    notFor:
      "Stackwerkhaus ersetzt keine Fördermittelberatung. Die Seite hilft, das Website-Projekt so zu strukturieren, dass Angebot, Ziel, Prozessnutzen und Nachweise klarer werden.",
    structureSummary:
      "Eine förderlogische Website-Planung sollte Ziel, Prozessnutzen, Umsetzungspaket, Kostenrahmen und Nachweise sauber trennen.",
    structureRows: [
      ["Ziel", "Was soll digital besser funktionieren?", "Macht den Förderbezug konkreter als reines Design."],
      ["Prozessnutzen", "Kontakt, Buchung, Lead-Übergabe oder Automatisierung beschreiben", "Trennt Digitalisierung von reiner Image-Website."],
      ["Nachweise", "Angebot, Leistungsumfang und Umsetzungsschritte dokumentieren", "Hilft bei Beratung, Kredit oder interner Entscheidung."],
    ],
    items: [
      "Ziel und Digitalisierungsbezug",
      "Website- oder Relaunch-Umfang",
      "Prozessnutzen und Automatisierung",
      "Preisrahmen und Angebot",
      "Nachweise, Quellen und Programmhinweise",
    ],
    caseTeaser: {
      heading: "Caseteaser: Automatisierung statt nur Design",
      text:
        "Bei Website-Projekten mit Formularen, Lead-Strecken oder Prozessübergaben entsteht eher ein Digitalisierungskontext als bei reiner optischer Modernisierung. Die KI-Automatisierungsleistung zeigt, wie Website und Prozess zusammengedacht werden können.",
      href: "/ki-website-automatisierung",
      label: "KI-Automatisierung ansehen",
    },
    priceSummary:
      "Der Website-Preis bleibt projektabhängig. Für Förderlogik sind klare Angebote, Leistungsbausteine und Prozessnutzen wichtiger als ein pauschaler Zuschuss-Hinweis.",
    priceRows: [
      ["Website-Grundlage", "ab 799 Euro", "Wenn zunächst eine professionelle Website mit SEO-Basis gebraucht wird."],
      ["Relaunch", "ab 1.499 Euro", "Wenn Struktur, Inhalte, Design und Technik neu geordnet werden."],
      ["Digitalisierung", "ab 2.499 Euro", "Wenn Automatisierung, Formulare, CRM oder Workflows Teil des Projekts sind."],
    ],
    extraSection: {
      heading: "Offizielle Programme vorsichtig prüfen",
      summary:
        "Viele bekannte Programme sind 2026 nicht mehr offen oder fördern keine normale Website-Erstellung.",
      paragraphs: [
        "Digital Jetzt und go-digital sind keine verlässlichen aktuellen Standardoptionen für neue Website-Projekte 2026. Die Berliner Digitalprämie ist ebenfalls nicht als offenes Neuantragsprogramm zu behandeln.",
        "Aktueller prüfbare Richtungen sind zum Beispiel öffentliche Beratungsangebote, BAFA-Unternehmensberatung, KfW-Digitalisierungskredite oder regionale Gründungs- und Transformationsangebote. Die konkrete Förderfähigkeit muss vor Projektstart geprüft werden.",
      ],
      contextualLinks: [
        {
          href: "https://digitalagentur.berlin/angebote/dab-orientierungsgespraeche/",
          label: "Digitalagentur Berlin",
          description: "Kostenlose Orientierung zu Digitalisierung, Website-Sichtbarkeit und Förderfragen.",
        },
        {
          href: "https://www.bafa.de/DE/Wirtschaft/Beratung_Finanzierung/Unternehmensberatung/unternehmensberatung.html",
          label: "BAFA Unternehmensberatung",
          description: "Beratungsförderung für KMU, keine pauschale Website-Bauförderung.",
        },
      ],
    },
    faqs: [
      {
        question: "Gibt es 2026 eine direkte Förderung für Websites?",
        answer:
          "Nicht pauschal. Viele bekannte direkte Digitalzuschüsse sind ausgelaufen oder nicht für normale Website-Projekte gedacht. Prüfen sollte man Beratung, Kredite und Digitalisierungsvorhaben mit Prozessbezug.",
      },
      {
        question: "Kann ein Website-Relaunch gefördert werden?",
        answer:
          "Das hängt vom Programm ab. Reines Design ist oft schwach. Besser prüfbar sind Vorhaben mit Prozessdigitalisierung, Automatisierung, Beratung oder nachweisbarem Digitalisierungseffekt.",
      },
      {
        question: "Hilft Stackwerkhaus bei Förderanträgen?",
        answer:
          "Stackwerkhaus ist keine Fördermittelberatung. Es kann aber Projektumfang, Angebot, Digitalisierungsbezug und technische Bausteine so formulieren, dass eine Prüfung einfacher wird.",
      },
      {
        question: "Welche Programme sollte man 2026 zuerst prüfen?",
        answer:
          "Sinnvoll sind kostenlose Beratungsstellen, BAFA-Unternehmensberatung, KfW-Digitalisierungskredite und regionale Angebote. Die Aktualität muss vor Projektstart geprüft werden.",
      },
      {
        question: "Wann sollte die Förderung geprüft werden?",
        answer:
          "Immer vor Projektstart. Viele Programme schließen begonnene Projekte aus oder verlangen Antragstellung, Beratung oder Bewilligung vor Beauftragung.",
      },
    ],
    internalLinks: [
      {
        href: "/ki-website-automatisierung",
        label: "KI-Website-Automatisierung",
        description: "Wenn der Förderbezug stärker über Prozesse und Workflows entsteht.",
      },
      {
        href: "/website-foerderung-berlin",
        label: "Website-Förderung Berlin",
        description: "Berlin-spezifische Orientierung ohne Zuschussversprechen.",
      },
      {
        href: "/website-erstellen-lassen-deutschland",
        label: "Website erstellen lassen",
        description: "Für die allgemeine Website-Grundlage.",
      },
      {
        href: "/webseitecheck",
        label: "Website Check",
        description: "Bestehenden Website-Zustand vor Relaunch prüfen.",
      },
    ],
    schema: {
      serviceName: "Website-Förderung für Digitalisierung 2026 einordnen",
      serviceType: "Website-Planung mit Digitalisierungsbezug und Förderlogik",
      description:
        "Stackwerkhaus strukturiert Website-, Relaunch- und Automatisierungsprojekte so, dass Ziele, Prozessnutzen, Kostenrahmen und Digitalisierungsbezug klarer werden.",
      offer: {
        name: "Digitalisierungsorientierte Website-Planung",
        price: "799",
        description:
          "Website- oder Relaunch-Projekt mit klarer Leistungsstruktur, Digitalisierungsbezug und Angebot als Grundlage für Prüfung oder Umsetzung.",
      },
    },
  }),
  createVerticalLandingPage({
    slug: "webdesign-berlin-wilmersdorf",
    title: "Webdesign in Berlin-Wilmersdorf | Stackwerkhaus",
    metaDescription:
      "Webdesign Berlin-Wilmersdorf: Websites für lokale Dienstleister, Praxen, Berater und kleine Unternehmen mit Preisrahmen ab 799 Euro.",
    h1: "Webdesign aus Berlin-Wilmersdorf",
    heroText:
      "Stackwerkhaus ist ein Webdesign- und Frontend-Studio aus Berlin / Remote. Für Unternehmen in Wilmersdorf, Charlottenburg-Wilmersdorf und Umgebung entstehen Websites mit klarer Struktur, professioneller Gestaltung, lokaler Sichtbarkeit, Kontaktwegen, SEO-Grundlage und schneller technischer Umsetzung.",
    answerHeading: "Was bringt Webdesign in Berlin-Wilmersdorf?",
    directAnswer:
      "Webdesign in Berlin-Wilmersdorf lohnt sich für lokale Dienstleister, Praxen, Berater und kleine Unternehmen, die online klarer gefunden und schneller angefragt werden möchten. Stackwerkhaus baut Websites ab 799 Euro und Relaunches ab 1.499 Euro.",
    guideHeading: "Lokale Website planen",
    finalHeading: "Lokalen Auftritt starten.",
    keywords: [
      "Webdesign Berlin Wilmersdorf",
      "Webdesigner Wilmersdorf",
      "Website erstellen lassen Wilmersdorf",
      "Webdesign Charlottenburg Wilmersdorf",
      "Website lokale Dienstleister Berlin",
      "Webdesign Agentur Wilmersdorf",
    ],
    homeTitle: "Wilmersdorf",
    homeDescription:
      "Lokale Webdesign-Seite für Dienstleister, Praxen und kleine Unternehmen in Berlin-Wilmersdorf.",
    audience:
      "Für lokale Dienstleister, Praxen, Berater, kleine Unternehmen und neue Marken in Berlin-Wilmersdorf und Umgebung.",
    specificProblem:
      "Lokale Websites müssen nicht nur schön aussehen. Sie müssen erklären, wo das Angebot relevant ist, welche Leistungen angeboten werden, wie Kontakt funktioniert und warum der Anbieter vertrauenswürdig ist.",
    notFor:
      "Wenn kein lokaler Bezug wichtig ist, ist die deutschlandweite Website-Erstellen-Seite passender. Wenn der Schwerpunkt auf einer konkreten Branche liegt, sollte eine Branchen-Seite gewählt werden.",
    structureSummary:
      "Die lokale Seite sollte Leistung, Standortbezug, Vertrauen, Kontaktweg und interne Verlinkung sauber verbinden.",
    structureRows: [
      ["Standortbezug", "Berlin-Wilmersdorf und Umgebung sichtbar machen", "Hilft bei lokalen Suchanfragen."],
      ["Leistung", "Angebot klar und nicht zu breit erklären", "Stärkt transaktionale Suchintentionen."],
      ["Kontakt", "Anfrage, Termin oder Erstgespräch schnell ermöglichen", "Verkürzt lokale Entscheidungswege."],
    ],
    items: [
      "lokaler Leistungsbezug",
      "Startseite oder Leistungsseite",
      "Kontakt- und Anfrageführung",
      "Google-Business-Profile-Hinweise",
      "SEO-Grundstruktur und Sitemap",
    ],
    caseTeaser: {
      heading: "Caseteaser: lokale Dienstleister klarer führen",
      text:
        "Atelier Heimat zeigt, wie ein lokal und handwerklich geprägtes Angebot klarer und hochwertiger sichtbar werden kann. Für Wilmersdorfer Dienstleister ist dieselbe Logik relevant: weniger generisch, mehr konkrete Leistung und Vertrauen.",
      href: "/projekte/atelier-heimat",
      label: "Atelier Heimat ansehen",
    },
    priceSummary:
      "Eine lokale Website startet ab 799 Euro. Ein Relaunch mit mehreren Seiten, Referenzen und lokaler SEO-Struktur liegt meist ab 1.499 Euro.",
    priceRows: [
      ["Rohbau", "ab 799 Euro", "Für eine kleine lokale Website mit Kontaktweg."],
      ["Sanierung", "ab 1.499 Euro", "Für bestehende lokale Websites mit neuer Struktur und SEO-Basis."],
      ["Branchen-Ausbau", "ab 2.499 Euro", "Wenn mehrere Branchen- oder Standortseiten geplant sind."],
    ],
    faqs: [
      {
        question: "Was kostet Webdesign in Berlin-Wilmersdorf?",
        answer:
          "Eine schlanke Website startet bei Stackwerkhaus ab 799 Euro. Relaunches mit mehr Struktur, Referenzen oder lokaler SEO starten meist ab 1.499 Euro.",
      },
      {
        question: "Muss ich für Webdesign in Wilmersdorf vor Ort sein?",
        answer:
          "Nein. Stackwerkhaus arbeitet aus Berlin / Remote. Abstimmung, Feedback und Übergabe können digital erfolgen.",
      },
      {
        question: "Was bringt lokales SEO für Wilmersdorf?",
        answer:
          "Lokales SEO hilft, Leistung, Standort, Kontaktweg und Vertrauenssignale für lokale Suchanfragen klarer auffindbar zu machen.",
      },
      {
        question: "Sollte jede Berliner Stadtteilseite erstellt werden?",
        answer:
          "Nein. Sinnvoll sind nur Stadtteilseiten mit echtem Bezug, eigenen Inhalten und klarer Suchintention. Massenhaft austauschbare Seiten wären dünn.",
      },
      {
        question: "Kann eine Wilmersdorf-Seite mit einer Branchen-Seite kombiniert werden?",
        answer:
          "Ja, aber nur wenn der Intent klar bleibt. Eine Praxis-Seite sollte Praxisfragen beantworten, eine Stadtteilseite lokale Auffindbarkeit.",
      },
    ],
    internalLinks: [
      {
        href: "/webdesign-kleine-unternehmen",
        label: "Webdesign für kleine Unternehmen",
        description: "Allgemeine Webdesign-Leistung für lokale Anbieter.",
      },
      {
        href: "/webdesign-handwerk-berlin",
        label: "Webdesign für Handwerk in Berlin",
        description: "Wenn der lokale Bezug mit Handwerksleistungen verbunden ist.",
      },
      {
        href: "/webdesign-therapeuten-berlin",
        label: "Webdesign für Therapeuten in Berlin",
        description: "Wenn eine lokale Praxis-Website gesucht wird.",
      },
      {
        href: "/webseitecheck",
        label: "Website Check",
        description: "Bestehende lokale Website schnell prüfen lassen.",
      },
    ],
    schema: {
      serviceName: "Webdesign in Berlin-Wilmersdorf",
      serviceType: "Lokales Webdesign und Website-Relaunch",
      description:
        "Stackwerkhaus erstellt Websites für lokale Dienstleister, Praxen, Berater und kleine Unternehmen in Berlin-Wilmersdorf.",
      areaServed: "Berlin",
      offer: {
        name: "Lokale Website",
        price: "799",
        description:
          "Lokale Website mit Webdesign, Struktur, Kontaktweg, SEO-Grundlage und Launch-Begleitung.",
      },
    },
  }),
  createVerticalLandingPage({
    slug: "website-foerderung-berlin",
    title: "Website-Förderung in Berlin 2026 | Stackwerkhaus",
    metaDescription:
      "Website-Förderung Berlin 2026: Orientierung zu Digitalagentur Berlin, BAFA, KfW, geschlossenen Programmen und Website-Projektplanung.",
    h1: "Website-Förderung in Berlin 2026",
    heroText:
      "Wer 2026 in Berlin eine Website, einen Relaunch oder digitale Prozesse plant, findet viele alte Förderhinweise und wenige einfache Zuschussversprechen. Stackwerkhaus hilft, Website-Projekte in Berlin sauber zu strukturieren: Ziel, Digitalisierungsbezug, Angebot, Preisrahmen, Prozessnutzen und Nachweise. Die Förderprüfung selbst muss vor Projektstart über offizielle Stellen erfolgen.",
    answerHeading: "Welche Website-Förderung gibt es in Berlin 2026?",
    directAnswer:
      "Für Website-Förderung in Berlin 2026 sollte man keine pauschale Digitalprämie versprechen. Realistisch sind kostenlose Orientierung, Beratung, Kredite oder Gründungsprogramme im Einzelfall. Stackwerkhaus strukturiert das Website-Projekt, garantiert aber keine Förderung.",
    guideHeading: "Berlin-Förderung prüfen",
    finalHeading: "Förderprüfung vorbereiten.",
    keywords: [
      "Website Förderung Berlin 2026",
      "Digitalisierung Förderung Berlin Website",
      "Digitalprämie Berlin Website",
      "Website Relaunch Förderung Berlin",
      "Digitalagentur Berlin Website Check",
      "Förderung Praxis Website Berlin",
    ],
    homeTitle: "Förderung Berlin",
    homeDescription:
      "Berlin-spezifische Orientierung für Website, Relaunch und Digitalisierung ohne Zuschussversprechen.",
    audience:
      "Für Berliner Unternehmen, Gründer, Praxen und Dienstleister, die Website oder Digitalisierung 2026 seriös einordnen möchten.",
    specificProblem:
      "Viele Förderartikel bleiben online, obwohl Programme geschlossen sind. Für Berlin ist deshalb wichtig, zwischen aktueller Beratung, möglichen Krediten, Gründungsprogrammen und beendeten Zuschüssen zu unterscheiden.",
    notFor:
      "Diese Seite ist keine Fördermittelberatung und ersetzt keine offizielle Prüfung. Sie hilft, Website-Projekte so aufzubauen, dass die fachlichen Unterlagen klarer werden.",
    structureSummary:
      "Die Seite sollte Berlin-Bezug, aktuelle Programmhinweise, Digitalisierungsnutzen und Angebotsschärfe verbinden.",
    structureRows: [
      ["Berlin-Bezug", "lokale Beratungs- und Anlaufstellen nennen", "Bedient konkrete Förder-Suchanfragen für Berlin."],
      ["Programmstatus", "geschlossene Programme nicht als offen darstellen", "Schafft Vertrauen und Aktualität."],
      ["Projektumfang", "Website, Relaunch oder Automatisierung klar beschreiben", "Hilft bei Prüfung vor Projektstart."],
    ],
    items: [
      "Programmstatus prüfen",
      "Beratungsstellen einbeziehen",
      "Digitalisierungsbezug formulieren",
      "Angebot vor Projektstart klären",
      "keine Zuschussgarantie behaupten",
    ],
    caseTeaser: {
      heading: "Caseteaser: Website und Prozess zusammendenken",
      text:
        "Für Berlin-Projekte mit Förderlogik ist eine reine Image-Website oft schwächer als ein Vorhaben mit Prozessnutzen. Kontaktformulare, Lead-Übergaben und Automatisierung können den Digitalisierungsbezug greifbarer machen.",
      href: "/ki-website-automatisierung",
      label: "Automatisierung ansehen",
    },
    priceSummary:
      "Der Preisrahmen bleibt unabhängig von möglicher Förderung. Wichtig ist, dass Angebot, Umfang und Digitalisierungsbezug vor Projektstart sauber formuliert sind.",
    priceRows: [
      ["Website", "ab 799 Euro", "Für kleine Berliner Unternehmen, die eine klare Grundlage brauchen."],
      ["Relaunch", "ab 1.499 Euro", "Für bestehende Websites mit neuer Struktur und besserem Kontaktweg."],
      ["Digitalisierung", "ab 2.499 Euro", "Für Formulare, Automatisierung, CRM-Übergabe oder technische Erweiterung."],
    ],
    extraSection: {
      heading: "Was 2026 in Berlin vorsichtig zu sagen ist",
      summary:
        "Die alte Berliner Digitalprämie sollte nicht als aktuelles Standardprogramm verkauft werden.",
      paragraphs: [
        "Die Digitalprämie Berlin ist nicht als offenes Neuantragsprogramm zu behandeln. Für 2026 sind eher öffentliche Orientierungsangebote, Beratungsförderung, Kredite oder Gründungsprogramme im Einzelfall prüfbar.",
        "Für AEO-Inhalte ist genau diese Einschränkung wichtig: Eine gute Antwort nennt nicht nur mögliche Wege, sondern sagt auch, welche beliebten Programme nicht mehr als aktuelle Website-Förderung versprochen werden sollten.",
      ],
      contextualLinks: [
        {
          href: "https://digitalagentur.berlin/angebote/dab-orientierungsgespraeche/",
          label: "Digitalagentur Berlin",
          description: "Kostenlose Orientierungsgespräche für Berliner Unternehmen.",
        },
        {
          href: "https://www.ibb.de/de/foerderprogramme/digitalpraemie-berlin.html",
          label: "IBB Digitalprämie Berlin",
          description: "Programmstatus prüfen, nicht als offene Standardförderung behaupten.",
        },
      ],
    },
    faqs: [
      {
        question: "Gibt es die Digitalprämie Berlin 2026 noch?",
        answer:
          "Sie sollte nicht als offenes Neuantragsprogramm verkauft werden. Vor jeder Aussage muss der aktuelle Status bei offiziellen Stellen geprüft werden.",
      },
      {
        question: "Kann eine Praxis-Website in Berlin gefördert werden?",
        answer:
          "Möglich ist das nur im Einzelfall und abhängig vom Programm. Reine Website-Gestaltung ist oft schwächer als Digitalisierung mit Prozessbezug, Beratung oder technischer Verbesserung.",
      },
      {
        question: "Welche Stellen helfen in Berlin bei der Orientierung?",
        answer:
          "Die Digitalagentur Berlin, IBB-/Business-Team-Angebote, BAFA-Informationen, KfW und Mittelstand-Digital-Angebote sind sinnvolle Startpunkte für offizielle Prüfung.",
      },
      {
        question: "Kann Stackwerkhaus Förderfähigkeit garantieren?",
        answer:
          "Nein. Stackwerkhaus kann Projektumfang und Angebot sauber strukturieren, aber keine Förderentscheidung garantieren.",
      },
      {
        question: "Wann muss die Förderprüfung passieren?",
        answer:
          "Vor Projektstart. Viele Programme verlangen Antragstellung oder Beratung vor Beauftragung und schließen bereits begonnene Vorhaben aus.",
      },
    ],
    internalLinks: [
      {
        href: "/website-foerderung-digitalisierung",
        label: "Website-Förderung Digitalisierung",
        description: "Deutschlandweite Förderlogik, Programmhinweise und Einschränkungen.",
      },
      {
        href: "/webdesign-berlin-wilmersdorf",
        label: "Webdesign Berlin-Wilmersdorf",
        description: "Lokale Webdesign-Seite für Berliner Dienstleister.",
      },
      {
        href: "/ki-website-automatisierung",
        label: "KI-Website-Automatisierung",
        description: "Wenn der Digitalisierungsbezug über Prozesse entsteht.",
      },
      {
        href: "/webseitecheck",
        label: "Website Check",
        description: "Bestehende Website als Ausgangspunkt prüfen.",
      },
    ],
    schema: {
      serviceName: "Website-Förderung in Berlin 2026 einordnen",
      serviceType: "Website-Planung mit Berlin- und Digitalisierungsbezug",
      description:
        "Stackwerkhaus strukturiert Website-, Relaunch- und Automatisierungsprojekte für Berliner Unternehmen mit klarem Digitalisierungsbezug und Preisrahmen.",
      areaServed: "Berlin",
      offer: {
        name: "Berlin Website-Projektplanung",
        price: "799",
        description:
          "Website- oder Relaunch-Planung mit Angebotsstruktur, Digitalisierungsbezug und Projektumfang für weitere Prüfung.",
      },
    },
  }),
] as const satisfies readonly LandingPage[];
