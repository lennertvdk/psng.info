---
target: Startseite
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 0
target_identity: "file:/Users/lenne/Documents/Github/psng.info/src/components/astro/home/HomePage.astro"
target_fingerprint: "sha256:34ce733bbb1ba5a9310184560ff4c70f3d46072f041107d87a42bc7a4b73e2da"
target_path: /Users/lenne/Documents/Github/psng.info/src/components/astro/home/HomePage.astro
timestamp: 2026-11-09-final
slug: src-components-astro-home-homepage-astro
baseline: 2026-11-08T23-27-54Z (21/32)
---
Method: design review only (Assessment A, Opus, Sub-Agent). Kein Detector, kein Audit, auf Wunsch des Auftraggebers.
Stand: 09.11.2026, Branch `redesign` (Commit 1f24efd, Hebel 1–11 + Polish), Dev-Server :8080, Headless Chrome 1440×900 und 375×844 (Ganzseite). Aufnahmen: `.impeccable/review/final/home-1440.png`, `home-375.png`.

## 1. Startseite (`/`, `home/HomePage.astro` + `HeroCard.astro`)

**Modus:** Persuade (Glaubwürdigkeit herstellen, WhatsApp-Beitritt auslösen).
**Länge:** 8,1 Bildschirme Desktop (vorher 7,2), 12,9 Handy (vorher 11,1).

### Design-Specificity-Verdict
Deutlich weniger Schablone als in der Baseline:
- Verlaufstext in der H1 ist weg, der Akzent sitzt als volles Himbeer auf „psychedelische Wissenschaft“.
- Keine Eyebrows mehr, die Kennzahlen stehen als Zeile im Hero, die dunkle CTA-Box und die leere Sektion „Danach im Kalender“ sind gestrichen.
- Direkt unter dem Hero steht ein großes echtes Foto (ALPS 2026, mit PSNG-Rollup im Bild). Der Rückblick ist ein großes Feature (Hörsaal Majić, voller Titel, Abstract, 61/46/15) plus drei Kacheln mit Fotos.

Übrig vom Template-Rhythmus: die Drei-Kachel-Reihe „So machst du mit“ mit je einem Outline-Knopf, die Vier-Säulen-Reihe mit Linie oben („Was das PSNG ist – und was nicht“), das zentrierte FAQ-Akkordeon und die Team-Karte mit viel Leerfläche. Das Gerüst ist jetzt „solide Organisationsseite“, nicht mehr „generierte Landingpage“. Eigene Handschrift (etwa eine Form, die nur das PSNG hätte) gibt es aber noch nicht; die Persönlichkeit tragen Fotos und Inhalte.

**Verdict:** glaubwürdig und ruhig; das K.-o.-Risiko „sieht nach KI aus“ ist weitgehend ausgeräumt, die Form bleibt generisch-ordentlich.

### Nielsen-Heuristiken

| # | Heuristik | Score | Key Issue |
|---|---|---|---|
| 1 | Sichtbarkeit des Systemstatus | 3 | Leere Agenda-Sektion ist weg. HeroCard mit „Als Nächstes · in 3 Wochen“. Im Rückblick fehlt ein Hinweis, dass die Aufzählung nur die letzten vier zeigt (Link „Alle Termine & Aufzeichnungen“ trägt das aber). |
| 2 | Sprache der Nutzer:innen | 3 | Natürliches Deutsch. Der Zeitwiderspruch 19:00/Zoom gegen 18:30/Ort folgt ist weg. Das Rückblick-Feature zeigt ein englisches Abstract ohne Kennzeichnung (die Detailseite kennzeichnet es). |
| 3 | Kontrolle & Freiheit | 3 | Nichts hält fest; Anker und externe Links sauber. |
| 4 | Konsistenz | 3 | Ein Knopfstil, eine Nummerierung, „Hochschulgruppe“ als Leitbegriff. Rest: dieselbe Aktion heißt „Gründe deine Gruppe“ (Hero), „Gruppe gründen“ (Sektion), „Hochschulgruppe starten“ (Kachel). |
| 5 | Fehlervermeidung | 3 | Formular sperrt Senden bis zur Anliegen-Wahl, mit Hinweis; Datenschutzsatz unter dem WhatsApp-Knopf. |
| 6 | Wiedererkennen statt Erinnern | 3 | Alles beschriftet, WhatsApp in der Leiste immer sichtbar. |
| 7 | Flexibilität & Effizienz | n/a | Persuade-Fläche |
| 8 | Ästhetik & Minimalismus | 3 | Weniger Sektionen, ein Abschluss statt drei, echte Fotos. Rest: Säulenreihe, Team-Karte mit rund 900 px Leerfläche rechts, graue Logoleiste, großer Leerraum zwischen Hero-Foto und „So machst du mit“. |
| 9 | Fehler erkennen & beheben | 3 | Formular laut Quelle unverändert gut (Fehler mit E-Mail-Ausweg, `aria-live`). Nicht live abgeschickt. |
| 10 | Hilfe & Doku | n/a | Persuade-Fläche (FAQ vorhanden) |
| | **Summe** | **24/32 (75 %)** | **Rating: Good** (Baseline 21/32, 66 %, Acceptable) |

### Cognitive Load
Fehlschläge (2 = niedrig bis moderat):
- **Single focus (erster Bildschirm):** weiterhin 2 Hero-Knöpfe plus 3 Aktionen in der HeroCard („Zoom-Link via WhatsApp“, Kalender, „Details & Anmeldung“). Das ist vertretbar, weil die Karte ein eigener Block ist.
- **Visuelle Hierarchie Mitte:** „So machst du mit“, „Gründe deine Hochschulgruppe“ und „Was das PSNG ist“ haben gleiches Gewicht; „So machst du mit“ und die Gruppengründung erzählen zweimal dasselbe (Leitfaden lesen erscheint zweimal).

Entscheidungspunkte mit mehr als 4 Optionen: Navigation Desktop (5 Links, DE/EN, WhatsApp), Select „Anliegen“, Footer. Unverändert, alle konventionell.

### Emotional Journey
1. **Starker Einstieg:** klare Aussage, Zahlen im Hero, konkreter Termin in der Karte.
2. **Früher Höhepunkt:** das ALPS-Gruppenfoto in voller Breite. Menschen, Banner, PSNG-Rollup: sofort glaubwürdig und warm.
3. **Kleines Tal:** „So machst du mit“ (drei gleiche Kacheln) direkt nach dem Foto, mit sehr großem Leerraum davor.
4. **Zweiter Höhepunkt:** Rückblick-Feature mit Hörsaalfoto und Zahlen.
5. **Ruhiges Ende:** FAQ, „Schreib uns“, Footer mit einem WhatsApp-Knopf. Peak-End ist jetzt ein Foto und Zahlen, nicht mehr ein Formular-Stapel.

### Stärken
1. **Echte Fotos tragen die Seite** (Hero-Foto, Rückblick-Feature). Produktprinzip 2 ist erstmals sichtbar erfüllt.
2. **Ehrliche Logik ohne Leerstellen:** HeroCard, keine leere Sektion, kein Zeitwiderspruch.
3. **Beitritts-Mikrotext** bleibt stark und steht am richtigen Ort.

### Priority Issues

**[P2] Doppelter Mittelteil: „So machst du mit“ und „Gründe deine Hochschulgruppe“**
- **Why:** Zwei Sektionen hintereinander erklären den Einstieg; „Leitfaden lesen“ steht zweimal, die Gruppengründung heißt dreimal anders. Für Jordan ist unklar, ob das zwei Wege sind.
- **Fix:** Kachel 3 („Hochschulgruppe starten“) streichen und auf die Gründungs-Sektion verweisen, oder die Drei-Kachel-Reihe als schlanke Zeile in den Hero-Bereich ziehen. Ein Label für die Aktion („Hochschulgruppe gründen“) überall.
- **Suggested command:** /impeccable distill

**[P2] Englisches Abstract im Rückblick-Feature ohne Kennzeichnung**
- **Why:** Auf einer deutschen Startseite steht ein 12-zeiliger englischer Absatz ohne Hinweis und vermutlich ohne `lang="en"`. Auf dem Handy sind das rund 1,5 Bildschirme.
- **Fix:** Lead-Satz statt vollem Abstract auf der Startseite (2–3 Zeilen), oder Kennzeichnung „(Englisch)“ plus `lang`. Volltext bleibt auf der Detailseite.
- **Suggested command:** /impeccable clarify

**[P3] Team-Karte und Säulenreihe sind die letzten Template-Reste**
- **Why:** Die Team-Karte setzt ein 320-px-Foto in eine 1350-px-Karte, rechts bleibt die Hälfte leer. Die Vier-Säulen-Reihe mit Linie oben ist das letzte erkennbare Landingpage-Muster.
- **Fix:** Teamfoto größer und Text daneben in Spaltenbreite, ohne Kartenrahmen; die Säulen als zwei Sätze in den Absatz ziehen oder als Liste ohne Deko-Linie.
- **Suggested command:** /impeccable layout

**[P3] Vertikaler Rhythmus mit Löchern**
- **Why:** Zwischen Bildunterschrift des Hero-Fotos und „So machst du mit“ liegen rund 170 px Leerraum, zwischen den Kacheln und „Was wir schon gemacht haben“ nochmals rund 200 px. Die Seite wirkt dort unterbrochen.
- **Fix:** Abstände an den Inhalt koppeln (`py` der Sektionen auf eine Skala reduzieren).
- **Suggested command:** /impeccable layout

### Persona Red Flags
- **Jordan:** „Gründe deine Gruppe“, „Gruppe gründen“, „Hochschulgruppe starten“: dreimal dieselbe Aktion, anders benannt. Zwei grüne WhatsApp-Wege im ersten Bildschirm bleiben, sind aber durch den Mikrotext erklärt.
- **Riley:** englischer Fließtext im Feature ohne Hinweis; Partnerlogos auf dem Desktop grau, Namen nur im `title`.
- **Casey:** 12,9 Bildschirme. Die HeroCard beginnt bei y ≈ 750, das Datum steht knapp im ersten Bildschirm. Das Feature-Abstract streckt den Rückblick auf dem Handy stark.
- **Dr. Hanna:** Hero ohne Verlauf und mit Konferenzfoto wirkt jetzt nach Fachnetzwerk. Rückblick zeigt Titel, Name, Zahlen; die Institution des Sprechers fehlt weiterhin im Feature.

### Minor Observations
- `▶ Aufzeichnung` im Rückblick ist weiterhin ein Textglyph.
- Logoleiste: Nachtschatten und Lucys stehen gleichrangig neben den Netzwerken.
- Der Footer hat weiterhin kein Logo und keine Wortmarke.
- FAQ ist als einzige Sektion zentriert-schmal gesetzt.

### Provokante Fragen
- Braucht die Startseite zwei Sektionen zum Mitmachen, wenn die HeroCard und der Hero schon beide Wege zeigen?
- Was wäre, wenn das Feature nur einen Satz und die Zahlen zeigte und das Foto noch größer würde?
