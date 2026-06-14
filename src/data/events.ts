export type EventCategory =
  | "kickoff"
  | "lecture"
  | "community-call"
  | "gathering"
  | "workshop"
  | "other";

export const eventCategoryLabels: Record<EventCategory, string> = {
  kickoff: "Kick-off",
  lecture: "Lecture",
  "community-call": "Community Call",
  gathering: "Gathering",
  workshop: "Workshop",
  other: "Event",
};

export interface EventAssets {
  youtubeUrl?: string;
  slidesUrl?: string;
  photos?: string[];
  attendees?: number;
  recapUrl?: string;
}

export interface PsngEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  time: string;
  endDate?: string;
  location?: string;
  speaker?: string;
  /** hebt das Event in den Aufnahmen hervor (z. B. der Kick-off) */
  featured?: boolean;
  description?: string;
  registrationUrl?: string;
  assets?: EventAssets;
}

export const events: PsngEvent[] = [
  {
    id: "kickoff-2026-03-03",
    title: "Kick-off: Was macht das PSNG?",
    category: "kickoff",
    date: "2026-03-03",
    time: "18:00 – 19:00",
    speaker: "PSNG-Team",
    featured: true,
    description:
      "Unser allererstes Event – und ein besonderer Moment. Beim Kick-off hat sich das PSNG erstmals vorgestellt: wer wir sind, was unsere Mission ist und wie du aktiv werden, einer Lokalgruppe beitreten oder deine eigene gründen kannst. Danke an alle, die dabei waren!",
    assets: {
      youtubeUrl: "https://www.youtube.com/watch?v=fH9gMcj65l4",
      slidesUrl: "https://www.canva.com/design/DAHBkDM0-8o/t39605od4UYhUdlL0MnidQ/view",
    },
  },
  {
    id: "lecture-lonergan-2026-06",
    title: "Introduction to Psychedelic Neuroscience",
    category: "lecture",
    date: "2026-06-09",
    time: "18:00 – 19:00",
    speaker: "Eric Lonergan, PhD cand.",
    description:
      "Ein breiter Überblick: Was Psychedelika sind und wie sie im Gehirn wirken – wie sie Wahrnehmung verändern und psychische Erkrankungen behandeln können. Eric forscht am Decision Circuits Lab (Einstein Center for Neurosciences Berlin) zu den neuronalen und serotonergen Mechanismen von Halluzinationen.",
    assets: {
      youtubeUrl: "https://www.youtube.com/watch?v=LftC0jVmxuI",
    },
  },
  {
    id: "community-call-1",
    title: "1. PSNG Community Call",
    category: "community-call",
    date: "2026-03-17",
    time: "18:00 – 19:00",
    location: "Zoom",
  },
  {
    id: "lecture-1",
    title: "1. PSNG Lecture",
    category: "lecture",
    date: "2026-04-07",
    time: "17:00 – 18:00",
    location: "Zoom",
  },
  {
    id: "community-call-2",
    title: "2. PSNG Community Call",
    category: "community-call",
    date: "2026-04-21",
    time: "17:00 – 18:00",
    location: "Zoom",
  },
  {
    id: "lecture-2",
    title: "2. PSNG Lecture",
    category: "lecture",
    date: "2026-05-05",
    time: "17:00 – 18:00",
    location: "Zoom",
  },
  {
    id: "community-call-3",
    title: "3. PSNG Community Call",
    category: "community-call",
    date: "2026-05-19",
    time: "17:00 – 18:00",
    location: "Zoom",
  },
  {
    id: "lecture-3",
    title: "3. PSNG Lecture",
    category: "lecture",
    date: "2026-06-02",
    time: "17:00 – 18:00",
    location: "Zoom",
  },
  {
    id: "lecture-4",
    title: "4. PSNG Lecture",
    category: "lecture",
    date: "2026-06-23",
    time: "19:00 – 20:00",
    location: "Zoom",
  },
  {
    id: "lecture-5",
    title: "5. PSNG Lecture",
    category: "lecture",
    date: "2026-07-14",
    time: "19:00 – 20:00",
    location: "Zoom",
  },
  {
    id: "community-call-5",
    title: "5. PSNG Community Call",
    category: "community-call",
    date: "2026-07-28",
    time: "19:00 – 20:00",
    location: "Zoom",
  },
  {
    id: "gathering-2026-08-08",
    title: "PSNGathering in der Galerie König",
    category: "gathering",
    date: "2026-08-08",
    time: "18:00 – 22:00",
    location: "Galerie König, Berlin",
    description:
      "Unser Sommer-Event vor Ort mit Kurzvorträgen, Networking und Austausch über psychedelische Forschung und lokale Initiativen.",
  },
  {
    id: "lecture-6",
    title: "6. PSNG Lecture",
    category: "lecture",
    date: "2026-08-11",
    time: "19:00 – 20:00",
    location: "Zoom",
  },
  {
    id: "community-call-6",
    title: "6. PSNG Community Call",
    category: "community-call",
    date: "2026-08-25",
    time: "19:00 – 20:00",
    location: "Zoom",
  },
  {
    id: "lecture-7",
    title: "7. PSNG Lecture",
    category: "lecture",
    date: "2026-09-08",
    time: "19:00 – 20:00",
    location: "Zoom",
  },
];

function startOfToday(): number {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export function hasAssets(e: PsngEvent): boolean {
  const a = e.assets;
  if (!a) return false;
  return Boolean(
    a.youtubeUrl || a.slidesUrl || a.recapUrl || a.attendees || a.photos?.length,
  );
}

export function getUpcomingEvents(referenceDate: Date = new Date()): PsngEvent[] {
  const t = startOfToday();
  return events
    .filter((e) => new Date(e.date).getTime() >= t)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getHighlightEvents(): PsngEvent[] {
  const t = startOfToday();
  return events
    .filter((e) => new Date(e.date).getTime() < t && hasAssets(e))
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.date.localeCompare(a.date);
    });
}

export function formatEventDate(iso: string): string {
  return new Date(iso).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
