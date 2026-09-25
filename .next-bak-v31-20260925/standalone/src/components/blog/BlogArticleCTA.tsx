'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslations, useLocale } from '@/components/providers/LocaleProvider';
import {
  ArrowRight,
  Sparkles,
  Target,
  BookOpen,
  CalendarCheck,
  Compass,
  MessageCircle,
  Zap,
} from 'lucide-react';

// ============================================
// CTA TYPE → REAL PRODUCT MAPPING
// ============================================

export type CTAType = 'quiz' | 'recode' | 'coach' | 'worksheet' | 'daily' | 'values' | 'free';

interface CTAConfig {
  type: CTAType;
  href: string;
  icon: React.ElementType;
  isFree: boolean;
  badge: string;
}

const CTA_CONFIGS: Record<CTAType, CTAConfig> = {
  quiz: {
    type: 'quiz',
    href: '/quiz',
    icon: Target,
    isFree: true,
    badge: 'FREE Assessment',
  },
  recode: {
    type: 'recode',
    href: '/products#identity-recode',
    icon: Sparkles,
    isFree: false,
    badge: 'BASIC',
  },
  coach: {
    type: 'coach',
    href: '/apps/ai-identity-coach',
    icon: MessageCircle,
    isFree: false,
    badge: 'MASTERY',
  },
  worksheet: {
    type: 'worksheet',
    href: '/blog/identity-baseline-8d-worksheet',
    icon: BookOpen,
    isFree: true,
    badge: 'FREE Worksheet',
  },
  daily: {
    type: 'daily',
    href: '/apps/daily-reflection',
    icon: CalendarCheck,
    isFree: true,
    badge: 'FREE App',
  },
  values: {
    type: 'values',
    href: '/apps/values-clarification',
    icon: Compass,
    isFree: true,
    badge: 'FREE App',
  },
  free: {
    type: 'free',
    href: '/apps',
    icon: Zap,
    isFree: true,
    badge: 'FREE Tools',
  },
};

// ============================================
// COMPONENT
// ============================================

interface BlogArticleCTAProps {
  ctaType?: CTAType;
  category?: string;
  articleTitle?: string;
}

function mapCategoryToCTAType(category: string): CTAType {
  const cat = category.toLowerCase();
  if (cat.includes('habit')) return 'recode';
  if (cat.includes('productivity') || cat.includes('execution') || cat.includes('goal')) return 'recode';
  if (cat.includes('self-assessment') || cat.includes('assessment')) return 'quiz';
  if (cat.includes('self-discovery')) return 'worksheet';
  if (cat.includes('mental clarity') || cat.includes('breathing') || cat.includes('calm')) return 'daily';
  if (cat.includes('liberation') || cat.includes('self-liberation')) return 'daily';
  if (cat.includes('strategy') || cat.includes('commitment') || cat.includes('excellence')) return 'recode';
  if (cat.includes('wealth') || cat.includes('millionaire')) return 'recode';
  if (cat.includes('basic') || cat.includes('transformation')) return 'recode';
  if (cat.includes('identity') || cat.includes('self-image')) return 'quiz';
  if (cat.includes('discipline') || cat.includes('procrastinat')) return 'recode';
  if (cat.includes('coach') || cat.includes('ai')) return 'coach';
  if (cat.includes('free')) return 'free';
  if (cat.includes('reflection') || cat.includes('journal')) return 'daily';
  if (cat.includes('value')) return 'values';
  return 'quiz';
}

export function BlogArticleCTA({ ctaType, category, articleTitle }: BlogArticleCTAProps) {
  const t = useTranslations('blogCTA');
  const { locale } = useLocale();
  const isAr = locale === 'ar';
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const resolvedType: CTAType = ctaType || (category ? mapCategoryToCTAType(category) : 'quiz');
  const config = CTA_CONFIGS[resolvedType];
  const IconComponent = config.icon;
  const tKey = config.type;

  return (
    <section ref={sectionRef} className="py-16 lg:py-20" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`max-w-3xl mx-auto transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F1C2E] via-[#162B42] to-[#1A3350] shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3DD4B0]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#1F6F78]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

            <div className="relative p-8 sm:p-10 lg:p-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3DD4B0]/10 border border-[#3DD4B0]/20 mb-6">
                <Sparkles className="h-3.5 w-3.5 text-[#3DD4B0]" />
                <span className="text-xs font-medium text-[#7AEEE0] tracking-wide uppercase">
                  {t('recommendedForYou')}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                {t('heading')}
              </h2>
              <p className="text-[#7AEEE0]/70 text-base sm:text-lg mb-8">
                {t('subheading')}
              </p>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8 mb-8 transition-all duration-300 hover:bg-white/[0.07] hover:border-white/15">
                <div className={`flex flex-col sm:flex-row ${isAr ? 'sm:flex-row-reverse' : ''} items-start gap-5`}>
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#3DD4B0] to-[#1F6F78] flex items-center justify-center shadow-lg shadow-[#3DD4B0]/20">
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>
                  <div className={`flex-1 ${isAr ? 'text-right' : ''}`}>
                    <div className={`flex items-center gap-3 mb-1 ${isAr ? 'flex-row-reverse' : ''}`}>
                      <h3 className="text-xl font-bold text-white">{t(`${tKey}.product`)}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${config.isFree ? 'bg-[#3DD4B0]/20 text-[#3DD4B0]' : 'bg-[#C97B7B]/20 text-[#C97B7B]'}`}>
                        {config.badge}
                      </span>
                    </div>
                    <div className={`flex items-center gap-2 mb-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                      <span className="text-xs font-medium text-[#3DD4B0] uppercase tracking-wider">{t('whyItFits')}</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-[#3DD4B0]/30 to-transparent" />
                    </div>
                    <p className="text-slate-300/80 text-sm leading-relaxed">{t(`${tKey}.reason`)}</p>
                  </div>
                </div>
              </div>

              <div className={`flex flex-col sm:flex-row ${isAr ? 'sm:flex-row-reverse' : ''} items-center gap-4`}>
                <Link href={config.href}>
                  <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 py-6 text-base font-semibold shadow-lg shadow-[#3DD4B0]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#3DD4B0]/30 hover:scale-[1.02] active:scale-[0.98]">
                    {config.isFree ? t('ctaFree') : t('ctaText')}
                    <ArrowRight className={`${isAr ? 'mr-2 rotate-180' : 'ml-2'} h-5 w-5`} />
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="ghost" size="lg" className="text-slate-400 hover:text-white hover:bg-white/5 px-6">
                    {isAr ? 'عرض جميع المنتجات' : 'View All Products'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
