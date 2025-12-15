// FlipHTML5 Configuration
// Update these URLs when you have your actual FlipHTML5 flipbook ready

export const flipHTML5Config = {
  // Main catalogue URL - replace with your actual FlipHTML5 URL
  catalogueUrl: "https://online.fliphtml5.com/wxsdv/Module_1/#google_vignette",
  
  // Alternative URLs for different versions
  mobileOptimizedUrl: "https://online.fliphtml5.com/your-flipbook-id/mobile-catalogue/",
  
  // PDF download URLs (if available)
  pdfDownloadUrl: "https://your-domain.com/catalogue.pdf",
  
  // FlipHTML5 embed settings
  embedSettings: {
    width: "100%",
    height: {
      desktop: "800",
      tablet: "700",
      mobile: "600"
    },
    scrolling: "no",
    frameBorder: "0",
    allowTransparency: "true",
    allowFullScreen: false,
    // Mobile optimizations
    touchAction: "manipulation",
    webkitOverflowScrolling: "touch"
  },
  
  // Catalogue metadata
  metadata: {
    title: "Product Catalogue",
    description: "Explore our premium collection of dry fruits, nuts, and specialty products with our interactive digital catalogue.",
    version: "2024.1",
    lastUpdated: "2024-12-15"
  }
};

// Helper function to get the appropriate URL based on device
export function getCatalogueUrl(isMobile: boolean = false): string {
  return isMobile && flipHTML5Config.mobileOptimizedUrl 
    ? flipHTML5Config.mobileOptimizedUrl 
    : flipHTML5Config.catalogueUrl;
}

// Helper function to check if FlipHTML5 is properly configured
export function isFlipHTML5Configured(): boolean {
  return !flipHTML5Config.catalogueUrl.includes('your-flipbook-id');
}