import { motion } from "framer-motion";
import { Calendar, MapPin, Video } from "lucide-react";
import { formatEventDate, getUpcomingEvents } from "@/data/events";

const EventsSection = () => {
  const upcomingEvents = getUpcomingEvents();

  return (
    <section id="events" className="py-24 md:py-32 gradient-soft">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-6"
        >
          <p className="font-heading text-sm uppercase tracking-[0.2em] text-primary mb-4">
            Events
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Kommende Veranstaltungen
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-12">
            Wir hosten regelmäßige Events: Community Calls zur Vernetzung,
            Lectures mit wissenschaftlichem Input und mehr. Diesen Sommer findet
            ein Community-Event vor Ort statt!
          </p>
        </motion.div>
        {upcomingEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {upcomingEvents.map((event, i) => (
              <motion.div
                key={event.title + event.date}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card rounded-xl p-5 border border-border hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg gradient-psychedelic flex items-center justify-center">
                    <Video className="text-primary-foreground" size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-heading font-medium mb-2">
                      {event.tag}
                    </span>
                    <h3 className="font-heading text-sm font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-primary" />
                        {formatEventDate(event.date)}, {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-primary" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center bg-card rounded-xl p-8 border border-border"
          >
            <p className="text-muted-foreground text-sm">
              Aktuell sind keine neuen Termine geplant – schau bald wieder
              vorbei oder folge uns auf{" "}
              <a
                href="https://www.instagram.com/psng.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
              >
                Instagram
              </a>{" "}
              für Updates.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
