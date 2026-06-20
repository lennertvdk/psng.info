import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.webp";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PresenceSection from "@/components/PresenceSection";
import Highlights from "@/components/Highlights";
import EventsSection from "@/components/EventsSection";
import GuideSection from "@/components/GuideSection";
import FAQSection from "@/components/FAQSection";
import TeamSection from "@/components/TeamSection";
import PartnersSection from "@/components/PartnersSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import PartnerStripe from "@/components/PartnerStripe";

const WHATSAPP_LINK = "https://chat.whatsapp.com/LBUA3UpzOV9BW1v59EZK8w?s=cl&p=i&ilr=1";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute top-[100vh] left-0 right-0 bottom-0 -z-20 bg-white" />
      <Navbar />

      <HeroSection />
      <PartnerStripe />

      <div className="bg-primary/5">
        <AboutSection />
      </div>

      {/* Neu hier? Onboarding-Funnel */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-10"
          >
            <p className="font-heading text-sm uppercase tracking-[0.2em] text-primary mb-4">Neu hier?</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">So machst du mit</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                num: "01",
                title: "Community beitreten",
                desc: "Tritt unserer WhatsApp-Gruppe bei und vernetze dich mit 250+ Studierenden aus ganz Deutschland.",
                href: WHATSAPP_LINK,
                external: true,
                cta: "WhatsApp beitreten",
              },
              {
                num: "02",
                title: "Events & Calls besuchen",
                desc: "Nimm an monatlichen Lectures und Community Calls teil – online, kostenlos, offen für alle.",
                href: "#events",
                external: false,
                cta: "Termine ansehen",
              },
              {
                num: "03",
                title: "Lokalgruppe starten",
                desc: "Bring psychedelische Wissenschaft an deine Hochschule. Wir helfen dir beim Aufbau.",
                href: "#leitfaden",
                external: false,
                cta: "Leitfaden lesen",
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border flex flex-col"
              >
                <span className="font-heading text-xs font-bold text-primary bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center mb-4">
                  {step.num}
                </span>
                <h3 className="font-heading text-base font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{step.desc}</p>
                <a
                  href={step.href}
                  {...(step.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="mt-4 inline-flex items-center text-xs font-medium text-primary hover:underline"
                >
                  {step.cta} →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-primary/5">
        <PresenceSection />
      </div>

      <div className="bg-white">
        <Highlights />
      </div>

      <div className="bg-primary/5">
        <EventsSection />
      </div>

      {/* Mid-page WhatsApp CTA */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto text-center bg-foreground rounded-2xl p-10"
          >
            <h3 className="font-heading text-2xl font-bold text-background mb-3">
              Noch nicht dabei?
            </h3>
            <p className="text-background/70 font-body mb-6">
              Tritt unserer WhatsApp-Community bei und vernetze dich mit 250+ Studierenden aus 13+ Städten.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg gradient-psychedelic text-primary-foreground font-heading font-medium text-sm hover:opacity-90 transition-opacity"
            >
              WhatsApp beitreten
            </a>
          </motion.div>
        </div>
      </section>

      <div className="bg-primary/5">
        <GuideSection />
      </div>

      <div className="bg-white">
        <FAQSection />
      </div>

      <div className="bg-primary/5">
        <TeamSection />
      </div>

      <div className="bg-white">
        <PartnersSection />
      </div>

      <div className="bg-primary/5">
        <ContactSection />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
