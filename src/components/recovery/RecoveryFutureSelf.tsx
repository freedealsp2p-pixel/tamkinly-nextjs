'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Focus,
  ShieldCheck,
  Users,
  Crown,
  Mail,
} from 'lucide-react';

import {
  useTranslations,
  useLocale,
} from '@/components/providers/LocaleProvider';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import SectionDownloadButton from '@/components/recovery/SectionDownloadButton';

type IdentityKey =
  | 'focus'
  | 'confidence'
  | 'presence'
  | 'respect';

const identities = [
  {
    key: 'focus',
    icon: Focus,
  },
  {
    key: 'confidence',
    icon: ShieldCheck,
  },
  {
    key: 'presence',
    icon: Users,
  },
  {
    key: 'respect',
    icon: Crown,
  },
] as const;

export default function RecoveryFutureSelf() {
  const t = useTranslations('recoveryPage');
  const { direction } = useLocale();

  const [selected, setSelected] =
    useState<IdentityKey>('focus');

  return (
    <section
      id="future"
      dir={direction}
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <Badge className="mb-4 bg-[#3DD4B0]/10 text-[#1F6F78]">
            {t('future.badge')}
          </Badge>

          <h2 className="mb-4 text-3xl font-bold text-[#0F1C2E] md:text-5xl">
            {t('future.title')}
          </h2>

          <p className="text-slate-600">
            {t('future.description')}
          </p>
        </motion.div>

        <div className="mb-10 grid gap-4 md:grid-cols-4">
          {identities.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.key}
                onClick={() =>
                  setSelected(item.key)
                }
                className={`
                  rounded-2xl border p-5 transition-all
                  ${
                    selected === item.key
                      ? 'border-[#3DD4B0] bg-[#3DD4B0]/10'
                      : 'border-slate-200'
                  }
                `}
              >
                <Icon className="mx-auto mb-3 h-6 w-6 text-[#1F6F78]" />

                <span className="font-medium">
                  {t(
                    `future.cards.${item.key}.title`
                  )}
                </span>
              </button>
            );
          })}
        </div>

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
              duration: 0.35,
            }}
          >
            <Card className="overflow-hidden border-none shadow-2xl">
              <CardContent className="p-10">
                <div className="mb-8 flex items-center gap-3">
                  <Mail className="h-6 w-6 text-[#3DD4B0]" />

                  <span className="font-semibold text-[#1F6F78]">
                    {t('future.selectLabel')}
                  </span>
                </div>

                <div className="space-y-8">
                  <p className="text-lg leading-relaxed text-slate-700">
                    {t(
                      `future.cards.${selected}.changed`
                    )}
                  </p>

                  <p className="text-lg leading-relaxed text-slate-700">
                    {t(
                      `future.cards.${selected}.easier`
                    )}
                  </p>

                  <div className="rounded-2xl bg-[#F6F8FA] p-6">
                    <p className="mb-2 font-semibold text-[#0F1C2E]">
                      {t('future.adviceLabel')}
                    </p>

                    <p className="text-[#1F6F78]">
                      {t(
                        `future.cards.${selected}.advice`
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <SectionDownloadButton
          files={[{ fileKey: 'REC-11-FUTURE-SELF-LETTER' }]}
          sectionKey="futureSelf"
        />
      </div>
    </section>
  );
}
