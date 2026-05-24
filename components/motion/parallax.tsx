"use client";

import { motion, useScroll, useTransform, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { useRef } from "react";

type ParallaxProps = HTMLMotionProps<"div"> & {
  /** Pixels of travel. Negative pulls upward as the user scrolls. */
  distance?: number;
  /** Scroll-progress range mapped to the travel range. */
  offset?: ["start end" | "start start", "end start" | "end end"];
};

/**
 * Subtle vertical parallax tied to viewport scroll progress.
 * Use sparingly — reserve for hero/manifesto layers, never body text.
 */
export function Parallax({
  distance = -80,
  offset = ["start end", "end start"],
  children,
  ...rest
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const y = useTransform(scrollYProgress, [0, 1], [0, distance]);

  return (
    <motion.div ref={ref} style={reduced ? undefined : { y }} {...rest}>
      {children}
    </motion.div>
  );
}
