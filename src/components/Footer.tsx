import { Link } from "react-router-dom";
import { Mail, Instagram, Youtube, Linkedin } from "lucide-react";
import {
  WHATSAPP_LINK,
  INSTAGRAM_LINK,
  YOUTUBE_LINK,
  LINKEDIN_LINK,
  CONTACT_EMAIL,
} from "@/lib/links";
import { useCopy } from "@/i18n/copy";
import { useLocale } from "@/i18n/locale";
import { existsIn, pathFor } from "@/i18n/routes";

const Footer = () => {
  const c = useCopy();
  const locale = useLocale();
  // Impressum und Datenschutz gibt es nur auf Deutsch. Der Link führt trotzdem
  // dorthin – der Hinweis daneben sagt vorher, was einen erwartet.
  const germanOnly = (key: "imprint" | "privacy") =>
    existsIn(key, locale) ? "" : ` ${c.footer.germanOnly}`;

  return (
    <footer className="gradient-psychedelic py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
            >
              <Mail size={16} />
              {CONTACT_EMAIL}
            </a>
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
            >
              <Instagram size={16} />
              @psng.info
            </a>
            <a
              href={YOUTUBE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
            >
              <Youtube size={16} />
              YouTube
            </a>
            <a
              href={LINKEDIN_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary-foreground text-primary font-heading font-medium text-sm hover:opacity-90 transition-opacity"
            >
              {c.footer.joinWhatsapp}
            </a>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-4">
              <Link
                to={pathFor("imprint", locale)}
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-xs font-heading"
              >
                {c.footer.imprint}
                {germanOnly("imprint")}
              </Link>
              <Link
                to={pathFor("privacy", locale)}
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-xs font-heading"
              >
                {c.footer.privacy}
                {germanOnly("privacy")}
              </Link>
              <Link
                to={pathFor("guide", locale)}
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-xs font-heading"
              >
                {c.footer.guide}
              </Link>
              <Link
                to={pathFor("codeOfConduct", locale)}
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-xs font-heading"
              >
                {c.footer.codeOfConduct}
              </Link>
            </div>
            <p className="text-primary-foreground/50 text-xs font-heading">
              © {new Date().getFullYear()} {c.footer.rights}
            </p>
            <p className="text-primary-foreground/50 text-xs font-heading mt-2">
              {c.footer.thanks}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
