import heroBg from "@/assets/hero-bg.webp";
import { WHATSAPP_LINK } from "@/lib/links";
import { useCopy } from "@/i18n/copy";
import UpNextCard from "./UpNextCard";
import { type AgendaEntry, LAB_ANCHORS, eyebrowClass, primaryButton, secondaryButton } from "./shared";

/**
 * Links, was das PSNG ist und wie man dazukommt; rechts, was als Nächstes
 * ansteht. Kompakt statt bildschirmfüllend: Auf dem Handy soll der nächste
 * Termin schon im ersten Bildschirm anfangen.
 *
 * Wie auf der Startseite CSS-Einblendung statt framer-motion – der Text steht
 * auch dann da, wenn die Animation nie läuft.
 */
const LabHero = ({ next }: { next?: AgendaEntry }) => {
  const c = useCopy();

  return (
    <section className="relative overflow-hidden pb-12 pt-24 md:pb-20 md:pt-32">
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1080}
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div
        className={`container mx-auto grid items-center gap-10 px-4 sm:px-6 ${
          next ? "lg:grid-cols-[1.05fr_0.95fr] lg:gap-14" : "max-w-3xl"
        }`}
      >
        <div className="animate-rise-in">
          <p className={`${eyebrowClass} mb-4`}>{c.lab.hero.eyebrow}</p>
          <h1 className="font-heading text-[2rem] font-bold leading-[1.1] text-foreground sm:text-5xl lg:text-[3.5rem]">
            {c.lab.hero.headlineBefore}
            <span className="gradient-text">{c.lab.hero.headlineAccent}</span>
            {c.lab.hero.headlineAfter}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/75 md:text-lg">
            {c.lab.hero.text}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={primaryButton}>
              {c.hero.joinWhatsapp}
            </a>
            <a href={`#${LAB_ANCHORS.groups}`} className={secondaryButton}>
              {c.hero.foundGroup}
            </a>
          </div>
        </div>

        {next && (
          <div className="animate-rise-in" style={{ animationDelay: "0.1s" }}>
            <UpNextCard entry={next} />
          </div>
        )}
      </div>
    </section>
  );
};

/**
 * Die Kennzahlen der Startseite, als Beleg unter dem Hero – bewusst klein.
 * Sie stützen die Aussage oben, sie sind nicht die Aussage.
 */
export const ProofStats = () => {
  const c = useCopy();
  const items = [c.hero.students, c.hero.cities, c.lab.since];

  return (
    <div className="border-y border-border bg-card">
      <ul className="container mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-4 sm:px-6">
        {items.map((item, i) => {
          // „250+ Studierende": Die Zahl trägt, das Wort erklärt.
          const [first, ...rest] = item.split(" ");
          const lead = /\d/.test(first);
          return (
            <li key={i} className="flex items-center gap-8 font-heading text-sm text-muted-foreground">
              {i > 0 && <span className="hidden h-4 w-px bg-border sm:block" aria-hidden="true" />}
              <span>
                {lead ? (
                  <>
                    <strong className="font-bold text-foreground">{first}</strong> {rest.join(" ")}
                  </>
                ) : (
                  item
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LabHero;
