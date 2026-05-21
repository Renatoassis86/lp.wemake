"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import type { Scene } from "@/data/scenes";
import { CinematicImage } from "./cinematic-image";
import { cn } from "@/lib/utils";

type SceneFrameProps = {
  scene: Scene;
  index: number;
  total: number;
  priority?: boolean;
  /** Optional callback for parent to track active scene (scene counter, analytics). */
  onActive?: (id: string) => void;
};

/* ─── Caption positioning grid ───────────────────────────────── */
const positionClasses: Record<NonNullable<Scene["position"]>, string> = {
  centered: "items-center text-center justify-self-center max-w-3xl",
  "lower-left": "justify-self-start self-end text-left max-w-2xl",
  "lower-right": "justify-self-end self-end text-left sm:text-right max-w-2xl",
  "upper-left": "justify-self-start self-start text-left max-w-2xl",
  "upper-right": "justify-self-end self-start text-left sm:text-right max-w-2xl",
};

/**
 * Full-bleed cinematic frame — the atomic unit of the storytelling sequence.
 *
 * Camadas, de baixo para cima:
 *   1. Imagem (com over-render p/ parallax + ken-burns)
 *   2. Gradiente cinematográfico (vinheta + base escura para legibilidade)
 *   3. Tipografia editorial (revelada por scroll)
 *   4. Marcadores: número da cena, eyebrow, contador progressivo
 *
 * Tudo orquestrado por `useScroll({ target: ref })`. Reduced-motion
 * desliga ken-burns/parallax mas preserva fades de tipografia.
 */
export function SceneFrame({
  scene,
  index,
  total,
  priority = false,
  onActive,
}: SceneFrameProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax — image moves slower than the section (negative pulls upward).
  const parallaxDistance = scene.parallax ?? -80;
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [-parallaxDistance, parallaxDistance],
  );

  // Ken-burns — gentle scale that peaks while the frame is centered.
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduced ? [1, 1, 1] : [1.08, 1.02, 1.12],
  );

  // Text reveal — fades + blurs in/out as the scene crosses center.
  const textOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.32, 0.72, 0.95],
    [0, 1, 1, 0],
  );
  const textY = useTransform(
    scrollYProgress,
    [0.05, 0.32],
    reduced ? [0, 0] : [40, 0],
  );
  const textBlur = useTransform(
    scrollYProgress,
    [0.05, 0.32, 0.72, 0.95],
    reduced ? ["blur(0px)", "blur(0px)", "blur(0px)", "blur(0px)"] : ["blur(10px)", "blur(0px)", "blur(0px)", "blur(8px)"],
  );

  return (
    <motion.section
      ref={ref}
      aria-roledescription="cinematic scene"
      aria-label={scene.headline}
      onViewportEnter={() => onActive?.(scene.id)}
      viewport={{ amount: 0.55 }}
      className="
        relative isolate
        h-[100svh] min-h-[640px] w-full
        overflow-hidden
      "
    >
      {/* Layer 1 — Image with parallax + ken-burns */}
      <motion.div
        className="absolute inset-0 -z-20"
        style={{ y: imageY, scale: imageScale }}
      >
        <CinematicImage
          src={scene.src}
          alt={scene.alt ?? scene.headline}
          tone={scene.tone}
          focal={scene.focal}
          fallbackCaption={scene.alt ?? scene.headline}
          priority={priority}
        />
      </motion.div>

      {/* Layer 2 — Vignette + base gradient for caption legibility */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, rgba(4,8,20,0) 0%, rgba(4,8,20,0.25) 60%, rgba(4,8,20,0.75) 100%), linear-gradient(180deg, rgba(4,8,20,0.55) 0%, rgba(4,8,20,0) 25%, rgba(4,8,20,0) 60%, rgba(4,8,20,0.92) 100%)",
        }}
      />

      {/* Layer 3 — Fixed scene markers (top-left + top-right) */}
      <div className="container-rail relative z-10 pt-[max(env(safe-area-inset-top),2rem)] sm:pt-10">
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-3">
            <span className="font-display italic text-3xl text-foreground/60 select-none">
              {scene.number}
            </span>
            <div className="hidden sm:block h-px w-12 bg-gradient-to-r from-white/40 to-transparent" />
            <span className="hidden sm:inline font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-foreground/55">
              {scene.eyebrow}
            </span>
          </div>
          <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-ink-950/55 backdrop-blur px-3 py-1">
            <span className="font-mono text-[0.625rem] tabular-nums tracking-[0.22em] text-foreground/85">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-[0.625rem] text-foreground/35">/</span>
            <span className="font-mono text-[0.625rem] tabular-nums tracking-[0.22em] text-foreground/40">
              {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Layer 4 — Caption grid (positioned by scene.position) */}
      <div
        className={cn(
          "container-rail relative z-10",
          "h-[calc(100%-6rem)]",
          "grid items-end pb-16 sm:pb-20",
        )}
      >
        <motion.div
          style={{ opacity: textOpacity, y: textY, filter: textBlur }}
          className={cn(
            "flex flex-col gap-5",
            positionClasses[scene.position ?? "lower-left"],
          )}
        >
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-glow-cyan sm:hidden">
            {scene.eyebrow}
          </span>
          <h3
            className="
              font-display font-light tracking-[-0.03em]
              text-balance text-ivory-50
              text-[clamp(2rem,1.4rem+3.5vw,4.75rem)] leading-[1.05]
              drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)]
            "
          >
            {scene.headline}
          </h3>
          {scene.caption && (
            <p className="max-w-xl text-[1rem] sm:text-[1.0625rem] leading-[1.6] text-foreground/80 drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)]">
              {scene.caption}
            </p>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
