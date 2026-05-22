"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { chapters } from "@/constants/chapters";
import { cn } from "@/lib/utils";

/**
 * Chapter Rail — indicador vertical fixo dos 14 atos.
 *
 *  - Renderiza um traço por capítulo no flanco esquerdo (md+).
 *  - O capítulo ativo escala, ganha cor e revela seu título inline.
 *  - Detecção via IntersectionObserver compartilhado, com rootMargin
 *    centralizando a "linha de leitura" no meio do viewport.
 *  - Clique navega via #anchor; o smooth-scroll do Lenis cuida do resto.
 *  - Hover de qualquer marca expande a aside inteira (lista de títulos).
 *  - Aparece apenas depois que o usuário sai da dobra do hero, para não
 *    competir com o impacto visual da abertura.
 *
 * Não conflita com o <SceneCounter /> da sequência cinematográfica
 * (este vive na direita) nem com o <FloatingWhatsapp /> (canto inferior).
 */
export function ChapterRail() {
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  /* Unique anchors only — o cta (XIII) e o contact (XIV) compartilham
     a âncora #reuniao mas continuam contando como capítulos no rail. */
  const observedAnchors = useMemo(
    () => Array.from(new Set(chapters.map((c) => c.anchor))),
    [],
  );

  /* Show/hide based on scroll past the hero. */
  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > Math.max(window.innerHeight * 0.6, 480));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active chapter detection. */
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const elements = observedAnchors
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the largest intersection ratio currently visible.
        const visibleEntries = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visibleEntries[0];
        if (top?.target.id) setActiveAnchor(top.target.id);
      },
      {
        // A reading line at ~35% of the viewport — feels like the cinema "eye line".
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [observedAnchors]);

  if (chapters.length === 0) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Capítulos da landing"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="
            fixed left-4 top-1/2 -translate-y-1/2 z-[var(--z-sticky)]
            hidden md:block
          "
        >
          <ol className="flex flex-col gap-2.5">
            {chapters.map((chapter, i) => {
              const isActive = activeAnchor === chapter.anchor;
              return (
                <li key={chapter.id}>
                  <a
                    href={`#${chapter.anchor}`}
                    aria-label={`Capítulo ${chapter.number} — ${chapter.title}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group/cr relative flex items-center gap-3",
                      "outline-none focus-visible:ring-0",
                    )}
                  >
                    {/* Tick — width responds to active/hover */}
                    <motion.span
                      aria-hidden
                      layout
                      className={cn(
                        "block h-px rounded-full",
                        "transition-colors duration-500 ease-[var(--ease-cinematic)]",
                        isActive
                          ? "bg-glow-cyan shadow-[0_0_10px_rgba(96,165,250,0.7)]"
                          : "bg-foreground/25 group-hover/cr:bg-foreground/55",
                      )}
                      animate={{
                        width: isActive ? 28 : hovered ? 18 : 12,
                        height: isActive ? 2 : 1,
                      }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Inline reveal: chapter number always; title on hover or active */}
                    <AnimatePresence>
                      {(hovered || isActive) && (
                        <motion.span
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -6 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                            delay: hovered ? i * 0.012 : 0,
                          }}
                          className="
                            flex items-center gap-3
                            whitespace-nowrap pointer-events-none
                          "
                        >
                          <span
                            className={cn(
                              "font-mono tabular-nums",
                              "text-[0.625rem] tracking-[0.22em]",
                              isActive ? "text-glow-cyan" : "text-foreground/55",
                            )}
                          >
                            {chapter.number}
                          </span>
                          <span
                            className={cn(
                              "font-mono text-[0.625rem] uppercase tracking-[0.18em]",
                              isActive ? "text-foreground/85" : "text-foreground/50",
                            )}
                          >
                            {chapter.title}
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </a>
                </li>
              );
            })}
          </ol>

          {/* Rail summary footer — fades in with hover */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="mt-5 pl-1 font-mono text-[0.5625rem] uppercase tracking-[0.28em] text-foreground/40"
              >
                {chapters.length} atos · arco narrativo
              </motion.div>
            )}
          </AnimatePresence>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
