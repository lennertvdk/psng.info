import { Mail, Instagram, Youtube } from "lucide-react";

const whatsappLink = "https://chat.whatsapp.com/LBUA3UpzOV9BW1v59EZK8w?mode=gi_t";

const Footer = () => {
  return (
    <footer id="contact" className="gradient-psychedelic py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Kontakt aufnehmen
          </h2>
          <p className="text-primary-foreground/80 mb-8 font-body">
            Ob Studierende*r, Forscher*in oder einfach neugierig – wir freuen
            uns von dir zu hören!
          </p>
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
            <p className="text-primary-foreground/50 text-xs font-heading">
              © {new Date().getFullYear()} Psychedelic Student Network Germany
              (PSNG). Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
