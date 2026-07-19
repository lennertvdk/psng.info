import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import alpsLogo from "@/assets/ALPS-Logo.webp";
import spsnLogo from "@/assets/SPSN-Logo.webp";
import unepsiLogo from "@/assets/UNEPSI-Logo.webp";
import psychedelicareLogo from "@/assets/PsychedeliCare-Logo.webp";
import psychedelicGermanyLogo from "@/assets/Psychedelic-Germany-Logo.webp";
import nachtschattenLogo from "@/assets/Nachtschatten-Logo.webp";
import psychedeliaStiftungLogo from "@/assets/Psychedelia-Stiftung-Logo.webp";

const partners = [
  {
    name: "ALPS Foundation",
    description:
      "Die Schweizer ALPS Foundation fördert evidenzbasierte psychedelische Forschung durch ihre jährliche Konferenz und Summer School, eigene Forschungsprojekte und Unterstützung studentischer Initiativen. Eine Inspiration für die Gründung des PSNG.",
    logo: alpsLogo,
    url: "https://alps.foundation",
    instagram: "https://www.instagram.com/alps.foundation/",
  },
  {
    name: "Swiss Psychedelic Student Network (SPSN)",
    description:
      "Das SPSN vernetzt die unabhängig organisierten Hochschulgruppen in der Schweiz (ARP, NAPA PALA, PARAB, PROBe, PROOF, PROZ) und veranstaltet jährlich das Schweizer Student Forum.",
    logo: spsnLogo,
    url: "https://alps.foundation/swiss-psychedelic-student-network",
    instagram: "https://www.instagram.com/swisspsychedelicstudentnetwork/",
  },
  {
    name: "UNePSI – Italy",
    description:
      "Das University Network for Psychedelic Students Italy vernetzt Hochschulgruppen in Italien und unterstützt neue Gruppen bei ihrer Gründung. Im Dezember 2025 fand das erste Italian Psychedelic Students' Gathering statt.",
    logo: unepsiLogo,
    url: "",
    instagram: "https://www.instagram.com/_unepsi_/",
  },
  {
    name: "PsychedeliCare",
    description:
      "Europäische Initiative für die politische Anerkennung psychedelischer Therapien. Vernetzt Organisationen aus über 20 Ländern und setzt sich für einen sicheren, ethisch verantwortungsvollen Regulierungsrahmen ein.",
    logo: psychedelicareLogo,
    url: "https://psychedelicare.eu",
    instagram: "https://www.instagram.com/psychedelicare.eu/",
  },
  {
    name: "Psychedelic Germany",
    description:
      "Lebendige Community seit 2021 für akzeptierende Aufklärungsarbeit, Safer Use und Vernetzung rund um Psychedelika – gegen Kriminalisierung, für Bewusstsein.",
    logo: psychedelicGermanyLogo,
    url: "https://psychedelic-germany.de",
    instagram: "",
    telegram: "https://t.me/psychedelic_germany",
  },
  {
    name: "Nachtschatten Verlag",
    description:
      "Renommierter deutschsprachiger Fachverlag für psychedelische Wissenschaft, Rauschkultur und Drogenpolitik. Verlegt seit Jahrzehnten fundierte, entstigmatisierte Literatur, darunter das Magazin Lucy's Rausch.",
    logo: nachtschattenLogo,
    url: "https://nachtschatten.ch/",
    instagram: "",
  },
  {
    name: "Psychedelia Stiftung",
    description:
      "Die Psychedelia-Stiftung fördert den kulturellen, künstlerischen und wissenschaftlichen Austausch zu psychedelischen Erfahrungen. Ihr Ziel: gesellschaftliche Akzeptanz für den wohltuenden Umgang mit veränderten Bewusstseinszuständen – mit Blick auf Sicherheit, Respekt und persönliche Entwicklung.",
    logo: psychedeliaStiftungLogo,
    url: "https://psychedelia-stiftung.de/",
    instagram: "",
  },
];

const PartnersSection = () => {
  return (
    <section id="kooperation" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-4"
        >
          <p className="font-heading text-sm uppercase tracking-[0.2em] text-primary mb-4">
            Kooperation
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Unsere Partner
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            Wir sind stolze Kooperationspartner der folgenden Organisationen.
          </p>
        </motion.div>
        <Carousel
          opts={{ align: "start", loop: true }}
          className="max-w-5xl mx-auto"
        >
          <CarouselContent>
            {partners.map((partner, i) => (
              <CarouselItem
                key={partner.name}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow flex flex-col h-full"
                >
                  {partner.logo && (
                    <div className="flex justify-center mb-4">
                      <img
                        src={partner.logo}
                        alt={`${partner.name} Logo`}
                        loading="lazy"
                        className="h-28 max-w-full object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <h3 className="font-heading text-base font-semibold text-foreground mb-2">
                      {partner.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {partner.description}
                    </p>
                  </div>
                  <div className="flex gap-3 flex-wrap justify-center mt-auto pt-4 border-t border-border/50">
                    {partner.url && (
                      <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        <ExternalLink size={12} />
                        Website
                      </a>
                    )}
                    {partner.instagram && (
                      <a
                        href={partner.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        Instagram
                      </a>
                    )}
                    {partner.telegram && (
                      <a
                        href={partner.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        Telegram
                      </a>
                    )}
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mx-auto text-center mt-12 p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow"
        >
          <p className="text-muted-foreground text-sm">
            Du möchtest mit uns kooperieren für Events, Reichweite, Forschung
            oder Ideen-Sparring?{" "}
            <a
              href="/?subject=kooperation#kontakt"
              className="text-primary font-medium hover:underline"
            >
              Schreib uns!
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
