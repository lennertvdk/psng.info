import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import psngLogo from "@/assets/PSNG-Logo-centered-transparent.png";
import alpsLogo from "@/assets/ALPS-Logo.png";
import spsnLogo from "@/assets/SPSN-Logo.png";
import unepsiLogo from "@/assets/UNEPSI-Logo.png";
import psychedelicareLogo from "@/assets/PsychedeliCare-Logo.png";
import psychedelicGermanyLogo from "@/assets/Psychedelic-Germany-Logo.png";
import nachtschattenLogo from "@/assets/Nachtschatten-Logo.png";
import psychedeliaStiftungLogo from "@/assets/Psychedelia-Stiftung-Logo.png";

const whatsappLink = "https://chat.whatsapp.com/LBUA3UpzOV9BW1v59EZK8w?mode=gi_t";

const partnerLogos = [
  { name: "ALPS Foundation", logo: alpsLogo, url: "https://alps.foundation" },
  {
    name: "Swiss Psychedelic Student Network",
    logo: spsnLogo,
    url: "https://www.instagram.com/swisspsychedelicstudentnetwork/",
  },
  {
    name: "UNePSI – Italy",
    logo: unepsiLogo,
    url: "https://www.instagram.com/_unepsi_/",
  },
  {
    name: "PsychedeliCare",
    logo: psychedelicareLogo,
    url: "https://psychedelicare.eu",
  },
  {
    name: "Psychedelic Germany",
    logo: psychedelicGermanyLogo,
    url: "https://psychedelic-germany.de",
  },
  {
    name: "Nachtschatten Verlag",
    logo: nachtschattenLogo,
    url: "https://nachtschatten.ch/",
  },
  {
    name: "Psychedelia Stiftung",
    logo: psychedeliaStiftungLogo,
    url: "https://psychedelia-stiftung.de/",
  },
];

const HeroSection = () => {
  const scrollY = useMotionValue(0);

  useEffect(() => {
    const update = () => scrollY.set(window.scrollY);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [scrollY]);

  const logoScale = useTransform(scrollY, [0, 400], [1, 0.28]);
  const logoY = useTransform(scrollY, [0, 400], [0, -260]);
  const contentOpacity = useTransform(scrollY, [0, 250], [1, 0]);
  const contentY = useTransform(scrollY, [0, 250], [0, 30]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      <motion.img
        src={psngLogo}
        alt="PSNG Logo"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{ scale: logoScale, y: logoY }}
        className="w-56 md:w-80 object-contain"
      />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="mt-6 text-center max-w-2xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-heading text-sm uppercase tracking-[0.3em] text-foreground/60 mb-4"
        >
          Psychedelic Student Network Germany
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-heading text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6"
        >
          Psychedelische <span className="gradient-text">Forschung</span> verbindet
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-foreground/70 text-base md:text-lg max-w-xl mx-auto mb-8 font-body"
        >
          Deutschlands erstes bundesweites studentisches Netzwerk für
          psychedelische Wissenschaft. Gestartet am 03. März 2026.
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
            Eigene Gruppe gründen
          </a>
          <a
            href="#uber-uns"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-primary/30 text-primary font-heading font-medium text-sm hover:bg-primary/5 transition-colors"
          >
            Mehr erfahren
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12"
        >
          <p className="font-heading text-xs uppercase tracking-[0.2em] text-foreground/40 mb-5">
            In Kooperation mit
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {partnerLogos.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={partner.name}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-8 max-w-[100px] object-contain opacity-50 grayscale hover:opacity-90 hover:grayscale-0 transition-all"
                />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
