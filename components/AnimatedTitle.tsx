"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

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
  const slideVariants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -60 : 60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as const, // Custom cubic-bezier for smooth reveal
        ...(staggerChildren && {
          staggerChildren: 0.1,
        }),
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -30 : 30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
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