import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Compose Tailwind class strings with conflict resolution.
 * The single import path used across the design system.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function range(start: number, end: number, step = 1): number[] {
  const out: number[] = [];
  for (let i = start; i < end; i += step) out.push(i);
  return out;
}

/** Map a number from one range to another (useful for scroll-driven motion). */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
