# psng.info

Website des **Psychedelic Student Network Germany (PSNG)**: https://psng.info

Gebaut mit [Astro](https://astro.build) als statische Seite. Interaktive Teile wie das Kontaktformular sind React-Inseln. Gestaltet ist alles mit Tailwind CSS. Die Seite ist zweisprachig: Deutsch unter `/`, Englisch unter `/en`. Gehostet wird sie auf Vercel.

## Loslegen

Voraussetzung ist Node.js 22 oder neuer mit npm.

```sh
npm install
npm run dev        # http://localhost:8080
```

| Befehl | Zweck |
|---|---|
| `npm run build` | baut die fertige Seite nach `dist/` |
| `npm run preview` | zeigt den Build lokal an |
| `npm test` | startet die Tests (Vitest) |
| `npm run check` | prüft die Typen (`astro check`) |
| `npm run lint` | startet ESLint |
| `node scripts/check-deploy.mjs <url>` | prüft eine ausgelieferte Seite: Status, Weiterleitungen, Sitemap, Kalender |

## Inhalte pflegen

Die meisten Änderungen brauchen keinen Code, nur YAML-Dateien in `src/content/`:

- **`events/<slug>/event.yaml`**: eine Veranstaltung. Bilder liegen im selben Ordner. Ein neuer Ordner ergibt automatisch eine eigene Seite, einen Eintrag auf `/events`, im Kalender `/events.ics` und in der Sitemap.
- **`team/`, `partners/`, `milestones/`, `features/`**: Team, Partner, Meilensteine, Presse und Auftritte.

Seitentexte und Übersetzungen stehen in `src/i18n/copy.ts`.

Die Startseite zeigt „nächste Termine“ zum Zeitpunkt des Builds. Deshalb baut eine GitHub Action (`.github/workflows/daily-rebuild.yml`) die Seite jede Nacht neu.

## Aufbau

- `src/pages/`: die Routen. Eine Datei ergibt eine Seite, `en/` enthält die englischen Seiten.
- `src/components/astro/`: Seitenbausteine (Start, Events, Über uns, Inhaltsverzeichnis).
- `src/components/`: React-Inseln und `ui/`-Bausteine.
- `src/layouts/`: Grundgerüst und Layout für Textseiten.
- `src/lib/`: Logik für Termine, Kalender, SEO/JSON-LD und Links, jeweils mit Tests.
- `api/`: Vercel-Funktionen (Kontaktformular über smtp2go, WhatsApp-Weiterleitung).
- `scripts/`: Bildoptimierung und Deploy-Prüfung.
- `design/`: Grafiken für Social Media und Print. Sie werden nicht ausgeliefert.
- `PRODUCT.md` und `DESIGN.md`: Zielgruppe, Ton und Designsystem, die Grundlage für Designarbeit.

## Deployment

Ein Push auf `main` geht live, andere Branches bekommen eine Vorschau-URL von Vercel. Weiterleitungen, zum Beispiel von alten Event-Slugs, stehen in `vercel.json`.
