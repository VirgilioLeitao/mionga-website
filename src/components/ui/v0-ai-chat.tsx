"use client";

import { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  ImageIcon,
  FileUp,
  PenToolIcon,
  MonitorIcon,
  CircleUserRound,
  ArrowUpIcon,
  Paperclip,
  PlusIcon,
} from "lucide-react";

interface UseAutoResizeTextareaProps {
  minHeight: number;
  maxHeight?: number;
}

function useAutoResizeTextarea({ minHeight, maxHeight }: UseAutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      textarea.style.height = `${minHeight}px`;

      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY),
      );

      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight],
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${minHeight}px`;
    }
  }, [minHeight]);

  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [adjustHeight]);

  return { textareaRef, adjustHeight };
}

export function VercelV0Chat() {
  const [value, setValue] = useState("");
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 200,
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        setValue("");
        adjustHeight(true);
      }
    }
  };

  return (
    <div className="flex w-full max-w-4xl flex-col items-center space-y-8 p-4 mx-auto">
      <h1 className="text-4xl font-bold text-black dark:text-white">What can I help you ship?</h1>

      <div className="w-full">
        <div className="relative rounded-xl border border-neutral-800 bg-neutral-900">
          <div className="overflow-y-auto">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                adjustHeight();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask v0 a question..."
              className={cn(
                "w-full px-4 py-3",
                "resize-none",
                "bg-transparent",
                "border-none",
                "text-white text-sm",
                "focus:outline-none",
                "focus-visible:ring-0 focus-visible:ring-offset-0",
                "placeholder:text-neutral-500 placeholder:text-sm",
                "min-h-[60px]",
              )}
              style={{
                overflow: "hidden",
              }}
            />
          </div>

          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="group flex items-center gap-1 rounded-lg p-2 transition-colors hover:bg-neutral-800"
              >
                <Paperclip className="h-4 w-4 text-white" />
                <span className="hidden text-xs text-zinc-400 transition-opacity group-hover:inline">
                  Attach
                </span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex items-center justify-between gap-1 rounded-lg border border-dashed border-zinc-700 px-2 py-1 text-sm text-zinc-400 transition-colors hover:border-zinc-600 hover:bg-zinc-800"
              >
                <PlusIcon className="h-4 w-4" />
                Project
              </button>
              <button
                type="button"
                className={cn(
                  "flex items-center justify-between gap-1 rounded-lg border border-zinc-700 px-1.5 py-1.5 text-sm transition-colors hover:border-zinc-600 hover:bg-zinc-800",
                  value.trim() ? "bg-white text-black" : "text-zinc-400",
                )}
              >
                <ArrowUpIcon
                  className={cn("h-4 w-4", value.trim() ? "text-black" : "text-zinc-400")}
                />
                <span className="sr-only">Send</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <ActionButton icon={<ImageIcon className="h-4 w-4" />} label="Clone a Screenshot" />
          <ActionButton icon={<PenToolIcon className="h-4 w-4" />} label="Import from Figma" />
          <ActionButton icon={<FileUp className="h-4 w-4" />} label="Upload a Project" />
          <ActionButton icon={<MonitorIcon className="h-4 w-4" />} label="Landing Page" />
          <ActionButton icon={<CircleUserRound className="h-4 w-4" />} label="Sign Up Form" />
        </div>
      </div>
    </div>
  );
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
}

function ActionButton({ icon, label }: ActionButtonProps) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
}
