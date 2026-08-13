import { describe, it, expect } from "vitest";
import {
  formatEventDate,
  getEventAnchor,
  getHighlightEvents,
  getNextBannerEvent,
  getPastPlainEvents,
  getUpcomingEvents,
  hasContent,
  events,
} from "./events";

describe("formatEventDate", () => {
  it("renders the calendar date, not a timezone-shifted one", () => {
    // `new Date("2026-07-28")` ist UTC-Mitternacht; westlich von UTC in
    // Lokalzeit formatiert ergäbe das den 27. Juli.
    expect(formatEventDate("2026-07-28")).toBe("28. Juli 2026");
    expect(formatEventDate("2026-01-01")).toBe("01. Januar 2026");
    expect(formatEventDate("2026-12-31")).toBe("31. Dezember 2026");
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

describe("getNextBannerEvent", () => {
  it("picks the soonest upcoming event that has a registration link", () => {
    const ev = getNextBannerEvent(new Date(2026, 6, 28));
    expect(ev?.id).toBe("gathering-2026-08-08");
  });

  it("disappears once every registrable event has passed", () => {
    expect(getNextBannerEvent(new Date(2027, 0, 1))).toBeUndefined();
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
