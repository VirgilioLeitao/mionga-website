export const contact = {
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "351920807520",
  instagramUrl: import.meta.env.VITE_INSTAGRAM_URL || "https://www.instagram.com/mionga__",
  linkedinUrl: import.meta.env.VITE_LINKEDIN_URL || "",
  email: "hello@mionga.com",
};

export const navItems = [
  { label: "Início", href: "#top" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Processo", href: "#processo" },
  { label: "Contacto", href: "#contacto" },
];

export const services = [
  {
    number: "01",
    title: "Websites",
    description:
      "Sites rápidos, bonitos e pensados para transformar visitantes em contactos reais.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    details: ["Landing pages", "Sites institucionais", "SEO técnico", "Manutenção"],
  },
  {
    number: "02",
    title: "Redes sociais",
    description:
      "Gestão visual e consistente para negócios que precisam aparecer melhor todos os dias.",
    imageUrl:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=900&q=80",
    details: ["Calendário mensal", "Posts e stories", "Identidade visual", "Relatórios"],
  },
  {
    number: "03",
    title: "Automações",
    description:
      "Processos simples para poupar tempo, responder mais rápido e organizar pedidos.",
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    details: ["WhatsApp e leads", "Formulários", "CRM simples", "Fluxos internos"],
  },
];

export const businessSolutions = [
  {
    type: "Restaurantes",
    headline: "Menu online, reservas e pedidos sem confusão.",
    tags: ["Website", "WhatsApp", "Google"],
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
  },
  {
    type: "Salões",
    headline: "Uma presença digital cuidada para marcar mais serviços.",
    tags: ["Redes sociais", "Agenda", "Conteúdo"],
    imageUrl:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
  },
  {
    type: "Clínicas",
    headline: "Informação clara, credibilidade e contactos bem encaminhados.",
    tags: ["Website", "SEO", "Formulários"],
    imageUrl:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80",
  },
  {
    type: "Lojas locais",
    headline: "Produtos, campanhas e mensagens automatizadas num só fluxo.",
    tags: ["Montra digital", "Automação", "Social"],
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
  },
];

export const portfolioExamples = [
  {
    type: "Website premium",
    title: "Atelier Navalha",
    description:
      "Template premium para barbearias, com marcação, galeria, serviços, mapa e experiência visual de alto nível.",
    href: "https://atelier-navalha-premium-template.vercel.app",
    imageUrl:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1400&q=84",
    tags: ["Next.js", "Barbearia", "Portfolio"],
  },
];

export const processSteps = [
  {
    title: "Diagnóstico",
    description: "Percebemos o negócio, o público, a oferta e o que precisa gerar resultado.",
  },
  {
    title: "Design",
    description: "Criamos uma direção visual clara, moderna e alinhada com a marca.",
  },
  {
    title: "Desenvolvimento",
    description: "Construímos uma experiência rápida, responsiva e preparada para crescer.",
  },
  {
    title: "Lançamento",
    description: "Colocamos tudo online com testes, ajustes finais e ligações essenciais.",
  },
  {
    title: "Suporte",
    description: "Acompanhamos melhorias, conteúdo, manutenção e novas necessidades.",
  },
];

export const trustPoints = [
  "Falamos simples, sem complicar tecnologia.",
  "Pensamos em vendas, contactos e tempo poupado.",
  "Criamos soluções proporcionais ao tamanho do negócio.",
  "Trabalhamos com proximidade e resposta rápida.",
];

export function whatsappLink(message = "Olá Mionga, quero criar um website para o meu negócio.") {
  const cleanNumber = contact.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
