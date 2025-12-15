"use client";

import React from "react";

interface PaperTextureProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  opacity?: number;
}

export function PaperTexture({ 
  width = "100%", 
  height = "100%", 
  className = "",
  opacity = 0.03
}: PaperTextureProps) {
  const uniqueId = React.useId().replace(/:/g, "-");
  
  return (
    <svg
      width={width}
      height={height}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity }}
      preserveAspectRatio="none"
    >
      <defs>
        {/* Paper grain texture pattern */}
        <pattern
          id={`paper-grain-${uniqueId}`}
          x="0"
          y="0"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="0.3" fill="#000" opacity="0.1" />
          <circle cx="3" cy="2" r="0.2" fill="#000" opacity="0.08" />
          <circle cx="2" cy="3.5" r="0.25" fill="#000" opacity="0.12" />
        </pattern>

        {/* Paper fiber lines */}
        <pattern
          id={`paper-fibers-${uniqueId}`}
          x="0"
          y="0"
          width="100"
          height="2"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="1"
            x2="100"
            y2="1"
            stroke="#000"
            strokeWidth="0.5"
            opacity="0.05"
          />
        </pattern>

        {/* Subtle paper texture noise */}
        <filter id={`paper-noise-${uniqueId}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="3"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="saturate"
            values="0"
          />
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0 0.02 0.01 0.03 0.02 0.01 0.02 0" />
          </feComponentTransfer>
        </filter>
      </defs>

      {/* Apply textures */}
      <rect
        width="100%"
        height="100%"
        fill={`url(#paper-grain-${uniqueId})`}
      />
      <rect
        width="100%"
        height="100%"
        fill={`url(#paper-fibers-${uniqueId})`}
      />
      <rect
        width="100%"
        height="100%"
        filter={`url(#paper-noise-${uniqueId})`}
        opacity="0.4"
      />
    </svg>
  );
}

export function PaperFold({ 
  side = "right",
  progress = 0,
  className = ""
}: { 
  side?: "left" | "right";
  progress?: number;
  className?: string;
}) {
  const uniqueId = React.useId().replace(/:/g, "-");
  const isLeft = side === "left";
  
  // Calculate fold intensity based on progress (0 to 1)
  // Use easing for more realistic paper fold physics
  const easedProgress = progress < 0.5 
    ? 2 * progress * progress 
    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
  
  // Fold width increases as page flips
  const foldWidth = easedProgress * 30; // percentage
  const shadowIntensity = easedProgress * 0.3;
  const highlightIntensity = easedProgress * 0.5;
  
  // Create curved fold path using SVG
  const foldEdgeX = isLeft ? `${100 - foldWidth}%` : `${foldWidth}%`;
  const controlPoint1X = isLeft ? `${100 - foldWidth * 0.7}%` : `${foldWidth * 0.7}%`;
  const controlPoint2X = isLeft ? `${100 - foldWidth * 0.3}%` : `${foldWidth * 0.3}%`;
  
  return (
    <svg
      width="100%"
      height="100%"
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ 
        zIndex: 10,
      }}
      preserveAspectRatio="none"
    >
      <defs>
        {/* Paper fold shadow gradient - creates depth */}
        <linearGradient
          id={`fold-shadow-${uniqueId}`}
          x1={isLeft ? "100%" : "0%"}
          y1="0%"
          x2={isLeft ? "0%" : "100%"}
          y2="0%"
        >
          <stop offset="0%" stopColor="rgba(0,0,0,0)" stopOpacity="0" />
          <stop offset="30%" stopColor="rgba(0,0,0,0.1)" stopOpacity={shadowIntensity} />
          <stop offset="60%" stopColor="rgba(0,0,0,0.2)" stopOpacity={shadowIntensity * 1.5} />
          <stop offset="90%" stopColor="rgba(0,0,0,0.25)" stopOpacity={shadowIntensity * 2} />
          <stop offset="100%" stopColor="rgba(0,0,0,0.3)" stopOpacity={shadowIntensity * 2.5} />
        </linearGradient>

        {/* Fold edge highlight - simulates light reflection on crease */}
        <linearGradient
          id={`fold-highlight-${uniqueId}`}
          x1={isLeft ? "100%" : "0%"}
          y1="0%"
          x2={isLeft ? "98%" : "2%"}
          y2="0%"
        >
          <stop offset="0%" stopColor="rgba(255,255,255,0.6)" stopOpacity={highlightIntensity} />
          <stop offset="30%" stopColor="rgba(255,255,255,0.3)" stopOpacity={highlightIntensity * 0.6} />
          <stop offset="70%" stopColor="rgba(255,255,255,0.1)" stopOpacity={highlightIntensity * 0.3} />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" stopOpacity="0" />
        </linearGradient>

        {/* Inner fold shadow - darker area where paper bends */}
        <radialGradient
          id={`fold-inner-shadow-${uniqueId}`}
          cx={isLeft ? "100%" : "0%"}
          cy="50%"
          r="50%"
        >
          <stop offset="0%" stopColor="rgba(0,0,0,0.4)" stopOpacity={shadowIntensity * 1.5} />
          <stop offset="50%" stopColor="rgba(0,0,0,0.2)" stopOpacity={shadowIntensity} />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" stopOpacity="0" />
        </radialGradient>

        {/* Paper texture pattern for fold area */}
        <pattern
          id={`fold-texture-${uniqueId}`}
          x="0"
          y="0"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="0.3" fill="#000" opacity="0.08" />
          <circle cx="4" cy="3" r="0.2" fill="#000" opacity="0.06" />
          <circle cx="2" cy="5" r="0.25" fill="#000" opacity="0.07" />
        </pattern>

        {/* Filter for fold edge blur effect */}
        <filter id={`fold-blur-${uniqueId}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
        </filter>
      </defs>

      {/* Fold shadow area - main shadow cast by folded paper */}
      {foldWidth > 0 && (
        <rect
          x={isLeft ? `${100 - foldWidth}%` : "0%"}
          y="0%"
          width={`${foldWidth}%`}
          height="100%"
          fill={`url(#fold-shadow-${uniqueId})`}
          opacity={easedProgress}
        />
      )}

      {/* Inner fold shadow - darker crease area */}
      {foldWidth > 0 && (
        <ellipse
          cx={isLeft ? `${100 - foldWidth * 0.5}%` : `${foldWidth * 0.5}%`}
          cy="50%"
          rx={`${foldWidth * 0.8}%`}
          ry="45%"
          fill={`url(#fold-inner-shadow-${uniqueId})`}
          opacity={easedProgress * 0.8}
        />
      )}

      {/* Fold edge highlight - light reflection on crease */}
      {foldWidth > 0 && (
        <rect
          x={isLeft ? `${100 - foldWidth * 0.15}%` : "0%"}
          y="0%"
          width={`${foldWidth * 0.15}%`}
          height="100%"
          fill={`url(#fold-highlight-${uniqueId})`}
          opacity={easedProgress}
        />
      )}

      {/* Fold edge line - sharp crease */}
      {foldWidth > 0 && (
        <line
          x1={foldEdgeX}
          y1="0%"
          x2={foldEdgeX}
          y2="100%"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="0.5"
          opacity={easedProgress * 0.6}
          filter={`url(#fold-blur-${uniqueId})`}
        />
      )}

      {/* Paper texture overlay in fold area */}
      {foldWidth > 0 && (
        <rect
          x={isLeft ? `${100 - foldWidth}%` : "0%"}
          y="0%"
          width={`${foldWidth}%`}
          height="100%"
          fill={`url(#fold-texture-${uniqueId})`}
          opacity={easedProgress * 0.4}
        />
      )}

      {/* Multiple vertical segments for fold - 50% to 100% with more segments */}
      {foldWidth > 5 && (
        <>
          {/* Top segment (0-25%) */}
          <path
            d={`M ${foldEdgeX} 0% Q ${controlPoint1X} 8% ${foldEdgeX} 15% T ${foldEdgeX} 25%`}
            fill="none"
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="0.3"
            opacity={easedProgress * 0.5}
          />
          {/* Upper middle segment (25-50%) */}
          <path
            d={`M ${foldEdgeX} 25% Q ${controlPoint1X} 35% ${foldEdgeX} 40% T ${foldEdgeX} 50%`}
            fill="none"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="0.4"
            opacity={easedProgress * 0.6}
          />
          {/* Lower middle segment (50-75%) */}
          <path
            d={`M ${foldEdgeX} 50% Q ${controlPoint2X} 60% ${foldEdgeX} 65% T ${foldEdgeX} 75%`}
            fill="none"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="0.4"
            opacity={easedProgress * 0.6}
          />
          {/* Bottom segment (75-100%) */}
          <path
            d={`M ${foldEdgeX} 75% Q ${controlPoint2X} 85% ${foldEdgeX} 90% T ${foldEdgeX} 100%`}
            fill="none"
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="0.3"
            opacity={easedProgress * 0.5}
          />
          {/* Additional vertical crease lines for more realistic fold */}
          {Array.from({ length: 8 }).map((_, i) => {
            const segmentProgress = (i + 1) / 9; // 11.11%, 22.22%, ..., 88.88%
            const segmentY = `${segmentProgress * 100}%`;
            const segmentX = isLeft 
              ? `${100 - foldWidth * (0.3 + segmentProgress * 0.4)}%` 
              : `${foldWidth * (0.3 + segmentProgress * 0.4)}%`;
            return (
              <line
                key={i}
                x1={foldEdgeX}
                y1={segmentY}
                x2={segmentX}
                y2={segmentY}
                stroke="rgba(0,0,0,0.04)"
                strokeWidth="0.2"
                opacity={easedProgress * 0.4}
              />
            );
          })}
        </>
      )}
    </svg>
  );
}

// Keep PaperCurl for backward compatibility, but use PaperFold internally
export function PaperCurl({ 
  side = "right",
  progress = 0,
  className = ""
}: { 
  side?: "left" | "right";
  progress?: number;
  className?: string;
}) {
  return <PaperFold side={side} progress={progress} className={className} />;
}

