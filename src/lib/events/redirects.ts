import type { SiteEvent } from "./types";

export interface Redirect {
  source: string;
  destination: string;
  permanent?: boolean;
}

/**
 * Fehlende Weiterleitungen für frühere Slugs: Jeder `previousSlugs`-Eintrag
 * braucht einen permanenten Redirect, deutsch und englisch. Leere Liste = alles da.
 */
export function missingSlugRedirects(events: SiteEvent[], redirects: Redirect[]): string[] {
  const missing: string[] = [];
  for (const e of events) {
    for (const old of e.previousSlugs ?? []) {
      for (const prefix of ["/events", "/en/events"]) {
        const source = `${prefix}/${old}`;
        const r = redirects.find((x) => x.source === source);
        if (!r || r.destination !== `${prefix}/${e.slug}` || r.permanent !== true) missing.push(source);
      }
    }
  }
  return missing;
}
