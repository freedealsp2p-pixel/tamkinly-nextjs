'use client';

import Link from 'next/link';
import { useLocale } from '@/components/providers/LocaleProvider';
import { ChevronRight } from 'lucide-react';

interface BlogBreadcrumbItem {
  label: string;
  href?: string;
}

interface BlogBreadcrumbProps {
  items: BlogBreadcrumbItem[];
}

export function BlogBreadcrumb({ items }: BlogBreadcrumbProps) {
  const { locale } = useLocale();
  const isRtl = locale === 'ar';

  const homeHref = locale === 'ar' ? '/ar' : '/';
  const blogHref = locale === 'ar' ? '/ar/blog' : '/blog';

  const allItems: BlogBreadcrumbItem[] = [
    { label: locale === 'ar' ? 'الرئيسية' : 'Home', href: homeHref },
    { label: locale === 'ar' ? 'المدونة' : 'Blog', href: blogHref },
    ...items,
  ];

  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <ol className="flex items-center gap-1.5 text-sm text-slate-500 py-4">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const ChevronIcon = ChevronRight;
          return (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronIcon className={`h-3.5 w-3.5 flex-shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
              )}
              {isLast || !item.href ? (
                <span className="text-slate-900 font-medium truncate max-w-[200px] sm:max-w-[300px]">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-teal-600 transition-colors truncate max-w-[200px] sm:max-w-[300px]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
