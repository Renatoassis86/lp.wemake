"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { stagger as staggerVariants, viewportDefaults } from "@/lib/motion";

type StaggerProps<T extends ElementType = "div"> = ComponentPropsWithoutRef<T> & {
  as?: T;
  delayChildren?: number;
  staggerChildren?: number;
  once?: boolean;
};

/**
 * Orchestrate a list of child reveals.
 * Pair with <Reveal /> children to inherit the fade-up variant.
 */
export function Stagger<T extends ElementType = "div">({
  as,
  delayChildren = 0.08,
  staggerChildren = 0.08,
  once = true,
  children,
  ...rest
}: StaggerProps<T>) {
  const reduced = useReducedMotion();
  const Comp = motion[(as ?? "div") as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const StaticTag = (as ?? "div") as ElementType;
    return <StaticTag {...(rest as object)}>{children}</StaticTag>;
  }

  return (
    <Comp
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: viewportDefaults.amount, margin: viewportDefaults.margin }}
      variants={staggerVariants(delayChildren, staggerChildren)}
      {...rest}
    >
      {children}
    </Comp>
  );
}
