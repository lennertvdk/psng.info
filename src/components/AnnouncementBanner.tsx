import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { formatEventDate, getNextBannerEvent } from "@/data/events";

const AnnouncementBanner = () => {
  const event = getNextBannerEvent();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (!event) return;
    setDismissed(localStorage.getItem(`psng-banner-dismissed-${event.id}`) === "1");
  }, [event]);

  if (!event || dismissed) return null;

  const handleDismiss = () => {
    localStorage.setItem(`psng-banner-dismissed-${event.id}`, "1");
    setDismissed(true);
  };

  return (
    <div className="gradient-psychedelic">
      <div className="container mx-auto flex items-center gap-3 px-6 py-2">
        <a
          href="#events"
          className="flex-1 text-center font-heading text-xs md:text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {event.title} · {formatEventDate(event.date)}. Jetzt anmelden →
        </a>
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
