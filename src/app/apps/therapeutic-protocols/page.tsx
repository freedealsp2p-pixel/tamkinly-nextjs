'use client';

import Link from 'next/link';
import { Clock, Shield, Eye, Key, ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';
import { RecoveryBreadcrumb } from '@/components/recovery/system';

const PROTOCOLS = [
  {
    id: 'temporalDecoupling',
    icon: Clock,
    color: '#1F6F78',
    stepCount: 7,
    durationLabel: { ar: '١٢ دقيقة', en: '12 minutes' },
    titleKey: 'title',
    subtitleKey: 'subtitle',
    descriptionKey: 'description',
    href: '/apps/therapeutic-protocols/temporal-decoupling',
    requiresSafety: false,
  },
  {
    id: 'alternativeCode',
    icon: Key,
    color: '#2A8A94',
    stepCount: 5,
    durationLabel: { ar: '١٥ دقيقة', en: '15 minutes' },
    titleKey: 'title',
    subtitleKey: 'subtitle',
    descriptionKey: 'description',
    href: '/apps/therapeutic-protocols/alternative-code',
    requiresSafety: false,
  },
  {
    id: 'whiteMirror',
    icon: Eye,
    color: '#0F1C2E',
    stepCount: 4,
    durationLabel: { ar: '٩ دقائق', en: '9 minutes' },
    titleKey: 'title',
    subtitleKey: 'subtitle',
    descriptionKey: 'description',
    href: '/apps/therapeutic-protocols/white-mirror',
    requiresSafety: true,
  },
];

export default function TherapeuticProtocolsHub() {
  const { direction, locale } = useLocale();
  const isAr = locale === 'ar';
  const t = useTranslations('therapeuticProtocols');

  const breadcrumbs = [
    { label: 'Tamkinly', href: '/' },
    { label: isAr ? 'التطبيقات' : 'Apps', href: '/apps' },
    { label: isAr ? 'البروتوكولات العلاجية' : 'Therapeutic Protocols' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F9F8]" dir={direction}>
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-3xl">
        <RecoveryBreadcrumb items={breadcrumbs} />

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F6F78]/10 text-[#1F6F78] text-xs font-medium mb-4">
            <Shield className="w-3.5 h-3.5" />
            {isAr ? 'تمكينلي' : 'Tamkinly'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F1C2E] mb-3">
            {t('hub.title')}
          </h1>
          <p className="text-[#0F1C2E]/60 max-w-lg mx-auto leading-relaxed">
            {t('hub.subtitle')}
          </p>
        </div>

        {/* Protocol Cards */}
        <div className="space-y-4">
          {PROTOCOLS.map((protocol) => {
            const Icon = protocol.icon;
            return (
              <Link
                key={protocol.id}
                href={protocol.href}
                className="block group"
              >
                <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${protocol.color}10` }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{ color: protocol.color }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-lg font-semibold text-[#0F1C2E]">
                          {t(`protocols.${protocol.id}.${protocol.titleKey}`)}
                        </h2>
                        {protocol.requiresSafety && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-[#E8685A]/10 text-[#E8685A] font-medium">
                            {isAr ? 'يتطلب تحذيراً' : 'Safety warning'}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#0F1C2E]/50 mb-2">
                        {t(`protocols.${protocol.id}.${protocol.subtitleKey}`)}
                      </p>
                      <p className="text-sm text-[#0F1C2E]/70 leading-relaxed line-clamp-2">
                        {t(`protocols.${protocol.id}.${protocol.descriptionKey}`)}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 mt-3 text-xs text-[#0F1C2E]/40">
                        <span className="flex items-center gap-1">
                          {isAr
                            ? `${protocol.stepCount} خطوات`
                            : `${protocol.stepCount} steps`}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {isAr ? protocol.durationLabel.ar : protocol.durationLabel.en}
                        </span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ArrowRight className="w-5 h-5 text-[#0F1C2E]/20 group-hover:text-[#1F6F78] transition-colors flex-shrink-0 mt-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-[#0F1C2E]/30 mt-8 leading-relaxed max-w-md mx-auto">
          {t('hub.disclaimer')}
        </p>
      </div>
    </div>
  );
}
