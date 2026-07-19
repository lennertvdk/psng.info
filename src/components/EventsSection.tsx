import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import {
  eventColumnLabels,
  formatEventDate,
  getUpcomingEventsByColumn,
  speakerTypeLabels,
  type EventColumn,
  type PsngEvent,
} from "@/data/events";

const WHATSAPP_LINK = "https://chat.whatsapp.com/LBUA3UpzOV9BW1v59EZK8w?s=cl&p=i&ilr=1";

const columnIntros: Record<EventColumn, string> = {
  vortraege:
    "Jeden 2. Dienstag im Monat. Fachlicher Input zu Forschung, Projekten und psychedelischer Wissenschaft, studentisch und von eingeladenen Expert:innen.",
  community:
    "Jeden 4. Dienstag im Monat. Austausch zwischen den Hochschulgruppen, aktuelle Projekte, gemeinsames Engagement.",
  social:
    "Treffen zum Kennenlernen und Austauschen abseits des Vortragsformats.",
};

function isFeaturedEvent(event: PsngEvent): boolean {
  return Boolean(event.description || event.speaker || event.registrationUrl);
}

function EventCard({ event, i }: { event: PsngEvent; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.08 }}
      className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
    >
      {event.highlightBadge && (
        <span className="inline-block mb-3 px-2 py-1 rounded-full gradient-psychedelic text-primary-foreground text-xs font-heading font-medium">
          {event.highlightBadge}
        </span>
      )}
      {event.speakerType && (
        <span className="inline-block mb-3 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-heading font-medium">
          {speakerTypeLabels[event.speakerType]}
        </span>
      )}
      <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
        {event.title}
      </h3>
      {event.speaker && (
        <p className="text-sm text-primary font-medium mb-2">{event.speaker}</p>
      )}
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {event.description ?? "Weitere Details folgen bald."}
      </p>
      <div className="space-y-1 text-sm text-muted-foreground">
        <p>
          <span className="font-medium text-foreground">Datum:</span>{" "}
          {formatEventDate(event.date)}, {event.time}
        </p>
        {event.location ? (
          <p>
            <span className="font-medium text-foreground">Ort:</span> {event.location}
          </p>
        ) : null}
      </div>
      {(event.registrationUrl || event.category === "gathering") && (
        <div className="flex flex-wrap gap-3 mt-4">
          {event.registrationUrl && (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg gradient-psychedelic px-4 py-2 text-sm font-heading font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Jetzt anmelden
            </a>
          )}
          {event.category === "gathering" && (
            <a
              href="https://www.instagram.com/psng.info/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-primary/30 px-4 py-2 text-sm font-heading font-medium text-primary hover:bg-primary/5 transition-colors"
            >
              Auf Instagram folgen
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}

function NextDateCard({ event }: { event: PsngEvent }) {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow">
      <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
        {event.title}
      </h3>
      <div className="space-y-1 text-sm text-muted-foreground">
        <p>
          <span className="font-medium text-foreground">Nächster Termin:</span>{" "}
          {formatEventDate(event.date)}, {event.time}
        </p>
        {event.location ? (
          <p>
            <span className="font-medium text-foreground">Ort:</span> {event.location}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function EventsColumnHeader({ column }: { column: EventColumn }) {
  return (
    <div>
      <p className="font-heading text-sm uppercase tracking-[0.2em] text-primary mb-2">
        {eventColumnLabels[column]}
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {columnIntros[column]}
      </p>
    </div>
  );
}

function EventsColumnCards({ column }: { column: EventColumn }) {
  const upcoming = getUpcomingEventsByColumn(column);
  const featured = upcoming.filter(isFeaturedEvent);
  const nextPlain = upcoming.find((e) => !isFeaturedEvent(e));

  return (
    <div className="flex flex-col gap-4">
      {featured.map((event, i) => (
        <EventCard key={event.id} event={event} i={i} />
      ))}

      {nextPlain && <NextDateCard event={nextPlain} />}

      {featured.length === 0 && !nextPlain && (
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Aktuell sind keine Termine geplant.
          </p>
        </div>
      )}
    </div>
  );
}

const EventsSection = () => {
  const columns: EventColumn[] = ["vortraege", "community", "social"];

  return (
    <section id="events" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Events"
          title="Kommende Veranstaltungen"
          intro={
            <>
              Hier findest du unsere nächsten Termine sowie unsere regelmäßigen Formate, an denen du teilnehmen kannst. (Zoom-)Links zur Teilnahme gibt's über{" "}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:no-underline"
              >
                WhatsApp
              </a>{" "}
              und{" "}
              <a
                href="https://www.instagram.com/psng.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:no-underline"
              >
                Instagram
              </a>
              .
            </>
          }
        />

        <div className="grid gap-4 lg:grid-cols-3 mb-6">
          {columns.map((column) => (
            <EventsColumnHeader key={column} column={column} />
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3 items-start">
          {columns.map((column) => (
            <EventsColumnCards key={column} column={column} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
