import { groq } from "next-sanity";

export const productsQuery = groq`
  *[_type == "product"] | order(order asc) {
    _id,
    slug,
    title,
    category,
    origins,
    grades,
    packFormats,
    MOQ,
    specSheetPDF,
    heroImage,
    gallery,
    microVideo,
    heroHeading,
    introParagraphs,
    listSections,
    ctaLine,
    description
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    slug,
    title,
    category,
    origins,
    grades,
    packFormats,
    MOQ,
    specSheetPDF,
    heroImage,
    gallery,
    microVideo,
    heroHeading,
    introParagraphs,
    listSections,
    ctaLine,
    description
  }
`;

export const brandsQuery = groq`
  *[_type == "brand"] | order(order asc) {
    _id,
    name,
    heroImage,
    brandCopy,
    productSKUs,
    distributionContacts,
    specSheetPDF
  }
`;

export const aboutQuery = groq`
  *[_type == "about"][0] {
    _id,
    whoWeAre,
    mission,
    vision,
    ourStory,
    commitment,
    teamSection,
    journeySection,
    distributionRegions
  }
`;

export const processQuery = groq`
  *[_type == "processStep"] | order(order asc) {
    _id,
    title,
    detail
  }
`;

export const sustainabilityQuery = groq`
  *[_type == "sustainabilityPillar"] | order(order asc) {
    _id,
    title,
    detail
  }
`;

export const timelineQuery = groq`
  *[_type == "timeline"] | order(year asc) {
    _id,
    year,
    title,
    description
  }
`;

export const ctaQuery = groq`
  *[_type == "cta"][0] {
    _id,
    walkthrough,
    pricing {
      ...,
      emailPlaceholder
    }
  }
`;

export const contactPageQuery = groq`
  *[_type == "contactPage"][0] {
    _id,
    eyebrow,
    title,
    description,
    generalEnquiryLabel,
    tradeEnquiryLabel,
    contactDetailsTitle,
    businessHoursTitle,
    footerNote,
    contactDetails,
    businessHours
  }
`;

export const quoteQuery = groq`
  *[_type == "quote"][0] {
    _id,
    quote,
    author,
    linkText,
    linkUrl
  }
`;

export const footerQuery = groq`
  *[_type == "footer"][0] {
    _id,
    quickLinks,
    certificationBadges,
    socialLinks,
    copyrightText,
    privacyNote
  }
`;

export const valuesQuery = groq`
  *[_type == "value"] | order(order asc) {
    _id,
    title,
    description,
    icon
  }
`;

export const communityQuery = groq`
  *[_type == "community"][0] {
    _id,
    teamPhotos,
    csrInitiatives,
    tradeEvents
  }
`;

export const headerQuery = groq`
  *[_type == "header"][0] {
    _id,
    logo,
    navLinks,
    tradeButtonText,
    whatsappText,
    logoAlt,
    homeAriaLabel,
    navAriaLabel,
    menuAriaLabel,
    productsLabel
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    organization,
    common,
    forms {
      ...,
      tradeQuantityPlaceholder
    },
    productCard,
    productModal,
    productDetail,
    navigation,
    footer,
    enquiry {
      ...,
      gradePlaceholder,
      packFormatPlaceholder,
      quantityPlaceholder,
      notesPlaceholder,
      saveLabel,
      cancelLabel,
      editLabel,
      removeAriaLabel,
      builder
    },
    distribution,
    contact,
    seo,
    whatsapp,
    heroConfig,
    validation,
    routing,
    accessibility,
    themeToggle,
    error,
    emailTemplates,
    apiMessages,
    apiConfig,
    analytics,
    pdfTemplate
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    _id,
    heroStats,
    capabilitiesSection,
    processSection,
    sustainabilitySection,
    trustSection,
    productShowcaseSection,
    spiralQuoteSection,
    aboutSection
  }
`;

export const distributionQuery = groq`
  *[_type == "distributionRegion"] {
    _id,
    name,
    description,
    x,
    y
  }
`;

export const productListQuery = groq`
  *[_type == "product"] | order(title asc) {
    _id,
    title,
    slug
  }
`;

export const heroSlidesQuery = groq`
  *[_type == "heroSlide"] | order(order asc) {
    _id,
    image,
    title,
    subtitle,
    ctaText,
    ctaLink,
    eyebrow,
    headline,
    badge,
    paragraphs,
    primaryCta,
    secondaryCta,
    videoUrl,
    posterImage,
    stats
  }
`;

export const capabilitiesQuery = groq`
  *[_type == "capability"] | order(order asc) {
    _id,
    title,
    description,
    metric,
    icon
  }
`;

export const certificatesQuery = groq`
  *[_type == "certificate"] | order(order asc) {
    _id,
    name,
    label,
    "imageUrl": image.asset->url
  }
`;

export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    image,
    bio
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] {
    _id,
    author,
    role,
    location,
    videoUrl,
    thumbnail,
    quote
  }
`;

export const testimonialsSectionQuery = groq`
  *[_type == "testimonialsSection"][0] {
    _id,
    eyebrow,
    title,
    droneSection
  }
`;

export const productsPageQuery = groq`
  *[_type == "productsPage"][0] {
    _id,
    eyebrow,
    title,
    description
  }
`;

export const privacyPolicyQuery = groq`
  *[_type == "privacyPolicy"][0] {
    _id,
    title,
    lastUpdated,
    content[] {
      heading,
      body
    }
  }
`;
