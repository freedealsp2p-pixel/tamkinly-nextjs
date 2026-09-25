"use client";

import { motion } from 'framer-motion';
import type { Locale, TriggerEntry, TriggerCategory, BodyResponse, EmotionLabel } from '@/lib/trc/trigger-mapping/types';
import { getTranslations } from '@/lib/trc/trigger-mapping/translations';

interface TriggerReviewProps {
  locale: Locale;
  entries: TriggerEntry[];
  onDeleteEntry: (id: string) => void;
  onAddAnother: () => void;
  onDone: () => void;
}

export default function TriggerReview({
  locale,
  entries,
  onDeleteEntry,
  onAddAnother,
  onDone,
}: TriggerReviewProps) {
  const t = getTranslations(locale);

  const getCategoryLabel = (cat: TriggerCategory | null): string => {
    if (!cat) return t.reviewNoCategory;
    return t.triggerCategories[cat].label;
  };

  const getBodyLabels = (responses: BodyResponse[]): string => {
    if (!responses.length) return '—';
    return responses.map(r => t.bodyResponses[r].label).join(', ');
  };

  const getEmotionLabel = (emotion: EmotionLabel | null): string => {
    if (!emotion) return '—';
    return t.emotions[emotion];
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-3xl w-full"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F1C2E] mb-3 leading-tight">
          {t.reviewTitle}
        </h2>
        <p className="text-slate-500 mb-8">{t.reviewSubtitle}</p>

        {entries.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <p>{t.reviewEmpty}</p>
          </div>
        ) : (
          <div className="space-y-4 mb-8 max-h-[60vh] overflow-y-auto pr-2">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#F0F7F7] border border-[#1F6F78]/10 rounded-xl p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-medium text-[#1F6F78] bg-[#1F6F78]/10 px-2.5 py-1 rounded-full">
                    {getCategoryLabel(entry.triggerCategory)}
                  </span>
                  <button
                    onClick={() => onDeleteEntry(entry.id)}
                    className="text-xs text-slate-400 hover:text-[#E8685A] transition-colors"
                  >
                    {t.reviewDeleteEntry}
                  </button>
                </div>

                {/* Trigger */}
                {entry.triggerDescription && (
                  <div className="mb-3">
                    <span className="text-xs font-medium text-slate-400 block mb-0.5">{t.reviewTriggerLabel}</span>
                    <p className="text-sm text-[#0F1C2E]">{entry.triggerDescription}</p>
                  </div>
                )}

                {/* Body */}
                {entry.bodyResponses.length > 0 && (
                  <div className="mb-3">
                    <span className="text-xs font-medium text-slate-400 block mb-0.5">{t.reviewBodyLabel}</span>
                    <p className="text-sm text-[#0F1C2E]">{getBodyLabels(entry.bodyResponses)}</p>
                    {entry.bodyResponseNotes && (
                      <p className="text-xs text-slate-500 mt-1">{entry.bodyResponseNotes}</p>
                    )}
                  </div>
                )}

                {/* Emotion */}
                {(entry.primaryEmotion || entry.activationLevel > 1) && (
                  <div className="mb-3">
                    <span className="text-xs font-medium text-slate-400 block mb-0.5">{t.reviewEmotionLabel}</span>
                    <p className="text-sm text-[#0F1C2E]">
                      {getEmotionLabel(entry.primaryEmotion)}
                      {entry.activationLevel > 1 && ` (${entry.activationLevel}/10)`}
                    </p>
                  </div>
                )}

                {/* Impulse */}
                {(entry.impulse || entry.actualResponse) && (
                  <div className="mb-3">
                    <span className="text-xs font-medium text-slate-400 block mb-0.5">{t.reviewImpulseLabel}</span>
                    {entry.impulse && <p className="text-sm text-[#0F1C2E]">{entry.impulse}</p>}
                    {entry.actualResponse && <p className="text-xs text-slate-500 mt-1">{entry.actualResponse}</p>}
                  </div>
                )}

                {/* Helped */}
                {(entry.whatHelped || entry.wouldHelpNextTime) && (
                  <div>
                    <span className="text-xs font-medium text-slate-400 block mb-0.5">{t.reviewHelpedLabel}</span>
                    {entry.whatHelped && <p className="text-sm text-[#0F1C2E]">{entry.whatHelped}</p>}
                    {entry.wouldHelpNextTime && <p className="text-xs text-slate-500 mt-1">{entry.wouldHelpNextTime}</p>}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onAddAnother}
            className="flex-1 px-6 py-3.5 bg-[#1F6F78] text-white font-medium rounded-xl hover:bg-[#1a5e66] active:scale-[0.98] transition-all duration-200"
          >
            {t.reviewAddAnother}
          </button>
          <button
            onClick={onDone}
            className="flex-1 px-6 py-3.5 border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 active:scale-[0.98] transition-all duration-200"
          >
            {t.reviewImDone}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

