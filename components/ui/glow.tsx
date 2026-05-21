import { cn } from "@/lib/utils";

type GlowProps = {
  color?: "cyan" | "blue" | "violet" | "amber";
  size?: "sm" | "md" | "lg" | "xl";
  intensity?: number;
  className?: string;
};

const colorMap = {
  cyan: "var(--color-glow-cyan)",
  blue: "var(--color-glow-blue)",
  violet: "var(--color-glow-violet)",
  amber: "var(--color-glow-amber)",
} as const;

const sizeMap = {
  sm: "size-64",
  md: "size-[28rem]",
  lg: "size-[44rem]",
  xl: "size-[64rem]",
} as const;

/**
 * Cinematic light bloom. Drop into any section to create
 * the contemplative atmosphere that pulls the whole site together.
 */
export function Glow({
  color = "cyan",
  size = "lg",
  intensity = 0.35,
  className,
}: GlowProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl",
        "animate-[glow-pulse_var(--duration)_ease-in-out_infinite]",
        sizeMap[size],
        className,
      )}
      style={{
        background: `radial-gradient(closest-side, rgb(${colorMap[color]} / ${intensity}) 0%, rgb(${colorMap[color]} / 0) 70%)`,
        // CSS variable consumed by the keyframe pulse to keep timing per-instance.
        ["--duration" as string]: "8s",
      }}
    />
  );
}
