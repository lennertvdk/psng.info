# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primär: Studierende an deutschen Hochschulen, vor allem aus Psychologie und Medizin, dazu Forschende und wissenschaftlich Interessierte an Psychedelika-Forschung in Deutschland. Ein studentischer Status ist keine Voraussetzung, der Fokus liegt aber klar auf dem akademischen Kontext.

Typische Situationen:

- jemand hat vom PSNG gehört (Instagram, WhatsApp, Hörsaal) und prüft, ob das seriös ist und wie man mitmacht;
- jemand will zu einer Lecture und braucht Termin, Ort, Sprache und den Weg zum Zoom-Link;
- jemand will an der eigenen Hochschule eine Gruppe gründen und sucht Anleitung und Kontakt;
- Speaker:innen, Partnerorganisationen und Hochschulen prüfen, ob das PSNG ein ernstzunehmendes Gegenüber ist.

Die Seite ist zweisprachig, Deutsch ist die Quelle, Englisch folgt (`/en/...`).

## Product Purpose

psng.info ist die Website des **Psychedelic Student Network Germany (PSNG)**, Deutschlands erstem bundesweiten studentischen Netzwerk für psychedelische Wissenschaft, aktiv seit März 2026. Sie macht das Netzwerk auffindbar und glaubwürdig, kündigt Lectures und Events an, archiviert sie mit Aufzeichnungen und Fotos und hilft beim Gründen von Hochschulgruppen.

Erfolg heißt (von Lennert bestätigt):

- **WhatsApp-Beitritt:** Besucher:innen treten der Community bei. Über sie laufen Ankündigungen und die Zoom-Links.
- **Glaubwürdigkeit:** Speaker:innen, Partner und Hochschulen nehmen das PSNG ernst.
- **Gruppengründung:** Studierende gründen eine Hochschulgruppe oder treten einer bei (Leitfaden, Kontakt).
- **Lernen, was interessiert:** Es soll sichtbar sein, welche Inhalte und Knöpfe die Audience nutzt. GoatCounter zählt Klicks ohne Cookies (`src/scripts/track.ts`), `/whatsapp` zählt Beitritte serverseitig (`api/whatsapp.ts`). Gutes UX ist dafür die Voraussetzung.

## Positioning

Das einzige bundesweite, studentisch organisierte Netzwerk für psychedelische Wissenschaft in Deutschland, nach dem Vorbild von SPSN (Schweiz) und UNePSI (Italien) und mit beiden in Kooperation. Es verbindet lokale Hochschulgruppen, statt selbst eine zu sein. Getragen wird es von Psychologie- und Medizinstudierenden aus Berlin, Essen und Wuppertal.

## Operating Context

- **Lectures sind PSNG-Lectures.** Einmal im Monat, mit Input aus der Community (Abschlussarbeiten, Paper, eigene Projekte) und von eingeladenen Expert:innen. Lokale Hochschulgruppen können ihre Lectures zusätzlich ins Netzwerk streamen. Mit der BPSA (Berlin Psychedelic Science Association) passiert das bereits, mit weiteren Gruppen vermutlich mit der Zeit. Eine Lecture also nie als „Lecture der BPSA, vom PSNG nur gestreamt“ beschreiben.
- **Zoom-Links** gibt es nicht über ein Anmeldeformular. Sie werden kurz vorher in der WhatsApp-Community und auf Instagram geteilt.
- Events sind hybrid, online oder vor Ort (meist Berlin, z. B. HU Berlin), kostenlos und offen für alle. Auf Deutsch oder Englisch.
- Nach dem Event: YouTube-Aufzeichnung (nicht immer), Fotos, Zahlen (Teilnehmende, Bewertung), Folien und Weiterlesen-Links.
- Weitere Kanäle: Instagram, LinkedIn, YouTube, Medien-Blog unter medien.psng.info, Kontaktformular (smtp2go), kontakt@psng.info.

## Capabilities and Constraints

- Seiten: Startseite, `/events`, `/events/<slug>`, `/ueber-uns`, `/leitfaden`, `/code-of-conduct`, Impressum, Datenschutz, 404, `events.ics`, jeweils mit englischer Fassung, wo es sie gibt.
- Events, Team, Partner, Features und Meilensteine liegen als YAML-Content-Collections in `src/content/`, ein Ordner pro Eintrag. Das Format bleibt Decap-tauglich, Decap CMS kommt aber erst um April 2027.
- Pflege vorerst nur durch Lennert.
- Astro 7 mit React-Inseln, Tailwind 3, Hosting auf Vercel, tägliche Neuerstellung per Deploy Hook.
- Für die Lecture-Reihe zählen nur eingetragene Events. Berechnete Platzhaltertermine sind aus (`LECTURE_SERIES.placeholders`).
- Ein Code of Conduct gilt für das Netzwerk und alle Lokalgruppen: wissenschaftsbasiert, kein Substanzkonsum oder -verkauf, keine therapeutischen Angebote.
- Migration: Die Astro-Fassung (Branch `astro`) geht zuerst mit dem jetzigen Design live. Danach folgt ein Refinement auf Branch `redesign`.

## Brand Commitments

- Name: **Psychedelic Student Network Germany (PSNG)**. Nicht „Science Network“.
- Ton: seriös-wissenschaftlich, offen, nicht esoterisch. Duzen, gendergerechte Sprache (`Student*in`, `Expert:innen`).
- **Das Logo bleibt unverändert** (`public/psng-logo.png`).
- Für das Refinement auf `redesign` ist festgelegt: Identität und Farben (Himbeer-Pink, Koralle) bleiben erkennbar.
- „Sieht zu sehr nach KI aus“ ist für Lennert ein K.-o.-Kriterium.
- Lennert mag große Event-Fotos und volle Texte statt magerer Karten.
- Fotos werden nicht automatisch farblich angeglichen. Bildbearbeitung macht Lennert selbst, Code darf nur Ausschnitt und Geometrie anfassen.

## Evidence on Hand

- Kennzahlen aus der Copy: 250+ Studierende, 13+ Städte, aktiv seit März 2026.
- 14 Events mit Daten in `src/content/events/`, viele mit Fotos, Speaker-Bios, Abstracts, Aufzeichnungen und Zahlen (Teilnehmende, Bewertung, Weiterempfehlung).
- Team mit fünf Personen und Portraits (`src/content/team/`), Teamfoto „Team 2026 im August“.
- Zehn Partnerorganisationen mit Logos (`src/content/partners/`), darunter SPSN, UNePSI, BPSA, ALPS und PARAB.
- Leitfaden zur Gruppengründung samt Curriculum (`src/pages/leitfaden.astro`, `src/data/curriculum.ts`).
- Es gibt keine Testimonials, Pressestimmen oder Zitate. Nichts davon erfinden.

## Product Principles

1. **Glaubwürdigkeit vor Begeisterung.** Wissenschaftliche Seriosität ist das Kapital des Netzwerks. Nichts darf esoterisch, nach Szene oder nach Werbung wirken.
2. **Echte Inhalte tragen die Seite.** Fotos, Aufzeichnungen, Bios und Abstracts vergangener Events sind der beste Beleg und gehören groß und vollständig gezeigt.
3. **Ein klarer Weg hinein.** Der WhatsApp-Beitritt ist der zentrale Einstieg. Gruppengründung und Lecture-Teilnahme bauen darauf auf.
4. **Netzwerk statt Einzelgruppe.** Das PSNG verbindet lokale Gruppen. Kooperationen (BPSA, künftige Lokalgruppen, Partner) werden sichtbar gemacht, ohne die Lecture-Reihe als die einer anderen Gruppe darzustellen.
5. **Pflegbar durch eine Person.** Alles muss sich über die Content-Collections pflegen lassen, ohne Code anzufassen.

## Accessibility & Inclusion

Kein formaler Standard festgelegt. Im Code gibt es axe-Prüfungen (`axe-core` in Tests), Skip-Link und Alt-Texte in beiden Sprachen. Ziel ist WCAG 2.2 AA (am 09.11.2026 festgelegt; Lennert hat die Entscheidung an Claude übergeben).
