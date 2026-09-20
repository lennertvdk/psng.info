import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCopy } from "@/i18n/copy";


const FAQSection = () => {
  const c = useCopy();

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <p className="font-heading text-sm uppercase tracking-[0.2em] text-primary mb-4">
            {c.faq.eyebrow}
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
            {c.faq.title}
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
            {c.faq.items.map((faq) => (
              <AccordionItem
                key={faq.key}
                value={faq.key}
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
