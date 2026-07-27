import trypPhoto1 from "@/assets/tryp-1.webp";
import icprPhoto from "@/assets/icpr-1.webp";
import psngBpsaLogo from "@/assets/PSNG-BPSA-Logo.webp";
import torstenPassiePhoto from "@/assets/Torsten-Passie.webp";
import ytKickoff from "@/assets/yt-fH9gMcj65l4.webp";
import ytLonergan from "@/assets/yt-LftC0jVmxuI.webp";
import ytTransformation from "@/assets/yt-vhPzjy2N2mM.webp";

export type EventCategory =
  | "kickoff"
  | "lecture"
  | "community-call"
  | "gathering"
  | "workshop"
  | "other";

/** Die drei Spalten der Events-Sektion – Einordnung nach Veranstaltungstyp, nicht nach Speaker-Status. */
export type EventColumn = "vortraege" | "community" | "social";

export const eventColumnLabels: Record<EventColumn, string> = {
  vortraege: "Vorträge",
  community: "Community",
  social: "Social",
};

export type SpeakerType = "student" | "gast";

/** Badge innerhalb der Vorträge-Spalte, rein beschreibend, ohne Rangfolge. */
export const speakerTypeLabels: Record<SpeakerType, string> = {
  student: "Studentisch",
  gast: "Expertenvortrag",
};

export interface EventAssets {
  youtubeUrl?: string;
  slidesUrl?: string;
  photos?: string[];
  attendees?: number;
  recapUrl?: string;
  speakerLinkedinUrl?: string;
  /** Link zu einer externen Website (z. B. Partner-Konferenz), mit eigenem Linktext. */
  externalUrl?: string;
  externalLabel?: string;
  /** Co-Branding-Logo, z. B. bei gemeinsam veranstalteten Events mit einem Partner. */
  partnerLogo?: string;
  partnerLogoAlt?: string;
  /** Portraitfoto des Speakers, quadratisch dargestellt. */
  speakerPhoto?: string;
  /**
   * Lokal gehostetes Vorschaubild für `youtubeUrl`. Ohne das würde beim reinen
   * Betrachten der Seite schon ein Thumbnail von i.ytimg.com geladen und damit
   * die IP-Adresse an Google übertragen – vor jeder Nutzerinteraktion.
   */
  youtubeThumbnail?: string;
}

export interface PsngEvent {
  id: string;
  title: string;
  category: EventCategory;
  column: EventColumn;
  date: string;
  /** optionaler Wochentag, wird der formatierten Datumsangabe vorangestellt (z. B. "Samstag") */
  weekdayLabel?: string;
  time: string;
  endDate?: string;
  location?: string;
  speaker?: string;
  speakerType?: SpeakerType;
  /** verlinkt den Namen des Speakers in der Karte (z. B. persönliche Website) */
  speakerWebsiteUrl?: string;
  /** kurzes Label für besonders hervorgehobene Events (z. B. "Erstes eigenes In-Person-Event") */
  highlightBadge?: string;
  /** hebt das Event in den Aufnahmen hervor (z. B. der Kick-off) */
  featured?: boolean;
  description?: string;
  /** kurzer Hinweis, für wen das Event gedacht ist, direkt unter der Beschreibung */
  audienceNote?: string;
  /** Teilnahmebeitrag, in der Datum/Ort-Faktenzeile angezeigt */
  contribution?: string;
  /** kursiver Hinweis am Kartenende (z. B. "Vorläufiges Programm, Änderungen möglich.") */
  disclaimer?: string;
  registrationUrl?: string;
  /** überschreibt den Standard-Button-Text "Jetzt anmelden" (z. B. "Zoom-Link" bei Online-Talks) */
  registrationLabel?: string;
  assets?: EventAssets;
}

export const events: PsngEvent[] = [
  // ── Kick-off ──────────────────────────────────────────────────────────────
  {
    id: "kickoff-2026-03-03",
    title: "Kick-off: Was macht das PSNG?",
    category: "kickoff",
    column: "community",
    date: "2026-03-03",
    time: "19:00 – 20:00",
    speaker: "PSNG-Team",
    featured: true,
    description:
      "Unser allererstes Event – und ein besonderer Moment. Beim Kick-off hat sich das PSNG erstmals vorgestellt: wer wir sind, was unsere Mission ist und wie du aktiv werden, einer Lokalgruppe beitreten oder deine eigene gründen kannst. Danke an alle, die dabei waren!",
    assets: {
      youtubeUrl: "https://www.youtube.com/watch?v=fH9gMcj65l4",
      youtubeThumbnail: ytKickoff,
      slidesUrl: "https://www.canva.com/design/DAHBkDM0-8o/t39605od4UYhUdlL0MnidQ/view",
    },
  },

  // ── Präsenz in der Community (externe Konferenzen) ────────────────────────
  {
    id: "presence-tryp-expo-2026",
    title: "TRYP Expo",
    category: "other",
    column: "community",
    date: "2026-05-16",
    time: "ganztägig",
    location: "Funkhaus Berlin",
    description:
      "Europas größtes Event an der Schnittstelle von Psychedelika-Forschung, Mental Health und Bewusstseinskultur: 80+ Speaker, 150+ Aussteller, drei Tage Funkhaus Berlin. Das PSNG hat sich dort als Community getroffen: gemeinsamer Besuch, Banner, und Mittagessen.",
    assets: {
      photos: [trypPhoto1],
      externalUrl: "https://tryp.de",
      externalLabel: "tryp.de",
    },
  },
  {
    id: "presence-icpr-2026",
    title: "ICPR 2026",
    category: "other",
    column: "community",
    date: "2026-06-05",
    time: "ganztägig",
    location: "Haarlem",
    description:
      "International Conference on Psychedelic Research: Europas wichtigste wissenschaftliche Konferenz für Psychedelika-Forschung. Das PSNG hat sich auch hier als Gruppe getroffen, ein wichtiger Schritt in der Vernetzung mit der europäischen Forschungscommunity.",
    assets: {
      photos: [icprPhoto],
      externalUrl: "https://icpr-conference.com",
      externalLabel: "icpr-conference.com",
    },
  },

  // ── Community Calls (4. Dienstag des Monats) ──────────────────────────────
  {
    id: "community-call-1",
    title: "1. PSNG Community Call",
    category: "community-call",
    column: "community",
    date: "2026-03-17",
    time: "19:00 – 20:00",
    location: "Zoom",
  },
  {
    id: "community-call-2",
    title: "2. PSNG Community Call",
    category: "community-call",
    column: "community",
    date: "2026-04-28",
    time: "19:00 – 20:00",
    location: "Zoom",
  },
  {
    id: "community-call-3",
    title: "3. PSNG Community Call",
    category: "community-call",
    column: "community",
    date: "2026-05-26",
    time: "19:00 – 20:00",
    location: "Zoom",
  },
  {
    id: "community-call-4",
    title: "4. PSNG Community Call",
    category: "community-call",
    column: "community",
    date: "2026-06-23",
    time: "19:00 – 20:00",
    location: "Zoom",
  },
  {
    id: "community-call-5",
    title: "5. PSNG Community Call",
    category: "community-call",
    column: "community",
    date: "2026-07-28",
    time: "19:00 – 20:00",
    location: "Zoom",
  },
  {
    id: "community-call-6",
    title: "6. PSNG Community Call",
    category: "community-call",
    column: "community",
    date: "2026-08-25",
    time: "19:00 – 20:00",
    location: "Zoom",
  },

  // ── Lectures (2. Dienstag des Monats) ─────────────────────────────────────
  {
    id: "lecture-1",
    title: "1. PSNG Lecture",
    category: "lecture",
    column: "vortraege",
    date: "2026-04-14",
    time: "19:00 – 20:00",
    location: "Zoom",
  },
  {
    id: "lecture-2",
    title: "2. PSNG Lecture",
    category: "lecture",
    column: "vortraege",
    date: "2026-05-12",
    time: "19:00 – 20:00",
    location: "Zoom",
  },
  {
    id: "lecture-lonergan-2026-06",
    title: "Introduction to Psychedelic Neuroscience",
    category: "lecture",
    column: "vortraege",
    date: "2026-06-09",
    time: "19:00 – 20:00",
    speaker: "Eric Lonergan, PhD cand.",
    speakerType: "student",
    description:
      "Ein breiter Überblick: Was Psychedelika sind und wie sie im Gehirn wirken – wie sie Wahrnehmung verändern und psychische Erkrankungen behandeln können. Eric forscht am Decision Circuits Lab (Einstein Center for Neurosciences Berlin) zu den neuronalen und serotonergen Mechanismen von Halluzinationen.",
    assets: {
      youtubeUrl: "https://www.youtube.com/watch?v=LftC0jVmxuI",
      youtubeThumbnail: ytLonergan,
      speakerLinkedinUrl: "https://www.linkedin.com/in/eric-lonergan-563b0683/",
    },
  },
  {
    id: "lecture-4",
    title: "Psychedelics as Tools for Personal and Social Transformation",
    category: "lecture",
    column: "vortraege",
    date: "2026-07-14",
    time: "19:00 – 20:00",
    speaker: "Eric Lonergan, PhD cand.",
    speakerType: "student",
    description:
      "Von individueller Heilung zu kollektiver Verbundenheit: Wie können Psychedelika unser Gehirn, unsere Beziehungen und unsere Gemeinschaften verändern, um ein Gefühl von Zugehörigkeit wiederherzustellen? Eric forscht am Decision Circuits Lab (Einstein Center for Neurosciences Berlin) zu den neuronalen und serotonergen Mechanismen von Halluzinationen.",
    assets: {
      youtubeUrl: "https://youtu.be/vhPzjy2N2mM",
      youtubeThumbnail: ytTransformation,
      speakerLinkedinUrl: "https://www.linkedin.com/in/eric-lonergan-563b0683/",
    },
  },
  {
    id: "lecture-5",
    title: "Ein realitätsnaher Blick auf die aktuelle Therapieforschung mit Psychedelika",
    category: "lecture",
    column: "vortraege",
    date: "2026-08-11",
    time: "19:30 – 20:30",
    location: "Zoom",
    speaker: "Prof. Dr. Torsten Passie",
    speakerType: "gast",
    speakerWebsiteUrl: "http://psychedelic-science.org/",
    description:
      "Ein kritischer, realitätsnaher Blick auf die aktuelle Therapieforschung mit Psychedelika: Neuroplastizität und ihre Grenzen, wie belastbar Therapieeffekte tatsächlich sind, der Wert für psychiatrische Indikationen sowie Methodikkritik und Übertragbarkeitsprobleme präklinischer Studien. Torsten Passie ist apl. Professor für Psychiatrie und Psychotherapie an der Medizinischen Hochschule Hannover und Visiting Scientist an der Goethe-Universität Frankfurt am Main. Er forscht seit mehr als 35 Jahren zu Psychedelika und gilt international als anerkannter Experte für die Pharmakologie und therapeutische Anwendung halluzinogener und entaktogener Substanzen.",
    registrationUrl: "https://luma.com/event/evt-ebeCkgyBvDwslja",
    assets: {
      speakerPhoto: torstenPassiePhoto,
    },
  },
  {
    id: "lecture-6",
    title: "6. PSNG Lecture",
    category: "lecture",
    column: "vortraege",
    date: "2026-09-08",
    time: "19:00 – 20:00",
    location: "Zoom",
  },

  // ── Gatherings ────────────────────────────────────────────────────────────
  {
    id: "gathering-2026-08-08",
    title: "Ein Abend rund um Psychedelika, Forschung, Verbindung & Austausch",
    category: "gathering",
    column: "social",
    highlightBadge: "Erstes eigenes In-Person-Event, PSNG x BPSA",
    date: "2026-08-08",
    weekdayLabel: "Samstag",
    time: "16:00 bis 20:00 Uhr (Einlass ab 15:30)",
    location: "König Galerie, Alexandrinenstraße 118–121, 10969 Berlin",
    contribution: "5 bis 10 € empfohlen, freiwillig, niemand wird abgewiesen",
    registrationUrl: "https://luma.com/n6io5052",
    description:
      "Das erste eigene In-Person-Treffen des PSNG, gemeinsam mit der Berlin Psychedelic Science Association (BPSA). Ein Abend zum Ankommen, Kennenlernen und Austauschen, mit einem Vortrag zu den prosozialen Effekten von Psychedelika, einem interaktiven Workshop und einer Klangmeditation zur Integration mit Lucie André (Beyond Yoga). Danach Apéro und gemeinsames Abendessen für alle, die möchten.",
    audienceNote: "Für Studierende und alle Interessierten, Vorwissen braucht ihr keins.",
    disclaimer: "Vorläufiges Programm, Änderungen möglich.",
    assets: {
      partnerLogo: psngBpsaLogo,
      partnerLogoAlt: "PSNG × BPSA",
    },
  },
];

/**
 * `new Date("2026-07-28")` wird als UTC-Mitternacht geparst und anschließend in
 * Lokalzeit formatiert – westlich von UTC ergibt das den Vortag. Die Datums-
 * angaben sind aber kalendarisch gemeint, also explizit lokal konstruieren.
 */
function parseEventDate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function startOfDay(date: Date): number {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export function hasAssets(e: PsngEvent): boolean {
  const a = e.assets;
  if (!a) return false;
  return Boolean(
    a.youtubeUrl || a.slidesUrl || a.recapUrl || a.attendees || a.photos?.length || a.externalUrl,
  );
}

export function getUpcomingEvents(referenceDate: Date = new Date()): PsngEvent[] {
  const t = startOfDay(referenceDate);
  return events
    .filter((e) => parseEventDate(e.date).getTime() >= t)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getUpcomingEventsByColumn(
  column: EventColumn,
  referenceDate?: Date,
): PsngEvent[] {
  return getUpcomingEvents(referenceDate).filter((e) => e.column === column);
}

/** Nächstes Event mit Anmeldelink, für die Ankündigungsleiste. Verschwindet automatisch, sobald das Datum vorbei ist. */
export function getNextBannerEvent(referenceDate?: Date): PsngEvent | undefined {
  return getUpcomingEvents(referenceDate).find((e) => e.registrationUrl);
}

/** Vergangene Events mit Material – neueste zuerst, wie man ein Archiv liest. */
export function getHighlightEvents(referenceDate: Date = new Date()): PsngEvent[] {
  const t = startOfDay(referenceDate);
  return events
    .filter((e) => parseEventDate(e.date).getTime() < t && hasAssets(e))
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Stabiler Anker für Deep-Links auf ein vergangenes Event. */
export function getEventAnchor(event: PsngEvent): string {
  return `event-${event.id}`;
}

export function formatEventDate(iso: string): string {
  return parseEventDate(iso).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
