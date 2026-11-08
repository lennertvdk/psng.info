import { describe, expect, it } from "vitest";
import { buildCalendarFeed } from "./calendarFeed";
import { testEvents, withChanges } from "./testData";
import type { SiteEvent } from "./types";

const now = new Date("2026-11-08T12:00:00Z");
const base = testEvents.find((e) => e.role !== "external")!;

const make = (slug: string, changes: Partial<SiteEvent>): SiteEvent => ({
  ...withChanges(base.slug, {
    endDate: undefined,
    endTime: undefined,
    timeTbd: undefined,
    status: "scheduled",
    ...changes,
  }),
  slug,
});

const unfold = (ics: string) => ics.replace(/\r\n /g, "");
const vevents = (ics: string) => unfold(ics).split("BEGIN:VEVENT").slice(1);

describe("buildCalendarFeed", () => {
  it("ist ein abonnierbarer Kalender", () => {
    const ics = buildCalendarFeed(testEvents, now);
    expect(ics.startsWith("BEGIN:VCALENDAR\r\n")).toBe(true);
    expect(ics.endsWith("END:VCALENDAR\r\n")).toBe(true);
    expect(ics).toContain("X-WR-CALNAME:");
    expect(ics).toContain("X-WR-TIMEZONE:Europe/Berlin");
    expect(ics).toContain("REFRESH-INTERVAL;VALUE=DURATION:P1D");
    expect(ics).toContain("X-PUBLISHED-TTL:P1D");
    expect(ics).not.toMatch(/[^\r]\n/);
  });

  it("rechnet Sommer- und Winterzeit richtig nach UTC", () => {
    const ics = unfold(
      buildCalendarFeed(
        [
          make("sommer", { date: "2026-07-14", startTime: "19:00", endTime: "20:00" }),
          make("winter", { date: "2026-12-03", startTime: "19:00", endTime: "20:00" }),
        ],
        now,
      ),
    );
    expect(ics).toContain("DTSTART:20260714T170000Z");
    expect(ics).toContain("DTSTART:20261203T180000Z");
  });

  it("maskiert Komma, Semikolon und Zeilenumbruch", () => {
    const ics = buildCalendarFeed(
      [make("sonder", { title: "A, B; C", description: "Zeile 1\nZeile 2", location: "Raum 1, Haus; 2" })],
      now,
    );
    const text = unfold(ics);
    expect(text).toContain("SUMMARY:A\\, B\\; C");
    expect(text).toContain("DESCRIPTION:Zeile 1\\nZeile 2");
    expect(text).toContain("LOCATION:Raum 1\\, Haus\\; 2");
  });

  it("faltet Zeilen auf höchstens 75 Oktette", () => {
    const ics = buildCalendarFeed([make("lang", { title: "Ö".repeat(120) })], now);
    for (const line of ics.split("\r\n")) expect(new TextEncoder().encode(line).length).toBeLessThanOrEqual(75);
  });

  it("vergibt stabile UIDs je Slug, unabhängig vom Zeitpunkt", () => {
    const events = [make("stabil-eins", {}), make("stabil-zwei", { date: "2027-01-01", startTime: "10:00" })];
    const uids = (ics: string) => unfold(ics).match(/^UID:.*$/gm);
    const a = uids(buildCalendarFeed(events, now));
    const b = uids(buildCalendarFeed(events, new Date("2027-05-05T05:05:05Z")));
    expect(a).toEqual(["UID:stabil-eins@psng.info", "UID:stabil-zwei@psng.info"]);
    expect(b).toEqual(a);
  });

  it("lässt Termine ohne feste Uhrzeit, abgesagte und verschobene weg", () => {
    const ics = buildCalendarFeed(
      [
        make("ok", {}),
        make("tbd", { timeTbd: true, startTime: undefined }),
        make("abgesagt", { status: "cancelled" }),
        make("verschoben", { status: "postponed" }),
        make("fremd", { role: "external" }),
      ],
      now,
    );
    expect(vevents(ics)).toHaveLength(1);
    expect(ics).toContain("UID:ok@psng.info");
  });

  it("verlinkt Events mit eigener Seite auf psng.info/events/<slug>", () => {
    const ics = unfold(buildCalendarFeed([make("mit-seite", { description: "Text" })], now));
    expect(ics).toContain("URL:https://psng.info/events/mit-seite");
  });

  it("nimmt keine berechneten Reihentermine auf, solange Platzhalter aus sind", () => {
    expect(vevents(buildCalendarFeed([], now))).toHaveLength(0);
  });
});
