/* First-party interaction adapter. No identifiers, form values, URLs or vendor loaders. */
(() => {
  "use strict";
  if (window.__growthEventsInstalled) return;
  window.__growthEventsInstalled = true;
  const host = location.hostname;
  const stack = /^(www\.)?stackwerkhaus\.de$/.test(host);
  const codariq = /^(www\.)?codariq\.de$/.test(host);
  if (!stack && !codariq) return;
  const allowedIds = new Set(["contact", "website_check", "booking", "services", "academy", "blog"]);
  let path = location.pathname;
  let sent = new Set();
  function consent() {
    if (stack) {
      return window.StackTracking?.consent() || {ga: false, clarity: false};
    }
    return {ga: false, clarity: window.CODARIQConsent?.clarityAllowed() === true};
  }
  function syncPath() {
    if (path !== location.pathname) { path = location.pathname; sent = new Set(); }
  }
  function emit(name, params = {}, once = false) {
    syncPath();
    const c = consent();
    const key = name + ":" + (params.cta_id || "");
    if (c.ga && typeof window.gtag === "function" && (!once || !sent.has("ga:" + key))) {
      window.gtag("event", name, params); if (once) sent.add("ga:" + key);
    }
    if (c.clarity && typeof window.clarity === "function" && (!once || !sent.has("clarity:" + key))) {
      window.clarity("event", params.cta_id ? name + "_" + params.cta_id : name); if (once) sent.add("clarity:" + key);
    }
  }
  let framePending = false;
  window.addEventListener("growth:navigation", () => { path = location.pathname; sent = new Set(); });
  window.addEventListener("popstate", syncPath);
  window.addEventListener("scroll", () => {
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(() => {
      framePending = false; syncPath();
      const range = document.documentElement.scrollHeight - innerHeight;
      if (range <= 0) return;
      const depth = Math.max(0, Math.min(100, scrollY / range * 100));
      for (const threshold of [25, 50, 75, 90]) {
        if (depth >= threshold) emit("growth_scroll_" + threshold, {percent_scrolled: threshold}, true);
      }
    });
  }, {passive: true});
  document.addEventListener("click", event => {
    const element = event.target instanceof Element ? event.target.closest("[data-growth-cta]") : null;
    const id = element?.getAttribute("data-growth-cta");
    if (!allowedIds.has(id)) return;
    // Only explicitly marked CTAs; existing measured buttons stay unmarked.
    emit("growth_cta_click", {cta_id: id});
  }, {passive: true});
})();
