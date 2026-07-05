import { trustImages } from "../data/siteContent";
import { useLanguage } from "../i18n/LanguageContext";

export function Trust() {
  const { t } = useLanguage();

  return (
    <section className="trust section-shell reveal">
      <div className="section-heading is-split">
        <span className="section-label">{t.trust.label}</span>
        <h2>{t.trust.heading}</h2>
      </div>
      <div className="trust-grid">
        <div className="trust-quote">
          <p>{t.trust.quote}</p>
          <div className="trust-proof-card">
            <img
              src={trustImages.proof}
              alt={t.trust.proofImageAlt}
              loading="lazy"
              decoding="async"
            />
            <div>
              <span>{t.trust.proofCard.label}</span>
              <h3>{t.trust.proofCard.heading}</h3>
            </div>
          </div>
        </div>
        <div className="trust-list">
          <div className="trust-image">
            <img
              src={trustImages.team}
              alt={t.trust.trustImageAlt}
              loading="lazy"
              decoding="async"
            />
          </div>
          {t.trust.points.map((point) => (
            <div className="trust-point" key={point}>
              <span />
              <p>{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
