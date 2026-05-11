import { whatsappLink } from "../data/siteContent";
import { MagneticButton } from "./ui/motion-footer";

export function FinalCTA() {
  return (
    <section className="final-cta section-shell reveal" id="contacto">
      <p>Vamos dar ao teu negócio uma presença digital à altura.</p>
      <h2>Queres um website que pareça profissional e gere contactos?</h2>
      <MagneticButton
        as="a"
        className="button button-large button-invert"
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
      >
        Falar no WhatsApp
      </MagneticButton>
    </section>
  );
}
