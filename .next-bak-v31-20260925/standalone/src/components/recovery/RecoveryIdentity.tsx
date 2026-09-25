'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Focus,
  ShieldCheck,
  Users,
  Crown,
  Save,
  CheckCircle2,
} from 'lucide-react';

import {
  useTranslations,
  useLocale,
} from '@/components/providers/LocaleProvider';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SectionDownloadButton from '@/components/recovery/SectionDownloadButton';

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.15,
      duration: 0.5,
    },
  }),
};

const identityCards = [
  {
    key: 'focus',
    icon: Focus,
    color: 'text-[#3DD4B0]',
    bgColor: 'bg-[#3DD4B0]/10',
  },
  {
    key: 'confidence',
    icon: ShieldCheck,
    color: 'text-[#1F6F78]',
    bgColor: 'bg-[#1F6F78]/10',
  },
  {
    key: 'presence',
    icon: Users,
    color: 'text-[#C97B7B]',
    bgColor: 'bg-[#C97B7B]/10',
  },
  {
    key: 'respect',
    icon: Crown,
    color: 'text-[#3DD4B0]',
    bgColor: 'bg-[#3DD4B0]/10',
  },
] as const;

const STORAGE_KEY = 'tamkinly_recovery_identity';

interface IdentityData {
  selectedCards: string[];
  personalStatement: string;
  savedAt: string | null;
}

function loadIdentityData(): IdentityData {
  if (typeof window === 'undefined') return { selectedCards: [], personalStatement: '', savedAt: null };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { selectedCards: [], personalStatement: '', savedAt: null };
}

function saveIdentityData(data: IdentityData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export default function RecoveryIdentity() {
  const t = useTranslations('recoveryPage');
  const { direction } = useLocale();

  const [identityData, setIdentityData] = useState<IdentityData>({
    selectedCards: [],
    personalStatement: '',
    savedAt: null,
  });
  const [justSaved, setJustSaved] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setIdentityData(loadIdentityData());
  }, []);

  const toggleCard = (key: string) => {
    setIdentityData(prev => {
      const selected = prev.selectedCards.includes(key)
        ? prev.selectedCards.filter(k => k !== key)
        : [...prev.selectedCards, key];
      const updated = { ...prev, selectedCards: selected };
      saveIdentityData(updated);
      return updated;
    });
  };

  const handleSave = () => {
    const updated = { ...identityData, savedAt: new Date().toISOString() };
    saveIdentityData(updated);
    setIdentityData(updated);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  return (
    <section
      id="identity"
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
          <Badge className="mb-4 bg-[#3DD4B0]/10 text-[#1F6F78]">
            {t('identity.badge')}
          </Badge>

          <h2 className="mb-4 text-3xl font-bold text-[#0F1C2E] md:text-5xl">
            {t('identity.title')}
          </h2>

          <p className="text-lg text-slate-600">
            {t('identity.description')}
          </p>

          <p className="mt-6 font-medium text-[#1F6F78]">
            {t('identity.question')}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {identityCards.map((card, index) => {
            const Icon = card.icon;
            const isSelected = identityData.selectedCards.includes(card.key);

            return (
              <motion.div
                key={card.key}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
              >
                <Card
                  className={`h-full transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                    isSelected ? 'ring-2 ring-[#3DD4B0] bg-[#F0FDF9]' : ''
                  }`}
                  onClick={() => toggleCard(card.key)}
                >
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between">
                      <Icon
                        className={`mb-5 h-10 w-10 ${card.color}`}
                      />
                      {isSelected && (
                        <CheckCircle2 className="h-6 w-6 text-[#3DD4B0] flex-shrink-0" />
                      )}
                    </div>

                    <h3 className="mb-3 text-2xl font-semibold text-[#0F1C2E]">
                      {t('identity.cards.' + card.key + '.title')}
                    </h3>

                    <p className="leading-relaxed text-slate-600">
                      {t('identity.cards.' + card.key + '.text')}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Personal Identity Statement */}
        {identityData.selectedCards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8"
          >
            <Card className="border-2 border-[#3DD4B0]/30 bg-white">
              <CardContent className="p-6 sm:p-8">
                <h3 className="font-semibold text-[#0F1C2E] mb-2">
                  {t('identity.statementTitle')}
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  {t('identity.statementPrompt')}
                </p>
                <textarea
                  rows={4}
                  value={identityData.personalStatement}
                  onChange={(e) => {
                    const updated = { ...identityData, personalStatement: e.target.value };
                    setIdentityData(updated);
                  }}
                  placeholder={t('identity.statementPlaceholder')}
                  className="w-full rounded-xl border border-slate-200 p-4 text-sm focus:border-[#3DD4B0] focus:ring-[#3DD4B0]/20 focus:outline-none transition-colors"
                />
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleSave}
                      className="bg-[#1F6F78] text-white hover:bg-[#1F6F78]/90 text-sm"
                      size="sm"
                    >
                      {justSaved ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-1.5" />
                          {t('identity.saved')}
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-1.5" />
                          {t('identity.save')}
                        </>
                      )}
                    </Button>
                    {identityData.savedAt && (
                      <span className="text-xs text-slate-400">
                        {t('identity.lastSaved')} {new Date(identityData.savedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400">
                    {identityData.selectedCards.length}/4 {t('identity.selected')}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

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
            duration: 0.6,
            delay: 0.2,
          }}
          className="mt-16"
        >
          <div className="rounded-3xl bg-[#0F1C2E] p-8 text-center">
            <p className="text-xl font-semibold text-[#3DD4B0]">
              {t('identity.highlight')}
            </p>
          </div>
        </motion.div>

        <SectionDownloadButton
          fileKey="REC-10-IDENTITY-CARDS"
          program="porn-recovery"
        />
      </div>
    </section>
  );
}
