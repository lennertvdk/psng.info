import React, { useEffect, useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollY = useMotionValue(0);
  const pinRange = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight * 1.1 : 1
  );

  useEffect(() => {
    const update = () => {
      pinRange.set(window.innerHeight * 1.1);
      scrollY.set(window.scrollY);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [scrollY, pinRange]);

  const logoOpacity = useTransform([scrollY, pinRange], ([sy, pr]: number[]) => {
    const start = pr * 0.6;
    const end = pr * 0.85;
    const t = (sy - start) / (end - start);
    return Math.max(0, Math.min(1, 1 - t));
  });

  const heroOpacity = useTransform([scrollY, pinRange], ([sy, pr]: number[]) => {
    const start = pr * 0.75;
    const end = pr * 1.0;
    const t = (sy - start) / (end - start);
    return Math.max(0, Math.min(1, t));
  });

  return (
    <div ref={containerRef} className="relative h-[210vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ opacity: logoOpacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <img
            src={psngLogo}
            alt="PSNG Logo"
            className="w-2/3 max-w-xl object-contain"
          />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="container mx-auto px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-heading text-sm uppercase tracking-[0.3em] text-foreground/60 mb-6"
            >
              Psychedelic Student Network Germany
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-8"
            >
              Psychedelische
              <br />
              <span className="gradient-text">Forschung</span>
              <br />
              verbindet
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-foreground/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body"
            >
              Deutschlands erstes bundesweites studentisches Netzwerk für
              psychedelische Wissenschaft. Gestartet am 03. März 2026.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
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
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-16"
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
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
