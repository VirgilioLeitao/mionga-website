"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus, Sparkles, X } from "lucide-react";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

type MenuOption = "Auto" | "Max" | "Pesquisa" | "Plano";

type RippleEffect = {
  x: number;
  y: number;
  id: number;
};

type Position = {
  x: number;
  y: number;
};

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

type ChatInputProps = {
  placeholder?: string;
  disabled?: boolean;
  glowIntensity?: number;
  expandOnFocus?: boolean;
  animationDuration?: number;
  backgroundOpacity?: number;
  showEffects?: boolean;
  menuOptions?: MenuOption[];
};

const SendButton = memo(function SendButton({
  isDisabled,
}: {
  isDisabled: boolean;
}) {
  return (
    <button
      type="submit"
      aria-label="Enviar mensagem"
      disabled={isDisabled}
      className={`ml-auto grid size-9 shrink-0 place-items-center rounded-full transition ${
        isDisabled
          ? "cursor-not-allowed bg-white/14 text-white/35"
          : "bg-[var(--gold)] text-black shadow-[0_0_32px_oklch(0.78_0.095_79/.28)] hover:bg-white"
      }`}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={isDisabled ? "opacity-50" : "opacity-100"}
      >
        <path
          d="M16 22L16 10M16 10L11 15M16 10L21 15"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
      </svg>
    </button>
  );
});

const OptionsMenu = memo(function OptionsMenu({
  isOpen,
  onSelect,
  menuOptions,
}: {
  isOpen: boolean;
  onSelect: (option: MenuOption) => void;
  menuOptions: MenuOption[];
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute bottom-full left-0 mb-2 min-w-36 overflow-hidden border border-white/12 bg-[oklch(0.11_0.018_181/.96)] shadow-[0_18px_70px_oklch(0.02_0.01_176/.45)] backdrop-blur-xl">
      <ul className="py-1">
        {menuOptions.map((option) => (
          <li key={option}>
            <button
              type="button"
              onClick={() => onSelect(option)}
              className="w-full px-4 py-2 text-left text-sm text-white/72 transition hover:bg-white/8 hover:text-white"
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

const OptionTag = memo(function OptionTag({
  option,
  onRemove,
}: {
  option: MenuOption;
  onRemove: (option: MenuOption) => void;
}) {
  return (
    <div className="flex items-center gap-1 border border-[var(--gold)]/25 bg-[var(--gold)]/10 px-2 py-1 text-xs text-[var(--gold)]">
      <span>{option}</span>
      <button
        type="button"
        aria-label={`Remover opção ${option}`}
        onClick={() => onRemove(option)}
        className="grid size-4 place-items-center text-[var(--gold)]/70 transition hover:text-white"
      >
        <X className="size-3" />
      </button>
    </div>
  );
});

const GlowEffects = memo(function GlowEffects({
  glowIntensity,
  mousePosition,
  animationDuration,
  enabled,
}: {
  glowIntensity: number;
  mousePosition: Position;
  animationDuration: number;
  enabled: boolean;
}) {
  if (!enabled) {
    return null;
  }

  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(110deg,white/.08,white/.12,white/.06)] backdrop-blur-2xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 blur-[1px] transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
        style={{
          boxShadow: `
            0 0 0 1px oklch(0.78 0.095 79 / ${0.22 * glowIntensity}),
            0 0 18px oklch(0.78 0.095 79 / ${0.3 * glowIntensity}),
            0 0 36px oklch(0.42 0.08 175 / ${0.22 * glowIntensity})
          `,
          transitionDuration: `${animationDuration}ms`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 blur-sm transition-opacity group-hover:opacity-35"
        style={{
          background: `radial-gradient(circle 130px at ${mousePosition.x}% ${mousePosition.y}%, oklch(0.78 0.095 79 / .15), oklch(0.36 0.065 176 / .08) 42%, transparent 76%)`,
          transitionDuration: `${animationDuration}ms`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,white/.08,transparent)] transition-transform group-hover:translate-x-full"
        style={{ transitionDuration: `${animationDuration * 2}ms` }}
      />
    </>
  );
});

const RippleEffects = memo(function RippleEffects({
  ripples,
  enabled,
}: {
  ripples: RippleEffect[];
  enabled: boolean;
}) {
  if (!enabled || ripples.length === 0) {
    return null;
  }

  return (
    <>
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="pointer-events-none absolute blur-sm"
          style={{
            left: ripple.x - 24,
            top: ripple.y - 24,
            width: 48,
            height: 48,
          }}
        >
          <div className="size-full animate-ping rounded-full bg-[var(--gold)]/20" />
        </div>
      ))}
    </>
  );
});

export default function ChatGPTInput({
  placeholder = "Pergunta ao concierge do Atelier",
  disabled = false,
  glowIntensity = 0.55,
  expandOnFocus = true,
  animationDuration = 500,
  backgroundOpacity = 0.16,
  showEffects = true,
  menuOptions = ["Auto", "Max", "Pesquisa", "Plano"],
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<MenuOption[]>([]);
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  const [mousePosition, setMousePosition] = useState<Position>({ x: 50, y: 50 });
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      text: "Olá. Posso ajudar a escolher serviço, estimar duração ou preparar uma marcação. Em produção, este chat será ligado à IA.",
    },
  ]);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const throttleRef = useRef<number | null>(null);

  useEffect(() => {
    if (!textareaRef.current) {
      return;
    }

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${Math.min(
      textareaRef.current.scrollHeight,
      104,
    )}px`;
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isSubmitDisabled = disabled || !value.trim();

  const submitMessage = useCallback(
    (message: string) => {
      const userMessage: ChatMessage = {
        id: Date.now(),
        role: "user",
        text: message,
      };
      const assistantMessage: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        text:
          "Recebido. Quando ligarmos a IA, vou responder com recomendação personalizada, disponibilidade e próximo passo para marcação.",
      };

      setMessages((previous) => [...previous, userMessage, assistantMessage]);
      setValue("");
      setIsPanelOpen(true);
    },
    [],
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      if (!isSubmitDisabled) {
        submitMessage(value.trim());
      }
    },
    [isSubmitDisabled, submitMessage, value],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        if (!isSubmitDisabled) {
          submitMessage(value.trim());
        }
      }
    },
    [isSubmitDisabled, submitMessage, value],
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!showEffects || throttleRef.current || !containerRef.current) {
        return;
      }

      throttleRef.current = window.setTimeout(() => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          setMousePosition({
            x: ((event.clientX - rect.left) / rect.width) * 100,
            y: ((event.clientY - rect.top) / rect.height) * 100,
          });
        }
        throttleRef.current = null;
      }, 50);
    },
    [showEffects],
  );

  const addRipple = useCallback(
    (x: number, y: number) => {
      if (!showEffects || ripples.length >= 5) {
        return;
      }

      const newRipple = { x, y, id: Date.now() };
      setRipples((previous) => [...previous, newRipple]);
      window.setTimeout(() => {
        setRipples((previous) =>
          previous.filter((ripple) => ripple.id !== newRipple.id),
        );
      }, 600);
    },
    [ripples.length, showEffects],
  );

  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        addRipple(event.clientX - rect.left, event.clientY - rect.top);
      }
    },
    [addRipple],
  );

  const selectOption = useCallback((option: MenuOption) => {
    setSelectedOptions((previous) =>
      previous.includes(option) ? previous : [...previous, option],
    );
    setIsMenuOpen(false);
  }, []);

  const removeOption = useCallback((option: MenuOption) => {
    setSelectedOptions((previous) =>
      previous.filter((selected) => selected !== option),
    );
  }, []);

  const widthClass = useMemo(() => {
    if (selectedOptions.length > 0) {
      return "w-[min(92vw,24rem)]";
    }
    return expandOnFocus
      ? "w-[min(92vw,20rem)] focus-within:w-[min(92vw,24rem)]"
      : "w-[min(92vw,22rem)]";
  }, [expandOnFocus, selectedOptions.length]);

  const bgOpacity = Math.max(8, Math.min(28, Math.round(backgroundOpacity * 100)));

  return (
    <div className="pointer-events-none fixed bottom-5 right-4 z-[65] flex justify-end sm:bottom-6 sm:right-6">
      <div className="pointer-events-auto flex flex-col items-end">
        <AnimatePresence>
          {isPanelOpen && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mb-3 max-h-76 w-[min(92vw,24rem)] overflow-hidden border border-white/12 bg-[oklch(0.1_0.018_181/.92)] shadow-[0_28px_90px_oklch(0.02_0.01_176/.5)] backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-white/78">
                  <Sparkles className="size-4 text-[var(--gold)]" />
                  Concierge IA (pré-visualização)
                </div>
                <button
                  type="button"
                  aria-label="Fechar chat"
                  onClick={() => setIsPanelOpen(false)}
                  className="grid size-8 place-items-center text-white/50 transition hover:text-white"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="flex max-h-64 flex-col gap-3 overflow-y-auto p-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`max-w-[86%] border px-4 py-3 text-sm leading-6 ${
                      message.role === "assistant"
                        ? "border-white/10 bg-white/[0.04] text-white/72"
                        : "ml-auto border-[var(--gold)]/25 bg-[var(--gold)]/12 text-white"
                    }`}
                  >
                    {message.text}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isPanelOpen ? (
        <form
          onSubmit={handleSubmit}
          className={`${widthClass} transition-[width] duration-500 ease-out`}
        >
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
            className="group relative flex min-h-12 w-full flex-col overflow-visible border border-white/14 bg-white/[0.16] p-2 shadow-[0_18px_70px_oklch(0.02_0.01_176/.42)] backdrop-blur-xl"
            style={{ backgroundColor: `oklch(1 0 0 / ${bgOpacity / 100})` }}
          >
            <GlowEffects
              animationDuration={animationDuration}
              enabled={showEffects}
              glowIntensity={glowIntensity}
              mousePosition={mousePosition}
            />
            <RippleEffects enabled={showEffects} ripples={ripples} />

            <div className="relative z-20 flex items-center">
              <div ref={menuRef} className="relative">
                <button
                  type="button"
                  aria-label="Abrir opções do chat"
                  onClick={() => setIsMenuOpen((previous) => !previous)}
                  className="mr-1 grid size-8 place-items-center rounded-full bg-black/22 text-white/76 transition hover:bg-[var(--gold)] hover:text-black"
                >
                  <Plus className="size-4" />
                </button>
                <OptionsMenu
                  isOpen={isMenuOpen}
                  menuOptions={menuOptions}
                  onSelect={selectOption}
                />
              </div>

              <textarea
                ref={textareaRef}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                aria-label="Mensagem para o concierge IA"
                rows={1}
                disabled={disabled}
                className="relative z-20 max-h-24 min-h-8 flex-1 resize-none overflow-y-auto bg-transparent px-3 py-1 text-sm leading-[22px] text-white outline-none placeholder:text-white/45"
              />

              <SendButton isDisabled={isSubmitDisabled} />
            </div>

            {selectedOptions.length > 0 && (
              <div className="relative z-20 mt-2 flex flex-wrap gap-2 px-2">
                {selectedOptions.map((option) => (
                  <OptionTag
                    key={option}
                    option={option}
                    onRemove={removeOption}
                  />
                ))}
              </div>
            )}
          </div>
        </form>
        ) : (
          <motion.button
            type="button"
            aria-label="Abrir concierge IA"
            onClick={() => setIsPanelOpen(true)}
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="group grid size-12 place-items-center border border-[var(--gold)]/35 bg-[oklch(0.1_0.018_181/.82)] text-[var(--gold)] shadow-[0_14px_48px_oklch(0.02_0.01_176/.45)] backdrop-blur-xl transition hover:border-[var(--gold)]/70 hover:bg-[var(--gold)] hover:text-black sm:size-13"
          >
            <Sparkles className="size-5" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
