'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Shield,
  Heart,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import {
  useTranslations,
  useLocale,
} from '@/components/providers/LocaleProvider';

export default function RecoveryPathways() {
  const t = useTranslations('recoveryPathways');
  const { direction, locale } = useLocale();
  const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;

  const pathways = [
    {
      key: 'direct',
      icon: Sparkles,
      color: '#3DD4B0',
      bgColor: 'bg-[#3DD4B0]/10',
      borderColor: 'border-[#3DD4B0]/30',
      steps: [
        { label: t('identity'), href: '/quiz' },
      ],
      cta: t('startQuiz'),
      ctaHref: '/quiz',
    },
    {
      key: 'pornRecovery',
      icon: Heart,
      color: '#3DD4B0',
      bgColor: 'bg-[#3DD4B0]/10',
      borderColor: 'border-[#3DD4B0]/30',
      steps: [
        { label: t('pornRecovery.title'), href: '/recovery/porn-recovery' },
        { label: t('identity'), href: '/quiz' },
      ],
      cta: t('startRecovery'),
      ctaHref: '/recovery/porn-recovery',
    },
    {
      key: 'traumaRecovery',
      icon: Shield,
      color: '#1F6F78',
      bgColor: 'bg-[#1F6F78]/10',
      borderColor: 'border-[#1F6F78]/30',
      steps: [
        { label: t('traumaRecovery.title'), href: '/recovery/trc' },
        { label: t('identity'), href: '/quiz' },
      ],
      cta: t('startRecovery'),
      ctaHref: '/recovery/trc',
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-white" dir={direction}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F1C2E] mb-4">
            {t('title')}
          </h2>
          <p className="text-slate-600 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pathways.map((pathway, idx) => {
            const Icon = pathway.icon;
            return (
              <motion.div
                key={pathway.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`rounded-2xl border ${pathway.borderColor} bg-white p-6 flex flex-col`}
              >
                <div className={`w-12 h-12 rounded-xl ${pathway.bgColor} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" style={{ color: pathway.color }} />
                </div>

                <h3 className="font-semibold text-lg text-[#0F1C2E] mb-3">
                  {t(`${pathway.key}.title`)}
                </h3>

                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  {t(`${pathway.key}.description`)}
                </p>

                {/* Flow Steps */}
                <div className="flex items-center gap-2 mb-6 flex-wrap">
                  {pathway.steps.map((step, stepIdx) => (
                    <span key={stepIdx} className="flex items-center gap-2">
                      {stepIdx > 0 && (
                        <ChevronRight className="w-4 h-4 text-slate-400 rtl:rotate-180" />
                      )}
                      <Link
                        href={step.href}
                        className="text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 hover:border-[#1F6F78]/40 hover:text-[#1F6F78] transition-colors"
                      >
                        {step.label}
                      </Link>
                    </span>
                  ))}
                </div>

                <div className="mt-auto">
                  <Link href={pathway.ctaHref}>
                    <button
                      className="w-full text-sm font-medium py-2.5 px-4 rounded-lg border transition-colors"
                      style={{
                        borderColor: pathway.color,
                        color: pathway.color,
                      }}
                    >
                      {pathway.cta}
                    </button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-xs text-slate-400 mt-8 max-w-2xl mx-auto leading-relaxed">
          {t('note')}
        </p>
      </div>
    </section>
  );
}
