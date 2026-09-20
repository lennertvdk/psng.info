import { motion } from "framer-motion";
import { BookOpen, Users, Brain, Lightbulb } from "lucide-react";
import { useCopy } from "@/i18n/copy";

/** Die Symbole gehören zur Gestaltung, nicht zum Text – sie stehen deshalb
 *  hier und nicht in copy.ts, verbunden über den Schlüssel der Säule. */
const pillarIcons = {
  network: Users,
  education: BookOpen,
  research: Brain,
  resources: Lightbulb,
} as const;


const AboutSection = () => {
  const c = useCopy();

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
            {c.about.eyebrow}
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6">
            {c.about.title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {c.about.intro}
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
            {c.about.visionTitle}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {c.about.visionText}
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
            {c.about.statusTitle}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-center">
            {c.about.statusText}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {c.about.pillars.map((pillar, i) => {
            const Icon = pillarIcons[pillar.key as keyof typeof pillarIcons];
            return (
            <motion.div
              key={pillar.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl gradient-psychedelic flex items-center justify-center mb-5">
                <Icon className="text-primary-foreground" size={20} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto mt-16"
        >
          <h3 className="font-heading text-xl font-semibold text-foreground mb-4 text-center">
            {c.about.modelsTitle}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-center">
            {c.about.modelsText}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
