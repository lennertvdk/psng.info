import { motion } from "framer-motion";
import { events } from "@/data/events";
import { getYouTubeThumbnail } from "@/lib/youtube";

const AnnouncementBar = () => {
  const lecture = events.find((e) => e.id === "lecture-lonergan-2026-06");
  const youtubeUrl = lecture?.assets?.youtubeUrl;
  if (!youtubeUrl) return null;

  const thumb = getYouTubeThumbnail(youtubeUrl);

  return (
    <section className="px-6 pt-16 pb-2 md:pt-24">
      <motion.a
        href="#lonergan-lecture"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="group max-w-3xl mx-auto flex items-center gap-4 rounded-2xl border border-border bg-card/90 backdrop-blur px-4 py-3 sm:px-5 sm:py-4 shadow-lg hover:shadow-xl hover:border-primary/40 transition-all"
      >
        {thumb && (
          <div className="relative shrink-0 w-24 sm:w-32 aspect-video rounded-lg overflow-hidden bg-muted">
            <img
              src={thumb}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/40 transition-colors">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-heading text-xs uppercase tracking-[0.2em] text-primary mb-1">
            Neue Aufnahme
          </p>
          <p className="text-foreground font-medium leading-snug">
            Willst du verstehen, wie Psychedelika im Gehirn wirken?{" "}
            <span className="text-muted-foreground">
              Schau dir Eric Lonergans Lecture „Introduction to Psychedelic Neuroscience" an.
            </span>
          </p>
        </div>
        <span className="hidden sm:inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary group-hover:underline">
          Ansehen →
        </span>
      </motion.a>
    </section>
  );
};

export default AnnouncementBar;
