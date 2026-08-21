'use client';

import { motion } from 'framer-motion';
import { Brain, RefreshCw, Lightbulb, ArrowRight } from 'lucide-react';

import {
  useTranslations,
  useLocale,
} from '@/components/providers/LocaleProvider';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import SectionDownloadButton from '@/components/recovery/SectionDownloadButton';

const steps = [
  'trigger',
  'urge',
  'response',
  'relief',
  'repeat',
] as const;

export default function RecoveryBrain() {
  const t = useTranslations('recoveryPage');
  const { direction } = useLocale();

  return (
    <section
      id="brain"
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
          <Badge className="mb-4 bg-[#1F6F78]/10 text-[#1F6F78]">
            {t('brain.badge')}
          </Badge>

          <h2 className="mb-4 text-3xl font-bold text-[#0F1C2E] md:text-5xl">
            {t('brain.title')}
          </h2>

          <p className="text-lg text-slate-600">
            {t('brain.description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <Card className="border-[#1F6F78]/10 bg-[#F6F8FA]">
            <CardContent className="p-8">
              <h3 className="mb-3 text-center text-2xl font-bold text-[#0F1C2E]">
                {t('brain.cycleTitle')}
              </h3>

              <p className="mb-10 text-center text-slate-600">
                {t('brain.cycleDescription')}
              </p>

              <div className="flex flex-col items-center justify-center gap-4 lg:flex-row">
                {steps.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center"
                  >
                    <motion.div
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                      }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.25,
                      }}
                      transition={{
                        delay: index * 0.15,
                        duration: 0.4,
                      }}
                      className="
                        rounded-2xl
                        border
                        border-[#3DD4B0]/20
                        bg-white
                        px-6
                        py-4
                        shadow-sm
                      "
                    >
                      <span className="font-medium text-[#0F1C2E]">
                        {t('brain.' + step)}
                      </span>
                    </motion.div>

                    {index < steps.length - 1 && (
                      <ArrowRight
                        className="
                          mx-3
                          hidden
                          h-5
                          w-5
                          text-[#1F6F78]
                          lg:block
                        "
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <Brain className="mb-4 h-8 w-8 text-[#3DD4B0]" />

                <h3 className="mb-3 text-lg font-semibold text-[#0F1C2E]">
                  {t('brain.card1.title')}
                </h3>

                <p className="text-slate-600">
                  {t('brain.card1.text')}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <RefreshCw className="mb-4 h-8 w-8 text-[#1F6F78]" />

                <h3 className="mb-3 text-lg font-semibold text-[#0F1C2E]">
                  {t('brain.card2.title')}
                </h3>

                <p className="text-slate-600">
                  {t('brain.card2.text')}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <Lightbulb className="mb-4 h-8 w-8 text-[#C97B7B]" />

                <h3 className="mb-3 text-lg font-semibold text-[#0F1C2E]">
                  {t('brain.card3.title')}
                </h3>

                <p className="text-slate-600">
                  {t('brain.card3.text')}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

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
          className="
            mt-12
            rounded-3xl
            bg-[#0F1C2E]
            p-8
            text-center
          "
        >
          <p className="text-xl font-semibold text-[#3DD4B0]">
            {t('brain.highlight')}
          </p>
        </motion.div>

        <SectionDownloadButton
          files={[{ fileKey: 'REC-05-PATTERN-RECOGNITION' }]}
          sectionKey="brain"
        />
      </div>
    </section>
  );
}
