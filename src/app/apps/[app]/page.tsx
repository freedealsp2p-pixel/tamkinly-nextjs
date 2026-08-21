/**
 * Dynamic App Page
 * Uses generateMetadata for SEO-optimized metadata per app
 * Enables Google to index all 20+ apps with unique metadata
 * 
 * Server-side access verification: checks user tier before rendering
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAppPageBySlug,
  getAllAppSlugs,
  AppPage,
} from '@/lib/app-pages';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateSoftwareAppSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { AppContentClient } from './AppContentClient';
import { checkAppAccess } from '@/lib/access-guard';

// ============================================
// DYNAMIC METADATA GENERATION
// ============================================

interface PageParams {
  params: Promise<{ app: string }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { app } = await params;
  const appData = getAppPageBySlug(app);

  if (!appData) {
    return {
      title: 'App Not Found | Tamkinly',
      description: 'The requested app could not be found.',
    };
  }

  const fullUrl = `https://tamkinly.com/apps/${appData.slug}`;
  const imageUrl = appData.image
    ? `https://tamkinly.com${appData.image}`
    : 'https://tamkinly.com/og-image.webp';

  const isFree = appData.tier === 'FREE';
  const tierDescription = isFree
    ? 'Free to use.'
    : `Available in ${appData.tier} package.`;

  return {
    title: `${appData.title} | Tamkinly`,
    description: `${appData.description} ${tierDescription}`,
    keywords: appData.keywords,

    alternates: {
      canonical: fullUrl,
    },

    openGraph: {
      title: appData.title,
      description: appData.description,
      url: fullUrl,
      siteName: 'Tamkinly',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: appData.title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: appData.title,
      description: appData.description,
      site: '@tamkinly',
      images: [imageUrl],
    },

    other: {
      'app:tier': appData.tier,
      'app:category': appData.category,
    },
  };
}

// ============================================
// STATIC PARAMS GENERATION
// ============================================

export async function generateStaticParams() {
  return getAllAppSlugs().map((slug) => ({
    app: slug,
  }));
}

// ============================================
// PAGE COMPONENT (Server Component)
// ============================================

export default async function AppPageDynamic({ params }: PageParams) {
  const { app } = await params;
  const appData = getAppPageBySlug(app);

  if (!appData) {
    notFound();
  }

  // ============================================
  // SERVER-SIDE ACCESS VERIFICATION
  // ============================================
  // This runs on the server, so users cannot bypass it by modifying client-side code.
  // The page still renders for SEO, but with serverAccessResult passed to the client.
  const serverAccessResult = await checkAppAccess(appData.slug);

  // Generate structured data schemas (server-side for SEO)
  const isFree = appData.tier === 'FREE';
  const appSchema = generateSoftwareAppSchema({
    name: appData.title,
    description: appData.description,
    url: `/apps/${appData.slug}`,
    category: appData.category,
    offers: {
      price: appData.tier === 'FREE' ? 0 : undefined,
      category: appData.tier,
    },
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Apps', url: '/apps' },
    { name: appData.title, url: `/apps/${appData.slug}` },
  ]);

  return (
    <>
      <JsonLd data={[appSchema, breadcrumbSchema]} />
      <AppContentClient 
        appData={appData} 
        serverAccessResult={serverAccessResult}
      />
    </>
  );
}

