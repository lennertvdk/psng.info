import { Link } from "react-router-dom";
import AddToCalendar from "@/components/AddToCalendar";
import { ColumnChip, CreditBadge } from "@/components/EventsSection";
import { LECTURE_SERIES } from "@/data/events";
import { calendarEntry, seriesCalendarEntry } from "@/lib/eventCalendar";
import { useCopy } from "@/i18n/copy";
import { intlLocale, pick } from "@/i18n/localized";
import { useLocale } from "@/i18n/locale";
import { type AgendaEntry, LAB_ANCHORS, entryDate, eyebrowClass, homeSection, seriesTitle } from "./shared";

/** Höchstens so viele Termine nach dem im Hero. Mehr steht im Zeitstrahl. */
const MAX_ROWS = 3;

/** Tag und Monat als Block links – damit liest sich die Liste als Kalender. */
function DateBlock({ iso }: { iso: string }) {
  const locale = useLocale();
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const fmt = (opts: Intl.DateTimeFormatOptions) =>
    date.toLocaleDateString(intlLocale(locale), opts);

  return (
    <div className="w-14 shrink-0 text-center" aria-hidden="true">
      <p className="font-heading text-xs font-medium uppercase text-muted-foreground">
        {fmt({ weekday: "short" })}
      </p>
      <p className="font-heading text-3xl font-bold leading-none text-foreground">
        {fmt({ day: "numeric" })}
      </p>
      <p className="font-heading text-xs font-medium uppercase text-primary">
        {fmt({ month: "short" })}
      </p>
    </div>
  );
}

function Row({ entry }: { entry: AgendaEntry }) {
  const c = useCopy();
  const locale = useLocale();

  if (entry.kind === "series") {
    const s = entry.series;
    return (
      <li className="flex gap-5 py-6">
        <DateBlock iso={s.date} />
        <div className="min-w-0 flex-1">
          <p className="sr-only">{entryDate(entry, locale)}</p>
          <div className="mb-2 flex flex-wrap gap-2">
            <ColumnChip column={s.column} />
          </div>
          <h3 className="font-heading text-lg font-semibold text-foreground">{seriesTitle(s, c)}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {s.time} · {s.location}. {c.events.seriesNote}
          </p>
          <div className="mt-3">
            <AddToCalendar event={seriesCalendarEntry(s, locale, c)} subtle />
          </div>
        </div>
      </li>
    );
  }

  const e = entry.event;
  const calendar = calendarEntry(e, locale, c);

  return (
    <li className="flex gap-5 py-6">
      <DateBlock iso={e.date} />
      <div className="min-w-0 flex-1">
        <p className="sr-only">{entryDate(entry, locale)}</p>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <ColumnChip column={e.column} />
          {e.partnerCredit && <CreditBadge credit={e.partnerCredit} />}
        </div>
        <h3 className="font-heading text-lg font-semibold leading-snug text-foreground">
          {pick(e.title, locale)}
        </h3>
        {e.speaker && <p className="mt-1 text-sm font-medium text-primary">{e.speaker}</p>}
        <p className="mt-1 text-sm text-muted-foreground">
          {pick(e.time, locale)}
          {e.location ? ` · ${pick(e.location, locale)}` : ""}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
          {e.registrationUrl && (
            <a
              href={e.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline"
            >
              {pick(e.registrationLabel, locale) ?? c.events.register} →
            </a>
          )}
          {calendar && <AddToCalendar event={calendar} subtle />}
          <Link
            to={homeSection(locale, entry.id)}
            className="text-sm font-medium text-muted-foreground hover:text-primary hover:underline"
          >
            {c.events.learnMore}
          </Link>
        </div>
      </div>
    </li>
  );
}

/**
 * Was nach dem Termin im Hero kommt, aufsteigend und knapp: Datum, Titel,
 * Wer, Wo, eine Handlung. Beschreibungen stehen auf der Startseite – der Link
 * „Mehr erfahren" führt zur vollen Karte.
 */
const NextEvents = ({ entries }: { entries: AgendaEntry[] }) => {
  const c = useCopy();
  const locale = useLocale();
  const rows = entries.slice(0, MAX_ROWS);

  return (
    <section
      id={LAB_ANCHORS.agenda}
      aria-labelledby="lab-agenda"
      className="scroll-mt-20 bg-primary/5 py-16 md:py-24"
    >
      <div className="container mx-auto grid gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className={`${eyebrowClass} mb-3`}>{c.lab.agenda.eyebrow}</p>
          <h2 id="lab-agenda" className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            {c.lab.agenda.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">{c.events.seriesNoteBefore}</span>{" "}
            {c.events.seriesNoteEvery} {LECTURE_SERIES.time} {c.events.seriesNoteClock}{" "}
            {c.events.seriesNoteOn} {LECTURE_SERIES.location}. {c.events.seriesNoteAfter}
          </p>
          <Link
            to={homeSection(locale, "events")}
            className="mt-5 inline-block font-heading text-sm font-medium text-primary hover:underline"
          >
            {c.lab.agenda.all}
          </Link>
        </div>
        {rows.length > 0 && (
          <ol className="divide-y divide-border border-y border-border">
            {rows.map((entry) => (
              <Row key={entry.id} entry={entry} />
            ))}
          </ol>
        )}
      </div>
    </section>
  );
};

export default NextEvents;
