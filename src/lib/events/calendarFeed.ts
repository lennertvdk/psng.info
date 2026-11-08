import { toIcsCalendar, type CalendarEvent } from "@/lib/calendar";
import { copy } from "@/i18n/copy";
import { calendarEntry, seriesCalendarEntry } from "./calendarEntry";
import { getUpcomingSeriesDates } from "./schedule";
import { LECTURE_SERIES } from "./series";
import type { SiteEvent } from "./types";

/** Name des abonnierbaren Kalenders. */
export const CALENDAR_FEED_NAME = "PSNG – Veranstaltungen";

/**
 * Der abonnierbare Kalender hinter /events.ics: dieselben Einträge wie bei
 * „Zum Kalender hinzufügen“ (`calendarEntry`, `toIcsCalendar`), nur alle auf
 * einmal. Wer keinen Eintrag bekommt (ohne feste Uhrzeit, abgesagt, verschoben,
 * fremde Konferenz), steht auch hier nicht drin. Berechnete Reihentermine nur,
 * solange die Seite sie zeigt (`LECTURE_SERIES.placeholders`).
 */
export function buildCalendarFeed(events: SiteEvent[], now: Date = new Date()): string {
  const c = copy.de;
  const entries: CalendarEvent[] = events
    .map((e) => calendarEntry(e, "de", c))
    .filter((e): e is CalendarEvent => Boolean(e));
  if (LECTURE_SERIES.placeholders) {
    entries.push(...getUpcomingSeriesDates(events, 12, now).map((s) => seriesCalendarEntry(s, "de", c)));
  }
  entries.sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
  return toIcsCalendar(entries, now, CALENDAR_FEED_NAME);
}
