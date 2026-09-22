import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import bpsaLogo from "@/assets/BPSA-Logo.webp";
import parabLogo from "@/assets/PARAB-Logo.webp";
import alpsLogo from "@/assets/ALPS-Logo.webp";
import spsnLogo from "@/assets/SPSN-Logo.webp";
import unepsiLogo from "@/assets/UNEPSI-Logo.webp";
import psychedelicareLogo from "@/assets/PsychedeliCare-Logo.webp";
import psychedelicGermanyLogo from "@/assets/Psychedelic-Germany-Logo.webp";
import nachtschattenLogo from "@/assets/Nachtschatten-Logo.webp";
import lucysLogo from "@/assets/Lucys-logo-full.webp";
import psychedeliaStiftungLogo from "@/assets/Psychedelia-Stiftung-Logo.webp";
import { BPSA_LINK, PARAB_INSTAGRAM_LINK, PARAB_LINK } from "@/lib/links";
import { useCopy } from "@/i18n/copy";
import { useLocale } from "@/i18n/locale";
import { pathFor } from "@/i18n/routes";
import { pick, type Localized } from "@/i18n/localized";

interface Partner {
  name: string;
  description: Localized;
  logo: string;
  url: string;
  instagram?: string;
  telegram?: string;
  opportunityUrl?: string;
  /** Eigener Linktext für opportunityUrl; ohne ihn steht dort „Forschungsmöglichkeiten". */
  opportunityLabel?: Localized;
}

const partners: Partner[] = [
  // Die BPSA steht vorn: Sie ist die einzige Partnerin, mit der wir gemeinsam
  // Veranstaltungen halten – die Lectures und das erste eigene In-Person-Event.
  {
    name: "Berlin Psychedelic Science Association (BPSA)",
    description: {
      de: "Eine Gruppe Berliner Studierender, die psychedelische Wissenschaft an die Hochschulen der Stadt bringt. Ihre Lectures finden gelegentlich in Zusammenarbeit mit dem PSNG statt, und unser erstes eigenes In-Person-Event haben wir zusammen auf die Beine gestellt.",
      en: "A group of Berlin students bringing psychedelic science to the city's universities. Their lectures are occasionally held together with the PSNG, and we put on our first in-person event jointly.",
    },
    logo: bpsaLogo,
    url: BPSA_LINK,
    instagram: "https://www.instagram.com/bpsa.berlin/",
  },
  // Ebenfalls vorn: Der Medien-Blog ist ein gemeinsames Projekt mit PARAB.
  {
    name: "PARAB – Psychedelic Awareness & Research Association Basel",
    description: {
      de: "Multidisziplinäre Studierendenorganisation aus Basel und Teil des Swiss Psychedelic Student Network. PARAB bringt Wissen über die therapeutische Anwendung von Psychedelika zu Fachleuten wie Öffentlichkeit – und betreibt gemeinsam mit uns den Medien-Blog.",
      en: "A multidisciplinary student organisation from Basel and part of the Swiss Psychedelic Student Network. PARAB brings knowledge about the therapeutic use of psychedelics to professionals and the public alike — and runs the media blog together with us.",
    },
    logo: parabLogo,
    url: PARAB_LINK,
    instagram: PARAB_INSTAGRAM_LINK,
  },
  {
    name: "ALPS Foundation",
    description: {
      de: "Die Schweizer ALPS Foundation fördert evidenzbasierte psychedelische Forschung durch ihre jährliche Konferenz und Summer School, eigene Forschungsprojekte und Unterstützung studentischer Initiativen. Eine Inspiration für die Gründung des PSNG.",
      en: "The Swiss ALPS Foundation supports evidence-based psychedelic research through its annual conference and summer school, its own research projects and support for student initiatives. An inspiration for founding the PSNG.",
    },
    logo: alpsLogo,
    url: "https://alps.foundation",
    instagram: "https://www.instagram.com/alps.foundation/",
  },
  {
    name: "Swiss Psychedelic Student Network (SPSN)",
    description: {
      de: "Das SPSN vernetzt die unabhängig organisierten Hochschulgruppen in der Schweiz (ARP, NAPA PALA, PARAB, PROBe, PROOF, PROZ) und veranstaltet jährlich das Schweizer Student Forum.",
      en: "The SPSN connects the independently organised university groups in Switzerland (ARP, NAPA PALA, PARAB, PROBe, PROOF, PROZ) and runs the Swiss Student Forum each year.",
    },
    logo: spsnLogo,
    url: "https://alps.foundation/swiss-psychedelic-student-network",
    instagram: "https://www.instagram.com/swisspsychedelicstudentnetwork/",
  },
  {
    name: "UNePSI – Italy",
    description: {
      de: "Das University Network for Psychedelic Students Italy vernetzt Hochschulgruppen in Italien und unterstützt neue Gruppen bei ihrer Gründung. Im Dezember 2025 fand das erste Italian Psychedelic Students' Gathering statt.",
      en: "The University Network for Psychedelic Students Italy connects university groups across Italy and helps new ones get started. The first Italian Psychedelic Students' Gathering took place in December 2025.",
    },
    logo: unepsiLogo,
    url: "https://www.instagram.com/_unepsi_/",
    instagram: "https://www.instagram.com/_unepsi_/",
  },
  {
    name: "PsychedeliCare",
    description: {
      de: "Europäische Initiative für die politische Anerkennung psychedelischer Therapien. Vernetzt Organisationen aus über 20 Ländern und setzt sich für einen sicheren, ethisch verantwortungsvollen Regulierungsrahmen ein.",
      en: "A European initiative for the political recognition of psychedelic therapies. It connects organisations from more than 20 countries and campaigns for a safe, ethically responsible regulatory framework.",
    },
    logo: psychedelicareLogo,
    url: "https://psychedelicare.eu",
    instagram: "https://www.instagram.com/psychedelicare.eu/",
  },
  {
    name: "Psychedelic Germany",
    description: {
      de: "Lebendige Community seit 2021 für akzeptierende Aufklärungsarbeit, Safer Use und Vernetzung rund um Psychedelika – gegen Kriminalisierung, für Bewusstsein.",
      en: "A lively community since 2021 for non-judgemental education, safer use and connection around psychedelics — against criminalisation, for awareness.",
    },
    logo: psychedelicGermanyLogo,
    url: "https://psychedelic-germany.de",
    telegram: "https://t.me/psychedelic_germany",
  },
  {
    name: "Nachtschatten Verlag",
    description: {
      de: "Renommierter deutschsprachiger Fachverlag für psychedelische Wissenschaft, Rauschkultur und Drogenpolitik. Verlegt seit Jahrzehnten fundierte, entstigmatisierte Literatur, darunter das Magazin Lucy's Rausch.",
      en: "A respected German-language publisher on psychedelic science, intoxication culture and drug policy. For decades it has published well-founded, destigmatised literature, including the magazine Lucy's Rausch.",
    },
    logo: nachtschattenLogo,
    url: "https://nachtschatten.ch/",
  },
  // Direkt hinter dem Nachtschatten Verlag, der Lucys herausgibt.
  {
    name: "Lucys Magazin",
    description: {
      de: "Das Magazin des Nachtschatten Verlags über Psychedelika, Bewusstsein, Kultur und Gesundheit – mit ausführlichen, gut recherchierten Hintergrundtexten in der Rubrik Xtra. Lucys lädt die PSNG-Community ausdrücklich ein, eigene Artikel einzureichen, ganz niederschwellig. Die Hefte verteilen wir gelegentlich auch auf unseren Events.",
      en: "The Nachtschatten Verlag's magazine on psychedelics, consciousness, culture and health — with long, well-researched in-depth pieces in its Xtra section. Lucys explicitly invites the PSNG community to submit their own articles, with a low barrier to entry. We sometimes hand out copies at our events, too.",
    },
    logo: lucysLogo,
    url: "https://www.lucys-magazin.com/",
    instagram: "https://www.instagram.com/lucys.magazin/",
    opportunityUrl: "mailto:info@lucys-magazin.com?subject=Artikel%20aus%20der%20PSNG-Community",
    opportunityLabel: { de: "Artikel einreichen", en: "Submit an article" },
  },
  {
    name: "Psychedelia Stiftung",
    description: {
      de: "Die Psychedelia-Stiftung fördert den kulturellen, künstlerischen und wissenschaftlichen Austausch zu psychedelischen Erfahrungen. Ihr Ziel: gesellschaftliche Akzeptanz für den wohltuenden Umgang mit veränderten Bewusstseinszuständen – mit Blick auf Sicherheit, Respekt und persönliche Entwicklung.",
      en: "The Psychedelia Foundation supports cultural, artistic and scientific exchange around psychedelic experiences. Its aim: social acceptance for a beneficial approach to altered states of consciousness, with an eye on safety, respect and personal development.",
    },
    logo: psychedeliaStiftungLogo,
    url: "https://psychedelia-stiftung.de/",
    opportunityUrl: "https://psychedelia-stiftung.de/kontakt/",
  },
];

const PartnersSection = () => {
  const c = useCopy();
  const locale = useLocale();

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
            {c.partners.eyebrow}
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            {c.partners.title}
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            {c.partners.intro}
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
                        width={280}
                        height={112}
                        loading="lazy"
                        decoding="async"
                        className="h-28 max-w-full object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <h3 className="font-heading text-base font-semibold text-foreground mb-2">
                      {partner.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {pick(partner.description, locale)}
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
                        {c.partners.website}
                      </a>
                    )}
                    {partner.instagram && (
                      <a
                        href={partner.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        {c.partners.instagram}
                      </a>
                    )}
                    {partner.telegram && (
                      <a
                        href={partner.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        {c.partners.telegram}
                      </a>
                    )}
                    {partner.opportunityUrl && (
                      <a
                        href={partner.opportunityUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                      >
                        {partner.opportunityLabel
                          ? pick(partner.opportunityLabel, locale)
                          : c.partners.opportunity}
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
            {c.partners.ctaBefore}
            <Link
              to={`${pathFor("home", locale)}?subject=kooperation#kontakt`}
              className="text-primary font-medium hover:underline"
            >
              {c.partners.ctaLink}
            </Link>
            {c.partners.ctaAfter}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
