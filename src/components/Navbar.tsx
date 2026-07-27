import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import psngLogo from "@/assets/PSNG-Logo-centered.webp";
import AnnouncementBanner from "@/components/AnnouncementBanner";

const navLinks = [
  { label: "Über uns", hash: "#uber-uns" },
  { label: "Events", hash: "#events" },
  { label: "Leitfaden", hash: "#leitfaden" },
  { label: "FAQ", hash: "#faq" },
  { label: "Team", hash: "#team" },
  { label: "Kooperation", hash: "#kooperation" },
  { label: "Kontakt", hash: "#kontakt" },
];

const MOBILE_MENU_ID = "mobile-nav";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const scrollY = useMotionValue(0);

  // Die Sektionen liegen alle auf der Startseite. Auf Unterseiten muss der Link
  // deshalb erst dorthin navigieren, sonst passiert beim Klick schlicht nichts.
  const onHome = pathname === "/";

  useEffect(() => {
    const update = () => scrollY.set(window.scrollY);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [scrollY]);

  // Menü schließen, wenn der Viewport auf Desktop-Breite wächst – sonst bliebe
  // das offene Panel ohne sichtbaren Schließen-Button stehen.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const close = () => mq.matches && setOpen(false);
    close();
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, [open]);

  const logoOpacity = useTransform(scrollY, [300, 400], [0, 1]);

  const linkClass =
    "font-heading text-sm font-medium text-muted-foreground hover:text-primary transition-colors";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <AnnouncementBanner />
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link
          to="/"
          className="flex items-center gap-3 font-heading text-xl font-bold tracking-tight text-primary"
        >
          <motion.img
            src={psngLogo}
            alt="PSNG Logo"
            width={36}
            height={36}
            decoding="async"
            style={{ opacity: onHome ? logoOpacity : 1 }}
            className="h-9 w-9 rounded-full border border-border"
          />
          <span>PSNG</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
            onHome ? (
              <a key={link.hash} href={link.hash} className={linkClass}>
                {link.label}
              </a>
            ) : (
              <Link key={link.hash} to={`/${link.hash}`} className={linkClass}>
                {link.label}
              </Link>
            ),
          )}
        </div>
        <button
          type="button"
          className="md:hidden text-primary"
          onClick={() => setOpen(!open)}
          aria-label="Menü umschalten"
          aria-expanded={open}
          aria-controls={MOBILE_MENU_ID}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/*
        Bewusst ohne Auf-/Zuklapp-Animation: Die Navigation auf dem Handy darf
        nicht davon abhängen, dass eine Animation tatsächlich läuft – sonst
        bliebe das Menü im schlechtesten Fall als schmaler Streifen stehen.
      */}
      {open && (
        <div id={MOBILE_MENU_ID} className="md:hidden glass">
          <div className="flex flex-col gap-4 px-6 py-4">
            {navLinks.map((link) =>
              onHome ? (
                <a
                  key={link.hash}
                  href={link.hash}
                  onClick={() => setOpen(false)}
                  className={linkClass}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.hash}
                  to={`/${link.hash}`}
                  onClick={() => setOpen(false)}
                  className={linkClass}
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
