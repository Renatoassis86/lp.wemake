import { cn } from "@/lib/utils";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  id?: string;
  tight?: boolean;
  bleed?: boolean;
};

/**
 * Vertical rhythm primitive. All landing sections inherit from `<Section />`
 * so the cinematic spacing scale stays consistent end-to-end.
 */
export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { className, tight = false, bleed = false, children, ...rest },
  ref,
) {
  return (
    <section
      ref={ref}
      className={cn(
        "relative isolate",
        tight ? "py-[var(--space-section-tight)]" : "py-[var(--space-section)]",
        bleed && "overflow-hidden",
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
});
