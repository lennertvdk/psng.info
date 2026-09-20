import { useLocation } from "react-router-dom";

/**
 * Die Seite gibt es auf Deutsch und Englisch. Deutsch ist die Standardsprache
 * und läuft ohne Präfix – die bestehenden URLs bleiben damit unverändert, und
 * nichts, was irgendwo verlinkt ist, bricht weg.
 */
export const locales = ["de", "en"] as const;

export type Locale = (typeof locales)[number];

export const DEFAULT_LOCALE: Locale = "de";

/** Das Sprachpräfix im Pfad, ohne Schrägstriche. Deutsch hat keins. */
export const localePrefix: Record<Locale, string> = {
  de: "",
  en: "en",
};

/**
 * Liest die Sprache aus dem Pfad. Bewusst nicht aus State oder Context: Der
 * Pfad ist ohnehin die Wahrheit – er steht in der Adresszeile, im Lesezeichen
 * und im Index der Suchmaschine. Ein zweiter Speicherort daneben könnte davon
 * abweichen, und dann wäre unklar, welcher von beiden gilt.
 */
export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "de";
}

/** Die Sprache der gerade angezeigten Seite. */
export function useLocale(): Locale {
  return localeFromPath(useLocation().pathname);
}

/** Die jeweils andere Sprache – der Umschalter kennt nur zwei Zustände. */
export function otherLocale(locale: Locale): Locale {
  return locale === "de" ? "en" : "de";
}

/** Anzeigename einer Sprache, in der Sprache selbst. */
export const localeNames: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
};

/** Kürzel für den Umschalter, wo der volle Name zu breit ist. */
export const localeShortNames: Record<Locale, string> = {
  de: "DE",
  en: "EN",
};

/** Der `lang`- und `hreflang`-Wert, den HTML erwartet. */
export const localeTags: Record<Locale, string> = {
  de: "de",
  en: "en",
};

/** Der `og:locale`-Wert, den Open Graph erwartet. */
export const localeOgTags: Record<Locale, string> = {
  de: "de_DE",
  en: "en_US",
};
