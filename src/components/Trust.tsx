import { trustPoints } from "../data/siteContent";

export function Trust() {
  return (
    <section className="trust section-shell reveal">
      <div className="section-heading is-split">
        <span className="section-label">Confiança</span>
        <h2>Mais bonito, mais útil e mais fácil de vender.</h2>
      </div>
      <div className="trust-grid">
        <div className="trust-quote">
          <p>
            A Mionga cria presença digital com método, linguagem simples e foco em resultado.
          </p>
          <div className="trust-proof-card">
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1000&q=80"
              alt="Pequena equipa a trabalhar numa estratégia digital"
              loading="lazy"
              decoding="async"
            />
            <div>
              <span>Presença digital com método</span>
              <h3>Design, conteúdo e automações a trabalhar no mesmo sentido.</h3>
            </div>
          </div>
        </div>
        <div className="trust-list">
          <div className="trust-image">
            <img
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=900&q=80"
              alt="Reunião com pequeno negócio para melhorar presença online"
              loading="lazy"
              decoding="async"
            />
          </div>
          {trustPoints.map((point) => (
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
