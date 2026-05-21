import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1",
    "text-[0.6875rem] font-mono uppercase tracking-[0.16em]",
    "border backdrop-blur-md",
  ],
  {
    variants: {
      tone: {
        default: "border-white/10 bg-white/[0.03] text-foreground/80",
        glow: "border-glow-cyan/30 bg-glow-cyan/10 text-glow-cyan",
        violet: "border-glow-violet/30 bg-glow-violet/10 text-glow-violet",
        amber: "border-glow-amber/30 bg-glow-amber/10 text-glow-amber",
      },
    },
    defaultVariants: { tone: "default" },
  },
);

type BadgeProps = ComponentPropsWithoutRef<"span"> & VariantProps<typeof badgeVariants>;

export function Badge({ className, tone, ...rest }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...rest} />;
}
