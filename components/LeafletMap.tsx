"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix for default marker icon missing in Leaflet with Webpack
const iconUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const LOCATIONS = [
  { name: "Delhi NCR", lat: 28.6139, lng: 77.2090, radius: 40000 }, // 40km radius
  { name: "Punjab", lat: 31.1471, lng: 75.3412, radius: 70000 }, // 70km radius
  { name: "Haryana", lat: 29.0588, lng: 76.0856, radius: 60000 }, // 60km radius
];

const CENTER: [number, number] = [30.0, 76.5]; // Approx center

export default function LeafletMap() {
  // Fix for map container not rendering correctly sometimes without resize
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);

  return (
    <MapContainer
      center={CENTER}
      zoom={6}
      scrollWheelZoom={false}
      className="w-full h-full z-0"
      style={{ background: "var(--color-beige)" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {LOCATIONS.map((loc) => (
        <div key={loc.name}>
          <Marker position={[loc.lat, loc.lng]} icon={customIcon}>
            <Popup>
              <div className="font-bold text-[var(--color-deep-brown)]">{loc.name}</div>
            </Popup>
          </Marker>
          <Circle
            center={[loc.lat, loc.lng]}
            pathOptions={{
              color: "var(--color-gold)",
              fillColor: "var(--color-gold)",
              fillOpacity: 0.2,
            }}
            radius={loc.radius}
          />
        </div>
      ))}
    </MapContainer>
  );
}
