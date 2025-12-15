"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate, MotionValue } from "framer-motion";
import Image from "next/image";
import { usePageFlip } from "@/hooks/usePageFlip";
import { urlForImage } from "@/lib/sanity/image";
import CatalogueControls from "./CatalogueControls";
import MobileProductList from "./MobileProductList";
import {
  AlmondIcon,
  NutIcon,
  CashewIcon,
  WalnutIcon,
  PeanutIcon,
} from "./assets/Decorations";
import { PaperTexture, PaperCurl } from "./PaperTexture";
import type { SanityImageSource } from "@sanity/image-url";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalized, LocaleString, LocaleText } from "@/lib/i18n";

// Animated wrapper for PaperCurl that works with motion values
function AnimatedPaperCurl({ 
  side, 
  progress 
}: { 
  side: "left" | "right"; 
  progress: MotionValue<number>;
}) {
  const [currentProgress, setCurrentProgress] = useState(0);
  
  useEffect(() => {
    let isMounted = true;
    
    const unsubscribe = progress.on("change", (latest) => {
      if (isMounted) {
        setCurrentProgress(latest);
      }
    });
    
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [progress]);
  
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
      <PaperCurl side={side} progress={currentProgress} />
    </div>
  );
}

interface Product {
  _id: string;
  title: LocaleString;
  category: string;
  description?: LocaleText;
  heroImage?: SanityImageSource;
  slug?: { current?: string };
  MOQ?: string;
  packFormats?: string[];
  grades?: string[];
}

interface ProductCatalogueBookProps {
  products: Product[];
  backCoverImage?: SanityImageSource;
  backCoverImageAlt?: string;
}

export default function ProductCatalogueBook({ products, backCoverImage, backCoverImageAlt }: ProductCatalogueBookProps) {
  const { language } = useLanguage();
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Limit to 5 products only
  const limitedProducts = products.slice(0, 5);
  
  // Always add back cover as 6th page (even if no image - will show placeholder)
  const allPages = [
    ...limitedProducts,
    { 
      _id: "back-cover", 
      title: { en: "", ar: "", hi: "", fr: "" }, 
      category: "", 
      heroImage: backCoverImage || null, 
      isBackCover: true 
    } as Product & { isBackCover?: boolean }
  ];

  // Calculate total pages based on device
  // allPages has 6 items: 5 products + 1 back cover
  // For desktop: 6 pages = 3 spreads (pages 0-1, 2-3, 4-5)
  // For mobile: 6 pages = 6 single pages
  const pagesPerSpread = isMobile ? 1 : 2;
  const calculatedTotalPages = Math.ceil(allPages.length / pagesPerSpread);

  const { currentPage, isFlipping, direction, nextPage, prevPage, goToPage, totalPages } =
    usePageFlip(calculatedTotalPages);

  // Track previous page for animation
  const prevPageRef = useRef(currentPage);
  useEffect(() => {
    if (!isFlipping) {
      prevPageRef.current = currentPage;
    }
  }, [isFlipping, currentPage]);

  // Animated curl progress for realistic paper flip - Swiss Online style
  const curlProgress = useMotionValue(0);
  const animatedCurlProgress = useTransform(curlProgress, [0, 1], [0, 1]);
  
  useEffect(() => {
    if (isFlipping) {
      // Animate from 0 to 1 during flip - smoother easing like Swiss Online
      animate(curlProgress, 1, {
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1], // Smooth ease-in-out for natural page turn
        onComplete: () => {
          curlProgress.set(0);
        }
      });
    } else {
      curlProgress.set(0);
    }
  }, [isFlipping, curlProgress]);

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

  // For mobile: show single page, for desktop: show two pages
  let staticLeftIndex, staticRightIndex, flipperFrontIndex, flipperBackIndex;

  if (isMobile) {
    // Mobile: single page view
    staticLeftIndex = isFlipping ? Math.min(p1, p2) : currentPage;
    staticRightIndex = -1; // No right page on mobile
    flipperFrontIndex = isFlipping ? Math.max(p1, p2) : -1;
    flipperBackIndex = isFlipping ? Math.min(p1, p2) : -1;
  } else {
    // Desktop: two-page view
    staticLeftIndex = isFlipping ? Math.min(p1, p2) * 2 : currentPage * 2;
    staticRightIndex = isFlipping ? Math.max(p1, p2) * 2 + 1 : currentPage * 2 + 1;
    flipperFrontIndex = staticLeftIndex + 1;
    flipperBackIndex = staticRightIndex - 1;
  }

  const staticLeftProduct = allPages[staticLeftIndex];
  const staticRightProduct = allPages[staticRightIndex];
  const flipperFrontProduct = allPages[flipperFrontIndex];
  const flipperBackProduct = allPages[flipperBackIndex];

  // Memoized product page component
  const ProductPage = useMemo(() => {
    return ({ product, pageNum, side }: { product: Product & { isBackCover?: boolean }; pageNum: number; side: "left" | "right" | "center" }) => {
      // Back cover - full size image or placeholder
      if (product.isBackCover) {
        const hasImage = product.heroImage && (
          (typeof product.heroImage === 'object' && product.heroImage !== null) ||
          (typeof product.heroImage === 'string')
        );
        
        return (
          <div className="h-full w-full relative bg-gradient-to-br from-[var(--color-ivory)] via-[var(--color-cashew-cream)] to-[var(--color-beige)] will-change-transform overflow-hidden">
            {hasImage ? (
              <Image
                src={urlForImage(product.heroImage).width(1400).height(1200).url()}
                alt={backCoverImageAlt || "Catalog Back Cover"}
                fill
                sizes="100vw"
                className="object-cover"
                priority={false}
              />
            ) : (
              // Default placeholder when no image
              <div className="h-full w-full flex flex-col items-center justify-center p-8">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6">
                    <svg
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full text-[var(--color-gold)] opacity-40"
                    >
                      <rect x="10" y="10" width="80" height="80" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
                      <path d="M30 35 L50 50 L70 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <circle cx="30" cy="60" r="3" fill="currentColor" />
                      <circle cx="50" cy="60" r="3" fill="currentColor" />
                      <circle cx="70" cy="60" r="3" fill="currentColor" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[var(--color-deep-brown)] font-heading">
                    Back Cover
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 max-w-md">
                    Add a back cover image in Sanity Studio under Catalog Settings
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      }

      // Regular product page
      return (
        <div className="h-full flex flex-col p-6 md:p-12 relative bg-[#faf9f7] will-change-transform overflow-hidden">
          {/* Paper texture overlay */}
          <PaperTexture opacity={0.04} />
          
          {/* Subtle paper grain effect */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(0,0,0,0.01) 2px,
                  rgba(0,0,0,0.01) 4px
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 2px,
                  rgba(0,0,0,0.008) 2px,
                  rgba(0,0,0,0.008) 4px
                )
              `,
              mixBlendMode: 'multiply'
            }}
          />
          
          <div className={`absolute top-4 ${side === "center" ? "left-4" : side === "left" ? "left-4" : "right-4"} text-xs text-gray-400 font-medium z-10`}>
            {pageNum}
          </div>

          <div className={`absolute top-4 ${side === "center" ? "right-4" : side === "left" ? "right-4" : "left-4"} z-10`}>
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
              <div className="relative w-full h-64 md:h-80">
                <Image
                  src={urlForImage(product.heroImage).width(500).height(500).url()}
                  alt={getLocalized(product.title, language)}
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
              {getLocalized(product.title, language)}
            </h2>
            {product.description && (
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-3">
                {getLocalized(product.description, language)}
              </p>
            )}

            {/* Product Details: Variety, Packaging, Quantity */}
            <div className="pt-2 grid grid-cols-1 gap-2 border-t border-gray-200 mt-2">
              {product.grades && product.grades.length > 0 && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-gold-dark)] font-semibold min-w-16">
                    Variety:
                  </span>
                  <span className="text-xs text-gray-700 font-medium">
                    {product.grades.join(", ")}
                  </span>
                </div>
              )}
              
              {product.packFormats && product.packFormats.length > 0 && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-gold-dark)] font-semibold min-w-16">
                    Packaging:
                  </span>
                  <span className="text-xs text-gray-700 font-medium">
                    {product.packFormats.join(", ")}
                  </span>
                </div>
              )}

              {product.MOQ && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-gold-dark)] font-semibold min-w-16">
                    Quantity:
                  </span>
                  <span className="text-xs text-gray-700 font-medium">
                    {product.MOQ}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };
  }, [selectedProducts, backCoverImageAlt, language]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-ivory)] via-[var(--color-cashew-cream)] to-[var(--color-beige)] pt-32 pb-12 px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Almonds */}
        <motion.div
          className="absolute top-20 left-10 text-[var(--color-gold)] opacity-10"
          animate={{ 
            rotate: [0, 10, -10, 0],
            y: [0, -10, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <AlmondIcon className="w-24 h-24 md:w-32 md:h-32" />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-[var(--color-gold-dark)] opacity-10"
          animate={{ 
            rotate: [0, -15, 15, 0],
            y: [0, 10, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <AlmondIcon className="w-20 h-20 md:w-28 md:h-28" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-1/4 text-[var(--color-gold)] opacity-10"
          animate={{ 
            rotate: [0, 20, -20, 0],
            x: [0, -15, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <AlmondIcon className="w-28 h-28 md:w-36 md:h-36" />
        </motion.div>

        {/* Nuts */}
        <motion.div
          className="absolute top-60 left-1/3 text-[var(--color-deep-brown)] opacity-8"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <NutIcon className="w-16 h-16 md:w-24 md:h-24" />
        </motion.div>
        <motion.div
          className="absolute bottom-40 right-1/4 text-[var(--color-deep-brown)] opacity-8"
          animate={{ 
            rotate: [0, -360],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 3 }}
        >
          <NutIcon className="w-20 h-20 md:w-28 md:h-28" />
        </motion.div>

        {/* Cashews */}
        <motion.div
          className="absolute top-1/3 right-10 text-[var(--color-gold-dark)] opacity-10"
          animate={{ 
            rotate: [0, 15, -15, 0],
            x: [0, 10, 0]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <CashewIcon className="w-20 h-20 md:w-28 md:h-28" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-20 text-[var(--color-gold)] opacity-10"
          animate={{ 
            rotate: [0, -12, 12, 0],
            y: [0, -8, 0]
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        >
          <CashewIcon className="w-24 h-24 md:w-32 md:h-32" />
        </motion.div>

        {/* Walnuts */}
        <motion.div
          className="absolute top-1/2 left-1/2 opacity-8"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        >
          <WalnutIcon className="w-18 h-18 md:w-24 md:h-24" />
        </motion.div>
        <motion.div
          className="absolute top-3/4 right-1/3 opacity-10"
          animate={{ 
            rotate: [0, -8, 8, 0],
            y: [0, 10, 0]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        >
          <WalnutIcon className="w-20 h-20 md:w-26 md:h-26" />
        </motion.div>

        {/* Peanuts */}
        <motion.div
          className="absolute top-1/4 left-1/3 opacity-8"
          animate={{ 
            rotate: [0, 12, -12, 0],
            x: [0, -8, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
        >
          <PeanutIcon className="w-16 h-16 md:w-22 md:h-22" />
        </motion.div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-[var(--color-deep-brown)] mb-2 font-heading">
            Product Catalogue
          </h1>
          <p className="text-sm md:text-base text-gray-600">Click arrows or pages to navigate</p>
        </motion.div>

        {/* 3D Book View (All Devices) - Swiss Online Style */}
        <div
          id="product-catalogue"
          className="relative mx-auto w-full px-4 md:px-0"
          style={{
            perspective: "2500px", // Increased for more dramatic 3D effect
            perspectiveOrigin: "50% 50%",
            maxWidth: "1400px", // Increased from 1100px to prevent text overflow
            height: isMobile ? "450px" : "600px", // Increased height on desktop
          }}
        >
          <div className="absolute inset-0 bg-black/30 blur-3xl transform translate-y-8 scale-95" />

          <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>

            {/* 1. Static Left Page (Bottom Layer) - Full width on mobile, half on desktop */}
            <div
              className={`absolute ${isMobile ? 'left-0 right-0' : 'left-0 w-1/2'} top-0 h-full z-0`}
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "right center",
              }}
            >
              <div 
                className={`absolute inset-0 ${isMobile ? 'rounded-lg' : 'rounded-l-lg'} ${!isMobile && 'border-r border-gray-200/50'}`}
                style={{
                  background: 'linear-gradient(to bottom, #faf9f7 0%, #f5f4f2 100%)',
                  boxShadow: `
                    -2px 0 8px rgba(0,0,0,0.08),
                    -4px 0 16px rgba(0,0,0,0.04),
                    inset -1px 0 2px rgba(0,0,0,0.05)
                  `,
                  filter: 'drop-shadow(-2px 0 4px rgba(0,0,0,0.1))'
                }}
              >
                {/* Paper texture */}
                <PaperTexture opacity={0.05} />
                
                {/* Page edge shadow */}
                {!isMobile && (
                  <div 
                    className="absolute inset-y-0 right-0 w-20 pointer-events-none"
                    style={{ 
                      background: "linear-gradient(to left, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.06) 30%, transparent 100%)"
                    }} 
                  />
                )}
                
                {/* Inner page shadow for depth */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 0 30px rgba(0,0,0,0.02)'
                  }}
                />
                
                {staticLeftProduct && <ProductPage product={staticLeftProduct} pageNum={staticLeftIndex + 1} side={isMobile ? "center" : "left"} />}
              </div>
            </div>

            {/* 2. Static Right Page (Bottom Layer) - Hidden on mobile */}
            {!isMobile && staticRightProduct && (
              <div
                className="absolute right-0 top-0 w-1/2 h-full z-0"
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "left center",
                }}
              >
                <div 
                  className="absolute inset-0 rounded-r-lg border-l border-gray-200/50"
                  style={{
                    background: 'linear-gradient(to bottom, #faf9f7 0%, #f5f4f2 100%)',
                    boxShadow: `
                      2px 0 8px rgba(0,0,0,0.08),
                      4px 0 16px rgba(0,0,0,0.04),
                      inset 1px 0 2px rgba(0,0,0,0.05)
                    `,
                    filter: 'drop-shadow(2px 0 4px rgba(0,0,0,0.1))'
                  }}
                >
                  {/* Paper texture */}
                  <PaperTexture opacity={0.05} />
                  
                  {/* Page edge shadow */}
                  <div 
                    className="absolute inset-y-0 left-0 w-20 pointer-events-none"
                    style={{ 
                      background: "linear-gradient(to right, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.06) 30%, transparent 100%)"
                    }} 
                  />
                  
                  {/* Inner page shadow for depth */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      boxShadow: 'inset 0 0 30px rgba(0,0,0,0.02)'
                    }}
                  />
                  
                  <ProductPage product={staticRightProduct} pageNum={staticRightIndex + 1} side="right" />
                </div>
              </div>
            )}

            {/* 3. Flipper Page (Top Layer - Only visible when flipping) - Swiss Online Style */}
            {isFlipping && (
              <motion.div
                className={`absolute ${isMobile ? 'left-0 right-0' : 'right-0 w-1/2'} top-0 h-full z-20`}
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: isMobile ? "center center" : "left center",
                }}
                initial={isMobile 
                  ? { x: direction === "forward" ? "100%" : "-100%", opacity: 0, scale: 0.95 }
                  : { 
                      rotateY: direction === "forward" ? 0 : -180,
                    }
                }
                animate={isMobile 
                  ? { x: 0, opacity: 1, scale: 1 }
                  : { 
                      rotateY: direction === "forward" ? -180 : 0,
                    }
                }
                exit={isMobile 
                  ? { x: direction === "forward" ? "-100%" : "100%", opacity: 0, scale: 0.95 }
                  : undefined
                }
                transition={isMobile 
                  ? { 
                      duration: 0.6, 
                      ease: [0.42, 0, 0.58, 1],
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.5, ease: [0.42, 0, 0.58, 1] }
                    }
                  : { 
                      duration: 0.8, // Faster, smoother like Swiss Online
                      ease: [0.42, 0, 0.58, 1], // Smooth ease-in-out - Swiss Online style
                    }
                }
              >
                {/* Front of Flipper (Right Page of Left State) - Swiss Online Style */}
                <div
                  className={`absolute inset-0 ${isMobile ? 'rounded-lg' : 'rounded-r-lg'} ${!isMobile && 'border-l border-gray-200/50'}`}
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(0deg)",
                    background: 'linear-gradient(to bottom, #faf9f7 0%, #f5f4f2 100%)',
                    boxShadow: `
                      2px 0 8px rgba(0,0,0,0.12),
                      4px 0 16px rgba(0,0,0,0.06),
                      inset 1px 0 2px rgba(0,0,0,0.05)
                    `,
                    filter: 'brightness(1)',
                  }}
                >
                  {/* Paper texture */}
                  <PaperTexture opacity={0.05} />
                  
                  {/* Paper curl effect during flip - animated */}
                  {!isMobile && (
                    <AnimatedPaperCurl 
                      side="left" 
                      progress={animatedCurlProgress}
                    />
                  )}
                  
                  {!isMobile && (
                    <div 
                      className="absolute inset-y-0 left-0 w-20 pointer-events-none"
                      style={{ 
                        background: "linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.08) 30%, transparent 100%)"
                      }} 
                    />
                  )}
                  
                  {/* Inner page shadow */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      boxShadow: 'inset 0 0 30px rgba(0,0,0,0.02)'
                    }}
                  />
                  
                  {flipperFrontProduct && <ProductPage product={flipperFrontProduct} pageNum={flipperFrontIndex + 1} side={isMobile ? "center" : "right"} />}
                </div>

                {/* Back of Flipper (Left Page of Right State) - Hidden on mobile - Swiss Online Style */}
                {!isMobile && (
                  <div
                    className="absolute inset-0 rounded-l-lg border-r border-gray-200/50"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      background: 'linear-gradient(to bottom, #faf9f7 0%, #f5f4f2 100%)',
                      boxShadow: `
                        -2px 0 8px rgba(0,0,0,0.12),
                        -4px 0 16px rgba(0,0,0,0.06),
                        inset -1px 0 2px rgba(0,0,0,0.05)
                      `,
                      filter: 'brightness(1)',
                    }}
                  >
                    {/* Paper texture */}
                    <PaperTexture opacity={0.05} />
                    
                    {/* Paper curl effect during flip - animated */}
                    <AnimatedPaperCurl 
                      side="right" 
                      progress={animatedCurlProgress}
                    />
                    
                    <div 
                      className="absolute inset-y-0 right-0 w-20 pointer-events-none"
                      style={{ 
                        background: "linear-gradient(to left, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.08) 30%, transparent 100%)"
                      }} 
                    />
                    
                    {/* Inner page shadow */}
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        boxShadow: 'inset 0 0 30px rgba(0,0,0,0.02)'
                      }}
                    />
                    
                    {flipperBackProduct && (
                      <ProductPage product={flipperBackProduct} pageNum={flipperBackIndex + 1} side="left" />
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* Center spine - Hidden on mobile */}
            {!isMobile && (
              <div
                className="absolute left-1/2 top-0 bottom-0 w-2 -translate-x-1/2 z-30"
                style={{
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.25) 20%, rgba(0,0,0,0.25) 80%, rgba(0,0,0,0.05) 100%)",
                  boxShadow: `
                    -2px 0 8px rgba(0,0,0,0.2),
                    2px 0 8px rgba(0,0,0,0.2),
                    inset 0 0 20px rgba(0,0,0,0.1)
                  `,
                }}
              />
            )}
          </div>

          {/* Navigation */}
          <motion.button
            onClick={prevPage}
            disabled={currentPage === 0 || isFlipping}
            className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-700 disabled:opacity-20 disabled:cursor-not-allowed z-30"
            aria-label="Previous pages"
            whileHover={{ scale: 1.1, backgroundColor: "#f9fafb" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1 || isFlipping}
            className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-700 disabled:opacity-20 disabled:cursor-not-allowed z-30"
            aria-label="Next pages"
            whileHover={{ scale: 1.1, backgroundColor: "#f9fafb" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          {/* Page indicator */}
          <div className="absolute -bottom-16 md:-bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-4 bg-white px-3 md:px-6 py-2 md:py-3 rounded-full shadow-lg">
            <span className="text-xs md:text-sm font-medium text-gray-700">
              {isMobile ? `${staticLeftIndex + 1} / ${allPages.length}` : `${staticLeftIndex + 1}-${staticRightIndex + 1} / ${allPages.length}`}
            </span>
            <div className="flex gap-1 md:gap-1.5">
              {Array.from({ length: Math.min(totalPages, 10) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  disabled={isFlipping}
                  className={`h-1 md:h-1.5 rounded-full transition-all ${currentPage === index
                    ? "bg-[var(--color-gold)] w-4 md:w-6"
                    : "bg-gray-300 w-1 md:w-1.5 hover:bg-gray-400"
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
