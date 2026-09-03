"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackConversion(event: string) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event });
  window.gtag?.("event", event);
}

export function ConversionTracker() {
  useEffect(() => {
    function onClick(nativeEvent: MouseEvent) {
      const target = nativeEvent.target;
      if (!(target instanceof Element)) {
        return;
      }
      const tracked = target.closest("[data-track]");
      if (!(tracked instanceof HTMLElement)) {
        return;
      }
      const eventName = tracked.dataset.track;
      if (eventName) {
        trackConversion(eventName);
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
