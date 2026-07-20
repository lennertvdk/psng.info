import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import {
  eventColumnLabels,
  formatEventDate,
  getHighlightEvents,
  getUpcomingEventsByColumn,
  speakerTypeLabels,
  type EventColumn,
  type PsngEvent,
} from "@/data/events";
import { getYouTubeThumbnail, getYouTubeEmbedUrl } from "@/lib/youtube";

const WHATSAPP_LINK = "https://chat.whatsapp.com/LBUA3UpzOV9BW1v59EZK8w?s=cl&p=i&ilr=1";
const PAST_EVENT_ANCHORS: Record<string, string> = {
  "kickoff-2026-03-03": "kickoff",
  "lecture-lonergan-2026-06": "lonergan-lecture",
};

type Tab = "kommend" | "vergangen";

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
      {(event.highlightBadge || event.speakerType) && (
        <div className="mb-3">
          {event.highlightBadge && (
            <span className="inline-block px-2 py-1 rounded-full gradient-psychedelic text-primary-foreground text-xs font-heading font-medium">
              {event.highlightBadge}
            </span>
          )}
          {event.speakerType && (
            <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-heading font-medium">
              {speakerTypeLabels[event.speakerType]}
            </span>
          )}
        </div>
      )}
      <div>
        {event.assets?.partnerLogo && (
          <img
            src={event.assets.partnerLogo}
            alt={event.assets.partnerLogoAlt ?? "Partner-Logo"}
            className="float-right ml-3 mb-1 h-[105px] w-[105px] rounded-full object-cover shadow-sm"
          />
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
      </div>
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

function UpcomingEvents() {
  const columns: EventColumn[] = ["vortraege", "community", "social"];
  return (
    <>
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
    </>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function HighlightCard({ ev }: { ev: PsngEvent }) {
  const [playing, setPlaying] = useState(false);
  const a = ev.assets ?? {};
  const thumb = a.youtubeUrl ? getYouTubeThumbnail(a.youtubeUrl) : null;
  const embed = a.youtubeUrl ? getYouTubeEmbedUrl(a.youtubeUrl) : null;
  const heroPhoto = a.photos?.[0];

  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card hover:shadow-lg transition-shadow">
      {a.youtubeUrl ? (
        <div className="relative aspect-video w-full bg-muted">
          {playing && embed ? (
            <iframe
              src={embed}
              title={ev.title}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 flex items-center justify-center"
              aria-label={`Aufnahme abspielen: ${ev.title}`}
            >
              {thumb && (
                <img
                  src={thumb}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/40" />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg transition-transform group-hover:scale-110">
                <PlayIcon />
              </span>
            </button>
          )}
        </div>
      ) : heroPhoto ? (
        <div className="relative aspect-video w-full bg-muted">
          <img
            src={heroPhoto}
            alt={ev.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      ) : null}

      <div className="space-y-3 p-5">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
            {eventColumnLabels[ev.column]}
          </span>
          {ev.speakerType && (
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {speakerTypeLabels[ev.speakerType]}
            </span>
          )}
          {ev.featured && (
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
              ✨ Unser erstes Event
            </span>
          )}
          <span>{formatEventDate(ev.date)}</span>
        </div>

        <h3 className="text-lg font-semibold leading-snug">{ev.title}</h3>
        {ev.speaker ? (
          <p className="text-sm text-muted-foreground">mit {ev.speaker}</p>
        ) : ev.location ? (
          <p className="text-sm text-muted-foreground">{ev.location}</p>
        ) : null}
        {ev.description ? (
          <p className="text-sm text-muted-foreground">{ev.description}</p>
        ) : null}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-sm">
          {a.attendees ? (
            <span className="text-muted-foreground">{a.attendees}+ Teilnehmende</span>
          ) : null}
          {a.slidesUrl ? (
            <a
              href={a.slidesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Folien ansehen →
            </a>
          ) : null}
          {a.recapUrl ? (
            <a
              href={a.recapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Recap lesen →
            </a>
          ) : null}
          {a.speakerLinkedinUrl ? (
            <a
              href={a.speakerLinkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Eric's LinkedIn →
            </a>
          ) : null}
          {a.externalUrl ? (
            <a
              href={a.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              {a.externalLabel ?? "Mehr erfahren"} →
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function PastEvents() {
  const items = getHighlightEvents();
  if (items.length === 0) return null;

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((ev) => (
          <motion.div
            key={ev.id}
            id={PAST_EVENT_ANCHORS[ev.id]}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <HighlightCard ev={ev} />
          </motion.div>
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-border/60 bg-muted/40 p-8 text-center">
        <h3 className="text-xl font-semibold">Du willst selbst eine Lecture geben?</h3>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          Unsere Lectures kommen aus der Community – Bachelor-, Master- oder Promotionsthemen, ein spannendes Paper, ein eigenes Projekt. Melde dich, wir geben dir die Bühne.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a
            href="/?subject=vortrag#kontakt"
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Vortrag vorschlagen
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            In der WhatsApp-Community melden
          </a>
        </div>
      </div>
    </>
  );
}

const tabCopy: Record<Tab, { eyebrow: string; title: string; intro: React.ReactNode }> = {
  kommend: {
    eyebrow: "Events",
    title: "Kommende Veranstaltungen",
    intro: (
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
    ),
  },
  vergangen: {
    eyebrow: "Events",
    title: "Vergangene Veranstaltungen",
    intro:
      "Eigene Events zum Nachschauen und Nachlesen, sowie Konferenzen und Community-Events, auf denen sich das PSNG getroffen hat.",
  },
};

const EventsSection = () => {
  const [tab, setTab] = useState<Tab>("kommend");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "aufnahmen" || Object.values(PAST_EVENT_ANCHORS).includes(hash)) {
      setTab("vergangen");
    }
  }, []);

  useEffect(() => {
    if (tab !== "vergangen") return;
    const hash = window.location.hash.replace("#", "");
    if (Object.values(PAST_EVENT_ANCHORS).includes(hash)) {
      requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView());
    }
  }, [tab]);

  return (
    <section id="events" className="py-24 md:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionHeader {...tabCopy[tab]} />

        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full bg-muted p-1">
            {(["kommend", "vergangen"] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-full font-heading text-sm font-medium transition-colors ${
                  tab === t
                    ? "bg-card text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "kommend" ? "Kommend" : "Vergangen"}
              </button>
            ))}
          </div>
        </div>

        {tab === "kommend" ? <UpcomingEvents /> : <PastEvents />}
      </div>
    </section>
  );
};

export default EventsSection;
