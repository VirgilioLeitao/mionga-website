"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type GalleryImage = {
  src: string;
  alt: string;
  title?: string;
};

type PortfolioGalleryProps = {
  title?: string;
  eyebrow?: string;
  description?: string;
  archiveButton?: {
    text: string;
  };
  images: GalleryImage[];
  className?: string;
  maxHeight?: number;
  spacing?: string;
  pauseOnHover?: boolean;
  marqueeRepeat?: number;
};

export function PortfolioGallery({
  title = "Galeria privada do Atelier",
  eyebrow = "Galeria",
  description = "Cortes reais, interiores com luz quente, detalhes de navalha e momentos de grooming fotografados como arquivo de marca.",
  archiveButton = {
    text: "Abrir galeria",
  },
  images,
  className,
  maxHeight = 120,
  spacing = "-space-x-52 lg:-space-x-64",
  pauseOnHover = true,
  marqueeRepeat = 3,
}: PortfolioGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!isArchiveOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsArchiveOpen(false);
      }

      if (event.key === "ArrowRight") {
        setSelectedIndex((index) => (index + 1) % images.length);
      }

      if (event.key === "ArrowLeft") {
        setSelectedIndex((index) => (index - 1 + images.length) % images.length);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [images.length, isArchiveOpen]);

  const openImage = (index: number) => {
    setSelectedIndex(index);
    setIsArchiveOpen(true);
  };

  const selectedImage = images[selectedIndex];

  return (
    <>
      <div
        aria-label={title}
        className={cn("relative overflow-hidden border border-white/12 bg-white/[0.025]", className)}
      >
        <div className="relative z-10 mx-auto max-w-4xl px-5 pb-10 pt-12 text-center sm:px-8 lg:pb-4 lg:pt-16">
          <p className="text-sm uppercase tracking-[0.34em] text-[var(--gold)]">
            {eyebrow}
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl leading-[1.02] tracking-[-0.02em] sm:text-5xl lg:text-[3.35rem]">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/58">
            {description}
          </p>

          <button
            type="button"
            onClick={() => setIsArchiveOpen(true)}
            className="group mt-9 inline-flex h-13 items-center justify-center gap-3 bg-[var(--gold)] px-7 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-white"
          >
            <span>{archiveButton.text}</span>
            <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </button>
        </div>

        <div className="relative hidden h-[26rem] overflow-hidden md:block">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-background/65 to-transparent" />
          <div className={`flex ${spacing} items-end justify-center pb-8 pt-44`}>
            {images.map((image, index) => {
              const middle = Math.floor(images.length / 2);
              const distanceFromMiddle = Math.abs(index - middle);
              const staggerOffset = Math.max(28, maxHeight - distanceFromMiddle * 18);
              const isHovered = hoveredIndex === index;
              const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;
              const yOffset = isHovered ? -132 : isOtherHovered ? -16 : -staggerOffset;

              return (
                <motion.button
                  type="button"
                  aria-label={`Abrir imagem ${image.title ?? image.alt}`}
                  key={`${image.src}-${index}`}
                  className="group shrink-0 cursor-pointer"
                  style={{ zIndex: images.length - index }}
                  initial={{
                    transform:
                      "perspective(5000px) rotateY(-42deg) translateY(210px)",
                    opacity: 0,
                  }}
                  animate={{
                    transform: `perspective(5000px) rotateY(-42deg) translateY(${yOffset}px)`,
                    opacity: 1,
                  }}
                  transition={{
                    delay: index * 0.045,
                    duration: 0.24,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={() => openImage(index)}
                >
                  <div className="relative aspect-[4/3] w-72 overflow-hidden border border-white/12 bg-background transition duration-300 group-hover:scale-[1.035] lg:w-88">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 1024px) 18rem, 22rem"
                      className="size-full object-cover object-center"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-transparent to-transparent opacity-70" />
                    <div className="absolute bottom-4 left-4 right-4 text-left opacity-0 transition group-hover:opacity-100">
                      <p className="text-xs uppercase tracking-[0.24em] text-[var(--gold)]">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-2 font-serif text-2xl leading-none text-white">
                        {image.title ?? image.alt}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="relative block pb-8 md:hidden">
          <div
            className={cn(
              "group flex overflow-hidden p-2 [--duration:42s] [--gap:1rem] [gap:var(--gap)]",
            )}
          >
            {Array(marqueeRepeat)
              .fill(0)
              .map((_, repeatIndex) => (
                <div
                  key={repeatIndex}
                  className={cn(
                    "flex shrink-0 animate-marquee justify-around [gap:var(--gap)]",
                    {
                      "group-hover:[animation-play-state:paused]": pauseOnHover,
                    },
                  )}
                >
                  {images.map((image, index) => (
                    <button
                      type="button"
                      key={`${repeatIndex}-${image.src}`}
                      onClick={() => openImage(index)}
                      className="group shrink-0 cursor-pointer"
                      aria-label={`Abrir imagem ${image.title ?? image.alt}`}
                    >
                      <div className="relative aspect-[4/3] w-64 overflow-hidden border border-white/12">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="16rem"
                          className="size-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/62 to-transparent" />
                        <p className="absolute bottom-4 left-4 right-4 text-left font-serif text-xl leading-none text-white">
                          {image.title ?? image.alt}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isArchiveOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-modal-title"
            className="fixed inset-0 z-[90] overflow-y-auto bg-[oklch(0.045_0.012_176/.92)] px-4 py-5 backdrop-blur-xl sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mx-auto flex min-h-full max-w-7xl flex-col">
              <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/12 bg-[oklch(0.045_0.012_176/.78)] py-4 backdrop-blur-xl">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-[var(--gold)]">
                    Arquivo visual
                  </p>
                  <h3
                    id="gallery-modal-title"
                    className="mt-2 font-serif text-3xl leading-none sm:text-4xl"
                  >
                    Galeria Atelier Navalha
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label="Fechar galeria"
                  onClick={() => setIsArchiveOpen(false)}
                  className="grid size-11 place-items-center border border-white/14 bg-white/[0.035] text-white transition hover:border-[var(--gold)]/60 hover:text-[var(--gold)]"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="grid gap-5 py-6 lg:grid-cols-[1.05fr_0.95fr]">
                <motion.div
                  key={selectedImage.src}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative min-h-[24rem] overflow-hidden border border-white/12 bg-background sm:min-h-[34rem] lg:min-h-[44rem]"
                >
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 54vw"
                    className="size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">
                      {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                      {String(images.length).padStart(2, "0")}
                    </p>
                    <h4 className="mt-3 font-serif text-4xl leading-none sm:text-5xl">
                      {selectedImage.title ?? selectedImage.alt}
                    </h4>
                  </div>
                  <button
                    type="button"
                    aria-label="Imagem anterior"
                    onClick={() =>
                      setSelectedIndex(
                        (index) => (index - 1 + images.length) % images.length,
                      )
                    }
                    className="absolute left-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center border border-white/16 bg-black/30 text-white backdrop-blur-md transition hover:bg-[var(--gold)] hover:text-black"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Imagem seguinte"
                    onClick={() =>
                      setSelectedIndex((index) => (index + 1) % images.length)
                    }
                    className="absolute right-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center border border-white/16 bg-black/30 text-white backdrop-blur-md transition hover:bg-[var(--gold)] hover:text-black"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </motion.div>

                <div className="grid auto-rows-[10rem] grid-cols-2 gap-3 sm:grid-cols-3 lg:auto-rows-[8.5rem]">
                  {images.map((image, index) => (
                    <button
                      type="button"
                      key={`${image.src}-thumb`}
                      onClick={() => setSelectedIndex(index)}
                      className={cn(
                        "group relative overflow-hidden border bg-background text-left transition",
                        selectedIndex === index
                          ? "border-[var(--gold)]"
                          : "border-white/12 hover:border-white/34",
                      )}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 1024px) 50vw, 14vw"
                        className="size-full object-cover opacity-78 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <p className="absolute bottom-3 left-3 right-3 text-xs uppercase tracking-[0.18em] text-white/72">
                        {image.title ?? image.alt}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
