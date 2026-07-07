"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { env } from "@/lib/env";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!env.features.enableAnalytics || !env.analytics.gaMeasurementId) return;

    const pageView = () => {
      if (window.gtag) {
        window.gtag("event", "page_view", {
          page_path: pathname + searchParams.toString(),
          page_title: document.title,
        });
      }
    };

    pageView();
  }, [pathname, searchParams]);

  return null;
}

export function trackEvent(
  eventName: string,
  eventParams: Record<string, unknown> = {}
) {
  if (!env.features.enableAnalytics || !env.analytics.gaMeasurementId) return;
  
  if (window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
}
