"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/data/siteContent";
import { MagneticButton } from "@/components/ui/motion-footer";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <div
      className={cn("hero-shape absolute", className)}
      style={{ "--shape-rotate": `${rotate}deg`, "--shape-delay": `${delay}s` } as CSSProperties}
    >
      <div className="hero-shape-inner relative" style={{ width, height }}>
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "border-2 border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] backdrop-blur-[2px]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
          )}
        />
      </div>
    </div>
  );
}

function HeroGeometric({
  badge = "Mionga Digital Studio",
  title1 = "Pequenos negócios.",
  title2 = "Presença digital grande.",
}: {
  badge?: string;
  title1?: string;
  title2?: string;
}) {
  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#030303]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.07] via-transparent to-rose-500/[0.06] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={620}
          height={140}
          rotate={12}
          gradient="from-emerald-500/[0.18]"
          className="left-[-18%] top-[14%] md:left-[-5%] md:top-[18%]"
        />
        <ElegantShape
          delay={0.5}
          width={540}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.16]"
          className="right-[-12%] top-[70%] md:right-[0%] md:top-[72%]"
        />
        <ElegantShape
          delay={0.4}
          width={320}
          height={82}
          rotate={-8}
          gradient="from-violet-500/[0.16]"
          className="bottom-[8%] left-[2%] md:left-[10%]"
        />
        <ElegantShape
          delay={0.6}
          width={220}
          height={62}
          rotate={20}
          gradient="from-amber-500/[0.16]"
          className="right-[8%] top-[12%] md:right-[18%]"
        />
        <ElegantShape
          delay={0.7}
          width={170}
          height={44}
          rotate={-25}
          gradient="from-cyan-500/[0.16]"
          className="left-[20%] top-[6%] md:left-[25%] md:top-[10%]"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div
            className="hero-fade-up mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 md:mb-12"
            style={{ "--hero-delay": "0.5s" } as CSSProperties}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
            <span className="text-sm tracking-wide text-white/60">{badge}</span>
          </div>

          <div className="hero-fade-up" style={{ "--hero-delay": "0.7s" } as CSSProperties}>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:mb-8 md:text-8xl">
              <span className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
                {title1}
              </span>
              <br />
              <span
                className={cn(
                  "bg-gradient-to-r from-emerald-300 via-white/90 to-rose-300 bg-clip-text text-transparent",
                )}
              >
                {title2}
              </span>
            </h1>
          </div>

          <div className="hero-fade-up" style={{ "--hero-delay": "0.9s" } as CSSProperties}>
            <p className="mx-auto mb-8 max-w-2xl px-4 text-base font-light leading-relaxed tracking-wide text-white/45 sm:text-lg md:text-xl">
              Criamos websites, conteúdos e automações para pequenos negócios em Portugal que querem
              parecer profissionais, responder mais rápido e vender melhor.
            </p>
          </div>

          <div
            className="hero-fade-up flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ "--hero-delay": "1.1s" } as CSSProperties}
          >
            <MagneticButton
              as="a"
              className="rounded-full bg-emerald-300 px-7 py-3.5 text-sm font-black text-[#03140a] shadow-[0_18px_45px_rgba(110,231,183,0.32)] ring-1 ring-white/20 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_64px_rgba(110,231,183,0.42)]"
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
            >
              Falar no WhatsApp
            </MagneticButton>
            <MagneticButton
              as="a"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-bold text-white/75 transition-colors duration-300 hover:border-white/30 hover:text-white"
              href="#solucoes"
            >
              Ver soluções
            </MagneticButton>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80" />
    </section>
  );
}

export { HeroGeometric };
