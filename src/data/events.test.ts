import { describe, it, expect } from "vitest";
import {
  formatEventDate,
  formatRelativeToToday,
  getEventAnchor,
  getHighlightEvents,
  getPastPlainEvents,
  getTimelineEntries,
  getUpcomingEvents,
  getUpcomingSeriesDates,
  hasContent,
  events,
  SERIES_OVERRIDES,
} from "./events";

describe("formatEventDate", () => {
  it("renders the calendar date, not a timezone-shifted one", () => {
    // `new Date("2026-07-28")` ist UTC-Mitternacht; westlich von UTC in
    // Lokalzeit formatiert ergäbe das den 27. Juli.
    expect(formatEventDate("2026-07-28", "de")).toBe("28. Juli 2026");
    expect(formatEventDate("2026-01-01", "de")).toBe("01. Januar 2026");
    expect(formatEventDate("2026-12-31", "de")).toBe("31. Dezember 2026");
  });
});

describe("getUpcomingEvents", () => {
  const ref = new Date(2026, 7, 11); // 11. August 2026, lokal

  it("includes an event happening today", () => {
    const ids = getUpcomingEvents(ref).map((e) => e.id);
    expect(ids).toContain("lecture-5"); // 2026-08-11
  });

  it("excludes events that are already over", () => {
    const ids = getUpcomingEvents(ref).map((e) => e.id);
    expect(ids).not.toContain("kickoff-2026-03-03");
  });

  it("returns events in chronological order", () => {
    const dates = getUpcomingEvents(ref).map((e) => e.date);
    expect(dates).toEqual([...dates].sort());
  });

  it("honours the reference date it is given", () => {
    const later = getUpcomingEvents(new Date(2026, 8, 1)); // 1. September
    expect(later.map((e) => e.id)).not.toContain("lecture-5");
  });
});

describe("getHighlightEvents", () => {
  const ref = new Date(2026, 6, 28);

  it("lists past events newest first", () => {
    const dates = getHighlightEvents(ref).map((e) => e.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("only includes past events that have material to show", () => {
    for (const e of getHighlightEvents(ref)) {
      expect(e.date < "2026-07-28").toBe(true);
      expect(Boolean(e.assets)).toBe(true);
    }
  });
});

describe("getPastPlainEvents", () => {
  const ref = new Date(2026, 7, 13); // 13. August 2026

  it("includes past events with real content but no material yet", () => {
    // Torsten Passies Lecture (11.8.) hat noch keine Aufzeichnung.
    expect(getPastPlainEvents(ref).map((e) => e.id)).toContain("lecture-5");
  });

  it("excludes empty placeholder lectures", () => {
    expect(getPastPlainEvents(ref).map((e) => e.id)).not.toContain("lecture-1");
  });

  it("never overlaps with getHighlightEvents", () => {
    const plainIds = new Set(getPastPlainEvents(ref).map((e) => e.id));
    const highlightIds = new Set(getHighlightEvents(ref).map((e) => e.id));
    for (const id of plainIds) {
      expect(highlightIds.has(id)).toBe(false);
    }
  });
});

describe("hasContent", () => {
  it("is true for events with a description, speaker, or registration link", () => {
    expect(hasContent(events.find((e) => e.id === "lecture-5")!)).toBe(true);
  });

  it("is false for bare placeholder lectures", () => {
    expect(hasContent(events.find((e) => e.id === "lecture-1")!)).toBe(false);
  });
});

describe("gathering-2026-08-08", () => {
  it("carries a full photo gallery, with alt text for every photo", () => {
    const ev = events.find((e) => e.id === "gathering-2026-08-08")!;
    expect(ev.featuredLarge).toBe(true);
    expect(ev.assets?.photos?.length).toBeGreaterThan(0);
    expect(ev.assets?.photoAlts?.length).toBe(ev.assets?.photos?.length);
  });
});

describe("getEventAnchor", () => {
  it("derives a unique anchor for every event", () => {
    const anchors = events.map(getEventAnchor);
    expect(new Set(anchors).size).toBe(events.length);
  });

  it("uses the prefix the events section keys its tab on", () => {
    expect(getEventAnchor(events[0])).toMatch(/^event-/);
  });
});

describe("getUpcomingSeriesDates", () => {
  const ref = new Date(2026, 8, 1); // 1. September 2026

  it("computes the first Tuesday of each month", () => {
    // Der 20.10. statt des 6.10. ist der Semesterauftakt aus SERIES_OVERRIDES.
    expect(getUpcomingSeriesDates(3, ref).map((s) => s.date)).toEqual([
      "2026-09-01",
      "2026-10-20",
      "2026-11-03",
    ]);
  });

  it("lets an override replace its month's date instead of adding to it", () => {
    const dates = getUpcomingSeriesDates(6, ref).map((s) => s.date);
    for (const { date } of SERIES_OVERRIDES) {
      expect(dates).toContain(date);
      // Der berechnete Termin desselben Monats darf nicht daneben stehen.
      expect(dates.filter((d) => d.startsWith(date.slice(0, 7)))).toEqual([date]);
    }
  });

  it("carries the override's own label", () => {
    const semesterStart = getUpcomingSeriesDates(3, ref).find(
      (s) => s.date === "2026-10-20",
    );
    expect(semesterStart?.labelKey).toBe("semesterStart");
  });

  it("skips dates that already carry a real event", () => {
    // Der 8.9. wäre ein Reihentermin – dort steht aber schon lecture-6 mit
    // Thema und Speaker. Der Termin darf nicht doppelt im Zeitstrahl landen.
    expect(getUpcomingSeriesDates(3, ref).map((s) => s.date)).not.toContain(
      "2026-09-08",
    );
    expect(events.some((e) => e.date === "2026-09-08")).toBe(true);
  });

  it("never looks backwards", () => {
    // Mitten im Monat, nachdem der Oktobertermin durch ist.
    for (const s of getUpcomingSeriesDates(3, new Date(2026, 9, 21))) {
      expect(s.date > "2026-10-21").toBe(true);
    }
  });

  it("still lists a date that falls on the reference day", () => {
    // Eine Lecture heute Abend ist kein vergangener Termin.
    expect(getUpcomingSeriesDates(1, new Date(2026, 9, 20))[0]?.date).toBe(
      "2026-10-20",
    );
  });
});

describe("getTimelineEntries", () => {
  const ref = new Date(2026, 8, 1); // 1. September 2026

  it("orders the whole strand descending – furthest future on top", () => {
    const { upcoming, past } = getTimelineEntries(ref);
    const dates = [...upcoming, ...past].map((e) => e.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("fills the upcoming half even when only one event is scheduled", () => {
    const { upcoming } = getTimelineEntries(ref);
    expect(upcoming.filter((e) => e.kind === "event")).toHaveLength(1);
    expect(upcoming.filter((e) => e.kind === "series").length).toBeGreaterThan(0);
  });

  it("counts a milestone dated today as already past", () => {
    // Anders als ein Termin, der heute erst noch stattfindet.
    const { past } = getTimelineEntries(ref);
    expect(past.map((e) => e.id)).toContain("milestone-medien-blog-2026-09-01");
  });

  it("leaves empty placeholder lectures out entirely", () => {
    const { upcoming, past } = getTimelineEntries(ref);
    const ids = [...upcoming, ...past].map((e) => e.id);
    expect(ids).not.toContain(getEventAnchor(events.find((e) => e.id === "lecture-1")!));
  });

  it("gives every entry the column the filter matches on", () => {
    const { upcoming, past } = getTimelineEntries(ref);
    for (const entry of [...upcoming, ...past]) {
      expect(["vortraege", "community"]).toContain(entry.column);
    }
  });

  it("renders the gathering as the large feature card", () => {
    const entry = getTimelineEntries(ref).past.find(
      (e) => e.id === "event-gathering-2026-08-08",
    );
    expect(entry?.kind === "event" && entry.variant).toBe("feature");
  });
});

describe("formatRelativeToToday", () => {
  const ref = new Date(2026, 8, 1);

  it("names near dates in days and distant ones in weeks", () => {
    expect(formatRelativeToToday("2026-09-01", "de", ref)).toBe("heute");
    expect(formatRelativeToToday("2026-09-02", "de", ref)).toBe("morgen");
    expect(formatRelativeToToday("2026-09-08", "de", ref)).toBe("in 7 Tagen");
    expect(formatRelativeToToday("2026-10-13", "de", ref)).toBe("in 6 Wochen");
    expect(formatRelativeToToday("2026-12-08", "de", ref)).toBe("in 3 Monaten");
  });
});
