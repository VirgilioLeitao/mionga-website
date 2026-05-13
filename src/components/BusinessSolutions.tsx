import { businessSolutions, portfolioExamples, services, whatsappLink } from "../data/siteContent";
import { MagneticButton } from "./ui/motion-footer";

export function BusinessSolutions() {
  return (
    <section className="solutions section-shell reveal" id="solucoes">
      <div className="section-heading is-split">
        <span className="section-label">Soluções digitais</span>
        <div>
          <h2>Design claro, tecnologia simples e uma presença digital que gera contactos.</h2>
          <p>
            A Mionga ajuda pequenos negócios em Portugal a sair do improviso digital com websites,
            redes sociais e automações proporcionais ao tamanho do negócio.
          </p>
        </div>
      </div>

      <div className="service-summary-grid" aria-label="Serviços da Mionga">
        {services.map((service) => (
          <article className="service-summary-card" key={service.title}>
            <span>{service.number}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>

      <div className="section-heading solutions-subheading">
        <span className="section-label">Por tipo de negócio</span>
        <h2>Experiências pensadas para negócios que precisam de clientes, não de decoração.</h2>
      </div>

      <div className="solution-grid">
        {businessSolutions.map((solution, index) => (
          <article className="solution-card reveal" key={solution.type}>
            <div className="solution-media">
              <img
                src={solution.imageUrl}
                alt={`Solução digital para ${solution.type}`}
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

      <div className="portfolio-strip reveal" aria-label="Exemplos de portfolio da Mionga">
        <div className="portfolio-strip-copy">
          <span className="section-label">Portfolio / exemplo</span>
          <h3>Um template premium pronto para mostrar o nível visual que um negócio local pode ter.</h3>
          <p>
            Este exemplo foi criado para barbearias que querem parecer tão profissionais online
            como são na cadeira: marca forte, fotografias, serviços claros e marcação simples.
          </p>
        </div>

        {portfolioExamples.map((example) => (
          <a
            className="portfolio-example-card"
            href={example.href}
            key={example.title}
            rel="noreferrer"
            target="_blank"
          >
            <img src={example.imageUrl} alt={`Exemplo de website ${example.title}`} loading="lazy" decoding="async" />
            <div>
              <span>{example.type}</span>
              <h4>{example.title}</h4>
              <p>{example.description}</p>
              <div className="tag-row">
                {example.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="inline-cta">
        <h3>Pronto para aparecer melhor online?</h3>
        <MagneticButton as="a" className="button" href={whatsappLink()} target="_blank" rel="noreferrer">
          Vamos falar
        </MagneticButton>
      </div>
    </section>
  );
}
