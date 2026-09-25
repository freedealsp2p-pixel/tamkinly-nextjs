'use client';

import { AlertCircle } from 'lucide-react';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';

export default function MedicalDisclaimer() {
  const { locale } = useLocale();
  
  const disclaimer = locale === 'ar' 
    ? 'تنويه مهم: تمكينلي ليس بديلاً عن العلاج النفسي أو الطبي المختص. المحتوى المقدم هنا هو لأغراض تعليمية وتوجيهية فقط. إذا كنت تمر بضائقة نفسية حادة أو أفكار مؤذية، يرجى التواصل مع مختص نفسي أو طبيب مختص فوراً. في حالات الطوارئ، اتصل بخط المساعدة المحلي.'
    : 'Important Disclaimer: Tamkinly is not a substitute for professional psychological or medical treatment. The content provided here is for educational and guidance purposes only. If you are experiencing severe psychological distress or harmful thoughts, please contact a licensed mental health professional or doctor immediately. In emergencies, call your local helpline.';

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 sm:p-6 my-6" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm sm:text-base text-amber-800 leading-relaxed">
          {disclaimer}
        </p>
      </div>
    </div>
  );
}
