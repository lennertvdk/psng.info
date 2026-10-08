import { Link } from "react-router-dom";
import { useCopy } from "@/i18n/copy";
import { useLocale } from "@/i18n/locale";
import { pathFor } from "@/i18n/routes";
import { LAB_ANCHORS, eyebrowClass, homeSection, primaryButton, secondaryButton } from "./shared";

/**
 * Die vier Schritte aus dem Leitfaden, auf je eine Zeile eingedampft. Wer es
 * genau wissen will, liest den Leitfaden; hier soll nur klar werden, dass der
 * Anfang klein ist.
 *
 * Keine Zahl bestehender Gruppen: Es gibt sie in den Daten nicht, und eine
 * geschätzte wäre genau die Art Behauptung, die die Seite nicht machen soll.
 */
const LocalGroups = () => {
  const c = useCopy();
  const locale = useLocale();

  return (
    <section
      id={LAB_ANCHORS.groups}
      aria-labelledby="lab-groups"
      className="scroll-mt-20 bg-white py-16 md:py-24"
    >
      <div className="container mx-auto grid gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className={`${eyebrowClass} mb-3`}>{c.lab.groups.eyebrow}</p>
          <h2 id="lab-groups" className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            {c.guide.title}
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            {c.lab.groups.intro}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            {/* Öffnet das Kontaktformular der Startseite mit vorausgewähltem
                Anliegen – derselbe Weg wie der Leitfaden-CTA dort. */}
            <Link to={homeSection(locale, "kontakt", "?subject=gruppe")} className={primaryButton}>
              {c.lab.groups.cta}
            </Link>
            <Link to={pathFor("guide", locale)} className={secondaryButton}>
              {c.guide.cardCta}
            </Link>
          </div>
        </div>

        <ol className="border-t border-border">
          {c.lab.groups.steps.map((step, i) => (
            <li key={step.key} className="flex gap-5 border-b border-border py-5">
              <span className="w-8 shrink-0 font-heading text-sm font-bold text-primary" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-heading text-base font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default LocalGroups;
