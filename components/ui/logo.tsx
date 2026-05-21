import { cn } from "@/lib/utils";
import Link from "next/link";

/**
 * Inline-SVG logomark. Avoids an extra HTTP request and keeps the wordmark
 * crisp at any density. The brand mark is a contemplative monogram —
 * a square enclosing a single rising stroke, suggesting cultivation.
 */
export function Logo({
  className,
  href = "/",
  label = "We Make",
}: {
  className?: string;
  href?: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={`${label} — voltar ao início`}
      className={cn(
        "group inline-flex items-center gap-2.5",
        "text-foreground transition-opacity duration-300",
        "hover:opacity-90 focus-visible:opacity-90",
        className,
      )}
    >
      <svg
        viewBox="0 0 28 28"
        width="22"
        height="22"
        aria-hidden
        className="text-foreground"
      >
        <defs>
          <linearGradient id="wm-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#cfe2ff" />
            <stop offset="60%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <rect
          x="1.5"
          y="1.5"
          width="25"
          height="25"
          rx="6"
          fill="none"
          stroke="url(#wm-grad)"
          strokeWidth="1.25"
        />
        <path
          d="M7 19 L11 9 L14 15 L17 9 L21 19"
          fill="none"
          stroke="url(#wm-grad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-display text-[1.0625rem] font-medium tracking-[-0.01em]">
        {label}
      </span>
    </Link>
  );
}
