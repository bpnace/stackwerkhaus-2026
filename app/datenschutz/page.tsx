import type { Metadata } from "next";
import { LinkRippleText } from "@/components/ui/LinkRippleText";

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Datenschutzerklärung von STACKWERKHAUS mit Angaben zu Hosting, Kontaktaufnahme, Cookies, externen Diensten und deinen Rechten.",
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
            sowie im Rahmen der Kontaktaufnahme über das Formular und per
            E-Mail.
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
            <p className="mt-2">
              <strong className="text-foreground">Kontakt:</strong>{" "}
              <a
                href="mailto:info@stackwerkhaus.de"
                className="hover-weight-link hover:text-foreground"
              >
                <LinkRippleText text="info@stackwerkhaus.de" />
              </a>
              <br />
              <strong className="text-foreground">Telefon:</strong>{" "}
              <a
                href="tel:017631378294"
                className="hover-weight-link hover:text-foreground"
              >
                <LinkRippleText text="0176 31378294" />
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
              Wenn du uns per E-Mail, Telefon oder über das Kontaktformular
              kontaktierst, verarbeiten wir die von dir mitgeteilten Daten,
              insbesondere Name, E-Mail-Adresse, Nachricht, freiwillige
              Zusatzangaben sowie den Zeitpunkt deiner Anfrage, um dein Anliegen
              zu bearbeiten und zu beantworten.
            </p>
            <p className="mt-2">
              <strong className="text-foreground">Rechtsgrundlage:</strong> Art.
              6 Abs. 1 lit. b DSGVO, wenn deine Anfrage auf ein Angebot oder
              eine Zusammenarbeit gerichtet ist, sonst Art. 6 Abs. 1 lit. f
              DSGVO bei allgemeinen Anfragen
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
              4. Technische Verarbeitung des Kontaktformulars
            </h2>
            <p className="mt-3">
              Anfragen aus dem Kontaktformular werden serverseitig an eine von
              uns betriebene Automatisierungsinstanz weitergeleitet, um die
              Anfrage technisch zu prüfen, Spam-Eingaben zu filtern und intern
              strukturiert zu verarbeiten.
              Dabei können zusätzlich technische Metadaten wie Seiten-URL,
              Seitentitel, Referrer, Browserkennung, Sprache und Zeitzone
              verarbeitet werden, soweit diese vom Formular bzw. Browser
              übermittelt werden.
            </p>
            <p className="mt-2">
              <strong className="text-foreground">Rechtsgrundlage:</strong> Art.
              6 Abs. 1 lit. b DSGVO (Bearbeitung deiner Anfrage) sowie Art. 6
              Abs. 1 lit. f DSGVO (Missbrauchs- und Spam-Abwehr)
              <br />
              <strong className="text-foreground">Zweck:</strong> Sichere
              Übermittlung, Spam-Prüfung und strukturierte Bearbeitung von
              Kontaktanfragen
              <br />
              <strong className="text-foreground">Empfänger:</strong> Interne,
              von uns betriebene Systeme und Personen, die mit der Bearbeitung
              der Anfrage betraut sind
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-foreground">
              5. Stackwerkhaus Baustellencheck
            </h2>
            <p className="mt-3">
              Wenn du den Baustellencheck nutzt, verarbeiten wir die von dir
              eingegebenen Angaben, insbesondere Website-URL, Einschätzung zum
              aktuellen Website-Zustand, ausgewählte Ziele, Name,
              E-Mail-Adresse, freiwillige Unternehmensangaben, optionale
              Nachricht sowie technische Metadaten der Übermittlung. Diese Daten
              nutzen wir, um deinen digitalen Bauzustand einzuordnen und dir
              eine kurze Einschätzung mit möglichen nächsten Schritten zu
              senden.
            </p>
            <p className="mt-2">
              <strong className="text-foreground">Rechtsgrundlage:</strong> Art.
              6 Abs. 1 lit. b DSGVO, wenn der Baustellencheck auf ein Angebot,
              eine Zusammenarbeit oder vorvertragliche Schritte gerichtet ist,
              sowie Art. 6 Abs. 1 lit. f DSGVO bei allgemeinen Anfragen,
              Missbrauchs- und Spam-Abwehr
              <br />
              <strong className="text-foreground">Zweck:</strong> Bearbeitung
              des Baustellenchecks, Einordnung deiner Website und Rückmeldung
              per E-Mail
              <br />
              <strong className="text-foreground">Speicherdauer:</strong> Bis
              zum Abschluss der Bearbeitung und im Rahmen gesetzlicher
              Aufbewahrungspflichten
            </p>
            <p className="mt-2">
              Wenn du die optionale Newsletter-Einwilligung auswählst, speichern
              wir diese Auswahl getrennt vom Pflichtteil des Baustellenchecks.
              Eine Anmeldung zu Tipps rund um Webdesign, Development und
              digitale Bauwerke erfolgt nur auf Grundlage deiner freiwilligen
              Einwilligung und kann jederzeit widerrufen werden.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-foreground">
              6. Cookies und Einwilligungsmanagement (CCM19)
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
              7. Google Analytics
            </h2>
            <p className="mt-3">
              Wir verwenden Google Analytics 4 zur statistischen Auswertung der
              Nutzung dieser Website. Dabei können insbesondere Seitenaufrufe,
              Interaktionen, technische Informationen zu Browser und Gerät,
              Referrer-Daten sowie ungefähre Standortinformationen verarbeitet
              werden. Nach Angaben von Google speichert Google Analytics 4 keine
              vollständigen IP-Adressen; IP-Daten von Nutzern aus der EU werden
              vor einer Protokollierung nur zur Geo-Ableitung verwendet und
              anschließend verworfen.
            </p>
            <p className="mt-2">
              <strong className="text-foreground">Anbieter:</strong> Google
              Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
            </p>
            <p className="mt-2">
              <strong className="text-foreground">Rechtsgrundlage:</strong> Art.
              6 Abs. 1 lit. a DSGVO sowie § 25 Abs. 1 TDDDG, soweit du über das
              Consent-Management in die Analyse eingewilligt hast
              <br />
              <strong className="text-foreground">
                Datenübermittlung:
              </strong>{" "}
              Eine Verarbeitung durch Google kann auch durch Google LLC in den
              USA erfolgen. Dabei kann ein Drittlandtransfer nicht
              ausgeschlossen werden. Maßgeblich sind die von Google
              bereitgestellten Datenschutzinformationen und ggf. zusätzliche
              vertragliche Garantien.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-foreground">
              8. Microsoft Clarity
            </h2>
            <p className="mt-3">
              Wir verwenden Microsoft Clarity zur Analyse der Nutzung dieser
              Website und zur Verbesserung der Benutzerführung. Dabei können
              insbesondere Seitenaufrufe, Klicks, Scrollverhalten,
              technische Informationen zu Browser und Gerät sowie
              Referrer-Daten verarbeitet werden.
            </p>
            <p className="mt-2">
              <strong className="text-foreground">Anbieter:</strong>{" "}
              Microsoft Ireland Operations Limited, One Microsoft Place, South
              County Business Park, Leopardstown, Dublin 18, D18 P521, Irland.
            </p>
            <p className="mt-2">
              <strong className="text-foreground">Rechtsgrundlage:</strong> Art.
              6 Abs. 1 lit. a DSGVO sowie § 25 Abs. 1 TDDDG, soweit du über das
              Consent-Management in die Analyse eingewilligt hast
              <br />
              <strong className="text-foreground">
                Datenübermittlung:
              </strong>{" "}
              Eine Verarbeitung durch Microsoft kann auch außerhalb der EU
              erfolgen. Maßgeblich sind die von Microsoft bereitgestellten
              Datenschutzinformationen und ggf. zusätzliche vertragliche
              Garantien.
              <br />
              <strong className="text-foreground">Weitere Informationen:</strong>{" "}
              <a
                href="https://www.microsoft.com/privacy/privacystatement"
                className="hover-weight-link hover:text-foreground"
              >
                <LinkRippleText text="Microsoft Privacy Statement" />
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-foreground">
              9. Social-Media-Links
            </h2>
            <p className="mt-3">
              Auf der Website sind nur Links zu Instagram und LinkedIn
              eingebunden. Beim Anklicken gelten die Datenschutzrichtlinien der
              jeweiligen Anbieter.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-foreground">
              10. Deine Rechte
            </h2>
            <p className="mt-3">
              Du hast das Recht auf Auskunft, Berichtigung, Löschung,
              Einschränkung der Verarbeitung sowie Datenübertragbarkeit. Zudem
              kannst du jederzeit Widerspruch gegen die Verarbeitung einlegen.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-foreground">
              11. Beschwerderecht
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
            <strong className="text-foreground">Stand:</strong> Mai 2026
          </p>
        </section>
      </div>
    </main>
  );
}
