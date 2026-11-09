import { localDateTime } from "@/lib/calendar";
import { eventPath } from "@/lib/events/paths";
import type { SiteEvent } from "@/lib/events/types";
import { CONTACT_EMAIL, INSTAGRAM_LINK, LINKEDIN_LINK, YOUTUBE_LINK } from "@/lib/links";
import { type Locale, localeTags } from "@/i18n/locale";
import { pick } from "@/i18n/localized";
import { LECTURE_SERIES } from "@/lib/events/series";
import { absoluteUrl, SITE_URL } from "./site";

/**
 * Maschinenlesbare Fassung dessen, was auf der Seite ohnehin steht – im
 * ausgelieferten HTML, nicht erst nach dem Laden.
 *
 * Bewusst zurückhaltend: Hier steht nur, was auf der Seite belegt ist. Keine
 * Mitgliederzahlen, keine Bewertungen, keine erfundenen Preise – strukturierte
 * Daten, die über den sichtbaren Inhalt hinausgehen, sind bei Google ein
 * Verstoß und hier obendrein eine Behauptung, die niemand geprüft hat. Der
 * einzige Preis ist „kostenlos" für unsere eigenen Termine; das steht auf der
 * Startseite (copy.ts) so.
 */

/** Stabiler Bezeichner, damit Events auf dieselbe Organisation zeigen können. */
export const ORG_ID = `${SITE_URL}/#organisation`;

export function organizationNode(description: string) {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Psychedelic Student Network Germany",
    alternateName: "PSNG",
    url: SITE_URL,
    logo: `${SITE_URL}/psng-logo.png`,
    image: `${SITE_URL}/og-image.jpg`,
    description,
    email: CONTACT_EMAIL,
    areaServed: { "@type": "Country", name: "Germany" },
    // „Seit März 2026 aktiv" – dieselbe Angabe wie im Hero.
    foundingDate: "2026-03",
    inLanguage: [localeTags.de, localeTags.en],
    sameAs: [INSTAGRAM_LINK, LINKEDIN_LINK, YOUTUBE_LINK],
  };
}

export function websiteNode(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "PSNG",
    publisher: { "@id": ORG_ID },
    inLanguage: localeTags[locale],
  };
}

/**
 * Anfang und Ende mit Zeitzonen-Versatz. Ohne feste Uhrzeit bleibt es beim
 * reinen Datum – nach Schema.org zulässig und besser als eine geratene Zeit.
 * Ein Enddatum schlägt die Uhrzeit: Bei mehrtägigen Terminen sagt die zweite
 * Uhrzeit nichts über den letzten Tag aus.
 */
export function eventTimes(e: SiteEvent): { startDate: string; endDate?: string } {
  if (!e.startTime || e.timeTbd) return { startDate: e.date, endDate: e.endDate };
  const startDate = localDateTime(e.date, e.startTime, e.timeZone);
  if (e.endDate) return { startDate, endDate: e.endDate };
  const endTime = e.endTime ?? seriesEndTime(e);
  return { startDate, endDate: endTime ? localDateTime(e.date, endTime, e.timeZone) : undefined };
}

const minutesOf = (clock: string) => {
  const [h, m] = clock.split(":").map(Number);
  return h * 60 + m;
};

/**
 * Ende eines Reihentermins ohne eigene Endzeit: Beginn plus die Dauer, die in
 * `LECTURE_SERIES` festliegt. Alles andere bekommt kein Ende – geraten wird nicht.
 */
function seriesEndTime(e: SiteEvent): string | undefined {
  if (!e.startTime || e.category !== "lecture" || e.column !== LECTURE_SERIES.column || e.partOf) return undefined;
  const end = minutesOf(e.startTime) + minutesOf(LECTURE_SERIES.endTime) - minutesOf(LECTURE_SERIES.startTime);
  if (end >= 24 * 60) return undefined;
  return `${String(Math.floor(end / 60)).padStart(2, "0")}:${String(end % 60).padStart(2, "0")}`;
}

/**
 * Online, vor Ort oder beides – aus `attendance`, nicht aus dem Ortstext.
 * Ein Place nur mit echter Adresse (`venue`); fehlt `attendance`, bleibt die
 * Angabe weg, statt eine zu erfinden. Ohne Ort ist ein Event für Google
 * ungültig – dann gibt `eventNode` gar nichts aus.
 */
function eventPlace(e: SiteEvent, url: string) {
  if (!e.attendance) return undefined;
  const virtual = { "@type": "VirtualLocation", url };
  const place = e.venue && {
    "@type": "Place",
    name: e.venue.name,
    address: {
      "@type": "PostalAddress",
      ...(e.venue.street ? { streetAddress: e.venue.street } : {}),
      ...(e.venue.postalCode ? { postalCode: e.venue.postalCode } : {}),
      addressLocality: e.venue.city,
      addressCountry: e.venue.country,
    },
  };
  const mode = (m: string) => `https://schema.org/${m}EventAttendanceMode`;
  if (e.attendance === "online") return { eventAttendanceMode: mode("Online"), location: virtual };
  if (e.attendance === "hybrid") {
    return { eventAttendanceMode: mode("Mixed"), location: place ? [place, virtual] : virtual };
  }
  return place ? { eventAttendanceMode: mode("Offline"), location: place } : undefined;
}

function eventStatus(e: SiteEvent) {
  const status = (s: string) => `https://schema.org/Event${s}`;
  if (e.status === "cancelled") return { eventStatus: status("Cancelled") };
  if (e.status === "postponed") return { eventStatus: status("Postponed") };
  if (e.rescheduledFrom) return { eventStatus: status("Rescheduled"), previousStartDate: e.rescheduledFrom };
  return { eventStatus: status("Scheduled") };
}

/** Eintritt frei: nur unsere eigenen und gemeinsamen Termine ohne Beitrag (siehe Kopf der Datei). */
function eventOffers(e: SiteEvent, url: string) {
  if ((e.role !== "own" && e.role !== "co-hosted") || e.contribution || e.partOf) return undefined;
  return {
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url,
    },
  };
}

function eventPerformers(e: SiteEvent, children: SiteEvent[]) {
  const people = [e, ...children].filter((x) => x.speaker && x.speaker !== "PSNG-Team");
  const seen = new Set<string>();
  const performers = people.flatMap((x) => {
    if (!x.speaker || seen.has(x.speaker)) return [];
    seen.add(x.speaker);
    return [{ "@type": "Person", name: x.speaker, ...(x.speakerWebsiteUrl ? { url: x.speakerWebsiteUrl } : {}) }];
  });
  if (!performers.length) return {};
  return { performer: performers.length === 1 ? performers[0] : performers };
}

/**
 * Ein Event als Schema.org-Event, für seine eigene Detailseite. `undefined`,
 * wenn der Ort nicht feststeht: Ein Event ohne `location` meldet die Search
 * Console als ungültig, ein geratener Ort wäre eine Behauptung.
 *
 * @param images absolute oder Pfad-URLs der Bilder, die auf der Seite stehen
 *   (Astro kennt die gebauten Pfade, diese Funktion nicht). Ohne Bild gilt das
 *   Standard-Vorschaubild der Seite.
 * @param children die Vorträge eines Abends, deren Speaker als Performer gelten.
 */
export function eventNode(e: SiteEvent, locale: Locale, images: string[] = [], children: SiteEvent[] = []) {
  const url = absoluteUrl(eventPath(e.slug, locale));
  const place = eventPlace(e, url);
  if (!place) return undefined;
  const partner = e.partner && { "@type": "Organization", name: e.partner.name, url: e.partner.url };
  // Bei fremden Konferenzen sind wir Gäste, nicht Veranstalter.
  const organizer =
    e.role === "own" ? { "@id": ORG_ID } : e.role === "co-hosted" ? [{ "@id": ORG_ID }, ...(partner ? [partner] : [])] : partner;
  const description = pick(e.description ?? e.abstract?.text ?? e.subtitle, locale);
  return {
    "@type": "Event",
    "@id": `${absoluteUrl(eventPath(e.slug, "de"))}#event`,
    name: pick(e.title, locale),
    ...eventTimes(e),
    ...eventStatus(e),
    ...place,
    ...(description ? { description } : {}),
    ...(e.language ? { inLanguage: e.language } : {}),
    image: (images.length ? images : ["/og-image.jpg"]).map(absoluteUrl),
    ...eventPerformers(e, children),
    ...(organizer ? { organizer } : {}),
    ...eventOffers(e, url),
    url,
  };
}

/** Mehrere Knoten als ein Block – eine Stelle im Head statt vieler. */
export function graph(...nodes: (object | undefined)[]) {
  return { "@context": "https://schema.org", "@graph": nodes.filter((n) => n !== undefined) };
}
