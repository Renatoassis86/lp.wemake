/* ============================================================
   Analytics architecture — provider-agnostic event surface.
   Pages and components emit semantic events; the dispatcher
   forwards them to GA4/GTM and Meta Pixel simultaneously.
   ============================================================ */

export type AnalyticsEvent =
  | { name: "page_view"; path: string }
  | { name: "cta_click"; placement: string; label: string }
  | { name: "lead_submit"; channel: "contact_form" | "newsletter" | "ebook" | "consultor"; school?: string }
  | { name: "lead_qualificado"; email?: string; cargo?: string }
  | { name: "diagnostico_completo"; escola?: string }
  | { name: "scroll_section"; section: string }
  | { name: "outbound_click"; href: string };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    plausible?: (event: string, opts?: { props?: Record<string, unknown> }) => void;
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const isBrowser = typeof window !== "undefined";

// Mapeia nossos eventos semânticos para os eventos padrão da Meta
function fireMetaPixel(event: AnalyticsEvent): void {
  if (!isBrowser || typeof window.fbq !== "function") return;

  switch (event.name) {
    case "lead_submit":
      // Lead capturado (preencheu o formulário do ebook ou de contato)
      window.fbq("track", "Lead", { content_name: event.channel, school: event.school });
      break;
    case "lead_qualificado":
      // Lead qualificado (respondeu as 3 perguntas na página /obrigado)
      window.fbq("trackCustom", "LeadQualificado", { cargo: event.cargo });
      break;
    case "diagnostico_completo":
      // Diagnóstico de maturidade completo (8 blocos respondidos)
      window.fbq("track", "CompleteRegistration", { content_name: event.escola });
      break;
    case "cta_click":
      window.fbq("trackCustom", "CTAClick", { placement: event.placement, label: event.label });
      break;
    default:
      break;
  }
}

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

  // Meta Pixel
  fireMetaPixel(event);

  if (process.env.NODE_ENV === "development") {
    // Surface during dev so missing tracking is obvious.
    // eslint-disable-next-line no-console
    console.debug("[analytics]", name, payload);
  }
}

export function trackPageView(path: string): void {
  trackEvent({ name: "page_view", path });
}
