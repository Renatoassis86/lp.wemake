import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export function Logo({
  className,
  href = "/",
  label = "We Make",
  imageSrc = "/photos/2.png",
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
        "group inline-flex items-center gap-2.5 transition-opacity duration-300",
        "hover:opacity-80 focus-visible:opacity-80",
        className,
      )}
    >
      <Image
        src={imageSrc}
        alt={label}
        width={200}
        height={60}
        priority
        className="h-14 w-auto object-contain pointer-events-none select-none"
      />
    </Link>
  );
}
