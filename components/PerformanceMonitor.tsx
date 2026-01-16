"use client";

import { useEffect } from "react";

export default function PerformanceMonitor() {
  useEffect(() => {
    // Report Web Vitals
    if (typeof window !== "undefined" && "performance" in window) {
      // Log Core Web Vitals
      const reportWebVitals = () => {
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          console.log("Performance Metrics:", {
            "DNS Lookup": `${navigation.domainLookupEnd - navigation.domainLookupStart}ms`,
            "TCP Connection": `${navigation.connectEnd - navigation.connectStart}ms`,
            "Request Time": `${navigation.responseStart - navigation.requestStart}ms`,
            "Response Time": `${navigation.responseEnd - navigation.responseStart}ms`,
            "DOM Processing": `${navigation.domComplete - navigation.domLoading}ms`,
            "Load Complete": `${navigation.loadEventEnd - navigation.loadEventStart}ms`,
            "Total Load Time": `${navigation.loadEventEnd - navigation.fetchStart}ms`,
          });
        }
      };

      // Wait for page to fully load
      if (document.readyState === "complete") {
        reportWebVitals();
      } else {
        window.addEventListener("load", reportWebVitals);
      }

      // Cleanup
      return () => {
        window.removeEventListener("load", reportWebVitals);
      };
    }
  }, []);

  return null;
}
