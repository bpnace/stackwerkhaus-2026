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

  window.gtag("event", eventName, params);
}
