import { useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
  LECTURE_SERIES,
  eventColumnLabels,
  formatEventDate,
  formatEventDateShort,
  formatRelativeToToday,
  getTimelineEntries,
  speakerTypeLabels,
  type EventColumn,
  type PsngEvent,
  type PsngMilestone,
  type SeriesDate,
  type TimelineEntry,
} from "@/data/events";
import { getYouTubeEmbedUrl } from "@/lib/youtube";
import { WHATSAPP_LINK, INSTAGRAM_LINK } from "@/lib/links";

/**
 * Der Typ-Chip. Steht auf jeder Karte und trägt exakt die Beschriftung der
 * Filter darüber – sonst bleibt unklar, warum eine Karte aus einem Filter
 * herausfällt.
 */
function ColumnChip({ column }: { column: EventColumn }) {
  return (
    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
      {eventColumnLabels[column]}
    </span>
  );
}


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
  // Hat jemand keine eigene Website, ist das LinkedIn-Profil der nächstbeste
  // Beleg – in der Highlight-Karte steht es ohnehin schon als eigener Link.
  const speakerLink = event.speakerWebsiteUrl ?? event.assets?.speakerLinkedinUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.08 }}
      className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <ColumnChip column={event.column} />
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
            {speakerLink ? (
              <a
                href={speakerLink}
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
                  width={960}
                  height={540}
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
          <ColumnChip column={ev.column} />
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

function GatheringShort({
  url,
  title,
  thumbnail,
}: {
  url: string;
  title: string;
  /** Lokales Standbild – wie beim Aftermovie, siehe EventAssets.shortsThumbnail. */
  thumbnail?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const embed = getYouTubeEmbedUrl(url);

  return (
    <div className="border-t border-border/60 pt-5">
      {/* Zentriert wie das Video darunter, das mit max-w-[18rem] mittig in der Spalte sitzt. */}
      <div className="mb-4 text-center">
        <h3 className="text-lg font-semibold">Mini-Aftermovie</h3>
      </div>
      <div className="relative mx-auto aspect-[9/16] w-full max-w-[18rem] overflow-hidden rounded-lg bg-muted">
        {playing && embed ? (
          <iframe
            src={embed}
            title={`Mini-Aftermovie: ${title}`}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 flex items-center justify-center"
            aria-label={`Mini-Aftermovie abspielen: ${title}`}
          >
            {thumbnail && (
              <img
                src={thumbnail}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <span className="absolute inset-0 bg-foreground/10 transition-colors group-hover:bg-black/40" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg transition-transform group-hover:scale-110">
              <PlayIcon />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

/** Große Feature-Karte für ein einzelnes, besonders großes vergangenes Event (Aftermovie + Foto-Karussell). */
function GatheringFeatureCard({ ev }: { ev: PsngEvent }) {
  const a = ev.assets ?? {};

  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card hover:shadow-lg transition-shadow">
      <div className="grid items-start gap-6 p-5 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <ColumnChip column={ev.column} />
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

        {a.shortsUrl ? (
          <GatheringShort url={a.shortsUrl} title={ev.title} thumbnail={a.shortsThumbnail} />
        ) : null}
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

// ── Zeitstrahl ──────────────────────────────────────────────────────────────

/**
 * Die Spalten des Zeitstrahls: Datum (erst ab md), Schiene mit Punkt, Karte.
 * Als Konstante, weil jede Zeile und der Heute-Marker exakt dieselbe Aufteilung
 * brauchen – laufen sie auseinander, sitzen die Punkte nicht mehr auf der Linie.
 */
const ROW_GRID =
  "grid grid-cols-[1.5rem_minmax(0,1fr)] md:grid-cols-[6.5rem_1.5rem_minmax(0,1fr)]";
/** Mitte der Punkte-Spalte – dort verläuft die Linie. */
const RAIL_X = "left-[0.75rem] md:left-[7.25rem]";

/**
 * Ein Termin der Lecture-Reihe, für den noch kein Thema feststeht. Bewusst
 * schmal und gestrichelt: Die Aussage ist der Takt, nicht der Inhalt.
 */
function SeriesRow({ series }: { series: SeriesDate }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card/50 px-5 py-4">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <ColumnChip column={series.column} />
        <span className="text-xs text-muted-foreground md:hidden">
          {formatEventDate(series.date)} · {formatRelativeToToday(series.date)}
        </span>
      </div>
      <p className="font-heading text-base font-semibold text-foreground">
        {series.label}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        {series.time} · {series.location} – {LECTURE_SERIES.note}
      </p>
    </div>
  );
}

/** Meilenstein: kein Termin, sondern etwas, das seitdem da ist. */
function MilestoneCard({ milestone }: { milestone: PsngMilestone }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition-shadow">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <ColumnChip column={milestone.column} />
        {milestone.badge && (
          <span className="rounded-full gradient-psychedelic px-2.5 py-0.5 text-xs font-heading font-medium text-primary-foreground">
            {milestone.badge}
          </span>
        )}
        <span className="text-xs text-muted-foreground md:hidden">
          {formatEventDate(milestone.date)}
        </span>
      </div>
      <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
        {milestone.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {milestone.description}
      </p>
      {milestone.links?.length ? (
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
          {milestone.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline"
            >
              {link.label} →
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function EntryCard({ entry, i }: { entry: TimelineEntry; i: number }) {
  if (entry.kind === "series") return <SeriesRow series={entry.series} />;
  if (entry.kind === "milestone") return <MilestoneCard milestone={entry.milestone} />;
  if (entry.variant === "feature") return <GatheringFeatureCard ev={entry.event} />;
  if (entry.variant === "highlight") return <HighlightCard ev={entry.event} />;
  return <EventCard event={entry.event} i={i} past={entry.date < todayIso()} />;
}

/** Nur für die Frage „Anmelde-Button noch anzeigen?" – auf den Tag genau. */
function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

function TimelineRow({
  entry,
  i,
  upcoming,
  isNext,
}: {
  entry: TimelineEntry;
  i: number;
  upcoming: boolean;
  /** Der nächste anstehende Termin – der einzige Eintrag mit vollem Akzent. */
  isNext: boolean;
}) {
  const dot = upcoming
    ? isNext
      ? "border-2 border-primary bg-background ring-4 ring-primary/10"
      : "border-2 border-primary/35 bg-background"
    : "bg-primary/30";

  return (
    <motion.li
      id={entry.id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`${ROW_GRID} scroll-mt-36`}
    >
      <div className="hidden pr-4 pt-1 text-right md:block">
        <p className="font-heading text-sm font-medium text-foreground">
          {formatEventDateShort(entry.date)}
        </p>
        {upcoming && (
          <p className="text-xs text-muted-foreground">
            {formatRelativeToToday(entry.date)}
          </p>
        )}
      </div>
      <div className="flex justify-center pt-2">
        <span className={`h-3 w-3 shrink-0 rounded-full ${dot}`} aria-hidden="true" />
      </div>
      <div className={`min-w-0 pb-8 pl-3 md:pl-4 ${isNext ? "rounded-2xl" : ""}`}>
        <EntryCard entry={entry} i={i} />
      </div>
    </motion.li>
  );
}

function TimelineList({
  entries,
  upcoming,
  nextId,
}: {
  entries: TimelineEntry[];
  upcoming: boolean;
  nextId?: string;
}) {
  if (entries.length === 0) return null;
  return (
    <ol className="relative">
      {/* Die Schiene. Nach oben ausgeblendet, wo die Termine noch weit weg sind –
          die Karten selbst bleiben unangetastet, verblasste Inhalte sähen nach
          Rendering-Fehler aus statt nach zeitlichem Abstand. */}
      <span
        aria-hidden="true"
        className={`absolute bottom-2 top-2 w-px ${RAIL_X} ${
          upcoming ? "bg-gradient-to-b from-transparent to-border" : "bg-border"
        }`}
      />
      {entries.map((entry, i) => (
        <TimelineRow
          key={entry.id}
          entry={entry}
          i={i}
          upcoming={upcoming}
          isNext={entry.id === nextId}
        />
      ))}
    </ol>
  );
}

function TodayMarker() {
  return (
    <div className={`${ROW_GRID} my-1 items-center`}>
      <p className="hidden pr-4 text-right font-heading text-xs uppercase tracking-[0.2em] text-primary/70 md:block">
        heute
      </p>
      <div className="flex items-center justify-center">
        <span aria-hidden="true" className="h-px w-full bg-primary/30" />
      </div>
      <p className="pl-3 font-heading text-xs uppercase tracking-[0.2em] text-primary/70 md:hidden">
        heute
      </p>
    </div>
  );
}

// ── Filter ──────────────────────────────────────────────────────────────────

const filters = ["alle", "vortraege", "community"] as const;
type Filter = (typeof filters)[number];

const filterLabels: Record<Filter, string> = {
  alle: "Alle",
  vortraege: eventColumnLabels.vortraege,
  community: eventColumnLabels.community,
};

/** Ab wie vielen vergangenen Einträgen der Rest hinter „Mehr anzeigen" liegt. */
const PAST_PAGE_SIZE = 8;

const EventsSection = () => {
  // Der Filter liegt in der URL, damit man auf eine gefilterte Ansicht
  // verlinken kann und der Zurück-Button den Wechsel rückgängig macht.
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const param = searchParams.get("events");
  const filter: Filter = (filters as readonly string[]).includes(param ?? "")
    ? (param as Filter)
    : "alle";

  // Ein Deep-Link auf ein einzelnes Event muss auch dann greifen, wenn der
  // Eintrag erst hinter „Mehr anzeigen" liegt.
  const [showAll, setShowAll] = useState(() => location.hash.startsWith("#event-"));

  const { upcoming, past } = getTimelineEntries();
  const matches = (entry: TimelineEntry) => filter === "alle" || entry.column === filter;
  const upcomingShown = upcoming.filter(matches);
  const pastMatching = past.filter(matches);
  const pastShown = showAll ? pastMatching : pastMatching.slice(0, PAST_PAGE_SIZE);

  // Die kommenden Einträge laufen von fern nach nah auf heute zu – der nächste
  // Termin steht also ganz unten.
  const nextId = upcomingShown.at(-1)?.id;

  const selectFilter = (next: Filter) => {
    const params = new URLSearchParams(searchParams);
    // "Alle" ist der Standard und braucht keinen Parameter.
    if (next === "alle") params.delete("events");
    else params.set("events", next);
    navigate(
      {
        pathname: location.pathname,
        search: params.toString() ? `?${params.toString()}` : "",
        hash: location.hash,
      },
      { replace: false, preventScrollReset: true },
    );
  };

  return (
    <section id="events" className="py-24 md:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Events"
          title="Veranstaltungen"
          intro={
            <>
              Vorträge, Treffen und Konferenzbesuche – chronologisch, von jetzt
              rückwärts. (Zoom-)Links zur Teilnahme gibt's über{" "}
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
          }
        />

        <p className="mx-auto mb-8 max-w-3xl text-center text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Lectures:</span> jeden 2.
          Dienstag im Monat, {LECTURE_SERIES.time} Uhr, auf {LECTURE_SERIES.location}.
          Fachlicher Input aus der Community und von eingeladenen Expert:innen.
        </p>

        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-full bg-muted p-1">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => selectFilter(f)}
                aria-pressed={filter === f}
                className={`rounded-full px-5 py-2 font-heading text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-card text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {filterLabels[f]}
              </button>
            ))}
          </div>
        </div>

        {/* Schmaler als die Sektion: Die Schiene braucht links Platz, und die
            Karten bleiben lesbar. Breiter wird vor allem die große Gathering-
            Karte mit Karussell besser – das ist der Kompromiss. */}
        <div className="mx-auto max-w-5xl">
          <TimelineList entries={upcomingShown} upcoming nextId={nextId} />
          {/* Der Marker trennt zwei Hälften. Ist die obere leergefiltert, wäre
              er nur noch eine Linie mit der Aussage „darüber kommt nichts". */}
          {upcomingShown.length > 0 && <TodayMarker />}
          <TimelineList entries={pastShown} upcoming={false} />

          {pastShown.length < pastMatching.length && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Mehr anzeigen ({pastMatching.length - pastShown.length})
              </button>
            </div>
          )}
        </div>

        <div className="mt-14 rounded-2xl border border-border/60 bg-muted/40 p-8 text-center">
          <h3 className="text-xl font-semibold">Du willst selbst eine Lecture geben?</h3>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            Unsere Lectures kommen aus der Community – Bachelor-, Master- oder
            Promotionsthemen, ein spannendes Paper, ein eigenes Projekt. Melde dich,
            wir geben dir die Bühne.
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
      </div>
    </section>
  );
};

export default EventsSection;
