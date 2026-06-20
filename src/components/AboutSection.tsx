import { motion } from "framer-motion";
import { BookOpen, Users, Brain, Lightbulb } from "lucide-react";

const pillars = [
  {
    icon: Users,
    title: "Vernetzung",
    description:
      "Wir verbinden bestehende Studierendeninitiativen und unterstützen neue Hochschulgruppen bei ihrer Gründung.",
  },
  {
    icon: BookOpen,
    title: "Bildung",
    description:
      "Regelmäßige Lectures, Community Calls und Journal Clubs zu psychedelischer Wissenschaft und Therapie.",
  },
  {
    icon: Brain,
    title: "Forschung",
    description:
      "Förderung studentischer Forschungsprojekte und Zusammenarbeit mit akademischen Institutionen.",
  },
  {
    icon: Lightbulb,
    title: "Ressourcen",
    description:
      "Gründungsdokumente, Vorlagen, Kontakte und organisatorische Hilfsmittel für lokale Gruppen.",
  },
];

const AboutSection = () => {
  return (
    <section id="uber-uns" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="font-heading text-sm uppercase tracking-[0.2em] text-primary mb-4">
            Über uns
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6">
            Was ist das PSNG?
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Das Psychedelic Student Network Germany (PSNG) ist ein bundesweites
            Netzwerk von Studierenden an deutschen Hochschulen, die ein
            gemeinsames Interesse an psychedelischer Wissenschaft verbindet.
            Unser Ziel ist es, engagierte Studierende zusammenzubringen und eine
            starke Community aufzubauen, die gemeinsam an einer
            verantwortungsvollen Zukunft dieses Forschungsfeldes arbeitet.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center mb-16 p-8 rounded-2xl border border-primary/20 bg-primary/5"
        >
          <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
            Unsere Vision
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Eine Zukunft, in der psychedelische Wissenschaft entstigmatisiert
            ist, interessierte Menschen einander leicht finden können und
            Forschung im Bereich der Psychedelika sicher, wissenschaftlich
            fundiert und ethisch betrieben wird.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <h3 className="font-heading text-xl font-semibold text-foreground mb-3 text-center">
            Status quo in Deutschland
          </h3>
          <p className="text-muted-foreground leading-relaxed text-center">
            Angesichts wachsender medialer Aufmerksamkeit, zunehmender
            wissenschaftlicher Forschung und eines steigenden
            gesellschaftlichen Interesses an Psychedelika gehen wir davon
            aus, dass auch unter Studierenden in Deutschland ein großes
            Interesse an psychedelischer Forschung und Therapie besteht.
            Gleichzeitig fehlt es bislang an bundesweiten studentischen
            Zusammenschlüssen, die die Entwicklung dieses Feldes durch
            Austausch und Vernetzung auf studentischer Ebene fördern.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl gradient-psychedelic flex items-center justify-center mb-5">
                <pillar.icon className="text-primary-foreground" size={20} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto mt-16"
        >
          <h3 className="font-heading text-xl font-semibold text-foreground mb-4 text-center">
            Vorbilder: Schweiz & Italien
          </h3>
          <p className="text-muted-foreground leading-relaxed text-center">
            In der Schweiz sind lokale Hochschulgruppen im Swiss Psychedelic
            Student Network (SPSN) zusammengeschlossen. In Italien verbindet das
            University Network for Psychedelic Students (UNePSI) Studierende an
            verschiedenen Universitäten. Diese Netzwerke dienen als Vorbilder
            für das PSNG.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
