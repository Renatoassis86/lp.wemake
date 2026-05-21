import { cn } from "@/lib/utils";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>(function Input({ className, type = "text", ...props }, ref) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "w-full bg-transparent",
        "h-12 px-4 rounded-xl",
        "border border-white/10 hover:border-white/20 focus:border-glow-cyan/60",
        "text-[0.9375rem] text-foreground placeholder:text-foreground/35",
        "transition-colors duration-300 ease-[var(--ease-cinematic)]",
        "focus:outline-none focus:ring-2 focus:ring-glow-cyan/30",
        "disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});
