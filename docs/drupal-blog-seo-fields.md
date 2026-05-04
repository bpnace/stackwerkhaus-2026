# Drupal Blog SEO-Felder

Diese Felder reichen aus, damit neue Blogbeiträge besser für Google, AI-Suchen und Social Previews genutzt werden können.

## Bereits genutzt

- `title`: Beitragstitel und H1.
- `path.alias`: kanonischer Slug unter `/blog/{slug}`.
- `created` und `changed`: Veröffentlichungs- und Änderungsdatum.
- `field_summary`: Teaser, Meta-Fallback und Kartenbeschreibung.
- `body`: Hauptinhalt mit Überschriften, Listen, Zitaten, Links und Tabellen.
- `field_image` inklusive Alt-Text: Artikelbild, Hero-Bild und OG/Twitter-Bild.
- `field_category`: sichtbare Kategorie.
- `field_tags`: sichtbare Tags und Schema-Keywords.

## Neu anlegen

### `field_answer_box`

- Typ: Langer Text, unformatiert oder formatiert.
- Pflicht: empfohlen.
- Länge: 1 bis 2 Sätze, ungefähr 220 bis 320 Zeichen.
- Nutzung: sichtbarer Block `Kurzantwort`, `BlogPosting.abstract` im JSON-LD.
- Inhalt: direkte Antwort auf die Hauptfrage des Artikels.

### `field_experience_note`

- Typ: Boolean.
- Pflicht: empfohlen.
- Nutzung: sichtbares Badge `Aus Projektpraxis`.
- Inhalt: `true`, wenn der Artikel direkt aus echter Stackwerkhaus-Projekterfahrung, Kundenarbeit, Umsetzung, Audit oder Debugging stammt.

### `field_sources`

- Typ: Link-Feld, mehrfach.
- Pflicht: optional, aber für Ratgeber/SEO/AEO-Artikel stark empfohlen.
- Linktitel: erforderlich.
- URL: externe Quelle oder interner Stackwerkhaus-Link.
- Nutzung: sichtbare Liste `Quellen und Belege`, `BlogPosting.citation` im JSON-LD.

## Keine neuen Felder nötig

- Autor: aktuell wird `Arthur Marshall` fest aus der Site-Konfiguration gesetzt und sichtbar im Artikelkopf ausgegeben. Ein eigenes Autorenfeld brauchst du erst bei Gastautoren.
- Datum: Drupal `created` und `changed` reichen für `datePublished` und `dateModified`.
- Tabellen: im `body` pflegen; der Renderer erlaubt jetzt HTML-Tabellen.
- Interne Links: im `body` setzen oder über `field_sources` referenzieren.
- FAQ: vorerst als sichtbare Abschnitte im `body` pflegen. Für echtes `FAQPage`-Schema später ein wiederholbares Paragraph-Feld `field_faq_items` mit `question` und `answer` anlegen.
