"use client";

export type AnalyticsEventName =
  | "website_check_cta_click"
  | "website_check_form_start"
  | "website_check_form_submit"
  | "thank_you_page_view"
  | "booking_click_after_check";

type AnalyticsEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config",
      eventName: AnalyticsEventName | string,
      params?: AnalyticsEventParams,
    ) => void;
  }
}

export function trackAnalyticsEvent(
  eventName: AnalyticsEventName,
  params: AnalyticsEventParams = {},
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  const cmp = window as Window & { StackTracking?: { consent: () => { ga: boolean } } };
  if (cmp.StackTracking?.consent().ga !== true) return;
  const allowed = new Set(["placement", "step", "goals_count", "newsletter_opt_in", "page"]);
  const safe: AnalyticsEventParams = {};
  for (const [key, value] of Object.entries(params)) {
    if (!allowed.has(key)) continue;
    if (typeof value === "boolean" || (typeof value === "number" && Number.isFinite(value))) safe[key] = value;
    if (typeof value === "string" && /^[a-zA-Z0-9_/-]{1,80}$/.test(value)) safe[key] = value;
  }
  window.gtag("event", eventName, safe);
}
