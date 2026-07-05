import { whatsappLink, serviceImages, businessSolutionImages } from "../data/siteContent";
import { MagneticButton } from "./ui/motion-footer";
import { useLanguage } from "../i18n/LanguageContext";

export function BusinessSolutions() {
  const { t } = useLanguage();

  return (
    <section className="solutions section-shell reveal" id="solucoes">
      <div className="section-heading is-split">
        <span className="section-label">{t.services.label}</span>
        <div>
          <h2>{t.services.heading}</h2>
          <p>{t.services.description}</p>
        </div>
      </div>

      <div className="service-summary-grid" aria-label="Serviços da Mionga">
        {t.services.items.map((service) => (
          <article className="service-summary-card" key={service.title}>
            <span>{service.number}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>

      <div className="section-heading solutions-subheading">
        <span className="section-label">{t.services.businessLabel}</span>
        <h2>{t.services.businessHeading}</h2>
      </div>

      <div className="solution-grid">
        {t.services.solutions.map((solution, index) => (
          <article className="solution-card reveal" key={solution.type}>
            <div className="solution-media">
              <img
                src={businessSolutionImages[index]}
                alt={`${t.services.solutionAlt} ${solution.type}`}
                loading="lazy"
                decoding="async"
              />
              <div className={`solution-visual solution-visual-${index + 1}`}>
                <span>{solution.type}</span>
                <b>{solution.tags[0]}</b>
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="solution-copy">
              <h3>{solution.type}</h3>
              <p>{solution.headline}</p>
              <div className="tag-row">
                {solution.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="inline-cta">
        <h3>{t.services.cta.heading}</h3>
        <MagneticButton as="a" className="button" href={whatsappLink(t.whatsapp.default)} target="_blank" rel="noreferrer">
          {t.services.cta.button}
        </MagneticButton>
      </div>
    </section>
  );
}
