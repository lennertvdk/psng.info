import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCopy } from "@/i18n/copy";
import { useLocale } from "@/i18n/locale";
import { pathFor } from "@/i18n/routes";

interface LegalPageLayoutProps {
  title: string;
  children: ReactNode;
}

/*
 * Hier stand einmal ein Hinweis „diese Seite gibt es nur auf Deutsch". Er
 * konnte nie erscheinen: /impressum und /datenschutz sind deutsche Pfade, auf
 * ihnen ist die Sprache immer Deutsch. Den Hinweis trägt jetzt der Footer –
 * dort steht er vor dem Klick statt danach, und dort stimmt er auch.
 */
const LegalPageLayout = ({ title, children }: LegalPageLayoutProps) => {
  const c = useCopy();
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-32 pb-24 md:pt-40">
        <div className="max-w-3xl mx-auto">
          <Link
            to={pathFor("home", locale)}
            className="inline-flex items-center gap-2 text-sm font-heading text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            {c.legal.back}
          </Link>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-10">
            {title}
          </h1>
          <div className="prose prose-sm md:prose-base prose-neutral max-w-none font-body prose-headings:font-heading prose-a:text-primary">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPageLayout;
