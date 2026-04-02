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

// Comprehensive metadata for SEO
export const metadata: Metadata = {
  // Basic metadata
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | Return to Your Center`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: `Discover your identity gap with our free 3-minute assessment. Evidence-based tools for identity transformation, habit formation, and personal development. ${SITE_CONFIG.description}`,
  keywords: [...KEYWORDS.primary, ...KEYWORDS.secondary],
  authors: [{ name: SITE_CONFIG.author, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.author,
  publisher: SITE_CONFIG.author,
  
  // Language and locale
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      "en-US": SITE_CONFIG.url,
    },
  },
  
  // Icons - Complete favicon configuration for all devices
  icons: {
    icon: [
      { url: "/favicon.ico?v=10", sizes: "any" },
      { url: "/favicon.png?v=10", sizes: "96x96", type: "image/png" },
      { url: "/favicon-32x32.png?v=10", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png?v=10", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=10", sizes: "180x180", type: "image/png" },
    ],
  },
  
  // Manifest for PWA
  manifest: "/site.webmanifest",
  
  // Open Graph - Full configuration
  openGraph: {
    title: `${SITE_CONFIG.name} | Return to Your Center`,
    description: `Discover your identity gap with our free 3-minute assessment. Evidence-based tools for identity transformation, habit formation, and personal development.`,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: SITE_CONFIG.locale,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Identity Transformation Tools`,
        type: "image/png",
      },
      {
        url: "/og-image-square.png",
        width: 800,
        height: 800,
        alt: `${SITE_CONFIG.name} Logo`,
        type: "image/png",
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: SITE_CONFIG.twitterHandle,
    creator: SITE_CONFIG.twitterHandle,
    title: `${SITE_CONFIG.name} | Return to Your Center`,
    description: `Discover your identity gap with our free 3-minute assessment. Evidence-based tools for identity transformation and personal development.`,
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
  applicationName: SITE_CONFIG.name,
  appleWebApp: {
    capable: true,
    title: SITE_CONFIG.name,
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}
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
