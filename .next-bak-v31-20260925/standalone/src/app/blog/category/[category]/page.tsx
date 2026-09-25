import { getAllCategorySlugs, BLOG_ARTICLES, BLOG_CATEGORIES } from '@/lib/blog-articles';
import { notFound } from 'next/navigation';
import CategoryPageClient from './CategoryPageClient';

// Slug aliases: map common short slugs to their full category slugs
const CATEGORY_ALIASES: Record<string, string> = {
  'identity': 'identity-transformation',
  'mindset': 'mindset-strategy',
  'growth': 'productivity-growth',
  'apps': 'app-guides',
  'tools': 'app-guides',
};

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categorySlugs = getAllCategorySlugs();
  
  // Also add individual sub-category slugs from articles
  const subCategorySlugs = [...new Set(BLOG_ARTICLES.map(a => {
    return a.category.toLowerCase().replace(/[&]/g, 'and').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }))];
  
  // Add alias slugs
  const aliasSlugs = Object.keys(CATEGORY_ALIASES);
  
  const allSlugs = [...new Set([...categorySlugs, ...subCategorySlugs, ...aliasSlugs])];
  return allSlugs.map((category) => ({ category }));
}

export function resolveCategorySlug(slug: string): string {
  // Check if it's an alias
  if (CATEGORY_ALIASES[slug]) {
    return CATEGORY_ALIASES[slug];
  }
  return slug;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const resolvedSlug = resolveCategorySlug(category);
  
  // Check if this is a valid category (predefined, alias, or sub-category)
  const isPredefinedCategory = BLOG_CATEGORIES.some(cat => cat.slug === resolvedSlug);
  const isSubCategory = BLOG_ARTICLES.some(article => {
    const articleSlug = article.category.toLowerCase().replace(/[&]/g, 'and').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return articleSlug === category;
  });
  const isAlias = category in CATEGORY_ALIASES;
  
  if (!isPredefinedCategory && !isSubCategory && !isAlias) {
    notFound();
  }
  
  return <CategoryPageClient category={category} />;
}

