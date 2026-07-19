import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import {
  getHighlightEvents,
  formatEventDate,
  eventColumnLabels,
  speakerTypeLabels,
  type PsngEvent,
} from "@/data/events";
import { getYouTubeThumbnail, getYouTubeEmbedUrl } from "@/lib/youtube";

const WHATSAPP_LINK = "https://chat.whatsapp.com/LBUA3UpzOV9BW1v59EZK8w?s=cl&p=i&ilr=1";

interface HighlightsProps {
  /** Ziel des "Vortrag vorschlagen"-Buttons. Default: Kontakt auf Startseite. */
  contactHref?: string;
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

export default function Highlights({ contactHref = "/?subject=vortrag#kontakt" }: HighlightsProps) {
  const items = useMemo(() => getHighlightEvents(), []);
  if (items.length === 0) return null;

  return (
    <section id="aufnahmen" className="py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Vergangene Events"
          title="Was bei uns schon passiert ist"
          intro="Eigene Events zum Nachschauen und Nachlesen, sowie Konferenzen und Community-Events, auf denen sich das PSNG getroffen hat."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((ev) => (
            <motion.div
              key={ev.id}
              id={
                ev.id === "kickoff-2026-03-03"
                  ? "kickoff"
                  : ev.id === "lecture-lonergan-2026-06"
                    ? "lonergan-lecture"
                    : undefined
              }
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
              href={contactHref}
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
      </div>
    </section>
  );
}
