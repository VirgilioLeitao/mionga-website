"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Testimonial = {
  image: string;
  audio?: string;
  text: string;
  name: string;
  jobtitle: string;
};

type TypewriterTestimonialProps = {
  testimonials: Testimonial[];
};

export function TypewriterTestimonial({
  testimonials,
}: TypewriterTestimonialProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [hasBeenHovered, setHasBeenHovered] = useState<boolean[]>(
    new Array(testimonials.length).fill(false),
  );
  const [typedText, setTypedText] = useState("");
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const typewriterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const activeIndex = hoveredIndex ?? focusedIndex;

  const stopAudio = useCallback(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
      audioPlayerRef.current.src = "";
      audioPlayerRef.current.load();
      audioPlayerRef.current = null;
    }
  }, []);

  const stopTypewriter = useCallback(() => {
    if (typewriterTimeoutRef.current) {
      clearTimeout(typewriterTimeoutRef.current);
      typewriterTimeoutRef.current = null;
    }
    setTypedText("");
  }, []);

  const startTypewriter = useCallback(
    (text: string) => {
      stopTypewriter();

      let index = 0;
      const type = () => {
        setTypedText(text.slice(0, index));
        index += 1;

        if (index <= text.length) {
          typewriterTimeoutRef.current = setTimeout(type, 34);
        }
      };

      type();
    },
    [stopTypewriter],
  );

  const activateTestimonial = useCallback(
    (index: number, playAudio = false) => {
      const testimonial = testimonials[index];

      stopAudio();
      setHasBeenHovered((previous) => {
        const updated = [...previous];
        updated[index] = true;
        return updated;
      });

      if (playAudio && testimonial.audio) {
        const audio = new Audio(`/audio/${testimonial.audio}`);
        audioPlayerRef.current = audio;
        audio.play().catch(() => undefined);
      }

      startTypewriter(testimonial.text);
    },
    [startTypewriter, stopAudio, testimonials],
  );

  const clearActiveTestimonial = useCallback(() => {
    stopAudio();
    stopTypewriter();
    setHoveredIndex(null);
    setFocusedIndex(null);
  }, [stopAudio, stopTypewriter]);

  useEffect(() => {
    return () => {
      stopAudio();
      stopTypewriter();
    };
  }, [stopAudio, stopTypewriter]);

  return (
    <div className="relative flex min-h-[22rem] items-center justify-center overflow-visible py-20">
      <div className="absolute left-1/2 top-1/2 h-px w-full max-w-3xl -translate-x-1/2 bg-[linear-gradient(90deg,transparent,oklch(0.78_0.095_79/.34),transparent)]" />
      <div className="relative flex flex-wrap items-center justify-center gap-5 sm:gap-7">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            className="relative flex flex-col items-center"
            onMouseEnter={() => {
              setHoveredIndex(index);
              activateTestimonial(index);
            }}
            onMouseLeave={clearActiveTestimonial}
            onFocus={() => {
              setFocusedIndex(index);
              activateTestimonial(index);
            }}
            onBlur={clearActiveTestimonial}
            whileHover={{ y: -6, scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <button
              type="button"
              aria-label={`Ler testemunho de ${testimonial.name}`}
              onClick={() => {
                setFocusedIndex(index);
                activateTestimonial(index);
              }}
              className="group relative grid size-20 place-items-center rounded-full outline-none sm:size-24"
            >
              <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle,oklch(0.78_0.095_79/.2),transparent_68%)] opacity-0 blur-md transition group-hover:opacity-100 group-focus-visible:opacity-100" />
              <motion.span
                className="relative size-16 overflow-hidden rounded-full border bg-background shadow-[0_20px_70px_oklch(0.02_0.01_176/.42)] sm:size-20"
                animate={{
                  borderColor:
                    activeIndex === index || hasBeenHovered[index]
                      ? "oklch(0.78 0.095 79)"
                      : "oklch(1 0 0 / 0.18)",
                }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={testimonial.image}
                  alt={`Retrato de ${testimonial.name}`}
                  fill
                  sizes="96px"
                  className="object-cover grayscale transition duration-500 group-hover:grayscale-0 group-focus-visible:grayscale-0"
                />
              </motion.span>
            </button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: -22 }}
                  exit={{ opacity: 0, scale: 0.92, y: -8 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-24 z-30 w-[18rem] border border-[var(--gold)]/30 bg-[oklch(0.12_0.018_181/.96)] p-5 text-left shadow-[0_30px_90px_oklch(0.02_0.01_176/.58)] backdrop-blur-xl sm:bottom-28 sm:w-[21rem]"
                >
                  <div className="min-h-32 text-sm leading-6 text-white/78 sm:text-base sm:leading-7">
                    {typedText}
                    <span className="ml-0.5 animate-pulse text-[var(--gold)]">
                      |
                    </span>
                  </div>
                  <div className="mt-5 border-t border-white/12 pt-4 text-right">
                    <p className="font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="mt-1 text-sm text-white/46">
                      {testimonial.jobtitle}
                    </p>
                  </div>
                  <div className="absolute left-1/2 top-full -translate-x-1/2">
                    <div className="mx-auto size-3 rotate-45 border-b border-r border-[var(--gold)]/30 bg-[oklch(0.12_0.018_181/.96)]" />
                    <div className="mx-auto mt-3 size-2 rounded-full bg-[var(--gold)]/70" />
                    <div className="mx-auto mt-2 size-1 rounded-full bg-[var(--gold)]/45" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
