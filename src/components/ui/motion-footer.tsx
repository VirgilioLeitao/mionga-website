"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CameraIcon, LinkIcon, SendIcon, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { contact, whatsappLink } from "@/data/siteContent";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/i18n/LanguageContext";

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

function MarqueeRow({ items }: { items: readonly string[] }) {
  return (
    <div className="cinematic-marquee-row" aria-hidden="true">
      {[...items, ...items].map((item, index) => (
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
  const { t } = useLanguage();

  const footerColumns: FooterColumn[] = React.useMemo(() => [
    {
      label: t.footer.columns[0].label,
      links: [
        { title: t.footer.columns[0].links[0], href: "#solucoes" },
        { title: t.footer.columns[0].links[1], href: "#solucoes" },
        { title: t.footer.columns[0].links[2], href: "#solucoes" },
        { title: t.footer.columns[0].links[3], href: "#processo" },
      ],
    },
    {
      label: t.footer.columns[1].label,
      links: [
        { title: t.footer.columns[1].links[0], href: "#top" },
        { title: t.footer.columns[1].links[1], href: "#solucoes" },
        { title: t.footer.columns[1].links[2], href: "#contacto" },
        { title: t.footer.columns[1].links[3], href: whatsappLink(), external: true },
      ],
    },
    {
      label: t.footer.columns[2].label,
      links: [
        { title: t.footer.columns[2].links[0], href: contact.instagramUrl || "#", icon: CameraIcon, external: true },
        ...(contact.linkedinUrl
          ? [{ title: t.common.linkedin, href: contact.linkedinUrl, icon: SendIcon, external: true }]
          : []),
        { title: t.footer.columns[2].links[1], href: whatsappLink(), icon: LinkIcon, external: true },
      ],
    },
  ], [t]);

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
        <MarqueeRow items={t.footer.marquee} />
      </div>

      <div className="cinematic-footer-inner">
        <div className="cinematic-footer-brand cinematic-footer-reveal">
          <a className="cinematic-footer-logo" href="#top" aria-label={t.footer.ariaLabel}>
            <Logo />
          </a>
          <p>
            {t.footer.brand}
          </p>
        </div>

        <div className="cinematic-footer-center">
          <span className="cinematic-footer-kicker cinematic-footer-reveal">
            {t.footer.kicker}
          </span>
          <h2 id="footer-heading" ref={headingRef}>
            {t.footer.heading}
          </h2>
          <p className="cinematic-footer-copy cinematic-footer-reveal">
            {t.footer.copy}
          </p>

          <div className="cinematic-footer-actions" ref={linksRef}>
            <MagneticButton
              as="a"
              className="footer-glass-pill footer-primary-pill"
              href={whatsappLink(t.whatsapp.default)}
              target="_blank"
              rel="noreferrer"
            >
              {t.footer.ctaWhatsapp}
            </MagneticButton>
            <MagneticButton
              as="a"
              className="footer-glass-pill"
              href={contact.instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t.footer.ctaInstagram}
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
        <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
        <span>{t.footer.tagline}</span>
      </div>
    </footer>
  );
}
