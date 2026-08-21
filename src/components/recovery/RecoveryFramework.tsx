'use client';

import { motion } from 'framer-motion';
import {
  Eye,
  Brain,
  Shield,
  Sprout,
} from 'lucide-react';

import {
  useTranslations,
  useLocale,
} from '@/components/providers/LocaleProvider';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import SectionDownloadButton from '@/components/recovery/SectionDownloadButton';

const stages = [
  {
    key: 'stage1',
    icon: Eye,
    color: 'text-[#3DD4B0]',
  },
  {
    key: 'stage2',
    icon: Brain,
    color: 'text-[#1F6F78]',
  },
  {
    key: 'stage3',
    icon: Shield,
    color: 'text-[#C97B7B]',
  },
  {
    key: 'stage4',
    icon: Sprout,
    color: 'text-[#3DD4B0]',
  },
] as const;

export default function RecoveryFramework() {
  const t = useTranslations('recoveryPage');
  const { direction } = useLocale();

  return (
    <section
      id="framework"
      dir={direction}
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <Badge className="mb-4 bg-[#3DD4B0]/10 text-[#1F6F78]">
            {t('framework.badge')}
          </Badge>

          <h2 className="mb-4 text-3xl font-bold text-[#0F1C2E] md:text-5xl">
            {t('framework.title')}
          </h2>

          <p className="text-lg text-slate-600">
            {t('framework.description')}
          </p>
        </motion.div>

        <div className="relative">
          <div
            className="
              absolute
              left-1/2
              top-0
              hidden
              h-full
              w-px
              -translate-x-1/2
              bg-[#3DD4B0]/20
              md:block
            "
          />

          <div className="space-y-12">
            {stages.map((stage, index) => {
              const Icon = stage.icon;

              return (
                <motion.div
                  key={stage.key}
                  initial={{
                    opacity: 0,
                    y: 40,
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
                    duration: 0.6,
                    delay: index * 0.15,
                  }}
                  className="relative"
                >
                  <div className="flex justify-center">
                    <div
                      className="
                        absolute
                        top-6
                        z-10
                        hidden
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-[#0F1C2E]
                        md:flex
                      "
                    >
                      <Icon
                        className={`h-6 w-6 ${stage.color}`}
                      />
                    </div>
                  </div>

                  <Card className="mx-auto max-w-2xl">
                    <CardContent className="p-8">
                      <div className="mb-4 flex items-center gap-3 md:hidden">
                        <Icon
                          className={`h-6 w-6 ${stage.color}`}
                        />
                      </div>

                      <h3 className="mb-3 text-2xl font-semibold text-[#0F1C2E]">
                        {t(
                          `framework.stages.${stage.key}.title`
                        )}
                      </h3>

                      <p className="leading-relaxed text-slate-600">
                        {t(
                          `framework.stages.${stage.key}.text`
                        )}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
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
          className="mt-16"
        >
          <div className="rounded-3xl bg-[#0F1C2E] p-8 text-center">
            <p className="text-xl font-semibold text-[#3DD4B0]">
              {t('framework.highlight')}
            </p>
          </div>
        </motion.div>

        <SectionDownloadButton
          files={[{ fileKey: 'REC-04-RECOVERY-REVIEW' }, { fileKey: 'REC-08-STAGE-ASSESSMENT' }]}
          sectionKey="framework"
        />
      </div>
    </section>
  );
}
