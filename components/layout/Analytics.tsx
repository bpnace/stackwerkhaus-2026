"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const measurementId = "G-9WPXK6PNZ7";
const analyticsEmbeddingName = "Google Analytics 4";

type Ccm19Embedding = {
  id?: string;
  name?: string;
};

declare global {
  interface Window {
    CCM?: {
      acceptedEmbeddings?: Ccm19Embedding[];
    };
  }
}

function isAnalyticsEmbedding(name: string | undefined) {
  return name?.trim().toLowerCase() === analyticsEmbeddingName.toLowerCase();
}

function hasAnalyticsConsent() {
  return (
    window.CCM?.acceptedEmbeddings?.some((embedding) =>
      isAnalyticsEmbedding(embedding.name),
    ) ?? false
  );
}

export function Analytics() {
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);
  const pathname = usePathname();
  const trackedInitialPath = useRef<string | null>(null);

  useEffect(() => {
    const syncConsent = () => {
      setAnalyticsAllowed(hasAnalyticsConsent());
    };

    const handleEmbeddingAccepted = (event: Event) => {
      const acceptedEmbedding = event as CustomEvent<Ccm19Embedding>;

      if (
        isAnalyticsEmbedding(acceptedEmbedding.detail?.name) ||
        hasAnalyticsConsent()
      ) {
        setAnalyticsAllowed(true);
      }
    };

    syncConsent();
    window.addEventListener("ccm19WidgetLoaded", syncConsent);
    window.addEventListener("ccm19WidgetClosed", syncConsent);
    window.addEventListener(
      "ccm19EmbeddingAccepted",
      handleEmbeddingAccepted,
    );

    return () => {
      window.removeEventListener("ccm19WidgetLoaded", syncConsent);
      window.removeEventListener("ccm19WidgetClosed", syncConsent);
      window.removeEventListener(
        "ccm19EmbeddingAccepted",
        handleEmbeddingAccepted,
      );
    };
  }, []);

  useEffect(() => {
    if (!analyticsAllowed) {
      trackedInitialPath.current = null;
      return;
    }

    if (trackedInitialPath.current === null) {
      trackedInitialPath.current = pathname;
      return;
    }

    if (trackedInitialPath.current === pathname) {
      return;
    }

    trackedInitialPath.current = pathname;

    if (typeof window.gtag !== "function") {
      return;
    }

    window.gtag("config", measurementId, {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [analyticsAllowed, pathname]);

  if (!analyticsAllowed) {
    return null;
  }

  return (
    <>
      <Script
        id="google-analytics-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
