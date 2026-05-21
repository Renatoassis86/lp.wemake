import { cn } from "@/lib/utils";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  ComponentPropsWithoutRef<"textarea">
>(function Textarea({ className, rows = 4, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        "w-full bg-transparent resize-y",
        "px-4 py-3 rounded-xl",
        "border border-white/10 hover:border-white/20 focus:border-glow-cyan/60",
        "text-[0.9375rem] text-foreground placeholder:text-foreground/35",
        "transition-colors duration-300 ease-[var(--ease-cinematic)]",
        "focus:outline-none focus:ring-2 focus:ring-glow-cyan/30",
        className,
      )}
      {...props}
    />
  );
});
