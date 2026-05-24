"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type SceneCounterProps = {
  active: string | null;
  scenes: { id: string; number: string; eyebrow?: string }[];
  visible: boolean;
};

/**
 * Fixed scene counter — appears in the viewport gutter while the
 * cinematic sequence is in view. Premium documentary detail.
 *
 * Renders as a vertical rail of scene numbers; the active one glows
 * and reveals its eyebrow inline.
 */
export function SceneCounter({ active, scenes, visible }: SceneCounterProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
          className="
            pointer-events-none
            fixed right-5 top-1/2 -translate-y-1/2 z-[var(--z-sticky)]
            hidden md:block
          "
        >
          <ol className="flex flex-col gap-3">
            {scenes.map((s) => {
              const isActive = active === s.id;
              return (
                <li key={s.id} className="flex items-center justify-end gap-3">
                  <AnimatePresence>
                    {isActive && s.eyebrow && (
                      <motion.span
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-white/65 whitespace-nowrap"
                      >
                        {s.eyebrow}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <span
                    className={cn(
                      "font-mono tabular-nums tracking-[0.22em]",
                      "transition-colors duration-500",
                      isActive
                        ? "text-glow-cyan text-sm"
                        : "text-white/30 text-[0.625rem]",
                    )}
                  >
                    {s.number}
                  </span>
                  <span
                    className={cn(
                      "rounded-full transition-all duration-500",
                      isActive
                        ? "size-2 bg-glow-cyan shadow-[0_0_12px_rgba(96,165,250,0.8)]"
                        : "size-1 bg-white/30",
                    )}
                  />
                </li>
              );
            })}
          </ol>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
