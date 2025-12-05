"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[var(--color-beige)] animate-pulse flex items-center justify-center text-[var(--color-muted)]">
      Loading Map...
    </div>
  ),
});

interface DistributionMapProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  regions?: any[];
  heading?: string;
}

export default function DistributionMap({ heading }: DistributionMapProps) {
  const regionsList = ["Delhi NCR", "Punjab", "Haryana"];

  return (
    <div className="relative w-full h-96 bg-[var(--color-beige)] rounded-lg overflow-hidden shadow-md group isolate">
      {heading && (
        <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
          <h4 className="font-bold text-[var(--color-deep-brown)]">{heading}</h4>
        </div>
      )}

      {/* Regions Overlay */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-[var(--color-sand)] max-w-[200px]">
        <h5 className="text-sm font-bold text-[var(--color-deep-brown)] mb-2 uppercase tracking-wider">
          Key Regions
        </h5>
        <ul className="space-y-2">
          {regionsList.map((region) => (
            <li key={region} className="flex items-center gap-2 text-sm font-medium text-[var(--color-text)]">
              <span className="w-2 h-2 rounded-full bg-[var(--color-gold)]" />
              {region}
            </li>
          ))}
        </ul>
      </div>

      <LeafletMap />
    </div>
  );
}
