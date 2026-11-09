import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { JOIN_FORM_LINK, WHATSAPP_LINK } from "./links";

describe("WHATSAPP_LINK", () => {
  it("is the same in the counting function (api/whatsapp.ts)", () => {
    const api = fs.readFileSync(path.resolve(__dirname, "../../api/whatsapp.ts"), "utf8");
    expect(api).toContain(`"${WHATSAPP_LINK}"`);
  });
});

describe("JOIN_FORM_LINK", () => {
  it("is where /mitmachen redirects (vercel.json) and what the deploy check expects", () => {
    const root = path.resolve(__dirname, "../..");
    const vercel = JSON.parse(fs.readFileSync(path.join(root, "vercel.json"), "utf8"));
    const redirect = vercel.redirects.find((r: { source: string }) => r.source === "/mitmachen");
    expect(redirect?.destination).toBe(JOIN_FORM_LINK);
    expect(fs.readFileSync(path.join(root, "scripts/check-deploy.mjs"), "utf8")).toContain(`"${JOIN_FORM_LINK}"`);
  });
});
