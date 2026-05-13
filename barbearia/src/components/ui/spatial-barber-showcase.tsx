"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowRight, Timer } from "lucide-react";
import Image from "next/image";
import { useState, type MouseEvent } from "react";
import {
  barbershopConfig,
  type HeroFeatureMetric,
  type HeroRitual,
  type HeroRitualId,
} from "@/config/barbershop.config";

type SpatialBarberShowcaseProps = {
  ready: boolean;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
};

const smoothEase = [0.22, 1, 0.36, 1] as const;

const animations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.08, staggerChildren: 0.08 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.18 },
    },
  },
  item: {
    hidden: { filter: "blur(8px)", opacity: 0, y: 18 },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      transition: { duration: 0.62, ease: smoothEase },
    },
    exit: { filter: "blur(5px)", opacity: 0, y: -8 },
  },
  image: (isCut: boolean): Variants => ({
    initial: {
      filter: "blur(14px)",
      opacity: 0,
      rotate: isCut ? -8 : 8,
      scale: 1.16,
      x: isCut ? -44 : 44,
    },
    animate: {
      filter: "blur(0px)",
      opacity: 1,
      rotate: 0,
      scale: 1,
      x: 0,
      transition: { duration: 0.75, ease: smoothEase },
    },
    exit: {
      filter: "blur(16px)",
      opacity: 0,
      scale: 0.92,
      transition: { duration: 0.24 },
    },
  }),
};

function BackgroundAura({ ritual }: { ritual: HeroRitual }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <motion.div
        animate={{
          background: `radial-gradient(circle at ${
            ritual.id === "corte" ? "24% 48%" : "76% 48%"
          }, ${
            ritual.id === "corte"
              ? "oklch(0.78 0.095 79 / .2)"
              : "oklch(0.62 0.08 176 / .2)"
          }, transparent 44%)`,
        }}
        className="absolute inset-0"
        transition={{ duration: 1.1, ease: smoothEase }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent,oklch(0.055_0.012_176/.56)_58%,oklch(0.045_0.01_176)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

function RitualVisual({
  ritual,
  isCut,
}: {
  ritual: HeroRitual;
  isCut: boolean;
}) {
  return (
    <motion.div layout="position" className="relative shrink-0">
      <motion.div
        animate={{ rotate: 360 }}
        className={`absolute inset-[-16%] rounded-full border border-dashed border-white/10 ${ritual.ring}`}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      />
      <motion.div
        animate={{ scale: [1, 1.045, 1] }}
        className="absolute inset-[-4%] rounded-full opacity-45 blur-2xl"
        style={{
          background: `radial-gradient(circle, ${ritual.accent} 0%, transparent 65%)`,
        }}
        transition={{ duration: 4.8, ease: "easeInOut", repeat: Infinity }}
      />

      <div className="relative grid size-[18.5rem] place-items-center overflow-hidden rounded-full border border-white/10 bg-black/24 shadow-[0_30px_110px_oklch(0.02_0.01_176/.58)] backdrop-blur-sm sm:size-[23rem] lg:size-[26rem]">
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          className="relative z-10 size-full"
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={ritual.id}
              animate="animate"
              className="absolute inset-0"
              exit="exit"
              initial="initial"
              variants={animations.image(isCut)}
            >
              <Image
                src={ritual.image}
                alt={ritual.imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 19rem, 26rem"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_34%,oklch(0.055_0.012_176/.76))]" />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap border border-white/10 bg-background/82 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/52 backdrop-blur-xl">
        <span className={`mr-2 inline-block size-1.5 rounded-full ${ritual.glow}`} />
        Disponível por marcação
      </div>
    </motion.div>
  );
}

function RitualDetails({
  activeId,
  ritual,
  isCut,
  onToggle,
  onNavigate,
}: {
  activeId: HeroRitualId;
  ritual: HeroRitual;
  isCut: boolean;
  onToggle: (id: HeroRitualId) => void;
  onNavigate: SpatialBarberShowcaseProps["onNavigate"];
}) {
  const alignClass = isCut
    ? "items-start text-left"
    : "items-start text-left lg:items-end lg:text-right";
  const metricDirection = isCut ? "flex-row" : "flex-row lg:flex-row-reverse";
  const progressSide = isCut ? "left-0" : "left-0 lg:right-0 lg:left-auto";

  return (
    <motion.div
      animate="visible"
      className={`flex flex-col ${alignClass}`}
      exit="exit"
      initial="hidden"
      variants={animations.container}
    >
      <motion.p
        className="mb-3 text-sm uppercase tracking-[0.42em] text-[var(--gold)]"
        variants={animations.item}
      >
        {ritual.eyebrow}
      </motion.p>
      <motion.h1
        className="max-w-2xl font-serif text-[clamp(3.2rem,6vw,5.85rem)] uppercase leading-[0.88] tracking-[-0.035em] text-white"
        variants={animations.item}
      >
        Atelier Navalha
      </motion.h1>
      <motion.h2
        className="mt-4 font-serif text-3xl leading-none tracking-[-0.02em] text-white/80 sm:text-4xl"
        variants={animations.item}
      >
        {ritual.title}
      </motion.h2>
      <motion.p
        className={`mt-5 max-w-xl text-base leading-7 text-white/66 sm:text-lg sm:leading-8 ${
          isCut ? "mr-auto" : "mr-auto lg:ml-auto lg:mr-0"
        }`}
        variants={animations.item}
      >
        {ritual.description}
      </motion.p>

      <motion.div
        className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row"
        variants={animations.item}
      >
        <a
          href="#marcacao"
          onClick={(event) => onNavigate(event, "#marcacao")}
          className="group inline-flex h-14 items-center justify-center gap-3 bg-[var(--gold)] px-7 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-white"
        >
          Marcar sessão
          <ArrowRight className="size-4 transition group-hover:translate-x-1" />
        </a>
        <a
          href="#servicos"
          onClick={(event) => onNavigate(event, "#servicos")}
          className="inline-flex h-14 items-center justify-center border border-white/18 px-7 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white/40 hover:bg-white/8"
        >
          Ver serviços
        </a>
      </motion.div>

      <motion.div className="mt-6" variants={animations.item}>
        <Switcher activeId={activeId} onToggle={onToggle} />
      </motion.div>

      <motion.div
        className="mt-6 w-full max-w-md border border-white/10 bg-white/[0.035] p-4 backdrop-blur-sm sm:p-5"
        variants={animations.item}
      >
        <div className="grid gap-5">
          {ritual.features.map((feature: HeroFeatureMetric, index) => (
            <div key={feature.label}>
              <div
                className={`mb-3 flex items-center justify-between gap-4 text-sm ${metricDirection}`}
              >
                <div className="flex items-center gap-2 text-white/78">
                  <feature.icon className="size-4 text-[var(--gold)]" />
                  <span>{feature.label}</span>
                </div>
                <span className="font-mono text-xs text-white/42">
                  {feature.value}%
                </span>
              </div>
              <div className="relative h-1.5 overflow-hidden bg-white/10">
                <motion.div
                  animate={{ width: `${feature.value}%` }}
                  className={`absolute bottom-0 top-0 ${progressSide}`}
                  initial={{ width: 0 }}
                  style={{ backgroundColor: ritual.accent }}
                  transition={{ delay: 0.35 + index * 0.12, duration: 0.85 }}
                />
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-6 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/56 ${metricDirection}`}
        >
          <span className="inline-flex items-center gap-2">
            <Timer className="size-4 text-[var(--gold)]" />
            {ritual.stats.time}
          </span>
          <span className="h-px w-8 bg-white/18" />
          <span>{ritual.stats.price}</span>
        </div>
      </motion.div>


    </motion.div>
  );
}

function Switcher({
  activeId,
  onToggle,
}: {
  activeId: HeroRitualId;
  onToggle: (id: HeroRitualId) => void;
}) {
  const options = Object.values(barbershopConfig.heroRituals).map((ritual) => ({
    id: ritual.id,
    label: ritual.label,
  }));

  return (
    <div className="flex justify-start">
      <motion.div
        className="flex items-center gap-1 border border-white/10 bg-background/78 p-1.5 shadow-[0_20px_70px_oklch(0.02_0.01_176/.55)] backdrop-blur-2xl"
        layout
      >
        {options.map((option) => (
          <motion.button
            key={option.id}
            type="button"
            onClick={() => onToggle(option.id)}
            className="relative flex h-11 w-28 items-center justify-center text-sm font-medium focus:outline-none"
            whileTap={{ scale: 0.97 }}
          >
            {activeId === option.id && (
              <motion.div
                className="absolute inset-0 bg-white/10"
                layoutId="hero-ritual-switch"
                transition={{ duration: 0.35, ease: smoothEase }}
              />
            )}
            <span
              className={`relative z-10 transition ${
                activeId === option.id
                  ? "text-white"
                  : "text-white/45 hover:text-white/72"
              }`}
            >
              {option.label}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}

export function SpatialBarberShowcase({
  ready,
  onNavigate,
}: SpatialBarberShowcaseProps) {
  const [activeRitual, setActiveRitual] = useState<HeroRitualId>("corte");
  const ritual = barbershopConfig.heroRituals[activeRitual];
  const isCut = activeRitual === "corte";

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[oklch(0.045_0.012_176)] pb-28 pt-24 sm:pb-32 lg:pt-28"
    >
      <BackgroundAura ritual={ritual} />

      <motion.div
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 24 }}
        className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.98fr_0.9fr] lg:gap-14"
        initial={{ opacity: 0, y: 24 }}
        transition={{ delay: 0.18, duration: 0.78, ease: smoothEase }}
      >
        <motion.div
          className={`order-2 flex justify-center ${isCut ? "lg:order-2" : "lg:order-1"}`}
          layout
          transition={{ duration: 0.7, ease: smoothEase }}
        >
          <RitualVisual isCut={isCut} ritual={ritual} />
        </motion.div>

        <motion.div
          className={`order-1 ${isCut ? "lg:order-1" : "lg:order-2"}`}
          layout="position"
        >
          <AnimatePresence mode="wait">
            <RitualDetails
              key={activeRitual}
              activeId={activeRitual}
              isCut={isCut}
              onToggle={setActiveRitual}
              onNavigate={onNavigate}
              ritual={ritual}
            />
          </AnimatePresence>
        </motion.div>

        <div className="order-3 grid gap-px border-y border-white/12 bg-white/12 sm:grid-cols-3 lg:col-span-2">
          {barbershopConfig.heroProofItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 bg-background/52 px-5 py-4 text-sm text-white/66 backdrop-blur-sm"
            >
              <item.icon className="size-4 text-[var(--gold)]" />
              <span className="text-white/36">{item.label}</span>
              <span className="ml-auto text-right">{item.value}</span>
            </div>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
