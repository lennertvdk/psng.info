import { motion } from "framer-motion";
import psngLogo from "@/assets/PSNG-Logo-centered-transparent.webp";

const whatsappLink = "https://chat.whatsapp.com/LBUA3UpzOV9BW1v59EZK8w?s=cl&p=i&ilr=1";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-56 md:w-80 flex items-center justify-center"
      >
        <div className="absolute w-[82%] h-[82%] rounded-full bg-white" />
        <img
          src={psngLogo}
          alt="PSNG Logo"
          className="relative w-full object-contain"
        />
      </motion.div>

      <motion.div className="mt-6 text-center max-w-2xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-heading text-3xl md:text-5xl font-bold text-foreground leading-tight mb-4"
        >
          Psychedelische <span className="gradient-text">Forschung</span> verbindet
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex justify-center gap-3 font-heading text-sm text-foreground/50 mb-5"
        >
          <span>250+ Studierende</span>
          <span>·</span>
          <span>13+ Städte</span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-foreground/70 text-base md:text-lg max-w-xl mx-auto mb-8 font-body"
        >
          Deutschlands erstes bundesweites studentisches Netzwerk für
          psychedelische Wissenschaft. Seit März 2026 aktiv.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg gradient-psychedelic text-primary-foreground font-heading font-medium text-sm hover:opacity-90 transition-opacity"
          >
            WhatsApp beitreten
          </a>
          <a
            href="#leitfaden"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-primary/30 text-primary font-heading font-medium text-sm hover:bg-primary/5 transition-colors"
          >
            Gründe deine Gruppe
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
