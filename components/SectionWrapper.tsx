"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useViewportAnimation } from "@/hooks/useViewportAnimation";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
}

export default function SectionWrapper({
  children,
  className = "",
  delay = 0,
  staggerChildren = 0.1
}: SectionWrapperProps) {
  const { elementRef, shouldAnimate } = useViewportAnimation({
    threshold: 0.01,
    rootMargin: "0px 0px 50% 0px", // Start animation much earlier
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0,
        staggerChildren: 0.01,
        ease: [0, 0, 1, 1] as const, // Pure linear
      },
    },
  };

  // If not in viewport, render without animation
  if (!shouldAnimate) {
    return (
      <div ref={elementRef} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={elementRef}
      className={className}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

// Export the item variants for external use
export const itemVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0, 0, 1, 1] as const, // Pure linear
    },
  },
};

// Helper component for individual animated items
export function AnimatedItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}