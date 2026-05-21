"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type AmbientVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  overlayClassName?: string;
};

/**
 * Silent, looping background video.
 * Used behind the hero — provides the "Netflix opening shot" texture
 * while degrading gracefully to the poster if the file is missing.
 */
export function AmbientVideo({
  src,
  poster,
  className,
  overlayClassName,
}: AmbientVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Reduced motion → freeze on poster
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      video.pause();
      return;
    }
    const play = () => video.play().catch(() => {});
    if (video.readyState >= 2) play();
    else video.addEventListener("canplay", play, { once: true });
  }, []);

  return (
    <div aria-hidden className={cn("absolute inset-0 overflow-hidden", className)}>
      <video
        ref={ref}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        poster={poster}
        className="size-full object-cover [mask-image:linear-gradient(180deg,#000_55%,transparent_100%)]"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div
        className={cn(
          "absolute inset-0",
          "bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(4,8,20,0.35)_0%,rgba(4,8,20,0.85)_60%,rgb(4,8,20)_100%)]",
          overlayClassName,
        )}
      />
    </div>
  );
}
