import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToHash from "@/components/ScrollToHash";
import Index from "./pages/Index";

// Die Unterseiten sind reine Textseiten und werden von den meisten Besuchern
// nie geöffnet – sie gehören nicht in den Bundle der Startseite.
const Impressum = lazy(() => import("./pages/Impressum"));
const Datenschutz = lazy(() => import("./pages/Datenschutz"));
const CodeOfConduct = lazy(() => import("./pages/CodeOfConduct"));
const Leitfaden = lazy(() => import("./pages/Leitfaden"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  // reducedMotion="user": Wer Animationen systemweit abgeschaltet hat, sieht die
  // Sektionen sofort in ihrem Endzustand statt auf opacity:0 zu warten.
  <MotionConfig reducedMotion="user">
    <TooltipProvider>
      <BrowserRouter>
        <ScrollToHash />
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/code-of-conduct" element={<CodeOfConduct />} />
            <Route path="/leitfaden" element={<Leitfaden />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </MotionConfig>
);

export default App;
