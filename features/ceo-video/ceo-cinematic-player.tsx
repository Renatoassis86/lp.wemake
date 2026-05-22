"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export type CeoPlayerHandle = {
  /** Programmatically seek to an absolute second offset. */
  seekTo: (seconds: number) => void;
};

type CeoCinematicPlayerProps = {
  src: string;
  poster?: string;
  captions?: string;
  className?: string;

  /** Talk title rendered on the premium poster overlay. */
  talkTitle: string;
  /** Speaker line — "Com Dênis · CEO We Make". */
  speakerLine: string;
  /** Duration label, e.g. "8 min 24s". */
  durationLabel?: string;
  /** Tiny eyebrow above the talk title on the poster. */
  eyebrow?: string;

  /** When true, the video begins muted and plays as soon as it enters
   *  the viewport — like the Apple keynote idiom. Off when reduced motion. */
  softAutoplay?: boolean;
};

const breath: Variants = {
  rest: { scale: 1, opacity: 0.55 },
  pulse: { scale: [1, 1.6, 1.9], opacity: [0.55, 0.15, 0] },
};

/**
 * Premium cinematic video player — TED Talk × Netflix doc × Apple keynote.
 *
 *  - Editorial poster with talk title, eyebrow and speaker line
 *  - Breathing concentric rings around the play button
 *  - Optional soft autoplay (starts muted in-viewport, user unmutes via "Som")
 *  - Hover glow that intensifies on the container
 *  - Sophisticated WebVTT subtitles (styled via ::cue in globals.css)
 *  - Slide-up controls that auto-hide during playback
 *  - Imperative `seekTo()` to wire up chapter markers from the parent
 */
export const CeoCinematicPlayer = forwardRef<CeoPlayerHandle, CeoCinematicPlayerProps>(
  function CeoCinematicPlayer(
    {
      src,
      poster,
      captions,
      className,
      talkTitle,
      speakerLine,
      durationLabel,
      eyebrow = "Documentário institucional · We Make",
      softAutoplay = true,
    },
    ref,
  ) {
    const reduced = useReducedMotion();
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [hasInteracted, setHasInteracted] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const [hovered, setHovered] = useState(false);
    const [showControls, setShowControls] = useState(true);

    /* ─── Imperative API for chapter markers ───────────────────── */
    useImperativeHandle(ref, () => ({
      seekTo(seconds: number) {
        const v = videoRef.current;
        if (!v) return;
        v.currentTime = seconds;
        if (v.paused) {
          v.play().catch(() => {});
        }
        setHasInteracted(true);
      },
    }), []);

    /* ─── Soft autoplay on viewport entry ──────────────────────── */
    useEffect(() => {
      const v = videoRef.current;
      const c = containerRef.current;
      if (!v || !c || !softAutoplay || reduced || hasInteracted) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return;
          if (entry.isIntersecting && entry.intersectionRatio > 0.55) {
            v.muted = true;
            v.play().catch(() => {});
          }
        },
        { threshold: [0, 0.25, 0.55, 0.85] },
      );
      observer.observe(c);
      return () => observer.disconnect();
    }, [softAutoplay, reduced, hasInteracted]);

    /* ─── Media event sync ─────────────────────────────────────── */
    useEffect(() => {
      const v = videoRef.current;
      if (!v) return;
      const onPlay = () => setPlaying(true);
      const onPause = () => setPlaying(false);
      const onTime = () => {
        if (v.duration > 0) setProgress(v.currentTime / v.duration);
      };
      const onVolume = () => setMuted(v.muted);
      v.addEventListener("play", onPlay);
      v.addEventListener("pause", onPause);
      v.addEventListener("timeupdate", onTime);
      v.addEventListener("volumechange", onVolume);
      return () => {
        v.removeEventListener("play", onPlay);
        v.removeEventListener("pause", onPause);
        v.removeEventListener("timeupdate", onTime);
        v.removeEventListener("volumechange", onVolume);
      };
    }, []);

    /* ─── Auto-hide controls during playback ───────────────────── */
    useEffect(() => {
      if (!playing) {
        setShowControls(true);
        return;
      }
      if (hovered) {
        setShowControls(true);
        return;
      }
      const t = window.setTimeout(() => setShowControls(false), 2200);
      return () => window.clearTimeout(t);
    }, [playing, hovered, progress]);

    const togglePlay = useCallback(() => {
      const v = videoRef.current;
      if (!v) return;
      setHasInteracted(true);
      if (v.paused) v.play().catch(() => {});
      else v.pause();
    }, []);

    const toggleMute = useCallback(() => {
      const v = videoRef.current;
      if (!v) return;
      v.muted = !v.muted;
      setMuted(v.muted);
      setHasInteracted(true);
    }, []);

    const requestFullscreen = useCallback(() => {
      const el = containerRef.current;
      if (!el) return;
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      else el.requestFullscreen().catch(() => {});
    }, []);

    const seekFromBar = (e: React.MouseEvent<HTMLDivElement>) => {
      const v = videoRef.current;
      if (!v || !v.duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      v.currentTime = ratio * v.duration;
    };

    // Show the poster overlay while the user hasn't interacted *and*
    // playback hasn't started (covers the muted-autoplay quiet-mode).
    const showPoster = !hasInteracted && !playing;

    return (
      <div
        ref={containerRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "group/cp relative isolate overflow-hidden",
          "rounded-[2rem] border border-white/12",
          "bg-ink-950",
          "shadow-[0_60px_140px_-40px_rgba(0,0,0,0.9)]",
          "aspect-video",
          "transition-[transform,box-shadow,border-color] duration-700 ease-[var(--ease-cinematic)]",
          "hover:border-white/20 hover:shadow-[0_70px_160px_-40px_rgba(96,165,250,0.4),0_60px_140px_-40px_rgba(0,0,0,0.9)]",
          className,
        )}
      >
        {/* Hover glow halo */}
        <div
          aria-hidden
          className="
            pointer-events-none absolute -inset-px rounded-[2rem]
            opacity-0 group-hover/cp:opacity-100
            transition-opacity duration-700
          "
          style={{
            background:
              "radial-gradient(60% 50% at 50% 100%, rgba(96,165,250,0.18) 0%, transparent 70%), radial-gradient(60% 50% at 50% 0%, rgba(139,92,246,0.14) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted={muted}
          playsInline
          preload="metadata"
          crossOrigin="anonymous"
          className="absolute inset-0 size-full object-cover"
          onClick={togglePlay}
        >
          {captions && (
            <track
              kind="subtitles"
              src={captions}
              srcLang="pt-BR"
              label="Português"
              default
            />
          )}
        </video>

        {/* ── Premium poster overlay ─────────────────────────────── */}
        <AnimatePresence>
          {showPoster && (
            <motion.div
              key="poster"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12"
              style={{
                background:
                  "radial-gradient(60% 40% at 50% 70%, rgba(96,165,250,0.16) 0%, transparent 60%), linear-gradient(180deg, rgba(4,8,20,0.55) 0%, rgba(4,8,20,0.2) 35%, rgba(4,8,20,0.55) 65%, rgba(4,8,20,0.95) 100%)",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink-950/55 backdrop-blur px-3 py-1">
                  <span className="size-1.5 rounded-full bg-glow-cyan shadow-[0_0_10px] shadow-glow-cyan animate-pulse" />
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.26em] text-foreground/70">
                    {eyebrow}
                  </span>
                </span>
                {durationLabel && (
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-foreground/55">
                    {durationLabel}
                  </span>
                )}
              </div>

              {/* Center — breathing play button */}
              <div className="flex flex-1 items-center justify-center">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label="Reproduzir vídeo"
                  className="relative inline-flex"
                >
                  {/* Concentric breathing rings */}
                  {!reduced && (
                    <>
                      {[0, 0.8, 1.6].map((delay) => (
                        <motion.span
                          key={delay}
                          aria-hidden
                          className="absolute inset-0 rounded-full bg-glow-cyan/35"
                          variants={breath}
                          initial="rest"
                          animate="pulse"
                          transition={{
                            duration: 3.2,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay,
                          }}
                        />
                      ))}
                    </>
                  )}

                  <span
                    className="
                      relative inline-flex size-20 sm:size-24 items-center justify-center
                      rounded-full
                      bg-[radial-gradient(120%_140%_at_50%_-20%,#fff_0%,#cfe2ff_50%,#9fc1f5_100%)]
                      text-ink-950
                      shadow-[0_22px_60px_-12px_rgba(96,165,250,0.65),inset_0_1px_0_rgba(255,255,255,0.7)]
                      transition-transform duration-300 ease-[var(--ease-cinematic)]
                      group-hover/cp:scale-[1.06]
                    "
                  >
                    <Play
                      className="size-7 sm:size-8 translate-x-[2px] fill-current"
                      aria-hidden
                    />
                  </span>
                </button>
              </div>

              {/* Editorial title block */}
              <div className="max-w-3xl">
                <h3
                  className="
                    font-display font-light text-ivory-50
                    text-[clamp(1.5rem,1.1rem+1.8vw,2.75rem)]
                    leading-[1.05] tracking-[-0.025em]
                    drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]
                  "
                >
                  {talkTitle}
                </h3>
                <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.26em] text-foreground/65">
                  {speakerLine}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Soft autoplay overlay (visible while autoplay is muted) ── */}
        <AnimatePresence>
          {!showPoster && muted && playing && (
            <motion.button
              type="button"
              onClick={toggleMute}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35 }}
              className="
                absolute top-5 right-5 z-10
                inline-flex items-center gap-2.5
                rounded-full border border-white/15 bg-ink-950/70 backdrop-blur-xl
                px-4 py-2
                text-[0.8125rem] text-foreground
                shadow-[0_18px_36px_-12px_rgba(0,0,0,0.6)]
                hover:bg-ink-900/80 hover:border-white/25
                transition-colors
              "
            >
              <VolumeX className="size-4" aria-hidden />
              <span className="font-medium">Ativar som</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* ── Slide-up controls (during playback) ───────────────── */}
        <AnimatePresence>
          {playing && showControls && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-x-0 bottom-0 p-4 sm:p-6"
              style={{
                background:
                  "linear-gradient(0deg, rgba(4,8,20,0.9) 0%, rgba(4,8,20,0) 100%)",
              }}
            >
              <div
                role="slider"
                tabIndex={0}
                aria-label="Progresso"
                aria-valuenow={Math.round(progress * 100)}
                onClick={seekFromBar}
                className="
                  relative h-1 cursor-pointer rounded-full bg-white/15
                  hover:h-1.5 transition-[height]
                "
              >
                <div
                  className="
                    h-full rounded-full
                    bg-gradient-to-r from-glow-cyan via-glow-blue to-glow-violet
                    shadow-[0_0_12px_rgba(96,165,250,0.7)]
                  "
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ControlButton onClick={togglePlay} label={playing ? "Pausar" : "Tocar"}>
                    {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
                  </ControlButton>
                  <ControlButton onClick={toggleMute} label={muted ? "Ativar som" : "Silenciar"}>
                    {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                  </ControlButton>
                </div>
                <ControlButton onClick={requestFullscreen} label="Tela cheia">
                  <Maximize2 className="size-4" />
                </ControlButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

function ControlButton({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="
        inline-flex size-9 items-center justify-center rounded-full
        border border-white/10 bg-white/[0.06] backdrop-blur-md
        text-foreground/85 hover:text-foreground
        hover:bg-white/[0.12] hover:border-white/20
        transition-colors duration-200
      "
    >
      {children}
    </button>
  );
}

