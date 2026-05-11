import { useEffect, useRef, useState } from "react";
import { processSteps } from "../data/siteContent";

const processImages = [
  {
    src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
    alt: "Reunião de diagnóstico para definir estratégia digital",
  },
  {
    src: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=900&q=80",
    alt: "Mesa de design com wireframes e direção visual",
  },
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    alt: "Desenvolvimento de website em computador portátil",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    alt: "Equipa a preparar lançamento de projeto digital",
  },
  {
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80",
    alt: "Suporte e acompanhamento de projeto digital",
  },
];

const processVideo = {
  src: "https://assets.mixkit.co/videos/32833/32833-720.mp4",
  poster: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
};

export function Process() {
  const videoPanelRef = useRef<HTMLDivElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

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
        <span className="section-label">Processo</span>
        <h2>Um processo direto, com estratégia suficiente para não parecer “só mais um site”.</h2>
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
            aria-label="Equipa a preparar trabalho digital em escritório"
          >
            {shouldLoadVideo && <source src={processVideo.src} type="video/mp4" />}
          </video>
          <div className="process-video-overlay">
            <span>Da ideia ao lançamento</span>
            <strong>Um fluxo claro, visual e orientado para colocar o negócio online.</strong>
          </div>
        </div>
        <div className="process-motion-panel">
          <img src="/assets/process-motion.svg" alt="Animação do processo da Mionga" loading="lazy" />
        </div>
      </div>
      <div className="timeline">
        {processSteps.map((step, index) => (
          <article className="timeline-item reveal" key={step.title}>
            <img
              className="timeline-thumb"
              src={processImages[index].src}
              alt={processImages[index].alt}
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
