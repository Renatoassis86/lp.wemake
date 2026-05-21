"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight } from "lucide-react";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group/btn relative inline-flex items-center justify-center gap-2",
    "font-sans font-medium whitespace-nowrap",
    "rounded-full select-none isolate",
    "transition-[transform,background,box-shadow,color] duration-300 ease-[var(--ease-cinematic)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.985]",
  ],
  {
    variants: {
      variant: {
        primary: [
          "text-ink-950",
          "bg-[radial-gradient(120%_140%_at_50%_-20%,#fff_0%,#cfe2ff_45%,#9fc1f5_100%)]",
          "shadow-[0_8px_32px_-8px_rgba(96,165,250,0.55),inset_0_1px_0_rgba(255,255,255,0.6)]",
          "hover:shadow-[0_16px_48px_-12px_rgba(96,165,250,0.7),inset_0_1px_0_rgba(255,255,255,0.7)]",
          "hover:-translate-y-px",
        ],
        secondary: [
          "text-foreground",
          "bg-white/[0.04] border border-white/10",
          "backdrop-blur-md",
          "hover:bg-white/[0.07] hover:border-white/20",
        ],
        ghost: [
          "text-foreground/80 hover:text-foreground",
          "hover:bg-white/[0.04]",
        ],
        link: [
          "text-foreground/85 hover:text-foreground",
          "rounded-none px-0 underline-offset-[6px] decoration-white/30 hover:decoration-white/80",
          "underline",
        ],
        outline: [
          "text-foreground",
          "border border-white/12 hover:border-white/24",
          "bg-transparent",
        ],
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-[0.9375rem]",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-[1.0625rem]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    trailingIcon?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild, trailingIcon, children, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      <span className="relative inline-flex items-center gap-2">
        {children}
        {trailingIcon && (
          <ArrowUpRight
            className="size-[1.05em] -mr-0.5 transition-transform duration-300 ease-[var(--ease-cinematic)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            aria-hidden
          />
        )}
      </span>
    </Comp>
  );
});

export { buttonVariants };
