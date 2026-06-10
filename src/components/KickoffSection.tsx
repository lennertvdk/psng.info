import { motion } from "framer-motion";
import { ExternalLink, Youtube } from "lucide-react";

const slidesUrl =
  "https://www.canva.com/design/DAHBkDM0-8o/t39605od4UYhUdlL0MnidQ/view?embed";
const slidesViewUrl =
  "https://www.canva.com/design/DAHBkDM0-8o/t39605od4UYhUdlL0MnidQ/view";

// TODO: Replace with the embed URL of the kick-off recording once it's
// uploaded, e.g. https://www.youtube.com/embed/<VIDEO_ID>
const kickoffVideoEmbedUrl: string | null = null;
const youtubeChannelUrl = "https://www.youtube.com/channel/UCMHHH4dOREJTJF_ySpgV7mA";

const KickoffSection = () => {
  return (
    <section id="kickoff" className="py-24 md:py-32 gradient-soft">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <p className="font-heading text-sm uppercase tracking-[0.2em] text-primary mb-4">
            03. März 2026
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Unser Kick-off
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Beim Kick-off-Event hat sich das PSNG erstmals vorgestellt: wer
            wir sind, was unsere Mission ist – und wie du aktiv werden,
            einer Lokalgruppe beitreten oder deine eigene gründen kannst.
            Danke an alle, die dabei waren!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl border border-border overflow-hidden"
          >
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={slidesUrl}
                title="PSNG Kick-off Slides"
                loading="lazy"
                allow="fullscreen"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="font-heading text-sm font-semibold text-foreground">
                Kick-off Slides
              </span>
              <a
                href={slidesViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                <ExternalLink size={12} />
                In Canva öffnen
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-card rounded-2xl border border-border overflow-hidden"
          >
            {kickoffVideoEmbedUrl ? (
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src={kickoffVideoEmbedUrl}
                  title="PSNG Kick-off Aufzeichnung"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            ) : (
              <div className="relative w-full flex flex-col items-center justify-center gap-4 bg-muted/40 text-center p-8" style={{ paddingBottom: "56.25%" }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
                  <Youtube className="text-primary" size={36} />
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Die Aufzeichnung des Kick-offs findest du auf unserem
                    YouTube-Kanal.
                  </p>
                  <a
                    href={youtubeChannelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg gradient-psychedelic text-primary-foreground font-heading font-medium text-sm hover:opacity-90 transition-opacity"
                  >
                    Zum YouTube-Kanal
                  </a>
                </div>
              </div>
            )}
            <div className="p-4 flex items-center justify-between">
              <span className="font-heading text-sm font-semibold text-foreground">
                Kick-off Aufzeichnung
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default KickoffSection;
