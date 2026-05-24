import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

/**
 * Inline-SVG logomark. Avoids an extra HTTP request and keeps the wordmark
 * crisp at any density. The brand mark is a contemplative monogram —
 * a square enclosing a single rising stroke, suggesting cultivation.
 */
export function Logo({
  className,
  href = "/",
  label = "We Make",
  imageSrc = "/photos/1.png",
}: {
  className?: string;
  href?: string;
  label?: string;
  imageSrc?: string;
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
      <Image
        src={imageSrc}
        alt={label}
        width={140}
        height={40}
        priority
        className="object-contain"
      />
    </Link>
  );
}
