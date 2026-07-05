export type Language = "pt" | "en";

export const translations = {
  pt: {
    nav: {
      home: "Início",
      solutions: "Soluções",
      process: "Processo",
      contact: "Contacto",
    },
    menuToggle: {
      open: "Abrir menu",
      close: "Fechar menu",
    },
    hero: {
      badge: "Mionga Digital Studio",
      title: {
        line1: "Websites premium ",
        line2: "para pequenos negócios ",
        line3: "que querem ",
        gradient1: "vender mais ",
        gradient2: "online.",
      },
      subtitle:
        "Criamos websites rápidos, presença social consistente e automações simples para negócios em Portugal que precisam de parecer profissionais e gerar contactos.",
      ctaWhatsapp: "Falar no WhatsApp",
      ctaSolutions: "Ver soluções",
      pills: ["Websites rápidos", "Redes sociais", "Automações simples"],
      stats: [
        { label: "Foco principal", value: "Websites" },
        { label: "Conversão", value: "WhatsApp" },
        { label: "Mercado", value: "Portugal" },
      ],
      cardSeo: {
        title: "SEO e performance",
        text: "Sites preparados para carregar rápido e receber contactos.",
      },
      cardAutomation: {
        title: "Automação útil",
        text: "Fluxos simples para responder mais depressa no dia a dia.",
      },
      ariaLabel: "Hero da Mionga",
    },
    heroGeometric: {
      badge: "Mionga Digital Studio",
      title1: "Pequenos negócios.",
      title2: "Presença digital grande.",
      subtitle:
        "Criamos websites, conteúdos e automações para pequenos negócios em Portugal que querem parecer profissionais, responder mais rápido e vender melhor.",
      ctaWhatsapp: "Falar no WhatsApp",
      ctaSolutions: "Ver soluções",
    },
    services: {
      label: "Soluções digitais",
      heading:
        "Design claro, tecnologia simples e uma presença digital que gera contactos.",
      description:
        "A Mionga ajuda pequenos negócios em Portugal a sair do improviso digital com websites, redes sociais e automações proporcionais ao tamanho do negócio.",
      items: [
        {
          number: "01",
          title: "Websites",
          description:
            "Sites rápidos, bonitos e pensados para transformar visitantes em contactos reais.",
          details: ["Landing pages", "Sites institucionais", "SEO técnico", "Manutenção"],
        },
        {
          number: "02",
          title: "Redes sociais",
          description:
            "Gestão visual e consistente para negócios que precisam aparecer melhor todos os dias.",
          details: ["Calendário mensal", "Posts e stories", "Identidade visual", "Relatórios"],
        },
        {
          number: "03",
          title: "Automações",
          description:
            "Processos simples para poupar tempo, responder mais rápido e organizar pedidos.",
          details: ["WhatsApp e leads", "Formulários", "CRM simples", "Fluxos internos"],
        },
      ],
      businessLabel: "Por tipo de negócio",
      businessHeading:
        "Experiências pensadas para negócios que precisam de clientes, não de decoração.",
      solutions: [
        {
          type: "Restaurantes",
          headline: "Menu online, reservas e pedidos sem confusão.",
          tags: ["Website", "WhatsApp", "Google"],
        },
        {
          type: "Salões",
          headline: "Uma presença digital cuidada para marcar mais serviços.",
          tags: ["Redes sociais", "Agenda", "Conteúdo"],
        },
        {
          type: "Clínicas",
          headline: "Informação clara, credibilidade e contactos bem encaminhados.",
          tags: ["Website", "SEO", "Formulários"],
        },
        {
          type: "Lojas locais",
          headline: "Produtos, campanhas e mensagens automatizadas num só fluxo.",
          tags: ["Montra digital", "Automação", "Social"],
        },
      ],
      cta: {
        heading: "Pronto para aparecer melhor online?",
        button: "Vamos falar",
      },
      solutionAlt: "Solução digital para",
    },
    process: {
      label: "Processo",
      heading:
        'Um processo direto, com estratégia suficiente para não parecer "só mais um site".',
      videoOverlay: {
        label: "Da ideia ao lançamento",
        text: "Um fluxo claro, visual e orientado para colocar o negócio online.",
      },
      videoAlt: "Equipa a preparar trabalho digital em escritório",
      svgAlt: "Animação do processo da Mionga",
      steps: [
        {
          title: "Diagnóstico",
          description:
            "Percebemos o negócio, o público, a oferta e o que precisa gerar resultado.",
        },
        {
          title: "Design",
          description:
            "Criamos uma direção visual clara, moderna e alinhada com a marca.",
        },
        {
          title: "Desenvolvimento",
          description:
            "Construímos uma experiência rápida, responsiva e preparada para crescer.",
        },
        {
          title: "Lançamento",
          description:
            "Colocamos tudo online com testes, ajustes finais e ligações essenciais.",
        },
        {
          title: "Suporte",
          description:
            "Acompanhamos melhorias, conteúdo, manutenção e novas necessidades.",
        },
      ],
      imageAlts: [
        "Reunião de diagnóstico para definir estratégia digital",
        "Mesa de design com wireframes e direção visual",
        "Desenvolvimento de website em computador portátil",
        "Equipa a preparar lançamento de projeto digital",
        "Suporte e acompanhamento de projeto digital",
      ],
    },
    trust: {
      label: "Confiança",
      heading: "Mais bonito, mais útil e mais fácil de vender.",
      quote:
        "A Mionga cria presença digital com método, linguagem simples e foco em resultado.",
      proofCard: {
        label: "Presença digital com método",
        heading:
          "Design, conteúdo e automações a trabalhar no mesmo sentido.",
      },
      proofImageAlt: "Pequena equipa a trabalhar numa estratégia digital",
      trustImageAlt:
        "Reunião com pequeno negócio para melhorar presença online",
      points: [
        "Falamos simples, sem complicar tecnologia.",
        "Pensamos em vendas, contactos e tempo poupado.",
        "Criamos soluções proporcionais ao tamanho do negócio.",
        "Trabalhamos com proximidade e resposta rápida.",
      ],
    },
    finalCta: {
      subtitle: "Vamos dar ao teu negócio uma presença digital à altura.",
      heading:
        "Queres um website que pareça profissional e gere contactos?",
      button: "Falar no WhatsApp",
    },
    footer: {
      ariaLabel: "Mionga",
      brand:
        "Websites, redes sociais e automações para pequenos negócios em Portugal que querem parecer profissionais e vender melhor.",
      kicker: "Próximo passo simples",
      heading: "Vamos pôr o teu negócio online com intenção.",
      copy: "Fala connosco pelo WhatsApp e recebe uma direção clara para o teu website, conteúdo ou automação.",
      ctaWhatsapp: "Falar no WhatsApp",
      ctaInstagram: "Ver Instagram",
      copyright: "Mionga. Todos os direitos reservados.",
      tagline: "Feito para pequenos negócios em Portugal.",
      marquee: [
        "Websites rápidos",
        "Redes sociais consistentes",
        "Automações úteis",
        "WhatsApp sem atrito",
        "Pequenos negócios em Portugal",
      ],
      columns: [
        {
          label: "Serviços",
          links: ["Websites", "Gestão de redes sociais", "Automações", "Processo"],
        },
        {
          label: "Mionga",
          links: ["Início", "Soluções", "Contacto", "WhatsApp"],
        },
        {
          label: "Social",
          links: ["Instagram", "WhatsApp"],
        },
      ],
    },
    footerSection: {
      brand:
        "Websites, redes sociais e automações para pequenos negócios em Portugal.",
      columns: [
        {
          label: "Serviços",
          links: ["Websites", "Redes sociais", "Automações", "Processo"],
        },
        {
          label: "Mionga",
          links: ["Quem somos", "Soluções", "Contacto", "WhatsApp"],
        },
        {
          label: "Recursos",
          links: ["Diagnóstico", "Suporte", "Pequenos negócios", "Portugal"],
        },
        {
          label: "Social",
          links: ["Instagram", "WhatsApp"],
        },
      ],
    },
    common: {
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      linkedin: "LinkedIn",
    },
    whatsapp: {
      default: "Olá Mionga, quero criar um website para o meu negócio.",
    },
    floatingWhatsApp: {
      ariaLabel: "Falar com a Mionga no WhatsApp",
    },
    backToTop: {
      ariaLabel: "Voltar ao início da página",
    },
    meta: {
      title: "Mionga | Websites para pequenos negócios em Portugal",
      description:
        "A Mionga cria websites profissionais, gere redes sociais e implementa automações para pequenos negócios em Portugal que querem gerar mais contactos.",
      keywords:
        "websites Portugal, criação de websites, gestão de redes sociais, automações, pequenos negócios, agência digital Portugal, Mionga",
      ogTitle: "Mionga | Websites para pequenos negócios em Portugal",
      ogDescription:
        "Websites, redes sociais e automações para pequenos negócios em Portugal que querem parecer profissionais e gerar mais contactos.",
      twitterTitle: "Mionga | Websites para pequenos negócios em Portugal",
      twitterDescription:
        "Criação de websites, gestão de redes sociais e automações para pequenos negócios em Portugal.",
      jsonLd: {
        description:
          "Criação de websites, gestão de redes sociais e automações para pequenos negócios em Portugal.",
        services: [
          "Criação de websites",
          "Gestão de redes sociais",
          "Automações para pequenos negócios",
        ],
      },
    },
  },

  en: {
    nav: {
      home: "Home",
      solutions: "Solutions",
      process: "Process",
      contact: "Contact",
    },
    menuToggle: {
      open: "Open menu",
      close: "Close menu",
    },
    hero: {
      badge: "Mionga Digital Studio",
      title: {
        line1: "Premium websites ",
        line2: "for small businesses ",
        line3: "that want to ",
        gradient1: "sell more ",
        gradient2: "online.",
      },
      subtitle:
        "We build fast websites, consistent social presence and simple automations for businesses in Portugal that need to look professional and generate leads.",
      ctaWhatsapp: "Chat on WhatsApp",
      ctaSolutions: "See solutions",
      pills: ["Fast websites", "Social media", "Simple automations"],
      stats: [
        { label: "Main focus", value: "Websites" },
        { label: "Conversion", value: "WhatsApp" },
        { label: "Market", value: "Portugal" },
      ],
      cardSeo: {
        title: "SEO & performance",
        text: "Sites built to load fast and capture leads.",
      },
      cardAutomation: {
        title: "Useful automation",
        text: "Simple workflows to respond faster every day.",
      },
      ariaLabel: "Mionga hero",
    },
    heroGeometric: {
      badge: "Mionga Digital Studio",
      title1: "Small businesses.",
      title2: "Big digital presence.",
      subtitle:
        "We build websites, content and automations for small businesses in Portugal that want to look professional, respond faster and sell more.",
      ctaWhatsapp: "Chat on WhatsApp",
      ctaSolutions: "See solutions",
    },
    services: {
      label: "Digital solutions",
      heading:
        "Clear design, simple technology and a digital presence that generates leads.",
      description:
        "Mionga helps small businesses in Portugal move beyond improvised digital presence with websites, social media and automations proportional to the size of the business.",
      items: [
        {
          number: "01",
          title: "Websites",
          description:
            "Fast, beautiful sites designed to turn visitors into real leads.",
          details: ["Landing pages", "Institutional sites", "Technical SEO", "Maintenance"],
        },
        {
          number: "02",
          title: "Social media",
          description:
            "Visual and consistent management for businesses that need to show up better every day.",
          details: ["Monthly calendar", "Posts and stories", "Visual identity", "Reports"],
        },
        {
          number: "03",
          title: "Automations",
          description:
            "Simple processes to save time, respond faster and organise orders.",
          details: ["WhatsApp & leads", "Forms", "Simple CRM", "Internal workflows"],
        },
      ],
      businessLabel: "By business type",
      businessHeading:
        "Experiences designed for businesses that need clients, not decoration.",
      solutions: [
        {
          type: "Restaurants",
          headline: "Online menu, reservations and orders without confusion.",
          tags: ["Website", "WhatsApp", "Google"],
        },
        {
          type: "Salons",
          headline: "A polished digital presence to book more appointments.",
          tags: ["Social media", "Booking", "Content"],
        },
        {
          type: "Clinics",
          headline: "Clear information, credibility and well-routed contacts.",
          tags: ["Website", "SEO", "Forms"],
        },
        {
          type: "Local shops",
          headline: "Products, campaigns and automated messaging in one flow.",
          tags: ["Digital storefront", "Automation", "Social"],
        },
      ],
      cta: {
        heading: "Ready to look better online?",
        button: "Let's talk",
      },
      solutionAlt: "Digital solution for",
    },
    process: {
      label: "Process",
      heading:
        'A direct process, with enough strategy so it doesn\'t look like "just another site".',
      videoOverlay: {
        label: "From idea to launch",
        text: "A clear, visual flow focused on getting the business online.",
      },
      videoAlt: "Team preparing digital work in an office",
      svgAlt: "Mionga process animation",
      steps: [
        {
          title: "Diagnosis",
          description:
            "We understand the business, the audience, the offer and what needs to drive results.",
        },
        {
          title: "Design",
          description:
            "We create a clear, modern visual direction aligned with the brand.",
        },
        {
          title: "Development",
          description:
            "We build a fast, responsive experience ready to grow.",
        },
        {
          title: "Launch",
          description:
            "We go live with testing, final tweaks and essential connections.",
        },
        {
          title: "Support",
          description:
            "We follow up with improvements, content, maintenance and new needs.",
        },
      ],
      imageAlts: [
        "Diagnostic meeting to define digital strategy",
        "Design table with wireframes and visual direction",
        "Website development on a laptop",
        "Team preparing a digital project launch",
        "Support and follow-up of a digital project",
      ],
    },
    trust: {
      label: "Trust",
      heading: "Better looking, more useful and easier to sell.",
      quote:
        "Mionga creates digital presence with method, simple language and a focus on results.",
      proofCard: {
        label: "Digital presence with method",
        heading:
          "Design, content and automations all working in the same direction.",
      },
      proofImageAlt: "Small team working on a digital strategy",
      trustImageAlt:
        "Meeting with a small business to improve online presence",
      points: [
        "We speak simply, without complicating technology.",
        "We think about sales, leads and time saved.",
        "We create solutions proportional to the size of the business.",
        "We work with proximity and fast response.",
      ],
    },
    finalCta: {
      subtitle:
        "Let's give your business the digital presence it deserves.",
      heading:
        "Do you want a website that looks professional and generates leads?",
      button: "Chat on WhatsApp",
    },
    footer: {
      ariaLabel: "Mionga",
      brand:
        "Websites, social media and automations for small businesses in Portugal that want to look professional and sell more.",
      kicker: "Simple next step",
      heading: "Let's get your business online with intention.",
      copy: "Talk to us on WhatsApp and get a clear direction for your website, content or automation.",
      ctaWhatsapp: "Chat on WhatsApp",
      ctaInstagram: "See Instagram",
      copyright: "Mionga. All rights reserved.",
      tagline: "Made for small businesses in Portugal.",
      marquee: [
        "Fast websites",
        "Consistent social media",
        "Useful automations",
        "Frictionless WhatsApp",
        "Small businesses in Portugal",
      ],
      columns: [
        {
          label: "Services",
          links: ["Websites", "Social media management", "Automations", "Process"],
        },
        {
          label: "Mionga",
          links: ["Home", "Solutions", "Contact", "WhatsApp"],
        },
        {
          label: "Social",
          links: ["Instagram", "WhatsApp"],
        },
      ],
    },
    footerSection: {
      brand:
        "Websites, social media and automations for small businesses in Portugal.",
      columns: [
        {
          label: "Services",
          links: ["Websites", "Social media", "Automations", "Process"],
        },
        {
          label: "Mionga",
          links: ["About us", "Solutions", "Contact", "WhatsApp"],
        },
        {
          label: "Resources",
          links: ["Diagnosis", "Support", "Small businesses", "Portugal"],
        },
        {
          label: "Social",
          links: ["Instagram", "WhatsApp"],
        },
      ],
    },
    common: {
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      linkedin: "LinkedIn",
    },
    whatsapp: {
      default:
        "Hi Mionga, I'd like to create a website for my business.",
    },
    floatingWhatsApp: {
      ariaLabel: "Talk to Mionga on WhatsApp",
    },
    backToTop: {
      ariaLabel: "Back to top of page",
    },
    meta: {
      title: "Mionga | Websites for small businesses in Portugal",
      description:
        "Mionga builds professional websites, manages social media and implements automations for small businesses in Portugal that want to generate more leads.",
      keywords:
        "websites Portugal, web design, social media management, automations, small businesses, digital agency Portugal, Mionga",
      ogTitle: "Mionga | Websites for small businesses in Portugal",
      ogDescription:
        "Websites, social media and automations for small businesses in Portugal that want to look professional and generate more leads.",
      twitterTitle: "Mionga | Websites for small businesses in Portugal",
      twitterDescription:
        "Website design, social media management and automations for small businesses in Portugal.",
      jsonLd: {
        description:
          "Website design, social media management and automations for small businesses in Portugal.",
        services: [
          "Website design",
          "Social media management",
          "Small business automations",
        ],
      },
    },
  },
} as const;
