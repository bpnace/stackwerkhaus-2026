"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const measurementId = "G-9WPXK6PNZ7";
const googleAnalyticsEmbeddingName = "Google Analytics 4";
const clarityEmbeddingNames = ["Microsoft Clarity", "Clarity"] as const;
const clarityProjectId = "wmex88aqgx";
const clarityScript = `
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "${clarityProjectId}");
`;

type Ccm19Embedding = {
  id?: string;
  name?: string;
};

type TrackingConsent = {
  googleAnalytics: boolean;
  microsoftClarity: boolean;
};

declare global {
  interface Window {
    CCM?: {
      acceptedEmbeddings?: Ccm19Embedding[];
    };
  }
}

function isEmbeddingName(
  name: string | undefined,
  expectedNames: readonly string[],
) {
  const normalizedName = name?.trim().toLowerCase();

  return expectedNames.some(
    (expectedName) => normalizedName === expectedName.toLowerCase(),
  );
}

function hasEmbeddingConsent(expectedNames: readonly string[]) {
  return (
    window.CCM?.acceptedEmbeddings?.some((embedding) =>
      isEmbeddingName(embedding.name, expectedNames),
    ) ?? false
  );
}

function getTrackingConsent(): TrackingConsent {
  return {
    googleAnalytics: hasEmbeddingConsent([googleAnalyticsEmbeddingName]),
    microsoftClarity: hasEmbeddingConsent(clarityEmbeddingNames),
  };
}

export function Analytics() {
  const [trackingConsent, setTrackingConsent] = useState<TrackingConsent>({
    googleAnalytics: false,
    microsoftClarity: false,
  });
  const pathname = usePathname();
  const trackedInitialPath = useRef<string | null>(null);

  useEffect(() => {
    const syncConsent = () => {
      setTrackingConsent(getTrackingConsent());
    };

    const handleEmbeddingAccepted = (event: Event) => {
      const acceptedEmbedding = event as CustomEvent<Ccm19Embedding>;
      const acceptedName = acceptedEmbedding.detail?.name;

      setTrackingConsent((currentConsent) => ({
        googleAnalytics:
          currentConsent.googleAnalytics ||
          isEmbeddingName(acceptedName, [googleAnalyticsEmbeddingName]) ||
          hasEmbeddingConsent([googleAnalyticsEmbeddingName]),
        microsoftClarity:
          currentConsent.microsoftClarity ||
          isEmbeddingName(acceptedName, clarityEmbeddingNames) ||
          hasEmbeddingConsent(clarityEmbeddingNames),
      }));
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
    if (!trackingConsent.googleAnalytics) {
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
  }, [trackingConsent.googleAnalytics, pathname]);

  if (!trackingConsent.googleAnalytics && !trackingConsent.microsoftClarity) {
    return null;
  }

  return (
    <>
      {trackingConsent.googleAnalytics ? (
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
      ) : null}
      {trackingConsent.microsoftClarity ? (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {clarityScript}
        </Script>
      ) : null}
    </>
  );
}
