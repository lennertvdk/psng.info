import heroBg from "@/assets/hero-bg.png";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PresenceSection from "@/components/PresenceSection";
import EventsSection from "@/components/EventsSection";
import GuideSection from "@/components/GuideSection";
import FAQSection from "@/components/FAQSection";
import TeamSection from "@/components/TeamSection";
import PartnersSection from "@/components/PartnersSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Highlights from "@/components/Highlights";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute top-[210vh] left-0 right-0 bottom-0 -z-20 bg-background/50" />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <PresenceSection />
      <Highlights />
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