# Kritik-Baseline psng.info

Stand 09.11.2026. Gemessen auf Branch `astro` kurz vor dem Merge. Der Code ist seitdem identisch mit `main` (Astro live). Die Baseline gilt als Ausgangspunkt für das Refinement auf Branch `redesign`.

**Methode:**
- `/impeccable critique` mit zwei isolierten Sub-Agenten. A ist das Design-Review (Opus) mit Screenshots bei 1440×900 und 375×812 im In-App-Browser. B ist der Detector (Sonnet): Quelldatei-Scan, URL-Scans für Desktop und 375 px, Overlay.
- Dazu `/impeccable audit` (Sonnet) mit axe-core 4.10, eigener Kontrastmessung gegen den realen Hintergrund, Touch-Target- und Überlaufmessung bei 375 px und dem Build in `dist/`.

**Quellen:**
- Critique-Snapshots pro Seite: `.impeccable/critique/2026-11-08T23-27-54Z__*.md`
- Audit: `.impeccable/audit/2026-11-09-audit.md`
- Produkt: `PRODUCT.md`
- Ist-System: `DESIGN.md` und `.impeccable/design.json`, North Star „Das Netz der Hörsäle“

**Was nicht lief:** Ab etwa 00:11 lieferte der fremde Dev-Server leere Seiten aus, vermutlich wegen Arbeiten einer anderen Session. Deshalb wurden einige Dinge nur im Code geprüft:
- Tastatur in Karussell, Galerie und mobilem Menü
- Absenden des Formulars und sein Fehlerzustand
- 200 % Text auf Events, Detail und Über uns

Vor dem nächsten `/impeccable audit` den Dev-Server neu starten.

---

## 1. Scores pro Seite

| Seite | Modus | Critique (Nielsen) | Band | Audit | Detector Desktop / 375 px | Länge Handy / Desktop |
|---|---|---|---|---|---|---|
| Startseite `/` | Persuade | **21/32** (66 %), H7/H10 n/a | Acceptable | **13/20** | 10 / 9 | 11,1 / 7,2 Bildschirme |
| Events `/events` | Operate/Read | **22/36** (61 %), H9 n/a | Acceptable | **14/20** | 30 / 21 | 19,7 / 14,9 |
| Event-Detail `/events/lecture-tomislav-majic` | Read | **26/36** (72 %), H9 n/a | Good | **14/20** | 4 / 2 | 4,6 / 2,8 |
| Über uns `/ueber-uns` | Read/Persuade | **19/28** (68 %), H7/H9/H10 n/a | Acceptable | **15/20** | 0 / 0 | 14,3 / 6,4 |

**Audit gesamt 14/20 (Good):**

| Dimension | Score |
|---|---|
| Accessibility | 2 |
| Performance | 3 |
| Theming | 3 |
| Responsive | 3 |
| Implementation Integrity | 3 |

Befunde: P0 0, P1 5, P2 6, P3 7. axe meldet auf allen vier Seiten 0 Verstöße. Die P1-Lücken liegen dort, wo axe nicht messen kann: Verläufe, Text auf Fotos, große Schrift.

**Detector-Regeln über alle vier Seiten (Desktop):**

| Regel | Treffer | Einordnung |
|---|---|---|
| `ai-color-palette` | 16 | False Positive: BPSA-Markenfarbe. Die Zahl misst aber, wie oft die Partnerfläche erscheint. |
| `line-length` | 14 | |
| `kicker-above-heading` | 6 | |
| `low-contrast` | 2 | mobil 6 |
| `hero-eyebrow-chip` | 2 | |
| `overused-font` | 2 | Space Grotesk |
| `gradient-text` | 1 | |
| `first-viewport-column-overflow` | 1 | |

**Gesamtbild:** Die Inhalte sind spezifisch und stark: Fotos, Abstracts, Bios, Zahlen, HeroCard-Logik. Das Gerüst ist austauschbar: ein SaaS-Rhythmus aus Eyebrow, H2, grauem Absatz und Kartenraster, dazu Verlaufstext, Hover-Schatten auf allem und ein Chip-Zoo. Am stärksten trifft das K.-o.-Kriterium „sieht nach KI aus“ die Startseite und „Über uns“. Die Event-Detailseite ist die beste Fläche.

Die frühere Kritik kam auf 22/32. Ihr Ziel ist nicht dokumentiert, die Zahlen sind daher nicht direkt vergleichbar.

---

## 2. Die 10 wichtigsten Refinement-Hebel (priorisiert)

Die Reihenfolge richtet sich nach Wirkung auf das K.-o.-Kriterium, auf Lennerts Vorlieben (große Fotos, volle Texte) und auf die Produktziele (WhatsApp-Beitritt, Glaubwürdigkeit, Gruppengründung). Logo, Datenmodell und die Markenfarben Himbeer und Koralle bleiben. Quellen in Klammern: A = Design-Review, B = Detector, Au = Audit, L = Lennert.

### 1. Die Schablone abbauen: `/impeccable distill`
Das ist die Hauptquelle des KI-Eindrucks (A, B, Au).
- Den Verlaufstext aus der H1 nehmen.
- Höchstens zwei Eyebrows pro Seite, statt 7 auf der Startseite.
- Nur noch eine der beiden Nummerierungen „01/02/03“ und „01–04“.
- Die Kennzahlen in den Hero holen.
- Die dunkle CTA-Box „Noch nicht dabei?“ streichen. Die Startseite hat sonst drei Abschlüsse.
- Hover-Schatten nur noch auf klickbaren Elementen.

Dateien:
- `src/components/astro/home/HomePage.astro:104–163, 345–347, 420–436`
- `src/components/astro/home/styles.ts:12–14` (`eyebrow`)
- `src/index.css:302–307` (`.gradient-text`)
- `src/components/astro/AboutPage.astro:33`
- `src/components/astro/events/TimelineRow.astro:47`
- `src/components/astro/events/cards/EventCard.astro:46`

### 2. Lesetypografie für volle Texte: `/impeccable typeset`
Fließtext ist überall `text-sm text-muted-foreground`: 14 px Grau mit Zeilen bis 127 Zeichen. Das widerspricht dem Wunsch nach vollen Texten am deutlichsten (A, B `line-length` ×14, Au P2).

Neu:
- 15–16 px in `foreground/80`, höchstens 68–70ch (wie heute schon `EventCard.astro:114`)
- Labels „Zur Person“ und „Zum Weiterlesen“, Literatur als Referenzliste
- kein zentrierter Fließtext
- auf der Detailseite der Vortragstitel als H1 und darunter eine Byline mit Foto und Institution

Dabei entscheiden, ob Space Grotesk bleibt (B `overused-font`, 64 % des Texts).

Dateien:
- `src/components/astro/events/cards/EventCard.astro:98–131`
- `src/components/astro/events/cards/HighlightCard.astro:81–119`
- `src/components/astro/events/cards/GatheringCard.astro:55`
- `src/components/astro/events/EventDetail.astro:116–117, 264–271`
- `src/components/astro/events/EventsPage.astro:66`
- `src/components/astro/AboutPage.astro:111–123`
- `src/index.css:72` (`--font-heading`)

### 3. Echte Fotos tragen die Seite: `/impeccable bolder`
Fotos tragen bisher nur auf `/events`. Startseite und „Über uns“ zeigen Thumbnails, Kreise und einen Blob-Verlauf (A).
- Ein echtes Foto aus dem Hörsaal ersetzt `hero-bg.webp`.
- Auf dem Handy behält die HeroCard ihr Bild (heute `hidden sm:block`).
- Der Rückblick wird ein großes Feature ohne `line-clamp` und mit Zahlen.
- Das Teamfoto steht groß, die Portraits hochkant statt in runden 160-px-Kreisen.
- Fotos nur zuschneiden, nicht farblich angleichen (PRODUCT.md).

Dateien:
- `src/components/astro/home/HomePage.astro:105, 262–300`
- `src/components/astro/home/HeroCard.astro:70–82`
- `src/components/astro/AboutPage.astro:57–66, 99–134`

### 4. Die PSNG-Reihe vor der Partnerfarbe: `/impeccable quieter`
Auf allen 7 Lecture-Karten stehen eine BPSA-Leiste mit großem Logo und der stärkste Chip. Die Reihe wirkt dadurch wie die einer Berliner Hochschulgruppe, das widerspricht Produktprinzip 4 (A P1, B: Partnerfläche 14× auf `/events`).

**Entschieden am 09.11.2026: Die Leiste bleibt auf jeder Karte.** Sie wird leiser, nicht entfernt:
- Die Kooperationsleiste bleibt auf den Übersichtskarten, mit weniger Fläche und Sättigung und einem kleineren Logo. Sie soll nicht stärker wirken als die PSNG-eigenen Elemente der Karte.
- Der Chip wird neutral und nicht mehr ungewarnt extern verlinkt.
- Den Bandtext auf mindestens 4,5:1 bringen, heute 4,0:1 (Au P1-3).

Dateien:
- `src/components/astro/events/cards/EventCard.astro:75, 197`
- `src/components/astro/events/cards/HighlightCard.astro:76, 163`
- `src/components/astro/events/cards/GatheringCard.astro:50, 98`
- `src/components/astro/events/PartnerChip.astro`
- `src/components/astro/events/cards/PartnerStrip.astro:24–35`
- `src/index.css:228–288`

### 5. Farbrollen ordnen, Kontrast gegen den echten Hintergrund: `/impeccable colorize`
Heute gibt es mindestens sechs Chip-Farbcodes ohne Bedeutung, Amber außerhalb der Palette und drei fast gleiche Pinktöne. Den Verlauf haben die AA-Stopps ins Ziegelrot gedrückt (A, Au, DESIGN.md-Drift).
- Himbeer als Vollton für die Primäraktion.
- Koralle als Akzent auf Flächen, ohne Text darauf.
- Der Verlauf nur noch an einer Stelle.
- Chips auf drei Rollen.
- Kontraste korrigieren (Au P1): Hero-Fußnote auf dem Bild hat im Median 3,84:1, `text-destructive` 3,76:1.

Dateien:
- `src/index.css:16–51` (`--primary`, `--accent`, `--pink`, Verlaufsstopps), `:30` (`--destructive`), `:213–215`, `:243–300`
- `src/components/astro/home/styles.ts:6–15`
- `src/components/astro/home/HomePage.astro:113, 122`
- `src/components/astro/events/EventDetail.astro:104–115, 133, 141`
- `src/components/astro/events/cards/HighlightCard.astro:77`
- `src/components/ContactSection.tsx:190`

### 6. Ränder, Fakten und Fokus absichern: `/impeccable harden`
Das lässt sich auch vorab auf `main` erledigen, unabhängig vom Redesign. Fakten und Zustände sind heute nicht abgesichert (A, Au):
- „Danach im Kalender“ bleibt leer, weil die HeroCard den einzigen Termin abzieht, und „Termine ansehen“ springt genau dorthin.
- Vergangene Events zeigen „Raum folgt“.
- Seriennotiz und Termin widersprechen sich (19:00 gegen 18:30).
- Der Heute-Marker klebt am 04.11.
- Der Fokusring im Footer ist unsichtbar (1,0:1, Au P1-1).
- Im Formular fehlen `autocomplete` und eine Pflichtmarkierung. Der deaktivierte Knopf erklärt sich nicht, und nach dem Erfolg wird kein Fokus geführt.
- Im mobilen Menü fehlt Escape.

Dateien:
- `src/components/astro/home/HomePage.astro:59–63, 177–260`
- `src/components/astro/home/HeroCard.astro:126–129`
- `src/lib/events/series.ts:22–24`
- `src/i18n/copy.ts:128–133`
- `src/components/astro/events/EventDetail.astro:365–375`
- `src/components/astro/events/EventsPage.astro:97–103`
- `src/components/astro/Footer.astro:37–71`
- `src/index.css:155–158`
- `src/components/ContactSection.tsx:142–212`
- `src/components/SiteNav.tsx:71–80`

### 7. Wegweiser für den Zeitstrahl `/events`: `/impeccable layout`
Die Seite ist 19,7 Handy-Bildschirme lang und hat keine Orientierung. Drei Kartentypen sprechen drei Dialekte, Konferenzbesuche stehen so groß wie Lectures (A P2).
- Jahres- und Monatsmarken.
- Ein gemeinsamer Kartenkopf mit dem Datum vorn, auf dem Handy heute erst unter der Bio.
- Konferenzen kompakt.
- „Zur Event-Seite“ als primärer Link.
- Das Kalender-Abo sichtbar (ICS steht heute nur im `<head>`).
- Volle Texte bleiben. Ziel ist Orientierung, nicht Kürzen.
- Ab 960 px kommt dazu das Inhaltsverzeichnis am linken Rand mit Monaten oder Jahren als Punkten (Hebel 11).

Dateien:
- `src/components/astro/events/EventsPage.astro:60–106`
- `src/components/astro/events/TimelineRow.astro:59–137`
- `src/components/astro/events/cards/EventCard.astro:61, 146, 188–194`
- `src/components/astro/events/cards/HighlightCard.astro:149–155`

### 8. Mobile Reihenfolge und Erreichbarkeit: `/impeccable adapt`
Auf dem Handy rutscht das Wichtige nach unten. Auf der Detailseite kommen Wann, Wo und CTA erst bei y = 2626 von 3759 px (A P1).
- Fakten und CTA bei kommenden Events nach vorn, also `order-first` oder eine Faktenzeile unter der H1.
- Bei 200 % Schrift fällt der Menü-Knopf aus dem Bild (Au P1-5). Lösung: Sprachwahl ins Menü oder Umbruch.
- Ziele mindestens 44 px (Karussell- und Event-Pfeile 36 px, Footer-Links 16 px hoch).

Dateien:
- `src/components/astro/events/EventDetail.astro:83–96, 149, 356`
- `src/components/SiteNav.tsx:48, 111–165`
- `src/components/astro/events/cards/PhotoCarousel.astro:36`
- `src/components/astro/Footer.astro:67`

### 9. „Über uns“ auf Belege umbauen und mit „Orga-Team / Mach mit“ abschließen: `/impeccable layout`, für die neue Sektion vorher `/impeccable shape`
Die Seite ist vollständig nach Schablone gebaut, und die alphabetische Partnerreihenfolge kostet Seriosität: SPSN und UNePSI stehen auf Platz 9 und 10. Außerdem fehlt ein Ende (A P1/P2, Detector sieht hier 0).
- Partner nach Kategorie gruppieren, Netzwerke zuerst, über ein Feld `category` in `partners/*`.
- Zahlen statt der Vermutung im „Status quo“.
- Die 4 Säulen streichen, sie doppeln die Startseite.
- **Neue Sektion „Orga-Team / Mach mit“ mit dem Formular direkt auf der Seite** (Lennerts Zustimmung vom 09.11.2026):
  - Das vorhandene `ContactSection.tsx` wiederverwenden, mit vorausgewähltem Anliegen „Ich möchte Teil des Teams werden“ (Schlüssel `team`).
  - Kein externes Formular.
  - `ContactSection` kann heute nur über `?subject=team` vorwählen (`ContactSection.tsx:34–52`). Es braucht also einen Prop wie `defaultSubject`.
  - Inhalt aus dem geschlossenen PR [psng-info/psng.info#1](https://github.com/psng-info/psng.info/pull/1) (alter Vite-Code, `src/components/lab/JoinTeam.tsx`, Copy `lab.joinTeam`):
    - kleine Probeaufgabe für vier Wochen
    - feste Ansprechperson, remote möglich
    - Bereiche: Lecture-Serie, Social Media & Grafik, Events, Community, Forschungs-Matching, Vereinsgründung
  - **Ort entschieden am 09.11.2026: Ende von `/ueber-uns`.** Die Sektion ersetzt die Recruiting-Karte und gibt der Seite ein Ende mit CoC-Link.

Dateien:
- `src/components/astro/AboutPage.astro:27–29, 46–66, 151–156, 174–231`
- `src/i18n/copy.ts:56–58, 311–316` (`team.recruiting`), `:322`
- `src/components/ContactSection.tsx`
- `src/content/partners/*/partner.yaml`

### 10. Begriffe und Copy vereinheitlichen: `/impeccable clarify`
Die Begriffe driften. Lecture, Vortrag, Event, Termin und Call stehen nebeneinander, ebenso Hochschulgruppe, Lokalgruppe und Gruppe. Dazu kommen „Eigene Seite zum Event“, das nicht gegenderte „Expertenvortrag“ und die Floskel „stolze Kooperationspartner“ (A).
- Ein kurzes Glossar in `copy.ts`.
- „Gastvortrag“, „Zur Event-Seite“, „Weitere Termine“ statt „Danach im Kalender“.
- Die Pfeile auf der Detailseite beschriften. ← führt heute zum *neueren* Event.

Dateien:
- `src/i18n/copy.ts:45, 108, 137, 322, 422, 455, 493`
- `src/components/astro/events/EventDetail.astro:80–96, 489–508`

### Zusätzlich freigegeben

#### 11. Inhaltsverzeichnis am linken Rand nach LessWrong-Vorbild wieder einführen: `/impeccable layout`
Am 09.11.2026 von Lennert freigegeben. Das Inhaltsverzeichnis ist beim Astro-Umzug weggefallen. Es passt zu Hebel 7 und 8: Lange Seiten (Events 19,7, Über uns 14,3 Handy-Bildschirme) brauchen Orientierung, ohne dass Text gekürzt wird.

**Referenz:** Commit `a594f84` (29.10.2026, alter Vite-Code: `src/components/SectionToc.tsx`, `src/lib/toc.ts` mit Test, `src/lib/useActiveSection.ts`, CSS in `src/index.css`):
- ein schmaler Streifen mit Linie
- ein Punkt je Abschnitt, Abstand maßstäblich zur Abschnittslänge
- ein Balken zeigt den sichtbaren Ausschnitt
- die Namen erscheinen beim Hovern
- Platz ab 960 px reserviert, der Inhalt bleibt annähernd mittig

**Ziele in dieser Reihenfolge:**
1. `/leitfaden` (`src/pages/leitfaden.astro:32–43`, dort gibt es schon eine TOC-Liste mit Abschnittsankern; englisch `src/pages/en/guide.astro:41ff.`)
2. die `/events`-Scrollseite, mit Monaten oder Jahren des Zeitstrahls als Punkten (`src/components/astro/events/EventsPage.astro`, `TimelineRow.astro`)
3. lange Event-Detailseiten (`src/components/astro/events/EventDetail.astro`)

**Nicht auf der Startseite.**

**Umsetzung:** als Astro-Komponente mit kleinem Vanilla-Script wie die übrigen `src/scripts/*`, nicht als React-Insel. So kommt kein JS dazu (siehe Au P2-10). Das Label `nav.tocLabel` („Inhalt der Seite“) steht noch in `src/i18n/copy.ts`. Auf Tastatur und Screenreader achten (`nav` mit Label, echte Links). Unter 960 px gibt es keinen Streifen.

**Danach:** `/impeccable polish` als letzter Schritt:
- `bg-white` → `bg-card`
- tote Tokens `--sidebar-*`, `--rose`, `--salmon`, `.gradient-soft`, `float`
- Amber als Token
- zwei Button-Systeme zusammenführen: `styles.ts:6–10` gegen `ui/button.tsx`, dazu fünf inline nachgebaute Knöpfe (siehe DESIGN.md, „Im Bestand, nicht kanonisch“)

Optional `/impeccable optimize`: Die Navigation ohne React ausliefern spart etwa 61 KB gz pro Seite (Au P2-10).

**Empfohlene Reihenfolge auf `redesign`:**
1. distill (1) und typeset (2), weil sie den KI-Eindruck am stärksten senken.
2. bolder (3) und quieter (4).
3. colorize (5).
4. layout (7, 9) und adapt (8).
5. clarify (10).
6. polish.

harden (6) kann vorher als kleiner PR auf `main`. Das Inhaltsverzeichnis (11) kommt auf `/leitfaden` unabhängig davon, auf `/events` zusammen mit layout (7).

---

## 3. Offene Fragen an Lennert

### Am 09.11.2026 entschieden
- **Start:** Das Refinement beginnt mit Hebel 1 und 2 (distill und typeset).
- **Schrift:** Überschriften in Schibsted Grotesk statt Space Grotesk (Lennerts Wahl aus vier Kandidaten im Hero), Fließtext bleibt DM Sans.
- **Barrierefreiheit:** Ziel ist WCAG 2.2 AA.
- **BPSA auf der Übersicht:** Die Kooperationsleiste bleibt auf jeder Karte, leiser und mit besserem Kontrast (siehe Hebel 4).
- **„Mach mit“-Sektion:** Sie kommt ans Ende von `/ueber-uns` (siehe Hebel 9).

- **Schrift:** Schibsted Grotesk ist abgenommen.
- **Hero-Foto:** Das ALPS-Jubelfoto (`src/assets/alps-conference/alps-01.webp`) als großes Band direkt unter Hero-Text und Termin-Karte. Nur Ausschnitt, keine Bearbeitung. Als Vollbild-Hintergrund würde die Karte die Gesichter verdecken, außerdem ist die Datei nur 1200 px breit.
- **Lecture-Zeile auf /events und Startseite:** Nur noch „einmal im Monat“, ohne Uhrzeit und Zoom. Seit 09.11.2026 auch auf `main` live.
- **„13+ Städte“ bleibt.** Gemeint ist die Zahl der WhatsApp-Gruppen.
- **Polinas Rolle „Lecture-Reihe“** ist gewollt.
- **Konferenzbesuche** bleiben vorerst so groß wie bisher, vielleicht in ein paar Monaten kompakter (betrifft Hebel 7).
- **„Mach mit“:** Die Texte aus PR #1 werden übernommen (`git show 2409995 -- src/components/lab/JoinTeam.tsx src/i18n/copy.ts`).
- **Seitenleiste (Hebel 11):** ja, auf `/leitfaden` und `/events`.
- **Deutschlandkarte:** später.

### Noch offen
1. **BPSA-Partnertext:** Passt „Ihre Lectures finden gelegentlich in Zusammenarbeit mit dem PSNG statt“ (`src/content/partners/bpsa/partner.yaml`) zu deiner Präzisierung, dass Lectures PSNG-Lectures sind und Lokalgruppen zusätzlich streamen können?
2. **„Erstes bundesweites“** im Hero ist unbeantwortet. Nicht ändern, bis Lennert entscheidet.
