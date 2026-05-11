import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "ghost";
type ButtonSize = "default" | "lg" | "sm";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "border-transparent bg-[#6ee7b7] text-[#03140a] shadow-[0_22px_58px_rgba(16,185,129,0.32)] hover:bg-white hover:shadow-[0_28px_72px_rgba(110,231,183,0.42)]",
  outline:
    "border-white/16 bg-white/[0.055] text-white/82 backdrop-blur-xl hover:border-white/32 hover:bg-white/[0.095] hover:text-white",
  ghost: "border-transparent bg-transparent text-white/74 hover:bg-white/[0.06] hover:text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-xs",
  default: "min-h-12 px-5 text-sm",
  lg: "min-h-[3.35rem] px-7 text-sm md:px-8",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full border font-black leading-none transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };
