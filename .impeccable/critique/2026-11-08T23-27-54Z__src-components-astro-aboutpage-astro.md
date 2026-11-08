---
target: Über uns
total_score: 19
max_score: 28
na_heuristics: 7,9,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/lenne/Documents/Github/psng.info/src/components/astro/AboutPage.astro"
target_fingerprint: "sha256:ebfac3f08fe54dc3f18b57527c59e55accdd477218262927f0ae3572ee0b9bc1"
target_path: /Users/lenne/Documents/Github/psng.info/src/components/astro/AboutPage.astro
timestamp: 2026-11-08T23-27-54Z
slug: src-components-astro-aboutpage-astro
---
Method: dual-agent (A: general-purpose/Opus · B: general-purpose/Sonnet)
Stand: 09.11.2026, Branch `astro` (inzwischen identisch mit `main`), Dev-Server :8080, 1440×900 und 375×812.

## 4. Über uns (`/ueber-uns`, `astro/AboutPage.astro`)

**Modus:** Read/Persuade (verstehen, was das PSNG ist, Team und Partner prüfen).

### Design-Specificity-Verdict
Vollständig nach Schablone:
- „Was ist X?“ links, rosa Vision-Box rechts
- 4 Säulen mit Linie oben (dasselbe Muster wie auf der Startseite, aber mit anderen vier Begriffen)
- zweispaltig „Status quo“ und „Vorbilder“
- Team-Raster mit runden 160-px-Avataren, Rollen-Chips und zentriertem Fließtext
- Platzhalter-Avatar „Teil des Teams werden“
- 10 gleich große, zentrierte Logo-Karten

Spezifisch sind die Inhalte (Affiliationen Charité, Wuppertal, Duisburg-Essen; „Danke, Cam!“; ehrliche Beschreibungen der Partner), nicht die Form. Für eine Seite, auf der Speaker:innen und Hochschulen Seriosität prüfen, ist das zu beliebig.

**Verdict:** austauschbar, der Inhalt rettet es teilweise.


### Deterministischer Scan (Assessment B) und Abgleich

- **Befunde:** In allen Scans 0 (Quelldatei, URL Desktop, URL 375 px, Overlay: „No anti-patterns found“).
- **Was das heißt:** Der Detector erkennt keine strukturelle Gleichförmigkeit (4-Säulen-Raster, runde Avatar-Kacheln, 10 zentrierte Logo-Karten). As Urteil „vollständig nach Schablone gebaut“ ist also ein Befund, den nur das Review liefert. Die Seite ist ein gutes Beispiel dafür, dass ein sauberer Detector-Lauf noch keine spezifische Gestaltung bedeutet.

### Nielsen-Heuristiken

| # | Heuristik | Score | Key Issue |
|---|---|---|---|
| 1 | Sichtbarkeit des Systemstatus | 3 | Die Navigation markiert „Über uns“ aktiv, die Anker `#team` und `#kooperation` funktionieren. |
| 2 | Sprache der Nutzer:innen | 3 | Weitgehend klar. „Vereinsgründung“ als Rollen-Chip wird nicht erklärt (gibt es einen Verein?). „Outreach“ steht englisch da. „Status quo … gehen wir davon aus“ ist eine Vermutung. |
| 3 | Kontrolle & Freiheit | 3 | Statische Seite, keine Fallen. |
| 4 | Konsistenz | 2 | Die 4-Säulen-Reihe trägt hier „Vernetzung / Bildung / Forschung / Ressourcen“, auf der Startseite „Studentisch / Wissenschaftsbasiert / Klare Regeln / Europäisch“: gleiche Form, anderer Inhalt. Laut BPSA-Text sind die Lectures „Ihre Lectures … gelegentlich in Zusammenarbeit mit dem PSNG“, was der Events-Seite und der Produktwahrheit widerspricht. Titel links, Logo und Links zentriert. |
| 5 | Fehlervermeidung | 3 | Kontakt-Links setzen das passende Anliegen vor (`?subject=team`, `?subject=kooperation`). |
| 6 | Wiedererkennen statt Erinnern | 3 | Alles ist sichtbar und beschriftet. |
| 7 | Flexibilität & Effizienz | n/a | Read/Persuade-Fläche |
| 8 | Ästhetik & Minimalismus | 2 | 10 gleichgewichtige Partnerkarten mit rund 25 externen Links. Zentrierter Fließtext in Team- und Partnerkarten. Ein letzter Raster-Platz bleibt einsam (UNePSI). |
| 9 | Fehler erkennen & beheben | n/a | keine Eingaben auf der Fläche |
| 10 | Hilfe & Doku | n/a | Read/Persuade-Fläche |
| | **Summe** | **19/28 (68 %)** | **Rating: Acceptable** |

### Cognitive Load
Fehlschläge (3 = moderat):
- **Chunking:** 10 Partnerkarten ohne Untergruppen, eine „Wall of Options“ mit rund 25 externen Links.
- **Grouping:** Schwesternetzwerke, Konferenzen, Stiftungen und ein Verlag mit Magazin stehen alphabetisch gemischt.
- **Visuelle Hierarchie:** Die Vision-Box konkurriert mit der H1. Säulen, Status quo und Vorbilder haben dasselbe Gewicht. Es gibt keinen Beleg-Moment (Zahlen, Events).

Entscheidungspunkte mit mehr als 4 Optionen: der Partnerbereich (10 Organisationen, rund 25 Links).

### Emotional Journey
1. **Neutraler Start:** viel Text, Vision in Rosa.
2. **Höhepunkt:** das Team mit Gesichtern, Unis und Rollen. Das ist warm und glaubwürdig, „Danke, Cam!“ menschelt schön.
3. **Ermüdung und Wackler** im Partnerbereich: Auf Platz 3 und 4 stehen Lucys Magazin und der Nachtschatten Verlag („Rauschkultur und Drogenpolitik“), die akademischen Schwesternetzwerke erst am Ende.
4. **Schwaches Ende:** ein kleiner grauer Kasten „Du möchtest mit uns kooperieren …“. Kein Mitmach-Moment, kein Code of Conduct.

### Stärken
1. **Echtes Team mit Belegen:** Portraits, Studiengang, Hochschule und konkrete Rollen. Für Hochschulen und Speaker:innen ist das das stärkste Signal der Seite.
2. **Die Partnerbeschreibungen sind spezifisch und ehrlich.** Was die Organisation tut, was sie mit dem PSNG verbindet, welcher Weg zu ihr führt („Artikel einreichen“, „Forschungsmöglichkeiten“).
3. **Die Vision ist klar formuliert** (entstigmatisiert, sicher, wissenschaftlich, ethisch) und passt zum Ton aus PRODUCT.md.

### Priority Issues

**[P1] Reihenfolge und Mischung der Partner kosten Seriosität**
- **Why:** Die Seite sortiert alphabetisch (`AboutPage.astro:27–29`, „damit keine Reihenfolge eine Rangfolge behauptet“). Eine Rangfolge entsteht aber trotzdem, nur eine zufällige. Die Schwesternetzwerke SPSN und UNePSI, Kern der Positionierung, stehen auf Platz 9 und 10. Davor kommen Lucys Magazin und der Nachtschatten Verlag, beschrieben mit „Rauschkultur und Drogenpolitik“. Für Dr. Hanna kippt das Bild genau hier Richtung Szene, gegen Produktprinzip 1.
- **Fix:** In Kategorien gruppieren, jede mit Zwischenüberschrift: „Studierendennetzwerke“ (SPSN, UNePSI, PARAB, BPSA), „Forschung & Konferenzen“ (ALPS, PsychedeliCare), „Stiftungen & Initiativen“ (Psychedelia, Psychedelic Germany), „Medien & Verlage“ (Lucys, Nachtschatten). Dafür ein Feld `category` in `src/content/partners/*`. Innerhalb der Gruppen alphabetisch. Karten linksbündig, das Logo kleiner (h-16 statt h-28).
- **Suggested command:** /impeccable layout

**[P1] Texte widersprechen der Produktwahrheit und spekulieren**
- **Why:** Der BPSA-Text (`src/content/partners/bpsa/partner.yaml:10`) sagt „Ihre Lectures finden gelegentlich in Zusammenarbeit mit dem PSNG statt“. Das stellt die Reihe als BPSA-Reihe dar und widerspricht dem Operating Context ausdrücklich. „Status quo in Deutschland … gehen wir davon aus, dass … ein großes Interesse … besteht“ (`copy.ts:56–58`) vermutet, wo die Seite Belege hätte: 250+ Studierende, 13+ Städte, 14 Events, 61 Teilnehmende bei der letzten Lecture.
- **Fix:** Den BPSA-Text neu fassen. Den Wortlaut legt Lennert fest; Richtung etwa „Berliner Hochschulgruppe; richtet PSNG-Lectures in Berlin mit aus und streamt eigene Vorträge ins Netzwerk“. „Status quo“ wird ein Beleg-Absatz mit den Zahlen aus der Copy, kein neuer Inhalt erfunden.
- **Suggested command:** /impeccable clarify

**[P2] „Über uns“ nach Schablone, Doppelungen mit der Startseite**
- **Why:** Die 4-Säulen-Reihe (Z. 57–66) gibt es hier und auf der Startseite in derselben Form mit anderem Inhalt. Teamfoto und Teamtext sind identisch mit der Startseite. Die Team-Karten verkleinern gute Portraits zu runden 160-px-Avataren und setzen die Bios zentriert (Z. 99–134). Das ist der Look eines Team-Templates.
- **Fix:**
  - Die Säulen hier streichen oder eine Säulenreihe für die Site festlegen.
  - Das Teamfoto groß über das Raster stellen; es ist der Kern dieser Seite.
  - Team-Karten linksbündig mit Portrait im Hochformat (3:4) und Name, Hochschule, Rollen und Bio darunter.
  - Ohne Hover-Schatten (Z. 33), denn die Karten sind nicht klickbar.
- **Suggested command:** /impeccable distill

**[P2] Kein Ende: weder Code of Conduct noch Mitmach-Weg**
- **Why:** Die Seite, auf der Partner, Hochschulen und Speaker:innen Seriosität prüfen, verlinkt den Code of Conduct nicht. Am Ende steht nur ein kleiner grauer Kooperationssatz (Z. 225–231). Im Inhalt fehlt der WhatsApp-Weg.
- **Fix:** Ein Abschluss-Block mit drei klaren Wegen: Community beitreten (primär), Kooperation anfragen, Code of Conduct lesen. Den CoC zusätzlich als Satz unter der Vision verlinken.
- **Suggested command:** /impeccable clarify

**[P3] Falsche Affordanz durch Hover-Schatten**
- **Why:** `card` (Z. 33) setzt `hover:shadow-lg` auf Team- und Partnerkarten, die nicht klickbar sind. Riley klickt ins Leere.
- **Fix:** `transition-shadow hover:shadow-lg` aus `card` entfernen.
- **Suggested command:** /impeccable polish

### Persona Red Flags
- **Jordan:** „Vereinsgründung“: Ist das PSNG ein Verein, oder wird es einer? Nirgends erklärt. Es gibt auf der Seite keinen Hinweis, wie man mitmacht, außer der Leiste.
- **Riley:**
  - Die Säulen versprechen „Journal Clubs“ und „Förderung studentischer Forschungsprojekte“. Nirgends auf der Site gibt es dafür einen Beleg, die Events zeigen keins von beidem.
  - BPSA-Text gegen Events-Seite.
  - Hover auf nicht klickbaren Karten.
  - Die Karte „Teil des Teams werden“ steht als Platzhalter-Avatar mitten im Team.
- **Casey:** 14,3 Bildschirme. Jede Team-Karte ist auf dem Handy fast einen ganzen Bildschirm hoch. Partner (rund 6 Bildschirme) und Team (rund 5) haben keine Sprungmarken.
- **Dr. Hanna:**
  - Affiliationen im Team überzeugen.
  - Die Partnerreihenfolge (Verlag, Magazin vor den Netzwerken) und „Wir sind stolze Kooperationspartner der folgenden Organisationen“ (`copy.ts:322`, Floskel) überzeugen nicht.
  - Kein Code of Conduct.
  - Keine Zahl, kein Verweis auf die Lecture-Reihe.

### Minor Observations
- Die H1 „Was ist das PSNG?“ ist die einzige der vier Seiten ohne Eyebrow. Das ist gut, zeigt aber, dass es ohne geht.
- Der Vision-Text in der Box ist `font-heading` 24 px, sechs Zeilen Space Grotesk als Fließtext. Das ermüdet.
- Partner-Links „Website · Instagram“ in 12 px Pink, zentriert in der Kartenfußzeile: kleine Ziele.
- Der Satz „Mitgegründet mit Cameron Hornung …“ steht grau unter dem Raster. Er ist menschlich und verdient mehr Sichtbarkeit.
- Im Partnerraster bleibt die letzte Zeile einsam (UNePSI allein).

### Provokante Fragen
- Was überzeugt eine Professorin eher: eine Vision in Rosa, oder drei Zahlen und die Logos zweier Schwesternetzwerke ganz oben?
- Warum alphabetisch, wenn die Reihenfolge ohnehin eine Aussage macht?
- Braucht das Team runde Avatare, wenn das Teamfoto die Geschichte schon besser erzählt?

---
