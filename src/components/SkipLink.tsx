import { useCopy } from "@/i18n/copy";

/**
 * Der erste fokussierbare Punkt jeder Seite: ein Sprung an der Navigation
 * vorbei zum Inhalt.
 *
 * Sichtbar erst im Fokus. Wer mit der Maus arbeitet, sieht ihn nie; wer sich
 * mit der Tastatur bewegt, spart sich auf jeder Seite die sieben Menüpunkte,
 * die Sprachwahl und das Banner, bevor der eigentliche Inhalt beginnt.
 *
 * Das Ziel trägt `tabindex="-1"` (siehe MAIN_ID unten): Ein `<main>` ist von
 * sich aus nicht fokussierbar, und ohne Fokus springt zwar der Blick, aber
 * nicht die Tastatur – der nächste Tab landete wieder oben in der Navigation.
 */
export const MAIN_ID = "inhalt";

const SkipLink = () => {
  const c = useCopy();

  return (
    <a
      href={`#${MAIN_ID}`}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:font-heading focus:text-sm focus:font-medium focus:text-primary focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
    >
      {c.nav.skipToContent}
    </a>
  );
};

export default SkipLink;
