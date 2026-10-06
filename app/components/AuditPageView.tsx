"use client";

import { useEffect } from "react";

/**
 * Reports a view of the dedicated audit route. Unlike the inline embed, this
 * is a real page load on our own domain, so it is the one point in the funnel
 * after the ad click that can actually be measured. What happens inside the
 * tool is cross origin and invisible to us either way.
 */
export default function AuditPageView() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "audit_page_view" });
    window.gtag?.("event", "audit_page_view");
    window.fbq?.("trackCustom", "AuditPageView");
  }, []);

  return null;
}
