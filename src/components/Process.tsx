import { useEffect, useRef, useState } from "react";
import { processImages, processVideo } from "../data/siteContent";
import { useLanguage } from "../i18n/LanguageContext";

export function Process() {
  const videoPanelRef = useRef<HTMLDivElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const element = videoPanelRef.current;
    if (!element || shouldLoadVideo) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "420px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldLoadVideo]);

  return (
    <section className="process section-shell reveal" id="processo">
      <div className="section-heading">
        <span className="section-label">{t.process.label}</span>
        <h2>{t.process.heading}</h2>
      </div>
      <div className="process-visual process-visual-rich">
        <div className="process-video-panel" ref={videoPanelRef}>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster={processVideo.poster}
            aria-label={t.process.videoAlt}
          >
            {shouldLoadVideo && <source src={processVideo.src} type="video/mp4" />}
          </video>
          <div className="process-video-overlay">
            <span>{t.process.videoOverlay.label}</span>
            <strong>{t.process.videoOverlay.text}</strong>
          </div>
        </div>
        <div className="process-motion-panel">
          <img src="/assets/process-motion.svg" alt={t.process.svgAlt} loading="lazy" />
        </div>
      </div>
      <div className="timeline">
        {t.process.steps.map((step, index) => (
          <article className="timeline-item reveal" key={step.title}>
            <img
              className="timeline-thumb"
              src={processImages[index]}
              alt={t.process.imageAlts[index]}
              loading="lazy"
              decoding="async"
            />
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
