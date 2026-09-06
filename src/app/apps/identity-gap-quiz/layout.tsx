import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';
import { generateAppPageMetadata, getAppPageBySlug } from '@/lib/app-pages';
import { AppPageJsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return generateAppPageMetadata('identity-gap-quiz', locale);
}

export default function AppPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const app = getAppPageBySlug('identity-gap-quiz');
  
  return (
    <>
      {app && (
        <AppPageJsonLd
          name={app.title}
          description={app.description}
          slug={app.slug}
          category={app.category}
          tier={app.tier}
        />
      )}
      {children}
    </>
  );
}
