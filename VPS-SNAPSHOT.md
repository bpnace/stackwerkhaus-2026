# VPS-Quellabgleich vom 18. November 2026

Dieser Commit übernimmt die bislang uncommitteten Änderungen des produktiven Quellverzeichnisses `/home/tarik/apps/stackwerkhaus` auf Basis von `12fe072`.

Enthalten sind insbesondere der vorhandene Standalone-Containerbuild, aktualisierte Abhängigkeiten und zugehörige Patches, Drupal-Paginierung, CCM19-gesteuerte GA4-/Clarity-Einbindung, Formularmaskierung und vorhandene UI-Korrekturen. Keine neue Trackingfunktion wurde durch die GitHub-Sicherung aktiviert.

Die Übernahme entstand in einer getrennten Git-Arbeitskopie. Produktive Dateien, `.git`, Container und Zeitpläne wurden nicht geändert. `.env`, Zugangsdaten, generierte Ausgaben und Datenbanken wurden nicht übernommen. Die öffentliche Drupal-URL sowie öffentliche Analytics-/CCM19-Einbindungskennungen sind von privaten API-Zugängen zu unterscheiden.

Dies ist eine Quellsicherung, kein neuer Rollout oder neuer Funktionsnachweis. CMS-Inhalte bleiben in Drupal und benötigen eine getrennte Datensicherung. Spätere Änderungen aus anderen Branches mit diesem Stand zusammenführen, statt vorhandene VPS-Anpassungen zurückzusetzen.
