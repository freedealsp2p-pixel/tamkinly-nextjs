"use client";

import { motion } from 'framer-motion';
import { MapPin, Plus, X } from 'lucide-react';
import { useState } from 'react';
import type { Locale, SafePlace } from '@/lib/trc/safety-plan/types';
import { getTranslations } from '@/lib/trc/safety-plan/translations';

interface SafePlacesStepProps {
  locale: Locale;
  places: SafePlace[];
  onAdd: (place: SafePlace) => void;
  onRemove: (index: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function SafePlacesStep({ locale, places, onAdd, onRemove, onNext, onBack }: SafePlacesStepProps) {
  const t = getTranslations(locale);
  const isRtl = locale === 'ar';
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [whySafe, setWhySafe] = useState('');

  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd({ name: name.trim(), location: location.trim(), whySafe: whySafe.trim() });
    setName(''); setLocation(''); setWhySafe('');
  };

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
            <MapPin className="w-5 h-5 text-[#1F6F78]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1C2E]">{t.safePlacesTitle}</h2>
        </div>
        <p className="text-slate-600 mb-8">{t.safePlacesSubtitle}</p>

        {/* Existing places */}
        {places.length > 0 && (
          <div className="space-y-2 mb-6">
            {places.map((place, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-[#0F1C2E]">{place.name}</p>
                  {place.location && <p className="text-xs text-slate-500">{place.location}</p>}
                  {place.whySafe && <p className="text-xs text-slate-400 mt-0.5">{place.whySafe}</p>}
                </div>
                <button onClick={() => onRemove(idx)} className="text-slate-400 hover:text-[#E8685A] transition-colors shrink-0 mt-0.5">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add form */}
        <div className="bg-[#F0F7F7]/50 border border-[#1F6F78]/10 rounded-2xl p-4 mb-8 space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">{t.safePlacesNameLabel}</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t.safePlacesNamePlaceholder}
              className="w-full px-3 py-2 rounded-lg border border-[#1F6F78]/15 bg-white text-sm text-[#0F1C2E] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F6F78]/25" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">{t.safePlacesLocationLabel}</label>
            <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder={t.safePlacesLocationPlaceholder}
              className="w-full px-3 py-2 rounded-lg border border-[#1F6F78]/15 bg-white text-sm text-[#0F1C2E] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F6F78]/25" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">{t.safePlacesWhyLabel}</label>
            <textarea value={whySafe} onChange={e => setWhySafe(e.target.value)} placeholder={t.safePlacesWhyPlaceholder} rows={2}
              className="w-full px-3 py-2 rounded-lg border border-[#1F6F78]/15 bg-white text-sm text-[#0F1C2E] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F6F78]/25 resize-none" />
          </div>
          <button onClick={handleAdd} disabled={!name.trim()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1F6F78] text-white text-sm font-medium hover:bg-[#1a5e66] disabled:opacity-50 transition-colors">
            <Plus className="w-4 h-4" /> {t.safePlacesAddButton}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button onClick={onBack} className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors">
            {t.backLabel}
          </button>
          <button onClick={onNext} className="flex-1 px-6 py-3 bg-[#1F6F78] text-white font-medium rounded-xl hover:bg-[#1a5e66] active:scale-[0.98] transition-all duration-200">
            {t.safePlacesNextButton}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
