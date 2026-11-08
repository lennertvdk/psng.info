---
target: Event-Detail (Majić-Lecture)
total_score: 26
max_score: 36
na_heuristics: 9
p0_count: 0
p1_count: 1
target_identity: "file:/Users/lenne/Documents/Github/psng.info/src/components/astro/events/EventDetail.astro"
target_fingerprint: "sha256:d70e74c3815dddfb2358967f6cc259e52d3a058ca61f14d203a04d45203b4d54"
target_path: /Users/lenne/Documents/Github/psng.info/src/components/astro/events/EventDetail.astro
timestamp: 2026-11-08T23-27-54Z
slug: src-components-astro-events-eventdetail-astro
---
Method: dual-agent (A: general-purpose/Opus · B: general-purpose/Sonnet)
Stand: 09.11.2026, Branch `astro` (inzwischen identisch mit `main`), Dev-Server :8080, 1440×900 und 375×812.

## 3. Event-Detail (`/events/lecture-tomislav-majic`, `events/EventDetail.astro` über `EventPage.astro`)

**Modus:** Read (Rückblick lesen, teilen; bei kommenden Events: Fakten und Teilnahme).

### Design-Specificity-Verdict
Ein klassischer Aufbau: Artikel mit Fakten-Seitenleiste, oben Fotos, dann Abstract, Speaker, Partner, Literatur, Zahlen, Vor/Zurück. Das ist solide und angemessen, aber genauso bei Luma, Meetup oder einer Uni-Veranstaltungsseite zu finden. PSNG-Charakter tragen nur Chips und Pink-Links. Für die Seite, die Speaker:innen teilen, ist das zu anonym: Es gibt keinen fotogetriebenen Kopf, kein „PSNG-Lecture Nr. X“, keinen Bezug zur Reihe.

**Verdict:** funktional-neutral, nicht peinlich, aber verschenkt.


### Deterministischer Scan (Assessment B) und Abgleich

- **Quelldatei-Scan:** 0 Befunde (`EventDetail.astro`).
- **URL-Scan Desktop: 4 Befunde.**
  - `line-length` ×1: Abstract und Bio `EventDetail.astro:267/270`, ~89 Zeichen
  - `first-viewport-column-overflow` ×1: Raster `EventDetail.astro:149`, die Hauptspalte ist 176 % des Viewports hoch, die Seitenleiste 34 %
  - `ai-color-palette` ×1: BPSA-Chip, False Positive
  - `overused-font` ×1: Space Grotesk 65 %
- **URL-Scan 375 px:** 2 Befunde (`ai-color-palette`, `overused-font`).
- **Overlay:** 4 Treffer.
- **Wo A und B übereinstimmen:** Der Spaltenbefund ist die Desktop-Seite desselben Problems, das A auf dem Handy als P1 sieht. Die Fakten (Wann, Wo, CTA) stehen in einer kurzen Nebenspalte, der Inhalt läuft lang daneben. Auf dem Handy rutschen die Fakten deshalb ans Ende.
- **Einordnung:** Das Audit wertet den Spaltenbefund als Layout-Entscheidung und nicht als Defekt. Für ein Refinement bleibt er relevant.

### Nielsen-Heuristiken

| # | Heuristik | Score | Key Issue |
|---|---|---|---|
| 1 | Sichtbarkeit des Systemstatus | 3 | „Nur live, vor Ort und über Zoom – eine Aufzeichnung gibt es diesmal nicht.“ ist vorbildlich. Status-Banner für abgesagt, verschoben und verlegt sind vorhanden. Das vergangene Event zeigt aber noch „Raum folgt“. |
| 2 | Sprache der Nutzer:innen | 3 | „Wann/Wo“, „In Zahlen“, „davon online“ sind klar. „Speaker“ ist im akademischen Deutsch akzeptabel. Das englische Abstract ist im laufenden Dev-Server nicht als „(Englisch)“ gekennzeichnet und trägt kein `lang` (siehe Minor Observations). |
| 3 | Kontrolle & Freiheit | 3 | „Alle Events“ springt an dieselbe Stelle im Zeitstrahl. Die Galerie lässt sich mit Esc und ✕ schließen, hat Pfeile und einen Zähler (getestet). |
| 4 | Konsistenz | 2 | Die Pfeil-Konvention ist umgedreht: ← führt zum neueren, → zum älteren Event (Z. 80–96 und 489–508). Der Highlight-Badge ist hier Amber, auf der Karte Verlauf. |
| 5 | Fehlervermeidung | 3 | Zustände wie „Anmeldung voll“ oder „geschlossen“ sowie Hinweise zu Verlegungen sind abgedeckt. |
| 6 | Wiedererkennen statt Erinnern | 3 | Auf dem Desktop stehen die Fakten fest daneben, bei kommenden Events `sticky`. |
| 7 | Flexibilität & Effizienz | 3 | Kalendereintrag, Vor/Zurück mit Datum, Teaser „Als Nächstes“, Galerie per Tastatur bedienbar. |
| 8 | Ästhetik & Minimalismus | 3 | Fokussiert. Kleine Störungen: eine Lücke im Fotoraster, die Bio in 14 px Grau. |
| 9 | Fehler erkennen & beheben | n/a | keine Eingaben auf der Fläche |
| 10 | Hilfe & Doku | 3 | Wie man teilnimmt, steht am Ort der Aktion („Zoom-Link via WhatsApp“, Luma-Hinweis, „Nur live“). |
| | **Summe** | **26/36 (72 %)** | **Rating: Good** |

### Cognitive Load
Fehlschläge (1 = niedrig):
- **Visuelle Hierarchie (Handy):** Die Fakten (Wann, Wo, Sprache) und die Teilnahme-Aktion stehen auf dem Handy nach dem gesamten Inhalt. Beim Majić-Event beginnt die Faktenbox bei y = 2626 von 3759 px, nach Fotos, Abstract, Speaker, Partner und Literatur.

Entscheidungspunkte mit mehr als 4 Optionen: keine.

### Emotional Journey
1. Kurze Orientierung durch Chips und H1.
2. **Höhepunkt** bei den Fotos (Hörsaal, Folie, Sprecher).
3. Konzentriertes Lesen des Abstracts, dann Sprecher mit Foto: Vertrauen.
4. **Ruhiges Ende** mit Vor/Zurück-Karten.

Bei **kommenden** Events auf dem Handy entsteht ein Unruhemoment: „Wann ist das, wie komme ich rein?“ Die Antwort steht erst am Ende. Bei der Brasanac-Seite liegt der Knopf noch knapp unter dem ersten Bildschirm (y = 880). Mit einem vollen Abstract rutscht er 2 bis 3 Bildschirme tiefer.

### Stärken
1. **Ehrliche Zustandskommunikation:** keine Aufzeichnung, abgesagt, verschoben, verlegt, Anmeldung voll. Alles klar benannt und mit `role="status"` ausgezeichnet.
2. **Die Galerie ist richtig gebaut:** natives `dialog`, Esc, Zähler, Pfeile, `object-contain`, Lazy Loading. Die Rückkehr in den Zeitstrahl an dieselbe Stelle ist ein Detail, das Nutzer:innen bemerken.
3. **Die Seitenleiste trennt Fakten sauber von Prosa**, mit „In Zahlen“ als eigener Belegkarte (61 / 46). Für Speaker:innen ist das ein gutes Argument.

### Priority Issues

**[P1] Auf dem Handy stehen Fakten und Teilnahme-Aktion hinter dem Inhalt**
- **Why:** Laut PRODUCT.md braucht man zu einer Lecture vor allem Termin, Ort, Sprache und den Weg zum Zoom-Link. Auf dem Handy liegt genau das ganz unten. Wer die geteilte Event-Seite aus WhatsApp öffnet, sieht zuerst Fotos oder Abstract und nicht das Datum.
- **Fix:** In `EventDetail.astro:356` für `!past` die Seitenleiste mit `order-first md:order-none` vorziehen, oder auf dem Handy direkt unter dem Header (nach Z. 128) eine kompakte Faktenzeile mit CTA einfügen. Bei vergangenen Events reicht eine Zeile „Mi, 04.11.2026 · HU Berlin + Zoom · 61 Teilnehmende“ unter der H1.
- **Suggested command:** /impeccable adapt

**[P2] Die Titelhierarchie stellt die Person vor das Thema**
- **Why:** Die H1 lautet „Lecture mit Dr. med. Tomislav Majić“, der eigentliche Vortragstitel „Why Psychedelic Harm Reduction“ steht klein und grau darunter (Z. 116–117). Für die Vorschau beim Teilen und für akademische Glaubwürdigkeit sollte das Thema führen und der Name die Byline sein.
- **Fix:** Gibt es `subtitle` oder `abstract.title`, wird das Thema zur H1. Darunter steht eine Byline mit Sprecherfoto (48 px), Name und Institution sowie „PSNG-Lecture · gemeinsam mit BPSA“. Das Datenmodell bleibt, die Logik sitzt in `EventDetail.astro`.
- **Suggested command:** /impeccable typeset

**[P2] Vergangene Events zeigen veraltete Platzhalter**
- **Why:** Unter „WO“ steht „Zoom und vor Ort an der HU Berlin, Raum folgt“, bei einem Event vom 04.11. (Z. 365–375). Riley und Speaker:innen lesen das als ungepflegt.
- **Fix:** Bei `past` hat `venue` Vorrang (Straße, Raum), oder „folgt“-Teile werden ausgeblendet. Fehlt beides, zeigt die Seite nur „HU Berlin + Zoom“. Zusätzlich gehört ein Schema-Hinweis in die Content-Collection.
- **Suggested command:** /impeccable harden

**[P3] Fotoraster mit Lücke bei zwei Fotos**
- **Why:** Das Raster nimmt immer mindestens 3 Fotos an (Z. 178–190). Bei 2 Fotos bleibt auf dem Desktop eine leere Zelle unter Foto 2, und auf dem Handy steht Foto 2 halb so breit allein.
- **Fix:** Die Rasterlogik nach Anzahl wählen: 1 Foto in voller Breite, 2 Fotos zu gleichen Teilen nebeneinander, ab 3 das Mosaik.
- **Suggested command:** /impeccable layout

**[P3] Die Vor/Zurück-Pfeile sind gegen die Konvention gesetzt**
- **Why:** Im Kopf zeigt ← zum neueren Event, und in der Fußleiste steht „Nächstes Event“ links mit ←. Das folgt der Leserichtung des Zeitstrahls, widerspricht aber der Konvention „← zurück / älter“.
- **Fix:** Im Kopf beschriftete Links („Neuer“, „Älter“), oder ← älter / neuer →.
- **Suggested command:** /impeccable clarify

### Persona Red Flags
- **Jordan:** Zwei Pfeilknöpfe ohne Text oben rechts, ihre Richtung muss man erraten. „Speaker“ und „Abstract“ auf Englisch, das Abstract selbst ebenfalls ohne Hinweis.
- **Riley:**
  - „Raum folgt“ in der Vergangenheit.
  - Leere Rasterzelle.
  - „Nächstes Event“ führt zu „Thema folgt“ / „Ort folgt“.
  - Die Abstract-Kennzeichnung aus Commit f9abf5b ist im laufenden Server nicht zu sehen.
- **Casey:** Bei kommenden Events liegen Wann, Wo und der CTA am Seitenende. Foto 2 steht halbbreit allein. Die Kopf-Pfeile messen 36 px (`h-9 w-9`, Z. 86).
- **Dr. Hanna** (würde die eigene Seite so teilen): Der eigene Name statt des Themas als H1 wirkt wie eine Ankündigung, nicht wie ein Fachvortrag. Positiv: Bio, Literatur und „In Zahlen“ vermitteln Professionalität.

### Minor Observations
- Die englische Abstract-Kennzeichnung („Abstract (Englisch)“, `lang="en"`) ist im Code vorhanden (Z. 251–267), erscheint im laufenden Dev-Server aber nicht. Weder die Überschrift noch ein `lang`-Attribut wird gerendert. Vermutlich hat der Server das geänderte Content-Schema (`content.config.ts`) nicht neu geladen. Nach einem Neustart prüfen. Das ist kein Designmangel.
- `h2` „Fotos“ ist sichtbar, `h2` „Aufzeichnung“ nur für Screenreader. Das ist uneinheitlich, aber vertretbar.
- Der Partner-Block wiederholt den BPSA-Text wortgleich zur Übersichtskarte.
- Die „Als Nächstes“-Zeile (Z. 511–529) ist eine gute Idee, fällt hier aber weg, weil der nächste Termin schon als Nachbar verlinkt ist.

### Provokante Fragen
- Sollte nicht der Vortragstitel die H1 sein statt „Lecture mit …“?
- Was sieht jemand in den ersten drei Sekunden, der den Link in WhatsApp antippt?
- Wäre ein großes Foto mit Titel darüber (Saal, Folie, Sprecher) als Kopf die bessere Visitenkarte als die Chips?

---
