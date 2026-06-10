import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import KickoffSection from "@/components/KickoffSection";
import AboutSection from "@/components/AboutSection";
import PresenceSection from "@/components/PresenceSection";
import EventsSection from "@/components/EventsSection";
import GuideSection from "@/components/GuideSection";
import FAQSection from "@/components/FAQSection";
import TeamSection from "@/components/TeamSection";
import PartnersSection from "@/components/PartnersSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <KickoffSection />
      <AboutSection />
      <PresenceSection />
      <EventsSection />
      <GuideSection />
      <FAQSection />
      <TeamSection />
      <PartnersSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;