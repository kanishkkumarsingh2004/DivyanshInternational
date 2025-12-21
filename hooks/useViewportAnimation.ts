"use client";

import { useState, useEffect, useRef } from "react";

interface UseViewportAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useViewportAnimation(options: UseViewportAnimationOptions = {}) {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const {
    threshold = 0.05, // Lower threshold for earlier triggering
    rootMargin = "0px 0px 10% 0px", // Positive margin for earlier triggering
    triggerOnce = true
  } = options;

  // Set client flag after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);
        
        if (inView && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [isClient, threshold, rootMargin, hasAnimated]);

  // Return whether to show animation based on settings
  // On server/before hydration, don't animate to prevent hydration mismatch
  const shouldAnimate = isClient && (triggerOnce ? hasAnimated : isInView);

  return {
    elementRef,
    isInView: isClient ? isInView : false,
    shouldAnimate,
    hasAnimated: isClient ? hasAnimated : false
  };
}