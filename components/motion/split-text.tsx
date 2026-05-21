"use client";

import { motion, useReducedMotion } from "framer-motion";
import { charRise, viewportDefaults } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SplitTextProps = {
  text: string;
  className?: string;
  /** Split granularity — "word" reads more elegantly for editorial headlines. */
  by?: "word" | "char";
  delay?: number;
};

/**
 * Cinematic headline reveal — rises words/chars individually
 * with a per-element delay. Honors reduced-motion.
 */
export function SplitText({
  text,
  className,
  by = "word",
  delay = 0,
}: SplitTextProps) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{text}</span>;

  const tokens = by === "word" ? text.split(" ") : Array.from(text);
  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportDefaults.amount, margin: viewportDefaults.margin }}
      aria-label={text}
    >
      {tokens.map((token, i) => (
        <span
          key={`${token}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden align-baseline"
        >
          <motion.span
            className="inline-block"
            custom={i + delay * 40}
            variants={charRise}
            style={{ paddingRight: by === "word" ? "0.25em" : undefined }}
          >
            {token}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
