/**
 * One place that knows how to report a conversion event to whichever tags are
 * actually installed. Every tag is optional, so each call is guarded: a page
 * with no analytics configured still works, it just reports nothing.
 */
export function trackCta(location: string) {
  if (typeof window === "undefined") return;

  // GTM / GA4 via dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "audit_cta_click", cta_location: location });

  // GA4 through gtag, for installs that skip GTM
  window.gtag?.("event", "audit_cta_click", { cta_location: location });

  // Meta. Lead is the standard event Meta's optimizer understands.
  window.fbq?.("trackCustom", "AuditCtaClick", { cta_location: location });
}
