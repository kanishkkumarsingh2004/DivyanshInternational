"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { trackEvent } from "@/components/analytics/GA4";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalized, LocaleString, LocaleText } from "@/lib/i18n";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/client";
import type { SanityImageSource } from "@sanity/image-url";
import { useState, useEffect } from "react";
import { HeroVisualElements, SectionVisualElements, ProductVisual } from "@/components/VisualElements";

interface Product {
  _id: string;
  title: LocaleString;
  category: string;
  description?: LocaleText;
  slug?: { current?: string };
  heroHeading?: LocaleString;
  introParagraphs?: LocaleText[];
  listSections?: { title: LocaleString; items: LocaleString[] }[];
  ctaLine?: LocaleString;
  heroImage?: SanityImageSource;
  gallery?: SanityImageSource[];
  microVideo?: string;
  rating?: string;
  pricing?: {
    currentPrice: number;
    originalPrice: number;
    discount: number;
  };
  specifications?: {
    origin: string;
    variety: string;
    packaging: string;
    shelfLife: string;
    storage: string;
  };
}

interface Labels {
  productDetail: {
    heroPlaceholder: string;
    addToEnquiry: string;
    backToProducts: string;
    programSuffix: string;
  };
  common: {
    addToEnquiry: string;
  };
  navigation: {
    home: string;
    products: string;
    homeUrl: string;
    productsUrl: string;
  };
  apiConfig: {
    breadcrumbSeparator: string;
    enquiryTypeTrade: string;
  };
  routing: {
    queryParamType: string;
    queryParamProduct: string;
    queryParamAction: string;
    scrollTargetContact: string;
    productsHash: string;
  };
  analytics: {
    eventAddToEnquiry: string;
    eventAddToEnquiryGA: string;
    locationProductPage: string;
  };
}

interface ProductDetailProps {
  product: Product;
  labels: Labels;
}

export default function ProductDetail({ product, labels }: ProductDetailProps) {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'description' | 'packaging' | 'forms'>('description');

  const productTitle = getLocalized(product.title, language);
  const heroHeading = getLocalized(product.heroHeading, language);
  const description = getLocalized(product.description, language);

  // WhatsApp and contact info
  const whatsappNumber = "+919876543210"; // Replace with actual number
  const contactEmail = "info@divyanshinternational.com"; // Replace with actual email
  // Function to get product-specific content based on product title or slug
  const getProductContent = (title: string) => {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('almond')) {
      return {
        subtitle: "Premium quality almonds in various grades for wholesale and retail",
        description: "High-quality almonds sourced from trusted suppliers and carefully processed to ensure uniformity and purity. Available in multiple varieties to meet different commercial and retail requirements.",
        features: [
          "Premium quality sourced from the finest suppliers",
          "Naturally processed without artificial preservatives", 
          "Rich in essential vitamins and minerals",
          "Perfect for commercial and retail applications"
        ],
        varieties: [
          { name: "Non-Pareil Almonds", description: "High demand for bulk and retail packaging", grade: "Premium", color: "from-amber-100 to-amber-200" },
          { name: "Independence Almonds", description: "Cost-effective, versatile quality", grade: "Standard", color: "from-orange-100 to-orange-200" },
          { name: "Mamra Almonds", description: "Premium, oil-rich, ideal for gifting & high-end retailers", grade: "Premium+", color: "from-yellow-100 to-yellow-200" },
          { name: "Gurbandi Almonds", description: "Small-sized, nutrient dense", grade: "Premium", color: "from-amber-100 to-amber-200" },
          { name: "Sonora Almonds", description: "Mid-grade quality", grade: "Standard", color: "from-orange-100 to-orange-200" },
          { name: "Carmel / Sonora Almonds", description: "Mid-grade, suitable for value packs and food processing needs", grade: "Standard", color: "from-orange-100 to-orange-200" },
          { name: "Peerless Almonds", description: "Mid-grade, balanced taste, preferred for snacking and processing", grade: "Standard", color: "from-orange-100 to-orange-200" },
          { name: "Monterey Almonds", description: "Larger size, smooth surface, popular for roasting and snacking", grade: "Premium", color: "from-amber-100 to-amber-200" },
          { name: "Shasta Almonds", description: "Uniform size, light colour, good for confectionery and processed foods", grade: "Standard", color: "from-orange-100 to-orange-200" },
          { name: "Supareil Almonds", description: "Long and narrow shape, premium look, often used for luxury confectionery and exports", grade: "Premium+", color: "from-yellow-100 to-yellow-200" }
        ],
        applications: [
          "Food processing and manufacturing",
          "Retail and wholesale distribution",
          "Export and international trade",
          "Confectionery and bakery applications"
        ],
        packaging: "Bulk packs suitable for wholesalers and commercial buyers",
        pricing: { currentPrice: 1299, originalPrice: 1599, discount: 19 },
        specs: {
          origin: "California, USA / India",
          variety: "Multiple Premium Grades",
          packaging: "Bulk Packs (10-25 kg)",
          shelfLife: "12 Months",
          storage: "Cool & Dry Place"
        }
      };
    }
    
    if (titleLower.includes('coconut') || titleLower.includes('desiccated')) {
      return {
        subtitle: "25 kg bulk packing for wholesale and institutional buyers",
        description: "Premium-grade desiccated coconut powder known for its rich aroma, smooth texture, and consistent quality. Finely grated and naturally dried to retain flavour and nutritional value, this product is ideal for commercial food applications.",
        features: [
          "No cholesterol and no trans fats",
          "Rich in dietary fibre and essential minerals", 
          "Naturally dried with no additives or preservatives",
          "Sourced directly from trusted farmers through certified suppliers",
          "Processed in facilities that follow strict food safety and hygiene standards",
          "100% natural, chemical-free, and sustainably sourced"
        ],
        applications: [
          "Bakery products such as cakes and biscuits",
          "Traditional sweets and puddings",
          "Confectionery manufacturing",
          "Large-scale food preparation"
        ],
        packaging: "25 kg bulk packs suitable for wholesalers, FMCG manufacturers, bakeries, and export buyers",
        pricing: { currentPrice: 2499, originalPrice: 2999, discount: 17 },
        specs: {
          origin: "India",
          variety: "Premium Grade Desiccated",
          packaging: "25 kg Bulk Packs",
          shelfLife: "18 Months",
          storage: "Cool & Dry Place"
        }
      };
    }
    
    if (titleLower.includes('makhana') || titleLower.includes('lotus')) {
      return {
        subtitle: "10 kg bulk packing | Multiple size grades available",
        description: "High-quality, pesticide-free makhana sourced from trusted suppliers and carefully hand-picked to ensure uniformity and purity. Hygienically processed and packed, these lotus seeds meet the needs of religious, wellness, and snack food segments.",
        features: [
          "Free from harmful chemicals and pesticides",
          "Clean, crisp texture with excellent popping quality",
          "Suitable for prasad, upvas, and mindful snacking",
          "Available in multiple size varieties to suit different culinary and commercial requirements"
        ],
        grades: [
          "4+ Soota grade available",
          "5+ Soota grade available", 
          "6+ Soota grade available"
        ],
        packaging: "10 kg bulk packs designed for wholesalers, retailers, temple suppliers, and health food brands",
        pricing: { currentPrice: 3299, originalPrice: 3899, discount: 15 },
        specs: {
          origin: "India (Bihar/Jharkhand)",
          variety: "Premium Fox Nuts",
          packaging: "10 kg Bulk Packs",
          shelfLife: "12 Months",
          storage: "Cool & Dry Place"
        }
      };
    }
    
    if (titleLower.includes('pistachio') || titleLower.includes('california')) {
      return {
        subtitle: "12 kg bulk packing for trade and distribution",
        description: "Premium California pistachios traded for consistent quality, taste, and size. Ideal for bulk buyers looking for reliable sourcing for retail, processing, or export purposes.",
        features: [
          "Sourced from established international suppliers",
          "Uniform grading and dependable supply",
          "Suitable for food processing, gifting, and resale",
          "Premium California origin ensures consistent quality"
        ],
        applications: [
          "Food processing and manufacturing",
          "Premium gifting and retail",
          "Export and international trade",
          "Confectionery and bakery applications"
        ],
        packaging: "12 kg bulk packs suitable for wholesalers, dry fruit traders, FMCG brands, and export buyers",
        pricing: { currentPrice: 8999, originalPrice: 10499, discount: 14 },
        specs: {
          origin: "California, USA",
          variety: "Premium Grade",
          packaging: "12 kg Bulk Packs", 
          shelfLife: "12 Months",
          storage: "Cool & Dry Place"
        }
      };
    }
    
    // Default fallback content
    return {
      subtitle: "Premium quality bulk packaging available",
      description: "High-quality product sourced from trusted suppliers and carefully processed to ensure uniformity and purity. Ideal for wholesale, retail, and commercial applications.",
      features: [
        "Premium quality sourced from the finest suppliers",
        "Naturally processed without artificial preservatives", 
        "Rich in essential vitamins and minerals",
        "Perfect for commercial and retail applications"
      ],
      applications: [
        "Food processing and manufacturing",
        "Retail and wholesale distribution",
        "Export and international trade"
      ],
      packaging: "Bulk packs suitable for wholesalers and commercial buyers",
      pricing: { currentPrice: 899, originalPrice: 1199, discount: 25 },
      specs: {
        origin: "India",
        variety: "Premium Grade",
        packaging: "Bulk Packs",
        shelfLife: "12 Months",
        storage: "Cool & Dry Place"
      }
    };
  };

  const productContent = getProductContent(productTitle);

  const specifications = [
    { label: "Origin", value: product.specifications?.origin || productContent.specs.origin },
    { label: "Variety", value: product.specifications?.variety || productContent.specs.variety },
    { label: "Packaging", value: product.specifications?.packaging || productContent.specs.packaging },
    { label: "Shelf Life", value: product.specifications?.shelfLife || productContent.specs.shelfLife },
    { label: "Storage", value: product.specifications?.storage || productContent.specs.storage }
  ];

  // Pricing information with Indian Rupees
  const pricing = {
    currentPrice: product.pricing?.currentPrice || productContent.pricing.currentPrice,
    originalPrice: product.pricing?.originalPrice || productContent.pricing.originalPrice,
    discount: product.pricing?.discount || productContent.pricing.discount,
    currency: "₹"
  };

  // Get product images
  const productImages = [
    product.heroImage,
    ...(product.gallery || [])
  ].filter((image): image is SanityImageSource => Boolean(image));

  useEffect(() => {
    // Related products based on current product type
    const getRelatedProducts = (): Product[] => {
      const titleLower = productTitle.toLowerCase();
      
      if (titleLower.includes('coconut')) {
        return [
          {
            _id: "1",
            title: { 
              en: "Premium Makhana (Lotus Seeds)", 
              ar: "بذور اللوتس الممتازة",
              hi: "प्रीमियम मखाना (कमल के बीज)",
              fr: "Graines de Lotus Premium"
            },
            category: "Premium Nuts & Seeds",
            slug: { current: "premium-makhana" },
            heroImage: product.heroImage
          },
          {
            _id: "2", 
            title: { 
              en: "California Pistachios", 
              ar: "الفستق الكاليفورني",
              hi: "कैलिफोर्निया पिस्ता",
              fr: "Pistaches de Californie"
            },
            category: "Premium Nuts",
            slug: { current: "california-pistachios" },
            heroImage: product.heroImage
          },
          {
            _id: "3",
            title: { 
              en: "Organic Almonds", 
              ar: "اللوز العضوي",
              hi: "जैविक बादाम",
              fr: "Amandes Biologiques"
            },
            category: "Premium Nuts", 
            slug: { current: "organic-almonds" },
            heroImage: product.heroImage
          },
          {
            _id: "4",
            title: { 
              en: "Cashew Nuts", 
              ar: "الكاجو",
              hi: "काजू",
              fr: "Noix de Cajou"
            },
            category: "Premium Nuts",
            slug: { current: "cashew-nuts" },
            heroImage: product.heroImage
          }
        ];
      } else if (titleLower.includes('makhana')) {
        return [
          {
            _id: "1",
            title: { 
              en: "Desiccated Coconut Powder", 
              ar: "مسحوق جوز الهند المجفف",
              hi: "सूखा नारियल पाउडर",
              fr: "Poudre de Coco Déshydratée"
            },
            category: "Premium Coconut Products",
            slug: { current: "desiccated-coconut" },
            heroImage: product.heroImage
          },
          {
            _id: "2", 
            title: { 
              en: "California Pistachios", 
              ar: "الفستق الكاليفورني",
              hi: "कैलिफोर्निया पिस्ता",
              fr: "Pistaches de Californie"
            },
            category: "Premium Nuts",
            slug: { current: "california-pistachios" },
            heroImage: product.heroImage
          },
          {
            _id: "3",
            title: { 
              en: "Premium Walnuts", 
              ar: "الجوز الممتاز",
              hi: "प्रीमियम अखरोट",
              fr: "Noix Premium"
            },
            category: "Premium Nuts", 
            slug: { current: "premium-walnuts" },
            heroImage: product.heroImage
          },
          {
            _id: "4",
            title: { 
              en: "Dried Dates", 
              ar: "التمر المجفف",
              hi: "सूखे खजूर",
              fr: "Dattes Séchées"
            },
            category: "Premium Dried Fruits",
            slug: { current: "dried-dates" },
            heroImage: product.heroImage
          }
        ];
      } else {
        return [
          {
            _id: "1",
            title: { 
              en: "Desiccated Coconut Powder", 
              ar: "مسحوق جوز الهند المجفف",
              hi: "सूखा नारियल पाउडर",
              fr: "Poudre de Coco Déshydratée"
            },
            category: "Premium Coconut Products",
            slug: { current: "desiccated-coconut" },
            heroImage: product.heroImage
          },
          {
            _id: "2", 
            title: { 
              en: "Premium Makhana (Lotus Seeds)", 
              ar: "بذور اللوتس الممتازة",
              hi: "प्रीमियम मखाना (कमल के बीज)",
              fr: "Graines de Lotus Premium"
            },
            category: "Premium Nuts & Seeds",
            slug: { current: "premium-makhana" },
            heroImage: product.heroImage
          },
          {
            _id: "3",
            title: { 
              en: "Organic Almonds", 
              ar: "اللوز العضوي",
              hi: "जैविक बादाम",
              fr: "Amandes Biologiques"
            },
            category: "Premium Nuts", 
            slug: { current: "organic-almonds" },
            heroImage: product.heroImage
          },
          {
            _id: "4",
            title: { 
              en: "Cashew Nuts", 
              ar: "الكاجو",
              hi: "काजू",
              fr: "Noix de Cajou"
            },
            category: "Premium Nuts",
            slug: { current: "cashew-nuts" },
            heroImage: product.heroImage
          }
        ];
      }
    };
    
    setRelatedProducts(getRelatedProducts());
  }, [product, productTitle]);

  const handleAddToEnquiry = () => {
    // Open WhatsApp with pre-filled message
    const message = `Hi! I'm interested in ${productTitle}. Could you please provide more details about bulk pricing and availability?`;
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Track analytics
    if (typeof window !== "undefined") {
      const event = new CustomEvent(labels.analytics.eventAddToEnquiry, { detail: product });
      window.dispatchEvent(event);
      trackEvent(labels.analytics.eventAddToEnquiryGA, {
        product: productTitle,
        location: labels.analytics.locationProductPage,
      });
    }
  };

  const handleRequestForms = () => {
    // Open contact form or email for product forms
    const subject = `Product Forms Request - ${productTitle}`;
    const body = `Hello,\n\nI would like to request product forms and documentation for ${productTitle}.\n\nPlease send me:\n- Product specification sheets\n- Quality certificates\n- Packaging details\n- Sample request forms\n\nThank you!`;
    const emailUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(emailUrl, '_blank');
  };
  return (
    <div className="min-h-screen bg-white pt-24 relative overflow-hidden">
      {/* Floating Visual Elements */}
      <HeroVisualElements />

      {/* Content with relative positioning to appear above floating elements */}
      <div className="relative z-10">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
          <Link
            href={labels.navigation.homeUrl}
            className="hover:text-[var(--color-gold)] transition-colors"
          >
            {labels.navigation.home}
          </Link>
          <span>{labels.apiConfig.breadcrumbSeparator}</span>
          <Link
            href={`${labels.navigation.homeUrl}${labels.routing.productsHash}`}
            className="hover:text-[var(--color-gold)] transition-colors"
          >
            {labels.navigation.products}
          </Link>
          <span>{labels.apiConfig.breadcrumbSeparator}</span>
          <span className="text-[var(--color-deep-brown)]">{productTitle}</span>
        </nav>
      </div>

      {/* Product Content */}
      <section className="container mx-auto px-4 md:px-6 lg:px-8 py-12 relative">
        {/* Section decorative elements */}
        <SectionVisualElements />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden relative"
        >
          {/* Main Product Section */}
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50">
                {productImages[selectedImage] ? (
                  <Image
                    src={urlFor(productImages[selectedImage]).width(600).height(600).url()}
                    alt={productTitle}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-center p-8">
                    <div>
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-sm">Product Image</p>
                      <p className="text-xs text-gray-300">Coming Soon</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Thumbnail Images */}
              {productImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index 
                          ? 'border-[var(--color-gold)]' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={urlFor(image).width(80).height(80).url()}
                        alt={`${productTitle} ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.rating || "4.8"})</span>
              </div>

              {/* Product Title */}
              <div>
                <h1 className="text-3xl font-bold text-[var(--color-deep-brown)] mb-2">
                  {heroHeading || productTitle || "Premium Product Name"}
                </h1>
                <p className="text-[var(--color-muted)] uppercase tracking-wide text-sm mb-2">
                  {product.category || "Premium Category"}
                </p>
                <p className="text-[var(--color-gold)] font-medium text-lg">
                  {productContent.subtitle}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-[var(--color-gold)]">
                  {pricing.currency}{pricing.currentPrice}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  {pricing.currency}{pricing.originalPrice}
                </span>
                <span className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full font-medium">
                  {pricing.discount}% OFF
                </span>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <p className="text-gray-700 leading-relaxed">
                  {description || productContent.description}
                </p>
                {product.introParagraphs?.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    {getLocalized(paragraph, language)}
                  </p>
                ))}
              </div>

              {/* Specifications */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-[var(--color-deep-brown)] mb-3">Product Specifications</h3>
                <div className="space-y-2">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{spec.label}:</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2 italic">
                  *Specifications subject to availability and seasonal variations
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleAddToEnquiry}
                  className="flex-1 bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.595z"/>
                  </svg>
                  WhatsApp Enquiry
                </button>
                <button
                  onClick={handleRequestForms}
                  className="flex-1 border-2 border-[var(--color-deep-brown)] text-[var(--color-deep-brown)] hover:bg-[var(--color-deep-brown)] hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Product Forms
                </button>
              </div>
            </div>
          </div>
          {/* Tabbed Content Section */}
          <div className="border-t border-gray-200">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-6 py-4 font-medium text-sm transition-colors ${
                  activeTab === 'description'
                    ? 'border-b-2 border-[var(--color-gold)] text-[var(--color-gold)]'
                    : 'text-gray-600 hover:text-[var(--color-deep-brown)]'
                }`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab('packaging')}
                className={`px-6 py-4 font-medium text-sm transition-colors ${
                  activeTab === 'packaging'
                    ? 'border-b-2 border-[var(--color-gold)] text-[var(--color-gold)]'
                    : 'text-gray-600 hover:text-[var(--color-deep-brown)]'
                }`}
              >
                Packaging Info
              </button>
              <button
                onClick={() => setActiveTab('forms')}
                className={`px-6 py-4 font-medium text-sm transition-colors ${
                  activeTab === 'forms'
                    ? 'border-b-2 border-[var(--color-gold)] text-[var(--color-gold)]'
                    : 'text-gray-600 hover:text-[var(--color-deep-brown)]'
                }`}
              >
                Product Forms
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 'description' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[var(--color-deep-brown)]">
                    Product Description
                  </h2>
                  {product.listSections?.length ? (
                    product.listSections.map((section, index) => (
                      <div key={index} className="mb-6">
                        <h3 className="text-xl font-semibold text-[var(--color-deep-brown)] mb-3">
                          {getLocalized(section.title, language)}
                        </h3>
                        <ul className="space-y-2">
                          {section.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-[var(--color-gold)] rounded-full mt-2 flex-shrink-0"></span>
                              <span className="text-gray-700">{getLocalized(item, language)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-[var(--color-deep-brown)] mb-3">
                          Key Highlights
                        </h3>
                        <ul className="space-y-2">
                          {productContent.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-[var(--color-gold)] rounded-full mt-2 flex-shrink-0"></span>
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {productContent.grades && (
                        <div>
                          <h3 className="text-xl font-semibold text-[var(--color-deep-brown)] mb-3">
                            Available Varieties
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {productContent.grades.map((grade, index) => {
                              const productType = productTitle.toLowerCase().includes('makhana') ? 'makhana' :
                                                productTitle.toLowerCase().includes('coconut') ? 'coconut' : 'nuts';
                              
                              return (
                                <div key={index} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                                  {/* Visual representation of the product */}
                                  <div className="w-20 h-20 mx-auto mb-3 relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full"></div>
                                    <div className="absolute inset-2 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center">
                                      <ProductVisual productType={productType} size="md" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-[var(--color-gold)] rounded-full flex items-center justify-center">
                                      <span className="text-white font-bold text-xs">{grade.split(' ')[0]}</span>
                                    </div>
                                  </div>
                                  <p className="text-sm font-medium text-gray-700">{grade}</p>
                                  <div className="mt-2 text-xs text-gray-500">Premium Quality</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      
                      {productContent.varieties && (
                        <div>
                          <h3 className="text-xl font-semibold text-[var(--color-deep-brown)] mb-3">
                            Almond Varieties We Offer
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {productContent.varieties.map((variety, index) => (
                              <div key={index} className={`bg-gradient-to-br ${variety.color} rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:scale-105 border border-white/50`}>
                                {/* Visual representation of the almond variety */}
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-16 h-16 relative">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${variety.color} rounded-full shadow-sm`}></div>
                                    <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                                      <ProductVisual productType="almonds" size="md" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-gold)] rounded-full flex items-center justify-center">
                                      <span className="text-white font-bold text-xs">{variety.grade === 'Premium+' ? 'P+' : variety.grade === 'Premium' ? 'P' : 'S'}</span>
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-[var(--color-deep-brown)] text-sm mb-1">{variety.name}</h4>
                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                      variety.grade === 'Premium+' ? 'bg-yellow-200 text-yellow-800' :
                                      variety.grade === 'Premium' ? 'bg-amber-200 text-amber-800' :
                                      'bg-orange-200 text-orange-800'
                                    }`}>
                                      {variety.grade}
                                    </span>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed">{variety.description}</p>
                                
                                {/* Quality indicators */}
                                <div className="mt-3 flex items-center justify-between">
                                  <div className="flex items-center gap-1">
                                    {[...Array(variety.grade === 'Premium+' ? 5 : variety.grade === 'Premium' ? 4 : 3)].map((_, i) => (
                                      <div key={i} className="w-2 h-2 bg-[var(--color-gold)] rounded-full"></div>
                                    ))}
                                  </div>
                                  <div className="text-xs text-gray-500 font-medium">
                                    {variety.grade === 'Premium+' ? 'Luxury Grade' : 
                                     variety.grade === 'Premium' ? 'Premium Grade' : 'Commercial Grade'}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {/* Additional varieties note */}
                          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <div>
                                <h4 className="font-semibold text-blue-800 mb-1">Additional Varieties Available</h4>
                                <p className="text-sm text-blue-600">Price Almonds (versatile, mild flavour) • Inshell & Kernel varieties • Custom grades on request</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {productContent.applications && (
                        <div>
                          <h3 className="text-xl font-semibold text-[var(--color-deep-brown)] mb-3">
                            Ideal For
                          </h3>
                          <ul className="space-y-2">
                            {productContent.applications.map((application, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="w-2 h-2 bg-[var(--color-gold)] rounded-full mt-2 flex-shrink-0"></span>
                                <span className="text-gray-700">{application}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'packaging' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-[var(--color-deep-brown)]">
                    Packaging Information
                  </h2>
                  
                  {/* Visual Packaging Display */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-[var(--color-sand)] to-[var(--color-beige)] rounded-xl p-6 text-center">
                      <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center shadow-md">
                        <svg className="w-10 h-10 text-[var(--color-deep-brown)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-[var(--color-deep-brown)] mb-2">Bulk Packaging</h3>
                      <p className="text-sm text-gray-600">{productContent.specs.packaging}</p>
                      <div className="mt-3 text-xs text-gray-500">
                        Commercial Grade
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                      <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center shadow-md">
                        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-blue-800 mb-2">Quality Sealed</h3>
                      <p className="text-sm text-blue-600">Vacuum sealed for freshness</p>
                      <div className="mt-3 text-xs text-blue-500">
                        Food Grade Material
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                      <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center shadow-md">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-green-800 mb-2">Long Shelf Life</h3>
                      <p className="text-sm text-green-600">{productContent.specs.shelfLife}</p>
                      <div className="mt-3 text-xs text-green-500">
                        Extended Freshness
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center">
                      <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center shadow-md">
                        <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-orange-800 mb-2">Easy Transport</h3>
                      <p className="text-sm text-orange-600">Optimized for logistics</p>
                      <div className="mt-3 text-xs text-orange-500">
                        Stackable Design
                      </div>
                    </div>
                  </div>

                  {/* Packaging Specifications */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-[var(--color-deep-brown)] mb-6">Packaging Specifications</h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Package Dimensions Visual */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-800 mb-4">Package Dimensions</h4>
                        <div className="bg-gray-50 rounded-lg p-6 text-center">
                          <div className="relative">
                            {/* 3D Box Visualization */}
                            <div className="w-32 h-24 mx-auto mb-4 relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-sand)] to-[var(--color-beige)] rounded-lg transform rotate-3 shadow-lg"></div>
                              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-beige)] to-[var(--color-sand)] rounded-lg transform -rotate-1 shadow-md"></div>
                              <div className="absolute inset-0 bg-white rounded-lg shadow-sm flex items-center justify-center">
                                <div className="text-center">
                                  <div className="text-xs font-medium text-gray-600">
                                    {productContent.specs.packaging.includes('25 kg') ? '25 KG' : 
                                     productContent.specs.packaging.includes('12 kg') ? '12 KG' : 
                                     productContent.specs.packaging.includes('10 kg') ? '10 KG' : 'BULK'}
                                  </div>
                                  <div className="text-xs text-gray-500">PACK</div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Dimension Labels */}
                            <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                              <div className="text-center">
                                <div className="font-medium">Length</div>
                                <div>60 cm</div>
                              </div>
                              <div className="text-center">
                                <div className="font-medium">Width</div>
                                <div>40 cm</div>
                              </div>
                              <div className="text-center">
                                <div className="font-medium">Height</div>
                                <div>25 cm</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Packaging Details */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-800 mb-4">Packaging Details</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-600">Package Type:</span>
                            <span className="font-medium">{productContent.specs.packaging}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-600">Material:</span>
                            <span className="font-medium">Food Grade PP/HDPE</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-600">Sealing:</span>
                            <span className="font-medium">Heat Sealed + Vacuum</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-600">Storage:</span>
                            <span className="font-medium">{productContent.specs.storage}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-600">Shelf Life:</span>
                            <span className="font-medium">{productContent.specs.shelfLife}</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-gray-600">Origin:</span>
                            <span className="font-medium">{productContent.specs.origin}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Logistics Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-blue-800">Shipping Information</h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-blue-600">Pallets per 20ft:</span>
                          <span className="font-medium text-blue-800">10-12 pallets</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-600">Packages per pallet:</span>
                          <span className="font-medium text-blue-800">40-50 packs</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-600">Total capacity:</span>
                          <span className="font-medium text-blue-800">20-25 MT</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-green-800">Quality Assurance</h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-green-600">Moisture content:</span>
                          <span className="font-medium text-green-800">≤ 5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-600">Purity level:</span>
                          <span className="font-medium text-green-800">≥ 99%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-600">Certification:</span>
                          <span className="font-medium text-green-800">ISO, HACCP</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Custom Packaging Options */}
                  <div className="bg-gradient-to-r from-[var(--color-sand)] to-[var(--color-beige)] rounded-xl p-6">
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-[var(--color-deep-brown)] mb-3">
                        Custom Packaging Available
                      </h4>
                      <p className="text-gray-700 mb-4 max-w-2xl mx-auto">
                        We offer flexible packaging solutions to meet your specific requirements. 
                        Contact us for custom sizes, private labeling, and specialized packaging options.
                      </p>
                      <button
                        onClick={handleAddToEnquiry}
                        className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.595z"/>
                        </svg>
                        Discuss Custom Packaging
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'forms' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[var(--color-deep-brown)]">
                    Product Forms & Documentation
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[var(--color-gold)] rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[var(--color-deep-brown)] mb-2">Product Specification Sheet</h3>
                          <p className="text-gray-600 text-sm mb-3">Detailed technical specifications and quality parameters</p>
                          <button 
                            onClick={handleRequestForms}
                            className="text-[var(--color-gold)] hover:text-[var(--color-gold-dark)] text-sm font-medium"
                          >
                            Request Document →
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[var(--color-deep-brown)] mb-2">Quality Certificates</h3>
                          <p className="text-gray-600 text-sm mb-3">ISO, HACCP, and other quality certifications</p>
                          <button 
                            onClick={handleRequestForms}
                            className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                          >
                            Request Certificates →
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[var(--color-deep-brown)] mb-2">Sample Request Form</h3>
                          <p className="text-gray-600 text-sm mb-3">Request product samples for quality evaluation</p>
                          <button 
                            onClick={handleRequestForms}
                            className="text-green-500 hover:text-green-600 text-sm font-medium"
                          >
                            Request Sample →
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[var(--color-deep-brown)] mb-2">Bulk Pricing Sheet</h3>
                          <p className="text-gray-600 text-sm mb-3">Volume-based pricing and MOQ information</p>
                          <button 
                            onClick={handleRequestForms}
                            className="text-purple-500 hover:text-purple-600 text-sm font-medium"
                          >
                            Request Pricing →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-[var(--color-sand)] to-[var(--color-beige)] rounded-xl p-8 mt-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-[var(--color-deep-brown)] mb-4">
                    Ready for Bulk Orders?
                  </h3>
                  <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                    Get competitive bulk pricing, learn about minimum order quantities (MOQ), and explore custom packaging options. 
                    We ensure quality consistency and reliable supply for all your commercial needs.
                  </p>
                  
                  {/* Key Benefits */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white/50 rounded-lg p-4">
                      <div className="w-12 h-12 bg-[var(--color-gold)] rounded-lg flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-[var(--color-deep-brown)] mb-1">Volume Discounts</h4>
                      <p className="text-sm text-gray-600">Better prices for larger quantities</p>
                    </div>
                    
                    <div className="bg-white/50 rounded-lg p-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-[var(--color-deep-brown)] mb-1">Custom Packaging</h4>
                      <p className="text-sm text-gray-600">Tailored to your requirements</p>
                    </div>
                    
                    <div className="bg-white/50 rounded-lg p-4">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-[var(--color-deep-brown)] mb-1">Fast Delivery</h4>
                      <p className="text-sm text-gray-600">Reliable logistics network</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handleAddToEnquiry}
                      className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.595z"/>
                      </svg>
                      Get Bulk Pricing on WhatsApp
                    </button>
                    <a
                      href={`mailto:${contactEmail}?subject=Bulk Pricing & MOQ Enquiry - ${productTitle}&body=Hello,%0D%0A%0D%0AI am interested in bulk purchasing ${productTitle}.%0D%0A%0D%0APlease provide:%0D%0A- Volume-based pricing tiers%0D%0A- Minimum Order Quantity (MOQ)%0D%0A- Custom packaging options%0D%0A- Delivery timelines%0D%0A%0D%0AThank you!`}
                      className="border-2 border-[var(--color-deep-brown)] text-[var(--color-deep-brown)] hover:bg-[var(--color-deep-brown)] hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email for MOQ Details
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-gray-200 p-8 relative">
              {/* Decorative elements for related products */}
              <SectionVisualElements className="opacity-50" />
              
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[var(--color-deep-brown)]">Popular dry fruit Discount</h2>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <Link
                    key={relatedProduct._id}
                    href={`/products/${relatedProduct.slug?.current}`}
                    className="group relative"
                  >
                    {/* Product card decorative element */}
                    <div className="absolute -top-2 -right-2 w-4 h-3 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full transform rotate-12 opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    
                    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow relative overflow-hidden">
                      {/* Card background decoration */}
                      <div className="absolute bottom-2 right-2 w-6 h-4 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full opacity-20"></div>
                      
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-50 mb-4 relative">
                        {relatedProduct.heroImage ? (
                          <Image
                            src={urlFor(relatedProduct.heroImage).width(300).height(300).url()}
                            alt={getLocalized(relatedProduct.title, language)}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 relative">
                            {/* Visual placeholder based on product type */}
                            <div className="text-center">
                              <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center">
                                <ProductVisual 
                                  productType={
                                    getLocalized(relatedProduct.title, language).toLowerCase().includes('makhana') ? 'makhana' :
                                    getLocalized(relatedProduct.title, language).toLowerCase().includes('coconut') ? 'coconut' : 'nuts'
                                  } 
                                  size="lg" 
                                />
                              </div>
                              <p className="text-xs">Product Image</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-[var(--color-deep-brown)] group-hover:text-[var(--color-gold)] transition-colors">
                          {getLocalized(relatedProduct.title, language)}
                        </h3>
                        <p className="text-sm text-gray-600">{relatedProduct.category}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[var(--color-gold)] font-bold">
                            ₹{Math.floor(Math.random() * 500) + 299}
                          </span>
                          <span className="text-gray-400 line-through text-sm">
                            ₹{Math.floor(Math.random() * 300) + 599}
                          </span>
                          <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                            {Math.floor(Math.random() * 30) + 15}% OFF
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* Back to Products Link */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 pb-12">
        <Link
          href={`${labels.navigation.homeUrl}${labels.routing.productsHash}`}
          className="inline-flex items-center gap-2 text-[var(--color-gold)] hover:text-[var(--color-gold-dark)] transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {labels.productDetail.backToProducts}
        </Link>
      </div>
      </div>
    </div>
  );
}