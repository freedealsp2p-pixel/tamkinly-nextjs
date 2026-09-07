'use client';

import { ProtocolLanding } from '@/components/therapeutic/ProtocolLanding';
import { TEMPORAL_DECOUPLING_META } from '@/lib/therapeutic-protocols/temporal-decoupling';
import { useTranslations } from '@/components/providers/LocaleProvider';

export default function TemporalDecouplingLanding() {
  const ts = useTranslations('therapeuticProtocols.shared');
  const tpp = useTranslations('therapeuticProtocols.protocols');

  const breadcrumbs = [
    { label: ts('breadcrumbs.home'), href: '/' },
    { label: ts('breadcrumbs.apps'), href: '/apps' },
    { label: ts('breadcrumbs.protocols'), href: '/apps/therapeutic-protocols' },
    { label: tpp('temporal-decoupling.title') },
  ];

  return (
    <ProtocolLanding
      protocolSlug="temporal-decoupling"
      breadcrumbs={breadcrumbs}
      intro={TEMPORAL_DECOUPLING_META.intro}
      intro2={TEMPORAL_DECOUPLING_META.intro2}
      claim={TEMPORAL_DECOUPLING_META.claim}
      includes={[
        { ar: '٧ خطوات موجهة بالكامل', en: '7 fully guided steps' },
        { ar: 'تقنية إعادة توطيد الذاكرة', en: 'Memory Reconsolidation technique' },
        { ar: 'تجربة تفاعلية مع تقدم مرئي', en: 'Interactive experience with visual progress' },
        { ar: 'تأملات مخصصة لكل خطوة', en: 'Reflection prompts for each step' },
        { ar: 'وصول مدى الحياة — دفعة واحدة', en: 'Lifetime access — one-time payment' },
      ]}
    />
  );
}
