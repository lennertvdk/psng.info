import { formatRelativeToToday } from "@/lib/events/format";
import { toIsoDate } from "@/lib/events/schedule";
import { intlLocale } from "@/i18n/localized";
import type { Locale } from "@/i18n/locale";

/**
 * Der Zeitstrahl auf /events kommt fertig aus dem Build. Hier wird nur
 * nachgeführt, was vom heutigen Tag und von der Auswahl abhängt:
 *
 * - Heute-Marker und „in 6 Tagen“, falls seit dem Build ein Tag vergangen ist
 *   (die tägliche Neuerstellung holt den Rest nach),
 * - der Filter aus `?filter=` – in der URL, damit man auf eine gefilterte
 *   Ansicht verlinken kann und Zurück den Wechsel rückgängig macht,
 * - die Jahres- und Monatsmarken, die mit ihren Einträgen ausgeblendet werden.
 */
const FILTERS = ["alle", "vortraege", "community"] as const;
type Filter = (typeof FILTERS)[number];

export function initTimeline(): void {
  const list = document.querySelector<HTMLOListElement>("ol.timeline");
  const marker = list?.querySelector<HTMLLIElement>(".timeline-today");
  if (!list || !marker) return;

  const locale = document.documentElement.lang as Locale;
  const rows = [...list.querySelectorAll<HTMLLIElement>(".timeline-row")];

  // Heute neu bestimmen: Der Marker steht vor dem ersten Eintrag, der vorbei ist.
  const today = toIsoDate(new Date());
  for (const row of rows) {
    row.dataset.phase = (row.dataset.end ?? row.dataset.date!) < today ? "past" : "upcoming";
    const relative = row.querySelector<HTMLElement>("[data-relative]");
    if (relative) {
      relative.hidden = row.dataset.phase === "past";
      relative.textContent = relative.hidden ? "" : formatRelativeToToday(relative.dataset.relative!, locale, new Date());
    }
  }
  const firstPast = rows.find((r) => r.dataset.phase === "past");
  // Beginnt mit dem ersten vergangenen Eintrag ein früherer Monat, gehört der
  // Marker vor dessen Marken, nicht hinein.
  const month = today.slice(0, 7);
  let anchor: HTMLElement | null = firstPast ?? null;
  for (
    let prev = anchor?.previousElementSibling as HTMLElement | null;
    prev?.dataset.mark && !month.startsWith(prev.dataset.mark);
    prev = prev.previousElementSibling as HTMLElement | null
  ) {
    anchor = prev;
  }
  list.insertBefore(marker, anchor);
  // „Heute · 9. Nov.“: Das Datum kommt erst hier dazu, damit ohne JavaScript
  // nie das Datum des Builds als heute dasteht.
  const date = new Date().toLocaleDateString(intlLocale(locale), { day: "numeric", month: "short" });
  for (const slot of marker.querySelectorAll<HTMLElement>("[data-today-date]")) {
    slot.textContent = `${slot.dataset.separator ?? ""}${date}`;
  }

  const current = (): Filter => {
    const value = new URLSearchParams(location.search).get("filter");
    return (FILTERS as readonly string[]).includes(value ?? "") ? (value as Filter) : "alle";
  };

  const apply = () => {
    const filter = current();
    for (const link of document.querySelectorAll<HTMLAnchorElement>("a[data-filter]")) {
      if (link.dataset.filter === filter) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    }
    const matching = rows.filter((r) => filter === "alle" || r.dataset.column === filter);
    for (const row of rows) row.hidden = !matching.includes(row);
    // Der Marker trennt zwei Hälften; ist die obere leergefiltert, sagte er nur
    // noch „darüber kommt nichts“.
    marker.hidden = !matching.some((r) => r.dataset.phase === "upcoming");
    // Eine Marke ohne sichtbaren Eintrag darunter fällt weg. Ein Monat endet
    // an der nächsten Marke, ein Jahr erst an der nächsten Jahresmarke.
    for (const mark of list.querySelectorAll<HTMLElement>(".timeline-mark")) {
      const ends = (el: HTMLElement) => el.dataset.level === "year" || (mark.dataset.level === "month" && !!el.dataset.mark);
      let el = mark.nextElementSibling as HTMLElement | null;
      let visible = false;
      while (el && !ends(el) && !visible) {
        visible = !el.hidden && (el.classList.contains("timeline-row") || el === marker);
        el = el.nextElementSibling as HTMLElement | null;
      }
      mark.hidden = !visible;
    }
  };

  for (const link of document.querySelectorAll<HTMLAnchorElement>("a[data-filter]")) {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const url = new URL(location.href);
      if (link.dataset.filter === "alle") url.searchParams.delete("filter");
      else url.searchParams.set("filter", link.dataset.filter!);
      history.pushState(null, "", url);
      apply();
    });
  }
  window.addEventListener("popstate", apply);
  apply();
}
