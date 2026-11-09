---
target: Startseite
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/Users/lenne/Documents/Github/psng.info/src/components/astro/home/HomePage.astro"
target_fingerprint: "sha256:5838e5660e49ffa3f55e5cbb9177c9eabd04a28083d0c8495ca9dc2cc6b54e64"
target_path: /Users/lenne/Documents/Github/psng.info/src/components/astro/home/HomePage.astro
timestamp: 2026-11-08T23-27-54Z
slug: src-components-astro-home-homepage-astro
---
Method: dual-agent (A: general-purpose/Opus · B: general-purpose/Sonnet)
Stand: 09.11.2026, Branch `astro` (inzwischen identisch mit `main`), Dev-Server :8080, 1440×900 und 375×812.

## 1. Startseite (`/`, `home/HomePage.astro` + `HeroCard.astro`)

**Modus:** Persuade (Glaubwürdigkeit herstellen, WhatsApp-Beitritt auslösen).

### Design-Specificity-Verdict
Das Gerüst ist austauschbar, die Inhalte sind es nicht. Die Seite folgt fast Schritt für Schritt der SaaS-Landingpage-Schablone:
- Eyebrow in Versalien über jeder Sektion (7×)
- H1 mit Verlaufstext
- Kennzahlenleiste „250+ · 13+ · seit März 2026“
- nummerierte Kacheln „01/02/03“ und kurz danach eine zweite nummerierte Liste „01–04“
- eine vierspaltige Werte-Reihe mit Linie oben
- zentriertes FAQ-Akkordeon
- dunkle CTA-Box „Noch nicht dabei?“, danach Formular, danach ein Footer mit noch einem CTA

Der Hero-Hintergrund ist ein weichgezeichneter Rosa-Koralle-Verlauf, in dessen Ecken Neuronenzweige stehen. Die Zweige zitieren das Logo, sind aber von den Blobs fast verdeckt. Genau diese Kombination liest man heute als „generiert“.

Spezifisch fürs PSNG sind die HeroCard-Logik (nächster Termin, Rückblick oder Feature), die echten Fotos und Zahlen im Rückblick, die Partnerlogos, der Datenschutzsatz unter dem WhatsApp-Knopf und das Teamfoto. Diese Teile tragen. Sie stecken aber in einem Rahmen, den jede Studi-Initiative oder jedes Startup unverändert übernehmen könnte. **Von den vier Flächen hat diese das höchste Risiko, dass Lennert sie als KI-Look abweist.**


### Deterministischer Scan (Assessment B) und Abgleich

- **Quelldatei-Scan:** 0 Befunde (`HomePage.astro`, `HeroCard.astro`). Der Scan löst Tailwind-Klassen nicht auf, deshalb kommen alle Treffer erst im gerenderten Scan.
- **URL-Scan Desktop (1280 px): 10 Befunde.**
  - `kicker-above-heading` ×6: „Neu hier?“ `HomePage.astro:152`, „Termine“ `:180`, „Rückblick“ `:268`, „Hochschulgruppen“ `:333`, „Wofür wir stehen“ `:362`, „Kontakt“ `ContactSection.tsx:95`
  - `hero-eyebrow-chip` ×1: `HomePage.astro:113`
  - `gradient-text` ×1: `HomePage.astro:115`, Klasse `index.css:302`
  - `overused-font` ×1: Space Grotesk trägt 64 % des Texts
  - `ai-color-palette` ×1: BPSA-Chip in der HeroCard
- **URL-Scan 375 px:** 9 Befunde, dieselben ohne `hero-eyebrow-chip`.
- **Overlay:** Die Injektion hat geklappt. Im sichtbaren Bereich meldete die Konsole 5 Treffer. Der [Human]-Tab ist inzwischen geschlossen, ein Overlay ist also nicht mehr sichtbar.
- **Wo A und B übereinstimmen:** beim Schablonenmuster (Eyebrows, Verlaufstext). Das ist der stärkste gemeinsame Befund der ganzen Site.
- **False Positive:** `ai-color-palette`. Cyan und Violett sind die dokumentierte BPSA-Markenachse (`index.css:53–70`). Inhaltlich stützt der Treffer trotzdem As Befund, dass die Partnerfarbe zu laut ist.
- **Was nur A gefunden hat:** die leere Agenda, Widersprüche bei Zeit und Ort, dass im Hero kein Foto steht, und die Logik der drei Abschlüsse.
- **Was nur das Audit gemessen hat:** Die Hero-Fußnote auf dem Bild hat im Median 3,84:1 (AA verlangt 4,5:1).

### Nielsen-Heuristiken

| # | Heuristik | Score | Key Issue |
|---|---|---|---|
| 1 | Sichtbarkeit des Systemstatus | 2 | „Danach im Kalender“ ist leer: Überschrift, Seriennotiz, keine Termine und kein Hinweis „keine weiteren Termine eingetragen“. Positiv: Relativdatum „in 3 Wochen“, Freshness-Skript. |
| 2 | Sprache der Nutzer:innen | 3 | Natürliches Deutsch und Duzen. Termine widersprechen sich: Seriennotiz „19:00 Uhr, auf Zoom“, HeroCard „18:30 · Ort folgt“ plus „Zoom-Link via WhatsApp“. |
| 3 | Kontrolle & Freiheit | 3 | Nichts hält einen fest. Externe Links öffnen in neuem Tab, Anker funktionieren. |
| 4 | Konsistenz | 2 | Begriffe driften: Hochschulgruppe / Lokalgruppe / Gruppe / Stadtgruppen und Lecture / Vortrag / Event / Termin / Call. Zwei nummerierte Listen in unterschiedlicher Form. Drei verschiedene Sekundärknopf-Stile. |
| 5 | Fehlervermeidung | 3 | Senden bleibt gesperrt, bis ein Anliegen gewählt ist, mit Hinweis. Der Datenschutzsatz zu WhatsApp nimmt eine echte Sorge vorweg. |
| 6 | Wiedererkennen statt Erinnern | 3 | Navigation und WhatsApp-Knopf sind immer sichtbar, alles ist beschriftet. „Danach“ setzt voraus, dass man die HeroCard noch im Kopf hat. |
| 7 | Flexibilität & Effizienz | n/a | Persuade-Fläche |
| 8 | Ästhetik & Minimalismus | 2 | 10 Sektionen, 7 WhatsApp-Links, der Team-Absatz doppelt mit „Über uns“, eine leere Sektion und drei Abschlüsse hintereinander. |
| 9 | Fehler erkennen & beheben | 3 | Formular (laut Quelle): Fehlermeldung mit E-Mail als Ausweg, Erfolg wird per `aria-live` angesagt. |
| 10 | Hilfe & Doku | n/a | Persuade-Fläche (FAQ vorhanden) |
| | **Summe** | **21/32 (66 %)** | **Rating: Acceptable** |

### Cognitive Load
Fehlschläge (3 = moderat):
- **Single focus:** Der erste Desktop-Bildschirm bietet 2 Hero-Knöpfe, 3 Aktionen in der HeroCard (Zoom-Link via WhatsApp, Kalender, Details & Anmeldung) und dazu 5 Navigationslinks, Sprachwahl und den WhatsApp-Knopf in der Leiste.
- **Visuelle Hierarchie:** Ab der zweiten Sektion bekommt jede Sektion dasselbe Muster mit gleichem Gewicht (Eyebrow, H2, grauer Absatz, Raster). Nichts zeigt an, was nach dem Hero am meisten zählt.
- **Minimal choices:** siehe die Entscheidungspunkte unten.

Entscheidungspunkte mit mehr als 4 Optionen:
- Erster Bildschirm, Inhalt: 5 Aktionen (2 im Hero, 3 in der Karte)
- Navigation Desktop: 8 (5 Links, DE/EN, WhatsApp)
- Select „Anliegen“: 7 Optionen
- Footer: 10 Links (4 Social, 1 CTA, 5 rechtliche bzw. Service-Links)

### Emotional Journey
1. **Einstieg positiv:** warmes Rosa, eine klare Aussage, und die HeroCard liefert sofort einen konkreten Termin. Das schafft Vertrauen.
2. **Erstes Tal:** Nach den „So machst du mit“-Kacheln folgt „Danach im Kalender“ ohne Inhalt. Man fragt sich, ob hier überhaupt etwas passiert. Der Knopf „Termine ansehen“ aus Schritt 02 springt genau in diese Leere (`onboardingTargets.events`, Z. 61).
3. **Höhepunkt:** der Rückblick mit echten Fotos, Teilnehmendenzahlen und Partnerlogos.
4. **Danach:** Plateau aus Erklärungen, das FAQ beruhigt.
5. **Ende:** zerfasert in dunkle CTA-Box, Formular und Footer-CTA. Peak-End-Regel: Hängen bleibt ein Formular, kein Moment.

### Stärken
1. **Die HeroCard ist echte Produktlogik.** Sie zeigt den nächsten Termin, eine Serie, ein Feature oder einen Rückblick, mit Relativdatum und Ablauf per `data-expires`. Sie macht die Seite lebendig und ehrlich, ganz ohne Platzhalter.
2. **Die Mikrotexte zum Beitritt sind stark.** „Deine Nummer sehen nur Mitglieder der Community. WhatsApp ist für den Austausch da, alle Infos stehen auf der Website.“ beantwortet genau die Hürde vor dem wichtigsten Klick.
3. **Belege statt Behauptungen im Rückblick:** Fotos, Datum, „mit BPSA“, „61 Teilnehmende“, „9/10 Bewertung“. Die Logoleiste macht das Netzwerk sichtbar.

### Priority Issues

**[P1] Leere Sektion „Danach im Kalender“, und das Onboarding verlinkt hinein**
- **Why:** Steht nur ein kommender Termin an, zieht die HeroCard ihn ab (`agenda.filter(entry.id !== heroId)`). Die Sektion zeigt dann eine Überschrift und eine Seriennotiz in einem rosa Band ohne Inhalt. Für Erstbesucher:innen und Speaker:innen wirkt das wie ein inaktives Netzwerk. Schritt 02 „Termine ansehen“ führt genau dorthin.
- **Fix:** `HomePage.astro:177` die ganze Sektion nur bei `agenda.length > 0` rendern. Ist die Agenda leer, wandert die Seriennotiz (Z. 182–193) in die HeroCard oder den Kopf des Rückblicks. `onboardingTargets.events` (Z. 61) sollte bei leerer Agenda auf `pathFor("events", locale)` zeigen statt auf `#termine`.
- **Suggested command:** /impeccable harden

**[P1] Schablonen-Skelett mit K.-o.-Risiko „sieht nach KI aus“**
- **Why:** Verlaufstext in der H1, Eyebrow über jeder Sektion, Kennzahlenband, nummerierte Kacheln, Werte-Reihe, dunkle CTA-Box: Jedes Element für sich ist harmlos, zusammen ergeben sie die Signatur generierter Landingpages. Das widerspricht „Glaubwürdigkeit vor Begeisterung“.
- **Fix:**
  - `gradient-text` aus der H1 nehmen (`HomePage.astro:115`, `index.css:302–307`). Den Akzent setzt stattdessen volles Himbeer-Pink oder eine Unterstreichung in Koralle.
  - Eyebrows auf höchstens 2 Sektionen reduzieren (`styles.ts:13` bleibt, Aufrufe Z. 152, 180, 268, 333, 362 streichen).
  - Eine der beiden Nummerierungen auflösen (Z. 161–163 oder 345–347).
  - Die Kennzahlen als Zeile in den Hero-Text holen statt als eigenes Band (Z. 134–147).
  - Die dunkle CTA-Box (Z. 420–436) streichen, der Footer trägt den Beitritt ohnehin.
- **Suggested command:** /impeccable distill

**[P1] Im Hero kein echtes Foto. Das stärkste Bild ist ein Verlauf.**
- **Why:** Produktprinzip 2 sagt „Echte Inhalte tragen die Seite“. Die Site hat ausgezeichnete Fotos (ALPS-Gruppenbild, ICPR, Hörsaal Majić, Teamfoto), der Hero zeigt keins davon. Die HeroCard blendet ihr Bild auf dem Handy bewusst aus (`HeroCard.astro:79`, `hidden … sm:block`), und beim aktuellen Termin gibt es ohnehin kein Cover.
- **Fix:** `hero-bg.webp` (Z. 105) durch ein echtes Foto ersetzen, entweder groß rechts neben dem Text oder vollflächig mit hellem Schleier. Die Neuronenzweige aus dem Logo bleiben als feine Linienebene erhalten. Fehlt der HeroCard ein Cover, zeigt sie das Sprecherfoto größer oder das letzte Event-Foto.
- **Suggested command:** /impeccable bolder

**[P2] Der Rückblick besteht aus mageren Kacheln**
- **Why:** Vier gleiche 4:3-Kacheln, der Titel auf 2 Zeilen gekürzt („Ein realitätsnaher Blick auf die aktuelle Therapieforschung mit…“), eine einzige Zahl. Das ist genau das „magere Karten“-Muster, das Lennert nicht mag. Die Affiliation der Sprecher (Charité, MSB) als stärkstes Glaubwürdigkeitssignal fehlt.
- **Fix:** `HomePage.astro:274–300` in ein großes Feature für das letzte Event umbauen: 16:9, voller Titel, Sprecher mit Affiliation, Zahlen, Lead-Satz. Daneben oder darunter 2–3 kompakte Einträge. `line-clamp-2` (Z. 292) entfernen.
- **Suggested command:** /impeccable layout

**[P2] Die Fakten widersprechen sich**
- **Why:** Die Seriennotiz behauptet „einmal im Monat, 19:00 Uhr, auf Zoom. Ausnahmen bestätigen die Regel.“ (`series.ts:22–24`, `copy.ts:128–133`). Der nächste Termin ist um 18:30, „Ort folgt“, mit „Zoom-Link via WhatsApp“. Erstbesucher:innen wissen dann nicht, ob online oder vor Ort. Speaker:innen lesen es als unsauber.
- **Fix:** Die Seriennotiz aus dem nächsten echten Event ableiten oder allgemein halten (z. B. „monatlich abends, hybrid aus Berlin“). „Ort folgt“ als Status-Chip zeigen statt als Ortszeile (`HeroCard.astro:128`).
- **Suggested command:** /impeccable clarify

### Persona Red Flags
- **Jordan (Erstbesuch):** Zwei grüne Wege mit WhatsApp im ersten Bildschirm („WhatsApp beitreten“ und „Zoom-Link via WhatsApp“) erklären nicht, wie Community und Lecture-Link zusammenhängen. „Gründe deine Gruppe“, „Lokalgruppe starten“ und „Hochschulgruppen“: Ist das dasselbe? „Termine ansehen“ führt auf eine leere Fläche.
- **Riley (Stresstest):**
  - Die Agenda ist leer, und es gibt dafür keinen Leerzustand.
  - 19:00 und Zoom laut Notiz gegen 18:30 und „Ort folgt“ beim Termin.
  - Titel im Rückblick per Line-Clamp abgeschnitten.
  - Partnerlogos auf dem Desktop grau, mit 70 % Deckkraft und ohne sichtbaren Namen; der Name steht nur im `title`.
  - FAQ-Kästen bekommen `hover:shadow-lg`, als wären es Karten.
- **Casey (Handy):** 11,1 Bildschirme. Der WhatsApp-Knopf bleibt in der Leiste, gut, sitzt aber oben und damit nicht im Daumenbereich. Die HeroCard beginnt erst am unteren Rand des ersten Bildschirms, ohne Bild. Bis zum Kontaktformular sind es rund 9 Bildschirme.
- **Dr. Hanna (Speakerin):**
  - Verlaufstext und Blob-Hintergrund wirken nach Startup oder Szene, nicht nach Fachnetzwerk.
  - Vergangene Speaker stehen als „Lecture mit Dr. med. Tomislav Majić“ ohne Institution da.
  - In der Logoleiste stehen Nachtschatten Verlag und Lucys gleichrangig neben SPSN und UNePSI.
  - Der Code-of-Conduct-Link ist ein kleiner Textlink in Sektion 6.

### Minor Observations
- `▶ Aufzeichnung` im Rückblick (Z. 82) ist ein Textglyph, sonst verwendet die Seite Lucide-Icons.
- Das Teamfoto steht in einer breiten Karte mit 320 px Breite und viel Leerfläche rechts (Z. 381–394). Auf „Über uns“ erscheint es noch einmal mit identischem Text.
- „FAQ“ hat als einzige Sektion keinen Eyebrow und ist zentriert. Das bricht das eigene Muster (in diesem Fall zum Guten).
- Die Partnerlogos sind am Desktop grau und gedämpft, auf dem Handy farbig. Das ist gewollt (Hover-Medienabfrage), wirkt aber wie zwei Seiten.
- Der Footer hat kein Logo und keine Wortmarke, die Marke endet ohne Absender.

### Provokante Fragen
- Was wäre, wenn das erste, was man sieht, ein echtes Foto aus dem Hörsaal wäre und kein Farbverlauf?
- Braucht die Startseite zehn Abschnitte, wenn ohnehin die Events-Seite das Schaufenster ist?
- Warum sieht der Hero eines Netzwerks, dessen Kapital Seriosität ist, aus wie ein Produktlaunch?

---
