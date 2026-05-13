"use client";

import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Menu,
  Scissors,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { PortfolioGallery } from "@/components/ui/portfolio-gallery";
import ChatGPTInput from "@/components/ui/prompt-input-dynamic-grow";
import { SpatialBarberShowcase } from "@/components/ui/spatial-barber-showcase";
import { StickyFooter } from "@/components/ui/sticky-footer";
import { TypewriterTestimonial } from "@/components/ui/typewriter-testimonial";
import { barbershopConfig } from "@/config/barbershop.config";

const {
  barbers,
  booking,
  brand,
  contact,
  galleryImages,
  images,
  navItems,
  pricing,
  ritual,
  services,
  testimonials,
} = barbershopConfig;
const { cut: cutImage, lisbon: lisbonImage, ritualVideo } = images;

const reveal = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

function scrollToSection(id: string, behavior: ScrollBehavior = "smooth") {
  const target = document.getElementById(id);
  if (!target) {
    return;
  }

  target.scrollIntoView({ behavior, block: "start" });
}

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={`relative mx-auto w-full max-w-7xl scroll-mt-20 px-5 sm:px-8 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function ImagePanel({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? undefined : "eager"}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,oklch(0.08_0.012_176/.48))]" />
    </div>
  );
}

export default function AtelierPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [selectedService, setSelectedService] = useState(
    services[2]?.title ?? services[0].title,
  );
  const [previewService, setPreviewService] = useState<
    (typeof services)[number] | null
  >(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => setReady(true), 720);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!previewService) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreviewService(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewService]);

  useEffect(() => {
    const scrollToInitialHash = () => {
      const id = window.location.hash.slice(1);
      if (id) {
        scrollToSection(id, "auto");
      }
    };

    const timeouts = [100, 500, 1200].map((delay) =>
      window.setTimeout(scrollToInitialHash, delay),
    );
    window.addEventListener("load", scrollToInitialHash);

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
      window.removeEventListener("load", scrollToInitialHash);
    };
  }, []);

  const handleSectionLink = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const id = href.slice(1);
    event.preventDefault();
    setMenuOpen(false);
    window.history.pushState(null, "", href);
    scrollToSection(id);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="noise" />
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: ready ? 0 : 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-0 z-50 grid place-items-center bg-[oklch(0.08_0.014_176)] ${
          ready ? "pointer-events-none" : ""
        }`}
      >
        <div className="text-center">
          <p className="font-serif text-4xl tracking-tight sm:text-6xl">
            {brand.name}
          </p>
          <div className="mx-auto mt-7 h-px w-44 overflow-hidden bg-white/12">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-24 bg-[var(--gold)]"
            />
          </div>
        </div>
      </motion.div>

      <header className="nav-blur fixed left-0 right-0 top-0 z-40 border-b border-white/10">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a
            href="#inicio"
            onClick={(event) => handleSectionLink(event, "#inicio")}
            className="group flex items-center gap-3"
          >
            <span className="grid size-10 place-items-center border border-white/20 bg-white/[0.04]">
              <Scissors className="size-4 text-[var(--gold)] transition-transform group-hover:rotate-12" />
            </span>
            <span className="leading-none">
              <span className="block font-serif text-xl tracking-tight">
                {brand.name}
              </span>
              <span className="block text-[0.65rem] uppercase tracking-[0.34em] text-white/45">
                {brand.district}, {brand.city}
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm text-white/70 lg:flex">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={(event) => handleSectionLink(event, href)}
                className="transition hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>

          <a
            href="#marcacao"
            onClick={(event) => handleSectionLink(event, "#marcacao")}
            className="hidden items-center gap-2 border border-[var(--gold)]/40 px-5 py-3 text-sm text-[var(--gold)] transition hover:bg-[var(--gold)] hover:text-black lg:flex"
          >
            Marcar sessão
            <ArrowRight className="size-4" />
          </a>

          <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setMenuOpen((value) => !value)}
            className="grid size-11 place-items-center border border-white/15 bg-white/[0.04] lg:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[oklch(0.095_0.016_176/.96)] px-5 py-5 lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-3">
              {navItems.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={(event) => handleSectionLink(event, href)}
                  className="border-b border-white/10 py-3 text-lg text-white/80"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <SpatialBarberShowcase ready={ready} onNavigate={handleSectionLink} />

      <Section className="py-18 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden border border-white/12 bg-[oklch(0.105_0.018_176/.72)] p-5 shadow-[0_40px_120px_rgba(0,0,0,.38)] backdrop-blur-xl sm:p-8 lg:p-10"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(196,162,97,.18),transparent_34%),radial-gradient(circle_at_82%_20%,rgba(27,77,69,.28),transparent_36%),linear-gradient(135deg,rgba(255,255,255,.055),transparent_42%)]"
          />
          <div
            aria-hidden
            className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/70 to-transparent"
          />

          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-3 border border-[var(--gold)]/24 bg-[var(--gold)]/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--gold)]">
                <span className="h-px w-8 bg-[var(--gold)]/70" />
                {ritual.eyebrow}
              </div>

              <h2 className="mt-7 max-w-xl font-serif text-4xl leading-[1.02] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.35rem]">
                {ritual.title}
                <span className="block text-white/58">{ritual.titleMuted}</span>
              </h2>

              <div className="mt-8 max-w-2xl space-y-5 text-base leading-8 text-white/68 sm:text-lg">
                {ritual.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-9 grid gap-3 sm:grid-cols-3">
                {ritual.stats.map(([value, label]) => (
                  <div
                    key={value}
                    className="border border-white/10 bg-black/20 px-4 py-4"
                  >
                    <p className="font-serif text-2xl text-white">{value}</p>
                    <p className="mt-1 text-xs uppercase leading-5 tracking-[0.16em] text-white/44">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[30rem] overflow-hidden border border-white/12 bg-black/30">
              <video
                className="absolute inset-0 size-full object-cover opacity-88 saturate-[0.9]"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={cutImage}
                aria-label={ritual.videoLabel}
              >
                <source src={ritualVideo} type="video/webm" />
              </video>
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,12,13,.72),rgba(5,12,13,.2)_46%,rgba(5,12,13,.04)),linear-gradient(180deg,rgba(5,12,13,.08),rgba(5,12,13,.68)_74%,rgba(5,12,13,.9))]" />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px)] bg-[length:100%_3px] opacity-18"
              />
              <motion.div
                aria-hidden
                animate={{ x: ["-18%", "18%", "-18%"] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-y-0 left-1/3 w-24 rotate-12 bg-white/[0.045] blur-xl"
              />
              <motion.div
                aria-hidden
                animate={{ opacity: [0.18, 0.42, 0.18], scale: [1, 1.04, 1] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-8 top-8 size-24 rounded-full border border-[var(--gold)]/24 bg-[var(--gold)]/[0.05] blur-[1px]"
              />

              <div className="absolute left-6 top-6 flex items-center gap-3 border border-white/12 bg-black/34 px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/70 backdrop-blur-md">
                <span className="size-2 rounded-full bg-[var(--gold)] shadow-[0_0_18px_var(--gold)]" />
                {ritual.videoLabel}
              </div>

              <div className="absolute bottom-6 left-6 right-6 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                <div className="max-w-sm border border-white/14 bg-black/42 p-5 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--gold)]">
                    {ritual.privateTitle}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/72">
                    {ritual.privateCopy}
                  </p>
                </div>

                <div className="flex items-center gap-3 border border-[var(--gold)]/28 bg-[var(--gold)]/[0.08] px-4 py-3 text-sm text-white/76 backdrop-blur-md">
                  <Scissors className="size-4 text-[var(--gold)]" />
                  {ritual.technicalLabel}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      <Section id="servicos" className="py-16 lg:py-22">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-[var(--gold)]">
              Serviços
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.02em] sm:text-5xl lg:text-[3.35rem]">
              Precisão, sem teatro.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-white/58">
            Cartas curtas, execução sénior e acabamento pensado para durar entre
            reuniões, jantares e fins de semana fora da cidade.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <motion.article
              key={service.title}
              onClick={() => setSelectedService(service.title)}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative min-h-[23rem] cursor-pointer overflow-hidden border text-left transition ${
                selectedService === service.title
                  ? "border-[var(--gold)]/70 bg-[oklch(0.18_0.04_175/.72)]"
                  : "border-white/12 bg-white/[0.035] hover:border-white/28"
              }`}
            >
              <Image
                src={service.image}
                alt=""
                fill
                loading="eager"
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover opacity-58 transition duration-700 group-hover:scale-105 group-hover:opacity-72"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.06_0.012_176/.08),oklch(0.06_0.012_176/.88)_68%,oklch(0.06_0.012_176/.98))]" />
              <div className="relative flex min-h-[23rem] flex-col justify-end p-6">
                <div className="mb-auto flex justify-end">
                  <button
                    type="button"
                    aria-label={`Ver exemplo de ${service.title}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedService(service.title);
                      setPreviewService(service);
                    }}
                    className="grid size-10 place-items-center border border-white/18 bg-black/20 text-[var(--gold)] transition group-hover:border-[var(--gold)]/60 group-hover:bg-[var(--gold)] group-hover:text-black"
                  >
                    <ArrowRight className="size-4 -rotate-45 transition group-hover:rotate-0" />
                  </button>
                </div>
                <h3 className="font-serif text-2xl leading-tight tracking-[-0.01em] sm:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-white/68">
                  {service.copy}
                </p>
                <div className="mt-7 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/62">
                  <span>{service.price}</span>
                  <span className="h-px w-8 bg-white/22" />
                  <span>{service.time}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="precos" className="grid gap-10 py-18 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <ImagePanel
          src={cutImage}
          alt="Barbeiro a finalizar um corte masculino premium"
          className="min-h-[520px]"
        />
        <div className="self-center border-y border-white/12 py-8">
          <p className="text-sm uppercase tracking-[0.34em] text-[var(--gold)]">
            Preços
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.02em] sm:text-5xl lg:text-[3.35rem]">
            Carta curta, padrão alto.
          </h2>
          <div className="mt-10 divide-y divide-white/12">
            {pricing.map(([label, price]) => (
              <div key={label} className="flex items-center justify-between gap-6 py-5">
                <span className="text-lg text-white/78">{label}</span>
                <span className="font-serif text-3xl text-[var(--gold)]">
                  {price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="barbeiros" className="pb-10 pt-18 lg:pb-12 lg:pt-22">
        <div className="mb-9 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-[var(--gold)]">
              Os barbeiros
            </p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl leading-[1.02] tracking-[-0.02em] sm:text-5xl lg:text-[3.35rem]">
              Mãos firmes. Olho treinado.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-white/58 lg:justify-self-end">
            Três barbeiros sénior, três linguagens de corte e uma obsessão
            comum: sair natural, alinhado e sem excesso.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {barbers.map((barber, index) => (
            <motion.article
              key={barber.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                delay: index * 0.08,
                duration: 0.62,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative min-h-[30rem] overflow-hidden border border-white/12 bg-white/[0.035] lg:min-h-[32rem]"
            >
              <Image
                src={barber.image}
                alt={`Retrato de ${barber.name}, ${barber.role}`}
                fill
                loading="eager"
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.06_0.012_176/.06),oklch(0.065_0.012_176/.28)_42%,oklch(0.065_0.012_176/.96)_100%)]" />
              <div className="absolute left-5 top-5 border border-white/16 bg-black/20 px-4 py-3 text-xs uppercase tracking-[0.26em] text-[var(--gold)] backdrop-blur-md">
                {barber.signature}
              </div>
              <div className="relative flex min-h-[30rem] flex-col justify-end p-6 sm:p-8 lg:min-h-[32rem]">
                <p className="text-xs uppercase tracking-[0.24em] text-white/52">
                  {barber.role}
                </p>
                <h3 className="mt-3 font-serif text-4xl leading-[0.95] tracking-[-0.02em] sm:text-[2.65rem]">
                  {barber.name}
                </h3>
                <p className="mt-5 text-sm leading-6 text-white/70">
                  {barber.note}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="galeria" className="pb-18 pt-10 lg:pb-24 lg:pt-12">
        <PortfolioGallery
          eyebrow="Galeria"
          title="Lisboa, lâmina e pele."
          description="Um arquivo visual vivo: cortes, barbas, interiores e retratos que mostram o trabalho do Atelier antes de qualquer palavra."
          archiveButton={{ text: "Abrir galeria" }}
          images={galleryImages}
        />
      </Section>

      <Section id="testemunhos" className="py-18 lg:py-22">
        <div className="mb-9 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-[var(--gold)]">
              Testemunhos
            </p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.02] tracking-[-0.02em] sm:text-5xl lg:text-[3.35rem]">
              Quem volta, volta por uma razão.
            </h2>
          </div>
          <p className="max-w-lg text-base leading-7 text-white/58 lg:justify-self-end">
            Clientes locais, agendas apertadas e uma exigência simples: sair
            impecável sem perder a manhã.
          </p>
        </div>

        <div className="border-y border-white/12 bg-white/[0.025]">
          <TypewriterTestimonial testimonials={testimonials} />
        </div>
      </Section>

      <Section id="marcacao" className="grid gap-8 py-18 lg:grid-cols-[0.95fr_1.05fr] lg:py-24">
        <div className="relative min-h-[520px] overflow-hidden border border-white/10 bg-[oklch(0.16_0.036_175/.74)] p-7 sm:p-10">
          <div className="absolute inset-0 opacity-35">
            <Image
              src={lisbonImage}
              alt=""
              fill
              loading="eager"
              sizes="50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.11_0.018_176/.45),oklch(0.09_0.014_176/.96))]" />
          <div className="relative flex h-full flex-col justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.34em] text-[var(--gold)]">
                Marcação
              </p>
              <h2 className="mt-4 max-w-xl font-serif text-4xl leading-[1.02] tracking-[-0.02em] sm:text-5xl lg:text-[3.35rem]">
                Reserva a tua cadeira.
              </h2>
            </div>
            <div className="grid gap-4 text-white/72">
              <p className="flex items-center gap-3">
                <CalendarDays className="size-5 text-[var(--gold)]" />
                {booking.responseCopy}
              </p>
              <p className="flex items-center gap-3">
                <Clock3 className="size-5 text-[var(--gold)]" />
                {booking.hoursCopy}
              </p>
            </div>
          </div>
        </div>

        <form className="border border-white/12 bg-white/[0.035] p-6 sm:p-10">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-white/58">
              Nome
              <input
                className="h-13 border border-white/12 bg-black/24 px-4 text-white outline-none transition focus:border-[var(--gold)]"
                placeholder="O teu nome"
              />
            </label>
            <label className="grid gap-2 text-sm text-white/58">
              Telemóvel
              <input
                className="h-13 border border-white/12 bg-black/24 px-4 text-white outline-none transition focus:border-[var(--gold)]"
                placeholder="+351 9..."
              />
            </label>
            <label className="grid gap-2 text-sm text-white/58 sm:col-span-2">
              Serviço
              <select
                value={selectedService}
                onChange={(event) => setSelectedService(event.target.value)}
                className="h-13 border border-white/12 bg-black/24 px-4 text-white outline-none transition focus:border-[var(--gold)]"
              >
                {services.map((service) => (
                  <option key={service.title}>{service.title}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm text-white/58">
              Dia preferido
              <input
                type="date"
                className="h-13 border border-white/12 bg-black/24 px-4 text-white outline-none transition focus:border-[var(--gold)]"
              />
            </label>
            <label className="grid gap-2 text-sm text-white/58">
              Hora
              <select className="h-13 border border-white/12 bg-black/24 px-4 text-white outline-none transition focus:border-[var(--gold)]">
                {booking.timeOptions.map((time) => (
                  <option key={time}>{time}</option>
                ))}
              </select>
            </label>
          </div>
          <button
            type="button"
            className="mt-8 inline-flex h-14 w-full items-center justify-center gap-3 bg-[var(--gold)] px-7 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-white sm:w-auto"
          >
            Pedir marcação
            <ArrowRight className="size-4" />
          </button>
          <p className="mt-5 text-sm leading-6 text-white/45">
            {booking.note}
          </p>
        </form>
      </Section>

      <Section id="contacto" className="pb-16 pt-10 lg:pb-22 lg:pt-12">
        <div className="grid gap-px bg-white/12 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="grid gap-px bg-white/12">
            <div className="bg-background/88 p-8 sm:p-10">
              <MapPin className="size-6 text-[var(--gold)]" />
              <h2 className="mt-8 font-serif text-4xl leading-[1.02] tracking-[-0.02em] sm:text-5xl">
                {contact.addressTitle}
              </h2>
              <p className="mt-4 text-lg leading-8 text-white/62">
                {contact.addressCopy}
              </p>
            </div>
            <div className="grid gap-px bg-white/12 sm:grid-cols-2 lg:grid-cols-1">
              <div className="bg-background/88 p-8 sm:p-10">
                <p className="text-xs uppercase tracking-[0.32em] text-[var(--gold)]">
                  Contactos
                </p>
                <p className="mt-6 text-lg sm:text-xl">{contact.phone}</p>
                <p className="mt-3 text-lg sm:text-xl">
                  {contact.email}
                </p>
              </div>
              <div className="bg-background/88 p-8 sm:p-10">
                <p className="text-xs uppercase tracking-[0.32em] text-[var(--gold)]">
                  Horário
                </p>
                <p className="mt-6 text-lg sm:text-xl">
                  {contact.hours[0]}
                </p>
                <p className="mt-3 text-lg sm:text-xl">
                  {contact.hours[1]}
                </p>
                <p className="mt-3 text-white/44">{contact.hours[2]}</p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[520px] overflow-hidden bg-[oklch(0.09_0.014_176)]">
            <iframe
              title={contact.mapTitle}
              src={contact.mapSrc}
              className="luxury-map absolute inset-0 h-full w-full border-0"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(90deg,oklch(1_0_0/.08)_1px,transparent_1px),linear-gradient(0deg,oklch(1_0_0/.07)_1px,transparent_1px)] [background-size:72px_72px]" />
            <div className="pointer-events-none absolute left-[48%] top-[44%] grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 shadow-[0_0_60px_oklch(0.78_0.095_79/.32)]">
              <MapPin className="size-6 text-[var(--gold)]" />
            </div>
            <div className="pointer-events-none absolute inset-x-10 top-1/2 h-px bg-[linear-gradient(90deg,transparent,oklch(0.78_0.095_79/.34),transparent)]" />
            <div className="pointer-events-none absolute left-1/2 inset-y-10 w-px bg-[linear-gradient(180deg,transparent,oklch(0.78_0.095_79/.26),transparent)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_44%,transparent_0,oklch(0.08_0.014_176/.22)_42%,oklch(0.08_0.014_176/.82)_100%)]" />
            <div className="pointer-events-none absolute bottom-8 left-8 right-8 border border-[var(--gold)]/35 bg-background/82 p-5 backdrop-blur-xl sm:left-auto sm:right-8 sm:w-72">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">
                {brand.name}
              </p>
              <p className="mt-3 text-sm leading-6 text-white/68">
                {contact.mapCardCopy}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {previewService && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] grid place-items-center bg-[oklch(0.045_0.012_176/.86)] px-4 py-6 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-preview-title"
          onClick={() => setPreviewService(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid max-h-[92svh] w-full max-w-5xl overflow-hidden border border-white/14 bg-background shadow-[0_40px_120px_oklch(0.02_0.01_176/.58)] lg:grid-cols-[1.15fr_0.85fr]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative min-h-[22rem] lg:min-h-[39rem]">
              <Image
                src={previewService.previewImage}
                alt={`Exemplo visual de ${previewService.title}`}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,oklch(0.06_0.012_176/.72))]" />
            </div>

            <div className="flex flex-col justify-between p-7 sm:p-9">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-[var(--gold)]">
                  Exemplo do serviço
                </p>
                <h2
                  id="service-preview-title"
                  className="mt-5 font-serif text-4xl leading-[0.98] tracking-[-0.02em] sm:text-5xl"
                >
                  {previewService.title}
                </h2>
                <p className="mt-6 text-base leading-7 text-white/66">
                  {previewService.previewCopy}
                </p>
              </div>

              <div className="mt-10 border-t border-white/12 pt-6">
                <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/62">
                  <span>{previewService.price}</span>
                  <span className="h-px w-10 bg-white/22" />
                  <span>{previewService.time}</span>
                </div>
                <a
                  href="#marcacao"
                  onClick={(event) => {
                    setPreviewService(null);
                    handleSectionLink(event, "#marcacao");
                  }}
                  className="mt-6 inline-flex h-13 items-center justify-center gap-3 bg-[var(--gold)] px-6 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-white"
                >
                  Marcar este serviço
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>

            <button
              type="button"
              aria-label="Fechar exemplo do serviço"
              onClick={() => setPreviewService(null)}
              className="absolute right-4 top-4 grid size-11 place-items-center border border-white/18 bg-black/30 text-white transition hover:border-[var(--gold)]/60 hover:text-[var(--gold)]"
            >
              <X className="size-5" />
            </button>
          </motion.div>
        </motion.div>
      )}

      <StickyFooter />

      <ChatGPTInput />
    </main>
  );
}
