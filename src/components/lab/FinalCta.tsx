import { WHATSAPP_LINK } from "@/lib/links";
import { useCopy } from "@/i18n/copy";
import { LAB_ANCHORS, primaryButton } from "./shared";

/** Ein Abschluss, eine Entscheidung. Text wie der Zwischen-CTA der Startseite. */
const FinalCta = () => {
  const c = useCopy();

  return (
    <section aria-labelledby="lab-final" className="bg-white pb-16 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl bg-foreground px-6 py-12 text-center md:px-12">
          <h2 id="lab-final" className="font-heading text-3xl font-bold text-background">
            {c.midCta.title}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-background/70">{c.midCta.text}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={primaryButton}>
              {c.midCta.cta}
            </a>
            <a
              href={`#${LAB_ANCHORS.groups}`}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-background/30 px-6 py-3 font-heading text-sm font-medium text-background transition-colors hover:bg-background/10"
            >
              {c.hero.foundGroup}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
