---
target: Über uns
total_score: 20
max_score: 28
na_heuristics: 7,9,10
p0_count: 0
p1_count: 1
target_identity: "file:/Users/lenne/Documents/Github/psng.info/src/components/astro/AboutPage.astro"
target_fingerprint: "sha256:c1db27761592653bcf357932bcc1f21e139df1d7480dc24575d328ab46e829d6"
target_path: /Users/lenne/Documents/Github/psng.info/src/components/astro/AboutPage.astro
timestamp: 2026-11-09-final
slug: src-components-astro-aboutpage-astro
baseline: 2026-11-08T23-27-54Z (19/28)
---
Method: design review only (Assessment A, Opus, Sub-Agent). Kein Detector, kein Audit, auf Wunsch des Auftraggebers.
Stand: 09.11.2026, Branch `redesign` (Commit 1f24efd), Dev-Server :8080, Headless Chrome 1440×900 und 375×844 (Ganzseite). Aufnahmen: `.impeccable/review/final/about-1440.png`, `about-375.png`.

## 4. Über uns (`/ueber-uns`, `astro/AboutPage.astro`)

**Modus:** Read/Persuade (verstehen, was das PSNG ist, Team und Partner prüfen).
**Länge:** 8,4 Bildschirme Desktop (vorher 6,4), 17,0 Handy (vorher 14,3).

### Design-Specificity-Verdict
Spürbar weniger Schablone:
- Die Vier-Säulen-Reihe ist weg; stattdessen ein Beleg-Block mit 250+ / 13+ / 9 Events / 10 Partnerorganisationen.
- Das Teamfoto steht groß, die Team-Karten zeigen Hochformat-Portraits (3:4), linksbündig, ohne Hover-Schatten.
- Partner sind gruppiert: Netzwerke, Hochschulgruppen, Stiftungen, Community und Medien. Lucys und Nachtschatten stehen jetzt am Ende.
- Neues Ende „Mach das PSNG mit.“ mit konkretem Angebot (vier Wochen, Ansprechperson, remote), Rollen als Chips, CoC-Link und vorbelegtem Formular.

Generisch bleiben die rosa Vision-Box neben der H1, die zentrierten Logo-Karten mit zentrierten Linkzeilen und das Zweispalter „Status quo / Vorbilder“.

**Verdict:** vom Team-Template zur glaubwürdigen Organisationsseite; die Form ist ordentlich, aber noch nicht eigen.

### Nielsen-Heuristiken

| # | Heuristik | Score | Key Issue |
|---|---|---|---|
| 1 | Sichtbarkeit des Systemstatus | 3 | Navigation markiert „Über uns“, Anker funktionieren, Formular mit Anliegen vorbelegt. |
| 2 | Sprache der Nutzer:innen | 3 | Klar. „Vereinsgründung“ (Rollen-Chip, dreimal) bleibt unerklärt; „Outreach“ englisch; „Status quo … gehen wir davon aus“ vermutet weiterhin, obwohl die Belege direkt darunter stehen. |
| 3 | Kontrolle & Freiheit | 3 | Statische Seite, keine Fallen. |
| 4 | Konsistenz | 2 | Der BPSA-Text widerspricht weiter der Produktwahrheit („Ihre Lectures finden gelegentlich in Zusammenarbeit mit dem PSNG statt“, `partners/bpsa/partner.yaml:11`), während die Events-Seite jede Lecture „gemeinsame Lecture von PSNG und BPSA“ nennt. Partner-Karten: Titel links, Logo und Links zentriert. |
| 5 | Fehlervermeidung | 3 | Formular vorbelegt mit „Ich möchte Teil des Teams werden“, Pflichtfelder angesagt. |
| 6 | Wiedererkennen statt Erinnern | 3 | Alles sichtbar und beschriftet; Zwischenüberschriften der Partnergruppen helfen. |
| 7 | Flexibilität & Effizienz | n/a | Read/Persuade-Fläche |
| 8 | Ästhetik & Minimalismus | 3 | Gruppiert, Belege, Portraits. Rest: Team-Sektion mit rund 800 px leerer linker Spalte neben dem Teamfoto (Desktop), einsame letzte Rasterplätze (Team 2 von 3, Hochschulgruppen und Stiftungen je 2 von 3), auf dem Handy jede Team-Karte über einen Bildschirm hoch. |
| 9 | Fehler erkennen & beheben | n/a | Formular vorhanden, Fehlerzustand hier nicht geprüft (wie Baseline n/a) |
| 10 | Hilfe & Doku | n/a | Read/Persuade-Fläche |
| | **Summe** | **20/28 (71 %)** | **Rating: Good** (knapp; Baseline 19/28, 68 %, Acceptable) |

### Cognitive Load
Fehlschläge (2 = moderat):
- **Chunking:** gelöst durch Partnergruppen.
- **Visuelle Hierarchie:** Die Vision-Box in 24-px-Überschriftenschrift konkurriert mit H1 und Einleitung. Die Belegzahlen stehen klein unter „Status quo“ statt oben.
- **Länge Handy:** 17 Bildschirme ohne Sprungmarken; Team (rund 6) und Partner (rund 7) laufen ohne Abkürzung.

Entscheidungspunkte mit mehr als 4 Optionen: der Partnerbereich (10 Organisationen, rund 22 externe Links), jetzt gegliedert.

### Emotional Journey
1. **Start:** Text und Vision in Rosa, dann erstmals Belege (Zahlen).
2. **Höhepunkt:** großes Teamfoto und echte Portraits mit Hochschule und Rolle. Warm und glaubwürdig.
3. **Partner:** gegliedert, Netzwerke zuerst; kein Wackler mehr am Anfang.
4. **Ende mit Moment:** „Mach das PSNG mit.“ mit konkretem, niedrigschwelligem Angebot. Peak-End stimmt jetzt.

### Stärken
1. **Team als Beleg:** großes Teamfoto, Portraits im Hochformat, Hochschule, Rollen, LinkedIn.
2. **Partner gegliedert**, Schwesternetzwerke zuerst; Szene-nahe Medien am Ende.
3. **„Mach das PSNG mit.“** ist ein echtes Ende mit konkretem Angebot und CoC-Hinweis.

### Priority Issues

**[P1] BPSA-Text widerspricht der Produktwahrheit (offen seit Baseline)**
- **Why:** „Ihre Lectures finden gelegentlich in Zusammenarbeit mit dem PSNG statt“ stellt die Reihe als BPSA-Reihe dar. Die Events-Seite sagt das Gegenteil. Für Partner und Hochschulen ist das genau die Stelle, an der sie Seriosität prüfen. (Laut BASELINE §3 von Lennert bewusst vertagt.)
- **Fix:** Text neu fassen, Wortlaut durch Lennert; Richtung „Berliner Hochschulgruppe; richtet PSNG-Lectures in Berlin mit aus“.
- **Suggested command:** /impeccable clarify

**[P2] Team-Sektion: leere Spalte und überlange Handy-Karten**
- **Why:** Auf dem Desktop steht links ein Dreizeiler, rechts ein rund 900 px hohes Teamfoto; links bleibt die Fläche leer. Auf dem Handy ist jede Karte (Portrait in voller Breite plus Bio) länger als ein Bildschirm, fünfmal.
- **Fix:** Teamfoto in voller Breite (16:9 oder 3:2) über dem Raster, Text darüber. Auf dem Handy Portraits als 2-Spalten-Raster mit Name/Rolle, Bio darunter kürzer gesetzt, oder Portrait 1:1 links neben Name und Rolle.
- **Suggested command:** /impeccable layout

**[P2] „Status quo“ vermutet, wo die Seite Belege hat**
- **Why:** Der Absatz „gehen wir davon aus, dass … ein großes Interesse … besteht“ steht direkt über „250+ Studierende, 13+ Städte“. Die Zahlen widerlegen die Vorsicht des Texts.
- **Fix:** Absatz als Feststellung mit den Zahlen formulieren (Inhalt nicht erfinden, nur umstellen); Zahlen nach oben, direkt unter die Einleitung.
- **Suggested command:** /impeccable clarify

**[P3] Zentrierte Partnerkarten und „Vereinsgründung“ ohne Erklärung**
- **Why:** Logo und Links zentriert, Titel und Text links. „Vereinsgründung“ erscheint als Rolle bei drei Personen und als Mitmach-Chip, ohne dass gesagt wird, ob das PSNG ein Verein wird.
- **Fix:** Karten durchgehend linksbündig, Logo kleiner; ein Satz unter der Einleitung („Wir gründen gerade einen Verein …“), falls zutreffend.
- **Suggested command:** /impeccable polish

### Persona Red Flags
- **Jordan:** „Vereinsgründung“: Wird das PSNG ein Verein? Der WhatsApp-Weg steht im Inhalt nicht, nur in Leiste und Footer.
- **Riley:** BPSA-Text gegen Events-Seite; „gehen wir davon aus“ direkt über harten Zahlen; einsame letzte Rasterplätze.
- **Casey:** 17 Bildschirme ohne Sprungmarken; jede Team-Karte länger als ein Bildschirm.
- **Dr. Hanna:** Teamfoto, Affiliationen, Zahlen und gegliederte Partner überzeugen. Der CoC ist jetzt verlinkt. Der BPSA-Text bleibt der Stolperstein.

### Minor Observations
- „Mitgegründet mit Cameron Hornung … Danke, Cam!“ steht weiterhin klein und grau unter dem Raster.
- Die Vision-Box setzt sechs Zeilen Überschriftenschrift als Fließtext.
- Der Kooperationssatz „Du möchtest mit uns kooperieren …“ steht als eigene Box zwischen Partnern und „Mach mit“; er könnte ins Mach-mit-Ende wandern.

### Provokante Fragen
- Was überzeugt eine Professorin schneller: die rosa Vision-Box oder die vier Zahlen ganz oben?
- Braucht das Team fünf Bildschirme auf dem Handy, wenn das Gruppenfoto die Geschichte schon erzählt?
