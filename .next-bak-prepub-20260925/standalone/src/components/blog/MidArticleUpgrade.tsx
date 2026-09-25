'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslations, useLocale } from '@/components/providers/LocaleProvider';
import { ArrowRight, Sparkles, CheckCircle2, Zap } from 'lucide-react';

// ============================================
// MID-ARTICLE UPGRADE CTA
// Shows a contextual paid product recommendation
// in the middle of blog articles
// ============================================

interface MidArticleUpgradeProps {
  /** The product tier to promote */
  promoteTier?: 'BASIC' | 'PREMIUM' | 'MASTERY';
  /** Override: specific product to highlight */
  productSlug?: string;
  /** Override: custom heading key */
  variant?: 'default' | 'minimal' | 'highlight';
}

const TIER_INFO: Record<string, { price: string; apps: number; slug: string; color: string; badgeColor: string }> = {
  BASIC: { price: '$7/mo', apps: 1, slug: '/products/basic', color: '#2A8A94', badgeColor: 'bg-[#2A8A94]/20 text-[#2A8A94]' },
  PREMIUM: { price: '$17/mo', apps: 11, slug: '/products/premium', color: '#1F6F78', badgeColor: 'bg-[#1F6F78]/20 text-[#1F6F78]' },
  MASTERY: { price: '$27/mo', apps: 16, slug: '/products/mastery', color: '#0F1C2E', badgeColor: 'bg-[#0F1C2E] text-[#3DD4B0]' },
};

export function MidArticleUpgrade({ promoteTier = 'BASIC', productSlug, variant = 'default' }: MidArticleUpgradeProps) {
  const t = useTranslations('midArticleUpgrade');
  const { locale } = useLocale();
  const isAr = locale === 'ar';
  const tier = TIER_INFO[promoteTier];
  const href = productSlug || tier.slug;
  const tierPrice = isAr ? tier.price.replace('/mo', '/شهر') : tier.price;

  if (variant === 'minimal') {
    return (
      <div className="my-10 not-prose" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="bg-gradient-to-r from-[#0F1C2E]/5 to-[#1F6F78]/5 border border-[#1F6F78]/20 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center">
              <Zap className="h-5 w-5 text-[#3DD4B0]" />
            </div>
          </div>
          <div className={`flex-1 text-center sm:${isAr ? 'text-right' : 'text-left'}`}>
            <p className="text-sm text-slate-600">
              {t('minimalText')}
            </p>
          </div>
          <Link href={href}>
            <Button size="sm" className="bg-[#1F6F78] text-white hover:bg-[#154d54] px-6 whitespace-nowrap">
              {t('viewPackage')} <ArrowRight className={`${isAr ? 'mr-1 rotate-180' : 'ml-1'} h-4 w-4`} />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (variant === 'highlight') {
    return (
      <div className="my-12 not-prose" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F1C2E] via-[#162B42] to-[#1A3350] shadow-lg">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#3DD4B0]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <div className="relative p-8 sm:p-10">
            <div className={`flex flex-col sm:flex-row ${isAr ? 'sm:flex-row-reverse' : ''} items-start gap-6`}>
              <div className="flex-1">
                <div className={`inline-flex items-center gap-2 mb-4 ${tier.badgeColor} px-3 py-1 rounded-full text-xs font-bold`}>
                  <Sparkles className="h-3.5 w-3.5" />
                  {promoteTier} — {tierPrice}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3">
                  {t(`tier${promoteTier}.heading`)}
                </h3>
                <p className="text-slate-300/80 text-sm leading-relaxed mb-6">
                  {t(`tier${promoteTier}.description`)}
                </p>
                <ul className="space-y-2 mb-6">
                  {[1, 2, 3].map(i => (
                    <li key={i} className={`flex items-center gap-2 text-sm text-slate-300 ${isAr ? 'flex-row-reverse' : ''}`}>

                    <CheckCircle2 className="w-4 h-4 text-[#3DD4B0] flex-shrink-0" />
                      <span>{t(`tier${promoteTier}.feature${i}`)}</span>
                    </li>
                  ))}
                </ul>
                <Link href={href}>
                  <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                    {t('viewPackage')} <ArrowRight className={`${isAr ? 'mr-1 rotate-180' : 'ml-1'} h-4 w-4`} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="my-12 not-prose" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F0F4F8] border border-[#1F6F78]/10 rounded-2xl p-8 sm:p-10">
        <div className={`flex flex-col sm:flex-row ${isAr ? 'sm:flex-row-reverse' : ''} items-start gap-6`}>
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-[#1F6F78]/10 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-[#1F6F78]" />
            </div>
          </div>
          <div className="flex-1">
            <div className={`inline-flex items-center gap-2 mb-2 ${tier.badgeColor} px-3 py-1 rounded-full text-xs font-bold`}>
              {promoteTier} — {tierPrice}
            </div>
            <h3 className="text-lg font-bold text-[#0F1C2E] mb-2">
              {t(`tier${promoteTier}.heading`)}
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              {t(`tier${promoteTier}.description`)}
            </p>
            <Link href={href}>
              <Button className="bg-[#1F6F78] text-white hover:bg-[#154d54]">
                {t('viewPackage')} <ArrowRight className={`${isAr ? 'mr-1 rotate-180' : 'ml-1'} h-4 w-4`} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
