'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQSection() {
  const t = useTranslations('faq');

  const faqs = [
    { q: t('questions.q1.q'), a: t('questions.q1.a') },
    { q: t('questions.q2.q'), a: t('questions.q2.a') },
    { q: t('questions.q3.q'), a: t('questions.q3.a') },
    { q: t('questions.q4.q'), a: t('questions.q4.a') },
    { q: t('questions.q5.q'), a: t('questions.q5.a') },
    { q: t('questions.q6.q'), a: t('questions.q6.a') },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            FAQ
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6">
            {t('title')}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white px-6 rounded-xl border border-slate-100 shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-primary hover:text-accent py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
