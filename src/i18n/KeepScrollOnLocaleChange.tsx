import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { consumeScrollForLocaleSwitch } from "./localeScroll";

/**
 * Stellt nach einem Sprachwechsel die Scrollposition wieder her. Hängt an der
 * Router-Wurzel und überlebt deshalb den Wechsel, anders als alles innerhalb
 * der Seite – siehe localeScroll.ts für den Grund.
 *
 * Zwei Frames Wartezeit: Direkt nach dem Wechsel ist die neue Seite noch nicht
 * ausgelegt, und der Browser würde auf die dann geringere Höhe kappen. Der
 * englische Text ist ohnehin kürzer als der deutsche – landet man ein paar
 * Pixel daneben, ist das immer noch ungleich besser als der Sprung nach oben.
 */
export default function KeepScrollOnLocaleChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    const top = consumeScrollForLocaleSwitch();
    if (top === null) return;

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => window.scrollTo({ top, behavior: "instant" }));
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
