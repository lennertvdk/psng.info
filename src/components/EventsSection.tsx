import { motion } from "framer-motion";
import { Calendar, MapPin, Video } from "lucide-react";

const events = [
  {
    date: "17. März 2026",
    time: "18:00 – 19:00",
    title: "1. PSNG Community Call",
    location: "Zoom",
    tag: "Community",
  },
  {
    date: "7. April 2026",
    time: "17:00 – 18:00",
    title: "1. PSNG Lecture",
    location: "Zoom",
    tag: "Lecture",
  },
  {
    date: "21. April 2026",
    time: "17:00 – 18:00",
    title: "2. PSNG Community Call",
    location: "Zoom",
    tag: "Community",
  },
  {
    date: "5. Mai 2026",
    time: "17:00 – 18:00",
    title: "2. PSNG Lecture",
    location: "Zoom",
    tag: "Lecture",
  },
  {
    date: "19. Mai 2026",
    time: "17:00 – 18:00",
    title: "3. PSNG Community Call",
    location: "Zoom",
    tag: "Community",
  },
  {
    date: "2. Juni 2026",
    time: "17:00 – 18:00",
    title: "3. PSNG Lecture",
    location: "Zoom",
    tag: "Lecture",
  },
];

const EventsSection = () => {
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
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {events.map((event, i) => (
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
                      {event.date}, {event.time}
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
      </div>
    </section>
  );
};

export default EventsSection;
