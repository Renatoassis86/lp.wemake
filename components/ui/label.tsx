import { cn } from "@/lib/utils";
import * as LabelPrimitive from "@radix-ui/react-label";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

export const Label = forwardRef<
  HTMLLabelElement,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(function Label({ className, ...props }, ref) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        "font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-foreground/55",
        "select-none",
        className,
      )}
      {...props}
    />
  );
});
