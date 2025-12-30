"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/components/analytics/GA4";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalized, LocaleString, LocaleText } from "@/lib/i18n";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/client";
import type { SanityImageSource } from "@sanity/image-url";
import { useState, useEffect } from "react";

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
  nutritionalInfo?: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
    sugar: string;
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
    requestSample: string;
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
    actionSample: string;
    scrollTargetContact: string;
    productsHash: string;
  };
  analytics: {
    eventAddToEnquiry: string;
    eventAddToEnquiryGA: string;
    eventSampleRequest: string;
    locationProductPage: string;
  };
}

interface ProductDetailProps {
  product: Product;
  labels: Labels;
}

export default function ProductDetail({ product, labels }: ProductDetailProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const productTitle = getLocalized(product.title, language);
  const heroHeading = getLocalized(product.heroHeading, language);
  const ctaLine = getLocalized(product.ctaLine, language);
  const description = getLocalized(product.description, language);

  // Function to get product-specific content based on product title or slug
  const getProductContent = (title: string) => {
    const titleLower = title.toLowerCase();
    
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
        nutritional: {
          calories: "660 kcal",
          protein: "6.9g", 
          carbs: "23.7g",
          fat: "64.5g",
          fiber: "16.3g",
          sugar: "6.2g"
        },
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
        nutritional: {
          calories: "347 kcal",
          protein: "9.7g",
          carbs: "76.9g", 
          fat: "0.1g",
          fiber: "14.5g",
          sugar: "0g"
        },
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
        nutritional: {
          calories: "560 kcal",
          protein: "20.2g",
          carbs: "27.2g",
          fat: "45.3g", 
          fiber: "10.6g",
          sugar: "7.7g"
        },
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
      nutritional: {
        calories: "274 kcal",
        protein: "3.3g",
        carbs: "65g",
        fat: "0.9g",
        fiber: "9.8g", 
        sugar: "63g"
      },
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

  // Use product-specific nutritional info or fallback to content
  const nutritionalInfo = [
    { label: "Calories", value: product.nutritionalInfo?.calories || productContent.nutritional.calories },
    { label: "Protein", value: product.nutritionalInfo?.protein || productContent.nutritional.protein },
    { label: "Carbs", value: product.nutritionalInfo?.carbs || productContent.nutritional.carbs },
    { label: "Fat", value: product.nutritionalInfo?.fat || productContent.nutritional.fat },
    { label: "Fiber", value: product.nutritionalInfo?.fiber || productContent.nutritional.fiber },
    { label: "Sugar", value: product.nutritionalInfo?.sugar || productContent.nutritional.sugar }
  ];

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
  ].filter(Boolean);

  useEffect(() => {
    // Related products based on current product type
    const getRelatedProducts = () => {
      const titleLower = productTitle.toLowerCase();
      
      if (titleLower.includes('coconut')) {
        return [
          {
            _id: "1",
            title: { en: "Premium Makhana (Lotus Seeds)", ar: "بذور اللوتس الممتازة" },
            category: "Premium Nuts & Seeds",
            slug: { current: "premium-makhana" },
            heroImage: product.heroImage
          },
          {
            _id: "2", 
            title: { en: "California Pistachios", ar: "الفستق الكاليفورني" },
            category: "Premium Nuts",
            slug: { current: "california-pistachios" },
            heroImage: product.heroImage
          },
          {
            _id: "3",
            title: { en: "Organic Almonds", ar: "اللوز العضوي" },
            category: "Premium Nuts", 
            slug: { current: "organic-almonds" },
            heroImage: product.heroImage
          },
          {
            _id: "4",
            title: { en: "Cashew Nuts", ar: "الكاجو" },
            category: "Premium Nuts",
            slug: { current: "cashew-nuts" },
            heroImage: product.heroImage
          }
        ];
      } else if (titleLower.includes('makhana')) {
        return [
          {
            _id: "1",
            title: { en: "Desiccated Coconut Powder", ar: "مسحوق جوز الهند المجفف" },
            category: "Premium Coconut Products",
            slug: { current: "desiccated-coconut" },
            heroImage: product.heroImage
          },
          {
            _id: "2", 
            title: { en: "California Pistachios", ar: "الفستق الكاليفورني" },
            category: "Premium Nuts",
            slug: { current: "california-pistachios" },
            heroImage: product.heroImage
          },
          {
            _id: "3",
            title: { en: "Premium Walnuts", ar: "الجوز الممتاز" },
            category: "Premium Nuts", 
            slug: { current: "premium-walnuts" },
            heroImage: product.heroImage
          },
          {
            _id: "4",
            title: { en: "Dried Dates", ar: "التمر المجفف" },
            category: "Premium Dried Fruits",
            slug: { current: "dried-dates" },
            heroImage: product.heroImage
          }
        ];
      } else {
        return [
          {
            _id: "1",
            title: { en: "Desiccated Coconut Powder", ar: "مسحوق جوز الهند المجفف" },
            category: "Premium Coconut Products",
            slug: { current: "desiccated-coconut" },
            heroImage: product.heroImage
          },
          {
            _id: "2", 
            title: { en: "Premium Makhana (Lotus Seeds)", ar: "بذور اللوتس الممتازة" },
            category: "Premium Nuts & Seeds",
            slug: { current: "premium-makhana" },
            heroImage: product.heroImage
          },
          {
            _id: "3",
            title: { en: "Organic Almonds", ar: "اللوز العضوي" },
            category: "Premium Nuts", 
            slug: { current: "organic-almonds" },
            heroImage: product.heroImage
          },
          {
            _id: "4",
            title: { en: "Cashew Nuts", ar: "الكاجو" },
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
    if (typeof window !== "undefined") {
      const event = new CustomEvent(labels.analytics.eventAddToEnquiry, { detail: product });
      window.dispatchEvent(event);
      trackEvent(labels.analytics.eventAddToEnquiryGA, {
        product: productTitle,
        location: labels.analytics.locationProductPage,
      });

      const element = document.getElementById(labels.routing.scrollTargetContact);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleRequestSample = () => {
    trackEvent(labels.analytics.eventSampleRequest, {
      product: productTitle,
      location: labels.analytics.locationProductPage,
    });
    router.push(
      `/contact?${labels.routing.queryParamType}=${labels.apiConfig.enquiryTypeTrade}&${labels.routing.queryParamProduct}=${encodeURIComponent(productTitle)}&${labels.routing.queryParamAction}=${labels.routing.actionSample}`
    );
  };

  return (
    <div className="min-h-screen bg-white pt-24">
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
      <section className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
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

              {/* Nutritional Information */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-[var(--color-deep-brown)] mb-3">
                  Nutritional Value (per 100g)
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {nutritionalInfo.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.label}:</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2 italic">
                  *Nutritional values may vary slightly based on natural variations
                </p>
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
                  className="flex-1 bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {labels?.common?.addToEnquiry || "Add to Enquiry"}
                </button>
                <button
                  onClick={handleRequestSample}
                  className="flex-1 border-2 border-[var(--color-deep-brown)] text-[var(--color-deep-brown)] hover:bg-[var(--color-deep-brown)] hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {labels?.productDetail?.requestSample || "Request Sample"}
                </button>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="border-t border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-[var(--color-deep-brown)] mb-6">
              Product Description
            </h2>
            <div className="prose max-w-none">
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
                        Available Grades
                      </h3>
                      <ul className="space-y-2">
                        {productContent.grades.map((grade, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-[var(--color-gold)] rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-gray-700">{grade}</span>
                          </li>
                        ))}
                      </ul>
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
                  
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--color-deep-brown)] mb-3">
                      Packaging
                    </h3>
                    <p className="text-gray-700">{productContent.packaging}</p>
                  </div>
                </div>
              )}
              
              {ctaLine ? (
                <div className="bg-[var(--color-sand)] rounded-xl p-6 mt-6">
                  <p className="text-lg font-medium text-[var(--color-deep-brown)]">{ctaLine}</p>
                </div>
              ) : (
                <div className="bg-[var(--color-sand)] rounded-xl p-6 mt-6">
                  <p className="text-lg font-medium text-[var(--color-deep-brown)]">
                    Contact us for bulk pricing, custom packaging options, and detailed product specifications. 
                    We ensure quality consistency and reliable supply for all your commercial needs.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-gray-200 p-8">
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
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct._id}
                    href={`/products/${relatedProduct.slug?.current}`}
                    className="group"
                  >
                    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-50 mb-4">
                        {relatedProduct.heroImage ? (
                          <Image
                            src={urlFor(relatedProduct.heroImage).width(300).height(300).url()}
                            alt={getLocalized(relatedProduct.title, language)}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <div className="text-center">
                              <div className="w-12 h-12 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <p className="text-xs">Image</p>
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
  );
}
