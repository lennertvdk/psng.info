import { useEffect } from "react";
import {
  type Locale,
  localeOgTags,
  localeTags,
} from "./locale";
import { alternatesFor, pathFor, type RouteKey } from "./routes";

export const SITE_URL = "https://psng.info";

/**
 * Setzt Titel, Beschreibung und die Sprachangaben der aktuellen Seite.
 *
 * Die Seite ist eine reine Client-Anwendung – es gibt keinen Server, der je
 * Route ein eigenes HTML ausliefert. Alles hier wird also nach dem Laden
 * gesetzt. Suchmaschinen führen dafür heute JavaScript aus; serverseitig
 * gerendert wäre es trotzdem verlässlicher. In der statischen index.html
 * stehen deshalb weiterhin sinnvolle deutsche Vorgaben, damit ein Crawler,
 * der kein JavaScript ausführt, nicht vor leeren Angaben steht.
 */
export function useDocumentHead({
  locale,
  routeKey,
  title,
  description,
}: {
  locale: Locale;
  routeKey: RouteKey;
  title: string;
  description: string;
}) {
  useEffect(() => {
    document.documentElement.lang = localeTags[locale];
    document.title = title;

    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:locale", localeOgTags[locale]);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    const canonical = `${SITE_URL}${pathFor(routeKey, locale)}`;
    setLink("canonical", canonical);
    setMeta("property", "og:url", canonical);

    // hreflang: Alle Sprachfassungen dieser Seite verweisen aufeinander,
    // damit Suchmaschinen sie als dieselbe Seite erkennen und nicht als
    // Duplikat werten. x-default zeigt auf die deutsche Fassung.
    const alternates = alternatesFor(routeKey);
    document
      .querySelectorAll("link[rel='alternate'][data-i18n]")
      .forEach((el) => el.remove());
    for (const alt of alternates) {
      appendAlternate(localeTags[alt.locale], `${SITE_URL}${alt.path}`);
    }
    const fallback = alternates.find((a) => a.locale === "de") ?? alternates[0];
    if (fallback) appendAlternate("x-default", `${SITE_URL}${fallback.path}`);
  }, [locale, routeKey, title, description]);
}

function setMeta(keyAttr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${keyAttr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(keyAttr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function appendAlternate(hreflang: string, href: string) {
  const el = document.createElement("link");
  el.rel = "alternate";
  el.hreflang = hreflang;
  el.href = href;
  el.dataset.i18n = "true";
  document.head.appendChild(el);
}
