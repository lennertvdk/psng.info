import {
  formatEventDate,
  type getUpcomingAgenda,
  type SeriesDate,
} from "@/data/events";
import type { Copy } from "@/i18n/copy";
import type { Locale } from "@/i18n/locale";
import { pathFor } from "@/i18n/routes";

/**
 * Die Vorschau liegt bewusst außerhalb von i18n/routes.ts: Was dort steht,
 * landet in der Sitemap, in den hreflang-Angaben und im Sprachumschalter der
 * echten Seiten. Die Vorschau soll in nichts davon auftauchen.
 */
export const LAB_PATH: Record<Locale, string> = {
  de: "/lab",
  en: "/en/lab",
};

/** Eine Sektion der echten Startseite – Ziel für alles, was /lab nur anreißt. */
export function homeSection(locale: Locale, hash: string, query = ""): string {
  return `${pathFor("home", locale)}${query}#${hash}`;
}

/** In-Page-Anker der Vorschau. */
export const LAB_ANCHORS = {
  agenda: "termine",
  groups: "gruppen",
} as const;

/*
 * Die zwei Knopfformen der Seite, aus der bestehenden Startseite übernommen.
 * `whitespace-nowrap`: Ein Knopf, der auf dem Handy in zwei Zeilen bricht,
 * liest sich wie zwei Knöpfe.
 */
export const primaryButton =
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg gradient-psychedelic px-6 py-3 font-heading text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90";

export const secondaryButton =
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-primary/30 bg-card/60 px-6 py-3 font-heading text-sm font-medium text-primary transition-colors hover:bg-primary/5";

export const eyebrowClass =
  "font-heading text-xs uppercase tracking-[0.2em] text-primary";

export type AgendaEntry = ReturnType<typeof getUpcomingAgenda>[number];

/** Datum, bei mehrtägigen Terminen bis zum letzten Tag. */
export function entryDate(entry: AgendaEntry, locale: Locale): string {
  if (entry.kind === "series") return formatEventDate(entry.date, locale, true);
  const e = entry.event;
  const start = formatEventDate(e.date, locale, e.showWeekday);
  return e.endDate ? `${start} – ${formatEventDate(e.endDate, locale)}` : start;
}

export function seriesTitle(series: SeriesDate, c: Copy): string {
  return series.labelKey === "semesterStart" ? c.events.seriesSemesterLabel : c.events.seriesLabel;
}
