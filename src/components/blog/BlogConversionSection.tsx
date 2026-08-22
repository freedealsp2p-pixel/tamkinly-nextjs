'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslations, useLocale } from '@/components/providers/LocaleProvider';
import { ArrowRight, Sparkles, CheckCircle2, Zap, Crown } from 'lucide-react';

// ============================================
// BLOG CONVERSION SECTION
// End-of-article CTA with both free & paid paths
// Replaces the hardcoded bottom section in articles
// Fully bilingual (EN/AR)
// ============================================

interface BlogConversionSectionProps {
  /** Optional: promote a specific product relevant to the article */
  promoteProduct?: 'recode' | 'coach' | 'planner';
}

export function BlogConversionSection({ promoteProduct = 'recode' }: BlogConversionSectionProps) {
  const t = useTranslations('blogConversion');
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  const productInfo = {
    recode: { href: '/products/premium', tier: 'PREMIUM', price: '$17/mo' },
    coach: { href: '/products/mastery', tier: 'MASTERY', price: '$27/mo' },
    planner: { href: '/products/premium', tier: 'PREMIUM', price: '$17/mo' },
  };

  const product = productInfo[promoteProduct];

  return (
    <section className="py-16 bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Primary CTA - Turn insights into action */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3DD4B0]/10 border border-[#3DD4B0]/20 mb-6">
              <Zap className="h-3.5 w-3.5 text-[#3DD4B0]" />
              <span className="text-xs font-medium text-[#7AEEE0] tracking-wide uppercase">
                {t('actionLabel')}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
              {t('heading')}
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              {t('subheading')}
            </p>

            {/* Primary product recommendation */}
            <div className="max-w-md mx-auto mb-6">
              <Link href={product.href}>
                <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-10 py-6 text-base font-bold shadow-lg shadow-[#3DD4B0]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#3DD4B0]/30 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto">
                  {t('primaryCTA')}
                  <ArrowRight className={`${isAr ? 'mr-2 rotate-180' : 'ml-2'} h-5 w-5`} />
                </Button>
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className={`flex items-center gap-4 mb-10 ${isAr ? 'flex-row-reverse' : ''}`}>
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-slate-500 text-sm font-medium">{t('orDivider')}</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Two-column pricing */}
          <div className="grid sm:grid-cols-2 gap-6">
            {/* BASIC Plan */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] hover:border-white/15 transition-all duration-300">
              <div className={`flex items-center gap-2 mb-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1F6F78]/30 text-[#3DD4B0]">PREMIUM</span>
                <span className="text-white font-bold">$17</span>
              </div>
              <h3 className={`text-white font-serif text-lg font-bold mb-2 ${isAr ? 'text-right' : ''}`}>
                {t('basicTitle')}
              </h3>
              <p className={`text-slate-400 text-sm mb-4 ${isAr ? 'text-right' : ''}`}>
                {t('basicDesc')}
              </p>
              <ul className="space-y-2 mb-5">
                {[1, 2, 3].map(i => (
                  <li key={i} className={`flex items-start gap-2 text-sm text-slate-300 ${isAr ? 'flex-row-reverse text-right' : ''}`}>
                    <CheckCircle2 className="h-4 w-4 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
                    <span>{t(`basicBenefit${i}`)}</span>
                  </li>
                ))}
              </ul>
              <Link href="/products/premium">
                <Button className="w-full bg-[#1F6F78] text-white hover:bg-[#154d54] font-semibold transition-all duration-200">
                  {t('getBasic')} <ArrowRight className={`${isAr ? 'mr-1 rotate-180' : 'ml-1'} h-4 w-4`} />
                </Button>
              </Link>
            </div>

            {/* MASTERY Plan */}
            <div className="bg-white/5 backdrop-blur-sm border border-[#3DD4B0]/30 rounded-xl p-6 hover:bg-white/[0.07] hover:border-[#3DD4B0]/40 transition-all duration-300 relative">
              <div className={`absolute -top-2 ${isAr ? 'left-4' : 'right-4'}`}>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#3DD4B0] text-[#0F1C2E] flex items-center gap-1">
                  <Crown className="h-3 w-3" />
                  {t('bestValue')}
                </span>
              </div>
              <div className={`flex items-center gap-2 mb-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#3DD4B0]/20 text-[#3DD4B0]">MASTERY</span>
                <span className="text-white font-bold">$27</span>
              </div>
              <h3 className={`text-white font-serif text-lg font-bold mb-2 ${isAr ? 'text-right' : ''}`}>
                {t('bundleTitle')}
              </h3>
              <p className={`text-slate-400 text-sm mb-4 ${isAr ? 'text-right' : ''}`}>
                {t('bundleDesc')}
              </p>
              <ul className="space-y-2 mb-5">
                {[1, 2, 3].map(i => (
                  <li key={i} className={`flex items-start gap-2 text-sm text-slate-300 ${isAr ? 'flex-row-reverse text-right' : ''}`}>
                    <CheckCircle2 className="h-4 w-4 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
                    <span>{t(`bundleBenefit${i}`)}</span>
                  </li>
                ))}
              </ul>
              <Link href="/products/mastery">
                <Button className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold shadow-lg shadow-[#3DD4B0]/20 transition-all duration-200">
                  {t('getBundle')} <ArrowRight className={`${isAr ? 'mr-1 rotate-180' : 'ml-1'} h-4 w-4`} />
                </Button>
              </Link>
            </div>
          </div>

          {/* Free Assessment + View All */}
          <div className="mt-8 text-center space-y-4">
            <Link href="/quiz">
              <Button variant="ghost" size="lg" className="text-[#3DD4B0] hover:text-white hover:bg-[#3DD4B0]/10 px-8 font-medium">
                {t('freeAssessment')}
                <ArrowRight className={`${isAr ? 'mr-2 rotate-180' : 'ml-2'} h-4 w-4`} />
              </Button>
            </Link>
            <div>
              <Link href="/products">
                <Button variant="ghost" className="text-slate-400 hover:text-white text-sm">
                  {t('viewAllPlans')} →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

