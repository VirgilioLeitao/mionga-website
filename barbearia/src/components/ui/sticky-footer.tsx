"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BriefcaseBusiness,
  Camera,
  MapPin,
  Play,
  Scissors,
  Users,
} from "lucide-react";
import type { ComponentProps, ComponentType, ReactNode } from "react";
import { barbershopConfig } from "@/config/barbershop.config";
import { cn } from "@/lib/utils";

type FooterLink = {
  title: string;
  href: string;
};

type FooterLinkGroup = {
  label: string;
  links: FooterLink[];
};

type SocialLink = {
  title: string;
  icon: ComponentType<{ className?: string }>;
};

type StickyFooterProps = ComponentProps<"footer">;

const socialLinks: SocialLink[] = [
  { title: "Instagram", icon: Camera },
  { title: "Facebook", icon: Users },
  { title: "YouTube", icon: Play },
  { title: "LinkedIn", icon: BriefcaseBusiness },
];

const footerLinkGroups: FooterLinkGroup[] = [
  {
    label: "Atelier",
    links: [
      { title: "O ritual", href: "#inicio" },
      { title: "Serviços", href: "#servicos" },
      { title: "Preços", href: "#precos" },
      { title: "Os barbeiros", href: "#barbeiros" },
    ],
  },
  {
    label: "Experiências",
    links: barbershopConfig.services.map((service) => ({
      title: service.title,
      href: "#servicos",
    })),
  },
  {
    label: "Visitar",
    links: [
      { title: "Galeria", href: "#galeria" },
      { title: "Testemunhos", href: "#testemunhos" },
      { title: "Marcação", href: "#marcacao" },
      { title: "Contacto", href: "#contacto" },
    ],
  },
  {
    label: "Lisboa",
    links: [
      { title: barbershopConfig.contact.addressTitle, href: "#contacto" },
      {
        title: `${barbershopConfig.brand.district}, ${barbershopConfig.brand.city}`,
        href: "#contacto",
      },
      { title: barbershopConfig.contact.hours[0], href: "#contacto" },
      { title: barbershopConfig.contact.hours[1], href: "#contacto" },
    ],
  },
];

export function StickyFooter({ className, ...props }: StickyFooterProps) {
  const { brand, contact } = barbershopConfig;

  return (
    <footer
      className={cn("relative h-[680px] w-full", className)}
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      {...props}
    >
      <div className="fixed bottom-0 h-[680px] w-full">
        <div className="sticky top-[calc(100vh-680px)] h-full overflow-y-auto">
          <div className="relative flex size-full flex-col justify-between overflow-hidden border-t border-white/12 bg-[oklch(0.055_0.012_176)] px-5 py-9 sm:px-8 lg:px-12">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -left-24 top-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,oklch(0.78_0.095_79/.16),transparent_68%)] blur-2xl" />
              <div className="absolute right-0 top-0 h-[34rem] w-[20rem] -translate-y-36 rotate-[-28deg] rounded-full bg-[radial-gradient(circle,white/.075,transparent_70%)] blur-xl" />
              <div className="absolute bottom-0 left-1/2 h-80 w-[42rem] -translate-x-1/2 bg-[radial-gradient(circle,oklch(0.2_0.05_175/.32),transparent_72%)] blur-3xl" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,oklch(0.035_0.01_176/.72))]" />
            </div>

            <div className="relative z-10 grid gap-12 pt-8 lg:grid-cols-[1.05fr_1.55fr] lg:gap-16 lg:pt-12">
              <AnimatedContainer className="max-w-md">
                <div className="inline-grid size-13 place-items-center border border-white/18 bg-white/[0.035]">
                  <Scissors className="size-5 text-[var(--gold)]" />
                </div>
                <h2 className="mt-7 font-serif text-5xl leading-[0.95] tracking-[-0.03em] text-white sm:text-6xl">
                  {brand.name}
                </h2>
                <p className="mt-6 text-base leading-7 text-white/58">
                  Barbearia de luxo no {brand.district}, criada para corte,
                  barba e grooming privado com precisão, calma e presença.
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {socialLinks.map((link) => (
                    <button
                      key={link.title}
                      type="button"
                      aria-label={link.title}
                      className="grid size-10 place-items-center border border-white/14 bg-white/[0.035] text-white/62 transition hover:border-[var(--gold)]/60 hover:bg-[var(--gold)] hover:text-black"
                    >
                      <link.icon className="size-4" />
                    </button>
                  ))}
                </div>
              </AnimatedContainer>

              <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
                {footerLinkGroups.map((group, index) => (
                  <AnimatedContainer
                    key={group.label}
                    delay={0.12 + index * 0.08}
                  >
                    <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">
                      {group.label}
                    </h3>
                    <ul className="mt-5 space-y-3 text-sm text-white/54">
                      {group.links.map((link) => (
                        <li key={`${group.label}-${link.title}`}>
                          <a
                            href={link.href}
                            className="inline-flex transition hover:translate-x-1 hover:text-white"
                          >
                            {link.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </AnimatedContainer>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-12 grid gap-5 border-t border-white/12 pt-6 text-sm text-white/44 md:grid-cols-[1fr_auto_1fr] md:items-center">
              <p>© 2026 {brand.name}. Todos os direitos reservados.</p>
              <div className="hidden h-8 w-px bg-white/12 md:block" />
              <p className="flex items-center gap-2 md:justify-end md:pr-16">
                <MapPin className="size-4 text-[var(--gold)]" />
                {brand.district}, {brand.city} · {contact.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

type AnimatedContainerProps = ComponentProps<typeof motion.div> & {
  children?: ReactNode;
  delay?: number;
};

function AnimatedContainer({
  delay = 0.1,
  children,
  ...props
}: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={props.className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", opacity: 0, y: -8 }}
      transition={{ delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.35 }}
      whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
