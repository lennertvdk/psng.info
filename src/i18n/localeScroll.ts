const KEY = "psng:locale-switch-scroll";

/**
 * Deutsch und Englisch sind getrennte Routen mit eigenen Route-Elementen.
 * React hängt die Seite beim Wechsel ab und neu auf, die Höhe fällt kurz auf
 * null – und damit springt die Seite an den Anfang. Wer auf halber Höhe im
 * Zeitstrahl steht und auf „EN" tippt, landete bisher wieder ganz oben.
 *
 * Also merkt sich der Umschalter vor dem Klick, wo er war. `sessionStorage`
 * statt eines Refs, weil die Navigationsleiste mit der Seite neu aufgehängt
 * wird und ein Ref den Wechsel nicht überlebte.
 */
export function rememberScrollForLocaleSwitch() {
  try {
    sessionStorage.setItem(KEY, String(window.scrollY));
  } catch {
    // Privater Modus oder blockierte Speicherung: dann eben ohne.
  }
}

/**
 * Liest die gemerkte Position und löscht sie sofort: Sie gilt für genau
 * diesen einen Wechsel und darf einen späteren Seitenaufruf nicht verschieben.
 */
export function consumeScrollForLocaleSwitch(): number | null {
  let stored: string | null = null;
  try {
    stored = sessionStorage.getItem(KEY);
    if (stored !== null) sessionStorage.removeItem(KEY);
  } catch {
    return null;
  }
  if (stored === null) return null;
  const top = Number(stored);
  return Number.isFinite(top) ? top : null;
}
