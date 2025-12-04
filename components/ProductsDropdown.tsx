"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Labels {
  navigation: {
    productsLabel: string;
    productsUrl: string;
  };
}

interface ProductsDropdownProps {
  products: { title: string; slug: { current: string } }[];
  labels: Labels;
}

export default function ProductsDropdown({ products, labels }: ProductsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="text-[var(--color-text)] hover:text-[var(--color-gold)] transition-colors focus:outline-2 focus:outline-[var(--color-gold)] focus:rounded px-2 py-1 flex items-center gap-1"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {labels.navigation.productsLabel}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onMouseLeave={() => setIsOpen(false)}
            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
          >
            {products.map((product) => (
              <Link
                key={product.slug.current}
                href={`${labels.navigation.productsUrl}/${product.slug.current}`}
                className="block px-4 py-3 text-[var(--color-text)] hover:bg-[var(--color-beige)] hover:text-[var(--color-deep-brown)] transition-colors focus:outline-2 focus:outline-[var(--color-gold)] focus:rounded mx-2"
                onClick={() => setIsOpen(false)}
              >
                {product.title}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
