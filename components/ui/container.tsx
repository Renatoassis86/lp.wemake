import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: "prose" | "sm" | "md" | "lg" | "xl" | "2xl";
};

const sizeMap = {
  prose: "max-w-[var(--container-prose)]",
  sm: "max-w-[var(--container-sm)]",
  md: "max-w-[var(--container-md)]",
  lg: "max-w-[var(--container-lg)]",
  xl: "max-w-[var(--container-xl)]",
  "2xl": "max-w-[var(--container-2xl)]",
} as const;

export function Container({ size = "2xl", className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[var(--gutter)]",
        sizeMap[size],
        className,
      )}
      {...props}
    />
  );
}
