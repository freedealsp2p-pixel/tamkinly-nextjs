import type { Metadata } from 'next';
import { generateAppPageMetadata, getAppPageBySlug } from '@/lib/app-pages';
import { AppPageJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = generateAppPageMetadata('journal-system');

export default function AppPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const app = getAppPageBySlug('journal-system');
  
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
