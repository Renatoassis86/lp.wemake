import { cn } from "@/lib/utils";

/**
 * Slow conic gradient that drifts behind hero/CTA sections.
 * Less aggressive than the Glow orbs — used as ambient backdrop only.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        "motion-reduce:hidden",
        className,
      )}
    >
      <div
        className="absolute -inset-[40%] opacity-50 blur-3xl"
        style={{
          background:
            "conic-gradient(from 90deg at 50% 50%, rgba(59,130,246,0.18), rgba(139,92,246,0.16), rgba(96,165,250,0.18), rgba(7,12,28,0) 50%, rgba(59,130,246,0.18))",
          animation: "aurora 28s linear infinite",
        }}
      />
    </div>
  );
}
