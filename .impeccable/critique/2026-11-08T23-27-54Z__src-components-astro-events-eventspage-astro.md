---
target: Events-Übersicht
total_score: 22
max_score: 36
na_heuristics: 9
p0_count: 0
p1_count: 2
target_identity: "file:/Users/lenne/Documents/Github/psng.info/src/components/astro/events/EventsPage.astro"
target_fingerprint: "sha256:29c5615d60daef3654b1b70f29cf40a7d0e7bf5fe7ad596e0e174b8973768d6b"
target_path: /Users/lenne/Documents/Github/psng.info/src/components/astro/events/EventsPage.astro
timestamp: 2026-11-08T23-27-54Z
slug: src-components-astro-events-eventspage-astro
---
Method: dual-agent (A: general-purpose/Opus · B: general-purpose/Sonnet)
Stand: 09.11.2026, Branch `astro` (inzwischen identisch mit `main`), Dev-Server :8080, 1440×900 und 375×812.

## 2. Events-Übersicht (`/events`, `events/EventsPage.astro` + `TimelineRow.astro` + `cards/*`)

**Modus:** Operate/Read (Termin finden, Teilnahme klären, Archiv lesen).

### Design-Specificity-Verdict
Von den vier Flächen ist dies die am stärksten produktspezifische. Ein durchgehender Zeitstrahl läuft von fern über „Heute“ nach rückwärts. Die Karten zeigen volle Abstracts, Bios, Literatur mit DOIs und Teilnehmendenzahlen (online / vor Ort), dazu große Fotos, Videos zum Anklicken und das Aftermovie im Short-Format. So etwas hat kein Template.

Generisch ist die Oberfläche: Karten mit `rounded-xl border bg-card` und Hover-Schatten, Chip-Reihen, graue `text-sm`-Absätze. Die Kooperationsleiste in BPSA-Cyan und -Violett ist die auffälligste Gestaltung der ganzen Seite. Sie spricht aber für die Partnerin, nicht fürs PSNG.

**Verdict:** spezifisch in Struktur und Inhalt, austauschbar in der Haut. Ein Refinement kann hier am meisten heben, ohne irgendetwas neu zu erfinden.


### Deterministischer Scan (Assessment B) und Abgleich

- **Quelldatei-Scan:** 0 Befunde (`EventsPage.astro`, `TimelineRow.astro`, `cards/`).
- **URL-Scan Desktop: 30 Befunde.**
  - `ai-color-palette` ×14: BPSA-Chip `PartnerChip.astro` und `.surface-bpsa` `PartnerStrip.astro:24`
  - `line-length` ×13: 114–127 Zeichen in `HighlightCard.astro:98` und `GatheringCard.astro:55`, Zweitabsätze in `EventCard`, Intro `EventsPage.astro:66` mit ~88 Zeichen
  - `low-contrast` ×2: Rollentext `PartnerStrip.astro:35` mit 4,0:1
  - `hero-eyebrow-chip` ×1: `EventsPage.astro:64`
- **URL-Scan 375 px: 21 Befunde.**
  - `ai-color-palette` ×14
  - `low-contrast` ×6: Rollentext 4,2:1 an 5 Stellen, Link `#c82d63` auf Cyan-Grund mit 4,3:1
  - `kicker-above-heading` ×1
- **Overlay:** 4 Treffer im sichtbaren Bereich.
- **Wo A und B übereinstimmen:**
  - `line-length` belegt As P1, die „graue 14-px-Wand“.
  - `low-contrast` liegt genau im BPSA-Band, das Audit führt es als P1.
- **False Positive:** `ai-color-palette` ist als KI-Palette falsch, die Farbe gehört zur BPSA. Die Trefferzahl 14 misst aber genau, wie oft die Partnerfläche auf der PSNG-Übersicht erscheint, und stützt damit As P1, dass die BPSA die Reihe prägt.
- **Was nur A gefunden hat:** fehlende Orientierung über 19,7 Handy-Bildschirme, drei Kartendialekte, Konferenzen gleichrangig mit Lectures.

### Nielsen-Heuristiken

| # | Heuristik | Score | Key Issue |
|---|---|---|---|
| 1 | Sichtbarkeit des Systemstatus | 3 | Der Filter setzt `aria-current` und `?filter=`, dazu kommen Heute-Marker, „in 3 Wochen“ und Glow für den nächsten Termin. Aber das Label „HEUTE“ sitzt direkt über „04. Nov. 2026“ und liest sich wie „heute = 4. Nov.“ (Stand 9. Nov.). |
| 2 | Sprache der Nutzer:innen | 3 | „Zoom-Link via WhatsApp“ ist klar. Unklar sind „Community“ als Filter für Konferenzen, Treffen und den Blog-Launch sowie „Eigene Seite zum Event“. |
| 3 | Kontrolle & Freiheit | 3 | „Alle“ setzt den Filter zurück. Von der Detailseite geht es zurück an dieselbe Stelle (`#slug`). Videos laden erst auf Klick. |
| 4 | Konsistenz | 2 | Drei Kartentypen mit eigenen Regeln: Radius 2xl/xl, Padding p-6/p-5, Highlight-Badge als Verlauf (EventCard) oder Amber (Detail, GatheringCard), Datum mal im Chip, mal in der Faktenzeile, Pfeile mal als „→“-Glyph, mal als Lucide-Icon. |
| 5 | Fehlervermeidung | 3 | Für Vergangenes steht „Event auf Luma ansehen“ statt Anmeldung, für Status gibt es Chips. Der Zeitwiderspruch 19:00 gegen 18:30 steht schon im Intro. |
| 6 | Wiedererkennen statt Erinnern | 2 | Auf dem Handy fehlt die Datumsspalte. Die kommende Karte nennt ihr Datum erst nach Titel, Speaker, Text und Bio (`EventCard.astro:146`). 13 Einträge ohne Jahres- oder Monatsmarken. |
| 7 | Flexibilität & Effizienz | 2 | Filter-URL zum Teilen und „Zum Kalender hinzufügen“ pro Termin sind da. Der ICS-Feed steht nur im `<head>` (Z. 60), einen sichtbaren „Abonnieren“-Link gibt es nicht, auch keinen Sprung zu Jahr oder Monat. |
| 8 | Ästhetik & Minimalismus | 2 | Graue Textwände in 14 px. Die BPSA-Leiste wiederholt sich auf 7 Karten. Konferenzbesuche bekommen dasselbe Gewicht wie eigene Lectures. |
| 9 | Fehler erkennen & beheben | n/a | keine Eingaben auf der Fläche (Leerzustand „keine anstehenden Termine“ ist vorhanden) |
| 10 | Hilfe & Doku | 2 | Die Teilnahme wird nur im zentrierten Intro-Absatz erklärt. Chips wie „Expertenvortrag“, „Studentisch“ oder „BPSA“ erklärt niemand, der BPSA-Chip führt sogar extern weg. |
| | **Summe** | **22/36 (61 %)** | **Rating: Acceptable** |

### Cognitive Load
Fehlschläge (4 = hoch, davon 1 bewusst in Kauf genommen):
- **Chunking:** Eine Lecture-Karte trägt bis zu 3 Chips, Titel, Untertitel, Speaker, Ort, Sprachhinweis, Beschreibung, Bio, Literatur (2–3 Einträge), Zahlen, 2–5 Links und eine Partnerleiste mit 2 weiteren Links.
- **Visuelle Hierarchie:** Beschreibung, Bio und Literatur haben dieselbe Größe und dasselbe Grau. Die Partnerleiste zieht mehr Blick als der Vortrag.
- **Minimal choices:** Linkreihen in HighlightCard bzw. GatheringCard (Folien, Recap, LinkedIn, Luma, Eigene Seite) plus die 2 Links der Partnerleiste ergeben bis zu 7 Aktionen pro Karte.
- **Progressive Disclosure:** Alles ist voll ausgeklappt, auf dem Handy sind das 19,7 Bildschirme. Das ist Lennerts ausdrücklicher Wunsch. Die Antwort darauf ist deshalb Typografie und Orientierung, nicht Kürzen.

Entscheidungspunkte mit mehr als 4 Optionen: Aktionsreihen einzelner Karten (bis zu 7). Der Filter hat 3 Optionen und ist in Ordnung.

### Emotional Journey
1. **Erwartung:** Die kommende Lecture steht oben, mit Glow.
2. **Heute-Linie**, danach ein **früher Höhepunkt** mit großen Fotos (Majić im Hörsaal, ALPS-Gruppenbild, ICPR-Gruppe). Das ist der stärkste Beleg der ganzen Site.
3. **Ermüdungstal ab etwa Bildschirm 5:** lange graue Absätze, und dieselbe BPSA-Leiste kommt zum vierten und fünften Mal.
4. **Ausklang:** Kickoff, Tryp und ICPR sind kürzer und angenehm.
5. **Ende:** „Du willst selbst eine Lecture geben?“ ist ein gutes Ende. Es lädt ein und dreht die Leserin zur Beitragenden.

### Stärken
1. **Ein Zeitstrahl statt zweier Listen.** Kommendes und Archiv leben in einer Achse, mit Heute-Marker und Relativzeit. Das Archiv belegt die Glaubwürdigkeit direkt unter dem nächsten Termin.
2. **Echte akademische Substanz, voll gezeigt:** Abstracts, Bios, Literatur mit Quellenangaben, Teilnehmende nach online und vor Ort. So wirkt ein Fachnetzwerk.
3. **Medien gut gelöst:** große Fotos und Karussells, YouTube erst auf Klick (Datenschutz und Tempo), und für Events mit Video eine Fotospalte daneben, damit die Bilder nicht verloren gehen.

### Priority Issues

**[P1] Die BPSA prägt die PSNG-Reihe optisch**
- **Why:** Jede Lecture-Karte trägt zwei BPSA-Zeichen. Der kontraststärkste Chip der Reihe ist der Navy-Chip mit Cyan-Violett-Rahmen. Am Kartenfuß folgt eine Leiste im BPSA-Verlauf mit 64–80-px-Logo, „In Kooperation mit der Berlin Psychedelic Science Association“ und zwei Links. Die PSNG-eigenen Chips sind kleiner und blasser. Wer nur scannt, liest: die Lecture-Reihe der BPSA. Das widerspricht direkt Produktprinzip 4 und dem Operating Context („nie als Lecture der BPSA … beschreiben“).
- **Fix:**
  - Auf den Übersichtskarten die `PartnerStrip` (`EventCard.astro:197`, `HighlightCard.astro:163`, `GatheringCard.astro:98`) durch eine neutrale Fußzeile ersetzen: „Gemeinsam mit BPSA · bpsa.psng.info“, Logo höchstens 28 px.
  - Die volle Leiste nur auf der Detailseite zeigen.
  - `PartnerChip.astro` als neutralen Outline-Chip ohne externes Ziel umsetzen; der Link wandert in den Fuß.
  - `.badge-bpsa` und `.surface-bpsa` (`index.css:243–288`) nur noch auf der Detailseite einsetzen.
- **Suggested command:** /impeccable quieter

**[P1] Volle Texte sind als graue 14-px-Wand gesetzt**
- **Why:** Lennert will volle Texte, und das ist richtig so. Dann müssen sie aber zum Lesen gesetzt sein. Beschreibung, Bio und Literatur stehen alle in `text-sm text-muted-foreground` (`EventCard.astro:114–115`, `HighlightCard.astro:98–102`), ohne Zwischenüberschriften. Der Text der Timo-Schmidt-Karte geht auf dem Handy über rund 2,5 Bildschirme. Das liest sich wie ein Datenexport, nicht wie ein kuratiertes Archiv.
- **Fix:**
  - Fließtext auf `text-[15px] md:text-base leading-relaxed text-foreground/80`.
  - Die Bio mit eigenem Label („Zur Person“), das Sprecherfoto daneben statt per `float` rechts im Titel.
  - „Zum Weiterlesen“ als Referenzliste mit hängendem Einzug.
  - Die Textspalte auf `max-w-[68ch]` begrenzen, auch auf der 860-px-Karte.
- **Suggested command:** /impeccable typeset

**[P2] Orientierung über 20 Handy-Bildschirme fehlt**
- **Why:**
  - Es gibt keine Jahres- oder Monatsmarken.
  - Der Heute-Marker klebt am 04.-Nov.-Datum (`EventsPage.astro:97–103`).
  - Die kommende Karte nennt ihr Datum auf dem Handy erst weit unten; HighlightCard und GatheringCard tragen es dagegen im Chip.
  - Wer den Kalender abonnieren will, findet keinen sichtbaren Weg.
- **Fix:**
  - Monats- oder Jahres-Zwischenzeilen in die Schiene setzen (`EventsPage.astro:94–105` bzw. `TimelineRow.astro`).
  - In `EventCard.astro:61` einen `md:hidden`-Datums-Span in die Chipzeile, wie bei `HighlightCard.astro:78`.
  - Den Heute-Marker mit eigenem Abstand und Datum „Heute, 9. Nov.“ setzen.
  - Neben dem Filter einen sichtbaren Link „Kalender abonnieren“ auf `/events.ics`.
- **Suggested command:** /impeccable layout

**[P2] Drei Kartentypen sprechen drei Dialekte**
- **Why:** Gleiches Wissen sieht verschieden aus. Am deutlichsten: Die wichtigste interne Aktion, „Eigene Seite zum Event →“, ist der schwächste Link (`text-muted-foreground`, `EventCard.astro:189`, `HighlightCard.astro:150`). Externe Partnerlinks sind dagegen pink.
- **Fix:**
  - Ein gemeinsamer Kartenkopf (Chips und Datum) als Komponente.
  - Ein einziger Badge-Stil für Highlights.
  - Ein Radius und ein Padding für alle Karten.
  - „Zur Event-Seite →“ als primärer Textlink.
  - Konferenzbesuche (ICPR, Tryp, ALPS) als kompakte Zeile mit einem Foto statt in voller Kartenhöhe.
- **Suggested command:** /impeccable polish

**[P3] Karussellpfeile unter Touch-Mindestgröße**
- **Why:** `h-9 w-9` = 36 px (`PhotoCarousel.astro:36`). Einen Zähler „1 / n“ gibt es nur in der Variante `side`.
- **Fix:** `h-11 w-11`, den Zähler für alle Varianten zeigen.
- **Suggested command:** /impeccable adapt

### Persona Red Flags
- **Jordan:** „Vortrag · Expertenvortrag · BPSA“: Was ist die BPSA? Ein Tipp auf den Chip führt ohne Vorwarnung auf eine fremde Website. Unter „Community“ als Filter stellt sich niemand Konferenzen vor. „Eigene Seite zum Event“: wessen Seite?
- **Riley:**
  - „HEUTE“ steht über dem 04.11.
  - Das vergangene Majić-Event steht noch mit „Raum folgt“ da.
  - Das Intro nennt 19:00 auf Zoom, die nächste Lecture beginnt um 18:30 an einem Ort, der noch folgt.
  - „Expertenvortrag“ verletzt die eigene Regel zur gendergerechten Sprache (`copy.ts:137`).
  - Alle Karten heben sich bei Hover, obwohl die `article`-Karte selbst kein Link ist.
- **Casey:**
  - 19,7 Bildschirme ohne Sprungmarken.
  - Das Datum der kommenden Lecture steht auf dem Handy erst rund 1,5 Bildschirme tief in der Karte.
  - Die Karussellpfeile messen 36 px.
  - Die Partnerleiste ist auf dem Handy fast einen halben Bildschirm hoch, siebenmal.
- **Dr. Hanna:** Volle Bios und Literatur überzeugen fachlich. Die Reihe wirkt aber wie die einer Berliner Hochschulgruppe, bei der das PSNG mitmacht. Fachlich schwerere Lectures (Schmidt, Majić) und Konferenz-Selfies (ICPR) haben dasselbe Kartengewicht.

### Minor Observations
- Der Intro-Absatz ist über 5 bis 7 Zeilen zentriert gesetzt (`EventsPage.astro:66`). Zentrierter Fließtext liest sich schlecht.
- Der Seiten-Eyebrow „EVENTS“ steht über der H1 „Veranstaltungen“, das gleiche Wort doppelt in zwei Sprachen.
- In der Milestone-Karte zum Medien-Blog ist das Bild ein Screenshot mit eigener Überschrift und eigenen Icons. Das ist eine Seite in der Seite.
- Die GatheringCard nutzt `bg-amber-100` für „Erstes Event“ (Z. 77). Das ist eine fünfte Chipfarbe außerhalb der Marke.
- Die Seriennotiz kommt auf der Startseite und hier wortgleich vor.

### Provokante Fragen
- Wenn die vollen Texte bleiben: Wie sähe die Seite aus, wenn sie gesetzt wäre wie ein Vorlesungsverzeichnis oder Jahresbericht statt wie ein Kartenstapel?
- Wessen Reihe ist das, wenn auf jeder Lecture-Karte das größte Logo das der BPSA ist?
- Verdient ein Konferenzbesuch denselben Kartenrang wie eine eigene Lecture mit 61 Teilnehmenden?

---
