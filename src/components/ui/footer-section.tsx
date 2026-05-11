"use client";

import type { CSSProperties } from "react";
import {
  CameraIcon,
  FrameIcon,
  LinkIcon,
  SendIcon,
} from "lucide-react";
import { contact, whatsappLink } from "@/data/siteContent";

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: "Serviços",
    links: [
      { title: "Websites", href: "#solucoes" },
      { title: "Redes sociais", href: "#solucoes" },
      { title: "Automações", href: "#solucoes" },
      { title: "Processo", href: "#processo" },
    ],
  },
  {
    label: "Mionga",
    links: [
      { title: "Quem somos", href: "#solucoes" },
      { title: "Soluções", href: "#solucoes" },
      { title: "Contacto", href: "#contacto" },
      { title: "WhatsApp", href: whatsappLink() },
    ],
  },
  {
    label: "Recursos",
    links: [
      { title: "Diagnóstico", href: "#processo" },
      { title: "Suporte", href: "#processo" },
      { title: "Pequenos negócios", href: "#solucoes" },
      { title: "Portugal", href: "#top" },
    ],
  },
  {
    label: "Social",
    links: [
      { title: "Instagram", href: contact.instagramUrl || "#", icon: CameraIcon },
      ...(contact.linkedinUrl ? [{ title: "LinkedIn", href: contact.linkedinUrl, icon: SendIcon }] : []),
      { title: "WhatsApp", href: whatsappLink(), icon: LinkIcon },
    ],
  },
];

export function FooterSection() {
  return (
    <footer className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center rounded-t-[2rem] border-t border-white/10 bg-[#030303] bg-[radial-gradient(35%_128px_at_50%_0%,rgba(255,255,255,0.08),transparent)] px-6 py-12 text-white lg:py-16 md:rounded-t-[3rem]">
      <div className="absolute left-1/2 right-1/2 top-0 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <div className="footer-animated space-y-4">
          <div className="flex items-center gap-3">
            <FrameIcon className="size-8 text-emerald-300" />
            <span className="text-xl font-black tracking-tight">Mionga</span>
          </div>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/55 md:mt-0">
            Websites, redes sociais e automações para pequenos negócios em Portugal.
          </p>
          <p className="text-sm text-white/45">© {new Date().getFullYear()} Mionga. Todos os direitos reservados.</p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <div
              className="footer-animated"
              key={section.label}
              style={{ "--footer-delay": `${0.1 + index * 0.1}s` } as CSSProperties}
            >
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/90">
                  {section.label}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-white/50">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="inline-flex items-center transition-all duration-300 hover:translate-x-1 hover:text-white"
                      >
                        {link.icon && <link.icon className="me-1 size-4" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
