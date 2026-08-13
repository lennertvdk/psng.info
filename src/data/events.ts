import trypPhoto1 from "@/assets/tryp-1.webp";
import icprPhoto from "@/assets/icpr-1.webp";
import psngBpsaLogo from "@/assets/PSNG-BPSA-Logo.webp";
import torstenPassiePhoto from "@/assets/Torsten-Passie.webp";
import ytKickoff from "@/assets/yt-fH9gMcj65l4.webp";
import ytLonergan from "@/assets/yt-LftC0jVmxuI.webp";
import abendPhoto01 from "@/assets/abend-rund-um-psychedelika/abend-01.webp";
import abendPhoto04 from "@/assets/abend-rund-um-psychedelika/abend-04.webp";
import abendPhoto06 from "@/assets/abend-rund-um-psychedelika/abend-06.webp";
import abendPhoto07 from "@/assets/abend-rund-um-psychedelika/abend-07.webp";
import abendPhoto09 from "@/assets/abend-rund-um-psychedelika/abend-09.webp";
import abendPhoto10 from "@/assets/abend-rund-um-psychedelika/abend-10.webp";
import abendPhoto11 from "@/assets/abend-rund-um-psychedelika/abend-11.webp";
import abendPhoto12 from "@/assets/abend-rund-um-psychedelika/abend-12.webp";
import abendPhoto15 from "@/assets/abend-rund-um-psychedelika/abend-15.webp";
import abendPhoto16 from "@/assets/abend-rund-um-psychedelika/abend-16.webp";
import abendPhoto17 from "@/assets/abend-rund-um-psychedelika/abend-17.webp";
import abendPhoto18 from "@/assets/abend-rund-um-psychedelika/abend-18.webp";
import abendPhoto19 from "@/assets/abend-rund-um-psychedelika/abend-19.webp";
import abendPhoto20 from "@/assets/abend-rund-um-psychedelika/abend-20.webp";
import abendPhoto21 from "@/assets/abend-rund-um-psychedelika/abend-21.webp";
import abendPhoto22 from "@/assets/abend-rund-um-psychedelika/abend-22.webp";
import abendPhoto23 from "@/assets/abend-rund-um-psychedelika/abend-23.webp";
import abendPhoto24 from "@/assets/abend-rund-um-psychedelika/abend-24.webp";
import abendPhoto25 from "@/assets/abend-rund-um-psychedelika/abend-25.webp";
import abendPhoto26 from "@/assets/abend-rund-um-psychedelika/abend-26.webp";
import abendPhoto27 from "@/assets/abend-rund-um-psychedelika/abend-27.webp";
import abendPhoto28 from "@/assets/abend-rund-um-psychedelika/abend-28.webp";
import abendPhoto29 from "@/assets/abend-rund-um-psychedelika/abend-29.webp";
import abendPhoto30 from "@/assets/abend-rund-um-psychedelika/abend-30.webp";
import abendPhoto31 from "@/assets/abend-rund-um-psychedelika/abend-31.webp";
import abendPhoto32 from "@/assets/abend-rund-um-psychedelika/abend-32.webp";
import abendPhoto33 from "@/assets/abend-rund-um-psychedelika/abend-33.webp";

export type EventCategory =
  | "kickoff"
  | "lecture"
  | "gathering"
  | "workshop"
  | "other";

/** Die Spalten der Events-Sektion – Einordnung nach Veranstaltungstyp, nicht nach Speaker-Status. */
export type EventColumn = "vortraege" | "community";

export const eventColumnLabels: Record<EventColumn, string> = {
  vortraege: "Vorträge",
  community: "Community",
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
  /** Alt-Texte parallel zu `photos`, gleicher Index. Fehlt einer, greift ein generischer Fallback. */
  photoAlts?: string[];
  attendees?: number;
  /** Durchschnittsbewertung der Teilnehmenden, z. B. "9/10". */
  rating?: string;
  /** Anteil der Teilnehmenden, die das Event weiterempfehlen würden, in Prozent. */
  recommendPercent?: number;
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
  /** Leitfrage oder Untertitel, steht direkt unter dem Titel. */
  subtitle?: string;
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
  /** Kurzvita des Speakers, getrennt von der inhaltlichen Beschreibung. */
  speakerBio?: string;
  /** kurzes Label für besonders hervorgehobene Events (z. B. "Erstes eigenes In-Person-Event") */
  highlightBadge?: string;
  /** hebt das Event in den Aufnahmen hervor (z. B. der Kick-off) */
  featured?: boolean;
  /** rendert das Event in den vergangenen Events als große Feature-Karte (Foto-Karussell + Video), statt im normalen 2-Spalten-Grid */
  featuredLarge?: boolean;
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
    id: "lecture-5",
    title: "Ein realitätsnaher Blick auf die aktuelle Therapieforschung mit Psychedelika",
    subtitle:
      "Wie steht es um den tatsächlichen Nutzen für Psychiatrie und Psychotherapie und die Implementierung in das Medizinsystem?",
    category: "lecture",
    column: "vortraege",
    date: "2026-08-11",
    weekdayLabel: "Dienstag",
    time: "19:30 – 20:30",
    location: "Zoom",
    speaker: "Prof. Dr. Torsten Passie",
    speakerType: "gast",
    speakerWebsiteUrl: "http://psychedelic-science.org/",
    description:
      "Ein nüchterner Blick auf Wirksamkeit, Methodikkritik und die Grenzen der aktuellen Psychedelika-Forschung.",
    speakerBio:
      "Torsten Passie ist apl. Professor für Psychiatrie und Psychotherapie an der Medizinischen Hochschule Hannover und Visiting Scientist an der Goethe-Universität Frankfurt am Main. Er forscht seit mehr als 35 Jahren zu Psychedelika und gilt international als anerkannter Experte für die Pharmakologie und therapeutische Anwendung halluzinogener und entaktogener Substanzen.",
    registrationUrl: "https://luma.com/jtglh7ct",
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
    column: "community",
    highlightBadge: "Erstes eigenes In-Person-Event, PSNG x BPSA",
    date: "2026-08-08",
    weekdayLabel: "Samstag",
    time: "16:00 bis 20:00 Uhr (Einlass ab 15:30)",
    location: "Molecule Office @ König Galerie, Alexandrinenstraße 118–121, 10969 Berlin",
    contribution: "5 bis 10 € empfohlen, freiwillig, niemand wird abgewiesen",
    registrationUrl: "https://luma.com/n6io5052",
    description:
      "Unser erstes eigenes In-Person-Treffen, gemeinsam mit der Berlin Psychedelic Science Association (BPSA), zu Gast im Molecule Office. Ein Abend zum Ankommen, Kennenlernen und Austauschen: mit einem Vortrag von Dr. Prateep Beed zu den prosozialen Effekten von Psychedelika, einem interaktiven Workshop von Eric Lonergan (PhD cand.) und Jennifer Them (PhD cand.), einem Impuls-Talk von Stela Malvasija, M.Sc. zur Integration und einer Klangmeditation mit Journalling, geleitet von Lucie André (Beyond Yoga) und Daniel Burckhardt (HRL). Durch den Abend führte Lennert van de Kreeke. Dazu ein mit viel Liebe selbstgemachtes veganes Fingerfood-Buffet und ein Büchertisch vom Nachtschatten Verlag mit psychedelischer Literatur zum Stöbern. Danach gemeinsames Abendessen auswärts für alle, die mochten. Danke an alle, die dabei waren!",
    audienceNote: "Für Studierende und alle Interessierten, Vorwissen braucht ihr keins.",
    featuredLarge: true,
    assets: {
      partnerLogo: psngBpsaLogo,
      partnerLogoAlt: "PSNG × BPSA",
      rating: "9/10",
      recommendPercent: 83,
      attendees: 30,
      // Reihenfolge kuratiert: stärkstes Foto zuerst (Weitwinkel-Abschlusskreis),
      // dann Team, Sprecherin, Talk, Abschlusskreis, Gong, Garten, Banner,
      // danach chronologisch durch den Abend. DSLR-Fotos (18–30) ersetzen die
      // schwächeren Handy-Aufnahmen derselben Momente.
      photos: [
        abendPhoto31,
        abendPhoto09,
        abendPhoto29,
        abendPhoto32,
        abendPhoto04,
        abendPhoto17,
        abendPhoto11,
        abendPhoto16,
        abendPhoto10,
        abendPhoto01,
        abendPhoto18,
        abendPhoto19,
        abendPhoto20,
        abendPhoto27,
        abendPhoto06,
        abendPhoto21,
        abendPhoto22,
        abendPhoto23,
        abendPhoto24,
        abendPhoto33,
        abendPhoto07,
        abendPhoto26,
        abendPhoto25,
        abendPhoto28,
        abendPhoto12,
        abendPhoto30,
        abendPhoto15,
      ],
      photoAlts: [
        "Weitwinkelblick von der Empore auf den vollen Raum im Abschlusskreis",
        "Gruppenfoto auf der Bühne",
        "Sprecherin am Mikrofon zur Klangmeditation",
        "Folie 'Prosocial Effects' während des Vortrags von Prateep Beed",
        "Sprecher mit Klangschale während des Vortrags",
        "Abschlusskreis im Innenraum",
        "Loungebereich mit Gong für die Klangmeditation",
        "Gruppe im Garten nach der Veranstaltung",
        "Banner der Community am Eingang",
        "Leuchtschild von Molecule am Eingang des Veranstaltungsorts",
        "Vorbereiteter Raum mit Sitzkissen für den Workshop",
        "Folie mit Vergleich potenzieller Risiken verschiedener Substanzen",
        "Publikum aufmerksam beim Vortrag",
        "Publikum vor der Folie zu Psilocybin",
        "Teilnehmende im Gespräch beim Empfang",
        "Teilnehmende im lebhaften Gespräch",
        "Teilnehmende beim Get-together",
        "Teilnehmerin im Gespräch",
        "Teilnehmerinnen im herzlichen Gespräch",
        "Reich gedeckter Fingerfood-Tisch im Garten",
        "Veganes Fingerfood für den Abend",
        "Büchertisch mit psychedelischer Literatur",
        "Teilnehmerin im Garten des Veranstaltungsorts",
        "Teilnehmende beim Austausch im Garten",
        "Teilnehmende im Stehkreis zur Klangmeditation",
        "Teilnehmende im Workshop auf dem Boden",
        "Teilnehmer im Gespräch",
      ],
      // TODO: Aftermovie einbinden, sobald der Schnitt fertig ist – als
      // unlisted YouTube-Video (16:9) hochladen und hier ergänzen:
      // youtubeUrl: "https://www.youtube.com/watch?v=XXXXXXXXXXX",
      // youtubeThumbnail: <lokal importiertes Standbild aus dem Video, siehe
      //   Kommentar bei EventAssets.youtubeThumbnail für den Datenschutzgrund>,
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

/** Ob ein Event mehr als nur Titel/Datum trägt (Beschreibung, Speaker oder Anmeldelink). */
export function hasContent(e: PsngEvent): boolean {
  return Boolean(e.description || e.speaker || e.registrationUrl);
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

/**
 * Vergangene Events ohne Material (kein Video/Foto/Link), aber mit echtem
 * Inhalt (Beschreibung, Speaker o. Ä.) – z. B. eine gehaltene Lecture, für
 * die noch keine Aufzeichnung vorliegt. Reine Platzhalter-Termine ohne
 * Inhalt bleiben unsichtbar, statt als leere Karten aufzutauchen.
 */
export function getPastPlainEvents(referenceDate: Date = new Date()): PsngEvent[] {
  const t = startOfDay(referenceDate);
  return events
    .filter((e) => parseEventDate(e.date).getTime() < t && !hasAssets(e) && hasContent(e))
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
