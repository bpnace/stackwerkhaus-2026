"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

export function Analytics() {
  const pathname = usePathname();
  useEffect(() => {
    window.dispatchEvent(new Event("growth:navigation"));
  }, [pathname]);

  return <Script id="stack-tracking" src="/stack-tracking.js" strategy="afterInteractive" />;
}
