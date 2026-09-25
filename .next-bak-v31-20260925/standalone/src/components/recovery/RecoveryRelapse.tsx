'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  RotateCcw,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

import {
  useTranslations,
  useLocale,
} from '@/components/providers/LocaleProvider';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import SectionDownloadButton from '@/components/recovery/SectionDownloadButton';

type ScenarioKey =
  | 'stress'
  | 'trigger'
  | 'stopped';

export default function RecoveryRelapse() {
  const t = useTranslations('recoveryPage');
  const { direction } = useLocale();

  const [selected, setSelected] =
    useState<ScenarioKey>('stress');

  const scenarios: ScenarioKey[] = [
    'stress',
    'trigger',
    'stopped',
  ];

  const steps = [
    t(`relapse.scenarios.${selected}.step1`),
    t(`relapse.scenarios.${selected}.step2`),
    t(`relapse.scenarios.${selected}.step3`),
    t(`relapse.scenarios.${selected}.step4`),
  ];

  return (
    <section
      id="relapse"
      dir={direction}
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <Badge className="mb-4 bg-[#C97B7B]/10 text-[#C97B7B]">
            {t('relapse.badge')}
          </Badge>

          <h2 className="mb-4 text-3xl font-bold text-[#0F1C2E] md:text-5xl">
            {t('relapse.title')}
          </h2>

          <p className="text-lg text-slate-600">
            {t('relapse.description')}
          </p>
        </motion.div>

        <Card className="mb-10 border-none shadow-xl">
          <CardContent className="p-8">
            <p className="mb-6 font-medium text-[#0F1C2E]">
              {t('relapse.selectLabel')}
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              {scenarios.map((scenario) => (
                <button
                  key={scenario}
                  onClick={() => setSelected(scenario)}
                  className={`
                    rounded-2xl border p-5 text-start transition-all
                    ${
                      selected === scenario
                        ? 'border-[#3DD4B0] bg-[#3DD4B0]/10'
                        : 'border-slate-200 bg-white'
                    }
                  `}
                >
                  {t(
                    `relapse.scenarios.${scenario}.title`
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 flex items-center justify-center gap-6"
        >
          <motion.div
            animate={{
              opacity: [1, 0.5, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="
              rounded-2xl
              border
              border-[#C97B7B]/30
              bg-[#C97B7B]/10
              px-6
              py-4
            "
          >
            <span className="font-semibold text-[#C97B7B]">
              ✕ {t('relapse.failure')}
            </span>
          </motion.div>

          <ArrowRight className="h-6 w-6 text-[#1F6F78]" />

          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="
              rounded-2xl
              border
              border-[#3DD4B0]/30
              bg-[#3DD4B0]/10
              px-6
              py-4
            "
          >
            <span className="font-semibold text-[#1F6F78]">
              ✓ {t('relapse.feedback')}
            </span>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="mb-6 flex items-center gap-3">
                  <RotateCcw className="h-6 w-6 text-[#3DD4B0]" />

                  <h3 className="text-2xl font-bold text-[#0F1C2E]">
                    {t('relapse.whatNow')}
                  </h3>
                </div>

                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <motion.div
                      key={step}
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.1,
                      }}
                      className="
                        flex
                        items-center
                        gap-4
                        rounded-2xl
                        border
                        p-4
                      "
                    >
                      <div
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          bg-[#0F1C2E]
                          text-white
                        "
                      >
                        {index + 1}
                      </div>

                      <span>{step}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mt-12"
        >
          <div className="rounded-3xl bg-[#0F1C2E] p-8 text-center">
            <div className="mb-4 flex justify-center">
              <RefreshCw className="h-8 w-8 text-[#3DD4B0]" />
            </div>

            <p className="text-xl font-semibold text-[#3DD4B0]">
              {t('relapse.highlight')}
            </p>

            <div className="mt-4 flex justify-center">
              <CheckCircle2 className="h-6 w-6 text-[#3DD4B0]" />
            </div>
          </div>
        </motion.div>

        <SectionDownloadButton
          fileKey="REC-09-RELAPSE-SCENARIO-REVIEW"
          program="porn-recovery"
        />
      </div>
    </section>
  );
}
