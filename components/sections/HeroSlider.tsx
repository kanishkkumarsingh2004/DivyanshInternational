"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LeafIcon, NutIcon } from "@/components/assets/Decorations";

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

export default function HeroSlider({
  initialSlides,
  stats,
  accessibility,
  heroConfig,
  routing,
}: HeroSliderProps) {
  const slides = initialSlides || [];
  const [activeSlide, setActiveSlide] = useState(0);
  const autoPlayInterval = heroConfig?.autoPlayInterval ?? 8000;

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || slides.length === 0) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [prefersReducedMotion, slides.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    if (slides.length === 0) return;
    setActiveSlide((index + slides.length) % slides.length);
  };

  const handleNavigation = (target: string) => {
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
      className="relative overflow-hidden min-h-screen flex items-center"
      aria-label={accessibility?.heroSectionAria}
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          {slides.map(
            (slide, index) =>
              index === activeSlide && (
                <motion.div
                  key={slide._id}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
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
                  />
                </motion.div>
              )
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-deep-brown)]/90 via-[var(--color-deep-brown)]/60 to-black/40" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -right-20 text-white/5"
        >
          <LeafIcon className="w-96 h-96" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-32 -left-20 text-white/5"
        >
          <NutIcon className="w-[30rem] h-[30rem]" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-10 py-24">
        <div className="grid lg:grid-cols-[1fr_0.4fr] gap-12 items-center min-h-[70vh]">
          {/* Text Content */}
          <div className="text-white">
            <motion.div
              key={slides[activeSlide]._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-12 bg-[var(--color-gold)]" />
                <p className="uppercase tracking-[0.4em] text-xs text-white/80">
                  {slides[activeSlide].eyebrow}
                </p>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-heading">
                {slides[activeSlide].headline}
              </h1>

              <p className="text-sm text-[var(--color-gold)] mb-6 font-medium tracking-wide uppercase border-l-2 border-[var(--color-gold)] pl-4">
                {slides[activeSlide].badge}
              </p>

              <div className="space-y-4 text-lg text-white/90 max-w-2xl mb-10 font-light leading-relaxed">
                {slides[activeSlide].paragraphs.map((paragraph, index) => (
                  <p key={`${slides[activeSlide]._id}-paragraph-${index}`}>{paragraph}</p>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleNavigation(slides[activeSlide].primaryCta.target)}
                  className="px-8 py-4 rounded-full text-base font-semibold bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white transition-all shadow-[0_10px_30px_rgba(201,166,107,0.3)] hover:shadow-[0_15px_40px_rgba(201,166,107,0.4)] hover:-translate-y-1"
                >
                  {slides[activeSlide].primaryCta.label}
                </button>
                {slides[activeSlide].secondaryCta && (
                  <button
                    onClick={() => handleNavigation(slides[activeSlide].secondaryCta!.target)}
                    className="px-8 py-4 rounded-full text-base font-semibold border border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 transition-all hover:-translate-y-1"
                  >
                    {slides[activeSlide].secondaryCta!.label}
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Stats Panel */}
          <div className="space-y-6 hidden lg:block">
            <AnimatePresence mode="wait">
              {(slides[activeSlide].stats || displayStats).map((stat, index) => (
                <motion.div
                  key={`${slides[activeSlide]._id}-${stat.label}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl hover:bg-white/10 transition-colors group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-4xl font-bold text-white group-hover:text-[var(--color-gold)] transition-colors font-heading">
                      {stat.value}
                    </p>
                    <LeafIcon className="w-5 h-5 text-white/20 group-hover:text-[var(--color-gold)] transition-colors" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-sm text-white/80 italic font-light">{stat.detail}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mt-12 border-t border-white/10 pt-8">
          <div className="flex items-center gap-6">
            <button
              onClick={() => goToSlide(activeSlide - 1)}
              className="p-3 rounded-full backdrop-blur-md bg-white/5 border border-white/20 text-white hover:bg-[var(--color-gold)] hover:border-[var(--color-gold)] transition-all"
              aria-label={accessibility?.prevSlideAria}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <span className="flex flex-row text-sm uppercase tracking-[0.3em] text-white/50 font-medium w-16 text-center">
              {String(activeSlide + 1).padStart(2, heroConfig?.slideNumberPadding)}{" "}
              <span className="text-[var(--color-gold)]">/</span>{" "}
              {slides.length.toString().padStart(2, heroConfig?.slideNumberPadding)}
            </span>
            <button
              onClick={() => goToSlide(activeSlide + 1)}
              className="p-3 rounded-full backdrop-blur-md bg-white/5 border border-white/20 text-white hover:bg-[var(--color-gold)] hover:border-[var(--color-gold)] transition-all"
              aria-label={accessibility?.nextSlideAria}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
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
                className={`h-1 rounded-full transition-all duration-500 ${
                  activeSlide === index
                    ? "w-20 bg-[var(--color-gold)]"
                    : "w-12 bg-white/20 hover:bg-white/40"
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
