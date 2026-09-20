import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ExternalLink, Menu, X } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import psngLogo from "@/assets/PSNG-Logo-centered.webp";
import { useCopy } from "@/i18n/copy";
import {
  localeNames,
  localeShortNames,
  otherLocale,
  useLocale,
} from "@/i18n/locale";
import { pathFor, switchLocalePath } from "@/i18n/routes";

const MOBILE_MENU_ID = "mobile-nav";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const scrollY = useMotionValue(0);
  const c = useCopy();
  const locale = useLocale();
  const home = pathFor("home", locale);
  const target = otherLocale(locale);

  // Die Sektionen liegen alle auf der Startseite. Auf Unterseiten muss der Link
  // deshalb erst dorthin navigieren, sonst passiert beim Klick schlicht nichts.
  const onHome = pathname === home;

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
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link
          to={home}
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
          {c.nav.links.map((link) =>
            onHome ? (
              <a key={link.hash} href={link.hash} className={linkClass}>
                {link.label}
              </a>
            ) : (
              <Link key={link.hash} to={`${home}${link.hash}`} className={linkClass}>
                {link.label}
              </Link>
            ),
          )}
          <a
            href="https://medien.psng.info"
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClass} inline-flex items-center gap-1 md:mr-4`}
          >
            {c.nav.media}
            <ExternalLink size={13} aria-hidden="true" />
          </a>
          {/* Der Umschalter führt auf dieselbe Seite in der anderen Sprache,
              nicht pauschal auf die Startseite – wer einen Leitfaden liest,
              will ihn übersetzt und nicht von vorn anfangen. */}
          <Link
            to={switchLocalePath(pathname, target)}
            hrefLang={target}
            aria-label={c.nav.languageLabel}
            className="rounded-full border border-border px-2.5 py-1 font-heading text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            {localeShortNames[target]}
          </Link>
        </div>
        <button
          type="button"
          className="md:hidden text-primary"
          onClick={() => setOpen(!open)}
          aria-label={c.nav.menuToggle}
          aria-expanded={open}
          aria-controls={MOBILE_MENU_ID}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <a
        href="https://medien.psng.info"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-[hsl(var(--pink))] via-[hsl(var(--coral))] to-[hsl(var(--salmon))] px-6 py-[0.4rem] text-center font-heading text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity md:text-sm"
      >
        <span className="underline underline-offset-2">
          {c.nav.banner}
        </span>
        <ExternalLink size={14} aria-hidden="true" />
      </a>
      {/*
        Bewusst ohne Auf-/Zuklapp-Animation: Die Navigation auf dem Handy darf
        nicht davon abhängen, dass eine Animation tatsächlich läuft – sonst
        bliebe das Menü im schlechtesten Fall als schmaler Streifen stehen.
      */}
      {open && (
        <div id={MOBILE_MENU_ID} className="md:hidden glass">
          <div className="flex flex-col gap-4 px-6 py-4">
            {c.nav.links.map((link) =>
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
                  to={`${home}${link.hash}`}
                  onClick={() => setOpen(false)}
                  className={linkClass}
                >
                  {link.label}
                </Link>
              ),
            )}
            <a
              href="https://medien.psng.info"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className={`${linkClass} inline-flex items-center gap-1 md:mr-4`}
            >
              {c.nav.media}
              <ExternalLink size={13} aria-hidden="true" />
            </a>
            <Link
              to={switchLocalePath(pathname, target)}
              hrefLang={target}
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              {localeNames[target]}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
