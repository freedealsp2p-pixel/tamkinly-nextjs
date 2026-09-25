'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useTranslations } from '@/components/providers/LocaleProvider';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { CheckCircle2 } from 'lucide-react';

const cards = ['card1', 'card2', 'card3', 'card4'] as const;

export default function RecoveryRecognition() {
  const t = useTranslations('recoveryPage');

  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section
      id="recognition"
      className="bg-[#F6F8FA] py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <Badge className="mb-4 bg-[#3DD4B0]/10 text-[#1F6F78]">
            {t('recognition.badge')}
          </Badge>

          <h2 className="mb-4 text-3xl font-bold text-[#0F1C2E] md:text-5xl">
            {t('recognition.title')}
          </h2>

          <p className="text-lg text-slate-600">
            {t('recognition.description')}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card, index) => {
            const active = selected === index;

            return (
              <motion.div
                key={card}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08
                }}
              >
                <Card
                  onClick={() => setSelected(index)}
                  className={`
                    cursor-pointer
                    transition-all
                    duration-300
                    border-2
                    ${
                      active
                        ? 'border-[#3DD4B0] shadow-lg shadow-[#3DD4B0]/15'
                        : 'border-slate-200 hover:border-[#3DD4B0]/40'
                    }
                  `}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`
                          mt-1 flex h-8 w-8 items-center justify-center rounded-full
                          ${
                            active
                              ? 'bg-[#3DD4B0] text-[#0F1C2E]'
                              : 'bg-slate-100 text-slate-400'
                          }
                        `}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[#0F1C2E]">
                          {t(`recognition.${card}.title`)}
                        </h3>

                        <AnimatePresence>
                          {active && (
                            <motion.div
                              initial={{
                                opacity: 0,
                                height: 0
                              }}
                              animate={{
                                opacity: 1,
                                height: 'auto'
                              }}
                              exit={{
                                opacity: 0,
                                height: 0
                              }}
                              transition={{
                                duration: 0.25
                              }}
                            >
                              <div className="mt-4 rounded-xl bg-[#3DD4B0]/10 p-4">
                                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#1F6F78]">
                                  {t('recognition.selectedLabel')}
                                </span>

                                <p className="text-sm leading-relaxed text-[#0F1C2E]">
                                  {t(`recognition.${card}.message`)}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
