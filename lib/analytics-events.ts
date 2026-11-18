"use client";

export type AnalyticsEventName =
  | "growth_form_step"
  | "growth_form_error"
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

  const runtime = (window as Window & { StackTracking?: {
    event: (name: AnalyticsEventName, params: AnalyticsEventParams) => boolean;
  } }).StackTracking;
  const allowed = new Set(["placement", "step", "error_code", "goals_count", "newsletter_opt_in", "page"]);
  const safe: AnalyticsEventParams = {};
  for (const [key, value] of Object.entries(params)) {
    if (!allowed.has(key)) continue;
    if (typeof value === "boolean" || (typeof value === "number" && Number.isFinite(value))) safe[key] = value;
    if (typeof value === "string" && /^[a-zA-Z0-9_/-]{1,80}$/.test(value)) safe[key] = value;
  }
  if (eventName === "website_check_cta_click") safe.cta_id = "website_check";
  if (eventName === "booking_click_after_check") safe.cta_id = "booking";
  if (eventName === "website_check_form_start" || eventName === "website_check_form_submit") {
    safe.form_id = "website_check";
  }
  if (eventName === "growth_form_step" || eventName === "growth_form_error") safe.form_id = "website_check";
  if (safe.form_id === "website_check") safe.placement = "checker_form";
  runtime?.event(eventName, safe);
  const live = window as Window & { StackTracking?: {consent: () => {clarity: boolean}};
    clarity?: (command: string, name: string) => void };
  if (live.StackTracking?.consent().clarity && typeof live.clarity === "function") {
    const parts = [eventName, safe.cta_id || safe.form_id, safe.placement, safe.step, safe.error_code].filter(Boolean);
    if (parts.every(v => /^[a-z0-9_]{1,60}$/.test(String(v)))) live.clarity("event", parts.join("_"));
  }
}
