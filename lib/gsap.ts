import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function ensureGsap() {
  if (registered) {
    return;
  }

  gsap.registerPlugin(useGSAP, ScrollTrigger);
  registered = true;
}

export function shouldReduceMotion() {
  if (typeof window === "undefined") {
    return true;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function withMotionPreference(options: {
  reduce: () => void;
  motion: () => void;
}) {
  if (shouldReduceMotion()) {
    options.reduce();
  } else {
    options.motion();
  }

  // useGSAP already owns the surrounding GSAP context lifecycle.
  // Returning a noop avoids recursively reverting nested GSAP contexts.
  return () => {};
}

export function refreshScrollTriggers() {
  if (typeof window === "undefined") {
    return;
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  });
}

export { gsap, ScrollTrigger, useGSAP };
