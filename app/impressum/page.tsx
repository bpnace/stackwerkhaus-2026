import type { Metadata } from "next";
import { LinkRippleText } from "@/components/ui/LinkRippleText";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum und Anbieterkennzeichnung von STACKWERKHAUS in Berlin.",
  alternates: {
    canonical: "/impressum",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ImpressumPage() {
  return (
    <main className="section-space">
      <div className="section-shell max-w-4xl space-y-10">
        <div className="space-y-3">
          <div className="eyebrow">Rechtliches</div>
          <h1 className="display-md">Impressum</h1>
          <p className="text-muted">
            Rechtliche Informationen und Kontaktdaten von Codariq /
            STACKWERKHAUS.
          </p>
        </div>

        <section className="space-y-8 text-sm leading-7 text-muted">
          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-foreground">
              Angaben gemäß § 5 DDG
            </h2>
            <p className="mt-3">
              Tarik Arthur Marshall
              <br />
              Codariq
              <br />
              (STACKWERKHAUS ist Teil von Codariq)
              <br />
              Sigmaringer Str. 27
              <br />
              10713 Berlin
              <br />
              Deutschland
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-foreground">
              Kontakt
            </h2>
            <p className="mt-3">
              <strong className="text-foreground">Telefon:</strong>{" "}
              <a
                href="tel:017631378294"
                className="hover-weight-link hover:text-foreground"
              >
                <LinkRippleText text="0176 31378294" />
              </a>
              <br />
              <strong className="text-foreground">E-Mail:</strong>{" "}
              <a
                href="mailto:info@stackwerkhaus.de"
                className="hover-weight-link hover:text-foreground"
              >
                <LinkRippleText text="info@stackwerkhaus.de" />
              </a>
              <br />
              <strong className="text-foreground">Website:</strong>{" "}
              <a
                href="https://www.stackwerkhaus.de"
                className="hover-weight-link hover:text-foreground"
              >
                <LinkRippleText text="www.stackwerkhaus.de" />
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-foreground">
              Verantwortlich i. S. d. § 18 Abs. 2 MStV
            </h2>
            <p className="mt-3">
              Tarik Arthur Marshall
              <br />
              Sigmaringer Str. 27
              <br />
              10713 Berlin
              <br />
              Deutschland
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-foreground">
              Steuerliche Angaben
            </h2>
            <p className="mt-3">
              <strong className="text-foreground">
                Kleinunternehmer gemäß § 19 UStG
              </strong>
              <br />
              Aufgrund der Anwendung der Kleinunternehmerregelung gemäß § 19
              UStG wird keine Umsatzsteuer berechnet.
              <br />
              <strong className="text-foreground">Finanzamt:</strong> Finanzamt
              Berlin Wilmersdorf
              <br />
              <strong className="text-foreground">USt-IdNr.:</strong> Keine
              vorhanden.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-foreground">
              Berufshaftpflichtversicherung
            </h2>
            <p className="mt-3">
              Eine Berufshaftpflichtversicherung wird bei Aufnahme größerer
              Projekte (Enterprise-Level) abgeschlossen.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-foreground">
              EU-Streitschlichtung
            </h2>
            <p className="mt-3">
              Die Plattform der EU zur Online-Streitbeilegung (OS) wurde
              eingestellt. Wir nehmen nicht an einem Streitbeilegungsverfahren
              vor einer Verbraucherschlichtungsstelle teil.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-foreground">
              Verbraucherstreitbeilegung
            </h2>
            <p className="mt-3">
              Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
