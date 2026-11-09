# Impeccable Audit (final): psng.info, Branch `redesign`

Stand: 09.11.2026, Branch `redesign` (HEAD 1f24efd). Technischer Audit nach `reference/audit.md`, Vergleich mit `2026-11-09-audit.md` (Baseline, Branch `astro`). Es wurde nichts am Quellcode geändert und nichts committet; `dist/` wurde neu gebaut, der Dev-Server auf :8080 lief unverändert.

Geprüft: `/`, `/events`, `/events/lecture-tomislav-majic`, `/ueber-uns`, zusätzlich `/leitfaden` (200 % Text bei 375 px) sowie das Inhaltsverzeichnis am linken Rand auf `/leitfaden` und `/events` bei 1440 px.

## Methode (wie in der Baseline)

| Was | Wie | Status |
|---|---|---|
| axe-core 4.10.3 (WCAG 2.0/2.1/2.2 A+AA, best-practice) | Alle 5 Seiten, 1440 px und 375 px, nach vollständigem Durchscrollen (Playwright/Chromium) | gemessen |
| Kontrast jenseits von axe | Alle von axe als „incomplete“ gemeldeten Textknoten: Text transparent schalten, Hintergrundpixel des Elements abgreifen, schlechtester Pixel gegen die echte Textfarbe | gemessen |
| Responsive 375×812 | Überlauf, Targets (24 und 44 px, Fließtext-Links separat gezählt) | gemessen |
| Text 200 % | `documentElement.style.fontSize='200%'` bei 375 px, `scrollWidth` gegen `innerWidth`, Menü-Knopf-Position | gemessen auf allen 5 Seiten |
| Footer-Fokus, Inhaltsverzeichnis | Fokus per Skript und Tab, Screenshot, Rechnung | gemessen |
| `impeccable detect` | Quellordner `src` plus URL-Scans Desktop (1280) und 375 px | gemessen |
| Build | `npm run build`: 33 Seiten, JS 297 KB, CSS 66 KB | gemessen |

Hinweis zur Messung: Ein erster axe-Lauf meldete auf `/events` drei Kontrastverstöße (4,43 bis 4,48 : 1). Es waren Zwischenstände der Einblend-Animation (Reveal, Deckkraft < 1 beim Messen). Mit abgewartetem Reveal (0 und 2,5 s, Desktop und 375 px) sind es 0 Verstöße. Wer axe auf dieser Seite einsetzt, muss die Animation abwarten.

Nicht geprüft: Absenden und Fehlerzustand des Kontaktformulars sowie Galerie-Tastatur nur im Code; echte Touch-Gesten; LCP/CLS im Browser.

---

## Audit Health Score

### Gesamt

| # | Dimension | Baseline | Final | Key Finding |
|---|-----------|---|---|---|
| 1 | Accessibility | 2 | 3 | axe 0 Verstöße auf allen Seiten; Footer-Fokus weiß (2 px, sichtbar), Hero-Fußnote 5,4 : 1, BPSA-Band ≥ 4,9 : 1, Fehlerfarbe 6,5 : 1; offen: Text-Links 16 bis 20 px hoch |
| 2 | Performance | 3 | 3 | Unverändert: React-Laufzeit auf jeder Seite für die Navigation |
| 3 | Theming | 3 | 4 | Tokens für Fehler, Hinweis, Lesetext; `bg-white`/Amber/`--sidebar-*` weg, nur Overlay-Weiß/-Schwarz mit Alpha |
| 4 | Responsive Design | 3 | 3 | Nav bei 200 % behoben; dafür Überlauf bei 200 % auf `/leitfaden` (Chips) und 3 px auf dem Event-Detail |
| 5 | Implementation Integrity | 3 | 4 | Kicker, Eyebrow-Chip, Verlaufsschrift, Cyan-False-Positives und Overused-Font-Treffer weg; ein `border-accent`-Hinweis bleibt |
| | **Total** | **14/20** | **17/20** | **Good** |

### Pro Seite

| Dimension | Startseite | Events | Event-Detail | Über uns |
|---|---|---|---|---|
| Accessibility | 3 | 3 | 3 | 3 |
| Performance | 3 | 3 | 3 | 3 |
| Theming | 4 | 4 | 4 | 4 |
| Responsive Design | 3 | 3 | 3 | 3 |
| Implementation Integrity | 3 | 3 | 4 | 4 |
| **Total** | **16/20** (13 vorher) | **16/20** (14) | **17/20** (14) | **17/20** (15) |

Begründung: Startseite hat den `border-accent-on-rounded`-Treffer (HeroCard) und viele 20-px-Links. Events hat weiterhin 12 Detector-Treffer für zu lange Zeilen und 32 Links unter 24 px Höhe. Über uns: Website-/Instagram-Links 16 px hoch.

Seitenmaße (375×812): Startseite 10 448 px (Baseline 8 984), Events 18 155 (16 034), Detail 3 773 (3 759), Über uns 13 768 (11 648), Leitfaden 12 289. Desktop 1440 px: 7 246 / 14 761 / 2 575 / 7 560 / 9 232. Die Seiten sind länger geworden (mehr Inhalt, Wegweiser).

### axe-core

| Seite | Verstöße 1440 / 375 | incomplete (Kontrast) 1440 / 375 | Händisch nachgemessen |
|---|---|---|---|
| `/` | 0 / 0 | 32 / 26 | alle ≥ 4,5 : 1 (Hero-Fußnote 5,37; Eyebrow-Chip entfallen) |
| `/events` | 0 / 0 | 8 / 4 (BPSA-Band) | schlechtester Pixel 4,93 : 1 |
| Detail | 0 / 0 | 0 / 0 | in Ordnung |
| `/ueber-uns` | 0 / 0 | 1 / 1 | in Ordnung |
| `/leitfaden` | 0 / 0 | 0 / 0 | in Ordnung |

Der Treffer „Gründe deine Gruppe“ (Minimum 3,18 : 1) ist ein Messartefakt der abgerundeten Ecken (Pixel außerhalb des Knopfs); Mittelwert 4,99, Text Himbeer auf Weiß 5,2 : 1.

### 200 %-Text bei 375 px

| Seite | scrollWidth vs. 375 | Menü-Knopf rechts bei | Ergebnis |
|---|---|---|---|
| `/` | 375 | 343 | in Ordnung (Baseline: Knopf bei 586, außerhalb) |
| `/events` | 375 | 343 | in Ordnung |
| Detail | **378** | 343 | 3 px Überlauf: `EventDetail.astro:98` |
| `/ueber-uns` | 375 | 343 | in Ordnung |
| `/leitfaden` | **430** | 343 | Überlauf: Themen-Chips |

### Touch-Targets bei 375 px (ohne Fließtext-Links)

| Seite | 24 bis 44 px | unter 24 px (Text-Links) | Baseline 24 bis 44 |
|---|---|---|---|
| `/` | 8 | 5 | 11 |
| `/events` | 11 | 32 | 29 |
| Detail | 4 | 1 | 8 |
| `/ueber-uns` | 11 | 20 | 6 |
| `/leitfaden` | 12 | 1 | – |

Nav, Menü, Sprachwahl, Filter und Vor/Zurück-Knöpfe sind jetzt 44 px. Offen sind eigenständige Text-Links in Karten (20 px) und die Über-uns-Links (16 px); sie erfüllen AA nur über die Abstandsausnahme.

### Inhaltsverzeichnis am linken Rand (1440 px)

`<nav aria-label="Inhalt der Seite" data-toc>` mit Liste von Sprunglinks, Links 24 px hoch (SC 2.5.8 erfüllt), Text 13 px in (118,96,104) auf Weiß = 6,0 : 1, Fokusring 2 px Himbeer (5,2 : 1), kein Überlappen mit dem Haupttext bei 1440 und 1000 px, `aria-current` auf dem erreichten Abschnitt (gesehen: „2 · Schritt-für-Schritt-Anleitung“), ohne JS gewöhnliche Liste. axe: 0 Verstöße. Zu beachten: Der Rand-Streifen ist rein visuell zusätzlich; auf Handys (< 960 px) gibt es ein eigenes Inline-Verzeichnis (`leitfaden.astro:36`).

### Detector

| Seite | Desktop Baseline → Final | 375 px Baseline → Final | Treffer final |
|---|---|---|---|
| `/` | 10 → 1 | 9 → 2 | `border-accent-on-rounded` (HeroCard); mobil dazu `straggler` („2026“ allein in Bildunterschrift) |
| `/events` | 30 → 12 | 21 → 0 | 12 × `line-length` (~96 bis 100 Zeichen) |
| Detail | 4 → 1 | 2 → 0 | `first-viewport-column-overflow` (Layoutentscheidung, kein Defekt) |
| `/ueber-uns` | 0 → 2 | 0 → 1 | `unbalanced-heading` (Partner-h4, `AboutPage.astro:206`), neue Regel |
| `/leitfaden` (neu) | – → 19 | – → 0 | 19 × `line-length` (Prose ohne Breitenbegrenzung) |
| Quelle `src` | `[]` → 5 | | `design-system-font-size` (0,9375/0,8125/1,0625 rem: `AboutPage.astro:149,207`, `SectionToc.astro:43`, `EventDetail.astro:305,308`) |

Regeln gegenüber der Baseline: `ai-color-palette` 16 → 0, `kicker-above-heading` 6 → 0, `hero-eyebrow-chip` 2 → 0, `overused-font` 2 → 0, `gradient-text` 1 → 0, `low-contrast` 2 → 0, `line-length` 14 → 12 (+19 auf `/leitfaden`), `first-viewport-column-overflow` 1 → 1. Neu im Katalog und nicht vergleichbar: `unbalanced-heading`, `straggler`, `border-accent-on-rounded`, `design-system-font-size`.

---

## Implementation Integrity Verdict

**Pass.** Das System bleibt produktspezifisch (Himbeer/Koralle als HSL-Tokens, BPSA als eigene Achse, Inhalte aus Collections). Die Standardmuster, die `PRODUCT.md` als K.-o.-Risiko nennt (Kicker über Überschriften, Eyebrow-Chip, Verlaufsschrift), sind weg; die Cyan-Treffer sind verschwunden. Übrig bleibt ein 3-px-Randstreifen am abgerundeten Hero-Karten-Kopf. Das Inhaltsverzeichnis am Rand ist eigenständig und kein Standardbaustein.

## Executive Summary

- Audit Health Score: **17/20** (Good), vorher 14/20
- Befunde gesamt: **12** (P0 0 / P1 1 / P2 5 / P3 6), vorher 18 (0 / 5 / 6 / 7)
- Alle fünf Baseline-P1 sind behoben (Footer-Fokus, Hero-Kontrast, BPSA-Band, Fehlerfarbe, Navigation bei 200 %).
- Neuer P1: `/leitfaden` läuft bei 200 % Text um 55 px über (Themen-Chips).
- Nächste Schritte: Chip-Überlauf, danach Zeilenlänge, Text-Link-Tippflächen, React-Laufzeit.

---

## Detailed Findings by Severity

### P0 Blocking
Keine.

### P1 Major

**[P1] 1. Leitfaden: Überlauf bei 200 % Text**
- **Location**: `src/pages/leitfaden.astro:358` (Themen-Chips `inline-flex … text-xs`, `<span>` mit Nummer und Titel) und `:372` (Nischen-Chips)
- **Category**: Responsive
- **Impact**: Bei 375 px und Root-Schrift 200 % ist die Seite 430 px breit (Baseline-Verdacht bestätigt). Die Chips „07 Microdosing: Hype der Leistungsgesellschaft“ und „15 Breathwork & andere substanzfreie …“ brechen nicht um, die Seite scrollt seitlich. Der Rest der Seite und die Navigation sind in Ordnung.
- **WCAG/Standard**: 1.4.4 Resize Text (AA), 1.4.10 Reflow (AA)
- **Recommendation**: `max-w-full` und `[overflow-wrap:anywhere]` (wie in `.chip`, `index.css:165`) bzw. gleich `class="chip"`-Muster verwenden; für `:358` `inline-flex` auf `flex` mit `min-w-0`.
- **Suggested command**: `/impeccable adapt`

### P2 Minor

**[P2] 2. Event-Detail: 3 px Überlauf bei 200 % Text**
- **Location**: `src/components/astro/events/EventDetail.astro:98` (Vor/Zurück-Knöpfe `inline-flex h-11 … gap-1`), Container `flex gap-2` darum
- **Impact**: scrollWidth 378 statt 375, minimale seitliche Verschiebung.
- **WCAG/Standard**: 1.4.10 Reflow (AA)
- **Recommendation**: `flex-wrap` am Container oder die Kurzform des Labels bei großer Schrift ausblenden.
- **Suggested command**: `/impeccable adapt`

**[P2] 3. Zeilen noch zu lang: `.text-reading` und Leitfaden-Prose**
- **Location**: `src/index.css:177` (`max-width: 68ch` entspricht ~98 Zeichen, weil `ch` die Breite der „0“ ist), `src/layouts/ProseLayout.astro:48` (`max-w-none`, 19 Treffer auf `/leitfaden`)
- **Impact**: Detector: 12 Karten auf `/events`, 19 Absätze/Listen auf `/leitfaden`, je ~89 bis 102 Zeichen. Für Lesetext zu breit.
- **Recommendation**: `max-width: 60ch` (~85 Zeichen) oder `36rem`; Prose auf `max-w-[65ch]`.
- **Suggested command**: `/impeccable typeset`

**[P2] 4. Text-Links als Tippflächen 16 bis 20 px**
- **Location**: `src/components/astro/home/styles.ts:16` (`textLink`, „Details & Anmeldung“, „Alle Termine & Aufzeichnungen“), Karten auf `EventsPage`/`EventCard` („Zur Event-Seite“, „bpsa.psng.info →“), `AboutPage.astro` („Website“/„Instagram“, 16 px, `text-xs`)
- **Impact**: 5 Links auf `/`, 32 auf `/events`, 20 auf `/ueber-uns` unter 24 px Höhe; AA nur über die Abstandsausnahme erfüllt, für Daumen knapp.
- **WCAG/Standard**: 2.5.8 (AA, über Abstand erfüllt), 2.5.5 (AAA)
- **Recommendation**: `inline-flex min-h-11 items-center` mobil an `textLink` und den Über-uns-Links.
- **Suggested command**: `/impeccable adapt`

**[P2] 5. React-Laufzeit auf jeder Seite**
- **Location**: `src/layouts/BaseLayout.astro:106` (`<SiteNav client:load>`), `src/components/SiteNav.tsx`
- **Impact**: Unverändert zur Baseline: `react`, `react-dom`, `client` plus `SiteNav` rund 61 KB gz auf allen Seiten; JS im Build 297 KB, CSS 66 KB.
- **Recommendation**: Navigation als Astro-Komponente mit Vanilla-Skript; React nur für `ContactSection` und `AddToCalendar`.
- **Suggested command**: `/impeccable optimize`

**[P2] 6. Kontaktformular: Knopf `disabled` bis Anliegen gewählt**
- **Location**: `src/components/ContactSection.tsx:202`
- **Impact**: Besser als vorher (`autoComplete` an Name/E-Mail, `aria-describedby` auf den Hinweis `:203`, Fokus auf die Erfolgsüberschrift `:61,110`). Offen: Der `disabled`-Knopf ist weiter nicht fokussierbar, die Fehlermeldung `:189` bleibt eine einzelne Live-Region ohne `aria-invalid` am Feld. Im Browser nicht ausgeführt.
- **WCAG/Standard**: 3.3.1 (A)
- **Recommendation**: Knopf nicht deaktivieren, Fehler beim Klick feldbezogen zeigen.
- **Suggested command**: `/impeccable harden`

### P3 Polish

**[P3] 7. Foto-Medien: Zähler-Live-Region, YouTube-Fokus**
- **Location**: `cards/PhotoCarousel.astro:78` (`aria-live="polite"` bei jedem Scroll), `src/scripts/youtube.ts:15` (`replaceWith` ohne Fokus auf den iframe)
- **Recommendation**: Zähler nur bei Pfeil-Klick melden; Fokus nach dem Ersetzen setzen.
- **Suggested command**: `/impeccable harden`

**[P3] 8. Filter-Navigation und Zeitstrahl-Markup**
- **Location**: `src/components/astro/events/EventsPage.astro:113` (`aria-label` = Eyebrow-Text), `:119` (`aria-current="true"`), `:141` (`<span aria-hidden>` direkt unter `<ol>`)
- **Recommendation**: `aria-label` „Filter“, `aria-current="page"`, Strich per `::before`, Trefferzahl in Live-Region.
- **Suggested command**: `/impeccable harden`

**[P3] 9. Performance-Feinschliff**
- **Location**: `src/index.css:297` (`.glass` mit `backdrop-filter: blur(20px)` auf fixierter Leiste), Hero-Bild ohne `fetchpriority` (`HomePage.astro`), keine langen Cache-Header für `/fonts/*` (`vercel.json`)
- **Recommendation**: Blur nur ab 768 px, `fetchpriority="high"`, Cache-Header.
- **Suggested command**: `/impeccable optimize`

**[P3] 10. Schriftgrößen außerhalb der DESIGN.md-Skala**
- **Location**: `AboutPage.astro:149,207` (0,9375 rem), `SectionToc.astro:43` (0,8125 rem), `EventDetail.astro:305,308` (1,0625 rem)
- **Recommendation**: Auf Skalenstufe ziehen oder DESIGN.md ergänzen.
- **Suggested command**: `/impeccable typeset`

**[P3] 11. Typografie-Hinweise des Detectors**
- **Location**: `AboutPage.astro:206` (Partner-h4 mit kurzer zweiter Zeile, 18 bis 19 %), Startseite 375 px: Bildunterschrift „… 2026“ mit einem Wort in der letzten Zeile
- **Recommendation**: `text-wrap: balance` an Überschriften, `text-wrap: pretty` an Bildunterschriften.
- **Suggested command**: `/impeccable polish`

**[P3] 12. Rundkarte mit farbigem Randstreifen**
- **Location**: HeroCard (`div.overflow-hidden.rounded-2xl`, `border-top: 3px`, `src/components/astro/home/HeroCard.astro`)
- **Impact**: Detector `border-accent-on-rounded`, Desktop und 375 px. Gestalterische Entscheidung; der Streifen trägt die Koralle der Marke.
- **Recommendation**: Beibehalten oder Streifen als Innenelement lösen.
- **Suggested command**: `/impeccable polish`

---

## Patterns & Systemic Issues

- **Gemeinsame Bauteile helfen jetzt überall.** Footer-Fokus, Navigation bei 200 % und Menü-Escape sind in `Footer.astro`/`SiteNav.tsx`/`index.css` gelöst und wirken auf allen Seiten.
- **Reflow-Fehler sitzen bei fest geformten Chips und Flex-Reihen**, nicht in Fließtext (Leitfaden-Chips, Event-Navigation).
- **Zeilenlänge**: `ch` in `Space Grotesk`/DM Sans ist breiter als der Mittelwert der Buchstaben; 68ch ergibt ~98 Zeichen. Ein Wert pro Klasse (`.text-reading`) behebt 12 Karten.
- **Kleine Text-Links** bleiben die einzige größere Tippflächen-Lücke.

## Positive Findings

- axe: 0 Verstöße auf allen fünf Seiten bei 1440 und 375 px.
- Alle Baseline-Kontrastlücken sind geschlossen und nachgemessen (Hero-Fußnote 5,37 : 1, BPSA-Band ≥ 4,93 : 1, `--destructive` 6,5 : 1).
- Footer-Fokus ist sichtbar (weißer Ring, 2 px, Versatz 2 px auf dem Himbeer-Verlauf).
- Navigation bleibt bei 200 % Schrift erreichbar; Menü schließt per Escape mit Fokusrückgabe.
- Inhaltsverzeichnis am Rand: semantisch (`nav`, Liste, `aria-current`), Ziele 24 px, Kontrast 6,0 : 1, funktioniert ohne JS, kein Überlappen.
- Kein horizontaler Überlauf bei 375 px bei normaler Schrift auf allen fünf Seiten; keine harten Farb-Literale außerhalb `index.css`.
- Kicker, Eyebrow-Chip und Verlaufsschrift entfernt, Detector `ai-color-palette` bei 0.

## Recommended Actions

1. **[P1] `/impeccable adapt`**: Leitfaden-Chips umbrechen lassen (`leitfaden.astro:358,372`), Event-Navigation `EventDetail.astro:98` mit `flex-wrap`; 200 %-Test auf den fünf Seiten wiederholen.
2. **[P2] `/impeccable typeset`**: `.text-reading` auf 60ch und Prose-Breite begrenzen (`index.css:177`, `ProseLayout.astro:48`).
3. **[P2] `/impeccable adapt`**: Text-Links mobil auf 44 px Tippfläche (`styles.ts:16`, `AboutPage.astro`).
4. **[P2] `/impeccable optimize`**: Navigation ohne React (`BaseLayout.astro:106`).
5. **[P2] `/impeccable harden`**: Formularknopf nicht deaktivieren (`ContactSection.tsx:202`).
6. **[P3] `/impeccable polish`**: Filter-Markup, Live-Regions, Schriftskala, Typografie-Hinweise.

Nach den Korrekturen `/impeccable audit` erneut ausführen.
