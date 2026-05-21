import { cn } from "@/lib/utils";

/**
 * Film-grain overlay. Adds the analog texture that prevents
 * the dark UI from feeling clinical and lifts gradients off the screen.
 */
export function Grain({ className, opacity = 0.06 }: { className?: string; opacity?: number }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 mix-blend-overlay",
        className,
      )}
      style={{
        opacity,
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
      }}
    />
  );
}
