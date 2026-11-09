---
target: Events-Übersicht
total_score: 27
max_score: 36
na_heuristics: 9
p0_count: 0
p1_count: 0
target_identity: "file:/Users/lenne/Documents/Github/psng.info/src/components/astro/events/EventsPage.astro"
target_fingerprint: "sha256:40ba5e0a1b770113b622c68278e4cdcf815221ba6ef3ac95762a2fbfb1f1a3bd"
target_path: /Users/lenne/Documents/Github/psng.info/src/components/astro/events/EventsPage.astro
timestamp: 2026-11-09-final
slug: src-components-astro-events-eventspage-astro
baseline: 2026-11-08T23-27-54Z (22/36)
---
Method: design review only (Assessment A, Opus, Sub-Agent). Kein Detector, kein Audit, auf Wunsch des Auftraggebers.
Stand: 09.11.2026, Branch `redesign` (Commit 1f24efd), Dev-Server :8080, Headless Chrome 1440×900 und 375×844 (Ganzseite). Aufnahmen: `.impeccable/review/final/events-1440.png`, `events-375-{1,2,3}.png`.

## 2. Events-Übersicht (`/events`, `events/EventsPage.astro` + `TimelineRow.astro` + `cards/*` + `SectionToc.astro`)

**Modus:** Operate/Read (Termin finden, Teilnahme klären, Archiv lesen).
**Länge:** 16,4 Bildschirme Desktop (vorher 14,9), 22,4 Handy (vorher 19,7). Länger durch größere Lesetypografie; gewollt (volle Texte).

### Design-Specificity-Verdict
Die Struktur war schon die spezifischste der Site; jetzt passt die Haut besser dazu:
- Jahres- und Monatsmarken in der Schiene, „HEUTE · 9. Nov.“ als eigener Marker, Datum oben in jeder Karte (auf dem Handy zuerst).
- Ein Inhaltsverzeichnis am linken Fensterrand (≥ 960 px), dessen Abstände die zeitliche Dichte abbilden, mit aktivem Abschnitt in Himbeer. Das ist eine eigene, ruhige Idee.
- Fließtext in 16 px, dunkler, mit Labels „Zur Person“ und „Zum Weiterlesen“ und nummerierter Literatur.
- Sichtbarer Link „Alle Termine abonnieren“ mit Erklärung.

Generisch bleiben die Kartenhülle (`rounded-xl border`) und die Chipreihe. Die BPSA-Leiste ist leiser (helle Fläche, kleineres Logo), steht aber weiter am Fuß jeder Lecture-Karte.

**Verdict:** spezifisch in Struktur und Inhalt, jetzt auch lesbar gesetzt. Am weitesten vom Template entfernt von allen vier Flächen.

### Nielsen-Heuristiken

| # | Heuristik | Score | Key Issue |
|---|---|---|---|
| 1 | Sichtbarkeit des Systemstatus | 4 | Heute-Marker mit eigenem Datum, Relativzeit („in 3 Wochen“), Filterzustand, aktiver Abschnitt im Seiten-TOC, Glow für den nächsten Termin. |
| 2 | Sprache der Nutzer:innen | 3 | Klar und deutsch. „Community“ als Filter für Konferenzen, Expo und Medien-Blog bleibt unscharf. Intro nennt „WhatsApp und Instagram“ für Links, sonst überall nur WhatsApp. Chips „Vortrag“ + „Gastvortrag“ doppeln sich. |
| 3 | Kontrolle & Freiheit | 3 | „Alle“ setzt zurück, Rücksprung von der Detailseite an dieselbe Stelle, Videos erst auf Klick, TOC springt. |
| 4 | Konsistenz | 3 | Ein Kartenkopf (Datum, Chips, Titel), ein Primärlink „Zur Event-Seite →“, ein Knopfstil. Rest: Medien-Blog-Karte ist ein Screenshot mit eigener Typografie und Emoji-Icons, Chip „✨ Unser erstes Event“, „Lokalgruppe“ im Kick-off-Text. |
| 5 | Fehlervermeidung | 3 | Status-Chips, „Ort folgt“ statt falscher Angaben, Kalenderhilfe für Google erklärt. |
| 6 | Wiedererkennen statt Erinnern | 3 | Datum jetzt oben in jeder Karte, Monatsmarken. Auf dem Handy kein TOC (erst ≥ 960 px), über 22 Bildschirme nur die Schienenmarken. |
| 7 | Flexibilität & Effizienz | 3 | Sichtbares Abo (`/events.ics`), Filter-URL, Kalender pro Termin, TOC als Sprungleiste auf Desktop. Auf dem Handy kein Sprung zu Monat oder Jahr. |
| 8 | Ästhetik & Minimalismus | 2 | Die Textwände sind jetzt gut gesetzt. Aber: BPSA-Leiste weiterhin auf jeder Lecture-Karte (auf dem Handy je rund 1/5 Bildschirm), Konferenzbesuche (ALPS, TRYP, ICPR) mit voller Kartenhöhe wie eigene Lectures, Kick-off mit grauem Platzhalter-Thumbnail, Medien-Blog als Seite in der Seite. |
| 9 | Fehler erkennen & beheben | n/a | keine Eingaben auf der Fläche |
| 10 | Hilfe & Doku | 3 | Teilnahme im linksbündigen Intro erklärt, Abo mit Anleitung, „Zoom-Link via WhatsApp“ am Ort der Aktion. Chips wie „BPSA“ bleiben unerklärt. |
| | **Summe** | **27/36 (75 %)** | **Rating: Good** (Baseline 22/36, 61 %, Acceptable) |

### Cognitive Load
Fehlschläge (2 = moderat, 1 davon bewusst):
- **Visuelle Hierarchie:** Die BPSA-Leiste ist der einzige Block mit eigener Fläche in jeder Lecture-Karte und zieht weiterhin Blick vom Vortrag ab, wenn auch weniger.
- **Progressive Disclosure:** alles voll ausgeklappt (Lennerts Wunsch). Die Antwort darauf, Typografie und Wegweiser, ist jetzt da; auf dem Handy fehlt der Wegweiser noch.

Entscheidungspunkte mit mehr als 4 Optionen: keine mehr kritisch; Aktionsreihen pro Karte jetzt meist 2–4.

### Emotional Journey
1. **Erwartung:** nächste Lecture oben mit Glow und klarer Aktion.
2. **Heute-Linie**, dann ein **früher Höhepunkt**: Majić im Hörsaal, dann Schmidt, ALPS-Gruppenfoto.
3. **Kein echtes Ermüdungstal mehr** auf dem Desktop: Monatsmarken und TOC geben Takt, Labels gliedern die Texte. Auf dem Handy setzt um Bildschirm 8–10 weiterhin Ermüdung ein (lange Bios, wiederkehrende Partnerleiste).
4. **Ende:** „Du willst selbst eine Lecture geben?“ mit zwei Wegen. Gut.

### Stärken
1. **Wegweiser im Zeitstrahl:** Jahres-/Monatsmarken, eigener Heute-Marker, Datum oben in jeder Karte, proportionales TOC am Rand. Die größte Einzelverbesserung der Site.
2. **Lesetypografie für volle Texte:** 16 px, dunkler, Labels, nummerierte Literatur. Liest sich jetzt wie ein Vorlesungsarchiv statt wie ein Datenexport.
3. **Abo sichtbar und erklärt** („Der Kalender aktualisiert sich selbst …“).

### Priority Issues

**[P2] BPSA-Leiste weiterhin auf jeder Lecture-Karte**
- **Why:** Leiser als vorher, aber noch immer der einzige farbige Flächenblock jeder Lecture-Karte, mit Logo, Satz und zwei externen Links, sieben- bis achtmal. Auf dem Handy jedes Mal rund 170 px. Wer scannt, sieht weiter die BPSA als Konstante der Reihe.
- **Fix:** Auf der Übersicht eine einzeilige Fußzeile ohne Fläche („Gemeinsam mit BPSA · bpsa.psng.info“, Logo ≤ 24 px); die volle Leiste nur auf der Detailseite. Den Chip „BPSA“ dann weglassen, er doppelt die Fußzeile.
- **Suggested command:** /impeccable quieter

**[P2] Konferenzbesuche und Meilensteine haben Lecture-Gewicht**
- **Why:** ALPS, TRYP und ICPR stehen mit voller Bildhöhe und langen Texten gleichrangig neben eigenen Lectures; der Medien-Blog ist ein Screenshot einer anderen Seite mit Emoji-Icons; der Kick-off zeigt ein graues Platzhalter-Thumbnail. Das verwässert den Eindruck einer kuratierten Reihe.
- **Fix:** Typ „Community“ als kompakte Zeile (kleines Foto links, Titel, Ort, ein Satz, Link); Medien-Blog-Karte ohne Screenshot oder mit echtem Bild; Kick-off-Thumbnail durch ein Foto oder die erste Folie ersetzen.
- **Suggested command:** /impeccable layout

**[P2] Handy ohne Sprungmarken über 22 Bildschirme**
- **Why:** Das TOC erscheint erst ab 960 px. Auf dem Handy bleiben nur die Monatsmarken in der Schiene; wer zu „Juni“ will, scrollt.
- **Fix:** Unter dem Filter eine horizontale, scrollbare Monatsleiste (`2026 · Dez · Nov · Heute · Okt …`) als `md:hidden`, dieselben Anker wie das TOC.
- **Suggested command:** /impeccable adapt

**[P3] Begriffsreste**
- **Why:** Filter „Community“ für Konferenzen; „Vortrag“ + „Gastvortrag“ als zwei Chips; „Lokalgruppe“ im Kick-off-Text; Intro nennt Instagram als Link-Quelle.
- **Fix:** Filter „Treffen & Konferenzen“; nur ein Typ-Chip; Begriff „Hochschulgruppe“; Intro nur WhatsApp.
- **Suggested command:** /impeccable clarify

### Persona Red Flags
- **Jordan:** „BPSA“ als Chip und als Leiste, ohne Erklärung, was das ist; „Community“ als Filter für eine Expo.
- **Riley:** „Vortrag · Gastvortrag“ doppelt; ✨-Emoji im Chip; Kick-off-Video mit grauem Platzhalter; Intro sagt Instagram, Karten sagen WhatsApp.
- **Casey:** 22,4 Bildschirme ohne Sprungleiste; die Partnerleiste kommt auf dem Handy etwa siebenmal mit je rund 170 px. Positiv: Datum steht jetzt ganz oben in jeder Karte.
- **Dr. Hanna:** Bios, Literatur und Zahlen wirken jetzt fachlich gesetzt. Die Reihe liest sich aber immer noch stark als Kooperation mit einer Berliner Gruppe.

### Minor Observations
- Das TOC steht bei 1440 px rund 180 px links vom Inhalt; es wirkt etwas abgelöst, stört aber nicht.
- Die kommende Karte zeigt „Thema folgt“ und „Weitere Details folgen bald.“ direkt untereinander, zweimal dieselbe Aussage.
- Karussellpfeile sind jetzt groß genug; Zähler „1 / 11“ sichtbar.

### Provokante Fragen
- Wenn die Übersicht die BPSA einmal oben im Intro erklärt, braucht dann jede Karte noch ihre Leiste?
- Was sieht Casey, wenn sie nach dem Juni-Vortrag sucht?
