# Divyansh International - B2B E-Commerce Platform

A high-performance, enterprise-grade Next.js application for Divyansh International, a leading importer and distributor of premium dry fruits and nuts in India. Built for B2B clients including modern trade, wholesalers, food manufacturers, and institutional buyers.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Database Setup](#database-setup)
- [Sanity CMS Setup](#sanity-cms-setup)
- [Available Scripts](#available-scripts)
- [Pages & Routes](#pages--routes)
- [API Endpoints](#api-endpoints)
- [Testing Checklist](#testing-checklist)
- [Deployment](#deployment)
- [Design System](#design-system)

---

## 🎯 Overview

This is a modern, content-managed B2B platform featuring:

- **Product Catalog**: Comprehensive listings of almonds, cashews, walnuts, pistachios, and other premium nuts
- **Enquiry Builder**: Interactive cart-like system for building product enquiries with PDF export
- **Contact Forms**: Separate forms for general enquiries and trade/bulk orders
- **CMS Integration**: Full content management via Sanity Studio
- **Analytics**: Google Analytics 4 integration with custom event tracking
- **Email Notifications**: Automated email notifications via Resend
- **Database**: PostgreSQL with Prisma ORM for enquiry management

---

## 🛠 Tech Stack

### Core Framework

- **Next.js 16** - React framework with App Router and Turbopack
- **React 19** - UI library
- **TypeScript 5** - Type safety

### Styling & UI

- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12** - Animation library with accessibility support
- **Custom Design Tokens** - Consistent theming system

### Content Management

- **Sanity 4** - Headless CMS
- **@sanity/client** - Sanity API client
- **@sanity/image-url** - Image optimization
- **@sanity/vision** - GROQ query testing tool

### Database & ORM

- **PostgreSQL** - Primary database
- **Prisma 7** - Type-safe ORM
- **@prisma/adapter-pg** - PostgreSQL adapter with connection pooling
- **Supabase** - Database hosting (optional)

### Forms & Validation

- **React Hook Form 7** - Form state management
- **Zod 4** - Schema validation
- **@hookform/resolvers** - Form validation integration

### Email & Communications

- **Resend** - Transactional email service
- **Webhook Support** - Custom webhook integration for notifications

### PDF Generation

- **@react-pdf/renderer** - React-based PDF generation
- **jsPDF** - PDF document creation
- **jspdf-autotable** - Table generation for PDFs

### Analytics

- **Google Analytics 4** - Web analytics and conversion tracking

### Development Tools

- **ESLint 9** - Code linting
- **Prettier 3** - Code formatting
- **tsx** - TypeScript execution for scripts
- **dotenv-cli** - Environment variable management

---

## ✨ Features

### Core Functionality

- ✅ **Responsive Design** - Mobile-first approach, optimized for all devices
- ✅ **Accessibility** - WCAG 2.1 AA compliant with skip links, ARIA labels, keyboard navigation
- ✅ **SEO Optimized** - Structured data, meta tags, sitemap, robots.txt
- ✅ **Performance** - Lighthouse score >= 90, image optimization, code splitting
- ✅ **Dark Mode** - System preference detection with manual toggle

### Business Features

- ✅ **Product Catalog** - Dynamic product pages with detailed specifications
- ✅ **Enquiry Builder** - Cart-like system for building product enquiries
- ✅ **PDF Export** - Generate professional enquiry PDFs
- ✅ **Contact Forms** - General and trade-specific enquiry forms
- ✅ **Email Notifications** - Automated notifications for form submissions
- ✅ **Webhook Integration** - Custom webhook support for external integrations
- ✅ **Analytics Tracking** - Custom event tracking for user interactions

### Content Management

- ✅ **Sanity CMS** - Full content management for all pages
- ✅ **Live Preview** - Real-time content updates
- ✅ **Media Management** - Optimized image delivery via Sanity CDN
- ✅ **Structured Content** - Reusable content blocks and components

---

## 📁 Project Structure

```
divyansh-international/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── contact/
│   │   │   ├── general/         # General enquiry endpoint
│   │   │   └── trade/           # Trade enquiry endpoint
│   │   └── enquiry/
│   │       ├── pdf/             # PDF generation endpoint
│   │       └── submit/          # Enquiry submission endpoint
│   ├── about/                    # About page
│   ├── contact/                  # Contact page
│   ├── products/                 # Products listing & detail pages
│   │   └── [slug]/              # Dynamic product pages
│   ├── studio/                   # Sanity Studio
│   │   └── [[...index]]/        # Catch-all for Studio routes
│   ├── error.tsx                 # Error boundary
│   ├── globals.css               # Global styles & design tokens
│   ├── layout.tsx                # Root layout
│   ├── loading.tsx               # Loading UI
│   ├── not-found.tsx             # 404 page
│   ├── page.tsx                  # Homepage
│   ├── robots.ts                 # Robots.txt generation
│   └── sitemap.ts                # Sitemap generation
│
├── components/                   # React Components
│   ├── analytics/
│   │   └── GA4.tsx              # Google Analytics integration
│   ├── assets/
│   │   └── Decorations.tsx      # SVG decorative elements
│   ├── forms/
│   │   ├── GeneralEnquiryForm.tsx
│   │   └── TradeEnquiryForm.tsx
│   ├── pages/
│   │   ├── AboutContent.tsx
│   │   └── ContactContent.tsx
│   ├── sections/                 # Homepage sections
│   │   ├── About.tsx
│   │   ├── CapabilitiesSection.tsx
│   │   ├── CTASection.tsx
│   │   ├── HeroSlider.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── ProductShowcase.tsx
│   │   ├── SustainabilitySection.tsx
│   │   ├── TrustSection.tsx
│   │   └── VideoTestimonials.tsx
│   ├── seo/
│   │   └── StructuredData.tsx   # JSON-LD structured data
│   ├── DistributionMap.tsx       # Interactive distribution map
│   ├── EnquiryBuilder.tsx        # Enquiry cart system
│   ├── EnquiryItem.tsx           # Individual enquiry item
│   ├── EnquiryPanel.tsx          # Enquiry panel UI
│   ├── FloatingEnquiryBar.tsx    # Floating enquiry CTA
│   ├── FloatingWhatsApp.tsx      # WhatsApp contact button
│   ├── Footer.tsx                # Site footer
│   ├── Header.tsx                # Site header
│   ├── MobileMenu.tsx            # Mobile navigation
│   ├── ProductCard.tsx           # Product card component
│   ├── ProductDetail.tsx         # Product detail view
│   ├── ProductModal.tsx          # Product modal
│   ├── ProductsDropdown.tsx      # Products navigation dropdown
│   ├── SkipLink.tsx              # Accessibility skip link
│   ├── SpiralQuote.tsx           # Decorative quote component
│   ├── ThemeToggle.tsx           # Dark mode toggle
│   └── Timeline.tsx              # Timeline component
│
├── lib/                          # Utility Libraries
│   ├── data/
│   │   └── distribution.ts       # Distribution data
│   ├── resend/
│   │   └── client.ts             # Resend email client
│   ├── sanity/
│   │   ├── client.ts             # Sanity client configuration
│   │   ├── image.ts              # Image URL builder
│   │   └── queries.ts            # GROQ queries
│   ├── seo/
│   │   ├── metadata.ts           # SEO metadata utilities
│   │   ├── schema.ts             # Structured data schemas
│   │   └── types.ts              # SEO type definitions
│   ├── utils/
│   │   └── enquiry.ts            # Enquiry utilities
│   ├── validation/
│   │   └── schemas.ts            # Zod validation schemas
│   ├── env.ts                    # Environment variable validation
│   └── prisma.ts                 # Prisma client singleton
│
├── prisma/
│   └── schema.prisma             # Database schema
│
├── sanity/                       # Sanity CMS Configuration
│   └── schemas/                  # Content schemas
│       ├── about.ts
│       ├── brand.ts
│       ├── capability.ts
│       ├── certificate.ts
│       ├── community.ts
│       ├── contactPage.ts
│       ├── cta.ts
│       ├── distribution.ts
│       ├── footer.ts
│       ├── header.ts
│       ├── heroSlide.ts
│       ├── homePage.ts
│       ├── index.ts
│       ├── process.ts
│       ├── product.ts
│       ├── productsPage.ts
│       ├── quote.ts
│       ├── siteSettings.ts
│       ├── sustainability.ts
│       ├── teamMember.ts
│       ├── testimonial.ts
│       ├── testimonialsSection.ts
│       ├── timeline.ts
│       └── value.ts
│
├── scripts/
│   └── seed-sanity.ts            # Sanity data seeding script
│
├── public/                       # Static Assets
│
├── .env.example                  # Environment variables template
├── .env.local                    # Local environment variables (gitignored)
├── next.config.ts                # Next.js configuration
├── sanity.config.ts              # Sanity Studio configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **pnpm** (preferred) or npm/yarn
- **PostgreSQL** database (local or hosted)
- **Sanity account** (free tier available)
- **Resend account** (for email functionality)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd divyansh-international
```

2. **Install dependencies**

```bash
pnpm install
# or
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual credentials (see [Environment Setup](#environment-setup))

4. **Set up the database**

```bash
# Generate Prisma client
pnpm prisma generate

# Run migrations
pnpm prisma migrate dev
```

5. **Seed Sanity CMS**

```bash
pnpm seed
```

6. **Run the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Setup

### Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# ==============================================
# ENVIRONMENT
# ==============================================
NODE_ENV=development

# ==============================================
# SANITY CMS CONFIGURATION (Required)
# ==============================================
# Get these from: https://www.sanity.io/manage
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# Required for seeding Sanity (get from: https://www.sanity.io/manage/personal/tokens)
SANITY_API_TOKEN=your_sanity_token_with_write_permissions

# ==============================================
# DATABASE CONFIGURATION (Required)
# ==============================================
# PostgreSQL with Prisma - Pooled connection for queries (port 6543)
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection for migrations and Prisma adapter (port 5432)
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"

# ==============================================
# EMAIL SERVICE (Required)
# ==============================================
# Resend API Key - Get from: https://resend.com/api-keys
RESEND_API_KEY=re_your_api_key

# Email address to receive contact form submissions
CONTACT_EMAIL=your-email@example.com

# ==============================================
# ANALYTICS (Optional)
# ==============================================
# Google Analytics 4 Measurement ID - Get from: https://analytics.google.com
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX

# ==============================================
# WEBHOOKS (Optional)
# ==============================================
# Webhook URL for enquiry notifications (e.g., Slack, Discord, custom endpoint)
ENQUIRY_WEBHOOK_URL=https://your-webhook-url.com/endpoint
```

### How to Get Credentials

#### Sanity CMS

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Create a new project or select existing
3. Copy the Project ID
4. Go to API settings and create a token with "Editor" permissions
5. Copy the token

#### PostgreSQL Database (Supabase)

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Project Settings > Database
4. Copy the connection strings (both pooled and direct)

#### Resend Email

1. Go to [resend.com](https://resend.com)
2. Sign up and verify your domain
3. Go to API Keys and create a new key
4. Copy the API key

#### Google Analytics 4

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create a new property (GA4)
3. Copy the Measurement ID (starts with G-)

---

## 🗄 Database Setup

### Schema Overview

The application uses a single `Enquiry` model to store all form submissions:

```prisma
model Enquiry {
  id              BigInt   @id @default(autoincrement())
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  type            String
  name            String
  email           String
  phone           String?
  company         String?
  role            String?
  country         String?
  productInterest Json?
  quantity        String?
  message         String
  status          String   @default("new")
}
```

### Database Commands

```bash
# Generate Prisma Client
pnpm prisma generate

# Create and apply migrations
pnpm prisma migrate dev --name init

# Open Prisma Studio (database GUI)
pnpm prisma studio

# Reset database (WARNING: deletes all data)
pnpm prisma migrate reset

# Deploy migrations to production
pnpm prisma migrate deploy
```

---

## 📝 Sanity CMS Setup

### Accessing Sanity Studio

Once the development server is running, access Sanity Studio at:

```
http://localhost:3000/studio
```

### Content Schemas

The CMS includes the following content types:

#### Site-Wide

- **Site Settings** - Global site configuration
- **Header** - Navigation menu
- **Footer** - Footer content and links

#### Pages

- **Home Page** - Homepage content and sections
- **About Page** - Company information
- **Contact Page** - Contact form configuration
- **Products Page** - Products listing configuration

#### Content Types

- **Products** - Product catalog (almonds, cashews, walnuts, etc.)
- **Hero Slides** - Homepage hero content
- **Capabilities** - Company capabilities
- **Process Steps** - Business process timeline
- **Testimonials** - Customer testimonials
- **Sustainability** - Sustainability initiatives
- **Team Members** - Team profiles
- **Certificates** - Certifications and awards
- **Brands** - Partner brands
- **Timeline Events** - Company history
- **Values** - Company values
- **Communities** - Community initiatives
- **Distribution** - Distribution network data
- **Quotes** - Featured quotes
- **CTAs** - Call-to-action sections

### Seeding Sanity

The project includes a comprehensive seed script that populates Sanity with sample data:

```bash
pnpm seed
```

This will create:

- 10+ product entries (almonds, cashews, walnuts, pistachios, etc.)
- Homepage content (hero, sections, testimonials)
- About page content
- Contact page configuration
- Site settings and navigation
- Sample testimonials, team members, and more

**Note**: The seed script will replace existing content with the same IDs. Back up your data before running.

---

## 📜 Available Scripts

```bash
# Development
pnpm dev              # Start development server with Turbopack
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint errors
pnpm format           # Format code with Prettier
pnpm type-check       # Run TypeScript type checking

# Database
pnpm prisma generate  # Generate Prisma Client
pnpm prisma migrate dev  # Run migrations
pnpm prisma studio    # Open Prisma Studio

# CMS
pnpm seed             # Seed Sanity with sample data

# Maintenance
pnpm update:all       # Update all dependencies to latest
```

---

## 🌐 Pages & Routes

### Public Pages

| Route              | Description                                              | Dynamic |
| ------------------ | -------------------------------------------------------- | ------- |
| `/`                | Homepage with hero, capabilities, products, testimonials | ✅ CMS  |
| `/about`           | Company information, team, values, timeline              | ✅ CMS  |
| `/contact`         | Contact forms (general & trade enquiries)                | ✅ CMS  |
| `/products`        | Products listing page                                    | ✅ CMS  |
| `/products/[slug]` | Individual product detail pages                          | ✅ CMS  |
| `/studio`          | Sanity Studio (CMS admin)                                | -       |

### Special Routes

| Route          | Description               |
| -------------- | ------------------------- |
| `/sitemap.xml` | Auto-generated sitemap    |
| `/robots.txt`  | Auto-generated robots.txt |
| `/404`         | Custom 404 page           |
| `/error`       | Error boundary page       |

---

## 🔌 API Endpoints

### Contact Forms

#### POST `/api/contact/general`

Submit a general enquiry form.

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "phone": "string (optional)",
  "message": "string"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Thank you for your enquiry..."
}
```

#### POST `/api/contact/trade`

Submit a trade/bulk order enquiry.

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "phone": "string (optional)",
  "company": "string",
  "role": "string (optional)",
  "country": "string (optional)",
  "productInterest": "string (optional)",
  "quantity": "string (optional)",
  "message": "string"
}
```

### Enquiry System

#### POST `/api/enquiry/submit`

Submit an enquiry from the enquiry builder.

**Request Body:**

```json
{
  "items": [
    {
      "id": "string",
      "title": "string",
      "category": "string"
    }
  ],
  "contactInfo": {
    "name": "string",
    "email": "string",
    "phone": "string (optional)",
    "company": "string (optional)",
    "message": "string (optional)"
  }
}
```

**Features:**

- Saves to database
- Sends email notification
- Triggers webhook (if configured)

#### POST `/api/enquiry/pdf`

Generate a PDF from enquiry items.

**Request Body:**

```json
{
  "items": [
    {
      "id": "string",
      "title": "string",
      "category": "string"
    }
  ],
  "contactInfo": {
    "name": "string",
    "email": "string",
    "phone": "string (optional)",
    "company": "string (optional)"
  }
}
```

**Response:**

- Content-Type: `application/pdf`
- Downloads as `enquiry-{timestamp}.pdf`

---

## ✅ Testing Checklist

### Pre-Deployment Testing

#### Environment & Setup

- [ ] All environment variables are set correctly
- [ ] Database connection is working
- [ ] Sanity CMS is accessible at `/studio`
- [ ] Sanity content is seeded
- [ ] Build completes without errors (`pnpm build`)
- [ ] No TypeScript errors (`pnpm type-check`)
- [ ] No linting errors (`pnpm lint`)

#### Pages & Navigation

- [ ] Homepage loads correctly
- [ ] All sections render (hero, capabilities, products, testimonials, etc.)
- [ ] About page displays company information
- [ ] Contact page shows both forms
- [ ] Products listing page shows all products
- [ ] Individual product pages load via slug
- [ ] 404 page displays for invalid routes
- [ ] Navigation menu works (desktop & mobile)
- [ ] Footer links are functional
- [ ] Mobile menu opens and closes correctly

#### Product Functionality

- [ ] Products display correctly on homepage
- [ ] Product cards show image, title, description
- [ ] Product modal opens on card click
- [ ] Product detail pages load correctly
- [ ] "Add to Enquiry" button works
- [ ] Product categories filter correctly

#### Enquiry Builder

- [ ] Floating enquiry bar appears
- [ ] Enquiry count updates when adding products
- [ ] Enquiry panel opens/closes
- [ ] Products display in enquiry panel
- [ ] Remove product from enquiry works
- [ ] Clear all enquiries works
- [ ] PDF export generates correctly
- [ ] PDF contains all selected products
- [ ] Submit enquiry form validates correctly
- [ ] Submit enquiry saves to database
- [ ] Email notification is sent

#### Contact Forms

- [ ] General enquiry form validates inputs
- [ ] General enquiry form submits successfully
- [ ] Trade enquiry form validates inputs
- [ ] Trade enquiry form submits successfully
- [ ] Email notifications are received
- [ ] Form shows success message
- [ ] Form shows error messages for invalid inputs
- [ ] Spam protection works (honeypot fields)

#### Email & Notifications

- [ ] Contact form emails are received
- [ ] Enquiry submission emails are received
- [ ] Email templates render correctly
- [ ] Email contains all form data
- [ ] Webhook notifications work (if configured)

#### SEO & Meta

- [ ] Page titles are correct
- [ ] Meta descriptions are present
- [ ] Open Graph tags are set
- [ ] Twitter Card tags are set
- [ ] Structured data (JSON-LD) is present
- [ ] Sitemap.xml is accessible
- [ ] Robots.txt is accessible
- [ ] Canonical URLs are correct

#### Performance

- [ ] Images are optimized and lazy-loaded
- [ ] Lighthouse Performance score >= 90
- [ ] Lighthouse Accessibility score >= 90
- [ ] Lighthouse Best Practices score >= 90
- [ ] Lighthouse SEO score >= 90
- [ ] Page load time < 3 seconds
- [ ] Time to Interactive < 5 seconds
- [ ] No console errors in production

#### Accessibility

- [ ] Skip link works
- [ ] Keyboard navigation works throughout site
- [ ] Focus indicators are visible
- [ ] ARIA labels are present
- [ ] Images have alt text
- [ ] Forms have proper labels
- [ ] Color contrast meets WCAG AA
- [ ] Screen reader testing passes
- [ ] Reduced motion preference is respected

#### Responsive Design

- [ ] Mobile (320px - 767px) displays correctly
- [ ] Tablet (768px - 1023px) displays correctly
- [ ] Desktop (1024px+) displays correctly
- [ ] Touch targets are >= 44x44px
- [ ] Text is readable on all screen sizes
- [ ] Images scale appropriately
- [ ] Navigation adapts to screen size

#### Dark Mode

- [ ] Dark mode toggle works
- [ ] Dark mode persists across pages
- [ ] All components support dark mode
- [ ] Color contrast is maintained
- [ ] Images/icons adapt to theme

#### Analytics

- [ ] Google Analytics 4 is tracking pageviews
- [ ] Custom events are firing:
  - [ ] Add to enquiry
  - [ ] Remove from enquiry
  - [ ] PDF export
  - [ ] Form submissions
  - [ ] Product views
- [ ] Conversion tracking works

#### Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

#### Database

- [ ] Enquiries are saved correctly
- [ ] All fields are populated
- [ ] Timestamps are accurate
- [ ] Status field defaults to "new"
- [ ] Database indexes are working
- [ ] Connection pooling is configured

#### CMS (Sanity)

- [ ] Studio is accessible
- [ ] All content types are editable
- [ ] Image uploads work
- [ ] Content changes reflect on frontend
- [ ] Preview mode works (if implemented)
- [ ] Content validation works

#### Error Handling

- [ ] 404 page displays for invalid routes
- [ ] Error boundary catches errors
- [ ] API errors return proper status codes
- [ ] Form validation errors display correctly
- [ ] Network errors are handled gracefully
- [ ] Loading states display correctly

---

## 🚢 Deployment

### Vercel Deployment (Recommended)

1. **Push code to GitHub/GitLab/Bitbucket**

2. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository

3. **Configure environment variables**
   - Add all variables from `.env.local`
   - Ensure `NODE_ENV=production`

4. **Configure build settings**
   - Framework Preset: Next.js
   - Build Command: `pnpm build` (or `npm run build`)
   - Output Directory: `.next`
   - Install Command: `pnpm install` (or `npm install`)

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

6. **Post-deployment**
   - Run database migrations: `pnpm prisma migrate deploy`
   - Verify all environment variables
   - Test all functionality

### Environment Variables for Production

Ensure these are set in Vercel:

```bash
NODE_ENV=production
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<your-token>
DATABASE_URL=<your-pooled-connection-string>
DIRECT_URL=<your-direct-connection-string>
RESEND_API_KEY=<your-api-key>
CONTACT_EMAIL=<your-email>
NEXT_PUBLIC_GA4_ID=<your-ga4-id>
ENQUIRY_WEBHOOK_URL=<your-webhook-url>
```

### Custom Domain Setup

1. Go to Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Wait for SSL certificate provisioning

---

## 🎨 Design System

### Design Tokens

All design tokens are defined in `app/globals.css`:

#### Colors

```css
/* Light Mode */
--color-graphite: #2c2c2c;
--color-gold: #d4af37;
--color-gold-dark: #b8941f;
--color-sand: #f5f1e8;
--color-sand-dark: #e8e0d0;

/* Dark Mode */
--color-graphite: #e5e5e5;
--color-gold: #f4d03f;
--color-sand: #1a1a1a;
```

#### Spacing

```css
--spacing-4: 1rem;
--spacing-8: 2rem;
--spacing-12: 3rem;
--spacing-16: 4rem;
--spacing-24: 6rem;
--spacing-32: 8rem;
--spacing-48: 12rem;
--spacing-64: 16rem;
```

#### Typography

```css
--font-manrope: "Manrope", sans-serif; /* Headings */
--font-inter: "Inter", sans-serif; /* Body */
```

#### Border Radius

```css
--radius-sm: 0.25rem;
--radius-md: 0.5rem;
--radius-lg: 1rem;
--radius-xl: 1.5rem;
```

### Component Patterns

#### Section Shell

```tsx
<section className="section-shell">{/* Content */}</section>
```

Provides consistent padding, max-width, and centering.

#### Card Pattern

```tsx
<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">{/* Card content */}</div>
```

#### Button Variants

```tsx
{/* Primary */}
<button className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white px-6 py-3 rounded-lg">

{/* Secondary */}
<button className="border-2 border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-white px-6 py-3 rounded-lg">
```

---

## 📄 License

Private - Divyansh International

---

## 🤝 Support

For issues or questions:

- Check the [Testing Checklist](#testing-checklist)
- Review environment variables
- Check Sanity Studio for content issues
- Verify database connection
- Check browser console for errors

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Resend Documentation](https://resend.com/docs)
