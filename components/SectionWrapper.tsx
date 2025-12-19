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
    threshold: 0.05,
    rootMargin: "0px 0px 20% 0px", // Start animation before element is visible
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: delay,
        staggerChildren: staggerChildren,
        ease: "easeOut" as const,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
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
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
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