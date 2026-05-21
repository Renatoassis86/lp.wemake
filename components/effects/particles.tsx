"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

type ParticlesProps = {
  count?: number;
  className?: string;
  /** Visual scale — controls dot size + travel distance. */
  density?: "subtle" | "base" | "lush";
  /** Seed makes the positions deterministic (avoid hydration mismatch). */
  seed?: number;
};

/**
 * Cinematic particle ambience.
 *
 * Pure CSS — pre-computed positions, animated via `transform` with
 * randomized duration/delay. GPU-friendly, runs at 60fps even with 80 dots.
 * Hidden under `prefers-reduced-motion`.
 */
export function Particles({
  count = 48,
  className,
  density = "base",
  seed = 17,
}: ParticlesProps) {
  const particles = useMemo(() => {
    // Mulberry32 — deterministic, no Date.now reads -> SSR-safe.
    let s = seed >>> 0;
    const rand = () => {
      s += 0x6d2b79f5;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    const sizeBase = density === "lush" ? 2.5 : density === "subtle" ? 1.2 : 1.8;

    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: rand() * 100,
      top: rand() * 100,
      size: sizeBase + rand() * 1.6,
      delay: rand() * 12,
      duration: 14 + rand() * 22,
      opacity: 0.25 + rand() * 0.55,
      hue: rand() > 0.7 ? "violet" : rand() > 0.45 ? "blue" : "cyan",
    }));
  }, [count, density, seed]);

  const hueMap = {
    cyan: "rgb(96 165 250)",
    blue: "rgb(59 130 246)",
    violet: "rgb(139 92 246)",
  } as const;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        "motion-reduce:hidden",
        className,
      )}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full will-change-transform"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: hueMap[p.hue as keyof typeof hueMap],
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 4}px ${hueMap[p.hue as keyof typeof hueMap]}`,
            animation: `particle-drift ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes particle-drift {
          0% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(8px, -14px, 0);
          }
          100% {
            transform: translate3d(-6px, 10px, 0);
          }
        }
      `}</style>
    </div>
  );
}
