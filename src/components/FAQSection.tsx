import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Muss ich Student*in sein, um Teil des PSNG oder einer Lokalgruppe zu werden?",
    answer:
      "Nein, ein studentischer Status ist keine zwingende Voraussetzung, um Mitglied zu werden. Wenn es bereits eine Lokalgruppe an einer Uni in deiner Stadt gibt, helfen wir gerne dabei, den Kontakt herzustellen.",
  },
  {
    question: "Muss ich Student*in sein, um eine Lokalgruppe gründen zu können?",
    answer:
      "Das PSNG richtet sich primär an Menschen im akademischen Kontext. Auch wenn ein Studierendenstatus keine formale Pflicht ist, liegt unser Fokus klar auf wissenschaftlichem Austausch und Nachwuchsförderung.",
  },
  {
    question: "Wie ist eine Lokalgruppe organisiert?",
    answer:
      "Ganz individuell, je nach Lokalgruppe! Wir unterstützen euch bei der Gründung, z.B. durch Bereitstellung von Gründungsdokumenten bereits bestehender Studierendengruppen. Als Teil des PSNG erklären sich die Lokalgruppen bereit, den Code of Conduct zu wahren.",
  },
  {
    question: "Welche Angebote bietet das PSNG selbst?",
    answer:
      "Wir bieten regelmäßige Calls für Fragen an sowie Unterstützung und Impulse zur Vernetzung. Außerdem teilen wir Journal-Clubs, Keynote-Lectures und weitere Formate der Lokalgruppen im PSNG-Netzwerk. Dadurch möchten wir den Lokalgruppen auch eine Plattform anbieten, auf der sie eine größere Reichweite erreichen.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <p className="font-heading text-sm uppercase tracking-[0.2em] text-primary mb-4">
            Häufige Fragen
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
            FAQ
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-xl px-6 hover:shadow-lg transition-shadow data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="font-heading text-sm font-medium text-foreground hover:text-primary hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
