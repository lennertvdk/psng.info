import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Video } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { eventCategoryLabels, formatEventDate, getUpcomingEvents } from "@/data/events";

const EventsSection = () => {
  const upcomingEvents = getUpcomingEvents();
  const upcomingSpecialEvents = upcomingEvents.filter(
    (event) => event.category !== "lecture" && event.category !== "community-call",
  );

  return (
    <section id="events" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Events"
          title="Kommende Veranstaltungen"
          intro="Hier findest du unsere nächsten Termine sowie unsere regelmäßigen Formate, an denen du teilnehmen kannst."
        />

        <div className="grid gap-8 lg:grid-cols-2 mb-12 items-start">
          <div className="grid gap-6">
            {upcomingSpecialEvents.length > 0 ? (
              upcomingSpecialEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                <div className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl gradient-psychedelic flex items-center justify-center">
                      {event.category === "gathering" ? (
                        <Users className="text-primary-foreground" size={20} />
                      ) : (
                        <Video className="text-primary-foreground" size={20} />
                      )}
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-heading font-medium">
                        {eventCategoryLabels[event.category]}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {event.description ?? "Weitere Details zum Event folgen bald."}
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">Datum:</span> {formatEventDate(event.date)}
                    </p>
                    {event.location ? (
                      <p>
                        <span className="font-medium text-foreground">Ort:</span> {event.location}
                      </p>
                    ) : null}
                  </div>
                </div>
                {event.category === "gathering" ? (
                  <a
                    href="https://www.instagram.com/psng.info/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-primary/30 px-4 py-2 text-sm font-heading font-medium text-primary hover:bg-primary/5 transition-colors"
                  >
                    Folge uns auf Instagram, um nichts zu verpassen
                  </a>
                ) : null}
                </motion.div>
              ))
            ) : (
              <div className="rounded-2xl border border-border bg-card p-8 text-center hover:shadow-lg transition-shadow">
                <p className="text-sm text-muted-foreground">
                  Aktuell sind keine besonderen Vor-Ort-Events geplant.
                </p>
              </div>
            )}
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow">
            <p className="font-heading text-sm uppercase tracking-[0.2em] text-primary mb-4">
              Regelmäßige Formate
            </p>
            <div className="grid gap-4">
              <div className="rounded-2xl border border-border/70 bg-muted p-5">
                <h4 className="font-heading text-lg font-semibold text-foreground mb-2">
                  Community Calls
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Unsere Community Calls finden in der Regel am 4. Dienstag im Monat statt. Hier vernetzen wir uns, tauschen aktuelle Projekte aus und planen gemeinsames Engagement.
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-muted p-5">
                <h4 className="font-heading text-lg font-semibold text-foreground mb-2">
                  Lectures
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Lectures bieten fachlichen Input und finden üblicherweise am 2. Dienstag im Monat statt. Themen reichen von Forschung über Projekte bis zu psychedelischer Kultur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
