import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ScrollToHash from "./ScrollToHash";

function renderAt(entry: string) {
  return render(
    <MemoryRouter initialEntries={[entry]}>
      <ScrollToHash />
    </MemoryRouter>,
  );
}

/** Legt ein Ziel-Element an und gibt dessen scrollIntoView-Spy zurück. */
function addTarget(id: string) {
  const el = document.createElement("div");
  el.id = id;
  document.body.appendChild(el);
  const spy = vi.fn();
  el.scrollIntoView = spy;
  return spy;
}

describe("ScrollToHash", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.body.innerHTML = "";
    window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("scrolls to a target that is already in the DOM", () => {
    const spy = addTarget("kontakt");
    renderAt("/?subject=gruppe#kontakt");
    expect(spy).toHaveBeenCalledWith({ behavior: "auto", block: "start" });
  });

  it("waits for a target that renders after the first paint", () => {
    renderAt("/#kontakt");

    // Noch nicht da – die Komponente darf nicht aufgeben.
    vi.advanceTimersByTime(200);
    const spy = addTarget("kontakt");

    vi.advanceTimersByTime(100);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("jumps instantly rather than smooth-scrolling through the whole page", () => {
    const spy = addTarget("kontakt");
    renderAt("/#kontakt");
    // Ein weicher Scroll würde den Nutzer durch die komplette Startseite
    // animieren – bei einem Deep-Link ist das unerwünscht.
    expect(spy.mock.calls[0][0]).toMatchObject({ behavior: "auto" });
  });

  it("gives up instead of retrying forever when the target never appears", () => {
    renderAt("/#does-not-exist");
    vi.advanceTimersByTime(10_000);
    const spy = addTarget("does-not-exist");
    vi.advanceTimersByTime(1_000);
    expect(spy).not.toHaveBeenCalled();
  });

  it("scrolls to the top when there is no hash", () => {
    renderAt("/impressum");
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
  });

  it("decodes percent-encoded ids", () => {
    const spy = addTarget("über-uns");
    renderAt("/#%C3%BCber-uns");
    expect(spy).toHaveBeenCalled();
  });

  it("does not rely on requestAnimationFrame, which is paused in background tabs", () => {
    const raf = vi.spyOn(window, "requestAnimationFrame");
    addTarget("kontakt");
    renderAt("/#kontakt");
    expect(raf).not.toHaveBeenCalled();
  });
});
