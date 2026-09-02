'use client';

import { ProtocolLanding } from '@/components/therapeutic/ProtocolLanding';
import { WHITE_MIRROR_META, WHITE_MIRROR_SAFETY } from '@/lib/therapeutic-protocols/white-mirror';

const breadcrumbs = [
  { label: 'Tamkinly', href: '/' },
  { label: '/apps', href: '/apps' },
  { label: 'Therapeutic Protocols', href: '/apps/therapeutic-protocols' },
  { label: 'White Mirror' },
];

export default function WhiteMirrorLanding() {
  return (
    <ProtocolLanding
      protocolSlug="white-mirror"
      breadcrumbs={breadcrumbs}
      intro={WHITE_MIRROR_META.intro}
      intro2={WHITE_MIRROR_META.intro2}
      claim={WHITE_MIRROR_META.claim}
      includes={[
        { ar: '٤ خطوات موجهة بالكامل', en: '4 fully guided steps' },
        { ar: 'تقنية كسر النمط (Pattern Interrupt)', en: 'Pattern Interrupt technique' },
        { ar: 'تسلسل بصري: القناع ← الفراغ ← الصوت ← المرساة', en: 'Visual sequence: Mask → Void → Voice → Anchor' },
        { ar: 'تحذير أمان مدمج', en: 'Built-in safety warning' },
        { ar: 'وصول مدى الحياة — دفعة واحدة', en: 'Lifetime access — one-time payment' },
      ]}
      safety={{
        badge: WHITE_MIRROR_SAFETY.badge,
        title: WHITE_MIRROR_SAFETY.title,
        body: WHITE_MIRROR_SAFETY.body,
        conditions: WHITE_MIRROR_SAFETY.conditions,
        alternative: WHITE_MIRROR_SAFETY.alternative,
      }}
    />
  );
}
