"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import { cn } from "@/lib/utils";

type VideoPlayerProps = ComponentPropsWithoutRef<"div"> & {
  src: string;
  poster?: string;
  captions?: string;
  durationLabel?: string;
  title?: string;
  byline?: string;
};

/**
 * Cinematic video player — Apple-keynote idiom.
 *
 * - Click-to-play with crossfading poster
 * - Editorial overlay (title + byline + duration) until first play
 * - Custom controls slide up from the bottom (auto-hide while playing)
 * - Native captions support (track element) for WebVTT subtitles
 */
export function VideoPlayer({
  src,
  poster,
  captions,
  durationLabel,
  title,
  byline,
  className,
  ...rest
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const requestFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else el.requestFullscreen().catch(() => {});
  }, []);

  // Sync UI state from media events
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => {
      if (v.duration > 0) setProgress(v.currentTime / v.duration);
    };
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("timeupdate", onTime);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("timeupdate", onTime);
    };
  }, []);

  // Auto-hide controls while playing
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

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    v.currentTime = ratio * v.duration;
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group/player relative isolate overflow-hidden",
        "rounded-[2rem] border border-white/10",
        "bg-ink-950",
        "shadow-[0_60px_120px_-40px_rgba(0,0,0,0.85)]",
        "aspect-video",
        className,
      )}
      {...rest}
    >
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
          <track kind="subtitles" src={captions} srcLang="pt-BR" label="Português" default />
        )}
      </video>

      {/* Editorial overlay (hides on first play) */}
      <AnimatePresence>
        {!playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10"
            style={{
              background:
                "linear-gradient(180deg, rgba(4,8,20,0.0) 0%, rgba(4,8,20,0.35) 60%, rgba(4,8,20,0.85) 100%)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.28em] text-foreground/55">
                We Make · Manifesto
              </span>
              {durationLabel && (
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.28em] text-foreground/55">
                  {durationLabel}
                </span>
              )}
            </div>

            <div className="flex flex-col items-start gap-6">
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Reproduzir vídeo"
                className="
                  inline-flex size-16 items-center justify-center rounded-full
                  bg-foreground/95 text-ink-950
                  shadow-[0_18px_48px_-12px_rgba(96,165,250,0.55)]
                  transition-transform duration-300 ease-[var(--ease-cinematic)]
                  hover:scale-[1.04]
                "
              >
                <Play className="size-6 translate-x-[2px] fill-current" aria-hidden />
              </button>

              {(title || byline) && (
                <div className="max-w-xl">
                  {title && (
                    <h3 className="font-display text-[clamp(1.5rem,1.1rem+1.5vw,2.5rem)] leading-[1.1] tracking-[-0.02em]">
                      {title}
                    </h3>
                  )}
                  {byline && (
                    <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-foreground/55">
                      {byline}
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom controls — slide up while playing */}
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
                "linear-gradient(0deg, rgba(4,8,20,0.85) 0%, rgba(4,8,20,0) 100%)",
            }}
          >
            <div
              role="slider"
              tabIndex={0}
              aria-label="Progresso"
              aria-valuenow={Math.round(progress * 100)}
              onClick={seek}
              className="
                relative h-1 cursor-pointer rounded-full bg-white/15
                hover:h-1.5 transition-[height]
              "
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-glow-cyan via-glow-blue to-glow-violet shadow-[0_0_12px_rgba(96,165,250,0.7)]"
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
}

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
