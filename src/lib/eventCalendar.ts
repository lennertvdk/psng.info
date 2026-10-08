import {
  getEventAnchor,
  parseTimeRange,
  type PsngEvent,
  type SeriesDate,
} from "@/data/events";
import type { CalendarEvent } from "@/lib/calendar";
import type { Copy } from "@/i18n/copy";
import { SITE_URL } from "@/i18n/head";
import type { Locale } from "@/i18n/locale";
import { pick } from "@/i18n/localized";
import { pathFor } from "@/i18n/routes";

/*
 * Aus EventsSection.tsx hierher gezogen, damit auch die Vorschauseite /lab
 * dieselben Kalendereinträge baut – ein Termin soll im Kalender gleich
 * aussehen, egal von welcher Seite aus man ihn anlegt.
 */

/** Die Karte selbst, als Adresse – sie steht im Kalendereintrag. */
function cardUrl(locale: Locale, anchor: string): string {
  return `${SITE_URL}${pathFor("home", locale)}#${anchor}`;
}

/**
 * Was von einem Event in den Kalender wandert.
 *
 * Nichts wird dafür neu erfunden: Titel, Ort und Beschreibung stehen so im
 * Eintrag, wie sie auf der Karte stehen, und die Uhrzeit liest derselbe
 * Parser wie bei den strukturierten Daten. Dazu die Adresse der Karte – in
 * zwei Wochen weiß sonst niemand mehr, woher der Termin kam.
 *
 * Ohne Rückgabe für Termine, die keinen Eintrag bekommen (siehe `noCalendar`).
 */
export function calendarEntry(
  event: PsngEvent,
  locale: Locale,
  c: Copy,
): CalendarEvent | undefined {
  if (event.noCalendar) return undefined;
  const { start, end } = parseTimeRange(pick(event.time, locale));
  const registration = event.registrationUrl
    ? `${pick(event.registrationLabel, locale) ?? c.events.register}: ${
        event.registrationUrl
      }`
    : undefined;
  return {
    id: getEventAnchor(event),
    title: pick(event.title, locale),
    date: event.date,
    endDate: event.endDate,
    startTime: start,
    endTime: end,
    location: pick(event.location, locale),
    description:
      [pick(event.description, locale), registration].filter(Boolean).join("\n\n") ||
      undefined,
    url: cardUrl(locale, getEventAnchor(event)),
  };
}

/**
 * Dasselbe für einen Reihentermin. Thema und Speaker fehlen hier noch – der
 * Eintrag hält den Abend frei, und der Hinweis dazu sagt, was noch kommt.
 */
export function seriesCalendarEntry(
  series: SeriesDate,
  locale: Locale,
  c: Copy,
): CalendarEvent {
  const { start, end } = parseTimeRange(series.time);
  return {
    id: series.id,
    title:
      series.labelKey === "semesterStart"
        ? c.events.seriesSemesterLabel
        : c.events.seriesLabel,
    date: series.date,
    startTime: start,
    endTime: end,
    location: series.location,
    description: c.events.seriesNote,
    url: cardUrl(locale, "events"),
  };
}
