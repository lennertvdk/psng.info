import { WHATSAPP_LINK } from "@/lib/links";
import { useCopy } from "@/i18n/copy";
import { LAB_ANCHORS, eyebrowClass, secondaryButton } from "./shared";

/**
 * Drei gleichwertige Einstiege: beitreten, vorbeikommen, gründen. Die Texte
 * sind die des Onboardings auf der Startseite – nur als echte Knöpfe statt
 * kleiner Textlinks, weil das hier der Kern der Seite ist.
 *
 * Die Brief-Vorlage sah davor noch eine eigene Sektion „Warum PSNG?" mit
 * drei Karten vor (Leute treffen, gemeinsam lernen, etwas aufbauen). Das wären
 * dieselben drei Punkte zweimal untereinander gewesen; das „Warum" steckt
 * hier in den Beschreibungen.
 */
const WaysIn = () => {
  const c = useCopy();
  const targets: Record<string, { href: string; external?: boolean }> = {
    join: { href: WHATSAPP_LINK, external: true },
    events: { href: `#${LAB_ANCHORS.agenda}` },
    start: { href: `#${LAB_ANCHORS.groups}` },
  };

  return (
    <section aria-labelledby="lab-ways" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <p className={`${eyebrowClass} mb-3`}>{c.onboarding.eyebrow}</p>
          <h2 id="lab-ways" className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            {c.onboarding.title}
          </h2>
        </div>
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {c.onboarding.steps.map((step, i) => {
            const target = targets[step.key];
            return (
              <li key={step.key} className="flex flex-col bg-card p-6 md:p-8">
                <span className="font-heading text-sm font-bold text-primary" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-heading text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                <a
                  href={target.href}
                  {...(target.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`${secondaryButton} mt-6 self-start`}
                >
                  {step.cta}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default WaysIn;
