import { formatRelativeToToday } from "@/lib/events/format";
import { toIsoDate } from "@/lib/events/schedule";
import type { Locale } from "@/i18n/locale";

/**
 * Die Startseite kommt mit dem Datum des Builds. Liegt der schon einen Tag
 * zurück (die tägliche Neuerstellung ist ausgefallen), soll sie trotzdem
 * nichts Vergangenes als kommend zeigen:
 *
 * - `data-expires="JJJJ-MM-TT"`: nach diesem Tag ausblenden,
 * - `data-relative="JJJJ-MM-TT"`: „in 6 Tagen“ neu ausrechnen,
 * - `data-hide-when-expired`: einen Abschnitt ausblenden, wenn alle seine
 *   Termine abgelaufen sind – sonst stünde eine leere Überschrift da.
 */
export function initFreshness(): void {
  const now = new Date();
  const today = toIsoDate(now);
  const locale = document.documentElement.lang as Locale;
  for (const el of document.querySelectorAll<HTMLElement>("[data-expires]")) {
    if (el.dataset.expires! < today) el.hidden = true;
  }
  for (const section of document.querySelectorAll<HTMLElement>("[data-hide-when-expired]")) {
    const items = [...section.querySelectorAll<HTMLElement>("[data-expires]")];
    if (items.length && items.every((el) => el.hidden)) section.hidden = true;
  }
  for (const el of document.querySelectorAll<HTMLElement>("[data-relative]")) {
    el.textContent = formatRelativeToToday(el.dataset.relative!, locale, now);
  }
}
