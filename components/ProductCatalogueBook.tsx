"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePageFlip } from "@/hooks/usePageFlip";
import { urlForImage } from "@/lib/sanity/image";
import CatalogueControls from "./CatalogueControls";
import MobileProductList from "./MobileProductList";
import type { SanityImageSource } from "@sanity/image-url";

interface Product {
  _id: string;
  title: string;
  category: string;
  description?: string;
  heroImage?: SanityImageSource;
  slug?: { current?: string };
}

interface ProductCatalogueBookProps {
  products: Product[];
}

export default function ProductCatalogueBook({ products }: ProductCatalogueBookProps) {
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());

  const allPages = products;
  const { currentPage, isFlipping, direction, nextPage, prevPage, goToPage, totalPages } =
    usePageFlip(Math.ceil(allPages.length / 2));

  // Track previous page for animation
  const prevPageRef = useRef(currentPage);
  useEffect(() => {
    if (!isFlipping) {
      prevPageRef.current = currentPage;
    }
  }, [isFlipping, currentPage]);

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const clearSelection = () => {
    setSelectedProducts(new Set());
  };

  // Calculate indices for the 3-layer system
  const p1 = prevPageRef.current;
  const p2 = currentPage;

  // Static layers (always visible underneath)
  const staticLeftIndex = isFlipping ? Math.min(p1, p2) * 2 : currentPage * 2;
  const staticRightIndex = isFlipping ? Math.max(p1, p2) * 2 + 1 : currentPage * 2 + 1;

  // Flipper content (the page that moves)
  const flipperFrontIndex = staticLeftIndex + 1; // The "Right" page of the left state
  const flipperBackIndex = staticRightIndex - 1; // The "Left" page of the right state

  const staticLeftProduct = allPages[staticLeftIndex];
  const staticRightProduct = allPages[staticRightIndex];
  const flipperFrontProduct = allPages[flipperFrontIndex];
  const flipperBackProduct = allPages[flipperBackIndex];

  // Memoized product page component
  const ProductPage = useMemo(() => {
    return ({ product, pageNum, side }: { product: Product; pageNum: number; side: "left" | "right" }) => (
      <div className="h-full flex flex-col p-6 md:p-10 relative bg-white will-change-transform">
        <div className={`absolute top-4 ${side === "left" ? "left-4" : "right-4"} text-xs text-gray-400 font-medium`}>
          {pageNum}
        </div>

        <div className={`absolute top-4 ${side === "left" ? "right-4" : "left-4"} z-10`}>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={selectedProducts.has(product._id)}
              onChange={() => toggleProductSelection(product._id)}
              className="w-4 h-4 rounded border-2 border-[var(--color-gold)] text-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)] cursor-pointer"
            />
            <span className="text-xs text-gray-600 group-hover:text-[var(--color-gold)] transition-colors">
              Select
            </span>
          </label>
        </div>

        <div className="flex-1 flex items-center justify-center my-4">
          {product.heroImage && (
            <div className="relative w-full h-64">
              <Image
                src={urlForImage(product.heroImage).width(500).height(500).url()}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-contain drop-shadow-lg"
                priority={pageNum <= 4}
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-gold-dark)] font-semibold">
            {product.category}
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-[var(--color-deep-brown)] font-heading leading-tight">
            {product.title}
          </h2>
          {product.description && (
            <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
              {product.description}
            </p>
          )}
        </div>
      </div>
    );
  }, [selectedProducts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 pt-32 pb-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--color-deep-brown)] mb-2 font-heading">
            Product Catalogue
          </h1>
          <p className="text-gray-600 hidden lg:block">Click arrows or pages to navigate</p>
          <p className="text-gray-600 lg:hidden">Select products to enquire</p>
        </motion.div>

        {/* Mobile View (List) */}
        <div className="lg:hidden">
          <MobileProductList
            products={products}
            selectedProducts={selectedProducts}
            toggleProductSelection={toggleProductSelection}
          />
        </div>

        {/* Desktop View (3D Book) */}
        <div
          id="product-catalogue"
          className="relative mx-auto hidden lg:block"
          style={{
            perspective: "2000px",
            perspectiveOrigin: "50% 50%",
            maxWidth: "1100px",
            height: "650px",
          }}
        >
          <div className="absolute inset-0 bg-black/30 blur-3xl transform translate-y-8 scale-95" />

          <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>

            {/* 1. Static Left Page (Bottom Layer) */}
            <div
              className="absolute left-0 top-0 w-1/2 h-full z-0"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "right center",
              }}
            >
              <div className="absolute inset-0 bg-white rounded-l-lg shadow-2xl border-r border-gray-200">
                <div className="absolute inset-y-0 right-0 w-16 pointer-events-none" style={{ background: "linear-gradient(to left, rgba(0,0,0,0.1), transparent)" }} />
                {staticLeftProduct && <ProductPage product={staticLeftProduct} pageNum={staticLeftIndex + 1} side="left" />}
              </div>
            </div>

            {/* 2. Static Right Page (Bottom Layer) */}
            <div
              className="absolute right-0 top-0 w-1/2 h-full z-0"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "left center",
              }}
            >
              <div className="absolute inset-0 bg-white rounded-r-lg shadow-2xl border-l border-gray-200">
                <div className="absolute inset-y-0 left-0 w-16 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.1), transparent)" }} />
                {staticRightProduct && <ProductPage product={staticRightProduct} pageNum={staticRightIndex + 1} side="right" />}
              </div>
            </div>

            {/* 3. Flipper Page (Top Layer - Only visible when flipping) */}
            {isFlipping && (
              <motion.div
                className="absolute right-0 top-0 w-1/2 h-full z-20"
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "left center",
                }}
                initial={{ rotateY: direction === "forward" ? 0 : -180 }}
                animate={{ rotateY: direction === "forward" ? -180 : 0 }}
                transition={{ duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
              >
                {/* Front of Flipper (Right Page of Left State) */}
                <div
                  className="absolute inset-0 bg-white rounded-r-lg shadow-2xl border-l border-gray-200"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(0deg)",
                  }}
                >
                  <div className="absolute inset-y-0 left-0 w-16 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.1), transparent)" }} />
                  {flipperFrontProduct && <ProductPage product={flipperFrontProduct} pageNum={flipperFrontIndex + 1} side="right" />}
                </div>

                {/* Back of Flipper (Left Page of Right State) */}
                <div
                  className="absolute inset-0 bg-white rounded-l-lg shadow-2xl border-r border-gray-200"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="absolute inset-y-0 right-0 w-16 pointer-events-none" style={{ background: "linear-gradient(to left, rgba(0,0,0,0.1), transparent)" }} />
                  {flipperBackProduct && (
                    <ProductPage product={flipperBackProduct} pageNum={flipperBackIndex + 1} side="left" />
                  )}
                </div>
              </motion.div>
            )}

            {/* Center spine */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 z-30"
              style={{
                background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.2) 80%, transparent)",
                boxShadow: "0 0 10px rgba(0,0,0,0.3)",
              }}
            />
          </div>

          {/* Navigation */}
          <button
            onClick={prevPage}
            disabled={currentPage === 0 || isFlipping}
            className="absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:scale-110 transition-all disabled:opacity-20 disabled:cursor-not-allowed z-30"
            aria-label="Previous pages"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1 || isFlipping}
            className="absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:scale-110 transition-all disabled:opacity-20 disabled:cursor-not-allowed z-30"
            aria-label="Next pages"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Page indicator */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-lg">
            <span className="text-sm font-medium text-gray-700">
              {staticLeftIndex + 1}-{staticRightIndex + 1} / {allPages.length}
            </span>
            <div className="flex gap-1.5">
              {Array.from({ length: Math.min(totalPages, 10) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  disabled={isFlipping}
                  className={`h-1.5 rounded-full transition-all ${currentPage === index
                      ? "bg-[var(--color-gold)] w-6"
                      : "bg-gray-300 w-1.5 hover:bg-gray-400"
                    }`}
                  aria-label={`Go to pages ${index * 2 + 1}-${index * 2 + 2}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20">
          <CatalogueControls
            selectedProducts={selectedProducts}
            allProducts={products}
            onClearSelection={clearSelection}
          />
        </div>
      </div>
    </div>
  );
}
