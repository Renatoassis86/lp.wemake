import { cn } from "@/lib/utils";

export function Divider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "h-px w-full",
        "bg-gradient-to-r from-transparent via-white/15 to-transparent",
        className,
      )}
    />
  );
}
