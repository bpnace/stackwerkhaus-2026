import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

type LandingPageSection = {
  heading: string;
  summary?: string;
  paragraphs: readonly string[];
  items?: readonly string[];
  steps?: readonly {
    title: string;
    text: string;
  }[];
  table?: {
    caption: string;
    columns: readonly string[];
    rows: readonly (readonly string[])[];
  };
  contextualLinks?: readonly LandingPageLink[];
};

type LandingPageFaq = {
  question: string;
  answer: string;
};

type LandingPageLink = {
  href: string;
  label: string;
  description: string;
};

type LandingPageSchema = {
  serviceName: string;
  serviceType: string;
  description: string;
  offer?: {
    name: string;
    price: string;
    description: string;
  };
};

export type LandingPage = {
  slug: string;
  path: string;
  title: string;
  metaDescription: string;
  h1: string;
  heroText: string;
  answerHeading: string;
  directAnswer: string;
  guideHeading: string;
  finalHeading: string;
  updatedAt: string;
  keywords: readonly string[];
  homeTitle: string;
  homeDescription: string;
  sections: readonly LandingPageSection[];
  faqs: readonly LandingPageFaq[];
  internalLinks: readonly LandingPageLink[];
  schema: LandingPageSchema;
};

const landingPageUpdatedAt = "2026-04-28";

const landingPageOgImage = {
  url: "/blog/blog-section-hero.jpg",
  width: 1600,
  height: 900,
  alt: "Stackwerkhaus Website-Systeme mit Webdesign, Struktur und technischer Umsetzung",
} as const;

const commonProvider = {
  "@type": "ProfessionalService",
  "@id": `${siteConfig.url}#professional-service`,
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Berlin",
    addressCountry: "DE",
  },
  areaServed: {
    "@type": "Country",
    name: "Deutschland",
  },
  sameAs: siteConfig.socialLinks.map((link) => link.href),
};

const commonWebsite = {
  "@type": "WebSite",
  "@id": `${siteConfig.url}#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  inLanguage: "de-DE",
  publisher: {
    "@id": `${siteConfig.url}#professional-service`,
  },
};

export const landingPages = [
  {
    slug: "website-erstellen-lassen-deutschland",
    path: "/website-erstellen-lassen-deutschland",
    title: "Website erstellen lassen in Deutschland | Stackwerkhaus",
    metaDescription:
      "Website erstellen lassen in Deutschland: Stackwerkhaus baut schnelle Websites für kleine Unternehmen mit Next.js, SEO-Grundstruktur und DSGVO-Setup ab 799 Euro.",
    h1: "Schnelle professionelle Website erstellen lassen, deutschlandweit",
    heroText:
      "Du brauchst eine moderne Website, die schnell online geht, professionell aussieht und technisch sauber umgesetzt ist? Stackwerkhaus erstellt Websites für kleine Unternehmen, Dienstleister und neue Marken in ganz Deutschland. Du bekommst Strategie, Webdesign, Frontend-Entwicklung, responsive Umsetzung, SEO-Grundstruktur, DSGVO-Grundsetup, Kontaktformular, Hosting-Setup und Launch-Begleitung aus einer Hand. Das Starter-Paket beginnt ab 799 Euro und ist auf eine klare, schnelle Umsetzung ausgelegt.",
    answerHeading: "Website erstellen lassen: Kurz gesagt",
    directAnswer:
      "Stackwerkhaus erstellt komplette Websites für kleine Unternehmen, Dienstleister und neue Marken in Deutschland. Diese Seite passt, wenn eine neue Website mit Struktur, Design, Frontend, SEO-Grundlage, Kontaktformular und Launch-Begleitung gebraucht wird; das Starter-Paket beginnt ab 799 Euro.",
    guideHeading: "Website-Projekt richtig einordnen",
    finalHeading: "Website planen lassen.",
    updatedAt: landingPageUpdatedAt,
    keywords: [
      "Website schnell erstellen lassen Deutschland",
      "gute Website erstellen lassen Deutschland",
      "professionelle Website erstellen lassen schnell",
      "Webseite für Unternehmen erstellen lassen deutschlandweit",
      "Website erstellen lassen ab 799 Euro",
      "Webdesign Agentur schnelle Umsetzung Deutschland",
    ],
    homeTitle: "Webseite erstellen",
    homeDescription:
      "Für Unternehmen, die eine moderne Website mit klarer Struktur, schneller Umsetzung und sauberem Launch brauchen.",
    sections: [
      {
        heading: "Für wen diese Website gedacht ist",
        summary:
          "Eine schnelle professionelle Website passt, wenn ein Unternehmen sichtbar werden, Vertrauen aufbauen und Anfragen einfacher ermöglichen will, ohne direkt ein großes Relaunch-Projekt zu starten.",
        paragraphs: [
          "Diese Website-Leistung eignet sich für Gründer, lokale Dienstleister, Berater, Handwerker, Agenturen, Coaches, kleine Unternehmen und neue Marken, die schnell eine professionelle Website brauchen. Stackwerkhaus ist besonders sinnvoll, wenn du keine beliebige Baukasten-Seite willst, sondern eine individuelle Website mit sauberem Design, guter Nutzerführung und technischer Grundlage für spätere Erweiterungen.",
          "Die Seite richtet sich an Unternehmen, die schnell sichtbar werden möchten, aber nicht am falschen Ende sparen wollen. Entscheidend ist nicht nur, dass eine Website online steht. Entscheidend ist, dass Besucher sofort verstehen, was du anbietest, warum sie dir vertrauen können und wie sie unkompliziert Kontakt aufnehmen.",
        ],
      },
      {
        heading: "Abgrenzung zu Webdesign, Landingpage und Next.js",
        summary:
          "Diese Seite ist die richtige Zielseite, wenn es um eine vollständige neue Website geht, nicht nur um Gestaltung, Kampagnen oder Technologie.",
        paragraphs: [
          "Wenn du eine komplette Website brauchst, ist diese Seite der passende Einstieg. Geht es vor allem um die Wirkung für ein kleines Unternehmen, passt die Webdesign-Seite besser. Geht es um eine einzelne Kampagne, ist die Landingpage-Seite genauer. Geht es um technische Architektur, Performance und Erweiterbarkeit, ist die Next.js-Seite die stärkere Zielseite.",
          "Diese Trennung hilft Besuchern und Suchmaschinen: Jede Seite beantwortet eine andere Entscheidung, statt dieselbe Website-Frage mit anderen Worten zu wiederholen.",
        ],
        contextualLinks: [
          {
            href: "/webdesign-kleine-unternehmen",
            label: "Webdesign für kleine Unternehmen",
            description:
              "Für die sichtbare Wirkung, Angebotsklarheit und Kontaktführung kleiner Firmen.",
          },
          {
            href: "/nextjs-website-erstellen-lassen",
            label: "Next.js Website erstellen lassen",
            description:
              "Für Projekte, bei denen Performance und technische Erweiterbarkeit im Vordergrund stehen.",
          },
        ],
      },
      {
        heading: "Was du bekommst",
        summary:
          "Das Starter-Projekt bündelt Strategie, Design, Umsetzung, rechtliche Grundseiten, SEO-Basis und Launch-Begleitung in einem kompakten Website-Paket.",
        paragraphs: [
          "Du bekommst ein klares Seitenkonzept, ein modernes Webdesign, responsive Umsetzung für Desktop und Mobilgeräte, eine performante technische Basis, Kontaktformular, Impressum und Datenschutzseiten, SEO-Grundstruktur, Sitemap, Google-Search-Console-Vorbereitung, Hosting-Setup und Launch-Begleitung.",
          "Je nach Paket können weitere Seiten, Animationen, individuelle Komponenten, CMS-Funktionen, Blog, Mehrsprachigkeit oder Automatisierungen ergänzt werden. Der Einstieg bleibt bewusst übersichtlich, damit aus einem klaren Bedarf kein unnötig großes Website-Projekt wird.",
        ],
        items: [
          "Seitenstruktur und Nutzerführung",
          "Webdesign und responsive Frontend-Umsetzung",
          "SEO-Grundstruktur, Metadaten und Sitemap-Vorbereitung",
          "DSGVO-Grundsetup mit Impressum und Datenschutz",
          "Kontaktformular, Hosting-Setup und Launch-Begleitung",
        ],
        table: {
          caption: "Website-Paket mit enthaltenen Leistungen und Nutzen",
          columns: ["Baustein", "Enthalten", "Warum es wichtig ist"],
          rows: [
            [
              "Struktur",
              "Seitenplan, Nutzerführung, klare Kontaktwege",
              "Besucher verstehen schneller, welches Angebot passt.",
            ],
            [
              "Technik",
              "Next.js, responsive Frontend-Umsetzung, Hosting-Setup",
              "Die Seite bleibt schnell, mobil sauber und später erweiterbar.",
            ],
            [
              "SEO-Basis",
              "Meta-Daten, Sitemap, Indexieren und interne Verlinkung",
              "Suchmaschinen können die Inhalte besser erfassen.",
            ],
          ],
        },
        contextualLinks: [
          {
            href: "/nextjs-website-erstellen-lassen",
            label: "Technische Basis mit Next.js",
            description:
              "Für Unternehmen, die Performance und Erweiterbarkeit von Anfang an mitdenken wollen.",
          },
          {
            href: "/webdesign-kleine-unternehmen",
            label: "Webdesign für kleine Unternehmen",
            description:
              "Für kleinere Firmen, die Struktur, Vertrauen und Kontaktwege schärfen möchten.",
          },
        ],
      },
      {
        heading: "Warum schnelle Umsetzung nicht billig wirken muss",
        summary:
          "Schnelle Umsetzung wirkt hochwertig, wenn Umfang, Inhalt und Gestaltung sauber begrenzt werden und jede Seite eine klare Aufgabe bekommt.",
        paragraphs: [
          "Eine schnelle Website muss nicht oberflächlich sein. Entscheidend ist ein klarer Prozess. Stackwerkhaus reduziert unnötige Abstimmungen, arbeitet mit einer sauberen Seitenstruktur und konzentriert sich zuerst auf die Inhalte, die für Besucher wirklich wichtig sind: Wer bist du, welches Problem löst du, was kostet es ungefähr, wie läuft die Zusammenarbeit ab und wie kann man dich kontaktieren.",
          "Schnell bedeutet hier nicht generisch. Der Bauplan wird nur so schlank gehalten, dass Strategie, Design und technische Umsetzung ohne Umwege zusammenkommen. So entsteht eine Website, die nicht nach Baukasten aussieht und trotzdem zügig live gehen kann.",
        ],
      },
      {
        heading: "Ablauf",
        summary:
          "Der Ablauf ist bewusst kurz: Ziel klären, Struktur festlegen, Website bauen, prüfen und sauber live stellen.",
        paragraphs: [
          "Die Zusammenarbeit beginnt mit einem kurzen Erstgespräch und einer Zielklärung. Danach werden Seitenstruktur, Inhalte und Designrichtung festgelegt. Anschließend setzt Stackwerkhaus die Website technisch um, optimiert die Darstellung für mobile Geräte und bereitet die wichtigsten SEO-Grundlagen vor.",
          "Nach Feedback, Korrektur und technischer Prüfung geht die Website live. Vor dem Launch werden Kontaktwege, mobile Darstellung, Metadaten, rechtliche Seiten, Performance und technische Erreichbarkeit geprüft. Du bekommst also keine lose Fassade, sondern einen Webauftritt, der sauber übergeben werden kann.",
        ],
        steps: [
          {
            title: "Ziel und Seitenstruktur klären",
            text: "Wir sortieren Angebot, Zielgruppe, Seitenumfang und Kontaktwege, bevor Design oder Entwicklung starten.",
          },
          {
            title: "Design und Inhalte zusammenführen",
            text: "Texte, Layout und Nutzerführung werden so aufgebaut, dass Besucher schnell verstehen und handeln können.",
          },
          {
            title: "Technik, SEO-Basis und Launch prüfen",
            text: "Vor dem Livegang werden mobile Darstellung, Metadaten, Sitemap, Formulare und Erreichbarkeit geprüft.",
          },
        ],
      },
      {
        heading: "Preisrahmen",
        summary:
          "Das Starter-Paket beginnt ab 799 Euro und eignet sich für eine fokussierte Website mit bis zu 5 Seiten.",
        paragraphs: [
          "Das Starter-Paket beginnt ab 799 Euro. Es eignet sich für eine schlanke professionelle Website mit bis zu 5 Seiten. Für Neukunden kann bei Buchung ein Rabatt angerechnet werden. Größere Websites, individuelle Funktionen, Automatisierungen, CMS-Systeme, komplexe Animationen oder zusätzliche Landingpages werden separat kalkuliert.",
          "Ziel ist eine transparente Lösung, die zum Umfang und zum geschäftlichen Nutzen der Website passt. Wenn dein Projekt kleiner starten soll, bleibt der Aufbau fokussiert. Wenn später mehr Inhalte, Automatisierungen oder Landingpages gebraucht werden, kann die technische Grundlage erweitert werden.",
        ],
      },
    ],
    faqs: [
      {
        question: "Wie schnell kann Stackwerkhaus eine Website erstellen?",
        answer:
          "Kleine Website-Projekte können bei klaren Inhalten und schneller Abstimmung zügig umgesetzt werden. Das Starter-Paket ist auf eine kompakte Umsetzung mit bis zu 5 Seiten ausgelegt. Die genaue Dauer hängt davon ab, ob Texte, Bilder, rechtliche Inhalte und Feedback rechtzeitig vorliegen.",
      },
      {
        question: "Erstellt Stackwerkhaus Websites deutschlandweit?",
        answer:
          "Ja. Stackwerkhaus arbeitet deutschlandweit remote mit kleinen Unternehmen, Dienstleistern, Gründern und neuen Marken. Abstimmung, Strukturplanung, Designfeedback und Launch-Begleitung können digital erfolgen, ohne dass ein Vor-Ort-Termin in Berlin nötig ist.",
      },
      {
        question: "Was kostet eine Website bei Stackwerkhaus?",
        answer:
          "Das Starter-Paket beginnt ab 799 Euro. Der genaue Preis hängt von Umfang, Seitenanzahl, Funktionen, Designanforderungen und gewünschten Erweiterungen ab. Für Neukunden kann bei Buchung ein Rabatt angerechnet werden. Größere Websites mit CMS, Automatisierungen, zusätzlichen Landingpages oder komplexeren Komponenten werden individuell kalkuliert.",
      },
      {
        question: "Ist die Website auch für Google vorbereitet?",
        answer:
          "Ja. Die Website erhält eine SEO-Grundstruktur, saubere Überschriften, Meta-Daten, Sitemap-Vorbereitung und eine technische Basis für spätere Optimierung. Rankings werden dadurch nicht garantiert, aber Suchmaschinen können die Inhalte klarer erfassen und indexieren.",
      },
      {
        question: "Ist Stackwerkhaus besser als ein Homepage-Baukasten?",
        answer:
          "Stackwerkhaus ist sinnvoll, wenn du eine individuelle Website mit sauberer Gestaltung, technischer Umsetzung und persönlicher Projektführung möchtest. Ein Baukasten kann günstiger sein, ist aber oft weniger individuell, weniger flexibel und weniger passend für spätere Erweiterungen.",
      },
    ],
    internalLinks: [
      {
        href: "/webdesign-kleine-unternehmen",
        label: "Webdesign für kleine Unternehmen",
        description:
          "Für Dienstleister, Gründer und kleine Firmen, die professionell sichtbar werden möchten.",
      },
      {
        href: "/landingpage-erstellen-lassen",
        label: "Landingpage erstellen lassen",
        description:
          "Für Kampagnen, Angebote und Leadgenerierung mit klarer Conversion-Struktur.",
      },
      {
        href: "/nextjs-website-erstellen-lassen",
        label: "Next.js Website erstellen lassen",
        description:
          "Für schnelle, moderne und langfristig erweiterbare Websites.",
      },
      {
        href: "/ki-website-automatisierung",
        label: "Website mit KI-Automatisierung",
        description:
          "Für Websites, die Kontaktformulare, Leads und Workflows verbinden.",
      },
    ],
    schema: {
      serviceName: "Website schnell erstellen lassen in Deutschland",
      serviceType:
        "Webdesign, Frontend-Entwicklung und Launch-Begleitung für professionelle Websites",
      description:
        "Stackwerkhaus erstellt schnelle professionelle Websites für kleine Unternehmen, Dienstleister und neue Marken in Deutschland.",
      offer: {
        name: "Starter Website",
        price: "799",
        description:
          "Professionelle Website mit bis zu 5 Seiten, Webdesign, Frontend-Umsetzung, SEO-Grundstruktur, DSGVO-Grundsetup und Launch-Begleitung.",
      },
    },
  },
  {
    slug: "webdesign-kleine-unternehmen",
    path: "/webdesign-kleine-unternehmen",
    title: "Webdesign für kleine Unternehmen | Stackwerkhaus",
    metaDescription:
      "Webdesign für kleine Unternehmen, Dienstleister und Gründer: moderne Websites mit klarer Nutzerführung, SEO-Grundstruktur, DSGVO-Setup und schneller Umsetzung.",
    h1: "Webdesign für kleine Unternehmen, Dienstleister und Gründer",
    heroText:
      "Kleine Unternehmen brauchen keine überladene Website. Sie brauchen eine Website, die Vertrauen schafft, Leistungen klar erklärt und Anfragen erzeugt. Stackwerkhaus entwickelt moderne Websites für kleine Unternehmen, Dienstleister, Gründer und neue Marken in Deutschland. Der Fokus liegt auf verständlicher Struktur, professionellem Design, schneller Ladezeit, sauberer mobiler Darstellung und einer technischen Grundlage, die später erweitert werden kann.",
    answerHeading: "Webdesign für kleine Unternehmen: Kurz gesagt",
    directAnswer:
      "Stackwerkhaus entwickelt Webdesign für kleine Unternehmen, die online vertrauenswürdiger wirken und mehr passende Anfragen bekommen möchten. Diese Seite passt, wenn Angebotsklarheit, Nutzerführung, visuelle Qualität und Kontaktwege wichtiger sind als eine rein technische Next.js-Entscheidung.",
    guideHeading: "Webdesign für kleinere Firmen einordnen",
    finalHeading: "Webdesign sortieren lassen.",
    updatedAt: landingPageUpdatedAt,
    keywords: [
      "Webdesign kleine Unternehmen",
      "Website für kleine Unternehmen erstellen lassen",
      "Webdesigner für kleine Unternehmen Deutschland",
      "professionelle Website für Dienstleister",
      "Website für Handwerker erstellen lassen",
      "Webdesign für Gründer und kleine Firmen",
    ],
    homeTitle: "für kleine Unternehmen",
    homeDescription:
      "Für Dienstleister, Gründer und kleine Firmen, die professionell sichtbar werden und mehr Anfragen erhalten möchten.",
    sections: [
      {
        heading: "Warum kleine Unternehmen eine andere Website brauchen",
        summary:
          "Webdesign für kleine Unternehmen muss schnell Vertrauen schaffen, Leistungen verständlich erklären und den Weg zur Anfrage verkürzen.",
        paragraphs: [
          "Eine Website für ein kleines Unternehmen muss schneller überzeugen als eine große Konzernseite. Besucher wollen sofort verstehen, welche Leistung angeboten wird, für wen sie gedacht ist, warum das Unternehmen vertrauenswürdig ist und wie sie Kontakt aufnehmen können.",
          "Deshalb konzentriert sich Stackwerkhaus auf klare Seitenstruktur, verständliche Texte, sichtbare Vorteile, schnelle Kontaktmöglichkeiten und ein Design, das professionell wirkt, ohne künstlich groß zu erscheinen. Eine gute kleine Unternehmenswebsite muss nicht viel behaupten. Sie muss das Richtige sehr klar zeigen.",
        ],
      },
      {
        heading: "Abgrenzung zur kompletten Website-Erstellung",
        summary:
          "Diese Seite fokussiert Gestaltung, Vertrauen und Angebotslogik kleiner Unternehmen; die Website-Erstellen-Seite beschreibt den kompletten Launch-Prozess.",
        paragraphs: [
          "Webdesign für kleine Unternehmen ist die bessere Zielseite, wenn die Frage lautet: Wie wirkt mein Angebot professioneller, verständlicher und vertrauenswürdiger? Die allgemeine Website-Erstellen-Seite passt besser, wenn Umfang, Launch, technische Umsetzung und Paketlogik im Vordergrund stehen.",
          "So bleibt der Suchintent klar: Diese Seite spricht kleine Unternehmen und Dienstleister an, die eine bessere Außenwirkung und Kontaktführung brauchen, nicht nur irgendeine neue Website.",
        ],
        contextualLinks: [
          {
            href: "/website-erstellen-lassen-deutschland",
            label: "Komplette Website erstellen lassen",
            description:
              "Für den vollständigen Website-Launch mit Struktur, Technik und Übergabe.",
          },
          {
            href: "/landingpage-erstellen-lassen",
            label: "Landingpage für ein Angebot",
            description:
              "Für einzelne Kampagnen, Leistungen oder Anfrageziele.",
          },
        ],
      },
      {
        heading: "Typische Seitenstruktur für kleine Unternehmen",
        summary:
          "Eine gute Website für kleine Unternehmen besteht aus wenigen klaren Seiten, die Orientierung, Vertrauen, Leistung und Kontakt sauber trennen.",
        paragraphs: [
          "Eine gute Website für ein kleines Unternehmen besteht meistens aus Startseite, Leistungsseite, Über-uns-Seite, Kontaktseite und rechtlichen Seiten wie Impressum und Datenschutz. Je nach Branche können Projektseiten, Referenzen, FAQ, Standortseiten, Terminbuchung, Angebotsformular oder ein Blog sinnvoll sein.",
          "Stackwerkhaus plant diese Struktur so, dass Besucher schnell zur passenden Information gelangen. Der Aufbau bleibt bewusst nachvollziehbar: erst Orientierung, dann Vertrauen, dann konkrete Leistung, dann Kontakt. So wird die Website nicht zur digitalen Broschüre, sondern zu einem brauchbaren Anfrageweg.",
        ],
        items: [
          "Startseite mit klarem Leistungsversprechen",
          "Leistungsseiten für konkrete Angebote",
          "Über-uns- oder Profilseite für Vertrauen",
          "Kontaktseite mit kurzer Anfrageführung",
          "Impressum, Datenschutz und technische SEO-Grundlagen",
        ],
        table: {
          caption: "Empfohlene Seitenstruktur für kleine Unternehmen",
          columns: ["Seite", "Aufgabe", "SEO-Nutzen"],
          rows: [
            [
              "Startseite",
              "Angebot, Zielgruppe und Kontaktweg sofort verständlich machen",
              "Stärkt Marken- und Leistungsbegriffe.",
            ],
            [
              "Leistungsseite",
              "Konkrete Angebote, Vorteile und Ablauf erklären",
              "Bedient Suchanfragen mit klarer Kaufabsicht.",
            ],
            [
              "Kontaktseite",
              "Anfragehürde senken und nächste Schritte erklären",
              "Hilft lokalen und transaktionalen Suchintentionen.",
            ],
          ],
        },
        contextualLinks: [
          {
            href: "/website-erstellen-lassen-deutschland",
            label: "Website komplett erstellen lassen",
            description:
              "Für kleine Unternehmen, die schnell mit einer vollständigen Website starten möchten.",
          },
          {
            href: "/landingpage-erstellen-lassen",
            label: "Landingpage für konkrete Angebote",
            description:
              "Für einzelne Leistungen, Kampagnen oder lokale Anfrageziele.",
          },
        ],
      },
      {
        heading: "Inhaltliche Prioritäten",
        summary:
          "Die wichtigsten Inhalte sind Leistungsversprechen, Vertrauen, Vorteile, Kontaktweg und technische Grundlage für Suchmaschinen.",
        paragraphs: [
          "Die wichtigsten Inhalte sind ein klares Leistungsversprechen, eine verständliche Erklärung der Angebote, echte Vorteile für Kunden, eine einfache Kontaktmöglichkeit, vertrauensbildende Elemente und eine technische Grundlage für Sichtbarkeit in Suchmaschinen.",
          "Dazu gehören saubere Überschriften, Meta-Daten, interne Verlinkung, strukturierte Inhalte, schnelle Ladezeiten und eine mobile Darstellung. Gerade kleine Unternehmen profitieren davon, wenn die Website nicht alles erzählt, sondern genau die Fragen beantwortet, die vor einer Anfrage wichtig sind.",
        ],
      },
      {
        heading: "Branchen, für die es passt",
        summary:
          "Das Angebot passt vor allem für Dienstleister, lokale Anbieter und kleine B2B-Firmen, deren Website Vertrauen und Anfragequalität verbessern soll.",
        paragraphs: [
          "Das Webdesign-Angebot eignet sich für Dienstleister, Berater, Handwerksbetriebe, Studios, lokale Anbieter, Agenturen, Coaches, Therapeuten, Immobilienanbieter, Gastronomie-Konzepte, kreative Selbstständige und kleine B2B-Unternehmen.",
          "Entscheidend ist nicht die Branche, sondern das Ziel: Die Website soll klar erklären, Vertrauen schaffen und Kontaktanfragen erleichtern. Wenn dein Unternehmen schon gut arbeitet, aber online noch wie ein Provisorium wirkt, ist ein strukturierter Webauftritt meist der nächste sinnvolle Schritt.",
        ],
      },
      {
        heading: "Abgrenzung zu Baukasten-Websites",
        summary:
          "Eine individuelle Website lohnt sich, wenn Gestaltung, Nutzerführung, Technik und spätere Erweiterungen wichtiger sind als ein möglichst einfacher Baukastenstart.",
        paragraphs: [
          "Ein Homepage-Baukasten kann für sehr einfache Projekte funktionieren. Für kleine Unternehmen, die professionell auftreten, wachsen und langfristig sichtbar werden wollen, ist eine individuell geplante Website oft sinnvoller.",
          "Stackwerkhaus erstellt keine austauschbare Standardseite, sondern eine Website mit individueller Struktur, passendem Design und technischer Basis für spätere Erweiterungen. Das ist besonders wichtig, wenn später Landingpages, Blog, Automatisierungen, Terminbuchung oder weitere Angebotsseiten ergänzt werden sollen.",
        ],
      },
    ],
    faqs: [
      {
        question: "Warum brauchen kleine Unternehmen professionelles Webdesign?",
        answer:
          "Professionelles Webdesign hilft kleinen Unternehmen, Vertrauen aufzubauen, Leistungen klar zu erklären und online besser gefunden zu werden. Eine gute Website reduziert Unsicherheit bei Besuchern und macht es leichter, eine Anfrage zu stellen oder ein Erstgespräch zu buchen.",
      },
      {
        question: "Erstellt Stackwerkhaus Websites für lokale Dienstleister?",
        answer:
          "Ja. Stackwerkhaus erstellt Websites für lokale und deutschlandweit tätige Dienstleister, kleine Unternehmen und Gründer. Die Seiten können auf regionale Sichtbarkeit, konkrete Leistungen, Referenzen und einfache Kontaktwege ausgerichtet werden.",
      },
      {
        question: "Welche Seiten braucht ein kleines Unternehmen?",
        answer:
          "Meistens sind Startseite, Leistungen, Über uns, Kontakt, Impressum und Datenschutz sinnvoll. Je nach Ziel können Referenzen, FAQ, Projektseiten, Standortseiten oder Landingpages ergänzt werden. Die Struktur sollte zum Angebot passen und Besucher nicht unnötig durch viele Unterseiten schicken.",
      },
      {
        question: "Kann die Website später erweitert werden?",
        answer:
          "Ja. Die Website kann später um weitere Seiten, Landingpages, Blog, CMS-Funktionen, Automatisierungen oder KI-Funktionen erweitert werden. Genau deshalb ist eine saubere technische Grundlage besser als ein kurzfristiges Provisorium.",
      },
      {
        question: "Ist SEO enthalten?",
        answer:
          "Eine SEO-Grundstruktur ist enthalten. Für dauerhaft bessere Rankings können später zusätzliche Inhalte, Landingpages, lokale SEO-Maßnahmen und laufende Optimierung ergänzt werden. Die technische Grundlage hilft, ersetzt aber keine kontinuierliche Content- und Autoritätsarbeit.",
      },
    ],
    internalLinks: [
      {
        href: "/website-erstellen-lassen-deutschland",
        label: "Website schnell erstellen lassen in Deutschland",
        description:
          "Für eine komplette Website mit schneller Umsetzung und Launch-Begleitung.",
      },
      {
        href: "/landingpage-erstellen-lassen",
        label: "Landingpage erstellen lassen",
        description:
          "Für konkrete Angebote, Kampagnen und Anfrageziele.",
      },
      {
        href: "/nextjs-website-erstellen-lassen",
        label: "Next.js Website erstellen lassen",
        description:
          "Für Unternehmen mit technischem Anspruch und skalierbarer Frontend-Basis.",
      },
      {
        href: "/ki-website-automatisierung",
        label: "Website mit KI-Automatisierung",
        description:
          "Für kleine Unternehmen, die Website und Arbeitsprozesse verbinden möchten.",
      },
    ],
    schema: {
      serviceName: "Webdesign für kleine Unternehmen",
      serviceType:
        "Webdesign und Website-Umsetzung für kleine Unternehmen, Dienstleister und Gründer",
      description:
        "Stackwerkhaus erstellt professionelle Websites für kleine Unternehmen, Dienstleister und Gründer mit klarer Nutzerführung, SEO-Grundstruktur und schneller Umsetzung.",
    },
  },
  {
    slug: "landingpage-erstellen-lassen",
    path: "/landingpage-erstellen-lassen",
    title: "Landingpage erstellen lassen für mehr Anfragen | Stackwerkhaus",
    metaDescription:
      "Landingpage erstellen lassen für Angebote, Google Ads und Leads: klare Struktur, Conversion-Fokus, schnelle Ladezeit, responsives Design und Tracking.",
    h1: "Landingpage erstellen lassen für Angebote, Kampagnen und Anfragen",
    heroText:
      "Eine gute Landingpage hat ein klares Ziel: Besucher sollen verstehen, warum dein Angebot relevant ist und was sie als Nächstes tun sollen. Stackwerkhaus erstellt Landingpages für Dienstleister, kleine Unternehmen, Kampagnen, Google Ads, Social-Ads und neue Angebote. Der Fokus liegt auf klarer Botschaft, starker Nutzerführung, überzeugender Struktur, schneller Ladezeit, mobiler Optimierung und messbaren Kontaktanfragen.",
    answerHeading: "Landingpage erstellen lassen: Kurz gesagt",
    directAnswer:
      "Stackwerkhaus erstellt Landingpages für Angebote, Kampagnen und Leadgenerierung. Diese Seite passt, wenn eine einzelne Zielgruppe zu einer klaren Handlung geführt werden soll, zum Beispiel Anfrage senden, Termin buchen oder Angebot anfordern.",
    guideHeading: "Landingpage sinnvoll planen",
    finalHeading: "Kampagne sauber starten.",
    updatedAt: landingPageUpdatedAt,
    keywords: [
      "Landingpage erstellen lassen",
      "Landingpage für Google Ads erstellen lassen",
      "Conversion Landingpage erstellen lassen",
      "Verkaufsseite erstellen lassen",
      "Lead Landingpage erstellen lassen",
      "Angebotsseite erstellen lassen",
    ],
    homeTitle: "Landingpage",
    homeDescription:
      "Für Kampagnen, Google Ads, Angebote und Leadgenerierung mit klarem Conversion-Fokus.",
    sections: [
      {
        heading: "Wann eine Landingpage sinnvoll ist",
        summary:
          "Eine Landingpage ist sinnvoll, wenn ein Angebot, eine Kampagne oder eine Zielgruppe mit einem klaren nächsten Schritt angesprochen werden soll.",
        paragraphs: [
          "Eine Landingpage ist sinnvoll, wenn ein bestimmtes Angebot gezielt beworben werden soll. Anders als eine normale Website konzentriert sich eine Landingpage auf ein einziges Ziel. Sie lenkt Besucher nicht durch viele Unterseiten, sondern führt sie kontrolliert vom Problem über die Lösung bis zur Anfrage.",
          "Das ist besonders wichtig für Google Ads, Meta Ads, LinkedIn-Kampagnen, Newsletter-Aktionen und neue Leistungen. Wer bezahlten Traffic einkauft, sollte Besucher nicht auf eine unklare Startseite schicken, sondern auf eine Seite, die genau zur Anzeige, Zielgruppe und Entscheidung passt.",
        ],
      },
      {
        heading: "Abgrenzung zur Website",
        summary:
          "Eine Landingpage optimiert eine einzelne Entscheidung; eine Website erklärt das ganze Unternehmen.",
        paragraphs: [
          "Diese Seite ist der richtige Einstieg, wenn ein bestimmtes Angebot, eine Anzeige oder eine Kampagne mehr Anfragen erzeugen soll. Wenn noch gar keine belastbare Website existiert, ist zuerst die Website-Erstellen-Seite sinnvoller.",
          "Für Suchmaschinen und AI-Antworten ist diese Trennung wichtig, weil Landingpage-Intent meist näher an Kampagne, Conversion und Leadgenerierung liegt als an allgemeiner Unternehmensdarstellung.",
        ],
        contextualLinks: [
          {
            href: "/website-erstellen-lassen-deutschland",
            label: "Erst die Website-Grundlage bauen",
            description:
              "Für Unternehmen, die noch keine saubere Website als Fundament haben.",
          },
          {
            href: "/ki-website-automatisierung",
            label: "Leads automatisch weiterleiten",
            description:
              "Für Landingpages, deren Anfragen in CRM, n8n oder andere Workflows laufen sollen.",
          },
        ],
      },
      {
        heading: "Aufbau einer guten Landingpage",
        summary:
          "Eine gute Landingpage führt Besucher vom Problem über die Lösung bis zur Anfrage, ohne sie durch unnötige Auswahl abzulenken.",
        paragraphs: [
          "Eine gute Landingpage beginnt mit einer klaren Aussage über das Angebot. Danach folgen das Problem der Zielgruppe, die Lösung, die wichtigsten Vorteile, konkrete Leistungsdetails, Vertrauenselemente, Ablauf, Preisorientierung, FAQ und ein starker Kontaktbereich.",
          "Jeder Abschnitt muss die Entscheidung leichter machen. Alles, was ablenkt, wird reduziert. Stackwerkhaus plant Landingpages deshalb nicht als hübsche Einzelseiten, sondern als fokussierten Entscheidungsweg mit sauberer Struktur und klarer Handlungsaufforderung.",
        ],
        items: [
          "Klares Angebotsversprechen im ersten Screen",
          "Problem, Lösung und Vorteile in verständlicher Reihenfolge",
          "Vertrauenselemente, Ablauf und Preisorientierung",
          "Kurze Kontaktwege und klarer Call to Action",
          "Mobile Darstellung, Ladezeit und Tracking-Vorbereitung",
        ],
        steps: [
          {
            title: "Anzeigenversprechen aufnehmen",
            text: "Headline und Einstieg müssen zu Suchanfrage, Anzeige oder Kampagne passen, damit Besucher sofort richtig landen.",
          },
          {
            title: "Entscheidung erklären",
            text: "Problem, Lösung, Vorteile, Ablauf und Preisorientierung werden in einer nachvollziehbaren Reihenfolge gezeigt.",
          },
          {
            title: "Anfrage messbar machen",
            text: "Formular, CTA, Tracking-Vorbereitung und Übergabe sorgen dafür, dass Leads nicht im Seitenaufbau hängen bleiben.",
          },
        ],
        table: {
          caption: "Landingpage-Elemente und ihr Beitrag zur Conversion",
          columns: ["Element", "Funktion", "Sichtbarkeitsnutzen"],
          rows: [
            [
              "Hero",
              "Angebot, Zielgruppe und Handlung sofort klären",
              "Stärkt Hauptkeyword und Snippet-Relevanz.",
            ],
            [
              "FAQ",
              "Einwände und häufige Fragen direkt beantworten",
              "Bedient Longtail-Fragen und AI-Antwortblöcke.",
            ],
            [
              "Tracking",
              "Anfragen Kampagnen und Quellen zuordnen",
              "Verbessert spätere Optimierung mit echten Daten.",
            ],
          ],
        },
        contextualLinks: [
          {
            href: "/nextjs-website-erstellen-lassen",
            label: "Performante Landingpage mit Next.js",
            description:
              "Für schnelle Kampagnenseiten, die technisch sauber erweiterbar bleiben.",
          },
          {
            href: "/ki-website-automatisierung",
            label: "Leads automatisch weiterverarbeiten",
            description:
              "Für Landingpages, deren Anfragen direkt in Workflows oder CRM laufen sollen.",
          },
        ],
      },
      {
        heading: "Conversion-Elemente",
        summary:
          "Conversion-Elemente helfen Besuchern, Vertrauen aufzubauen, Einwände zu klären und ohne Umweg Kontakt aufzunehmen.",
        paragraphs: [
          "Stackwerkhaus achtet auf klare Call-to-Action-Bereiche, kurze Kontaktwege, überzeugende Überschriften, mobile Bedienbarkeit, schnelle Ladezeiten, vertrauensbildende Aussagen, verständliche Angebotsstruktur und saubere technische Umsetzung.",
          "Auf Wunsch können Tracking-Vorbereitung, Formular-Anbindung, CRM-Übergabe oder Automatisierungen ergänzt werden. Eine Landingpage soll nicht nur gut aussehen, sondern messbar machen, welche Kampagne welche Anfrage auslöst und wo Nutzer im Entscheidungsprozess abspringen.",
        ],
      },
      {
        heading: "Für welche Angebote Landingpages funktionieren",
        summary:
          "Landingpages funktionieren besonders gut, wenn ein Angebot konkret genug ist, um eine klare Entscheidung oder Anfrage auszulösen.",
        paragraphs: [
          "Landingpages funktionieren besonders gut für Beratungsangebote, Agenturleistungen, lokale Dienstleistungen, Kurse, digitale Produkte, Webdesign-Angebote, Handwerksleistungen, Recruiting-Kampagnen, Terminbuchungen, Events, neue Services und zeitlich begrenzte Aktionen.",
          "Wichtig ist, dass es ein konkretes Ziel gibt. Eine Landingpage kann Anfragen erzeugen, Erstgespräche vorbereiten, ein Angebot erklären, eine Zielgruppe vorqualifizieren oder eine Kampagne sauber von der restlichen Website trennen.",
        ],
      },
      {
        heading: "Unterschied zwischen Website und Landingpage",
        summary:
          "Eine Website schafft Überblick über das Unternehmen; eine Landingpage optimiert eine einzelne Entscheidung für ein bestimmtes Angebot.",
        paragraphs: [
          "Eine Website stellt dein Unternehmen umfassend vor. Eine Landingpage konzentriert sich auf eine konkrete Entscheidung. Wenn du allgemein sichtbar werden möchtest, brauchst du eine Website. Wenn du ein bestimmtes Angebot bewerben und mehr Anfragen erzeugen möchtest, brauchst du eine Landingpage.",
          "In vielen Fällen ist die beste Lösung eine Kombination aus Website und mehreren spezialisierten Landingpages. Die Website schafft Vertrauen und Orientierung. Die Landingpage holt eine konkrete Zielgruppe mit einem konkreten Bedarf ab.",
        ],
      },
    ],
    faqs: [
      {
        question: "Was kostet eine Landingpage?",
        answer:
          "Der Preis hängt von Umfang, Design, Inhalt, Formularen, Tracking und Integrationen ab. Einfache Landingpages sind günstiger als umfangreiche Kampagnenseiten mit Automatisierung und individuellen Funktionen. Stackwerkhaus kalkuliert den Aufwand nach Ziel, Inhaltstiefe und technischer Anbindung.",
      },
      {
        question: "Kann eine Landingpage für Google Ads genutzt werden?",
        answer:
          "Ja. Eine Landingpage kann speziell für Google Ads, Social-Ads oder andere Kampagnen aufgebaut werden. Wichtig ist, dass Anzeigenversprechen, Zielgruppe, Inhalt, Kontaktweg und Tracking zusammenpassen, damit Kampagnen nicht auf einer zu allgemeinen Seite landen.",
      },
      {
        question: "Was macht eine Landingpage erfolgreich?",
        answer:
          "Eine erfolgreiche Landingpage hat ein klares Ziel, eine starke Überschrift, verständliche Vorteile, eine gute mobile Darstellung, kurze Kontaktwege und einen klaren Call to Action. Sie beantwortet Einwände, schafft Vertrauen und reduziert alles, was von der gewünschten Handlung ablenkt.",
      },
      {
        question: "Kann Stackwerkhaus auch das Kontaktformular anbinden?",
        answer:
          "Ja. Kontaktformulare, Anfrageformulare, Terminlinks oder CRM-Übergaben können integriert werden. Je nach Projekt kann eine Anfrage an E-Mail, CRM, Google Sheets, Notion, Slack, n8n, Zapier oder eine individuelle Schnittstelle übergeben werden.",
      },
      {
        question: "Ist eine Landingpage auch für SEO sinnvoll?",
        answer:
          "Ja, wenn sie nicht nur dünner Kampagnentext ist, sondern hilfreiche, indexierbare Inhalte enthält und einen klaren Suchintent bedient. Eine gute SEO-Landingpage beantwortet echte Fragen, ist intern verlinkt und bietet mehr als reine Werbefläche.",
      },
    ],
    internalLinks: [
      {
        href: "/website-erstellen-lassen-deutschland",
        label: "Website schnell erstellen lassen in Deutschland",
        description:
          "Für die Website-Grundlage, wenn noch kein tragfähiger Webauftritt vorhanden ist.",
      },
      {
        href: "/webdesign-kleine-unternehmen",
        label: "Webdesign für kleine Unternehmen",
        description:
          "Für Dienstleister und kleine Firmen, die professioneller sichtbar werden möchten.",
      },
      {
        href: "/nextjs-website-erstellen-lassen",
        label: "Next.js Website erstellen lassen",
        description:
          "Für performante Landingpages und skalierbare Frontends.",
      },
      {
        href: "/ki-website-automatisierung",
        label: "Website mit KI-Automatisierung",
        description:
          "Für Landingpages, deren Anfragen automatisch weiterverarbeitet werden sollen.",
      },
    ],
    schema: {
      serviceName: "Landingpage erstellen lassen",
      serviceType:
        "Konzeption, Design und Umsetzung von Landingpages für Angebote, Kampagnen und Leadgenerierung",
      description:
        "Stackwerkhaus erstellt Landingpages für Unternehmen, die mehr Anfragen, Buchungen oder Leads über Kampagnen und konkrete Angebote gewinnen möchten.",
    },
  },
  {
    slug: "nextjs-website-erstellen-lassen",
    path: "/nextjs-website-erstellen-lassen",
    title: "Next.js Website erstellen lassen | Stackwerkhaus",
    metaDescription:
      "Next.js Website erstellen lassen: Stackwerkhaus baut schnelle, skalierbare Websites mit sauberer Frontend-Entwicklung, responsivem Design und SEO-Grundstruktur.",
    h1: "Next.js Website erstellen lassen für schnelle moderne Webauftritte",
    heroText:
      "Eine moderne Website sollte nicht nur gut aussehen, sondern schnell laden, sauber strukturiert sein und langfristig erweiterbar bleiben. Stackwerkhaus erstellt Websites mit Next.js für Unternehmen, Dienstleister und digitale Marken, die eine performante technische Basis möchten. Der Fokus liegt auf hochwertigem Frontend, klarer Nutzerführung, responsiver Darstellung, SEO-Grundstruktur und skalierbarer Umsetzung.",
    answerHeading: "Next.js Website erstellen lassen: Kurz gesagt",
    directAnswer:
      "Stackwerkhaus erstellt Next.js Websites für Unternehmen, die Performance, saubere Frontend-Architektur und langfristige Erweiterbarkeit brauchen. Diese Seite passt, wenn technische Qualität, CMS-Anbindung, Blog, Landingpages, APIs oder Automatisierungen wichtiger sind als eine einfache Standard-Website.",
    guideHeading: "Next.js als Website-Basis verstehen",
    finalHeading: "Web App sauber planen.",
    updatedAt: landingPageUpdatedAt,
    keywords: [
      "Next.js Website erstellen lassen",
      "Next.js Agentur Deutschland",
      "Next.js Webdesign",
      "moderne Website mit Next.js erstellen lassen",
      "performante Website erstellen lassen",
      "React Website erstellen lassen",
    ],
    homeTitle: "Web Apps",
    homeDescription:
      "Für Unternehmen, die eine performante, moderne und skalierbare technische Grundlage möchten.",
    sections: [
      {
        heading: "Warum Next.js für professionelle Websites sinnvoll ist",
        summary:
          "Next.js ist sinnvoll, wenn eine Website schnell, modular, SEO-fähig und später um Inhalte, Landingpages oder Funktionen erweiterbar sein soll.",
        paragraphs: [
          "Next.js ist besonders geeignet, wenn eine Website schnell, modular und zukunftsfähig aufgebaut werden soll. Für Unternehmen bedeutet das: bessere technische Kontrolle, saubere Komponenten, flexible Erweiterbarkeit und eine gute Grundlage für SEO, Performance und spätere Funktionen.",
          "Stackwerkhaus nutzt diese technische Basis, um moderne Websites zu bauen, die nicht wie Baukasten-Seiten wirken. Die Technologie ist dabei kein Selbstzweck. Sie ist sinnvoll, wenn Designqualität, Ladezeit, strukturierte Inhalte und spätere Erweiterungen wichtig sind.",
        ],
      },
      {
        heading: "Abgrenzung zu Webdesign und Website-Erstellung",
        summary:
          "Diese Seite beantwortet den technischen Architektur-Intent; Webdesign und Website-Erstellung beantworten andere Projektfragen.",
        paragraphs: [
          "Wenn die wichtigste Frage lautet, welche technische Grundlage eine Website tragen soll, ist diese Next.js-Seite die passende Zielseite. Wenn es um Außenwirkung kleiner Unternehmen geht, passt die Webdesign-Seite besser. Wenn es um den kompletten Start einer Website geht, ist die Website-Erstellen-Seite genauer.",
          "Damit bleibt Next.js hier bewusst als Architektur- und Performance-Thema positioniert, nicht als generisches Synonym für jede neue Website.",
        ],
        contextualLinks: [
          {
            href: "/webdesign-kleine-unternehmen",
            label: "Webdesign und Außenwirkung",
            description:
              "Für kleine Unternehmen, die vor allem klarer und vertrauenswürdiger auftreten wollen.",
          },
          {
            href: "/website-erstellen-lassen-deutschland",
            label: "Komplette Website-Erstellung",
            description:
              "Für neue Websites mit Design, Frontend, SEO-Grundlage und Launch-Begleitung.",
          },
        ],
      },
      {
        heading: "Für wen eine Next.js Website passt",
        summary:
          "Eine Next.js Website passt zu Unternehmen, die mehr technische Kontrolle, bessere Performance und eine langfristig erweiterbare Frontend-Basis brauchen.",
        paragraphs: [
          "Eine Next.js Website passt für Unternehmen, die mehr wollen als eine Standardseite. Dazu gehören digitale Dienstleister, Agenturen, SaaS-Projekte, Beratungen, Tech-Unternehmen, neue Marken, skalierende Startups und kleine Unternehmen mit technischem Anspruch.",
          "Auch für Landingpages, Portfolio-Seiten, Angebotsseiten und mehrsprachige Webauftritte kann Next.js sinnvoll sein. Entscheidend ist, dass die Website nicht nur einmal online gehen soll, sondern als erweiterbare Grundlage für Inhalte, Kampagnen und digitale Prozesse gedacht ist.",
        ],
      },
      {
        heading: "Was Stackwerkhaus technisch umsetzt",
        summary:
          "Stackwerkhaus setzt Next.js Websites als saubere Frontends mit responsiver UI, strukturierten Inhalten, Formularen, Integrationen und SEO-Grundlagen um.",
        paragraphs: [
          "Stackwerkhaus kann Layouts, Komponenten, responsives Design, Animationen, Kontaktformulare, CMS-Anbindungen, API-Integrationen, SEO-Meta-Daten, strukturierte Inhalte, Sitemap, Performance-Optimierung und Hosting-Setup umsetzen.",
          "Je nach Projekt können auch Automatisierungen, KI-Funktionen, CRM-Übergaben oder individuelle Backend-Funktionen ergänzt werden. Wichtig ist, dass die technische Architektur zum tatsächlichen Projekt passt und nicht unnötig kompliziert wird.",
        ],
        items: [
          "Next.js App Router und komponentenbasierte Frontends",
          "Responsive UI, saubere HTML-Struktur und gute Ladezeiten",
          "CMS-, API- und Formular-Anbindungen",
          "SEO-Grundstruktur mit Metadaten, Sitemap und interner Verlinkung",
          "Erweiterbare Basis für Landingpages, Blog und Automatisierungen",
        ],
        steps: [
          {
            title: "Frontend strukturieren",
            text: "Layout, Komponenten, Navigation und Seitenlogik werden so aufgebaut, dass Inhalte klar ausspielbar bleiben.",
          },
          {
            title: "SEO und Performance absichern",
            text: "Meta-Daten, Sitemap, semantische Überschriften, interne Links und schnelle Auslieferung werden von Beginn an mitgedacht.",
          },
          {
            title: "Erweiterungen vorbereiten",
            text: "CMS, Blog, Landingpages, Formulare oder Automatisierungen können später auf derselben Basis ergänzt werden.",
          },
        ],
        contextualLinks: [
          {
            href: "/landingpage-erstellen-lassen",
            label: "Landingpages auf Next.js-Basis",
            description:
              "Für Kampagnen, Angebote und Seiten, die schnell laden und messbar bleiben sollen.",
          },
          {
            href: "/ki-website-automatisierung",
            label: "Next.js mit Automatisierung verbinden",
            description:
              "Für Websites, bei denen Formulare, Tools und Workflows zusammenspielen müssen.",
          },
        ],
      },
      {
        heading: "Next.js vs. WordPress",
        summary:
          "Next.js bietet mehr Kontrolle über Frontend, Performance und Erweiterbarkeit; WordPress ist oft stärker, wenn reine Redaktion im Vordergrund steht.",
        paragraphs: [
          "WordPress ist weit verbreitet und für viele Content-Projekte sinnvoll. Next.js ist stärker, wenn Performance, individuelle Frontend-Qualität, Skalierbarkeit und technische Kontrolle wichtig sind.",
          "Stackwerkhaus setzt Next.js besonders dann ein, wenn eine Website modern, schnell und individuell aufgebaut werden soll. Für sehr redaktionelle Projekte kann ein CMS angebunden werden, ohne dass das Frontend nach Standard-Theme aussehen muss.",
        ],
        table: {
          caption: "Vergleich zwischen Next.js und WordPress für Unternehmenswebsites",
          columns: ["Kriterium", "Next.js", "WordPress"],
          rows: [
            [
              "Frontend",
              "Sehr individuell, komponentenbasiert und performant",
              "Häufig theme- oder plugin-geprägt",
            ],
            [
              "Redaktion",
              "Mit angebundenem CMS flexibel lösbar",
              "Direkt im System stark und vertraut",
            ],
            [
              "Erweiterung",
              "Gut für APIs, Apps, Landingpages und Workflows",
              "Gut für klassische Content- und Plugin-Szenarien",
            ],
          ],
        },
      },
      {
        heading: "SEO mit Next.js",
        summary:
          "Next.js kann SEO unterstützen, wenn Inhalte indexierbar, strukturiert, schnell und mit klaren Meta-Daten ausgeliefert werden.",
        paragraphs: [
          "Eine Next.js Website kann eine starke Grundlage für SEO sein, wenn sie richtig umgesetzt wird. Wichtig sind saubere HTML-Struktur, indexierbare Inhalte, korrekte Meta-Daten, semantische Überschriften, interne Verlinkung, strukturierte Daten, schnelle Ladezeiten und crawlbare Seiten.",
          "Die Technologie allein erzeugt kein Ranking. Entscheidend ist, dass Technik und Inhalt zusammenpassen. Eine schnelle Seite ohne hilfreiche Inhalte wird nicht automatisch sichtbar, und guter Content braucht trotzdem eine saubere technische Auslieferung.",
        ],
      },
    ],
    faqs: [
      {
        question: "Ist Next.js gut für SEO?",
        answer:
          "Next.js kann eine sehr gute technische Grundlage für SEO sein, wenn die Seite sauber umgesetzt wird. Entscheidend sind indexierbare Inhalte, gute Struktur, Meta-Daten, interne Links und hilfreicher Content. Die Technologie ersetzt keine inhaltliche SEO-Arbeit.",
      },
      {
        question: "Ist eine Next.js Website schneller als WordPress?",
        answer:
          "Eine gut umgesetzte Next.js Website kann sehr performant sein. Die tatsächliche Geschwindigkeit hängt aber von Umsetzung, Hosting, Bildern, Skripten und Seitenstruktur ab. Schlecht optimierte Assets können jede Technologie langsam machen.",
      },
      {
        question: "Kann Stackwerkhaus eine bestehende Website auf Next.js neu bauen?",
        answer:
          "Ja. Bestehende Websites können analysiert und als moderne Next.js Website neu strukturiert und umgesetzt werden. Dabei werden Inhalte, Nutzerführung, technische Anforderungen, SEO-Grundlagen und spätere Erweiterbarkeit gemeinsam betrachtet.",
      },
      {
        question: "Kann ein CMS integriert werden?",
        answer:
          "Ja. Je nach Bedarf kann ein CMS für Blog, Projekte, Leistungen oder dynamische Inhalte angebunden werden. So bleibt die Website technisch performant, während Inhalte später redaktionell gepflegt werden können.",
      },
      {
        question: "Für wen lohnt sich Next.js nicht?",
        answer:
          "Wenn nur eine sehr einfache statische Seite ohne technische Anforderungen benötigt wird, kann auch eine einfachere Lösung ausreichen. Next.js lohnt sich besonders bei langfristig erweiterbaren, individuellen und technisch anspruchsvolleren Websites.",
      },
    ],
    internalLinks: [
      {
        href: "/website-erstellen-lassen-deutschland",
        label: "Website schnell erstellen lassen in Deutschland",
        description:
          "Für Unternehmen, die schnell eine komplette Website brauchen.",
      },
      {
        href: "/webdesign-kleine-unternehmen",
        label: "Webdesign für kleine Unternehmen",
        description:
          "Für kleine Firmen, die professionelle Gestaltung und klare Nutzerführung suchen.",
      },
      {
        href: "/landingpage-erstellen-lassen",
        label: "Landingpage erstellen lassen",
        description:
          "Für performante Kampagnenseiten und Angebotsseiten.",
      },
      {
        href: "/ki-website-automatisierung",
        label: "Website mit KI-Automatisierung",
        description:
          "Für Next.js Websites, die mit Formularen, Tools und Workflows verbunden werden.",
      },
    ],
    schema: {
      serviceName: "Next.js Website erstellen lassen",
      serviceType:
        "Next.js Webdesign, Frontend-Entwicklung und technische Website-Umsetzung",
      description:
        "Stackwerkhaus erstellt moderne Next.js Websites für Unternehmen, Dienstleister und digitale Marken mit Fokus auf Performance, Struktur, SEO-Grundlagen und Erweiterbarkeit.",
    },
  },
  {
    slug: "ki-website-automatisierung",
    path: "/ki-website-automatisierung",
    title: "KI-Website automatisieren lassen | Stackwerkhaus",
    metaDescription:
      "KI-Website automatisieren lassen: Stackwerkhaus verbindet Webdesign, Kontaktformulare, Lead-Prozesse, Chatbot-Konzepte, CRM und Workflows.",
    h1: "Website mit KI-Automatisierung erstellen lassen",
    heroText:
      "Eine moderne Website kann mehr leisten als nur gut aussehen. Sie kann Anfragen strukturieren, Leads weiterleiten, Prozesse starten und KI-Funktionen integrieren. Stackwerkhaus erstellt Websites mit KI-Automatisierung für kleine Unternehmen, Dienstleister und digitale Marken. Der Fokus liegt auf professionellem Webdesign, sauberer technischer Umsetzung und Automatisierungen, die echte Arbeit im Unternehmen reduzieren.",
    answerHeading: "KI-Website automatisieren: Kurz gesagt",
    directAnswer:
      "Stackwerkhaus verbindet Websites mit KI-Automatisierung, Formularlogik, Lead-Qualifizierung, CRM-Übergaben und n8n- oder Zapier-Workflows. Diese Seite passt, wenn eine Website nicht nur informieren, sondern Anfragen strukturieren und interne Arbeit reduzieren soll.",
    guideHeading: "KI-Automatisierung sinnvoll einsetzen",
    finalHeading: "Workflow sauber verbinden.",
    updatedAt: landingPageUpdatedAt,
    keywords: [
      "Website mit KI erstellen lassen",
      "Website mit KI-Automatisierung",
      "KI-Automatisierung für Website",
      "Webseite mit Chatbot erstellen lassen",
      "Website mit CRM-Automatisierung",
      "KI-Agentur Website-Automatisierung Deutschland",
    ],
    homeTitle: "KI & Automatisierung",
    homeDescription:
      "Für Unternehmen, die Website, Kontaktformulare, Lead-Prozesse und digitale Workflows verbinden möchten.",
    sections: [
      {
        heading: "Was eine Website mit KI-Automatisierung kann",
        summary:
          "Eine Website mit KI-Automatisierung kann Anfragen qualifizieren, Daten weiterleiten, Follow-ups vorbereiten und interne Prozesse starten.",
        paragraphs: [
          "Eine normale Website zeigt Informationen. Eine Website mit Automatisierung kann zusätzlich Aufgaben auslösen. Zum Beispiel kann eine Anfrage automatisch kategorisiert, an ein CRM übergeben, per E-Mail bestätigt, intern verteilt oder mit weiteren Daten angereichert werden.",
          "KI kann dabei helfen, Anfragen zusammenzufassen, Inhalte vorzubereiten, Nutzerfragen zu beantworten oder interne Prozesse zu beschleunigen. Wichtig ist, dass die Automatisierung an einem echten Engpass ansetzt und nicht nur als technischer Effekt eingebaut wird.",
        ],
      },
      {
        heading: "Abgrenzung zu Website und Landingpage",
        summary:
          "Diese Seite ist für Prozessautomatisierung gedacht; Website- und Landingpage-Seiten decken Sichtbarkeit und Conversion ohne Workflow-Fokus ab.",
        paragraphs: [
          "Wenn die Website zuerst klarer aufgebaut werden muss, ist die Website-Erstellen-Seite der bessere Einstieg. Wenn ein einzelnes Angebot Leads erzeugen soll, passt die Landingpage-Seite besser. Diese Seite ist richtig, wenn nach der Anfrage etwas automatisch passieren soll.",
          "So bleibt KI-Automatisierung als Prozess- und Integrationsleistung erkennbar und konkurriert nicht unnötig mit den allgemeinen Webdesign-Seiten.",
        ],
        contextualLinks: [
          {
            href: "/landingpage-erstellen-lassen",
            label: "Landingpage mit Lead-Fokus",
            description:
              "Für Kampagnen, die gezielt Anfragen erzeugen sollen.",
          },
          {
            href: "/nextjs-website-erstellen-lassen",
            label: "Technische Grundlage mit Next.js",
            description:
              "Für Websites, die APIs, Formulare und Workflows langfristig tragen müssen.",
          },
        ],
      },
      {
        heading: "Beispiele für Automatisierungen",
        summary:
          "Sinnvolle Automatisierungen verbinden Formulare, CRM, E-Mail, Chatbot, n8n oder Zapier so, dass wiederkehrende Arbeit zuverlässig verschwindet.",
        paragraphs: [
          "Ein Kontaktformular kann automatisch prüfen, welche Leistung angefragt wird. Eine Anfrage kann direkt an ein CRM, Google Sheet, Notion, Slack, E-Mail-System oder ein anderes Tool weitergeleitet werden.",
          "Ein Chatbot kann häufige Fragen beantworten oder Besucher zum passenden Angebot führen. Ein KI-Workflow kann Leads zusammenfassen, Follow-up-Texte vorbereiten oder interne Aufgaben erstellen. Stackwerkhaus plant solche Abläufe so, dass sie zum Team, zur Datenlage und zum tatsächlichen Arbeitsprozess passen.",
        ],
        items: [
          "Intelligente Anfrage- und Lead-Qualifizierung",
          "CRM-, Google-Sheets-, Notion-, Slack- oder E-Mail-Übergaben",
          "n8n-, Zapier- oder individuelle Workflow-Anbindung",
          "Chatbot-Konzepte für häufige Fragen und Angebotsführung",
          "KI-gestützte Zusammenfassungen, Benachrichtigungen und Follow-ups",
        ],
        table: {
          caption: "Beispiele für Website-Automatisierungen und passende Tools",
          columns: ["Use Case", "Mögliche Anbindung", "Ergebnis"],
          rows: [
            [
              "Lead-Qualifizierung",
              "Kontaktformular, CRM, n8n oder Zapier",
              "Anfragen werden sortiert und schneller bearbeitet.",
            ],
            [
              "Chatbot-Konzept",
              "FAQ, Angebotslogik oder Wissensbasis",
              "Besucher finden schneller die passende Richtung.",
            ],
            [
              "Follow-up",
              "E-Mail-System, Slack, Notion oder Google Sheets",
              "Nachrichten, Aufgaben und Daten landen am richtigen Ort.",
            ],
          ],
        },
        contextualLinks: [
          {
            href: "/landingpage-erstellen-lassen",
            label: "Landingpage mit Lead-Prozess",
            description:
              "Für Kampagnen, deren Anfragen automatisch sortiert und weiterverarbeitet werden sollen.",
          },
          {
            href: "/nextjs-website-erstellen-lassen",
            label: "Technische Grundlage mit Next.js",
            description:
              "Für Websites, die Formulare, APIs und Workflows langfristig tragen müssen.",
          },
        ],
      },
      {
        heading: "Für wen das sinnvoll ist",
        summary:
          "KI-Automatisierung lohnt sich, wenn wiederkehrende Anfragen, manuelle Übergaben oder interne Aufgaben regelmäßig Zeit kosten.",
        paragraphs: [
          "Eine Website mit KI-Automatisierung eignet sich für Dienstleister, Agenturen, Coaches, Beratungen, Handwerker, Immobilienanbieter, Studios, lokale Unternehmen und kleine B2B-Firmen.",
          "Besonders sinnvoll ist sie, wenn regelmäßig ähnliche Anfragen eingehen, manuelle Prozesse Zeit kosten oder neue Leads schneller bearbeitet werden sollen. Nicht jeder Prozess braucht KI. Häufig reicht bereits eine saubere Automatisierung, die Informationen zuverlässig weiterleitet.",
        ],
      },
      {
        heading: "Website zuerst, Automatisierung danach",
        summary:
          "Automatisierung funktioniert besser, wenn die Website vorher klare Angebote, verständliche Formulare und saubere Kontaktwege hat.",
        paragraphs: [
          "Stackwerkhaus denkt Automatisierung nicht isoliert. Zuerst muss die Website verständlich, schnell und vertrauenswürdig sein. Erst danach wird automatisiert. Eine schlechte Website wird durch KI nicht automatisch besser.",
          "Eine gute Website mit klaren Formularen, sauberer Struktur und passenden Workflows kann dagegen messbar Zeit sparen und Anfragen besser nutzbar machen. Deshalb beginnt die Planung nicht mit einem Tool, sondern mit der Frage, welche Information wirklich gebraucht wird.",
        ],
        steps: [
          {
            title: "Kontaktweg klären",
            text: "Zuerst wird festgelegt, welche Information eine Anfrage enthalten muss und wer intern damit arbeitet.",
          },
          {
            title: "Workflow entwerfen",
            text: "Danach werden Übergaben, Benachrichtigungen, Zusammenfassungen und Tool-Anbindungen geplant.",
          },
          {
            title: "Kontrolle einbauen",
            text: "Automatisierungen brauchen klare Grenzen, Tests und nachvollziehbare Fehlerwege, damit sensible Daten nicht blind laufen.",
          },
        ],
      },
      {
        heading: "Datenschutz und Kontrolle",
        summary:
          "Bei KI-Automatisierung müssen Datenschutz, Einwilligung, Tool-Auswahl, Datenweitergabe und interne Zuständigkeiten gemeinsam geplant werden.",
        paragraphs: [
          "KI-Automatisierung muss kontrolliert eingesetzt werden. Je nach Prozess müssen Datenschutz, Datenweitergabe, Einwilligung, Speicherdauer, Tool-Auswahl und interne Zuständigkeiten berücksichtigt werden.",
          "Stackwerkhaus plant Automatisierungen so, dass sie praktisch nutzbar und verständlich bleiben. Sensible Prozesse sollten nicht blind automatisiert werden. Gerade in Deutschland ist wichtig, dass Website, Formular, Einwilligung und angeschlossene Tools zusammen betrachtet werden.",
        ],
      },
    ],
    faqs: [
      {
        question: "Was ist eine Website mit KI-Automatisierung?",
        answer:
          "Das ist eine Website, die nicht nur Informationen zeigt, sondern digitale Prozesse auslösen kann. Dazu gehören Lead-Übergaben, automatische E-Mails, Chatbot-Konzepte, CRM-Anbindung oder KI-gestützte Workflows, die Anfragen strukturieren und interne Arbeit reduzieren.",
      },
      {
        question: "Kann Stackwerkhaus einen KI-Chatbot integrieren?",
        answer:
          "Ja. Je nach Ziel kann ein Chatbot-Konzept geplant und technisch integriert werden. Wichtig ist, dass der Chatbot echte Nutzerfragen sinnvoll beantwortet, klare Grenzen hat und nicht nur als Spielerei auf der Website erscheint.",
      },
      {
        question: "Welche Tools können angebunden werden?",
        answer:
          "Je nach Projekt können Tools wie CRM-Systeme, Google Sheets, Notion, Slack, E-Mail-Systeme, n8n, Zapier oder individuelle Schnittstellen angebunden werden. Die Auswahl hängt davon ab, welche Daten verarbeitet werden und wie dein Team arbeitet.",
      },
      {
        question: "Ist KI-Automatisierung DSGVO relevant?",
        answer:
          "Ja. Sobald personenbezogene Daten verarbeitet oder an externe Tools übergeben werden, müssen Datenschutz, Einwilligung und Tool-Auswahl geprüft werden. Besonders bei KI-Diensten ist wichtig, welche Daten wohin übertragen und wie lange sie gespeichert werden.",
      },
      {
        question: "Lohnt sich KI-Automatisierung für kleine Unternehmen?",
        answer:
          "Ja, wenn wiederkehrende Anfragen, manuelle Übergaben oder repetitive interne Aufgaben automatisiert werden können. Nicht jeder Prozess braucht KI. Oft reicht eine saubere Automatisierung ohne komplexes KI-System, wenn sie zuverlässig Zeit spart.",
      },
    ],
    internalLinks: [
      {
        href: "/website-erstellen-lassen-deutschland",
        label: "Website schnell erstellen lassen in Deutschland",
        description:
          "Für die professionelle Website-Grundlage vor der Automatisierung.",
      },
      {
        href: "/webdesign-kleine-unternehmen",
        label: "Webdesign für kleine Unternehmen",
        description:
          "Für kleine Unternehmen, die erst Struktur, Vertrauen und Kontaktwege schärfen möchten.",
      },
      {
        href: "/landingpage-erstellen-lassen",
        label: "Landingpage erstellen lassen",
        description:
          "Für Angebote und Kampagnen, deren Anfragen automatisch verarbeitet werden sollen.",
      },
      {
        href: "/nextjs-website-erstellen-lassen",
        label: "Next.js Website erstellen lassen",
        description:
          "Für eine technische Grundlage, die Integrationen und Workflows gut tragen kann.",
      },
    ],
    schema: {
      serviceName: "Website mit KI-Automatisierung erstellen lassen",
      serviceType:
        "Webdesign, Website-Automatisierung, KI-Workflows und Lead-Prozess-Anbindung",
      description:
        "Stackwerkhaus erstellt Websites mit KI-Automatisierung für kleine Unternehmen, Dienstleister und digitale Marken mit Kontaktformularen, Lead-Prozessen, CRM-Übergaben und Workflows.",
    },
  },
] as const satisfies readonly LandingPage[];

export const landingPagePaths = landingPages.map((page) => page.path);

export function getLandingPage(slug: string): LandingPage {
  const page = landingPages.find((entry) => entry.slug === slug);
  if (!page) {
    throw new Error(`Unknown landing page: ${slug}`);
  }
  return page;
}

export function getLandingPageMetadata(page: LandingPage): Metadata {
  return {
    title: {
      absolute: page.title,
    },
    description: page.metaDescription,
    keywords: [...page.keywords],
    alternates: {
      canonical: page.path,
    },
    openGraph: {
      type: "website",
      locale: "de_DE",
      url: page.path,
      siteName: siteConfig.name,
      title: page.title,
      description: page.metaDescription,
      images: [
        {
          url: landingPageOgImage.url,
          width: landingPageOgImage.width,
          height: landingPageOgImage.height,
          alt: landingPageOgImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.metaDescription,
      images: [landingPageOgImage.url],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function getLandingPageStructuredData(page: LandingPage) {
  const pageUrl = `${siteConfig.url}${page.path}`;
  const serviceId = `${pageUrl}#service`;

  const serviceSchema = {
    "@type": "Service",
    "@id": serviceId,
    name: page.schema.serviceName,
    serviceType: page.schema.serviceType,
    description: page.schema.description,
    url: pageUrl,
    mainEntityOfPage: {
      "@id": `${pageUrl}#webpage`,
    },
    image: {
      "@type": "ImageObject",
      url: `${siteConfig.url}${landingPageOgImage.url}`,
      width: landingPageOgImage.width,
      height: landingPageOgImage.height,
      caption: landingPageOgImage.alt,
    },
    provider: {
      "@id": `${siteConfig.url}#professional-service`,
    },
    areaServed: {
      "@type": "Country",
      name: "Deutschland",
    },
    ...(page.schema.offer
      ? {
          offers: {
            "@type": "Offer",
            name: page.schema.offer.name,
            price: page.schema.offer.price,
            priceCurrency: "EUR",
            description: page.schema.offer.description,
            url: pageUrl,
          },
        }
      : {}),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: page.title,
        headline: page.h1,
        description: page.metaDescription,
        inLanguage: "de-DE",
        dateModified: page.updatedAt,
        isPartOf: {
          "@id": `${siteConfig.url}#website`,
        },
        about: {
          "@id": serviceId,
        },
        mainEntity: {
          "@id": serviceId,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteConfig.url}${landingPageOgImage.url}`,
          width: landingPageOgImage.width,
          height: landingPageOgImage.height,
          caption: landingPageOgImage.alt,
        },
      },
      commonProvider,
      commonWebsite,
      serviceSchema,
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
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
            name: page.h1,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

export function stringifyJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
