import { BPSA_LINK, WHATSAPP_LINK } from "@/lib/links";
import trypPhoto1 from "@/assets/tryp-1.webp";
import icprPhoto from "@/assets/icpr-1.webp";
import psngBpsaLogo from "@/assets/PSNG-BPSA-Logo.webp";
import torstenPassiePhoto from "@/assets/Torsten-Passie.webp";
import miguelMoraVeraPhoto from "@/assets/Miguel-Mora-Vera.webp";
import medienBlogThumb from "@/assets/Medien-Blog.webp";
import ytKickoff from "@/assets/yt-fH9gMcj65l4.webp";
import ytLonergan from "@/assets/yt-LftC0jVmxuI.webp";
import ytShortGathering from "@/assets/yt-T5r5fJ9OOm0.webp";
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

/**
 * Dieselbe Achse, aber im Singular. Der Filter darüber fasst mehrere Einträge
 * zusammen ("Vorträge"), eine einzelne Karte ist genau einer ("Vortrag").
 */
export const eventColumnCardLabels: Record<EventColumn, string> = {
  vortraege: "Vortrag",
  community: "Community",
};

export type SpeakerType = "student" | "gast";

/** Badge innerhalb der Vorträge-Spalte, rein beschreibend, ohne Rangfolge. */
export const speakerTypeLabels: Record<SpeakerType, string> = {
  student: "Studentisch",
  gast: "Expertenvortrag",
};

/**
 * Ein Eintrag im Zeitstrahl, der kein Termin ist – ein Launch, ein Projektstart.
 * Bewusst ein eigener Typ statt eines Events ohne Uhrzeit und Ort: Ein Event,
 * bei dem die Hälfte der Pflichtfelder nicht zutrifft, lädt zu leeren Karten ein.
 */
export interface PsngMilestone {
  id: string;
  date: string;
  title: string;
  description: string;
  /** Gleiche Achse wie bei Events, damit der Filter auch Meilensteine erfasst. */
  column: EventColumn;
  /** Kurzes Label auf dem Verlaufs-Chip, z. B. "Launch". */
  badge?: string;
  /** Vorschaubild, 16:9, lokal im Repo – z. B. ein Screengrab des Launches. */
  image?: string;
  links?: { label: string; url: string }[];
}

/**
 * Die Lecture-Reihe hat einen festen Takt: jeder 2. Dienstag im Monat. Die
 * Termine stehen damit fest, lange bevor Thema und Speaker feststehen –
 * deshalb werden sie berechnet statt gepflegt. Als leere Platzhalter-Events in
 * `events` waren sie zweimal unbrauchbar: Sie verschwanden beim Verstreichen
 * wieder, und die Liste endete irgendwann dort, wo jemand aufgehört hat, sie
 * zu pflegen. Berechnet reißt der Takt nie ab.
 */
export const LECTURE_SERIES = {
  /** Wochentag nach `Date#getDay`: 2 = Dienstag. */
  weekday: 2,
  /** Der wievielte dieses Wochentags im Monat. */
  ordinal: 2,
  time: "19:00 – 20:00",
  location: "Zoom",
  column: "vortraege" as EventColumn,
  label: "PSNG Lecture",
  note: "Termin steht. Thema und Speaker geben wir rechtzeitig bekannt.",
};

/** Ein berechneter Termin der Reihe – kein Event, solange kein Thema feststeht. */
export interface SeriesDate {
  id: string;
  date: string;
  time: string;
  location: string;
  column: EventColumn;
  label: string;
}

export interface EventAssets {
  youtubeUrl?: string;
  shortsUrl?: string;
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
  /** Dasselbe für `shortsUrl`. Hochkant (9:16), sonst füllt es den Rahmen nicht. */
  shortsThumbnail?: string;
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
  /**
   * Chip in der Farbwelt einer Partnerorganisation, optional verlinkt. Der
   * Verlaufs-Chip gehört zur PSNG-Marke; eine Lecture, die die BPSA hält,
   * soll sich davon absetzen, statt darin unterzugehen. Die Gestaltung
   * (`badge-bpsa` in index.css) ist derzeit auf die BPSA gemünzt.
   */
  partnerBadge?: { label: string; url?: string };
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
    title: "Logos und Ekstase. Zur Genealogie eines akademischen Tabus",
    subtitle:
      "Was hat die Geschichte des Denkens mit psychedelischer Erfahrung zu tun?",
    category: "lecture",
    column: "vortraege",
    partnerBadge: { label: "BPSA", url: BPSA_LINK },
    date: "2026-09-08",
    weekdayLabel: "Dienstag",
    time: "19:00 – 20:00",
    location: "Zoom",
    speaker: "Miguel Estéfano Mora Vera",
    speakerType: "student",
    description:
      "Ein interdisziplinärer Vortrag über Philosophie, Religion, Geschichte und die Frage, was überhaupt als legitime Form von Erkenntnis gilt.",
    speakerBio:
      "Philosoph, Musiker und Komponist. Er promoviert an der Universität Freiburg und lebt in Berlin.",
    audienceNote: "Auf Deutsch. Kostenlos und offen für alle.",
    // Kleingedrucktes am Kartenende: wer einlädt, und der Hinweis auf die
    // Aufzeichnung – den sollten Teilnehmende vor dem Beitreten lesen können.
    disclaimer:
      "Eine Lecture der Berlin Psychedelic Science Association (BPSA), gestreamt über das PSNG-Netzwerk. Der Vortrag wird aufgezeichnet und später auf YouTube veröffentlicht.",
    // Keine Anmeldung: Der Zoom-Link wird kurz vorher in der WhatsApp-Gruppe
    // und auf Instagram geteilt. Der Button führt deshalb in die Community,
    // nicht auf ein Anmeldeformular.
    registrationUrl: WHATSAPP_LINK,
    registrationLabel: "Zoom-Link via WhatsApp",
    assets: {
      speakerLinkedinUrl: "https://www.linkedin.com/in/miguel-estefano-mora-vera/",
      speakerPhoto: miguelMoraVeraPhoto,
      // Nach dem Talk ergänzen, siehe Kommentar bei EventAssets.youtubeThumbnail:
      // youtubeUrl: "https://www.youtube.com/watch?v=XXXXXXXXXXX",
      // youtubeThumbnail: <lokal importiertes Standbild aus dem Video>,
    },
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
      recommendPercent: 81,
      attendees: 30,
      shortsUrl: "https://youtube.com/shorts/T5r5fJ9OOm0?feature=share",
      shortsThumbnail: ytShortGathering,
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

export const milestones: PsngMilestone[] = [
  {
    id: "milestone-medien-blog-2026-09-01",
    date: "2026-09-01",
    title: "Medien-Blog ist online",
    column: "community",
    badge: "Launch",
    image: medienBlogThumb,
    description:
      "Unser gemeinsames Projekt mit PARAB: Beiträge rund um psychedelische Wissenschaft zum Lesen, Hören und Sehen. Dort liegen auch alle Aufnahmen unserer Lectures gesammelt.",
    links: [
      { label: "medien.psng.info", url: "https://medien.psng.info" },
      { label: "parab.ch", url: "https://parab.ch" },
    ],
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
    a.youtubeUrl || a.shortsUrl || a.slidesUrl || a.recapUrl || a.attendees || a.photos?.length || a.externalUrl,
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

export function formatEventDateShort(iso: string): string {
  return parseEventDate(iso).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Abstand zu heute, nur für kommende Termine. Macht „liegt noch weit weg"
 * lesbar statt bloß sichtbar – verlässlicher als jede Abstufung über Farbe
 * oder Transparenz, die im Zweifel nur wie ein Rendering-Fehler aussieht.
 */
export function formatRelativeToToday(
  iso: string,
  referenceDate: Date = new Date(),
): string {
  const dayMs = 24 * 60 * 60 * 1000;
  const days = Math.round(
    (startOfDay(parseEventDate(iso)) - startOfDay(referenceDate)) / dayMs,
  );
  if (days <= 0) return "heute";
  if (days === 1) return "morgen";
  if (days < 14) return `in ${days} Tagen`;
  const weeks = Math.round(days / 7);
  if (weeks < 9) return `in ${weeks} Wochen`;
  return `in ${Math.round(days / 30.44)} Monaten`;
}

/** Datum des n-ten `weekday` eines Monats. `month` ist 0-basiert wie bei `Date`. */
function nthWeekdayOfMonth(
  year: number,
  month: number,
  weekday: number,
  ordinal: number,
): Date {
  const first = new Date(year, month, 1);
  const offset = (weekday - first.getDay() + 7) % 7;
  return new Date(year, month, 1 + offset + (ordinal - 1) * 7);
}

function toIsoDate(d: Date): string {
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

/**
 * Die nächsten Termine der Lecture-Reihe, aufsteigend. Termine, für die schon
 * ein echtes Event in `events` steht, fallen raus – sonst stünde derselbe
 * Dienstag zweimal im Zeitstrahl, einmal mit Thema und einmal ohne.
 */
export function getUpcomingSeriesDates(
  count = 3,
  referenceDate: Date = new Date(),
): SeriesDate[] {
  const today = startOfDay(referenceDate);
  const booked = new Set(events.map((e) => e.date));
  const out: SeriesDate[] = [];

  // Der Deckel begrenzt die Suche auf ein Jahr im Voraus: Wären alle Termine
  // belegt, liefe die Schleife sonst endlos.
  for (let i = 0; out.length < count && i < count + 12; i++) {
    const d = nthWeekdayOfMonth(
      referenceDate.getFullYear(),
      referenceDate.getMonth() + i,
      LECTURE_SERIES.weekday,
      LECTURE_SERIES.ordinal,
    );
    const iso = toIsoDate(d);
    if (startOfDay(d) < today || booked.has(iso)) continue;
    out.push({
      id: `series-${iso}`,
      date: iso,
      time: LECTURE_SERIES.time,
      location: LECTURE_SERIES.location,
      column: LECTURE_SERIES.column,
      label: LECTURE_SERIES.label,
    });
  }
  return out;
}

/** Wie eine vergangene Veranstaltung im Zeitstrahl gerendert wird. */
export type EventVariant = "feature" | "highlight" | "plain";

export type TimelineEntry =
  | {
      kind: "event";
      id: string;
      date: string;
      column: EventColumn;
      variant: EventVariant;
      event: PsngEvent;
    }
  | { kind: "series"; id: string; date: string; column: EventColumn; series: SeriesDate }
  | {
      kind: "milestone";
      id: string;
      date: string;
      column: EventColumn;
      milestone: PsngMilestone;
    };

function toEventEntry(event: PsngEvent): TimelineEntry {
  return {
    kind: "event",
    id: getEventAnchor(event),
    date: event.date,
    column: event.column,
    variant: event.featuredLarge ? "feature" : hasAssets(event) ? "highlight" : "plain",
    event,
  };
}

/**
 * Der Zeitstrahl in zwei Hälften, beide absteigend sortiert. Aneinandergehängt
 * ergeben sie einen durchgehend chronologischen Strang: der am weitesten
 * entfernte Termin oben, direkt darunter der nächste, dann heute, dann rückwärts
 * durch alles Gewesene.
 */
export function getTimelineEntries(referenceDate: Date = new Date()): {
  upcoming: TimelineEntry[];
  past: TimelineEntry[];
} {
  const today = startOfDay(referenceDate);
  const byDateDesc = (a: TimelineEntry, b: TimelineEntry) => b.date.localeCompare(a.date);

  const upcoming: TimelineEntry[] = [
    ...getUpcomingEvents(referenceDate).map(toEventEntry),
    ...getUpcomingSeriesDates(3, referenceDate).map(
      (series): TimelineEntry => ({
        kind: "series",
        id: series.id,
        date: series.date,
        column: series.column,
        series,
      }),
    ),
  ].sort(byDateDesc);

  const past: TimelineEntry[] = [
    ...getHighlightEvents(referenceDate).map(toEventEntry),
    ...getPastPlainEvents(referenceDate).map(toEventEntry),
    // Ein Meilenstein von heute ist bereits passiert – anders als ein Termin,
    // der heute erst noch stattfindet.
    ...milestones
      .filter((m) => startOfDay(parseEventDate(m.date)) <= today)
      .map((milestone): TimelineEntry => ({
        kind: "milestone",
        id: milestone.id,
        date: milestone.date,
        column: milestone.column,
        milestone,
      })),
  ].sort(byDateDesc);

  return { upcoming, past };
}
