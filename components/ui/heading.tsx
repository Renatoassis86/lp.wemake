import { cn } from "@/lib/utils";
import { createElement, type ComponentPropsWithoutRef, type ElementType } from "react";

type Level = "display" | "h1" | "h2" | "h3" | "h4";
type Tone = "default" | "gradient" | "ivory";

type HeadingProps<T extends ElementType = "h2"> = ComponentPropsWithoutRef<T> & {
  as?: T;
  level?: Level;
  tone?: Tone;
};

const levelClasses: Record<Level, string> = {
  display: "text-[var(--text-display)] leading-[0.95]",
  h1: "text-[var(--text-6xl)] leading-[1]",
  h2: "text-[var(--text-4xl)] leading-[1.05]",
  h3: "text-[var(--text-2xl)] leading-[1.15]",
  h4: "text-[var(--text-xl)] leading-[1.25]",
};

const toneClasses: Record<Tone, string> = {
  default: "text-foreground",
  gradient: "text-gradient-cinematic",
  ivory: "text-ivory-50",
};

export function Heading<T extends ElementType = "h2">({
  as,
  level = "h2",
  tone = "default",
  className,
  ...rest
}: HeadingProps<T>) {
  const Tag = (as ?? "h2") as ElementType;
  return createElement(Tag, {
    className: cn(
      "font-display font-light",
      "display-balance",
      levelClasses[level],
      toneClasses[tone],
      className,
    ),
    ...rest,
  });
}
