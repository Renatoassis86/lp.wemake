"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

interface Options extends IntersectionObserverInit {
  /** Disconnect after the first intersection — common for reveal animations. */
  once?: boolean;
}

/**
 * Track whether an element is visible in the viewport.
 * Returns the ref and a boolean — designed to drive scroll-reveal animations.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: Options = {},
): [RefObject<T | null>, boolean] {
  const { once = true, root = null, rootMargin = "0px 0px -10% 0px", threshold = 0.15 } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { root, rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, root, rootMargin, threshold]);

  return [ref, inView];
}
