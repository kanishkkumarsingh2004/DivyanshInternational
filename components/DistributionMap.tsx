"use client";

import { useState } from "react";

import { type DistributionRegion } from "@/lib/data/distribution";

interface DistributionMapProps {
  regions?: DistributionRegion[];
  heading?: string;
}

export default function DistributionMap({ regions, heading }: DistributionMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const mapRegions = regions || [];

  return (
    <div className="relative w-full h-96 bg-[var(--color-beige)] rounded-lg overflow-hidden">
      {/* Placeholder Map SVG */}
      <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Simple map outline */}
        <path
          d="M 20 20 L 80 20 L 80 80 L 20 80 Z"
          fill="white"
          stroke="var(--color-deep-brown)"
          strokeWidth="0.5"
        />

        {/* Distribution Points */}
        {mapRegions.map((region, index) => (
          <g key={region._id || `region-${index}`}>
            <circle
              cx={region.x}
              cy={region.y}
              r="3"
              fill="var(--color-gold)"
              stroke="var(--color-deep-brown)"
              strokeWidth="0.5"
              onMouseEnter={() => setHoveredRegion(region._id)}
              onMouseLeave={() => setHoveredRegion(null)}
              className="cursor-pointer transition-all hover:r-4"
            />
            {hoveredRegion === region._id && (
              <>
                <rect
                  x={region.x - 10}
                  y={region.y - 8}
                  width="20"
                  height="6"
                  fill="var(--color-deep-brown)"
                  opacity="0.9"
                  rx="1"
                />
                <text
                  x={region.x}
                  y={region.y - 3}
                  textAnchor="middle"
                  fill="white"
                  fontSize="2"
                  fontWeight="bold"
                >
                  {region.name}
                </text>
              </>
            )}
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-md">
        <h4 className="font-semibold text-[var(--color-deep-brown)] mb-2">{heading}</h4>
        <ul className="space-y-1 text-sm text-[var(--color-text)]">
          {mapRegions.map((region, index) => (
            <li key={region._id || `legend-${index}`} className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[var(--color-gold)] rounded-full" />
              <span>{region.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
