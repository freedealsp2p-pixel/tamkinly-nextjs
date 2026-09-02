'use client';

import Link from 'next/link';
import { Clock, Shield, Eye, Key, ArrowRight, Lock } from 'lucide-react';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';
import { RecoveryBreadcrumb } from '@/components/recovery/system';

const PROTOCOLS = [
  {
    id: 'temporal-decoupling',
    icon: Clock,
    color: '#1F6F78',
    stepCount: 7,
    durationLabel: { ar: '\u0661\u0662 \u062f\u0642\u064a\u0642\u0629', en: '12 minutes' },
    titleKey: 'title',
    subtitleKey: 'subtitle',
    descriptionKey: 'description',
    href: '/apps/therapeutic-protocols/temporal-decoupling',
    requiresSafety: false,
  },
  {
    id: 'alternative-code',
    icon: Key,
    color: '#2A8A94',
    stepCount: 5,
    durationLabel: { ar: '\u0661\u0665 \u062f\u0642\u064a\u0642\u0629', en: '15 minutes' },
    titleKey: 'title',
    subtitleKey: 'subtitle',
    descriptionKey: 'description',
    href: '/apps/therapeutic-protocols/alternative-code',
    requiresSafety: false,
  },
  {
    id: 'white-mirror',
    icon: Eye,
    color: '#0F1C2E',
    stepCount: 4,
    durationLabel: { ar: '\u0669 \u062f\u0642\u0627\u0626\u0642', en: '9 minutes' },
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
    { label: '/apps', href: '/apps' },
    { label: isAr ? '\u0627\u0644\u0628\u0631\u0648\u062a\u0648\u0643\u0648\u0644\u0627\u062a \u0627\u0644\u0639\u0644\u0627\u062c\u064a\u0629' : 'Therapeutic Protocols' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F9F8]" dir={direction}>
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-3xl">
        <RecoveryBreadcrumb items={breadcrumbs} />

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F6F78]/10 text-[#1F6F78] text-xs font-medium mb-4">
            <Shield className="w-3.5 h-3.5" />
            {isAr ? '\u062a\u0645\u0643\u064a\u0646\u0644\u064a' : 'Tamkinly'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F1C2E] mb-3">
            {t('hub.title')}
          </h1>
          <p className="text-[#0F1C2E]/60 max-w-lg mx-auto leading-relaxed">
            {t('hub.subtitle')}
          </p>
        </div>

        {/* Premium Badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Lock className="w-4 h-4 text-[#0F1C2E]/40" />
          <span className="text-sm text-[#0F1C2E]/50">
            {t('hub.premiumBadge')}
          </span>
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
                            {isAr ? '\u064a\u062a\u0637\u0644\u0628 \u062a\u062d\u0630\u064a\u0631\u0627\u064b' : 'Safety warning'}
                          </span>
                        )}
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#0F1C2E]/5 text-[#0F1C2E]/50 font-medium">
                          ${isAr ? '\u0669\u0669' : '99'}
                        </span>
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
                            ? `${protocol.stepCount} \u062e\u0637\u0648\u0627\u062a`
                            : `${protocol.stepCount} steps`}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {isAr ? protocol.durationLabel.ar : protocol.durationLabel.en}
                        </span>
                        <span className="flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          {isAr ? '\u062f\u0641\u0639\u0629 \u0648\u0627\u062d\u062f\u0629' : 'One-time'}
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
