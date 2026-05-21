import type { Transition, Variants } from "framer-motion";

/* ============================================================
   Motion System — cinematic, editorial, restrained.
   Curves chosen to feel like film camera moves, not toy animations.
   ============================================================ */

export const easing = {
  out: [0.16, 1, 0.3, 1] as const,        // ease-out-expo
  quart: [0.25, 1, 0.5, 1] as const,      // ease-out-quart
  inOut: [0.65, 0, 0.35, 1] as const,
  cinematic: [0.22, 1, 0.36, 1] as const,
  editorial: [0.6, 0.05, 0.01, 0.9] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
} as const;

export const duration = {
  instant: 0.12,
  fast: 0.24,
  base: 0.42,
  slow: 0.72,
  cinematic: 1.2,
  editorial: 1.6,
} as const;

/* ─── Reusable transitions ─────────────────────────────────── */

export const transitions = {
  cinematic: {
    duration: duration.cinematic,
    ease: easing.cinematic,
  } satisfies Transition,

  editorial: {
    duration: duration.editorial,
    ease: easing.editorial,
  } satisfies Transition,

  snap: {
    duration: duration.fast,
    ease: easing.out,
  } satisfies Transition,

  springSoft: {
    type: "spring",
    stiffness: 140,
    damping: 22,
    mass: 0.9,
  } satisfies Transition,
} as const;

/* ─── Variant presets ──────────────────────────────────────── */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: transitions.cinematic,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.editorial },
};

export const slideIn = (direction: "left" | "right" | "up" | "down" = "up"): Variants => {
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const sign = direction === "left" || direction === "up" ? -1 : 1;
  return {
    hidden: { opacity: 0, [axis]: 40 * sign },
    visible: {
      opacity: 1,
      [axis]: 0,
      transition: transitions.cinematic,
    },
  };
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transitions.cinematic },
};

/** Stagger container — orchestrates child reveals. */
export const stagger = (delayChildren = 0.08, staggerChildren = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren,
      staggerChildren,
    },
  },
});

/** Default in-view trigger config used by reveal components. */
export const viewportDefaults = {
  once: true,
  margin: "0px 0px -10% 0px",
  amount: 0.2,
} as const;

/* ─── Display headline character-split reveal ─────────────── */

export const charRise: Variants = {
  hidden: { opacity: 0, y: "0.6em" },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.cinematic,
      ease: easing.cinematic,
      delay: i * 0.025,
    },
  }),
};

/** Hover lift used by premium CTAs and cards. */
export const hoverLift = {
  rest: { y: 0, transition: transitions.snap },
  hover: { y: -2, transition: transitions.snap },
} as const;
