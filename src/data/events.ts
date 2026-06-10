export interface PsngEvent {
  /** ISO date (YYYY-MM-DD), used for sorting and filtering past events */
  date: string;
  time: string;
  title: string;
  location: string;
  tag: string;
}

/**
 * Add new events here as they're scheduled. Past events (date before today)
 * are filtered out automatically by EventsSection, so this list only needs
 * to grow - no manual cleanup required.
 */
export const events: PsngEvent[] = [
  {
    date: "2026-03-17",
    time: "18:00 – 19:00",
    title: "1. PSNG Community Call",
    location: "Zoom",
    tag: "Community",
  },
  {
    date: "2026-04-07",
    time: "17:00 – 18:00",
    title: "1. PSNG Lecture",
    location: "Zoom",
    tag: "Lecture",
  },
  {
    date: "2026-04-21",
    time: "17:00 – 18:00",
    title: "2. PSNG Community Call",
    location: "Zoom",
    tag: "Community",
  },
  {
    date: "2026-05-05",
    time: "17:00 – 18:00",
    title: "2. PSNG Lecture",
    location: "Zoom",
    tag: "Lecture",
  },
  {
    date: "2026-05-19",
    time: "17:00 – 18:00",
    title: "3. PSNG Community Call",
    location: "Zoom",
    tag: "Community",
  },
  {
    date: "2026-06-02",
    time: "17:00 – 18:00",
    title: "3. PSNG Lecture",
    location: "Zoom",
    tag: "Lecture",
  },
];

const dateFormatter = new Intl.DateTimeFormat("de-DE", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const formatEventDate = (isoDate: string) =>
  dateFormatter.format(new Date(`${isoDate}T00:00:00`));

export const getUpcomingEvents = (referenceDate: Date = new Date()) => {
  const todayIso = referenceDate.toISOString().slice(0, 10);
  return events
    .filter((event) => event.date >= todayIso)
    .sort((a, b) => a.date.localeCompare(b.date));
};
