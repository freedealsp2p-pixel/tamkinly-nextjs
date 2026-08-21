'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';
import { Shield, Heart, Activity } from 'lucide-react';

const NAV_ITEMS = [
  { key: 'hub', href: '/recovery', icon: Activity, labelKey: 'title' },
  { key: 'trc', href: '/recovery/trc', icon: Shield, labelKey: 'trc' },
  { key: 'porn-recovery', href: '/recovery/porn-recovery', icon: Heart, labelKey: 'pornRecovery' },
] as const;

export function RecoveryHeader() {
  const t = useTranslations('recoveryNav');
  const { direction } = useLocale();
  const pathname = usePathname();

  const getActiveKey = (): string => {
    if (pathname === '/recovery') return 'hub';
    if (pathname.startsWith('/recovery/trc')) return 'trc';
    if (pathname.startsWith('/recovery/porn-recovery')) return 'porn-recovery';
    return 'hub';
  };
  const activeKey = getActiveKey();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1 h-14 overflow-x-auto" role="navigation" aria-label="Recovery navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeKey === item.key;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap
                  transition-colors duration-200 flex-shrink-0
                  ${isActive
                    ? 'bg-[#1F6F78]/8 text-[#1F6F78]'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="w-4 h-4" />
                <span>{t(item.labelKey as 'title')}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
