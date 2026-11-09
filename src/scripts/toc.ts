import { activeSection, barSpan, sectionWeights, stripPosition } from "@/lib/toc";

/** Mindestlänge des Balkens als Anteil der Linie, siehe barSpan(). */
const MIN_BAR = 0.12;
/** Spielraum, damit ein angesprungener Abschnitt sicher als erreicht gilt. */
const SLACK = 4;

/**
 * Führt das Inhaltsverzeichnis am linken Rand nach (SectionToc.astro): Abstände
 * der Punkte nach der Länge der Abschnitte, der Balken für den sichtbaren Teil
 * der Seite und `aria-current` am erreichten Abschnitt. Ziele, die gerade
 * ausgeblendet sind (Filter auf /events), fallen aus dem Streifen.
 */
export function initToc(): void {
  for (const nav of document.querySelectorAll<HTMLElement>("[data-toc]")) setup(nav);
}

function setup(nav: HTMLElement): void {
  const line = nav.querySelector<HTMLElement>("[data-toc-line]");
  const bar = nav.querySelector<HTMLElement>("[data-toc-bar]");
  const intro = nav.querySelector<HTMLElement>("[data-toc-intro]");
  const list = nav.querySelector<HTMLElement>("[data-toc-list]");
  const main = document.querySelector<HTMLElement>("main");
  if (!line || !bar || !intro || !list || !main) return;

  const entries = [...nav.querySelectorAll<HTMLLIElement>("[data-toc-item]")].map((li) => {
    const link = li.querySelector<HTMLAnchorElement>("a")!;
    return { li, link, dot: li.querySelector<HTMLElement>("[data-toc-dot]")!, id: decodeURIComponent(link.hash.slice(1)) };
  });

  const sync = () => {
    // Unter 960 px ist der Streifen ausgeblendet.
    if (nav.offsetParent === null) return;
    const scrollY = window.scrollY;
    const docTop = (el: Element) => el.getBoundingClientRect().top + scrollY;

    const visible = entries.filter((entry) => {
      const target = document.getElementById(entry.id);
      const shown = Boolean(target && target.getClientRects().length > 0);
      entry.li.hidden = !shown;
      return shown;
    });
    const start = docTop(main);
    const end = start + main.offsetHeight;
    const tops = visible.map((entry) => docTop(document.getElementById(entry.id)!));

    const weights = sectionWeights(tops, start, end);
    intro.style.flex = `${weights.intro} 1 0%`;
    list.style.flex = `${weights.sections.reduce((a, b) => a + b, 0)} 1 0%`;
    visible.forEach((entry, i) => (entry.li.style.flex = `${weights.sections[i]} 1 0%`));

    const lineRect = line.getBoundingClientRect();
    const dotYs = visible.map(({ dot }) => {
      const r = dot.getBoundingClientRect();
      return r.top + r.height / 2 - lineRect.top;
    });
    const docYs = [start, ...tops, end];
    const stripYs = [0, ...dotYs, lineRect.height];
    const span = barSpan(
      stripPosition(scrollY, docYs, stripYs),
      stripPosition(scrollY + window.innerHeight, docYs, stripYs),
      lineRect.height,
      lineRect.height * MIN_BAR,
    );
    bar.style.top = `${span.top}px`;
    bar.style.height = `${span.height}px`;

    // Erreicht ist ein Abschnitt, sobald seine Oberkante dort steht, wo ein
    // Sprunglink ihn hinsetzt: unter der festen Navigation (scroll-padding)
    // plus seinem eigenen scroll-margin. Ganz unten zählt der letzte, auch
    // wenn er zu kurz ist, um so weit nach oben zu kommen.
    const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const reach = visible.map((entry, i) => {
      const margin = parseFloat(getComputedStyle(document.getElementById(entry.id)!).scrollMarginTop) || 0;
      return tops[i] - padding - margin - SLACK;
    });
    const atBottom = scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    const active = atBottom ? visible.length - 1 : activeSection(reach, scrollY);
    for (const entry of entries) entry.link.removeAttribute("aria-current");
    if (active >= 0) visible[active].link.setAttribute("aria-current", "location");
  };

  let frame = 0;
  const schedule = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(sync);
  };
  schedule();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  window.addEventListener("popstate", schedule);
  // Abschnitte ändern ihre Höhe auch ohne Scrollen: Filter, nachgeladene Bilder.
  new ResizeObserver(schedule).observe(main);
}
