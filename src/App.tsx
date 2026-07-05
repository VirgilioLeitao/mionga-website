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
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext";
import { contact } from "./data/siteContent";

function SeoUpdater() {
  const { language, t } = useLanguage();

  useEffect(() => {
    document.title = t.meta.title;

    const setMeta = (attr: string, key: string, value: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.content = value;
    };

    setMeta("name", "description", t.meta.description);
    setMeta("name", "keywords", t.meta.keywords);
    setMeta("property", "og:title", t.meta.ogTitle);
    setMeta("property", "og:description", t.meta.ogDescription);
    setMeta("property", "og:locale", language === "en" ? "en_GB" : "pt_PT");
    setMeta("name", "twitter:title", t.meta.twitterTitle);
    setMeta("name", "twitter:description", t.meta.twitterDescription);

    // Update JSON-LD
    const scriptId = "mionga-jsonld";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Mionga",
      url: "https://www.mionga.com/",
      logo: "https://www.mionga.com/assets/logo.svg",
      areaServed: {
        "@type": "Country",
        name: "Portugal",
      },
      description: t.meta.jsonLd.description,
      sameAs: [contact.instagramUrl],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: `+${contact.whatsappNumber.replace(/\D/g, "")}`,
        contactType: "sales",
        availableLanguage: language === "en" ? ["English", "Portuguese"] : ["Portuguese"],
      },
      serviceType: t.meta.jsonLd.services,
    });
  }, [language, t]);

  return null;
}

function AppContent() {
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
      <SeoUpdater />
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

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
