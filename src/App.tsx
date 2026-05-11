import { useEffect } from "react";
import { Header } from "./components/Header";
import { GlowyWavesHero } from "@/components/ui/glowy-waves-hero-shadcnui";
import { BusinessSolutions } from "./components/BusinessSolutions";
import { Process } from "./components/Process";
import { Trust } from "./components/Trust";
import { FinalCTA } from "./components/FinalCTA";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { BackToTop } from "./components/BackToTop";

export default function App() {
  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      document.documentElement.style.setProperty("--scroll-progress", `${progress}`);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.16 },
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <Header />
      <main>
        <GlowyWavesHero />
        <BusinessSolutions />
        <Process />
        <Trust />
        <FinalCTA />
      </main>
      <CinematicFooter />
      <BackToTop />
      <FloatingWhatsApp />
    </>
  );
}
