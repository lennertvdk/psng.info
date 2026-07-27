import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * In einer SPA existiert das Ziel eines `#hash` beim ersten Dokument-Load noch
 * nicht – React hat zu dem Zeitpunkt nichts gerendert, der Browser gibt das
 * Scrollen auf und der Besucher landet oben auf der Seite. Diese Komponente
 * holt das Scrollen nach, sobald das Element im DOM ist, und reagiert zusätzlich
 * auf Client-seitige Navigation (bei der der Browser gar nicht erst scrollt).
 *
 * Bewusst mit `setTimeout` statt `requestAnimationFrame`: rAF pausiert komplett,
 * solange der Tab im Hintergrund liegt. Wer einen Link in einem neuen Tab öffnet,
 * käme sonst beim Zurückwechseln oben auf der Seite an.
 */
const RETRY_INTERVAL_MS = 50;
const TIMEOUT_MS = 3000;

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Ohne Hash verhält sich die Seite wie eine normale Navigation: nach oben.
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    if (!id) return;

    let timer: ReturnType<typeof setTimeout>;
    const deadline = Date.now() + TIMEOUT_MS;

    // Sektionen erscheinen teils erst nach dem ersten Paint (Suspense, lazy
    // geladene Routen, bedingtes Rendering) – deshalb kurz weiter versuchen.
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        // `behavior: "auto"` überstimmt das `scroll-behavior: smooth` der Seite:
        // Beim Öffnen eines Deep-Links soll man direkt am Ziel ankommen und
        // nicht erst durch die halbe Startseite animiert werden.
        el.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
      if (Date.now() < deadline) {
        timer = setTimeout(tryScroll, RETRY_INTERVAL_MS);
      }
    };

    tryScroll();
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;
