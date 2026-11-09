import { describe, expect, it } from "vitest";
import { getChildEvents, hasPage } from "@/lib/events/schedule";
import { bySlug, testEvents, withChanges } from "@/lib/events/testData";
import { pick } from "@/i18n/localized";
import { eventNode, eventTimes, graph, ORG_ID, organizationNode, websiteNode } from "./structuredData";

describe("eventTimes", () => {
  it("schreibt die Uhrzeit mit Berliner Versatz – Winterzeit", () => {
    expect(eventTimes(bySlug("lecture-tomislav-majic"))).toEqual({
      startDate: "2026-11-04T19:00:00+01:00",
      endDate: "2026-11-04T20:30:00+01:00",
    });
  });

  it("schreibt die Uhrzeit mit Berliner Versatz – Sommerzeit", () => {
    expect(eventTimes(bySlug("lecture-torsten-passie")).startDate).toBe("2026-08-11T19:30:00+02:00");
  });

  it("bleibt ohne feste Uhrzeit beim reinen Datum", () => {
    expect(eventTimes(bySlug("alps-conference-2026"))).toEqual({ startDate: "2026-10-09", endDate: "2026-10-10" });
    const tbd = withChanges("lecture-tomislav-majic", { timeTbd: true, startTime: undefined, endTime: undefined });
    expect(eventTimes(tbd)).toEqual({ startDate: "2026-11-04", endDate: undefined });
  });

  it("ergänzt das Ende nur bei Reihenterminen, mit der Dauer aus series.ts", () => {
    const lecture = withChanges("lecture-jelena-brasanac", { attendance: "online" });
    expect(eventTimes(lecture)).toEqual({ startDate: "2026-12-03T18:30:00+01:00", endDate: "2026-12-03T19:30:00+01:00" });
    // Kein Reihentermin: kein erfundenes Ende.
    const other = withChanges("lecture-jelena-brasanac", { category: "gathering", column: "community" });
    expect(eventTimes(other).endDate).toBeUndefined();
  });
});

describe("eventNode", () => {
  it("zeichnet ein hybrides Event mit Adresse und Online-Teil aus", () => {
    const node = eventNode(bySlug("lecture-tomislav-majic"), "de");
    expect(node.eventAttendanceMode).toBe("https://schema.org/MixedEventAttendanceMode");
    expect(node.location).toEqual([
      expect.objectContaining({ "@type": "Place", address: expect.objectContaining({ addressCountry: "DE" }) }),
      { "@type": "VirtualLocation", url: "https://psng.info/events/lecture-tomislav-majic" },
    ]);
  });

  it("gibt kein Event aus, wenn nicht feststeht, wie man teilnimmt – ohne Ort ist es ungültig", () => {
    expect(eventNode(withChanges("lecture-tomislav-majic", { attendance: undefined }), "de")).toBeUndefined();
    expect(eventNode(withChanges("kickoff", { attendance: undefined }), "de")).toBeUndefined();
    expect(graph(organizationNode("x"), undefined)["@graph"]).toHaveLength(1);
  });

  it("zeigt hybrid ohne bekannten Saal nur den Online-Zugang", () => {
    const node = eventNode(bySlug("lecture-jelena-brasanac"), "de")!;
    expect(node.eventAttendanceMode).toBe("https://schema.org/MixedEventAttendanceMode");
    expect(node.location).toEqual({ "@type": "VirtualLocation", url: "https://psng.info/events/lecture-jelena-brasanac" });
  });

  it("gibt jedem ausgegebenen Event einen Ort, ein Bild und eine Beschreibung", () => {
    for (const e of testEvents.filter(hasPage)) {
      const node = eventNode(e, "de", [], getChildEvents(testEvents, e.slug));
      if (!node) continue;
      expect(node.location, e.slug).toBeTruthy();
      expect(node.image, e.slug).toEqual(expect.arrayContaining([expect.stringMatching(/^https:\/\//)]));
      expect(node.description, e.slug).toBeTruthy();
    }
  });

  it("zeichnet die Lecture-Reihe als online mit Zoom-Seite als VirtualLocation", () => {
    const node = eventNode(bySlug("lecture-eric-lonergan"), "de")!;
    expect(node.eventAttendanceMode).toBe("https://schema.org/OnlineEventAttendanceMode");
    expect(node.location).toEqual({ "@type": "VirtualLocation", url: "https://psng.info/events/lecture-eric-lonergan" });
  });

  it("nennt Eintritt frei bei eigenen und gemeinsamen Terminen, sonst keinen Preis", () => {
    expect(eventNode(bySlug("lecture-torsten-passie"), "de")!.offers).toEqual({
      "@type": "Offer",
      price: 0,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: "https://psng.info/events/lecture-torsten-passie",
    });
    expect(eventNode(bySlug("lecture-tomislav-majic"), "de")).toHaveProperty("offers");
    // Beitrag, Konferenz und Teil eines Abends mit Beitrag: kein erfundener Preis.
    expect(eventNode(bySlug("abend-rund-um-psychedelika"), "de")).not.toHaveProperty("offers");
    expect(eventNode(bySlug("talk-prateep-beed"), "de")).not.toHaveProperty("offers");
    expect(eventNode(bySlug("alps-conference-2026"), "de")).not.toHaveProperty("offers");
  });

  it("nennt den Speaker als Person, bei einem Abend die Speaker der Vorträge", () => {
    expect(eventNode(bySlug("lecture-tomislav-majic"), "de")!.performer).toEqual({
      "@type": "Person",
      name: "Dr. med. Tomislav Majić",
    });
    const abend = bySlug("abend-rund-um-psychedelika");
    expect(eventNode(abend, "de")).not.toHaveProperty("performer");
    expect(eventNode(abend, "de", [], getChildEvents(testEvents, abend.slug))!.performer).toEqual({
      "@type": "Person",
      name: "Dr. Prateep Beed",
    });
  });

  it("nimmt als Beschreibung die Beschreibung, sonst den Abstract, sonst den Untertitel", () => {
    expect(eventNode(bySlug("lecture-torsten-passie"), "de")!.description).toBe(
      pick(bySlug("lecture-torsten-passie").description!, "de"),
    );
    const withAbstract = withChanges("lecture-tomislav-majic", { description: undefined });
    expect(eventNode(withAbstract, "de")!.description).toMatch(/^Harm reduction is an approach/);
    const onlySubtitle = withChanges("lecture-tomislav-majic", { description: undefined, abstract: undefined });
    expect(eventNode(onlySubtitle, "de")!.description).toBe("Why Psychedelic Harm Reduction");
  });

  it("fällt ohne Bild auf das Standard-Vorschaubild zurück", () => {
    expect(eventNode(bySlug("lecture-tomislav-majic"), "de")!.image).toEqual(["https://psng.info/og-image.jpg"]);
    expect(eventNode(bySlug("lecture-tomislav-majic"), "de", ["/a.jpg"])!.image).toEqual(["https://psng.info/a.jpg"]);
  });

  it("meldet Absagen und Verschiebungen", () => {
    expect(eventNode(withChanges("lecture-tomislav-majic", { status: "cancelled" }), "de").eventStatus).toBe(
      "https://schema.org/EventCancelled",
    );
    const moved = eventNode(withChanges("lecture-tomislav-majic", { rescheduledFrom: "2026-10-28" }), "de");
    expect(moved.eventStatus).toBe("https://schema.org/EventRescheduled");
    expect(moved).toHaveProperty("previousStartDate", "2026-10-28");
  });

  it("nennt bei gemeinsamen Events beide Veranstalter, bei fremden nicht uns", () => {
    expect(eventNode(bySlug("abend-rund-um-psychedelika"), "de").organizer).toEqual([
      { "@id": ORG_ID },
      expect.objectContaining({ "@type": "Organization" }),
    ]);
    expect(JSON.stringify(eventNode(bySlug("alps-conference-2026"), "de"))).not.toContain(ORG_ID);
  });

  it("verweist auf die Detailseite in der Sprache und hält die @id sprachunabhängig", () => {
    const de = eventNode(bySlug("lecture-tomislav-majic"), "de");
    const en = eventNode(bySlug("lecture-tomislav-majic"), "en");
    expect(en.url).toBe("https://psng.info/en/events/lecture-tomislav-majic");
    expect(en["@id"]).toBe(de["@id"]);
  });

  it("nennt nur absolute URLs – relative wertet Google nicht aus", () => {
    for (const e of testEvents.filter(hasPage)) {
      const json = JSON.stringify(graph(organizationNode("x"), websiteNode("de"), eventNode(e, "de", ["/_astro/a.webp"])));
      for (const [, url] of json.matchAll(/"(?:url|image|@id|logo)":\s*"([^"]+)"/g)) {
        expect(url, e.slug).toMatch(/^https?:\/\//);
      }
    }
  });
});
