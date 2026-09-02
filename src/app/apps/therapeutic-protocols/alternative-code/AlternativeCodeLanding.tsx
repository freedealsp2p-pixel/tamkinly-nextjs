'use client';

import { ProtocolLanding } from '@/components/therapeutic/ProtocolLanding';
import { ALTERNATIVE_CODE_META } from '@/lib/therapeutic-protocols/alternative-code';

const breadcrumbs = [
  { label: 'Tamkinly', href: '/' },
  { label: '/apps', href: '/apps' },
  { label: 'Therapeutic Protocols', href: '/apps/therapeutic-protocols' },
  { label: 'Alternative Code' },
];

export default function AlternativeCodeLanding() {
  return (
    <ProtocolLanding
      protocolSlug="alternative-code"
      breadcrumbs={breadcrumbs}
      intro={ALTERNATIVE_CODE_META.intro}
      intro2={ALTERNATIVE_CODE_META.intro2}
      claim={ALTERNATIVE_CODE_META.claim}
      includes={[
        { ar: '٥ خطوات موجهة بالكامل', en: '5 fully guided steps' },
        { ar: 'تفاعل «فاكهة الاسم» (Name Decoder)', en: 'Name Decoder interaction' },
        { ar: 'تقنية إعادة توطيد الذاكرة وفك الارتباط الشرطي', en: 'Memory reconsolidation & conditioned association decoupling' },
        { ar: 'تأملات مخصصة لكل خطوة', en: 'Reflection prompts for each step' },
        { ar: 'وصول مدى الحياة — دفعة واحدة', en: 'Lifetime access — one-time payment' },
      ]}
    />
  );
}
