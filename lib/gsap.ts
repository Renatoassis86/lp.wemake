"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single registration point for GSAP plugins.
 * Import this module once from any client component that needs
 * ScrollTrigger; subsequent imports are inert.
 */
let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return { gsap, ScrollTrigger };
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
  return { gsap, ScrollTrigger };
}

export { gsap, ScrollTrigger };
