import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Rocket, Target, Handshake, FileText, BookOpen, Users, MessageSquare, ClipboardList } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/links";
import { useCopy } from "@/i18n/copy";
import { useLocale } from "@/i18n/locale";
import { pathFor } from "@/i18n/routes";

/** Symbole und Ziele gehören zur Gestaltung, die Texte nach copy.ts. */
const principleIcons = { start: Rocket, expectations: Target, support: Handshake, conduct: FileText } as const;
const stepIcons = { team: Users, contact: MessageSquare, meeting: ClipboardList, resources: BookOpen } as const;


const GuideSection = () => {
  const c = useCopy();
  const locale = useLocale();
  const guidePath = pathFor("guide", locale);
  const stepLinks = {
    team: { href: WHATSAPP_LINK, external: true, route: false },
    contact: { href: "#kontakt", external: false, route: false },
    meeting: { href: "#events", external: false, route: false },
    resources: { href: guidePath, external: false, route: true },
  } as const;

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
            {c.guide.eyebrow}
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            {c.guide.title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {c.guide.intro}
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
                  {c.guide.cardEyebrow}
                </p>
                <h4 className="font-heading text-xl font-semibold text-foreground mb-2">
                  {c.guide.cardTitle}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {c.guide.cardText}
                </p>
                <div className="flex flex-wrap gap-2">
                  {c.guide.cardTags.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full border border-primary/20 bg-white text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                to={guidePath}
                className="shrink-0 inline-flex items-center justify-center px-6 py-3 rounded-lg gradient-psychedelic text-primary-foreground font-heading font-medium text-sm hover:opacity-90 transition-opacity"
              >
                {c.guide.cardCta}
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Principles */}
        <div className="max-w-5xl mx-auto mb-20">
          <p className="font-heading text-xs uppercase tracking-widest text-primary text-center mb-2">
            {c.guide.principlesEyebrow}
          </p>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-xl font-semibold text-foreground mb-2 text-center"
          >
            {c.guide.principlesTitle}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-center mb-8"
          >
            {c.guide.principlesIntro}
          </motion.p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.guide.principles.map((p, i) => {
              const Icon = principleIcons[p.key as keyof typeof principleIcons];
              return (
              <motion.div
                key={p.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
              >
                <Icon className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-heading text-sm font-semibold text-foreground mb-2">{p.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
              );
            })}
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
            {c.guide.stepsTitle}
          </motion.h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {c.guide.steps.map((s, i) => {
              const Icon = stepIcons[s.key as keyof typeof stepIcons];
              const link = stepLinks[s.key as keyof typeof stepLinks];
              return (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
              >
                <Icon className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div className="flex flex-col flex-1">
                  <h4 className="font-heading text-sm font-semibold text-foreground mb-1">{s.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{s.desc}</p>
                  {link.route ? (
                    <Link
                      to={link.href}
                      className="mt-auto pt-3 border-t border-border/50 inline-flex items-center text-xs font-medium text-primary hover:underline"
                    >
                      {s.link} →
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="mt-auto pt-3 border-t border-border/50 inline-flex items-center text-xs font-medium text-primary hover:underline"
                    >
                      {s.link} →
                    </a>
                  )}
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to={`${pathFor("home", locale)}?subject=gruppe#kontakt`}
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg gradient-psychedelic text-primary-foreground font-heading font-medium text-sm hover:opacity-90 transition-opacity"
          >
            {c.guide.cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GuideSection;
