import type { Metadata } from "next";
import { LinkRippleText } from "@/components/ui/LinkRippleText";

export const metadata: Metadata = {
  title: "Datenschutz",
  alternates: {
    canonical: "/datenschutz",
  },
};

export default function DatenschutzPage() {
  return (
    <main className="section-space">
      <div className="section-shell max-w-4xl space-y-10">
        <div className="space-y-3">
          <div className="eyebrow">Rechtliches</div>
          <h1 className="display-md">Datenschutzerklärung</h1>
          <p className="text-muted">
            Informationen zum Umgang mit deinen Daten bei Stackwerkhaus.
          </p>
        </div>

        <section className="space-y-8 text-sm leading-7 text-muted">
          <p>
            Diese Datenschutzerklärung informiert über die Art, den Umfang und
            Zweck der Verarbeitung personenbezogener Daten auf dieser Website
            sowie im Rahmen der Kontaktaufnahme und Terminbuchung.
          </p>

          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-foreground">
              1. Verantwortlicher
            </h2>
            <p className="mt-3">
              <strong className="text-foreground">
                Verantwortlich für die Datenverarbeitung:
              </strong>
            </p>
            <p className="mt-2">
              Arthur Marshall
              <br />
              STACKWERKHAUS
              <br />
              Sigmaringer Str. 27
              <br />
              10713 Berlin
              <br />
              Deutschland
            </p>
            <p className="mt-2">
              <strong className="text-foreground">Kontakt:</strong>{" "}
              <a
                href="mailto:info@stackwerkhaus.de"
                className="hover-weight-link hover:text-foreground"
              >
                <LinkRippleText text="info@stackwerkhaus.de" />
              </a>
            </p>
            <p className="mt-2">
              Ein Datenschutzbeauftragter ist nicht benannt, da keine
              gesetzliche Verpflichtung besteht.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-foreground">
              2. Hosting und Server-Log-Dateien
            </h2>
            <p className="mt-3">
              Die Website wird bei der STRATO AG, Otto-Ostrowski-Straße 7, 10249
              Berlin, Deutschland gehostet. Beim Zugriff auf die Website
              verarbeitet der Hosting-Provider Server-Log-Daten (z. B.
              IP-Adresse, Datum und Uhrzeit, angefragte Seite, Statuscode,
              User-Agent), um die Stabilität und Sicherheit der Website zu
              gewährleisten.
            </p>
            <p className="mt-2">
              <strong className="text-foreground">Rechtsgrundlage:</strong> Art.
              6 Abs. 1 lit. f DSGVO
              <br />
              <strong className="text-foreground">Zweck:</strong> Sicherstellung
              eines störungsfreien Betriebs und Abwehr von Missbrauch
              <br />
              <strong className="text-foreground">Speicherdauer:</strong> Für
              einen begrenzten Zeitraum gemäß den Vorgaben des Hosting-Providers
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-foreground">
              3. Kontaktaufnahme
            </h2>
            <p className="mt-3">
              Wenn du uns per E-Mail oder Telefon kontaktierst, verarbeiten wir
              die von dir mitgeteilten Daten (z. B. Name, E-Mail-Adresse,
              Telefonnummer und Nachricht), um deine Anfrage zu beantworten.
            </p>
            <p className="mt-2">
              <strong className="text-foreground">Rechtsgrundlage:</strong> Art.
              6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) oder Art. 6 Abs.
              1 lit. f DSGVO (allgemeine Anfragen)
              <br />
              <strong className="text-foreground">Zweck:</strong> Bearbeitung
              deiner Anfrage
              <br />
              <strong className="text-foreground">Speicherdauer:</strong> Bis
              zum Abschluss der Bearbeitung und im Rahmen gesetzlicher
              Aufbewahrungspflichten
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-foreground">
              4. Cookies und Einwilligungsmanagement (CCM19)
            </h2>
            <p className="mt-3">
              Wir verwenden CCM19, um deine Einwilligungen in das Setzen von
              Cookies und den Einsatz vergleichbarer Technologien zu verwalten.
              CCM19 speichert deine Auswahl und ermöglicht dir, diese jederzeit
              anzupassen.
            </p>
            <p className="mt-2">
              <strong className="text-foreground">Anbieter:</strong> Papoo
              Software &amp; Media GmbH, Auguststr. 4, 53229 Bonn, Deutschland.
            </p>
            <p className="mt-2">
              <strong className="text-foreground">Rechtsgrundlage:</strong> Art.
              6 Abs. 1 lit. c DSGVO (Erfüllung rechtlicher Verpflichtungen) und
              Art. 6 Abs. 1 lit. f DSGVO (Nachweis der Einwilligungen); für das
              Setzen von Cookies § 25 Abs. 1 TDDDG
              <br />
              <strong className="text-foreground">Zweck:</strong>{" "}
              Einwilligungsmanagement und Compliance
              <br />
              <strong className="text-foreground">Speicherdauer:</strong> Gemäß
              den Einstellungen des Consent-Tools.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-foreground">
              5. Terminbuchung über Calendly
            </h2>
            <p className="mt-3">
              Für die Terminbuchung verwenden wir den Dienst Calendly. Bei der
              Nutzung werden die von dir eingegebenen Daten (z. B. Name,
              E-Mail-Adresse, gewünschter Termin und optionale Hinweise)
              verarbeitet, um den Termin zu organisieren.
            </p>
            <p className="mt-2">
              <strong className="text-foreground">Anbieter:</strong> Calendly
              LLC, 115 E Main St, Ste A1B, Buford, GA 30518, USA.
            </p>
            <p className="mt-2">
              <strong className="text-foreground">Rechtsgrundlage:</strong> Art.
              6 Abs. 1 lit. b DSGVO (Terminvereinbarung); Cookies bzw.
              vergleichbare Technologien nur nach Einwilligung gemäß § 25 Abs. 1
              TDDDG
              <br />
              <strong className="text-foreground">
                Datenübermittlung:
              </strong>{" "}
              Bei Calendly kann eine Verarbeitung in Drittländern (z. B. USA)
              stattfinden. Es gelten die von Calendly bereitgestellten
              geeigneten Garantien (z. B. SCCs).
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-foreground">
              6. Social-Media-Links
            </h2>
            <p className="mt-3">
              Auf der Website sind nur Links zu Instagram und LinkedIn
              eingebunden. Beim Anklicken gelten die Datenschutzrichtlinien der
              jeweiligen Anbieter.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-foreground">
              7. Deine Rechte
            </h2>
            <p className="mt-3">
              Du hast das Recht auf Auskunft, Berichtigung, Löschung,
              Einschränkung der Verarbeitung sowie Datenübertragbarkeit. Zudem
              kannst du jederzeit Widerspruch gegen die Verarbeitung einlegen.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-foreground">
              8. Beschwerderecht
            </h2>
            <p className="mt-3">
              <strong className="text-foreground">
                Berliner Beauftragte für Datenschutz und Informationsfreiheit
              </strong>
              <br />
              Friedrichstr. 219, 10969 Berlin
              <br />
              Telefon: 030 13889-0
              <br />
              Website:{" "}
              <a
                href="https://www.datenschutz-berlin.de"
                className="hover-weight-link hover:text-foreground"
              >
                <LinkRippleText text="www.datenschutz-berlin.de" />
              </a>
            </p>
          </div>

          <p>
            <strong className="text-foreground">Stand:</strong> Januar 2026
          </p>
        </section>
      </div>
    </main>
  );
}
