import { Link } from "react-router-dom";
import AddToCalendar from "@/components/AddToCalendar";
import { ColumnChip, CreditBadge, LanguageNote } from "@/components/EventsSection";
import { formatRelativeToToday, type PsngEvent, type SeriesDate } from "@/data/events";
import { calendarEntry, seriesCalendarEntry } from "@/lib/eventCalendar";
import { WHATSAPP_LINK } from "@/lib/links";
import { useCopy } from "@/i18n/copy";
import { useLocale } from "@/i18n/locale";
import { pick } from "@/i18n/localized";
import { type AgendaEntry, entryDate, homeSection, primaryButton, seriesTitle } from "./shared";

function EventBody({ event }: { event: PsngEvent }) {
  const c = useCopy();
  const locale = useLocale();
  const calendar = calendarEntry(event, locale, c);
  const role = pick(event.partnerCredit?.role, locale);

  return (
    <>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <ColumnChip column={event.column} />
        {event.partnerCredit && <CreditBadge credit={event.partnerCredit} />}
      </div>

      <h3 className="font-heading text-xl font-bold leading-snug text-foreground md:text-2xl">
        {pick(event.title, locale)}
      </h3>

      {event.speaker && (
        <div className="mt-3 flex items-center gap-3">
          {event.assets?.speakerPhoto && (
            <img
              src={event.assets.speakerPhoto}
              alt=""
              width={48}
              height={48}
              decoding="async"
              className="h-12 w-12 shrink-0 rounded-full object-cover"
            />
          )}
          <p className="font-heading text-sm font-medium text-primary">{event.speaker}</p>
        </div>
      )}

      <div className="mt-4 space-y-1 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">{pick(event.time, locale)}</p>
        {event.location && <p>{pick(event.location, locale)}</p>}
      </div>

      {(role || event.language) && (
        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
          {/* Wer die Veranstaltung mitträgt, steht auf der Karte selbst – der
              Satz kommt aus `partnerCredit.role` in den Eventdaten. */}
          {role && <p>{role}</p>}
          <LanguageNote event={event} />
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {event.registrationUrl && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={primaryButton}
          >
            {pick(event.registrationLabel, locale) ?? c.events.register}
          </a>
        )}
        {calendar && <AddToCalendar event={calendar} />}
        {event.websiteUrl && (
          <a
            href={event.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            {pick(event.websiteLabel, locale) ?? c.events.learnMore} →
          </a>
        )}
      </div>
    </>
  );
}

function SeriesBody({ series }: { series: SeriesDate }) {
  const c = useCopy();
  const locale = useLocale();

  return (
    <>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <ColumnChip column={series.column} />
      </div>
      <h3 className="font-heading text-xl font-bold leading-snug text-foreground md:text-2xl">
        {seriesTitle(series, c)}
      </h3>
      <p className="mt-3 text-sm text-muted-foreground">{c.events.seriesNote}</p>
      <p className="mt-4 text-sm font-medium text-foreground">
        {series.time} · {series.location}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={primaryButton}>
          {c.hero.joinWhatsapp}
        </a>
        <AddToCalendar event={seriesCalendarEntry(series, locale, c)} />
      </div>
    </>
  );
}

/**
 * Der nächste Termin, groß genug, dass man beim ersten Blick sieht: Hier
 * passiert gerade etwas. Welcher das ist, entscheidet allein das Datum
 * (`getUpcomingAgenda`) – kein fest eingetragener Favorit, der nach seinem
 * Termin stehen bliebe.
 */
const UpNextCard = ({ entry }: { entry: AgendaEntry }) => {
  const c = useCopy();
  const locale = useLocale();
  const cover = entry.kind === "event" ? entry.event.coverImage : undefined;

  return (
    <article
      aria-labelledby="lab-up-next"
      className="next-event-glow relative"
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between gap-3 border-b border-border bg-primary/5 px-5 py-3 md:px-6">
          <h2
            id="lab-up-next"
            className="flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-primary"
          >
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            {c.lab.upNext}
          </h2>
          {/* Aus dem heutigen Datum berechnet, nie als Text gepflegt. */}
          <p className="font-heading text-xs font-medium text-muted-foreground">
            {formatRelativeToToday(entry.date, locale)}
          </p>
        </div>

        {/* Auf dem Handy ohne Titelbild: Dort soll der Termin selbst im ersten
            Bildschirm stehen, nicht sein Plakat. */}
        {cover && entry.kind === "event" && (
          <div className="hidden aspect-[40/21] overflow-hidden bg-muted sm:block">
            <img
              src={cover}
              alt={pick(entry.event.coverAlt, locale) ?? pick(entry.event.title, locale)}
              width={1200}
              height={630}
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="p-5 md:p-6">
          <p className="mb-3 font-heading text-base font-semibold text-primary md:text-lg">
            {entryDate(entry, locale)}
          </p>
          {entry.kind === "event" ? (
            <EventBody event={entry.event} />
          ) : (
            <SeriesBody series={entry.series} />
          )}
          <Link
            to={homeSection(locale, entry.id)}
            className="mt-5 inline-block text-sm font-medium text-muted-foreground hover:text-primary hover:underline"
          >
            {c.events.learnMore} →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default UpNextCard;
