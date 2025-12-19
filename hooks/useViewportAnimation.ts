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
  const elementRef = useRef<HTMLDivElement>(null);

  const {
    threshold = 0.05, // Lower threshold for earlier triggering
    rootMargin = "0px 0px 10% 0px", // Positive margin for earlier triggering
    triggerOnce = true
  } = options;

  useEffect(() => {
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
  }, [threshold, rootMargin, hasAnimated]);

  // Return whether to show animation based on settings
  const shouldAnimate = triggerOnce ? hasAnimated : isInView;

  return {
    elementRef,
    isInView,
    shouldAnimate,
    hasAnimated
  };
}