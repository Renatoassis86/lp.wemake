"use client";

import Image from "next/image";
import { useState } from "react";
import type { SceneFocal, SceneTone } from "@/data/scenes";
import { cn } from "@/lib/utils";

type CinematicImageProps = {
  src?: string;
  alt: string;
  tone: SceneTone;
  focal?: SceneFocal;
  /** Visual caption rendered on the fallback (when image is absent). */
  fallbackCaption?: string;
  className?: string;
  priority?: boolean;
  /** Pixels of intrinsic over-render — supports ken-burns scale without exposing edges. */
  overrender?: number;
};

const focalMap: Record<SceneFocal, string> = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
  left: "object-left",
  right: "object-right",
};

/**
 * Cinematic image surface.
 *
 *  - Tries to render a real photograph via Next/Image.
 *  - On 404 or load error, gracefully swaps to a rich atmospheric
 *    placeholder (multi-stop gradient + grain + silhouette) so the
 *    section stays cinematic even before the institutional photo set lands.
 */
export function CinematicImage({
  src,
  alt,
  tone,
  focal = "center",
  fallbackCaption,
  className,
  priority = false,
  overrender = 24,
}: CinematicImageProps) {
  const [errored, setErrored] = useState(false);
  const showFallback = !src || errored;

  return (
    <div
      className={cn(
        "relative size-full overflow-hidden",
        className,
      )}
      style={{
        // The image element is over-sized so that scale/translate
        // transforms (ken-burns, parallax) never expose hard edges.
        ["--overrender" as string]: `${overrender}px`,
      }}
    >
      {!showFallback && src && (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={88}
          sizes="(min-width: 1280px) 96vw, 100vw"
          onError={() => setErrored(true)}
          className={cn(
            "absolute inset-[calc(var(--overrender)*-1)] size-[calc(100%+var(--overrender)*2)]",
            "object-cover",
            focalMap[focal],
          )}
        />
      )}

      {showFallback && <FallbackAtmosphere tone={tone} caption={fallbackCaption ?? alt} />}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Fallback atmosphere — deliberately beautiful.
   Used while the institutional photography set is being produced.
   ───────────────────────────────────────────────────────────── */

const toneStops: Record<SceneTone, string> = {
  cool:
    "radial-gradient(80% 70% at 70% 30%, rgba(59,130,246,0.30) 0%, transparent 60%), radial-gradient(80% 80% at 30% 80%, rgba(15,23,42,0.85) 0%, rgba(4,8,20,1) 100%)",
  warm:
    "radial-gradient(80% 70% at 60% 30%, rgba(212,165,116,0.28) 0%, transparent 60%), radial-gradient(90% 80% at 30% 80%, rgba(63,38,28,0.65) 0%, rgba(8,10,20,1) 100%)",
  violet:
    "radial-gradient(80% 70% at 70% 30%, rgba(139,92,246,0.32) 0%, transparent 60%), radial-gradient(80% 80% at 30% 80%, rgba(28,14,52,0.85) 0%, rgba(4,8,20,1) 100%)",
  amber:
    "radial-gradient(60% 60% at 50% 30%, rgba(245,200,140,0.18) 0%, transparent 60%), radial-gradient(80% 80% at 50% 80%, rgba(50,32,18,0.6) 0%, rgba(8,10,20,1) 100%)",
  ink:
    "radial-gradient(60% 60% at 50% 30%, rgba(96,165,250,0.16) 0%, transparent 60%), linear-gradient(180deg, rgba(8,12,28,1) 0%, rgba(4,8,20,1) 100%)",
  ivory:
    "radial-gradient(80% 70% at 50% 40%, rgba(232,224,207,0.18) 0%, transparent 60%), radial-gradient(80% 80% at 30% 80%, rgba(28,30,40,0.7) 0%, rgba(4,8,20,1) 100%)",
};

function FallbackAtmosphere({ tone, caption }: { tone: SceneTone; caption: string }) {
  return (
    <div aria-hidden className="absolute inset-0">
      <div className="absolute inset-0" style={{ background: toneStops[tone] }} />

      {/* Subtle horizon hairline — gives the frame a "shot composition". */}
      <div className="absolute inset-x-0 top-[58%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* Soft human silhouette — barely visible, enough to suggest the subject. */}
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full opacity-[0.07]"
      >
        <defs>
          <radialGradient id={`silh-${tone}`} cx="50%" cy="65%" r="40%">
            <stop offset="0%" stopColor="white" stopOpacity="0.95" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="400" cy="270" r="60" fill={`url(#silh-${tone})`} />
        <path
          d="M 320 540 Q 400 360 480 540 Z"
          fill={`url(#silh-${tone})`}
        />
      </svg>

      {/* Film grain overlay */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-[0.08]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Caption — only inside fallback */}
      <div className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink-950/60 backdrop-blur px-3 py-1.5">
        <span className="size-1.5 rounded-full bg-glow-amber/80 shadow-[0_0_8px_rgba(212,165,116,0.7)]" />
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-foreground/55">
          Foto institucional · em produção
        </span>
      </div>

      <span className="sr-only">{caption}</span>
    </div>
  );
}
