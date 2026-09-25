'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Heart,
  BookOpen,
  ShieldAlert,
  Download,
  ExternalLink,
  Save,
  CheckCircle2,
} from 'lucide-react';
import { BilingualDownloadButton } from '@/components/ui/bilingual-download-button';

import {
  useTranslations,
  useLocale,
} from '@/components/providers/LocaleProvider';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type TabKey = 'halt' | 'journal' | 'emergency';

const TOOLKIT_STORAGE_KEY = 'tamkinly_recovery_toolkit';

interface ToolkitData {
  haltChecked: boolean[];
  journalTrigger: string;
  journalEmotion: string;
  savedAt: string | null;
}

function loadToolkitData(): ToolkitData {
  if (typeof window === 'undefined') return { haltChecked: [false, false, false, false], journalTrigger: '', journalEmotion: '', savedAt: null };
  try {
    const stored = localStorage.getItem(TOOLKIT_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { haltChecked: [false, false, false, false], journalTrigger: '', journalEmotion: '', savedAt: null };
}

function saveToolkitData(data: ToolkitData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TOOLKIT_STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export default function RecoveryToolkitApps() {
  const t = useTranslations('recoveryPage');
  const { direction } = useLocale();

  const [activeTab, setActiveTab] =
    useState<TabKey>('halt');

  const [toolkitData, setToolkitData] = useState<ToolkitData>({
    haltChecked: [false, false, false, false],
    journalTrigger: '',
    journalEmotion: '',
    savedAt: null,
  });
  const [justSaved, setJustSaved] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setToolkitData(loadToolkitData());
  }, []);

  const handleHaltCheck = (index: number) => {
    setToolkitData(prev => {
      const checked = [...prev.haltChecked];
      checked[index] = !checked[index];
      const updated = { ...prev, haltChecked: checked };
      saveToolkitData(updated);
      return updated;
    });
  };

  const handleJournalChange = (field: 'journalTrigger' | 'journalEmotion', value: string) => {
    setToolkitData(prev => {
      const updated = { ...prev, [field]: value };
      return updated;
    });
  };

  const handleSaveJournal = () => {
    const updated = { ...toolkitData, savedAt: new Date().toISOString() };
    saveToolkitData(updated);
    setToolkitData(updated);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  const haltItems = [
    t('toolkit.halt.hungry'),
    t('toolkit.halt.angry'),
    t('toolkit.halt.lonely'),
    t('toolkit.halt.tired'),
  ];

  const emergencySteps = [
    t('toolkit.emergency.step1'),
    t('toolkit.emergency.step2'),
    t('toolkit.emergency.step3'),
    t('toolkit.emergency.step4'),
  ];

  const tabs = [
    {
      key: 'halt',
      label: t('toolkit.tabs.halt'),
      icon: Heart,
    },
    {
      key: 'journal',
      label: t('toolkit.tabs.journal'),
      icon: BookOpen,
    },
    {
      key: 'emergency',
      label: t('toolkit.tabs.emergency'),
      icon: ShieldAlert,
    },
  ] as const;

  return (
    <section
      id="toolkit"
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
            {t('toolkit.badge')}
          </Badge>

          <h2 className="mb-4 text-3xl font-bold text-[#0F1C2E] md:text-5xl">
            {t('toolkit.title')}
          </h2>

          <p className="text-lg text-slate-600">
            {t('toolkit.description')}
          </p>
        </motion.div>

        <Card className="overflow-hidden border-none shadow-xl">
          <CardContent className="p-0">
            <div className="border-b bg-white p-4">
              <div className="flex flex-wrap gap-3">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive =
                    activeTab === tab.key;

                  return (
                    <button
                      key={tab.key}
                      onClick={() =>
                        setActiveTab(
                          tab.key as TabKey
                        )
                      }
                      className={`
                        flex items-center gap-2 rounded-xl px-4 py-3 transition-all
                        ${
                          isActive
                            ? 'bg-[#0F1C2E] text-white'
                            : 'bg-[#F6F8FA] text-slate-600'
                        }
                      `}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'halt' && (
                <motion.div
                  key="halt"
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: 'auto',
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                >
                  <div className="p-8">
                    <h3 className="mb-3 text-2xl font-bold text-[#0F1C2E]">
                      {t('toolkit.halt.title')}
                    </h3>

                    <p className="mb-6 text-slate-600">
                      {t('toolkit.halt.description')}
                    </p>

                    <div className="grid gap-4 md:grid-cols-2">
                      {haltItems.map((item, index) => (
                        <label
                          key={item}
                          className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all ${
                            toolkitData.haltChecked[index]
                              ? 'border-[#3DD4B0] bg-[#F0FDF9]'
                              : 'hover:border-[#3DD4B0]/30'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={toolkitData.haltChecked[index]}
                            onChange={() => handleHaltCheck(index)}
                            className="h-4 w-4 accent-[#3DD4B0]"
                          />
                          <span className={toolkitData.haltChecked[index] ? 'text-[#1F6F78] font-medium' : ''}>{item}</span>
                        </label>
                      ))}
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                      {t('toolkit.halt.result')}
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'journal' && (
                <motion.div
                  key="journal"
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: 'auto',
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                >
                  <div className="p-8">
                    <h3 className="mb-3 text-2xl font-bold text-[#0F1C2E]">
                      {t('toolkit.journal.title')}
                    </h3>

                    <p className="mb-6 text-slate-600">
                      {t('toolkit.journal.description')}
                    </p>

                    <div className="space-y-4">
                      <textarea
                        rows={4}
                        value={toolkitData.journalTrigger}
                        onChange={(e) => handleJournalChange('journalTrigger', e.target.value)}
                        placeholder={t(
                          'toolkit.journal.triggerLabel'
                        )}
                        className="w-full rounded-xl border border-slate-200 p-4 focus:border-[#3DD4B0] focus:ring-[#3DD4B0]/20 focus:outline-none transition-colors"
                      />

                      <textarea
                        rows={3}
                        value={toolkitData.journalEmotion}
                        onChange={(e) => handleJournalChange('journalEmotion', e.target.value)}
                        placeholder={t(
                          'toolkit.journal.emotionLabel'
                        )}
                        className="w-full rounded-xl border border-slate-200 p-4 focus:border-[#3DD4B0] focus:ring-[#3DD4B0]/20 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <Button
                        onClick={handleSaveJournal}
                        size="sm"
                        className="bg-[#1F6F78] text-white hover:bg-[#1F6F78]/90"
                      >
                        {justSaved ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-1.5" />
                            {t('toolkit.journal.saved')}
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-1.5" />
                            {t('toolkit.journal.save')}
                          </>
                        )}
                      </Button>
                      {toolkitData.savedAt && (
                        <span className="text-xs text-slate-400">
                          {t('toolkit.journal.lastSaved')} {new Date(toolkitData.savedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                      {t('toolkit.journal.pattern')}
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'emergency' && (
                <motion.div
                  key="emergency"
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: 'auto',
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                >
                  <div className="p-8">
                    <h3 className="mb-3 text-2xl font-bold text-[#0F1C2E]">
                      {t('toolkit.emergency.title')}
                    </h3>

                    <p className="mb-6 text-slate-600">
                      {t('toolkit.emergency.description')}
                    </p>

                    <div className="space-y-3">
                      {emergencySteps.map(
                        (step, index) => (
                          <div
                            key={step}
                            className="flex items-center gap-4 rounded-xl border p-4"
                          >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F1C2E] text-sm text-white">
                              {index + 1}
                            </div>

                            <span>{step}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-wrap items-start justify-between gap-6 border-t bg-white p-6">
              {(() => {
                const tabFileKey: Record<TabKey, string> = {
                  halt: 'REC-01-HALT',
                  journal: 'REC-02-TRIGGER-JOURNAL',
                  emergency: 'REC-03-EMERGENCY-PLAN',
                };
                const fileKey = tabFileKey[activeTab];
                return (
                  <BilingualDownloadButton
                    fileKey={fileKey}
                    variant="outline"
                    showSize={true}
                  />
                );
              })()}

              <a
                href="/apps"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'recovery_toolkit_open_full', {
                      tool: activeTab,
                      locale: direction === 'rtl' ? 'ar' : 'en',
                    });
                  }
                }}
                className="inline-flex h-11 items-center gap-2 rounded-md bg-[#0F1C2E] px-6 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-[#0F1C2E]/90"
              >
                <ExternalLink className="h-4 w-4" />
                {t('toolkit.openFullTool')}
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
