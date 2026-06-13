import { Link } from "react-router-dom";
import { Mail, Instagram, Youtube, Linkedin } from "lucide-react";

const whatsappLink = "https://chat.whatsapp.com/LBUA3UpzOV9BW1v59EZK8w?mode=gi_t";

const Footer = () => {
  return (
    <footer className="gradient-psychedelic py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <a
              href="mailto:kontakt@psng.info"
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
            >
              <Mail size={16} />
              kontakt@psng.info
            </a>
            <a
              href="https://www.instagram.com/psng.info/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
            >
              <Instagram size={16} />
              @psng.info
            </a>
            <a
              href="https://www.youtube.com/channel/UCMHHH4dOREJTJF_ySpgV7mA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
            >
              <Youtube size={16} />
              YouTube
            </a>
            <a
              href="https://www.linkedin.com/company/111432265"
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
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary-foreground text-primary font-heading font-medium text-sm hover:opacity-90 transition-opacity"
            >
              WhatsApp-Community beitreten
            </a>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-4">
              <Link
                to="/impressum"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-xs font-heading"
              >
                Impressum
              </Link>
              <Link
                to="/datenschutz"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-xs font-heading"
              >
                Datenschutz
              </Link>
              <Link
                to="/code-of-conduct"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-xs font-heading"
              >
                Code of Conduct
              </Link>
            </div>
            <p className="text-primary-foreground/50 text-xs font-heading">
              © {new Date().getFullYear()} Psychedelic Student Network Germany
              (PSNG). Alle Rechte vorbehalten.
            </p>
            <p className="text-transparent text-xs font-heading mt-2">
              Mit Dank an David Frank aus Basel.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
