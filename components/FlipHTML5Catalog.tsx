"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { flipHTML5Config, getCatalogueUrl, isFlipHTML5Configured } from "@/lib/config/fliphtml5";

interface FlipHTML5Settings {
  catalogueUrl?: string;
  mobileOptimizedUrl?: string;
  pdfFile?: {
    asset?: {
      _id: string;
      url?: string;
      originalFilename?: string;
      size?: number;
    };
  };
  pdfDownloadUrl?: string;
  title?: string;
  description?: string;
  version?: string;
  lastUpdated?: string;
  isActive?: boolean;
}

interface FlipHTML5CatalogProps {
  settings?: FlipHTML5Settings | null;
  flipbookUrl?: string;
  title?: string;
  description?: string;
}

export default function FlipHTML5Catalog({
  settings,
  flipbookUrl,
  title,
  description
}: FlipHTML5CatalogProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  const handleIframeLoad = () => {
    // Add a small delay on mobile for better UX
    if (isMobile) {
      setTimeout(() => setIsLoading(false), 500);
    } else {
      setIsLoading(false);
    }
  };

  // Use Sanity settings, fallback to props, then config
  const catalogueUrl = flipbookUrl || 
    (isMobile && settings?.mobileOptimizedUrl) || 
    settings?.catalogueUrl || 
    getCatalogueUrl(isMobile);
  
  const displayTitle = title || settings?.title || flipHTML5Config.metadata.title;
  const displayDescription = description || settings?.description || flipHTML5Config.metadata.description;
  
  const isConfigured = settings?.catalogueUrl ? true : isFlipHTML5Configured();
  const isActive = settings?.isActive !== false; // Default to true if not specified

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--color-ivory)] to-[var(--color-beige)] pt-16 md:pt-20">
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 md:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4 md:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-deep-brown)] mb-2 md:mb-4 font-heading px-2">
            {displayTitle}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[var(--color-slate)] max-w-2xl mx-auto px-4">
            {displayDescription}
          </p>
          {(settings?.pdfFile?.asset || settings?.pdfDownloadUrl) && (
            <div className="mt-3">
              <span className="px-3 py-1 bg-[var(--color-almond-gold)]/10 text-[var(--color-almond-gold)] rounded-full text-xs font-semibold">
                PDF Available for Download
              </span>
            </div>
          )}
        </motion.div>

        {/* FlipHTML5 Embed Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className={`fliphtml5-container relative bg-white rounded-xl md:rounded-3xl shadow-xl md:shadow-2xl border border-[var(--color-gold-light)] md:border-2 overflow-hidden ${
            isMobile ? 'mobile-catalog-container' : ''
          }`}
          style={{ 
            minHeight: isMobile 
              ? 'calc(100vw - 2rem)'
              : isTablet 
                ? '700px' 
                : '800px'
          }}
        >
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--color-ivory)] to-[var(--color-cashew-cream)] z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-almond-gold)] mx-auto mb-4"></div>
                <p className="text-[var(--color-slate)]">Loading catalogue...</p>
              </div>
            </div>
          )}
          
          {/* Inactive or Configuration Warning */}
          {(!isActive || !isConfigured) && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--color-ivory)] to-[var(--color-cashew-cream)] z-20">
              <div className="text-center p-8">
                <div className="text-4xl mb-4">⚙️</div>
                <h3 className="text-xl font-bold text-[var(--color-deep-brown)] mb-2">
                  {!isActive ? "Catalogue Temporarily Unavailable" : "FlipHTML5 Configuration Required"}
                </h3>
                <p className="text-[var(--color-slate)] mb-4">
                  {!isActive 
                    ? "The catalogue is currently disabled. Please check back later."
                    : "Please configure the FlipHTML5 settings in your Sanity CMS under 'FlipHTML5 Catalogue'"
                  }
                </p>
                {!isActive ? null : (
                  <p className="text-sm text-[var(--color-muted)]">
                    Add your FlipHTML5 catalogue URL in the CMS to display the interactive catalogue
                  </p>
                )}
              </div>
            </div>
          )}

          {/* FlipHTML5 Iframe */}
          <iframe
            src={catalogueUrl}
            width="100%"
            height={
              isMobile 
                ? "100%"
                : isTablet 
                  ? "700" 
                  : "800"
            }
            scrolling="no"
            frameBorder="0"
            allowFullScreen={false}
            className={`border-0 touch-manipulation ${isMobile ? 'mobile-rotated-iframe' : 'w-full'}`}
            title="Divyansh International Product Catalogue"
            onLoad={handleIframeLoad}
            style={{ 
              border: 'none',
              outline: 'none',
              touchAction: 'manipulation',
              WebkitOverflowScrolling: 'touch'
            }}
          />
        </motion.div>

        {/* Mobile & Tablet Touch Tips */}
        {(isMobile || isTablet) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 md:mt-6 mx-2 sm:mx-0"
          >
            <div className="flex justify-center">
              <div className="p-3 bg-gradient-to-r from-[var(--color-almond-gold)]/10 to-[var(--color-gold-light)]/5 rounded-xl border border-[var(--color-almond-gold)]/20">
                <div className="flex items-center gap-2">
                  <span className="text-lg">👆</span>
                  <div>
                    <p className="text-xs font-semibold text-[var(--color-deep-brown)]">
                      Touch Controls
                    </p>
                    <p className="text-xs text-[var(--color-slate)]">
                      Pinch to zoom • Swipe to navigate pages
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* PDF Download Button (if available) - Hidden on mobile */}
        {!isMobile && (() => {
          // Priority: Sanity uploaded file > external URL > hidden
          const pdfUrl = settings?.pdfFile?.asset?.url || settings?.pdfDownloadUrl;
          const fileName = settings?.pdfFile?.asset?.originalFilename || 'catalogue.pdf';
          
          if (pdfUrl) {
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-6 md:mt-8 text-center px-4"
              >
                <button 
                  onClick={() => {
                    // Create a temporary link to trigger download
                    const link = document.createElement('a');
                    link.href = pdfUrl;
                    link.download = fileName;
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-[var(--color-almond-gold)] to-[var(--color-gold-dark)] text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  📄 Download PDF Catalogue
                </button>
              </motion.div>
            );
          }
          return null;
        })()}
      </div>
    </div>
  );
}