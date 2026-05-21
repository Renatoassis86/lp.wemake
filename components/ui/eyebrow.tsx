import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

type EyebrowProps = ComponentPropsWithoutRef<"div"> & {
  withDot?: boolean;
};

/** Editorial micro-label. Used above every section title. */
export function Eyebrow({ withDot = true, className, children, ...rest }: EyebrowProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 font-mono uppercase",
        "text-[0.6875rem] tracking-[0.22em] text-ink-300/80",
        className,
      )}
      {...rest}
    >
      {withDot && (
        <span
          className="size-1.5 rounded-full bg-glow-cyan shadow-[0_0_12px_rgba(96,165,250,0.7)]"
          aria-hidden
        />
      )}
      <span>{children}</span>
    </div>
  );
}
