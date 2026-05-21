"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { fadeUp, viewportDefaults } from "@/lib/motion";

type RevealProps<T extends ElementType = "div"> = ComponentPropsWithoutRef<T> & {
  as?: T;
  delay?: number;
  variants?: Variants;
  once?: boolean;
};

/**
 * Scroll-triggered reveal — applies the default cinematic fade-up.
 * Honors `prefers-reduced-motion` by skipping animation entirely.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  delay = 0,
  variants = fadeUp,
  once = true,
  children,
  ...rest
}: RevealProps<T>) {
  const reduced = useReducedMotion();
  const Comp = motion[(as ?? "div") as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const StaticTag = (as ?? "div") as ElementType;
    const Static = StaticTag as ElementType;
    return <Static {...(rest as object)}>{children}</Static>;
  }

  return (
    <Comp
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: viewportDefaults.amount, margin: viewportDefaults.margin }}
      variants={variants}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
