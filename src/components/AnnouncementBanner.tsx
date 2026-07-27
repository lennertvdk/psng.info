import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { formatEventDate, getNextBannerEvent } from "@/data/events";

const AnnouncementBanner = () => {
  const event = getNextBannerEvent();
  const [dismissed, setDismissed] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!event) return;
    setDismissed(localStorage.getItem(`psng-banner-dismissed-${event.id}`) === "1");
  }, [event]);

  if (!event || dismissed) return null;

  const handleDismiss = () => {
    localStorage.setItem(`psng-banner-dismissed-${event.id}`, "1");
    setDismissed(true);
  };

  // Lange Eventtitel würden das fixierte Menü auf dem Handy auf drei Zeilen
  // aufblähen; eine Zeile mit Ellipse reicht als Teaser.
  const label = `${event.title} · ${formatEventDate(event.date)}. Jetzt anmelden →`;
  const linkClass =
    "flex-1 min-w-0 truncate text-center font-heading text-xs md:text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity";

  return (
    <div className="gradient-psychedelic">
      <div className="container mx-auto flex items-center gap-3 px-6 py-2">
        {pathname === "/" ? (
          <a href="#events" className={linkClass} title={label}>
            {label}
          </a>
        ) : (
          <Link to="/#events" className={linkClass} title={label}>
            {label}
          </Link>
        )}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Ankündigung schließen"
          className="shrink-0 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
