"use client";

import { motion } from 'framer-motion';
import { Users, Plus, X } from 'lucide-react';
import { useState } from 'react';
import type { Locale, SupportPerson } from '@/lib/trc/safety-plan/types';
import { getTranslations } from '@/lib/trc/safety-plan/translations';

interface SupportPeopleStepProps {
  locale: Locale;
  people: SupportPerson[];
  onAdd: (person: SupportPerson) => void;
  onRemove: (index: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function SupportPeopleStep({ locale, people, onAdd, onRemove, onNext, onBack }: SupportPeopleStepProps) {
  const t = getTranslations(locale);
  const isRtl = locale === 'ar';
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [contactMethod, setContactMethod] = useState('phone');
  const [whenToContact, setWhenToContact] = useState('');

  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd({ name: name.trim(), relation: relation.trim(), contactMethod, whenToContact: whenToContact.trim() });
    setName(''); setRelation(''); setContactMethod('phone'); setWhenToContact('');
  };

  const contactOptions = t.supportContactOptions;

  return (
    <div className="min-h-screen flex items-center justify-center p-6" dir={isRtl ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl w-full"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#1F6F78]/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-[#1F6F78]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1C2E]">{t.supportTitle}</h2>
        </div>
        <p className="text-slate-600 mb-4">{t.supportSubtitle}</p>

        {/* It's okay message */}
        <div className="bg-[#F0F7F7] border border-[#1F6F78]/10 rounded-xl p-3 mb-6">
          <p className="text-slate-600 text-sm leading-relaxed">{t.supportOkayIfFew}</p>
        </div>

        {/* Existing people */}
        {people.length > 0 && (
          <div className="space-y-2 mb-6">
            {people.map((person, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-[#0F1C2E]">{person.name}</p>
                  <p className="text-xs text-slate-500">
                    {person.relation && `${person.relation} · `}{contactOptions[person.contactMethod] || person.contactMethod}
                    {person.whenToContact && ` · ${person.whenToContact}`}
                  </p>
                </div>
                <button onClick={() => onRemove(idx)} className="text-slate-400 hover:text-[#E8685A] transition-colors shrink-0">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add form */}
        <div className="bg-[#F0F7F7]/50 border border-[#1F6F78]/10 rounded-2xl p-4 mb-8 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">{t.supportNameLabel}</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t.supportNamePlaceholder}
                className="w-full px-3 py-2 rounded-lg border border-[#1F6F78]/15 bg-white text-sm text-[#0F1C2E] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F6F78]/25" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">{t.supportRelationLabel}</label>
              <input type="text" value={relation} onChange={e => setRelation(e.target.value)} placeholder={t.supportRelationPlaceholder}
                className="w-full px-3 py-2 rounded-lg border border-[#1F6F78]/15 bg-white text-sm text-[#0F1C2E] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F6F78]/25" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">{t.supportContactLabel}</label>
              <select value={contactMethod} onChange={e => setContactMethod(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#1F6F78]/15 bg-white text-sm text-[#0F1C2E] focus:outline-none focus:ring-2 focus:ring-[#1F6F78]/25">
                {Object.entries(contactOptions).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">{t.supportWhenLabel}</label>
              <input type="text" value={whenToContact} onChange={e => setWhenToContact(e.target.value)} placeholder={t.supportWhenPlaceholder}
                className="w-full px-3 py-2 rounded-lg border border-[#1F6F78]/15 bg-white text-sm text-[#0F1C2E] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F6F78]/25" />
            </div>
          </div>
          <button onClick={handleAdd} disabled={!name.trim()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1F6F78] text-white text-sm font-medium hover:bg-[#1a5e66] disabled:opacity-50 transition-colors">
            <Plus className="w-4 h-4" /> {t.supportAddButton}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button onClick={onBack} className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors">
            {t.backLabel}
          </button>
          <button onClick={onNext} className="flex-1 px-6 py-3 bg-[#1F6F78] text-white font-medium rounded-xl hover:bg-[#1a5e66] active:scale-[0.98] transition-all duration-200">
            {t.supportNextButton}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
