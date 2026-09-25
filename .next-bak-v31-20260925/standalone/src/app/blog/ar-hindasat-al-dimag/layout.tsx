import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';
import { generateBlogArticleMetadata } from '@/lib/blog-articles';
import FAQPageSchema from '@/components/blog/FAQPageSchema';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return generateBlogArticleMetadata('ar-hindasat-al-dimag', locale);
}

export default function BlogArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FAQPageSchema slug='ar-hindasat-al-dimag' />
      {children}
    </>
  );
}
