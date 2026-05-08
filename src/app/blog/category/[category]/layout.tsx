import type { Metadata } from 'next';
import { getCategoryBySlug, getAllCategorySlugs, getArticlesForCategory, BLOG_CATEGORIES, BLOG_ARTICLES } from '@/lib/blog-articles';

// Slug aliases: must match page.tsx aliases
const CATEGORY_ALIASES: Record<string, string> = {
  'identity': 'identity-transformation',
  'mindset': 'mindset-strategy',
  'growth': 'productivity-growth',
  'apps': 'app-guides',
  'tools': 'app-guides',
};

function resolveSlug(slug: string): string {
  return CATEGORY_ALIASES[slug] || slug;
}

function categoryToSlug(category: string): string {
  return category.toLowerCase().replace(/[&]/g, 'and').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

interface CategoryLayoutProps {
  children: React.ReactNode;
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categorySlugs = getAllCategorySlugs();
  const subCategorySlugs = [...new Set(BLOG_ARTICLES.map(a => categoryToSlug(a.category)))];
  const aliasSlugs = Object.keys(CATEGORY_ALIASES);
  const allSlugs = [...new Set([...categorySlugs, ...subCategorySlugs, ...aliasSlugs])];
  return allSlugs.map((category) => ({ category }));
}

export async function generateMetadata({ params }: CategoryLayoutProps): Promise<Metadata> {
  const { category } = await params;
  const resolvedSlug = resolveSlug(category);
  const cat = getCategoryBySlug(resolvedSlug);
  
  // Also try sub-category match
  if (!cat) {
    const matchingArticle = BLOG_ARTICLES.find(a => categoryToSlug(a.category) === category);
    if (matchingArticle) {
      const parentCat = BLOG_CATEGORIES.find(c => c.subCategories.some(sub => sub === matchingArticle.category));
      const fullUrl = `https://tamkinly.com/blog/category/${category}`;
      return {
        title: `${matchingArticle.category} Articles | Tamkinly Blog`,
        description: parentCat?.description || `Articles about ${matchingArticle.category}`,
        keywords: [matchingArticle.category.toLowerCase(), 'tamkinly blog', 'identity transformation', 'self development'],
        alternates: {
          canonical: fullUrl,
          languages: {
            'en': fullUrl,
            'ar': `https://tamkinly.com/ar/blog/category/${category}`,
          },
        },
        openGraph: {
          title: `${matchingArticle.category} | Tamkinly Blog`,
          description: parentCat?.description || `Articles about ${matchingArticle.category}`,
          url: fullUrl,
          siteName: 'Tamkinly',
          type: 'website',
          locale: 'en_US',
          images: [{ url: '/og-image.webp', width: 1200, height: 630, alt: `${matchingArticle.category} - Tamkinly Blog` }],
        },
        twitter: {
          card: 'summary_large_image',
          title: `${matchingArticle.category} | Tamkinly Blog`,
          description: parentCat?.description || `Articles about ${matchingArticle.category}`,
          site: '@tamkinly',
          images: ['/og-image.webp'],
        },
      };
    }
    
    return {
      title: 'Category Not Found | Tamkinly Blog',
      description: 'The requested blog category could not be found.',
    };
  }

  const articles = getArticlesForCategory(resolvedSlug);
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
  const resolvedSlug = resolveSlug(category);
  const cat = getCategoryBySlug(resolvedSlug);
  
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
              numberOfItems: getArticlesForCategory(resolvedSlug).length,
            }),
          }}
        />
      )}
    </>
  );
}

