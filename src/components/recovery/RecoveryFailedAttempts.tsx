'use client';

import { motion } from 'framer-motion';
import {
  ArrowRightLeft,
  BarChart3,
  Repeat,
  Compass,
} from 'lucide-react';

import {
  useTranslations,
  useLocale,
} from '@/components/providers/LocaleProvider';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import SectionDownloadButton from '@/components/recovery/SectionDownloadButton';

export default function RecoveryFailedAttempts() {
  const t = useTranslations('recoveryPage');
  const { direction } = useLocale();

  const oldItems = [
    t('attempts.oldView.item1'),
    t('attempts.oldView.item2'),
    t('attempts.oldView.item3'),
    t('attempts.oldView.item4'),
  ];

  const newItems = [
    t('attempts.newView.item1'),
    t('attempts.newView.item2'),
    t('attempts.newView.item3'),
    t('attempts.newView.item4'),
  ];

  return (
    <section
      id="attempts"
      dir={direction}
      className="bg-[#F6F8FA] py-24"
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
            {t('attempts.badge')}
          </Badge>

          <h2 className="mb-4 text-3xl font-bold text-[#0F1C2E] md:text-5xl">
            {t('attempts.title')}
          </h2>

          <p className="text-lg text-slate-600">
            {t('attempts.description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Card className="overflow-hidden border-none shadow-lg">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="bg-[#C97B7B]/10 p-8">
                  <h3 className="mb-6 text-xl font-bold text-[#C97B7B]">
                    {t('attempts.oldView.title')}
                  </h3>

                  <div className="space-y-4">
                    {oldItems.map((item) => (
                      <div
                        key={item}
                        className="rounded-xl bg-white p-4 text-[#0F1C2E]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#3DD4B0]/10 p-8">
                  <h3 className="mb-6 text-xl font-bold text-[#1F6F78]">
                    {t('attempts.newView.title')}
                  </h3>

                  <div className="space-y-4">
                    {newItems.map((item) => (
                      <div
                        key={item}
                        className="rounded-xl bg-white p-4 text-[#0F1C2E]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="mb-16 flex justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-[#0F1C2E]
              text-[#3DD4B0]
            "
          >
            <ArrowRightLeft className="h-8 w-8" />
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <Compass className="mb-4 h-8 w-8 text-[#3DD4B0]" />

                <h3 className="mb-3 text-lg font-semibold text-[#0F1C2E]">
                  {t('attempts.cards.card1.title')}
                </h3>

                <p className="text-slate-600">
                  {t('attempts.cards.card1.text')}
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
                <BarChart3 className="mb-4 h-8 w-8 text-[#1F6F78]" />

                <h3 className="mb-3 text-lg font-semibold text-[#0F1C2E]">
                  {t('attempts.cards.card2.title')}
                </h3>

                <p className="text-slate-600">
                  {t('attempts.cards.card2.text')}
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
                <Repeat className="mb-4 h-8 w-8 text-[#C97B7B]" />

                <h3 className="mb-3 text-lg font-semibold text-[#0F1C2E]">
                  {t('attempts.cards.card3.title')}
                </h3>

                <p className="text-slate-600">
                  {t('attempts.cards.card3.text')}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <div className="rounded-3xl bg-[#0F1C2E] p-8 text-center">
            <p className="text-xl font-semibold text-[#3DD4B0]">
              {t('attempts.highlight')}
            </p>
          </div>
        </motion.div>

        <SectionDownloadButton
          files={[{ fileKey: 'REC-06-RECOVERY-LOOP-MAP' }, { fileKey: 'REC-07-REFRAME' }]}
          sectionKey="attempts"
        />
      </div>
    </section>
  );
}
