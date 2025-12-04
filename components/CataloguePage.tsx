"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import type { SanityImageSource } from "@sanity/image-url";

interface Product {
  _id: string;
  title: string;
  category: string;
  description?: string;
  heroImage?: SanityImageSource;
  slug?: { current?: string };
}

interface CataloguePageProps {
  product: Product;
  pageNumber: number;
  isActive: boolean;
  isFlipping: boolean;
  isSelected: boolean;
  onToggleSelection: (productId: string) => void;
  direction: "forward" | "backward";
}

export default function CataloguePage({
  product,
  pageNumber,
  isActive,
  isFlipping,
  isSelected,
  onToggleSelection,
  direction,
}: CataloguePageProps) {
  const isCover = product._id === "cover";

  return (
    <motion.div
      className="absolute right-0 top-0 bottom-0 w-1/2 origin-left"
      style={{
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        zIndex: isActive ? 20 : pageNumber,
      }}
      initial={false}
      animate={{
        rotateY: isActive ? 0 : direction === "forward" ? -180 : 180,
      }}
      transition={{
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Front of Page */}
      <div
        className="absolute inset-0 bg-[var(--color-ivory)] rounded-r-2xl shadow-2xl overflow-hidden"
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(0deg)",
        }}
      >
        {/* Page Shadow/Fold Effect */}
        <div
          className="absolute inset-y-0 left-0 w-8 pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgba(0,0,0,0.1), transparent)",
          }}
        />

        {/* Page Content */}
        <div className="h-full flex flex-col p-8 md:p-12 relative">
          {/* Page Number */}
          <div className="absolute top-4 right-4 text-sm text-[var(--color-muted)] font-medium">
            {pageNumber}
          </div>

          {!isCover && (
            <>
              {/* Selection Checkbox */}
              <div className="absolute top-4 left-4 z-10">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelection(product._id)}
                    className="w-5 h-5 rounded border-2 border-[var(--color-gold)] text-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)] focus:ring-offset-2 cursor-pointer"
                  />
                  <span className="text-sm text-[var(--color-text)] group-hover:text-[var(--color-gold)] transition-colors">
                    Select
                  </span>
                </label>
              </div>

              {/* Product Image */}
              <div className="flex-1 flex items-center justify-center mb-6 mt-12">
                {product.heroImage && (
                  <div className="relative w-full h-64 md:h-80">
                    <Image
                      src={urlForImage(product.heroImage).width(600).height(600).url()}
                      alt={product.title}
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold-dark)] mb-2">
                    {product.category}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-deep-brown)] font-heading">
                    {product.title}
                  </h2>
                </div>
                {product.description && (
                  <p className="text-[var(--color-slate)] leading-relaxed line-clamp-4">
                    {product.description}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Decorative Corner */}
          <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[var(--color-gold)]">
              <path d="M 0 100 L 100 100 L 100 0 Q 50 50 0 100" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>

      {/* Back of Page (visible when flipped) */}
      <div
        className="absolute inset-0 bg-[var(--color-beige)] rounded-l-2xl shadow-2xl overflow-hidden"
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
        }}
      >
        {/* Page Shadow/Fold Effect */}
        <div
          className="absolute inset-y-0 right-0 w-8 pointer-events-none"
          style={{
            background: "linear-gradient(to left, rgba(0,0,0,0.1), transparent)",
          }}
        />

        <div className="h-full flex items-center justify-center p-8">
          <div className="text-center text-[var(--color-muted)] opacity-30">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <p className="text-sm">Page {pageNumber}</p>
          </div>
        </div>
      </div>

      {/* Page Edge Highlight (simulates paper thickness) */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none"
        style={{
          transform: "translateZ(1px)",
        }}
      />
    </motion.div>
  );
}
