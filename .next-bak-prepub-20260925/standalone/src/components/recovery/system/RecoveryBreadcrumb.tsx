'use client';

import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface RecoveryBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function RecoveryBreadcrumb({ items }: RecoveryBreadcrumbProps) {
  const { direction } = useLocale();
  const Separator = direction === 'rtl' ? ChevronLeft : ChevronRight;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-sm text-slate-400 mb-6"
    >
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1.5">
          {index > 0 && <Separator className="w-3.5 h-3.5 flex-shrink-0" />}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-[#1F6F78] transition-colors duration-200"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#0F1C2E] font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
