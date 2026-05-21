/* ============================================================
   Analytics architecture — provider-agnostic event surface.
   Pages and components emit semantic events; the dispatcher
   forwards them to whichever providers are configured at runtime.
   ============================================================ */

export type AnalyticsEvent =
  | { name: "page_view"; path: string }
  | { name: "cta_click"; placement: string; label: string }
  | { name: "lead_submit"; channel: "contact_form" | "newsletter"; school?: string }
  | { name: "scroll_section"; section: string }
  | { name: "outbound_click"; href: string };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    plausible?: (event: string, opts?: { props?: Record<string, unknown> }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const isBrowser = typeof window !== "undefined";

export function trackEvent(event: AnalyticsEvent): void {
  if (!isBrowser) return;
  const { name, ...payload } = event as { name: string; [k: string]: unknown };

  // Plausible
  if (typeof window.plausible === "function") {
    window.plausible(name, { props: payload });
  }

  // GA4 / GTM via dataLayer
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...payload });
  } else if (typeof window.gtag === "function") {
    window.gtag("event", name, payload);
  }

  if (process.env.NODE_ENV === "development") {
    // Surface during dev so missing tracking is obvious.
    // eslint-disable-next-line no-console
    console.debug("[analytics]", name, payload);
  }
}

export function trackPageView(path: string): void {
  trackEvent({ name: "page_view", path });
}
