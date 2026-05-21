"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll provider.
 * Lenis drives an inertia-based scroll while preserving native scroll APIs,
 * so anchors, ScrollTrigger, and IntersectionObserver continue to work.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      lerp: 0.1,
    });

    lenisRef.current = lenis;
    document.documentElement.classList.add("lenis");

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("lenis");
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
