import { getAllCategorySlugs } from '@/lib/blog-articles';
import { notFound } from 'next/navigation';
import { getCategoryBySlug } from '@/lib/blog-articles';
import CategoryPageClient from './CategoryPageClient';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return getAllCategorySlugs().map((category) => ({ category }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  
  if (!cat) {
    notFound();
  }
  
  return <CategoryPageClient category={category} />;
}
