import {
  CalendarDays,
  Clock3,
  Droplets,
  Scissors,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type HeroRitualId = "corte" | "barba";

export type Service = {
  title: string;
  copy: string;
  price: string;
  time: string;
  image: string;
  previewImage: string;
  previewCopy: string;
};

export type Barber = {
  name: string;
  role: string;
  note: string;
  image: string;
  signature: string;
};

export type Testimonial = {
  text: string;
  name: string;
  jobtitle: string;
  image: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  title: string;
};

export type HeroFeatureMetric = {
  label: string;
  value: number;
  icon: LucideIcon;
};

export type HeroRitual = {
  id: HeroRitualId;
  label: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  imageAlt: string;
  accent: string;
  glow: string;
  ring: string;
  stats: {
    time: string;
    price: string;
  };
  features: HeroFeatureMetric[];
};

export const barbershopConfig = {
  brand: {
    name: "Atelier Navalha",
    district: "Chiado",
    city: "Lisboa",
    tagline: "Barbearia de luxo em Lisboa",
  },
  images: {
    hero:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=2400&q=86",
    cut:
      "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?auto=format&fit=crop&w=1800&q=82",
    lisbon:
      "https://images.unsplash.com/photo-1592813789973-f43639d3609e?auto=format&fit=crop&w=2200&q=84",
    ritualVideo:
      "https://upload.wikimedia.org/wikipedia/commons/transcoded/8/8d/Barber.webm/Barber.webm.480p.vp9.webm",
  },
  navItems: [
    ["Serviços", "#servicos"],
    ["Preços", "#precos"],
    ["Barbeiros", "#barbeiros"],
    ["Galeria", "#galeria"],
    ["Testemunhos", "#testemunhos"],
    ["Contacto", "#contacto"],
  ] as const,
  heroRituals: {
    corte: {
      id: "corte",
      label: "Corte",
      title: "Corte de assinatura",
      eyebrow: "Barbearia de luxo em Lisboa",
      description:
        "Diagnóstico rápido, tesoura precisa e acabamento natural para homens que querem presença sem excesso.",
      image:
        "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?auto=format&fit=crop&w=1800&q=86",
      imageAlt: "Barbeiro a finalizar um corte masculino premium",
      accent: "oklch(0.78 0.095 79)",
      glow: "bg-[var(--gold)]",
      ring: "border-[var(--gold)]/32",
      stats: {
        time: "45 min",
        price: "42€",
      },
      features: [
        { label: "Precisão", value: 96, icon: Scissors },
        { label: "Textura", value: 88, icon: Sparkles },
      ],
    },
    barba: {
      id: "barba",
      label: "Barba",
      title: "Barba à navalha",
      eyebrow: "Ritual privado no Chiado",
      description:
        "Toalha quente, preparação da pele e lâmina tradicional para um contorno limpo, calmo e duradouro.",
      image:
        "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1800&q=86",
      imageAlt: "Ritual de barba com toalha quente e navalha",
      accent: "oklch(0.62 0.08 176)",
      glow: "bg-emerald-400",
      ring: "border-emerald-300/30",
      stats: {
        time: "35 min",
        price: "36€",
      },
      features: [
        { label: "Conforto", value: 92, icon: Droplets },
        { label: "Contorno", value: 94, icon: ShieldCheck },
      ],
    },
  } satisfies Record<HeroRitualId, HeroRitual>,
  heroProofItems: [
    { label: "Agenda", value: "Terça a sábado", icon: CalendarDays },
    { label: "Horário", value: "10h00 às 20h00", icon: Clock3 },
    { label: "Morada", value: "Rua do Alecrim, Chiado", icon: Scissors },
  ],
  ritual: {
    eyebrow: "O ritual",
    title: "Menos pressa.",
    titleMuted: "Mais presença.",
    paragraphs: [
      "O Atelier Navalha nasceu para ser o oposto da barbearia de passagem. Aqui cada marcação tem margem, a música fica baixa, a luz é quente e a conversa acontece só quando faz sentido.",
      "Trabalhamos com histórico de corte, diagnóstico de rosto e produtos escolhidos para clima atlântico. O resultado é uma rotina simples: sais composto, sem parecer produzido.",
    ],
    stats: [
      ["45 min", "Tempo real por sessão"],
      ["Rosto", "Diagnóstico antes da lâmina"],
      ["Lisboa", "Produtos para clima atlântico"],
    ],
    videoLabel: "Filme ambiente",
    privateTitle: "Sessão privada",
    privateCopy:
      "Cadeira reservada, toalha quente e acabamento revisto à luz natural antes de saíres.",
    technicalLabel: "Ritual técnico",
  },
  services: [
    {
      title: "Corte de assinatura",
      copy: "Consulta rápida, execução precisa e styling final pensado para o teu ritmo de Lisboa.",
      price: "42€",
      time: "45 min",
      image:
        "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?auto=format&fit=crop&w=1800&q=82",
      previewImage:
        "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?auto=format&fit=crop&w=1800&q=84",
      previewCopy:
        "Um corte estruturado, limpo e adaptado ao formato do rosto, pensado para manter presença vários dias depois da marcação.",
    },
    {
      title: "Barba à navalha",
      copy: "Toalha quente, preparação da pele, lâmina tradicional e bálsamo de acabamento.",
      price: "36€",
      time: "35 min",
      image:
        "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1400&q=82",
      previewImage:
        "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1800&q=84",
      previewCopy:
        "Barba desenhada à navalha, pele preparada com toalha quente e acabamento discreto para um contorno preciso.",
    },
    {
      title: "Ritual Chiado",
      copy: "Corte, barba, massagem facial breve e bebida da casa numa sala reservada.",
      price: "92€",
      time: "90 min",
      image:
        "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=2400&q=86",
      previewImage:
        "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=2200&q=86",
      previewCopy:
        "A experiência completa: corte, barba, pausa e detalhe, numa cadeira reservada com ritmo calmo e atenção total.",
    },
    {
      title: "Manutenção privada",
      copy: "Sessão discreta para clientes recorrentes, com histórico de corte e preferência guardada.",
      price: "68€",
      time: "60 min",
      image:
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1400&q=82",
      previewImage:
        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1800&q=84",
      previewCopy:
        "Manutenção recorrente para preservar a linha do corte, controlar volume e manter a assinatura pessoal consistente.",
    },
  ] satisfies Service[],
  pricing: [
    ["Corte sénior", "42€"],
    ["Corte e barba", "68€"],
    ["Barba à navalha", "36€"],
    ["Ritual Chiado", "92€"],
    ["Camuflagem de grisalhos", "48€"],
    ["Plano mensal privado", "145€"],
  ],
  barbers: [
    {
      name: "Afonso Valente",
      role: "Director de corte",
      note: "Especialista em tesoura clássica, degradés limpos e silhuetas executivas.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1400&q=82",
      signature: "Tesoura clássica",
    },
    {
      name: "Duarte Sequeira",
      role: "Mestre barbeiro",
      note: "Navalha tradicional, pele sensível e rituais de barba com acabamento impecável.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1400&q=82",
      signature: "Barba à navalha",
    },
    {
      name: "Tomás Roque",
      role: "Stylist sénior",
      note: "Textura natural, cabelos médios e aconselhamento para rotina diária sem esforço.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1400&q=82",
      signature: "Textura natural",
    },
  ] satisfies Barber[],
  galleryImages: [
    {
      src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=2400&q=86",
      alt: "Interior de barbearia premium com luz quente",
      title: "Sala principal",
    },
    {
      src: "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?auto=format&fit=crop&w=1800&q=82",
      alt: "Acabamento de corte masculino com máquina",
      title: "Corte técnico",
    },
    {
      src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1400&q=82",
      alt: "Homem de fato num ambiente urbano premium",
      title: "Estilo executivo",
    },
    {
      src: "https://images.unsplash.com/photo-1592813789973-f43639d3609e?auto=format&fit=crop&w=2200&q=84",
      alt: "Lisboa ao anoitecer vista sobre as colinas",
      title: "Lisboa ao fim do dia",
    },
    {
      src: "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1400&q=82",
      alt: "Retrato masculino com estilo contemporâneo",
      title: "Retrato final",
    },
    {
      src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1400&q=82",
      alt: "Ritual de barba com toalha quente e navalha",
      title: "Barba à navalha",
    },
    {
      src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1400&q=82",
      alt: "Barbearia clássica com cadeira e espelho",
      title: "Cadeira reservada",
    },
    {
      src: "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?auto=format&fit=crop&w=1400&q=82",
      alt: "Barbeiro a trabalhar corte com tesoura",
      title: "Tesoura e forma",
    },
    {
      src: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1400&q=82",
      alt: "Barbeiro a finalizar barba com detalhe",
      title: "Detalhe de lâmina",
    },
    {
      src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1400&q=82",
      alt: "Interior de salão premium com luz suave",
      title: "Luz de atelier",
    },
  ] satisfies GalleryImage[],
  testimonials: [
    {
      text:
        "Parece mais uma suite privada de hotel do que uma barbearia. O corte dura semanas sem perder forma.",
      name: "Miguel A.",
      jobtitle: "Empresário, Príncipe Real",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    },
    {
      text:
        "Marcação pontual, ambiente discreto e uma atenção ao detalhe que raramente se encontra em Lisboa.",
      name: "João P.",
      jobtitle: "Arquitecto, Chiado",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    },
    {
      text:
        "Levei um cliente estrangeiro antes de um jantar. Saiu de lá a perguntar se podia marcar mensalmente.",
      name: "Rui M.",
      jobtitle: "Consultor, Avenida",
      image:
        "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=80",
    },
    {
      text:
        "A barba ficou impecável e a pele não irritou. É raro encontrar este cuidado sem parecer forçado.",
      name: "Tiago F.",
      jobtitle: "Advogado, Saldanha",
      image:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=600&q=80",
    },
    {
      text:
        "O espaço tem uma calma muito própria. Entro apressado, saio composto e com a agenda outra vez no lugar.",
      name: "André L.",
      jobtitle: "Director criativo, Santos",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    },
    {
      text:
        "Não é só corte. É diagnóstico, detalhe e memória do que funciona. Voltei porque acertaram logo na primeira visita.",
      name: "Nuno C.",
      jobtitle: "Hotelaria, Avenida",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=80",
    },
  ] satisfies Testimonial[],
  contact: {
    addressTitle: "Rua do Alecrim, 41",
    addressCopy:
      "Chiado, 1200-014 Lisboa. A dois minutos do Cais do Sodré, com entrada discreta pelo piso térreo.",
    phone: "+351 213 842 119",
    email: "reservas@ateliernavalha.pt",
    hours: [
      "Terça a sexta, 10h00 às 20h00",
      "Sábado, 09h30 às 18h00",
      "Domingo e segunda encerrado",
    ],
    mapSrc:
      "https://www.openstreetmap.org/export/embed.html?bbox=-9.1474%2C38.7067%2C-9.1397%2C38.7111&layer=mapnik&marker=38.7089%2C-9.1434",
    mapTitle: "Mapa para o Atelier Navalha no Chiado, Lisboa",
    mapCardCopy:
      "Chiado, junto à Rua do Alecrim. Marcação privada, entrada discreta, experiência sem pressa.",
  },
  booking: {
    responseCopy: "Resposta em menos de 2 horas úteis.",
    hoursCopy: "Terça a sábado, 10h00 às 20h00.",
    note:
      "Confirmamos a disponibilidade por chamada ou WhatsApp. Para marcações no próprio dia, recomendamos contacto telefónico.",
    timeOptions: ["10h00", "12h30", "15h00", "18h30"],
  },
} as const;
