import type { Locale } from "./locale";

/**
 * Ein Text, der je Sprache anders lauten kann.
 *
 * Ein einfacher String gilt für beide Sprachen. Das ist der häufigere Fall,
 * als man denkt: Namen, Orte, Titel von Vorträgen und Eigennamen von
 * Organisationen werden nicht übersetzt.
 *
 * Fehlt die englische Fassung, greift die deutsche. Inhaltsdaten wachsen
 * laufend – ein neues Event soll nicht daran scheitern, dass gerade niemand
 * Zeit für die Übersetzung hat. Eine Karte, die auf Deutsch dasteht, ist
 * besser als eine, die fehlt. Für die Oberfläche gilt das Gegenteil: Dort
 * erzwingt `Copy` in copy.ts beide Sprachen zur Bauzeit.
 */
export type Localized = string | { de: string; en?: string };

export function pick(value: Localized, locale: Locale): string;
export function pick(value: Localized | undefined, locale: Locale): string | undefined;
export function pick(
  value: Localized | undefined,
  locale: Locale,
): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "string") return value;
  return (locale === "en" ? value.en : value.de) ?? value.de;
}

/** Ob für diesen Text eine eigene englische Fassung hinterlegt ist. */
export function hasTranslation(value: Localized | undefined): boolean {
  return typeof value === "object" && typeof value.en === "string";
}

/** Die Sprach-Kennung, mit der `Intl` formatiert. */
const intlLocales: Record<Locale, string> = {
  de: "de-DE",
  // Britisches Englisch: "9 September 2026" statt "September 9, 2026" – das
  // bleibt näher an der deutschen Reihenfolge und liest sich im Zeitstrahl
  // neben den deutschen Daten nicht wie ein Bruch.
  en: "en-GB",
};

export function intlLocale(locale: Locale): string {
  return intlLocales[locale];
}
