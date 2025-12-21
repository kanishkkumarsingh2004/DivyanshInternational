"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LeafIcon,
  NutIcon,
  AlmondIcon,
  CashewIcon,
  WalnutIcon,
  PeanutIcon,
} from "@/components/assets/Decorations";

import { urlForImage } from "@/lib/sanity/image";

import type { SanityImageSource } from "@sanity/image-url";

type HeroSlide = {
  _id: string;
  eyebrow: string;
  badge: string;
  headline: string;
  paragraphs: string[];
  primaryCta: { label: string; target: string };
  secondaryCta?: { label: string; target: string };
  videoUrl: string;
  posterImage?: SanityImageSource;
  posterUrl?: string;
  stats?: HeroStats[];
};

interface HeroStats {
  value: string;
  label: string;
  detail: string;
}

interface AccessibilityLabels {
  heroSectionAria?: string;
  prevSlideAria?: string;
  nextSlideAria?: string;
  goToSlideAria?: string;
  [key: string]: string | undefined;
}

interface HeroSliderProps {
  initialSlides?: HeroSlide[] | null;
  stats?: HeroStats[] | null;
  accessibility?: AccessibilityLabels;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heroConfig?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  routing?: any;
}

// Helper function to validate video URLs
const isValidVideoUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    const validExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    const hasValidExtension = validExtensions.some(ext => 
      urlObj.pathname.toLowerCase().includes(ext)
    );
    return (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') && hasValidExtension;
  } catch {
    return false;
  }
};

export default function HeroSlider({
  initialSlides,
  stats,
  accessibility,
  heroConfig,
  routing,
}: HeroSliderProps) {
  const slides = initialSlides || [];
  const [activeSlide, setActiveSlide] = useState(0);
  const [videoErrors, setVideoErrors] = useState<Set<string>>(() => new Set());
  const [retryAttempts, setRetryAttempts] = useState<Map<string, number>>(() => new Map());
  const [loadingTimeouts, setLoadingTimeouts] = useState<Map<string, NodeJS.Timeout>>(() => new Map());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const autoPlayInterval = heroConfig?.autoPlayInterval ?? 8000;

  useEffect(() => {
    // Set client flag first
    setIsClient(true);
    
    // Check for reduced motion preference after hydration
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || slides.length === 0) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [prefersReducedMotion, slides.length, autoPlayInterval]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      loadingTimeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [loadingTimeouts]);

  const goToSlide = (index: number) => {
    if (slides.length === 0) return;
    setActiveSlide((index + slides.length) % slides.length);
  };

  const handleNavigation = (target: string) => {
    if (!isClient) return;
    
    if (target === "contact") {
      window.location.href = "/contact?type=trade";
      return;
    }

    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const displayStats = stats || [];

  if (slides.length === 0) return null;

  return (
    <section
      id={routing?.heroSectionId}
      className="hero-slider relative overflow-hidden min-h-screen flex items-center"
      aria-label={accessibility?.heroSectionAria}
    >
      {/* Video Background with Light Overlay */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          {slides.map(
            (slide, index) =>
              index === activeSlide && (
                <motion.div
                  key={slide._id}
                  className="motion-div absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "linear" }}
                >
                  {!videoErrors.has(slide._id) && slide.videoUrl && isValidVideoUrl(slide.videoUrl) ? (
                    <video
                      className="w-full h-full object-cover"
                      src={slide.videoUrl}
                      poster={
                        slide.posterImage ? urlForImage(slide.posterImage).url() : slide.posterUrl
                      }
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        const currentAttempts = retryAttempts.get(slide._id) || 0;
                        const errorCode = e.currentTarget.error?.code;
                        const errorMessage = e.currentTarget.error?.message;
                        
                        // Log error only once to avoid spam
                        if (currentAttempts === 0) {
                          console.warn(`Video failed to load: ${slide.videoUrl}`, {
                            errorCode,
                            errorMessage,
                            fallbackAvailable: !!(slide.posterImage || slide.posterUrl)
                          });
                        }
                        
                        // Don't retry for certain error types (invalid URL, CORS, etc.)
                        const shouldRetry = currentAttempts < 1 && 
                          errorCode !== 4 && // MEDIA_ELEMENT_ERROR: Media loading aborted
                          errorCode !== 2;   // MEDIA_ELEMENT_ERROR: Network error
                        
                        if (shouldRetry) {
                          setRetryAttempts(prev => new Map(prev).set(slide._id, currentAttempts + 1));
                          setTimeout(() => {
                            try {
                              e.currentTarget.load();
                            } catch (retryError) {
                              console.warn('Video retry failed:', retryError);
                              setVideoErrors(prev => new Set(prev).add(slide._id));
                            }
                          }, 2000);
                        } else {
                          // Show fallback immediately
                          setVideoErrors(prev => new Set(prev).add(slide._id));
                        }
                      }}
                      onLoadStart={() => {
                        // Set a timeout for video loading
                        const timeout = setTimeout(() => {
                          console.warn(`Video loading timeout for: ${slide.videoUrl}`);
                          setVideoErrors(prev => new Set(prev).add(slide._id));
                        }, 10000); // 10 second timeout
                        
                        setLoadingTimeouts(prev => new Map(prev).set(slide._id, timeout));
                      }}
                      onLoadedData={() => {
                        // Clear timeout on successful load
                        const timeout = loadingTimeouts.get(slide._id);
                        if (timeout) {
                          clearTimeout(timeout);
                          setLoadingTimeouts(prev => {
                            const newMap = new Map(prev);
                            newMap.delete(slide._id);
                            return newMap;
                          });
                        }
                        console.log('Video loaded successfully:', slide.videoUrl);
                      }}
                      onCanPlay={() => {
                        // Video is ready to play
                        const timeout = loadingTimeouts.get(slide._id);
                        if (timeout) {
                          clearTimeout(timeout);
                        }
                      }}
                    >
                      <source src={slide.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    // Fallback to poster image when video fails
                    <div 
                      className="w-full h-full bg-cover bg-center bg-no-repeat bg-gradient-to-br from-[var(--color-ivory)] to-[var(--color-beige)]"
                      style={{
                        backgroundImage: (slide.posterImage || slide.posterUrl) ? `url(${
                          slide.posterImage ? urlForImage(slide.posterImage).url() : slide.posterUrl
                        })` : undefined
                      }}
                    >
                      {/* Only show indicator if no poster image is available */}
                      {!(slide.posterImage || slide.posterUrl) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--color-ivory)] to-[var(--color-beige)]">
                          <div className="text-center text-[var(--color-slate)]">
                            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <p className="text-sm">Media loading...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )
          )}
        </AnimatePresence>
        {/* Light warm overlay - reduced opacity to show video */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-ivory)]/40 via-[var(--color-cashew-cream)]/35 to-[var(--color-beige)]/30" />
        {/* Subtle texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4YjdkNmIiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE0YzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6TTEyIDM4YzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      </div>

      {/* Floating Dry Fruits Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Almonds */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-[15%] opacity-20"
        >
          <AlmondIcon className="w-32 h-32 text-[var(--color-almond-gold)]" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -12, 12, 0], y: [0, 12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute bottom-32 left-[10%] opacity-20"
        >
          <AlmondIcon className="w-40 h-40" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 15, -15, 0], x: [0, -12, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute top-1/3 left-[5%] opacity-15"
        >
          <AlmondIcon className="w-28 h-28" />
        </motion.div>

        {/* Cashews */}
        <motion.div
          animate={{ rotate: [0, 14, -14, 0], y: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear", delay: 1.5 }}
          className="absolute top-1/4 right-[8%] opacity-20"
        >
          <CashewIcon className="w-36 h-36" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -11, 11, 0], x: [0, 8, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 3 }}
          className="absolute bottom-1/4 right-[20%] opacity-15"
        >
          <CashewIcon className="w-30 h-30" />
        </motion.div>

        {/* Walnuts */}
        <motion.div
          animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-[25%] opacity-15"
        >
          <WalnutIcon className="w-24 h-24" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -8, 8, 0], y: [0, 10, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "linear", delay: 2.5 }}
          className="absolute bottom-1/3 left-[15%] opacity-20"
        >
          <WalnutIcon className="w-32 h-32" />
        </motion.div>

        {/* Peanuts */}
        <motion.div
          animate={{ rotate: [0, 12, -12, 0], x: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 3.5 }}
          className="absolute top-2/3 right-[12%] opacity-15"
        >
          <PeanutIcon className="w-26 h-26" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -15, 15, 0], y: [0, -8, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear", delay: 4.5 }}
          className="absolute top-1/4 left-[20%] opacity-15"
        >
          <PeanutIcon className="w-22 h-22" />
        </motion.div>

        {/* Large Background Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 opacity-5"
        >
          <LeafIcon className="w-96 h-96 text-[var(--color-pistachio-green)]" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute -bottom-32 -left-20 opacity-5"
        >
          <NutIcon className="w-[30rem] h-[30rem] text-[var(--color-deep-brown)]" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-10 py-24">
        <div className="grid lg:grid-cols-[1fr_0.4fr] gap-12 items-center min-h-[70vh]">
          {/* Text Content */}
          <div className="text-[var(--color-deep-brown)]">
            <motion.div
              key={slides[activeSlide]._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-12 bg-[var(--color-almond-gold)]" />
                <p className="uppercase tracking-[0.4em] text-xs text-[var(--color-text-muted)] font-semibold">
                  {slides[activeSlide].eyebrow}
                </p>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-heading text-[var(--color-deep-brown)] drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)]">
                {slides[activeSlide].headline}
              </h1>

              <p className="text-sm text-[var(--color-almond-gold)] mb-6 font-bold tracking-wide uppercase border-l-4 border-[var(--color-almond-gold)] pl-4 bg-white/80 backdrop-blur-md py-2 inline-block rounded-r-lg shadow-lg">
                {slides[activeSlide].badge}
              </p>

              <div className="space-y-4 text-lg text-[var(--color-text-light)] max-w-2xl mb-10 leading-relaxed">
                {slides[activeSlide].paragraphs.map((paragraph, index) => (
                  <p key={`${slides[activeSlide]._id}-paragraph-${index}`} className="drop-shadow-[0_1px_4px_rgba(255,255,255,0.8)] bg-white/50 backdrop-blur-sm px-3 py-1 rounded-lg">{paragraph}</p>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleNavigation(slides[activeSlide].primaryCta.target)}
                  className="px-8 py-4 rounded-full text-base font-bold bg-gradient-to-r from-[var(--color-almond-gold)] to-[var(--color-gold-dark)] text-white transition-all shadow-lg hover:shadow-xl hover:scale-105 duration-300"
                >
                  {slides[activeSlide].primaryCta.label}
                </button>
                {slides[activeSlide].secondaryCta && (
                  <button
                    onClick={() => handleNavigation(slides[activeSlide].secondaryCta!.target)}
                    className="px-8 py-4 rounded-full text-base font-semibold border-2 border-[var(--color-deep-brown)] bg-white/80 backdrop-blur-sm text-[var(--color-deep-brown)] hover:bg-white hover:shadow-lg transition-all hover:scale-105 duration-300"
                  >
                    {slides[activeSlide].secondaryCta!.label}
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Stats Panel */}
          <div className="space-y-6 hidden lg:block">
            <AnimatePresence>
              {(slides[activeSlide].stats || displayStats).map((stat, index) => (
                <motion.div
                  key={`${slides[activeSlide]._id}-${stat.label}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.05 + 0.2,
                    ease: "easeOut"
                  }}
                  className="backdrop-blur-md bg-white/90 border-2 border-[var(--color-gold-light)] rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:border-[var(--color-almond-gold)] transition-all duration-300 group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-4xl font-bold text-[var(--color-deep-brown)] group-hover:text-[var(--color-almond-gold)] transition-colors font-heading">
                      {stat.value}
                    </p>
                    <LeafIcon className="w-5 h-5 text-[var(--color-almond-gold)]/40 group-hover:text-[var(--color-almond-gold)] transition-colors" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)] mb-1 font-semibold">
                    {stat.label}
                  </p>
                  <p className="text-sm text-[var(--color-text-light)] italic">{stat.detail}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mt-12 border-t border-[var(--color-sand)] pt-8">
          <div className="flex items-center gap-6">
            <button
              onClick={() => goToSlide(activeSlide - 1)}
              className="p-3 rounded-full backdrop-blur-md bg-white/80 border-2 border-[var(--color-sand)] text-[var(--color-deep-brown)] hover:bg-[var(--color-almond-gold)] hover:border-[var(--color-almond-gold)] hover:text-white transition-all shadow-md hover:shadow-lg"
              aria-label={accessibility?.prevSlideAria}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <span className="flex flex-row text-sm uppercase tracking-[0.3em] text-[var(--color-text-muted)] font-bold w-16 text-center">
              {String(activeSlide + 1).padStart(2, heroConfig?.slideNumberPadding)}{" "}
              <span className="text-[var(--color-almond-gold)]">/</span>{" "}
              {slides.length.toString().padStart(2, heroConfig?.slideNumberPadding)}
            </span>
            <button
              onClick={() => goToSlide(activeSlide + 1)}
              className="p-3 rounded-full backdrop-blur-md bg-white/80 border-2 border-[var(--color-sand)] text-[var(--color-deep-brown)] hover:bg-[var(--color-almond-gold)] hover:border-[var(--color-almond-gold)] hover:text-white transition-all shadow-md hover:shadow-lg"
              aria-label={accessibility?.nextSlideAria}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div className="flex gap-3">
            {slides.map((slide, index) => (
              <button
                key={slide._id}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  activeSlide === index
                    ? "w-20 bg-gradient-to-r from-[var(--color-almond-gold)] to-[var(--color-gold-dark)] shadow-md"
                    : "w-12 bg-[var(--color-sand)] hover:bg-[var(--color-almond-gold)]/50"
                }`}
                aria-label={`${accessibility?.goToSlideAria} ${index + 1}`}
                aria-pressed={activeSlide === index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
