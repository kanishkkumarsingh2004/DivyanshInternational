"use client";

import { motion } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";

/**
 * AnimatedTitle - A reusable component for animating section titles with smooth reveal animations
 * 
 * Features:
 * - Left-to-right or right-to-left slide animations
 * - Customizable delay for staggered reveals
 * - Supports different HTML heading elements
 * - Smooth cubic-bezier easing for natural motion
 * - Viewport-based triggering (once only)
 * 
 * Usage:
 * <AnimatedTitle direction="left" delay={0.2} className="text-3xl font-bold">
 *   Your Title Here
 * </AnimatedTitle>
 */
interface AnimatedTitleProps {
  children: ReactNode;
  direction?: "left" | "right";
  delay?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  staggerChildren?: boolean;
}

export default function AnimatedTitle({
  children,
  direction = "left",
  delay = 0,
  className = "",
  as: Component = "h2",
  staggerChildren = false,
}: AnimatedTitleProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Delay animations until page is more settled
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);
  const slideVariants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -20 : 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: delay * 0.5, // Reduce delay impact
        ease: [0.4, 0, 0.2, 1] as const,
        ...(staggerChildren && {
          staggerChildren: 0.03,
        }),
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -10 : 10,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  // If not ready, render without animation
  if (!isReady) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <motion.div
      className="animated-title"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={slideVariants}
    >
      <Component className={className}>
        {staggerChildren ? (
          <motion.span variants={childVariants}>{children}</motion.span>
        ) : (
          children
        )}
      </Component>
    </motion.div>
  );
}