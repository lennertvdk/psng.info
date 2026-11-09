---
target: Event-Detail (Majić-Lecture)
total_score: 28
max_score: 36
na_heuristics: 9
p0_count: 0
p1_count: 0
target_identity: "file:/Users/lenne/Documents/Github/psng.info/src/components/astro/events/EventDetail.astro"
target_fingerprint: "sha256:1e7b6bb551d7e28a29c504931c6994683ae3677db00d229243e64fb41a3d9c6d"
target_path: /Users/lenne/Documents/Github/psng.info/src/components/astro/events/EventDetail.astro
timestamp: 2026-11-09-final
slug: src-components-astro-events-eventdetail-astro
baseline: 2026-11-08T23-27-54Z (26/36)
---
Method: design review only (Assessment A, Opus, Sub-Agent). Kein Detector, kein Audit, auf Wunsch des Auftraggebers.
Stand: 09.11.2026, Branch `redesign` (Commit 1f24efd), Dev-Server :8080, Headless Chrome 1440×900 und 375×844 (Ganzseite). Aufnahmen: `.impeccable/review/final/detail-1440.png`, `detail-375.png`; zur Gegenprobe der Handy-Reihenfolge `detail-upcoming-375.png` (`/events/lecture-jelena-brasanac`).

## 3. Event-Detail (`/events/lecture-tomislav-majic`, `events/EventDetail.astro` über `EventPage.astro`)

**Modus:** Read (Rückblick lesen, teilen; bei kommenden Events: Fakten und Teilnahme).
**Länge:** 2,9 Bildschirme Desktop, 4,6 Handy (unverändert).

### Design-Specificity-Verdict
Der Kopf ist jetzt ein Fachvortrag: H1 „Why Psychedelic Harm Reduction?“, darunter eine Byline mit rundem Sprecherfoto und Name. „Abstract (Englisch)“, „Zur Person“, „In Kooperation mit“, „Zum Weiterlesen“ gliedern ruhig. Die Seite ist weiter ein klassischer Artikel mit Fakten-Seitenleiste, also im Aufbau austauschbar mit einer guten Uni-Veranstaltungsseite. Ein fotogetriebener Kopf oder ein Bezug zur Reihe („PSNG-Lecture Nr. X“) fehlt weiterhin.

**Verdict:** seriös, aufgeräumt, angemessen; noch ohne eigene Note.

### Nielsen-Heuristiken

| # | Heuristik | Score | Key Issue |
|---|---|---|---|
| 1 | Sichtbarkeit des Systemstatus | 4 | „Raum folgt“ ist weg („Zoom und vor Ort an der HU Berlin“). „Nur live … keine Aufzeichnung“ bleibt vorbildlich. Status-Banner vorhanden. |
| 2 | Sprache der Nutzer:innen | 3 | Abstract als Englisch gekennzeichnet, „Zur Person“ statt „Speaker“, „Neuer/Älter“. Rest: Chips „Vortrag · Gastvortrag · BPSA“ doppeln und kürzen ab. Bei kommenden Events ohne Thema lautet die H1 weiter „Lecture mit …“. |
| 3 | Kontrolle & Freiheit | 3 | „Alle Events“ zurück an dieselbe Stelle, Galerie mit Esc. |
| 4 | Konsistenz | 3 | Kopf-Navigation beschriftet („‹ Neuer“, „Älter ›“), passt zur Fußleiste. Zahlen: Startseite zeigt 61/46/15, hier nur 61/46 („vor Ort“ fehlt). |
| 5 | Fehlervermeidung | 3 | Zustände abgedeckt, Kalender-Export. |
| 6 | Wiedererkennen statt Erinnern | 3 | Kommende Events: auf dem Handy stehen Wann/Wo und „Zoom-Link via WhatsApp“ jetzt direkt unter dem Kopf (Brasanac geprüft). Vergangene: Datum und Ort erst nach Fotos, Abstract, Person und Literatur (y ≈ 2600). |
| 7 | Flexibilität & Effizienz | 3 | Kalender, Neuer/Älter mit Datum, Galerie per Tastatur. |
| 8 | Ästhetik & Minimalismus | 3 | Ruhig und fokussiert. Das Fotoraster mit zwei Bildern lässt weiter eine leere Fläche unter Foto 2 (Desktop) bzw. ein halbbreites Einzelbild (Handy). |
| 9 | Fehler erkennen & beheben | n/a | keine Eingaben auf der Fläche |
| 10 | Hilfe & Doku | 3 | Teilnahmeweg am Ort der Aktion. |
| | **Summe** | **28/36 (78 %)** | **Rating: Good** (Baseline 26/36, 72 %, Good) |

### Cognitive Load
Fehlschläge (1 = niedrig):
- **Visuelle Hierarchie (Handy, vergangene Events):** Datum und Ort stehen am Ende. Für einen Rückblick nicht kritisch, beim Teilen per WhatsApp aber fehlt das „Wann war das?“ oben.

Entscheidungspunkte mit mehr als 4 Optionen: keine.

### Emotional Journey
1. Thema als H1 mit Sprecherfoto: sofort klar, worum es geht und wer spricht.
2. **Höhepunkt** Hörsaalfoto.
3. Abstract, Person, Kooperation, Literatur: Vertrauen.
4. **Ruhiges Ende** mit beschrifteten Nachbar-Karten.

### Stärken
1. **Thema vor Person:** H1 ist der Vortragstitel, die Byline mit Foto trägt den Namen. Teilt sich jetzt wie ein Fachvortrag.
2. **Mobile Reihenfolge bei kommenden Events gelöst:** Fakten und Teilnahme-Knopf vor dem Inhalt.
3. **Ehrliche Zustände** und saubere Ortsangabe für Vergangenes.

### Priority Issues

**[P2] Kein Datum oben bei vergangenen Events auf dem Handy**
- **Why:** Wer den Link aus WhatsApp öffnet, sieht Titel, Name und Fotos, aber nicht, wann der Vortrag war. Die Faktenbox kommt nach rund drei Bildschirmen.
- **Fix:** Für `past` unter der Byline eine Zeile „Mi, 4. Nov. 2026 · HU Berlin + Zoom · 61 Teilnehmende“ (`md:hidden`), oder die Seitenleiste auch für `past` nach oben ziehen.
- **Suggested command:** /impeccable adapt

**[P3] Fotoraster mit Lücke bei zwei Bildern**
- **Why:** Unverändert seit der Baseline: Foto 2 steht klein oben rechts, darunter Leerfläche; auf dem Handy halbbreit allein.
- **Fix:** Rasterlogik nach Anzahl (1 = voll, 2 = 50/50 nebeneinander, ab 3 Mosaik).
- **Suggested command:** /impeccable layout

**[P3] Zahlen uneinheitlich zur Startseite**
- **Why:** Startseite 61 / 46 online / 15 vor Ort, hier nur 61 / 46. Speaker:innen mit Präsenzpublikum sehen ihre Saalzahl nicht.
- **Fix:** Dritte Zahl „vor Ort“ in die Zahlenkarte.
- **Suggested command:** /impeccable polish

**[P3] Chip-Redundanz im Kopf**
- **Why:** „Vortrag“ und „Gastvortrag“ sagen dasselbe; „BPSA“ ist als Abkürzung unerklärt und steht zusätzlich unten als „In Kooperation mit“.
- **Fix:** Ein Typ-Chip; BPSA nur im Kooperationsblock.
- **Suggested command:** /impeccable clarify

### Persona Red Flags
- **Jordan:** „BPSA“-Chip ohne Erklärung oben; die Erklärung kommt erst weit unten.
- **Riley:** Lücke im Fotoraster; 61/46 hier gegen 61/46/15 auf der Startseite.
- **Casey:** vergangene Lecture ohne Datum im ersten Bildschirm. Kommende Lecture vorbildlich (Fakten und Knopf oben, Kopf-Knöpfe 44 px).
- **Dr. Hanna:** Thema als H1 und Byline mit Foto überzeugen. Ihre Institution steht nicht in der Byline, nur in der Bio.

### Minor Observations
- Die Byline könnte die Institution tragen („Charité Berlin“), das stärkste Glaubwürdigkeitssignal.
- Bei kommenden Events ohne Thema stehen „Lecture mit … / Thema folgt“ als H1 und Unterzeile: ehrlich, aber das Muster „Person vor Thema“ kehrt dort zurück.

### Provokante Fragen
- Was sieht jemand in den ersten drei Sekunden, der einen alten Lecture-Link antippt: wann war das?
- Wäre das Hörsaalfoto als breiter Kopf mit H1 darunter die stärkere Visitenkarte?
