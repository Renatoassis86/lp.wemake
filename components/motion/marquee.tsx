import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  reverse?: boolean;
  speed?: "slow" | "base" | "fast";
  className?: string;
  pauseOnHover?: boolean;
};

const speedMap = {
  slow: "60s",
  base: "40s",
  fast: "24s",
};

/**
 * Infinite horizontal marquee — used for the schools wall.
 * CSS-driven, GPU-friendly, no JS while idle.
 */
export function Marquee({
  children,
  reverse = false,
  speed = "base",
  className,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "relative flex overflow-hidden",
        "[--mask:linear-gradient(90deg,transparent_0%,#000_8%,#000_92%,transparent_100%)]",
        "[mask-image:var(--mask)] [-webkit-mask-image:var(--mask)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-12 pr-12",
          "animate-[marquee_var(--duration)_linear_infinite]",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
        style={{ ["--duration" as string]: speedMap[speed] }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
