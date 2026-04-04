import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { SITE_CONFIG, KEYWORDS } from "@/lib/seo";
import { Analytics } from "@/components/Analytics";
import { CookieConsent } from "@/components/CookieConsent";
import { LocaleProvider } from '@/components/providers/LocaleProvider';

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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1C2E" },
  ],
};

// Comprehensive metadata for SEO - Bilingual support
export const metadata: Metadata = {
  // Basic metadata
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.nameEn} | Return to Your Center | عد إلى مركزك`,
    template: `%s | ${SITE_CONFIG.nameEn}`,
  },
  description: `Discover your identity gap with our free 3-minute assessment. Evidence-based tools for identity transformation, habit formation, and personal development. اكتشف فجوة هويتك مع تقييمنا المجاني. أدوات مبنية على الأدلة لتحويل الهوية.`,
  keywords: [...KEYWORDS.primary, ...KEYWORDS.secondary],
  authors: [{ name: SITE_CONFIG.author, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.author,
  publisher: SITE_CONFIG.author,
  
  // Language and locale
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      "en-US": SITE_CONFIG.url,
      "ar-SA": SITE_CONFIG.url,
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
  manifest: "/site.webmanifest",
  
  // Open Graph - Full configuration with Arabic support
  openGraph: {
    title: `${SITE_CONFIG.nameEn} | Identity Transformation Tools`,
    description: `Discover your identity gap with our free 3-minute assessment. Evidence-based tools for identity transformation, habit formation, and personal development.`,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.nameEn,
    locale: SITE_CONFIG.locale,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.nameEn} - Identity Transformation Tools`,
        type: "image/png",
      },
      {
        url: "/og-image-square.png",
        width: 800,
        height: 800,
        alt: `${SITE_CONFIG.nameEn} Logo`,
        type: "image/png",
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: SITE_CONFIG.twitterHandle,
    creator: SITE_CONFIG.twitterHandle,
    title: `${SITE_CONFIG.nameEn} | Identity Transformation Tools`,
    description: `Discover your identity gap with our free 3-minute assessment. Evidence-based tools for identity transformation.`,
    images: ["/og-image.png"],
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
  applicationName: SITE_CONFIG.nameEn,
  appleWebApp: {
    capable: true,
    title: SITE_CONFIG.nameEn,
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
    "DC.title": SITE_CONFIG.nameEn,
    "DC.description": SITE_CONFIG.description,
    "DC.language": "en, ar",
    "msapplication-TileColor": "#0F1C2E",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        suppressHydrationWarning
      >
        <LocaleProvider>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
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
          </AuthProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
