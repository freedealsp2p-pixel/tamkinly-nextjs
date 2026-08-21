'use client';

import Link from 'next/link';
import { getCategoryBySlug, getArticlesForCategory, BLOG_CATEGORIES, BLOG_ARTICLES } from '@/lib/blog-articles';
import { 
  Smartphone, FileText, Sparkles, Brain, TrendingUp, 
  ArrowRight, Clock, Tag, ChevronRight 
} from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';

const iconMap: Record<string, React.ElementType> = {
  Smartphone, FileText, Sparkles, Brain, TrendingUp,
};

// Slug aliases: map common short slugs to their full category slugs
const CATEGORY_ALIASES: Record<string, string> = {
  'identity': 'identity-transformation',
  'mindset': 'mindset-strategy',
  'growth': 'productivity-growth',
  'apps': 'app-guides',
  'tools': 'app-guides',
};

// Map sub-category names to their icon
const subCategoryIconMap: Record<string, string> = {
  'FREE App': 'Smartphone',
  'BASIC App': 'Smartphone',
  'MASTERY App': 'Smartphone',
  'Worksheet': 'FileText',
  'Identity Shift': 'Sparkles',
  'Transformation': 'Sparkles',
  'Self-Liberation': 'Sparkles',
  'Wealth & Identity': 'Brain',
  'Commitment': 'Brain',
  'Strategy': 'Brain',
  'Execution': 'Brain',
  'Productivity': 'TrendingUp',
  'Excellence': 'TrendingUp',
  'Mental Clarity': 'TrendingUp',
  'Self-Image': 'Sparkles',
};

// Convert a sub-category name to a URL slug
function categoryToSlug(category: string): string {
  return category.toLowerCase().replace(/[&]/g, 'and').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Resolve slug aliases
function resolveSlug(slug: string): string {
  return CATEGORY_ALIASES[slug] || slug;
}

// Find matching articles for a given URL slug
function findArticlesForSlug(slug: string) {
  const resolvedSlug = resolveSlug(slug);

  // 1. Try predefined BLOG_CATEGORIES first
  const predefinedCat = getCategoryBySlug(resolvedSlug);
  if (predefinedCat) {
    return {
      category: predefinedCat,
      articles: getArticlesForCategory(resolvedSlug),
      isPredefined: true,
    };
  }

  // 2. Try matching article sub-categories by slug
  const matchingArticles = BLOG_ARTICLES.filter(article => {
    return categoryToSlug(article.category) === slug;
  });

  if (matchingArticles.length > 0) {
    const categoryEn = matchingArticles[0].category;
    const categoryAr = matchingArticles[0].categoryAr;
    
    const parentCategory = BLOG_CATEGORIES.find(cat => 
      cat.subCategories.some(sub => sub === categoryEn)
    );

    return {
      category: {
        slug: slug,
        name: categoryEn,
        description: parentCategory?.description || `Articles about ${categoryEn}`,
        descriptionAr: parentCategory?.descriptionAr || `مقالات عن ${categoryAr}`,
        subCategories: [categoryEn],
        icon: subCategoryIconMap[categoryEn] || 'FileText',
        color: parentCategory?.color || 'from-primary to-primary/80',
      },
      articles: matchingArticles,
      isPredefined: false,
    };
  }

  return null;
}

interface CategoryPageClientProps {
  category: string;
}

export default function CategoryPageClient({ category }: CategoryPageClientProps) {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const result = findArticlesForSlug(category);
  if (!result) return null;

  const { category: cat, articles } = result;
  const IconComponent = iconMap[cat.icon] || FileText;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0F1C2E] to-[#1a2d47] py-16 sm:py-20">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-white transition-colors">{getText("Home", "الرئيسية")}</Link></li>
              <li><ChevronRight className="h-4 w-4" /></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">{getText("Blog", "المدونة")}</Link></li>
              <li><ChevronRight className="h-4 w-4" /></li>
              <li className="text-[#3DD4B0] font-medium">{getText(cat.name, articles.length > 0 ? articles[0].categoryAr : cat.name)}</li>
            </ol>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${cat.color} shadow-lg`}>
              <IconComponent className="h-8 w-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[#3DD4B0] text-sm font-medium">
                <Tag className="h-4 w-4" />
                <span>{articles.length} {getText("Articles", "مقالات")}</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
            {getText(cat.name, articles.length > 0 ? articles[0].categoryAr : cat.name)}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            {locale === 'ar' && cat.descriptionAr ? cat.descriptionAr : cat.description}
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Sub-categories Tags */}
        {cat.subCategories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {cat.subCategories.map((sub) => (
              <span 
                key={sub}
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium border border-primary/10"
              >
                {sub}
              </span>
            ))}
          </div>
        )}

        {/* Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link 
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/5 text-primary text-xs font-semibold">
                    {getText(article.category, article.categoryAr)}
                  </span>
                  {article.featured && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#e6f3f4] text-[#2A8A94] text-xs font-semibold">
                      {getText("Featured", "مميز")}
                    </span>
                  )}
                </div>
                
                <h2 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {getText(article.title, article.titleAr)}
                </h2>
                
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                  {getText(article.description, article.descriptionAr)}
                </p>
                
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{getText(article.readTime, article.readTimeAr)}</span>
                  </div>
                  <time dateTime={article.datePublished}>
                    {new Date(article.datePublished).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </time>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {articles.length === 0 && (
          <div className="text-center py-16">
            <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">{getText("No articles yet", "لا توجد مقالات بعد")}</h3>
            <p className="text-slate-400">{getText("Check back soon for new content in this category.", "تحقق قريبًا من محتوى جديد في هذه الفئة.")}</p>
          </div>
        )}
      </section>

      {/* Other Categories */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8">{getText("Browse All Categories", "تصفح جميع الفئات")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {BLOG_CATEGORIES.filter(c => c.slug !== resolveSlug(category)).map((otherCat) => {
              const OtherIcon = iconMap[otherCat.icon] || FileText;
              const otherCount = getArticlesForCategory(otherCat.slug).length;
              return (
                <Link
                  key={otherCat.slug}
                  href={`/blog/category/${otherCat.slug}`}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 hover:border-primary/20 hover:shadow-md transition-all group"
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${otherCat.color}`}>
                    <OtherIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors">
                      {otherCat.name}
                    </h3>
                    <p className="text-xs text-slate-400">{otherCount} {getText("articles", "مقالات")}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

