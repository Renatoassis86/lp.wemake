import dynamic from "next/dynamic";
import { Hero } from "@/features/hero/hero";
import { Manifesto } from "@/features/manifesto/manifesto";
import { Pillars } from "@/features/pillars/pillars";
import { Products } from "@/features/products/products";

/* ============================================================
   Below-the-fold sections are dynamically imported so the
   first paint ships the hero + manifesto + pillars + products
   while heavier carousels/marquees load lazily.
   ============================================================ */
const Philosophy = dynamic(
  () => import("@/features/philosophy/philosophy").then((m) => ({ default: m.Philosophy })),
);
const SchoolsGrid = dynamic(
  () => import("@/features/schools/schools-grid").then((m) => ({ default: m.SchoolsGrid })),
);
const Testimonials = dynamic(
  () => import("@/features/testimonials/testimonials").then((m) => ({ default: m.Testimonials })),
);
const Faq = dynamic(
  () => import("@/features/faq/faq").then((m) => ({ default: m.Faq })),
);
const CtaStrategic = dynamic(
  () => import("@/features/cta/cta-strategic").then((m) => ({ default: m.CtaStrategic })),
);
const Contact = dynamic(
  () => import("@/features/contact/contact").then((m) => ({ default: m.Contact })),
);

/**
 * Scroll-storytelling composer.
 * The narrative arc:
 *   Hero → Manifesto → Pillars → Products → Philosophy →
 *   Schools → Testimonials → FAQ → CTA → Contact
 */
export function LandingPage() {
  return (
    <main className="relative">
      <Hero />
      <Manifesto />
      <Pillars />
      <Products />
      <Philosophy />
      <SchoolsGrid />
      <Testimonials />
      <Faq />
      <CtaStrategic />
      <Contact />
    </main>
  );
}
