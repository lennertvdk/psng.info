/**
 * Kleine, wiederverwendbare YouTube-Helper. Bewusst frameworkfrei.
 */

/** Extrahiert die Video-ID aus allen gängigen YouTube-URL-Formaten. */
export function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1) || null;
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const parts = u.pathname.split("/");
    const i = parts.findIndex((p) => p === "embed" || p === "shorts");
    if (i >= 0 && parts[i + 1]) return parts[i + 1];
    return null;
  } catch {
    return null;
  }
}

/**
 * URL des Vorschaubilds auf YouTube. Bewusst NICHT im Seitenrendering benutzt:
 * Ein Bild von i.ytimg.com würde die IP-Adresse jedes Besuchers an Google
 * übertragen, bevor er überhaupt etwas angeklickt hat – im Widerspruch zu
 * unserer Datenschutzerklärung. Die Vorschaubilder liegen deshalb als
 * `assets.youtubeThumbnail` lokal im Repo; diese Funktion dient nur dazu, sie
 * beim Hinzufügen neuer Events einmalig herunterzuladen.
 */
export function getRemoteYouTubeThumbnail(url: string): string | null {
  const id = getYouTubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}

/**
 * Datenschutzfreundlicher Embed: youtube-nocookie + autoplay erst nach Klick.
 * Kein Iframe vor Nutzer-Interaktion = keine Google-Tracker beim Seitenaufruf.
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  const id = getYouTubeId(url);
  return id
    ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
    : null;
}
