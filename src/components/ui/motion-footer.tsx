"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CameraIcon, LinkIcon, SendIcon, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { contact, whatsappLink } from "@/data/siteContent";
import { Logo } from "@/components/Logo";

type FooterLink = {
  title: string;
  href: string;
  external?: boolean;
  icon?: LucideIcon;
};

type FooterColumn = {
  label: string;
  links: FooterLink[];
};

type MagneticButtonProps = React.HTMLAttributes<HTMLElement> & {
  as?: "a" | "button";
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
};

export const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as = "button", type, ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      const element = localRef.current;
      if (!element) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
      if (reduceMotion || coarsePointer) return;

      const ctx = gsap.context(() => {
        const xTo = gsap.quickTo(element, "x", { duration: 0.34, ease: "power3.out" });
        const yTo = gsap.quickTo(element, "y", { duration: 0.34, ease: "power3.out" });
        const rotateXTo = gsap.quickTo(element, "rotationX", { duration: 0.34, ease: "power3.out" });
        const rotateYTo = gsap.quickTo(element, "rotationY", { duration: 0.34, ease: "power3.out" });
        const scaleTo = gsap.quickTo(element, "scale", { duration: 0.28, ease: "power3.out" });

        const handleMouseMove = (event: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const x = event.clientX - rect.left - rect.width / 2;
          const y = event.clientY - rect.top - rect.height / 2;

          xTo(x * 0.22);
          yTo(y * 0.28);
          rotateXTo(-y * 0.08);
          rotateYTo(x * 0.06);
          scaleTo(1.04);
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.78,
            ease: "elastic.out(1, 0.36)",
            overwrite: "auto",
          });
        };

        element.addEventListener("mousemove", handleMouseMove, { passive: true });
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    const setRefs = (node: HTMLElement | null) => {
      localRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    const elementProps = {
      ...props,
      ...(as === "button" ? { type: type ?? "button" } : {}),
      className: cn("magnetic-button", className),
      ref: setRefs,
    };

    return React.createElement(as, elementProps, children);
  },
);

MagneticButton.displayName = "MagneticButton";

const marqueeItems = [
  "Websites rápidos",
  "Redes sociais consistentes",
  "Automações úteis",
  "WhatsApp sem atrito",
  "Pequenos negócios em Portugal",
];

const footerColumns: FooterColumn[] = [
  {
    label: "Serviços",
    links: [
      { title: "Websites", href: "#solucoes" },
      { title: "Gestão de redes sociais", href: "#solucoes" },
      { title: "Automações", href: "#solucoes" },
      { title: "Processo", href: "#processo" },
    ],
  },
  {
    label: "Mionga",
    links: [
      { title: "Início", href: "#top" },
      { title: "Soluções", href: "#solucoes" },
      { title: "Contacto", href: "#contacto" },
      { title: "WhatsApp", href: whatsappLink(), external: true },
    ],
  },
  {
    label: "Social",
    links: [
      { title: "Instagram", href: contact.instagramUrl || "#", icon: CameraIcon, external: true },
      ...(contact.linkedinUrl
        ? [{ title: "LinkedIn", href: contact.linkedinUrl, icon: SendIcon, external: true }]
        : []),
      { title: "WhatsApp", href: whatsappLink(), icon: LinkIcon, external: true },
    ],
  },
];

function MarqueeRow() {
  return (
    <div className="cinematic-marquee-row" aria-hidden="true">
      {[...marqueeItems, ...marqueeItems].map((item, index) => (
        <React.Fragment key={`${item}-${index}`}>
          <span>{item}</span>
          <i />
        </React.Fragment>
      ))}
    </div>
  );
}

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const giantTextRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const linksRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: 72, scale: 0.92, autoAlpha: 0 },
        {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 85%",
            end: "bottom bottom",
            scrub: 0.8,
          },
        },
      );

      gsap.fromTo(
        [headingRef.current, linksRef.current, ".cinematic-footer-reveal"],
        { y: 34, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.82,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 62%",
            once: true,
          },
        },
      );
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      className="cinematic-footer"
      id="rodape"
      ref={wrapperRef}
      aria-labelledby="footer-heading"
    >
      <div className="cinematic-footer-aurora" aria-hidden="true" />
      <div className="cinematic-footer-grid" aria-hidden="true" />
      <div className="cinematic-footer-giant" ref={giantTextRef} aria-hidden="true">
        MIONGA
      </div>

      <div className="cinematic-marquee">
        <MarqueeRow />
      </div>

      <div className="cinematic-footer-inner">
        <div className="cinematic-footer-brand cinematic-footer-reveal">
          <a className="cinematic-footer-logo" href="#top" aria-label="Mionga">
            <Logo />
          </a>
          <p>
            Websites, redes sociais e automações para pequenos negócios em Portugal que querem
            parecer profissionais e vender melhor.
          </p>
        </div>

        <div className="cinematic-footer-center">
          <span className="cinematic-footer-kicker cinematic-footer-reveal">
            Próximo passo simples
          </span>
          <h2 id="footer-heading" ref={headingRef}>
            Vamos pôr o teu negócio online com intenção.
          </h2>
          <p className="cinematic-footer-copy cinematic-footer-reveal">
            Fala connosco pelo WhatsApp e recebe uma direção clara para o teu website, conteúdo ou
            automação.
          </p>

          <div className="cinematic-footer-actions" ref={linksRef}>
            <MagneticButton
              as="a"
              className="footer-glass-pill footer-primary-pill"
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
            >
              Falar no WhatsApp
            </MagneticButton>
            <MagneticButton
              as="a"
              className="footer-glass-pill"
              href={contact.instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              Ver Instagram
            </MagneticButton>
          </div>
        </div>

        <div className="cinematic-footer-links">
          {footerColumns.map((column) => (
            <nav className="cinematic-footer-column cinematic-footer-reveal" key={column.label}>
              <h3>{column.label}</h3>
              <ul>
                {column.links.map((link) => {
                  const Icon = link.icon;

                  return (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noreferrer" : undefined}
                      >
                        {Icon && <Icon aria-hidden="true" />}
                        {link.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="cinematic-footer-bottom">
        <p>© {new Date().getFullYear()} Mionga. Todos os direitos reservados.</p>
        <span>Feito para pequenos negócios em Portugal.</span>
      </div>
    </footer>
  );
}
