import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import psngLogo from "@/assets/PSNG-Logo-centered.png";

const navLinks = [
  { label: "Über uns", href: "#uber-uns" },
  { label: "Events", href: "#events" },
  { label: "Aufnahmen", href: "#aufnahmen" },
  { label: "Leitfaden", href: "#leitfaden" },
  { label: "FAQ", href: "#faq" },
  { label: "Team", href: "#team" },
  { label: "Kooperation", href: "#kooperation" },
  { label: "Kontakt", href: "#kontakt" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const scrollY = useMotionValue(0);

  useEffect(() => {
    const update = () => scrollY.set(window.scrollY);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [scrollY]);

  const logoOpacity = useTransform(scrollY, [300, 400], [0, 1]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <a href="#" className="flex items-center gap-3 font-heading text-xl font-bold tracking-tight text-primary">
          <motion.img
            src={psngLogo}
            alt="PSNG Logo"
            style={{ opacity: logoOpacity }}
            className="h-9 w-9 rounded-full border border-border"
          />
          <span>PSNG</span>
        </a>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-heading text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <button
          className="md:hidden text-primary"
          onClick={() => setOpen(!open)}
          aria-label="Menü umschalten"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden glass"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-heading text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
