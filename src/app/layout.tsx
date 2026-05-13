import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import { cookies, headers } from "next/headers";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { SEO_SITE_CONFIG, HOME_METADATA, PAGE_METADATA } from "@/lib/seo-pages";
import { Analytics } from "@/components/Analytics";
import { CookieConsent } from "@/components/CookieConsent";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { LocaleProvider } from '@/components/providers/LocaleProvider';

// Helper to read locale from URL header (set by middleware) and cookies (server-side)
async function getLocaleFromCookies(): Promise<'en' | 'ar'> {
  // Priority 1: Check x-locale header set by middleware (from URL path /ar)
  try {
    const headersList = await headers();
    const urlLocale = headersList.get('x-locale');
    if (urlLocale === 'ar' || urlLocale === 'en') {
      return urlLocale;
    }
  } catch {
    // headers() not available in some contexts
  }
  
  // Priority 2: Check cookie
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value;
  return locale === 'ar' ? 'ar' : 'en';
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

// Viewport configuration for better mobile experience
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

// Comprehensive metadata for SEO - Bilingual support
// This is the root metadata - child layouts override with their own specific metadata
export const metadata: Metadata = {
  // Basic metadata
  metadataBase: new URL(SEO_SITE_CONFIG.url),
  title: {
    default: PAGE_METADATA.home.title,
    template: `%s | ${SEO_SITE_CONFIG.name}`,
  },
  description: PAGE_METADATA.home.description,
  keywords: PAGE_METADATA.home.keywords,
  authors: [{ name: SEO_SITE_CONFIG.author, url: SEO_SITE_CONFIG.url }],
  creator: SEO_SITE_CONFIG.author,
  publisher: SEO_SITE_CONFIG.author,
  
  // Language and locale - hreflang alternates for English and Arabic
  alternates: {
    canonical: SEO_SITE_CONFIG.url,
    languages: {
      'en': SEO_SITE_CONFIG.url,
      'ar': `${SEO_SITE_CONFIG.url}/ar`,
    },
  },
  
  // Icons - Complete favicon configuration for all devices
  icons: {
    icon: [
      { url: "/favicon.ico?v=12", sizes: "any" },
      { url: "/favicon.png?v=12", sizes: "96x96", type: "image/png" },
      { url: "/favicon-32x32.png?v=12", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png?v=12", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=12", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/logo-icon.svg", color: "#0F1C2E" },
    ],
  },
  
  // Manifest for PWA
  manifest: "/manifest.json",
  
  // Open Graph - Full configuration with Arabic support
  openGraph: {
    title: PAGE_METADATA.home.title,
    description: PAGE_METADATA.home.description,
    url: SEO_SITE_CONFIG.url,
    siteName: SEO_SITE_CONFIG.name,
    locale: 'en_US',
    type: "website",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: `${SEO_SITE_CONFIG.name} - Identity Transformation Tools`,
        type: "image/webp",
      },
      {
        url: "/og-image-square.webp",
        width: 800,
        height: 800,
        alt: `${SEO_SITE_CONFIG.name} Logo`,
        type: "image/webp",
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: SEO_SITE_CONFIG.twitterHandle,
    creator: SEO_SITE_CONFIG.twitterHandle,
    title: PAGE_METADATA.home.title,
    description: PAGE_METADATA.home.description,
    images: ["/og-image.webp"],
  },
  
  // Robots configuration
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Category
  category: "Self-Development",
  
  // Application info
  applicationName: SEO_SITE_CONFIG.name,
  appleWebApp: {
    capable: true,
    title: SEO_SITE_CONFIG.name,
    statusBarStyle: "black-translucent",
  },
  
  // Format detection
  formatDetection: {
    telephone: false,
    email: true,
    address: false,
  },
  
  // Other SEO
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "language": "en, ar",
    "revisit-after": "7 days",
    "rating": "general",
    "distribution": "global",
    "geo.region": "Global",
    "geo.placename": "Online",
    "DC.title": SEO_SITE_CONFIG.name,
    "DC.description": PAGE_METADATA.home.description,
    "DC.language": "en, ar",
    "msapplication-TileColor": "#0F1C2E",
    "msapplication-config": "/browserconfig.xml",
  },
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocaleFromCookies();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        {/* Preconnect to external resources for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for external APIs */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}
       
      >
        {/* Skip Navigation Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-lg"
        >
          {locale === 'ar' ? 'تخطي إلى المحتوى الرئيسي' : 'Skip to main content'}
        </a>
          <LocaleProvider initialLocale={locale} urlBased>
            <AuthProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main id="main-content" className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
              <Toaster />
              <Suspense fallback={null}>
                <Analytics />
              </Suspense>
              <Suspense fallback={null}>
                <CookieConsent />
              </Suspense>
              <ServiceWorkerRegistration />
            </AuthProvider>
          </LocaleProvider>
      </body>
    </html>
  );
}
