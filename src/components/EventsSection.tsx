import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  eventColumnLabels,
  formatEventDate,
  getEventAnchor,
  getHighlightEvents,
  getPastPlainEvents,
  getUpcomingEventsByColumn,
  hasContent,
  speakerTypeLabels,
  type EventColumn,
  type PsngEvent,
} from "@/data/events";
import { getYouTubeEmbedUrl } from "@/lib/youtube";
import { WHATSAPP_LINK, INSTAGRAM_LINK } from "@/lib/links";

type Tab = "kommend" | "vergangen";

const columnIntros: Record<EventColumn, string> = {
  vortraege:
    "Jeden 2. Dienstag im Monat. Fachlicher Input zu Forschung, Projekten und psychedelischer Wissenschaft, studentisch und von eingeladenen Expert:innen.",
  community:
    "Treffen, Konferenzbesuche und gemeinsames Engagement der Hochschulgruppen, online und vor Ort.",
};

function EventCard({
  event,
  i,
  past = false,
}: {
  event: PsngEvent;
  i: number;
  /** Blendet Anmelde-CTA und Luma-Hinweis aus – nach dem Termin sind sie hinfällig. */
  past?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.08 }}
      className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
    >
      {(event.highlightBadge || event.speakerType || past) && (
        <div className="mb-3 flex flex-wrap items-center gap-2">
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
          {past && <span className="text-xs text-muted-foreground">{formatEventDate(event.date)}</span>}
        </div>
      )}
      <div>
        {event.assets?.partnerLogo && (
          <img
            src={event.assets.partnerLogo}
            alt={event.assets.partnerLogoAlt ?? "Partner-Logo"}
            width={105}
            height={105}
            loading="lazy"
            decoding="async"
            className="float-right ml-3 mb-1 h-[105px] w-[105px] rounded-full object-cover shadow-sm"
          />
        )}
        {event.assets?.speakerPhoto && (
          <img
            src={event.assets.speakerPhoto}
            alt={event.speaker ?? "Speaker"}
            width={105}
            height={105}
            loading="lazy"
            decoding="async"
            className="float-right ml-3 mb-1 h-[105px] w-[105px] rounded-2xl object-cover shadow-sm"
          />
        )}
        <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
          {event.title}
        </h3>
        {event.subtitle && (
          <p className="text-sm text-foreground/80 font-medium mb-2 leading-relaxed">
            {event.subtitle}
          </p>
        )}
        {event.speaker && (
          <p className="text-sm text-primary font-medium mb-2">
            {event.speakerWebsiteUrl ? (
              <a
                href={event.speakerWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {event.speaker}
              </a>
            ) : (
              event.speaker
            )}
          </p>
        )}
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {event.description ?? "Weitere Details folgen bald."}
        </p>
        {event.speakerBio && (
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {event.speakerBio}
          </p>
        )}
        {event.audienceNote && (
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {event.audienceNote}
          </p>
        )}
      </div>
      <div className="space-y-1 text-sm text-muted-foreground">
        <p>
          <span className="font-medium text-foreground">Datum:</span>{" "}
          {event.weekdayLabel ? `${event.weekdayLabel}, ` : ""}
          {formatEventDate(event.date)}, {event.time}
        </p>
        {event.location ? (
          <p>
            <span className="font-medium text-foreground">Ort:</span> {event.location}
          </p>
        ) : null}
        {event.contribution ? (
          <p>
            <span className="font-medium text-foreground">Beitrag:</span> {event.contribution}
          </p>
        ) : null}
      </div>
      {event.disclaimer && (
        <p className="text-xs text-muted-foreground italic mt-3">{event.disclaimer}</p>
      )}
      {!past && event.registrationUrl?.includes("luma.com") && (
        <p className="text-xs text-muted-foreground mt-3">
          Alle weiteren Infos und das vollständige Programm gibt's auf Luma.
        </p>
      )}
      {!past && event.registrationUrl && (
        <div className="flex flex-wrap gap-3 mt-4">
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg gradient-psychedelic px-4 py-2 text-sm font-heading font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {event.registrationLabel ?? "Jetzt anmelden"}
          </a>
        </div>
      )}
      {past && event.registrationUrl && (
        <div className="mt-4">
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            Event auf Luma ansehen →
          </a>
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
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-lg border border-primary/30 text-primary font-heading font-medium text-sm hover:bg-primary/5 transition-colors px-4 py-2 mt-4"
      >
        Zoom-Link via WhatsApp
      </a>
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
  const featured = upcoming.filter(hasContent);
  const nextPlain = upcoming.find((e) => !hasContent(e));

  return (
    <div className="flex flex-col gap-4">
      {featured.map((event, i) => (
        <EventCard key={event.id} event={event} i={i} />
      ))}

      {nextPlain && <NextDateCard event={nextPlain} />}

      {featured.length === 0 && !nextPlain && (
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Aktuell sind keine Termine geplant. Neue Treffen kündigen wir in der Community an.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-primary/30 text-primary font-heading font-medium text-sm hover:bg-primary/5 transition-colors px-4 py-2 mt-4"
          >
            WhatsApp-Community beitreten
          </a>
        </div>
      )}
    </div>
  );
}

function UpcomingEvents() {
  const columns: EventColumn[] = ["vortraege", "community"];
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-2 mb-6">
        {columns.map((column) => (
          <EventsColumnHeader key={column} column={column} />
        ))}
      </div>
      <div className="grid gap-8 lg:grid-cols-2 items-start">
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
  // Nur lokale Vorschaubilder – fehlt eins, zeigen wir lieber gar keins, als
  // beim Seitenaufruf eine Anfrage an Google auszulösen.
  const thumb = a.youtubeThumbnail ?? null;
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
                  width={480}
                  height={360}
                  loading="lazy"
                  decoding="async"
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
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
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
              {ev.speaker ? `LinkedIn von ${ev.speaker}` : "LinkedIn"} →
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

function GatheringPhotoCarousel({
  photos,
  alts,
  title,
}: {
  photos: string[];
  alts?: string[];
  title: string;
}) {
  return (
    <Carousel opts={{ loop: true }} className="w-full">
      <CarouselContent>
        {photos.map((src, i) => (
          <CarouselItem key={src}>
            {/* object-contain statt object-cover: Quellfotos haben unterschiedliche
                Seitenverhältnisse, ein hartes Cover-Crop hätte sonst regelmäßig Köpfe
                abgeschnitten. Überschüssiger Raum wird gelettert, nicht zugeschnitten. */}
            <div className="flex h-72 w-full items-center justify-center overflow-hidden rounded-lg bg-muted sm:h-96 md:h-[28rem]">
              <img
                src={src}
                alt={alts?.[i] ?? `${title} – Foto ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
}

function GatheringAftermovie({ ev }: { ev: PsngEvent }) {
  const [playing, setPlaying] = useState(false);
  const a = ev.assets ?? {};
  if (!a.youtubeUrl) return null;
  const embed = getYouTubeEmbedUrl(a.youtubeUrl);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
      {playing && embed ? (
        <iframe
          src={embed}
          title={`Aftermovie: ${ev.title}`}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 flex items-center justify-center"
          aria-label={`Aftermovie abspielen: ${ev.title}`}
        >
          {a.youtubeThumbnail && (
            <img
              src={a.youtubeThumbnail}
              alt=""
              loading="lazy"
              decoding="async"
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
  );
}

/** Große Feature-Karte für ein einzelnes, besonders großes vergangenes Event (Aftermovie + Foto-Karussell). */
function GatheringFeatureCard({ ev }: { ev: PsngEvent }) {
  const a = ev.assets ?? {};

  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card hover:shadow-lg transition-shadow">
      <div className="space-y-3 p-5 pb-0">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
            {eventColumnLabels[ev.column]}
          </span>
          {ev.highlightBadge && (
            <span className="rounded-full gradient-psychedelic px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
              {ev.highlightBadge}
            </span>
          )}
          <span>{formatEventDate(ev.date)}</span>
        </div>

        <h3 className="text-xl font-semibold leading-snug">{ev.title}</h3>
        {ev.location ? <p className="text-sm text-muted-foreground">{ev.location}</p> : null}
        {ev.description ? <p className="text-sm text-muted-foreground">{ev.description}</p> : null}
        {(a.attendees || a.rating || a.recommendPercent) && (
          <p className="text-sm text-muted-foreground">
            {[
              a.attendees ? `${a.attendees} Teilnehmende` : null,
              a.rating ? `${a.rating} Bewertung` : null,
              a.recommendPercent ? `${a.recommendPercent}% Weiterempfehlung` : null,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 p-5">
        {a.youtubeUrl ? <GatheringAftermovie ev={ev} /> : null}
        {a.photos?.length ? (
          <GatheringPhotoCarousel photos={a.photos} alts={a.photoAlts} title={ev.title} />
        ) : null}
        {ev.registrationUrl && (
          <a
            href={ev.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            Event auf Luma ansehen →
          </a>
        )}
      </div>
    </div>
  );
}

function PastEvents() {
  const highlights = getHighlightEvents();
  const large = highlights.filter((ev) => ev.featuredLarge);
  const rest = highlights.filter((ev) => !ev.featuredLarge);
  const plain = getPastPlainEvents();
  if (highlights.length === 0 && plain.length === 0) return null;

  return (
    <>
      {large.length > 0 && (
        <div className="flex flex-col gap-6 mb-6">
          {large.map((ev) => (
            <motion.div
              key={ev.id}
              id={getEventAnchor(ev)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <GatheringFeatureCard ev={ev} />
            </motion.div>
          ))}
        </div>
      )}

      {rest.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2">
          {rest.map((ev) => (
            <motion.div
              key={ev.id}
              id={getEventAnchor(ev)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <HighlightCard ev={ev} />
            </motion.div>
          ))}
        </div>
      )}

      {plain.length > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          {plain.map((event, i) => (
            <div key={event.id} id={getEventAnchor(event)}>
              <EventCard event={event} i={i} past />
            </div>
          ))}
        </div>
      )}

      <div className="mt-14 rounded-2xl border border-border/60 bg-muted/40 p-8 text-center">
        <h3 className="text-xl font-semibold">Du willst selbst eine Lecture geben?</h3>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          Unsere Lectures kommen aus der Community – Bachelor-, Master- oder Promotionsthemen, ein spannendes Paper, ein eigenes Projekt. Melde dich, wir geben dir die Bühne.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link
            to="/?subject=vortrag#kontakt"
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Vortrag vorschlagen
          </Link>
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
          href={INSTAGRAM_LINK}
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

const tabLabels: Record<Tab, string> = {
  kommend: "Kommend",
  vergangen: "Vergangen",
};

const EventsSection = () => {
  // Der Tab liegt in der URL, damit man auf die Aufnahmen verlinken kann und
  // der Zurück-Button den Wechsel rückgängig macht.
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [hashTab, setHashTab] = useState<Tab | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "aufnahmen" || hash.startsWith("event-")) {
      setHashTab("vergangen");
    }
  }, []);

  const tab: Tab = tabParam === "vergangen" ? "vergangen" : hashTab ?? "kommend";

  const selectTab = (next: Tab) => {
    setHashTab(null);
    setSearchParams(
      (params) => {
        if (next === "kommend") params.delete("tab");
        else params.set("tab", next);
        return params;
      },
      { replace: false, preventScrollReset: true },
    );
  };

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
                onClick={() => selectTab(t)}
                aria-pressed={tab === t}
                className={`px-5 py-2 rounded-full font-heading text-sm font-medium transition-colors ${
                  tab === t
                    ? "bg-card text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tabLabels[t]}
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
