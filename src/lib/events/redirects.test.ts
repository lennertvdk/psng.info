import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { missingSlugRedirects, type Redirect } from "./redirects";
import { testEvents, withChanges } from "./testData";

const vercel = JSON.parse(fs.readFileSync("vercel.json", "utf8")) as { redirects?: Redirect[] };

describe("previousSlugs", () => {
  it("haben in vercel.json einen permanenten Redirect, deutsch und englisch", () => {
    expect(missingSlugRedirects(testEvents, vercel.redirects ?? [])).toEqual([]);
  });

  it("schlägt an, wenn der Redirect fehlt", () => {
    const e = withChanges(testEvents[0].slug, { previousSlugs: ["alter-name"] });
    expect(missingSlugRedirects([e], vercel.redirects ?? [])).toEqual([
      "/events/alter-name",
      "/en/events/alter-name",
    ]);
  });

  it("schlägt an bei falschem Ziel oder nicht permanentem Redirect", () => {
    const e = withChanges(testEvents[0].slug, { previousSlugs: ["alt"] });
    const redirects: Redirect[] = [
      { source: "/events/alt", destination: `/events/${e.slug}`, permanent: false },
      { source: "/en/events/alt", destination: "/en/events/anderes", permanent: true },
    ];
    expect(missingSlugRedirects([e], redirects)).toEqual(["/events/alt", "/en/events/alt"]);
  });

  it("besteht mit vollständigen Redirects", () => {
    const e = withChanges(testEvents[0].slug, { previousSlugs: ["alt"] });
    const redirects: Redirect[] = [
      { source: "/events/alt", destination: `/events/${e.slug}`, permanent: true },
      { source: "/en/events/alt", destination: `/en/events/${e.slug}`, permanent: true },
    ];
    expect(missingSlugRedirects([e], redirects)).toEqual([]);
  });
});
