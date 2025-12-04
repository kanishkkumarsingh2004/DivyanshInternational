"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Labels {
  toggleAria: string;
  title: string;
  modernLabel: string;
  feminineLabel: string;
}

interface ThemeToggleProps {
  labels: Labels;
}

export default function ThemeToggle({ labels }: ThemeToggleProps) {
  const [fontTheme, setFontTheme] = useState<"modern" | "feminine">("modern");
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    const stored = localStorage.getItem("fontTheme") as "modern" | "feminine" | null;
    if (stored) {
      setFontTheme(stored);
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const root = document.documentElement;
    if (fontTheme === "feminine") {
      root.style.setProperty("--font-heading-dynamic", "var(--font-playfair)");
      root.style.setProperty("--font-body-dynamic", "var(--font-lato)");
    } else {
      root.style.setProperty("--font-heading-dynamic", "var(--font-manrope)");
      root.style.setProperty("--font-body-dynamic", "var(--font-inter)");
    }
    localStorage.setItem("fontTheme", fontTheme);
  }, [fontTheme, isClient]);

  if (!isClient) return null;

  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-white p-4 rounded-xl shadow-xl border border-[var(--color-gold)] mb-2"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-3">
              {labels.title}
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setFontTheme("modern")}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  fontTheme === "modern"
                    ? "bg-[var(--color-deep-brown)] text-white"
                    : "bg-[var(--color-beige)] text-[var(--color-deep-brown)] hover:bg-[var(--color-sand)]"
                }`}
              >
                {labels.modernLabel}
              </button>
              <button
                onClick={() => setFontTheme("feminine")}
                className={`px-4 py-2 rounded-lg text-sm transition-colors font-serif ${
                  fontTheme === "feminine"
                    ? "bg-[var(--color-deep-brown)] text-white"
                    : "bg-[var(--color-beige)] text-[var(--color-deep-brown)] hover:bg-[var(--color-sand)]"
                }`}
              >
                {labels.feminineLabel}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[var(--color-deep-brown)] text-white p-3 rounded-full shadow-lg hover:bg-[var(--color-gold-dark)] transition-colors"
        aria-label={labels.toggleAria}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>
    </div>
  );
}
