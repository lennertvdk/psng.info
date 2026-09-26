import { describe, it, expect } from "vitest";
import {
  calendarSpan,
  downloadIcs,
  googleCalendarUrl,
  icsFileName,
  toIcs,
  type CalendarEvent,
} from "./calendar";

const lecture: CalendarEvent = {
  id: "series-2026-10-20",
  title: "PSNG Lecture",
  date: "2026-10-20",
  startTime: "19:00",
  endTime: "20:00",
  location: "Zoom",
  description: "Termin steht. Thema und Speaker geben wir rechtzeitig bekannt.",
  url: "https://psng.info/#events",
};

/** Fester Zeitstempel, damit DTSTAMP im Test nicht bei jedem Lauf anders ist. */
const now = new Date("2026-09-26T12:00:00Z");

/** Eine Eigenschaft aus dem ICS lesen, Zeilenumbrüche wieder zusammengesetzt. */
function property(ics: string, name: string): string | undefined {
  const unfolded = ics.replace(/\r\n /g, "");
  return unfolded
    .split("\r\n")
    .find((line) => line.startsWith(`${name}:`) || line.startsWith(`${name};`))
    ?.slice(name.length + 1);
}

describe("calendarSpan", () => {
  it("converts Berlin summer time to UTC", () => {
    // 20. Oktober liegt noch in der Sommerzeit: MESZ ist UTC+2.
    expect(calendarSpan(lecture)).toEqual({
      allDay: false,
      start: "20261020T170000Z",
      end: "20261020T180000Z",
    });
  });

  it("converts Berlin winter time to UTC", () => {
    const span = calendarSpan({ ...lecture, date: "2026-12-01" });
    expect(span.start).toBe("20261201T180000Z");
  });

  it("gets the change-over weekends right", () => {
    // Letzter Sonntag im März und im Oktober – dazwischen gilt +2, davor und
    // danach +1. Ein fest verdrahteter Versatz läge hier eine Stunde daneben.
    expect(calendarSpan({ ...lecture, date: "2026-03-29" }).start).toBe(
      "20260329T170000Z",
    );
    expect(calendarSpan({ ...lecture, date: "2026-10-25" }).start).toBe(
      "20261025T180000Z",
    );
  });

  it("gives an event without an end time one hour", () => {
    const span = calendarSpan({ ...lecture, endTime: undefined });
    expect(span).toEqual({
      allDay: false,
      start: "20261020T170000Z",
      end: "20261020T180000Z",
    });
  });

  it("lets an event past midnight end on the next day", () => {
    const span = calendarSpan({ ...lecture, startTime: "22:00", endTime: "01:00" });
    expect(span.end).toBe("20261020T230000Z");
  });

  it("falls back to a whole day when no time is known", () => {
    expect(calendarSpan({ ...lecture, startTime: undefined, endTime: undefined })).toEqual({
      allDay: true,
      start: "20261020",
      // Das Ende eines Tages-Termins ist der Tag danach, nicht derselbe.
      end: "20261021",
    });
  });

  it("spans whole days when the event runs over several of them", () => {
    const span = calendarSpan({ ...lecture, date: "2026-05-16", endDate: "2026-05-18" });
    expect(span).toEqual({ allDay: true, start: "20260516", end: "20260519" });
  });
});

describe("toIcs", () => {
  const ics = toIcs(lecture, now);

  it("writes a complete calendar entry", () => {
    expect(ics.startsWith("BEGIN:VCALENDAR\r\n")).toBe(true);
    expect(ics.trimEnd().endsWith("END:VCALENDAR")).toBe(true);
    expect(property(ics, "UID")).toBe("series-2026-10-20@psng.info");
    expect(property(ics, "DTSTAMP")).toBe("20260926T120000Z");
    expect(property(ics, "DTSTART")).toBe("20261020T170000Z");
    expect(property(ics, "SUMMARY")).toBe("PSNG Lecture");
    expect(property(ics, "LOCATION")).toBe("Zoom");
    expect(property(ics, "URL")).toBe("https://psng.info/#events");
  });

  it("uses CRLF, as the standard demands", () => {
    // Outlook nimmt Dateien mit reinem \n nicht an.
    expect(ics.includes("\r\n")).toBe(true);
    expect(ics.replace(/\r\n/g, "").includes("\n")).toBe(false);
  });

  it("marks an all-day entry as a date, not a time", () => {
    const allDay = toIcs({ ...lecture, startTime: undefined, endTime: undefined }, now);
    expect(allDay).toContain("DTSTART;VALUE=DATE:20261020");
    expect(allDay).toContain("DTEND;VALUE=DATE:20261021");
  });

  it("escapes the characters that mean structure", () => {
    const ics = toIcs(
      {
        ...lecture,
        title: "Logos, Ekstase; ein Abend",
        description: "Erste Zeile\nZweite Zeile",
      },
      now,
    );
    expect(property(ics, "SUMMARY")).toBe("Logos\\, Ekstase\\; ein Abend");
    expect(property(ics, "DESCRIPTION")).toContain("Erste Zeile\\nZweite Zeile");
  });

  it("folds long lines and keeps their content", () => {
    const long = toIcs(
      {
        ...lecture,
        description:
          "Ein sehr langer Beschreibungstext über Psychedelika, Forschung und Vernetzung, der die zulässige Zeilenlänge deutlich überschreitet und dabei Umlaute wie ä, ö, ü mitführt.",
      },
      now,
    );
    for (const line of long.split("\r\n")) {
      // Gezählt wird in Oktetten, nicht in Zeichen.
      expect(new TextEncoder().encode(line).length).toBeLessThanOrEqual(75);
    }
    expect(property(long, "DESCRIPTION")).toContain("Umlaute wie ä\\, ö\\, ü");
  });

  it("leaves out what is not known", () => {
    const bare = toIcs({ id: "x", title: "Termin", date: "2026-10-20" }, now);
    expect(bare).not.toContain("LOCATION:");
    expect(bare).not.toContain("DESCRIPTION:");
  });
});

describe("googleCalendarUrl", () => {
  it("prefills title, time and place", () => {
    const url = new URL(googleCalendarUrl(lecture));
    expect(url.origin + url.pathname).toBe(
      "https://calendar.google.com/calendar/render",
    );
    expect(url.searchParams.get("action")).toBe("TEMPLATE");
    expect(url.searchParams.get("text")).toBe("PSNG Lecture");
    expect(url.searchParams.get("dates")).toBe("20261020T170000Z/20261020T180000Z");
    expect(url.searchParams.get("location")).toBe("Zoom");
    expect(url.searchParams.get("details")).toContain("https://psng.info/#events");
  });

  it("passes whole days without a time", () => {
    const url = new URL(
      googleCalendarUrl({ ...lecture, startTime: undefined, endTime: undefined }),
    );
    expect(url.searchParams.get("dates")).toBe("20261020/20261021");
  });
});

describe("icsFileName", () => {
  it("builds a name you recognise in the downloads folder", () => {
    expect(icsFileName(lecture)).toBe("psng-lecture-2026-10-20.ics");
  });

  it("does not say psng twice", () => {
    expect(icsFileName({ ...lecture, title: "Kick-off" })).toBe(
      "psng-kick-off-2026-10-20.ics",
    );
  });

  it("gets by without umlauts, punctuation and spaces", () => {
    expect(
      icsFileName({ ...lecture, title: "Ein Abend rund um Psychedelika & Größe" }),
    ).toBe("psng-ein-abend-rund-um-psychedelika-groesse-2026-10-20.ics");
  });
});

describe("downloadIcs", () => {
  it("hands the browser a file and cleans up after itself", () => {
    // jsdom kennt keine Object-URLs; beide Enden werden hier nachgestellt,
    // um zu prüfen, dass der Link wieder aus dem Dokument verschwindet.
    const created: Blob[] = [];
    URL.createObjectURL = (blob: Blob) => {
      created.push(blob);
      return "blob:psng";
    };
    URL.revokeObjectURL = () => {};

    downloadIcs(lecture);

    expect(created).toHaveLength(1);
    expect(created[0].type).toBe("text/calendar;charset=utf-8");
    expect(document.querySelectorAll("a[download]")).toHaveLength(0);
  });
});
