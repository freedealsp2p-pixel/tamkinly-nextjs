'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import NewsletterForm from '@/components/NewsletterForm';
import { Mail } from 'lucide-react';

export default function NewsletterSection() {
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  const title = isAr ? 'رسالة تمكينلي الأسبوعية' : 'The Tamkinly Letter';
  const description = isAr
    ? 'فكرة واحدة أسبوعياً عن الهوية والعادات والتعافي — مبنية على أبحاث، مكتوبة بهدوء، وتصل إلى بريدك كل أسبوع.'
    : 'One idea a week on identity, habits, and recovery — research-based, calmly written, delivered to your inbox.';

  return (
    <section className="py-16 lg:py-20 bg-white" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#3DD4B0]/15 mb-5">
            <Mail className="w-6 h-6 text-[#2BC49E]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F1C2E] mb-4">
            {title}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            {description}
          </p>
          <NewsletterForm variant="section" source="homepage" />
        </div>
      </div>
    </section>
  );
}
