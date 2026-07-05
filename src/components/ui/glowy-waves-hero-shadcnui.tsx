import { motion, type Variants } from "framer-motion";
import { ArrowRight, Search, Sparkles, Zap } from "lucide-react";
import { useEffect, useRef } from "react";

import { whatsappLink } from "@/data/siteContent";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

type Point = {
  x: number;
  y: number;
};

interface WaveConfig {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
}

const wavePalette: WaveConfig[] = [
  { offset: 0, amplitude: 62, frequency: 0.003, color: "rgba(110, 231, 183, 0.82)", opacity: 0.52 },
  { offset: Math.PI / 2, amplitude: 82, frequency: 0.0025, color: "rgba(244, 114, 182, 0.66)", opacity: 0.28 },
  { offset: Math.PI, amplitude: 54, frequency: 0.0036, color: "rgba(199, 255, 90, 0.54)", opacity: 0.22 },
  { offset: Math.PI * 1.5, amplitude: 70, frequency: 0.0022, color: "rgba(142, 197, 255, 0.46)", opacity: 0.24 },
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.82, staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
  },
};

const statsVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.58, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.08 },
  },
};

export function GlowyWavesHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 });
  const { t } = useLanguage();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return undefined;

    let animationId = 0;
    let time = 0;
    let width = 0;
    let height = 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const mouseInfluence = prefersReducedMotion ? 0 : 64;
    const influenceRadius = 310;
    const smoothing = prefersReducedMotion ? 1 : 0.095;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);

      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const centerPoint = { x: width / 2, y: height / 2 };
      mouseRef.current = centerPoint;
      targetMouseRef.current = centerPoint;
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      targetMouseRef.current = { x: width / 2, y: height / 2 };
    };

    const drawWave = (wave: WaveConfig) => {
      ctx.save();
      ctx.beginPath();

      for (let x = 0; x <= width; x += 5) {
        const dx = x - mouseRef.current.x;
        const dy = height / 2 - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distance / influenceRadius);
        const mouseEffect =
          influence * mouseInfluence * Math.sin(time * 0.001 + x * 0.01 + wave.offset);

        const y =
          height / 2 +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.42 + time * 0.0027) * (wave.amplitude * 0.38) +
          mouseEffect;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.lineWidth = 2.2;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur = 28;
      ctx.shadowColor = wave.color;
      ctx.stroke();
      ctx.restore();
    };

    const draw = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#030303");
      gradient.addColorStop(0.54, "#06100c");
      gradient.addColorStop(1, "#030303");

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      wavePalette.forEach(drawWave);
    };

    const animate = () => {
      time += 1;
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * smoothing;

      draw();

      if (!prefersReducedMotion) {
        animationId = window.requestAnimationFrame(animate);
      }
    };

    resizeCanvas();
    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resizeCanvas);
    animationId = window.requestAnimationFrame(animate);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resizeCanvas);
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section
      className="relative isolate flex min-h-[calc(100svh-var(--header-height))] w-full items-center justify-center overflow-hidden bg-[#030303] text-[#f8f1e6]"
      id="top"
      aria-label={t.hero.ariaLabel}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-emerald-300/[0.08] blur-[150px]" />
        <div className="absolute bottom-[-8rem] right-[-5rem] h-[380px] w-[380px] rounded-full bg-rose-300/[0.08] blur-[130px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.08),transparent_24rem)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/86" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-5 py-16 text-center md:px-8 md:py-20 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial={false}
          animate="visible"
          className="w-full"
        >
          <motion.div
            variants={itemVariants}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.055] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/72 backdrop-blur-xl"
          >
            <Sparkles data-icon="inline-start" aria-hidden="true" />
            {t.hero.badge}
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mx-auto mb-5 max-w-[21.5rem] text-[2.08rem] font-black leading-[1.02] tracking-normal text-white sm:max-w-5xl sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="block sm:inline">{t.hero.title.line1}</span>
            <span className="block sm:inline">{t.hero.title.line2}</span>
            <span className="block sm:inline">{t.hero.title.line3}</span>
            <span className="block bg-gradient-to-r from-emerald-200 via-white to-rose-200 bg-clip-text text-transparent sm:inline">
              {t.hero.title.gradient1}
            </span>
            <span className="block bg-gradient-to-r from-emerald-200 via-white to-rose-200 bg-clip-text text-transparent sm:inline">
              {t.hero.title.gradient2}
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mb-7 max-w-[21rem] text-sm font-medium leading-relaxed text-white/58 sm:max-w-3xl sm:text-lg md:text-xl"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mb-6 flex flex-col items-center justify-center gap-3 sm:mb-7 sm:flex-row"
          >
            <a href={whatsappLink(t.whatsapp.default)} target="_blank" rel="noreferrer">
              <Button size="lg" className="group uppercase tracking-[0.14em]">
                {t.hero.ctaWhatsapp}
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Button>
            </a>
            <a href="#solucoes">
              <Button
                size="lg"
                variant="outline"
                className="uppercase tracking-[0.14em]"
              >
                {t.hero.ctaSolutions}
              </Button>
            </a>
          </motion.div>

          <motion.ul
            variants={itemVariants}
            className="mb-7 flex flex-wrap items-center justify-center gap-3 text-xs font-black uppercase tracking-[0.16em] text-white/68"
          >
            {t.hero.pills.map((pill) => (
              <li
                key={pill}
                className="rounded-full border border-white/12 bg-white/[0.055] px-3 py-2 tracking-[0.1em] backdrop-blur-xl sm:px-4 sm:tracking-[0.16em]"
              >
                {pill}
              </li>
            ))}
          </motion.ul>

          <motion.div
            variants={statsVariants}
            className="mx-auto hidden w-full max-w-2xl gap-0 overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06] text-left shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:grid sm:grid-cols-3"
          >
            {t.hero.stats.map((stat) => (
              <div
                key={stat.label}
                className="border-b border-white/10 p-3 sm:border-b-0 sm:border-r sm:p-4 last:border-r-0"
              >
                <div className="mb-1.5 text-[0.62rem] font-black uppercase tracking-[0.22em] text-white/46">
                  {stat.label}
                </div>
                <div className="text-xl font-black text-white md:text-2xl">{stat.value}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute right-8 top-32 hidden max-w-[220px] rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-left text-sm text-white/62 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl 2xl:block">
        <Search aria-hidden="true" className="mb-3 text-emerald-200" />
        <strong className="block text-white">{t.hero.cardSeo.title}</strong>
        {t.hero.cardSeo.text}
      </div>

      <div className="pointer-events-none absolute left-8 bottom-28 hidden max-w-[220px] rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-left text-sm text-white/62 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl 2xl:block">
        <Zap aria-hidden="true" className="mb-3 text-[#c8ff5a]" />
        <strong className="block text-white">{t.hero.cardAutomation.title}</strong>
        {t.hero.cardAutomation.text}
      </div>
    </section>
  );
}
