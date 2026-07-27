import psngLogo from "@/assets/PSNG-Logo-centered-transparent.webp";
import { WHATSAPP_LINK } from "@/lib/links";

/*
 * Der Hero nutzt CSS-Animationen statt framer-motion. Grund: Die Elemente sind
 * ohne laufende Animation sichtbar – ein Besucher, dessen Browser die Animation
 * nicht ausführt (Tab im Hintergrund geöffnet, angehaltene Frames), sieht
 * trotzdem Überschrift und Buttons statt einer leeren Seite.
 */
const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-6 py-24">
      <div className="animate-rise-in relative w-56 md:w-80 flex items-center justify-center">
        <div className="absolute w-[82%] h-[82%] rounded-full bg-white" />
        {/* Wird in index.html vorgeladen – es ist das LCP-Element der Seite. */}
        <img
          src={psngLogo}
          alt="PSNG Logo"
          width={640}
          height={630}
          decoding="async"
          className="relative w-full object-contain"
        />
      </div>

      <div className="mt-6 text-center max-w-2xl mx-auto">
        <h1
          className="animate-rise-in font-heading text-3xl md:text-5xl font-bold text-foreground leading-tight mb-4"
          style={{ animationDelay: "0.15s" }}
        >
          Psychedelische <span className="gradient-text">Forschung</span> verbindet
        </h1>
        <div
          className="animate-rise-in flex justify-center gap-3 font-heading text-sm text-foreground/50 mb-5"
          style={{ animationDelay: "0.2s" }}
        >
          <span>250+ Studierende</span>
          <span>·</span>
          <span>13+ Städte</span>
        </div>
        <p
          className="animate-rise-in text-foreground/70 text-base md:text-lg max-w-xl mx-auto mb-8 font-body"
          style={{ animationDelay: "0.25s" }}
        >
          Deutschlands erstes bundesweites studentisches Netzwerk für
          psychedelische Wissenschaft. Seit März 2026 aktiv.
        </p>
        <div
          className="animate-rise-in flex flex-col sm:flex-row gap-4 justify-center"
          style={{ animationDelay: "0.3s" }}
        >
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg gradient-psychedelic text-primary-foreground font-heading font-medium text-sm hover:opacity-90 transition-opacity"
          >
            WhatsApp beitreten
          </a>
          <a
            href="#leitfaden"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-primary/30 text-primary font-heading font-medium text-sm hover:bg-primary/5 transition-colors"
          >
            Gründe deine Gruppe
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
