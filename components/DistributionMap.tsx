"use client";

import { useEffect, useRef, useState } from "react";

interface DistributionMapProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  regions?: any[];
  heading?: string;
}

const LOCATIONS = [
  { name: "Delhi NCR", lat: 28.6139, lng: 77.2090 },
  { name: "Punjab", lat: 31.1471, lng: 75.3412 },
  { name: "Haryana", lat: 29.0588, lng: 76.0856 },
];

const CENTER = { lat: 30.0, lng: 76.5 }; // Approx center of Northern India

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
  }
}

export default function DistributionMap({ heading }: DistributionMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      setError("Google Maps API Key is missing. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local");
      return;
    }

    const loadMap = () => {
      if (!mapRef.current) return;

      if (typeof window.google === "undefined") {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
        script.async = true;
        script.defer = true;
        script.onload = initMap;
        script.onerror = () => setError("Failed to load Google Maps script.");
        document.head.appendChild(script);
      } else {
        initMap();
      }
    };

    const initMap = () => {
      if (!mapRef.current) return;

      try {
        const map = new window.google.maps.Map(mapRef.current, {
          center: CENTER,
          zoom: 6,
          styles: [
            {
              featureType: "all",
              elementType: "geometry.fill",
              stylers: [{ color: "#fcf8f2" }], // Beige background
            },
            {
              featureType: "water",
              elementType: "geometry.fill",
              stylers: [{ color: "#c9a66b" }, { lightness: 40 }], // Gold-ish water
            },
          ],
        });

        LOCATIONS.forEach((loc) => {
          new window.google.maps.Marker({
            position: { lat: loc.lat, lng: loc.lng },
            map,
            title: loc.name,
            label: {
              text: loc.name,
              color: "#3e2f23", // Deep brown
              fontWeight: "bold",
              fontSize: "14px",
            },
          });
        });
      } catch (err) {
        console.error("Error initializing map:", err);
        setError("Error initializing map.");
      }
    };

    loadMap();
  }, []);

  return (
    <div className="relative w-full h-96 bg-[var(--color-beige)] rounded-lg overflow-hidden shadow-md">
      {heading && (
        <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
          <h4 className="font-bold text-[var(--color-deep-brown)]">{heading}</h4>
        </div>
      )}

      {error ? (
        <div className="w-full h-full flex items-center justify-center text-[var(--color-muted)] p-4 text-center">
          <p>{error}</p>
        </div>
      ) : (
        <div ref={mapRef} className="w-full h-full" />
      )}
    </div>
  );
}

