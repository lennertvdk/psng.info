import { motion } from "framer-motion";
import trypPhoto1 from "@/assets/tryp-1.jpg";
import icprPhoto from "@/assets/icpr-1.jpg";

const PresenceSection = () => {
  return (
    <section id="presence" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="font-heading text-sm uppercase tracking-[0.2em] text-primary mb-4">
            PSNG war dabei
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Präsenz in der Community
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Seit unserem Launch im März 2026 sind wir aktiv in der europäischen
            Psychedelika-Community vertreten.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2 py-4">

          {/* TRYP Expo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="overflow-hidden rounded-t-2xl bg-slate-950/5 aspect-[4/3]">
              <img src={trypPhoto1} alt="PSNG beim TRYP Expo Berlin" className="w-full h-full object-cover object-center" />
            </div>
            <div className="p-6 flex flex-col h-full">
              <div className="flex-1">
                <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-heading font-medium mb-3">
                  Mai 2026 · Berlin
                </span>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-0.5">
                  TRYP Expo
                </h3>
                <p className="text-primary text-sm mb-3">Funkhaus Berlin</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Europas größtes Event an der Schnittstelle von Psychedelika-Forschung,
                  Mental Health und Bewusstseinskultur – 80+ Speaker, 150+ Aussteller,
                  drei Tage Funkhaus Berlin. Das PSNG hat sich dort als Community
                  getroffen: gemeinsamer Besuch, Banner, und Mittagessen.
                </p>
                <a href="https://tryp.de" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-primary hover:underline">
                  tryp.de →
                </a>
              </div>
            </div>
          </motion.div>

          {/* ICPR */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="overflow-hidden rounded-t-2xl bg-slate-950/5 aspect-[4/3]">
              <img src={icprPhoto} alt="PSNG bei der ICPR 2026 Haarlem" className="w-full h-full object-cover object-top" />
            </div>
            <div className="p-6 flex flex-col h-full">
              <div className="flex-1">
                <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-heading font-medium mb-3">
                  Juni 2026 · Haarlem
                </span>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-0.5">
                  ICPR 2026
                </h3>
                <p className="text-primary text-sm mb-3">International Conference on Psychedelic Research</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Europas wichtigste wissenschaftliche Konferenz für
                  Psychedelika-Forschung. Das PSNG hat sich auch hier als Gruppe getroffen. Ein
                  wichtiger Schritt in der Vernetzung mit der europäischen
                  Forschungscommunity.
                </p>
                <a href="https://icpr-conference.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-primary hover:underline">
                  icpr-conference.com →
                </a>
              </div>
            </div>
          </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PresenceSection;