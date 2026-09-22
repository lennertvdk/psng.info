import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
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
  formatEventDate,
  formatEventDateShort,
  formatRelativeToToday,
  getEventAnchor,
  getEventById,
  getTimelineEntries,
  type EventColumn,
  type PartnerCredit,
  type PartnerTone,
  type PsngEvent,
  type PsngMilestone,
  type SeriesDate,
  type TimelineEntry,
} from "@/data/events";
import { getYouTubeEmbedUrl } from "@/lib/youtube";
import { WHATSAPP_LINK, INSTAGRAM_LINK } from "@/lib/links";
import { useCopy } from "@/i18n/copy";
import { useLocale, type Locale } from "@/i18n/locale";
import { pick, type Localized } from "@/i18n/localized";

/**
 * Der Typ-Chip. Steht auf jeder Karte und benennt dieselbe Achse wie der
 * Filter darüber – nur im Singular, weil eine Karte genau ein Eintrag ist.
 * Wortstamm und Reihenfolge bleiben gleich, damit weiterhin erkennbar ist,
 * warum eine Karte aus einem Filter herausfällt.
 */
function ColumnChip({ column }: { column: EventColumn }) {
  const c = useCopy();
  return (
    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
      {column === "vortraege" ? c.events.columnsSingular.talks : c.events.columnsSingular.community}
    </span>
  );
}

/**
 * Chip einer Partnerorganisation, in deren eigener Farbwelt. Verlinkt, wenn
 * die Organisation eine eigene Seite hat – so führt die Karte auch dorthin,
 * ohne dass der Fließtext einen weiteren Link tragen muss.
 */
/**
 * Weist die Sprache einer Veranstaltung aus, wenn sie nicht die der Seite ist.
 * Steht vor der Beschreibung, damit die Erklärung kommt, bevor jemand auf
 * einen Text in einer anderen Sprache stößt und ihn für ein Versehen hält.
 *
 * Zwei Bedingungen, und beide sind nötig: Ohne Angabe im Event erscheint gar
 * nichts – bei einem Konferenzbesuch wie der ICPR wäre jede Sprachangabe
 * erfunden. Und stimmt die Sprache mit der der Seite überein, sagt der Satz
 * ohnehin nichts aus.
 *
 * Die Formulierung richtet sich nach der Art: Ein Kick-off ist kein Vortrag,
 * und „der Vortrag ist auf Deutsch" wäre dort schlicht falsch.
 */
function LanguageNote({ event }: { event: PsngEvent }) {
  const c = useCopy();
  const locale = useLocale();
  if (!event.language || event.language === locale) return null;

  const phrasing =
    event.category === "lecture" ? c.events.languageNote.talk : c.events.languageNote.event;

  return (
    <p className="text-sm text-muted-foreground">
      {phrasing.before}
      <span className="font-medium text-foreground">
        {phrasing.in}
        {c.events.languages[event.language]}
      </span>
      .
    </p>
  );
}

/**
 * Als Literale und nicht als `badge-${tone}` zusammengesetzt: Die Klassen
 * stehen in `@layer utilities`, und was Tailwind im Quelltext nicht
 * ausgeschrieben findet, wirft es beim Bauen weg.
 */
const partnerToneClass: Record<PartnerTone, string> = {
  bpsa: "badge-bpsa",
  parab: "badge-parab",
};

function PartnerBadge({
  short,
  name,
  url,
  tone,
}: {
  short: string;
  /** Ausgeschrieben für Screenreader – das Kürzel allein sagt dort nichts. */
  name: string;
  url?: string;
  tone: PartnerTone;
}) {
  const className = `inline-flex items-center gap-1 rounded-full ${partnerToneClass[tone]} px-2 py-1 text-xs font-heading font-medium`;

  if (!url) return <span className={className}>{short}</span>;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className={`${className} hover:opacity-90 transition-opacity`}
    >
      {short}
      <ExternalLink size={12} aria-hidden="true" />
    </a>
  );
}

/** Der Chip zu einer Kooperationsleiste – dieselbe Organisation, kurz gefasst. */
function CreditBadge({ credit }: { credit: PartnerCredit }) {
  return (
    <PartnerBadge
      short={credit.short}
      name={credit.name}
      url={credit.url}
      tone={credit.tone}
    />
  );
}


/**
 * `registrationUrl` führt nicht immer auf eine Luma-Seite – bei Miguels Lecture
 * etwa in die WhatsApp-Gruppe, weil es für den Abend nie eine Luma-Seite gab.
 * Der Hinweistext und der Rückblick-Link behaupteten das trotzdem und führten
 * dann auf etwas, das nichts mit Luma zu tun hat.
 */
/**
 * Die Kooperationsleiste am Kartenfuß: Logo, was die Organisation beigetragen
 * hat, und die Wege zu ihr. Trägt als einziger Teil der Karte die Farben der
 * Partnerorganisation (`surface-bpsa`) – damit hebt sich der fremde Beitrag
 * vom eigenen Inhalt ab, statt in einer flächigen Tönung mit ihm zu verschwimmen.
 */
function PartnerCreditStrip({ credit }: { credit: PartnerCredit }) {
  const c = useCopy();
  const locale = useLocale();
  return (
    <div className="surface-bpsa flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3">
      <img
        src={credit.logo}
        alt={`Logo ${credit.name}`}
        width={80}
        height={80}
        loading="lazy"
        decoding="async"
        className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
      />
      <div className="min-w-0 flex-1 basis-56">
        <p className="font-heading text-sm font-medium text-foreground">
          {c.events.inCooperationWith} {credit.name}
        </p>
        {credit.role ? (
          <p className="mt-0.5 text-sm text-muted-foreground">
            {pick(credit.role, locale)}
          </p>
        ) : null}
        <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
          {credit.url ? (
            <a
              href={credit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline"
            >
              {credit.url.replace(/^https?:\/\//, "").replace(/\/$/, "")} →
            </a>
          ) : null}
          {credit.instagramUrl ? (
            <a
              href={credit.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline"
            >
              {c.events.instagram}
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/**
 * Rückverweis auf den Abend, aus dem ein Vortrag stammt. Reiner Anker statt
 * Router-Link: Das Ziel steht auf derselben Seite und trägt die ID schon.
 */
function PartOfLine({ event }: { event: PsngEvent }) {
  const c = useCopy();
  const locale = useLocale();
  const parent = event.partOfEventId ? getEventById(event.partOfEventId) : undefined;
  if (!parent) return null;

  return (
    <p className="text-sm text-muted-foreground">
      {c.events.partOf}{" "}
      <a
        href={`#${getEventAnchor(parent)}`}
        className="font-medium text-primary hover:underline"
      >
        {pick(parent.title, locale)}
      </a>
    </p>
  );
}

function isLumaLink(url?: string): boolean {
  return Boolean(url?.includes("luma.com"));
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
  const c = useCopy();
  const locale = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.08 }}
      className="bg-card rounded-2xl p-5 border border-border hover:shadow-lg transition-shadow"
    >
      <div className="mb-2.5 flex flex-wrap items-center gap-2">
        <ColumnChip column={event.column} />
        {event.highlightBadge && (
          <span className="inline-block px-2 py-1 rounded-full gradient-psychedelic text-primary-foreground text-xs font-heading font-medium">
            {pick(event.highlightBadge, locale)}
          </span>
        )}
        {event.speakerType && (
          <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-heading font-medium">
            {event.speakerType === "student"
              ? c.events.speakerTypes.student
              : c.events.speakerTypes.guest}
          </span>
        )}
        {event.partnerCredit && <CreditBadge credit={event.partnerCredit} />}
      </div>
      <div>
        {event.assets?.speakerPhoto && (
          <img
            src={event.assets.speakerPhoto}
            alt={event.speaker ?? "Speaker"}
            width={105}
            height={105}
            loading="lazy"
            decoding="async"
            className="float-right ml-3 mb-1 h-20 w-20 rounded-2xl object-cover shadow-sm sm:h-24 sm:w-24"
          />
        )}
        <h3 className="font-heading text-lg font-semibold text-foreground mb-1.5 leading-snug">
          {pick(event.title, locale)}
        </h3>
        {event.subtitle && (
          <p className="text-sm text-foreground/80 font-medium mb-1.5 leading-relaxed">
            {pick(event.subtitle, locale)}
          </p>
        )}
        {event.speaker && (
          <p className="text-sm text-primary font-medium mb-1.5">
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
        {event.language && (
          <div className="mb-1.5">
            <LanguageNote event={event} />
          </div>
        )}
        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
          {pick(event.description, locale) ?? c.events.detailsSoon}
        </p>
        {event.speakerBio && (
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            {pick(event.speakerBio, locale)}
          </p>
        )}
        {event.audienceNote && (
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            {pick(event.audienceNote, locale)}
          </p>
        )}
        <div className="mb-3">
          <PartOfLine event={event} />
        </div>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
        <p>
          <span className="font-medium text-foreground">{c.events.dateLabel}</span>{" "}
          {formatEventDate(event.date, locale, event.showWeekday)},{" "}
          {pick(event.time, locale)}
        </p>
        {event.location ? (
          <p>
            <span className="font-medium text-foreground">{c.events.locationLabel}</span>{" "}
            {pick(event.location, locale)}
          </p>
        ) : null}
        {event.contribution ? (
          <p>
            <span className="font-medium text-foreground">
              {c.events.contributionLabel}
            </span>{" "}
            {pick(event.contribution, locale)}
          </p>
        ) : null}
      </div>
      {event.disclaimer && (
        <p className="text-xs text-muted-foreground italic mt-2">
          {pick(event.disclaimer, locale)}
        </p>
      )}
      {/* Die Karte trägt hier rundum Innenabstand, die Leiste zieht sich mit
          negativen Rändern wieder an die Kanten. */}
      {event.partnerCredit && (
        <div className="-mx-5 -mb-5 mt-4 overflow-hidden rounded-b-2xl">
          <PartnerCreditStrip credit={event.partnerCredit} />
        </div>
      )}
      {!past && isLumaLink(event.registrationUrl) && (
        <p className="text-xs text-muted-foreground mt-2">
          {c.events.lumaHint}
        </p>
      )}
      {!past && event.registrationUrl && (
        <div className="flex flex-wrap gap-3 mt-3">
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg gradient-psychedelic px-4 py-2 text-sm font-heading font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {pick(event.registrationLabel, locale) ?? c.events.register}
          </a>
        </div>
      )}
      {past && isLumaLink(event.registrationUrl) && (
        <div className="mt-3">
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            {c.events.lumaLink}
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
  const c = useCopy();
  const locale = useLocale();
  const a = ev.assets ?? {};
  // Nur lokale Vorschaubilder – fehlt eins, zeigen wir lieber gar keins, als
  // beim Seitenaufruf eine Anfrage an Google auszulösen.
  const thumb = a.youtubeThumbnail ?? null;
  const embed = a.youtubeUrl ? getYouTubeEmbedUrl(a.youtubeUrl) : null;
  const heroPhoto = a.photos?.[0];

  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card hover:shadow-lg transition-shadow">
      {/*
        Video und Text nebeneinander, sobald die Breite dafür reicht. Vorher
        lag das 16:9-Bild über dem Text und nahm auf einem Laptop allein schon
        eine halbe Bildschirmhöhe ein – die Karte war damit länger als das
        Fenster, und im Zeitstrahl sah man immer nur eine Aufzeichnung auf
        einmal. Auf schmalen Geräten bleibt es gestapelt: Dort wäre eine
        Videospalte von 40 % Breite unbrauchbar klein.
      */}
      <div className="md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-start">
        {a.youtubeUrl ? (
          <div className="relative aspect-video w-full bg-muted">
            {playing && embed ? (
              <iframe
                src={embed}
                title={pick(ev.title, locale)}
                className="absolute inset-0 h-full w-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 flex items-center justify-center"
                aria-label={`${c.events.playRecording} ${pick(ev.title, locale)}`}
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
              alt={pick(ev.title, locale)}
              width={1200}
              height={800}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ) : null}

        <div className="space-y-2.5 p-5">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <ColumnChip column={ev.column} />
            {ev.speakerType && (
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {ev.speakerType === "student"
                  ? c.events.speakerTypes.student
                  : c.events.speakerTypes.guest}
              </span>
            )}
            {ev.partnerCredit && <CreditBadge credit={ev.partnerCredit} />}
            {ev.featured && (
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                {c.events.firstEvent}
              </span>
            )}
            <span>{formatEventDate(ev.date, locale)}</span>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-lg font-semibold leading-snug">
              {pick(ev.title, locale)}
            </h3>
            {ev.subtitle ? (
              <p className="text-sm font-medium leading-relaxed text-foreground/80">
                {pick(ev.subtitle, locale)}
              </p>
            ) : null}
            {/* Speaker und Ort nebeneinander statt entweder/oder: Sonst fällt bei
                jedem Vortrag der Ort weg, weil ein Speaker davorsteht – und im
                Rückblick ist gerade er die Angabe, die sonst nirgends mehr steht. */}
            {ev.speaker ? (
              <p className="text-sm text-muted-foreground">
                {c.events.with} {ev.speaker}
              </p>
            ) : null}
            {ev.location ? (
              <p className="text-sm text-muted-foreground">
                {pick(ev.location, locale)}
              </p>
            ) : null}
            <PartOfLine event={ev} />
            <LanguageNote event={ev} />
          </div>
          {ev.description ? (
            <p className="text-sm text-muted-foreground">
              {pick(ev.description, locale)}
            </p>
          ) : null}
          {/* Die Kurzvita gehört auch in den Rückblick: Wer den Vortrag Monate
              später findet, kennt den Namen darüber in der Regel nicht. */}
          {ev.speakerBio ? (
            <p className="text-sm text-muted-foreground">
              {pick(ev.speakerBio, locale)}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            {a.attendees ? (
              <span className="text-muted-foreground">
                {a.attendees}+ {c.events.attendeesPlus}
              </span>
            ) : null}
            {a.slidesUrl ? (
              <a
                href={a.slidesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                {c.events.slides}
              </a>
            ) : null}
            {a.recapUrl ? (
              <a
                href={a.recapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                {c.events.recap}
              </a>
            ) : null}
            {a.speakerLinkedinUrl ? (
              <a
                href={a.speakerLinkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                {ev.speaker
                  ? `${c.events.linkedinOf} ${ev.speaker}`
                  : c.events.linkedin}{" "}
                →
              </a>
            ) : null}
            {a.externalUrl ? (
              <a
                href={a.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                {pick(a.externalLabel, locale) ?? c.events.learnMore} →
              </a>
            ) : null}
          </div>

          {ev.disclaimer ? (
            <p className="text-xs italic text-muted-foreground">
              {pick(ev.disclaimer, locale)}
            </p>
          ) : null}
        </div>
      </div>

      {/* Außerhalb des Textblocks, damit die Leiste die Karte in ganzer Breite
          abschließt statt im Innenabstand zu schweben. */}
      {ev.partnerCredit ? <PartnerCreditStrip credit={ev.partnerCredit} /> : null}
    </div>
  );
}

function GatheringPhotoCarousel({
  photos,
  alts,
  title,
}: {
  photos: string[];
  alts?: Localized[];
  title: string;
}) {
  const c = useCopy();
  const locale = useLocale();
  return (
    <Carousel opts={{ loop: true }} className="w-full">
      <CarouselContent>
        {photos.map((src, i) => (
          <CarouselItem key={src}>
            {/* object-contain statt object-cover: Quellfotos haben unterschiedliche
                Seitenverhältnisse, ein hartes Cover-Crop hätte sonst regelmäßig Köpfe
                abgeschnitten. Überschüssiger Raum wird gelettert, nicht zugeschnitten. */}
            <div className="flex h-56 w-full items-center justify-center overflow-hidden rounded-lg bg-muted sm:h-64 lg:h-72">
              <img
                src={src}
                alt={
                  pick(alts?.[i], locale) ??
                  `${title} – ${c.events.photoFallback} ${i + 1}`
                }
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
  const c = useCopy();
  const locale = useLocale();
  const a = ev.assets ?? {};
  if (!a.youtubeUrl) return null;
  const embed = getYouTubeEmbedUrl(a.youtubeUrl);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
      {playing && embed ? (
        <iframe
          src={embed}
          title={`${c.events.shortTitle}: ${pick(ev.title, locale)}`}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 flex items-center justify-center"
          aria-label={`${c.events.playAftermovie} ${pick(ev.title, locale)}`}
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
  const c = useCopy();
  const embed = getYouTubeEmbedUrl(url);

  return (
    <div>
      {/* Zentriert wie das Video darunter, das mittig in der Spalte sitzt. */}
      <div className="mb-3 text-center">
        <h3 className="text-base font-semibold">{c.events.shortTitle}</h3>
      </div>
      {/*
        Hochkant-Video, also das höchste Einzelteil der Karte: 12rem Breite
        ergeben rund 340px Höhe. Bei den vorherigen 18rem waren es über 500px –
        allein dieses eine Element füllte damit den halben Bildschirm.
      */}
      <div className="relative mx-auto aspect-[9/16] w-full max-w-[12rem] overflow-hidden rounded-lg bg-muted">
        {playing && embed ? (
          <iframe
            src={embed}
            title={`${c.events.shortTitle}: ${title}`}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 flex items-center justify-center"
            aria-label={`${c.events.playShort} ${title}`}
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
            <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg transition-transform group-hover:scale-110">
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
  const c = useCopy();
  const locale = useLocale();
  const a = ev.assets ?? {};
  const title = pick(ev.title, locale);

  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card hover:shadow-lg transition-shadow">
      {/*
        Vorher lief diese Karte in vier vollbreiten Blöcken untereinander:
        Kopf, Hochkant-Video, Aftermovie, Foto-Karussell. Zusammen waren das
        gut 1800px – mehrere Bildschirme für ein einziges Event. Jetzt steht
        je zwei davon nebeneinander, sobald die Breite reicht.
      */}
      <div className="space-y-5 p-5">
        <div
          className={`grid items-start gap-5 ${a.youtubeUrl ? "lg:grid-cols-2" : ""}`}
        >
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <ColumnChip column={ev.column} />
              {ev.highlightBadge && (
                <span className="rounded-full gradient-psychedelic px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                  {pick(ev.highlightBadge, locale)}
                </span>
              )}
              {ev.partnerCredit && <CreditBadge credit={ev.partnerCredit} />}
              <span>{formatEventDate(ev.date, locale)}</span>
            </div>

            <h3 className="text-xl font-semibold leading-snug">{title}</h3>
            {ev.location ? (
              <p className="text-sm text-muted-foreground">
                {pick(ev.location, locale)}
              </p>
            ) : null}
            {ev.description ? (
              <p className="text-sm text-muted-foreground">
                {pick(ev.description, locale)}
              </p>
            ) : null}
            {(a.attendees || a.rating || a.recommendPercent) && (
              <p className="text-sm text-muted-foreground">
                {[
                  a.attendees ? `${a.attendees} ${c.events.attendees}` : null,
                  a.rating ? `${a.rating} ${c.events.rating}` : null,
                  a.recommendPercent
                    ? `${a.recommendPercent}% ${c.events.recommend}`
                    : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
          </div>

          {a.youtubeUrl ? <GatheringAftermovie ev={ev} /> : null}
        </div>

        {/* Karussell und Hochkant-Video teilen sich die zweite Reihe – allein
            stünde jedes von beiden wieder über die ganze Breite. Die Spalten
            nur dann, wenn es auch zwei Dinge zu verteilen gibt. */}
        {a.photos?.length || a.shortsUrl ? (
          <div
            className={`grid items-start gap-5 ${
              a.photos?.length && a.shortsUrl
                ? "lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
                : ""
            }`}
          >
            {a.photos?.length ? (
              <GatheringPhotoCarousel photos={a.photos} alts={a.photoAlts} title={title} />
            ) : null}
            {a.shortsUrl ? (
              <GatheringShort url={a.shortsUrl} title={title} thumbnail={a.shortsThumbnail} />
            ) : null}
          </div>
        ) : null}

        {isLumaLink(ev.registrationUrl) && (
          <a
            href={ev.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            {c.events.lumaLink}
          </a>
        )}
      </div>

      {ev.partnerCredit ? <PartnerCreditStrip credit={ev.partnerCredit} /> : null}
    </div>
  );
}

// ── Zeitstrahl ──────────────────────────────────────────────────────────────

/**
 * Ein Termin der Lecture-Reihe, für den noch kein Thema feststeht. Bewusst
 * schmal und gestrichelt: Die Aussage ist der Takt, nicht der Inhalt.
 */
function SeriesRow({ series }: { series: SeriesDate }) {
  const c = useCopy();
  const locale = useLocale();
  return (
    <div className="rounded-xl border border-dashed border-border bg-card/50 px-5 py-3.5">
      <div className="mb-1.5 flex flex-wrap items-center gap-2">
        <ColumnChip column={series.column} />
        <span className="text-xs text-muted-foreground md:hidden">
          {formatEventDate(series.date, locale)} ·{" "}
          {formatRelativeToToday(series.date, locale)}
        </span>
      </div>
      <p className="font-heading text-base font-semibold text-foreground">
        {series.labelKey === "semesterStart"
          ? c.events.seriesSemesterLabel
          : c.events.seriesLabel}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        {series.time} · {series.location} – {c.events.seriesNote}
      </p>
    </div>
  );
}

/**
 * Verlinkt die Nennung der Partnerorganisation im Fließtext. Der Name steht
 * dort ohnehin, und aus dem Satz heraus verlinkt führt er weiter, ohne dass
 * die Karte dafür eine zusätzliche Linkzeile braucht. Die URL kommt aus
 * demselben Objekt wie der Chip – sie steht nicht zweimal in den Daten.
 */
function PartnerLinkedText({
  text,
  partner,
}: {
  text: string;
  partner: { short: string; url: string };
}) {
  const parts = text.split(partner.short);
  if (parts.length === 1) return <>{text}</>;

  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <a
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:no-underline"
            >
              {partner.short}
            </a>
          )}
          {part}
        </Fragment>
      ))}
    </>
  );
}

/** Meilenstein: kein Termin, sondern etwas, das seitdem da ist. */
function MilestoneCard({ milestone }: { milestone: PsngMilestone }) {
  const locale = useLocale();
  return (
    <div className="rounded-2xl border border-border bg-card p-5 hover:shadow-lg transition-shadow">
      <div className="mb-2.5 flex flex-wrap items-center gap-2">
        <ColumnChip column={milestone.column} />
        {milestone.badge && (
          <span className="rounded-full gradient-psychedelic px-2.5 py-0.5 text-xs font-heading font-medium text-primary-foreground">
            {pick(milestone.badge, locale)}
          </span>
        )}
        {milestone.partner && (
          <PartnerBadge
            short={milestone.partner.short}
            name={milestone.partner.name}
            url={milestone.partner.url}
            tone={milestone.partner.tone}
          />
        )}
        <span className="text-xs text-muted-foreground md:hidden">
          {formatEventDate(milestone.date, locale)}
        </span>
      </div>
      {/* Das 16:9-Bild lag vorher über dem Text und damit über die ganze
          Kartenbreite – rund 550px Höhe für einen Screengrab neben drei Zeilen
          Text. Daneben gestellt trägt es dieselbe Aussage auf einem Drittel
          der Höhe. */}
      <div
        className={`grid gap-4 ${
          milestone.image ? "sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]" : ""
        }`}
      >
        {milestone.image && (
          <div className="overflow-hidden rounded-lg border border-border/60 bg-muted">
            <img
              src={milestone.image}
              alt=""
              width={960}
              height={540}
              loading="lazy"
              decoding="async"
              className="aspect-video w-full object-cover"
            />
          </div>
        )}
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-1.5 leading-snug">
            {pick(milestone.title, locale)}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {milestone.partner ? (
              <PartnerLinkedText
                text={pick(milestone.description, locale)}
                partner={milestone.partner}
              />
            ) : (
              pick(milestone.description, locale)
            )}
          </p>
          {milestone.links?.length ? (
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
              {milestone.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {pick(link.label, locale)} →
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
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

/**
 * Ein Eintrag als Kachel auf der Schiene: so viel, dass man erkennt, worum es
 * geht, und so wenig, dass zwanzig davon nebeneinander passen. Die ganze Karte
 * steht darunter im Detailbereich – hier oben geht es nur ums Finden.
 */
function RailCard({
  entry,
  selected,
  isNext,
  onSelect,
}: {
  entry: TimelineEntry;
  selected: boolean;
  /** Der nächste anstehende Termin – der einzige Eintrag mit vollem Akzent. */
  isNext: boolean;
  onSelect: () => void;
}) {
  const c = useCopy();
  const locale = useLocale();
  const meta = railMeta(entry, locale, c);

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={selected ? "true" : undefined}
      className={`flex h-full w-full flex-col overflow-hidden rounded-xl border bg-card p-4 text-left transition-shadow hover:shadow-lg ${
        selected
          ? "border-primary shadow-lg ring-1 ring-primary"
          : "border-border/60"
      } ${entry.kind === "series" ? "border-dashed bg-card/50" : ""}`}
    >
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        <ColumnChip column={entry.column} />
        {isNext && (
          <span className="rounded-full gradient-psychedelic px-2 py-0.5 text-xs font-heading font-medium text-primary-foreground">
            {c.events.nextUp}
          </span>
        )}
      </div>

      {/* Das Vorschaubild ist das, was eine Kachel auf einen Blick unterscheidbar
          macht. Wo keins da ist, bleibt die Fläche leer statt mit einem
          Platzhalter gefüllt – eine graue Box sagt weniger als nichts. */}
      {meta.thumb ? (
        <div className="mb-2.5 aspect-video w-full shrink-0 overflow-hidden rounded-lg bg-muted">
          <img
            src={meta.thumb}
            alt=""
            loading="lazy"
            decoding="async"
            className={`h-full w-full ${meta.thumbFit}`}
          />
        </div>
      ) : null}

      <h3 className="line-clamp-2 font-heading text-sm font-semibold leading-snug text-foreground">
        {meta.title}
      </h3>
      {meta.line ? (
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {meta.line}
        </p>
      ) : null}
    </button>
  );
}

/**
 * Was auf einer Kachel steht – je nach Art des Eintrags aus einer anderen
 * Ecke der Daten. Als eine Funktion und nicht als drei Kachel-Komponenten:
 * Der Unterschied zwischen einem Event, einem Reihentermin und einem
 * Meilenstein sind hier genau drei Felder, keine eigene Gestaltung.
 */
function railMeta(entry: TimelineEntry, locale: Locale, c: ReturnType<typeof useCopy>) {
  if (entry.kind === "series") {
    return {
      title:
        entry.series.labelKey === "semesterStart"
          ? c.events.seriesSemesterLabel
          : c.events.seriesLabel,
      line: `${entry.series.time} · ${entry.series.location}`,
      thumb: undefined,
      thumbFit: "object-cover",
    };
  }

  if (entry.kind === "milestone") {
    return {
      title: pick(entry.milestone.title, locale),
      line: undefined,
      thumb: entry.milestone.image,
      thumbFit: "object-cover",
    };
  }

  const ev = entry.event;
  const a = ev.assets ?? {};
  // Das Portraitfoto zuerst: Bei einem Vortrag ist der Mensch das Merkmal,
  // nicht das Standbild aus dem Video.
  const thumb = a.speakerPhoto ?? a.youtubeThumbnail ?? a.photos?.[0];
  return {
    title: pick(ev.title, locale),
    line: ev.speaker ?? pick(ev.location, locale) ?? pick(ev.subtitle, locale),
    thumb,
    thumbFit: a.speakerPhoto ? "object-cover object-top" : "object-cover",
  };
}

/**
 * Die Schiene selbst: Achse mit Punkten, darunter Datum und Kachel.
 *
 * Jede Spalte zeichnet ihr eigenes Stück der Achse. Eine durchgehende Linie
 * als ein absolut gesetztes Element müsste die Breite des gescrollten Inhalts
 * kennen – so ergibt sie sich von selbst und bleibt auch dann richtig, wenn
 * der Filter die Hälfte der Einträge entfernt.
 */
function RailItem({
  entry,
  selected,
  isNext,
  upcoming,
  onSelect,
  innerRef,
}: {
  entry: TimelineEntry;
  selected: boolean;
  isNext: boolean;
  upcoming: boolean;
  onSelect: () => void;
  innerRef?: (el: HTMLLIElement | null) => void;
}) {
  const locale = useLocale();
  const dot = upcoming
    ? isNext
      ? "border-2 border-primary bg-background ring-4 ring-primary/10"
      : "border-2 border-primary/35 bg-background"
    : "bg-primary/30";

  return (
    <li
      ref={innerRef}
      id={entry.id}
      className="flex w-[15.5rem] shrink-0 snap-start flex-col scroll-mt-36 sm:w-[17rem]"
    >
      <div className="relative h-6">
        <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-border" />
        <span
          aria-hidden="true"
          className={`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ${dot}`}
        />
      </div>

      <div className="px-4 pb-2 pt-2 text-center">
        <p className="font-heading text-xs font-medium text-foreground">
          {formatEventDateShort(entry.date, locale)}
        </p>
        {upcoming ? (
          <p className="text-[0.7rem] text-muted-foreground">
            {formatRelativeToToday(entry.date, locale)}
          </p>
        ) : null}
      </div>

      <div className={`min-h-0 flex-1 px-1.5 pb-1 ${isNext ? "next-event-glow" : ""}`}>
        <RailCard entry={entry} selected={selected} isNext={isNext} onSelect={onSelect} />
      </div>
    </li>
  );
}

/**
 * Der Trennpunkt zwischen vorbei und kommt noch. Er ist der Grund für die
 * ganze waagerechte Anordnung: Beim Öffnen steht er im Bild, links davon
 * liegt, was war, rechts, was kommt – man landet an der Stelle, an der man
 * gerade steht, statt am Anfang oder am Ende einer Liste.
 */
function RailToday({ innerRef }: { innerRef: (el: HTMLLIElement | null) => void }) {
  const c = useCopy();
  return (
    <li
      ref={innerRef}
      className="flex w-16 shrink-0 snap-center flex-col items-center"
    >
      <div className="relative h-6 w-full">
        <span className="absolute inset-x-0 top-1/2 h-px bg-border" />
      </div>
      <p className="pb-2 pt-2 font-heading text-xs font-medium uppercase tracking-[0.15em] text-primary">
        {c.events.today}
      </p>
      <span className="w-px flex-1 bg-gradient-to-b from-primary/40 to-transparent" />
    </li>
  );
}

/**
 * Die waagerechte Schiene mit ihren beiden Blätterknöpfen.
 *
 * Reihenfolge: älteste Vergangenheit ganz links, Zukunft nach rechts – so
 * herum, wie eine Zeitachse gelesen wird. Die Daten kommen in der umgekehrten
 * Reihenfolge (beide Listen absteigend, weil der Zeitstrahl vorher senkrecht
 * von fern nach nah lief) und werden hier gedreht.
 */
function TimelineRail({
  past,
  upcoming,
  selectedId,
  nextId,
  onSelect,
}: {
  past: TimelineEntry[];
  upcoming: TimelineEntry[];
  selectedId?: string;
  nextId?: string;
  onSelect: (id: string) => void;
}) {
  const c = useCopy();
  const scroller = useRef<HTMLOListElement>(null);
  const todayMark = useRef<HTMLLIElement | null>(null);
  const items = useRef(new Map<string, HTMLLIElement>());
  /** Ob schon einmal gescrollt wurde – siehe die Auswahl-Wirkung weiter unten. */
  const settled = useRef(false);

  const olderFirst = [...past].reverse();
  const soonerFirst = [...upcoming].reverse();

  /*
   * Beim Aufbau auf „heute" stellen, und zwar in der Schiene selbst statt über
   * scrollIntoView: Das würde auch die Seite senkrecht verschieben und die
   * Sektion beim bloßen Laden unter der Navigationsleiste hervorziehen.
   *
   * Nicht ganz an den linken Rand, sondern auf ein Drittel: Ein Stück
   * Vergangenheit soll sichtbar bleiben, sonst sieht die Schiene aus, als
   * begänne sie hier – und die Richtung, aus der sie kommt, ist die halbe
   * Aussage.
   */
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const mark = todayMark.current;
    if (mark) {
      el.scrollLeft = Math.max(0, mark.offsetLeft - el.clientWidth / 3);
      return;
    }
    // Ohne Marker fehlt eine der beiden Hälften – etwa weil der Filter sie
    // leergeräumt hat. Sind alle Einträge vorbei, steht das Interessante ganz
    // rechts; ist alles noch offen, ganz links.
    el.scrollLeft = upcoming.length === 0 ? el.scrollWidth : 0;
  }, [past.length, upcoming.length]);

  // Ein Deep-Link oder ein Klick im Detailbereich soll die Kachel dazu auch
  // sichtbar machen – sie kann weit außerhalb des Ausschnitts liegen.
  useEffect(() => {
    /*
     * Beim Aufbau nicht: Da hat die Wirkung darüber gerade „heute" ins Bild
     * gerückt, und die Vorauswahl ist ohnehin der Termin direkt daneben. Auf
     * einem Telefon, wo nur eine Kachel ins Bild passt, schöbe ein Zentrieren
     * genau den Punkt wieder hinaus, wegen dem die Schiene waagerecht läuft.
     */
    if (!settled.current) {
      settled.current = true;
      return;
    }
    if (!selectedId) return;
    const el = scroller.current;
    const item = items.current.get(selectedId);
    if (!el || !item) return;
    const left = item.offsetLeft - el.clientWidth / 2 + item.clientWidth / 2;
    const visible =
      item.offsetLeft >= el.scrollLeft &&
      item.offsetLeft + item.clientWidth <= el.scrollLeft + el.clientWidth;
    if (!visible) el.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [selectedId]);

  const page = (direction: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const register = (id: string) => (el: HTMLLIElement | null) => {
    if (el) items.current.set(id, el);
    else items.current.delete(id);
  };

  const arrowClass =
    "absolute top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/95 text-foreground shadow-sm transition-colors hover:bg-muted md:flex";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => page(-1)}
        aria-label={c.events.railPrev}
        className={`${arrowClass} -left-4`}
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => page(1)}
        aria-label={c.events.railNext}
        className={`${arrowClass} -right-4`}
      >
        <ChevronRight size={18} aria-hidden="true" />
      </button>

      {/*
        Die Schiene ist selbst fokussierbar: Wer mit der Tastatur arbeitet, kann
        sie mit den Pfeiltasten verschieben, ohne sich durch jede Kachel
        tabben zu müssen.
      */}
      <ol
        ref={scroller}
        tabIndex={0}
        aria-label={c.events.railLabel}
        className="flex snap-x snap-mandatory items-stretch overflow-x-auto pb-3 [scrollbar-width:thin]"
      >
        {olderFirst.map((entry) => (
          <RailItem
            key={entry.id}
            entry={entry}
            upcoming={false}
            selected={entry.id === selectedId}
            isNext={false}
            onSelect={() => onSelect(entry.id)}
            innerRef={register(entry.id)}
          />
        ))}

        {/* Ist eine Hälfte leergefiltert, wäre der Marker nur noch ein Strich
            mit der Aussage „hier hört es auf". */}
        {olderFirst.length > 0 && soonerFirst.length > 0 && (
          <RailToday innerRef={(el) => (todayMark.current = el)} />
        )}

        {soonerFirst.map((entry) => (
          <RailItem
            key={entry.id}
            entry={entry}
            upcoming
            selected={entry.id === selectedId}
            isNext={entry.id === nextId}
            onSelect={() => onSelect(entry.id)}
            innerRef={register(entry.id)}
          />
        ))}
      </ol>
    </div>
  );
}

// ── Filter ──────────────────────────────────────────────────────────────────

const filters = ["alle", "vortraege", "community"] as const;
type Filter = (typeof filters)[number];

const EventsSection = () => {
  // Der Filter liegt in der URL, damit man auf eine gefilterte Ansicht
  // verlinken kann und der Zurück-Button den Wechsel rückgängig macht.
  const c = useCopy();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const param = searchParams.get("events");
  const filter: Filter = (filters as readonly string[]).includes(param ?? "")
    ? (param as Filter)
    : "alle";

  const { upcoming, past } = getTimelineEntries();
  const matches = (entry: TimelineEntry) => filter === "alle" || entry.column === filter;
  const upcomingShown = upcoming.filter(matches);
  const pastShown = past.filter(matches);

  // Beide Listen laufen absteigend, von fern nach nah – der nächste Termin
  // steht also am Ende der kommenden, der jüngste vergangene am Anfang der
  // anderen. Die Schiene dreht das für die Anzeige um.
  const nextId = upcomingShown.at(-1)?.id;

  /*
   * Welcher Eintrag ausführlich darunter steht.
   *
   * Der Zustand ist nur die Wahl des Besuchers; was tatsächlich gilt, wird
   * daraus abgeleitet. Sonst bliebe nach einem Filterwechsel ein Eintrag
   * ausgewählt, den es in der Ansicht gar nicht mehr gibt, und der
   * Detailbereich zeigte etwas, wozu keine Kachel mehr existiert.
   *
   * Ohne eigene Wahl ist es der nächste anstehende Termin – das ist die
   * Antwort auf die Frage, mit der die meisten hier ankommen. Steht nichts
   * mehr an, der jüngste vergangene.
   */
  const [picked, setPicked] = useState<string | undefined>(() =>
    location.hash.length > 1 ? location.hash.slice(1) : undefined,
  );

  /*
   * Der Anker gilt nicht nur beim Öffnen der Seite. „Teil von <Abend>" in
   * einer Karte verweist auf einen anderen Eintrag, und das ist eine ganz
   * normale Navigation innerhalb der Seite – ohne das hier änderte sich beim
   * Klick nur die Adresszeile.
   *
   * Der Anfangswert oben bleibt trotzdem stehen: Er greift schon beim ersten
   * Rendern, sodass beim Aufruf eines Deep-Links nicht erst der nächste Termin
   * aufblitzt und dann der gemeinte.
   */
  useEffect(() => {
    if (location.hash.length > 1) setPicked(location.hash.slice(1));
  }, [location.hash]);
  const shown = [...upcomingShown, ...pastShown];
  const fallbackId = nextId ?? pastShown[0]?.id;
  const selectedId = shown.some((e) => e.id === picked) ? picked : fallbackId;
  const selected = shown.find((e) => e.id === selectedId);

  const detail = useRef<HTMLDivElement>(null);

  /*
   * Der Detailbereich liegt unter der Schiene. Wer eine Kachel anklickt, ohne
   * dass er im Bild ist, sähe sonst nur, wie sich der Rahmen der Kachel
   * ändert – die eigentliche Antwort stünde außerhalb des Fensters.
   *
   * Nur dann, und nur so weit, dass die Schiene sichtbar bleibt: Ein Sprung
   * bei jedem Klick wäre lästiger als gar keiner, und wer sie oben behält,
   * kann weiterblättern, ohne jedes Mal zurückzuscrollen.
   */
  const select = (id: string) => {
    setPicked(id);
    requestAnimationFrame(() => {
      const el = detail.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 160) return;
      window.scrollTo({
        top: window.scrollY + top - window.innerHeight * 0.55,
        behavior: "smooth",
      });
    });
  };
  const filterLabels: Record<Filter, string> = {
    alle: c.events.filters.all,
    vortraege: c.events.filters.talks,
    community: c.events.filters.community,
  };

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
          eyebrow={c.events.eyebrow}
          title={c.events.title}
          intro={
            <>
              {c.events.introBefore}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:no-underline"
              >
                WhatsApp
              </a>
              {c.events.introMiddle}
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:no-underline"
              >
                Instagram
              </a>
              {c.events.introAfter}
            </>
          }
        />

        <p className="mx-auto mb-8 max-w-3xl text-center text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            {c.events.seriesNoteBefore}
          </span>{" "}
          {c.events.seriesNoteEvery} {LECTURE_SERIES.time} {c.events.seriesNoteClock}{" "}
          {c.events.seriesNoteOn} {LECTURE_SERIES.location}.{" "}
          {c.events.seriesNoteAfter}
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

        {/*
          Die Schiene läuft über die volle Breite der Sektion – jede Kachel
          mehr, die ins Bild passt, ist der Sinn der Sache. Der Detailbereich
          darunter bleibt schmaler: Fließtext über 1150px liest sich schlecht,
          und die große Gathering-Karte braucht trotzdem Platz.
        */}
        <TimelineRail
          past={pastShown}
          upcoming={upcomingShown}
          selectedId={selectedId}
          nextId={nextId}
          onSelect={select}
        />

        {selected ? (
          <div ref={detail} className="mx-auto mt-8 max-w-5xl">
            <EntryCard entry={selected} i={0} />
          </div>
        ) : null}

        <div className="mt-14 rounded-2xl border border-border/60 bg-muted/40 p-8 text-center">
          <h3 className="text-xl font-semibold">{c.events.ownLectureTitle}</h3>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            {c.events.ownLectureText}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              to="/?subject=vortrag#kontakt"
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {c.events.proposeTalk}
            </Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              {c.events.askInWhatsapp}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
