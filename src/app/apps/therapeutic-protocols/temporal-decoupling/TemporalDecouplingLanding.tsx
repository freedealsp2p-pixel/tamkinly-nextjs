'use client';

import { ProtocolLanding } from '@/components/therapeutic/ProtocolLanding';
import { TEMPORAL_DECOUPLING_META } from '@/lib/therapeutic-protocols/temporal-decoupling';

const breadcrumbs = [
  { label: 'Tamkinly', href: '/' },
  { label: '/apps', href: '/apps' },
  { label: 'Therapeutic Protocols', href: '/apps/therapeutic-protocols' },
  { label: 'Temporal Decoupling' },
];

export default function TemporalDecouplingLanding() {
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
