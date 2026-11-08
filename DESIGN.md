---
name: PSNG – Psychedelic Student Network Germany
description: Website des bundesweiten studentischen Netzwerks für psychedelische Wissenschaft, Stand Branch astro vor dem Refinement
colors:
  himbeer-pink: "hsl(339 63% 48%)"
  brand-pink: "hsl(339 68% 54%)"
  koralle: "hsl(5 78% 65%)"
  gebrannte-koralle: "hsl(15 80% 44%)"
  verlauf-himbeer: "hsl(339 68% 48%)"
  verlauf-koralle: "hsl(5 78% 46%)"
  verlauf-rose: "hsl(350 70% 48%)"
  papierweiss: "hsl(0 0% 100%)"
  tiefe-tinte: "hsl(340 20% 15%)"
  gedaempfte-tinte: "hsl(340 10% 45%)"
  rose-nebel: "hsl(340 20% 96%)"
  rose-linie: "hsl(340 15% 90%)"
  warnrot: "hsl(0 84.2% 60.2%)"
  bpsa-navy: "#071030"
  bpsa-navy-chip: "#1b2c6b"
  bpsa-cyan: "#47cddb"
  bpsa-violet: "#8f49b9"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.1
  headline:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.375
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  body-small:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.25
  meta:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.33
rounded:
  sm: "8px"
  md: "10px"
  lg: "12px"
  2xl: "16px"
  full: "9999px"
spacing:
  gutter: "16px"
  gutter-sm: "24px"
  card-sm: "20px"
  card: "24px"
  card-lg: "32px"
  section: "64px"
  section-md: "96px"
components:
  button-primary:
    backgroundColor: "{colors.verlauf-himbeer}"
    textColor: "{colors.papierweiss}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "{colors.papierweiss}"
    textColor: "{colors.himbeer-pink}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-secondary-hover:
    backgroundColor: "{colors.rose-nebel}"
  chip-spalte:
    backgroundColor: "{colors.gebrannte-koralle}"
    textColor: "{colors.papierweiss}"
    typography: "{typography.meta}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  chip-bpsa:
    backgroundColor: "{colors.bpsa-navy-chip}"
    textColor: "{colors.papierweiss}"
    typography: "{typography.meta}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  card-event:
    backgroundColor: "{colors.papierweiss}"
    textColor: "{colors.tiefe-tinte}"
    rounded: "{rounded.2xl}"
    padding: "24px"
  input:
    backgroundColor: "{colors.papierweiss}"
    textColor: "{colors.tiefe-tinte}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
    height: "40px"
  nav-link:
    textColor: "{colors.gedaempfte-tinte}"
    typography: "{typography.label}"
  nav-link-active:
    textColor: "{colors.himbeer-pink}"
---

# Design System: PSNG – Psychedelic Student Network Germany

<!-- Ist-Stand auf Branch `astro`, abgeleitet aus dem Code vom 09.11.2026. Referenz vor dem Refinement auf `redesign`. -->

## Overview

<!-- North Star am 09.11.2026 aus Lennerts Antwort abgeleitet: „einerseits ein Studi-NETZWERK innerhalb DE (kartografisch darstellbar), andererseits seriöse Forschung und Community (Hörsaal)“. Der Name ist eine Synthese und kann noch umbenannt werden. -->
**Creative North Star: "Das Netz der Hörsäle"**

Das Leitbild hat zwei Seiten. Zum einen ist das PSNG ein Netz von Studierenden quer durch Deutschland, also etwas, das man kartografisch zeigen kann (eine Deutschlandkarte der PSNG-Gruppen ist als Idee vorgemerkt). Zum anderen findet es im Hörsaal statt: seriöse Forschung, Lectures, eine Community, die zuhört und diskutiert. Beides soll man der Gestaltung ansehen. Das Netz zeigt sich in Verbindungen, Orten und Städten, der Hörsaal in ruhiger, lesbarer, wissenschaftlicher Ordnung. Dekoration für sich allein gehört nicht dazu.

Im Ist-Zustand ist davon erst die Hälfte da. Die Seite wirkt wie die Aushangwand eines gut geführten Instituts, das seine Türen aufgemacht hat: weißes Papier, eine dunkle, leicht ins Rosé gezogene Tinte, ein klares Himbeer-Pink als einzige Signalfarbe und ein warmer Verlauf von Himbeer über Koralle, der nur dort auftaucht, wo die Seite etwas von einem will (Beitritt, Anmeldung, Footer). Die Gestaltungsklassen der Startseite stammen tatsächlich aus einem Prototyp unter `/lab`; der Name beschreibt, was im Code schon steht. Die Atmosphäre lebt von einem einzigen Bild, dem Hero-Hintergrund mit weißen, verzweigten Silhouetten (Myzel, Neuronen, Korallen) auf einem Nebel aus Pink und Koralle.

Die Dichte ist mittel bis luftig. Inhalte stehen in einem zentrierten Container auf Weiß, Abschnitte trennen sich über einen hauchzarten Pink-Schleier (Himbeer-Pink bei 5 % Deckkraft) statt über Linien oder Schatten. Typografisch trägt Space Grotesk mit ihren technisch-geometrischen Formen die Überschriften, Knöpfe und Daten, DM Sans den Lesetext. Lange Texte (Abstracts, Bios, Beschreibungen) werden vollständig gezeigt, nicht gekürzt.

Der Bestand trägt noch sichtbar die Herkunft aus einem shadcn-Grundgerüst: Die Farbrollen (`primary`, `muted`, `accent`, `sidebar-*`) und die Formular-Bausteine in `src/components/ui/` sind dessen Standard, nur pink eingefärbt. Das ist Ist-Zustand, kein Leitbild; siehe „Im Bestand, nicht kanonisch“ am Ende.

**Key Characteristics:**
- Weißes Papier, rosé getönte Tinte, Himbeer-Pink als einzige Akzentfarbe für Text und Zustände.
- Der Himbeer-Koralle-Verlauf ist für Handlungsaufforderungen und den Footer reserviert.
- Space Grotesk für alles, was strukturiert (Überschriften, Knöpfe, Daten, Navigation); DM Sans für alles, was gelesen wird.
- Flach im Ruhezustand, Schatten nur als Antwort auf Hover oder für den nächsten Termin.
- Großzügig gerundete Flächen (12 bis 16px), Chips als Pillen.
- Partnerinhalte (BPSA, PARAB) tragen eine eigene, fremde Farbachse und werden nicht in die PSNG-Töne übersetzt.

## Colors

Eine warme, einachsige Palette: Weiß und rosé gestimmte Neutraltöne, darauf Himbeer-Pink als Stimme und Koralle als Wärmeträger im Verlauf.

### Primary
- **Himbeer-Pink** (hsl(339 63% 48%)): Die Arbeitsfarbe. Textlinks, aktive Navigation, Speaker-Namen, Datumsmonat, Nummerierungen, Fokusring, Rahmen des Sekundärknopfs (30 % Deckkraft) und der Abschnittsschleier (5 %). Kontrast auf Weiß 5,3:1, deshalb auch für kleinen Text zulässig.
- **Marken-Pink** (hsl(339 68% 54%)): Die hellere, dekorative Fassung. Lebt nur im Leuchten unter dem nächsten Termin (30 % Deckkraft). Unter weißer Schrift zu schwach (4,4:1), deshalb nie als Fläche für Text.

### Secondary
- **Gebrannte Koralle** (hsl(15 80% 44%)): Füllung der Spalten-Chips (Vortrag, Community) unter weißer Schrift. Bewusst auf 44 % Helligkeit abgesenkt, damit 4,8:1 erreicht wird.
- **Koralle** (hsl(5 78% 65%)): Die Markenkoralle in ihrer hellen Fassung. Nur dekorativ, unter Text nicht tragfähig (3,1:1).

### Tertiary
- **Der Verlauf** (Verlauf-Himbeer hsl(339 68% 48%), Verlauf-Koralle hsl(5 78% 46%), Verlauf-Rosé hsl(350 70% 48%), 135°): Füllung der Primärknöpfe, des WhatsApp-Knopfs in der Navigation und des gesamten Footers. Jeder Stopp hält mindestens 5,1:1 gegen Weiß.
- **BPSA-Achse** (BPSA-Navy #071030, Chip-Navy #1b2c6b, BPSA-Cyan #47cddb, BPSA-Violett #8f49b9): Fremde Markenfarben, absichtlich in Hex gehalten, damit sie exakt bleiben. Nur für Kennzeichnung von BPSA-Inhalten: Chip mit Verlaufsrahmen, Kooperationsleiste am Kartenfuß.

### Neutral
- **Papierweiß** (hsl(0 0% 100%)): Seitengrund, Karten, Popover. Weiß und Kartenfarbe sind identisch; Karten heben sich nur über die Linie ab.
- **Tiefe Tinte** (hsl(340 20% 15%)): Fließtext und Überschriften. Fast schwarz, minimal ins Rosé gezogen. Dient außerdem als Fläche der dunklen Abschluss-CTA und des PARAB-Chips.
- **Gedämpfte Tinte** (hsl(340 10% 45%)): Sekundärtext, Metadaten, inaktive Navigation (5,2:1 auf Weiß).
- **Rosé-Nebel** (hsl(340 20% 96%)): Hintergrund von Bildplatzhaltern, Sprachumschalter, Filterleiste, Hinweisboxen.
- **Rosé-Linie** (hsl(340 15% 90%)): Alle Rahmen und Trennlinien, auch Eingabefelder.
- **Warnrot** (hsl(0 84.2% 60.2%)): Abgesagt/verschoben, Formularfehler. Meist als 5- bis 30-%-Tönung.

### Named Rules
**The Eine-Stimme Rule.** Himbeer-Pink ist die einzige Farbe, in der Text hervorgehoben wird. Koralle spricht nie allein, sie erscheint als Chip-Fläche oder im Verlauf.

**The Verlauf-heißt-Handeln Rule.** Der Himbeer-Koralle-Verlauf markiert eine Handlung (Beitreten, Anmelden, Absenden) oder den Footer. Eine Fläche mit Verlauf, die nichts auslöst, gibt es nicht.

**The Fremde-Marke-bleibt-fremd Rule.** Partnerfarben werden exakt (Hex) übernommen und nur zur Kennzeichnung von Partnerinhalten eingesetzt, nie in PSNG-Flächen gemischt.

## Typography

**Display Font:** Space Grotesk (mit sans-serif), selbst gehostet in 400, 500, 600, 700 (300 wird geladen, aber nicht genutzt)
**Body Font:** DM Sans (mit sans-serif), 400, 500, 700 und 400 kursiv

**Character:** Space Grotesk gibt Überschriften und Zahlen einen leicht technischen, laborhaften Zug; DM Sans bleibt im Lesetext neutral und freundlich. Die Paarung wirkt sachlich, ohne kühl zu sein.

### Hierarchy
- **Display** (700, 2rem bis 3,5rem, Zeilenhöhe 1,1): Nur die H1 im Hero der Startseite. Unterseiten-H1 (Events, Event-Detail) nutzen 700, 1,875rem bis 3rem.
- **Headline** (700, 1,875rem, ab md 2,25rem): Abschnittsüberschriften der Startseite.
- **Title** (600, 1,125 bis 1,25rem, Zeilenhöhe eng): Karten- und Schrittüberschriften, H2 auf der Event-Detailseite. Im Hero-Kartenkopf 700 bis 1,5rem.
- **Body** (400, 1rem, Zeilenhöhe 1,625; Einleitungen 1,125rem): Lesetext. In Karten meist 0,875rem. Lange Texte maximal 70ch breit.
- **Label** (Space Grotesk 500, 0,875rem): Knöpfe, Navigation, Filter, Textlinks.
- **Meta** (DM Sans 500, 0,75rem): Chips, Datumsangaben, Kleingedrucktes. Die großen Tageszahlen der Datumsschiene setzen Space Grotesk 700 in 1,875rem, Zeilenhöhe 1.

### Named Rules
**The Struktur-gegen-Lesen Rule.** Space Grotesk für alles, was gliedert oder bedient (Überschriften, Knöpfe, Daten, Navigation); DM Sans für alles, was gelesen wird. Die Grenze verläuft nach Funktion, nicht nach Größe.

**The Kein-Hurenkind Rule.** Überschriften (h1 bis h3) setzen `text-wrap: balance`, Absätze, Listen und Definitionen `text-wrap: pretty`. Global, nicht pro Komponente.

## Layout

Ein zentrierter Container (maximal 1400px ab 2xl) mit 16px Seitenrand auf dem Handy und 24px ab sm. Unterseiten verengen den Inhalt zusätzlich auf 64rem bis 72rem (Event-Übersicht, Event-Detail), Einleitungen und FAQ auf 42rem bis 48rem.

Abschnitte der Startseite stehen mit 64px (ab md 96px) Innenabstand oben und unten, abwechselnd auf Weiß und auf dem 5-%-Pink-Schleier. Unterseiten beginnen mit 128px (ab md 160px) Kopfabstand, weil die Navigation fixiert über dem Inhalt liegt; Anker springen mit 6rem Versatz.

Zweispaltigkeit erscheint ab lg und ist asymmetrisch: Hero 1,05 zu 0,95, Agenda 0,8 zu 1,2, Event-Detail Inhalt plus 17rem-Seitenleiste ab md. Kartenreihen werden auf dem Handy zu horizontal scrollenden Streifen mit Einrasten (78 % Kartenbreite), ab sm zu Rastern mit 2 bzw. 4 Spalten.

Die Event-Übersicht ist eine Zeitleiste: eine 1px-Linie in Rosé-Linie, links eine 6,5rem-Datumsspalte (ab md), eine „Heute“-Markierung in Himbeer-Pink trennt Kommendes von Vergangenem.

Bewegung ist zurückhaltend: Der Hero hebt sich um 20px an (0,5s ease-out, nur `transform`, nie `opacity`), Abschnitte blenden beim Hereinscrollen in 0,6s um 24px ein. Bei reduzierter Bewegung entfällt alles.

### Named Rules
**The Lesbar-ohne-Animation Rule.** Keine Animation darf Inhalt unsichtbar zurücklassen, wenn sie nicht läuft. Startzustände sind sichtbar, eingeblendet wird nur, was ein Skript selbst versteckt hat.

## Elevation & Depth

Das System ist im Ruhezustand flach. Tiefe entsteht über Tonwerte (Weiß gegen Rosé-Nebel, der 5-%-Pink-Schleier hinter Abschnitten) und über die 1px-Linie in Rosé-Linie. Schatten treten als Reaktion auf: Karten und FAQ-Einträge heben sich beim Hover. Die einzige Ausnahme im Ruhezustand ist der nächste anstehende Termin, der ein rosafarbenes Leuchten trägt. Die Navigation liegt als halbtransparente, weichgezeichnete Leiste über dem Inhalt.

### Shadow Vocabulary
- **Hover-Anhebung** (`box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`): Karten, Kontaktkarten, FAQ-Einträge beim Hover.
- **Ruhekante** (`box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)`): Aktiver Sprachknopf, geöffneter FAQ-Eintrag, Speaker-Thumbnail.
- **Nächster-Termin-Leuchten** (`filter: drop-shadow(0 6px 14px hsl(var(--pink) / 0.3))`): Nur die Karte des nächsten Termins (Hero-Karte, Zeitleiste). Als `drop-shadow` auf dem Kind, damit es den Rundungen folgt.
- **Glasleiste** (`background: hsl(0 0% 100% / 0.85); backdrop-filter: blur(20px); border-bottom: 1px solid Rosé-Linie`): Ausschließlich die fixierte Navigation und ihr Handy-Menü.

### Named Rules
**The Flach-bis-berührt Rule.** Flächen liegen flach. Ein Schatten antwortet auf den Zeiger; das Pink-Leuchten des nächsten Termins ist die einzige Ausnahme und bleibt einzig.

## Shapes

Weiche, großzügige Rundungen ohne harte Ecken. Der Basisradius ist 12px (`--radius: 0.75rem`); dadurch sind die Stufen „lg“ und „xl“ im Bestand gleich groß. Große Container (Eventkarten, Hero-Karte, Schritt-Raster, Team-Block, Abschluss-CTA) runden mit 16px, kleinere Boxen (FAQ, Seitenleiste, Hinweise, Video) mit 12px, Fotos in der Galerie mit 12px. Chips, Filterleiste, Sprachumschalter, Avatare und Pfeil-Knöpfe sind voll rund. Das Logo sitzt in einem Kreis mit 1px-Rahmen.

Rahmen sind durchgehend 1px in Rosé-Linie, teils auf 60 % gedämpft. Eine Ausnahme ist die 2px-Oberkante (Himbeer-Pink bei 40 %) über den Glaubwürdigkeitspunkten der Startseite. Raster aus Schritten werden als Haarlinien-Raster gebaut: 1px Abstand auf Linienfarbe, Zellen in Weiß.

Bilder stehen in festen Formaten: Eventkarte 40:21, Archivkarte und Galerie 4:3, Aufzeichnung 16:9. Fotos werden nur beschnitten (`object-cover`), nie farblich verändert.

## Components

### Buttons
Kräftig, flächig, ohne Effekte außer einem leichten Abblenden.
- **Shape:** sanft gerundet (12px), Text nie umbrechend.
- **Primary:** Himbeer-Koralle-Verlauf, weiße Schrift in Space Grotesk 500, 0,875rem, Innenabstand 12px × 24px. In der Navigation 8px × 16px, auf dem Handy 36px hoch mit 0,75rem.
- **Hover / Focus:** Hover blendet auf 90 % Deckkraft. Fokus über den globalen Ring: 2px Himbeer-Pink, 2px Versatz, nur bei Tastaturfokus.
- **Secondary:** Weiß bei 60 % auf transparentem Grund, 1px Rahmen in Himbeer-Pink bei 30 %, Schrift Himbeer-Pink. Hover legt einen 5-%-Pink-Schleier unter.
- **Invertiert (auf dunkler oder Verlaufsfläche):** auf Tiefe Tinte ein Umriss in Weiß bei 30 %; im Footer ein weißer Knopf mit Himbeer-Schrift. Beide existieren nur inline (siehe unten).

### Chips
- **Style:** Pillen (voll rund), 0,75rem DM Sans 500, Innenabstand 2px × 10px.
- **Varianten:** Spalte (Gebrannte Koralle, weiße Schrift), Status (Himbeer-Pink bei 10 % mit Himbeer-Schrift; Warnrot bei 10 % mit Warnrot-Schrift), Highlight (Verlauf), BPSA (Chip-Navy mit Cyan-Violett-Verlaufsrahmen), PARAB (Tiefe Tinte).

### Cards / Containers
- **Corner Style:** 16px für Eventkarten und große Container, 12px für Neben-Boxen.
- **Background:** Papierweiß; Platzhalter- und Hinweisflächen in Rosé-Nebel (teils bei 40 %).
- **Shadow Strategy:** flach, Hover-Anhebung (siehe Elevation & Depth); Bild im Archiv skaliert beim Hover auf 103 % in 0,5s.
- **Border:** 1px Rosé-Linie.
- **Internal Padding:** 20px (Archivkarte, Hero-Karte mobil), 24px (Eventkarte, Hero-Karte ab md), 32px (Schritte ab md, Kontaktformular).

### Inputs / Fields
- **Style:** 40px hoch, 1px Rosé-Linie, weißer Grund, 10px Radius, 8px × 12px Innenabstand, Platzhalter in Gedämpfter Tinte.
- **Focus:** Ring in Himbeer-Pink mit 2px Versatz (zusätzlich zum globalen Fokusring).
- **Error / Disabled:** Fehlertext in Warnrot unter dem Formular; deaktiviert bei 50 % Deckkraft.

### Navigation
- **Style:** fixierte Glasleiste am oberen Rand, Logo im Kreis links, „PSNG“ in Space Grotesk 700 Himbeer-Pink ab sm.
- **Links:** Space Grotesk 500, 0,875rem, Gedämpfte Tinte; Hover und aktive Seite in Himbeer-Pink. Externe Ziele tragen ein 13px-Symbol für externen Link.
- **Sprachumschalter:** Pillengruppe auf Rosé-Nebel, aktive Sprache als weiße Pille mit Ruhekante und Himbeer-Schrift. Keine Flaggen.
- **Mobil:** Der WhatsApp-Knopf bleibt sichtbar, der Rest klappt ohne Animation in ein Glaspanel.

### Datumsschiene (Signature Component)
Termine stehen links von ihrem Inhalt als gestapelte Datumsmarke: Wochentag (0,75rem, Versalien, Gedämpfte Tinte), Tageszahl (Space Grotesk 700, 1,875rem, Zeilenhöhe 1), Monat (0,75rem, Versalien, Himbeer-Pink). Auf der Startseite in einer durch Haarlinien getrennten Liste, auf der Event-Seite als Spalte einer Zeitleiste.

### Kooperationsleiste (Signature Component)
Am Fuß von Eventkarten mit Partnerbeteiligung: 2px Oberkante in BPSA-Cyan, darunter ein Verlauf, der links weiß bleibt (dort sitzt das Partnerlogo) und nach rechts über Cyan in Violett läuft.

## Do's and Don'ts

### Do:
- **Do** Himbeer-Pink (hsl(339 63% 48%)) für jede Texthervorhebung, jeden Link und den Fokusring verwenden.
- **Do** den Verlauf nur auf Handlungen und den Footer legen und darunter ausschließlich weiße Schrift setzen.
- **Do** für weiße Schrift auf farbiger Fläche die abgesenkten Töne nehmen (Gebrannte Koralle, Verlaufsstopps), nie Marken-Pink, Koralle, Rosé oder Lachs.
- **Do** Partnerfarben exakt in Hex übernehmen und nur für Partnerinhalte einsetzen.
- **Do** Karten flach mit 1px Rosé-Linie bauen und Schatten erst beim Hover zeigen.
- **Do** Fotos groß und unverändert zeigen; Code darf nur Ausschnitt und Format bestimmen.
- **Do** lange Texte vollständig setzen, maximal 70ch breit.
- **Do** Animationen nur über `transform` laufen lassen und bei reduzierter Bewegung abschalten.

### Don't:
- **Don't** das Logo (`public/psng-logo.png`) verändern, umfärben oder neu zeichnen.
- **Don't** Himbeer-Pink und Koralle durch eine andere Hauptfarbe ersetzen; sie sind die Identität.
- **Don't** Koralle (hsl(5 78% 65%)) oder Marken-Pink (hsl(339 68% 54%)) als Fläche unter Text einsetzen.
- **Don't** BPSA-Farben in PSNG-Flächen mischen oder in HSL umrechnen.
- **Don't** Zeitleiste und Datumsschiene durch Karten ohne Datum ersetzen.

### Im Bestand, nicht kanonisch
Diese Muster stehen im heutigen Code, sind aber Defekte aus der früheren Kritik oder Restbestand. Sie werden nicht als Regel für neue Flächen übernommen.
- **Stock-shadcn mit pinker Einfärbung:** Farbrollen und Formular-Bausteine sind shadcn-Standard (`src/index.css:7-44`, `src/components/ui/*.tsx`), dazu ungenutzte `sidebar-*`-Tokens (`src/index.css:75-82`) und ein kühl-blaues `destructive-foreground` (`210 40% 98%`).
- **Eyebrow über jeder Überschrift:** Klasse `eyebrow` (`src/components/astro/home/styles.ts:12`), eingesetzt in `HomePage.astro:113, 152, 180, 268, 333, 362`, als Nachbau in `EventsPage.astro:64` und `ContactSection.tsx:95`, als Kartenkopf in `HeroCard.astro:57`.
- **Gradient-Text:** `.gradient-text` (`src/index.css:302-307`) auf dem Akzentwort der Hero-H1 (`HomePage.astro:115`).
- **Gleichförmiger Abschnittsrhythmus mit Kartenrastern:** jeder Abschnitt der Startseite mit `py-16 md:py-24`, abwechselnd Weiß und Pink-Schleier, jeweils Eyebrow, Titel, Raster (`HomePage.astro:149, 177, 264, 330, 359`).
- **Zwei Button-Systeme:** die Klassen `primaryButton`/`secondaryButton` (`src/components/astro/home/styles.ts:6-10`) für alle Astro-Seiten und die shadcn-`Button`-Komponente mit cva-Varianten (`src/components/ui/button.tsx:7-31`, Radius 10px, Füllung Primary), die nur im Kontaktformular vorkommt und dort per Klasse auf den Verlauf überschrieben wird (`ContactSection.tsx:201-205`). Dazu inline nachgebaute Knöpfe: `SiteNav.tsx:134, 151`, `EventCard.astro:159`, `Footer.astro:53`, `HomePage.astro:429`.
- **`→`-Glyphen als Pfeil-Icon:** in Linktexten (`HomePage.astro:248`, `EventCard.astro:169, 176`, `PartnerStrip.astro:38`, `HighlightCard.astro:143`, `leitfaden.astro:482`, `en/guide.astro:554`) und in rund 23 Strings in `src/i18n/copy.ts` (z. B. Zeilen 161, 172, 207, 423, 480).
- **✨ als Icon:** `firstEvent` in `src/i18n/copy.ts:183, 740`, angezeigt in `HighlightCard.astro:77` auf einem Amber-Chip außerhalb der Palette.
