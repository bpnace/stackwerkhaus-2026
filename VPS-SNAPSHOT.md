# VPS-Quellabgleich vom 18. November 2026

Dieser Commit übernimmt die bislang uncommitteten Änderungen des produktiven Quellverzeichnisses `/home/tarik/apps/stackwerkhaus` auf Basis von `12fe072`.

Enthalten sind insbesondere der vorhandene Standalone-Containerbuild, aktualisierte Abhängigkeiten und zugehörige Patches, Drupal-Paginierung, CCM19-gesteuerte GA4-/Clarity-Einbindung, Formularmaskierung und vorhandene UI-Korrekturen. Keine neue Trackingfunktion wurde durch die GitHub-Sicherung aktiviert.

Die Übernahme entstand in einer getrennten Git-Arbeitskopie. Produktive Dateien, `.git`, Container und Zeitpläne wurden nicht geändert. `.env`, Zugangsdaten, generierte Ausgaben und Datenbanken wurden nicht übernommen. Die öffentliche Drupal-URL sowie öffentliche Analytics-/CCM19-Einbindungskennungen sind von privaten API-Zugängen zu unterscheiden.

Dies ist eine Quellsicherung, kein neuer Rollout oder neuer Funktionsnachweis. CMS-Inhalte bleiben in Drupal und benötigen eine getrennte Datensicherung. Spätere Änderungen aus anderen Branches mit diesem Stand zusammenführen, statt vorhandene VPS-Anpassungen zurückzusetzen.

Nach dem anschließenden ausdrücklich beauftragten Tracking-Rollout vom 18. November erneut aktualisiert: gemeinsame sichere Consent-Runtime, CTA-Sichtbarkeit/Positionen, Kontakt-/Check-Start/Schritte/Fehler/Annahme, explizite Ablehnung fachlicher Webhook-Fehler und lokaler Container-Healthcheck. Kontakt- und Check-Testanfragen wurden jeweils wieder aus dem Leads-Sheet entfernt. Technische Abnahme und noch ausstehende Anbieter-Berichtsverarbeitung sind im privaten Growth-Board-Projekt unter `TRACKING-LIVE-ACCEPTANCE.md` getrennt dokumentiert.
