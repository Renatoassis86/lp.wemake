/**
 * Responsive breakpoint constants - mirror the Tailwind config
 * so JS-driven measurements (motion, IO thresholds) stay in lockstep with CSS.
 */
export const breakpoints = {
  xs: 360,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
  "3xl": 1920,
} as const;

export type Breakpoint = keyof typeof breakpoints;

export const mediaQueries = {
  xs: `(min-width: ${breakpoints.xs}px)`,
  sm: `(min-width: ${breakpoints.sm}px)`,
  md: `(min-width: ${breakpoints.md}px)`,
  lg: `(min-width: ${breakpoints.lg}px)`,
  xl: `(min-width: ${breakpoints.xl}px)`,
  "2xl": `(min-width: ${breakpoints["2xl"]}px)`,
  reducedMotion: "(prefers-reduced-motion: reduce)",
  hoverCapable: "(hover: hover) and (pointer: fine)",
  dark: "(prefers-color-scheme: dark)",
} as const;
