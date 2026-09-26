import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { CalendarPlus, ChevronDown, Download, ExternalLink } from "lucide-react";
import { downloadIcs, googleCalendarUrl, type CalendarEvent } from "@/lib/calendar";
import { useCopy } from "@/i18n/copy";

/** Breite des Menüs (w-60) – gebraucht, um es am Bildschirmrand zu halten. */
const MENU_WIDTH = 240;
/** Geschätzte Höhe der drei Einträge; entscheidet nur, ob unten Platz ist. */
const MENU_HEIGHT = 148;
const GAP = 8;

/** Wo das Menü landet: unter dem Knopf, sonst darüber, nie über den Rand hinaus. */
function place(trigger: DOMRect): { top: number; left: number } {
  const below = trigger.bottom + GAP;
  const fitsBelow = below + MENU_HEIGHT <= window.innerHeight;
  return {
    top: fitsBelow ? below : Math.max(GAP, trigger.top - GAP - MENU_HEIGHT),
    left: Math.max(GAP, Math.min(trigger.left, window.innerWidth - MENU_WIDTH - GAP)),
  };
}

/**
 * „Zum Kalender hinzufügen“ – ein kleines Menü unter dem Termin.
 *
 * Drei Einträge, aber nur zwei Wege: Google kennt eine Adresse, mit der sich
 * ein Termin vorausgefüllt anlegen lässt. Apple und iCloud haben nichts
 * Vergleichbares – dort (und in Outlook, Thunderbird, allem anderen) ist eine
 * ICS-Datei der Weg, und macOS wie iOS öffnen sie direkt im Kalender. Der
 * Apple-Eintrag lädt deshalb dieselbe Datei wie der letzte. Trotzdem zwei
 * Einträge: Sie beantworten zwei verschiedene Fragen – „ich habe Apple“ und
 * „ich habe etwas anderes“ –, und wer die erste stellt, soll nicht erst
 * wissen müssen, was eine ICS-Datei ist.
 *
 * Das Menü hängt im Portal am `body` und liegt fest im Fenster, nicht in der
 * Karte: Jede Zeile des Zeitstrahls animiert beim Einblenden und bildet damit
 * einen eigenen Stapelkontext. Innerhalb der Karte gerendert verschwand das
 * Menü deshalb hinter der nächsten – ein z-index hilft dagegen nicht, weil er
 * nur innerhalb desselben Kontextes zählt.
 *
 * Bewusst kein Radix-Menü: Für drei Einträge wäre das eine weitere Abhängig-
 * keit, und das Verhalten, das wir brauchen – Escape, Klick daneben, Pfeil-
 * tasten – steht unten in gut zwanzig Zeilen.
 */
export default function AddToCalendar({
  event,
  /** Zurückhaltende Fassung für die gestrichelten Reihentermine. */
  subtle = false,
}: {
  event: CalendarEvent;
  subtle?: boolean;
}) {
  const c = useCopy();
  const [at, setAt] = useState<{ top: number; left: number } | null>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLElement | null)[]>([]);
  const open = at !== null;

  const actions = [
    {
      key: "google",
      label: c.events.calendarGoogle,
      href: googleCalendarUrl(event),
      icon: ExternalLink,
    },
    { key: "apple", label: c.events.calendarApple, icon: Download },
    { key: "ics", label: c.events.calendarIcs, icon: Download },
  ];

  const openMenu = () => {
    const rect = trigger.current?.getBoundingClientRect();
    if (rect) setAt(place(rect));
  };

  const close = (returnFocus = true) => {
    setAt(null);
    if (returnFocus) trigger.current?.focus();
  };

  /** Ob der Fokus oder ein Klick noch zum Menü gehört – Knopf wie Einträge. */
  const isOurs = (node: Node | null) =>
    Boolean(node && (wrapper.current?.contains(node) || menu.current?.contains(node)));

  useEffect(() => {
    if (!open) return;
    // Ein Menü, das offen bleibt, während man woanders weiterliest, steht im
    // Weg: Es liegt über der nächsten Karte.
    const onPointerDown = (e: PointerEvent) => {
      if (!isOurs(e.target as Node)) setAt(null);
    };
    // Fest im Fenster platziert, muss es beim Scrollen mitgeführt werden.
    const follow = () => {
      const rect = trigger.current?.getBoundingClientRect();
      if (rect) setAt(place(rect));
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("scroll", follow, true);
    window.addEventListener("resize", follow);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", follow, true);
      window.removeEventListener("resize", follow);
    };
  }, [open]);

  // Beim Öffnen in den ersten Eintrag springen: Wer das Menü mit der Tastatur
  // aufmacht, ist sonst immer noch auf dem Knopf und tabbt ins Leere.
  useEffect(() => {
    if (open) items.current[0]?.focus();
  }, [open]);

  const onMenuKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const focusable = items.current.filter(Boolean) as HTMLElement[];
    const index = focusable.indexOf(document.activeElement as HTMLElement);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      focusable[(index + step + focusable.length) % focusable.length]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      focusable[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      focusable[focusable.length - 1]?.focus();
    }
  };

  const itemClass =
    "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm text-popover-foreground transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none";

  return (
    <div
      ref={wrapper}
      className="inline-block"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          close();
        }
      }}
      // Verlässt der Fokus Knopf und Menü – etwa mit der Tabulatortaste –,
      // ist das Menü erledigt. Die Einträge hängen im Portal, gehören aber
      // zum selben React-Baum, deshalb läuft ihr Fokusverlust hier durch.
      onBlur={(e) => {
        if (!isOurs(e.relatedTarget as Node)) setAt(null);
      }}
    >
      <button
        ref={trigger}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${c.events.addToCalendar}: ${event.title}`}
        onClick={() => (open ? close(false) : openMenu())}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" && !open) {
            e.preventDefault();
            openMenu();
          }
        }}
        className={
          subtle
            ? "inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:underline"
            : "inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-heading font-medium text-foreground transition-colors hover:bg-muted"
        }
      >
        <CalendarPlus className="h-4 w-4" aria-hidden="true" />
        {c.events.addToCalendar}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {at &&
        createPortal(
          <div
            ref={menu}
            role="menu"
            aria-label={`${c.events.addToCalendar}: ${event.title}`}
            onKeyDown={onMenuKeyDown}
            style={{ top: at.top, left: at.left }}
            className="fixed z-50 w-60 rounded-xl border border-border bg-popover p-1 shadow-lg animate-in fade-in-0 zoom-in-95"
          >
            {actions.map((action, i) => {
              const Icon = action.icon;
              const content = (
                <>
                  <span>{action.label}</span>
                  <Icon
                    className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                </>
              );
              return action.href ? (
                <a
                  key={action.key}
                  ref={(el) => (items.current[i] = el)}
                  role="menuitem"
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => close(false)}
                  className={itemClass}
                >
                  {content}
                </a>
              ) : (
                <button
                  key={action.key}
                  ref={(el) => (items.current[i] = el)}
                  role="menuitem"
                  type="button"
                  onClick={() => {
                    downloadIcs(event);
                    close();
                  }}
                  className={itemClass}
                >
                  {content}
                </button>
              );
            })}
          </div>,
          document.body,
        )}
    </div>
  );
}
