"use client";

import { motion } from 'framer-motion';
import { Wind, Eye, Shield, ScanLine, Plus, X } from 'lucide-react';
import { useState } from 'react';
import type { Locale } from '@/lib/trc/safety-plan/types';
import { getTranslations } from '@/lib/trc/safety-plan/translations';

interface StabilizeStepProps {
  locale: Locale;
  breathing: boolean;
  grounding: boolean;
  safePlace: boolean;
  bodyScan: boolean;
  otherTools: string[];
  onUpdate: (updates: Partial<{ breathing: boolean; grounding: boolean; safePlace: boolean; bodyScan: boolean; otherTools: string[] }>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StabilizeStep({
  locale, breathing, grounding, safePlace, bodyScan, otherTools,
  onUpdate, onNext, onBack,
}: StabilizeStepProps) {
  const t = getTranslations(locale);
  const isRtl = locale === 'ar';
  const [newTool, setNewTool] = useState('');

  const tools = [
    { key: 'breathing' as const, label: t.stabilizeBreathing, desc: t.stabilizeBreathingDesc, icon: Wind, route: '/recovery/trc/a52' },
    { key: 'grounding' as const, label: t.stabilizeGrounding, desc: t.stabilizeGroundingDesc, icon: Eye, route: '/recovery/trc/grounding' },
    { key: 'safePlace' as const, label: t.stabilizeSafePlace, desc: t.stabilizeSafePlaceDesc, icon: Shield, route: '/recovery/trc/safe-place' },
    { key: 'bodyScan' as const, label: t.stabilizeBodyScan, desc: t.stabilizeBodyScanDesc, icon: ScanLine, route: '/recovery/trc/body-scan' },
  ];

  const values: Record<string, boolean> = { breathing, grounding, safePlace, bodyScan };

  const addOtherTool = () => {
    const trimmed = newTool.trim();
    if (trimmed && !otherTools.includes(trimmed)) {
      onUpdate({ otherTools: [...otherTools, trimmed] });
      setNewTool('');
    }
  };

  const removeOtherTool = (tool: string) => {
    onUpdate({ otherTools: otherTools.filter(t => t !== tool) });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" dir={isRtl ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl w-full"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F1C2E] mb-2">{t.stabilizeTitle}</h2>
        <p className="text-slate-600 mb-8">{t.stabilizeSubtitle}</p>

        {/* Tool cards */}
        <div className="space-y-3 mb-6">
          {tools.map(tool => {
            const Icon = tool.icon;
            const isSelected = values[tool.key];
            return (
              <button
                key={tool.key}
                onClick={() => onUpdate({ [tool.key]: !isSelected })}
                className={`w-full flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 text-left ${
                  isSelected
                    ? 'bg-[#1F6F78]/5 border-[#1F6F78]/30 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-[#1F6F78]/20 hover:bg-[#F0F7F7]/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-[#1F6F78] text-white' : 'bg-[#F0F7F7] text-[#1F6F78]'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm ${isSelected ? 'text-[#1F6F78]' : 'text-[#0F1C2E]'}`}>{tool.label}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{tool.desc}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
                  isSelected ? 'border-[#1F6F78] bg-[#1F6F78]' : 'border-slate-300'
                }`}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Other tools */}
        <div className="mb-8">
          <label className="text-sm font-semibold text-slate-700 block mb-2">{t.stabilizeOtherLabel}</label>
          {otherTools.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {otherTools.map(tool => (
                <span key={tool} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1F6F78]/10 text-[#1F6F78] text-sm font-medium">
                  {tool}
                  <button onClick={() => removeOtherTool(tool)} className="hover:text-[#E8685A] transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              value={newTool}
              onChange={e => setNewTool(e.target.value)}
              placeholder={t.stabilizeOtherPlaceholder}
              onKeyDown={e => e.key === 'Enter' && addOtherTool()}
              className="flex-1 px-4 py-2.5 rounded-xl border border-[#1F6F78]/20 bg-[#F0F7F7] text-[#0F1C2E] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F6F78]/30 text-sm"
            />
            <button
              onClick={addOtherTool}
              disabled={!newTool.trim()}
              className="px-4 py-2.5 rounded-xl bg-[#1F6F78]/10 text-[#1F6F78] hover:bg-[#1F6F78]/20 transition-colors disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button onClick={onBack} className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors">
            {t.backLabel}
          </button>
          <button onClick={onNext} className="flex-1 px-6 py-3 bg-[#1F6F78] text-white font-medium rounded-xl hover:bg-[#1a5e66] active:scale-[0.98] transition-all duration-200">
            {t.stabilizeNextButton}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
