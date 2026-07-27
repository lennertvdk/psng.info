import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const suggestions = [
  { to: "/", label: "Startseite" },
  { to: "/#events", label: "Events & Termine" },
  { to: "/leitfaden", label: "Leitfaden: Gruppe gründen" },
  { to: "/#kontakt", label: "Kontakt" },
];

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto flex-1 px-6 pt-40 pb-24">
        <div className="max-w-xl mx-auto text-center">
          <p className="font-heading text-sm uppercase tracking-[0.2em] text-primary mb-4">
            Fehler 404
          </p>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Diese Seite gibt es nicht
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-2">
            Die Adresse <code className="text-foreground">{pathname}</code> führt
            ins Leere. Vielleicht ist der Link veraltet oder hat sich ein
            Tippfehler eingeschlichen.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Hier geht es weiter:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {suggestions.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-primary/30 text-primary font-heading font-medium text-sm hover:bg-primary/5 transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
