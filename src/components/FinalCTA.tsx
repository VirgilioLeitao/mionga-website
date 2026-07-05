import { whatsappLink } from "../data/siteContent";
import { MagneticButton } from "./ui/motion-footer";
import { useLanguage } from "../i18n/LanguageContext";

export function FinalCTA() {
  const { t } = useLanguage();

  return (
    <section className="final-cta section-shell reveal" id="contacto">
      <p>{t.finalCta.subtitle}</p>
      <h2>{t.finalCta.heading}</h2>
      <MagneticButton
        as="a"
        className="button button-large button-invert"
        href={whatsappLink(t.whatsapp.default)}
        target="_blank"
        rel="noreferrer"
      >
        {t.finalCta.button}
      </MagneticButton>
    </section>
  );
}
