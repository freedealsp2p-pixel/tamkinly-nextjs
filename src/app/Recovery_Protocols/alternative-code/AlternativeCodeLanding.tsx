'use client';

import { ProtocolLanding } from '@/components/recovery-protocols/ProtocolLanding';
import { ALTERNATIVE_CODE_META } from '@/lib/recovery-protocols/alternative-code';
import { useTranslations } from '@/components/providers/LocaleProvider';

export default function AlternativeCodeLanding() {
  const ts = useTranslations('recoveryProtocols.shared');
  const tpp = useTranslations('recoveryProtocols.protocols');

  const breadcrumbs = [
    { label: ts('breadcrumbs.home'), href: '/' },
    { label: ts('breadcrumbs.apps'), href: '/apps' },
    { label: ts('breadcrumbs.protocols'), href: '/Recovery_Protocols' },
    { label: tpp('alternative-code.title') },
  ];

  return (
    <ProtocolLanding
      protocolSlug="alternative-code"
      breadcrumbs={breadcrumbs}
      intro={ALTERNATIVE_CODE_META.intro}
      intro2={ALTERNATIVE_CODE_META.intro2}
      claim={ALTERNATIVE_CODE_META.claim}
      includes={[
        { ar: '5 خطوات موجهة بالكامل', en: '5 fully guided steps' },
        { ar: 'تفاعل «مفكّك الاسم» (Name Decoder)', en: 'Name Decoder interaction' },
        { ar: 'تقنية إعادة توطيد الذاكرة وفك الارتباط الشرطي', en: 'Memory reconsolidation & conditioned association decoupling' },
        { ar: 'تأملات مخصصة لكل خطوة', en: 'Reflection prompts for each step' },
        { ar: 'وصول مدى الحياة — دفعة واحدة', en: 'Lifetime access — one-time payment' },
      ]}
    />
  );
}
