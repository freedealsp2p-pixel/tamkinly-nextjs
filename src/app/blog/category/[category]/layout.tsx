import type { Metadata } from 'next';
import { getCategoryBySlug, getAllCategorySlugs, getArticlesForCategory } from '@/lib/blog-articles';

interface CategoryLayoutProps {
  children: React.ReactNode;
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return getAllCategorySlugs().map((category) => ({ category }));
}

export async function generateMetadata({ params }: CategoryLayoutProps): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  
  if (!cat) {
    return {
      title: 'Category Not Found | Tamkinly Blog',
      description: 'The requested blog category could not be found.',
    };
  }

  const articles = getArticlesForCategory(category);
  const fullUrl = `https://tamkinly.com/blog/category/${category}`;
  const articleCount = articles.length;
  
  return {
    title: `${cat.name} - ${articleCount} Articles | Tamkinly Blog`,
    description: cat.description,
    keywords: [cat.name.toLowerCase(), 'tamkinly blog', 'identity transformation', 'self development', ...cat.subCategories.map(s => s.toLowerCase())],
    
    alternates: {
      canonical: fullUrl,
      languages: {
        'en': fullUrl,
        'ar': `https://tamkinly.com/ar/blog/category/${category}`,
      },
    },
    
    openGraph: {
      title: `${cat.name} | Tamkinly Blog`,
      description: cat.description,
      url: fullUrl,
      siteName: 'Tamkinly',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: '/og-image.webp',
          width: 1200,
          height: 630,
          alt: `${cat.name} - Tamkinly Blog`,
        },
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      title: `${cat.name} | Tamkinly Blog`,
      description: cat.description,
      site: '@tamkinly',
      images: ['/og-image.webp'],
    },
  };
}

export default async function CategoryLayout({ children, params }: CategoryLayoutProps) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  
  return (
    <>
      {children}
      {cat && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${cat.name} - Tamkinly Blog`,
              description: cat.description,
              url: `https://tamkinly.com/blog/category/${category}`,
              isPartOf: {
                '@type': 'WebSite',
                name: 'Tamkinly',
                url: 'https://tamkinly.com',
              },
              numberOfItems: getArticlesForCategory(category).length,
            }),
          }}
        />
      )}
    </>
  );
}
