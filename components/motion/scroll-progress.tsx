"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Hairline scroll progress indicator at the top of the viewport.
 * Subtle, cinematic — a single glowing bar tied to document scroll.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="
        pointer-events-none fixed inset-x-0 top-0 z-[var(--z-nav)]
        h-px origin-left
        bg-gradient-to-r from-glow-cyan via-glow-blue to-glow-violet
        shadow-[0_0_24px_rgba(96,165,250,0.45)]
      "
    />
  );
}
