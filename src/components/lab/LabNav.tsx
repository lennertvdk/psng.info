import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Languages, Menu, X } from "lucide-react";
import psngLogo from "@/assets/PSNG-Logo-centered.webp";
import { WHATSAPP_LINK } from "@/lib/links";
import { useCopy } from "@/i18n/copy";
import { locales, localeNames, localeShortNames, useLocale } from "@/i18n/locale";
import { pathFor } from "@/i18n/routes";
import { LAB_ANCHORS, LAB_PATH, homeSection } from "./shared";

const MOBILE_MENU_ID = "lab-mobile-nav";

/**
 * Dieselbe Sprachwahl wie in der Navbar, nur mit festen Zielen: Der
 * Umschalter dort kennt /lab nicht (siehe shared.ts) und führte auf die
 * Startseite der anderen Sprache.
 */
function LabLanguageSwitch() {
  const current = useLocale();
  const c = useCopy();

  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-muted p-0.5">
      <Languages size={13} aria-hidden="true" className="ml-1.5 shrink-0 text-muted-foreground" />
      <div role="group" aria-label={c.nav.languageLabel} className="inline-flex">
        {locales.map((l) => {
          const active = l === current;
          return (
            <Link
              key={l}
              to={LAB_PATH[l]}
              hrefLang={l}
              aria-label={localeNames[l]}
              aria-current={active ? "true" : undefined}
              className={`rounded-full px-2.5 py-1 font-heading text-xs font-medium transition-colors ${
                active ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {localeShortNames[l]}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Vier Ziele statt sieben, und der Beitritt als einziger Knopf. Was die
 * Startseite als eigene Sektionen hat und die Vorschau nicht (FAQ, Team,
 * Kontakt), erreicht man über „Über uns" und den Footer.
 */
const LabNav = () => {
  const [open, setOpen] = useState(false);
  const c = useCopy();
  const locale = useLocale();

  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const close = () => mq.matches && setOpen(false);
    close();
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, [open]);

  const links = [
    { key: "events", label: c.lab.nav.events, href: `#${LAB_ANCHORS.agenda}` },
    { key: "groups", label: c.lab.nav.groups, href: `#${LAB_ANCHORS.groups}` },
    { key: "guide", label: c.lab.nav.guide, to: pathFor("guide", locale) },
    { key: "about", label: c.lab.nav.about, to: homeSection(locale, "uber-uns") },
  ];

  const linkClass =
    "font-heading text-sm font-medium text-muted-foreground transition-colors hover:text-primary";

  const renderLink = (link: (typeof links)[number], mobile = false) => {
    const className = mobile ? `${linkClass} py-1.5` : linkClass;
    const onClick = mobile ? () => setOpen(false) : undefined;
    return link.to ? (
      <Link key={link.key} to={link.to} className={className} onClick={onClick}>
        {link.label}
      </Link>
    ) : (
      <a key={link.key} href={link.href} className={className} onClick={onClick}>
        {link.label}
      </a>
    );
  };

  return (
    <nav className="glass fixed inset-x-0 top-0 z-50">
      <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          to={LAB_PATH[locale]}
          className="flex shrink-0 items-center gap-3 font-heading text-xl font-bold tracking-tight text-primary"
        >
          <img
            src={psngLogo}
            alt="PSNG Logo"
            width={36}
            height={36}
            decoding="async"
            className="h-9 w-9 rounded-full border border-border"
          />
          <span className="hidden sm:inline">PSNG</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => renderLink(link))}
          <LabLanguageSwitch />
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg gradient-psychedelic px-4 py-2 font-heading text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {c.hero.joinWhatsapp}
          </a>
        </div>

        {/* Auf dem Handy bleibt der Beitritt als Knopf stehen, statt im Menü
            zu verschwinden – er ist der eine Schritt, den die Seite auslösen
            will. „WhatsApp" allein, weil der volle Text die Leiste sprengt;
            das ausgeschriebene Ziel steht im aria-label. */}
        <div className="flex items-center gap-2 md:hidden">
          <LabLanguageSwitch />
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={c.hero.joinWhatsapp}
            className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-lg gradient-psychedelic px-3 font-heading text-xs font-medium text-primary-foreground"
          >
            WhatsApp
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center text-primary"
            onClick={() => setOpen(!open)}
            aria-label={c.nav.menuToggle}
            aria-expanded={open}
            aria-controls={MOBILE_MENU_ID}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div id={MOBILE_MENU_ID} className="glass md:hidden">
          <div className="flex flex-col gap-2 px-6 py-4">
            {links.map((link) => renderLink(link, true))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default LabNav;
