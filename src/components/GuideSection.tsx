import { motion } from "framer-motion";
import { Rocket, Target, Handshake, FileText, BookOpen, Users, MessageSquare, ClipboardList } from "lucide-react";

const principles = [
  {
    icon: Rocket,
    title: "Fang einfach an",
    desc: "Warte nicht auf den perfekten Zeitpunkt. Der erste Schritt ist der wichtigste.",
  },
  {
    icon: Target,
    title: "Realistische Erwartungen",
    desc: "Gruppen fluktuieren. Lass dich von schwächeren Phasen nicht entmutigen – jedes Treffen bringt Erfahrung.",
  },
  {
    icon: Handshake,
    title: "Hol dir Unterstützung",
    desc: "Delegiere Aufgaben (Social Media, Raumsuche, Protokolle). Wer Verantwortung übernimmt, bleibt langfristig dabei.",
  },
  {
    icon: FileText,
    title: "Code of Conduct",
    desc: "Wissenschaftsbasiert, kein Substanzkonsum oder -verkauf, keine therapeutischen Angebote.",
  },
];

const steps = [
  {
    icon: Users,
    title: "1. Team zusammenstellen",
    desc: "Finde 2–3 Mitstreiter*innen an deiner Hochschule, die Interesse an psychedelischer Forschung haben.",
  },
  {
    icon: MessageSquare,
    title: "2. Kontakt zum PSNG",
    desc: "Melde dich bei uns unter kontakt@psng.info – wir unterstützen euch beim Aufbau und vernetzen euch mit anderen Gruppen.",
  },
  {
    icon: ClipboardList,
    title: "3. Erstes Treffen planen",
    desc: "Nutzt unser Psychedelic Curriculum als Leitfaden für eure ersten Veranstaltungen. Themen, Formate und Diskussionsfragen sind vorbereitet.",
  },
  {
    icon: BookOpen,
    title: "4. Ressourcen nutzen",
    desc: "Greift auf unser modulares Lernökosystem zu: Kurzeinführungen, Reviews, vertiefende Literatur und Diskussionsfragen für Journal Clubs.",
  },
];

const curriculumTopics = [
  { num: "01", title: "Einführung – Psychedelika: Wundermittel oder Hype?", desc: "Was sind Psychedelika, warum ist das Thema so präsent – und was hält einer kritischen Betrachtung stand?" },
  { num: "02", title: "Geschichte", desc: "Von schamanischen Ritualen über den Forschungshype der 1960er bis zum Verbot und zur heutigen Renaissance." },
  { num: "03", title: "Stoffklassen und Klassifikation", desc: "Tryptamine, Phenethylamine, Entaktogene, Dissoziative – Wirkung, Pharmakologie und Unterschiede." },
  { num: "04", title: "Neurowissenschaft", desc: "Wie wirken Psychedelika im Gehirn? Serotonin-Rezeptoren, Default Mode Network und Neuroplastizität." },
  { num: "05", title: "Klinische Forschung", desc: "Aktuelle Studien zu Depression, PTBS, Sucht und Angststörungen – Methodik, Ergebnisse und Limitationen." },
  { num: "06", title: "Philosophie & Bewusstsein", desc: "Was sagen psychedelische Erfahrungen über die Natur des Bewusstseins? Phänomenologie und Erkenntnistheorie." },
];

const GuideSection = () => {
  return (
    <section id="leitfaden" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="font-heading text-sm uppercase tracking-[0.2em] text-primary mb-4">
            Leitfaden & Ressourcen
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Gründe deine eigene Hochschulgruppe
          </h2>
          <p className="text-muted-foreground text-lg">
            Werde Teil des bundesweiten Psychedelic Student Network Germany und schaffe einen Raum für wissenschaftlichen Austausch an deiner Hochschule.
          </p>
        </motion.div>

        {/* Principles */}
        <div className="max-w-5xl mx-auto mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-xl font-semibold text-foreground mb-2 text-center"
          >
            Bevor wir anfangen
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-center mb-8"
          >
            Du musst kein*e Expert*in sein, um zu starten. Hier sind vier Grundprinzipien, die uns leiten:
          </motion.p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <p.icon className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-heading text-sm font-semibold text-foreground mb-2">{p.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-2xl font-bold text-foreground mb-8 text-center"
          >
            So startest du
          </motion.h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 bg-card rounded-2xl p-6 border border-border"
              >
                <s.icon className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-heading text-sm font-semibold text-foreground mb-1">{s.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Psychedelic Curriculum */}
        <div className="max-w-4xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
              Psychedelic Curriculum
            </h3>
            <p className="text-muted-foreground">
              Ein modulares Lernökosystem für Studierende und Forschende. Jedes Event zu diesen Themen kann enthalten:
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {["Kurzeinführung (~10 Min.)", "Review & kritische Einordnung", "Vertiefende Literatur", "Diskussionsfragen"].map((item) => (
                <span key={item} className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="space-y-4">
            {curriculumTopics.map((topic, i) => (
              <motion.div
                key={topic.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-4 items-start bg-card rounded-xl p-5 border border-border"
              >
                <span className="font-heading text-xs font-bold text-primary bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                  {topic.num}
                </span>
                <div>
                  <h4 className="font-heading text-sm font-semibold text-foreground">{topic.title}</h4>
                  <p className="text-muted-foreground text-sm mt-1">{topic.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="mailto:kontakt@psng.info"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg gradient-psychedelic text-primary-foreground font-heading font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Jetzt Gruppe gründen – Kontakt aufnehmen
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GuideSection;
