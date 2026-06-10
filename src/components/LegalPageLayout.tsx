import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface LegalPageLayoutProps {
  title: string;
  children: ReactNode;
}

const LegalPageLayout = ({ title, children }: LegalPageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-32 pb-24 md:pt-40">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-heading text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Zurück zur Startseite
          </Link>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-10">
            {title}
          </h1>
          <div className="prose prose-sm md:prose-base prose-neutral dark:prose-invert max-w-none font-body prose-headings:font-heading prose-a:text-primary">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPageLayout;
