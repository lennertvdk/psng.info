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

const WHATSAPP_LINK = "https://chat.whatsapp.com/LBUA3UpzOV9BW1v59EZK8w?s=cl&p=i&ilr=1";

const steps = [
  {
    icon: Users,
    title: "1. Team zusammenstellen",
    desc: "Finde 2–3 Mitstreiter*innen an deiner Hochschule – oder tritt unserer WhatsApp-Community bei, wo wir für jede Stadt eine eigene Gruppe haben.",
    link: { label: "WhatsApp beitreten", href: WHATSAPP_LINK, external: true },
  },
  {
    icon: MessageSquare,
    title: "2. Kontakt zum PSNG",
    desc: "Schreib uns über unser Kontaktformular – wir unterstützen euch beim Aufbau und vernetzen euch mit anderen Gruppen.",
    link: { label: "Kontaktformular", href: "#kontakt", external: false },
  },
  {
    icon: ClipboardList,
    title: "3. Erstes Treffen planen",
    desc: "Lehnt euch an unsere monatlichen Lectures und Community Calls an oder entwickelt eigene Formate.",
    link: { label: "Events & Termine", href: "#events", external: false },
  },
  {
    icon: BookOpen,
    title: "4. Ressourcen nutzen",
    desc: "Der Leitfaden gibt euch Struktur, das Curriculum liefert Themen-Inspiration, und unsere vergangenen Events sind ein guter erster inhaltlicher Aufschlag.",
    link: { label: "Leitfaden", href: "/leitfaden", external: false },
  },
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
            Gründe deine Hochschulgruppe oder schließ dich einer an
          </h2>
          <p className="text-muted-foreground text-lg">
            Schon 250+ Studierende in 13+ Städten sind Teil des bundesweiten Psychedelic Student Network Germany. Ob du eine neue Gruppe an deiner Hochschule gründest oder einer bestehenden beitrittst: Wir vernetzen dich mit anderen.
          </p>
        </motion.div>

        {/* Resource card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8">
            <div className="flex flex-col sm:flex-row items-start gap-8">
              <div className="flex-1">
                <p className="font-heading text-xs uppercase tracking-[0.2em] text-primary mb-2">
                  Vollständiger Leitfaden
                </p>
                <h4 className="font-heading text-xl font-semibold text-foreground mb-2">
                  Von null bis zur ersten Sitzung.
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  Schritt für Schritt erklärt: AStA-Anmeldung, Mitstreiter*innen finden, Moderationsregeln, Krisenplan sowie Ideen für ein Curriculum.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["AStA & Bürokratie", "Erstes Event", "Moderationsregeln", "Krisenplan", "Curriculum"].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full border border-primary/20 bg-white text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href="/leitfaden"
                className="shrink-0 inline-flex items-center justify-center px-6 py-3 rounded-lg gradient-psychedelic text-primary-foreground font-heading font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Leitfaden lesen →
              </a>
            </div>
          </div>
        </motion.div>

        {/* Principles */}
        <div className="max-w-5xl mx-auto mb-20">
          <p className="font-heading text-xs uppercase tracking-widest text-primary text-center mb-2">
            Kurzfassung
          </p>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-xl font-semibold text-foreground mb-2 text-center"
          >
            Bevor du anfängst
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
                className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
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
                className="flex gap-4 bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
              >
                <s.icon className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div className="flex flex-col flex-1">
                  <h4 className="font-heading text-sm font-semibold text-foreground mb-1">{s.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{s.desc}</p>
                  <a
                    href={s.link.href}
                    {...(s.link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="mt-auto pt-3 border-t border-border/50 inline-flex items-center text-xs font-medium text-primary hover:underline"
                  >
                    {s.link.label} →
                  </a>
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
            href="/?subject=gruppe#kontakt"
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
