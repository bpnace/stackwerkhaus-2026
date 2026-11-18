/* STACKWERKHAUS: basic consent mode, one direct GA4 owner; no empty GTM runtime. */
(() => {
  'use strict';
  if (window.StackTracking || !/^(www\.)?stackwerkhaus\.de$/.test(location.hostname)) return;
  const GA = 'G-9WPXK6PNZ7';
  const IDS = {ga: '69e4075064eadf05030fa073', clarity: '6a0139cef5c2593ea302ae5c'};
  let previous = {ga: false, clarity: false};
  let started = {ga: false, clarity: false};
  let revoking = false;
  let lastPage = null;
  function consent() {
    const cmp = window.CCM;
    const accepted = cmp?.consent === true && cmp.requiresConsentUpdate !== true ? cmp.acceptedEmbeddings : [];
    return {ga: !revoking && Array.isArray(accepted) && accepted.some(e => e.id === IDS.ga),
      clarity: !revoking && Array.isArray(accepted) && accepted.some(e => e.id === IDS.clarity)};
  }
  window.StackTracking = Object.freeze({consent});
  window['ga-disable-' + GA] = true;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') window.gtag = function () { window.dataLayer.push(arguments); };
  const denied = {analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'};
  window.gtag('consent', 'default', denied);
  function claritySignal(allow) {
    if (typeof window.clarity !== 'function') {
      const stub = function () { stub.q.push(arguments); }; stub.q = []; window.clarity = stub;
    }
    window.clarity('consentv2', {analytics_Storage: allow ? 'granted' : 'denied', ad_Storage: 'denied'});
  }
  function removeCookies(kind) {
    const names = document.cookie.split(';').map(c => c.split('=')[0].trim()).filter(name =>
      kind === 'legacy' ? name === 'CookieConsent' : kind === 'ga' ? /^_ga(?:_|$)|^_gid$|^_gat(?:_|$)|^_gac_/.test(name) : /^_cl(?:ck|sk)$/.test(name));
    const parts = location.pathname.split('/');
    const paths = new Set(['/']);
    while (parts.length > 1) { paths.add(parts.join('/')); paths.add(parts.join('/') + '/'); parts.pop(); }
    const domains = ['', location.hostname, '.' + location.hostname, 'stackwerkhaus.de', '.stackwerkhaus.de'];
    for (const name of names) for (const path of paths) for (const domain of domains) {
      document.cookie = name + '=; Max-Age=0; Path=' + path + (domain ? '; Domain=' + domain : '') + '; SameSite=Lax; Secure';
    }
  }
  removeCookies('legacy');
  function load(id, src) {
    if (document.getElementById(id)) return;
    const script = document.createElement('script'); script.id = id; script.async = true; script.src = src;
    document.head.appendChild(script);
  }
  function pageView() {
    if (!started.ga || !consent().ga || lastPage === location.pathname) return;
    const previousPage = lastPage;
    lastPage = location.pathname;
    window.gtag('event', 'page_view', {send_to: GA, page_path: lastPage,
      page_location: location.origin + lastPage, page_title: document.title,
      page_referrer: previousPage ? location.origin + previousPage : document.referrer.split('?')[0].split('#')[0]});
  }
  function sync() {
    if (revoking || !window.CCM) return;
    const current = consent();
    if ((previous.ga && !current.ga) || (previous.clarity && !current.clarity)) {
      revoking = true;
      window['ga-disable-' + GA] = true;
      window.gtag('consent', 'update', denied);
      if (started.clarity) claritySignal(false);
      if (!current.ga) removeCookies('ga');
      if (!current.clarity) removeCookies('clarity');
      location.reload();
      return;
    }
    if (!current.ga) removeCookies('ga');
    if (!current.clarity) removeCookies('clarity');
    if (current.ga && !started.ga) {
      started.ga = true; window['ga-disable-' + GA] = false;
      window.gtag('consent', 'update', {...denied, analytics_storage: 'granted'});
      window.gtag('js', new Date());
      window.gtag('config', GA, {send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false});
      // pageChangesEnabled is disabled for this GA4 stream. This runtime owns
      // page views and deduplicates React notifications by actual pathname.
      load('stackwerkhaus-ga4-loader', 'https://www.googletagmanager.com/gtag/js?id=' + GA);
      pageView();
    }
    if (current.clarity && !started.clarity) {
      started.clarity = true; claritySignal(true);
      load('stackwerkhaus-clarity-loader', 'https://www.clarity.ms/tag/wmex88aqgx');
    }
    previous = current;
  }
  for (const event of ['ccm19WidgetLoaded', 'ccm19WidgetClosed', 'ccm19EmbeddingAccepted', 'pageshow']) window.addEventListener(event, sync);
  window.addEventListener('growth:navigation', pageView);
  sync();
})();
